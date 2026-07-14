/** @constant {string[]} Primary shell navigation route ids. */
export const SHELL_ROUTES = ["gallery", "discovery", "albums", "upload", "settings"];

/**
 * Parse hash path segments after the leading `#/`.
 *
 * @param {string} [hash] - Location hash (defaults to `window.location.hash`).
 * @returns {string[]} Route segments.
 */
export function parseHashSegments(hash = window.location.hash) {
  const normalized = hash.replace(/^#\/?/, "");
  if (!normalized) {
    return [];
  }

  return normalized.split("/").map((segment) => decodeURIComponent(segment));
}

/**
 * Parse the active hash route from the current location.
 *
 * @param {string} [hash] - Location hash (defaults to `window.location.hash`).
 * @returns {string} Route id such as `gallery`, `discovery`, `albums`, or `settings`.
 */
export function parseRouteFromHash(hash = window.location.hash) {
  const route = parseHashSegments(hash)[0] || "gallery";
  return SHELL_ROUTES.includes(route) ? route : "gallery";
}

/**
 * Parse an album AT URI when the hash targets album detail (`#/albums/:uri`).
 *
 * @param {string} [hash] - Location hash (defaults to `window.location.hash`).
 * @returns {string | null} Album AT URI or null on the albums list route.
 */
export function parseAlbumUriFromHash(hash = window.location.hash) {
  const segments = parseHashSegments(hash);
  if (segments[0] !== "albums" || segments.length < 2) {
    return null;
  }

  return segments.slice(1).join("/");
}

/**
 * Build a hash href for a shell route.
 *
 * @param {string} route - Route id.
 * @returns {string} Hash URL (e.g. `#/gallery`).
 */
export function routeHref(route) {
  return `#/${route}`;
}

/**
 * Build a hash href for an album detail screen.
 *
 * @param {string} albumUri - Album AT URI.
 * @returns {string} Hash URL (e.g. `#/albums/at%3A%2F%2F...`).
 */
export function albumDetailHref(albumUri) {
  return `#/albums/${encodeURIComponent(albumUri)}`;
}

/**
 * Navigate to a shell route by updating the location hash.
 *
 * @param {string} route - Route id.
 * @returns {void}
 */
export function navigateToRoute(route) {
  const next = SHELL_ROUTES.includes(route) ? route : "gallery";
  window.location.hash = `/${next}`;
}

/**
 * Navigate to an album detail route.
 *
 * @param {string} albumUri - Album AT URI.
 * @returns {void}
 */
export function navigateToAlbum(albumUri) {
  window.location.hash = `/albums/${encodeURIComponent(albumUri)}`;
}

/**
 * Register a hashchange listener for shell navigation.
 *
 * @param {(route: string) => void} listener - Callback invoked with the parsed route.
 * @returns {() => void} Cleanup function removing the listener.
 */
export function onRouteChange(listener) {
  const handler = () => listener(parseRouteFromHash());
  window.addEventListener("hashchange", handler);
  return () => window.removeEventListener("hashchange", handler);
}