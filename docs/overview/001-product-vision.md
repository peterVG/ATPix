# ATPix

## Product Vision

**Description:** ATPix is a decentralized photo collection and sharing application built on the AT Protocol. Users upload, organize, and share photos through their own Personal Data Server (PDS) accounts while a HappyView App View indexes and serves gallery experiences. Photos remain user-owned, cryptographically signed, and portable across the Atmosphere.

**Why it exists:** Mainstream photo apps trap images in proprietary silos. ATPix treats photos as signed atproto records in user repositories—interoperable, verifiable, and movable between hosts—while still offering familiar gallery, album, and sharing workflows.

## Target Users & Customer Profile

- **Creators and photographers** who want ownership and portability of their image libraries
- **atproto-native users** (e.g. Bluesky community) who prefer OAuth identity over new account/password systems
- **New ATPix visitors** who register a `*.pds.atpix.net` handle on the operator-hosted PDS, then sign in via OAuth (F-017 link; embedded signup F-018 post-v1)
- **Developers** exploring App View patterns on HappyView with a concrete media use case

**Jobs:** Upload photos, group them into albums, share a public profile gallery or a curated album link, create groups of user accounts that are authorized to access permissioned data, browse others' public galleries.

**Pains:** Vendor lock-in, lost libraries on service shutdown, opaque sharing permissions, duplicate uploads across platforms.

**Gains:** One identity (DID/handle), portable data, open schemas any app can read, minimal backend boilerplate via HappyView.

## Core Features

- atproto OAuth sign-in (existing PDS account or new `*.pds.atpix.net` account on hosted PDS)
- Hosted PDS signup discovery link on sign-in panel when configured (F-017)
- Photo upload with blob storage on user's PDS
- Photo collection from followed accounts and hashtags
- Captions, tags, and album organization
- Personal gallery grid with pagination
- Public profile gallery by DID or handle
- Shareable album links (including unlisted albums)
- Permissioned data albums, restrict access to specific authenticated users
- Delete photos and manage album membership

## User Requirements

- I want to sign in with my existing atproto account without creating a new password store.
- I want to create a new `*.pds.atpix.net` account on the ATPix PDS and sign in without operator DNS work per user.
- I want to upload photos and see them in my gallery immediately.
- I want to organize photos into named albums.
- I want to share my full public gallery or a specific album via a link.
- I want to restrict access to a shared gallery or album to a select group of authenticated users.
- I want to browse another user's public photos if they use ATPix Lexicons.
- I want confidence that my photos live in my repo, not only on an app's servers.

## Technical Stack

- **Protocol:** AT Protocol (identity, repos, blobs, XRPC)
- **Hosted PDS (operator):** [Reference PDS](https://github.com/bluesky-social/pds) on OVH at `pds.atpix.net` for `*.pds.atpix.net` handles — separate from the monorepo; ATPix links to registration via `VITE_PDS_SIGNUP_URL` (F-017)
- **App View:** [HappyView](https://happyview.dev) — Lexicon-driven indexing, Jetstream sync, OAuth proxy
- **Frontend (options):** Plain vanilla JS, HTML and CSS incorporating `@happyview/lex-agent` and `@happyview/oauth-client-browser`
- **Index database:** SQLite 
- **Blob storage:** User PDS (proxied through HappyView `com.atproto.repo.uploadBlob`); permissioned album **records** live in space repos; blob bytes remain on the author's PDS and are served via `com.atproto.space.getBlob` with membership gating
- **Observability:** Promtail, Loki, Prometheus, Grafana (project `docker-compose.yml`)

## Technical & Domain References

- [AT Protocol knowledge base (v2, combined)](../../.agents/kb/at-protocol-v2.md) — public broadcast + Permissioned Data proposal (identity, addressing, spaces)
- [AT Protocol knowledge base (legacy overview)](../../.agents/kb/at-protocol.md)
- [Blacksky tutorial synthesis](../../.agents/kb/at-protocol-blacksky-tutorial.md)
- [HappyView knowledge base](../../.agents/kb/happyview.md) — **implementation dialect** for spaces (e.g. `ats://`); product requirements follow HappyView, not the raw proposal alone
- [Product requirements (PRD)](./002-prd.md) — functional requirements, Lexicon spec, C2PA compliance
- [Product terms ↔ AT Protocol primitives (PRD)](./002-prd.md#product-terms--at-protocol-primitives) — gallery/album (UI) mapped to repos, collections, and records (architecture)
- [ATPix Lexicon artifacts](../lexicon/net.atpix.gallery.md)
- [atproto.com reference dump](../references/atproto.comdocs.md)
- [Blacksky AT Protocol tutorial PDFs](../references/blacksky_tutorial/)
- [happyview.dev reference dump](../references/happyview.dev.docs.md)
- [AGENTS.md](../../AGENTS.md) — project principles and standards

## Value Propositions

ATPix eliminates the traditional photo-app tradeoff between ease of use and data ownership. HappyView removes months of App View infrastructure work; users get gallery UX with protocol-native portability. Users can also share photos with the general public or with a select group of authorized users.

## Key Constraints

- v1 is **public-by-default** for gallery and album metadata; **permissioned albums** use [HappyView Permissioned Spaces](https://happyview.dev/experimental/spaces) (ATP-0016) for membership-gated photo storage — **no client-side encryption** in v1
- HappyView blob upload limit **50MB** per image
- Requires users to have (or create) a PDS-backed atproto account; default hosted path uses `*.pds.atpix.net` (no per-user apex DNS in v1)
- Lexicon authority requires DNS `_lexicon` setup for network publication

## Key Resources & Partnerships

- Bluesky/HappyView ecosystem (Jetstream, relay, PDS)
- Project observability stack in repo `docker-compose.yml`
- Domain for `net.atpix.gallery` NSID authority: **atpix.net** (`_lexicon.gallery.atpix.net`)