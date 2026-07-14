import { describe, expect, it } from "vitest";

import { normalizeAlbumPhotoItem } from "../../src/gallery/normalizeAlbumItem.js";

describe("normalizeAlbumPhotoItem", () => {
  const photoView = {
    uri: "at://did:plc:abc/net.atpix.gallery.photo/1",
    record: { title: "Test" },
  };

  it("returns photo views unchanged", () => {
    expect(normalizeAlbumPhotoItem(photoView)).toBe(photoView);
  });

  it("unwraps stub junction entries", () => {
    expect(normalizeAlbumPhotoItem({ photo: photoView })).toBe(photoView);
  });

  it("returns null for invalid entries", () => {
    expect(normalizeAlbumPhotoItem(null)).toBeNull();
    expect(normalizeAlbumPhotoItem({})).toBeNull();
  });
});