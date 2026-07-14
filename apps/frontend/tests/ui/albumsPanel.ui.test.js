import { beforeEach, describe, expect, it } from "vitest";

import { loadProductionBuild } from "./helpers/loadProductionBuild.js";

describe("Albums list UI (SRS-F-004)", () => {
  beforeEach(async () => {
    localStorage.setItem("atpix-test-signed-in", "true");
    await loadProductionBuild({ url: "http://127.0.0.1:5173/#/albums" });
  });

  it("renders album creation form with visibility chips", async () => {
    const deadline = Date.now() + 3000;
    while (Date.now() < deadline) {
      const screen = document.querySelector('[data-testid="albums-screen"]');
      if (screen) {
        expect(document.querySelector('[data-testid="albums-title"]')?.textContent).toBe("Albums");
        expect(document.querySelector('[data-testid="album-create-name"]')).not.toBeNull();
        expect(document.querySelector('[data-testid="album-visibility-public"]')).not.toBeNull();
        expect(document.querySelector('[data-testid="album-visibility-unlisted"]')).not.toBeNull();
        expect(document.querySelector('[data-testid="album-visibility-permissioned"]')).not.toBeNull();
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    throw new Error("Albums screen did not render");
  });

  it("creates a named album and navigates to album detail", async () => {
    const nameInput = document.querySelector('[data-testid="album-create-name"]');
    expect(nameInput instanceof HTMLInputElement).toBe(true);
    nameInput.value = "Summer Trip";
    nameInput.dispatchEvent(new Event("input", { bubbles: true }));

    document.querySelector('[data-testid="album-create-form"]')?.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true }),
    );

    const deadline = Date.now() + 3000;
    while (Date.now() < deadline) {
      const detail = document.querySelector('[data-testid="album-detail-screen"]');
      if (detail) {
        expect(document.querySelector('[data-testid="album-title"]')?.textContent).toBe("Summer Trip");
        expect(window.location.hash).toContain("/albums/");
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    throw new Error("Created album detail view did not render");
  });

  it("shows permissioned privacy disclosure without encryption claims", async () => {
    const permissionedChip = document.querySelector('[data-testid="album-visibility-permissioned"]');
    expect(permissionedChip).not.toBeNull();
    permissionedChip.dispatchEvent(new Event("click", { bubbles: true }));

    const deadline = Date.now() + 3000;
    while (Date.now() < deadline) {
      const disclosure = document.querySelector('[data-testid="album-permissioned-disclosure"]');
      if (disclosure) {
        expect(disclosure.textContent).toContain("membership-gated");
        expect(disclosure.textContent).toContain("not client-side encrypted");
        expect(disclosure.textContent?.toLowerCase()).not.toContain("encrypted vault");
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    throw new Error("Permissioned disclosure did not render");
  });
});