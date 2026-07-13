import { breakpointFromWidth } from "../layout/breakpoint.js";

/** @constant {Record<string, number>} Gallery columns per layout breakpoint. */
const GRID_COLUMNS = {
  mobile: 2,
  tablet: 3,
  desktop: 4,
};

/**
 * Render a responsive gallery placeholder grid for shell layout verification.
 *
 * @param {object} options - Render options.
 * @param {HTMLElement} options.mount - DOM node to render into.
 * @param {string} options.route - Active shell route id.
 * @param {boolean} [options.showBadges] - Whether to render semantic status/C2PA badges.
 * @returns {void}
 */
export function renderRouteContent({ mount, route, showBadges = false }) {
  const titles = {
    gallery: "My Gallery",
    discovery: "Discovery",
    albums: "Albums",
    settings: "Settings",
  };

  const title = titles[route] ?? "My Gallery";
  const breakpoint = breakpointFromWidth(window.innerWidth);
  const columns = GRID_COLUMNS[breakpoint];
  const badges = showBadges
    ? `
      <div class="badge-samples" data-testid="badge-samples">
        <span class="status-chip status-chip--public" data-testid="badge-public">Public</span>
        <span class="status-chip status-chip--trusted" data-testid="badge-trusted">Trusted</span>
        <span class="status-chip status-chip--invalid" data-testid="badge-invalid">Invalid</span>
      </div>
    `
    : "";

  const settingsPanel =
    route === "settings"
      ? `
        <section class="settings-panel" data-testid="settings-appearance">
          <h3>Appearance</h3>
          <div class="scheme-segmented" role="group" aria-label="Color scheme">
            <button type="button" class="scheme-option" data-scheme="dark" data-testid="scheme-dark">Dark</button>
            <button type="button" class="scheme-option" data-scheme="light" data-testid="scheme-light">Light</button>
            <button type="button" class="scheme-option" data-scheme="system" data-testid="scheme-system">System</button>
          </div>
        </section>
      `
      : "";

  mount.innerHTML = `
    <section class="route-content" data-testid="route-content">
      <header class="route-header">
        <p class="label-caps">Personal archive</p>
        <h2 class="headline-md" data-testid="route-title">${title}</h2>
      </header>
      ${badges}
      ${settingsPanel}
      <div
        class="gallery-grid"
        data-testid="gallery-grid"
        data-columns="${columns}"
        data-breakpoint="${breakpoint}"
        aria-label="Gallery placeholder grid"
      >
        ${Array.from({ length: 8 }, (_, index) => `<div class="gallery-card" data-testid="gallery-card-${index + 1}"></div>`).join("")}
      </div>
    </section>
  `;
}

/**
 * Bind Settings appearance segmented controls.
 *
 * @param {HTMLElement} root - Shell root containing settings controls.
 * @param {(scheme: "dark" | "light" | "system") => void} onSchemeSelect - Preference handler.
 * @param {"dark" | "light" | "system"} activePreference - Current stored preference.
 * @returns {void}
 */
export function bindAppearanceControls(root, onSchemeSelect, activePreference) {
  const buttons = root.querySelectorAll("[data-scheme]");
  buttons.forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    const scheme = button.dataset.scheme;
    if (scheme === activePreference) {
      button.classList.add("scheme-option--active");
      button.setAttribute("aria-pressed", "true");
    }

    button.addEventListener("click", () => {
      if (scheme === "dark" || scheme === "light" || scheme === "system") {
        onSchemeSelect(scheme);
      }
    });
  });
}
