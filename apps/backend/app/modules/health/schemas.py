"""Pydantic schemas for health endpoints."""

from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    """Health probe payload returned by ``GET /health``.

    Attributes:
        status: Service liveness indicator.
        service: Application identifier.
    """

    status: str = Field(examples=["ok"])
    service: str = Field(examples=["atpix-backend"])
