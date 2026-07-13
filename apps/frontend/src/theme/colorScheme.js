/** @constant {string} localStorage key for color scheme preference. */
export const COLOR_SCHEME_STORAGE_KEY = "atpix-color-scheme";

/** @constant {Set<string>} Allowed stored preference values. */
export const COLOR_SCHEME_VALUES = new Set(["dark", "light", "system"]);

/**
 * Read the stored color scheme preference.
 *
 * @returns {"dark" | "light" | "system"} Stored preference or `dark` when unset.
 */
export function getStoredColorScheme() {
  const stored = localStorage.getItem(COLOR_SCHEME_STORAGE_KEY);
  if (stored && COLOR_SCHEME_VALUES.has(stored)) {
    return stored;
  }

  return "dark";
}

/**
 * Resolve the effective theme from a stored preference.
 *
 * @param {"dark" | "light" | "system"} preference - Stored user preference.
 * @returns {"dark" | "light"} Theme applied to the document.
 */
export function resolveEffectiveTheme(preference) {
  if (preference === "system") {
    if (typeof window.matchMedia !== "function") {
      return "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return preference;
}

/**
 * Apply `data-theme` on the document root element.
 *
 * @param {"dark" | "light"} theme - Effective theme name.
 * @returns {void}
 */
export function applyDocumentTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

/**
 * Persist and apply a color scheme preference.
 *
 * @param {"dark" | "light" | "system"} preference - User-selected scheme.
 * @returns {"dark" | "light"} Effective theme after application.
 */
export function setColorSchemePreference(preference) {
  const normalized = COLOR_SCHEME_VALUES.has(preference) ? preference : "dark";
  localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, normalized);
  const effective = resolveEffectiveTheme(normalized);
  applyDocumentTheme(effective);
  return effective;
}

/**
 * Watch OS color-scheme changes while `system` preference is active.
 *
 * @param {(theme: "dark" | "light") => void} [onSystemChange] - Optional callback after theme updates.
 * @returns {() => void} Cleanup function removing the listener.
 */
export function watchSystemColorScheme(onSystemChange) {
  if (typeof window.matchMedia !== "function") {
    return () => {};
  }

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = () => {
    if (getStoredColorScheme() !== "system") {
      return;
    }

    const next = resolveEffectiveTheme("system");
    applyDocumentTheme(next);
    if (typeof onSystemChange === "function") {
      onSystemChange(next);
    }
  };

  media.addEventListener("change", handler);
  return () => media.removeEventListener("change", handler);
}

/**
 * Initialize theme from storage and watch system preference changes.
 *
 * @param {(theme: "dark" | "light") => void} [onSystemChange] - Callback when OS scheme changes while `system` is selected.
 * @returns {{ effective: "dark" | "light", stopSystemWatch: () => void }} Applied theme and cleanup.
 */
export function initColorScheme(onSystemChange) {
  const preference = getStoredColorScheme();
  const effective = setColorSchemePreference(preference);
  const stopSystemWatch = watchSystemColorScheme(onSystemChange);
  return { effective, stopSystemWatch };
}

/**
 * Toggle between dark and light appearance (header quick action).
 *
 * @returns {"dark" | "light"} Stored preference after toggle.
 */
export function toggleDarkLight() {
  const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
  const next = current === "dark" ? "light" : "dark";
  setColorSchemePreference(next);
  return next;
}
