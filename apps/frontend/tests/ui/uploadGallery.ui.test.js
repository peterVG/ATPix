import { beforeEach, describe, expect, it } from "vitest";

import { loadProductionBuild } from "./helpers/loadProductionBuild.js";

describe("upload to gallery flow (SRS-F-002)", () => {
  beforeEach(async () => {
    localStorage.setItem("atpix-test-signed-in", "true");
    await loadProductionBuild({ url: "http://127.0.0.1:5173/#/upload" });
  });

  it("publishes a signed photo and surfaces it in My Gallery", async () => {
    const input = document.querySelector('[data-testid="upload-input"]');
    expect(input instanceof HTMLInputElement).toBe(true);

    const file = new File([new Uint8Array([0xff, 0xd8, 0xff, 0x00])], "gallery.jpg", {
      type: "image/jpeg",
    });
    Object.defineProperty(input, "files", { configurable: true, value: [file] });
    input.dispatchEvent(new Event("change", { bubbles: true }));

    let sawUploadProgress = false;
    const deadline = Date.now() + 5000;
    while (Date.now() < deadline) {
      if (document.querySelector('[data-testid="upload-progress"]')) {
        sawUploadProgress = true;
      }
      const complete = document.querySelector('[data-testid="upload-complete"]');
      if (complete) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    expect(sawUploadProgress).toBe(true);
    expect(document.querySelector('[data-testid="upload-complete"]')).not.toBeNull();

    window.location.hash = "/gallery";
    window.dispatchEvent(new HashChangeEvent("hashchange"));

    const galleryDeadline = Date.now() + 3000;
    while (Date.now() < galleryDeadline) {
      const card = document.querySelector('[data-testid="gallery-card"]');
      if (card) {
        expect(document.querySelector('[data-testid="gallery-empty"]')).toBeNull();
        expect(document.querySelector('[data-testid="badge-trusted"]')).not.toBeNull();
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    throw new Error("Uploaded photo did not appear in gallery grid");
  });
});