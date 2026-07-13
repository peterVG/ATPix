import { afterEach, describe, expect, it, vi } from "vitest";

import { DEFAULT_BACKEND_URL, getBackendUrl } from "../../src/api/backend.js";

describe("getBackendUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns the configured backend URL without trailing slash", () => {
    vi.stubEnv("VITE_BACKEND_URL", "http://localhost:3000/");
    expect(getBackendUrl()).toBe("http://localhost:3000");
  });

  it("falls back to the local development default outside production builds", () => {
    vi.stubEnv("VITE_BACKEND_URL", "");
    vi.stubEnv("PROD", false);
    expect(getBackendUrl()).toBe(DEFAULT_BACKEND_URL);
  });

  it("requires VITE_BACKEND_URL in production builds", () => {
    vi.stubEnv("VITE_BACKEND_URL", "");
    vi.stubEnv("PROD", true);
    expect(() => getBackendUrl()).toThrow(/VITE_BACKEND_URL is required/);
  });
});