import { beforeEach, describe, expect, it } from "vitest";

import { TEST_GALLERY_MANY_KEY } from "../../src/gallery/testGalleryStub.js";
import { loadProductionBuild } from "./helpers/loadProductionBuild.js";

describe("My Gallery UI (UI-SCR-001)", () => {
  beforeEach(async () => {
    localStorage.setItem("atpix-test-signed-in", "true");
    localStorage.removeItem(TEST_GALLERY_MANY_KEY);
    await loadProductionBuild({ url: "http://127.0.0.1:5173/#/gallery" });
  });

  it("renders Personal Archive header, toolbar, and empty-state guidance", async () => {
    const deadline = Date.now() + 3000;
    while (Date.now() < deadline) {
      const empty = document.querySelector('[data-testid="gallery-empty"]');
      const error = document.querySelector('[data-testid="gallery-error"]');
      if (empty || error) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    expect(document.querySelector('[data-testid="gallery-screen"]')).not.toBeNull();
    expect(
      document.querySelector('[data-testid="gallery-screen"] .label-caps')?.textContent,
    ).toBe("Personal archive");
    expect(document.querySelector('[data-testid="gallery-title"]')?.textContent).toBe("My Gallery");
    expect(document.querySelector('[data-testid="gallery-search"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="gallery-search"]')?.getAttribute("placeholder")).toBe(
      "Search your vault…",
    );
    expect(document.querySelector('[data-testid="gallery-upload"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="gallery-error"]')).toBeNull();
    expect(document.querySelector('[data-testid="gallery-empty"]')?.textContent).toContain(
      "Upload your first photo",
    );
  });

  it("shows pagination controls when more than twenty photos exist", async () => {
    localStorage.setItem(TEST_GALLERY_MANY_KEY, "true");
    await loadProductionBuild({ url: "http://127.0.0.1:5173/#/gallery" });

    const deadline = Date.now() + 3000;
    while (Date.now() < deadline) {
      const next = document.querySelector('[data-testid="gallery-page-next"]');
      if (next && !next.hasAttribute("disabled")) {
        expect(document.querySelector('[data-testid="gallery-page-prev"]')).not.toBeNull();
        expect(document.querySelectorAll('[data-testid="gallery-card"]').length).toBe(20);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    throw new Error("Gallery pagination controls did not render");
  });
});