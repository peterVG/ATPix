# Architecture Decision Record - ATPix

**010-permissioned-spaces-storage.md**

## Title

Permissioned album storage via HappyView Spaces (ATP-0016)

## Status

Accepted

## Context / Requirement Reference

[docs/prd.md](../prd.md) F-008 (mandatory v1), TC-004, TC-008, and NFR-013 require HappyView Permissioned Spaces for select-user album sharing without client-side encryption. [docs/srs.md](../srs.md) SRS-F-008.

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

## Alternatives Considered

- **Client-side encryption:** Rejected; out of scope and contradicts TC-004.
- **Defer permissioned albums to v2:** Rejected; F-008 is mandatory v1 per PRD executive summary.

## Consequences / Implications

Dual storage paths complicate album UI and integration tests. Permissioned workflows require multi-account BDD scenarios. Public profile galleries (F-006) remain separate from permissioned collections.

## Related Decisions / Notes

[007-happyview-app-view-integration.md](./007-happyview-app-view-integration.md), [`permissioned_spaces_integration_SRS-F-008.feature`](../../apps/backend/tests/features/permissioned_spaces_integration_SRS-F-008.feature)