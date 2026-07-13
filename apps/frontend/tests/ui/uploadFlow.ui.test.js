import { beforeEach, describe, expect, it } from "vitest";

import { loadProductionBuild } from "./helpers/loadProductionBuild.js";

describe("upload flow UI (UI-SCR-005)", () => {
  beforeEach(async () => {
    localStorage.setItem("atpix-test-signed-in", "true");
    await loadProductionBuild({ url: "http://127.0.0.1:5173/#/upload" });
  });

  it("renders upload drop zone, format chips, and provenance sidebar", () => {
    expect(document.querySelector('[data-testid="upload-screen"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="upload-dropzone"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="upload-browse"]')?.textContent).toBe(
      "browse files",
    );
    expect(document.querySelectorAll('[data-testid="upload-format-chips"] .format-chip').length).toBe(
      3,
    );
    expect(document.querySelector('[data-testid="upload-signer-did"]')?.textContent).toContain(
      "ATPix will sign this photo as created by:",
    );
    expect(document.querySelector('[data-testid="upload-title-input"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="upload-caption-input"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="upload-tags-input"]')).not.toBeNull();
  });

  it("shows membership-gated destination wording without encryption claims", () => {
    const permissioned = document.querySelector('[data-testid="destination-permissioned"]');
    const label = permissioned?.closest("label");

    expect(document.querySelector('[data-testid="destination-public"]')).not.toBeNull();
    expect(label?.textContent).toContain("Permissioned Space");
    expect(label?.textContent?.toLowerCase()).toContain("membership-gated");
    expect(label?.textContent?.toLowerCase()).toContain("not encrypted");
  });

  it("exposes privacy opt-out controls and required-integrity note", () => {
    expect(document.querySelector('[data-testid="privacy-gps"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="privacy-device"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="privacy-required-note"]')?.textContent).toContain(
      "Required integrity assertions",
    );
    expect(document.querySelector('[data-testid="upload-c2pa-step"]')?.textContent).toContain(
      "C2PA signing runs before blob upload",
    );
  });

  it("marks signed queue items with a C2PA indicator after file selection", async () => {
    const input = document.querySelector('[data-testid="upload-input"]');
    expect(input instanceof HTMLInputElement).toBe(true);

    const file = new File([new Uint8Array([0xff, 0xd8, 0xff])], "sample.jpg", {
      type: "image/jpeg",
    });
    Object.defineProperty(input, "files", {
      configurable: true,
      value: [file],
    });
    input.dispatchEvent(new Event("change", { bubbles: true }));

    const deadline = Date.now() + 3000;
    while (Date.now() < deadline) {
      const badge = document.querySelector('[data-testid="upload-c2pa-badge"]');
      if (badge) {
        expect(badge.textContent).toBe("C2PA");
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    throw new Error("C2PA badge did not appear after stub signing");
  });
});