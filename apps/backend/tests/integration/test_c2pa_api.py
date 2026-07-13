"""Integration tests for C2PA HTTP endpoints."""

from pathlib import Path

from fastapi.testclient import TestClient

from app.main import app

FIXTURES = Path(__file__).resolve().parents[1] / "fixtures" / "c2pa"


def test_c2pa_status_reports_ready_generator() -> None:
    """GET /c2pa/status reports an active claim generator."""
    client = TestClient(app)
    response = client.get("/c2pa/status")

    assert response.status_code == 200
    body = response.json()
    assert body["module"] == "c2pa"
    assert body["ready"] is True
    assert body["spec_version"] == "2.2"
    assert "image/jpeg" in body["supported_mime_types"]


def test_manifest_embed_returns_signed_jpeg_bytes() -> None:
    """POST /c2pa/manifest/embed returns manifest-bearing JPEG bytes."""
    client = TestClient(app)
    source = (FIXTURES / "A.jpg").read_bytes()

    with Path(FIXTURES / "A.jpg").open("rb") as handle:
        response = client.post(
            "/c2pa/manifest/embed",
            data={"creator_did": "did:plc:api-test"},
            files={"file": ("A.jpg", handle, "image/jpeg")},
        )

    assert response.status_code == 200
    assert response.headers["content-type"].startswith("image/jpeg")
    assert response.headers["X-C2PA-First-Action"] == "c2pa.created"
    assert response.headers["X-C2PA-Creator-Did"] == "did:plc:api-test"
    assert response.headers["X-C2PA-Embedded"] == "true"
    assert len(response.content) > len(source)


def test_manifest_embed_rejects_unsupported_mime_type() -> None:
    """POST /c2pa/manifest/embed rejects unsupported content types."""
    client = TestClient(app)

    response = client.post(
        "/c2pa/manifest/embed",
        data={"creator_did": "did:plc:api-test"},
        files={"file": ("notes.txt", b"hello", "text/plain")},
    )

    assert response.status_code == 415
