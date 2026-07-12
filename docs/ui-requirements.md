# UI Requirements Specification: ATPix

**Version:** 1.0  
**Last Updated:** 2026-07-12T23:00:00Z  
**Status:** Draft — aligned with UX guide and v1 mockups  
**Sources:** [UX Guide](./references/000-UX-guide.md) · [SRS](./srs.md) · [PRD](./prd.md) · [Mockups](./references/mockups/)

---

# Purpose and document split

This document defines **verifiable user-interface requirements** for ATPix: layouts, components, interaction patterns, accessibility, and visual semantics. It complements—not replaces—the [SRS](./srs.md).

| Document | Owns | Audience |
|----------|------|----------|
| **[SRS](./srs.md)** | Technical behavior, APIs, data flows, performance limits | Engineers, QA, integrators |
| **This UI spec** | Screens, components, states, visual tokens, interaction models | Frontend, design, UI test authors |
| **[000-UX-guide.md](./references/000-UX-guide.md)** | Design tokens, brand principles, component styling | Design system implementers |

**Rationale:** ISO/IEC/IEEE 29148 treats the SRS as a technical specification. Visual design tokens and screen-level layout belong in a dedicated UI requirements artifact so the SRS stays testable against protocol behavior without hundreds of pixel-level entries. The holistic-ui rule requires reviewing **both** `docs/srs.md` and this document before any frontend task.

---

# Design system baseline

All screens MUST implement tokens and principles from [000-UX-guide.md](./references/000-UX-guide.md):

- **Theme:** Dark mode default (`background: #10131b`, `slate-900` surfaces).
- **Typography:** Hanken Grotesk (headings), Inter (body), JetBrains Mono (DIDs, hashes, manifest data).
- **Primary action color:** `atproto-blue` (#0085FF).
- **Neutral trust:** C2PA and visibility labels MUST NOT use subjective language ("authentic", "fake") per SRS-NFR-016.
- **Grid:** 12-column fluid grid; desktop gallery 4 columns default (~20 items/page); 8px spacing rhythm.
- **Shapes:** `rounded-sm` (4px) for thumbnails, buttons, inputs; `rounded-lg` for large panels.

---

# Global shell (all authenticated views)

## UI-SHELL-001: Application chrome

The application MUST provide persistent chrome across Gallery, Discovery, and Albums routes.

| Region | Requirement |
|--------|-------------|
| **Header** | ATPix wordmark (left); primary nav tabs **Gallery**, **Discovery**, **Albums** (center); search, upload, notifications, avatar (right). |
| **Sidebar** | Protocol identity card (`at://` handle/DID); nav: Home, Trending, Collections, Settings; bottom **Upload Media** (primary) and **Sign Out**. |
| **Active route** | Current top tab MUST be visually indicated (underline or `atproto-blue` accent). |
| **Identity** | Signed-in users MUST see handle and/or DID in sidebar per SRS-F-001.3. |

**Source:** UX guide Layout & Components; mockups 01–06  
**SRS:** SRS-F-001.3, SRS-NFR-008  
**Tests:** [`oauth_sign_in_SRS-F-001.feature`](../apps/frontend/tests/features/oauth_sign_in_SRS-F-001.feature)

## UI-SHELL-002: Responsive behavior

| Breakpoint | Behavior |
|------------|----------|
| **Mobile (<768px)** | Sidebar collapses to icon rail or hamburger; gallery 2 columns; metadata panels become full-screen overlays. |
| **Tablet (768–1024px)** | Gallery 3 columns; sidebar visible. |
| **Desktop (>1024px)** | Gallery 4–6 columns; fixed ~400px metadata sidebar on detail views. |

**Source:** UX guide Breakpoints  
**Tests:** UI vitest against production build (NFR-006)

---

# Screen requirements

## UI-SCR-001: My Gallery (Path A)

**Mockup:** [02-my-gallery.jpg](./references/mockups/02-my-gallery.jpg)  
**Route:** `/gallery` (authenticated)  
**SRS:** SRS-F-003

### Layout

- Section label: `PERSONAL ARCHIVE` (`label-caps`).
- Page title: `My Gallery` (`headline-md`).
- Toolbar: vault search input ("Search your vault…") + primary **Upload** button.
- Photo grid: 4-column desktop; aspect-ratio locked cards (3:2 default).

### Media card states

Each thumbnail MUST display Level 1 indicators per UX guide:

| Badge | Color token | Meaning |
|-------|-------------|---------|
| **Trusted** | `c2pa-trusted` | C2PA Trusted validation state |
| **Valid** | `c2pa-wellformed` / blue | Valid manifest, neutral trust |
| **Invalid** | `c2pa-invalid` | Validation failure |
| **Private** | `status-permissioned` | Permissioned / non-public visibility |

### Upload overlay (optimistic UI)

During transfer, cards MUST show 50% opacity overlay, centered spinner, `UPLOADING…` label, and bottom linear progress bar per UX guide Media Cards.

### Pagination

Cursor pagination MUST render numbered pages with prev/next controls; default page size 20 per SRS-F-003.1.

### Empty state

Zero photos MUST show actionable guidance (e.g., "Upload your first photo") with primary Upload CTA.

**Tests:** [`personal_gallery_SRS-F-003.feature`](../apps/frontend/tests/features/personal_gallery_SRS-F-003.feature), [`photo_upload_SRS-F-002.feature`](../apps/frontend/tests/features/photo_upload_SRS-F-002.feature)

---

## UI-SCR-002: Discovery feed (Path B)

**Mockup:** [01-discovery-feed.jpg](./references/mockups/01-discovery-feed.jpg)  
**Route:** `/discovery`  
**SRS:** SRS-F-010

### Layout

- Sub-tabs: **Following** | **Trending Hashtags** (pill style).
- Action: **Manage Collection Rules** (filter icon) opens rule CRUD.
- Network search: header field "Search network…" (MAY scope to indexed photos).
- Grid: same media card component as UI-SCR-001 with visibility + C2PA badges.

### Card badges (discovery context)

| Badge | Token | When |
|-------|-------|------|
| **TRUSTED** / **VALID** | C2PA tokens | Per validation state on indexed blob |
| **PUBLIC** | `status-public` | Photo from public repo |
| **INDEXING…** | neutral slate | HappyView index pending |

### Feed footer

- **Load more results** button for cursor pagination.
- Status line: "Showing *n* of *total* photos" for current rule scope.

### Empty states

Empty follow graph or hashtag with no matches MUST show guidance, not error pages (SRS-F-010.3).

**Tests:** [`network_discovery_SRS-F-010.feature`](../apps/frontend/tests/features/network_discovery_SRS-F-010.feature)

---

## UI-SCR-003: Photo detail

**Mockup:** [03-photo-detail.jpg](./references/mockups/03-photo-detail.jpg)  
**Route:** `/gallery/photo/:uri`  
**SRS:** SRS-F-005, SRS-F-009, SRS-F-014

### Split view (desktop)

- **Primary (flex):** Full photo with back control; optional title overlay on image.
- **Sidebar (400px):** Metadata and actions panel (`surface-container`).

### Sidebar content

| Section | Requirement |
|---------|-------------|
| **Title & visibility** | Photo title (`headline-md`); visibility chip with left border — **PUBLIC** (`status-public`), **UNLISTED** (`status-unlisted`), **PERMISSIONED** (`status-permissioned`). |
| **Description** | Caption body (`body-base`). |
| **Keywords** | Removable tag pills; `label-caps` section header. |
| **Content Credentials** | Level 2 panel: status chip (VALID/TRUSTED/INVALID/NONE), **Signer DID** in `metadata-code`, action history list (Created, Metadata Edited, Published) with RFC 3339 UTC timestamps. |
| **Actions** | Primary **Add to Album**; secondary **Edit**; destructive **Delete Photo** (confirmation modal required). |

### C2PA progressive disclosure

- **Level 1:** Corner badge on image ("C2PA Verified" or neutral state).
- **Level 2:** Sidebar summary (mockup default).
- **Level 3:** Expandable audit tree with ingredient chain (`metadata-code` for DIDs/keys); backdrop blur per UX guide.

### Accessibility

Indicators and expandable panels MUST meet WCAG 2.x contrast and keyboard focus order (SRS-F-014.2).

**Tests:** [`c2pa_validation_ui_SRS-F-014.feature`](../apps/frontend/tests/features/c2pa_validation_ui_SRS-F-014.feature), [`captions_tags_SRS-F-005.feature`](../apps/frontend/tests/features/captions_tags_SRS-F-005.feature), [`photo_deletion_SRS-F-009.feature`](../apps/frontend/tests/features/photo_deletion_SRS-F-009.feature)

---

## UI-SCR-004: Album view

**Mockup:** [04-album-view.jpg](./references/mockups/04-album-view.jpg)  
**Route:** `/albums/:uri`  
**SRS:** SRS-F-004, SRS-F-007, SRS-F-008

### Header

- Visibility badge: **PERMISSIONED** (`status-permissioned`) when `visibility: permissioned`.
- AT URI / album identifier in `metadata-code`.
- Title (`display-lg` or `headline-md`) and description paragraph.
- Actions: **Invite Members** (permissioned), **Manage Photos**, share link copy.

### Content tabs

**All Media** | **Verified Only** | **Collaborators** — filter grid without navigation away.

### Media grid

Reuse UI-SCR-001 cards; show C2PA watermark/badge on thumbnails where applicable.

### Album info panel (right sidebar)

| Field | Display |
|-------|---------|
| **Space URI** | `ats://…` truncated with copy affordance (permissioned albums) |
| **Share link** | Stable URL with external-open icon |
| **Collaborators** | Avatar stack + count; link to access logs |
| **Provenance summary** | Aggregate C2PA validation stats (neutral wording) |
| **Destroy Album** | Destructive; confirmation required; MUST NOT delete underlying photos unless explicitly chosen |

### Public / unlisted albums

Permissioned-only elements (Space URI, Invite Members) MUST be hidden when `visibility` is `public` or `unlisted`.

**Tests:** [`album_organization_SRS-F-004.feature`](../apps/frontend/tests/features/album_organization_SRS-F-004.feature), [`shareable_links_SRS-F-007.feature`](../apps/frontend/tests/features/shareable_links_SRS-F-007.feature), [`permissioned_albums_SRS-F-008.feature`](../apps/frontend/tests/features/permissioned_albums_SRS-F-008.feature)

---

## UI-SCR-005: Upload flow

**Mockup:** [05-upload-flow.jpg](./references/mockups/05-upload-flow.jpg)  
**Route:** `/upload` or modal from shell  
**SRS:** SRS-F-002, SRS-F-012, SRS-F-005, SRS-F-008

### Drop zone

- Dashed border container; icon; heading **Upload Media**.
- Copy: "Drag and drop high-res files or **browse**" (link styled `atproto-blue`).
- Format chips: RAW, PNG, JPEG (informational; v1 accept `image/*` per Lexicon).

### Thumbnail queue

- Horizontal strip of selected files with active selection highlight (`atproto-blue` border).
- Per-file: edit/remove icons; filename label; C2PA badge when signed.
- In-progress: percent label + progress bar (mockup: "65% Uploading").

### Provenance sidebar

| Section | Requirement |
|---------|-------------|
| **Provenance identity** | "ATPix will sign this photo as created by:" + signer DID in `metadata-code`. |
| **Title / Caption / Tags** | Standard inputs; labels `label-caps`; tag pills removable. |
| **Destination** | Radio cards: **My Public Repository** (default) vs **Select Permissioned Space**. |

### TC-004 correction (mandatory)

The destination option for permissioned spaces MUST read **membership-gated space** (e.g., "Permissioned Space — visible to invited members only"). It MUST NOT claim **encryption** — v1 uses protocol-native space membership, not client-side encryption (TC-004, NFR-002).

### Privacy controls

Before signing, UI MUST offer opt-out toggles for GPS, device identifiers, and other optional C2PA assertions (SRS-F-012.2, NFR-015).

### Error handling

Upload failures and >50MB rejections MUST show actionable errors with **Retry** per UX guide Inputs section.

**Tests:** [`photo_upload_SRS-F-002.feature`](../apps/frontend/tests/features/photo_upload_SRS-F-002.feature), [`c2pa_manifest_generation_SRS-F-012.feature`](../apps/backend/tests/features/c2pa_manifest_generation_SRS-F-012.feature)

---

## UI-SCR-006: Permissioned space administration

**Mockup:** [06-permissioned-space-admin.jpg](./references/mockups/06-permissioned-space-admin.jpg)  
**Route:** `/albums/:uri/space`  
**SRS:** SRS-F-008, NFR-013

### Header

- Lock icon + **Permissioned Space** label.
- Album/space title; description of membership-gated storage (not encryption).
- Actions: **Export Logs**, **Share Access** (invite flow).

### Space metadata card

- **SPACE DID** and **RECORD TYPE** (`com.atpix.gallery.albumSpace`) in `metadata-code`.
- Status badge: **GATED** (`status-permissioned`).

### Member directory

Table columns: Identity (handle + avatar), DID (truncated), Role (ADMIN / MEMBER / VIEWER), Actions menu. Roles MUST map to `com.atproto.simplespace` membership capabilities.

### Invite flow

Search by handle (e.g., `alice.bsky`); protocol verifies credentials on input; disabled state until valid DID/handle resolved.

### Access audit trail

Chronological log with color-coded action types (ADD, MOD, DEL, INF) and RFC 3339 timestamps.

### Space settings

- **Mint Policy** dropdown (e.g., Admin Only / member-list per ATP-0016).
- **App Access** — allowed third-party clients icons.
- **Provenance Enforcement** toggle — require C2PA on uploads to space.
- **Destroy Space** — destructive; confirmation; separate from album delete.

### Access denied state (unauthorized viewers)

Non-members MUST see access-denied panel without thumbnails, blob CIDs, or metadata (SRS-F-008.2). MUST include **Request Access** or sign-in CTA where applicable.

**Tests:** [`permissioned_albums_SRS-F-008.feature`](../apps/frontend/tests/features/permissioned_albums_SRS-F-008.feature), [`permissioned_spaces_integration_SRS-F-008.feature`](../apps/backend/tests/features/permissioned_spaces_integration_SRS-F-008.feature)

---

## UI-SCR-007: Public profile gallery

**Mockup:** Derived from UI-SCR-001 layout without sidebar upload emphasis  
**Route:** `/profile/:didOrHandle`  
**SRS:** SRS-F-006, SRS-F-007

- Same grid component as My Gallery but read-only (no upload, no delete).
- Unauthenticated access allowed for public/unlisted content.
- Handle resolves to DID before query; DID shown in `metadata-code` for durability.

**Tests:** [`public_profile_gallery_SRS-F-006.feature`](../apps/frontend/tests/features/public_profile_gallery_SRS-F-006.feature)

---

## UI-SCR-008: C2PA trust configuration

**Route:** `/settings/trust`  
**SRS:** SRS-F-016

- List default C2PA trust anchors (claim signing + TSA).
- Add/remove custom signer anchors with explicit user approval.
- Empty private credential store by default.
- Changes affect **Trusted** state only; preview manifest status before/after.

**Tests:** [`c2pa_trust_config_SRS-F-016.feature`](../apps/frontend/tests/features/c2pa_trust_config_SRS-F-016.feature)

---

# Component library (cross-screen)

| Component ID | Description | UX guide ref |
|--------------|-------------|--------------|
| **UI-CMP-001** | Media card with C2PA L1 badge + visibility chip | Media Cards |
| **UI-CMP-002** | Status chip (10% fill + 1px left border) | Buttons & Chips |
| **UI-CMP-003** | C2PA credentials panel (L2 summary / L3 audit) | C2PA Panels |
| **UI-CMP-004** | Protocol identity card (`at://` + avatar) | Global shell |
| **UI-CMP-005** | Upload progress overlay | Media Cards |
| **UI-CMP-006** | Confirmation modal (delete, destroy) | Inputs — actionable errors |
| **UI-CMP-007** | Pagination control (cursor-aware) | Gallery System |

---

# Mockup fidelity notes

The v1 mockups are **directional**. Implementation MUST correct these PRD conflicts:

| Mockup element | Issue | Required behavior |
|----------------|-------|-------------------|
| Upload destination "Encrypted for specific DIDs" | Implies client-side encryption | Label MUST say membership-gated **Permissioned Space** (TC-004) |
| "TRUSTED" on discovery cards | Acceptable if mapped to C2PA Trusted state | MUST NOT imply content authenticity (NFR-016) |
| Storage provider names in album panel (e.g., Filecoin) | Not in PRD v1 | Omit or mark as placeholder until ADR defines storage messaging |

---

# Traceability matrix (UI → SRS → PRD)

| UI ID | Screen | SRS | PRD | Mockup |
|-------|--------|-----|-----|--------|
| UI-SCR-001 | My Gallery | SRS-F-003 | F-003 | [02](./references/mockups/02-my-gallery.jpg) |
| UI-SCR-002 | Discovery | SRS-F-010 | F-010 | [01](./references/mockups/01-discovery-feed.jpg) |
| UI-SCR-003 | Photo detail | SRS-F-005, F-009, F-014 | F-005, F-009, F-014 | [03](./references/mockups/03-photo-detail.jpg) |
| UI-SCR-004 | Album view | SRS-F-004, F-007, F-008 | F-004, F-007, F-008 | [04](./references/mockups/04-album-view.jpg) |
| UI-SCR-005 | Upload | SRS-F-002, F-012 | F-002, F-012 | [05](./references/mockups/05-upload-flow.jpg) |
| UI-SCR-006 | Space admin | SRS-F-008 | F-008 | [06](./references/mockups/06-permissioned-space-admin.jpg) |
| UI-SCR-007 | Public profile | SRS-F-006 | F-006 | — |
| UI-SCR-008 | Trust settings | SRS-F-016 | F-016 | — |
| UI-SHELL-001 | App chrome | SRS-F-001 | F-001 | all |

---

# Test strategy

UI requirements MUST be verified per AGENTS.md UI Test Mandate:

1. **BDD features** in `apps/frontend/tests/features/` (behavioral acceptance).
2. **Vitest + jsdom** against **`vite build`** production artifacts with strict DOM assertions (NFR-006).
3. **Visual regression** (optional v1): capture mockup-aligned screenshots in CI when Playwright e2e lands.

Each UI-SCR section above lists primary BDD feature files. UI test authors SHOULD assert token-backed classes or data-testid hooks for badges, panels, and destructive confirmations—not implementation-specific selectors.