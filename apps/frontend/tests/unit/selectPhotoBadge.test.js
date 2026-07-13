import { describe, expect, it } from "vitest";

import { mapC2paValidationState, selectPhotoBadges } from "../../src/gallery/selectPhotoBadge.js";

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

  it("returns Valid for non-trusted valid state", () => {
    expect(
      selectPhotoBadges({
        visibility: "public",
        c2paState: "valid",
      }),
    ).toEqual(["Valid"]);
  });

  it("omits C2PA badges when validation state is none", () => {
    expect(
      selectPhotoBadges({
        visibility: "public",
        c2paState: "none",
      }),
    ).toEqual([]);
  });
});

describe("mapC2paValidationState", () => {
  it("maps lexicon validation tokens to badge states", () => {
    expect(mapC2paValidationState("trusted")).toBe("trusted");
    expect(mapC2paValidationState("invalid")).toBe("invalid");
    expect(mapC2paValidationState("wellFormed")).toBe("valid");
    expect(mapC2paValidationState("valid")).toBe("valid");
    expect(mapC2paValidationState("none")).toBe("none");
    expect(mapC2paValidationState(undefined)).toBe("none");
  });
});