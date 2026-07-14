/**
 * atproto OAuth client metadata builders for ATPix (ADR-006, ADR-010).
 *
 * Production deployments publish {@link OAUTH_CLIENT_METADATA_PATH} so PDS
 * authorization servers can validate redirect URIs. Loopback origins (local dev)
 * use the atproto loopback client-id convention via `buildLoopbackClientId`.
 */

import { buildLoopbackClientId } from "@happyview/oauth-client-browser";

/** @constant {string} Path segment for the OAuth client metadata document. */
export const OAUTH_CLIENT_METADATA_PATH = "/oauth-client-metadata.json";

/** @constant {string} OAuth redirect path used by @happyview/oauth-client-browser. */
export const OAUTH_CALLBACK_PATH = "/oauth/callback";

/** @constant {string} Human-readable client name shown on authorization screens. */
export const OAUTH_CLIENT_NAME = "ATPix";

/** @constant {Set<string>} Hostnames treated as OAuth loopback clients. */
export const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]", "::1"]);

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
 * OAuth scopes as discrete permission tokens (avoids substring false positives).
 *
 * @constant {string[]}
 */
export const OAUTH_CLIENT_SCOPE_LIST = OAUTH_CLIENT_SCOPE.split(" ");

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
 * Return true when the origin hostname is a loopback address.
 *
 * @param {string} origin - Deployment origin.
 * @returns {boolean} Whether loopback OAuth client-id rules apply.
 */
export function isLoopbackOrigin(origin) {
  try {
    return LOOPBACK_HOSTS.has(new URL(origin).hostname);
  } catch {
    return false;
  }
}

/**
 * Parse an origin into loopback client-id location parts.
 *
 * @param {string} origin - Deployment origin.
 * @returns {{ hostname: string, pathname: string, port: string }} Location parts.
 */
export function loopbackLocationFromOrigin(origin) {
  const url = new URL(origin);
  return {
    hostname: url.hostname,
    pathname: OAUTH_CALLBACK_PATH,
    port: url.port,
  };
}

/**
 * Format a loopback hostname for use in an HTTP redirect URI.
 *
 * IPv6 addresses are bracketed per RFC 3986 (`http://[::1]:port/...`).
 *
 * @param {string} hostname - Hostname from a parsed loopback origin.
 * @returns {string} Host string suitable for `http://{host}:{port}{path}`.
 */
export function loopbackHostForRedirectUri(hostname) {
  if (hostname === "::1" || hostname === "[::1]") {
    return "[::1]";
  }

  return hostname;
}

/**
 * Map a loopback hostname to the `localhost` argument for `buildLoopbackClientId`.
 *
 * @param {string} hostname - Hostname from a parsed loopback origin.
 * @returns {string} Host passed as the second argument to `buildLoopbackClientId`.
 */
export function loopbackHostForClientId(hostname) {
  if (hostname === "::1" || hostname === "[::1]") {
    return "::1";
  }

  return hostname;
}

/**
 * Resolve the deployment origin for OAuth client metadata.
 *
 * Prefers the browser location in client code; falls back to
 * `VITE_DEPLOYMENT_ORIGIN` for build-time generation.
 *
 * @returns {string} Deployment origin without trailing slash.
 * @throws {Error} When neither browser nor `VITE_DEPLOYMENT_ORIGIN` is available.
 */
export function getDeploymentOrigin() {
  if (typeof window !== "undefined" && window.location?.origin) {
    return normalizeOrigin(window.location.origin);
  }

  const envOrigin = import.meta.env.VITE_DEPLOYMENT_ORIGIN;
  if (typeof envOrigin === "string" && envOrigin.length > 0) {
    return normalizeOrigin(envOrigin);
  }

  throw new Error(
    "VITE_DEPLOYMENT_ORIGIN must be set when resolving OAuth metadata outside the browser",
  );
}

/**
 * Build the OAuth `client_id` for a deployment origin.
 *
 * Loopback origins use the atproto loopback client-id URL; production uses
 * `{origin}/oauth-client-metadata.json`.
 *
 * @param {string} origin - Deployment origin (e.g. `https://app.example.com`).
 * @returns {string} OAuth client identifier URL.
 */
export function getOAuthClientId(origin) {
  const normalized = normalizeOrigin(origin);

  if (isLoopbackOrigin(normalized)) {
    const location = loopbackLocationFromOrigin(normalized);
    const localhost = loopbackHostForClientId(location.hostname);
    return buildLoopbackClientId(location, localhost);
  }

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

  if (isLoopbackOrigin(normalized)) {
    const location = loopbackLocationFromOrigin(normalized);
    const host = loopbackHostForRedirectUri(location.hostname);
    const portSuffix = location.port ? `:${location.port}` : "";
    return `http://${host}${portSuffix}${OAUTH_CALLBACK_PATH}`;
  }

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

  return {
    client_id: getOAuthClientId(normalized),
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

/**
 * Canonical ADR-010 space `config` applied by HappyView when `net.atpix.gallery.createAlbum`
 * provisions a permissioned album space. The frontend does not send this payload directly.
 *
 * @returns {{ membershipPublic: boolean, recordsPublic: boolean }} Space config payload.
 */
export function buildSpaceConfig() {
  return {
    membershipPublic: false,
    recordsPublic: false,
  };
}
