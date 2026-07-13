/**
 * Resolve the active HappyView DPoP fetch handler for gallery XRPC calls.
 */

import { HappyViewBrowserClient, LocalStorageAdapter } from "@happyview/oauth-client-browser";

import { getClientKey, getHappyViewUrl } from "../api/happyview.js";
import { createTestFetchHandler, isTestGalleryStubEnabled } from "../gallery/testGalleryStub.js";
import {
  OAUTH_CLIENT_SCOPE,
  getDeploymentOrigin,
  getOAuthClientId,
  getOAuthRedirectUri,
} from "../config/oauthClientMetadata.js";

/** @type {((path: string, init?: RequestInit) => Promise<Response>) | null} */
let cachedFetchHandler = null;

/**
 * Clear the cached live-session fetch handler.
 *
 * @returns {void}
 */
export function clearHappyViewFetchHandlerCache() {
  cachedFetchHandler = null;
}

/**
 * Resolve the fetch handler used for authenticated HappyView XRPC calls.
 *
 * @returns {Promise<(path: string, init?: RequestInit) => Promise<Response>>} DPoP fetch handler.
 */
export async function getHappyViewFetchHandler() {
  if (isTestGalleryStubEnabled()) {
    if (!cachedFetchHandler) {
      cachedFetchHandler = createTestFetchHandler();
    }
    return cachedFetchHandler;
  }

  if (cachedFetchHandler) {
    return cachedFetchHandler;
  }

  const origin = getDeploymentOrigin();
  const browserClient = new HappyViewBrowserClient({
    instanceUrl: getHappyViewUrl(),
    clientId: getOAuthClientId(origin),
    clientKey: getClientKey() ?? "",
    redirectUri: getOAuthRedirectUri(origin),
    scopes: OAUTH_CLIENT_SCOPE,
    storage: new LocalStorageAdapter(),
  });

  const restored = await browserClient.init();
  const handler = restored?.session?.fetchHandler;
  if (typeof handler !== "function") {
    throw new Error("HappyView OAuth session is required for gallery operations");
  }

  cachedFetchHandler = handler;
  return handler;
}