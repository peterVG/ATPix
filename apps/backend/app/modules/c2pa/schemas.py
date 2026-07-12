"""Schemas for C2PA auxiliary endpoints (F-012–F-016 implementation surface)."""

from pydantic import BaseModel, Field


class C2paStatusResponse(BaseModel):
    """Placeholder status for C2PA module readiness.

    Attributes:
        module: Module identifier.
        ready: Whether claim-generator/validator wiring is complete.
        spec_version: Target C2PA specification version.
    """

    module: str = Field(default="c2pa")
    ready: bool = Field(default=False)
    spec_version: str = Field(default="2.2")
