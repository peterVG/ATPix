/**
 * atproto OAuth client metadata builders for ATPix (ADR-006, ADR-010).
 *
 * The deployment origin publishes {@link OAUTH_CLIENT_METADATA_PATH} so PDS
 * authorization servers can validate redirect URIs and display app information.
 */

/** @constant {string} Path segment for the OAuth client metadata document. */
export const OAUTH_CLIENT_METADATA_PATH = "/oauth-client-metadata.json";

/** @constant {string} OAuth redirect path used by @happyview/oauth-client-browser. */
export const OAUTH_CALLBACK_PATH = "/oauth/callback";

/** @constant {string} Human-readable client name shown on authorization screens. */
export const OAUTH_CLIENT_NAME = "ATPix";

/**
 * OAuth scopes requested for gallery read/write and blob upload.
 *
 * @constant {string}
 */
export const OAUTH_CLIENT_SCOPE = [
  "atproto",
  "blob:*/*",
  "repo:net.atpix.gallery.photo",
  "repo:net.atpix.gallery.album",
  "repo:net.atpix.gallery.albumItem",
  "repo:net.atpix.gallery.collectionRule",
].join(" ");

/**
 * Normalize a deployment origin by trimming trailing slashes.
 *
 * @param {string} origin - Scheme + host + optional port (no path).
 * @returns {string} Origin without trailing slash.
 */
export function normalizeOrigin(origin) {
  return origin.replace(/\/+$/, "");
}

/**
 * Resolve the deployment origin for OAuth client metadata.
 *
 * Prefers the browser location in client code; falls back to
 * `VITE_DEPLOYMENT_ORIGIN` for build-time generation.
 *
 * @returns {string} Deployment origin without trailing slash.
 */
export function getDeploymentOrigin() {
  if (typeof window !== "undefined" && window.location?.origin) {
    return normalizeOrigin(window.location.origin);
  }

  const envOrigin = import.meta.env.VITE_DEPLOYMENT_ORIGIN;
  if (typeof envOrigin === "string" && envOrigin.length > 0) {
    return normalizeOrigin(envOrigin);
  }

  return "http://127.0.0.1:5173";
}

/**
 * Build the OAuth `client_id` URL for a deployment origin.
 *
 * @param {string} origin - Deployment origin (e.g. `https://app.example.com`).
 * @returns {string} Fully-qualified client metadata URL.
 */
export function getOAuthClientId(origin) {
  const normalized = normalizeOrigin(origin);
  return `${normalized}${OAUTH_CLIENT_METADATA_PATH}`;
}

/**
 * Build the OAuth redirect URI for a deployment origin.
 *
 * @param {string} origin - Deployment origin.
 * @returns {string} Redirect URI passed to the OAuth client library.
 */
export function getOAuthRedirectUri(origin) {
  const normalized = normalizeOrigin(origin);
  return `${normalized}${OAUTH_CALLBACK_PATH}`;
}

/**
 * Build the atproto OAuth client metadata document for a deployment origin.
 *
 * @param {string} origin - Deployment origin used as `client_uri` and in URLs.
 * @returns {Record<string, unknown>} OAuth client metadata JSON object.
 */
export function buildOAuthClientMetadata(origin) {
  const normalized = normalizeOrigin(origin);
  const clientId = getOAuthClientId(normalized);

  return {
    client_id: clientId,
    client_name: OAUTH_CLIENT_NAME,
    client_uri: normalized,
    redirect_uris: [getOAuthRedirectUri(normalized)],
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
    scope: OAUTH_CLIENT_SCOPE,
    token_endpoint_auth_method: "none",
    application_type: "web",
    dpop_bound_access_tokens: true,
  };
}

/**
 * Build HappyView Permissioned Space `appAccess` for album spaces (ADR-010).
 *
 * @param {string} origin - Deployment origin whose OAuth clientId is allow-listed.
 * @returns {{ type: string, allowed: string[] }} Space appAccess payload.
 */
export function buildSpaceAppAccess(origin) {
  return {
    type: "allowList",
    allowed: [getOAuthClientId(origin)],
  };
}
