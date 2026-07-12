"""C2PA auxiliary API routes.

Full manifest generation and validation will be implemented per PRD F-012–F-016.
Gallery XRPC traffic remains on HappyView; this module handles file-level C2PA work.
"""

from fastapi import APIRouter

from app.modules.c2pa.schemas import C2paStatusResponse

router = APIRouter(prefix="/c2pa", tags=["c2pa"])


@router.get("/status", response_model=C2paStatusResponse)
def read_c2pa_status() -> C2paStatusResponse:
    """Report C2PA module readiness without performing validation.

    Returns:
        C2paStatusResponse describing planned C2PA 2.2 support.
    """
    return C2paStatusResponse()
