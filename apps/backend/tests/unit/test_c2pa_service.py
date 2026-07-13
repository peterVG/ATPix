"""Unit tests for C2PA manifest generation service."""

from pathlib import Path

import pytest

from app.modules.c2pa.constants import ACTION_CREATED, ACTION_OPENED
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


def test_rejects_unsupported_mime_type() -> None:
    """Unsupported MIME types fail fast before signing."""
    with pytest.raises(C2paServiceError, match="Unsupported image type"):
        embed_manifest(b"not-an-image", "image/webp", "did:plc:bad")
