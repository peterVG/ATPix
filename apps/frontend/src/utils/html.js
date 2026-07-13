/**
 * Escape a string for safe HTML text interpolation.
 *
 * @param {string} value - Raw user- or protocol-supplied text.
 * @returns {string} HTML-escaped string.
 */
export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
