/**
 * Resolve thumbnail URLs from HappyView photo views.
 */

/**
 * Resolve a display URL for a photo view image blob.
 *
 * @param {object | undefined} image - Blob field from a photo record.
 * @param {string} happyViewUrl - HappyView base URL.
 * @param {string} [authorDid] - Author DID required for `com.atproto.sync.getBlob`.
 * @returns {string | null} Absolute image URL when resolvable.
 */
export function resolveImageUrl(image, happyViewUrl, authorDid) {
  if (!image || typeof image !== "object") {
    return null;
  }

  if (typeof image.url === "string" && image.url.length > 0) {
    return image.url;
  }

  const link = image.ref?.$link;
  if (typeof link !== "string" || link.length === 0) {
    return null;
  }

  const base = happyViewUrl.replace(/\/$/, "");
  const params = new URLSearchParams({ cid: link });
  if (typeof authorDid === "string" && authorDid.length > 0) {
    params.set("did", authorDid);
  }

  return `${base}/xrpc/com.atproto.sync.getBlob?${params.toString()}`;
}