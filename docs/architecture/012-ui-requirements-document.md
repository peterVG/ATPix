# Architecture Decision Record - ATPix

**012-ui-requirements-document.md**

## Title

Separate UI Requirements Specification alongside SRS

## Status

Accepted

## Context / Requirement Reference

[docs/srs.md](../srs.md) defines technical behavior for F-001–F-016 and NFRs. [docs/references/000-UX-guide.md](../references/000-UX-guide.md) defines design tokens and component styling. Six v1 screen mockups ([docs/references/mockups/](../references/mockups/)) specify layouts for Gallery, Discovery, Photo Detail, Album, Upload, and Permissioned Space admin. [holistic-ui.md](../../.agents/rules/holistic-ui.md) requires holistic UI planning across tasks.

## Decision

- **`docs/ui-requirements.md`** is the canonical UI/UX requirements artifact (UI-SHELL-*, UI-SCR-*, UI-CMP-* IDs).
- **`docs/srs.md`** retains protocol, API, and behavioral MUSTs; links to UI spec for presentation-layer detail.
- **`docs/references/000-UX-guide.md`** remains the design-system token source (colors, typography, spacing)—not duplicated in SRS.
- **Mockups** live under `docs/references/mockups/` with descriptive filenames for portable relative linking.

## Rationale

ISO 29148 SRS documents should stay unambiguous and testable at the systems layer. Pixel-level layout, badge semantics, and progressive C2PA disclosure levels belong in a dedicated UI spec so frontend tasks can iterate on visuals without rewriting technical requirements. BDD features remain behavioral; UI vitest asserts DOM against UI-SCR acceptance criteria.

## Assumptions

Mockups are directional; implementation MUST correct PRD conflicts (e.g., no "encrypted" labeling for permissioned spaces per TC-004).

## Alternatives Considered

- **Embed all UI detail in SRS:** Rejected; would bloat SRS and mix design tokens with XRPC contracts.
- **UX guide only, no UI requirements:** Rejected; mockups introduce screen-specific acceptance criteria not captured in tokens alone.

## Consequences / Implications

Frontend tasks MUST read `docs/ui-requirements.md` and `docs/srs.md` together per holistic-ui rule. New screens require UI-SCR entries and SRS cross-links before implementation.

## Related Decisions / Notes

[008-c2pa-sdk-and-signing.md](./008-c2pa-sdk-and-signing.md), [010-permissioned-spaces-storage.md](./010-permissioned-spaces-storage.md), [ui-requirements.md](../ui-requirements.md)