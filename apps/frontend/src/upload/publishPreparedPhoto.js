/**
 * Publish a C2PA-signed file to the user's PDS and create a gallery photo record.
 */

import { createPhoto, uploadBlob } from "../api/galleryApi.js";
import { getHappyViewFetchHandler } from "../auth/happyViewFetch.js";
import { nowRfc3339Utc } from "../gallery/formatCreatedAt.js";

/**
 * @typedef {object} PublishPhotoInput
 * @property {Blob} signedBlob - C2PA-signed image bytes.
 * @property {string} mimeType - Image MIME type.
 * @property {string} fileName - Original filename for error messages.
 * @property {"public" | "unlisted"} visibility - Record visibility.
 * @property {string} [title] - Optional Dublin Core title.
 * @property {string} [caption] - Optional caption.
 * @property {string[]} [keywords] - Optional keyword tags.
 * @property {(progress: number) => void} [onProgress] - Progress callback (0–100).
 */

/**
 * @typedef {object} PublishPhotoResult
 * @property {"success" | "error"} status - Publish outcome.
 * @property {string} [uri] - Created AT URI on success.
 * @property {string} [createdAt] - RFC 3339 UTC timestamp on success.
 * @property {string} [errorMessage] - Actionable error copy on failure.
 */

/**
 * Publish a prepared upload to HappyView (uploadBlob → createPhoto).
 *
 * @param {PublishPhotoInput} input - Signed upload payload and metadata.
 * @returns {Promise<PublishPhotoResult>} Publish result.
 */
export async function publishPreparedPhoto(input) {
  const report = (value) => {
    if (typeof input.onProgress === "function") {
      input.onProgress(value);
    }
  };

  try {
    report(10);
    const fetchHandler = await getHappyViewFetchHandler();
    report(35);

    const blobRef = await uploadBlob(fetchHandler, input.signedBlob, input.mimeType);
    report(70);

    const created = await createPhoto(fetchHandler, {
      image: blobRef,
      visibility: input.visibility,
      title: input.title,
      caption: input.caption,
      keywords: input.keywords,
    });

    report(100);
    return {
      status: "success",
      uri: created.uri,
      createdAt: nowRfc3339Utc(),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return {
      status: "error",
      errorMessage: `Unable to upload ${input.fileName}: ${message}`,
    };
  }
}