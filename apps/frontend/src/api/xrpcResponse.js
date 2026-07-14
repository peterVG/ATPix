/**
 * Shared HappyView XRPC response parsers for gallery and space API modules.
 */

/**
 * Parse an XRPC JSON response or throw a descriptive error.
 *
 * @param {Response} response - Fetch response from HappyView.
 * @returns {Promise<object>} Parsed JSON body.
 */
export async function parseXrpcJson(response) {
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
 * Confirm an XRPC procedure succeeded when the response has no JSON body.
 *
 * @param {Response} response - Fetch response from HappyView.
 * @returns {Promise<void>} Resolves when the response is successful.
 */
export async function parseXrpcVoid(response) {
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