import { describe, expect, it } from "vitest";

import { loadProductionBuild } from "./helpers/loadProductionBuild.js";

describe("UI-SHELL-001 application chrome (production build)", () => {
  it("renders header navigation, utilities, and sidebar identity without DOM errors", async () => {
    await loadProductionBuild({ url: "http://127.0.0.1:5173/#/gallery" });

    const shell = document.querySelector('[data-testid="app-shell"]');
    expect(shell).not.toBeNull();

    expect(document.querySelector('[data-testid="wordmark"]')?.textContent).toBe("ATPix");
    expect(document.querySelector('[data-testid="nav-gallery"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="nav-discovery"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="nav-albums"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="theme-toggle"]')?.getAttribute("aria-label")).toBe(
      "Toggle color scheme",
    );
    expect(document.querySelector('[data-testid="header-search"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="header-upload"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="header-notifications"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="header-avatar"]')).not.toBeNull();

    expect(document.querySelector('[data-testid="identity-handle"]')?.textContent).toContain("@");
    expect(document.querySelector('[data-testid="identity-did"]')?.textContent).toContain("did:");
    expect(document.querySelector('[data-testid="sidebar-upload"]')?.textContent).toBe(
      "Upload Media",
    );
    expect(document.querySelector('[data-testid="sign-out"]')?.textContent).toBe("Sign Out");
  });

  it("navigates to the upload workspace from header and sidebar controls", async () => {
    await loadProductionBuild({ url: "http://127.0.0.1:5173/#/gallery" });

    const waitForUploadScreen = async () => {
      const deadline = Date.now() + 3000;
      while (Date.now() < deadline) {
        if (document.querySelector('[data-testid="upload-screen"]')) {
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 25));
      }
      throw new Error("Upload screen did not render after navigation");
    };

    document.querySelector('[data-testid="header-upload"]')?.dispatchEvent(
      new MouseEvent("click", { bubbles: true }),
    );

    expect(window.location.hash).toBe("#/upload");
    await waitForUploadScreen();

    window.location.hash = "#/gallery";
    await new Promise((resolve) => setTimeout(resolve, 50));

    document.querySelector('[data-testid="sidebar-upload"]')?.dispatchEvent(
      new MouseEvent("click", { bubbles: true }),
    );

    expect(window.location.hash).toBe("#/upload");
    await waitForUploadScreen();
  });

  it("marks the active route tab when navigating to Discovery", async () => {
    await loadProductionBuild({ url: "http://127.0.0.1:5173/#/discovery" });

    expect(
      document
        .querySelector('[data-testid="nav-discovery"]')
        ?.classList.contains("nav-tab--active"),
    ).toBe(true);
    expect(
      document.querySelector('[data-testid="nav-gallery"]')?.classList.contains("nav-tab--active"),
    ).toBe(false);
  });
});
