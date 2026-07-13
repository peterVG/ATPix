/**
 * Test-only OAuth session stub for production-build UI tests (`vite build --mode test`).
 */

/** @constant {string} localStorage gate for signed-in UI test bootstrap. */
export const TEST_SIGNED_IN_KEY = "atpix-test-signed-in";

/**
 * Return true when the test auth stub build flag is enabled.
 *
 * @returns {boolean} Whether stub OAuth should be used.
 */
export function isTestAuthStubEnabled() {
  return import.meta.env.VITE_TEST_AUTH_STUB === "true";
}

/**
 * Return true when UI tests should bootstrap a signed-in shell session.
 *
 * @returns {boolean} Whether to inject a mock session on startup.
 */
export function shouldBootstrapTestSession() {
  if (!isTestAuthStubEnabled()) {
    return false;
  }

  return localStorage.getItem(TEST_SIGNED_IN_KEY) !== "false";
}

/**
 * Build a minimal mock session for shell UI tests.
 *
 * @returns {{ did: string, handle: string }} Mock authenticated identity.
 */
export function createTestSession() {
  return {
    did: "did:plc:atpixuitest",
    handle: "atpix-ui.test",
  };
}
