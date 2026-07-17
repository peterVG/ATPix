# ATPix Lexicon (`net.atpix.gallery.*`)

Machine-readable Lexicon JSON for the ATPix photo record App View. Upload these schemas to HappyView via the dashboard or `POST /admin/lexicons`.

**PRD reference:** [002-prd.md](../overview/002-prd.md#atpix-lexicon-specification)  
**Product vision:** [001-product-vision.md](../overview/001-product-vision.md)  
**Terminology mapping:** [002-prd.md § Product Terms ↔ AT Protocol Primitives](../overview/002-prd.md#product-terms--at-protocol-primitives)

## Product terms ↔ AT Protocol primitives

Lexicon NSIDs use semantic product names (`gallery`, `album`). Storage and sync follow standard atproto **repositories**, **collections**, **records**, and **blobs**. User-facing UI keeps gallery/album language; this README uses protocol vocabulary.

> **Gallery** = **query/view** over `net.atpix.gallery.photo` records (no gallery record exists). **Album** = `net.atpix.gallery.album` **record** + `albumItem` junction records.

| Product term | AT Protocol primitive | NSID / mechanism |
|--------------|----------------------|------------------|
| **My Gallery** | Query over author's photo records | `net.atpix.gallery.listPhotos?did=<author-did>` |
| **Public profile gallery** | Same query, different DID | `listPhotos` over indexed `net.atpix.gallery.photo` for target DID |
| **Following / Hashtags feed** | Multi-repo index query + rules | `listFeedPhotos` + `collectionRule` records |
| **Photo** | Record + blob | Collection `net.atpix.gallery.photo`; blob via `uploadBlob` |
| **Album** | Container record | Collection `net.atpix.gallery.album` in owner's PDS **repo** |
| **Album membership** | Junction records | Collection `net.atpix.gallery.albumItem`; optional `photo.albumUris[]` |
| **Permissioned album** | Permissioned **space repo** | `at://…/space/…`; space type `net.atpix.gallery.albumSpace` |
| **Share link** | UI route + visibility | `visibility` on album/photo records |

### Record collections and repo placement

| Collection NSID | Record role | Typical repo |
|-----------------|-------------|--------------|
| `net.atpix.gallery.photo` | Image metadata + blob ref | User PDS repo, or permissioned space repo |
| `net.atpix.gallery.album` | Named curated container | User PDS repo; `spaceUri` when permissioned |
| `net.atpix.gallery.albumItem` | Ordered album ↔ photo link | Same repo as parent album / photos |
| `net.atpix.gallery.collectionRule` | Follow/hashtag source rules | Owner's public PDS repo |

**Note on `collectionRule`:** The NSID contains "collection" in the product sense (sourcing/curating photos). It is a record in the `net.atpix.gallery.collectionRule` **collection**—not a separate atproto storage primitive.

## Namespace

| Item | Value |
|------|-------|
| Authority NSID | `net.atpix.gallery` |
| DNS `_lexicon` host | `_lexicon.gallery.atpix.net` (publish before network lexicon resolution) |
| Space type NSID | `net.atpix.gallery.albumSpace` (Permissioned Spaces / ATP-0016) |

## Files

| File | NSID | Lexicon type |
|------|------|--------------|
| [net.atpix.gallery.defs.json](./net.atpix.gallery.defs.json) | `net.atpix.gallery.defs` | Shared tokens & objects |
| [net.atpix.gallery.photo.json](./net.atpix.gallery.photo.json) | `net.atpix.gallery.photo` | `record` |
| [net.atpix.gallery.album.json](./net.atpix.gallery.album.json) | `net.atpix.gallery.album` | `record` |
| [net.atpix.gallery.albumItem.json](./net.atpix.gallery.albumItem.json) | `net.atpix.gallery.albumItem` | `record` |
| [net.atpix.gallery.collectionRule.json](./net.atpix.gallery.collectionRule.json) | `net.atpix.gallery.collectionRule` | `record` |
| [net.atpix.gallery.listPhotos.json](./net.atpix.gallery.listPhotos.json) | `net.atpix.gallery.listPhotos` | `query` |
| [net.atpix.gallery.getPhoto.json](./net.atpix.gallery.getPhoto.json) | `net.atpix.gallery.getPhoto` | `query` |
| [net.atpix.gallery.listAlbums.json](./net.atpix.gallery.listAlbums.json) | `net.atpix.gallery.listAlbums` | `query` |
| [net.atpix.gallery.getAlbum.json](./net.atpix.gallery.getAlbum.json) | `net.atpix.gallery.getAlbum` | `query` |
| [net.atpix.gallery.listAlbumItems.json](./net.atpix.gallery.listAlbumItems.json) | `net.atpix.gallery.listAlbumItems` | `query` |
| [net.atpix.gallery.listFeedPhotos.json](./net.atpix.gallery.listFeedPhotos.json) | `net.atpix.gallery.listFeedPhotos` | `query` |
| [net.atpix.gallery.listCollectionRules.json](./net.atpix.gallery.listCollectionRules.json) | `net.atpix.gallery.listCollectionRules` | `query` |
| [net.atpix.gallery.createPhoto.json](./net.atpix.gallery.createPhoto.json) | `net.atpix.gallery.createPhoto` | `procedure` |
| [net.atpix.gallery.updatePhoto.json](./net.atpix.gallery.updatePhoto.json) | `net.atpix.gallery.updatePhoto` | `procedure` |
| [net.atpix.gallery.deletePhoto.json](./net.atpix.gallery.deletePhoto.json) | `net.atpix.gallery.deletePhoto` | `procedure` |
| [net.atpix.gallery.createAlbum.json](./net.atpix.gallery.createAlbum.json) | `net.atpix.gallery.createAlbum` | `procedure` |
| [net.atpix.gallery.updateAlbum.json](./net.atpix.gallery.updateAlbum.json) | `net.atpix.gallery.updateAlbum` | `procedure` |
| [net.atpix.gallery.deleteAlbum.json](./net.atpix.gallery.deleteAlbum.json) | `net.atpix.gallery.deleteAlbum` | `procedure` |
| [net.atpix.gallery.addToAlbum.json](./net.atpix.gallery.addToAlbum.json) | `net.atpix.gallery.addToAlbum` | `procedure` |
| [net.atpix.gallery.removeFromAlbum.json](./net.atpix.gallery.removeFromAlbum.json) | `net.atpix.gallery.removeFromAlbum` | `procedure` |
| [net.atpix.gallery.createCollectionRule.json](./net.atpix.gallery.createCollectionRule.json) | `net.atpix.gallery.createCollectionRule` | `procedure` |
| [net.atpix.gallery.updateCollectionRule.json](./net.atpix.gallery.updateCollectionRule.json) | `net.atpix.gallery.updateCollectionRule` | `procedure` |
| [net.atpix.gallery.deleteCollectionRule.json](./net.atpix.gallery.deleteCollectionRule.json) | `net.atpix.gallery.deleteCollectionRule` | `procedure` |

## Metadata provenance

Fields are named for atproto camelCase conventions. The table below maps each user-facing metadata field to its semantic source.

### `net.atpix.gallery.photo`

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
| `net.atpix.gallery.creatorDid` | **ATPix** · C2PA §6.2.1 | Bind manifest to uploader atproto DID |

See [c2pa.md](../../.agents/kb/c2pa.md) for claim-generator and validator workflows.

### `net.atpix.gallery.album`

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

### `net.atpix.gallery.collectionRule`

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
5. Permissioned photos use `com.atproto.space.*` endpoints with `collection: net.atpix.gallery.photo` inside the album's `spaceUri`.