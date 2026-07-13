# Architecture Decision Record - ATPix

**011-sqlite-index-database.md**

## Title

SQLite for HappyView App View index in development

## Status

Accepted

## Context / Requirement Reference

[docs/overview/001-product-vision.md](../overview/001-product-vision.md) and [docs/overview/002-prd.md](../overview/002-prd.md) Technology Stack specify SQLite for dev index; Postgres MAY be used in production. NFR-009 and NFR-010 favor minimal dependencies and scale-to-zero. NFR-011 sets gallery query performance targets against single-instance SQLite.

## Decision

- **Development:** HappyView App View uses **SQLite** as the local index database (managed by HappyView, not `apps/backend/`).
- **Production:** Postgres MAY replace SQLite for HappyView production deployments; choice requires ops justification if always-on cost increases.
- **ATPix backend:** FastAPI service remains stateless regarding gallery index; no duplicate gallery database in monorepo v1.
- **Performance baseline:** NFR-011 (2s p95 first page) and RC-002 verified against ≤10k records on single HappyView + SQLite.

## Rationale

SQLite minimizes local dev friction (NFR-007) and aligns with product vision technical stack. Gallery data authority remains user PDS repos (NFR-001); index is a cache/copy.

## Assumptions

HappyView auto-provisions SQLite on first start. Production scale triggers Postgres migration via HappyView deployment docs, not ATPix code changes.

## Alternatives Considered

- **Dedicated Postgres in dev compose:** Rejected for v1; adds setup friction contrary to zero-friction mandate.
- **ATPix-owned index DB:** Rejected; violates TC-001 (indexing on HappyView).

## Consequences / Implications

Performance tests target HappyView SQLite locally. Production ADR update may be needed if Postgres becomes mandatory. Locust scenarios in `apps/backend/tests/performance/` reference this baseline.

## Related Decisions / Notes

[007-happyview-app-view-integration.md](./007-happyview-app-view-integration.md), [NFR-010 scale-to-zero](../overview/002-prd.md#nfr-010-scale-to-zero-orientation), [`gallery_query_performance_SRS-NFR-011.feature`](../../apps/backend/tests/features/gallery_query_performance_SRS-NFR-011.feature)