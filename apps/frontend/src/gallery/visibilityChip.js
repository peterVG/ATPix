/**
 * Visibility chip helpers for albums and photos (UI-SCR-004 / UI-SCR-003).
 */

/** @typedef {"public" | "unlisted" | "permissioned"} Visibility */

/**
 * Map visibility to a human-readable badge label.
 *
 * @param {Visibility} visibility - Album or photo visibility.
 * @returns {string} Uppercase badge label.
 */
export function visibilityLabel(visibility) {
  if (visibility === "permissioned") {
    return "Permissioned";
  }

  if (visibility === "unlisted") {
    return "Unlisted";
  }

  return "Public";
}

/**
 * Map visibility to a status-chip CSS modifier suffix.
 *
 * @param {Visibility} visibility - Album or photo visibility.
 * @returns {string} Modifier class suffix (e.g. `public`).
 */
export function visibilityChipModifier(visibility) {
  if (visibility === "permissioned") {
    return "permissioned";
  }

  if (visibility === "unlisted") {
    return "unlisted";
  }

  return "public";
}

/**
 * Render a visibility status chip HTML string.
 *
 * @param {Visibility} visibility - Album or photo visibility.
 * @param {string} [testId] - Optional data-testid override.
 * @returns {string} HTML for the chip.
 */
export function renderVisibilityChip(visibility, testId = "album-visibility-badge") {
  const label = visibilityLabel(visibility);
  const modifier = visibilityChipModifier(visibility);
  return `<span class="status-chip status-chip--${modifier}" data-testid="${testId}">${label}</span>`;
}