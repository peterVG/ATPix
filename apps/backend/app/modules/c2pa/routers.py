"""C2PA auxiliary API routes.

Gallery XRPC traffic remains on HappyView; this module handles file-level C2PA work.
"""

import logging

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import Response

from app.modules.c2pa.constants import SUPPORTED_EMBED_MIME_TYPES
from app.modules.c2pa.schemas import C2paEmbedMetadata, C2paStatusResponse
from app.modules.c2pa.service import C2paServiceError, embed_manifest, summarize_manifest

router = APIRouter(prefix="/c2pa", tags=["c2pa"])
logger = logging.getLogger(__name__)


@router.get("/status", response_model=C2paStatusResponse)
def read_c2pa_status() -> C2paStatusResponse:
    """Report C2PA claim-generator readiness.

    Returns:
        C2paStatusResponse describing active C2PA 2.2 support.
    """
    return C2paStatusResponse()


@router.post("/manifest/embed")
async def embed_upload_manifest(
    file: UploadFile = File(...),  # noqa: B008
    creator_did: str = Form(...),
    include_gps: bool = Form(False),
    include_device: bool = Form(False),
) -> Response:
    """Embed a signed C2PA manifest into an uploaded JPEG or PNG.

    Args:
        file: Image upload bytes.
        creator_did: Uploader atproto DID for the custom assertion.
        include_gps: Whether optional GPS metadata may be embedded.
        include_device: Whether optional device metadata may be embedded.

    Returns:
        Signed image bytes with response metadata headers.

    Raises:
        HTTPException: When validation or signing fails.
    """
    mime_type = file.content_type or ""
    if mime_type not in SUPPORTED_EMBED_MIME_TYPES:
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported content type: {mime_type or 'unknown'}",
        )

    image_bytes = await file.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="Empty upload payload")

    try:
        signed_bytes = embed_manifest(
            image_bytes,
            mime_type,
            creator_did,
            include_gps=include_gps,
            include_device=include_device,
        )
        summary = summarize_manifest(signed_bytes, mime_type)
    except C2paServiceError as error:
        logger.warning("C2PA embed failed: %s", error)
        raise HTTPException(status_code=400, detail=str(error)) from error

    metadata = C2paEmbedMetadata(
        first_action=summary.first_action or "",
        creator_did=summary.creator_did or creator_did,
        embedded=summary.embedded,
        byte_size=len(signed_bytes),
    )

    return Response(
        content=signed_bytes,
        media_type=mime_type,
        headers={
            "X-C2PA-First-Action": metadata.first_action,
            "X-C2PA-Creator-Did": metadata.creator_did,
            "X-C2PA-Embedded": "true" if metadata.embedded else "false",
            "X-C2PA-Byte-Size": str(metadata.byte_size),
        },
    )
