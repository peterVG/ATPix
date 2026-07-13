"""Offline validation of ATPix lexicon artifacts (SRS-F-011, SRS-TC-005)."""

from __future__ import annotations

import json
from pathlib import Path

import cbor2
import pytest

REPO_ROOT = Path(__file__).resolve().parents[4]
LEXICON_DIR = REPO_ROOT / "docs" / "lexicon"
MANIFEST_PATH = REPO_ROOT / "config" / "happyview" / "provision-manifest.json"
NAMESPACE = "net.atpix.gallery"
RECORD_TYPES = frozenset({"record"})
QUERY_PROCEDURE_TYPES = frozenset({"query", "procedure"})


def _load_manifest() -> dict:
    """Load the HappyView provision manifest."""
    with MANIFEST_PATH.open(encoding="utf-8") as handle:
        return json.load(handle)


def _lexicon_type(lexicon_json: dict) -> str | None:
    """Return the main lexicon definition type."""
    main = lexicon_json.get("defs", {}).get("main")
    if isinstance(main, dict):
        return main.get("type")
    return None


def test_manifest_covers_all_lexicon_files() -> None:
    """Every JSON file in docs/lexicon must appear in the provision manifest."""
    manifest = _load_manifest()
    manifest_files = {entry["file"] for entry in manifest["upload_order"]}
    disk_files = {path.name for path in LEXICON_DIR.glob("*.json")}
    assert manifest_files == disk_files


def test_record_lexicons_require_backfill() -> None:
    """Record lexicons in the manifest must set backfill true (SRS-F-011.2)."""
    manifest = _load_manifest()
    for entry in manifest["upload_order"]:
        path = LEXICON_DIR / entry["file"]
        with path.open(encoding="utf-8") as handle:
            lexicon_json = json.load(handle)
        if _lexicon_type(lexicon_json) in RECORD_TYPES:
            assert entry.get("backfill") is True, entry["file"]


def test_query_and_procedure_lexicons_have_target_collection() -> None:
    """Query and procedure lexicons must declare target_collection in manifest."""
    manifest = _load_manifest()
    for entry in manifest["upload_order"]:
        path = LEXICON_DIR / entry["file"]
        with path.open(encoding="utf-8") as handle:
            lexicon_json = json.load(handle)
        lex_type = _lexicon_type(lexicon_json)
        if lex_type in QUERY_PROCEDURE_TYPES:
            assert entry.get("target_collection"), entry["file"]


@pytest.mark.parametrize(
    "filename",
    sorted(path.name for path in LEXICON_DIR.glob("*.json")),
)
def test_lexicon_json_structure(filename: str) -> None:
    """Each lexicon file must be valid JSON with lexicon version and NSID."""
    path = LEXICON_DIR / filename
    with path.open(encoding="utf-8") as handle:
        data = json.load(handle)
    assert data.get("lexicon") == 1
    assert data.get("id", "").startswith(f"{NAMESPACE}.")
    assert "defs" in data


def test_photo_record_cbor_size_headroom() -> None:
    """Photo metadata with blob refs should stay well under 1 MiB (SRS-TC-005)."""
    path = LEXICON_DIR / "net.atpix.gallery.photo.json"
    with path.open(encoding="utf-8") as handle:
        photo_lexicon = json.load(handle)

    sample_record = {
        "title": "x" * 500,
        "description": "y" * 5000,
        "caption": "z" * 2000,
        "keywords": ["tag"] * 50,
        "image": {"$type": "blob", "ref": {"$link": "b" * 59}, "mimeType": "image/jpeg", "size": 1},
        "createdAt": "2026-07-13T12:00:00.000Z",
        "visibility": "public",
    }
    # DAG-CBOR is the atproto record wire format; cbor2 approximates encoded size for headroom.
    encoded = cbor2.dumps(sample_record)
    assert len(encoded) < 1024 * 1024
    assert photo_lexicon["defs"]["main"]["type"] == "record"
