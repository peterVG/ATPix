"""HappyView DPoP OAuth client for multi-account integration tests (BE-4.1)."""

from __future__ import annotations

import base64
import hashlib
import json
import os
import time
import uuid
from dataclasses import dataclass
from typing import Any
from urllib.error import HTTPError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

import jwt
from cryptography.hazmat.primitives.asymmetric.ec import EllipticCurvePrivateKey
from jwt.algorithms import ECAlgorithm


@dataclass
class TestAccountSession:
    """Stored OAuth session for a test atproto account."""

    label: str
    did: str
    access_token: str
    refresh_token: str
    dpop_jwk: dict[str, Any]
    pds_url: str
    issuer: str


def _normalize_origin(origin: str) -> str:
    """Strip trailing slashes from a deployment origin."""
    return origin.rstrip("/")


def _loopback_client_id(origin: str) -> str:
    """Build loopback OAuth client_id matching ATPix frontend convention."""
    from urllib.parse import quote

    redirect = f"{origin}/oauth/callback"
    return f"http://localhost/oauth/callback?redirect_uri={quote(redirect, safe='')}"


def resolve_oauth_client_id(deployment_origin: str) -> str:
    """Resolve ATPix OAuth client_id for space appAccess allowList."""
    origin = _normalize_origin(deployment_origin)
    if origin.startswith("http://127.0.0.1") or origin.startswith("http://localhost"):
        return _loopback_client_id(origin)
    return f"{origin}/oauth-client-metadata.json"


def build_space_app_access(deployment_origin: str) -> dict[str, Any]:
    """Build ADR-010 appAccess payload for permissioned album spaces."""
    return {"type": "allowList", "allowed": [resolve_oauth_client_id(deployment_origin)]}


def build_space_config() -> dict[str, bool]:
    """Build ADR-010 space config for permissioned albums."""
    return {"membershipPublic": False, "recordsPublic": False}


def _load_jwk(raw: str) -> dict[str, Any]:
    """Parse a DPoP private JWK from JSON text."""
    payload = json.loads(raw)
    if not isinstance(payload, dict) or "d" not in payload:
        raise ValueError("TEST_*_DPOP_JWK must be a JSON EC private JWK")
    return payload


def load_test_account(prefix: str) -> TestAccountSession | None:
    """Load a test account session from environment variables."""
    did = os.environ.get(f"{prefix}_DID", "").strip()
    access = os.environ.get(f"{prefix}_ACCESS_TOKEN", "").strip()
    refresh = os.environ.get(f"{prefix}_REFRESH_TOKEN", "").strip()
    jwk_raw = os.environ.get(f"{prefix}_DPOP_JWK", "").strip()
    pds_url = os.environ.get(f"{prefix}_PDS_URL", "").strip()
    issuer = os.environ.get(f"{prefix}_ISSUER", pds_url).strip()

    if not all([did, access, refresh, jwk_raw, pds_url]):
        return None

    return TestAccountSession(
        label=prefix.lower().replace("test_", ""),
        did=did,
        access_token=access,
        refresh_token=refresh,
        dpop_jwk=_load_jwk(jwk_raw),
        pds_url=pds_url.rstrip("/"),
        issuer=issuer.rstrip("/"),
    )


def test_accounts_configured() -> bool:
    """Return True when owner and member test sessions are available."""
    owner = load_test_account("TEST_OWNER") is not None
    member = load_test_account("TEST_MEMBER") is not None
    return owner and member


def _public_jwk(private_jwk: dict[str, Any]) -> dict[str, Any]:
    """Return public JWK fields for DPoP proof header."""
    return {key: private_jwk[key] for key in ("kty", "crv", "x", "y") if key in private_jwk}


def _private_key(private_jwk: dict[str, Any]) -> EllipticCurvePrivateKey:
    """Load an EC private key from a JWK dict."""
    return ECAlgorithm.from_jwk(json.dumps(private_jwk))


def create_dpop_proof(
    private_jwk: dict[str, Any],
    method: str,
    url: str,
    access_token: str | None = None,
) -> str:
    """Create a DPoP proof JWT for an HTTP request."""
    headers = {"typ": "dpop+jwt", "alg": "ES256", "jwk": _public_jwk(private_jwk)}
    payload: dict[str, Any] = {
        "jti": str(uuid.uuid4()),
        "htm": method.upper(),
        "htu": url,
        "iat": int(time.time()),
    }

    if access_token:
        digest = hashlib.sha256(access_token.encode("utf-8")).digest()
        payload["ath"] = base64.urlsafe_b64encode(digest).rstrip(b"=").decode("ascii")

    key = _private_key(private_jwk)
    return jwt.encode(payload, key, algorithm="ES256", headers=headers)


def _http_json(
    url: str,
    *,
    method: str = "GET",
    headers: dict[str, str] | None = None,
    body: dict[str, Any] | None = None,
    timeout: float = 60.0,
) -> tuple[int, Any]:
    """Perform an HTTP request and parse JSON when present."""
    data = None
    request_headers = dict(headers or {})
    if body is not None:
        request_headers.setdefault("Content-Type", "application/json")
        data = json.dumps(body).encode("utf-8")

    request = Request(url, data=data, headers=request_headers, method=method)
    try:
        with urlopen(request, timeout=timeout) as response:
            raw = response.read().decode("utf-8")
            payload = json.loads(raw) if raw else None
            return response.status, payload
    except HTTPError as error:
        raw = error.read().decode("utf-8")
        try:
            payload = json.loads(raw) if raw else {"message": error.reason}
        except json.JSONDecodeError:
            payload = {"message": raw or error.reason}
        return error.code, payload


class HappyViewOAuthClient:
    """Make authenticated HappyView XRPC calls for a test account."""

    def __init__(
        self,
        session: TestAccountSession,
        *,
        happyview_url: str,
        client_key: str,
        deployment_origin: str,
    ) -> None:
        self.session = session
        self.happyview_url = happyview_url.rstrip("/")
        self.client_key = client_key
        self.deployment_origin = deployment_origin

    def _xrpc_url(self, method: str, params: dict[str, Any] | None = None) -> str:
        """Build an absolute XRPC URL."""
        base = f"{self.happyview_url}/xrpc/{method}"
        if not params:
            return base
        query = urlencode({key: value for key, value in params.items() if value is not None})
        return f"{base}?{query}"

    def xrpc(
        self,
        method: str,
        *,
        params: dict[str, Any] | None = None,
        body: dict[str, Any] | None = None,
        http_method: str | None = None,
    ) -> tuple[int, Any]:
        """Call a HappyView XRPC endpoint with DPoP authentication."""
        verb = http_method or ("POST" if body is not None else "GET")
        url = self._xrpc_url(method, params if verb == "GET" else None)
        proof = create_dpop_proof(
            self.session.dpop_jwk,
            verb,
            url,
            self.session.access_token,
        )
        headers = {
            "Accept": "application/json",
            "X-Client-Key": self.client_key,
            "Authorization": f"DPoP {self.session.access_token}",
            "DPoP": proof,
        }
        return _http_json(url, method=verb, headers=headers, body=body)

    def refresh_tokens(self) -> None:
        """Refresh the access token using the PDS token endpoint."""
        token_url = f"{self.session.pds_url}/oauth/token"
        proof = create_dpop_proof(self.session.dpop_jwk, "POST", token_url)
        body = {
            "grant_type": "refresh_token",
            "refresh_token": self.session.refresh_token,
            "client_id": resolve_oauth_client_id(self.deployment_origin),
        }
        status, payload = _http_json(
            token_url,
            method="POST",
            headers={
                "Content-Type": "application/json",
                "DPoP": proof,
            },
            body=body,
        )
        if status >= 400 or not isinstance(payload, dict) or "access_token" not in payload:
            message = payload.get("message", payload) if isinstance(payload, dict) else payload
            raise RuntimeError(f"Token refresh failed for {self.session.did}: {message}")

        self.session.access_token = payload["access_token"]
        if payload.get("refresh_token"):
            self.session.refresh_token = payload["refresh_token"]
