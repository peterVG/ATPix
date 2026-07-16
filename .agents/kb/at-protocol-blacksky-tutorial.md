---
kb-title: AT Protocol Blacksky Tutorial — Identity, Data Model & Permissioned Data
source-reference: docs/references/blacksky_tutorial/
source-files:
  - docs/references/blacksky_tutorial/atproto-tutorial_ Lesson A1_ Identity & Data _.pdf
  - docs/references/blacksky_tutorial/atproto-tutorial_ Lesson B1_ Why Permissioned Data _.pdf
  - docs/references/blacksky_tutorial/atproto-tutorial_ Lesson B2_ Spaces _.pdf
  - docs/references/blacksky_tutorial/atproto-tutorial_ Lesson B3_ Access Control _.pdf
  - docs/references/blacksky_tutorial/atproto-tutorial_ Lesson B4_ Permissioned Repos _.pdf
  - docs/references/blacksky_tutorial/atproto-tutorial_ Lesson B5_ Sync _.pdf
  - docs/references/blacksky_tutorial/atproto-tutorial_ Lesson B6_ OAuth Scopes _.pdf
  - docs/references/blacksky_tutorial/atproto-tutorial_ Lesson B7_ simplespace & Operations _.pdf
last-updated: 2026-07-15T00:00:00Z
domain: AT Protocol, Identity, Permissioned Data, Architecture
status: Proposal-aware — B lessons synthesize Permissioned Data proposal 0016 (not final spec)
---

# AT Protocol Blacksky Tutorial

**Purpose:** Synthesized rules, data models, and workflows from the Blacksky AT Protocol tutorial (Lesson A1 foundations + Lessons B1–B7 Permissioned Data). For AI agent conceptual grounding when building identity, repo, or private/group data features. For verbatim tutorial text, load the PDFs under `docs/references/blacksky_tutorial/` via Progressive Disclosure. For general atproto overview, also see [at-protocol.md](./at-protocol.md).

**TL;DR:** Public atproto is a **self-authenticating, open-broadcast** stack (DID → handle, Lexicon records, MST repos, firehose). Permissioned Data (proposal) adds **spaces**: per-(user, space) repos with **access control (not E2EE)**, **LtHash commits**, **deniable signatures**, **space credentials**, pull-only sync (no relay), and OAuth `space:` scopes. Authority for a space is a DID; records still author under the user DID.

---

## Part A — Identity & Public Data Foundations

### A1. Blessed DID methods

| Method | Role | Constraints |
|--------|------|-------------|
| `did:plc` | Primary Bluesky-era method | Novel method developed by Bluesky |
| `did:web` | HTTPS/DNS alternative | Hostname-level only (no path DIDs); no migration/recovery if domain lost; same TLD restrictions as handles; `localhost` (+ optional port) only for dev/test |

(Source: Lesson A1, DIDs)

**Implementation rules:**

- Support only a small blessed subset; do **not** aim for all DID methods.
- Distinguish errors: invalid syntax vs unsupported method vs supported-but-resolution-failed.
- DIDs are case-sensitive; reject invalid casing. Case-normalize only user-controlled input (URL paths, text fields).
- Syntax: ASCII `A-Z a-z 0-9 . _ : % -`; starts with lowercase `did:`; method = lowercase letters; no query/fragment; hard length limit 2048 (best practice &lt; 64).

```
/^did:[a-z]+:[a-zA-Z0-9._:%-]*[a-zA-Z0-9._-]$/
```

Valid examples: `did:plc:z72i7hdynmk6r22z27h6tvur`, `did:web:blueskyweb.xyz`.

### A1. DID document extraction

From a resolved DID document, extract three things:

| Extract | Where | Rules |
|---------|-------|-------|
| **Handle** | `alsoKnownAs` | URIs with scheme `at://` + handle, no path. Primary = first valid handle URI. |
| **Signing key** | `verificationMethod` | `id` ends `#atproto`, `controller` = DID, `type` = `Multikey`, `publicKeyMultibase`. First valid used. No key → account broken. |
| **PDS** | `service` | `id` ends `#atproto_pds`, type `AtprotoPersonalDataServer`, `serviceEndpoint` = HTTPS scheme+host+optional port only. No PDS → broken (temporary unreachability during migration ≠ invalid). |

(Source: Lesson A1, DID documents)

**Critical constraint:** DID document alone does **not** prove the handle. **Always verify bidirectionally** (handle → DID and DID → handle). Account without valid handle may still participate; UI must show no handle or clearly mark invalid. `handle.invalid` in API responses means no bi-directionally valid handle.

### A1. Handles

**Syntax (summary):** ASCII; ≤253 chars; ≥2 segments; each segment 1–63 of `[a-zA-Z0-9-]`, no leading/trailing hyphen; TLD must not start with digit; case-insensitive → normalize to lowercase.

**Reserved TLDs (must fail registration/resolution):** `.alt`, `.arpa`, `.example`, `.internal`, `.invalid`, `.local`, `.localhost`, `.onion`. `.test` only in development.

**Resolution methods:**

1. **DNS TXT (preferred for individuals):** name `_atproto.<handle>`, value `did=<full-DID>`. Ignore non-`did=` values. Multiple conflicting DIDs → fail. DNSSEC not required. Practical handle length ≤244 (prefix can hit 253 DNS limit).
2. **HTTPS well-known:** `GET https://<handle>/.well-known/atproto-did` → 2xx, `text/plain`, body = DID only. HTTPS:443 required in production; redirects allowed reasonably; strip surrounding whitespace.

**Conflict rule:** Prefer DNS TXT over HTTPS when concurrent results disagree; or mark ambiguous and retry. Cache beyond DNS TTLs; re-resolve periodically.

**UI rules:** `@` prefix is display-only, not handle syntax. Never truncate to local part (`@jay` is wrong for `@jay.bsky.social`).

(Source: Lesson A1, Handles)

### A1. NSIDs

Structure: reverse-DNS domain authority + final name segment (e.g. `com.example.fooBar`).

| Part | Case | Rules |
|------|------|-------|
| Domain authority | Insensitive; normalize lowercase | Handle-like reversed hostname; ≥2 segments; TLD not digit-leading |
| Name | **Sensitive; do not normalize** | 1–63 letters/digits only, no hyphens, not digit-leading |

Overall: ASCII, ≥3 segments, ≤317 chars. Globs: single trailing `*` at segment boundary only (`com.atproto.*`). Subdomain segments require control of that full domain (e.g. `sync` in `com.atproto.sync.getHead` needs `sync.atproto.com`).

(Source: Lesson A1, NSIDs)

### A1. TIDs & record keys

**TID layout (64-bit):** top bit 0; 53 bits microseconds since UNIX epoch; 10-bit clock id. Encoded as 13-char base32-sortable (`234567abcdefghijklmnopqrstuvwxyz`). Zero TID = `2222222222222`. First char restricted to `234567abcdefghij`.

**Constraints:**

- Not globally unique; hostile controllers can reuse TIDs.
- Do not trust TID as creation timestamp.
- Generators: random clock id; ensure monotonicity within generator; never repeat.

**Record key types (Lexicon `key`):** `tid` | `nsid` | `literal:<value>` (often `literal:self`) | `any`.

**Record key syntax:** ASCII alnum + `.-_:~`; 1–512 chars; not `.` or `..`; case-sensitive (lowercase recommended); best practice path &lt;80 chars.

**Uniqueness:** `(did, collection, rkey)` is unique; `(did, rkey)` is **not**.

(Source: Lesson A1, TIDs & Record Keys)

### A1. AT URIs

```
at:// AUTHORITY [ / COLLECTION [ / RKEY ] ]
AUTHORITY = HANDLE | DID
COLLECTION = NSID
RKEY = RECORD-KEY
```

- Authority is **identity**, not network location (handle host often ≠ PDS).
- Prefer DID authority for durable references; handle for display.
- **Strong reference** = DID-based AT URI **plus** CID. URI alone is not content-addressed; CID alone has no location.

(Source: Lesson A1, AT URIs)

### A1. Data model (JSON / DAG-CBOR)

| Rule | Detail |
|------|--------|
| Auth form | **DAG-CBOR** is authoritative for sign/hash; JSON is not byte-deterministic |
| Sign | Encode DAG-CBOR → SHA-256 → sign hash |
| Floats | **Forbidden** in atproto data model |
| Integers | 64-bit signed; prefer ≤53-bit for JS |
| null vs missing vs false-y | Three distinct semantics |
| Reserved `$` fields | `$bytes`, `$link`, `$type`; ignore unknown `$` fields; apps must not invent new ones |
| Link (JSON) | `{ "$link": "<cid-string>" }` |
| Bytes (JSON) | `{ "$bytes": "<base64>" }` (RFC-4648; not URL-safe; padding optional) |
| Blob | `$type: "blob"`, `ref` (raw CID link), `mimeType`, `size` &gt; 0. Never write deprecated legacy blob format. |

**Blessed CIDs:** CIDv1; multibase binary in DAG-CBOR / base32 in strings; multicodec `dag-cbor` (0x71) for objects, `raw` (0x55) for blobs; multihash sha-256 preferred.

(Source: Lesson A1, Data Model)

### A1. Lexicon constraints

- File: `lexicon: 1`, `id` (NSID), `defs` (non-empty). At most one primary def, named `main`.
- Primary types: `query` | `procedure` | `subscription` | `record`.
- `$type` required on records, union variants (except top-level subscription messages), and blobs. Reference main as bare NSID, never `#main` in data `$type`.
- Evolution: new fields optional only; no remove of required; no type change; no rename; break → new NSID. Unexpected fields must be ignored; invalid data is wholly invalid (no partial repair).
- Publication: `com.atproto.lexicon.schema` records; key = NSID. Resolve via `_lexicon.<authority-domain>` DNS TXT `did=…` — **non-hierarchical** (never walk up/down DNS). Authority group = NSIDs differing only in final name segment.

(Source: Lesson A1, Lexicon)

### A1. Public repositories & MST

- Paths: `<collection>/<rkey>` (exactly two segments, no leading slash).
- Commit (v3): `did`, `version: 3`, `data` (MST root CID), `rev` (TID, monotonic), `prev` (field present, almost always null), `sig`.
- Sign: UnsignedCommit (all but `sig`) → DAG-CBOR → SHA-256 → sign with `#atproto` key. After key rotation, create new commit so latest verifies against current DID doc.
- MST: deterministic shape from current key/value set; depth = leading zero pairs of SHA-256(key) (2-bit chunks, fanout 4); prefix-compressed keys within node; verify depth/sort; bound node size against adversarial key mining.
- Export: CAR v1 (`.car`, `application/vnd.ipld.car`); first root = commit CID; full export includes all MST nodes + records; blobs may dangle.

(Source: Lesson A1, Repositories & the MST)

---

## Part B — Permissioned Data (Proposal 0016)

> **Status:** Proposal, not final specification. Details, terminology, and behavior may change. (Source: Lesson B1)

### B1. Core promise and non-promise

| Provides | Does **not** provide |
|----------|----------------------|
| **Access control** (who may obtain data) | **Confidentiality** / E2EE |
| Space credentials gate reads | Records are plaintext on PDSes & authorized apps |
| Server-side search, index, notify, moderate | Hide content from authorized infrastructure |

E2EE may be layered by applications; out of scope for the proposal.

**Modalities (all one protocol):** personal data; gated content; socially shared; groups. **Not** world-readable public posts — those stay on public broadcast.

(Source: Lesson B1)

### B1. Public vs permissioned comparison

| Aspect | Public broadcast | Permissioned data |
|--------|------------------|-------------------|
| Unit | Record in a repo | Record in a permissioned repo |
| Repo scope | One repo per user | One permissioned repo per **(user, space)** |
| Record authority | User DID | User DID |
| URI authority | User DID | **Space authority DID** |
| Commit | MST root | **LtHash set-hash** digest |
| Signature | Rebroadcastable, archival | **Deniable on rebroadcast** |
| Addressing | Traditional `at://` | `at://` with fixed `space` segment |
| Access | Public | Gated by **space credential** |
| Sync collator | Relay / firehose | **None** — apps pull per repo host |

(Source: Lesson B1)

### B1. Vocabulary (must be exact)

| Term | Meaning |
|------|---------|
| **Space** | Authorization + sync boundary; identified by `(authority, type, skey)` |
| **Permissioned repo** | One user's records in one space; commit + host on user's infra |
| **Repo host** | Stores/serves users' permissioned repos |
| **Space host** | Answers for space: credentials, writer enumeration, notification routing |
| **Space authority** | DID root of space → host endpoint + credential keys |
| **Space credential** | Token from authority granting space read access |
| **Delegation token** | PDS-minted token app exchanges for space credential |
| **Client attestation** | App-signed JWT proving app identity (when space requires it) |
| **Syncer** | App that pulls and maintains a local copy of a space |

PDS commonly fills both repo host and space host roles; any service implementing the APIs may host either.

(Source: Lesson B1, Terminology)

### B2. Space identity & URIs

**Identity triple:**

1. **Authority** — DID  
2. **Type** — NSID (modality; OAuth consent boundary)  
3. **skey** — string (rkey-like syntax, ≤512 bytes; unique only among same type under same authority)

**URIs:**

```
Space:  at://{spaceDid}/space/{spaceType}/{skey}
Record: at://{spaceDid}/space/{spaceType}/{skey}/{authorDid}/{collection}/{rkey}
```

- Two DIDs: `spaceDid` = URI authority; `authorDid` = record author.
- Disambiguation from public URIs: first path segment is literal `space` (zero dots) vs collection NSID (≥2 dots).
- Hosts never appear in URIs; resolve from DID documents.

**Authority DID document:**

| Entry | Kind | Fallback if absent |
|-------|------|--------------------|
| `#atproto_space` | Verification method (credential verify key) | `#atproto` |
| `#atproto_space_host` | Service endpoint | `#atproto_pds` |

Missing dedicated entries is OK; reading still requires credential signed by declared key.

**Space type Lexicon:** main def `"type": "space"`. Required: `type`, `key`, `name` (1–64, consent screen), `collections`. Optional: `description` (dev-only, not user consent), `name:lang`.  
`collections` = default OAuth collection set + client expectation; **not** a protocol write constraint (any collection may be written).

(Source: Lesson B2)

### B3. Access control — three JWTs

**Issuance axes:** (1) which user — **delegation token** (always required); (2) which app — **client attestation** (only if space gates on app identity). Protocol does **not** define membership policy (simplespace does).

#### Delegation token

| Property | Value |
|----------|-------|
| Minted by | User's PDS via `com.atproto.space.getDelegationToken` |
| typ | `atproto-space-delegation+jwt` |
| Signed by | Account `#atproto` key (`kid` MUST be `#atproto`) |
| iss | User DID |
| sub | Space URI |
| aud | Space host service fragment (`…#atproto_space_host`) |
| Lifetime | Default 60s, **single-use**, `jti` nonce |
| Asserts | User→app delegation only |
| Does **not** assert | Space membership, app identity |

Prerequisite: OAuth **`space:`** scope with a **`read`** grant (not mere `read_self`).

#### Client attestation

| Property | Value |
|----------|-------|
| typ | `atproto-client-attestation+jwt` |
| Signed by | App client auth key (`kid` from published JWKS) |
| iss/sub | `client_id` URL (client-metadata.json) |
| aud | Space host fragment |
| Verify path | Resolve metadata → JWKS → key by `kid` |
| When required | e.g. simplespace `appAccess: #allowList` |

#### Space credential

| Property | Value |
|----------|-------|
| Minted by | Space authority via `com.atproto.space.getSpaceCredential` |
| typ | `atproto-space-credential+jwt` |
| Signed by | Authority `#atproto_space` or fallback `#atproto` |
| iss | Space authority DID |
| sub | Space URI |
| aud | **None** (multi-host reuse) |
| Lifetime | Default 2 hours, **multi-use** across repo hosts |
| Used for | All repo read/sync methods on every member host |

**Credential flow (order forced):**

1. User OAuth consent (`space:` scope with read grant)  
2. App → PDS: `getDelegationToken`  
3. App → space host: `getSpaceCredential` (+ attestation if needed)  
4. App → each repo host: read/sync with space credential  

One app serving many users of a space may hold **one** credential from any live user session; lose all OAuth sessions for the space → cannot renew → access expires with credential.

(Source: Lesson B3)

### B4. Permissioned repos, LtHash, deniable commits

**Placement:** Write lands in **author's** permissioned repo on **author's** repo host. Space host/authority do **not** store record data.

**LtHash state:**

- Fixed **2048-byte** buffer = **1024 little-endian uint16** lanes (empty = all zero).
- Element: UTF-8 `{collection}/{rkey}/{record_cid}` (update = remove old + add new).
- Add: BLAKE3-XOF expand element → 2048 bytes → add lanes mod 65536. Remove: subtract.
- Commit field `hash` = **sha256(state)** (32 bytes only on the wire). Order-independent set hash; quantum-secure lattice construction.

**Deniable signature (not content encryption):**

```
ctx = "atproto-space-v1"
    || uint16be(len(space)) || space URI
    || uint16be(len(author)) || author DID
    || uint16be(len(rev)) || rev TID
    || uint16be(len(ikm)) || ikm   // big-endian length prefixes (TLS)

sig = sign(ctx)                     // does NOT sign repository hash
mac = HMAC-SHA256(HKDF-SHA256(ikm, ctx), hash)
```

- Fresh **32-byte `ikm` per reader** served.
- **sig** → authenticity of (space, author, rev, ikm); **mac** → integrity for legitimate readers.
- Leaked commit: anyone can recompute mac for arbitrary hash (ikm public) → **content-deniable**; still attributable context only.
- Byte-order trap: ctx prefixes **big-endian**; LtHash lanes **little-endian**.

**signedCommit** (`com.atproto.space.defs#signedCommit`): `ver` (1), `hash`, `ikm`, `sig`, `mac`, `rev`.

**CAR export (`getRepo`):** roots order = (1) signed commit, (2) DRISL index map `"{collection}/{rkey}" → CID` (lex order), then record blocks same order. No MST nodes; blobs excluded.

**Stream validation:**

1. Verify sig + mac → trust `hash`  
2. Fold index into running LtHash; match `sha256(state)` to `hash` (authenticates index without record bytes)  
3. Verify each record block against its CID  

(Source: Lesson B4)

### B5. Sync model

**No relay / no firehose of permissioned commits.** Syncer pulls each member repo host. Correctness = **local running set hash equals host commit hash**, not "received every event."

**Incremental:** `com.atproto.space.listRepoOps` with `since` rev.

Oplog entry: `{ rev, collection, rkey, cid, prev }`

- `cid` null = delete; `prev` null = create; both set = update.
- Shared `rev` = atomic batch.
- Default: inline **current** values only (stale intermediates omitted); `excludeValues` for metadata-only.
- Response including last available op **must** include current signed commit; digest mismatch → **syncer's** copy wrong → recovery (not reject commit).
- Oplog is **transport optimization**: may compact/drop; reset on migration; no durability guarantee. Missing `since` → full-state recovery.

**Full recovery:** `getRepo` CAR + stream validation; optional diff to keep missing records only.

**Light heal:** `getLatestCommit` + `listRecords` (`excludeValues`) + local diff + targeted `getRecord`.

**Blobs:** authoring host only; `getBlob` + space credential. Never in oplog or CAR.

**Write notifications:** doorbell only (repo advanced to rev) — **no data**. `registerNotify` on space host (whole space) or repo host (one repo). Space authority auto-registers on first write to shared space (authority ≠ account DID) and fans out notifications; does not carry records. Best-effort; periodic `listRepos` sweep for eventual consistency.

**Writer set (`listRepos`):** accounts that have **written ≥1 record** (not allowed-writers, not readers). Authority claim — confirm each repo against its host.

(Source: Lesson B5)

### B6. OAuth `space:` scopes

**Grammar:**

```
space:<spaceType>[?authority=<did>][&skey=<skey>][&collection=<nsid>...][&action=<action>...][&manage=<verb>...]
```

| Param | Default | Notes |
|-------|---------|-------|
| spaceType | required (or `*`) | Consent boundary; NSID of modality |
| authority | **`self`** | Own DID; use DID or `*` for shared spaces |
| skey | `*` | |
| collection | declaration's `collections` | Empty default when `spaceType=*`; dynamic (tracks declaration over time) |
| action | `read,create,update,delete` | Explicit list replaces default |
| manage | **empty** | Admin of spaces themselves |

**Read verbs:**

| Grant | Own repo read/sync | `getDelegationToken` | Other members |
|-------|--------------------|----------------------|---------------|
| `read` | Yes | **Yes** | Yes (via space credential) |
| `read_self` | Yes (collection-constrained) | **No** | No |

`read` implies `read_self`. `read` ignores `collection` (all-or-nothing at space). Writes (`create`/`update`/`delete`) and `read_self` are collection-constrained.

**Auth asymmetry:**

- Read/sync methods: OAuth **or** space credential  
- Write methods: **OAuth only** (writes attributed to user)  
- `getDelegationToken`: OAuth only  

**manage:** create/update/delete spaces (not records); ignores collection; mapping implementation-defined (simplespace: `manage=update` → `updateSpace`, `addMember`, `removeMember`). `manage=create` typically with `skey=*`.

**Consent rendering:** space type → declaration `name`; concrete authority → bidirectional handle else DID; `self` no special presentation; double-wildcard (`authority` + `spaceType`) → **prominent warning**.

**Permission sets:** `resource: "space"`; `spaceType` **must not** be wildcard inside a set; collections may wildcard or cross namespace.

**Worked defaults:**

- Personal: `space:com.example.bookmarks` → own authority, declaration collections, full actions.  
- Forum client: `space:com.atmoboards.forum?authority=*`  
- Backup: `…&action=read_self&collection=*`  

(Source: Lesson B6)

### B7. API surface, simplespace, ops

All methods under `com.atproto.space` (plus `com.atproto.simplespace` management). Groups are **method kinds**, not separate services.

| Auth class | Methods (representative) |
|------------|--------------------------|
| OAuth only | `createRecord`, `putRecord`, `deleteRecord`, `applyWrites`, `getDelegationToken`, `listSpaces` |
| OAuth **or** space credential | `getRecord`, `listRecords`, `getBlob`, `getLatestCommit`, `getRepo`, `listRepoOps` |
| Space credential | `getSpace`, `listRepos`, `registerNotify` |
| Delegation token (+ optional attestation) | `getSpaceCredential` |
| Service auth | `notifyWrite`, `notifySpaceDeleted` |

#### simplespace (required on every PDS)

- Anchored on **user's own DID**; explicit member list or other policies.  
- Not exclusive/privileged — other space-management implementations allowed on bespoke hosts.  
- Admin methods use OAuth **manage** scopes.

| Method | Role |
|--------|------|
| `createSpace` / `updateSpace` / `deleteSpace` | Lifecycle |
| `addMember` / `removeMember` / `listMembers` | Membership |

**Config (credential mint = policy AND appAccess):**

| Field | Values | Notes |
|-------|--------|-------|
| policy | `member-list` (default), `public`, `managing-app` | Per-user auth |
| appAccess | `#open` (default), `#allowList` | Per-app; allowlist checks **attested client_id** |
| managingApp | DID + fragment | Route app requests; `checkUserAccess` when policy=`managing-app` |

`checkUserAccess` is served by **managingApp** (not PDS); authority calls with `iss`=authority, `aud`=managingApp service id.

#### Moderation

- Labelers are ordinary credentialed readers.  
- **Do not** publish public labels for permissioned records (metadata leak). Publish labels as records **inside** the space.  
- Levers: user delete own records; repo host takedown; app filter; authority **refuse credentials**.

#### Scaling

- No relay; lighter than MST sync; load scales with **apps** not end-users; credential-gated rate limits.

#### Space deletion

- Authority stops credentials, deletes own repo, notifies via `notifySpaceDeleted`.  
- **Syncer:** delete all copies + derived state.  
- **Repo host:** **flag** member repo; user data remains for export/grace before GC.

#### Account lifecycle

- Migration: enumerate all permissioned repos + blobs; oplog resets on new host.  
- Deactivation/deletion: same expectations as public for all associated data.  
- **Permissioned-only apps still need firehose** for `#account` / `#identity` events (key rotation, handle, status) — firehose does **not** carry permissioned commits.

(Source: Lesson B7)

---

## Agent Decision Checklist

When implementing ATPix or any atproto feature:

1. **Public vs private?** World-readable → public repo/MST/firehose. Access perimeter → space model (proposal).  
2. **Never treat permissioned data as E2EE.** Plan for PDS/app plaintext + optional app-layer crypto.  
3. **Identity:** bidirectional handle/DID; extract `#atproto` key + `#atproto_pds`; strong refs = AT-URI(DID) + CID.  
4. **Permissioned writes:** OAuth only, land on author's repo host, one repo per (user, space).  
5. **Permissioned reads of others:** OAuth `read` → delegation token → space credential → pull each host.  
6. **Sync correctness:** maintain running LtHash; compare to commit `hash`; oplog/notifications are optional optimizations.  
7. **Scopes:** `authority=self` default traps shared-space apps; request `authority=*` or specific DID. Prefer `read_self` when other members must stay invisible.  
8. **Baseline management:** implement against `com.atproto.simplespace`; custom space types may use bespoke hosts.

---

## Progressive Disclosure

| Need | Load |
|------|------|
| Full tutorial lessons | `docs/references/blacksky_tutorial/*.pdf` |
| General atproto stack | [at-protocol.md](./at-protocol.md), `docs/references/atproto.comdocs.md` |
| Official permissioned proposal text | Track proposal 0016 / upstream atproto docs (terminology may drift) |
