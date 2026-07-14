import { describe, expect, it } from "vitest";

import {
  isVerifiedPhotoRecord,
  renderMediaCard,
  renderPhotoBadges,
} from "../../src/gallery/renderMediaCard.js";

describe("renderMediaCard", () => {
  const photo = {
    uri: "at://did:plc:abc/net.atpix.gallery.photo/1",
    record: {
      title: "Sunset",
      visibility: "public",
      c2paValidationState: "trusted",
      createdAt: "2026-07-14T12:00:00.000Z",
    },
  };

  it("renders trusted and valid badges for trusted photos", () => {
    const html = renderPhotoBadges(photo.record);
    expect(html).toContain('data-testid="badge-trusted"');
    expect(html).toContain('data-testid="badge-valid"');
  });

  it("renders gallery card with photo uri and aria label", () => {
    const html = renderMediaCard({ photo, index: 0 });
    expect(html).toContain('data-photo-uri="at://did:plc:abc/net.atpix.gallery.photo/1"');
    expect(html).toContain('aria-label="Edit Sunset"');
    expect(html).not.toContain("Untitled");
  });

  it("treats trusted and valid C2PA states as verified", () => {
    expect(isVerifiedPhotoRecord({ c2paValidationState: "trusted" })).toBe(true);
    expect(isVerifiedPhotoRecord({ c2paValidationState: "wellFormed" })).toBe(true);
    expect(isVerifiedPhotoRecord({ c2paValidationState: "invalid" })).toBe(false);
  });
});