/**
 * Resolve thumbnail URLs from HappyView photo views.
 */

/**
 * Resolve a display URL for a photo view image blob.
 *
 * @param {object | undefined} image - Blob field from a photo record.
 * @param {string} happyViewUrl - HappyView base URL.
 * @returns {string | null} Absolute image URL when resolvable.
 */
export function resolveImageUrl(image, happyViewUrl) {
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
  return `${base}/xrpc/com.atproto.sync.getBlob?cid=${encodeURIComponent(link)}`;
}