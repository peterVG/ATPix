import { describe, expect, it, vi } from "vitest";

import {
  addToAlbum,
  createAlbum,
  createPhoto,
  deleteAlbum,
  listAlbums,
  listPhotos,
  updatePhoto,
  uploadBlob,
} from "../../src/api/galleryApi.js";

describe("galleryApi", () => {
  it("uploadBlob posts signed bytes to com.atproto.repo.uploadBlob", async () => {
    const fetchHandler = vi.fn(async () => ({
      ok: true,
      json: async () => ({
        blob: {
          $type: "blob",
          ref: { $link: "bafytest" },
          mimeType: "image/jpeg",
          size: 1200,
        },
      }),
    }));

    const blob = new Blob([new Uint8Array([1, 2, 3])], { type: "image/jpeg" });
    const result = await uploadBlob(fetchHandler, blob, "image/jpeg");

    expect(fetchHandler).toHaveBeenCalledWith(
      "/xrpc/com.atproto.repo.uploadBlob",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ "Content-Type": "image/jpeg" }),
        body: expect.any(Blob),
      }),
    );
    expect(result.ref.$link).toBe("bafytest");
  });

  it("createPhoto posts JSON to net.atpix.gallery.createPhoto", async () => {
    const fetchHandler = vi.fn(async () => ({
      ok: true,
      json: async () => ({ uri: "at://did:plc:abc/net.atpix.gallery.photo/1", cid: "bafyrec" }),
    }));

    const result = await createPhoto(fetchHandler, {
      image: { $type: "blob", ref: { $link: "bafytest" }, mimeType: "image/jpeg", size: 3 },
      visibility: "public",
      title: "Sunset",
    });

    expect(fetchHandler).toHaveBeenCalledWith(
      "/xrpc/net.atpix.gallery.createPhoto",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          image: { $type: "blob", ref: { $link: "bafytest" }, mimeType: "image/jpeg", size: 3 },
          visibility: "public",
          title: "Sunset",
        }),
      }),
    );
    expect(result.uri).toContain("net.atpix.gallery.photo");
  });

  it("rejects malformed JSON on successful XRPC responses", async () => {
    const fetchHandler = vi.fn(async () => ({
      ok: true,
      json: async () => {
        throw new Error("invalid json");
      },
    }));

    await expect(uploadBlob(fetchHandler, new Blob(["x"]), "image/jpeg")).rejects.toThrow(
      "Invalid JSON in XRPC response",
    );
  });

  it("listPhotos queries did and cursor parameters", async () => {
    const fetchHandler = vi.fn(async () => ({
      ok: true,
      json: async () => ({ photos: [], cursor: "cursor-2" }),
    }));

    await listPhotos(fetchHandler, { did: "did:plc:abc", limit: 20, cursor: "cursor-1" });

    expect(fetchHandler).toHaveBeenCalledWith(
      "/xrpc/net.atpix.gallery.listPhotos?did=did%3Aplc%3Aabc&limit=20&cursor=cursor-1",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("createAlbum posts JSON to net.atpix.gallery.createAlbum", async () => {
    const fetchHandler = vi.fn(async () => ({
      ok: true,
      json: async () => ({
        uri: "at://did:plc:abc/net.atpix.gallery.album/1",
        cid: "bafyalbum",
      }),
    }));

    await createAlbum(fetchHandler, { name: "Summer Trip", visibility: "public" });

    expect(fetchHandler).toHaveBeenCalledWith(
      "/xrpc/net.atpix.gallery.createAlbum",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ name: "Summer Trip", visibility: "public" }),
      }),
    );
  });

  it("listAlbums queries author DID", async () => {
    const fetchHandler = vi.fn(async () => ({
      ok: true,
      json: async () => ({ albums: [] }),
    }));

    await listAlbums(fetchHandler, { did: "did:plc:abc", limit: 20 });

    expect(fetchHandler).toHaveBeenCalledWith(
      "/xrpc/net.atpix.gallery.listAlbums?did=did%3Aplc%3Aabc&limit=20",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("addToAlbum posts album and photo URIs", async () => {
    const fetchHandler = vi.fn(async () => ({
      ok: true,
      json: async () => ({ uri: "at://did:plc:abc/net.atpix.gallery.albumItem/1", cid: "bafyitem" }),
    }));

    await addToAlbum(fetchHandler, {
      albumUri: "at://did:plc:abc/net.atpix.gallery.album/1",
      photoUri: "at://did:plc:abc/net.atpix.gallery.photo/1",
    });

    expect(fetchHandler).toHaveBeenCalledWith(
      "/xrpc/net.atpix.gallery.addToAlbum",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("updatePhoto posts caption and keywords", async () => {
    const fetchHandler = vi.fn(async () => ({
      ok: true,
      json: async () => ({ uri: "at://did:plc:abc/net.atpix.gallery.photo/1", cid: "bafyrec" }),
    }));

    await updatePhoto(fetchHandler, {
      uri: "at://did:plc:abc/net.atpix.gallery.photo/1",
      caption: "New caption",
      keywords: ["nature"],
    });

    expect(fetchHandler).toHaveBeenCalledWith(
      "/xrpc/net.atpix.gallery.updatePhoto",
      expect.objectContaining({
        body: JSON.stringify({
          uri: "at://did:plc:abc/net.atpix.gallery.photo/1",
          caption: "New caption",
          keywords: ["nature"],
        }),
      }),
    );
  });

  it("deleteAlbum posts album URI", async () => {
    const fetchHandler = vi.fn(async () => ({
      ok: true,
      json: async () => ({}),
    }));

    await deleteAlbum(fetchHandler, { uri: "at://did:plc:abc/net.atpix.gallery.album/1" });

    expect(fetchHandler).toHaveBeenCalledWith(
      "/xrpc/net.atpix.gallery.deleteAlbum",
      expect.objectContaining({ method: "POST" }),
    );
  });
});