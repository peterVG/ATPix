import { routeHref } from "../router/router.js";
import { escapeHtml } from "../utils/html.js";

import { renderGalleryPanel } from "./GalleryPanel.js";
import { bindAppearanceControls, renderRouteContent } from "./GalleryPlaceholder.js";
import { renderUploadPanel } from "./UploadPanel.js";

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
 * @param {(destroy: () => void) => void} [options.registerPanelDestroy] - Panel teardown registrar.
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
  registerPanelDestroy,
}) {
  const displayHandle = identity.handle ? `@${identity.handle}` : identity.did;
  const safeHandle = escapeHtml(displayHandle);
  const safeDid = escapeHtml(identity.did);
  const avatarInitial = escapeHtml(displayHandle.charAt(0).toUpperCase());

  const primaryRoutes = ["gallery", "discovery", "albums"];
  const navItems = primaryRoutes
    .map((item) => {
      const active = item === route;
      const activeClass = active ? " nav-tab--active" : "";
      const ariaCurrent = active ? ' aria-current="page"' : "";
      const label = item.charAt(0).toUpperCase() + item.slice(1);
      return `<a class="nav-tab${activeClass}" href="${routeHref(item)}" data-testid="nav-${item}" data-route="${item}"${ariaCurrent}>${label}</a>`;
    })
    .join("");

  const mobileNavItems = [...primaryRoutes, "settings"]
    .map((item) => {
      const label =
        item === "gallery"
          ? "Home"
          : item === "discovery"
            ? "Trending"
            : item === "albums"
              ? "Collections"
              : "Settings";
      return `<a href="${routeHref(item)}" data-route="${item}" data-testid="mobile-nav-${item}">${label}</a>`;
    })
    .join("");

  mount.innerHTML = `
    <div class="app-shell" data-testid="app-shell">
      <header class="app-header" data-testid="app-header">
        <div class="app-header__left">
          <button
            type="button"
            class="mobile-menu-btn"
            data-testid="mobile-menu-toggle"
            aria-label="Open navigation menu"
            aria-expanded="false"
            aria-controls="mobile-nav-panel"
          >☰</button>
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
          <span class="avatar-chip" data-testid="header-avatar" aria-label="Account">${avatarInitial}</span>
        </div>
      </header>
      <nav
        id="mobile-nav-panel"
        class="mobile-nav-panel"
        data-testid="mobile-nav"
        aria-label="Mobile navigation"
        hidden
      >
        ${mobileNavItems}
        <button type="button" class="btn btn-ghost btn-block" data-testid="mobile-sign-out">Sign Out</button>
      </nav>
      <div class="app-body">
        <aside class="app-sidebar" data-testid="app-sidebar">
          <div class="identity-card" data-testid="identity-card">
            <p class="label-caps">Protocol identity</p>
            <p class="identity-handle metadata-code" data-testid="identity-handle">${safeHandle}</p>
            <p class="identity-did metadata-code" data-testid="identity-did">${safeDid}</p>
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

  const openUpload = () => onNavigate("upload");

  shell.querySelector('[data-testid="theme-toggle"]')?.addEventListener("click", onThemeToggle);
  shell.querySelector('[data-testid="header-upload"]')?.addEventListener("click", openUpload);
  shell.querySelector('[data-testid="sidebar-upload"]')?.addEventListener("click", openUpload);
  shell.querySelector('[data-testid="sign-out"]')?.addEventListener("click", onSignOut);
  shell.querySelector('[data-testid="mobile-sign-out"]')?.addEventListener("click", onSignOut);

  const mobileToggle = shell.querySelector('[data-testid="mobile-menu-toggle"]');
  const mobilePanel = shell.querySelector('[data-testid="mobile-nav"]');
  mobileToggle?.addEventListener("click", () => {
    if (!(mobilePanel instanceof HTMLElement) || !(mobileToggle instanceof HTMLButtonElement)) {
      return;
    }

    const isOpen = !mobilePanel.hidden;
    mobilePanel.hidden = isOpen;
    mobileToggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
  });

  shell.querySelectorAll("[data-route]").forEach((element) => {
    element.addEventListener("click", (event) => {
      if (!(element instanceof HTMLAnchorElement)) {
        return;
      }

      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      event.preventDefault();
      const nextRoute = element.dataset.route;
      if (nextRoute) {
        if (mobilePanel instanceof HTMLElement) {
          mobilePanel.hidden = true;
        }
        if (mobileToggle instanceof HTMLButtonElement) {
          mobileToggle.setAttribute("aria-expanded", "false");
        }
        onNavigate(nextRoute);
      }
    });
  });

  const main = shell.querySelector('[data-testid="app-main"]');
  if (main instanceof HTMLElement) {
    if (route === "upload") {
      renderUploadPanel({ mount: main, identity });
    } else if (route === "gallery") {
      const panel = renderGalleryPanel({
        mount: main,
        identity,
        onUpload: openUpload,
      });
      registerPanelDestroy?.(panel.destroy);
    } else {
      renderRouteContent({
        mount: main,
        route,
        showBadges: false,
      });
    }

    if (route === "settings") {
      bindAppearanceControls(shell, onSchemeSelect, colorPreference);
    }
  }

  return shell;
}
