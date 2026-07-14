/**
 * Visibility chip helpers for albums and photos (UI-SCR-004 / UI-SCR-003).
 */

/** @typedef {"public" | "unlisted" | "permissioned"} Visibility */

/** @type {Record<Visibility, { label: string, modifier: string }>} */
const VISIBILITY_META = {
  public: { label: "Public", modifier: "public" },
  unlisted: { label: "Unlisted", modifier: "unlisted" },
  permissioned: { label: "Permissioned", modifier: "permissioned" },
};

/**
 * Map visibility to a human-readable badge label.
 *
 * @param {Visibility} visibility - Album or photo visibility.
 * @returns {string} Title-case badge label.
 */
export function visibilityLabel(visibility) {
  return VISIBILITY_META[visibility]?.label ?? VISIBILITY_META.public.label;
}

/**
 * Map visibility to a status-chip CSS modifier suffix.
 *
 * @param {Visibility} visibility - Album or photo visibility.
 * @returns {string} Modifier class suffix (e.g. `public`).
 */
export function visibilityChipModifier(visibility) {
  return VISIBILITY_META[visibility]?.modifier ?? VISIBILITY_META.public.modifier;
}

/**
 * Render a visibility status chip HTML string.
 *
 * @param {Visibility} visibility - Album or photo visibility.
 * @param {string} [testId] - Optional data-testid override.
 * @returns {string} HTML for the chip.
 */
export function renderVisibilityChip(visibility, testId = "album-visibility-badge") {
  const { label, modifier } = VISIBILITY_META[visibility] ?? VISIBILITY_META.public;
  return `<span class="status-chip status-chip--${modifier}" data-testid="${testId}">${label}</span>`;
}