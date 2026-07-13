/**
 * Configuration helpers for HappyView XRPC clients.
 * Gallery reads and writes use HappyView per PRD TC-001 — not the Python backend.
 */

/**
 * Resolve HappyView instance URL from Vite environment variables.
 *
 * @returns {string} Base URL without trailing slash.
 */
export function getHappyViewUrl() {
  const url = import.meta.env.VITE_HAPPYVIEW_URL ?? "http://127.0.0.1:3001";
  return url.replace(/\/$/, "");
}

/**
 * Resolve the ATPix API client key used on every XRPC request.
 *
 * @returns {string|undefined} Client key or undefined when unset.
 */
export function getClientKey() {
  return import.meta.env.VITE_HAPPYVIEW_CLIENT_KEY;
}

/**
 * Build XRPC request headers including client identification (SRS-F-001.2).
 *
 * @returns {Record<string, string>} Headers object for HappyView XRPC calls.
 */
export function buildXrpcHeaders() {
  const clientKey = getClientKey();
  if (typeof clientKey !== "string" || clientKey.length === 0) {
    return {};
  }

  return { "X-Client-Key": clientKey };
}
