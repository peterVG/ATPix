/**
 * Publish a C2PA-signed file into a permissioned album space (SRS-F-008).
 */

import { uploadBlob } from "../api/galleryApi.js";
import { createSpaceRecord } from "../api/spaceApi.js";
import { getHappyViewFetchHandler } from "../auth/happyViewFetch.js";
import { nowRfc3339Utc } from "../gallery/formatCreatedAt.js";

/**
 * @typedef {object} PublishPermissionedPhotoInput
 * @property {Blob} signedBlob - C2PA-signed image bytes.
 * @property {string} mimeType - Image MIME type.
 * @property {string} fileName - Original filename for error messages.
 * @property {string} spaceUri - Linked permissioned space URI.
 * @property {string} albumUri - Album AT URI for albumItem junction.
 * @property {string} [title] - Optional Dublin Core title.
 * @property {string} [caption] - Optional caption.
 * @property {string[]} [keywords] - Optional keyword tags.
 * @property {(progress: number) => void} [onProgress] - Progress callback (0–100).
 */

/**
 * @typedef {object} PublishPermissionedPhotoResult
 * @property {"success" | "error"} status - Publish outcome.
 * @property {string} [uri] - Created space photo AT URI on success.
 * @property {string} [createdAt] - RFC 3339 UTC timestamp on success.
 * @property {string} [errorMessage] - Actionable error copy on failure.
 */

/**
 * Publish a prepared upload into a permissioned space (uploadBlob → space.createRecord).
 *
 * @param {PublishPermissionedPhotoInput} input - Signed upload payload and space targets.
 * @returns {Promise<PublishPermissionedPhotoResult>} Publish result.
 */
export async function publishPermissionedPhoto(input) {
  const report = (value) => {
    if (typeof input.onProgress === "function") {
      input.onProgress(value);
    }
  };

  try {
    report(10);
    const fetchHandler = await getHappyViewFetchHandler();
    report(30);

    const blobRef = await uploadBlob(fetchHandler, input.signedBlob, input.mimeType);
    report(55);

    const createdAt = nowRfc3339Utc();
    const photo = await createSpaceRecord(fetchHandler, {
      space: input.spaceUri,
      collection: "net.atpix.gallery.photo",
      record: {
        $type: "net.atpix.gallery.photo",
        image: blobRef,
        visibility: "permissioned",
        title: input.title,
        caption: input.caption,
        keywords: input.keywords,
        createdAt,
        spaceUri: input.spaceUri,
      },
    });
    report(80);

    await createSpaceRecord(fetchHandler, {
      space: input.spaceUri,
      collection: "net.atpix.gallery.albumItem",
      record: {
        $type: "net.atpix.gallery.albumItem",
        albumUri: input.albumUri,
        photoUri: photo.uri,
        createdAt,
      },
    });

    report(100);
    return {
      status: "success",
      uri: photo.uri,
      createdAt,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Permissioned upload failed";
    return {
      status: "error",
      errorMessage: `Unable to upload ${input.fileName}: ${message}`,
    };
  }
}