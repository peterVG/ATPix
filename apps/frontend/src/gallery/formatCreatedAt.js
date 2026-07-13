/**
 * Format gallery timestamps per SRS-F-002 RFC 3339 UTC requirement.
 */

/**
 * Return true when a value is RFC 3339 UTC with a `Z` suffix.
 *
 * @param {string} value - Timestamp string.
 * @returns {boolean} Whether the value matches the UTC Z pattern.
 */
export function isRfc3339Utc(value) {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(value);
}

/**
 * Format a UTC timestamp for display in the gallery UI.
 *
 * @param {string} isoUtc - RFC 3339 UTC timestamp.
 * @returns {string} Human-readable UTC label.
 */
export function formatCreatedAtUtc(isoUtc) {
  const date = new Date(isoUtc);
  if (Number.isNaN(date.getTime())) {
    return isoUtc;
  }

  return date
    .toISOString()
    .replace("T", " ")
    .replace(/\.000Z$/, " UTC")
    .replace(/Z$/, " UTC");
}

/**
 * Build the current UTC timestamp for photo records.
 *
 * @returns {string} RFC 3339 UTC timestamp with `Z` suffix.
 */
export function nowRfc3339Utc() {
  return new Date().toISOString();
}