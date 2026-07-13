# Implementation Plan: ATPix Backend (`apps/backend/`)

Granular checklist for the FastAPI auxiliary service (C2PA, health, integration verification). Global sequencing: [docs/plan.md](../../../docs/plan.md).

**Stack:** FastAPI · pytest · behave · locust · Allure ([ADR-005](../../../docs/architecture/005-application-architecture.md), [ADR-008](../../../docs/architecture/008-c2pa-sdk-and-signing.md))

**Scope boundary:** Gallery XRPC, OAuth, and indexing remain on **HappyView**—not implemented in this module ([ADR-007](../../../docs/architecture/007-happyview-app-view-integration.md)).

**SRS source:** [docs/srs.md](../../../docs/srs.md) (no module-local srs.md)

---

## Phase BE-1: Project Foundation

- [ ] **Task BE-1.1: Backend scaffold, logging, and health verification**
  - **Description:** Verify FastAPI app structure, stdout logging per [ADR-003](../../../docs/architecture/003-observability-stack.md), `/health` endpoint, ruff/black, pytest + behave + Allure wiring.
  - **Estimated Time:** 2 hours
  - **Dependencies:** None
  - **Related Requirements:** [NFR-004](../../../docs/prd.md#nfr-004-observability-and-logging), [NFR-006](../../../docs/prd.md#nfr-006-testability-and-quality-gates), [SRS-NFR-004](../../../docs/srs.md#srs-nfr-004-observability-and-logging)
  - **Related Tests:** [`test_health.py`](../tests/unit/test_health.py), [`test_health_api.py`](../tests/integration/test_health_api.py)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task BE-1.1. Work strictly in apps/backend/. Run ruff check, pytest. Generate apps/backend/docs/tasks/Task-BE-1.1-Walkthrough.md. Check off plan. Commit and push.`

- [ ] **Task BE-1.2: C2PA module scaffold expansion**
  - **Description:** Expand `app/modules/c2pa/` with service interfaces for generate, update, validate per [ADR-008](../../../docs/architecture/008-c2pa-sdk-and-signing.md). Add `c2pa` SDK to requirements.txt when selected.
  - **Estimated Time:** 3 hours
  - **Dependencies:** Task BE-1.1
  - **Related Requirements:** [F-012](../../../docs/prd.md#f-012-c2pa-manifest-generation-on-upload), [SRS-F-012](../../../docs/srs.md#srs-f-012-c2pa-manifest-generation-on-upload)
  - **Related Tests:** [`c2pa_manifest_generation_SRS-F-012.feature`](../tests/features/c2pa_manifest_generation_SRS-F-012.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task BE-1.2. Module-only changes in apps/backend/. Invoke @feature-writer. Walkthrough, check off, commit, push.`

---

## Phase BE-2: HappyView Integration Verification

- [ ] **Task BE-2.1: Lexicon publication integration tests**
  - **Description:** Behave scenarios verifying `net.atpix.gallery.*` lexicons uploaded to HappyView, backfill enabled, cross-DID `listPhotos` returns records (RC-006).
  - **Estimated Time:** 4 hours
  - **Dependencies:** Task BE-1.1; global Task 1.2
  - **Related Requirements:** [F-011](../../../docs/prd.md#f-011-lexicon-publication-and-network-indexing), [TC-005](../../../docs/prd.md#tc-005-record-size-discipline), [SRS-F-011](../../../docs/srs.md#srs-f-011-lexicon-publication-and-network-indexing)
  - **Related Tests:** [`lexicon_publication_SRS-F-011.feature`](../tests/features/lexicon_publication_SRS-F-011.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task BE-2.1. Integration tests against live HappyView in apps/backend/. behave + Allure. Walkthrough with CLI output. Check off, commit, push.`

- [ ] **Task BE-2.2: HappyView-only sync boundary test**
  - **Description:** Verify ATPix repo contains no relay firehose subscribers or custom PDS crawlers; discovery relies on HappyView Jetstream + backfill only.
  - **Estimated Time:** 2 hours
  - **Dependencies:** Task BE-2.1
  - **Related Requirements:** [TC-012](../../../docs/prd.md#tc-012-happyview-only-network-sync), [SRS-TC-012](../../../docs/srs.md#technical-constraints)
  - **Related Tests:** [`happyview_only_sync_SRS-TC-012.feature`](../tests/features/happyview_only_sync_SRS-TC-012.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task BE-2.2. Static analysis + integration proof. Walkthrough, check off, commit, push.`

- [ ] **Task BE-2.3: Authentication security integration tests**
  - **Description:** Verify no app passwords, no `hv_*` admin keys on XRPC, DPoP session requirements documented for frontend contract.
  - **Estimated Time:** 2 hours
  - **Dependencies:** Task BE-2.1
  - **Related Requirements:** [NFR-003](../../../docs/prd.md#nfr-003-authentication-security), [SRS-NFR-003](../../../docs/srs.md#srs-nfr-003-authentication-security)
  - **Related Tests:** [`authentication_security_SRS-NFR-003.feature`](../tests/features/authentication_security_SRS-NFR-003.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task BE-2.3. Walkthrough, check off, commit, push.`

---

## Phase BE-3: C2PA Manifest Generation

- [ ] **Task BE-3.1: C2PA manifest generation on upload**
  - **Description:** Implement POST endpoint embedding C2PA 2.2 manifest in JPEG/PNG per Appendix A; `c2pa.created` first action; `net.atpix.gallery.creatorDid` assertion; return manifest-bearing bytes for frontend `uploadBlob`.
  - **Estimated Time:** 12 hours
  - **Dependencies:** Task BE-1.2
  - **Related Requirements:** [F-012](../../../docs/prd.md#f-012-c2pa-manifest-generation-on-upload), [TC-009](../../../docs/prd.md#tc-009-c2pa-manifest-embedding), [TC-010](../../../docs/prd.md#tc-010-c2pa-actions-integrity), [NFR-014](../../../docs/prd.md#nfr-014-c2pa-22-conformance), [SRS-F-012](../../../docs/srs.md#srs-f-012-c2pa-manifest-generation-on-upload)
  - **Related Tests:** [`c2pa_manifest_generation_SRS-F-012.feature`](../tests/features/c2pa_manifest_generation_SRS-F-012.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task BE-3.1. C2PA SDK in apps/backend/ only. Signing keys via env secrets. Invoke @feature-writer. pytest + behave + Allure. Walkthrough, check off, commit, push.`

---

## Phase BE-4: Permissioned Spaces Integration

- [ ] **Task BE-4.1: Permissioned spaces end-to-end integration**
  - **Description:** Behave suite against HappyView `com.atproto.simplespace.*` and `com.atproto.space.*`: createSpace with `appAccess`/`config`, invite/acceptInvite, space record writes, `getBlob`, credential flow, index isolation, FeatureDisabled when flag off. Validates RC-007, SRS-F-008.1–008.4.
  - **Estimated Time:** 10 hours
  - **Dependencies:** Task BE-2.1; global Task 1.2
  - **Related Requirements:** [F-008](../../../docs/prd.md#f-008-permissioned-gallery--album-access-happyview-permissioned-spaces-validation), [TC-004](../../../docs/prd.md#tc-004-repo-vs-space-storage-model), [TC-008](../../../docs/prd.md#tc-008-permissioned-spaces-feature-flag), [NFR-013](../../../docs/prd.md#nfr-013-permissioned-spaces-reference-validation), [SRS-F-008](../../../docs/srs.md#srs-f-008-permissioned-album-access-happyview-spaces), [ADR-010](../../../docs/architecture/010-permissioned-spaces-storage.md)
  - **Related Tests:** [`permissioned_spaces_integration_SRS-F-008.feature`](../tests/features/permissioned_spaces_integration_SRS-F-008.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task BE-4.1. Multi-account HappyView integration in apps/backend/tests/. feature.spaces_enabled=true. Document flag status per NFR-013. Walkthrough with raw behave output. Check off, commit, push.`

---

## Phase BE-6: C2PA Edit, Validation & Ingredients

- [ ] **Task BE-6.1: C2PA edit provenance and validation API**
  - **Description:** Endpoints for manifest update on caption edit (`c2pa.edited.metadata`), validation Levels 1–3, ingredient/derivative chain (F-015), trust list configuration API (F-016).
  - **Estimated Time:** 12 hours
  - **Dependencies:** Task BE-3.1
  - **Related Requirements:** [F-013](../../../docs/prd.md#f-013-c2pa-provenance-on-edit-and-publish) through [F-016](../../../docs/prd.md#f-016-c2pa-trust-configuration), [SRS-F-013](../../../docs/srs.md#srs-f-013-c2pa-provenance-on-edit-and-publish) through [SRS-F-016](../../../docs/srs.md#srs-f-016-c2pa-trust-configuration)
  - **Related Tests:** [`c2pa_provenance_edit_SRS-F-013.feature`](../tests/features/c2pa_provenance_edit_SRS-F-013.feature), [`c2pa_ingredient_handling_SRS-F-015.feature`](../tests/features/c2pa_ingredient_handling_SRS-F-015.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task BE-6.1. No Appendix C deprecated constructs. Walkthrough, check off, commit, push.`

---

## Phase BE-7: Non-Functional Verification & Performance

- [ ] **Task BE-7.1: Data ownership and observability verification**
  - **Description:** Integration tests confirming blobs on PDS, permissioned records in space, stdout-only logging visible in Loki path, RC-005 observability baseline.
  - **Estimated Time:** 4 hours
  - **Dependencies:** Task BE-4.1
  - **Related Requirements:** [NFR-001](../../../docs/prd.md#nfr-001-data-ownership-and-verifiability), [NFR-004](../../../docs/prd.md#nfr-004-observability-and-logging), [RC-005](../../../docs/prd.md#rc-005-observability-baseline), [SRS-NFR-001](../../../docs/srs.md#srs-nfr-001-data-ownership-and-verifiability)
  - **Related Tests:** [`data_ownership_SRS-NFR-001.feature`](../tests/features/data_ownership_SRS-NFR-001.feature), [`observability_logging_SRS-NFR-004.feature`](../tests/features/observability_logging_SRS-NFR-004.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task BE-7.1. docker compose observability stack for proof. Walkthrough, check off, commit, push.`

- [ ] **Task BE-7.2: Gallery query and C2PA validation performance tests**
  - **Description:** Locust load tests: gallery listPhotos p95 targets (NFR-011); C2PA validation ≤3s p95 for ≤10MB JPEG (NFR-017).
  - **Estimated Time:** 4 hours
  - **Dependencies:** Task BE-7.1
  - **Related Requirements:** [NFR-011](../../../docs/prd.md#nfr-011-gallery-query-performance), [NFR-017](../../../docs/prd.md#nfr-017-c2pa-validation-performance)
  - **Related Tests:** [`gallery_query_performance_SRS-NFR-011.feature`](../tests/features/gallery_query_performance_SRS-NFR-011.feature), [`c2pa_validation_performance_SRS-NFR-017.feature`](../tests/features/c2pa_validation_performance_SRS-NFR-017.feature), [`locust_c2pa.py`](../tests/performance/locust_c2pa.py)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task BE-7.2. Run locust from apps/backend/tests/performance/. Document p95 in walkthrough. Check off global docs/plan.md Task 7.2. Commit and push.`

- [ ] **Task BE-7.3: Zero-friction setup verification**
  - **Description:** Verify venv init, requirements install, uvicorn start, and `.env` template detection per NFR-007.
  - **Estimated Time:** 2 hours
  - **Dependencies:** Task BE-7.1
  - **Related Requirements:** [NFR-007](../../../docs/prd.md#nfr-007-zero-friction-local-setup), [SRS-NFR-007](../../../docs/srs.md#srs-nfr-007-zero-friction-local-setup)
  - **Related Tests:** [`zero_friction_setup_SRS-NFR-007.feature`](../tests/features/zero_friction_setup_SRS-NFR-007.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task BE-7.3. Fresh venv test. Walkthrough, check off, commit, push.`

---

## Summary Timeline

- **Total Estimated Time:** ~47 hours
- **Critical Path:** BE-1 → BE-2 (HappyView verify) → BE-3 (C2PA generate) → BE-4.1 (spaces integration) → BE-6 (C2PA validate) → BE-7 (NFR/perf)