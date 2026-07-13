# Implementation Plan: ATPix v1

This document is the **global execution roadmap** for ATPix v1. It sequences work across the monorepo without injecting timelines into [prd.md](./prd.md) or [srs.md](./srs.md) (per [decoupled-execution](../.agents/rules/decoupled-execution.md)).

**Sources synthesized:** [PRD v1.5](./prd.md) · [SRS v1.0](./srs.md) · [UI requirements](./ui-requirements.md) · [ADRs 001–012](./architecture/) · 35 existing BDD feature files under `apps/*/tests/features/`

**Module detail:** Granular checklists live in [apps/frontend/docs/plan.md](../apps/frontend/docs/plan.md) and [apps/backend/docs/plan.md](../apps/backend/docs/plan.md).

**Current state:** Monorepo scaffold, health/C2PA stubs, BDD features, Lexicon artifacts, and observability compose exist. Frontend shell is placeholder; HappyView integration, gallery UX, C2PA SDK, and permissioned spaces are **not yet implemented**.

> **Note:** No `srs.md` files exist under `apps/`; all SRS requirements reference [docs/srs.md](./srs.md).

---

## Phase 1: Foundation & HappyView Provisioning

- [x] **Task 1.1: Verify monorepo scaffold against ADRs**
  - **Description:** Confirm `apps/frontend/`, `apps/backend/`, `docker-compose.yml`, `.env.example`, lint configs, and test runners match [ADR-005](./architecture/005-application-architecture.md), [ADR-001](./architecture/001-test-runners-and-reporting.md), and [ADR-004](./architecture/004-coding-style-and-linting.md). Resolve any drift.
  - **Estimated Time:** 2 hours
  - **Dependencies:** None
  - **Related Requirements:** [NFR-006](./prd.md#nfr-006-testability-and-quality-gates), [NFR-007](./prd.md#nfr-007-zero-friction-local-setup), [TC-007](./prd.md#tc-007-standalone-production-code)
  - **Related Tests:** [`zero_friction_setup_SRS-NFR-007.feature`](../apps/backend/tests/features/zero_friction_setup_SRS-NFR-007.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 1.1. Verify scaffold across apps/frontend/ and apps/backend/ per ADRs 001, 004, 005. Run lint and existing unit tests in each module directory. Upon completion, generate apps/backend/docs/tasks/Task-1.1-Walkthrough.md with raw CLI output, delete transient Plan/ToDos, check off this box in docs/plan.md, commit, and push to origin.`

- [x] **Task 1.2: Provision HappyView with ATPix lexicons and spaces flag**
  - **Description:** Deploy HappyView (port **3001**); upload `net.atpix.gallery.*` lexicons from [docs/lexicon/](./lexicon/) with `backfill: true`; enable `feature.spaces_enabled` for permissioned album work ([TC-008](./prd.md#tc-008-permissioned-spaces-feature-flag)).
  - **Estimated Time:** 4 hours
  - **Dependencies:** Task 1.1
  - **Related Requirements:** [F-011](./prd.md#f-011-lexicon-publication-and-network-indexing), [TC-001](./prd.md#tc-001-happyview-app-view), [TC-008](./prd.md#tc-008-permissioned-spaces-feature-flag), [SRS-F-011](./srs.md#srs-f-011-lexicon-publication-and-network-indexing)
  - **Related Tests:** [`lexicon_publication_SRS-F-011.feature`](../apps/backend/tests/features/lexicon_publication_SRS-F-011.feature), [`happyview_only_sync_SRS-TC-012.feature`](../apps/backend/tests/features/happyview_only_sync_SRS-TC-012.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 1.2. Configure external HappyView per ADR-007. Document setup steps in root README.md if changed. Invoke @feature-writer for any new integration scenarios. Generate walkthrough with CLI proof, check off docs/plan.md, commit, push.`

- [x] **Task 1.3: Register OAuth client and space appAccess allowList**
  - **Description:** Register ATPix API client in HappyView admin; publish OAuth client metadata at `{deployment-origin}/oauth-client-metadata.json`; configure permissioned space `appAccess: {"type": "allowList", "allowed": ["<clientId URL>"]}` per [ADR-010](./architecture/010-permissioned-spaces-storage.md).
  - **Estimated Time:** 2 hours
  - **Dependencies:** Task 1.2
  - **Related Requirements:** [F-001](./prd.md#f-001-atproto-oauth-sign-in), [F-008](./prd.md#f-008-permissioned-gallery--album-access-happyview-permissioned-spaces-validation), [TC-006](./prd.md#tc-006-api-client-identification), [SRS-F-008.1](./srs.md#srs-f-008-permissioned-album-access-happyview-spaces)
  - **Related Tests:** [`oauth_sign_in_SRS-F-001.feature`](../apps/frontend/tests/features/oauth_sign_in_SRS-F-001.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 1.3. Implement OAuth client metadata serving in apps/frontend/ per ADR-006. Update .env.example. Walkthrough, check off, commit, push.`

---

## Phase 2: Authentication & Application Shell

- [ ] **Task 2.1: OAuth sign-in and global shell (cross-module)**
  - **Description:** Deliver F-001 OAuth flow, UI-SHELL-001 chrome, UI-SHELL-003 theme toggle, and DPoP + `X-Client-Key` on all HappyView XRPC calls. Coordinate [frontend plan Task FE-2.1](../apps/frontend/docs/plan.md) and security verification.
  - **Estimated Time:** 8 hours
  - **Dependencies:** Task 1.3
  - **Related Requirements:** [F-001](./prd.md#f-001-atproto-oauth-sign-in), [NFR-003](./prd.md#nfr-003-authentication-security), [SRS-F-001](./srs.md#srs-f-001-atproto-oauth-sign-in), [UI-SHELL-001](./ui-requirements.md#ui-shell-001-application-chrome), [UI-SHELL-003](./ui-requirements.md#ui-shell-003-dark--light-color-scheme-toggle)
  - **Related Tests:** [`oauth_sign_in_SRS-F-001.feature`](../apps/frontend/tests/features/oauth_sign_in_SRS-F-001.feature), [`ui_app_shell_UI-SHELL-001.feature`](../apps/frontend/tests/features/ui_app_shell_UI-SHELL-001.feature), [`ui_theme_toggle_UI-SHELL-003.feature`](../apps/frontend/tests/features/ui_theme_toggle_UI-SHELL-003.feature), [`authentication_security_SRS-NFR-003.feature`](../apps/backend/tests/features/authentication_security_SRS-NFR-003.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 2.1. Execute apps/frontend/docs/plan.md Task FE-2.1 holistically (shell + OAuth + theme). UI tests MUST run against vite production build per ADR-001. Walkthrough, check off both plan files, commit, push.`

---

## Phase 3: Core Gallery — Path A (Own Uploads)

- [ ] **Task 3.1: C2PA manifest generation pipeline (cross-module)**
  - **Description:** Implement F-012 backend C2PA SDK and frontend pre-upload integration. JPEG/PNG embedding before `uploadBlob` per [ADR-008](./architecture/008-c2pa-sdk-and-signing.md).
  - **Estimated Time:** 12 hours
  - **Dependencies:** Task 2.1
  - **Related Requirements:** [F-012](./prd.md#f-012-c2pa-manifest-generation-on-upload), [TC-009](./prd.md#tc-009-c2pa-manifest-embedding), [TC-010](./prd.md#tc-010-c2pa-actions-integrity), [SRS-F-012](./srs.md#srs-f-012-c2pa-manifest-generation-on-upload)
  - **Related Tests:** [`c2pa_manifest_generation_SRS-F-012.feature`](../apps/backend/tests/features/c2pa_manifest_generation_SRS-F-012.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 3.1. Execute BE-3.1 and FE-3.1 in apps/backend/ and apps/frontend/ respectively. Invoke @feature-writer. Allure + walkthrough, check off plans, commit, push.`

- [ ] **Task 3.2: Photo upload and personal gallery (cross-module)**
  - **Description:** Deliver F-002 upload (public/unlisted path), F-003 My Gallery grid (UI-SCR-001), 50MB limit, RFC 3339 timestamps. Holistic upload UI (UI-SCR-005) includes progress and C2PA step.
  - **Estimated Time:** 10 hours
  - **Dependencies:** Task 3.1
  - **Related Requirements:** [F-002](./prd.md#f-002-photo-upload), [F-003](./prd.md#f-003-personal-gallery-grid-path-a--own-uploads), [TC-002](./prd.md#tc-002-blob-size-limit), [SRS-F-002](./srs.md#srs-f-002-photo-upload), [SRS-F-003](./srs.md#srs-f-003-personal-gallery-grid-path-a)
  - **Related Tests:** [`photo_upload_SRS-F-002.feature`](../apps/frontend/tests/features/photo_upload_SRS-F-002.feature), [`personal_gallery_SRS-F-003.feature`](../apps/frontend/tests/features/personal_gallery_SRS-F-003.feature), [`ui_upload_flow_UI-SCR-005.feature`](../apps/frontend/tests/features/ui_upload_flow_UI-SCR-005.feature), [`ui_my_gallery_UI-SCR-001.feature`](../apps/frontend/tests/features/ui_my_gallery_UI-SCR-001.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 3.2. Execute FE-3.2; backend supports C2PA only. Production-build vitest with strict DOM assertions. Walkthrough, check off, commit, push.`

- [ ] **Task 3.3: Album organization and captions (cross-module)**
  - **Description:** Deliver F-004 albums, F-005 captions/tags, UI-SCR-004 album view. Support seeding from Path A uploads.
  - **Estimated Time:** 10 hours
  - **Dependencies:** Task 3.2
  - **Related Requirements:** [F-004](./prd.md#f-004-album-organization), [F-005](./prd.md#f-005-captions-and-tags), [SRS-F-004](./srs.md#srs-f-004-album-organization), [SRS-F-005](./srs.md#srs-f-005-captions-and-tags)
  - **Related Tests:** [`album_organization_SRS-F-004.feature`](../apps/frontend/tests/features/album_organization_SRS-F-004.feature), [`captions_tags_SRS-F-005.feature`](../apps/frontend/tests/features/captions_tags_SRS-F-005.feature), [`ui_album_view_UI-SCR-004.feature`](../apps/frontend/tests/features/ui_album_view_UI-SCR-004.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 3.3. Holistic album + caption UX per holistic-ui rule. Walkthrough, check off, commit, push.`

---

## Phase 4: Discovery, Sharing & Public Galleries

- [ ] **Task 4.1: Network discovery feed — Path B**
  - **Description:** Deliver F-010 Following/Hashtags feed (UI-SCR-002) via HappyView index only—no custom firehose ([TC-012](./prd.md#tc-012-happyview-only-network-sync)).
  - **Estimated Time:** 8 hours
  - **Dependencies:** Task 3.3
  - **Related Requirements:** [F-010](./prd.md#f-010-network-discovery-feed-and-album-sourcing-path-b--happyview-index), [SRS-F-010](./srs.md#srs-f-010-network-discovery-feed-path-b)
  - **Related Tests:** [`network_discovery_SRS-F-010.feature`](../apps/frontend/tests/features/network_discovery_SRS-F-010.feature), [`ui_discovery_feed_UI-SCR-002.feature`](../apps/frontend/tests/features/ui_discovery_feed_UI-SCR-002.feature), [`happyview_only_sync_SRS-TC-012.feature`](../apps/backend/tests/features/happyview_only_sync_SRS-TC-012.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 4.1. Execute FE-4.1. Verify no relay firehose code. Walkthrough, check off, commit, push.`

- [ ] **Task 4.2: Public profile gallery and shareable links**
  - **Description:** Deliver F-006 public profile (UI-SCR-007), F-007 shareable album/gallery links with visibility chips.
  - **Estimated Time:** 6 hours
  - **Dependencies:** Task 4.1
  - **Related Requirements:** [F-006](./prd.md#f-006-public-profile-gallery), [F-007](./prd.md#f-007-shareable-album-and-gallery-links), [SRS-F-006](./srs.md#srs-f-006-public-profile-gallery), [SRS-F-007](./srs.md#srs-f-007-shareable-album-and-gallery-links)
  - **Related Tests:** [`public_profile_gallery_SRS-F-006.feature`](../apps/frontend/tests/features/public_profile_gallery_SRS-F-006.feature), [`shareable_links_SRS-F-007.feature`](../apps/frontend/tests/features/shareable_links_SRS-F-007.feature), [`ui_public_profile_UI-SCR-007.feature`](../apps/frontend/tests/features/ui_public_profile_UI-SCR-007.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 4.2. Execute FE-4.2. Walkthrough, check off, commit, push.`

- [ ] **Task 4.3: Photo detail, deletion, and provenance display**
  - **Description:** Deliver F-009 deletion/membership management, UI-SCR-003 photo detail with visibility and dual provenance surfacing ([TC-011](./prd.md#tc-011-dual-provenance-model)).
  - **Estimated Time:** 8 hours
  - **Dependencies:** Task 4.2
  - **Related Requirements:** [F-009](./prd.md#f-009-photo-deletion-and-album-membership-management), [SRS-F-009](./srs.md#srs-f-009-photo-deletion-and-album-membership), [UI-SCR-003](./ui-requirements.md#ui-scr-003-photo-detail)
  - **Related Tests:** [`photo_deletion_SRS-F-009.feature`](../apps/frontend/tests/features/photo_deletion_SRS-F-009.feature), [`ui_photo_detail_UI-SCR-003.feature`](../apps/frontend/tests/features/ui_photo_detail_UI-SCR-003.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 4.3. Holistic detail + delete confirmation UX. Walkthrough, check off, commit, push.`

---

## Phase 5: Permissioned Albums (HappyView Spaces)

- [ ] **Task 5.1: Permissioned album lifecycle and space admin**
  - **Description:** Deliver mandatory F-008 end-to-end: `createSpace`, permissioned upload path, `getBlob`, invites (`createInvite`/`acceptInvite`), membership, UI-SCR-006. Validate RC-007.
  - **Estimated Time:** 16 hours
  - **Dependencies:** Task 4.3
  - **Related Requirements:** [F-008](./prd.md#f-008-permissioned-gallery--album-access-happyview-permissioned-spaces-validation), [TC-004](./prd.md#tc-004-repo-vs-space-storage-model), [NFR-013](./prd.md#nfr-013-permissioned-spaces-reference-validation), [SRS-F-008](./srs.md#srs-f-008-permissioned-album-access-happyview-spaces), [ADR-010](./architecture/010-permissioned-spaces-storage.md)
  - **Related Tests:** [`permissioned_albums_SRS-F-008.feature`](../apps/frontend/tests/features/permissioned_albums_SRS-F-008.feature), [`permissioned_spaces_integration_SRS-F-008.feature`](../apps/backend/tests/features/permissioned_spaces_integration_SRS-F-008.feature), [`ui_permissioned_space_UI-SCR-006.feature`](../apps/frontend/tests/features/ui_permissioned_space_UI-SCR-006.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 5.1. Execute FE-5.1 and BE-4.1. Multi-account integration tests against live HappyView with feature.spaces_enabled=true. Walkthrough with raw CLI, check off, commit, push.`

---

## Phase 6: C2PA Edit, Validation & Trust

- [ ] **Task 6.1: C2PA edit chain and validation UI (cross-module)**
  - **Description:** Deliver F-013 edit provenance, F-014 validation UI (Levels 1–3), F-015 ingredients, F-016 trust config (UI-SCR-008). Neutral trust copy per NFR-016.
  - **Estimated Time:** 14 hours
  - **Dependencies:** Task 5.1
  - **Related Requirements:** [F-013](./prd.md#f-013-c2pa-provenance-on-edit-and-publish) through [F-016](./prd.md#f-016-c2pa-trust-configuration), [NFR-014](./prd.md#nfr-014-c2pa-22-conformance) through [NFR-017](./prd.md#nfr-017-c2pa-validation-performance)
  - **Related Tests:** [`c2pa_provenance_edit_SRS-F-013.feature`](../apps/backend/tests/features/c2pa_provenance_edit_SRS-F-013.feature), [`c2pa_ingredient_handling_SRS-F-015.feature`](../apps/backend/tests/features/c2pa_ingredient_handling_SRS-F-015.feature), [`c2pa_validation_ui_SRS-F-014.feature`](../apps/frontend/tests/features/c2pa_validation_ui_SRS-F-014.feature), [`c2pa_trust_config_SRS-F-016.feature`](../apps/frontend/tests/features/c2pa_trust_config_SRS-F-016.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 6.1. Execute BE-6.1 and FE-6.1. Walkthrough, check off, commit, push.`

---

## Phase 7: Verification, Performance & Release Criteria

- [ ] **Task 7.1: Non-functional verification suite**
  - **Description:** Verify NFR-001 data ownership, NFR-002 transparency disclosures, NFR-004 observability (stdout → Loki), NFR-011 gallery query performance, RC-001 through RC-009 release criteria.
  - **Estimated Time:** 8 hours
  - **Dependencies:** Task 6.1
  - **Related Requirements:** [NFR-001](./prd.md#nfr-001-data-ownership-and-verifiability) through [NFR-004](./prd.md#nfr-004-observability-and-logging), [NFR-011](./prd.md#nfr-011-gallery-query-performance), [RC-001](./prd.md#rc-001-end-to-end-upload-and-gallery) through [RC-009](./prd.md#rc-009-c2pa-upload-validation-and-edit-chain)
  - **Related Tests:** [`data_ownership_SRS-NFR-001.feature`](../apps/backend/tests/features/data_ownership_SRS-NFR-001.feature), [`observability_logging_SRS-NFR-004.feature`](../apps/backend/tests/features/observability_logging_SRS-NFR-004.feature), [`gallery_query_performance_SRS-NFR-011.feature`](../apps/backend/tests/features/gallery_query_performance_SRS-NFR-011.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 7.1. Execute BE-7.1 and FE-7.1. Run full BDD + Allure report generation. Walkthrough with complete test CLI output, check off, commit, push.`

- [ ] **Task 7.2: Performance and load tests**
  - **Description:** Execute locust scenarios for gallery queries (NFR-011) and C2PA validation (NFR-017, ≤3s p95 for ≤10MB JPEG).
  - **Estimated Time:** 4 hours
  - **Dependencies:** Task 7.1
  - **Related Requirements:** [NFR-011](./prd.md#nfr-011-gallery-query-performance), [NFR-017](./prd.md#nfr-017-c2pa-validation-performance)
  - **Related Tests:** [`gallery_query_performance_SRS-NFR-011.feature`](../apps/backend/tests/features/gallery_query_performance_SRS-NFR-011.feature), [`c2pa_validation_performance_SRS-NFR-017.feature`](../apps/backend/tests/features/c2pa_validation_performance_SRS-NFR-017.feature), [`locust_c2pa.py`](../apps/backend/tests/performance/locust_c2pa.py)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 7.2. Execute BE-7.2 locust tests in apps/backend/. Document p95 results in walkthrough. Check off, commit, push.`

---

## Phase 8: Documentation, Docker & Architecture Synthesis

- [ ] **Task 8.1: README and deployment documentation**
  - **Description:** Populate/update root README.md Setup Development Environment, Run tests, Production Environment, and Docker sections per finalized stack and ADRs. Platform-agnostic instructions.
  - **Estimated Time:** 3 hours
  - **Dependencies:** Task 7.2
  - **Related Requirements:** [NFR-007](./prd.md#nfr-007-zero-friction-local-setup), [NFR-012](./prd.md#nfr-012-documentation-portability)
  - **Related Tests:** N/A
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch. Then read the project's Architecture Decision Records (ADRs) and the finalized tech stack to populate or update the 'Setup Development Environment' (including 'Run the Application' and 'Run tests') and 'Setup Production Environment' (including 'Deploy to Production' and 'Monitor and Update') sections of the README.md file. Ensure installation instructions are platform-agnostic (e.g., don't assume macOS/Homebrew) or explicitly accommodate multiple operating systems as required by the ADRs. However, if the project requires Dockerization, ensure the final Phase of the implementation plan includes a task to populate or update the Dockerfile based on the finalized tech stack and ADRs as well as include a "How to Dockerize" section in the README.md file that includes a basic overview of how Docker works and its main components. Make sure to check off the task as complete in the appropriate docs/plan.md once finished. Then commit your changes and push the branch to origin.`

- [ ] **Task 8.2: Comprehensive architecture document synthesis**
  - **Description:** Invoke architecture-writer to produce `docs/architecture.md` with ISO 42010 viewpoints and Mermaid diagrams from PRD, SRS, ADRs, and implemented codebase.
  - **Estimated Time:** 4 hours
  - **Dependencies:** Task 8.1
  - **Related Requirements:** [NFR-008](./prd.md#nfr-008-modularity-and-interface-first-design), [NFR-012](./prd.md#nfr-012-documentation-portability)
  - **Related Tests:** N/A
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch. Then invoke the @architecture-writer skill. Read its instructions entirely, then execute all steps to synthesize the @docs/prd.md, @docs/srs.md, all srs.md files in apps/[Module Name]/docs/ and ADRs in the @docs/architecture/ folder and an in-depth scan of the codebase reality into a comprehensive @docs/architecture.md file featuring ISO 42010 viewpoints and Mermaid diagrams. Make sure to check off the task as complete in the appropriate @docs/plan.md once finished. Then commit your changes and push the branch to origin.`

---

## Summary Timeline

| Phase | Focus | Est. hours |
|-------|-------|------------|
| 1 | Foundation & HappyView | 8 |
| 2 | Auth & shell | 8 |
| 3 | Core gallery (Path A) | 32 |
| 4 | Discovery & sharing | 22 |
| 5 | Permissioned spaces | 16 |
| 6 | C2PA edit/validation | 14 |
| 7 | Verification & performance | 12 |
| 8 | Docs & architecture | 7 |

- **Total Estimated Time:** ~119 hours
- **Critical Path:** HappyView provision → OAuth shell → C2PA upload → gallery/albums → permissioned spaces → C2PA validation → RC verification → architecture doc