# Architecture Decision Record - ATPix

**008-c2pa-sdk-and-signing.md**

## Title

C2PA 2.2 claim generation and validation in FastAPI backend

## Status

Accepted

## Context / Requirement Reference

[docs/overview/002-prd.md](../overview/002-prd.md) F-012–F-016 and NFR-014 require C2PA 2.2 Content Credentials on JPEG/PNG uploads, edits, and validation UI. TC-009 mandates in-file manifest embedding by default. Technology Stack lists C2PA Rust/JS SDK as TBD. [docs/overview/003-srs.md](../overview/003-srs.md) SRS-F-012 through SRS-F-016, SRS-NFR-017.

## Decision

- **Service location:** `apps/backend/app/modules/c2pa/` exposes FastAPI endpoints for manifest generation, update signing, and validation (stub scaffolded at init; full SDK integration follows implementation plan).
- **Specification target:** C2PA Technical Specification **2.2** (2025-05-01); no Appendix C deprecated constructs.
- **Signing:** X.509 credentials with Extended Key Usage `c2pa-kp-claimSigning` (OID 1.3.6.1.4.1.62558.2.1). Development uses CAI test certificates; production uses org-issued certs via secure secret store.
- **Embedding:** Default path embeds manifest store in JPEG/PNG per Appendix A before `uploadBlob`.
- **Custom assertion:** `net.atpix.gallery.creatorDid` records uploader atproto DID in manifest assertion store.
- **Frontend role:** Calls backend C2PA API before upload; displays Level 1–3 validation per F-014; trust list UI per F-016.

## Rationale

C2PA operations are CPU-intensive and certificate-dependent—ill-suited for browser-only v1. Python backend aligns with init-python-js stack and keeps signing keys off the client. Separates file-level provenance from atproto record signing (TC-011).

## Assumptions

`c2pa` Python bindings (Rust core) or equivalent maintained SDK will be added to `requirements.txt` during C2PA implementation tasks. Signing keys are injected via environment/secrets, never committed.

## Alternatives Considered

- **Browser-only C2PA via WASM:** Rejected for v1; key management and performance concerns; backend centralizes signing policy.
- **Defer C2PA to post-v1:** Rejected; F-012–F-016 are mandatory v1 per PRD summary table.

## Consequences / Implications

Upload/edit flows require frontend → backend → HappyView sequence. Validation performance NFR-017 verified via locust scenarios. Dual provenance must be explained in UI.

## Related Decisions / Notes

[005-application-architecture.md](./005-application-architecture.md), [`c2pa_manifest_generation_SRS-F-012.feature`](../../apps/backend/tests/features/c2pa_manifest_generation_SRS-F-012.feature), [C2PA KB](../../.agents/kb/c2pa.md)