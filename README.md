# About this project

**ATPix** is a decentralized photo collection and sharing application on the [AT Protocol](https://atproto.com). 

Users own their libraries: photos live as cryptographically signed records and blobs in Personal Data Server (PDS) repositories, indexed and served by a [HappyView](https://happyview.dev) App View. 

This product is a proof-of-concept to evaluate HappyView's permissioned spaces implementation.

## What it does

Users sign in with **atproto OAuth** (DPoP-bound sessions, no app passwords), upload images with **C2PA 2.2 Content Credentials**, organize **albums**, and browse **My Gallery** or a **Following / Hashtags** discovery feed. 

Galleries populate two ways: 
**(a)** direct PDS upload and 
**(b)** photos already indexed on the network via follow-graph and hashtag rules—Path B uses only HappyView Jetstream sync, not a custom firehose. 

Sharing supports **public**, **unlisted**, and **permissioned** albums; permissioned collections use [HappyView Permissioned Spaces](https://happyview.dev/experimental/spaces) (ATP-0016) so only invited members can view curated private albums.

Product language (gallery, album) maps to atproto primitives (queries, `net.atpix.gallery.*` records, space repos) in the [PRD](docs/prd.md#product-terms--at-protocol-primitives) and [Lexicon README](docs/lexicon/README.md).

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

Observability (Promtail → Redpanda → Loki, Prometheus, Grafana) runs via root `docker-compose.yml` per [003](docs/architecture/003-observability-stack.md). Tests use pytest/behave, vitest/playwright, and **Allure** reporting per [001](docs/architecture/001-test-runners-and-reporting.md).

## Where user data lives (PDS vs App View)

ATPix follows the standard [AT Protocol](https://atproto.com) split: a **Personal Data Server (PDS)** hosts each user's signed repository; an **App View** indexes and serves that data for apps. **ATPix does not run or host user PDSes** — neither the monorepo Docker stack nor HappyView replaces account storage.

| Layer | Role in ATPix | Canonical user photos & records? |
|-------|---------------|----------------------------------|
| **User PDS** (remote) | Hosts blobs + public/unlisted `net.atpix.gallery.*` records; `net.atpix.gallery.album` metadata (with `spaceUri` when permissioned) | **Yes** — source of truth for public/unlisted content and album containers |
| **HappyView** (external, port 3001) | App View: index, OAuth write proxy, XRPC, permissioned spaces | **Public/unlisted:** index/cache + proxy only. **Permissioned:** `net.atpix.gallery.photo` and `net.atpix.gallery.albumItem` in the album's space repo are canonical there |
| **`apps/backend/`** | C2PA claim generation/validation, health | No |
| **`apps/frontend/`** | Gallery UI, OAuth client | No — browser session state only |

**Users bring their own PDS.** Sign-in uses atproto OAuth against an identity that already exists on a PDS (e.g. a Bluesky account, another hoster, or a self-hosted PDS you run separately). HappyView proxies `uploadBlob` and record writes to that user's PDS; it does not provision new atproto accounts. See [ADR-006](docs/architecture/006-oauth-dpop-authentication.md) and [ADR-007](docs/architecture/007-happyview-app-view-integration.md).

Typical write path once the gallery UI is implemented:

```
Browser (ATPix) → HappyView (OAuth + XRPC proxy) → user's PDS
```

**Permissioned albums** ([ADR-010](docs/architecture/010-permissioned-spaces-storage.md)): the `net.atpix.gallery.album` container record stays in the owner's **PDS** and links `spaceUri`. The HappyView **space repo** holds permissioned `net.atpix.gallery.photo` and `net.atpix.gallery.albumItem` records. **Image blobs remain on the author's PDS** and are served via `com.atproto.space.getBlob` with membership checks.

**Local Docker persistence:** HappyView stores its own SQLite index, OAuth sessions, and provisioned lexicons under `./data/happyview_data/` (bind-mounted in `docker-compose.happyview.yml`). Stopping the container does **not** delete user PDS data. Wiping `./data/happyview_data/` loses local index and sessions only — records on users' PDSes remain; re-run [provisioning](#run-the-application) and backfill to rebuild the index.

**New test accounts:** use Bluesky accounts for quick smoke tests, or the [self-hosted `atpix.net` layout](#atpixnet-infrastructure) below for multi-account permissioned-album testing.

## Requirements and verification

- **[Product vision](docs/product-vision.md)** — problem, users, value proposition
- **[PRD v1.5](docs/prd.md)** — F-001–F-016 functional requirements, NFRs, technical constraints
- **[SRS v1.0](docs/srs.md)** — technical specs with 100% PRD traceability
- **[Implementation plan](docs/plan.md)** — global roadmap; module checklists in [apps/frontend/docs/plan.md](apps/frontend/docs/plan.md) and [apps/backend/docs/plan.md](apps/backend/docs/plan.md)
- **[UI requirements v1.0](docs/ui-requirements.md)** — screens, components, and mockups ([UX guide](docs/references/000-UX-guide.md))
- **BDD features** — Gherkin scenarios under `apps/frontend/tests/features/` (UI/auth/gallery) and `apps/backend/tests/features/` (C2PA, lexicon, spaces, performance)
- **Architecture** — [ADRs 001–011](docs/architecture/) including OAuth ([006](docs/architecture/006-oauth-dpop-authentication.md)), HappyView integration ([007](docs/architecture/007-happyview-app-view-integration.md)), C2PA ([008](docs/architecture/008-c2pa-sdk-and-signing.md)), lexicon authority ([009](docs/architecture/009-lexicon-namespace-authority.md)), permissioned spaces ([010](docs/architecture/010-permissioned-spaces-storage.md)), SQLite index ([011](docs/architecture/011-sqlite-index-database.md))

v1 is a **product-validation** and **reference implementation** release—not a mass-market consumer launch. Encrypted private albums and client-side encryption are explicitly out of scope.

## Prerequisites

Install runtimes using a version manager ([mise](https://mise.jdx.dev/), [asdf](https://asdf-vm.com/), [nvm](https://github.com/nvm-sh/nvm), or [pyenv](https://github.com/pyenv/pyenv)) — do not rely on OS-shipped Python/Node alone.

| Tool | Version | Docs |
|------|---------|------|
| Python | 3.11+ | [python.org/downloads](https://www.python.org/downloads/) |
| Node.js | 22+ | [nodejs.org](https://nodejs.org/) |
| Docker | latest | [docs.docker.com](https://docs.docker.com/get-docker/) |

# Setup Development Environment

## Run the application

**HappyView** (separate process, [ADR-007](docs/architecture/007-happyview-app-view-integration.md)): runs on port **3001** (Grafana uses **3000** in compose).

```bash
# Start HappyView (SQLite, port 3001)
docker compose -f docker-compose.happyview.yml up -d
curl http://127.0.0.1:3001/health

# Log in at http://127.0.0.1:3001/ with your atproto handle (first user = super user).
# Create an admin API key (Settings → API Keys) with lexicons:create, lexicons:read,
# and settings:manage (read is required for --verify-only and post-upload checks).

pip install python-dotenv   # or use apps/backend venv after pip install -r requirements-dev.txt
cp .env.example .env   # set HAPPYVIEW_ADMIN_KEY=hv_... — the provision script loads .env automatically
python3 scripts/provision_happyview.py          # upload lexicons + enable feature.spaces_enabled
python3 scripts/provision_happyview.py --verify-only   # confirm provisioning
# Or export inline: HAPPYVIEW_ADMIN_KEY=hv_... python3 scripts/provision_happyview.py
```

See [docs/lexicon/README.md](docs/lexicon/README.md) for lexicon upload order and [happyview.dev](https://happyview.dev) for full App View docs.

**Backend** (from `apps/backend/`):

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements-dev.txt
uvicorn app.main:app --reload --port 8000
```

**Frontend** (from `apps/frontend/`):

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173). API health: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health).

### Test current functionality (Tasks 1.2 + 1.3)

**What works on `main` today:** HappyView provisioning (lexicons + spaces flag), OAuth client metadata at `/oauth-client-metadata.json`, frontend landing page, backend health. **Not yet:** OAuth sign-in button, photo upload, or galleries (Task 2.1+).

**Prerequisites:** Docker running, Python 3.11+, Node.js 22+, an atproto account (Bluesky handle works for HappyView admin login).

#### Step 1 — Clone and configure environment

```bash
git clone https://github.com/peterVG/ATPix.git
cd ATPix
cp .env.example .env
```

Open `.env` in an editor. You will fill in keys in later steps; for now confirm these defaults exist:

| Variable | Example value | Purpose |
|----------|---------------|---------|
| `HAPPYVIEW_URL` | `http://127.0.0.1:3001` | App View base URL |
| `VITE_HAPPYVIEW_URL` | `http://127.0.0.1:3001` | Same, for frontend build |
| `VITE_DEPLOYMENT_ORIGIN` | `http://127.0.0.1:5173` | Public URL of the ATPix UI (OAuth `client_id` origin) |
| `HAPPYVIEW_ADMIN_KEY` | *(empty until Step 3)* | `hv_*` admin key for provisioning |
| `VITE_HAPPYVIEW_CLIENT_KEY` | *(empty until Step 6)* | `hvc_*` client key for XRPC |

#### Step 2 — Start HappyView and verify health

```bash
docker compose -f docker-compose.happyview.yml up -d
curl -sS http://127.0.0.1:3001/health
```

**Expected:** HTTP 200 and a JSON body (not an error page). If `curl` fails, wait 10–30 seconds for the container to start, then retry.

#### Step 3 — HappyView admin login and admin API key

1. Open **http://127.0.0.1:3001/** in a browser.
2. Sign in with your atproto handle (e.g. a Bluesky account). The **first** user becomes super-user.
3. Go to **Settings → API Keys → Create**.
4. Name it e.g. `atpix-provision`; enable permissions: `lexicons:create`, `lexicons:read`, `settings:manage`.
5. Copy the key (starts with `hv_`). Paste into `.env`:

```bash
HAPPYVIEW_ADMIN_KEY=hv_paste_your_key_here
```

#### Step 4 — Provision lexicons and enable permissioned spaces

```bash
pip install python-dotenv
python3 scripts/provision_happyview.py
python3 scripts/provision_happyview.py --verify-only
```

**Expected from `--verify-only`:** confirmation that all 23 `net.atpix.gallery.*` lexicons are registered and `feature.spaces_enabled` is `true`. Errors about `HAPPYVIEW_ADMIN_KEY` mean Step 3 is incomplete.

Optional: in HappyView admin, open **Lexicons** and confirm `net.atpix.gallery.photo` (and siblings) appear in the list.

#### Step 5 — Start frontend and verify OAuth client metadata

```bash
cd apps/frontend
npm install
npm run dev
```

Leave this terminal running. In a **second** terminal:

```bash
# Landing page loads
curl -sS -o /dev/null -w "http_code=%{http_code}\n" http://127.0.0.1:5173/

# OAuth metadata document (Task 1.3)
curl -sS http://127.0.0.1:5173/oauth-client-metadata.json
```

**Expected metadata checks:**

| JSON field | Expected value (local dev) |
|------------|----------------------------|
| `client_id` | `http://127.0.0.1:5173/oauth-client-metadata.json` |
| `client_name` | `ATPix` |
| `redirect_uris` | `["http://127.0.0.1:5173/oauth/callback"]` |
| `dpop_bound_access_tokens` | `true` |
| `token_endpoint_auth_method` | `"none"` |
| `scope` | contains `atproto`, `blob:*/*`, `repo:net.atpix.gallery.photo` |

Open **http://127.0.0.1:5173/** in a browser — you should see the R&D overview page with **HappyView endpoint: `http://127.0.0.1:3001`**.

**Production build check (optional):**

```bash
cd apps/frontend
VITE_DEPLOYMENT_ORIGIN=http://127.0.0.1:5173 npm run build
grep client_id dist/oauth-client-metadata.json
```

#### Step 6 — Register ATPix API client in HappyView (before Task 2.1 sign-in)

HappyView must know about your app **before** users can sign in via OAuth. You register it as an **API Client** (different from the admin `hv_*` key).

1. Keep `npm run dev` running so `http://127.0.0.1:5173/oauth-client-metadata.json` stays reachable.
2. Open **http://127.0.0.1:3001/** → **API Clients** (admin sidebar).
3. Click **Create** (or equivalent).
4. Fill in fields:

| Field | Value |
|-------|-------|
| **Type** | Public (browser app; no client secret) |
| **Client ID** | `http://127.0.0.1:5173/oauth-client-metadata.json` — must match the `client_id` from Step 5 exactly |
| **Allowed origins** | `http://127.0.0.1:5173` (and `http://localhost:5173` if you use that hostname) |
| **Scopes** | Include at minimum: `atproto`, `blob:*/*`, and the `repo:net.atpix.gallery.*` collections listed in the metadata `scope` field |

5. Save. Copy the generated **client key** (`hvc_…`) — shown once on create.
6. Add to repo root `.env`:

```bash
VITE_HAPPYVIEW_CLIENT_KEY=hvc_paste_your_key_here
```

7. **Restart** `npm run dev` (Vite reads `.env` at startup).

**Important:** `hv_*` = admin automation (provisioning). `hvc_*` = browser app identity on every XRPC call. Never put `hv_*` on XRPC routes ([TC-006](docs/prd.md#tc-006-api-client-identification)).

#### Step 7 — Run automated tests (optional)

```bash
cd apps/frontend && npm run lint && npm run test:unit
cd ../..
# With HappyView up and HAPPYVIEW_ADMIN_KEY set:
cd apps/backend && python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements-dev.txt
pytest tests/integration/test_happyview_provision.py -v
```

#### What you cannot test yet

- **Sign in with OAuth** — UI arrives in Task 2.1; metadata + `hvc_*` key are prerequisites only.
- **Upload photos / albums / permissioned spaces UI** — Tasks 3.x and 5.x.

#### Permissioned albums and `appAccess` (preview for Task 5.1)

When permissioned albums are implemented, creating a private album will call HappyView's `com.atproto.simplespace.createSpace` with an `appAccess` field built by `buildSpaceAppAccess(origin)` in `apps/frontend/src/config/oauthClientMetadata.js`. That object looks like:

```json
{
  "type": "allowList",
  "allowed": ["http://127.0.0.1:5173/oauth-client-metadata.json"]
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

**Backend** (`apps/backend/`, venv active):

```bash
pytest
```

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

## Setup Production Environment

ATPix application code (frontend, backend, HappyView) can run on your laptop or any host. **User accounts and lexicon authority** for `atpix.net` are deployed separately as below. This repo does not provision DNS or VPS resources automatically.

Follow the steps in order. DNS can take up to 24 hours to propagate; use `dig` (or your registrar's DNS checker) after each change.

### Step 0 — Domain map (registrar DNS)

The PDS hostname, user handles, marketing site, and lexicon authority are **separate DNS roles**. Handles do not need a `.pds` segment (use `alice.atpix.net`, not `alice.pds.atpix.net`).

| Host / record | Role | Hosted on |
|---------------|------|-----------|
| `atpix.net` | Project homepage (marketing, docs links) | [GitHub Pages](#step-1--github-pages-atpixnet-homepage) |
| `pds.atpix.net` | Self-hosted PDS (one instance, many accounts) | [DigitalOcean VPS](#step-2--digitalocean-vps--pdsatpixnet) |
| `alice.atpix.net`, `bob.atpix.net` | Test handles → DIDs on your PDS | [Handle DNS](#step-3--handle-dns-aliceatpixnet--bobatpixnet) |
| `_lexicon.gallery.atpix.net` | Lexicon authority for `net.atpix.gallery.*` | [Lexicon authority](#step-4--lexicon-authority-_lexicongalleryatpixnet) |

At your domain registrar, create these records. Registrar UIs usually show only the **host label** (left column); the full FQDN is shown for clarity.

| Registrar host label | Type | Value | When to add |
|----------------------|------|-------|-------------|
| `@` | `A` | `185.199.108.153` | Step 1 (GitHub Pages apex) |
| `@` | `A` | `185.199.109.153` | Step 1 |
| `@` | `A` | `185.199.110.153` | Step 1 |
| `@` | `A` | `185.199.111.153` | Step 1 |
| `www` | `CNAME` | `<org-or-user>.github.io` | Step 1 (optional; GitHub redirects `www` ↔ apex) |
| `pds` | `A` | `<droplet-public-ipv4>` | Step 2 (before PDS install) |
| `*.pds` | `A` | `<droplet-public-ipv4>` | Step 2 (wildcard for `*.pds.atpix.net` handles) |
| `_atproto.alice` | `TXT` | `did=<alice-did>` | Step 3 (after account creation) |
| `_atproto.bob` | `TXT` | `did=<bob-did>` | Step 3 |
| `_lexicon.gallery` | `TXT` | `did=<authority-did>` | Step 4 (after authority account exists) |

**Do not** add a registrar wildcard `*.atpix.net` — GitHub [discourages apex wildcards](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) (takeover risk), and it would conflict with TXT-based handles. The PDS installer wildcard is **`*.pds.atpix.net` only**, not the apex zone.

HappyView and ATPix still run wherever you deploy them (local Docker, a cloud VM, etc.). Users sign in with `alice.atpix.net` or `bob.atpix.net`; OAuth and writes proxy to `https://pds.atpix.net` per [ADR-007](docs/architecture/007-happyview-app-view-integration.md).

### Step 1 — GitHub Pages (`atpix.net` homepage)

Host a static project site from this repository (or a dedicated docs repo) on GitHub Pages. The apex domain serves HTML only; it must not run the PDS.

1. **Choose a publishing source** in the GitHub repo: **Settings → Pages → Build and deployment → Source** → deploy from branch `main` (folder `/` or `/docs` depending on where your site files live). Wait for the first `*.github.io` deployment to succeed.
2. **Add the custom domain** in the same Pages settings panel: enter `atpix.net` under **Custom domain** → **Save**. GitHub commits a `CNAME` file to your publishing branch (pull it locally if you build the site offline).
3. **Add apex DNS** at your registrar (four `A` records on `@` from the [Step 0](#step-0--domain-map-registrar-dns) table). Optional IPv6: four `AAAA` records on `@` per [GitHub's apex guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain).
4. **Optional `www`:** add the `www` → `<org-or-user>.github.io` `CNAME` from Step 0 so GitHub can redirect between `atpix.net` and `www.atpix.net`.
5. **Verify DNS:**

```bash
dig atpix.net +noall +answer -t A
# Expect four A records → 185.199.108.153 … 185.199.111.153
```

6. Back in **Settings → Pages**, wait until the custom domain shows as verified, then enable **Enforce HTTPS** (can take up to 24 hours after DNS propagates).

References: [Managing a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [About custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages).

### Step 2 — DigitalOcean VPS + `pds.atpix.net`

Run one [reference PDS](https://github.com/bluesky-social/pds) on a VPS. Use hostname **`pds.atpix.net`** (not the apex `atpix.net`).

#### 2a. Create the Droplet

1. In [DigitalOcean](https://cloud.digitalocean.com/): **Create → Droplets**.
2. **Image:** Ubuntu 24.04 LTS. **Size:** at least 1 GB RAM / 1 vCPU / 20 GB SSD ([PDS recommendations](https://github.com/bluesky-social/pds#deploying-a-pds-onto-a-vps)).
3. **Authentication:** SSH key (recommended) or password. Note the **public IPv4** address after creation.
4. **Firewall:** create or attach a cloud firewall allowing **inbound TCP 80 and 443** from anywhere. Restrict **SSH (22)** to your IP if possible ([DO firewall docs](https://docs.digitalocean.com/products/networking/firewalls/)).
5. SSH in: `ssh root@<droplet-public-ipv4>`.

#### 2b. DNS before install

Add the Step 0 records `pds` and `*.pds` → `<droplet-public-ipv4>`. Confirm:

```bash
dig pds.atpix.net +short -t A
dig test123.pds.atpix.net +short -t A
# Both should return the Droplet IP
```

#### 2c. Run the PDS installer

On the Droplet ([PDS install guide](https://github.com/bluesky-social/pds#installing-on-ubuntu-200422042404-and-debian-111213)):

```bash
curl -O https://raw.githubusercontent.com/bluesky-social/pds/main/installer.sh
sudo bash installer.sh
```

When prompted:

| Prompt | Enter |
|--------|-------|
| Public DNS name | `pds.atpix.net` |
| Admin email | Your email (for Let's Encrypt; need not be `@atpix.net`) |
| First account | Skip or create a throwaway `admin.pds.atpix.net` for testing — you will create `alice` / `bob` handles in Step 3 |

On success, the installer prints service status commands and required DNS entries.

#### 2d. Verify PDS is live

```bash
curl -sS https://pds.atpix.net/xrpc/_health
# Expect JSON with a "version" field, e.g. {"version":"0.2.2-beta.2"}

# From your laptop (optional WebSocket check):
# wsdump "wss://pds.atpix.net/xrpc/com.atproto.sync.subscribeRepos?cursor=0"
```

Useful admin commands on the VPS: `sudo systemctl status pds`, `sudo docker logs -f pds`, `sudo pdsadmin help`. Admin password: `/pds/pds.env` → `PDS_ADMIN_PASSWORD`.

References: [Self-hosting AT Protocol](https://atproto.com/guides/self-hosting), [PDS README](https://github.com/bluesky-social/pds).

### Step 3 — Handle DNS (`alice.atpix.net` / `bob.atpix.net`)

Create two accounts on the **same** PDS with custom apex handles, then publish `_atproto` TXT records ([handle specification](https://atproto.com/specs/handle)).

#### 3a. Create accounts

**Option A — PDS web UI:** open `https://pds.atpix.net/account` and register two accounts. If invites are required, create codes on the VPS:

```bash
sudo docker exec pds goat pds admin create-invites
```

**Option B — `goat` on the VPS** (admin password from `/pds/pds.env`):

```bash
sudo docker exec pds goat pds admin account create \
  --handle alice.atpix.net \
  --email alice@example.com \
  --password '<choose-a-password>'

sudo docker exec pds goat pds admin account create \
  --handle bob.atpix.net \
  --email bob@example.com \
  --password '<choose-a-password>'
```

Save each account's **DID** and password from the command output.

#### 3b. Publish handle TXT records

At your registrar, add (replace placeholders with the DIDs from account creation):

| Full record name | Type | Value |
|------------------|------|-------|
| `_atproto.alice.atpix.net` | `TXT` | `did=<alice-did>` |
| `_atproto.bob.atpix.net` | `TXT` | `did=<bob-did>` |

No `A`/`CNAME` records are required on `alice` or `bob` for DNS-based handle verification.

#### 3c. Verify handles resolve

```bash
dig _atproto.alice.atpix.net +short -t TXT
# "did=did:plc:..."

goat resolve alice.atpix.net
goat resolve bob.atpix.net
```

Use these handles when logging into HappyView and when running permissioned-album BDD scenarios that require multiple identities.

### Step 4 — Lexicon authority (`_lexicon.gallery.atpix.net`)

Network resolution for `net.atpix.gallery.*` links the authority domain **`gallery.atpix.net`** (reverse of `net.atpix.gallery`) to a DID that publishes `com.atproto.lexicon.schema` records ([Lexicons guide](https://atproto.com/guides/lexicons), [ADR-009](docs/architecture/009-lexicon-namespace-authority.md)).

This step is **distinct** from HappyView provisioning: `scripts/provision_happyview.py` indexes lexicons in your App View only; `goat lex publish` makes schemas resolvable network-wide.

#### 4a. Create the authority account

Create a dedicated account on your PDS (example handle `lexicon.atpix.net`):

```bash
sudo docker exec pds goat pds admin account create \
  --handle lexicon.atpix.net \
  --email lexicon@example.com \
  --password '<choose-a-password>'
```

Note the authority **DID** (`<authority-did>`). If this handle uses DNS verification, also add `_atproto.lexicon` TXT — only the `_lexicon.gallery` record is required for NSID authority.

#### 4b. Publish authority DNS

| Full record name | Type | Value |
|------------------|------|-------|
| `_lexicon.gallery.atpix.net` | `TXT` | `did=<authority-did>` |

Verify:

```bash
dig _lexicon.gallery.atpix.net +short -t TXT
# "did=did:plc:..."
```

#### 4c. Publish lexicons from this repo with `goat lex`

On your workstation (or the VPS via `docker exec pds goat`):

1. Install [`goat`](https://github.com/bluesky-social/goat#install) if not already available.
2. Prepare a project directory with `goat`'s expected layout (`lexicons/net/atpix/gallery/*.json`):

```bash
mkdir -p /tmp/atpix-lexicons/lexicons/net/atpix/gallery
for f in docs/lexicon/net.atpix.gallery.*.json; do
  base=$(basename "$f" .json)
  suffix=${base#net.atpix.gallery.}
  cp "$f" "/tmp/atpix-lexicons/lexicons/net/atpix/gallery/${suffix}.json"
done
cd /tmp/atpix-lexicons
```

3. Log in as the authority account:

```bash
goat account login -u lexicon.atpix.net -p '<password>' --pds-host https://pds.atpix.net
```

4. Lint, verify DNS, and publish:

```bash
goat lex lint
goat lex check-dns
goat lex publish
```

`goat lex check-dns` should report no missing `_lexicon` entries for `net.atpix.gallery.*`. After publish, network clients can resolve NSIDs like `net.atpix.gallery.photo` via DNS → DID → PDS repo.

#### 4d. HappyView App View (required for ATPix indexing)

Regardless of network publication, upload lexicons to your HappyView instance:

```bash
docker compose -f docker-compose.happyview.yml up -d
python3 scripts/provision_happyview.py
python3 scripts/provision_happyview.py --verify-only
```

See [docs/lexicon/README.md](docs/lexicon/README.md) for upload order and [system architecture](docs/architecture.md) for how PDS, HappyView, and DNS roles fit together.

## Deploy to Production

Deploy ATPix apps per [Run the application](#run-the-application): HappyView (`docker-compose.happyview.yml`), backend, and frontend. Point `VITE_HAPPYVIEW_URL` / `HAPPYVIEW_URL` at your production HappyView instance. Register an OAuth client in HappyView and set `VITE_HAPPYVIEW_CLIENT_KEY` in the frontend build environment.

## Monitor and Update

Use the observability stack in [View logs](#view-logs) for ATPix containers. Monitor the DigitalOcean PDS VPS separately (disk, TLS expiry, PDS logs). Re-run provisioning after lexicon changes and document HappyView `feature.spaces_enabled` status in test reports per [SRS NFR-013](docs/srs.md).
