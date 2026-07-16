# HappyView Implementation of ATP-0016 (Permissioned Data)

**Purpose:** Compare HappyView’s experimental Permissioned Spaces product surface to [AT Protocol Proposal 0016 — Permissioned Data](./at-protocol-0016-permissioned-data-proposal.md). Use this when deciding what is “spec-shaped,” what is HappyView dialect, and what ATPix should treat as normative for v1.

**Status:** Snapshot of HappyView docs (instance snapshot in [happyview.dev.docs.md](./happyview.dev.docs.md)) against proposal 0016 as checked into this repo. Both sides are **experimental** and will change. Prefer live HappyView docs + the proposal PR for final wire details.

**Related project docs:** [ADR-010](../architecture/010-permissioned-spaces-storage.md), [at-protocol-v2.md](../../.agents/kb/at-protocol-v2.md), [PRD F-008](../overview/002-prd.md#f-008-permissioned-gallery--album-access-happyview-permissioned-spaces-validation).

---

## Executive summary

HappyView implements a **working, experimental App View–centric** slice of Permissioned Data:

- It has **aligned namespaces** (`com.atproto.space.*` / `com.atproto.simplespace.*`), **credential issuance**, **membership**, **LtHash + deniable commit state**, **oplog sync helpers**, **write notifications**, and **gated blob reads**.
- It deliberately **deviates** from the pure proposal in **URI scheme** (`ats://` vs `at://…/space/…`), **hosting topology** (App View–hosted space state vs pure per-user PDS permissioned repos as the only store), **member auth path** (DPoP + `X-Client-Key` for members), **app identity** (client key / allow-list vs client-attestation JWT), **config field names** (`mintPolicy` vs `policy`), and **extensions** (invites, `getRepoState`, feature flag, space-as-member delegation).

**Rule of thumb for ATPix:** product requirements and code follow **HappyView dialect**. Proposal text is the conceptual target and migration horizon—not a checklist to “fix” HappyView against without an ADR.

---

## Sources

| Document | Role |
|----------|------|
| [at-protocol-0016-permissioned-data-proposal.md](./at-protocol-0016-permissioned-data-proposal.md) | Upstream proposal (non-final) |
| [happyview.dev.docs.md](./happyview.dev.docs.md) | HappyView docs dump (spaces, credentials, changelog, API) |
| [blacksky_tutorial/](./blacksky_tutorial/) | Tutorial walkthrough of the same proposal concepts |

---

## Part A — Proposal elements HappyView has **enabled**

These map closely to proposal 0016 intent and are present in HappyView’s experimental Spaces API (behind `feature.spaces_enabled` / `FEATURE_SPACES_ENABLED`).

### A1. Core model (conceptual)

| Proposal concept | HappyView support |
|------------------|-------------------|
| **Access control, not confidentiality / E2EE** | Membership + credentials gate access; services that handle data can read it |
| **Space** as authorization / sync boundary | Space identity: authority DID + type NSID + skey |
| **Permissioned records** separate from public broadcast | Records addressed with space identity; stored outside public `at://` repo index path |
| **Per-user repo state** within a space | Per-user LtHash state + signed commit tracking (`happyview_space_repo_state`) |
| **Record authority remains the author DID** | Writes attribute author from authenticated user |
| **No permissioned firehose / relay** | App View pulls / serves space data; public Jetstream is for public records only |
| **Simplespace-style management** | Create/update/delete space, members, config under `com.atproto.simplespace.*` |

### A2. Cryptography & sync primitives

| Proposal element | HappyView |
|------------------|-----------|
| **LtHash** set-hash (2048-byte state, 1024 LE uint16 lanes, BLAKE3 XOF) | Implemented for per-user repo state |
| **Deniable commit signatures** (sign context + IKM, MAC binds hash) | Documented: user signs context (space + rev + IKM), not content hash |
| **Operation log** for incremental sync | `com.atproto.space.listRepoOps` + `happyview_space_record_oplog` |
| **Writer / repo enumeration** | `com.atproto.space.listRepos` |
| **Write notifications** | `registerNotify`, `notifyWrite`, `notifySpaceDeleted` |
| **Gated blob fetch** | `com.atproto.space.getBlob` |

### A3. Credentials & auth modes

| Proposal element | HappyView |
|------------------|-----------|
| **Two-step credential flow** | `getDelegationToken` → `getSpaceCredential` |
| **Delegation JWT** | `typ: atproto-space-delegation+jwt`, ES256K, ~60s TTL |
| **Space credential JWT** | `typ: atproto-space-credential+jwt`, multi-use Bearer, ~2h TTL (aligned after earlier 4h) |
| **Bearer credential on space routes** | `Authorization: Bearer <jwt>`; no DPoP/client key required when using credential |
| **Credential claims** | `iss` (space authority DID), `sub` (space URI), `iat`/`exp`/`jti` |
| **Verify via `#atproto_space` key** | HappyView resolves issuer DID doc and checks space signing key |
| **Cross-instance verification** | Can verify credentials issued by other HappyView / space-aware services for the same space |

### A4. XRPC surface (protocol-shaped)

HappyView documents protocol-level methods including (non-exhaustive):

| Method | Role |
|--------|------|
| `com.atproto.space.getSpace` | Describe space |
| `com.atproto.space.getDelegationToken` | Mint delegation token |
| `com.atproto.space.getSpaceCredential` | Exchange for space credential |
| `com.atproto.space.listRepos` | Repos / authors in space |
| `com.atproto.space.getRecord` / `listRecords` | Read |
| `com.atproto.space.createRecord` / `putRecord` / `deleteRecord` / `applyWrites` | Write (member OAuth path) |
| `com.atproto.space.getBlob` | Gated blobs |
| `com.atproto.space.listRepoOps` | Oplog sync |
| `com.atproto.space.getRepoState` | Per-user LtHash + commit (see deviations) |
| `com.atproto.space.registerNotify` / `notifyWrite` / `notifySpaceDeleted` | Notifications |
| `com.atproto.space.listSpaces` | Spaces the caller participates in |
| `com.atproto.simplespace.createSpace` / `updateSpace` / `deleteSpace` | Lifecycle |
| `com.atproto.simplespace.addMember` / `removeMember` / `listMembers` | Membership |
| `com.atproto.simplespace.getConfig` / `updateConfig` | Config |

### A5. Simplespace-style policies

| Proposal | HappyView |
|----------|-----------|
| User gate: member-list / public / managing-app | **`mintPolicy`**: `member-list`, `public`, `managing-app` |
| App gate: open / allow-list | **`appAccess`**: `open` or `allowList` with `allowed` client metadata URLs |
| Managing app | Supported in config model |
| Access levels including own-repo-only read | Membership `read`, **`read_self`**, `write` (write implies read) |

### A6. Operational / product enablers (beyond pure protocol text)

| Capability | Notes |
|------------|-------|
| **Feature flag** | `feature.spaces_enabled` / `FEATURE_SPACES_ENABLED`; disabled → `404 FeatureDisabled` |
| **Invite flow** | `dev.happyview.space.*` invite create/accept/list/revoke (extension; see Part C) |
| **Optimistic concurrency** | `swapRecord` / `swapCommit` on writes |
| **Admin dashboard** | Spaces permissions, experiments page |
| **Lua / scripting context** | Space metadata available to scripts |
| **Namespace migration path** | `dev.happyview.space.*` aliases until v3; protocol names preferred |

---

## Part B — Places HappyView **deviates** from the proposal

Deviations are grouped by impact. “Proposal” column cites [at-protocol-0016-permissioned-data-proposal.md](./at-protocol-0016-permissioned-data-proposal.md).

### B1. Addressing & URI scheme (**major**)

| | Proposal | HappyView |
|--|----------|-----------|
| Scheme | Reuses **`at://`** with fixed path marker `space` | Dedicated **`ats://`** scheme |
| Space URI | `at://{spaceDid}/space/{spaceType}/{skey}` | `ats://{spaceDid}/{spaceType}/{skey}` |
| Record URI | `at://{spaceDid}/space/{type}/{skey}/{authorDid}/{collection}/{rkey}` | `ats://{spaceDid}/{type}/{skey}/{authorDid}/{collection}/{rkey}` |
| Disambiguation | Literal `space` (no dots) vs NSID collections | Scheme separation (`ats` vs `at`) |

**Implication:** Parsers, strong references, and cross-implementation tools must treat HappyView URIs as dialect unless both sides normalize.

### B2. Hosting topology & “where records live” (**major**)

| | Proposal | HappyView |
|--|----------|-----------|
| Permissioned repo location | One permissioned repo per **(user, space)** on the user’s **repo host** (typically their **PDS**) | Space record store + per-user **repo state** tracked in **HappyView** (SQLite/Postgres tables: records, `happyview_space_repo_state`, oplog, notify regs) |
| Space host vs repo host | Distinct roles; may be filled by PDS or other services; space host does **not** colocate all members’ record data | HappyView **App View** is the primary space endpoint for apps (credentials, membership, record CRUD, sync APIs) |
| Blob bytes | On authoring repo host; fetch with credential | **Aligned in product practice:** blob upload via normal PDS `uploadBlob`; gated read via `com.atproto.space.getBlob` (ATPix model) |

**Implication:** The proposal’s “crawl each member’s PDS permissioned repo” architecture is not what app developers talk to day-to-day on HappyView; they talk to HappyView’s space XRPC surface. Per-user cryptographic **state** is still tracked (LtHash/commits), which is proposal-shaped even if the network topology is App View–centric.

### B3. Authentication paths for members (**major**)

| | Proposal | HappyView |
|--|----------|-----------|
| Primary member reads of others’ data | OAuth **`space:`** grant with `read` → delegation token → **space credential** → present credential to **repo hosts** | **Direct member auth:** DPoP access token + **`X-Client-Key`** on `com.atproto.space.*` (no credential required for members) |
| Cross-service / non-session readers | Space credential Bearer | Same idea: Bearer space credential, no DPoP/client key |
| Writes | OAuth only (user attribution) | Member DPoP session + client key; write requires `write` membership |
| App identity for allow-list | **Client attestation JWT** (`atproto-client-attestation+jwt`) verified via client metadata JWKS | **API client key** (`X-Client-Key`); allow-list checks **client metadata URL** associated with the registered HappyView API client / DPoP client |

**Implication:** HappyView optimizes the common “member using the gallery app” path. The proposal’s pure credential-everywhere model is still used for **cross-service** access, not as the only member path.

### B4. OAuth `space:` scopes (**major / partial**)

| | Proposal | HappyView (as documented for spaces) |
|--|----------|--------------------------------------|
| Consent unit | `space:<spaceType>?authority=…&action=…&manage=…` | App OAuth scopes are still primarily **repo/collection**-style for public data; space access is enforced via **membership + client key / credentials** rather than a fully documented `space:` grammar on consent screens |
| `read` vs `read_self` as OAuth actions | Scope actions gate `getDelegationToken` vs own-repo only | **`read_self` is a membership access level**, not only an OAuth action |

**Implication:** Do not assume proposal `space:` scope strings are required for HappyView member UX until HappyView explicitly documents full `space:` OAuth parity.

### B5. Config field naming & shapes (**moderate**)

| | Proposal | HappyView |
|--|----------|-----------|
| User authorization policy field | `policy` | **`mintPolicy`** (same value set: `member-list` \| `public` \| `managing-app`) |
| Semantic nuance of policy | Who may be **issued a credential** / authorized as user | Documented as who may **create permissioned repos** / mint policy for the space |
| App access encoding | Open union `#open` / `#allowList` | JSON object: `{"type":"open"}` or `{"type":"allowList","allowed":[…]}` |
| Extra config | Open-union host config on `getSpace` | Explicit **`config`**: `membershipPublic`, `recordsPublic`, plus extras |
| Config update methods | `updateSpace` for config | **`updateSpace`** (metadata) **and** **`updateConfig`** (mint/app access) |

### B6. Credential cryptography details (**moderate**)

| | Proposal | HappyView |
|--|----------|-----------|
| Space credential signing key | Authority’s `#atproto_space` (fallback `#atproto`) on DID document | Per-space **P-256 keypair generated on first credential request**, stored encrypted (AES-256-GCM); verification still described against `#atproto_space` resolution |
| Credential algorithm | ES256K or ES256 | Documented **ES256** for space credentials; **ES256K** for delegation tokens |
| `getSpaceCredential` input | Delegation token (+ optional client attestation) | Body field historically named **`grant`** (delegation token JWT); requires DPoP + client key on the exchange request in examples |
| Credential TTL history | Default 2 hours | Was 4 hours in v2.6; later reduced to **2 hours** (0016 alignment) |

### B7. Sync / CAR / method inventory (**moderate**)

| | Proposal | HappyView |
|--|----------|-----------|
| Full-state CAR export | `com.atproto.space.getRepo` with two-root CAR (signed commit + index + records) | **`getRepoState`** returns per-user LtHash state + signed commit; full proposal **CAR `getRepo` stream** not emphasized as the primary app API |
| `getLatestCommit` | Explicit method | Covered via repo state / revision tracking rather than 1:1 method marketing |
| Oplog durability story | Transport optimization; may compact; reset on migration | Local DB oplog tables; App View owns lifecycle |
| Space deletion | Flag member repos on repo hosts; syncers delete copies | Documented **cascade delete** of space-associated data (records, members, repo state, oplog, notifications, credentials) on HappyView |

### B8. Authority identity (**minor–moderate**)

| | Proposal | HappyView |
|--|----------|-----------|
| Authority DID | Root of space; may be user DID or dedicated DID | **`authority_did`** + separate **`creator_did`**; spaces have own **`did`** field (may equal creator for personal spaces) |
| DID doc service entries | `#atproto_space`, `#atproto_space_host` with PDS fallbacks | Used for **credential verification** / external verification; hosting is still HappyView-centric for apps |

### B9. Membership model extras (**moderate**)

| | Proposal | HappyView |
|--|----------|-----------|
| Member list | Protocol does **not** carry member list; simplespace does above protocol | First-class membership with `read` / `read_self` / `write` |
| Invites | Not in core proposal (app-level) | **First-class invite APIs** under `dev.happyview.space.*` |
| Space-as-member / delegation | Not in core proposal table | **Adding a space as a member** transitively grants access to its members (HappyView extension) |

### B10. Product packaging (**minor**)

| | Proposal | HappyView |
|--|----------|-----------|
| Maturity | Proposal only | **Experimental** product feature + changeloged releases (e.g. “Permissioned Data Release”) |
| Default off | N/A | Feature flag required; endpoints error when disabled |
| Compatibility goal | Interop across implementations | Explicit intent to stay compatible with peers (e.g. Contrail) **as things evolve** |

---

## Part C — HappyView **extensions** (not in proposal, or out-of-band)

These are valuable product features; they are not “wrong,” but they are not pure 0016.

| Extension | Description |
|-----------|-------------|
| **`ats://` URI scheme** | Dedicated scheme for all space addressing |
| **Invite system** | Create / accept / list / revoke invites with access level on accept |
| **`X-Client-Key` / API clients** | App registration identity for allow-list and rate/control plane |
| **Direct DPoP member session** | Skip credential mint for interactive members |
| **`getRepoState`** | Convenience endpoint for LtHash + commit bundle |
| **`membershipPublic` / `recordsPublic`** | Config flags for unauthenticated visibility of members/records |
| **Space-as-member delegation** | Nested space membership |
| **Optimistic concurrency** | `swapRecord` / `swapCommit` |
| **Legacy aliases** | `dev.happyview.space.*` until v3 |
| **Feature flag & admin UX** | Enable/disable spaces, dashboard management |
| **Cascade delete on space deletion** | Stronger cleanup than proposal’s “flag repo for export” guidance on repo hosts |
| **App View integration** | Spaces co-exist with Jetstream index, Lua handlers, OAuth proxy for public writes |

---

## Part D — Side-by-side cheat sheet

| Topic | Proposal 0016 | HappyView experimental Spaces |
|-------|---------------|-------------------------------|
| URI | `at://…/space/…` | `ats://…` |
| Record store | Per-user permissioned repos on repo hosts | HappyView space store + per-user crypto state |
| Member read path | Credential (after OAuth `space:read`) | DPoP + client key **or** credential |
| Cross-service read | Space credential Bearer | Space credential Bearer |
| App allow-list proof | Client attestation JWT | Client key + metadata URL allow-list |
| Policy field | `policy` | `mintPolicy` |
| App access field | `#open` / `#allowList` | `{type, allowed?}` JSON |
| Own-only reads | OAuth `read_self` | Membership `read_self` |
| Full repo CAR | `getRepo` | `getRepoState` / local state (CAR not primary) |
| Invites | App-defined | Built-in HappyView APIs |
| Feature gate | N/A | `feature.spaces_enabled` |
| E2EE | Out of scope | Out of scope |

---

## Part E — Guidance for ATPix agents & implementers

1. **Implement against HappyView docs + ADR-010**, not by “fixing” URIs to `at://…/space/…`.
2. Use **proposal 0016** to understand *why* LtHash, deniable commits, credentials, and no firehose exist—and to evaluate future interop.
3. When writing tests or PRD language:
   - **`ats://`**, **`mintPolicy`**, **`appAccess: {type: allowList}`**, **DPoP member path**, **invite endpoints** are HappyView-normative.
4. When reading Blacksky tutorials or [at-protocol-v2.md](../../.agents/kb/at-protocol-v2.md), map proposal names → HappyView dialect using this file.
5. If HappyView later drops dialect in favor of pure 0016 wire formats, open a new ADR and cascade PRD/SRS/lexicons deliberately.

---

## Part F — Open / verify-at-runtime items

These are incompletely specified in the local HappyView dump relative to the proposal; confirm against a live HappyView version before depending on them:

| Item | Why it matters |
|------|----------------|
| Full **`space:` OAuth scope** grammar support on HappyView’s AS / consent UI | Affects multi-app consent and `getDelegationToken` authorization |
| Exact **client attestation JWT** support vs client-key-only allow-list | Interop with non-HappyView confidential clients |
| **`getRepo` CAR** export parity and streaming validation | Independent syncers / migration tooling |
| Whether permissioned record bytes are **proxied to user PDS** permissioned repos or **only** stored in HappyView | Portability and account migration |
| **`#atproto_space_host`** publication for pure PDS-hosted spaces outside HappyView | Multi-host proposal topology |
| Interop with **Contrail** / other experimental implementations | Cross-vendor space URIs and credentials |

---

## Changelog of this document

| Date (UTC) | Note |
|------------|------|
| 2026-07-15 | Initial comparison from proposal 0016 markdown + HappyView docs dump + ATPix ADR-010 dialect notes |
