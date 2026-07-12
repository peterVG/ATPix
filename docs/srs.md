# Software Requirements Specification: ATPix

**Version:** 1.0  
**Last Updated:** 2026-07-12T22:00:00Z  
**Status:** Draft — derived from PRD v1.5  
**Sources:** [PRD](./prd.md) · [Product Vision](./product-vision.md) · [AGENTS.md](../AGENTS.md) · [Lexicon](./lexicon/README.md)

---

# Introduction

This SRS translates [docs/prd.md](./prd.md) into verifiable technical requirements for the ATPix monorepo (`apps/frontend/`, `apps/backend/`) and its HappyView App View dependency. Requirement keywords follow [RFC 2119](../.agents/kb/rfc-2119-req-terms.md). Each block includes **Source** (PRD traceability) and **Tests** (forward traceability to BDD, integration, UI, performance, or CI verification).

**Architecture baseline:** [005-application-architecture.md](./architecture/005-application-architecture.md) — vanilla JS frontend (Vite, port 5173), FastAPI auxiliary backend (port 8000), external HappyView for XRPC/OAuth/indexing.

**UI requirements:** Screen layouts, component states, and design-token application are specified in [ui-requirements.md](./ui-requirements.md) (derived from [000-UX-guide.md](./references/000-UX-guide.md) and v1 mockups). This SRS retains verifiable behavioral requirements; UI-SCR-* IDs in the UI spec link back to SRS-F-* blocks here.

---

# Functional Requirements

## SRS-F-001: atproto OAuth Sign-In

### SRS-F-001.1: OAuth authentication flow

The frontend MUST initiate atproto OAuth via `@happyview/oauth-client-browser` (v1.4.x) with DPoP key provisioning. The application MUST NOT use app passwords, legacy JWT session storage, or custom password forms.

**Technical Implementation:**
- OAuth redirect/callback handled in `apps/frontend/src/` auth module.
- DPoP-bound tokens stored per HappyView client library conventions (not plaintext passwords).
- Sign-out revokes the device DPoP session only.

**Source**
- [prd.md](./prd.md) F-001: atproto OAuth Sign-In

**Tests**
- [`oauth_sign_in_SRS-F-001.feature`](../apps/frontend/tests/features/oauth_sign_in_SRS-F-001.feature)
- [`test_oauth_session.js`](../apps/frontend/tests/unit/test_oauth_session.js)

### SRS-F-001.2: X-Client-Key on all XRPC

Every HappyView XRPC request from the browser MUST include header `X-Client-Key` set from `VITE_HAPPYVIEW_CLIENT_KEY`. Admin keys (`hv_*`) MUST NOT be used on XRPC routes.

**Source**
- [prd.md](./prd.md) F-001, TC-006

**Tests**
- [`oauth_sign_in_SRS-F-001.feature`](../apps/frontend/tests/features/oauth_sign_in_SRS-F-001.feature)
- [`test_happyview_client.js`](../apps/frontend/tests/unit/happyview.test.js)

### SRS-F-001.3: Authenticated identity display

After successful sign-in, the UI MUST display the authenticated user's handle and/or DID. Unauthenticated users MUST NOT access write procedures.

**Source**
- [prd.md](./prd.md) F-001

**Tests**
- [`oauth_sign_in_SRS-F-001.feature`](../apps/frontend/tests/features/oauth_sign_in_SRS-F-001.feature)

---

## SRS-F-002: Photo Upload

### SRS-F-002.1: Upload procedure sequence

Authenticated users MUST upload `image/*` files via: (1) C2PA manifest embed per SRS-F-012, (2) `com.atproto.repo.uploadBlob` via HappyView OAuth proxy, (3) `com.atpix.gallery.createPhoto` with blob ref and C2PA summary fields.

**Technical Implementation:**
- HappyView proxy URL from `VITE_HAPPYVIEW_URL`.
- Record `createdAt` MUST be RFC 3339 UTC (`Z` suffix).
- Indexed copy appears in HappyView SQLite/Postgres index.

**Source**
- [prd.md](./prd.md) F-002, NFR-005

**Tests**
- [`photo_upload_SRS-F-002.feature`](../apps/frontend/tests/features/photo_upload_SRS-F-002.feature)
- [`c2pa_manifest_generation_SRS-F-012.feature`](../apps/backend/tests/features/c2pa_manifest_generation_SRS-F-012.feature)

### SRS-F-002.2: Upload UX and size limit

The UI MUST show per-file upload progress and completion/error states. Files exceeding **50MB** MUST be rejected before transfer with a user-visible error.

**Source**
- [prd.md](./prd.md) F-002, TC-002

**Tests**
- [`photo_upload_SRS-F-002.feature`](../apps/frontend/tests/features/photo_upload_SRS-F-002.feature)

### SRS-F-002.3: Gallery refresh after upload

Newly uploaded photos MUST appear in the personal gallery (SRS-F-003) on next client query without requiring manual server intervention.

**Source**
- [prd.md](./prd.md) F-002

**Tests**
- [`photo_upload_SRS-F-002.feature`](../apps/frontend/tests/features/photo_upload_SRS-F-002.feature)
- [`personal_gallery_SRS-F-003.feature`](../apps/frontend/tests/features/personal_gallery_SRS-F-003.feature)

---

## SRS-F-003: Personal Gallery Grid (Path A)

### SRS-F-003.1: My Gallery view

The application MUST provide a **My Gallery** view distinct from the network discovery feed (SRS-F-010). Photos MUST render in a paginated grid with thumbnails from PDS blob URLs.

**Technical Implementation:**
- Query: `com.atpix.gallery.listPhotos?did=<author-did>` with cursor pagination.
- Default `limit`: 20 (MAY override within Lexicon bounds).
- Data source: HappyView App View index only.

**Source**
- [prd.md](./prd.md) F-003

**Tests**
- [`personal_gallery_SRS-F-003.feature`](../apps/frontend/tests/features/personal_gallery_SRS-F-003.feature)
- [`gallery_query_performance_SRS-NFR-011.feature`](../apps/backend/tests/features/gallery_query_performance_SRS-NFR-011.feature)

### SRS-F-003.2: Empty state

Empty gallery MUST show actionable guidance (e.g., upload your first photo).

**Source**
- [prd.md](./prd.md) F-003

**Tests**
- [`personal_gallery_SRS-F-003.feature`](../apps/frontend/tests/features/personal_gallery_SRS-F-003.feature)

---

## SRS-F-004: Album Organization

### SRS-F-004.1: Album CRUD

Authenticated users MUST create albums via `com.atpix.gallery.createAlbum`, rename via `updateAlbum`, and delete empty albums via `deleteAlbum`.

**Source**
- [prd.md](./prd.md) F-004

**Tests**
- [`album_organization_SRS-F-004.feature`](../apps/frontend/tests/features/album_organization_SRS-F-004.feature)

### SRS-F-004.2: Album membership

Users MUST add/remove photos via `com.atpix.gallery.addToAlbum` / `removeFromAlbum` (`albumItem` junction records) and MAY update `photo.albumUris`. Deleting an album MUST NOT delete underlying photo records.

**Source**
- [prd.md](./prd.md) F-004, F-015

**Tests**
- [`album_organization_SRS-F-004.feature`](../apps/frontend/tests/features/album_organization_SRS-F-004.feature)

### SRS-F-004.3: Dual-path album seeding

Album creation MUST support seeding from Path A (own uploads) and Path B (`collectionRule` matches per SRS-F-010). UI MUST expose both paths.

**Source**
- [prd.md](./prd.md) F-004, F-010

**Tests**
- [`album_organization_SRS-F-004.feature`](../apps/frontend/tests/features/album_organization_SRS-F-004.feature)
- [`network_discovery_SRS-F-010.feature`](../apps/frontend/tests/features/network_discovery_SRS-F-010.feature)

---

## SRS-F-005: Captions and Tags

### SRS-F-005.1: Caption editing

Users MUST set/edit optional captions (max 2000 chars per Lexicon) on upload and in photo detail via `com.atpix.gallery.updatePhoto`.

**Source**
- [prd.md](./prd.md) F-005

**Tests**
- [`captions_tags_SRS-F-005.feature`](../apps/frontend/tests/features/captions_tags_SRS-F-005.feature)

### SRS-F-005.2: Keywords / hashtags

Users MUST add/remove tags in `keywords` field (dc:subject / schema:keywords). Tag search via `listPhotos?tag=` MUST be supported and MUST feed SRS-F-010 hashtag matching (lowercase, strip `#`).

**Source**
- [prd.md](./prd.md) F-005, F-010

**Tests**
- [`captions_tags_SRS-F-005.feature`](../apps/frontend/tests/features/captions_tags_SRS-F-005.feature)
- [`network_discovery_SRS-F-010.feature`](../apps/frontend/tests/features/network_discovery_SRS-F-010.feature)

---

## SRS-F-006: Public Profile Gallery

### SRS-F-006.1: Public route resolution

The application MUST expose a public profile gallery route by DID (primary) and handle (convenience). Handle resolution MUST use `com.atproto.identity.resolveHandle` before querying `listPhotos`.

**Source**
- [prd.md](./prd.md) F-006

**Tests**
- [`public_profile_gallery_SRS-F-006.feature`](../apps/frontend/tests/features/public_profile_gallery_SRS-F-006.feature)

### SRS-F-006.2: Unauthenticated read

Public galleries MUST NOT require authentication unless content is permission-gated (SRS-F-008). Only `com.atpix.gallery.photo` indexed records appear. Pagination MUST match SRS-F-003 cursor semantics.

**Source**
- [prd.md](./prd.md) F-006

**Tests**
- [`public_profile_gallery_SRS-F-006.feature`](../apps/frontend/tests/features/public_profile_gallery_SRS-F-006.feature)

---

## SRS-F-007: Shareable Album and Gallery Links

### SRS-F-007.1: Stable share URLs

Users MUST copy stable URLs for public profile gallery and individual albums. Album `visibility` MUST support `public`, `unlisted`, `permissioned`.

**Source**
- [prd.md](./prd.md) F-007

**Tests**
- [`shareable_links_SRS-F-007.feature`](../apps/frontend/tests/features/shareable_links_SRS-F-007.feature)

### SRS-F-007.2: Unlisted behavior

Unlisted albums MUST NOT appear in public profile album lists or discovery surfaces but MUST remain reachable via direct link for unauthenticated viewers.

**Source**
- [prd.md](./prd.md) F-007

**Tests**
- [`shareable_links_SRS-F-007.feature`](../apps/frontend/tests/features/shareable_links_SRS-F-007.feature)

---

## SRS-F-008: Permissioned Album Access (HappyView Spaces)

### SRS-F-008.1: Permissioned album lifecycle

Album owners MUST create `visibility: permissioned` albums with linked `spaceUri` (`ats://<space-did>/com.atpix.gallery.albumSpace/<skey>`). Space creation MUST call `com.atproto.simplespace.createSpace` with `type: com.atpix.gallery.albumSpace`, `mintPolicy: member-list`, and ATPix `appAccess`.

**Technical Implementation:**
- HappyView MUST have `feature.spaces_enabled=true` (TC-008).
- Photos and `albumItem` for permissioned albums MUST use `com.atproto.space.putRecord` / `createRecord`, not public repo writes.

**Source**
- [prd.md](./prd.md) F-008, TC-004, TC-008, NFR-013

**Tests**
- [`permissioned_albums_SRS-F-008.feature`](../apps/frontend/tests/features/permissioned_albums_SRS-F-008.feature)
- [`permissioned_spaces_integration_SRS-F-008.feature`](../apps/backend/tests/features/permissioned_spaces_integration_SRS-F-008.feature)

### SRS-F-008.2: Membership and credentials

Owners MUST invite via `dev.happyview.space.createInvite` and manage members via `addMember` / `removeMember`. Authorized reads MUST use `getDelegationToken` → `getSpaceCredential`. Unauthorized users MUST receive access-denied without leaking thumbnails, CIDs, or metadata.

**Source**
- [prd.md](./prd.md) F-008, NFR-002

**Tests**
- [`permissioned_spaces_integration_SRS-F-008.feature`](../apps/backend/tests/features/permissioned_spaces_integration_SRS-F-008.feature)

### SRS-F-008.3: Index isolation

Permissioned content MUST NOT appear in public App View indexes. Queries for permissioned content MUST require valid space credentials. Client-side encryption MUST NOT be implemented.

**Source**
- [prd.md](./prd.md) F-008, TC-004

**Tests**
- [`permissioned_spaces_integration_SRS-F-008.feature`](../apps/backend/tests/features/permissioned_spaces_integration_SRS-F-008.feature)

---

## SRS-F-009: Photo Deletion and Album Membership

### SRS-F-009.1: Photo deletion

Authenticated users MUST delete own photos via `com.atpix.gallery.deletePhoto`. UI MUST require explicit confirmation. Errors from PDS MUST surface; success MUST NOT be shown until procedure completes.

**Source**
- [prd.md](./prd.md) F-009

**Tests**
- [`photo_deletion_SRS-F-009.feature`](../apps/frontend/tests/features/photo_deletion_SRS-F-009.feature)

### SRS-F-009.2: Remove from album

Users MUST remove photos from albums via `removeFromAlbum` without deleting the photo record. Post-deletion views MUST update after re-indexing.

**Source**
- [prd.md](./prd.md) F-009

**Tests**
- [`photo_deletion_SRS-F-009.feature`](../apps/frontend/tests/features/photo_deletion_SRS-F-009.feature)

---

## SRS-F-010: Network Discovery Feed (Path B)

### SRS-F-010.1: HappyView-only sync

ATPix MUST NOT implement relay firehose, Tap consumer, or custom PDS crawler (TC-012). Discovery MUST use HappyView Jetstream + backfill index only.

**Source**
- [prd.md](./prd.md) F-010, TC-012

**Tests**
- [`network_discovery_SRS-F-010.feature`](../apps/frontend/tests/features/network_discovery_SRS-F-010.feature)
- [`happyview_only_sync_SRS-TC-012.feature`](../apps/backend/tests/features/happyview_only_sync_SRS-TC-012.feature)

### SRS-F-010.2: Collection rules

Users MUST CRUD `com.atpix.gallery.collectionRule` records with `followed-actor`, `hashtag`, or combined sources. `targetScope` MUST support `gallery` (discovery feed) and `album` (with optional `targetAlbumUri`). Follow graph via `app.bsky.graph.getFollows`; `useFollowGraph: true` compares live follows.

**Source**
- [prd.md](./prd.md) F-010

**Tests**
- [`network_discovery_SRS-F-010.feature`](../apps/frontend/tests/features/network_discovery_SRS-F-010.feature)

### SRS-F-010.3: Discovery feed query

Feed MUST use `com.atpix.gallery.listFeedPhotos` with cursor pagination. New network-indexed matches MUST appear on next query. Empty follow/hashtag states MUST show guidance, not errors.

**Source**
- [prd.md](./prd.md) F-010

**Tests**
- [`network_discovery_SRS-F-010.feature`](../apps/frontend/tests/features/network_discovery_SRS-F-010.feature)

---

## SRS-F-011: Lexicon Publication and Network Indexing

### SRS-F-011.1: Lexicon artifacts

ATPix MUST ship record/query/procedure Lexicons under `com.atpix.gallery.*` per [docs/lexicon/](./lexicon/) JSON. Procedures/queries MUST declare `target_collection` for corresponding record NSIDs.

**Source**
- [prd.md](./prd.md) F-011

**Tests**
- [`lexicon_publication_SRS-F-011.feature`](../apps/backend/tests/features/lexicon_publication_SRS-F-011.feature)

### SRS-F-011.2: HappyView upload and backfill

Lexicons MUST be uploaded to HappyView with `backfill: true`. ATPix MUST NOT duplicate Jetstream subscription. Breaking changes require new NSIDs (immutability).

**Source**
- [prd.md](./prd.md) F-011, TC-012

**Tests**
- [`lexicon_publication_SRS-F-011.feature`](../apps/backend/tests/features/lexicon_publication_SRS-F-011.feature)

### SRS-F-011.3: DNS authority

Production SHOULD publish `_lexicon` TXT for `com.atpix.gallery` namespace (domain TBD).

**Source**
- [prd.md](./prd.md) F-011

**Tests**
- [`lexicon_publication_SRS-F-011.feature`](../apps/backend/tests/features/lexicon_publication_SRS-F-011.feature)

---

## SRS-F-012: C2PA Manifest Generation on Upload

### SRS-F-012.1: Claim generator role

`apps/backend/` MUST act as C2PA 2.2 claim generator (per [ADR 008](./architecture/008-c2pa-sdk-and-signing.md)). New captures: first action `c2pa.created`; imports: `c2pa.opened` with ingredient when applicable.

**Technical Implementation:**
- Hard-binding `c2pa.hash.data` for JPEG/PNG (TC-009).
- Manifest embedded in-file before blob upload (default).
- X.509 signing with `c2pa-kp-claimSigning` EKU (OID 1.3.6.1.4.1.62558.2.1).
- `claim_generator_info` identifies ATPix name/version.
- Custom assertion `com.atpix.gallery.creatorDid` records uploader DID.

**Source**
- [prd.md](./prd.md) F-012, NFR-014, TC-009, TC-010

**Tests**
- [`c2pa_manifest_generation_SRS-F-012.feature`](../apps/backend/tests/features/c2pa_manifest_generation_SRS-F-012.feature)

### SRS-F-012.2: Privacy opt-out

Users MUST opt out of optional assertions (GPS, device IDs) before signing. Required integrity assertions (actions, hash) MUST remain (NFR-015).

**Source**
- [prd.md](./prd.md) F-012, NFR-015

**Tests**
- [`c2pa_manifest_generation_SRS-F-012.feature`](../apps/backend/tests/features/c2pa_manifest_generation_SRS-F-012.feature)

---

## SRS-F-013: C2PA Provenance on Edit and Publish

### SRS-F-013.1: Update manifest chain

Pixel edits MUST produce update manifest with `parentOf` ingredient. Metadata-only edits: `c2pa.edited.metadata`; pixel edits: `c2pa.edited`. Public publish MUST append `c2pa.published`. Actions MUST NOT be redacted. Each update MUST recompute `c2pa.hash.data` and re-embed before blob replace.

**Source**
- [prd.md](./prd.md) F-013, TC-010

**Tests**
- [`c2pa_provenance_edit_SRS-F-013.feature`](../apps/backend/tests/features/c2pa_provenance_edit_SRS-F-013.feature)
- [`captions_tags_SRS-F-005.feature`](../apps/frontend/tests/features/captions_tags_SRS-F-005.feature)

### SRS-F-013.2: Record C2PA summary fields

`com.atpix.gallery.photo` MUST store `c2paActiveManifestId`, `c2paManifestStoreUri` (if external), `c2paLastAction`.

**Source**
- [prd.md](./prd.md) F-013

**Tests**
- [`c2pa_provenance_edit_SRS-F-013.feature`](../apps/backend/tests/features/c2pa_provenance_edit_SRS-F-013.feature)

---

## SRS-F-014: C2PA Validation and Content Credentials UI

### SRS-F-014.1: Validator execution

Backend MUST implement C2PA validator (§15 process). Frontend MUST display Level 1 (presence + status) and Level 2 (action summary) minimum; Level 3 SHOULD be available on expand.

**Source**
- [prd.md](./prd.md) F-014, NFR-016

**Tests**
- [`c2pa_validation_ui_SRS-F-014.feature`](../apps/frontend/tests/features/c2pa_validation_ui_SRS-F-014.feature)
- [`c2pa_validation_performance_SRS-NFR-017.feature`](../apps/backend/tests/features/c2pa_validation_performance_SRS-NFR-017.feature)

### SRS-F-014.2: Neutral presentation

UI MUST distinguish Well-Formed, Valid, Trusted without labeling content "fake" or "authentic". Missing manifest: explicit "No Content Credentials" state. `ingredient.unknownProvenance` MUST be disclosed. WCAG 2.x for indicators/panels. Embedded manifests MUST validate offline.

**Source**
- [prd.md](./prd.md) F-014, NFR-016, TC-011

**Tests**
- [`c2pa_validation_ui_SRS-F-014.feature`](../apps/frontend/tests/features/c2pa_validation_ui_SRS-F-014.feature)

---

## SRS-F-015: C2PA Ingredient and Derivative Handling

### SRS-F-015.1: Album membership without manifest strip

`addToAlbum` on C2PA-bearing photos MUST NOT strip manifests; no new manifest unless pixels change.

**Source**
- [prd.md](./prd.md) F-015

**Tests**
- [`c2pa_ingredient_handling_SRS-F-015.feature`](../apps/backend/tests/features/c2pa_ingredient_handling_SRS-F-015.feature)
- [`album_organization_SRS-F-004.feature`](../apps/frontend/tests/features/album_organization_SRS-F-004.feature)

### SRS-F-015.2: Compositions and transcode

Collage/cover merge MUST use `c2pa.opened`/`c2pa.placed` with `c2pa.ingredient.v3`. Transcode MUST record `c2pa.transcoded` or `c2pa.repackaged`. Validator MUST walk ingredient chains for Level 3.

**Source**
- [prd.md](./prd.md) F-015

**Tests**
- [`c2pa_ingredient_handling_SRS-F-015.feature`](../apps/backend/tests/features/c2pa_ingredient_handling_SRS-F-015.feature)

---

## SRS-F-016: C2PA Trust Configuration

### SRS-F-016.1: Default trust list

Validator MUST ship C2PA Trust List for claim signing and TSA anchors. Users MAY add/remove signer anchors; private credential store MUST NOT be pre-populated; user MUST approve private entries explicitly.

**Source**
- [prd.md](./prd.md) F-016

**Tests**
- [`c2pa_trust_config_SRS-F-016.feature`](../apps/frontend/tests/features/c2pa_trust_config_SRS-F-016.feature)

### SRS-F-016.2: Trust state independence

Trust configuration changes MUST affect Trusted state only; Valid and Well-Formed MUST remain independent of user trust lists.

**Source**
- [prd.md](./prd.md) F-016

**Tests**
- [`c2pa_trust_config_SRS-F-016.feature`](../apps/frontend/tests/features/c2pa_trust_config_SRS-F-016.feature)

---

# Non-Functional Requirements

## SRS-NFR-001: Data Ownership and Verifiability

Photo records and blob refs MUST reside in user PDS repos as signed atproto records. HappyView index MUST NOT be sole custodian.

**Source**
- [prd.md](./prd.md) NFR-001

**Tests**
- [`data_ownership_SRS-NFR-001.feature`](../apps/backend/tests/features/data_ownership_SRS-NFR-001.feature)

## SRS-NFR-002: Public-by-Default Transparency

UI MUST inform users that public repo records are world-readable unless in permissioned spaces. v1 MUST NOT implement encrypted private albums. Permissioned albums MUST disclose membership-gating, not encryption.

**Source**
- [prd.md](./prd.md) NFR-002

**Tests**
- [`permissioned_albums_SRS-F-008.feature`](../apps/frontend/tests/features/permissioned_albums_SRS-F-008.feature)
- [`shareable_links_SRS-F-007.feature`](../apps/frontend/tests/features/shareable_links_SRS-F-007.feature)

## SRS-NFR-003: Authentication Security

OAuth + DPoP only; no plaintext credential storage. Production HappyView SHOULD set `TOKEN_ENCRYPTION_KEY`.

**Source**
- [prd.md](./prd.md) NFR-003

**Tests**
- [`oauth_sign_in_SRS-F-001.feature`](../apps/frontend/tests/features/oauth_sign_in_SRS-F-001.feature)
- [`authentication_security_SRS-NFR-003.feature`](../apps/backend/tests/features/authentication_security_SRS-NFR-003.feature)

## SRS-NFR-004: Observability and Logging

All processes MUST log structured events unbuffered to `stdout`. Stack: Promtail → Redpanda → Loki; Prometheus metrics; Grafana. No local log files.

**Source**
- [prd.md](./prd.md) NFR-004

**Tests**
- [`observability_logging_SRS-NFR-004.feature`](../apps/backend/tests/features/observability_logging_SRS-NFR-004.feature)
- [docker-compose.yml](../docker-compose.yml) service health checks
- [003-observability-stack.md](./architecture/003-observability-stack.md)

## SRS-NFR-005: Timestamp Standards

All timestamps MUST use RFC 3339 UTC.

**Source**
- [prd.md](./prd.md) NFR-005

**Tests**
- [`photo_upload_SRS-F-002.feature`](../apps/frontend/tests/features/photo_upload_SRS-F-002.feature)
- Ruff/eslint CI gates on record serializers

## SRS-NFR-006: Testability and Quality Gates

Every PRD `MUST` MUST map to unit, integration, UI, BDD, or performance verification. Frontend UI tests MUST run against `vite build` artifacts. Reports via Allure per ADR 001.

**Source**
- [prd.md](./prd.md) NFR-006

**Tests**
- [001-test-runners-and-reporting.md](./architecture/001-test-runners-and-reporting.md)
- CI: `pytest`, `npm run build && npm run test:unit`
- This SRS traceability matrix (below)

## SRS-NFR-007: Zero-Friction Local Setup

Local dev MUST auto-provision SQLite index, seed Lexicons, and prompt for missing OAuth/client keys per `.env.example`.

**Source**
- [prd.md](./prd.md) NFR-007

**Tests**
- [`zero_friction_setup_SRS-NFR-007.feature`](../apps/backend/tests/features/zero_friction_setup_SRS-NFR-007.feature)
- [README.md](../README.md) setup commands verified per command-verification rule

## SRS-NFR-008: Modularity and Interface-First Design

Features MUST expose documented XRPC Lexicons. Frontend communicates via HappyView XRPC, not ad-hoc internal APIs. Modules (auth, upload, gallery, album) MUST be independently testable.

**Source**
- [prd.md](./prd.md) NFR-008

**Tests**
- [`lexicon_publication_SRS-F-011.feature`](../apps/backend/tests/features/lexicon_publication_SRS-F-011.feature)
- Module-level unit tests under `apps/*/tests/unit/`

## SRS-NFR-009: Dependency Minimization

Prefer HappyView App View, user PDS blobs, SQLite index. New npm/Python deps require justification in PR/ADR.

**Source**
- [prd.md](./prd.md) NFR-009

**Tests**
- Dependency review in CI (lockfile diff)
- [005-application-architecture.md](./architecture/005-application-architecture.md)

## SRS-NFR-010: Scale-to-Zero Orientation

Deployments SHOULD scale App View and static frontend to minimal idle cost. Always-on DBs beyond SQLite/Postgres index require ADR.

**Source**
- [prd.md](./prd.md) NFR-010

**Tests**
- [005-application-architecture.md](./architecture/005-application-architecture.md)
- Static `vite build` deploy path documented in README

## SRS-NFR-011: Gallery Query Performance

Paginated gallery queries SHOULD return first page within **2 seconds p95** (local dev: single HappyView, SQLite, ≤10k photos).

**Source**
- [prd.md](./prd.md) NFR-011

**Tests**
- [`gallery_query_performance_SRS-NFR-011.feature`](../apps/backend/tests/features/gallery_query_performance_SRS-NFR-011.feature)
- [`locust_gallery.py`](../apps/backend/tests/performance/locust_gallery.py)

## SRS-NFR-012: Documentation Portability

All doc cross-references MUST use relative Markdown links; no absolute developer machine paths.

**Source**
- [prd.md](./prd.md) NFR-012

**Tests**
- CI link checker / grep for `/Users/` in `docs/` and `README.md`
- [links-enforce.md](../.agents/rules/links-enforce.md) compliance review

## SRS-NFR-013: Permissioned Spaces Reference Validation

Test reports MUST include space lifecycle scenarios and document `feature.spaces_enabled` status.

**Source**
- [prd.md](./prd.md) NFR-013

**Tests**
- [`permissioned_spaces_integration_SRS-F-008.feature`](../apps/backend/tests/features/permissioned_spaces_integration_SRS-F-008.feature)
- Allure reports under `apps/backend/tests/allure-results/`

## SRS-NFR-014: C2PA 2.2 Conformance

Implementation MUST target C2PA 2.2 (2025-05-01). MUST NOT emit Appendix C deprecated constructs.

**Source**
- [prd.md](./prd.md) NFR-014

**Tests**
- [`c2pa_manifest_generation_SRS-F-012.feature`](../apps/backend/tests/features/c2pa_manifest_generation_SRS-F-012.feature)
- [008-c2pa-sdk-and-signing.md](./architecture/008-c2pa-sdk-and-signing.md)

## SRS-NFR-015: C2PA Privacy and Selective Disclosure

No GPS/device identifiers in `c2pa.metadata` without per-upload consent.

**Source**
- [prd.md](./prd.md) NFR-015

**Tests**
- [`c2pa_manifest_generation_SRS-F-012.feature`](../apps/backend/tests/features/c2pa_manifest_generation_SRS-F-012.feature)

## SRS-NFR-016: C2PA Neutral Trust Presentation

No "authentic"/"fake" labels; report validation states and signer identity only.

**Source**
- [prd.md](./prd.md) NFR-016

**Tests**
- [`c2pa_validation_ui_SRS-F-014.feature`](../apps/frontend/tests/features/c2pa_validation_ui_SRS-F-014.feature)

## SRS-NFR-017: C2PA Validation Performance

Level 1–2 validation for ≤10MB JPEG SHOULD complete within **3 seconds p95** on reference hardware.

**Source**
- [prd.md](./prd.md) NFR-017

**Tests**
- [`c2pa_validation_performance_SRS-NFR-017.feature`](../apps/backend/tests/features/c2pa_validation_performance_SRS-NFR-017.feature)
- [`locust_c2pa.py`](../apps/backend/tests/performance/locust_c2pa.py)

---

# Technical Constraints

| SRS ID | PRD ID | Requirement summary | Primary verification |
|--------|--------|---------------------|----------------------|
| SRS-TC-001 | TC-001 | Aggregation/indexing/OAuth/XRPC on HappyView only; no custom App View | ADR 007, architecture review |
| SRS-TC-002 | TC-002 | Max 50MB per image upload | `photo_upload_SRS-F-002.feature` |
| SRS-TC-003 | TC-003 | PDS account required for uploads | `oauth_sign_in_SRS-F-001.feature` |
| SRS-TC-004 | TC-004 | Public/unlisted in PDS repo; permissioned in space repo; no client-side encryption | `permissioned_spaces_integration_SRS-F-008.feature` |
| SRS-TC-005 | TC-005 | Photo records < 1 MiB CBOR; binaries in blobs | `lexicon_publication_SRS-F-011.feature` |
| SRS-TC-006 | TC-006 | `X-Client-Key` on XRPC; no `hv_*` on XRPC | `oauth_sign_in_SRS-F-001.feature` |
| SRS-TC-007 | TC-007 | Production artifacts independent of `.agents/` tooling | `src-isolation` CI check |
| SRS-TC-008 | TC-008 | `feature.spaces_enabled` for permissioned testing | `permissioned_spaces_integration_SRS-F-008.feature` |
| SRS-TC-009 | TC-009 | C2PA embedded in JPEG/PNG by default | `c2pa_manifest_generation_SRS-F-012.feature` |
| SRS-TC-010 | TC-010 | No actions redaction; first action created/opened | `c2pa_manifest_generation_SRS-F-012.feature` |
| SRS-TC-011 | TC-011 | Dual provenance: atproto signatures + C2PA both surfaced | `c2pa_validation_ui_SRS-F-014.feature` |
| SRS-TC-012 | TC-012 | No standalone firehose; HappyView sync only | `happyview_only_sync_SRS-TC-012.feature` |

**Source**
- [prd.md](./prd.md) Technical Constraints TC-001 through TC-012

**Tests**
- Feature files and ADRs listed per row above
- [`happyview_only_sync_SRS-TC-012.feature`](../apps/backend/tests/features/happyview_only_sync_SRS-TC-012.feature)

---

# Release Criteria Mapping

| PRD RC | SRS verification artifact |
|--------|---------------------------|
| RC-001 | `photo_upload_SRS-F-002.feature` + `personal_gallery_SRS-F-003.feature` |
| RC-002 | `public_profile_gallery_SRS-F-006.feature` + `gallery_query_performance_SRS-NFR-011.feature` |
| RC-003 | `shareable_links_SRS-F-007.feature` |
| RC-004 | `oauth_sign_in_SRS-F-001.feature` + `authentication_security_SRS-NFR-003.feature` |
| RC-005 | `observability_logging_SRS-NFR-004.feature` |
| RC-006 | `lexicon_publication_SRS-F-011.feature` |
| RC-007 | `permissioned_spaces_integration_SRS-F-008.feature` |
| RC-008 | `photo_upload_SRS-F-002.feature` + `network_discovery_SRS-F-010.feature` |
| RC-009 | `c2pa_manifest_generation_SRS-F-012.feature` + `c2pa_provenance_edit_SRS-F-013.feature` + `c2pa_validation_ui_SRS-F-014.feature` |

---

# Traceability Matrix (PRD → SRS)

| PRD ID | SRS ID(s) | Status |
|--------|-----------|--------|
| F-001 | SRS-F-001 | ✅ Mapped |
| F-002 | SRS-F-002 | ✅ Mapped |
| F-003 | SRS-F-003 | ✅ Mapped |
| F-004 | SRS-F-004 | ✅ Mapped |
| F-005 | SRS-F-005 | ✅ Mapped |
| F-006 | SRS-F-006 | ✅ Mapped |
| F-007 | SRS-F-007 | ✅ Mapped |
| F-008 | SRS-F-008 | ✅ Mapped |
| F-009 | SRS-F-009 | ✅ Mapped |
| F-010 | SRS-F-010 | ✅ Mapped |
| F-011 | SRS-F-011 | ✅ Mapped |
| F-012 | SRS-F-012 | ✅ Mapped |
| F-013 | SRS-F-013 | ✅ Mapped |
| F-014 | SRS-F-014 | ✅ Mapped |
| F-015 | SRS-F-015 | ✅ Mapped |
| F-016 | SRS-F-016 | ✅ Mapped |
| NFR-001 | SRS-NFR-001 | ✅ Mapped |
| NFR-002 | SRS-NFR-002 | ✅ Mapped |
| NFR-003 | SRS-NFR-003 | ✅ Mapped |
| NFR-004 | SRS-NFR-004 | ✅ Mapped |
| NFR-005 | SRS-NFR-005 | ✅ Mapped |
| NFR-006 | SRS-NFR-006 | ✅ Mapped |
| NFR-007 | SRS-NFR-007 | ✅ Mapped |
| NFR-008 | SRS-NFR-008 | ✅ Mapped |
| NFR-009 | SRS-NFR-009 | ✅ Mapped |
| NFR-010 | SRS-NFR-010 | ✅ Mapped |
| NFR-011 | SRS-NFR-011 | ✅ Mapped |
| NFR-012 | SRS-NFR-012 | ✅ Mapped |
| NFR-013 | SRS-NFR-013 | ✅ Mapped |
| NFR-014 | SRS-NFR-014 | ✅ Mapped |
| NFR-015 | SRS-NFR-015 | ✅ Mapped |
| NFR-016 | SRS-NFR-016 | ✅ Mapped |
| NFR-017 | SRS-NFR-017 | ✅ Mapped |
| TC-001 | SRS-TC-001 | ✅ Mapped |
| TC-002 | SRS-TC-002 | ✅ Mapped |
| TC-003 | SRS-TC-003 | ✅ Mapped |
| TC-004 | SRS-TC-004 | ✅ Mapped |
| TC-005 | SRS-TC-005 | ✅ Mapped |
| TC-006 | SRS-TC-006 | ✅ Mapped |
| TC-007 | SRS-TC-007 | ✅ Mapped |
| TC-008 | SRS-TC-008 | ✅ Mapped |
| TC-009 | SRS-TC-009 | ✅ Mapped |
| TC-010 | SRS-TC-010 | ✅ Mapped |
| TC-011 | SRS-TC-011 | ✅ Mapped |
| TC-012 | SRS-TC-012 | ✅ Mapped |

**Coverage:** 45/45 PRD requirement identifiers mapped (100%).