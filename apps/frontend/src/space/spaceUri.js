/**
 * Permissioned space URI helpers (ATP-0016 proposal form preferred).
 *
 * Canonical space:  at://{spaceDid}/space/{spaceType}/{skey}
 * Canonical record: at://{spaceDid}/space/{type}/{skey}/{authorDid}/{collection}/{rkey}
 *
 * HappyView may still emit legacy ats://{spaceDid}/{type}/{skey}/…; parsers accept both.
 */

/** @constant {string} Literal path marker in proposal-form space URIs. */
export const SPACE_PATH_MARKER = "space";

/** @constant {string} Default album space type NSID (ADR-010). */
export const ALBUM_SPACE_TYPE = "net.atpix.gallery.albumSpace";

/**
 * Strip a known AT Protocol URI scheme prefix.
 *
 * @param {string} uri - Full URI.
 * @returns {string} Path without scheme, or original when no known scheme.
 */
function stripScheme(uri) {
  if (typeof uri !== "string") {
    return "";
  }
  if (uri.startsWith("ats://")) {
    return uri.slice("ats://".length);
  }
  if (uri.startsWith("at://")) {
    return uri.slice("at://".length);
  }
  return uri;
}

/**
 * Whether the URI uses the proposal form with a literal `space` path segment.
 *
 * @param {string} uri - Candidate URI.
 * @returns {boolean} True when form is at://{did}/space/….
 */
export function isProposalSpaceUri(uri) {
  if (typeof uri !== "string" || !uri.startsWith("at://")) {
    return false;
  }
  const segments = stripScheme(uri).split("/").filter(Boolean);
  return segments.length >= 2 && segments[1] === SPACE_PATH_MARKER;
}

/**
 * Whether the URI uses the legacy HappyView `ats://` dialect.
 *
 * @param {string} uri - Candidate URI.
 * @returns {boolean} True when scheme is ats://.
 */
export function isDialectAtsUri(uri) {
  return typeof uri === "string" && uri.startsWith("ats://");
}

/**
 * Extract the space authority DID from a space or space-record URI.
 *
 * Supports proposal `at://{did}/space/…` and dialect `ats://{did}/…`.
 *
 * @param {string} spaceUri - Space or permissioned record URI.
 * @returns {string} Space DID when parseable, otherwise the input.
 */
export function parseSpaceDid(spaceUri) {
  if (typeof spaceUri !== "string" || spaceUri.length === 0) {
    return spaceUri;
  }
  const path = stripScheme(spaceUri);
  const did = path.split("/").filter(Boolean)[0];
  return did && did.length > 0 ? did : spaceUri;
}

/**
 * Extract the record key (final path segment) from a space record URI.
 *
 * @param {string} uri - Permissioned record URI.
 * @returns {string | null} Record key when present.
 */
export function parseSpaceRecordRkey(uri) {
  if (typeof uri !== "string" || uri.length === 0) {
    return null;
  }
  const segments = stripScheme(uri).split("/").filter(Boolean);
  const rkey = segments[segments.length - 1];
  return rkey && rkey.length > 0 ? rkey : null;
}

/**
 * Build a canonical proposal-form space URI.
 *
 * @param {string} spaceDid - Space authority DID.
 * @param {string} spaceType - Space type NSID.
 * @param {string} skey - Space key.
 * @returns {string} at://{did}/space/{type}/{skey}
 */
export function buildProposalSpaceUri(spaceDid, spaceType, skey) {
  return `at://${spaceDid}/${SPACE_PATH_MARKER}/${spaceType}/${skey}`;
}

/**
 * Build a canonical proposal-form permissioned record URI.
 *
 * @param {string} spaceDid - Space authority DID.
 * @param {string} spaceType - Space type NSID.
 * @param {string} skey - Space key.
 * @param {string} authorDid - Record author DID.
 * @param {string} collection - Collection NSID.
 * @param {string} rkey - Record key.
 * @returns {string} Full proposal record URI.
 */
export function buildProposalSpaceRecordUri(spaceDid, spaceType, skey, authorDid, collection, rkey) {
  return `at://${spaceDid}/${SPACE_PATH_MARKER}/${spaceType}/${skey}/${authorDid}/${collection}/${rkey}`;
}

/**
 * Normalize a space URI to proposal form when the dialect path is fully known.
 *
 * Converts `ats://{did}/{type}/{skey}` → `at://{did}/space/{type}/{skey}`.
 * Leaves proposal URIs and non-space public `at://` URIs unchanged.
 *
 * @param {string} uri - Space URI (ats:// or at://…/space/…).
 * @returns {string} Proposal-form space URI when conversion applies; otherwise original.
 */
export function normalizeSpaceUriToProposal(uri) {
  if (typeof uri !== "string" || uri.length === 0) {
    return uri;
  }
  if (isProposalSpaceUri(uri)) {
    return uri;
  }
  if (!isDialectAtsUri(uri)) {
    return uri;
  }
  const segments = stripScheme(uri).split("/").filter(Boolean);
  // Space only: did / type / skey
  if (segments.length === 3) {
    const [spaceDid, spaceType, skey] = segments;
    return buildProposalSpaceUri(spaceDid, spaceType, skey);
  }
  // Record: did / type / skey / author / collection / rkey
  if (segments.length === 6) {
    const [spaceDid, spaceType, skey, authorDid, collection, rkey] = segments;
    return buildProposalSpaceRecordUri(spaceDid, spaceType, skey, authorDid, collection, rkey);
  }
  return uri;
}
