import { isTestAuthStubEnabled } from "./testAuthStub.js";

/** @constant {string} HappyView OAuth localStorage key prefix. */
const STORAGE_PREFIX = "@happyview/oauth(";

/** @constant {string} Session storage key prefix inside the OAuth adapter. */
const SESSION_PREFIX = "happyview:session:";

/** @constant {string} Last active DID pointer key inside the OAuth adapter. */
const LAST_ACTIVE_KEY = "happyview:last-active-did";

/**
 * Read a value from the HappyView browser OAuth localStorage adapter.
 *
 * @param {string} key - Unprefixed storage key.
 * @returns {string | null} Stored value when present.
 */
function readOAuthStorageValue(key) {
  if (typeof localStorage === "undefined") {
    return null;
  }

  return localStorage.getItem(`${STORAGE_PREFIX}${key})`);
}

/**
 * Return the active OAuth access token for backend C2PA embed requests.
 *
 * @returns {string | null} Bearer access token when a HappyView session exists.
 */
export function readActiveAccessToken() {
  if (isTestAuthStubEnabled()) {
    return null;
  }

  const activeDid = readOAuthStorageValue(LAST_ACTIVE_KEY);
  if (!activeDid) {
    return null;
  }

  const storedSession = readOAuthStorageValue(`${SESSION_PREFIX}${activeDid}`);
  if (!storedSession) {
    return null;
  }

  try {
    const session = JSON.parse(storedSession);
    return typeof session.accessToken === "string" ? session.accessToken : null;
  } catch {
    return null;
  }
}