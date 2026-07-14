import { beforeEach, describe, expect, it } from "vitest";

import { CAPTION_MAX_LENGTH } from "../../src/gallery/captionLimits.js";
import { loadProductionBuild } from "./helpers/loadProductionBuild.js";

describe("Caption and tag editing UI (SRS-F-005)", () => {
  beforeEach(async () => {
    localStorage.setItem("atpix-test-signed-in", "true");
    await loadProductionBuild({ url: "http://127.0.0.1:5173/#/upload" });
  });

  it("opens caption editor from gallery card and saves updated caption", async () => {
    const input = document.querySelector('[data-testid="upload-input"]');
    expect(input instanceof HTMLInputElement).toBe(true);

    const file = new File([new Uint8Array([0xff, 0xd8, 0xff, 0x00])], "caption.jpg", {
      type: "image/jpeg",
    });
    Object.defineProperty(input, "files", { configurable: true, value: [file] });
    input.dispatchEvent(new Event("change", { bubbles: true }));

    const uploadDeadline = Date.now() + 5000;
    while (Date.now() < uploadDeadline) {
      if (document.querySelector('[data-testid="upload-complete"]')) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    window.location.hash = "/gallery";
    window.dispatchEvent(new HashChangeEvent("hashchange"));

    const galleryDeadline = Date.now() + 3000;
    while (Date.now() < galleryDeadline) {
      const card = document.querySelector('[data-testid="gallery-card"]');
      if (card) {
        card.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    const editor = document.querySelector('[data-testid="caption-editor"]');
    expect(editor).not.toBeNull();

    const captionInput = document.querySelector('[data-testid="caption-editor-input"]');
    expect(captionInput instanceof HTMLTextAreaElement).toBe(true);
    captionInput.value = "Sunset at the lake";
    captionInput.dispatchEvent(new Event("input", { bubbles: true }));

    const tagInput = document.querySelector('[data-testid="caption-tag-input"]');
    expect(tagInput instanceof HTMLInputElement).toBe(true);
    tagInput.value = "nature";
    tagInput.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));

    document.querySelector('[data-testid="caption-editor-save"]')?.dispatchEvent(
      new MouseEvent("click", { bubbles: true }),
    );

    const saveDeadline = Date.now() + 3000;
    while (Date.now() < saveDeadline) {
      if (!document.querySelector('[data-testid="caption-editor"]')) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    expect(document.querySelector('[data-testid="caption-editor"]')).toBeNull();

    const card = document.querySelector('[data-testid="gallery-card"]');
    expect(card).not.toBeNull();
    card?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    const reopenDeadline = Date.now() + 2000;
    while (Date.now() < reopenDeadline) {
      const reopened = document.querySelector('[data-testid="caption-editor-input"]');
      if (reopened instanceof HTMLTextAreaElement && reopened.value === "Sunset at the lake") {
        expect(document.querySelectorAll('[data-testid="caption-tag-pill"]').length).toBe(1);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    throw new Error("Saved caption did not persist in the editor");
  });

  it("shows validation error when caption exceeds 2000 characters", async () => {
    const input = document.querySelector('[data-testid="upload-input"]');
    expect(input instanceof HTMLInputElement).toBe(true);

    const file = new File([new Uint8Array([0xff, 0xd8, 0xff, 0x00])], "long-caption.jpg", {
      type: "image/jpeg",
    });
    Object.defineProperty(input, "files", { configurable: true, value: [file] });
    input.dispatchEvent(new Event("change", { bubbles: true }));

    const uploadDeadline = Date.now() + 5000;
    while (Date.now() < uploadDeadline) {
      if (document.querySelector('[data-testid="upload-complete"]')) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    window.location.hash = "/gallery";
    window.dispatchEvent(new HashChangeEvent("hashchange"));

    const galleryDeadline = Date.now() + 3000;
    while (Date.now() < galleryDeadline) {
      const card = document.querySelector('[data-testid="gallery-card"]');
      if (card) {
        card.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    const captionInput = document.querySelector('[data-testid="caption-editor-input"]');
    expect(captionInput instanceof HTMLTextAreaElement).toBe(true);
    captionInput.value = "x".repeat(CAPTION_MAX_LENGTH + 1);
    captionInput.dispatchEvent(new Event("input", { bubbles: true }));

    document.querySelector('[data-testid="caption-editor-save"]')?.dispatchEvent(
      new MouseEvent("click", { bubbles: true }),
    );

    const errorDeadline = Date.now() + 2000;
    while (Date.now() < errorDeadline) {
      const error = document.querySelector('[data-testid="caption-editor-error"]');
      if (error) {
        expect(error.textContent).toContain("2000");
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    throw new Error("Caption length validation error did not render");
  });
});