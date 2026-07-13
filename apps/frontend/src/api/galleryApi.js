/**
 * HappyView gallery XRPC helpers for Path A uploads and My Gallery queries.
 */

import { buildXrpcHeaders } from "./happyview.js";

/**
 * @typedef {object} BlobRef
 * @property {string} $type
 * @property {{ $link: string }} ref
 * @property {string} mimeType
 * @property {number} size
 */

/**
 * Parse an XRPC JSON response or throw a descriptive error.
 *
 * @param {Response} response - Fetch response from HappyView.
 * @returns {Promise<object>} Parsed JSON body.
 */
async function parseXrpcJson(response) {
  let body;
  try {
    body = await response.json();
  } catch {
    if (response.ok) {
      throw new Error(`Invalid JSON in XRPC response (HTTP ${response.status})`);
    }
    body = {};
  }

  if (!response.ok) {
    const message = typeof body.message === "string" ? body.message : `HTTP ${response.status}`;
    throw new Error(message);
  }

  return body;
}

/**
 * Upload a signed blob to the user's PDS via HappyView OAuth proxy.
 *
 * @param {(path: string, init?: RequestInit) => Promise<Response>} fetchHandler - DPoP fetch handler.
 * @param {Blob} blob - Signed image bytes.
 * @param {string} mimeType - Image MIME type.
 * @returns {Promise<BlobRef>} Uploaded blob reference.
 */
export async function uploadBlob(fetchHandler, blob, mimeType) {
  const response = await fetchHandler("/xrpc/com.atproto.repo.uploadBlob", {
    method: "POST",
    headers: {
      "Content-Type": mimeType,
      ...buildXrpcHeaders(),
    },
    body: blob,
  });

  const payload = await parseXrpcJson(response);
  return payload.blob;
}

/**
 * Create a `net.atpix.gallery.photo` record for a public or unlisted upload.
 *
 * @param {(path: string, init?: RequestInit) => Promise<Response>} fetchHandler - DPoP fetch handler.
 * @param {object} input - createPhoto procedure input.
 * @returns {Promise<{ uri: string, cid: string }>} Created record identifiers.
 */
export async function createPhoto(fetchHandler, input) {
  const response = await fetchHandler("/xrpc/net.atpix.gallery.createPhoto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...buildXrpcHeaders(),
    },
    body: JSON.stringify(input),
  });

  return parseXrpcJson(response);
}

/**
 * List photos for an author DID with optional cursor pagination.
 *
 * @param {(path: string, init?: RequestInit) => Promise<Response>} fetchHandler - DPoP fetch handler.
 * @param {object} params - listPhotos query parameters.
 * @param {string} params.did - Author DID.
 * @param {number} [params.limit] - Page size (default 20).
 * @param {string} [params.cursor] - Pagination cursor.
 * @returns {Promise<{ photos: object[], cursor?: string }>} Photo page.
 */
export async function listPhotos(fetchHandler, params) {
  const search = new URLSearchParams();
  search.set("did", params.did);
  search.set("limit", String(params.limit ?? 20));
  if (params.cursor) {
    search.set("cursor", params.cursor);
  }

  const response = await fetchHandler(`/xrpc/net.atpix.gallery.listPhotos?${search.toString()}`, {
    method: "GET",
    headers: buildXrpcHeaders(),
  });

  return parseXrpcJson(response);
}