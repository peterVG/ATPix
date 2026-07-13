import { describe, expect, it } from "vitest";

import { selectPhotoBadges } from "../../src/gallery/selectPhotoBadge.js";

describe("selectPhotoBadges", () => {
  it("returns Trusted and Valid for public C2PA-signed uploads", () => {
    expect(
      selectPhotoBadges({
        visibility: "public",
        c2paState: "trusted",
      }),
    ).toEqual(["Trusted", "Valid"]);
  });

  it("returns Private for permissioned visibility", () => {
    expect(
      selectPhotoBadges({
        visibility: "permissioned",
        c2paState: "trusted",
      }),
    ).toEqual(["Private"]);
  });

  it("returns Invalid when validation failed", () => {
    expect(
      selectPhotoBadges({
        visibility: "public",
        c2paState: "invalid",
      }),
    ).toEqual(["Invalid"]);
  });
});