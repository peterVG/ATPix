/**
 * Configuration for linking visitors to hosted PDS account registration (F-017).
 */

/**
 * Resolve the PDS self-service signup URL from Vite environment variables.
 *
 * When set, the sign-in panel shows a link for users without an atproto account.
 * Example production value: `https://pds.atpix.net/account`.
 *
 * @returns {string|undefined} Signup URL without trailing slash, or undefined when unset.
 */
export function getPdsSignupUrl() {
  const url = import.meta.env.VITE_PDS_SIGNUP_URL;
  if (typeof url !== "string" || url.trim().length === 0) {
    return undefined;
  }

  return url.trim().replace(/\/$/, "");
}