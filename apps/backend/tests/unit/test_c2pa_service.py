"""Unit tests for C2PA manifest generation service."""

from pathlib import Path

import pytest

from app.modules.c2pa.constants import (
    ACTION_CREATED,
    ACTION_OPENED,
    MAX_EMBED_BYTES,
    MAX_OUTPUT_BYTES,
)
from app.modules.c2pa.service import C2paServiceError, embed_manifest, summarize_manifest

FIXTURES = Path(__file__).resolve().parents[1] / "fixtures" / "c2pa"


def test_embed_manifest_adds_created_action_for_jpeg() -> None:
    """New JPEG capture receives c2pa.created and creator DID assertion."""
    source = (FIXTURES / "A.jpg").read_bytes()
    signed = embed_manifest(source, "image/jpeg", "did:plc:example")
    summary = summarize_manifest(signed, "image/jpeg")

    assert summary.first_action == ACTION_CREATED
    assert summary.has_hash_data is True
    assert summary.creator_did == "did:plc:example"
    assert summary.embedded is True
    assert len(signed) > len(source)


def test_embed_manifest_adds_opened_action_for_import() -> None:
    """JPEG with an existing manifest receives c2pa.opened and ingredient linkage."""
    source = (FIXTURES / "A.jpg").read_bytes()
    signed_source = embed_manifest(source, "image/jpeg", "did:plc:source")
    imported = embed_manifest(signed_source, "image/jpeg", "did:plc:importer")
    summary = summarize_manifest(imported, "image/jpeg")

    assert summary.first_action == ACTION_OPENED
    assert summary.has_ingredient is True
    assert summary.creator_did == "did:plc:importer"


def test_embed_manifest_supports_png() -> None:
    """PNG uploads can receive an embedded manifest store."""
    source = (FIXTURES / "sample.png").read_bytes()
    signed = embed_manifest(source, "image/png", "did:plc:pngtest")
    summary = summarize_manifest(signed, "image/png")

    assert summary.first_action == ACTION_CREATED
    assert summary.embedded is True


def test_privacy_opt_out_omits_optional_metadata() -> None:
    """GPS and device metadata remain omitted unless explicitly requested."""
    source = (FIXTURES / "A.jpg").read_bytes()
    signed = embed_manifest(
        source,
        "image/jpeg",
        "did:plc:privacy",
        include_gps=False,
        include_device=False,
    )
    summary = summarize_manifest(signed, "image/jpeg")

    assert summary.has_gps_metadata is False
    assert summary.has_device_metadata is False


def test_opt_in_without_real_metadata_omits_optional_assertions() -> None:
    """Opt-in flags without consented values do not embed misleading metadata."""
    source = (FIXTURES / "A.jpg").read_bytes()
    signed = embed_manifest(
        source,
        "image/jpeg",
        "did:plc:optin",
        include_gps=True,
        include_device=True,
    )
    summary = summarize_manifest(signed, "image/jpeg")

    assert summary.has_gps_metadata is False
    assert summary.has_device_metadata is False


def test_opt_in_with_consented_metadata_embeds_assertions() -> None:
    """Consented GPS and device metadata are embedded when provided."""
    source = (FIXTURES / "A.jpg").read_bytes()
    signed = embed_manifest(
        source,
        "image/jpeg",
        "did:plc:optin",
        include_gps=True,
        include_device=True,
        gps_coords={
            "@type": "c2pa.GpsCoordinates",
            "latitude": 52.37,
            "longitude": 4.89,
        },
        device_info={"@type": "c2pa.Device", "manufacturer": "ATPix-Test-Device"},
    )
    summary = summarize_manifest(signed, "image/jpeg")

    assert summary.has_gps_metadata is True
    assert summary.has_device_metadata is True


def test_rejects_empty_creator_did() -> None:
    """Whitespace creator DID values are rejected before signing."""
    source = (FIXTURES / "A.jpg").read_bytes()
    with pytest.raises(C2paServiceError, match="creator_did is required"):
        embed_manifest(source, "image/jpeg", "   ")


def test_rejects_oversized_image() -> None:
    """Oversized uploads are rejected before signing."""
    oversized = b"\xff\xd8\xff" + b"\x00" * (MAX_EMBED_BYTES + 1)
    with pytest.raises(C2paServiceError, match="exceeds maximum C2PA embed size"):
        embed_manifest(oversized, "image/jpeg", "did:plc:big")


def test_rejects_unsupported_mime_type() -> None:
    """Unsupported MIME types fail fast before signing."""
    with pytest.raises(C2paServiceError, match="Unsupported image type"):
        embed_manifest(b"not-an-image", "image/webp", "did:plc:bad")


def test_signed_output_stays_within_upload_cap() -> None:
    """Signed assets remain within the 50 MiB upload cap."""
    source = (FIXTURES / "A.jpg").read_bytes()
    signed = embed_manifest(source, "image/jpeg", "did:plc:sizecap")
    assert len(signed) <= MAX_OUTPUT_BYTES
