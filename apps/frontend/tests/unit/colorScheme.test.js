import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  COLOR_SCHEME_STORAGE_KEY,
  getStoredColorScheme,
  initColorScheme,
  resolveEffectiveTheme,
  setColorSchemePreference,
  toggleDarkLight,
  watchSystemColorScheme,
} from "../../src/theme/colorScheme.js";

describe("colorScheme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.dataset.theme = "dark";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("defaults to dark when no preference is stored", () => {
    expect(getStoredColorScheme()).toBe("dark");
  });

  it("persists preference in localStorage", () => {
    setColorSchemePreference("light");
    expect(localStorage.getItem(COLOR_SCHEME_STORAGE_KEY)).toBe("light");
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("resolves system preference from matchMedia", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    expect(resolveEffectiveTheme("system")).toBe("dark");
  });

  it("toggles between dark and light", () => {
    setColorSchemePreference("dark");
    expect(toggleDarkLight()).toBe("light");
    expect(toggleDarkLight()).toBe("dark");
  });

  it("initializes theme from stored preference", () => {
    localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, "light");
    const { effective } = initColorScheme();
    expect(effective).toBe("light");
  });

  it("registers a system preference listener even without a callback", () => {
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: false,
      addEventListener,
      removeEventListener,
    });

    setColorSchemePreference("system");
    const stop = watchSystemColorScheme();
    expect(addEventListener).toHaveBeenCalled();
    stop();
    expect(removeEventListener).toHaveBeenCalled();
  });
});
