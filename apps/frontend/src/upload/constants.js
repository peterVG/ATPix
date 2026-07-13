/** @constant {number} Maximum signed blob size in bytes (50 MiB per SRS-F-002). */
export const MAX_OUTPUT_BYTES = 50 * 1024 * 1024;

/** @constant {number} Reserved headroom for embedded C2PA manifest bytes. */
export const MANIFEST_HEADROOM_BYTES = 512 * 1024;

/** @constant {number} Maximum pre-sign input size after manifest headroom reservation. */
export const MAX_EMBED_INPUT_BYTES = MAX_OUTPUT_BYTES - MANIFEST_HEADROOM_BYTES;

/** @constant {number} Alias retained for upload validation helpers. */
export const MAX_UPLOAD_BYTES = MAX_OUTPUT_BYTES;

/** @constant {Set<string>} Image MIME types accepted for C2PA signing in Task 3.1. */
export const C2PA_EMBED_MIME_TYPES = new Set(["image/jpeg", "image/png"]);

/** @constant {string} File-picker accept string derived from supported MIME types. */
export const C2PA_EMBED_ACCEPT = Array.from(C2PA_EMBED_MIME_TYPES).join(",");

/** @constant {Set<string>} Image MIME types shown in the upload picker. */
export const SUPPORTED_UPLOAD_MIME_TYPES = C2PA_EMBED_MIME_TYPES;

/** @constant {string[]} Human-readable format labels for upload guidance chips. */
export const UPLOAD_FORMAT_LABELS = ["PNG", "JPEG"];