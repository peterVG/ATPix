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

  return normalized.split("/").map((segment) => {
    try {
      return decodeURIComponent(segment);
    } catch {
      return segment;
    }
  });
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
 * Parse album route segments when the hash targets album views (`#/albums/...`).
 *
 * @param {string} [hash] - Location hash (defaults to `window.location.hash`).
 * @returns {{ albumUri: string | null, spaceAdmin: boolean }} Parsed album route.
 */
export function parseAlbumRouteFromHash(hash = window.location.hash) {
  const segments = parseHashSegments(hash);
  if (segments[0] !== "albums" || segments.length < 2) {
    return { albumUri: null, spaceAdmin: false };
  }

  if (segments[segments.length - 1] === "space") {
    return {
      albumUri: segments.slice(1, -1).join("/"),
      spaceAdmin: true,
    };
  }

  return {
    albumUri: segments.slice(1).join("/"),
    spaceAdmin: false,
  };
}

/**
 * Parse an album AT URI when the hash targets album detail (`#/albums/:uri`).
 *
 * @param {string} [hash] - Location hash (defaults to `window.location.hash`).
 * @returns {string | null} Album AT URI or null on the albums list route.
 */
export function parseAlbumUriFromHash(hash = window.location.hash) {
  return parseAlbumRouteFromHash(hash).albumUri;
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
 * Build a hash href for a permissioned space admin screen (UI-SCR-006).
 *
 * @param {string} albumUri - Album AT URI linked to the space.
 * @returns {string} Hash URL (e.g. `#/albums/at%3A%2F%2F.../space`).
 */
export function spaceAdminHref(albumUri) {
  return `#/albums/${encodeURIComponent(albumUri)}/space`;
}

/**
 * Navigate to the permissioned space admin route for an album.
 *
 * @param {string} albumUri - Album AT URI.
 * @returns {void}
 */
export function navigateToSpaceAdmin(albumUri) {
  window.location.hash = `/albums/${encodeURIComponent(albumUri)}/space`;
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