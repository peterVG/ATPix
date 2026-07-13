import { routeHref } from "../router/router.js";

import { bindAppearanceControls, renderRouteContent } from "./GalleryPlaceholder.js";

/**
 * Render the authenticated application shell (UI-SHELL-001).
 *
 * @param {object} options - Render options.
 * @param {HTMLElement} options.mount - DOM node to render into.
 * @param {{ did: string, handle?: string }} options.identity - Signed-in user identity.
 * @param {string} options.route - Active route id.
 * @param {"dark" | "light" | "system"} options.colorPreference - Stored color scheme preference.
 * @param {(route: string) => void} options.onNavigate - Route navigation handler.
 * @param {() => void} options.onSignOut - Sign-out handler.
 * @param {() => void} options.onThemeToggle - Header theme toggle handler.
 * @param {(scheme: "dark" | "light" | "system") => void} options.onSchemeSelect - Settings appearance handler.
 * @returns {HTMLElement} Shell root element.
 */
export function renderAppShell({
  mount,
  identity,
  route,
  colorPreference,
  onNavigate,
  onSignOut,
  onThemeToggle,
  onSchemeSelect,
}) {
  const displayHandle = identity.handle ? `@${identity.handle}` : identity.did;
  const navItems = ["gallery", "discovery", "albums"]
    .map((item) => {
      const active = item === route ? " nav-tab--active" : "";
      const label = item.charAt(0).toUpperCase() + item.slice(1);
      return `<a class="nav-tab${active}" href="${routeHref(item)}" data-testid="nav-${item}" data-route="${item}">${label}</a>`;
    })
    .join("");

  mount.innerHTML = `
    <div class="app-shell" data-testid="app-shell">
      <header class="app-header" data-testid="app-header">
        <div class="app-header__left">
          <span class="wordmark" data-testid="wordmark">ATPix</span>
        </div>
        <nav class="app-header__nav" aria-label="Primary" data-testid="primary-nav">
          ${navItems}
        </nav>
        <div class="app-header__utilities" data-testid="header-utilities">
          <button
            type="button"
            class="icon-btn"
            data-testid="theme-toggle"
            aria-label="Toggle color scheme"
            title="Toggle color scheme"
          >◐</button>
          <button type="button" class="icon-btn" data-testid="header-search" aria-label="Search">⌕</button>
          <button type="button" class="icon-btn" data-testid="header-upload" aria-label="Upload">↑</button>
          <button type="button" class="icon-btn" data-testid="header-notifications" aria-label="Notifications">◉</button>
          <span class="avatar-chip" data-testid="header-avatar" aria-label="Account">${displayHandle.charAt(0).toUpperCase()}</span>
        </div>
      </header>
      <div class="app-body">
        <aside class="app-sidebar" data-testid="app-sidebar">
          <div class="identity-card" data-testid="identity-card">
            <p class="label-caps">Protocol identity</p>
            <p class="identity-handle metadata-code" data-testid="identity-handle">${displayHandle}</p>
            <p class="identity-did metadata-code" data-testid="identity-did">${identity.did}</p>
          </div>
          <nav class="sidebar-nav" aria-label="Sidebar" data-testid="sidebar-nav">
            <a href="${routeHref("gallery")}" data-route="gallery">Home</a>
            <a href="${routeHref("discovery")}" data-route="discovery">Trending</a>
            <a href="${routeHref("albums")}" data-route="albums">Collections</a>
            <a href="${routeHref("settings")}" data-route="settings">Settings</a>
          </nav>
          <div class="sidebar-actions">
            <button type="button" class="btn btn-primary btn-block" data-testid="sidebar-upload">Upload Media</button>
            <button type="button" class="btn btn-ghost btn-block" data-testid="sign-out">Sign Out</button>
          </div>
        </aside>
        <main class="app-main" data-testid="app-main"></main>
      </div>
    </div>
  `;

  const shell = mount.querySelector('[data-testid="app-shell"]');
  if (!(shell instanceof HTMLElement)) {
    return mount;
  }

  shell.querySelector('[data-testid="theme-toggle"]')?.addEventListener("click", onThemeToggle);
  shell.querySelector('[data-testid="sign-out"]')?.addEventListener("click", onSignOut);

  shell.querySelectorAll("[data-route]").forEach((element) => {
    element.addEventListener("click", (event) => {
      if (!(element instanceof HTMLAnchorElement)) {
        return;
      }

      event.preventDefault();
      const nextRoute = element.dataset.route;
      if (nextRoute) {
        onNavigate(nextRoute);
      }
    });
  });

  const main = shell.querySelector('[data-testid="app-main"]');
  if (main instanceof HTMLElement) {
    renderRouteContent({
      mount: main,
      route,
      showBadges: route === "gallery",
    });

    if (route === "settings") {
      bindAppearanceControls(shell, onSchemeSelect, colorPreference);
    }
  }

  return shell;
}
