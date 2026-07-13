/**
 * In-memory HappyView gallery stub for production-build UI tests.
 */

import { GALLERY_PAGE_SIZE } from "./constants.js";
import { nowRfc3339Utc } from "./formatCreatedAt.js";

/** @constant {string} localStorage gate to seed >20 photos for pagination UI tests. */
export const TEST_GALLERY_MANY_KEY = "atpix-test-gallery-many";

/** @type {{ uri: string, cid: string, author: string, record: object }[]} */
let photos = [];

let blobCounter = 0;

/** @type {((path: string, init?: RequestInit) => Promise<Response>) | null} */
let cachedHandler = null;

/**
 * Return true when the gallery test stub build flag is enabled.
 *
 * @returns {boolean} Whether stub XRPC should be used.
 */
export function isTestGalleryStubEnabled() {
  return import.meta.env.MODE === "test" && import.meta.env.VITE_TEST_GALLERY_STUB === "true";
}

/**
 * Reset stub gallery state (used on each UI test load).
 *
 * @returns {void}
 */
export function resetTestGalleryStub() {
  photos = [];
  blobCounter = 0;
  cachedHandler = null;

  if (typeof localStorage !== "undefined" && localStorage.getItem(TEST_GALLERY_MANY_KEY) === "true") {
    seedManyPhotos(25);
  }
}

/**
 * Seed many stub photos for pagination tests.
 *
 * @param {number} count - Number of photos to insert.
 * @returns {void}
 */
function seedManyPhotos(count) {
  for (let index = 0; index < count; index += 1) {
    photos.push(createStubPhoto(`Photo ${index + 1}`));
  }
}

/**
 * Build a stub photo view entry.
 *
 * @param {string} title - Photo title label.
 * @returns {{ uri: string, cid: string, author: string, record: object }} Photo view.
 */
function createStubPhoto(title) {
  const link = `bafystub${photos.length + 1}`;
  return {
    uri: `at://did:plc:atpixuitest/net.atpix.gallery.photo/${photos.length + 1}`,
    cid: `bafyrec${photos.length + 1}`,
    author: "did:plc:atpixuitest",
    record: {
      title,
      visibility: "public",
      createdAt: nowRfc3339Utc(),
      image: {
        $type: "blob",
        ref: { $link: link },
        mimeType: "image/jpeg",
        size: 1024,
        url: `https://pds.example.test/xrpc/com.atproto.sync.getBlob?cid=${link}`,
      },
    },
  };
}

/**
 * Create a test fetch handler that simulates HappyView gallery XRPC.
 *
 * @returns {(path: string, init?: RequestInit) => Promise<Response>} Stub fetch handler.
 */
export function createTestFetchHandler() {
  if (cachedHandler) {
    return cachedHandler;
  }

  resetTestGalleryStub();

  cachedHandler = async (path, init = {}) => {
    if (path.includes("/xrpc/com.atproto.repo.uploadBlob")) {
      blobCounter += 1;
      const link = `bafyupload${blobCounter}`;
      return jsonResponse({
        blob: {
          $type: "blob",
          ref: { $link: link },
          mimeType: init.headers?.["Content-Type"] ?? "image/jpeg",
          size: init.body instanceof Blob ? init.body.size : 0,
        },
      });
    }

    if (path.includes("/xrpc/net.atpix.gallery.createPhoto")) {
      const body = init.body ? JSON.parse(String(init.body)) : {};
      const photo = createStubPhoto(body.title ?? "Untitled");
      photo.record.image = body.image;
      photo.record.caption = body.caption;
      photo.record.keywords = body.keywords;
      photos.unshift(photo);
      return jsonResponse({ uri: photo.uri, cid: photo.cid });
    }

    if (path.includes("/xrpc/net.atpix.gallery.listPhotos")) {
      const url = new URL(path, "http://stub.test");
      const cursor = url.searchParams.get("cursor");
      const limit = Number(url.searchParams.get("limit") ?? GALLERY_PAGE_SIZE);
      const start = cursor ? Number(cursor) : 0;
      const slice = photos.slice(start, start + limit);
      const next = start + limit < photos.length ? String(start + limit) : undefined;
      return jsonResponse({ photos: slice, cursor: next });
    }

    return jsonResponse({ error: "Unknown stub route" }, 404);
  };

  return cachedHandler;
}

/**
 * Build a JSON Response for stub handlers.
 *
 * @param {object} body - JSON body.
 * @param {number} [status] - HTTP status code.
 * @returns {Response} Fetch Response.
 */
function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}