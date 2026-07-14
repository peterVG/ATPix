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

/**
 * Create an album via `net.atpix.gallery.createAlbum`.
 *
 * @param {(path: string, init?: RequestInit) => Promise<Response>} fetchHandler - DPoP fetch handler.
 * @param {object} input - createAlbum procedure input.
 * @returns {Promise<{ uri: string, cid: string, spaceUri?: string }>} Created album identifiers.
 */
export async function createAlbum(fetchHandler, input) {
  const response = await fetchHandler("/xrpc/net.atpix.gallery.createAlbum", {
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
 * List albums for an author DID.
 *
 * @param {(path: string, init?: RequestInit) => Promise<Response>} fetchHandler - DPoP fetch handler.
 * @param {object} params - listAlbums query parameters.
 * @returns {Promise<{ albums: object[], cursor?: string }>} Album page.
 */
export async function listAlbums(fetchHandler, params) {
  const search = new URLSearchParams();
  search.set("did", params.did);
  search.set("limit", String(params.limit ?? 20));
  if (params.visibility) {
    search.set("visibility", params.visibility);
  }
  if (params.cursor) {
    search.set("cursor", params.cursor);
  }

  const response = await fetchHandler(`/xrpc/net.atpix.gallery.listAlbums?${search.toString()}`, {
    method: "GET",
    headers: buildXrpcHeaders(),
  });

  return parseXrpcJson(response);
}

/**
 * Fetch a single album, optionally hydrating member photos.
 *
 * @param {(path: string, init?: RequestInit) => Promise<Response>} fetchHandler - DPoP fetch handler.
 * @param {object} params - getAlbum query parameters.
 * @returns {Promise<{ album: object, items?: object[] }>} Album view payload.
 */
export async function getAlbum(fetchHandler, params) {
  const search = new URLSearchParams();
  search.set("uri", params.uri);
  if (params.hydrateItems) {
    search.set("hydrateItems", "true");
  }

  const response = await fetchHandler(`/xrpc/net.atpix.gallery.getAlbum?${search.toString()}`, {
    method: "GET",
    headers: buildXrpcHeaders(),
  });

  return parseXrpcJson(response);
}

/**
 * List ordered album items for an album.
 *
 * @param {(path: string, init?: RequestInit) => Promise<Response>} fetchHandler - DPoP fetch handler.
 * @param {object} params - listAlbumItems query parameters.
 * @returns {Promise<{ items: object[], cursor?: string }>} Album item page.
 */
export async function listAlbumItems(fetchHandler, params) {
  const search = new URLSearchParams();
  search.set("albumUri", params.albumUri);
  search.set("limit", String(params.limit ?? 100));
  if (params.cursor) {
    search.set("cursor", params.cursor);
  }

  const response = await fetchHandler(
    `/xrpc/net.atpix.gallery.listAlbumItems?${search.toString()}`,
    {
      method: "GET",
      headers: buildXrpcHeaders(),
    },
  );

  return parseXrpcJson(response);
}

/**
 * Add a photo to an album via albumItem junction record.
 *
 * @param {(path: string, init?: RequestInit) => Promise<Response>} fetchHandler - DPoP fetch handler.
 * @param {object} input - addToAlbum procedure input.
 * @returns {Promise<{ uri: string, cid: string }>} Created junction identifiers.
 */
export async function addToAlbum(fetchHandler, input) {
  const response = await fetchHandler("/xrpc/net.atpix.gallery.addToAlbum", {
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
 * Remove a photo from an album without deleting the photo record.
 *
 * @param {(path: string, init?: RequestInit) => Promise<Response>} fetchHandler - DPoP fetch handler.
 * @param {object} input - removeFromAlbum procedure input.
 * @returns {Promise<void>} Resolves when removal succeeds.
 */
export async function removeFromAlbum(fetchHandler, input) {
  const response = await fetchHandler("/xrpc/net.atpix.gallery.removeFromAlbum", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...buildXrpcHeaders(),
    },
    body: JSON.stringify(input),
  });

  await parseXrpcJson(response);
}

/**
 * Delete an album and junction records without deleting member photos.
 *
 * @param {(path: string, init?: RequestInit) => Promise<Response>} fetchHandler - DPoP fetch handler.
 * @param {object} input - deleteAlbum procedure input.
 * @returns {Promise<void>} Resolves when deletion succeeds.
 */
export async function deleteAlbum(fetchHandler, input) {
  const response = await fetchHandler("/xrpc/net.atpix.gallery.deleteAlbum", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...buildXrpcHeaders(),
    },
    body: JSON.stringify(input),
  });

  await parseXrpcJson(response);
}

/**
 * Update photo metadata (caption, keywords, title) via `updatePhoto`.
 *
 * @param {(path: string, init?: RequestInit) => Promise<Response>} fetchHandler - DPoP fetch handler.
 * @param {object} input - updatePhoto procedure input.
 * @returns {Promise<{ uri: string, cid: string }>} Updated record identifiers.
 */
export async function updatePhoto(fetchHandler, input) {
  const response = await fetchHandler("/xrpc/net.atpix.gallery.updatePhoto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...buildXrpcHeaders(),
    },
    body: JSON.stringify(input),
  });

  return parseXrpcJson(response);
}