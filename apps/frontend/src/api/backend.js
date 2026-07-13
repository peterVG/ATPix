/** @constant {string} Default FastAPI base URL for local development. */
export const DEFAULT_BACKEND_URL = "http://127.0.0.1:8000";

/**
 * Resolve the ATPix auxiliary API base URL.
 *
 * @returns {string} Backend origin without trailing slash.
 */
export function getBackendUrl() {
  const configured = import.meta.env.VITE_BACKEND_URL;
  if (typeof configured === "string" && configured.length > 0) {
    return configured.replace(/\/$/, "");
  }

  return DEFAULT_BACKEND_URL;
}