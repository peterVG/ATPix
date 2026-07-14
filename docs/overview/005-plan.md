# Implementation Plan: ATPix v1

This document is the **global execution roadmap** for ATPix v1. It sequences work across the monorepo without injecting timelines into [002-prd.md](./002-prd.md) or [003-srs.md](./003-srs.md) (per [decoupled-execution](../../.agents/rules/decoupled-execution.md)).

**Sources synthesized:** [PRD v1.5](./002-prd.md) · [SRS v1.0](./003-srs.md) · [UI requirements](./004-ui-requirements.md) · [ADRs 001–012](../architecture/) · 35 existing BDD feature files under `apps/*/tests/features/`

**Module detail:** Granular checklists live in [apps/frontend/docs/plan.md](../../apps/frontend/docs/plan.md) and [apps/backend/docs/plan.md](../../apps/backend/docs/plan.md).

**Current state:** Monorepo scaffold, OAuth shell, C2PA manifest pipeline, Path A upload, My Gallery grid (Task 3.2), and albums/captions (Task 3.3) are implemented. Remaining Phase 4+ work: permissioned spaces, discovery, and performance verification (Task 7.2 Locust).

> **Note:** No `srs.md` files exist under `apps/`; all SRS requirements reference [docs/overview/003-srs.md](./003-srs.md).

---

## Phase 1: Foundation & HappyView Provisioning

- [x] **Task 1.1: Verify monorepo scaffold against ADRs**
  - **Description:** Confirm `apps/frontend/`, `apps/backend/`, `docker-compose.yml`, `.env.example`, lint configs, and test runners match [ADR-005](../architecture/005-application-architecture.md), [ADR-001](../architecture/001-test-runners-and-reporting.md), and [ADR-004](../architecture/004-coding-style-and-linting.md). Resolve any drift.
  - **Estimated Time:** 2 hours
  - **Dependencies:** None
  - **Related Requirements:** [NFR-006](./002-prd.md#nfr-006-testability-and-quality-gates), [NFR-007](./002-prd.md#nfr-007-zero-friction-local-setup), [TC-007](./002-prd.md#tc-007-standalone-production-code)
  - **Related Tests:** [`zero_friction_setup_SRS-NFR-007.feature`](../../apps/backend/tests/features/zero_friction_setup_SRS-NFR-007.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 1.1. Verify scaffold across apps/frontend/ and apps/backend/ per ADRs 001, 004, 005. Run lint and existing unit tests in each module directory. Upon completion, generate apps/backend/docs/tasks/Task-1.1-Walkthrough.md with raw CLI output, delete transient Plan/ToDos, check off this box in docs/overview/005-plan.md, commit, and push to origin.`

- [x] **Task 1.2: Provision HappyView with ATPix lexicons and spaces flag**
  - **Description:** Deploy HappyView (port **3001**); upload `net.atpix.gallery.*` lexicons from [docs/lexicon/](../lexicon/) with `backfill: true`; enable `feature.spaces_enabled` for permissioned album work ([TC-008](./002-prd.md#tc-008-permissioned-spaces-feature-flag)).
  - **Estimated Time:** 4 hours
  - **Dependencies:** Task 1.1
  - **Related Requirements:** [F-011](./002-prd.md#f-011-lexicon-publication-and-network-indexing), [TC-001](./002-prd.md#tc-001-happyview-app-view), [TC-008](./002-prd.md#tc-008-permissioned-spaces-feature-flag), [SRS-F-011](./003-srs.md#srs-f-011-lexicon-publication-and-network-indexing)
  - **Related Tests:** [`lexicon_publication_SRS-F-011.feature`](../../apps/backend/tests/features/lexicon_publication_SRS-F-011.feature), [`happyview_only_sync_SRS-TC-012.feature`](../../apps/backend/tests/features/happyview_only_sync_SRS-TC-012.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 1.2. Configure external HappyView per ADR-007. Document setup steps in root README.md if changed. Invoke @feature-writer for any new integration scenarios. Generate walkthrough with CLI proof, check off docs/overview/005-plan.md, commit, push.`

- [x] **Task 1.3: Register OAuth client and space appAccess allowList**
  - **Description:** Register ATPix API client in HappyView admin; publish OAuth client metadata at `{deployment-origin}/oauth-client-metadata.json`; configure permissioned space `appAccess: {"type": "allowList", "allowed": ["<clientId URL>"]}` per [ADR-010](../architecture/010-permissioned-spaces-storage.md).
  - **Estimated Time:** 2 hours
  - **Dependencies:** Task 1.2
  - **Related Requirements:** [F-001](./002-prd.md#f-001-atproto-oauth-sign-in), [F-008](./002-prd.md#f-008-permissioned-gallery--album-access-happyview-permissioned-spaces-validation), [TC-006](./002-prd.md#tc-006-api-client-identification), [SRS-F-008.1](./003-srs.md#srs-f-008-permissioned-album-access-happyview-spaces)
  - **Related Tests:** [`oauth_sign_in_SRS-F-001.feature`](../../apps/frontend/tests/features/oauth_sign_in_SRS-F-001.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 1.3. Implement OAuth client metadata serving in apps/frontend/ per ADR-006. Update .env.example. Walkthrough, check off, commit, push.`

---

## Phase 2: Authentication & Application Shell

- [x] **Task 2.1: OAuth sign-in and global shell (cross-module)**
  - **Description:** Deliver F-001 OAuth flow, UI-SHELL-001 chrome, UI-SHELL-003 theme toggle, and DPoP + `X-Client-Key` on all HappyView XRPC calls. Coordinate [frontend plan Task FE-2.1](../../apps/frontend/docs/plan.md) and security verification (recorded in [Task-2.1-Walkthrough.md](../../apps/frontend/docs/tasks/Task-2.1-Walkthrough.md#security-verification-srs-nfr-003--rc-004); backend NFR-003 behave steps complete in Task 7.1).
  - **Estimated Time:** 8 hours
  - **Dependencies:** Task 1.3
  - **Related Requirements:** [F-001](./002-prd.md#f-001-atproto-oauth-sign-in), [NFR-003](./002-prd.md#nfr-003-authentication-security), [SRS-F-001](./003-srs.md#srs-f-001-atproto-oauth-sign-in), [UI-SHELL-001](./004-ui-requirements.md#ui-shell-001-application-chrome), [UI-SHELL-003](./004-ui-requirements.md#ui-shell-003-dark--light-color-scheme-toggle)
  - **Related Tests:** [`oauth_sign_in_SRS-F-001.feature`](../../apps/frontend/tests/features/oauth_sign_in_SRS-F-001.feature), [`ui_app_shell_UI-SHELL-001.feature`](../../apps/frontend/tests/features/ui_app_shell_UI-SHELL-001.feature), [`ui_theme_toggle_UI-SHELL-003.feature`](../../apps/frontend/tests/features/ui_theme_toggle_UI-SHELL-003.feature), [`authentication_security_SRS-NFR-003.feature`](../../apps/backend/tests/features/authentication_security_SRS-NFR-003.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 2.1. Execute apps/frontend/docs/plan.md Task FE-2.1 holistically (shell + OAuth + theme). UI tests MUST run against vite production build per ADR-001. Walkthrough, check off both plan files, commit, push.`

---

## Phase 3: Core Gallery — Path A (Own Uploads)

- [x] **Task 3.1: C2PA manifest generation pipeline (cross-module)**
  - **Description:** Implement F-012 backend C2PA SDK and frontend pre-upload integration. JPEG/PNG embedding before `uploadBlob` per [ADR-008](../architecture/008-c2pa-sdk-and-signing.md).
  - **Estimated Time:** 12 hours
  - **Dependencies:** Task 2.1
  - **Related Requirements:** [F-012](./002-prd.md#f-012-c2pa-manifest-generation-on-upload), [TC-009](./002-prd.md#tc-009-c2pa-manifest-embedding), [TC-010](./002-prd.md#tc-010-c2pa-actions-integrity), [SRS-F-012](./003-srs.md#srs-f-012-c2pa-manifest-generation-on-upload)
  - **Related Tests:** [`c2pa_manifest_generation_SRS-F-012.feature`](../../apps/backend/tests/features/c2pa_manifest_generation_SRS-F-012.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 3.1. Execute BE-3.1 and FE-3.1 in apps/backend/ and apps/frontend/ respectively. Invoke @feature-writer. Allure + walkthrough, check off plans, commit, push.`

- [x] **Task 3.2: Photo upload and personal gallery (cross-module)**
  - **Description:** Deliver F-002 upload (public/unlisted path), F-003 My Gallery grid (UI-SCR-001), 50MB limit, RFC 3339 timestamps. Holistic upload UI (UI-SCR-005) includes progress and C2PA step.
  - **Estimated Time:** 10 hours
  - **Dependencies:** Task 3.1
  - **Related Requirements:** [F-002](./002-prd.md#f-002-photo-upload), [F-003](./002-prd.md#f-003-personal-gallery-grid-path-a--own-uploads), [TC-002](./002-prd.md#tc-002-blob-size-limit), [SRS-F-002](./003-srs.md#srs-f-002-photo-upload), [SRS-F-003](./003-srs.md#srs-f-003-personal-gallery-grid-path-a)
  - **Related Tests:** [`photo_upload_SRS-F-002.feature`](../../apps/frontend/tests/features/photo_upload_SRS-F-002.feature), [`personal_gallery_SRS-F-003.feature`](../../apps/frontend/tests/features/personal_gallery_SRS-F-003.feature), [`ui_upload_flow_UI-SCR-005.feature`](../../apps/frontend/tests/features/ui_upload_flow_UI-SCR-005.feature), [`ui_my_gallery_UI-SCR-001.feature`](../../apps/frontend/tests/features/ui_my_gallery_UI-SCR-001.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 3.2. Execute FE-3.2; backend supports C2PA only. Production-build vitest with strict DOM assertions. Walkthrough, check off, commit, push.`

- [x] **Task 3.3: Album organization and captions (cross-module)**
  - **Description:** Deliver F-004 albums, F-005 captions/tags, UI-SCR-004 album view. Support seeding from Path A uploads.
  - **Estimated Time:** 10 hours
  - **Dependencies:** Task 3.2
  - **Related Requirements:** [F-004](./002-prd.md#f-004-album-organization), [F-005](./002-prd.md#f-005-captions-and-tags), [SRS-F-004](./003-srs.md#srs-f-004-album-organization), [SRS-F-005](./003-srs.md#srs-f-005-captions-and-tags)
  - **Related Tests:** [`album_organization_SRS-F-004.feature`](../../apps/frontend/tests/features/album_organization_SRS-F-004.feature), [`captions_tags_SRS-F-005.feature`](../../apps/frontend/tests/features/captions_tags_SRS-F-005.feature), [`ui_album_view_UI-SCR-004.feature`](../../apps/frontend/tests/features/ui_album_view_UI-SCR-004.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 3.3. Holistic album + caption UX per holistic-ui rule. Walkthrough, check off, commit, push.`

---

> **Execution priority (R&D):** Phase 4 (permissioned spaces) runs **before** Phase 5 (discovery & public sharing). Task IDs `4.x` / `5.x` are unchanged for PRD/SRS/BDD traceability. Phase 5 is **deferred until after HappyView Permissioned Spaces validation** (F-008 / RC-007) — it does not block the core research question.

## Phase 4: Permissioned Albums (HappyView Spaces)

- [x] **Task 5.1: Permissioned album lifecycle and space admin**
  - **Description:** Deliver mandatory F-008 end-to-end: `createSpace`, permissioned upload path, `getBlob`, invites (`createInvite`/`acceptInvite`), membership, UI-SCR-006. Validate RC-007.
  - **Estimated Time:** 16 hours
  - **Dependencies:** Task 3.3
  - **Related Requirements:** [F-008](./002-prd.md#f-008-permissioned-gallery--album-access-happyview-permissioned-spaces-validation), [TC-004](./002-prd.md#tc-004-repo-vs-space-storage-model), [NFR-013](./002-prd.md#nfr-013-permissioned-spaces-reference-validation), [SRS-F-008](./003-srs.md#srs-f-008-permissioned-album-access-happyview-spaces), [ADR-010](../architecture/010-permissioned-spaces-storage.md)
  - **Related Tests:** [`permissioned_albums_SRS-F-008.feature`](../../apps/frontend/tests/features/permissioned_albums_SRS-F-008.feature), [`permissioned_spaces_integration_SRS-F-008.feature`](../../apps/backend/tests/features/permissioned_spaces_integration_SRS-F-008.feature), [`ui_permissioned_space_UI-SCR-006.feature`](../../apps/frontend/tests/features/ui_permissioned_space_UI-SCR-006.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 5.1. Execute FE-5.1 and BE-4.1. Multi-account integration tests against live HappyView with feature.spaces_enabled=true. Walkthrough with raw CLI, check off, commit, push.`

- [x] **Task 5.2: Hosted PDS signup discovery (F-017)**
  - **Description:** Add `VITE_PDS_SIGNUP_URL` sign-in panel link (UI-SCR-009 link mode), revise README Phase B for `*.pds.atpix.net` default handles and end-user self-service registration, and document post-v1 identity requirements F-018–F-021 in PRD/SRS/UI spec.
  - **Estimated Time:** 3 hours
  - **Dependencies:** Task 5.1
  - **Related Requirements:** [F-017](./002-prd.md#f-017-hosted-pds-account-onboarding), [SRS-F-001.4](./003-srs.md#srs-f-0014-hosted-pds-signup-discovery-link), [UI-SCR-009](./004-ui-requirements.md#ui-scr-009-sign-in-and-pds-onboarding)
  - **Related Tests:** [`signInPanel.test.js`](../../apps/frontend/tests/unit/signInPanel.test.js), [`signIn.ui.test.js`](../../apps/frontend/tests/ui/signIn.ui.test.js)
  - **Agent Prompt:** `@AGENTS.md On branch task/5.1, implement F-017 signup link, update README Phase B for *.pds.atpix.net handles, extend PRD/SRS/UI/plan for F-018–F-021. Walkthrough, check off, commit, push.`

---

## Phase 5: Discovery, Sharing & Public Galleries *(deferred post–spaces validation)*

Discovery (Path B), public profiles, shareable links, and unified photo detail/deletion ship **after** permissioned-space R&D is complete. Requires only Path A uploads and basic albums from Phase 3 until Task 5.1 lands.

- [ ] **Task 4.1: Network discovery feed — Path B**
  - **Description:** Deliver F-010 Following/Hashtags feed (UI-SCR-002) via HappyView index only—no custom firehose ([TC-012](./002-prd.md#tc-012-happyview-only-network-sync)).
  - **Estimated Time:** 8 hours
  - **Dependencies:** Task 5.1
  - **Related Requirements:** [F-010](./002-prd.md#f-010-network-discovery-feed-and-album-sourcing-path-b--happyview-index), [SRS-F-010](./003-srs.md#srs-f-010-network-discovery-feed-path-b)
  - **Related Tests:** [`network_discovery_SRS-F-010.feature`](../../apps/frontend/tests/features/network_discovery_SRS-F-010.feature), [`ui_discovery_feed_UI-SCR-002.feature`](../../apps/frontend/tests/features/ui_discovery_feed_UI-SCR-002.feature), [`happyview_only_sync_SRS-TC-012.feature`](../../apps/backend/tests/features/happyview_only_sync_SRS-TC-012.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 4.1. Execute FE-4.1. Verify no relay firehose code. Walkthrough, check off, commit, push.`

- [ ] **Task 4.2: Public profile gallery and shareable links**
  - **Description:** Deliver F-006 public profile (UI-SCR-007), F-007 shareable album/gallery links with visibility chips.
  - **Estimated Time:** 6 hours
  - **Dependencies:** Task 4.1
  - **Related Requirements:** [F-006](./002-prd.md#f-006-public-profile-gallery), [F-007](./002-prd.md#f-007-shareable-album-and-gallery-links), [SRS-F-006](./003-srs.md#srs-f-006-public-profile-gallery), [SRS-F-007](./003-srs.md#srs-f-007-shareable-album-and-gallery-links)
  - **Related Tests:** [`public_profile_gallery_SRS-F-006.feature`](../../apps/frontend/tests/features/public_profile_gallery_SRS-F-006.feature), [`shareable_links_SRS-F-007.feature`](../../apps/frontend/tests/features/shareable_links_SRS-F-007.feature), [`ui_public_profile_UI-SCR-007.feature`](../../apps/frontend/tests/features/ui_public_profile_UI-SCR-007.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 4.2. Execute FE-4.2. Walkthrough, check off, commit, push.`

- [ ] **Task 4.3: Photo detail, deletion, and provenance display**
  - **Description:** Deliver F-009 deletion/membership management, UI-SCR-003 photo detail with visibility and dual provenance surfacing ([TC-011](./002-prd.md#tc-011-dual-provenance-model)). Unifies public, unlisted, and permissioned photo UX after Task 5.1.
  - **Estimated Time:** 8 hours
  - **Dependencies:** Task 4.2
  - **Related Requirements:** [F-009](./002-prd.md#f-009-photo-deletion-and-album-membership-management), [SRS-F-009](./003-srs.md#srs-f-009-photo-deletion-and-album-membership), [UI-SCR-003](./004-ui-requirements.md#ui-scr-003-photo-detail)
  - **Related Tests:** [`photo_deletion_SRS-F-009.feature`](../../apps/frontend/tests/features/photo_deletion_SRS-F-009.feature), [`ui_photo_detail_UI-SCR-003.feature`](../../apps/frontend/tests/features/ui_photo_detail_UI-SCR-003.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 4.3. Holistic detail + delete confirmation UX. Walkthrough, check off, commit, push.`

---

## Phase 6: C2PA Edit, Validation & Trust

- [ ] **Task 6.1: C2PA edit chain and validation UI (cross-module)**
  - **Description:** Deliver F-013 edit provenance, F-014 validation UI (Levels 1–3), F-015 ingredients, F-016 trust config (UI-SCR-008). Neutral trust copy per NFR-016.
  - **Estimated Time:** 14 hours
  - **Dependencies:** Task 4.3
  - **Related Requirements:** [F-013](./002-prd.md#f-013-c2pa-provenance-on-edit-and-publish) through [F-016](./002-prd.md#f-016-c2pa-trust-configuration), [NFR-014](./002-prd.md#nfr-014-c2pa-22-conformance) through [NFR-017](./002-prd.md#nfr-017-c2pa-validation-performance)
  - **Related Tests:** [`c2pa_provenance_edit_SRS-F-013.feature`](../../apps/backend/tests/features/c2pa_provenance_edit_SRS-F-013.feature), [`c2pa_ingredient_handling_SRS-F-015.feature`](../../apps/backend/tests/features/c2pa_ingredient_handling_SRS-F-015.feature), [`c2pa_validation_ui_SRS-F-014.feature`](../../apps/frontend/tests/features/c2pa_validation_ui_SRS-F-014.feature), [`c2pa_trust_config_SRS-F-016.feature`](../../apps/frontend/tests/features/c2pa_trust_config_SRS-F-016.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 6.1. Execute BE-6.1 and FE-6.1. Walkthrough, check off, commit, push.`

---

## Phase 7: Verification, Performance & Release Criteria

- [ ] **Task 7.1: Non-functional verification suite**
  - **Description:** Verify NFR-001 data ownership, NFR-002 transparency disclosures, NFR-004 observability (stdout → Loki), NFR-011 gallery query performance, RC-001 through RC-009 release criteria.
  - **Estimated Time:** 8 hours
  - **Dependencies:** Task 6.1
  - **Related Requirements:** [NFR-001](./002-prd.md#nfr-001-data-ownership-and-verifiability) through [NFR-004](./002-prd.md#nfr-004-observability-and-logging), [NFR-011](./002-prd.md#nfr-011-gallery-query-performance), [RC-001](./002-prd.md#rc-001-end-to-end-upload-and-gallery) through [RC-009](./002-prd.md#rc-009-c2pa-upload-validation-and-edit-chain)
  - **Related Tests:** [`data_ownership_SRS-NFR-001.feature`](../../apps/backend/tests/features/data_ownership_SRS-NFR-001.feature), [`observability_logging_SRS-NFR-004.feature`](../../apps/backend/tests/features/observability_logging_SRS-NFR-004.feature), [`gallery_query_performance_SRS-NFR-011.feature`](../../apps/backend/tests/features/gallery_query_performance_SRS-NFR-011.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 7.1. Execute BE-7.1 and FE-7.1. Run full BDD + Allure report generation. Walkthrough with complete test CLI output, check off, commit, push.`

- [ ] **Task 7.2: Performance and load tests**
  - **Description:** Execute locust scenarios for gallery queries (NFR-011) and C2PA validation (NFR-017, ≤3s p95 for ≤10MB JPEG).
  - **Estimated Time:** 4 hours
  - **Dependencies:** Task 7.1
  - **Related Requirements:** [NFR-011](./002-prd.md#nfr-011-gallery-query-performance), [NFR-017](./002-prd.md#nfr-017-c2pa-validation-performance)
  - **Related Tests:** [`gallery_query_performance_SRS-NFR-011.feature`](../../apps/backend/tests/features/gallery_query_performance_SRS-NFR-011.feature), [`c2pa_validation_performance_SRS-NFR-017.feature`](../../apps/backend/tests/features/c2pa_validation_performance_SRS-NFR-017.feature), [`locust_c2pa.py`](../../apps/backend/tests/performance/locust_c2pa.py)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task 7.2. Execute BE-7.2 locust tests in apps/backend/. Document p95 results in walkthrough. Check off, commit, push.`

---

## Phase 9: Identity Platform & Hosted PDS Scale *(post-v1)*

Operator and end-user identity flows beyond F-017 link-mode onboarding. Depends on production Phase B PDS at `pds.atpix.net`.

- [ ] **Task 9.1: Embedded signup on atpix.net (F-018)**
  - **Description:** In-panel PDS registration (handle picker, email, password, invite code) on UI-SCR-009 without leaving atpix.net; auto-transition to OAuth shell on success.
  - **Estimated Time:** 12 hours
  - **Dependencies:** Task 5.2, Phase B PDS live
  - **Related Requirements:** [F-018](./002-prd.md#f-018-embedded-signup-on-atpixnet), [SRS-F-018](./003-srs.md#srs-f-018-embedded-signup-on-atpixnet-post-v1), [UI-SCR-009](./004-ui-requirements.md#ui-scr-009-sign-in-and-pds-onboarding)
  - **Related Tests:** Planned `ui_embedded_signup_UI-SCR-009.feature`
  - **Agent Prompt:** `@AGENTS.md Begin feature branch Task 9.1. Implement embedded signup per F-018/UI-SCR-009. No password persistence in ATPix storage. Walkthrough, check off, commit, push.`

- [ ] **Task 9.2: ATPix-managed PDS invites (F-019)**
  - **Description:** Operator admin surface to create/revoke PDS invite codes; wire invite field into registration flows.
  - **Estimated Time:** 8 hours
  - **Dependencies:** Task 9.1
  - **Related Requirements:** [F-019](./002-prd.md#f-019-atpix-managed-pds-invites), [SRS-F-019](./003-srs.md#srs-f-019-atpix-managed-pds-invites-post-v1)
  - **Related Tests:** Planned operator invite integration tests
  - **Agent Prompt:** `@AGENTS.md Begin feature branch Task 9.2. Implement F-019 against PDS admin APIs. Walkthrough, check off, commit, push.`

- [ ] **Task 9.3: Apex handle provisioning at scale (F-020)**
  - **Description:** Automate `_atproto` TXT records for apex handles (`jane.atpix.net`) via DNS provider API; availability checks and rate limits.
  - **Estimated Time:** 10 hours
  - **Dependencies:** Task 9.2
  - **Related Requirements:** [F-020](./002-prd.md#f-020-apex-handle-provisioning-at-scale), [SRS-F-020](./003-srs.md#srs-f-020-apex-handle-provisioning-at-scale-post-v1)
  - **Related Tests:** Planned DNS automation integration tests
  - **Agent Prompt:** `@AGENTS.md Begin feature branch Task 9.3. Implement F-020 with operator approval workflow. Walkthrough, check off, commit, push.`

- [ ] **Task 9.4: Entryway and multi-PDS federation (F-021)**
  - **Description:** Document and implement multi-PDS OAuth issuer resolution; migration runbook from single `pds.atpix.net` to Entryway topology.
  - **Estimated Time:** 16 hours
  - **Dependencies:** Task 9.3
  - **Related Requirements:** [F-021](./002-prd.md#f-021-entryway-and-multi-pds-federation), [SRS-F-021](./003-srs.md#srs-f-021-entryway-and-multi-pds-federation-post-v1), [ADR-007](../architecture/007-happyview-app-view-integration.md)
  - **Related Tests:** Planned multi-PDS OAuth integration tests
  - **Agent Prompt:** `@AGENTS.md Begin feature branch Task 9.4. Implement F-021 deployment modes and HappyView multi-PDS verification. Walkthrough, check off, commit, push.`

---

## Phase 8: Documentation, Docker & Architecture Synthesis

- [ ] **Task 8.1: README and deployment documentation**
  - **Description:** Populate/update root README.md Setup Development Environment, Run tests, Production Environment, and Docker sections per finalized stack and ADRs. Platform-agnostic instructions.
  - **Estimated Time:** 3 hours
  - **Dependencies:** Task 7.2
  - **Related Requirements:** [NFR-007](./002-prd.md#nfr-007-zero-friction-local-setup), [NFR-012](./002-prd.md#nfr-012-documentation-portability)
  - **Related Tests:** N/A
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch. Then read the project's Architecture Decision Records (ADRs) and the finalized tech stack to populate or update the 'Setup Development Environment' (including 'Run the Application' and 'Run tests') and 'Setup Production Environment' (including 'Deploy to Production' and 'Monitor and Update') sections of the README.md file. Ensure installation instructions are platform-agnostic (e.g., don't assume macOS/Homebrew) or explicitly accommodate multiple operating systems as required by the ADRs. However, if the project requires Dockerization, ensure the final Phase of the implementation plan includes a task to populate or update the Dockerfile based on the finalized tech stack and ADRs as well as include a "How to Dockerize" section in the README.md file that includes a basic overview of how Docker works and its main components. Make sure to check off the task as complete in the appropriate docs/overview/005-plan.md once finished. Then commit your changes and push the branch to origin.`

- [ ] **Task 8.2: Comprehensive architecture document synthesis**
  - **Description:** Invoke architecture-writer to produce `docs/overview/000-architecture.md` with ISO 42010 viewpoints and Mermaid diagrams from PRD, SRS, ADRs, and implemented codebase.
  - **Estimated Time:** 4 hours
  - **Dependencies:** Task 8.1
  - **Related Requirements:** [NFR-008](./002-prd.md#nfr-008-modularity-and-interface-first-design), [NFR-012](./002-prd.md#nfr-012-documentation-portability)
  - **Related Tests:** N/A
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch. Then invoke the @architecture-writer skill. Read its instructions entirely, then execute all steps to synthesize the @docs/overview/002-prd.md, @docs/overview/003-srs.md, all srs.md files in apps/[Module Name]/docs/ and ADRs in the @docs/architecture/ folder and an in-depth scan of the codebase reality into a comprehensive @docs/overview/000-architecture.md file featuring ISO 42010 viewpoints and Mermaid diagrams. Make sure to check off the task as complete in the appropriate @docs/overview/005-plan.md once finished. Then commit your changes and push the branch to origin.`

---

## Summary Timeline

| Phase | Focus | Est. hours |
|-------|-------|------------|
| 1 | Foundation & HappyView | 8 |
| 2 | Auth & shell | 8 |
| 3 | Core gallery (Path A) | 32 |
| 4 | Permissioned spaces (R&D priority) | 16 |
| 5 | Discovery & sharing *(post-spaces)* | 22 |
| 6 | C2PA edit/validation | 14 |
| 7 | Verification & performance | 12 |
| 8 | Docs & architecture | 7 |
| 9 | Identity platform *(post-v1)* | 46 |

- **Total Estimated Time:** ~168 hours (Phase 9 post-v1)
- **Critical Path:** HappyView provision → OAuth shell → C2PA upload → gallery/albums → **permissioned spaces (RC-007)** → discovery & sharing → C2PA validation → RC verification → architecture doc