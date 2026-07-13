/** @constant {Record<string, number>} Gallery columns per layout breakpoint. */
export const GRID_COLUMNS = {
  mobile: 2,
  tablet: 3,
  desktop: 4,
};

/**
 * Derive the layout breakpoint name from a viewport width.
 *
 * @param {number} width - Viewport width in pixels.
 * @returns {"mobile" | "tablet" | "desktop"} Breakpoint bucket per UI-SHELL-002.
 */
export function breakpointFromWidth(width) {
  if (width < 768) {
    return "mobile";
  }

  if (width < 1024) {
    return "tablet";
  }

  return "desktop";
}

/**
 * Apply the current viewport breakpoint to the document root.
 *
 * @returns {"mobile" | "tablet" | "desktop"} Applied breakpoint.
 */
export function updateLayoutBreakpoint() {
  const breakpoint = breakpointFromWidth(window.innerWidth);
  document.documentElement.dataset.breakpoint = breakpoint;
  return breakpoint;
}

/**
 * Keep gallery placeholder `data-columns` / `data-breakpoint` in sync with the root breakpoint.
 *
 * @returns {void}
 */
export function syncGalleryGridMetadata() {
  const grid = document.querySelector('[data-testid="gallery-grid"]');
  if (!grid) {
    return;
  }

  const breakpoint = document.documentElement.dataset.breakpoint || updateLayoutBreakpoint();
  grid.setAttribute("data-breakpoint", breakpoint);
  grid.setAttribute("data-columns", String(GRID_COLUMNS[breakpoint]));
}

/**
 * Close the mobile navigation panel when the viewport leaves the mobile breakpoint.
 *
 * @returns {void}
 */
export function closeMobileNavOutsideMobileBreakpoint() {
  if (document.documentElement.dataset.breakpoint === "mobile") {
    return;
  }

  const panel = document.querySelector('[data-testid="mobile-nav"]');
  const toggle = document.querySelector('[data-testid="mobile-menu-toggle"]');

  if (panel instanceof HTMLElement) {
    panel.hidden = true;
  }

  if (toggle instanceof HTMLButtonElement) {
    toggle.setAttribute("aria-expanded", "false");
  }
}

/**
 * Register a resize listener that keeps layout metadata in sync.
 *
 * @returns {() => void} Cleanup function.
 */
export function watchLayoutBreakpoint() {
  const handler = () => {
    updateLayoutBreakpoint();
    syncGalleryGridMetadata();
    closeMobileNavOutsideMobileBreakpoint();
  };

  window.addEventListener("resize", handler);
  handler();
  return () => window.removeEventListener("resize", handler);
}
