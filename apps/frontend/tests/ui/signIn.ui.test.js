import { describe, expect, it } from "vitest";

import { TEST_SIGNED_IN_KEY } from "../../src/auth/testAuthStub.js";

import { loadProductionBuild } from "./helpers/loadProductionBuild.js";

describe("SRS-F-001 sign-in panel (production build)", () => {
  it("renders sign-in form when test session bootstrap is disabled", async () => {
    localStorage.setItem(TEST_SIGNED_IN_KEY, "false");
    await loadProductionBuild({ url: "http://127.0.0.1:5173/" });

    expect(document.querySelector('[data-testid="sign-in-panel"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="sign-in-handle"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="app-shell"]')).toBeNull();
  });
});
