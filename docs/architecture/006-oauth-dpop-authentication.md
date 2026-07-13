# Architecture Decision Record - ATPix

**006-oauth-dpop-authentication.md**

## Title

atproto OAuth with DPoP-bound browser sessions

## Status

Accepted

## Context / Requirement Reference

[docs/overview/002-prd.md](../overview/002-prd.md) F-001 requires atproto OAuth (not app passwords). NFR-003 mandates DPoP-bound tokens and prohibits plaintext credential storage. TC-006 requires `X-Client-Key` on all XRPC. [docs/overview/003-srs.md](../overview/003-srs.md) SRS-F-001 and SRS-NFR-003 derive verification via frontend BDD and security integration tests.

## Decision

- **Client library:** `@happyview/oauth-client-browser` (v1.4.x) in `apps/frontend/` handles OAuth redirect, DPoP key provisioning, and token refresh.
- **Configuration:** `VITE_HAPPYVIEW_CLIENT_KEY` and `VITE_HAPPYVIEW_URL` in `.env` (see `.env.example`).
- **Write path:** All PDS mutations proxy through HappyView with DPoP + `X-Client-Key`; no custom auth server in `apps/backend/`.
- **Sign-out:** Revoke device DPoP session via client library; do not store passwords or app passwords in `localStorage`, logs, or HappyView SQLite.

## Rationale

HappyView is the designated OAuth proxy per TC-001. Browser DPoP aligns with atproto best practice and PRD security requirements without building bespoke session management.

## Assumptions

Developers register an ATPix API client in HappyView admin and obtain a non-admin client key. Users have PDS-backed accounts (TC-003).

## Alternatives Considered

- **App passwords:** Rejected; explicitly forbidden in PRD F-001.
- **Custom JWT auth server in FastAPI:** Rejected; duplicates HappyView OAuth proxy and violates TC-001.

## Consequences / Implications

Frontend owns all authentication UX. Backend C2PA endpoints remain separate and MUST NOT accept PDS credentials. Production HappyView SHOULD set `TOKEN_ENCRYPTION_KEY`.

## Related Decisions / Notes

[007-happyview-app-view-integration.md](./007-happyview-app-view-integration.md), [005-application-architecture.md](./005-application-architecture.md), [`oauth_sign_in_SRS-F-001.feature`](../../apps/frontend/tests/features/oauth_sign_in_SRS-F-001.feature)