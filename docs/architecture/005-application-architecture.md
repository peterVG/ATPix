# Architecture Decision Record - ATPix

**005-application-architecture.md**

## Title

Monorepo layout: Vanilla JS frontend, FastAPI auxiliary backend, HappyView App View

## Status

Accepted

## Context / Requirement Reference

[docs/prd.md](../prd.md) Technology Stack and TC-001: gallery XRPC, OAuth, and indexing MUST run on **HappyView**, not a custom App View. Frontend uses vanilla HTML/CSS/JS with `@happyview/lex-agent` and `@happyview/oauth-client-browser`. C2PA claim generation/validation (F-012–F-016) suits a Python auxiliary API.

## Decision

- **`apps/frontend/`:** Vite-bundled vanilla JS; talks to HappyView for atproto XRPC; optional calls to auxiliary API for C2PA.
- **`apps/backend/`:** FastAPI service on port 8000 for health, future C2PA endpoints, stdout logging.
- **HappyView:** External service (not in this repo); configured via `HAPPYVIEW_URL` / `VITE_HAPPYVIEW_URL`.

## Rationale

Honors PRD constraint against custom App View servers while satisfying the Open Agent Dev Python/JS monorepo pattern. Vite enables production builds required for UI test mandates.

## Assumptions

HappyView instance is provisioned separately with `net.atpix.gallery.*` lexicons uploaded.

## Alternatives Considered

- **Next.js/React frontend:** PRD lists as optional via future ADR; vanilla JS chosen for v1.
- **Elixir/Phoenix umbrella:** Rejected; user selected Python/JS init skill.

## Consequences / Implications

Frontend developers must understand HappyView vs backend boundaries. Two dev servers (5173 + external HappyView) during local work.

## Related Decisions / Notes

[003-observability-stack.md](./003-observability-stack.md), [Product terms mapping](../prd.md#product-terms--at-protocol-primitives) when PRD is present on branch.