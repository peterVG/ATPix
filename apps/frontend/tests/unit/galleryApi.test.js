import { describe, expect, it, vi } from "vitest";

import { createPhoto, listPhotos, uploadBlob } from "../../src/api/galleryApi.js";

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
      expect.objectContaining({ method: "POST" }),
    );
    expect(result.uri).toContain("net.atpix.gallery.photo");
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
});