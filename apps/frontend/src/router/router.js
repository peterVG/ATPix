/** @constant {string[]} Primary shell navigation route ids. */
export const SHELL_ROUTES = ["gallery", "discovery", "albums", "settings"];

/**
 * Parse the active hash route from the current location.
 *
 * @param {string} [hash] - Location hash (defaults to `window.location.hash`).
 * @returns {string} Route id such as `gallery`, `discovery`, `albums`, or `settings`.
 */
export function parseRouteFromHash(hash = window.location.hash) {
  const normalized = hash.replace(/^#\/?/, "");
  const route = normalized.split("/")[0] || "gallery";
  return SHELL_ROUTES.includes(route) ? route : "gallery";
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
