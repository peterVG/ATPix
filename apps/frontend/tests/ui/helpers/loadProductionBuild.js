import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { vi } from "vitest";

const FRONTEND_ROOT = join(dirname(fileURLToPath(import.meta.url)), "../../..");

/**
 * Parse a built asset path from `dist/index.html`.
 *
 * @param {string} html - Contents of `dist/index.html`.
 * @param {"script" | "stylesheet"} kind - Asset kind to locate.
 * @returns {string} Absolute path to the hashed asset file.
 */
function distAssetPath(html, kind) {
  const pattern =
    kind === "script" ? /src="(\/assets\/index-[^"]+\.js)"/ : /href="(\/assets\/index-[^"]+\.css)"/;
  const match = html.match(pattern);
  if (!match) {
    throw new Error(`Could not find ${kind} asset in dist/index.html`);
  }

  return join(FRONTEND_ROOT, "dist", match[1].replace(/^\//, ""));
}

/**
 * Resize the jsdom viewport and refresh layout breakpoint hooks.
 *
 * @param {number} width - Viewport width in pixels.
 * @param {number} height - Viewport height in pixels.
 * @returns {void}
 */
export function resizeViewport(width, height) {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: width });
  Object.defineProperty(window, "innerHeight", { configurable: true, value: height });
  window.dispatchEvent(new Event("resize"));

  if (typeof globalThis.__ATPIX_UPDATE_BREAKPOINT__ === "function") {
    globalThis.__ATPIX_UPDATE_BREAKPOINT__();
  }
}

/**
 * Load the production Vite bundle into the current jsdom document.
 *
 * @param {object} [options] - Load options.
 * @param {string} [options.url] - Document URL hash target (e.g. `http://127.0.0.1:5173/#/gallery`).
 * @returns {Promise<void>} Resolves after the bundle executes and mounts.
 */
export async function loadProductionBuild(options = {}) {
  const html = readFileSync(join(FRONTEND_ROOT, "dist/index.html"), "utf-8");
  const cssPath = distAssetPath(html, "stylesheet");
  const scriptPath = distAssetPath(html, "script");

  document.head.querySelectorAll("style[data-atpix-dist]").forEach((node) => node.remove());

  const style = document.createElement("style");
  style.setAttribute("data-atpix-dist", "true");
  style.textContent = readFileSync(cssPath, "utf-8");
  document.head.appendChild(style);

  if (options.url) {
    const target = new URL(options.url);
    window.location.hash = target.hash;
  }

  vi.resetModules();
  const scriptUrl = `${pathToFileURL(scriptPath).href}?t=${Date.now()}`;
  await import(scriptUrl);

  if (typeof globalThis.__ATPIX_TEARDOWN__ === "function") {
    globalThis.__ATPIX_TEARDOWN__();
    globalThis.__ATPIX_TEARDOWN__ = undefined;
  }

  const mountFn = globalThis.__ATPIX_MOUNT__;
  if (typeof mountFn !== "function") {
    throw new Error("Test build did not expose globalThis.__ATPIX_MOUNT__");
  }

  await mountFn();

  const deadline = Date.now() + 3000;
  while (Date.now() < deadline) {
    const mounted =
      document.querySelector('[data-testid="app-shell"]') ??
      document.querySelector('[data-testid="sign-in-panel"]');
    if (mounted) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 25));
  }

  throw new Error("Production bundle did not mount shell or sign-in panel within 3s");
}
