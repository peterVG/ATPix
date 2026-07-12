"""Health check routes."""

from fastapi import APIRouter

from app.modules.health.schemas import HealthResponse

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
def read_health() -> HealthResponse:
    """Return a simple liveness response for orchestrators and smoke tests.

    Returns:
        HealthResponse with status ``ok``.
    """
    return HealthResponse(status="ok", service="atpix-backend")
