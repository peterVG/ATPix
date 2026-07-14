/**
 * Publish a C2PA-signed file into a permissioned album space (SRS-F-008).
 */

import { uploadBlob } from "../api/galleryApi.js";
import { createSpaceRecord, deleteSpaceRecord } from "../api/spaceApi.js";
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
 * Extract the record key from a space AT URI.
 *
 * @param {string} uri - Space record AT URI.
 * @returns {string | null} Record key segment when present.
 */
export function parseSpaceRecordRkey(uri) {
  const normalized = uri.replace(/^ats:\/\//, "").replace(/^at:\/\//, "");
  const segments = normalized.split("/");
  const rkey = segments[segments.length - 1];
  return rkey && rkey.length > 0 ? rkey : null;
}

/**
 * Best-effort rollback for permissioned upload writes.
 *
 * @param {(path: string, init?: RequestInit) => Promise<Response>} fetchHandler - DPoP fetch handler.
 * @param {string} spaceUri - Linked permissioned space URI.
 * @param {{ uri: string } | null} photo - Created photo record, if any.
 * @param {{ uri: string } | null} albumItem - Created album-item record, if any.
 * @returns {Promise<void>} Resolves when rollback attempts complete.
 */
export async function rollbackPermissionedUpload(fetchHandler, spaceUri, photo, albumItem) {
  if (albumItem?.uri) {
    const albumItemRkey = parseSpaceRecordRkey(albumItem.uri);
    if (albumItemRkey) {
      try {
        await deleteSpaceRecord(fetchHandler, {
          space: spaceUri,
          collection: "net.atpix.gallery.albumItem",
          rkey: albumItemRkey,
        });
      } catch {
        // Rollback is best-effort.
      }
    }
  }

  if (photo?.uri) {
    const photoRkey = parseSpaceRecordRkey(photo.uri);
    if (photoRkey) {
      try {
        await deleteSpaceRecord(fetchHandler, {
          space: spaceUri,
          collection: "net.atpix.gallery.photo",
          rkey: photoRkey,
        });
      } catch {
        // Rollback is best-effort.
      }
    }
  }
}

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

  let createdPhoto = null;
  let createdAlbumItem = null;

  try {
    report(10);
    const fetchHandler = await getHappyViewFetchHandler();
    report(30);

    const blobRef = await uploadBlob(fetchHandler, input.signedBlob, input.mimeType);
    report(55);

    const createdAt = nowRfc3339Utc();
    createdPhoto = await createSpaceRecord(fetchHandler, {
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

    createdAlbumItem = await createSpaceRecord(fetchHandler, {
      space: input.spaceUri,
      collection: "net.atpix.gallery.albumItem",
      record: {
        $type: "net.atpix.gallery.albumItem",
        albumUri: input.albumUri,
        photoUri: createdPhoto.uri,
        createdAt,
      },
    });

    report(100);
    return {
      status: "success",
      uri: createdPhoto.uri,
      createdAt,
    };
  } catch (error) {
    try {
      const fetchHandler = await getHappyViewFetchHandler();
      await rollbackPermissionedUpload(fetchHandler, input.spaceUri, createdPhoto, createdAlbumItem);
    } catch {
      // Rollback is best-effort; surface the original failure below.
    }

    const message = error instanceof Error ? error.message : "Permissioned upload failed";
    return {
      status: "error",
      errorMessage: `Unable to upload ${input.fileName}: ${message}`,
    };
  }
}