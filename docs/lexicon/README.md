# ATPix Lexicon (`com.atpix.gallery.*`)

Machine-readable Lexicon JSON for the ATPix photo record App View. Upload these schemas to HappyView via the dashboard or `POST /admin/lexicons`.

**PRD reference:** [prd.md](../prd.md#atpix-lexicon-specification)  
**Product vision:** [product-vision.md](../product-vision.md)  
**Terminology mapping:** [prd.md § Product Terms ↔ AT Protocol Primitives](../prd.md#product-terms--at-protocol-primitives)

## Product terms ↔ AT Protocol primitives

Lexicon NSIDs use semantic product names (`gallery`, `album`). Storage and sync follow standard atproto **repositories**, **collections**, **records**, and **blobs**. User-facing UI keeps gallery/album language; this README uses protocol vocabulary.

> **Gallery** = **query/view** over `com.atpix.gallery.photo` records (no gallery record exists). **Album** = `com.atpix.gallery.album` **record** + `albumItem` junction records.

| Product term | AT Protocol primitive | NSID / mechanism |
|--------------|----------------------|------------------|
| **My Gallery** | Query over author's photo records | `com.atpix.gallery.listPhotos?did=<author-did>` |
| **Public profile gallery** | Same query, different DID | `listPhotos` over indexed `com.atpix.gallery.photo` for target DID |
| **Following / Hashtags feed** | Multi-repo index query + rules | `listFeedPhotos` + `collectionRule` records |
| **Photo** | Record + blob | Collection `com.atpix.gallery.photo`; blob via `uploadBlob` |
| **Album** | Container record | Collection `com.atpix.gallery.album` in owner's PDS **repo** |
| **Album membership** | Junction records | Collection `com.atpix.gallery.albumItem`; optional `photo.albumUris[]` |
| **Permissioned album** | Permissioned **space repo** | `ats://…`; space type `com.atpix.gallery.albumSpace` |
| **Share link** | UI route + visibility | `visibility` on album/photo records |

### Record collections and repo placement

| Collection NSID | Record role | Typical repo |
|-----------------|-------------|--------------|
| `com.atpix.gallery.photo` | Image metadata + blob ref | User PDS repo, or permissioned space repo |
| `com.atpix.gallery.album` | Named curated container | User PDS repo; `spaceUri` when permissioned |
| `com.atpix.gallery.albumItem` | Ordered album ↔ photo link | Same repo as parent album / photos |
| `com.atpix.gallery.collectionRule` | Follow/hashtag source rules | Owner's public PDS repo |

**Note on `collectionRule`:** The NSID contains "collection" in the product sense (sourcing/curating photos). It is a record in the `com.atpix.gallery.collectionRule` **collection**—not a separate atproto storage primitive.

## Namespace

| Item | Value |
|------|-------|
| Authority NSID | `com.atpix.gallery` |
| DNS `_lexicon` host | TBD (e.g. `_lexicon.gallery.atpix.example.com`) |
| Space type NSID | `com.atpix.gallery.albumSpace` (Permissioned Spaces / ATP-0016) |

## Files

| File | NSID | Lexicon type |
|------|------|--------------|
| [com.atpix.gallery.defs.json](./com.atpix.gallery.defs.json) | `com.atpix.gallery.defs` | Shared tokens & objects |
| [com.atpix.gallery.photo.json](./com.atpix.gallery.photo.json) | `com.atpix.gallery.photo` | `record` |
| [com.atpix.gallery.album.json](./com.atpix.gallery.album.json) | `com.atpix.gallery.album` | `record` |
| [com.atpix.gallery.albumItem.json](./com.atpix.gallery.albumItem.json) | `com.atpix.gallery.albumItem` | `record` |
| [com.atpix.gallery.collectionRule.json](./com.atpix.gallery.collectionRule.json) | `com.atpix.gallery.collectionRule` | `record` |
| [com.atpix.gallery.listPhotos.json](./com.atpix.gallery.listPhotos.json) | `com.atpix.gallery.listPhotos` | `query` |
| [com.atpix.gallery.getPhoto.json](./com.atpix.gallery.getPhoto.json) | `com.atpix.gallery.getPhoto` | `query` |
| [com.atpix.gallery.listAlbums.json](./com.atpix.gallery.listAlbums.json) | `com.atpix.gallery.listAlbums` | `query` |
| [com.atpix.gallery.getAlbum.json](./com.atpix.gallery.getAlbum.json) | `com.atpix.gallery.getAlbum` | `query` |
| [com.atpix.gallery.listAlbumItems.json](./com.atpix.gallery.listAlbumItems.json) | `com.atpix.gallery.listAlbumItems` | `query` |
| [com.atpix.gallery.listFeedPhotos.json](./com.atpix.gallery.listFeedPhotos.json) | `com.atpix.gallery.listFeedPhotos` | `query` |
| [com.atpix.gallery.listCollectionRules.json](./com.atpix.gallery.listCollectionRules.json) | `com.atpix.gallery.listCollectionRules` | `query` |
| [com.atpix.gallery.createPhoto.json](./com.atpix.gallery.createPhoto.json) | `com.atpix.gallery.createPhoto` | `procedure` |
| [com.atpix.gallery.updatePhoto.json](./com.atpix.gallery.updatePhoto.json) | `com.atpix.gallery.updatePhoto` | `procedure` |
| [com.atpix.gallery.deletePhoto.json](./com.atpix.gallery.deletePhoto.json) | `com.atpix.gallery.deletePhoto` | `procedure` |
| [com.atpix.gallery.createAlbum.json](./com.atpix.gallery.createAlbum.json) | `com.atpix.gallery.createAlbum` | `procedure` |
| [com.atpix.gallery.updateAlbum.json](./com.atpix.gallery.updateAlbum.json) | `com.atpix.gallery.updateAlbum` | `procedure` |
| [com.atpix.gallery.deleteAlbum.json](./com.atpix.gallery.deleteAlbum.json) | `com.atpix.gallery.deleteAlbum` | `procedure` |
| [com.atpix.gallery.addToAlbum.json](./com.atpix.gallery.addToAlbum.json) | `com.atpix.gallery.addToAlbum` | `procedure` |
| [com.atpix.gallery.removeFromAlbum.json](./com.atpix.gallery.removeFromAlbum.json) | `com.atpix.gallery.removeFromAlbum` | `procedure` |
| [com.atpix.gallery.createCollectionRule.json](./com.atpix.gallery.createCollectionRule.json) | `com.atpix.gallery.createCollectionRule` | `procedure` |
| [com.atpix.gallery.updateCollectionRule.json](./com.atpix.gallery.updateCollectionRule.json) | `com.atpix.gallery.updateCollectionRule` | `procedure` |
| [com.atpix.gallery.deleteCollectionRule.json](./com.atpix.gallery.deleteCollectionRule.json) | `com.atpix.gallery.deleteCollectionRule` | `procedure` |

## Metadata provenance

Fields are named for atproto camelCase conventions. The table below maps each user-facing metadata field to its semantic source.

### `com.atpix.gallery.photo`

| Field | Source | Standard term |
|-------|--------|---------------|
| `title` | [dc:title](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#title), [schema:name](https://schema.org/name) | Title / name |
| `description` | [dc:description](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#description), [schema:description](https://schema.org/description) | Description |
| `caption` | [schema:caption](https://schema.org/caption) | Caption |
| `keywords` | [dc:subject](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#subject), [schema:keywords](https://schema.org/keywords) | Subject / keywords |
| `creator` | [dc:creator](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#creator), [schema:creator](https://schema.org/creator) | Creator |
| `createdAt` | [dc:date](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#date), [schema:dateCreated](https://schema.org/dateCreated) | Date created |
| `modifiedAt` | [schema:dateModified](https://schema.org/dateModified) | Date modified |
| `image` | [schema:contentUrl](https://schema.org/contentUrl), [dc:format](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#format) | Media blob (format in blob MIME) |
| `thumbnail` | [schema:thumbnail](https://schema.org/thumbnail) | Thumbnail blob |
| `width` | [schema:width](https://schema.org/width) | Width (px) |
| `height` | [schema:height](https://schema.org/height) | Height (px) |
| `license` | [dc:rights](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#rights), [schema:license](https://schema.org/license) | Rights / license URI |
| `copyrightHolder` | [schema:copyrightHolder](https://schema.org/copyrightHolder) | Copyright holder |
| `source` | [dc:source](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#source), [schema:isBasedOn](https://schema.org/isBasedOn) | Source / derived from |
| `contributor` | [dc:contributor](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#contributor) | Contributor |
| `inLanguage` | [dc:language](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#language), [schema:inLanguage](https://schema.org/inLanguage) | Language |
| `locationCreated` | [schema:locationCreated](https://schema.org/locationCreated) | `#geoPlace` |
| `albumUris` | [schema:isPartOf](https://schema.org/isPartOf) | Parent albums |
| `visibility` | **ATPix** | `public` \| `unlisted` \| `permissioned` |
| `spaceUri` | **ATPix** · [ATP-0016](https://github.com/bluesky-social/proposals) | Permissioned space URI |
| `c2paActiveManifestId` | **ATPix** · [C2PA §8.1](https://spec.c2pa.org/specifications/specifications/2.2/specs/C2PA_Specification.html#manifest-identifier) | Active manifest instance ID |
| `c2paValidationState` | **ATPix** · C2PA §14.3 | Cached Well-Formed / Valid / Trusted / invalid |
| `c2paLastAction` | **ATPix** · C2PA §18.14 | Latest `c2pa.*` action label |
| `c2paManifestStoreUri` | **ATPix** · C2PA §11.4 | External manifest store URI |
| `c2paIngredientUri` | **ATPix** · C2PA §18.15 | Parent ingredient for derivatives |

### C2PA custom manifest assertion (not a repo field)

| Assertion | Source | Purpose |
|-----------|--------|---------|
| `com.atpix.gallery.creatorDid` | **ATPix** · C2PA §6.2.1 | Bind manifest to uploader atproto DID |

See [c2pa.md](../../.agents/kb/c2pa.md) for claim-generator and validator workflows.

### `com.atpix.gallery.album`

| Field | Source | Standard term |
|-------|--------|---------------|
| `name` | [dc:title](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#title), [schema:name](https://schema.org/name) | Album name |
| `description` | [dc:description](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#description), [schema:description](https://schema.org/description) | Description |
| `createdAt` | [dc:date](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#date), [schema:dateCreated](https://schema.org/dateCreated) | Created |
| `modifiedAt` | [schema:dateModified](https://schema.org/dateModified) | Modified |
| `creator` | [dc:creator](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#creator) | Owner DID |
| `coverPhotoUri` | [schema:image](https://schema.org/image) · [schema:thumbnail](https://schema.org/thumbnail) | Cover image |
| `visibility` | **ATPix** | `public` \| `unlisted` \| `permissioned` |
| `spaceUri` | **ATPix** · ATP-0016 | Linked permissioned space |
| `collectionRuleUris` | **ATPix** | Rules seeding this album |

### `com.atpix.gallery.collectionRule`

| Field | Source | Notes |
|-------|--------|-------|
| `name` | [dc:title](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#title) | Rule label |
| `hashtags` | [dc:subject](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#subject) | Normalized tags |
| `followedActors` | [schema:follows](https://schema.org/follows) (conceptual) | Explicit DID list |
| `useFollowGraph` | **ATPix** | Resolve via `app.bsky.graph.getFollows` |
| `targetScope` | **ATPix** | `gallery` \| `album` |
| `targetAlbumUri` | **ATPix** | Album AT URI when `targetScope: album` |

## HappyView upload notes

1. Upload **record** lexicons first with `backfill: true`.
2. Set `target_collection` on each **query** and **procedure** lexicon.
3. Attach Lua scripts for `listFeedPhotos` (rule evaluation + follow graph) and `createAlbum` (permissioned space provisioning).
4. Enable `feature.spaces_enabled` before testing permissioned albums.
5. Permissioned photos use `com.atproto.space.*` endpoints with `collection: com.atpix.gallery.photo` inside the album's `spaceUri`.