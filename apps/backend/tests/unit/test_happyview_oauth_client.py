"""Unit tests for HappyView OAuth test client helpers."""

from __future__ import annotations

import base64

from cryptography.hazmat.primitives.asymmetric import ec

from tests.support.happyview_oauth_client import (
    build_space_app_access,
    build_space_config,
    create_dpop_proof,
    resolve_oauth_client_id,
)


def test_resolve_loopback_client_id() -> None:
    """Loopback deployment origin uses atproto loopback client-id convention."""
    client_id = resolve_oauth_client_id("http://127.0.0.1:5173")
    assert client_id.startswith("http://localhost/oauth/callback?redirect_uri=")
    assert "127.0.0.1" in client_id


def test_build_space_app_access_allow_list() -> None:
    """ADR-010 appAccess allowList references OAuth client metadata URL."""
    origin = "https://app.example.com"
    app_access = build_space_app_access(origin)
    assert app_access == {
        "type": "allowList",
        "allowed": ["https://app.example.com/oauth-client-metadata.json"],
    }


def test_build_space_config_gated_defaults() -> None:
    """Permissioned album spaces default to private membership and records."""
    assert build_space_config() == {"membershipPublic": False, "recordsPublic": False}


def _int_to_b64url(value: int, length: int = 32) -> str:
    """Encode a P-256 coordinate or scalar as unpadded base64url."""
    return base64.urlsafe_b64encode(value.to_bytes(length, "big")).rstrip(b"=").decode("ascii")


def _generate_p256_jwk() -> dict[str, str]:
    """Build a valid ephemeral P-256 private JWK for DPoP signing tests."""
    private_key = ec.generate_private_key(ec.SECP256R1())
    numbers = private_key.private_numbers()
    public_numbers = numbers.public_numbers
    return {
        "kty": "EC",
        "crv": "P-256",
        "x": _int_to_b64url(public_numbers.x),
        "y": _int_to_b64url(public_numbers.y),
        "d": _int_to_b64url(numbers.private_value),
    }


def test_create_dpop_proof_is_jwt() -> None:
    """DPoP proof generator returns a three-segment JWT."""
    jwk = _generate_p256_jwk()
    proof = create_dpop_proof(jwk, "GET", "http://127.0.0.1:3001/xrpc/example", "token")
    assert proof.count(".") == 2
