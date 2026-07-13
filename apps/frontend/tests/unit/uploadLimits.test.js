import { describe, expect, it } from "vitest";

import { MAX_UPLOAD_BYTES } from "../../src/upload/constants.js";
import { validateUploadFile } from "../../src/upload/prepareUploadFile.js";

describe("validateUploadFile", () => {
  it("rejects files larger than 50 MB before transfer starts", () => {
    const oversized = new File([new Uint8Array(1)], "big.jpg", {
      type: "image/jpeg",
    });
    Object.defineProperty(oversized, "size", { value: MAX_UPLOAD_BYTES + 1 });

    expect(validateUploadFile(oversized)).toBe("File exceeds the 50 MB upload limit.");
  });

  it("rejects WebP for C2PA signing in Task 3.1", () => {
    const webp = new File([new Uint8Array(8)], "photo.webp", { type: "image/webp" });

    expect(validateUploadFile(webp)).toBe(
      "C2PA signing currently supports JPEG and PNG files only.",
    );
  });

  it("accepts JPEG files within the size limit", () => {
    const jpeg = new File([new Uint8Array(8)], "photo.jpg", { type: "image/jpeg" });

    expect(validateUploadFile(jpeg)).toBeNull();
  });
});