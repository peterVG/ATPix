import { describe, expect, it } from "vitest";

import { COLOR_SCHEME_STORAGE_KEY } from "../../src/theme/colorScheme.js";
import { TEST_GALLERY_MANY_KEY } from "../../src/gallery/testGalleryStub.js";

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
    localStorage.setItem(TEST_GALLERY_MANY_KEY, "true");
    await loadProductionBuild({ url: "http://127.0.0.1:5173/#/gallery" });

    const deadline = Date.now() + 3000;
    while (Date.now() < deadline) {
      if (document.querySelector('[data-testid="gallery-card"]')) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    document
      .querySelector('[data-testid="theme-toggle"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    const trustedBadge = document.querySelector('[data-testid="badge-trusted"]');
    const validBadge = document.querySelector('[data-testid="badge-valid"]');

    expect(trustedBadge).not.toBeNull();
    expect(validBadge).not.toBeNull();
    expect(trustedBadge?.classList.contains("status-chip--trusted")).toBe(true);
    expect(validBadge?.classList.contains("status-chip--wellformed")).toBe(true);
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
