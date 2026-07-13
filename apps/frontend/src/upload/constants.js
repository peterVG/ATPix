/** @constant {number} Maximum client-side upload size in bytes (50 MiB per SRS-F-002). */
export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;

/** @constant {Set<string>} Image MIME types accepted for C2PA signing in Task 3.1. */
export const C2PA_EMBED_MIME_TYPES = new Set(["image/jpeg", "image/png"]);

/** @constant {Set<string>} Image MIME types shown in the upload picker. */
export const SUPPORTED_UPLOAD_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);