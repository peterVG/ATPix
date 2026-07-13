import { HappyViewBrowserClient, LocalStorageAdapter } from "@happyview/oauth-client-browser";

import { getClientKey, getHappyViewUrl } from "../api/happyview.js";
import {
  OAUTH_CLIENT_SCOPE,
  getDeploymentOrigin,
  getOAuthClientId,
  getOAuthRedirectUri,
} from "../config/oauthClientMetadata.js";

import {
  createTestSession,
  isTestAuthStubEnabled,
  shouldBootstrapTestSession,
} from "./testAuthStub.js";

/**
 * Minimal OAuth client interface used by the application shell.
 *
 * @typedef {object} AppOAuthClient
 * @property {() => Promise<{ did: string, handle?: string } | null>} restoreSession
 * @property {(handle: string) => Promise<void>} signIn
 * @property {() => Promise<{ did: string, handle?: string } | null>} handleCallback
 * @property {(did: string) => Promise<void>} signOut
 */

/**
 * Extract DID and handle from a HappyView session object.
 *
 * @param {object | null | undefined} session - OAuth session from the browser client.
 * @returns {{ did: string, handle?: string } | null} Identity summary or null.
 */
export function sessionIdentity(session) {
  if (!session || typeof session.did !== "string") {
    return null;
  }

  const handle = typeof session.handle === "string" ? session.handle : undefined;
  return { did: session.did, handle };
}

/**
 * Create a test stub OAuth client for UI vitest against production artifacts.
 *
 * @returns {AppOAuthClient} Stub client with deterministic session behavior.
 */
function createTestOAuthClient() {
  let active = createTestSession();

  return {
    async restoreSession() {
      if (!shouldBootstrapTestSession()) {
        active = null;
        return null;
      }

      if (!active) {
        active = createTestSession();
      }

      return active;
    },
    async signIn(_handle) {
      active = createTestSession();
    },
    async handleCallback() {
      active = createTestSession();
      return active;
    },
    async signOut(did) {
      if (active?.did === did) {
        active = null;
      }
    },
  };
}

/**
 * Create the browser OAuth client configured for the current deployment origin.
 *
 * @returns {AppOAuthClient} Live or test OAuth client.
 */
export function createOAuthClient() {
  if (isTestAuthStubEnabled()) {
    return createTestOAuthClient();
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

  return {
    async restoreSession() {
      const restored = await browserClient.init();
      return sessionIdentity(restored?.session);
    },
    async signIn(handle) {
      await browserClient.signIn(handle);
    },
    async handleCallback() {
      const result = await browserClient.initCallback();
      return sessionIdentity(result?.session);
    },
    async signOut(did) {
      await browserClient.logout(did);
    },
  };
}
