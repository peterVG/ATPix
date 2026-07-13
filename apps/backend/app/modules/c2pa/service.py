"""C2PA manifest generation service for upload embedding (SRS-F-012)."""

from __future__ import annotations

import io
import json
import logging
import tempfile
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import c2pa

from app.modules.c2pa.constants import (
    ACTION_CREATED,
    ACTION_OPENED,
    ATPIX_ACTIONS_ASSERTION_LABEL,
    ATPIX_CLAIM_GENERATOR_NAME,
    ATPIX_CLAIM_GENERATOR_VERSION,
    ATPIX_CREATOR_ASSERTION_LABEL,
    MAX_EMBED_BYTES,
    MAX_OUTPUT_BYTES,
    SUPPORTED_EMBED_MIME_TYPES,
)
from app.modules.c2pa.signer import C2paSigningNotConfiguredError, create_callback_signer

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class ManifestSummary:
    """Parsed manifest facts used by tests and API metadata."""

    first_action: str | None
    has_hash_data: bool
    has_creator_did: bool
    creator_did: str | None
    has_ingredient: bool
    has_gps_metadata: bool
    has_device_metadata: bool
    embedded: bool
    raw_json: str


@dataclass(frozen=True)
class ManifestValidationResult:
    """Validation summary returned by the validator scaffold (BE-1.2)."""

    state: str
    first_action: str | None
    creator_did: str | None
    embedded: bool


class C2paServiceError(Exception):
    """Raised when C2PA manifest generation cannot complete."""


def _assert_supported_mime(mime_type: str) -> None:
    """Validate the upload MIME type is embeddable.

    Args:
        mime_type: Declared image MIME type.

    Raises:
        C2paServiceError: When the MIME type is unsupported.
    """
    if mime_type not in SUPPORTED_EMBED_MIME_TYPES:
        raise C2paServiceError(f"Unsupported image type for C2PA embedding: {mime_type}")


def _asset_has_manifest(image_bytes: bytes, mime_type: str) -> bool:
    """Return True when the asset already contains an embedded manifest.

    Args:
        image_bytes: Raw image bytes.
        mime_type: Image MIME type.

    Returns:
        Whether a manifest store is embedded in the asset.
    """
    try:
        with c2pa.Context() as context:
            reader = c2pa.Reader.try_create(mime_type, io.BytesIO(image_bytes), context=context)
            if reader is None:
                return False

            with reader:
                return reader.is_embedded()
    except Exception as error:
        raise C2paServiceError(f"Unable to inspect existing manifest: {error}") from error


def _optional_metadata_assertions(
    *,
    include_gps: bool,
    include_device: bool,
    gps_coords: dict[str, Any] | None = None,
    device_info: dict[str, Any] | None = None,
) -> list[dict[str, Any]]:
    """Build optional metadata assertions honoring privacy opt-outs.

    Args:
        include_gps: Whether GPS coordinates may be embedded.
        include_device: Whether device identifiers may be embedded.
        gps_coords: Consented GPS coordinates when available.
        device_info: Consented device metadata when available.

    Returns:
        Zero or more assertion dictionaries for the manifest definition.
    """
    metadata: dict[str, Any] = {}
    if include_gps and gps_coords:
        metadata["exif:GPS"] = gps_coords
    if include_device and device_info:
        metadata["exif:Device"] = device_info

    if not metadata:
        return []

    metadata_with_context = {
        "@context": {
            "exif": "http://ns.adobe.com/exif/1.0/",
            "c2pa": "http://c2pa.org/claims/",
        },
        **metadata,
    }

    return [{"label": "c2pa.metadata", "data": metadata_with_context}]


def _build_manifest_definition(
    *,
    mime_type: str,
    creator_did: str,
    first_action: str,
    include_gps: bool,
    include_device: bool,
    gps_coords: dict[str, Any] | None = None,
    device_info: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Create a C2PA manifest definition for capture or import flows.

    Args:
        mime_type: Target asset MIME type.
        creator_did: Uploader atproto DID for the custom assertion.
        first_action: `c2pa.created` or `c2pa.opened`.
        include_gps: Whether optional GPS metadata is allowed.
        include_device: Whether optional device metadata is allowed.
        gps_coords: Optional consented GPS coordinates.
        device_info: Optional consented device metadata.

    Returns:
        Manifest definition dictionary for `c2pa.Builder`.
    """
    assertions: list[dict[str, Any]] = [
        {
            "label": ATPIX_ACTIONS_ASSERTION_LABEL,
            "data": {"actions": [{"action": first_action}]},
        },
        {
            "label": ATPIX_CREATOR_ASSERTION_LABEL,
            "data": {"did": creator_did},
        },
    ]
    assertions.extend(
        _optional_metadata_assertions(
            include_gps=include_gps,
            include_device=include_device,
            gps_coords=gps_coords,
            device_info=device_info,
        ),
    )

    return {
        "claim_generator_info": [
            {"name": ATPIX_CLAIM_GENERATOR_NAME, "version": ATPIX_CLAIM_GENERATOR_VERSION},
        ],
        "format": mime_type,
        "assertions": assertions,
    }


def _active_manifest(payload: dict[str, Any]) -> dict[str, Any] | None:
    """Return the active manifest dictionary from parsed manifest JSON.

    Args:
        payload: Parsed manifest JSON from `Reader.json()`.

    Returns:
        Active manifest dictionary when present.
    """
    manifests = payload.get("manifests")
    active_label = payload.get("active_manifest")
    if not isinstance(manifests, dict) or not isinstance(active_label, str):
        return None

    manifest = manifests.get(active_label)
    if isinstance(manifest, dict):
        return manifest

    return None


def _active_manifest_validation_entries(payload: dict[str, Any]) -> list[dict[str, Any]]:
    """Return validation result entries scoped to the active manifest.

    Args:
        payload: Parsed manifest JSON from `Reader.json()`.

    Returns:
        Flattened validation entries for the active manifest.
    """
    validation = payload.get("validation_results")
    if not isinstance(validation, dict):
        return []

    active_results = validation.get("activeManifest")
    if not isinstance(active_results, dict):
        return []

    entries: list[dict[str, Any]] = []
    for bucket in ("success", "informational", "failure"):
        bucket_entries = active_results.get(bucket)
        if isinstance(bucket_entries, list):
            entries.extend(entry for entry in bucket_entries if isinstance(entry, dict))

    return entries


def _manifest_has_hash_data(manifest: dict[str, Any], payload: dict[str, Any]) -> bool:
    """Return True when the active manifest includes a `c2pa.hash.data` binding.

    Args:
        manifest: Active manifest dictionary.
        payload: Parsed manifest JSON from `Reader.json()`.

    Returns:
        Whether hard-binding hash data is present on the active manifest.
    """
    assertions = manifest.get("assertions")
    if isinstance(assertions, list):
        for assertion in assertions:
            if isinstance(assertion, dict) and assertion.get("label") == "c2pa.hash.data":
                return True
            if isinstance(assertion, str) and "c2pa.hash.data" in assertion:
                return True

    for entry in _active_manifest_validation_entries(payload):
        if "c2pa.hash.data" in str(entry.get("url", "")):
            return True

    return False


def _manifest_has_ingredient(manifest: dict[str, Any]) -> bool:
    """Return True when the active manifest includes ingredient references.

    Args:
        manifest: Active manifest dictionary.

    Returns:
        Whether ingredient linkage is present on the active manifest.
    """
    ingredients = manifest.get("ingredients")
    if isinstance(ingredients, list) and ingredients:
        return True

    assertions = manifest.get("assertions")
    if not isinstance(assertions, list):
        return False

    ingredient_labels = {"c2pa.ingredient", "c2pa.ingredient.v3", "c2pa.ingredients"}
    for assertion in assertions:
        if not isinstance(assertion, dict):
            continue
        if assertion.get("label") in ingredient_labels:
            return True
        data = assertion.get("data")
        if isinstance(data, dict) and "ingredients" in data:
            return True

    return False


def _manifest_has_metadata_token(manifest: dict[str, Any], token: str) -> bool:
    """Return True when optional metadata containing `token` is on the active manifest.

    Args:
        manifest: Active manifest dictionary.
        token: Case-insensitive substring to locate in metadata assertions.

    Returns:
        Whether the active manifest contains matching optional metadata.
    """
    assertions = manifest.get("assertions")
    if not isinstance(assertions, list):
        return False

    needle = token.lower()
    for assertion in assertions:
        if not isinstance(assertion, dict) or assertion.get("label") != "c2pa.metadata":
            continue
        if needle in json.dumps(assertion.get("data", {})).lower():
            return True

    return False


def summarize_manifest(image_bytes: bytes, mime_type: str) -> ManifestSummary:
    """Parse manifest facts from signed image bytes.

    Args:
        image_bytes: Signed asset bytes.
        mime_type: Asset MIME type.

    Returns:
        Summary of actions, bindings, and custom assertions.

    Raises:
        C2paServiceError: When manifest data cannot be read.
    """
    _assert_supported_mime(mime_type)

    try:
        with c2pa.Context() as context:
            reader = c2pa.Reader.try_create(mime_type, io.BytesIO(image_bytes), context=context)
            if reader is None:
                raise C2paServiceError("No C2PA manifest found in signed asset")

            with reader:
                raw_json = reader.json()
                embedded = reader.is_embedded()
    except C2paServiceError:
        raise
    except Exception as error:
        raise C2paServiceError(f"Unable to read signed manifest: {error}") from error

    payload = json.loads(raw_json)
    active = _active_manifest(payload)
    actions = _extract_first_action(payload)
    creator_did = _extract_creator_did(payload)

    return ManifestSummary(
        first_action=actions,
        has_hash_data=_manifest_has_hash_data(active, payload) if active else False,
        has_creator_did=creator_did is not None,
        creator_did=creator_did,
        has_ingredient=_manifest_has_ingredient(active) if active else False,
        has_gps_metadata=_manifest_has_metadata_token(active, "gps") if active else False,
        has_device_metadata=_manifest_has_metadata_token(active, "device") if active else False,
        embedded=embedded,
        raw_json=raw_json,
    )


def _ordered_manifests(payload: dict[str, Any]) -> list[dict[str, Any]]:
    """Return manifest entries with the active manifest first.

    Args:
        payload: Parsed manifest JSON from `Reader.json()`.

    Returns:
        Manifest dictionaries ordered for active-manifest-first parsing.
    """
    manifests = payload.get("manifests")
    if not isinstance(manifests, dict):
        return []

    active_label = payload.get("active_manifest")
    ordered: list[dict[str, Any]] = []
    if isinstance(active_label, str):
        active_manifest = manifests.get(active_label)
        if isinstance(active_manifest, dict):
            ordered.append(active_manifest)

    for key, manifest in manifests.items():
        if key == active_label or not isinstance(manifest, dict):
            continue
        ordered.append(manifest)

    return ordered


def _extract_first_action(payload: dict[str, Any]) -> str | None:
    """Return the first action label from parsed manifest JSON.

    Args:
        payload: Parsed manifest JSON from `Reader.json()`.

    Returns:
        First action string when present.
    """
    for manifest in _ordered_manifests(payload):
        assertions = manifest.get("assertions")
        if not isinstance(assertions, list):
            continue

        for assertion in assertions:
            if not isinstance(assertion, dict):
                continue
            if assertion.get("label") not in {ATPIX_ACTIONS_ASSERTION_LABEL, "c2pa.actions.v2"}:
                continue

            data = assertion.get("data")
            if not isinstance(data, dict):
                continue

            actions = data.get("actions")
            if not isinstance(actions, list) or not actions:
                continue

            first = actions[0]
            if isinstance(first, dict) and isinstance(first.get("action"), str):
                return first["action"]

    return None


def _extract_creator_did(payload: dict[str, Any]) -> str | None:
    """Return the ATPix creator DID assertion value when present.

    Args:
        payload: Parsed manifest JSON from `Reader.json()`.

    Returns:
        Creator DID string or None.
    """
    for manifest in _ordered_manifests(payload):
        assertions = manifest.get("assertions")
        if not isinstance(assertions, list):
            continue

        for assertion in assertions:
            if not isinstance(assertion, dict):
                continue
            if assertion.get("label") != ATPIX_CREATOR_ASSERTION_LABEL:
                continue

            data = assertion.get("data")
            if isinstance(data, dict) and isinstance(data.get("did"), str):
                return data["did"]

    return None


def update_manifest(
    image_bytes: bytes,
    mime_type: str,
    creator_did: str,
) -> bytes:
    """Update an existing manifest on edit flows (BE-1.2 scaffold).

    Args:
        image_bytes: Asset bytes containing an existing manifest store.
        mime_type: Asset MIME type.
        creator_did: Uploader atproto DID for the update assertion.

    Returns:
        Updated manifest-bearing bytes.

    Raises:
        C2paServiceError: Until edit/update signing is implemented in Task 4.x.
    """
    raise C2paServiceError("Manifest update signing is not implemented yet")


def validate_manifest(image_bytes: bytes, mime_type: str) -> ManifestValidationResult:
    """Validate a signed asset and return a summary scaffold (BE-1.2).

    Args:
        image_bytes: Signed asset bytes.
        mime_type: Asset MIME type.

    Returns:
        Validation summary for the active manifest.

    Raises:
        C2paServiceError: When manifest data cannot be read.
    """
    summary = summarize_manifest(image_bytes, mime_type)
    state = "well-formed" if summary.has_hash_data and summary.embedded else "invalid"
    return ManifestValidationResult(
        state=state,
        first_action=summary.first_action,
        creator_did=summary.creator_did,
        embedded=summary.embedded,
    )


def embed_manifest(
    image_bytes: bytes,
    mime_type: str,
    creator_did: str,
    *,
    include_gps: bool = False,
    include_device: bool = False,
    gps_coords: dict[str, Any] | None = None,
    device_info: dict[str, Any] | None = None,
) -> bytes:
    """Embed a signed C2PA manifest into JPEG or PNG bytes.

    Args:
        image_bytes: Original upload bytes.
        mime_type: Image MIME type (`image/jpeg` or `image/png`).
        creator_did: Uploader atproto DID for `net.atpix.gallery.creatorDid`.
        include_gps: Whether optional GPS metadata assertions are allowed.
        include_device: Whether optional device metadata assertions are allowed.
        gps_coords: Optional consented GPS coordinates for metadata assertions.
        device_info: Optional consented device metadata for metadata assertions.

    Returns:
        Manifest-bearing image bytes ready for `uploadBlob`.

    Raises:
        C2paServiceError: When validation or signing fails.
    """
    if not creator_did.strip():
        raise C2paServiceError("creator_did is required")

    if len(image_bytes) > MAX_EMBED_BYTES:
        raise C2paServiceError("Image exceeds maximum C2PA embed size")

    _assert_supported_mime(mime_type)

    is_import = _asset_has_manifest(image_bytes, mime_type)
    first_action = ACTION_OPENED if is_import else ACTION_CREATED
    manifest_definition = _build_manifest_definition(
        mime_type=mime_type,
        creator_did=creator_did.strip(),
        first_action=first_action,
        include_gps=include_gps,
        include_device=include_device,
        gps_coords=gps_coords,
        device_info=device_info,
    )

    extension = ".jpg" if mime_type == "image/jpeg" else ".png"

    try:
        with tempfile.TemporaryDirectory() as temp_dir:
            source_path = Path(temp_dir) / f"source{extension}"
            output_path = Path(temp_dir) / f"signed{extension}"
            source_path.write_bytes(image_bytes)

            with c2pa.Context() as context:
                with create_callback_signer() as signer:
                    with c2pa.Builder(manifest_definition, context) as builder:
                        if is_import:
                            builder.set_intent(c2pa.C2paBuilderIntent.EDIT)
                            ingredient = {"title": "source asset", "relationship": "parentOf"}
                            with source_path.open("rb") as ingredient_stream:
                                builder.add_ingredient_from_stream(
                                    ingredient,
                                    mime_type,
                                    ingredient_stream,
                                )

                        builder.sign_file(str(source_path), str(output_path), signer)

            signed_bytes = output_path.read_bytes()
    except C2paSigningNotConfiguredError as error:
        raise C2paServiceError(str(error)) from error
    except C2paServiceError:
        raise
    except Exception as error:
        raise C2paServiceError(f"C2PA signing failed: {error}") from error

    if len(signed_bytes) > MAX_OUTPUT_BYTES:
        raise C2paServiceError("Signed asset exceeds maximum upload size after manifest embedding")

    summary = summarize_manifest(signed_bytes, mime_type)
    if summary.first_action != first_action:
        raise C2paServiceError(f"Expected first action {first_action}, got {summary.first_action}")

    if not summary.has_hash_data:
        raise C2paServiceError("Signed manifest is missing c2pa.hash.data binding")

    if summary.creator_did != creator_did.strip():
        raise C2paServiceError("Signed manifest is missing net.atpix.gallery.creatorDid assertion")

    if is_import and not summary.has_ingredient:
        raise C2paServiceError("Import manifest is missing ingredient reference")

    if not include_gps and summary.has_gps_metadata:
        raise C2paServiceError("GPS metadata was embedded despite opt-out")

    if not include_device and summary.has_device_metadata:
        raise C2paServiceError("Device metadata was embedded despite opt-out")

    logger.info(
        "embedded C2PA manifest action=%s bytes=%s mime=%s import=%s",
        summary.first_action,
        len(signed_bytes),
        mime_type,
        is_import,
    )
    return signed_bytes
