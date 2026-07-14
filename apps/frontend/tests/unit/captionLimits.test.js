import { describe, expect, it } from "vitest";

import { CAPTION_MAX_LENGTH, validateCaptionLength } from "../../src/gallery/captionLimits.js";

describe("captionLimits", () => {
  it("accepts captions within the 2000 character limit", () => {
    const caption = "a".repeat(CAPTION_MAX_LENGTH);
    expect(validateCaptionLength(caption)).toEqual({ valid: true });
  });

  it("rejects captions longer than 2000 characters", () => {
    const caption = "a".repeat(CAPTION_MAX_LENGTH + 1);
    const result = validateCaptionLength(caption);
    expect(result.valid).toBe(false);
    expect(result.message).toContain("2000");
  });
});