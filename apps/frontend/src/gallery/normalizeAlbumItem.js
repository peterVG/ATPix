/**
 * Normalize a hydrated album item entry to a photo view.
 *
 * `getAlbum` with `hydrateItems` returns `photoView` entries per Lexicon; the test
 * stub wraps photos as `{ photo: photoView }` on junction records.
 *
 * @param {object | null | undefined} item - Hydrated album item or photo view.
 * @returns {object | null} Photo view when the entry can be rendered.
 */
export function normalizeAlbumPhotoItem(item) {
  if (!item || typeof item !== "object") {
    return null;
  }

  if (item.record && item.uri) {
    return item;
  }

  if (item.photo?.record && item.photo.uri) {
    return item.photo;
  }

  return null;
}