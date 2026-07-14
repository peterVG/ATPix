import { getHappyViewUrl } from "../api/happyview.js";
import { resolveImageUrl } from "./resolveImageUrl.js";

/**
 * Apply gallery card background images through DOM APIs to avoid style-attribute injection.
 *
 * @param {HTMLElement} grid - Gallery grid element.
 * @param {object[]} photos - Photo views currently visible in the grid.
 * @param {string} fallbackDid - Signed-in author DID for blob resolution.
 * @returns {void}
 */
export function applyCardBackgrounds(grid, photos, fallbackDid) {
  grid.querySelectorAll('[data-testid="gallery-card"]').forEach((card) => {
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

    const record = photo.record ?? {};
    const authorDid = typeof photo.author === "string" ? photo.author : fallbackDid;
    const imageUrl = resolveImageUrl(record.image, getHappyViewUrl(), authorDid);
    if (imageUrl) {
      media.style.backgroundImage = `url("${imageUrl}")`;
    }
  });
}