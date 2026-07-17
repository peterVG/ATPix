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

[at-protocol-v2.md](../../.agents/kb/at-protocol-v2.md) describes the Permissioned Data proposal. HappyView remains the App View/spaces runtime (TC-001). **URI scheme decision for ATPix:**

| Topic | ATPix normative choice | HappyView notes |
|-------|------------------------|-----------------|
| **Space / record URI scheme** | **Proposal form:** `at://{spaceDid}/space/{type}/{skey}/…` (literal `space` path segment) | HappyView **accepts both** proposal form and legacy `ats://{spaceDid}/{type}/{skey}/…`. ATPix **prefers / emits / normalizes to** proposal form. |
| Where permissioned records live | HappyView space APIs as write target for permissioned `photo` / `albumItem`; album container on user PDS with `spaceUri` | App View–centric store (not pure multi-PDS crawl topology) |
| Commit / sync | HappyView space APIs | LtHash/oplog internal to HappyView; ATPix does not implement LtHash clients |
| App gating field | JSON **`appAccess: {"type":"allowList","allowed":[clientId URLs]}`** | HappyView wire shape |
| User policy field | **`mintPolicy`** (`member-list`, `public`, `managing-app`) | HappyView name (proposal: `policy`) |
| Member OAuth for space reads | **Direct member:** DPoP + `X-Client-Key`; **cross-service:** credential flow | HappyView dual path |
| Access control promise | Membership gating only (not E2EE) | Same as proposal intent |

**Aligned with the proposal:** blob bytes on author PDS; `com.atproto.space.getBlob` gating; simplespace management; credential exchange for non-member/service reads; no public index of permissioned content; **space URI grammar with `/space/` marker**.

**Source of truth:** Proposal URI grammar in [at-protocol-0016-permissioned-data-proposal.md](../references/at-protocol-0016-permissioned-data-proposal.md); HappyView dual-accept in [HappyView-0016-implementation.md](../references/HappyView-0016-implementation.md); requirements in [PRD F-008](../overview/002-prd.md#f-008-permissioned-gallery--album-access-happyview-permissioned-spaces-validation).

## Alternatives Considered

- **Client-side encryption:** Rejected; out of scope and contradicts TC-004.
- **Defer permissioned albums to v2:** Rejected; F-008 is mandatory v1 per PRD executive summary.
- **Require `ats://` only (historical HappyView dialect):** Rejected; ATPix standardizes on proposal `at://…/space/…` now that HappyView accepts both.
- **Leave HappyView App View store:** Accepted for v1 (TC-001); URI form is independent of hosting topology.

## Consequences / Implications

Dual storage paths complicate album UI and integration tests. Permissioned workflows require multi-account BDD scenarios. Public profile galleries (F-006) remain separate from permissioned collections. Frontend helpers (`apps/frontend/src/space/spaceUri.js`) parse both URI forms and normalize dialect `ats://` to proposal form when safe.

## Related Decisions / Notes

[007-happyview-app-view-integration.md](./007-happyview-app-view-integration.md), [at-protocol-v2.md](../../.agents/kb/at-protocol-v2.md), [`permissioned_spaces_integration_SRS-F-008.feature`](../../apps/backend/tests/features/permissioned_spaces_integration_SRS-F-008.feature)