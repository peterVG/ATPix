import { OAUTH_CALLBACK_PATH } from "../config/oauthClientMetadata.js";
import { createOAuthClient } from "../auth/createOAuthClient.js";
import { navigateToRoute, onRouteChange, parseRouteFromHash } from "../router/router.js";
import {
  getStoredColorScheme,
  initColorScheme,
  setColorSchemePreference,
  toggleDarkLight,
} from "../theme/colorScheme.js";

import { updateLayoutBreakpoint, watchLayoutBreakpoint } from "../layout/breakpoint.js";

import { renderAppShell } from "./AppShell.js";
import { renderSignInPanel } from "./SignInPanel.js";

/**
 * Return true when the current path is the OAuth callback route.
 *
 * @returns {boolean} Whether OAuth callback handling should run.
 */
export function isOAuthCallbackPath() {
  return window.location.pathname === OAUTH_CALLBACK_PATH;
}

/**
 * Application view state used for shell re-rendering.
 *
 * @typedef {object} AppViewState
 * @property {{ did: string, handle?: string } | null} identity
 * @property {string} route
 * @property {"dark" | "light" | "system"} colorPreference
 * @property {() => void} teardown - Removes bootstrap listeners.
 */

/**
 * Bootstrap ATPix: theme, OAuth session, and shell rendering.
 *
 * @param {object} options - Bootstrap options.
 * @param {HTMLElement} options.mount - Root mount element (`#app`).
 * @param {string} options.happyviewUrl - HappyView base URL for sign-in copy.
 * @param {import("../auth/createOAuthClient.js").AppOAuthClient} [options.oauthClient] - Injectable OAuth client (tests).
 * @returns {Promise<AppViewState>} Current view state after bootstrap.
 */
export async function bootstrapApp({ mount, happyviewUrl, oauthClient }) {
  if (typeof globalThis.__ATPIX_TEARDOWN__ === "function") {
    globalThis.__ATPIX_TEARDOWN__();
    globalThis.__ATPIX_TEARDOWN__ = undefined;
  }

  const client = oauthClient ?? createOAuthClient();
  let identity = null;
  let route = parseRouteFromHash();
  let colorPreference = getStoredColorScheme();
  /** @type {(() => void) | null} */
  let destroyActivePanel = null;
  /** @type {() => void} */
  let render = () => {};

  const { stopSystemWatch } = initColorScheme(() => {
    if (identity) {
      render();
    }
  });
  const stopBreakpointWatch = watchLayoutBreakpoint();
  const stopRouteWatch = onRouteChange((nextRoute) => {
    route = nextRoute;
    if (identity) {
      render();
    }
  });

  const teardown = () => {
    destroyActivePanel?.();
    destroyActivePanel = null;
    stopSystemWatch();
    stopBreakpointWatch();
    stopRouteWatch();
  };

  if (import.meta.env.VITE_TEST_AUTH_STUB === "true") {
    globalThis.__ATPIX_TEARDOWN__ = teardown;
  }

  if (isOAuthCallbackPath()) {
    identity = await client.handleCallback();
    window.history.replaceState({}, "", `${window.location.origin}/#/gallery`);
    route = "gallery";
  } else {
    identity = await client.restoreSession();
  }

  render = () => {
    destroyActivePanel?.();
    destroyActivePanel = null;
    mount.innerHTML = "";

    if (!identity) {
      renderSignInPanel({
        mount,
        happyviewUrl,
        onSignIn: async (handle) => {
          await client.signIn(handle);
        },
      });
      return;
    }

    renderAppShell({
      mount,
      identity,
      route,
      colorPreference,
      registerPanelDestroy: (destroy) => {
        destroyActivePanel = destroy;
      },
      onNavigate: (nextRoute) => {
        navigateToRoute(nextRoute);
      },
      onSignOut: async () => {
        await client.signOut(identity.did);
        identity = null;
        render();
      },
      onThemeToggle: () => {
        toggleDarkLight();
        colorPreference = getStoredColorScheme();
      },
      onSchemeSelect: (scheme) => {
        colorPreference = scheme;
        setColorSchemePreference(scheme);
        render();
      },
    });
  };

  render();
  updateLayoutBreakpoint();
  return { identity, route, colorPreference, teardown };
}
