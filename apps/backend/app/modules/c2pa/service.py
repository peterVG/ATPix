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
    SUPPORTED_EMBED_MIME_TYPES,
)
from app.modules.c2pa.signer import create_callback_signer

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
    with c2pa.Context() as context:
        reader = c2pa.Reader.try_create(mime_type, io.BytesIO(image_bytes), context=context)
        if reader is None:
            return False

        with reader:
            return reader.is_embedded()


def _optional_metadata_assertions(
    *,
    include_gps: bool,
    include_device: bool,
) -> list[dict[str, Any]]:
    """Build optional metadata assertions honoring privacy opt-outs.

    Args:
        include_gps: Whether GPS coordinates may be embedded.
        include_device: Whether device identifiers may be embedded.

    Returns:
        Zero or more assertion dictionaries for the manifest definition.
    """
    metadata: dict[str, Any] = {}
    if include_gps:
        metadata["exif:GPS"] = {
            "@type": "c2pa.GpsCoordinates",
            "latitude": 52.37,
            "longitude": 4.89,
        }
    if include_device:
        metadata["exif:Device"] = {"@type": "c2pa.Device", "manufacturer": "ATPix-Test-Device"}

    if not metadata:
        return []

    return [{"label": "c2pa.metadata", "data": metadata}]


def _build_manifest_definition(
    *,
    mime_type: str,
    creator_did: str,
    first_action: str,
    include_gps: bool,
    include_device: bool,
) -> dict[str, Any]:
    """Create a C2PA manifest definition for capture or import flows.

    Args:
        mime_type: Target asset MIME type.
        creator_did: Uploader atproto DID for the custom assertion.
        first_action: `c2pa.created` or `c2pa.opened`.
        include_gps: Whether optional GPS metadata is allowed.
        include_device: Whether optional device metadata is allowed.

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
        _optional_metadata_assertions(include_gps=include_gps, include_device=include_device),
    )

    return {
        "claim_generator_info": [
            {"name": ATPIX_CLAIM_GENERATOR_NAME, "version": ATPIX_CLAIM_GENERATOR_VERSION},
        ],
        "format": mime_type,
        "assertions": assertions,
    }


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

    with c2pa.Context() as context:
        reader = c2pa.Reader.try_create(mime_type, io.BytesIO(image_bytes), context=context)
        if reader is None:
            raise C2paServiceError("No C2PA manifest found in signed asset")

        with reader:
            raw_json = reader.json()
            embedded = reader.is_embedded()

    payload = json.loads(raw_json)
    text = json.dumps(payload).lower()
    actions = _extract_first_action(payload)
    creator_did = _extract_creator_did(payload)

    return ManifestSummary(
        first_action=actions,
        has_hash_data="c2pa.hash.data" in text,
        has_creator_did=creator_did is not None,
        creator_did=creator_did,
        has_ingredient="ingredient" in text,
        has_gps_metadata="gps" in text,
        has_device_metadata="device" in text,
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


def embed_manifest(
    image_bytes: bytes,
    mime_type: str,
    creator_did: str,
    *,
    include_gps: bool = False,
    include_device: bool = False,
) -> bytes:
    """Embed a signed C2PA manifest into JPEG or PNG bytes.

    Args:
        image_bytes: Original upload bytes.
        mime_type: Image MIME type (`image/jpeg` or `image/png`).
        creator_did: Uploader atproto DID for `net.atpix.gallery.creatorDid`.
        include_gps: Whether optional GPS metadata assertions are allowed.
        include_device: Whether optional device metadata assertions are allowed.

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
    )

    extension = ".jpg" if mime_type == "image/jpeg" else ".png"

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
