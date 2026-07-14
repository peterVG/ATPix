import { afterEach, describe, expect, it, vi } from "vitest";

describe("getPdsSignupUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("returns trimmed URL without trailing slash when configured", async () => {
    vi.stubEnv("VITE_PDS_SIGNUP_URL", "https://pds.atpix.net/account/");
    const { getPdsSignupUrl } = await import("../../src/config/pdsSignup.js");
    expect(getPdsSignupUrl()).toBe("https://pds.atpix.net/account");
  });

  it("returns undefined when unset", async () => {
    vi.stubEnv("VITE_PDS_SIGNUP_URL", "");
    const { getPdsSignupUrl } = await import("../../src/config/pdsSignup.js");
    expect(getPdsSignupUrl()).toBeUndefined();
  });
});