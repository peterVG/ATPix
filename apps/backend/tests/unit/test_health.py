"""Unit tests for health response models."""

from app.modules.health.schemas import HealthResponse


def test_health_response_defaults() -> None:
    """HealthResponse exposes ok status and service name."""
    payload = HealthResponse(status="ok", service="atpix-backend")
    assert payload.status == "ok"
    assert payload.service == "atpix-backend"
