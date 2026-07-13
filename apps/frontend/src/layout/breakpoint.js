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
 * Register a resize listener that keeps `data-breakpoint` in sync.
 *
 * @returns {() => void} Cleanup function.
 */
export function watchLayoutBreakpoint() {
  const handler = () => updateLayoutBreakpoint();
  window.addEventListener("resize", handler);
  updateLayoutBreakpoint();
  return () => window.removeEventListener("resize", handler);
}