import { beforeEach, describe, expect, it } from "vitest";

import {
  TEST_ALBUM_PERMISSIONED_KEY,
  TEST_ALBUM_SPACE_ADMIN_KEY,
  TEST_ALBUM_SPACE_DENIED_KEY,
} from "../../src/gallery/testGalleryStub.js";
import { spaceAdminHref } from "../../src/router/router.js";
import { loadProductionBuild } from "./helpers/loadProductionBuild.js";

const PERMISSIONED_ALBUM_URI = "at://did:plc:atpixuitest/net.atpix.gallery.album/1";

describe("Permissioned space admin UI (UI-SCR-006)", () => {
  beforeEach(() => {
    localStorage.setItem("atpix-test-signed-in", "true");
    localStorage.removeItem(TEST_ALBUM_PERMISSIONED_KEY);
    localStorage.removeItem(TEST_ALBUM_SPACE_ADMIN_KEY);
    localStorage.removeItem(TEST_ALBUM_SPACE_DENIED_KEY);
  });

  it("renders space header, metadata card, and member directory for owners", async () => {
    localStorage.setItem(TEST_ALBUM_SPACE_ADMIN_KEY, "true");
    await loadProductionBuild({
      url: `http://127.0.0.1:5173/${spaceAdminHref(PERMISSIONED_ALBUM_URI)}`,
    });

    const deadline = Date.now() + 3000;
    while (Date.now() < deadline) {
      const label = document.querySelector('[data-testid="space-permissioned-label"]');
      if (label?.textContent?.includes("Permissioned Space")) {
        expect(document.querySelector('[data-testid="space-admin-screen"]')).not.toBeNull();
        expect(document.querySelector('[data-testid="space-storage-description"]')?.textContent).toContain(
          "membership-gated",
        );
        expect(document.querySelector('[data-testid="space-storage-description"]')?.textContent).toContain(
          "not client-side encrypted",
        );
        expect(document.querySelector('[data-testid="space-export-logs"]')).not.toBeNull();
        expect(document.querySelector('[data-testid="space-share-access"]')).not.toBeNull();
        expect(document.querySelector('[data-testid="space-did"]')?.textContent).toContain("did:plc:space");
        expect(document.querySelector('[data-testid="space-record-type"]')?.textContent).toBe(
          "net.atpix.gallery.albumSpace",
        );
        expect(document.querySelector('[data-testid="space-gated-badge"]')?.textContent).toBe("Gated");
        expect(document.querySelectorAll('[data-testid="space-member-row"]').length).toBeGreaterThan(0);
        expect(document.querySelector('[data-testid="space-audit-trail"]')).not.toBeNull();
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    throw new Error("Space admin screen did not render");
  });

  it("keeps invite submit disabled for invalid handles and enables for valid handles", async () => {
    localStorage.setItem(TEST_ALBUM_SPACE_ADMIN_KEY, "true");
    await loadProductionBuild({
      url: `http://127.0.0.1:5173/${spaceAdminHref(PERMISSIONED_ALBUM_URI)}`,
    });

    const deadline = Date.now() + 3000;
    while (Date.now() < deadline) {
      const mounted = document.querySelector('[data-testid="space-invite-handle"]');
      if (mounted instanceof HTMLInputElement) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    const invalidInput = document.querySelector('[data-testid="space-invite-handle"]');
    if (!(invalidInput instanceof HTMLInputElement)) {
      throw new Error("Invite handle input did not mount");
    }

    invalidInput.value = "!!!";
    invalidInput.dispatchEvent(new Event("input", { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 350));
    expect(document.querySelector('[data-testid="space-invite-submit"]')?.hasAttribute("disabled")).toBe(
      true,
    );

    const validInput = document.querySelector('[data-testid="space-invite-handle"]');
    if (!(validInput instanceof HTMLInputElement)) {
      throw new Error("Invite handle input missing after invalid handle test");
    }

    validInput.value = "alice.bsky.social";
    validInput.dispatchEvent(new Event("input", { bubbles: true }));

    const enableDeadline = Date.now() + 2500;
    while (Date.now() < enableDeadline) {
      const submitEnabled = document
        .querySelector('[data-testid="space-invite-submit"]')
        ?.hasAttribute("disabled");
      if (submitEnabled === false) {
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    throw new Error("Invite submit did not enable after valid handle");
  });

  it("shows access denied without thumbnails for non-members", async () => {
    localStorage.setItem(TEST_ALBUM_SPACE_DENIED_KEY, "true");
    await loadProductionBuild({
      url: `http://127.0.0.1:5173/${spaceAdminHref(PERMISSIONED_ALBUM_URI)}`,
    });

    const deadline = Date.now() + 3000;
    while (Date.now() < deadline) {
      const denied = document.querySelector('[data-testid="space-access-denied"]');
      if (denied) {
        expect(document.querySelector('[data-testid="space-request-access-note"]')?.textContent).toContain(
          "PDS messaging",
        );
        expect(document.querySelector('[data-testid="space-member-row"]')).toBeNull();
        expect(document.querySelector('[data-testid="album-media-grid"]')).toBeNull();
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    throw new Error("Access denied panel did not render");
  });
});