import { getHappyViewUrl } from "./api/happyview.js";
import { clearHappyViewFetchHandlerCache } from "./auth/happyViewFetch.js";
import { bootstrapApp } from "./components/App.js";
import { resetTestGalleryStub } from "./gallery/testGalleryStub.js";
import { updateLayoutBreakpoint } from "./layout/breakpoint.js";

/**
 * Mount or remount the ATPix application into `#app`.
 *
 * @returns {Promise<import("./components/App.js").AppViewState | null>} View state after bootstrap.
 */
export async function mountAtpixApp() {
  const mount = document.getElementById("app");
  if (!mount) {
    return null;
  }

  return bootstrapApp({ mount, happyviewUrl: getHappyViewUrl() });
}

if (import.meta.env.VITE_TEST_AUTH_STUB === "true") {
  globalThis.__ATPIX_MOUNT__ = mountAtpixApp;
  globalThis.__ATPIX_UPDATE_BREAKPOINT__ = updateLayoutBreakpoint;
  if (import.meta.env.VITE_TEST_GALLERY_STUB === "true") {
    globalThis.__ATPIX_RESET_GALLERY_STUB__ = () => {
      clearHappyViewFetchHandlerCache();
      resetTestGalleryStub();
    };
  }
} else {
  mountAtpixApp().catch((error) => {
    console.error("ATPix bootstrap failed", error);
    const mount = document.getElementById("app");
    if (mount) {
      mount.innerHTML = `<p role="alert">Failed to start ATPix. Check console for details.</p>`;
    }
  });
}
