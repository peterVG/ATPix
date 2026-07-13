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
  const client = oauthClient ?? createOAuthClient();
  let identity = null;
  let route = parseRouteFromHash();
  let colorPreference = getStoredColorScheme();

  initColorScheme();
  const stopBreakpointWatch = watchLayoutBreakpoint();

  if (isOAuthCallbackPath()) {
    identity = await client.handleCallback();
    window.history.replaceState({}, "", `${window.location.origin}/#/gallery`);
    route = "gallery";
  } else {
    identity = await client.restoreSession();
  }

  const render = () => {
    mount.innerHTML = "";

    if (!identity) {
      renderSignInPanel({
        mount,
        happyviewUrl,
        onSignIn: async (handle) => {
          await client.signInRedirect(handle);
        },
      });
      return;
    }

    renderAppShell({
      mount,
      identity,
      route,
      colorPreference,
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
      },
      onSchemeSelect: (scheme) => {
        colorPreference = scheme;
        setColorSchemePreference(scheme);
        render();
      },
    });
  };

  onRouteChange((nextRoute) => {
    route = nextRoute;
    if (identity) {
      render();
    }
  });

  render();
  updateLayoutBreakpoint();
  return { identity, route, colorPreference, stopBreakpointWatch };
}

/**
 * @deprecated Use {@link bootstrapApp}. Retained for unit test compatibility.
 * @param {object} options - Render options.
 * @param {HTMLElement} options.mount - DOM node to render into.
 * @param {string} options.happyviewUrl - HappyView App View base URL.
 * @returns {void}
 */
export function renderApp({ mount, happyviewUrl }) {
  bootstrapApp({ mount, happyviewUrl }).catch((error) => {
    console.error("ATPix bootstrap failed", error);
    mount.innerHTML = `<p role="alert">Failed to start ATPix. Check console for details.</p>`;
  });
}
