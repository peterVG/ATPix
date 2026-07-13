/**
 * Vite plugin that serves and emits atproto OAuth client metadata.
 *
 * - Dev/preview: dynamic JSON at `/oauth-client-metadata.json` from request Host.
 * - Build: static `dist/oauth-client-metadata.json` from `VITE_DEPLOYMENT_ORIGIN`.
 */

import { writeFileSync } from "node:fs";
import path from "node:path";

import { buildOAuthClientMetadata } from "../src/config/oauthClientMetadata.js";

const METADATA_PATH = "/oauth-client-metadata.json";

/**
 * Resolve deployment origin from an incoming HTTP request.
 *
 * @param {import("http").IncomingMessage} req - Node HTTP request.
 * @returns {string} Origin without trailing slash.
 */
function originFromRequest(req) {
  const host = req.headers.host;
  if (!host) {
    return "http://127.0.0.1:5173";
  }

  const forwardedProto = req.headers["x-forwarded-proto"];
  const protocol =
    typeof forwardedProto === "string" && forwardedProto.length > 0
      ? forwardedProto.split(",")[0].trim()
      : "http";

  return `${protocol}://${host}`.replace(/\/+$/, "");
}

/**
 * Write JSON metadata response for OAuth client discovery.
 *
 * @param {import("http").ServerResponse} res - Node HTTP response.
 * @param {string} origin - Deployment origin.
 * @returns {void}
 */
function sendMetadataResponse(res, origin) {
  const body = JSON.stringify(buildOAuthClientMetadata(origin), null, 2);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(body);
}

/**
 * Install middleware that serves OAuth client metadata on dev/preview servers.
 *
 * @param {import("vite").Connect.Server} middlewares - Vite connect stack.
 * @returns {void}
 */
function attachMetadataMiddleware(middlewares) {
  middlewares.use((req, res, next) => {
    if (!req.url || req.url.split("?")[0] !== METADATA_PATH) {
      next();
      return;
    }

    sendMetadataResponse(res, originFromRequest(req));
  });
}

/**
 * Create the Vite plugin for OAuth client metadata.
 *
 * @returns {import("vite").Plugin} Vite plugin instance.
 */
export function oauthClientMetadataPlugin() {
  return {
    name: "atpix-oauth-client-metadata",
    configureServer(server) {
      attachMetadataMiddleware(server.middlewares);
    },
    configurePreviewServer(server) {
      attachMetadataMiddleware(server.middlewares);
    },
    closeBundle() {
      const configuredOrigin = process.env.VITE_DEPLOYMENT_ORIGIN;
      const origin =
        typeof configuredOrigin === "string" && configuredOrigin.length > 0
          ? configuredOrigin
          : "http://127.0.0.1:5173";

      const outDir = path.resolve(process.cwd(), "dist");
      const metadata = buildOAuthClientMetadata(origin);
      const targetPath = path.join(outDir, "oauth-client-metadata.json");

      writeFileSync(targetPath, `${JSON.stringify(metadata, null, 2)}\n`, "utf8");
    },
  };
}
