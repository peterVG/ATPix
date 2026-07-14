/**
 * HappyView Permissioned Spaces XRPC helpers (SRS-F-008, ADR-010).
 */

import { buildXrpcHeaders } from "./happyview.js";

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
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return body;
}

/**
 * List members of a permissioned space.
 *
 * @param {(path: string, init?: RequestInit) => Promise<Response>} fetchHandler - DPoP fetch handler.
 * @param {object} params - listMembers query parameters.
 * @returns {Promise<{ members: object[] }>} Member directory page.
 */
export async function listSpaceMembers(fetchHandler, params) {
  const search = new URLSearchParams();
  search.set("space", params.space);

  const response = await fetchHandler(
    `/xrpc/com.atproto.simplespace.listMembers?${search.toString()}`,
    {
      method: "GET",
      headers: buildXrpcHeaders(),
    },
  );

  return parseXrpcJson(response);
}

/**
 * Add a member to a permissioned space by DID.
 *
 * @param {(path: string, init?: RequestInit) => Promise<Response>} fetchHandler - DPoP fetch handler.
 * @param {object} input - addMember procedure input.
 * @returns {Promise<object>} Add member response.
 */
export async function addSpaceMember(fetchHandler, input) {
  const response = await fetchHandler("/xrpc/com.atproto.simplespace.addMember", {
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
 * Create an invite token for a permissioned space.
 *
 * @param {(path: string, init?: RequestInit) => Promise<Response>} fetchHandler - DPoP fetch handler.
 * @param {object} input - createInvite procedure input.
 * @returns {Promise<{ token: string, inviteId: string }>} Invite payload.
 */
export async function createSpaceInvite(fetchHandler, input) {
  const response = await fetchHandler("/xrpc/dev.happyview.space.createInvite", {
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
 * Fetch space metadata for an album space.
 *
 * @param {(path: string, init?: RequestInit) => Promise<Response>} fetchHandler - DPoP fetch handler.
 * @param {object} params - getSpace query parameters.
 * @returns {Promise<object>} Space view payload.
 */
export async function getSpace(fetchHandler, params) {
  const search = new URLSearchParams();
  search.set("space", params.space);

  const response = await fetchHandler(`/xrpc/com.atproto.space.getSpace?${search.toString()}`, {
    method: "GET",
    headers: buildXrpcHeaders(),
  });

  return parseXrpcJson(response);
}

/**
 * List records in a permissioned space collection.
 *
 * @param {(path: string, init?: RequestInit) => Promise<Response>} fetchHandler - DPoP fetch handler.
 * @param {object} params - listRecords query parameters.
 * @returns {Promise<{ records: object[] }>} Record page.
 */
export async function listSpaceRecords(fetchHandler, params) {
  const search = new URLSearchParams();
  search.set("space", params.space);
  search.set("collection", params.collection);
  search.set("limit", String(params.limit ?? 50));

  const response = await fetchHandler(`/xrpc/com.atproto.space.listRecords?${search.toString()}`, {
    method: "GET",
    headers: buildXrpcHeaders(),
  });

  return parseXrpcJson(response);
}

/**
 * Create a record inside a permissioned space.
 *
 * @param {(path: string, init?: RequestInit) => Promise<Response>} fetchHandler - DPoP fetch handler.
 * @param {object} input - createRecord procedure input.
 * @returns {Promise<{ uri: string, cid: string }>} Created record identifiers.
 */
export async function createSpaceRecord(fetchHandler, input) {
  const response = await fetchHandler("/xrpc/com.atproto.space.createRecord", {
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
 * Delete a record from a permissioned space (rollback helper for upload flows).
 *
 * @param {(path: string, init?: RequestInit) => Promise<Response>} fetchHandler - DPoP fetch handler.
 * @param {object} input - deleteRecord procedure input.
 * @returns {Promise<void>} Resolves when deletion succeeds.
 */
export async function deleteSpaceRecord(fetchHandler, input) {
  const response = await fetchHandler("/xrpc/com.atproto.space.deleteRecord", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...buildXrpcHeaders(),
    },
    body: JSON.stringify(input),
  });

  if (response.ok) {
    return;
  }

  let body = {};
  try {
    body = await response.json();
  } catch {
    body = {};
  }

  const message = typeof body.message === "string" ? body.message : `HTTP ${response.status}`;
  const error = new Error(message);
  error.status = response.status;
  throw error;
}

/**
 * Build a gated blob URL for permissioned space thumbnails (Bearer credential path documented in README).
 *
 * @param {string} happyViewUrl - HappyView base URL.
 * @param {string} spaceUri - Space AT URI.
 * @param {string} cid - Blob CID link.
 * @returns {string} Absolute getBlob URL (requires membership/credential at fetch time).
 */
export function buildSpaceBlobUrl(happyViewUrl, spaceUri, cid) {
  const base = happyViewUrl.replace(/\/$/, "");
  const search = new URLSearchParams({ space: spaceUri, cid });
  return `${base}/xrpc/com.atproto.space.getBlob?${search.toString()}`;
}

/**
 * Resolve a handle to a DID via HappyView identity API.
 *
 * @param {(path: string, init?: RequestInit) => Promise<Response>} fetchHandler - DPoP fetch handler.
 * @param {string} handle - atproto handle (with or without leading @).
 * @returns {Promise<string>} Resolved DID.
 */
export async function resolveHandleToDid(fetchHandler, handle) {
  const normalized = handle.replace(/^@/, "").trim();
  const search = new URLSearchParams({ handle: normalized });
  const response = await fetchHandler(`/xrpc/com.atproto.identity.resolveHandle?${search.toString()}`, {
    method: "GET",
    headers: buildXrpcHeaders(),
  });

  const payload = await parseXrpcJson(response);
  if (typeof payload.did !== "string") {
    throw new Error("Handle could not be resolved");
  }

  return payload.did;
}

/**
 * Map HappyView member access to UI-SCR-006 role labels.
 *
 * @param {object} member - Member entry from listMembers.
 * @param {string} ownerDid - Space authority DID.
 * @returns {"ADMIN" | "MEMBER" | "VIEWER"} UI role label.
 */
export function mapMemberRole(member, ownerDid) {
  if (member.did === ownerDid || member.isOwner) {
    return "ADMIN";
  }

  if (member.access === "write" || member.access === "read_self") {
    return "MEMBER";
  }

  return "VIEWER";
}