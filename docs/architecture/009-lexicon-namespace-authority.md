# Architecture Decision Record - ATPix

**009-lexicon-namespace-authority.md**

## Title

`net.atpix.gallery.*` Lexicon namespace and publication strategy

## Status

Accepted

## Context / Requirement Reference

[docs/overview/002-prd.md](../overview/002-prd.md) F-011 defines record, query, and procedure Lexicons. Product Terms mapping clarifies gallery (query/view) vs album (record). [docs/lexicon/](../lexicon/) contains 23 JSON artifacts. [docs/overview/003-srs.md](../overview/003-srs.md) SRS-F-011, SRS-TC-005.

## Decision

- **Namespace:** All ATPix gallery Lexicons use NSID prefix `net.atpix.gallery.*`.
- **Artifacts:** Source of truth in `docs/lexicon/*.json`; uploaded to HappyView with `backfill: true` for network-wide indexing.
- **Collections:** `photo`, `album`, `albumItem`, `collectionRule` records; space type `albumSpace` per ATP-0016 (not a repo collection).
- **Immutability:** Published Lexicons follow atproto immutability—breaking changes require new NSIDs.
- **Authority:** Production SHOULD publish DNS `_lexicon` TXT for `net.atpix.gallery` on **atpix.net** (reverse-DNS authority for `net.atpix.*`).
- **Provenance fields:** Photo records store C2PA summary fields alongside Dublin Core / Schema.org mapped attributes per lexicon defs.

## Rationale

Open schemas enable third-party clients and validate the product vision unfair advantage. Explicit product-term mapping reduces implementer confusion between UI language and atproto primitives.

## Assumptions

HappyView indexes all declared collections via Jetstream. Lexicon DNS authority is **atpix.net** (owned).

## Alternatives Considered

- **`com.atpix.*` (atpix.com):** Rejected; domain not owned. **`world.atpix.*` (atpix.world):** Rejected; **atpix.net** is the owned authority domain.
- **`app.atpix.*` or third-party NSID:** Rejected; `net.atpix.gallery` matches artifact set and reverse-DNS rules for atpix.net.
- **Gallery as record type:** Rejected; gallery is a query/view per PRD vocabulary mapping.

## Consequences / Implications

Lexicon changes require coordinated HappyView re-upload and documentation updates per pr-documentation-update rule. BDD `lexicon_publication_SRS-F-011.feature` guards schema validity.

## Related Decisions / Notes

[007-happyview-app-view-integration.md](./007-happyview-app-view-integration.md), [lexicon net.atpix.gallery](../lexicon/net.atpix.gallery.md), [010-permissioned-spaces-storage.md](./010-permissioned-spaces-storage.md)