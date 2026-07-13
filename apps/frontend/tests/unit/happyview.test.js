import { afterEach, describe, expect, it, vi } from "vitest";
import { buildXrpcHeaders, getHappyViewUrl } from "../../src/api/happyview.js";

describe("getHappyViewUrl", () => {
  it("returns default HappyView URL when env is unset", () => {
    expect(getHappyViewUrl()).toBe("http://127.0.0.1:3001");
  });
});

describe("buildXrpcHeaders", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns empty headers when client key is unset", () => {
    vi.stubEnv("VITE_HAPPYVIEW_CLIENT_KEY", "");
    expect(buildXrpcHeaders()).toEqual({});
  });

  it("includes X-Client-Key when client key is configured", () => {
    vi.stubEnv("VITE_HAPPYVIEW_CLIENT_KEY", "hvc_example");
    expect(buildXrpcHeaders()).toEqual({ "X-Client-Key": "hvc_example" });
  });
});
