import { describe, expect, it } from "vitest";

import { breakpointFromWidth } from "../../src/layout/breakpoint.js";

describe("breakpointFromWidth", () => {
  it("maps viewport widths to UI-SHELL-002 buckets", () => {
    expect(breakpointFromWidth(390)).toBe("mobile");
    expect(breakpointFromWidth(900)).toBe("tablet");
    expect(breakpointFromWidth(1280)).toBe("desktop");
  });
});