/**
 * In-memory HappyView gallery stub for production-build UI tests.
 */

import { GALLERY_PAGE_SIZE } from "./constants.js";
import { nowRfc3339Utc } from "./formatCreatedAt.js";

/** @constant {string} localStorage gate to seed >20 photos for pagination UI tests. */
export const TEST_GALLERY_MANY_KEY = "atpix-test-gallery-many";

/** @constant {string} localStorage gate to seed a public album detail fixture. */
export const TEST_ALBUM_PUBLIC_KEY = "atpix-test-album-public";

/** @constant {string} localStorage gate to seed a permissioned album detail fixture. */
export const TEST_ALBUM_PERMISSIONED_KEY = "atpix-test-album-permissioned";

/** @constant {string} localStorage gate to open space admin as owner. */
export const TEST_ALBUM_SPACE_ADMIN_KEY = "atpix-test-album-space-admin";

/** @constant {string} localStorage gate to simulate non-member space admin access. */
export const TEST_ALBUM_SPACE_DENIED_KEY = "atpix-test-album-space-denied";

/** @type {{ uri: string, cid: string, author: string, record: object }[]} */
let photos = [];

/** @type {{ uri: string, cid: string, author: string, record: object }[]} */
let albums = [];

/** @type {{ uri: string, albumUri: string, photoUri: string, photo: object }[]} */
let albumItems = [];

/** @type {object[]} */
let spaceMembers = [];

/** @type {boolean} */
let spaceAdminDenied = false;

let blobCounter = 0;
let albumCounter = 0;

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
  albums = [];
  albumItems = [];
  spaceMembers = [];
  spaceAdminDenied = false;
  blobCounter = 0;
  albumCounter = 0;
  cachedHandler = null;

  if (typeof localStorage !== "undefined" && localStorage.getItem(TEST_GALLERY_MANY_KEY) === "true") {
    seedManyPhotos(25);
  }

  if (typeof localStorage !== "undefined" && localStorage.getItem(TEST_ALBUM_PUBLIC_KEY) === "true") {
    seedPublicAlbumFixture();
  }

  if (
    typeof localStorage !== "undefined" &&
    localStorage.getItem(TEST_ALBUM_PERMISSIONED_KEY) === "true"
  ) {
    seedPermissionedAlbumFixture();
  }

  if (typeof localStorage !== "undefined" && localStorage.getItem(TEST_ALBUM_SPACE_ADMIN_KEY) === "true") {
    seedPermissionedAlbumFixture();
    seedSpaceAdminFixture();
  }

  if (typeof localStorage !== "undefined" && localStorage.getItem(TEST_ALBUM_SPACE_DENIED_KEY) === "true") {
    seedPermissionedAlbumFixture();
    spaceAdminDenied = true;
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
 * @param {object} [overrides] - Optional record overrides.
 * @returns {{ uri: string, cid: string, author: string, record: object }} Photo view.
 */
function createStubPhoto(title, overrides = {}) {
  const link = `bafystub${photos.length + 1}`;
  return {
    uri: `at://did:plc:atpixuitest/net.atpix.gallery.photo/${photos.length + 1}`,
    cid: `bafyrec${photos.length + 1}`,
    author: "did:plc:atpixuitest",
    record: {
      title,
      visibility: "public",
      c2paValidationState: "trusted",
      createdAt: nowRfc3339Utc(),
      image: {
        $type: "blob",
        ref: { $link: link },
        mimeType: "image/jpeg",
        size: 1024,
        url: `https://pds.example.test/xrpc/com.atproto.sync.getBlob?cid=${link}`,
      },
      ...overrides,
    },
  };
}

/**
 * Build a stub album view entry.
 *
 * @param {string} name - Album display name.
 * @param {"public" | "unlisted" | "permissioned"} visibility - Album visibility.
 * @param {object} [overrides] - Optional record overrides.
 * @returns {{ uri: string, cid: string, author: string, record: object }} Album view.
 */
function createStubAlbum(name, visibility, overrides = {}) {
  albumCounter += 1;
  return {
    uri: `at://did:plc:atpixuitest/net.atpix.gallery.album/${albumCounter}`,
    cid: `bafyalbum${albumCounter}`,
    author: "did:plc:atpixuitest",
    record: {
      name,
      description: "Stub album for UI tests.",
      visibility,
      createdAt: nowRfc3339Utc(),
      ...overrides,
    },
  };
}

/**
 * Link a photo to an album in the stub store.
 *
 * @param {object} album - Album view entry.
 * @param {object} photo - Photo view entry.
 * @returns {void}
 */
function linkPhotoToAlbum(album, photo) {
  albumItems.push({
    uri: `at://did:plc:atpixuitest/net.atpix.gallery.albumItem/${albumItems.length + 1}`,
    albumUri: album.uri,
    photoUri: photo.uri,
    photo,
  });
}

/**
 * Seed a public album with one trusted photo for album detail UI tests.
 *
 * @returns {void}
 */
function seedPublicAlbumFixture() {
  const photo = createStubPhoto("Album Photo");
  photos.push(photo);
  const album = createStubAlbum("Public Collection", "public");
  albums.push(album);
  linkPhotoToAlbum(album, photo);
}

/**
 * Seed a permissioned album with space URI for UI-SCR-004 permissioned tests.
 *
 * @returns {void}
 */
function seedSpaceAdminFixture() {
  spaceMembers = [
    {
      did: "did:plc:atpixuitest",
      handle: "owner.atpix.test",
      access: "write",
      isOwner: true,
    },
    {
      did: "did:plc:member1",
      handle: "member.atpix.test",
      access: "write",
      isOwner: false,
    },
  ];
}

function seedPermissionedAlbumFixture() {
  const trusted = createStubPhoto("Trusted Member", { c2paValidationState: "trusted" });
  photos.push(trusted);
  const invalid = createStubPhoto("Invalid Member", { c2paValidationState: "invalid" });
  photos.push(invalid);

  const album = createStubAlbum("Permissioned Vault", "permissioned", {
    spaceUri: "ats://did:plc:space/net.atpix.gallery.albumSpace/album1",
  });
  albums.push(album);
  linkPhotoToAlbum(album, trusted);
  linkPhotoToAlbum(album, invalid);
}

/**
 * Find a photo by AT URI in the stub store.
 *
 * @param {string} uri - Photo AT URI.
 * @returns {object | undefined} Matching photo view.
 */
function findPhoto(uri) {
  return photos.find((photo) => photo.uri === uri);
}

/**
 * Find an album by AT URI in the stub store.
 *
 * @param {string} uri - Album AT URI.
 * @returns {object | undefined} Matching album view.
 */
function findAlbum(uri) {
  return albums.find((album) => album.uri === uri);
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

    if (path.includes("/xrpc/net.atpix.gallery.updatePhoto")) {
      const body = init.body ? JSON.parse(String(init.body)) : {};
      const photo = findPhoto(body.uri);
      if (!photo) {
        return jsonResponse({ message: "Photo not found" }, 404);
      }
      if (typeof body.caption === "string") {
        photo.record.caption = body.caption;
      }
      if (Array.isArray(body.keywords)) {
        photo.record.keywords = body.keywords;
      }
      if (typeof body.title === "string") {
        photo.record.title = body.title;
      }
      photo.record.modifiedAt = nowRfc3339Utc();
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

    if (path.includes("/xrpc/net.atpix.gallery.createAlbum")) {
      const body = init.body ? JSON.parse(String(init.body)) : {};
      const album = createStubAlbum(body.name ?? "Untitled album", body.visibility ?? "public", {
        description: body.description,
        spaceUri:
          body.visibility === "permissioned"
            ? "ats://did:plc:space/net.atpix.gallery.albumSpace/new"
            : undefined,
      });
      albums.unshift(album);
      return jsonResponse({
        uri: album.uri,
        cid: album.cid,
        spaceUri: album.record.spaceUri,
      });
    }

    if (path.includes("/xrpc/net.atpix.gallery.listAlbums")) {
      const url = new URL(path, "http://stub.test");
      const visibility = url.searchParams.get("visibility");
      const filtered = visibility
        ? albums.filter((album) => album.record?.visibility === visibility)
        : albums;
      return jsonResponse({ albums: filtered });
    }

    if (path.includes("/xrpc/com.atproto.identity.resolveHandle")) {
      const url = new URL(path, "http://stub.test");
      const handle = url.searchParams.get("handle");
      if (handle === "invalid") {
        return jsonResponse({ message: "Unable to resolve handle" }, 400);
      }
      return jsonResponse({ did: `did:plc:${handle?.replace(/\./g, "") ?? "resolved"}` });
    }

    if (path.includes("/xrpc/com.atproto.space.getSpace")) {
      if (spaceAdminDenied) {
        return jsonResponse({ message: "Not found" }, 404);
      }
      const url = new URL(path, "http://stub.test");
      return jsonResponse({
        uri: url.searchParams.get("space"),
        space: { displayName: "Permissioned Vault" },
        config: { membershipPublic: false, recordsPublic: false },
      });
    }

    if (path.includes("/xrpc/com.atproto.simplespace.listMembers")) {
      if (spaceAdminDenied) {
        return jsonResponse({ message: "Forbidden" }, 403);
      }
      return jsonResponse({ members: spaceMembers });
    }

    if (path.includes("/xrpc/dev.happyview.space.createInvite")) {
      return jsonResponse({ token: "stub-invite-token", inviteId: "invite-1", access: "write" });
    }

    if (path.includes("/xrpc/com.atproto.simplespace.addMember")) {
      const body = init.body ? JSON.parse(String(init.body)) : {};
      spaceMembers.push({
        did: body.did,
        handle: `${body.did?.slice(-8) ?? "member"}.atpix.test`,
        access: body.access ?? "write",
        isOwner: false,
      });
      return jsonResponse({ success: true });
    }

    if (path.includes("/xrpc/com.atproto.space.createRecord")) {
      const body = init.body ? JSON.parse(String(init.body)) : {};
      return jsonResponse({
        uri: `ats://did:plc:space/${body.collection}/stub${photos.length + 1}`,
        cid: `bafyspace${photos.length + 1}`,
      });
    }

    if (path.includes("/xrpc/com.atproto.space.listRecords")) {
      if (spaceAdminDenied) {
        return jsonResponse({ message: "Forbidden" }, 403);
      }
      return jsonResponse({ records: [] });
    }

    if (path.includes("/xrpc/net.atpix.gallery.getAlbum")) {
      const url = new URL(path, "http://stub.test");
      const uri = url.searchParams.get("uri");
      const hydrateItems = url.searchParams.get("hydrateItems") === "true";
      const album = uri ? findAlbum(uri) : undefined;
      if (!album) {
        return jsonResponse({ message: "Album not found" }, 404);
      }

      const items = hydrateItems
        ? albumItems
            .filter((item) => item.albumUri === album.uri)
            .map((item) => ({ ...item, photo: item.photo }))
        : undefined;

      return jsonResponse({ album, items });
    }

    if (path.includes("/xrpc/net.atpix.gallery.listAlbumItems")) {
      const url = new URL(path, "http://stub.test");
      const albumUri = url.searchParams.get("albumUri");
      const items = albumItems.filter((item) => item.albumUri === albumUri);
      return jsonResponse({ items });
    }

    if (path.includes("/xrpc/net.atpix.gallery.addToAlbum")) {
      const body = init.body ? JSON.parse(String(init.body)) : {};
      const photo = findPhoto(body.photoUri);
      const album = findAlbum(body.albumUri);
      if (!photo || !album) {
        return jsonResponse({ message: "Album or photo not found" }, 404);
      }
      if (!albumItems.some((item) => item.albumUri === album.uri && item.photoUri === photo.uri)) {
        linkPhotoToAlbum(album, photo);
      }
      return jsonResponse({ uri: `at://did:plc:atpixuitest/net.atpix.gallery.albumItem/new`, cid: "bafyitem" });
    }

    if (path.includes("/xrpc/net.atpix.gallery.deleteAlbum")) {
      const body = init.body ? JSON.parse(String(init.body)) : {};
      albums = albums.filter((album) => album.uri !== body.uri);
      albumItems = albumItems.filter((item) => item.albumUri !== body.uri);
      return jsonResponse({});
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

/**
 * Return the first seeded public album URI for UI tests.
 *
 * @returns {string | null} Album AT URI when the public fixture is loaded.
 */
export function getStubPublicAlbumUri() {
  const album = albums.find((entry) => entry.record?.visibility === "public");
  return album?.uri ?? null;
}

/**
 * Return the first seeded permissioned album URI for UI tests.
 *
 * @returns {string | null} Album AT URI when the permissioned fixture is loaded.
 */
export function getStubPermissionedAlbumUri() {
  const album = albums.find((entry) => entry.record?.visibility === "permissioned");
  return album?.uri ?? null;
}