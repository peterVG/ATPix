/**
 * Map photo visibility and C2PA state to UI-SCR-001 badge labels.
 */

/**
 * @typedef {"trusted" | "valid" | "invalid"} C2paBadgeState
 */

/**
 * Select badge labels for a gallery media card.
 *
 * @param {object} options - Badge inputs.
 * @param {"public" | "unlisted" | "permissioned"} options.visibility - Photo visibility.
 * @param {C2paBadgeState} options.c2paState - C2PA validation summary.
 * @returns {string[]} Badge labels to render on the card.
 */
export function selectPhotoBadges({ visibility, c2paState }) {
  if (visibility === "permissioned") {
    return ["Private"];
  }

  if (c2paState === "invalid") {
    return ["Invalid"];
  }

  if (c2paState === "trusted") {
    return ["Trusted", "Valid"];
  }

  return ["Valid"];
}

/**
 * Map a badge label to a CSS modifier class.
 *
 * @param {string} label - Badge label text.
 * @returns {string} Status chip modifier class suffix.
 */
export function badgeClassForLabel(label) {
  const mapping = {
    Trusted: "trusted",
    Valid: "wellformed",
    Invalid: "invalid",
    Private: "permissioned",
  };

  return mapping[label] ?? "public";
}