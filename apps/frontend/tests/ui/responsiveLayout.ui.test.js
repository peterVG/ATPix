import { describe, expect, it } from "vitest";

import { loadProductionBuild, resizeViewport } from "./helpers/loadProductionBuild.js";

describe("UI-SHELL-002 responsive layout (production build)", () => {
  it("uses a four-column gallery grid on desktop viewports", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1280 });
    await loadProductionBuild({ url: "http://127.0.0.1:5173/#/gallery" });
    resizeViewport(1280, 800);

    const grid = document.querySelector('[data-testid="gallery-grid"]');
    expect(grid?.getAttribute("data-columns")).toBe("4");
    expect(document.documentElement.dataset.breakpoint).toBe("desktop");
    expect(document.querySelector('[data-testid="app-sidebar"]')).not.toBeNull();
  });

  it("uses a three-column gallery grid on tablet viewports", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 900 });
    await loadProductionBuild({ url: "http://127.0.0.1:5173/#/gallery" });
    resizeViewport(900, 800);

    const grid = document.querySelector('[data-testid="gallery-grid"]');
    expect(grid?.getAttribute("data-columns")).toBe("3");
    expect(document.documentElement.dataset.breakpoint).toBe("tablet");
  });

  it("uses a two-column gallery grid and hides sidebar on mobile viewports", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 390 });
    await loadProductionBuild({ url: "http://127.0.0.1:5173/#/gallery" });
    resizeViewport(390, 800);

    const grid = document.querySelector('[data-testid="gallery-grid"]');
    expect(grid?.getAttribute("data-columns")).toBe("2");
    expect(document.documentElement.dataset.breakpoint).toBe("mobile");

    const sidebar = document.querySelector('[data-testid="app-sidebar"]');
    expect(sidebar).not.toBeNull();
    expect(getComputedStyle(sidebar).display).toBe("none");
    expect(document.querySelector('[data-testid="mobile-menu-toggle"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="mobile-sign-out"]')).not.toBeNull();
  });
});
