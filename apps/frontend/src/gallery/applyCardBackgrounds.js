import { getHappyViewUrl } from "../api/happyview.js";
import { fetchSpaceBlobObjectUrl } from "../api/spaceApi.js";
import { getHappyViewFetchHandler } from "../auth/happyViewFetch.js";
import { resolveImageUrl } from "./resolveImageUrl.js";

/** @constant {string} Dataset key storing revocable object URLs on card media nodes. */
const OBJECT_URL_ATTR = "data-atpix-bg-object-url";

/**
 * Revoke a previously applied object URL background on a media element.
 *
 * @param {HTMLElement} media - Gallery card media element.
 * @returns {void}
 */
function revokeCardBackground(media) {
  const previousUrl = media.getAttribute(OBJECT_URL_ATTR);
  if (previousUrl) {
    URL.revokeObjectURL(previousUrl);
    media.removeAttribute(OBJECT_URL_ATTR);
  }
}

/**
 * Apply gallery card background images through DOM APIs to avoid style-attribute injection.
 *
 * @param {HTMLElement} grid - Gallery grid element.
 * @param {object[]} photos - Photo views currently visible in the grid.
 * @param {string} fallbackDid - Signed-in author DID for blob resolution.
 * @returns {Promise<void>} Resolves when backgrounds are applied.
 */
export async function applyCardBackgrounds(grid, photos, fallbackDid) {
  let fetchHandler = null;
  try {
    fetchHandler = await getHappyViewFetchHandler();
  } catch {
    fetchHandler = null;
  }

  const cards = [...grid.querySelectorAll('[data-testid="gallery-card"]')];
  await Promise.all(
    cards.map(async (card) => {
      if (!(card instanceof HTMLElement)) {
        return;
      }

      const indexValue = card.getAttribute("data-card-index");
      if (indexValue === null) {
        return;
      }

      const photo = photos[Number(indexValue)];
      const media = card.querySelector(".gallery-card__media");
      if (!photo || !(media instanceof HTMLElement)) {
        return;
      }

      revokeCardBackground(media);
      media.style.backgroundImage = "";

      const record = photo.record ?? {};
      const authorDid = typeof photo.author === "string" ? photo.author : fallbackDid;
      const spaceUri = record.visibility === "permissioned" ? record.spaceUri : undefined;
      const link = record.image?.ref?.$link;

      if (
        record.visibility === "permissioned" &&
        typeof spaceUri === "string" &&
        spaceUri.length > 0 &&
        typeof link === "string" &&
        link.length > 0 &&
        fetchHandler
      ) {
        try {
          const objectUrl = await fetchSpaceBlobObjectUrl(fetchHandler, spaceUri, link);
          media.style.backgroundImage = `url("${objectUrl}")`;
          media.setAttribute(OBJECT_URL_ATTR, objectUrl);
          return;
        } catch {
          return;
        }
      }

      const imageUrl = resolveImageUrl(record.image, getHappyViewUrl(), authorDid);
      if (imageUrl) {
        media.style.backgroundImage = `url("${imageUrl}")`;
      }
    }),
  );
}