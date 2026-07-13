import { embedManifestBeforeUpload } from "../api/c2pa.js";

import {
  C2PA_EMBED_MIME_TYPES,
  MAX_UPLOAD_BYTES,
  SUPPORTED_UPLOAD_MIME_TYPES,
} from "./constants.js";

/**
 * @typedef {object} PreparedUploadFile
 * @property {string} id - Stable queue item id.
 * @property {string} name - Original filename.
 * @property {Blob} signedBlob - Manifest-bearing bytes ready for `uploadBlob`.
 * @property {string} firstAction - First C2PA action applied to the asset.
 * @property {string} creatorDid - DID recorded in the manifest assertion.
 * @property {"ready" | "error"} status - Queue item status after C2PA signing.
 * @property {string} [errorMessage] - User-visible error when signing fails.
 */

/**
 * Validate a selected file before C2PA signing begins.
 *
 * @param {File} file - Browser file selection.
 * @returns {string | null} Error message when invalid; otherwise null.
 */
export function validateUploadFile(file) {
  if (!SUPPORTED_UPLOAD_MIME_TYPES.has(file.type)) {
    return "Only JPEG, PNG, and WebP images are supported.";
  }

  if (!C2PA_EMBED_MIME_TYPES.has(file.type)) {
    return "C2PA signing currently supports JPEG and PNG files only.";
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return "File exceeds the 50 MB upload limit.";
  }

  return null;
}

/**
 * Sign a single upload via the backend C2PA claim generator.
 *
 * @param {object} options - Preparation options.
 * @param {File} options.file - Selected image file.
 * @param {string} options.creatorDid - Signed-in user DID.
 * @param {boolean} options.includeGps - Whether GPS metadata is allowed.
 * @param {boolean} options.includeDevice - Whether device metadata is allowed.
 * @returns {Promise<PreparedUploadFile>} Queue item after C2PA signing.
 */
export async function prepareUploadFile({
  file,
  creatorDid,
  includeGps,
  includeDevice,
}) {
  const validationError = validateUploadFile(file);
  if (validationError) {
    return {
      id: crypto.randomUUID(),
      name: file.name,
      signedBlob: file,
      firstAction: "",
      creatorDid,
      status: "error",
      errorMessage: validationError,
    };
  }

  try {
    const result = await embedManifestBeforeUpload({
      file,
      creatorDid,
      includeGps,
      includeDevice,
    });

    return {
      id: crypto.randomUUID(),
      name: file.name,
      signedBlob: result.signedBlob,
      firstAction: result.firstAction,
      creatorDid: result.creatorDid,
      status: "ready",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "C2PA signing failed";
    return {
      id: crypto.randomUUID(),
      name: file.name,
      signedBlob: file,
      firstAction: "",
      creatorDid,
      status: "error",
      errorMessage: message,
    };
  }
}