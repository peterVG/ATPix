import { describe, expect, it } from "vitest";

import { COLOR_SCHEME_STORAGE_KEY } from "../../src/theme/colorScheme.js";

import { loadProductionBuild } from "./helpers/loadProductionBuild.js";

describe("UI-SHELL-003 color scheme toggle (production build)", () => {
  it("defaults to dark theme when no preference is stored", async () => {
    localStorage.removeItem(COLOR_SCHEME_STORAGE_KEY);
    await loadProductionBuild({ url: "http://127.0.0.1:5173/#/gallery" });

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(getComputedStyle(document.body).backgroundColor).not.toBe("");
  });

  it("switches to light theme via header toggle and persists preference", async () => {
    await loadProductionBuild({ url: "http://127.0.0.1:5173/#/gallery" });

    const toggle = document.querySelector('[data-testid="theme-toggle"]');
    expect(toggle).not.toBeNull();
    toggle?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem(COLOR_SCHEME_STORAGE_KEY)).toBe("light");
  });

  it("preserves semantic badge colors in light mode", async () => {
    await loadProductionBuild({ url: "http://127.0.0.1:5173/#/gallery" });

    document
      .querySelector('[data-testid="theme-toggle"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    const publicBadge = document.querySelector('[data-testid="badge-public"]');
    const trustedBadge = document.querySelector('[data-testid="badge-trusted"]');
    const invalidBadge = document.querySelector('[data-testid="badge-invalid"]');

    expect(publicBadge).not.toBeNull();
    expect(trustedBadge).not.toBeNull();
    expect(invalidBadge).not.toBeNull();

    expect(publicBadge?.classList.contains("status-chip--public")).toBe(true);
    expect(trustedBadge?.classList.contains("status-chip--trusted")).toBe(true);
    expect(invalidBadge?.classList.contains("status-chip--invalid")).toBe(true);
    expect(
      getComputedStyle(document.documentElement).getPropertyValue("--status-public").trim(),
    ).toBe("#10b981");
    expect(
      getComputedStyle(document.documentElement).getPropertyValue("--c2pa-trusted").trim(),
    ).toBe("#10b981");
    expect(
      getComputedStyle(document.documentElement).getPropertyValue("--c2pa-invalid").trim(),
    ).toBe("#ef4444");
  });
});
