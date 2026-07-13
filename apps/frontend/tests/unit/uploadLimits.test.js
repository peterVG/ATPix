import { describe, expect, it } from "vitest";

import { MAX_EMBED_INPUT_BYTES } from "../../src/upload/constants.js";
import { validateUploadFile } from "../../src/upload/prepareUploadFile.js";

describe("validateUploadFile", () => {
  it("rejects files larger than the pre-sign headroom limit", () => {
    const oversized = new File([new Uint8Array(1)], "big.jpg", {
      type: "image/jpeg",
    });
    Object.defineProperty(oversized, "size", { value: MAX_EMBED_INPUT_BYTES + 1 });

    expect(validateUploadFile(oversized)).toBe(
      "File exceeds the upload size limit before C2PA manifest headroom is reserved.",
    );
  });

  it("rejects unsupported MIME types", () => {
    const webp = new File([new Uint8Array(8)], "photo.webp", { type: "image/webp" });

    expect(validateUploadFile(webp)).toBe("Only JPEG and PNG images are supported.");
  });

  it("accepts JPEG files within the size limit", () => {
    const jpeg = new File([new Uint8Array(8)], "photo.jpg", { type: "image/jpeg" });
    Object.defineProperty(jpeg, "size", { value: MAX_EMBED_INPUT_BYTES });

    expect(validateUploadFile(jpeg)).toBeNull();
  });
});