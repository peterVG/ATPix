"""OAuth identity binding for C2PA embed requests."""

from __future__ import annotations

import logging

import httpx
from fastapi import HTTPException

from app.core.config import settings

logger = logging.getLogger(__name__)


class C2paAuthError(Exception):
    """Raised when an embed request lacks a verified uploader identity."""


async def verify_access_token(access_token: str) -> str:
    """Resolve the authenticated atproto DID from a bearer access token.

    Args:
        access_token: OAuth access token issued by the user's PDS.

    Returns:
        Verified account DID for the active session.

    Raises:
        C2paAuthError: When the token is missing, invalid, or expired.
    """
    happyview_url = settings.happyview_url.rstrip("/")
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(
                f"{happyview_url}/xrpc/com.atproto.server.getSession",
                headers={"Authorization": f"Bearer {access_token}"},
            )
    except httpx.HTTPError as error:
        logger.warning("C2PA auth session lookup failed: %s", error)
        raise C2paAuthError("Unable to verify access token") from error

    if response.status_code != 200:
        raise C2paAuthError("Invalid or expired access token")

    payload = response.json()
    did = payload.get("did")
    if not isinstance(did, str) or not did.strip():
        raise C2paAuthError("Verified session did not include a DID")

    return did.strip()


async def resolve_authenticated_creator_did(
    authorization: str | None,
    creator_did: str | None,
) -> str:
    """Bind `creator_did` to a verified OAuth identity when auth is required.

    Args:
        authorization: Optional `Authorization: Bearer` header value.
        creator_did: Declared uploader DID from the multipart form.

    Returns:
        Verified creator DID to embed in the manifest assertion.

    Raises:
        HTTPException: When auth is required and verification fails.
    """
    declared_did = (creator_did or "").strip()
    if not settings.c2pa_require_auth:
        if not declared_did:
            raise HTTPException(status_code=400, detail="creator_did is required")
        return declared_did

    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization bearer token is required")

    token = authorization.removeprefix("Bearer ").strip()
    if not token:
        raise HTTPException(status_code=401, detail="Authorization bearer token is required")

    try:
        verified_did = await verify_access_token(token)
    except C2paAuthError as error:
        raise HTTPException(status_code=401, detail=str(error)) from error

    if declared_did and declared_did != verified_did:
        raise HTTPException(
            status_code=403,
            detail="creator_did does not match authenticated identity",
        )

    return verified_did
