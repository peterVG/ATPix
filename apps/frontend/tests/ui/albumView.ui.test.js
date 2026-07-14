import { beforeEach, describe, expect, it } from "vitest";

import {
  TEST_ALBUM_PERMISSIONED_KEY,
  TEST_ALBUM_PUBLIC_KEY,
} from "../../src/gallery/testGalleryStub.js";
import { albumDetailHref } from "../../src/router/router.js";
import { loadProductionBuild } from "./helpers/loadProductionBuild.js";

const PUBLIC_ALBUM_URI = "at://did:plc:atpixuitest/net.atpix.gallery.album/1";
const PERMISSIONED_ALBUM_URI = "at://did:plc:atpixuitest/net.atpix.gallery.album/1";

describe("Album view UI (UI-SCR-004)", () => {
  beforeEach(() => {
    localStorage.setItem("atpix-test-signed-in", "true");
    localStorage.removeItem(TEST_ALBUM_PERMISSIONED_KEY);
    localStorage.removeItem(TEST_ALBUM_PUBLIC_KEY);
  });

  it("shows permissioned badge, space URI, and invite action", async () => {
    localStorage.setItem(TEST_ALBUM_PERMISSIONED_KEY, "true");
    await loadProductionBuild({
      url: `http://127.0.0.1:5173/${albumDetailHref(PERMISSIONED_ALBUM_URI)}`,
    });

    const deadline = Date.now() + 3000;
    while (Date.now() < deadline) {
      const badge = document.querySelector('[data-testid="album-visibility-badge"]');
      if (badge?.textContent === "Permissioned") {
        expect(document.querySelector('[data-testid="album-detail-screen"]')).not.toBeNull();
        expect(document.querySelector('[data-testid="album-at-uri"]')?.textContent).toBe(
          PERMISSIONED_ALBUM_URI,
        );
        expect(document.querySelector('[data-testid="album-invite-members"]')?.textContent).toContain(
          "Invite Members",
        );
        expect(document.querySelector('[data-testid="album-space-uri"]')).not.toBeNull();
        expect(document.querySelector('[data-testid="album-share-link"]')).toBeNull();
        expect(document.querySelector('[data-testid="album-tab-all"]')).not.toBeNull();
        expect(document.querySelector('[data-testid="album-tab-verified"]')).not.toBeNull();
        expect(document.querySelector('[data-testid="album-tab-collaborators"]')).not.toBeNull();
        expect(document.querySelector('[data-testid="album-provenance-summary"]')?.textContent).toContain(
          "Trusted",
        );
        expect(document.querySelector('[data-testid="album-destroy"]')).not.toBeNull();
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    throw new Error("Permissioned album detail did not render");
  });

  it("hides permissioned-only controls on public albums and shows share link", async () => {
    localStorage.setItem(TEST_ALBUM_PUBLIC_KEY, "true");
    await loadProductionBuild({
      url: `http://127.0.0.1:5173/${albumDetailHref(PUBLIC_ALBUM_URI)}`,
    });

    const deadline = Date.now() + 3000;
    while (Date.now() < deadline) {
      const badge = document.querySelector('[data-testid="album-visibility-badge"]');
      if (badge?.textContent === "Public") {
        expect(document.querySelector('[data-testid="album-invite-members"]')).toBeNull();
        expect(document.querySelector('[data-testid="album-space-uri"]')).toBeNull();
        expect(document.querySelector('[data-testid="album-share-link"]')).not.toBeNull();
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    throw new Error("Public album detail did not render");
  });

  it("filters verified media when Verified Only tab is selected", async () => {
    localStorage.setItem(TEST_ALBUM_PERMISSIONED_KEY, "true");
    await loadProductionBuild({
      url: `http://127.0.0.1:5173/${albumDetailHref(PERMISSIONED_ALBUM_URI)}`,
    });

    const deadline = Date.now() + 3000;
    let verifiedTab = null;
    while (Date.now() < deadline) {
      verifiedTab = document.querySelector('[data-testid="album-tab-verified"]');
      if (verifiedTab) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    expect(verifiedTab).not.toBeNull();
    verifiedTab?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    const filterDeadline = Date.now() + 2000;
    while (Date.now() < filterDeadline) {
      const cards = document.querySelectorAll('[data-testid="album-media-grid"] [data-testid="gallery-card"]');
      if (cards.length === 1) {
        expect(document.querySelector('[data-testid="badge-trusted"]')).not.toBeNull();
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    throw new Error("Verified Only tab did not filter album grid");
  });

  it("requires confirmation before destroying an album", async () => {
    localStorage.setItem(TEST_ALBUM_PUBLIC_KEY, "true");
    await loadProductionBuild({
      url: `http://127.0.0.1:5173/${albumDetailHref(PUBLIC_ALBUM_URI)}`,
    });

    const deadline = Date.now() + 3000;
    let destroyButton = null;
    while (Date.now() < deadline) {
      destroyButton = document.querySelector('[data-testid="album-destroy"]');
      if (destroyButton) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    expect(destroyButton).not.toBeNull();
    destroyButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(document.querySelector('[data-testid="destroy-album-dialog"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="destroy-album-confirm"]')).not.toBeNull();
  });
});