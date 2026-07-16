# Architecture Decision Record - ATPix

**010-permissioned-spaces-storage.md**

## Title

Permissioned album storage via HappyView Spaces (ATP-0016)

## Status

Accepted

## Context / Requirement Reference

[docs/overview/002-prd.md](../overview/002-prd.md) F-008 (mandatory v1), TC-004, TC-008, and NFR-013 require HappyView Permissioned Spaces for select-user album sharing without client-side encryption. [docs/overview/003-srs.md](../overview/003-srs.md) SRS-F-008.

## Decision

- **Visibility model:** Album `visibility` enum: `public`, `unlisted`, `permissioned`.
- **Public/unlisted photos:** Stored in user's public PDS repo (`net.atpix.gallery.photo`, `albumItem`).
- **Permissioned photos:** Stored in space repo via `com.atproto.space.putRecord` / `createRecord`; album metadata in public repo links `spaceUri`.
- **Space type:** `net.atpix.gallery.albumSpace` created via `com.atproto.simplespace.createSpace` with `mintPolicy: member-list`, `appAccess: {"type": "allowList", "allowed": ["<ATPix OAuth clientId URL>"]}`, and `config: {"membershipPublic": false, "recordsPublic": false}`.
- **Blobs:** Bytes on author PDS via `uploadBlob`; gated reads via `com.atproto.space.getBlob`.
- **Access:** Direct members use DPoP + client key; cross-service reads use delegation token → space credential (Bearer). Invite flow uses `createInvite` / `acceptInvite`. Unauthorized users get access-denied without metadata leakage.
- **Index isolation:** Permissioned content excluded from public App View indexes.
- **Feature flag:** HappyView `feature.spaces_enabled` MUST be on for permissioned testing (TC-008).

## Rationale

ATP-0016 provides protocol-native membership gating without encrypted private repos (out of scope v1). ATPix serves as reference validation for HappyView experimental Spaces in a media application.

## Assumptions

Spaces API remains experimental; test reports document flag status per NFR-013. v1 does not implement client-side encryption (TC-004).

## Protocol proposal vs HappyView dialect (agents)

[at-protocol-v2.md](../../.agents/kb/at-protocol-v2.md) (Blacksky tutorial + public atproto) describes the **Permissioned Data proposal** model. HappyView’s experimental implementation is the **authority for ATPix code and requirements**. Known divergences (do not silently “fix” docs toward the proposal):

| Topic | Proposal / Blacksky (KB v2) | ATPix + HappyView (this ADR / PRD) |
|-------|----------------------------|-------------------------------------|
| Space / record URI scheme | `at://{spaceDid}/space/{type}/{skey}/…` (literal `space` path segment) | **`ats://{spaceDid}/{type}/{skey}/…`** (distinct scheme) |
| Where permissioned records live | Per-**(user, space)** permissioned repo on each **repo host** (usually user PDS); space is an aggregation | **HappyView space repo** as the write target for permissioned `photo` / `albumItem`; album container stays on user PDS with `spaceUri` |
| Commit / sync | LtHash + deniable commits; pull sync; no permissioned firehose | HappyView space APIs abstract storage/sync; ATPix does not implement LtHash clients |
| App gating field | Open union `#open` / `#allowList` | JSON **`appAccess: {"type":"allowList","allowed":[clientId URLs]}`** |
| User policy field | `policy` (`member-list`, `public`, `managing-app`) | **`mintPolicy`** (same value set in HappyView) |
| Member OAuth for space reads | `space:` scope + `read` → delegation → space credential | **Direct member:** DPoP + `X-Client-Key` on `com.atproto.space.*`; **cross-service:** `getDelegationToken` → `getSpaceCredential` Bearer |
| Access control promise | Access control **not** confidentiality / E2EE | Same: membership gating only (TC-004, NFR-002) |

**Aligned with the proposal:** blob bytes on author PDS; `com.atproto.space.getBlob` gating; simplespace management; credential exchange for non-member/service reads; no public index of permissioned content.

**Source of truth for wire formats:** [happyview.dev.docs.md](../references/happyview.dev.docs.md) (Permissioned Spaces) and [PRD F-008](../overview/002-prd.md#f-008-permissioned-gallery--album-access-happyview-permissioned-spaces-validation).

**Full proposal vs HappyView matrix:** [HappyView-0016-implementation.md](../references/HappyView-0016-implementation.md) (enabled 0016 features, deviations, extensions).

## Alternatives Considered

- **Client-side encryption:** Rejected; out of scope and contradicts TC-004.
- **Defer permissioned albums to v2:** Rejected; F-008 is mandatory v1 per PRD executive summary.
- **Implement pure proposal URI/storage (`at://…/space/…`, per-user permissioned PDS repos) without HappyView:** Rejected for v1; violates TC-001 (HappyView-only App View/spaces surface).

## Consequences / Implications

Dual storage paths complicate album UI and integration tests. Permissioned workflows require multi-account BDD scenarios. Public profile galleries (F-006) remain separate from permissioned collections. Agents and future migrations MUST treat HappyView dialect as normative until a new ADR migrates toward final ATP-0016 wire formats.

## Related Decisions / Notes

[007-happyview-app-view-integration.md](./007-happyview-app-view-integration.md), [at-protocol-v2.md](../../.agents/kb/at-protocol-v2.md), [`permissioned_spaces_integration_SRS-F-008.feature`](../../apps/backend/tests/features/permissioned_spaces_integration_SRS-F-008.feature)