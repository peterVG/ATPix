import { escapeHtml } from "../utils/html.js";
import { formatCreatedAtUtc } from "./formatCreatedAt.js";
import {
  badgeClassForLabel,
  mapC2paValidationState,
  selectPhotoBadges,
} from "./selectPhotoBadge.js";

/**
 * Render badge chips for a gallery media card.
 *
 * @param {object} record - Photo record payload.
 * @returns {string} HTML string for badge chips.
 */
export function renderPhotoBadges(record) {
  const labels = selectPhotoBadges({
    visibility: record.visibility ?? "public",
    c2paState: mapC2paValidationState(record.c2paValidationState),
  });

  return labels
    .map((label) => {
      const modifier = badgeClassForLabel(label);
      const testId =
        label === "Trusted"
          ? "badge-trusted"
          : label === "Valid"
            ? "badge-valid"
            : label === "Invalid"
              ? "badge-invalid"
              : "badge-private";
      return `<span class="status-chip status-chip--${modifier}" data-testid="${testId}">${label}</span>`;
    })
    .join("");
}

/**
 * Render a gallery media card article element.
 *
 * @param {object} options - Card render options.
 * @param {object} options.photo - Photo view entry.
 * @param {number} options.index - Index within the visible grid.
 * @param {string} [options.photoUri] - Explicit photo URI for interaction hooks.
 * @returns {string} HTML string for one card.
 */
export function renderMediaCard({ photo, index, photoUri }) {
  const record = photo.record ?? {};
  const title = record.title ? escapeHtml(record.title) : "Untitled";
  const timestamp = record.createdAt ? escapeHtml(formatCreatedAtUtc(record.createdAt)) : "";
  const uri = photoUri ?? photo.uri ?? "";

  return `
    <article
      class="gallery-card gallery-card--loaded"
      data-testid="gallery-card"
      data-card-index="${index}"
      data-photo-uri="${escapeHtml(uri)}"
      tabindex="0"
      role="button"
      aria-label="Edit ${title}"
    >
      <div class="gallery-card__media" role="img" aria-label="${title}"></div>
      <div class="gallery-card__badges">${renderPhotoBadges(record)}</div>
      <p class="gallery-card__meta">${timestamp}</p>
    </article>
  `;
}

/**
 * Return true when a photo record counts as C2PA verified for album filtering.
 *
 * @param {object} record - Photo record payload.
 * @returns {boolean} Whether the photo is trusted or well-formed valid.
 */
export function isVerifiedPhotoRecord(record) {
  const state = mapC2paValidationState(record.c2paValidationState);
  return state === "trusted" || state === "valid";
}