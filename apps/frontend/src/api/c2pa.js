import { readActiveAccessToken } from "../auth/getAccessToken.js";
import { MAX_OUTPUT_BYTES } from "../upload/constants.js";
import { getBackendUrl } from "./backend.js";
import { isTestC2paStubEnabled, stubEmbedManifest } from "../c2pa/testC2paStub.js";

/**
 * @typedef {object} C2paEmbedResult
 * @property {Blob} signedBlob - Manifest-bearing image bytes.
 * @property {string} firstAction - First `c2pa.actions` entry after signing.
 * @property {string} creatorDid - DID recorded in `net.atpix.gallery.creatorDid`.
 */

/**
 * Embed a C2PA manifest in an image file before `uploadBlob`.
 *
 * @param {object} options - Embed options.
 * @param {File} options.file - Selected image file.
 * @param {string} options.creatorDid - Signed-in user DID.
 * @param {boolean} [options.includeGps=false] - Whether optional GPS metadata is allowed.
 * @param {boolean} [options.includeDevice=false] - Whether optional device metadata is allowed.
 * @returns {Promise<C2paEmbedResult>} Signed blob and manifest metadata.
 */
export async function embedManifestBeforeUpload({
  file,
  creatorDid,
  includeGps = false,
  includeDevice = false,
}) {
  if (isTestC2paStubEnabled()) {
    return stubEmbedManifest(file, creatorDid);
  }

  const formData = new FormData();
  formData.append("file", file, file.name);
  formData.append("creator_did", creatorDid);
  formData.append("include_gps", String(includeGps));
  formData.append("include_device", String(includeDevice));

  const headers = {};
  const accessToken = readActiveAccessToken();
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${getBackendUrl()}/c2pa/manifest/embed`, {
    method: "POST",
    body: formData,
    headers,
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `C2PA embed failed with status ${response.status}`);
  }

  const signedBlob = await response.blob();
  if (signedBlob.size > MAX_OUTPUT_BYTES) {
    throw new Error("Signed file exceeds the 50 MB upload limit after C2PA embedding");
  }

  return {
    signedBlob,
    firstAction: response.headers.get("X-C2PA-First-Action") ?? "c2pa.created",
    creatorDid: response.headers.get("X-C2PA-Creator-Did") ?? creatorDid,
  };
}