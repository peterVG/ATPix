import { describe, expect, it } from "vitest";

import { formatCreatedAtUtc, isRfc3339Utc } from "../../src/gallery/formatCreatedAt.js";

describe("formatCreatedAtUtc", () => {
  it("formats RFC 3339 UTC timestamps for gallery display", () => {
    const formatted = formatCreatedAtUtc("2026-07-13T14:30:00.000Z");
    expect(formatted).toContain("2026");
    expect(formatted).toContain("UTC");
  });
});

describe("isRfc3339Utc", () => {
  it("accepts UTC timestamps with Z suffix", () => {
    expect(isRfc3339Utc("2026-07-13T14:30:00.000Z")).toBe(true);
  });

  it("rejects timestamps without Z suffix", () => {
    expect(isRfc3339Utc("2026-07-13T14:30:00.000+00:00")).toBe(false);
  });
});