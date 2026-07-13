# Architecture Decision Record - ATPix

**007-happyview-app-view-integration.md**

## Title

HappyView as sole App View for indexing, OAuth proxy, and XRPC

## Status

Accepted

## Context / Requirement Reference

[docs/overview/002-prd.md](../overview/002-prd.md) TC-001 and TC-012 prohibit custom App View servers and standalone firehose consumers. F-010, F-011, and the Gallery Population Model require Jetstream + backfill via HappyView. [docs/overview/003-srs.md](../overview/003-srs.md) SRS-TC-001 and SRS-TC-012.

## Decision

- **External service:** HappyView runs outside this monorepo (default dev port **3001**; Grafana uses 3000 in compose).
- **Responsibilities:** Lexicon registration, record indexing (SQLite/Postgres), OAuth write proxy, XRPC routing, Jetstream ingestion, network backfill, Permissioned Spaces (when `feature.spaces_enabled`).
- **ATPix scope:** Frontend calls HappyView XRPC; backend FastAPI handles C2PA only—not gallery aggregation.
- **Sync boundary:** ATPix MUST NOT subscribe to relay firehose or operate custom PDS crawlers.

## Rationale

Months of App View infrastructure are delegated to HappyView per product vision. PRD v1.5 explicitly validates Permissioned Spaces (F-008) on HappyView experimental APIs.

## Assumptions

Operators deploy HappyView with `net.atpix.gallery.*` lexicons uploaded (`backfill: true`). Local dev uses documented HappyView setup from [happyview.dev](https://happyview.dev).

## Alternatives Considered

- **Custom Rust/Go App View:** Rejected per TC-001.
- **Direct PDS scraping for discovery:** Rejected per F-010 and TC-012.

## Consequences / Implications

Two runtime dependencies in dev (frontend + HappyView). Integration tests require a running HappyView instance or test containers. Port 3001 reserved for HappyView.

## Related Decisions / Notes

[005-application-architecture.md](./005-application-architecture.md), [010-permissioned-spaces-storage.md](./010-permissioned-spaces-storage.md), [009-lexicon-namespace-authority.md](./009-lexicon-namespace-authority.md)