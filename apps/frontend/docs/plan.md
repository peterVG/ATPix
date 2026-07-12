# Implementation Plan: ATPix Frontend (`apps/frontend/`)

Granular checklist for the Vite vanilla JS client. Global sequencing: [docs/plan.md](../../../docs/plan.md).

**Stack:** Vite · `@happyview/oauth-client-browser` · `@happyview/lex-agent` · vitest/jsdom · Allure ([ADR-005](../../../docs/architecture/005-application-architecture.md), [ADR-006](../../../docs/architecture/006-oauth-dpop-authentication.md))

**SRS source:** [docs/srs.md](../../../docs/srs.md) (no module-local srs.md)

**UI source:** [docs/ui-requirements.md](../../../docs/ui-requirements.md) · [000-UX-guide.md](../../../docs/references/000-UX-guide.md)

---

## Phase FE-1: Project Foundation

- [ ] **Task FE-1.1: Frontend build, lint, and test harness**
  - **Description:** Verify Vite config, eslint/prettier, vitest production-build UI test pipeline, Allure output to `tests/allure-results/`. Implement `npm run test:ui` against `dist/` artifacts.
  - **Estimated Time:** 2 hours
  - **Dependencies:** None
  - **Related Requirements:** [NFR-006](../../../docs/prd.md#nfr-006-testability-and-quality-gates), [SRS-NFR-006](../../../docs/srs.md#srs-nfr-006-testability-and-quality-gates)
  - **Related Tests:** [`app.test.js`](../tests/unit/app.test.js)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task FE-1.1. Work strictly in apps/frontend/. Run npm run lint && npm run test:ui. Generate apps/frontend/docs/tasks/Task-FE-1.1-Walkthrough.md with raw CLI output. Delete Plan/ToDos. Check off apps/frontend/docs/plan.md. Commit and push.`

- [ ] **Task FE-1.2: HappyView client module and environment wiring**
  - **Description:** Extend `src/api/happyview.js` with DPoP session wrapper, `X-Client-Key` header injection, base URL from `VITE_HAPPYVIEW_URL`. Stub lex-agent query helpers for `com.atpix.gallery.*`.
  - **Estimated Time:** 3 hours
  - **Dependencies:** Task FE-1.1
  - **Related Requirements:** [TC-001](../../../docs/prd.md#tc-001-happyview-app-view), [TC-006](../../../docs/prd.md#tc-006-api-client-identification), [SRS-F-001.2](../../../docs/srs.md#srs-f-001-atproto-oauth-sign-in)
  - **Related Tests:** [`happyview.test.js`](../tests/unit/happyview.test.js)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task FE-1.2. Work in apps/frontend/. Invoke @feature-writer if extending BDD. Walkthrough, check off, commit, push.`

- [ ] **Task FE-1.3: OAuth client metadata endpoint**
  - **Description:** Serve `oauth-client-metadata.json` at deployment origin for HappyView OAuth `clientId` and space `appAccess` allowList per [ADR-010](../../../docs/architecture/010-permissioned-spaces-storage.md).
  - **Estimated Time:** 2 hours
  - **Dependencies:** Task FE-1.2
  - **Related Requirements:** [F-008](../../../docs/prd.md#f-008-permissioned-gallery--album-access-happyview-permissioned-spaces-validation), [SRS-F-008.1](../../../docs/srs.md#srs-f-008-permissioned-album-access-happyview-spaces)
  - **Related Tests:** [`oauth_sign_in_SRS-F-001.feature`](../tests/features/oauth_sign_in_SRS-F-001.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task FE-1.3. Work in apps/frontend/. Walkthrough, check off, commit, push.`

---

## Phase FE-2: Authentication & Shell

- [ ] **Task FE-2.1: OAuth sign-in, shell chrome, and theme toggle (holistic)**
  - **Description:** Replace placeholder `App.js` with UI-SHELL-001 header/sidebar/nav, OAuth redirect/callback via `@happyview/oauth-client-browser`, identity card, sign-out, UI-SHELL-003 dark/light/system toggle with `localStorage` key `atpix-color-scheme`. Responsive UI-SHELL-002 breakpoints.
  - **Estimated Time:** 10 hours
  - **Dependencies:** Task FE-1.3
  - **Related Requirements:** [F-001](../../../docs/prd.md#f-001-atproto-oauth-sign-in), [SRS-F-001](../../../docs/srs.md#srs-f-001-atproto-oauth-sign-in), [UI-SHELL-001](../../../docs/ui-requirements.md#ui-shell-001-application-chrome), [UI-SHELL-002](../../../docs/ui-requirements.md#ui-shell-002-responsive-behavior), [UI-SHELL-003](../../../docs/ui-requirements.md#ui-shell-003-dark--light-color-scheme-toggle)
  - **Related Tests:** [`oauth_sign_in_SRS-F-001.feature`](../tests/features/oauth_sign_in_SRS-F-001.feature), [`ui_app_shell_UI-SHELL-001.feature`](../tests/features/ui_app_shell_UI-SHELL-001.feature), [`ui_theme_toggle_UI-SHELL-003.feature`](../tests/features/ui_theme_toggle_UI-SHELL-003.feature), [`ui_responsive_layout_UI-SHELL-002.feature`](../tests/features/ui_responsive_layout_UI-SHELL-002.feature), [`ui_components_UI-CMP.feature`](../tests/features/ui_components_UI-CMP.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task FE-2.1. Holistic shell task per holistic-ui rule—do not split chrome and theme into throwaway increments. UI tests MUST use vite build + vitest with strict DOM assertions (no hydration/SSR errors). Invoke @feature-writer. Allure + walkthrough in apps/frontend/docs/tasks/. Check off plan. Commit and push.`

---

## Phase FE-3: Upload & Personal Gallery (Path A)

- [ ] **Task FE-3.1: C2PA pre-upload client integration**
  - **Description:** Call `apps/backend` C2PA API to embed manifest before `uploadBlob`. Wire upload UI step indicator (UI-SCR-005). Handle 50MB client-side rejection.
  - **Estimated Time:** 4 hours
  - **Dependencies:** Task FE-2.1; backend BE-3.1
  - **Related Requirements:** [F-002](../../../docs/prd.md#f-002-photo-upload), [F-012](../../../docs/prd.md#f-012-c2pa-manifest-generation-on-upload), [SRS-F-002.1](../../../docs/srs.md#srs-f-002-photo-upload)
  - **Related Tests:** [`photo_upload_SRS-F-002.feature`](../tests/features/photo_upload_SRS-F-002.feature), [`ui_upload_flow_UI-SCR-005.feature`](../tests/features/ui_upload_flow_UI-SCR-005.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task FE-3.1. Work in apps/frontend/. Walkthrough, check off, commit, push.`

- [ ] **Task FE-3.2: Photo upload and My Gallery grid**
  - **Description:** Implement public/unlisted upload: `uploadBlob` → `createPhoto` → `listPhotos` pagination (UI-SCR-001). 4-column desktop grid, cursor pagination, empty states. RFC 3339 display.
  - **Estimated Time:** 8 hours
  - **Dependencies:** Task FE-3.1
  - **Related Requirements:** [F-002](../../../docs/prd.md#f-002-photo-upload), [F-003](../../../docs/prd.md#f-003-personal-gallery-grid-path-a--own-uploads), [SRS-F-002](../../../docs/srs.md#srs-f-002-photo-upload), [SRS-F-003](../../../docs/srs.md#srs-f-003-personal-gallery-grid-path-a), [UI-SCR-001](../../../docs/ui-requirements.md#ui-scr-001-my-gallery-path-a)
  - **Related Tests:** [`photo_upload_SRS-F-002.feature`](../tests/features/photo_upload_SRS-F-002.feature), [`personal_gallery_SRS-F-003.feature`](../tests/features/personal_gallery_SRS-F-003.feature), [`ui_my_gallery_UI-SCR-001.feature`](../tests/features/ui_my_gallery_UI-SCR-001.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task FE-3.2. Production-build vitest. Invoke @feature-writer. Walkthrough, check off, commit, push.`

- [ ] **Task FE-3.3: Album organization, captions, and album view**
  - **Description:** `createAlbum`, `addToAlbum`, `listAlbums`, visibility chips (PUBLIC/UNLISTED/PERMISSIONED), caption/tag edit (F-005), UI-SCR-004 album detail with member-list seeding from Path A.
  - **Estimated Time:** 10 hours
  - **Dependencies:** Task FE-3.2
  - **Related Requirements:** [F-004](../../../docs/prd.md#f-004-album-organization), [F-005](../../../docs/prd.md#f-005-captions-and-tags), [SRS-F-004](../../../docs/srs.md#srs-f-004-album-organization), [SRS-F-005](../../../docs/srs.md#srs-f-005-captions-and-tags), [UI-SCR-004](../../../docs/ui-requirements.md#ui-scr-004-album-view)
  - **Related Tests:** [`album_organization_SRS-F-004.feature`](../tests/features/album_organization_SRS-F-004.feature), [`captions_tags_SRS-F-005.feature`](../tests/features/captions_tags_SRS-F-005.feature), [`ui_album_view_UI-SCR-004.feature`](../tests/features/ui_album_view_UI-SCR-004.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task FE-3.3. Holistic album UX. Walkthrough, check off, commit, push.`

---

## Phase FE-4: Discovery & Sharing

- [ ] **Task FE-4.1: Discovery feed (Path B)**
  - **Description:** UI-SCR-002 Following/Hashtags tabs; `listFeedPhotos` + `collectionRule` management preview; add Path B photos to albums.
  - **Estimated Time:** 8 hours
  - **Dependencies:** Task FE-3.3
  - **Related Requirements:** [F-010](../../../docs/prd.md#f-010-network-discovery-feed-and-album-sourcing-path-b--happyview-index), [SRS-F-010](../../../docs/srs.md#srs-f-010-network-discovery-feed-path-b), [UI-SCR-002](../../../docs/ui-requirements.md#ui-scr-002-discovery-feed-path-b)
  - **Related Tests:** [`network_discovery_SRS-F-010.feature`](../tests/features/network_discovery_SRS-F-010.feature), [`ui_discovery_feed_UI-SCR-002.feature`](../tests/features/ui_discovery_feed_UI-SCR-002.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task FE-4.1. No custom firehose—HappyView queries only. Walkthrough, check off, commit, push.`

- [ ] **Task FE-4.2: Public profile and shareable links**
  - **Description:** UI-SCR-007 profile gallery by DID/handle; copy stable URLs (F-007); unlisted vs public behavior.
  - **Estimated Time:** 6 hours
  - **Dependencies:** Task FE-4.1
  - **Related Requirements:** [F-006](../../../docs/prd.md#f-006-public-profile-gallery), [F-007](../../../docs/prd.md#f-007-shareable-album-and-gallery-links), [SRS-F-006](../../../docs/srs.md#srs-f-006-public-profile-gallery), [SRS-F-007](../../../docs/srs.md#srs-f-007-shareable-album-and-gallery-links)
  - **Related Tests:** [`public_profile_gallery_SRS-F-006.feature`](../tests/features/public_profile_gallery_SRS-F-006.feature), [`shareable_links_SRS-F-007.feature`](../tests/features/shareable_links_SRS-F-007.feature), [`ui_public_profile_UI-SCR-007.feature`](../tests/features/ui_public_profile_UI-SCR-007.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task FE-4.2. Walkthrough, check off, commit, push.`

- [ ] **Task FE-4.3: Photo detail and deletion UX**
  - **Description:** UI-SCR-003 detail panel: visibility chip, C2PA summary placeholder, delete confirmation, remove-from-album. Dual provenance labels (TC-011).
  - **Estimated Time:** 6 hours
  - **Dependencies:** Task FE-4.2
  - **Related Requirements:** [F-009](../../../docs/prd.md#f-009-photo-deletion-and-album-membership-management), [SRS-F-009](../../../docs/srs.md#srs-f-009-photo-deletion-and-album-membership), [UI-SCR-003](../../../docs/ui-requirements.md#ui-scr-003-photo-detail)
  - **Related Tests:** [`photo_deletion_SRS-F-009.feature`](../tests/features/photo_deletion_SRS-F-009.feature), [`ui_photo_detail_UI-SCR-003.feature`](../tests/features/ui_photo_detail_UI-SCR-003.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task FE-4.3. Walkthrough, check off, commit, push.`

---

## Phase FE-5: Permissioned Albums

- [ ] **Task FE-5.1: Permissioned album creation and space admin UI**
  - **Description:** `visibility: permissioned` album flow; space URI display; UI-SCR-006 member directory (Authority/Contributor/Viewer → `read`/`write`), token invite + direct addMember, mint policy dropdown (`member-list`/`public`/`managing-app`), access-denied state without metadata leak. Permissioned upload uses `space.createRecord` + `space.getBlob`.
  - **Estimated Time:** 14 hours
  - **Dependencies:** Task FE-4.3
  - **Related Requirements:** [F-008](../../../docs/prd.md#f-008-permissioned-gallery--album-access-happyview-permissioned-spaces-validation), [SRS-F-008](../../../docs/srs.md#srs-f-008-permissioned-album-access-happyview-spaces), [NFR-002](../../../docs/prd.md#nfr-002-public-by-default-transparency), [UI-SCR-006](../../../docs/ui-requirements.md#ui-scr-006-permissioned-space-administration), [ADR-010](../../../docs/architecture/010-permissioned-spaces-storage.md)
  - **Related Tests:** [`permissioned_albums_SRS-F-008.feature`](../tests/features/permissioned_albums_SRS-F-008.feature), [`ui_permissioned_space_UI-SCR-006.feature`](../tests/features/ui_permissioned_space_UI-SCR-006.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task FE-5.1. Holistic permissioned album + space admin. DPoP for member reads; document Bearer credential path for thumbnails. Invoke @feature-writer. Walkthrough, check off, commit, push.`

---

## Phase FE-6: C2PA UI

- [ ] **Task FE-6.1: C2PA validation and trust configuration UI**
  - **Description:** UI-SCR-008 trust list; photo detail C2PA Levels 1–3 disclosure (F-014); neutral copy per NFR-016; ingredient/derivative display (F-015); edit-chain refresh after caption edit (F-013).
  - **Estimated Time:** 10 hours
  - **Dependencies:** Task FE-5.1; backend BE-6.1
  - **Related Requirements:** [F-013](../../../docs/prd.md#f-013-c2pa-provenance-on-edit-and-publish) through [F-016](../../../docs/prd.md#f-016-c2pa-trust-configuration), [NFR-015](../../../docs/prd.md#nfr-015-c2pa-privacy-and-selective-disclosure), [NFR-016](../../../docs/prd.md#nfr-016-c2pa-neutral-trust-presentation), [UI-SCR-008](../../../docs/ui-requirements.md#ui-scr-008-c2pa-trust-configuration)
  - **Related Tests:** [`c2pa_validation_ui_SRS-F-014.feature`](../tests/features/c2pa_validation_ui_SRS-F-014.feature), [`c2pa_trust_config_SRS-F-016.feature`](../tests/features/c2pa_trust_config_SRS-F-016.feature)
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task FE-6.1. No "authentic/fake" language. Walkthrough, check off, commit, push.`

---

## Phase FE-7: Verification

- [ ] **Task FE-7.1: Frontend release-criteria UI verification**
  - **Description:** Run full vitest UI suite against production build; verify RC-001, RC-003, RC-004, RC-007, RC-009 UI portions; NFR-002 disclosure copy on permissioned albums.
  - **Estimated Time:** 4 hours
  - **Dependencies:** Task FE-6.1
  - **Related Requirements:** [RC-001](../../../docs/prd.md#rc-001-end-to-end-upload-and-gallery) through [RC-009](../../../docs/prd.md#rc-009-c2pa-upload-validation-and-edit-chain), [NFR-002](../../../docs/prd.md#nfr-002-public-by-default-transparency)
  - **Related Tests:** All `apps/frontend/tests/features/ui_*.feature` and `*_SRS-*.feature`
  - **Agent Prompt:** `@AGENTS.md Begin by creating a new feature branch for Task FE-7.1. npm run build && npm run test:ui. Allure report. Walkthrough with full CLI output. Check off docs/plan.md Task 7.1 frontend portion. Commit and push.`

---

## Summary Timeline

- **Total Estimated Time:** ~77 hours
- **Critical Path:** FE-1 → FE-2 (holistic shell) → FE-3 (upload/gallery/albums) → FE-5 (permissioned) → FE-6 (C2PA UI) → FE-7