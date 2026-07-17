# About this project

**ATPix** is a decentralized photo collection and sharing application on the [AT Protocol](https://atproto.com).

Users own their libraries: photos live as cryptographically signed records and blobs in Personal Data Server (PDS) repositories, indexed and served by a [HappyView](https://happyview.dev) App View.

This product is a proof-of-concept to evaluate HappyView's permissioned spaces implementation.

---

## Start here (first-time tester)

You do **not** need prior AT Protocol experience. This README is the full path from empty machine → signed-in gallery → upload, albums, and permissioned spaces.

### Recommended path (about 1–2 hours the first time)

| Stage | What you do | Skip? |
|-------|-------------|--------|
| **1. Tools** | Install Docker, Python 3.11+, Node 22+, Git | No |
| **2. Account** | Use an existing **Bluesky** handle (`you.bsky.social`) | Yes if you already have one |
| **3. Clone + configure** | Clone this repo, create `.env`, Python venv | No |
| **4. HappyView** | Start App View in Docker, create admin key, provision lexicons | No |
| **5. Frontend** | `npm install` + `npm run dev`, register API client | No |
| **6. Sign in** | OAuth in the browser against Bluesky (or your PDS) | No |
| **7. Features** | Backend for C2PA, then upload / albums / permissioned tests | No |

**Skip Phase B (OVH PDS)** on your first day. Phase B is only for self-hosted `*.pds.atpix.net` accounts and multi-account permissioned tests.

**You will keep several terminal windows open.** Label them mentally as:

1. **HappyView** — usually just Docker in the background  
2. **Frontend** — `npm run dev` (must stay running)  
3. **Backend** — `uvicorn` for C2PA signing (must stay running for uploads)  
4. **Commands** — occasional one-off commands (provision, curl)

### Words you will see (plain language)

| Term | Meaning for ATPix |
|------|-------------------|
| **AT Protocol / atproto** | Open standard for social apps. Your identity and data can move between servers. |
| **Handle** | Human username, e.g. `alice.bsky.social`. Used to sign in. |
| **DID** | Permanent account ID (looks like `did:plc:…`). Prefer this for durable links. |
| **PDS (Personal Data Server)** | Server that stores **your** signed posts/photos. Bluesky hosts one for you if you use `*.bsky.social`. |
| **App View (HappyView)** | Server that **indexes** data and gives the app a friendly API. ATPix talks to HappyView; HappyView talks to your PDS. |
| **OAuth** | “Sign in with…” without giving ATPix your password. You approve access on your PDS. |
| **DPoP** | Extra crypto binding so stolen tokens are harder to reuse. Happens under the hood. |
| **Lexicon** | Schema files (`net.atpix.gallery.*`) that define photo/album records and APIs. |
| **Blob** | Binary file (the image bytes), stored on your PDS. |
| **Record** | JSON metadata about a photo or album, stored on your PDS (or in a permissioned **space**). |
| **Space / permissioned album** | Private album: only invited members can read it. URIs use proposal form `at://…/space/…` ([ADR-010](docs/architecture/010-permissioned-spaces-storage.md)). |
| **C2PA** | Content Credentials — provenance stamps embedded in the image file before upload. |
| **`hv_*` key** | HappyView **admin** key for provisioning (never put this in browser XRPC headers). |
| **`hvc_*` key** | HappyView **app client** key — browser sends this as `X-Client-Key`. |

Product language (gallery, album) maps to protocol details in the [PRD](docs/overview/002-prd.md#product-terms--at-protocol-primitives) and [Lexicon README](docs/lexicon/net.atpix.gallery.md).

## What it does

Users sign in with **atproto OAuth** (no app passwords) — optionally via a **`*.pds.atpix.net`** handle on an operator-hosted PDS ([F-017](docs/overview/002-prd.md#f-017-hosted-pds-account-onboarding)) — upload images with **C2PA 2.2 Content Credentials**, organize **albums**, and browse **My Gallery** or a **Following / Hashtags** discovery feed.

Galleries populate two ways:

- **(a)** direct PDS upload  
- **(b)** photos already indexed on the network via follow-graph and hashtag rules (HappyView Jetstream sync — Path B not fully shipped yet)

Sharing supports **public**, **unlisted**, and **permissioned** albums; permissioned collections use [HappyView Permissioned Spaces](https://happyview.dev/experimental/spaces) (ATP-0016).

## Metadata

Photo metadata maps to [Dublin Core](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/) and [Schema.org](https://schema.org/docs/schemas.html) terms in `net.atpix.gallery.*` Lexicons; image files embed [C2PA 2.2](https://spec.c2pa.org/specifications/specifications/2.2/specs/C2PA_Specification.html) Content Credentials for tamper-evident provenance.

Photos and metadata remain user-owned and portable across the Atmosphere—not locked in a proprietary CDN or siloed account system.

## Repository layout

| Component | Role | ADR |
|-----------|------|-----|
| `apps/frontend/` | Vite vanilla JS; OAuth, gallery UI, HappyView XRPC | [005](docs/architecture/005-application-architecture.md), [006](docs/architecture/006-oauth-dpop-authentication.md) |
| `apps/backend/` | FastAPI; C2PA claim generation/validation, health | [008](docs/architecture/008-c2pa-sdk-and-signing.md) |
| HappyView (external) | Indexing, OAuth proxy, XRPC, spaces | [007](docs/architecture/007-happyview-app-view-integration.md) |
| `docs/lexicon/` | `net.atpix.gallery.*` schema artifacts | [009](docs/architecture/009-lexicon-namespace-authority.md) |
| `docs/` | Project documentation portal (`docs.atpix.net` via GitHub Pages) | — |
| [atpix-homepage](https://github.com/peterVG/atpix-homepage) | Marketing site (`atpix.net` via GitHub Pages; separate repo) | — |

Observability (Promtail → Redpanda → Loki, Prometheus, Grafana) runs via root `docker-compose.yml` per [003](docs/architecture/003-observability-stack.md). Tests use pytest/behave, vitest/playwright, and **Allure** reporting per [001](docs/architecture/001-test-runners-and-reporting.md).

## Where user data lives (PDS vs App View)

ATPix follows the standard [AT Protocol](https://atproto.com) split: a **Personal Data Server (PDS)** hosts each user's signed repository; an **App View** indexes and serves that data for apps. **The ATPix monorepo does not run a PDS** — neither the local Docker stack nor HappyView replaces account storage. Production deployments MAY point visitors to an **operator-hosted PDS** (e.g. `pds.atpix.net` on OVH) for `*.pds.atpix.net` account creation; see [Phase B](#phase-b--dedicated-pds-at-ovh).

| Layer | Role in ATPix | Canonical user photos & records? |
|-------|---------------|----------------------------------|
| **User PDS** (remote) | Hosts blobs + public/unlisted `net.atpix.gallery.*` records; `net.atpix.gallery.album` metadata (with `spaceUri` when permissioned) | **Yes** — source of truth for public/unlisted content and album containers |
| **HappyView** (external, port 3001) | App View: index, OAuth write proxy, XRPC, permissioned spaces | **Public/unlisted:** index/cache + proxy only. **Permissioned:** `net.atpix.gallery.photo` and `net.atpix.gallery.albumItem` in the album's space repo are canonical there |
| **`apps/backend/`** | C2PA claim generation/validation, health | No |
| **`apps/frontend/`** | Gallery UI, OAuth client | No — browser session state only |

**Users need a PDS-backed atproto account** (TC-003). Sign-in uses OAuth against an existing identity (Bluesky, another hoster, or `*.pds.atpix.net` on the hosted PDS). ATPix does not create accounts in-app in v1 — it links to PDS registration when `VITE_PDS_SIGNUP_URL` is set ([F-017](docs/overview/002-prd.md#f-017-hosted-pds-account-onboarding)). HappyView proxies `uploadBlob` and record writes to the user's PDS. See [ADR-006](docs/architecture/006-oauth-dpop-authentication.md) and [ADR-007](docs/architecture/007-happyview-app-view-integration.md).

Typical write path once the gallery UI is implemented:

```
Browser (ATPix) → HappyView (OAuth + XRPC proxy) → user's PDS
```

**Permissioned albums** ([ADR-010](docs/architecture/010-permissioned-spaces-storage.md)): the `net.atpix.gallery.album` container record stays in the owner's **PDS** and links `spaceUri` in **proposal form** (`at://{spaceDid}/space/net.atpix.gallery.albumSpace/{skey}`). The HappyView **space repo** holds permissioned `net.atpix.gallery.photo` and `net.atpix.gallery.albumItem` records (record URIs: `at://{spaceDid}/space/…/{authorDid}/{collection}/{rkey}`). **Image blobs remain on the author's PDS** and are served via `com.atproto.space.getBlob` with membership checks.

**Local Docker persistence:** HappyView stores its own SQLite index, OAuth sessions, and provisioned lexicons under `./data/happyview_data/` (bind-mounted in `docker-compose.happyview.yml`). Stopping the container does **not** delete user PDS data. Wiping `./data/happyview_data/` loses local index and sessions only — records on users' PDSes remain; re-run [Step 4 provisioning](#step-4--provision-lexicons-and-enable-permissioned-spaces) and backfill to rebuild the index.

**New test accounts:** use Bluesky accounts for quick smoke tests, or the [dedicated OVH PDS path](#phase-b--dedicated-pds-at-ovh) below for multi-account permissioned-album testing.

## Requirements and verification

- **[Product vision](docs/overview/001-product-vision.md)** — problem, users, value proposition
- **[PRD v1.6](docs/overview/002-prd.md)** — F-001–F-021 functional requirements (F-018–F-021 post-v1 identity platform), NFRs, technical constraints
- **[SRS v1.1](docs/overview/003-srs.md)** — technical specs with 100% PRD traceability
- **[Implementation plan](docs/overview/005-plan.md)** — global roadmap; module checklists in [apps/frontend/docs/plan.md](apps/frontend/docs/plan.md) and [apps/backend/docs/plan.md](apps/backend/docs/plan.md)
- **[UI requirements v1.1](docs/overview/004-ui-requirements.md)** — screens, components, and mockups ([UX guide](docs/references/000-UX-guide.md))
- **BDD features** — Gherkin scenarios under `apps/frontend/tests/features/` (UI/auth/gallery) and `apps/backend/tests/features/` (C2PA, lexicon, spaces, performance)
- **Architecture** — [ADRs 001–011](docs/architecture/) including OAuth ([006](docs/architecture/006-oauth-dpop-authentication.md)), HappyView integration ([007](docs/architecture/007-happyview-app-view-integration.md)), C2PA ([008](docs/architecture/008-c2pa-sdk-and-signing.md)), lexicon authority ([009](docs/architecture/009-lexicon-namespace-authority.md)), permissioned spaces ([010](docs/architecture/010-permissioned-spaces-storage.md)), SQLite index ([011](docs/architecture/011-sqlite-index-database.md))
- **Agent knowledge bases** — [AT Protocol combined (v2)](.agents/kb/at-protocol-v2.md) (public + permissioned proposal concepts); [HappyView](.agents/kb/happyview.md) (App View runtime). Permissioned albums use **proposal-form** space URIs (`at://{spaceDid}/space/…`); HappyView also accepts legacy `ats://` — see [ADR-010](docs/architecture/010-permissioned-spaces-storage.md).

v1 is a **product-validation** and **reference implementation** release—not a mass-market consumer launch. Encrypted private albums and client-side encryption are explicitly out of scope. Permissioned albums are **membership-gated** (access control), not end-to-end encrypted.

## Prerequisites (Phase A)

Install these tools before cloning. Prefer a version manager ([mise](https://mise.jdx.dev/), [asdf](https://asdf-vm.com/), [nvm](https://github.com/nvm-sh/nvm), or [pyenv](https://github.com/pyenv/pyenv)) rather than ancient OS-packaged Python/Node.

| Tool | Version | Why you need it | Install docs |
|------|---------|-----------------|--------------|
| **Git** | 2.x | Clone this repository | [git-scm.com](https://git-scm.com/downloads) |
| **Docker** (Docker Desktop or Engine + Compose) | recent | Runs HappyView App View in a container | [docs.docker.com/get-docker](https://docs.docker.com/get-docker/) |
| **Python** | **3.11+** | Backend C2PA API + provision script | [python.org/downloads](https://www.python.org/downloads/) |
| **Node.js** | **22+** (includes `npm`) | Frontend dev server and tests | [nodejs.org](https://nodejs.org/) |
| **A web browser** | Chrome, Firefox, Safari, Edge | Sign-in UI and gallery | — |
| **A PDS account** | Bluesky free account is enough | Sign-in identity | [bsky.app](https://bsky.app) — create handle like `yourname.bsky.social` |
| [`goat`](https://github.com/bluesky-social/goat#install) | latest | **Optional** — only for OVH PDS / lexicon DNS (Phase B / J) | GitHub install notes |

### Verify tools (run in a terminal)

```bash
git --version          # e.g. git version 2.x
docker --version       # Docker Engine
docker compose version # Compose v2
python3 --version      # Python 3.11 or newer
node --version         # v22.x or newer
npm --version
```

**Docker must be running** before Step 2 (Docker Desktop: open the app until it says “running”).

**Windows notes:** Use PowerShell or Git Bash. For Python venv activation use `apps\backend\.venv\Scripts\activate`. Prefer `python` if `python3` is missing.

**macOS notes:** If `python3` is missing, install from python.org or Homebrew. Apple’s Command Line Tools may prompt on first `git` use — install them.

### Get a Bluesky account (if you do not have one)

1. Open [bsky.app](https://bsky.app) and create an account.  
2. Note your handle (e.g. `yourname.bsky.social`).  
3. You will type that handle into ATPix and HappyView during sign-in. You never paste your Bluesky password into ATPix — only into Bluesky’s own OAuth page.

## First-time install and test

Each phase depends on the ones above it. **First successful smoke test:** Phases **A → C → D → E → F → G → H → I** using the **Bluesky shortcut** (skip **B**).

| Phase | What you set up | Depends on | Go to |
|-------|-----------------|------------|-------|
| **A** | Developer tools + Bluesky (or other PDS) account | — | [Prerequisites](#prerequisites-phase-a) |
| **B** | *(Optional later)* OVH PDS + `alice`/`bob` handles | Registrar + VPS | [Phase B — Dedicated PDS at OVH](#phase-b--dedicated-pds-at-ovh) |
| **C** | Clone repo, `.env`, backend Python venv | A | [Step 1](#step-1--clone-repository-and-environment) |
| **D** | HappyView App View (Docker, port 3001) | A, C | [Step 2](#step-2--start-happyview-and-verify-health) |
| **E** | HappyView admin login, `hv_*` key, lexicon provisioning | D | [Steps 3–4](#step-3--happyview-admin-login-and-admin-api-key) |
| **F** | Frontend dev server, OAuth metadata, `hvc_*` API client | C, E | [Steps 5–6](#step-5--start-frontend-and-verify-oauth-client-metadata) |
| **G** | Sign in to ATPix (OAuth) | Bluesky or Phase B, F | [Step 7](#step-7--sign-in-and-verify-application-shell-task-21) |
| **H** | Backend API for C2PA signing (port 8000) | C (venv) | [Step 8](#step-8--c2pa-pre-upload-signing-task-31) |
| **I** | Manual feature walkthrough (gallery, albums, spaces) | G, H | [Steps 9–11](#step-9--photo-upload-and-my-gallery-task-32) |
| **J** | Network lexicon authority (`goat lex publish`) — optional | B | [Phase J](#phase-j--network-lexicon-authority-optional-before-production) |
| **K** | Automated tests (optional) | D–I | [Step 12](#step-12--run-automated-tests-optional) |
| — | **Manual feature checklist** | C–H | [What you can test right now](#what-you-can-test-right-now) |

```mermaid
flowchart TD
  tools[Phase A: Tools]
  pds[Phase B: OVH PDS + handles]
  repo[Phase C: Clone + .env + venv]
  hv[Phase D–E: HappyView + provision]
  fe[Phase F: Frontend + hvc_* client]
  oauth[Phase G: OAuth sign-in]
  be[Phase H: Backend C2PA API]
  test[Phase I: Manual tests]

  tools --> repo
  tools --> pds
  pds --> oauth
  repo --> hv
  hv --> fe
  fe --> oauth
  repo --> be
  oauth --> test
  be --> test
  pds -.-> lex[Phase J: goat lex publish]
  lex -.-> test
```

While DNS propagates during Phase B, you may run Phases C–D in parallel. For the OVH path, finish Phase B before [Step 3](#step-3--happyview-admin-login-and-admin-api-key) (HappyView admin login as `alice.pds.atpix.net`) and before [Phase G](#step-7--sign-in-and-verify-application-shell-task-21).

**Two sign-in paths**

| Path | When to use | Sign-in handle | Phase B required? |
|------|-------------|----------------|-------------------|
| **Bluesky shortcut (start here)** | First install, UI smoke tests, single-user permissioned album | `you.bsky.social` (or any hosted PDS) | **No** — skip Phase B |
| **Dedicated OVH PDS** | Multi-account permissioned tests; operator `*.pds.atpix.net` signup | `alice.pds.atpix.net` / `bob.pds.atpix.net` on `https://pds.atpix.net` | **Yes** — complete Phase B before Phase G |

ATPix does **not** host user accounts. HappyView proxies writes to whichever PDS your handle resolves to ([Where user data lives](#where-user-data-lives-pds-vs-app-view)). For two-account permissioned BDD you need Phase B (or two Bluesky accounts).

**Ports (local dev) — do not mix these up:**

| Port | Service | URL |
|------|---------|-----|
| **5173** | ATPix frontend (gallery UI) | http://127.0.0.1:5173 |
| **3001** | HappyView App View (admin + API) | http://127.0.0.1:3001 |
| **8000** | ATPix backend (C2PA signing) | http://127.0.0.1:8000 |
| **3000** | Grafana (optional observability stack) | http://127.0.0.1:3000 |

HappyView must reach your **PDS over the public internet** (HTTPS). For Bluesky accounts that is automatic. For a self-hosted PDS, try e.g. `curl https://pds.atpix.net/xrpc/_health` from the machine running Docker.

## What you can test right now

After [Task 5.1](docs/overview/005-plan.md) and [Task 5.2](docs/overview/005-plan.md) (F-017), the following features are implemented end-to-end.

**Before this checklist:** finish [First-time install](#first-time-install-and-test) Phases **C–H** using the [Bluesky shortcut](#first-time-install-and-test) (or Phase **B** if using OVH handles). Detailed commands: [Manual walkthrough (Phases C–I)](#manual-walkthrough-phases-ci). Prior automated walkthrough notes: [Task-5.2-Walkthrough.md](apps/frontend/docs/tasks/Task-5.2-Walkthrough.md).

You need **three things running at once** (three terminals or Docker + two terminals): HappyView (Docker), frontend (`npm run dev`), backend (`uvicorn`).

### Before you start

| Requirement | How to verify |
|-------------|---------------|
| HappyView running | `curl -sS http://127.0.0.1:3001/health` → JSON |
| Lexicons provisioned | `python3 scripts/provision_happyview.py --verify-only` → 23 lexicons + spaces enabled |
| Frontend dev server | Browser opens [http://127.0.0.1:5173](http://127.0.0.1:5173) without connection refused |
| `hvc_*` client key | Root `.env` has `VITE_HAPPYVIEW_CLIENT_KEY=hvc_…`; frontend was **restarted** after adding it |
| Backend C2PA API | `curl -sS http://127.0.0.1:8000/health` → OK; venv activated when starting uvicorn |
| Signed in | Gallery shell visible (header tabs, sidebar handle or DID, Sign Out) |
| PDS signup link (optional) | Only if you set `VITE_PDS_SIGNUP_URL` — link appears on sign-in panel |

**OVH path only:** `alice.pds.atpix.net` / `bob.pds.atpix.net` resolve (`goat resolve …`) and `https://pds.atpix.net/xrpc/_health` returns JSON.

### Test 1 — Sign-in and hosted PDS signup link (F-001, F-017)

1. Sign out if already signed in.
2. Open **http://127.0.0.1:5173/** — confirm **Sign in to ATPix** panel.
3. If `VITE_PDS_SIGNUP_URL` is set, confirm **Create a `*.pds.atpix.net` handle** link points to your PDS `/account` URL.
4. Enter your handle (`alice.pds.atpix.net` on OVH path, or `you.bsky.social` for Bluesky shortcut) → **Sign in with atproto**.
5. Complete OAuth on your PDS; land on **My Gallery** with shell chrome (Gallery / Discovery / Albums tabs, sidebar handle, **Sign Out**).
6. Toggle color scheme (header ◐ and Settings → Appearance) — preference persists after reload.

### Test 2 — C2PA signing and public upload (F-002, F-012)

1. Ensure backend is running (`curl -sS http://127.0.0.1:8000/c2pa/status`).
2. Click **Upload Media** → select a JPEG or PNG (≤ 50 MB).
3. Confirm **C2PA** badge on the queue item after signing completes.
4. Set title/caption/tags, visibility **Public** → **Publish**.
5. Open **Gallery** → **My Gallery** — photo appears with C2PA badge (**Trusted** / **Valid** when applicable).
6. Use vault search to filter by title or tag.

### Test 3 — Albums and caption editing (F-004, F-005)

1. Open **Albums** → create album with name + visibility **Public** or **Unlisted** → confirm album detail view.
2. **Manage Photos** → add a photo from Test 2.
3. Return to **My Gallery** → open a photo card → edit caption/tags (≤ 2000 chars) → save.
4. Create a **Permissioned** album — confirm **Invite Members** and **Space URI** appear; share link hidden.
5. **Space URI format (ATP-0016 proposal form):** copy the **Space URI** from album detail. It MUST match:

   ```text
   at://{spaceDid}/space/net.atpix.gallery.albumSpace/{skey}
   ```

   - Scheme is **`at://`** (not `ats://`)
   - Path segment after the DID is the literal **`space`**
   - Space type is **`net.atpix.gallery.albumSpace`**
   - Example shape: `at://did:plc:abc123…/space/net.atpix.gallery.albumSpace/3j…`  
   HappyView may still accept legacy `ats://` internally; ATPix displays/stores the proposal form ([ADR-010](docs/architecture/010-permissioned-spaces-storage.md)).

### Test 4 — Permissioned space admin (F-008, UI-SCR-006)

1. On a permissioned album, click **Invite Members** (or **Manage space** on Collaborators tab).
2. Verify space admin panel: **Space DID** equals the DID segment of the Space URI from Test 3, **Gated** badge, member directory, invite-by-handle form.
3. **OVH multi-account:** sign in as `alice.pds.atpix.net`, invite `bob.pds.atpix.net`; sign in as Bob in a separate browser profile and accept/open the album (when invite flow is configured on your PDS).

### Test 5 — Permissioned upload and record URI (F-002 permissioned path)

1. **Upload Media** → destination **Permissioned Space** → select the permissioned album from Test 3/4.
2. Publish a photo — records written via `space.createRecord`; thumbnails load through authenticated `space.getBlob`.
3. Confirm photo appears in the permissioned album grid (member session required).
4. **Record URI format (permissioned photo):** inspect the created photo’s record URI (network tab for `com.atproto.space.createRecord` response, or album item payload). It MUST match:

   ```text
   at://{spaceDid}/space/{spaceType}/{skey}/{authorDid}/{collection}/{rkey}
   ```

   For ATPix albums:

   ```text
   at://{spaceDid}/space/net.atpix.gallery.albumSpace/{skey}/{authorDid}/net.atpix.gallery.photo/{rkey}
   ```

   Checks:
   - Same `{spaceDid}`, `space`, `net.atpix.gallery.albumSpace`, and `{skey}` as the album’s Space URI
   - `{authorDid}` is your account DID
   - Collection is `net.atpix.gallery.photo` (album membership uses `net.atpix.gallery.albumItem` with the same space prefix)
   - Final segment is the record key (`rkey`, often a TID)

### Test 6 — Automated tests (no live OAuth)

From repository root (frontend uses `.env.test` stubs — no real PDS tokens):

```bash
cd apps/frontend && npm run lint && npm run test:unit && npm run test:ui
cd ../backend && source .venv/bin/activate
ruff check . --fix && ruff format . && ./test
```

URI helpers are covered by unit tests (`tests/unit/spaceUri.test.js`, `spaceAdmin.test.js`, `publishPermissionedPhoto.test.js`) — proposal-form fixtures plus legacy `ats://` ingress.

View Allure reports: `allure serve apps/frontend/tests/allure-results` (see [Run tests](#run-tests)).

### Test 7 — Live multi-account BDD (optional, BE-4.1)

Requires HappyView, `HAPPYVIEW_ADMIN_KEY`, `HAPPYVIEW_CLIENT_KEY`, and `TEST_OWNER_*` / `TEST_MEMBER_*` in root `.env` after signing in both accounts via ATPix:

```bash
cd apps/backend && source .venv/bin/activate
behave tests/features/permissioned_spaces_integration_SRS-F-008.feature
```

### Not available yet

| Feature | Planned task |
|---------|----------------|
| Discovery feed / Following–Hashtags (Path B) | Task 4.1 |
| Public profile gallery and shareable links | Task 4.2 |
| Unified photo detail and deletion (UI-SCR-003) | Task 4.3 |
| Embedded signup on atpix.net (F-018) | Task 9.1 |

## Troubleshooting (first-time setup)

| Symptom | Likely cause | What to do |
|---------|--------------|------------|
| `docker compose …` fails / cannot connect | Docker not running | Start Docker Desktop; wait until it is healthy; retry |
| `curl http://127.0.0.1:3001/health` fails | HappyView not up yet | Wait 30s; `docker compose -f docker-compose.happyview.yml ps` and `logs` |
| Provision script: missing admin key | Step 3 skipped | Create `hv_*` key; put in **root** `.env` as `HAPPYVIEW_ADMIN_KEY` |
| Provision script: connection refused | Wrong port or container down | Confirm `HAPPYVIEW_URL=http://127.0.0.1:3001` and container is up |
| Sign-in does nothing / 401 on XRPC | Missing or wrong `hvc_*` | Re-create API Client; set `VITE_HAPPYVIEW_CLIENT_KEY`; **restart** `npm run dev` |
| Sign-in redirect error / invalid client | Client ID mismatch | Step 6 Client ID must match Step 5 `client_id` **exactly** (loopback string) |
| Signed in but upload hangs / no C2PA badge | Backend not running | Start Step 8 `uvicorn` on port 8000; check `C2PA_ALLOW_DEV_SIGNING=true` |
| Port already in use | Another process on 5173/3001/8000 | Stop the other process, or change ports only if you know how to update `.env` to match |
| `python3: command not found` | Python not installed / wrong name | Install Python 3.11+; on Windows try `python` |
| `npm: command not found` | Node not installed | Install Node 22+ from nodejs.org |
| HappyView login works but ATPix does not | Only admin key set | You need **both** `hv_*` (admin) and `hvc_*` (API client) |
| Permissioned album has no Space URI | Spaces flag off | Re-run Step 4; confirm spaces enabled in provision verify output |
| Space URI starts with `ats://` | Older HappyView dialect | ATPix should normalize to `at://…/space/…` ([ADR-010](docs/architecture/010-permissioned-spaces-storage.md)); check frontend is current `main` |

**Still stuck?** Capture: which step number, exact command, full error text, and whether HappyView / frontend / backend processes are running (`docker ps`, and terminal output from `npm run dev` / `uvicorn`).

# Setup Development Environment

Follow phases in order. Commands below assume you start from the **repository root** (`ATPix/`) unless noted.

## Quick reference (day 2+ — after `.env` is fully configured)

Use this only when HappyView keys and lexicons already work. First-time setup: start at [Step 1](#step-1--clone-repository-and-environment).

```bash
# Terminal A — HappyView (ADR-007, port 3001)
docker compose -f docker-compose.happyview.yml up -d

# Terminal B — Backend C2PA API (port 8000)
cd apps/backend && source .venv/bin/activate   # Windows: .venv\Scripts\activate
uvicorn app.main:app --reload --port 8000

# Terminal C — Frontend (port 5173)
cd apps/frontend && npm run dev
```

- Gallery UI: [http://127.0.0.1:5173](http://127.0.0.1:5173)  
- Backend health: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)  
- HappyView health: [http://127.0.0.1:3001/health](http://127.0.0.1:3001/health)

### Manual walkthrough (Phases C–I)

#### Step 1 — Clone repository and environment

**Goal:** Get the source code and a local config file (`.env`).

```bash
git clone https://github.com/peterVG/ATPix.git
cd ATPix
cp .env.example .env
```

If you already cloned the repo, skip `git clone` and just `cd` into it.

Open `.env` in any text editor (VS Code, Notepad, nano). You will fill in **secrets in later steps**. For now, leave the defaults and confirm these lines exist:

| Variable | Example value | Purpose |
|----------|---------------|---------|
| `HAPPYVIEW_URL` | `http://127.0.0.1:3001` | App View base URL |
| `VITE_HAPPYVIEW_URL` | `http://127.0.0.1:3001` | Same URL for the browser app |
| `VITE_DEPLOYMENT_ORIGIN` | `http://127.0.0.1:5173` | Where the ATPix UI is served (OAuth origin) |
| `HAPPYVIEW_ADMIN_KEY` | *(empty until Step 3)* | `hv_*` admin key for provisioning |
| `VITE_HAPPYVIEW_CLIENT_KEY` | *(empty until Step 6)* | `hvc_*` client key for the browser |
| `VITE_BACKEND_URL` | `http://127.0.0.1:8000` | C2PA backend |
| `C2PA_ALLOW_DEV_SIGNING` | `true` | Local test certificates for C2PA (dev only) |
| `VITE_PDS_SIGNUP_URL` | optional | “Create account” link on sign-in ([F-017](docs/overview/002-prd.md#f-017-hosted-pds-account-onboarding)) |

Save the file. Do **not** commit `.env` (it is gitignored).

#### Step 1b — Backend Python virtual environment (do this before provisioning)

**Goal:** Isolated Python packages for the provision script and C2PA API.

```bash
cd apps/backend
python3 -m venv .venv
# macOS/Linux:
source .venv/bin/activate
# Windows (PowerShell or cmd):
# .venv\Scripts\activate
pip install -r requirements-dev.txt
cd ../..
```

**Success check:** Your prompt often shows `(.venv)`, and `pip show python-dotenv` prints package info.

You will start `uvicorn` in [Step 8](#step-8--c2pa-pre-upload-signing-task-31). Until then, this venv is required for `scripts/provision_happyview.py`.

#### Step 2 — Start HappyView and verify health

**Goal:** Run the App View container that indexes data and proxies OAuth/writes.

1. Ensure Docker Desktop (or Docker Engine) is **running**.  
2. From the **repository root**:

```bash
docker compose -f docker-compose.happyview.yml up -d
curl -sS http://127.0.0.1:3001/health
```

**Expected:** JSON health response (not an HTML error page). If `curl` fails, wait 15–30 seconds and retry. Check logs: `docker compose -f docker-compose.happyview.yml logs -f` (Ctrl+C to stop following logs; container keeps running).

#### Step 3 — HappyView admin login and admin API key

**Goal:** Become HappyView super-user and create an **admin** key (`hv_…`) used only by automation scripts.

1. Open **http://127.0.0.1:3001/** in a browser.  
2. Sign in with your **Bluesky handle** (e.g. `yourname.bsky.social`) — or `alice.pds.atpix.net` if you completed Phase B.  
   - You will be redirected to your PDS to approve access, then return to HappyView.  
   - The **first** login on this HappyView instance becomes **super-user**.  
3. In the HappyView UI, open **Settings → API Keys → Create** (labels may vary slightly by version).  
4. Name it e.g. `atpix-provision`. Enable at least: `lexicons:create`, `lexicons:read`, `settings:manage`.  
5. Copy the key (starts with `hv_`). Open root `.env` and set:

```bash
HAPPYVIEW_ADMIN_KEY=hv_paste_your_key_here
```

Save `.env`. Do not put this key in frontend `VITE_*` variables.

#### Step 4 — Provision lexicons and enable permissioned spaces

**Goal:** Register ATPix photo/album schemas with HappyView and turn on spaces.

From the **repository root**, with the backend venv **activated**:

```bash
# If not already activated:
# cd apps/backend && source .venv/bin/activate && cd ../..

python3 scripts/provision_happyview.py
python3 scripts/provision_happyview.py --verify-only
```

**Expected from `--verify-only`:** all **23** `net.atpix.gallery.*` lexicons registered and `feature.spaces_enabled` / spaces enabled **true**.

**If you see errors about `HAPPYVIEW_ADMIN_KEY`:** Step 3 is incomplete or the key was not saved in the **root** `.env`.

Optional: in HappyView admin, open **Lexicons** and confirm `net.atpix.gallery.photo` appears.

#### Step 5 — Start frontend and verify OAuth client metadata

**Goal:** Run the ATPix UI and confirm the OAuth metadata document is reachable (HappyView will need its `client_id` in Step 6).

```bash
cd apps/frontend
npm install
npm run dev
```

**Leave this terminal running.** You should see Vite print a local URL (usually `http://127.0.0.1:5173/`).

In a **second** terminal (repository root or any directory):

```bash
# Landing page loads
curl -sS -o /dev/null -w "http_code=%{http_code}\n" http://127.0.0.1:5173/

# OAuth metadata document
curl -sS http://127.0.0.1:5173/oauth-client-metadata.json
```

**Expected:**

| Check | Expected |
|-------|----------|
| HTTP code for `/` | `200` |
| `client_name` | `ATPix` |
| `redirect_uris` | includes `http://127.0.0.1:5173/oauth/callback` |
| `dpop_bound_access_tokens` | `true` |
| `token_endpoint_auth_method` | `"none"` |
| `scope` | includes `atproto`, `blob:*/*`, and `repo:net.atpix.gallery.photo` |
| `client_id` | **Local dev:** a long **loopback** URL (often starts with `http://localhost/…` or similar) encoding your redirect — **copy this entire string** for Step 6. **Not** the same as the metadata URL in local mode. |

Open **http://127.0.0.1:5173/** in a browser — you should see **Sign in to ATPix** and **HappyView endpoint: `http://127.0.0.1:3001`**.

#### Step 6 — Register ATPix API client in HappyView (required for sign-in)

**Goal:** Tell HappyView about the browser app. Without this, OAuth sign-in fails.

> Two different keys:  
> - **`hv_*`** = admin (provisioning only)  
> - **`hvc_*`** = app client (browser)  
> Never put `hv_*` in `VITE_HAPPYVIEW_CLIENT_KEY` ([TC-006](docs/overview/002-prd.md#tc-006-api-client-identification)).

1. Keep `npm run dev` running so `http://127.0.0.1:5173/oauth-client-metadata.json` stays available.  
2. Open **http://127.0.0.1:3001/** → **API Clients** (admin sidebar).  
3. Click **Create**.  
4. Fill in:

| Field | Value |
|-------|-------|
| **Type** | Public (browser app; no client secret) |
| **Client ID** | Paste the **entire** `client_id` string from Step 5 `curl` output |
| **Allowed origins** | `http://127.0.0.1:5173` (add `http://localhost:5173` if you use that host) |
| **Scopes** | At least: `atproto`, `blob:*/*`, and each `repo:net.atpix.gallery.*` collection from the metadata `scope` |

5. Save. Copy the **client key** (`hvc_…`) — it is often shown **only once**.  
6. In the **repository root** `.env`:

```bash
VITE_HAPPYVIEW_CLIENT_KEY=hvc_paste_your_key_here
```

Also set `HAPPYVIEW_CLIENT_KEY` to the **same** `hvc_…` value if you will run backend BDD later.

7. **Stop** the frontend (Ctrl+C in the `npm run dev` terminal) and start it again:

```bash
cd apps/frontend
npm run dev
```

Vite only reads `.env` at startup — a restart is required after editing keys.

#### Step 7 — Sign in and verify application shell (Task 2.1)

**Goal:** Complete OAuth and land inside the gallery shell.

Prerequisites: Steps 2–6 complete; HappyView container still up; frontend restarted with `hvc_*` set.

1. Open **http://127.0.0.1:5173/**.  
2. Confirm the sign-in panel shows **Sign in with atproto** and HappyView endpoint `http://127.0.0.1:3001`.  
3. Enter your handle (`you.bsky.social` or `alice.pds.atpix.net`) → submit.  
4. Complete the OAuth consent on your PDS (Bluesky or OVH). Allow the requested permissions.  
5. You should return to ATPix (`/oauth/callback`) and land on **My Gallery**.  
6. Verify:
   - Header tabs: **Gallery**, **Discovery**, **Albums**  
   - Sidebar: handle or DID, **Upload Media**, **Sign Out**  
   - Color scheme toggle (◐) works; Settings → Appearance persists after reload  
7. **Sign Out** returns to the sign-in panel; sign in again before uploads.

**If sign-in fails:** see [Troubleshooting](#troubleshooting-first-time-setup). Common causes: wrong `hvc_*` key, frontend not restarted, Client ID mismatch in HappyView, HappyView not running.

**OAuth callback URL:** `http://127.0.0.1:5173/oauth/callback`.

#### Step 8 — C2PA pre-upload signing (Task 3.1)

**Goal:** Run the small FastAPI service that embeds Content Credentials into images **before** they are uploaded to your PDS.

Prerequisites: [Step 1b](#step-1b--backend-python-virtual-environment-do-this-before-provisioning) done; frontend still running; you are signed in.

1. Open a **new terminal**.  
2. Start the backend:

```bash
# macOS/Linux
cd apps/backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000

# Windows
# cd apps/backend
# .venv\Scripts\activate
# python -m uvicorn app.main:app --reload --port 8000
```

3. In another terminal, confirm:

```bash
curl -sS http://127.0.0.1:8000/c2pa/status
curl -sS http://127.0.0.1:8000/health
```

4. In the signed-in ATPix UI, click **Upload Media**.  
5. Select a JPEG or PNG (≤ 50 MB). Wait for the **C2PA** badge on the queue item (signing happens first).  

Optional API smoke test:

```bash
curl -sS -o /tmp/atpix-signed.jpg \
  -F "file=@apps/backend/tests/fixtures/c2pa/A.jpg;type=image/jpeg" \
  -F "creator_did=did:plc:manual-test" \
  http://127.0.0.1:8000/c2pa/manifest/embed
```

Local dev uses `C2PA_ALLOW_DEV_SIGNING=true` and test certs under `apps/backend/tests/fixtures/c2pa/`. Production must use real org certs and set `C2PA_ALLOW_DEV_SIGNING=false`.

#### Step 9 — Photo upload and My Gallery (Task 3.2)

Prerequisites: Steps 2–8 complete; signed in with `hvc_*` key; backend running for C2PA signing.

1. Open **Upload Media** and select a JPEG or PNG (≤ 50 MB). Wait for C2PA signing, then **Publish** the photo (title, optional caption/tags, visibility).
2. After publish succeeds, open **Gallery** (header tab or sidebar **Home**).
3. Verify **My Gallery** (UI-SCR-001):
   - Section label **Personal archive** and toolbar with vault search + **Upload**
   - Photo grid with C2PA badges (**Trusted** / **Valid** when applicable)
   - Cursor pagination when you have more than 20 photos
   - Empty state with **Upload your first photo** when the gallery is empty
4. Use vault search to filter by title, caption, or keyword.

Path A upload flow: `uploadBlob` → `createPhoto` via the HappyView OAuth proxy (`net.atpix.gallery.createPhoto`).

#### Step 10 — Albums and caption editing (Task 3.3)

Prerequisites: Step 9 complete (at least one photo in My Gallery).

1. Open the **Albums** header tab (sidebar **Collections**).
2. Create an album: enter a name, optional description, and pick a visibility chip (**Public**, **Unlisted**, or **Permissioned**), then **Create album**. You should land on the album detail view.
3. On album detail (UI-SCR-004), verify:
   - Visibility badge, album AT URI (`metadata-code`), title, and description
   - Tabs: **All Media**, **Verified Only**, **Collaborators**
   - **Manage Photos** — add photos from your Path A uploads
   - **Destroy Album** — confirmation dialog; underlying photos remain in My Gallery
4. **Public / unlisted albums:** share link visible; **Invite Members** and **Space URI** hidden.
5. **Permissioned albums:** **Invite Members** opens space admin (`#/albums/:uri/space`); **Space URI** visible; share link hidden. Create a permissioned album first (Step 10) to obtain a linked `spaceUri`.
6. Return to **My Gallery**, click a photo card, and edit caption/tags in the editor (max 2000 characters). Save and confirm the editor closes without error.

Caption/tag edits persist via `net.atpix.gallery.updatePhoto`.

#### Step 11 — Permissioned albums and space admin (Task 5.1)

Prerequisites: Steps 2–10 complete; `feature.spaces_enabled=true` (Step 4). **Multi-account tests:** Phase B handles (`alice.pds.atpix.net` owner, `bob.pds.atpix.net` member).

1. Create a **Permissioned** album (Albums → visibility chip → Create album). Confirm the album detail shows **Invite Members** and a **Space URI** in proposal form: `at://{spaceDid}/space/net.atpix.gallery.albumSpace/{skey}` (see [Test 3](#test-3--albums-and-caption-editing-f-004-f-005)).
2. Click **Invite Members** (or **Manage space** on the Collaborators tab) to open **Permissioned Space** admin (UI-SCR-006):
   - Space DID (matches Space URI authority), record type `net.atpix.gallery.albumSpace`, **Gated** badge
   - Member directory (ADMIN / MEMBER / VIEWER roles)
   - Invite by handle or direct **Add member**
   - Export Logs / Share Access actions
3. **Permissioned upload:** Upload Media → select **Permissioned Space** destination → pick the permissioned album → publish. Photos are written to the linked space via `space.createRecord` (blobs remain on your PDS; thumbnails are fetched through authenticated `space.getBlob` calls and rendered as object URLs in the gallery UI). Confirm permissioned **record** URIs follow `at://{spaceDid}/space/…/{authorDid}/net.atpix.gallery.photo/{rkey}` ([Test 5](#test-5--permissioned-upload-and-record-uri-f-002-permissioned-path)).
4. **Multi-account BDD (optional):** export OAuth session env vars for two accounts (see `.env.example` `TEST_OWNER_*` / `TEST_MEMBER_*`) after signing in via ATPix. Behave loads the repository root `.env` automatically; ensure `HAPPYVIEW_CLIENT_KEY` and test-account variables are set there, then:

```bash
cd apps/backend
behave tests/features/permissioned_spaces_integration_SRS-F-008.feature
```

Requires live HappyView, `HAPPYVIEW_ADMIN_KEY`, `HAPPYVIEW_CLIENT_KEY`, and both test-account token sets.

#### Step 12 — Run automated tests (optional)

```bash
cd apps/frontend && npm run lint && npm run test:unit && npm run test:ui
cd ../backend
# macOS/Linux: source .venv/bin/activate
# Windows: .venv\Scripts\activate
ruff check . --fix && ruff format .
./test
behave tests/features/c2pa_manifest_generation_SRS-F-012.feature
behave tests/features/permissioned_spaces_integration_SRS-F-008.feature  # requires HappyView + TEST_* accounts
cd ../..
# With HappyView up and HAPPYVIEW_ADMIN_KEY set:
cd apps/backend && pytest tests/integration/test_happyview_provision.py -v
```

Behave writes Allure results to `apps/backend/tests/allure-results/` via `apps/backend/.behaverc`.

`npm run test:ui` builds production artifacts (`vite build --mode test`) and runs vitest DOM assertions against `dist/` per [ADR-001](docs/architecture/001-test-runners-and-reporting.md).

See [What you can test right now](#what-you-can-test-right-now) for the feature checklist and manual test scripts.

#### Permissioned albums and `appAccess`

Creating a permissioned album calls HappyView's `com.atproto.simplespace.createSpace` (via `net.atpix.gallery.createAlbum`) with an `appAccess` field built by `buildSpaceAppAccess(origin)` in `apps/frontend/src/config/oauthClientMetadata.js`. That object looks like:

```json
{
  "type": "allowList",
  "allowed": ["<same client_id URL you registered in Step 6>"]
}
```

See [ADR-010](docs/architecture/010-permissioned-spaces-storage.md) — only apps on the allow-list may obtain space credentials for that album. The URL is the same **Client ID** you registered in Step 6.

**Full stack via Docker:**

```bash
docker compose up backend frontend grafana loki promtail prometheus redpanda
```

## Run tests

Lint first (see [.agents/rules/lint-enforce.md](.agents/rules/lint-enforce.md)):

```bash
cd apps/backend && source .venv/bin/activate && ruff check . --fix && ruff format .
cd apps/frontend && npm run format && npm run lint
```

**Backend** (`apps/backend/`):

```bash
./test
```

Or with the venv activated: `source .venv/bin/activate && pytest`

**Frontend** (`apps/frontend/`):

```bash
npm install
npx playwright install    # required before e2e tests are added
npm run build             # production artifact for UI test mandate
npm run test:unit
```

**Allure reports** (install [Allure CLI](https://allurereport.org/docs/install/)):

```bash
allure serve apps/backend/tests/allure-results
allure serve apps/frontend/tests/allure-results
```

## View logs

Start the observability stack:

```bash
docker compose up -d loki promtail prometheus redpanda grafana
```

- **Grafana:** [http://localhost:3000](http://localhost:3000) (default `admin` / `admin`)
- **Prometheus:** [http://localhost:9090](http://localhost:9090)
- **Loki:** [http://localhost:3100](http://localhost:3100)

Application containers (`backend`, `frontend`) log to stdout; Promtail ships Docker logs to Loki per `config/promtail/docker-config.yaml`.

## Viewing Developer Documentation

See [docs/](docs/) for the PRD, SRS, architecture ADRs, and Lexicon artifacts.

## Phase B — Dedicated PDS at OVH

ATPix application code (frontend, backend, HappyView) runs on your laptop or any host. **User accounts** for `atpix.net` live on a **separate** self-hosted PDS on OVH. This repo does not provision DNS or VPS resources automatically.

Complete these steps **in order** before [Phase G](#step-7--sign-in-and-verify-application-shell-task-21) when using the OVH path. DNS can take up to 24 hours to propagate; use `dig` (or your registrar's DNS checker) after each change. While waiting on DNS, start [Phases C–D](#step-1--clone-repository-and-environment).

HappyView and ATPix still run locally (Docker + dev servers). Users sign in with `*.pds.atpix.net` handles (or any other atproto account); OAuth and writes proxy to `https://pds.atpix.net` per [ADR-007](docs/architecture/007-happyview-app-view-integration.md).

### B.0 — Domain roles (reference)

The PDS hostname, user handles, marketing site, and lexicon authority are **separate DNS roles**. **Default user handles** use the PDS subdomain pattern (`alice.pds.atpix.net`) — covered by the `*.pds` wildcard DNS record with **no per-user registrar TXT**. Optional **apex** handles (`alice.atpix.net`) require individual `_atproto` TXT records ([B.7](#b7--optional-apex-branded-handles)).

| Host / record | Role | Required for first ATPix test? | Section |
|---------------|------|-------------------------------|---------|
| `pds.atpix.net` | Self-hosted PDS (one instance, many accounts) | **Yes** | [B.1–B.4](#b1--order-ovh-vps-eu) |
| `*.pds.atpix.net` | User handles (self-service or admin-created) | **Yes** | [B.5–B.6](#b5--create-test-accounts), [B.8](#b8--end-user-self-service-registration) |
| `_lexicon.gallery.atpix.net` | Network lexicon authority for `net.atpix.gallery.*` | No — local dev uses HappyView provisioning | [Phase J](#phase-j--network-lexicon-authority-optional-before-production) |
| `atpix.net` | Marketing homepage | No | [Optional web presence](#optional--atpixnet-web-presence) |
| `docs.atpix.net` | Project documentation | No | [Optional web presence](#optional--atpixnet-web-presence) |

**Do not** add a registrar wildcard `*.atpix.net` — GitHub [discourages apex wildcards](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) (takeover risk), and it would conflict with TXT-based handles. The PDS installer wildcard is **`*.pds.atpix.net` only**, not the apex zone.

**Execution order:** B.0 (reference) → B.1 (order VPS) → B.2 (PDS DNS) → B.3 (install PDS) → B.4 (verify health) → B.5 (create test accounts) → B.6 (verify handles) → B.8 (enable end-user signup). [B.7](#b7--optional-apex-branded-handles) is optional branding only.

### B.1 — Order OVH VPS (EU)

Run one [reference PDS](https://github.com/bluesky-social/pds) on an **EU-region** [OVHcloud VPS](https://www.ovhcloud.com/en-ie/vps/). Use hostname **`pds.atpix.net`** (not the apex `atpix.net`).

1. Sign in to the [OVHcloud Control Panel](https://www.ovh.com/manager/) and order a **VPS** ([getting started guide](https://help.ovhcloud.com/csm/en-ie-vps-getting-started?id=kb_article_view&sysparm_article=KB0047625)).
2. **Location:** choose an **EU datacenter** (for example Gravelines, Roubaix, Frankfurt, or Warsaw) so PDS data stays in the EU.
3. **Image:** Ubuntu 24.04 LTS. **Size:** at least 1 GB RAM / 1 vCPU / 20 GB SSD ([PDS recommendations](https://github.com/bluesky-social/pds#deploying-a-pds-onto-a-vps)).
4. **Authentication:** SSH key (recommended). Note the **public IPv4** address after provisioning ([find your VPS IP](https://help.ovhcloud.com/csm/en-ie-vps-getting-started?id=kb_article_view&sysparm_article=KB0047625)).
5. **Firewall:** enable the [OVH Network Firewall](https://help.ovhcloud.com/csm/en-ie-vps-network-firewall?id=kb_article_view&sysparm_article=KB0047548) (or equivalent host rules) allowing **inbound TCP 80 and 443** from anywhere. Restrict **SSH (22)** to your IP where possible.
6. SSH in: `ssh ubuntu@<vps-public-ipv4>` (or `root@…` if your image uses root). Continue to [B.2](#b2--pds-dns-before-install).

### B.2 — PDS DNS (before install)

At your registrar, add these records **before** running the PDS installer. Registrar UIs usually show only the **host label**; the full FQDN is shown for clarity.

| Registrar host label | Type | Value |
|----------------------|------|-------|
| `pds` | `A` | `<vps-public-ipv4>` from B.1 |
| `*.pds` | `A` | `<vps-public-ipv4>` — wildcard for `*.pds.atpix.net` handles |

Confirm propagation (retry until both return the VPS IP):

```bash
dig pds.atpix.net +short -t A
dig test123.pds.atpix.net +short -t A
```

### B.3 — Install PDS on the VPS

On the VPS ([PDS install guide](https://github.com/bluesky-social/pds#installing-on-ubuntu-200422042404-and-debian-111213)):

```bash
curl -O https://raw.githubusercontent.com/bluesky-social/pds/main/installer.sh
sudo bash installer.sh
```

When prompted:

| Prompt | Enter |
|--------|-------|
| Public DNS name | `pds.atpix.net` |
| Admin email | Your email (for Let's Encrypt; need not be `@atpix.net`) |
| First account | Skip or create a throwaway `admin.pds.atpix.net` for testing — you will create `alice` / `bob` handles in [B.5](#b5--create-test-accounts) |

On success, the installer prints service status commands and required DNS entries.

Useful admin commands on the VPS: `sudo systemctl status pds`, `sudo docker logs -f pds`, `sudo pdsadmin help`. Admin password: `/pds/pds.env` → `PDS_ADMIN_PASSWORD`.

References: [Self-hosting AT Protocol](https://atproto.com/guides/self-hosting), [PDS README](https://github.com/bluesky-social/pds).

### B.4 — Verify PDS is live

```bash
curl -sS https://pds.atpix.net/xrpc/_health
# Expect JSON with a "version" field, e.g. {"version":"0.2.2-beta.2"}

# From your laptop (optional WebSocket check):
# wsdump "wss://pds.atpix.net/xrpc/com.atproto.sync.subscribeRepos?cursor=0"
```

HappyView (running locally on port 3001) must be able to reach this URL over HTTPS when you sign in and upload.

### B.5 — Create test accounts (`alice.pds.atpix.net` / `bob.pds.atpix.net`)

Create two accounts on the **same** PDS using **subdomain handles** under `pds.atpix.net` ([handle specification](https://atproto.com/specs/handle)). No registrar TXT records are required — the [B.2](#b2--pds-dns-before-install) `*.pds` wildcard covers handle verification.

**Option A — PDS web UI:** open `https://pds.atpix.net/account` and register `alice.pds.atpix.net` and `bob.pds.atpix.net`. If invites are required, create codes on the VPS:

```bash
sudo docker exec pds goat pds admin create-invites
```

**Option B — `goat` on the VPS** (admin password from `/pds/pds.env`):

```bash
sudo docker exec pds goat pds admin account create \
  --handle alice.pds.atpix.net \
  --email alice@example.com \
  --password '<choose-a-password>'

sudo docker exec pds goat pds admin account create \
  --handle bob.pds.atpix.net \
  --email bob@example.com \
  --password '<choose-a-password>'
```

Save each account's **DID** and password from the command output. Set `TEST_OWNER_PDS_URL` and `TEST_MEMBER_PDS_URL` to `https://pds.atpix.net` in `.env` when running [Step 11 BDD](#step-11--permissioned-albums-and-space-admin-task-51).

### B.6 — Verify handles resolve

Install [`goat`](https://github.com/bluesky-social/goat#install) on your workstation if you have not already ([Prerequisites](#prerequisites)).

```bash
goat resolve alice.pds.atpix.net
goat resolve bob.pds.atpix.net
```

Use these handles when logging into HappyView ([Step 3](#step-3--happyview-admin-login-and-admin-api-key)) and ATPix ([Phase G](#step-7--sign-in-and-verify-application-shell-task-21)).

### B.7 — Optional: apex branded handles

Skip this section unless you specifically want apex handles like `alice.atpix.net` instead of `alice.pds.atpix.net`. Each apex handle requires a registrar `_atproto` TXT record and does **not** scale for self-service signup — see [F-020](docs/overview/002-prd.md#f-020-apex-handle-provisioning-at-scale) for a future operator workflow.

| Registrar host label | Type | Value |
|----------------------|------|-------|
| `_atproto.alice` | `TXT` | `did=<alice-did>` |

Verify with `dig _atproto.alice.atpix.net +short -t TXT` and `goat resolve alice.atpix.net`.

### B.8 — End-user self-service registration

New visitors without an atproto account can register **`*.pds.atpix.net`** handles on your PDS — ATPix does not create accounts ([F-001](docs/overview/002-prd.md#f-001-atproto-oauth-sign-in), [F-017](docs/overview/002-prd.md#f-017-hosted-pds-account-onboarding)).

1. **PDS policy:** configure open registration or invite codes on the VPS (`sudo docker exec pds goat pds admin create-invites` when invites are enabled).
2. **Signup URL:** users open `https://pds.atpix.net/account` and choose a handle such as `theirname.pds.atpix.net`.
3. **ATPix discovery:** set in repository root `.env`:

```bash
VITE_PDS_SIGNUP_URL=https://pds.atpix.net/account
```

Restart `npm run dev`. The sign-in panel shows a **Create a `*.pds.atpix.net` handle** link ([UI-SCR-009](docs/overview/004-ui-requirements.md#ui-scr-009-sign-in-and-pds-onboarding)).

**User journey:** create account on PDS → return to ATPix → sign in with the new handle → OAuth proceeds as for any existing account.

Post-v1 enhancements (embedded signup, ATPix-managed invites, apex handles at scale, Entryway/multi-PDS) are specified in [F-018](docs/overview/002-prd.md#f-018-embedded-signup-on-atpixnet) through [F-021](docs/overview/002-prd.md#f-021-entryway-and-multi-pds-federation).

## Optional — atpix.net web presence

GitHub Pages for the marketing site and documentation portal are **not** required to run or test ATPix locally. Configure them when you want public `atpix.net` / `docs.atpix.net` URLs.

### GitHub Pages (`atpix.net` homepage)

The marketing homepage lives in the separate **[atpix-homepage](https://github.com/peterVG/atpix-homepage)** repository (`index.html`, self-hosted CSS/fonts/images). It is **not** in this monorepo. The apex domain serves HTML only; it must not run the PDS.

1. Open **[peterVG/atpix-homepage](https://github.com/peterVG/atpix-homepage) → Settings → Pages**.
2. **Source:** deploy from branch `main`, folder `/ (root)`.
3. **Custom domain:** `atpix.net` (repo includes `CNAME`).
4. **Registrar DNS:** add four `A` records on `@` pointing to GitHub Pages (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`). Optional `www` → `peterVG.github.io` CNAME.
5. **Verify DNS:**

```bash
dig atpix.net +noall +answer -t A
# Expect four A records → 185.199.108.153 … 185.199.111.153
```

6. Enable **Enforce HTTPS** after the custom domain verifies.

Local clone for homepage work: `git clone git@github.com:peterVG/atpix-homepage.git`. Design reference: `docs/000-UX-guide.md` in that repo (synced from [docs/references/000-UX-guide.md](docs/references/000-UX-guide.md)).

### GitHub Pages (`docs.atpix.net` documentation)

Project documentation is served from the **`docs/`** folder in **this** repository via GitHub Pages (`docs/index.md` portal with client-side markdown rendering). Requires the docs portal on `main` ([PR #12](https://github.com/peterVG/ATPix/pull/12)).

1. Open **[peterVG/ATPix](https://github.com/peterVG/ATPix) → Settings → Pages**.
2. **Source:** deploy from branch `main`, folder **`/docs`**.
3. **Custom domain:** `docs.atpix.net` (`docs/CNAME` in the docs portal).
4. **GoDaddy DNS:** add CNAME `docs` → `peterVG.github.io`.
5. **Verify DNS:**

```bash
dig docs.atpix.net +short -t CNAME
# peterVG.github.io.
```

6. Enable **Enforce HTTPS** after verification.

References: [Managing a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [About custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages).

## Phase J — Network lexicon authority (optional before production)

Network resolution for `net.atpix.gallery.*` links the authority domain **`gallery.atpix.net`** (reverse of `net.atpix.gallery`) to a DID that publishes `com.atproto.lexicon.schema` records ([Lexicons guide](https://atproto.com/guides/lexicons), [ADR-009](docs/architecture/009-lexicon-namespace-authority.md)).

**Skip Phase J for your first local test.** [Step 4](#step-4--provision-lexicons-and-enable-permissioned-spaces) (`scripts/provision_happyview.py`) registers lexicons in your HappyView App View, which is enough for ATPix UI and upload flows. Run Phase J when you want NSIDs resolvable network-wide (other App Views, federation tooling).

Prerequisites: [Phase B](#phase-b--dedicated-pds-at-ovh) complete (live PDS at `https://pds.atpix.net`).

### J.1 — Create the authority account

On the VPS, create a dedicated account (example handle `lexicon.atpix.net`):

```bash
sudo docker exec pds goat pds admin account create \
  --handle lexicon.atpix.net \
  --email lexicon@example.com \
  --password '<choose-a-password>'
```

Note the authority **DID** (`<authority-did>`). If this handle uses DNS verification, also add `_atproto.lexicon` TXT at your registrar — only the `_lexicon.gallery` record is required for NSID authority.

### J.2 — Publish authority DNS

| Registrar host label | Type | Value |
|----------------------|------|-------|
| `_lexicon.gallery` | `TXT` | `did=<authority-did>` |

Verify:

```bash
dig _lexicon.gallery.atpix.net +short -t TXT
# "did=did:plc:..."
```

### J.3 — Publish lexicons with `goat lex`

From your workstation ([`goat` installed](#prerequisites)) or the VPS via `docker exec pds goat`:

1. Prepare a project directory with `goat`'s expected layout (`lexicons/net/atpix/gallery/*.json`):

```bash
mkdir -p /tmp/atpix-lexicons/lexicons/net/atpix/gallery
for f in docs/lexicon/net.atpix.gallery.*.json; do
  base=$(basename "$f" .json)
  suffix=${base#net.atpix.gallery.}
  cp "$f" "/tmp/atpix-lexicons/lexicons/net/atpix/gallery/${suffix}.json"
done
cd /tmp/atpix-lexicons
```

2. Log in as the authority account:

```bash
goat account login -u lexicon.atpix.net -p '<password>' --pds-host https://pds.atpix.net
```

3. Lint, verify DNS, and publish:

```bash
goat lex lint
goat lex check-dns
goat lex publish
```

`goat lex check-dns` should report no missing `_lexicon` entries for `net.atpix.gallery.*`. After publish, network clients can resolve NSIDs like `net.atpix.gallery.photo` via DNS → DID → PDS repo.

Re-run [Step 4](#step-4--provision-lexicons-and-enable-permissioned-spaces) whenever lexicon JSON changes in this repo so your local HappyView index stays current. See [docs/lexicon/net.atpix.gallery.md](docs/lexicon/net.atpix.gallery.md) for upload order and [system architecture](docs/overview/000-architecture.md) for how PDS, HappyView, and DNS roles fit together.

## Deploy to Production

Deploy ATPix apps per the [first-time walkthrough](#first-time-install-and-test) and [quick reference](#quick-reference-after-env-is-configured): HappyView (`docker-compose.happyview.yml`), backend, and frontend. Point `VITE_HAPPYVIEW_URL` / `HAPPYVIEW_URL` at your production HappyView instance. Register an OAuth client in HappyView ([Step 6](#step-6--register-atpix-api-client-in-happyview-required-for-sign-in)) and set `VITE_HAPPYVIEW_CLIENT_KEY` in the frontend build environment. Complete [Phase B](#phase-b--dedicated-pds-at-ovh) and [Phase J](#phase-j--network-lexicon-authority-optional-before-production) for production `atpix.net` identity and lexicon authority.

## Monitor and Update

Use the observability stack in [View logs](#view-logs) for ATPix containers. Monitor the OVHcloud PDS VPS separately (disk, TLS expiry, PDS logs; [OVH monitoring and alerts](https://help.ovhcloud.com/csm/en-ie-vps-monitoring?id=kb_article_view&sysparm_article=KB0047626)). Re-run provisioning after lexicon changes and document HappyView `feature.spaces_enabled` status in test reports per [SRS NFR-013](docs/overview/003-srs.md).
