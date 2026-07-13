import { describe, expect, it } from "vitest";

import { DEFAULT_BACKEND_URL, getBackendUrl } from "../../src/api/backend.js";

describe("getBackendUrl", () => {
  it("returns the configured backend URL without trailing slash", () => {
    expect(getBackendUrl()).toBe(import.meta.env.VITE_BACKEND_URL || DEFAULT_BACKEND_URL);
  });
});