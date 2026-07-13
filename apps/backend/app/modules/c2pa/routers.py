"""C2PA auxiliary API routes.

Gallery XRPC traffic remains on HappyView; this module handles file-level C2PA work.
"""

import logging

from fastapi import APIRouter, File, Form, Header, HTTPException, UploadFile
from fastapi.responses import Response

from app.modules.c2pa.auth import resolve_authenticated_creator_did
from app.modules.c2pa.constants import MAX_EMBED_BYTES, SUPPORTED_EMBED_MIME_TYPES
from app.modules.c2pa.schemas import C2paEmbedMetadata, C2paStatusResponse
from app.modules.c2pa.service import C2paServiceError, embed_manifest, summarize_manifest
from app.modules.c2pa.signer import C2paSigningNotConfiguredError, is_signing_configured

router = APIRouter(prefix="/c2pa", tags=["c2pa"])
logger = logging.getLogger(__name__)


async def _read_upload_with_limit(upload: UploadFile, max_bytes: int) -> bytes:
    """Read an upload stream up to `max_bytes + 1` bytes.

    Args:
        upload: Incoming multipart file stream.
        max_bytes: Maximum allowed payload size.

    Returns:
        Buffered upload bytes when within the configured limit.

    Raises:
        HTTPException: When the upload exceeds `max_bytes`.
    """
    chunks: list[bytes] = []
    total = 0
    limit = max_bytes + 1

    while True:
        chunk = await upload.read(64 * 1024)
        if not chunk:
            break

        total += len(chunk)
        if total > limit:
            raise HTTPException(status_code=413, detail="Image exceeds maximum C2PA embed size")

        chunks.append(chunk)

    return b"".join(chunks)


@router.get("/status", response_model=C2paStatusResponse)
def read_c2pa_status() -> C2paStatusResponse:
    """Report C2PA claim-generator readiness.

    Returns:
        C2paStatusResponse describing active C2PA 2.2 support.
    """
    return C2paStatusResponse(ready=is_signing_configured())


@router.post("/manifest/embed")
async def embed_upload_manifest(
    file: UploadFile = File(...),  # noqa: B008
    creator_did: str = Form(...),
    include_gps: bool = Form(False),
    include_device: bool = Form(False),
    authorization: str | None = Header(default=None),
) -> Response:
    """Embed a signed C2PA manifest into an uploaded JPEG or PNG.

    Args:
        file: Image upload bytes.
        creator_did: Uploader atproto DID for the custom assertion.
        include_gps: Whether optional GPS metadata may be embedded.
        include_device: Whether optional device metadata may be embedded.
        authorization: Bearer access token binding the request to the uploader DID.

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

    verified_did = await resolve_authenticated_creator_did(
        authorization=authorization,
        creator_did=creator_did,
    )

    image_bytes = await _read_upload_with_limit(file, MAX_EMBED_BYTES)
    if not image_bytes:
        raise HTTPException(status_code=400, detail="Empty upload payload")

    try:
        signed_bytes = embed_manifest(
            image_bytes,
            mime_type,
            verified_did,
            include_gps=include_gps,
            include_device=include_device,
        )
        summary = summarize_manifest(signed_bytes, mime_type)
    except C2paServiceError as error:
        logger.warning("C2PA embed failed: %s", error)
        raise HTTPException(status_code=400, detail=str(error)) from error
    except C2paSigningNotConfiguredError as error:
        logger.error("C2PA signing is not configured: %s", error)
        raise HTTPException(status_code=503, detail=str(error)) from error

    metadata = C2paEmbedMetadata(
        first_action=summary.first_action or "",
        creator_did=summary.creator_did or verified_did,
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
