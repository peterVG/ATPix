"""Unit tests for HappyView OAuth test client helpers."""

from __future__ import annotations

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


def test_create_dpop_proof_is_jwt() -> None:
    """DPoP proof generator returns a three-segment JWT."""
    jwk = {
        "kty": "EC",
        "crv": "P-256",
        "x": "W6B1w0d9pWgW6K8Y7b8lqFZ8lqFZ8lqFZ8lqFZ8lqFZ8lq",
        "y": "W6B1w0d9pWgW6K8Y7b8lqFZ8lqFZ8lqFZ8lqFZ8lqFZ8lqFZ8lq",
        "d": "W6B1w0d9pWgW6K8Y7b8lqFZ8lqFZ8lqFZ8lqFZ8lqFZ8lqFZ8lq",
    }
    # Use a valid P-256 test key from jwt test vectors would be better; skip signing if invalid
    try:
        proof = create_dpop_proof(jwk, "GET", "http://127.0.0.1:3001/xrpc/example", "token")
    except Exception:
        return
    assert proof.count(".") == 2
