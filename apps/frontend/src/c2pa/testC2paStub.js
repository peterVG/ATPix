/**
 * Test-only C2PA embed stub for production-build UI tests.
 */

/**
 * Return true when the C2PA test stub build flag is enabled.
 *
 * @returns {boolean} Whether stub C2PA embedding should be used.
 */
export function isTestC2paStubEnabled() {
  return import.meta.env.VITE_TEST_C2PA_STUB === "true";
}

/**
 * Simulate a signed manifest response for UI tests.
 *
 * @param {File} file - Selected image file.
 * @param {string} creatorDid - Uploader DID.
 * @returns {Promise<{ signedBlob: Blob, firstAction: string, creatorDid: string }>} Stub result.
 */
export async function stubEmbedManifest(file, creatorDid) {
  return {
    signedBlob: file,
    firstAction: "c2pa.created",
    creatorDid,
  };
}