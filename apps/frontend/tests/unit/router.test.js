import { describe, expect, it } from "vitest";

import {
  albumDetailHref,
  parseAlbumUriFromHash,
  parseRouteFromHash,
  routeHref,
} from "../../src/router/router.js";

describe("router", () => {
  it("parses gallery as default route", () => {
    expect(parseRouteFromHash("")).toBe("gallery");
    expect(parseRouteFromHash("#/")).toBe("gallery");
  });

  it("parses known shell routes from hash", () => {
    expect(parseRouteFromHash("#/discovery")).toBe("discovery");
    expect(parseRouteFromHash("#/settings")).toBe("settings");
  });

  it("falls back to gallery for unknown routes", () => {
    expect(parseRouteFromHash("#/unknown")).toBe("gallery");
  });

  it("builds hash hrefs", () => {
    expect(routeHref("albums")).toBe("#/albums");
  });

  it("parses album detail URIs from hash segments", () => {
    const uri = "at://did:plc:abc/net.atpix.gallery.album/1";
    const hash = albumDetailHref(uri);
    expect(parseRouteFromHash(hash)).toBe("albums");
    expect(parseAlbumUriFromHash(hash)).toBe(uri);
    expect(parseAlbumUriFromHash("#/albums")).toBeNull();
  });
});
