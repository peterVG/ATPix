import { beforeEach, describe, expect, it, vi } from "vitest";

const fetchHandler = vi.fn();

vi.mock("../../src/auth/happyViewFetch.js", () => ({
  getHappyViewFetchHandler: vi.fn(async () => fetchHandler),
}));

import {
  parseSpaceRecordRkey,
  publishPermissionedPhoto,
} from "../../src/upload/publishPermissionedPhoto.js";

describe("publishPermissionedPhoto", () => {
  beforeEach(() => {
    fetchHandler.mockReset();
  });

  it("parses record keys from space AT URIs", () => {
    expect(parseSpaceRecordRkey("ats://did:plc:space/net.atpix.gallery.photo/stub42")).toBe("stub42");
    expect(parseSpaceRecordRkey("invalid")).toBe("invalid");
  });

  it("creates photo and album-item records in order", async () => {
    const createBodies = [];

    fetchHandler.mockImplementation(async (path, init) => {
      if (path.includes("uploadBlob")) {
        return {
          ok: true,
          json: async () => ({
            blob: {
              $type: "blob",
              ref: { $link: "bafytest" },
              mimeType: "image/jpeg",
              size: 3,
            },
          }),
        };
      }

      if (path.includes("createRecord")) {
        const body = init?.body ? JSON.parse(String(init.body)) : {};
        createBodies.push(body);
        return {
          ok: true,
          json: async () => ({
            uri: `ats://did:plc:space/${body.collection}/stub1`,
            cid: "bafyrec1",
          }),
        };
      }

      return { ok: true, json: async () => ({}) };
    });

    const blob = new Blob([new Uint8Array([1, 2, 3])], { type: "image/jpeg" });
    const result = await publishPermissionedPhoto({
      signedBlob: blob,
      mimeType: "image/jpeg",
      fileName: "photo.jpg",
      spaceUri: "ats://did:plc:space/net.atpix.gallery.albumSpace/album1",
      albumUri: "at://did:plc:abc/net.atpix.gallery.album/1",
      title: "Sunset",
    });

    expect(result.status).toBe("success");
    expect(createBodies).toHaveLength(2);
    expect(createBodies[0].collection).toBe("net.atpix.gallery.photo");
    expect(createBodies[1].collection).toBe("net.atpix.gallery.albumItem");
    expect(createBodies[1].record.photoUri).toBe(
      "ats://did:plc:space/net.atpix.gallery.photo/stub1",
    );
  });

  it("rolls back the photo record when album-item creation fails", async () => {
    const calls = [];

    fetchHandler.mockImplementation(async (path, init) => {
      if (path.includes("uploadBlob")) {
        return {
          ok: true,
          json: async () => ({
            blob: {
              $type: "blob",
              ref: { $link: "bafytest" },
              mimeType: "image/jpeg",
              size: 3,
            },
          }),
        };
      }

      if (path.includes("createRecord")) {
        calls.push("create");
        if (calls.length === 1) {
          return {
            ok: true,
            json: async () => ({
              uri: "ats://did:plc:space/net.atpix.gallery.photo/stub9",
              cid: "bafyrec9",
            }),
          };
        }
        return {
          ok: false,
          status: 500,
          json: async () => ({ message: "album item failed" }),
        };
      }

      if (path.includes("deleteRecord")) {
        calls.push("delete");
        const body = init?.body ? JSON.parse(String(init.body)) : {};
        expect(body).toEqual({
          space: "ats://did:plc:space/net.atpix.gallery.albumSpace/album1",
          collection: "net.atpix.gallery.photo",
          rkey: "stub9",
        });
        return { ok: true, json: async () => ({}) };
      }

      return { ok: true, json: async () => ({}) };
    });

    const blob = new Blob([new Uint8Array([1])], { type: "image/jpeg" });
    const result = await publishPermissionedPhoto({
      signedBlob: blob,
      mimeType: "image/jpeg",
      fileName: "photo.jpg",
      spaceUri: "ats://did:plc:space/net.atpix.gallery.albumSpace/album1",
      albumUri: "at://did:plc:abc/net.atpix.gallery.album/1",
    });

    expect(result.status).toBe("error");
    expect(calls).toEqual(["create", "create", "delete"]);
  });
});