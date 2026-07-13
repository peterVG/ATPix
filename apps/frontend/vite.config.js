import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

import { oauthClientMetadataPlugin } from "./plugins/oauthClientMetadataPlugin.js";

const frontendRoot = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(frontendRoot, "../..");

export default defineConfig({
  appType: "spa",
  envDir: repoRoot,
  root: ".",
  publicDir: "public",
  plugins: [oauthClientMetadataPlugin()],
  server: {
    port: 5173,
    strictPort: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
