import { describe, expect, it } from "vitest";

import { renderSignInPanel } from "../../src/components/SignInPanel.js";

describe("renderSignInPanel", () => {
  it("renders PDS signup link when pdsSignupUrl is provided", () => {
    const mount = document.createElement("div");

    renderSignInPanel({
      mount,
      happyviewUrl: "http://127.0.0.1:3001",
      pdsSignupUrl: "https://pds.atpix.net/account",
      onSignIn: async () => {},
    });

    const link = mount.querySelector('[data-testid="pds-signup-link"]');
    expect(link).not.toBeNull();
    expect(link?.getAttribute("href")).toBe("https://pds.atpix.net/account");
  });

  it("omits PDS signup link when pdsSignupUrl is unset", () => {
    const mount = document.createElement("div");

    renderSignInPanel({
      mount,
      happyviewUrl: "http://127.0.0.1:3001",
      onSignIn: async () => {},
    });

    expect(mount.querySelector('[data-testid="pds-signup-cta"]')).toBeNull();
  });
});