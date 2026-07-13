import { defineConfig } from "vite";

import { oauthClientMetadataPlugin } from "./plugins/oauthClientMetadataPlugin.js";

export default defineConfig({
  appType: "spa",
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
