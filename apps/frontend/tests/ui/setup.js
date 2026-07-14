import { beforeEach } from "vitest";

import { clearHappyViewFetchHandlerCache } from "../../src/auth/happyViewFetch.js";
import { TEST_SIGNED_IN_KEY } from "../../src/auth/testAuthStub.js";
import { resetTestGalleryStub } from "../../src/gallery/testGalleryStub.js";
import { COLOR_SCHEME_STORAGE_KEY } from "../../src/theme/colorScheme.js";

beforeEach(() => {
  document.documentElement.innerHTML = "<head></head><body></body>";
  const mount = document.createElement("div");
  mount.id = "app";
  document.body.replaceChildren(mount);
  localStorage.clear();
  localStorage.setItem(TEST_SIGNED_IN_KEY, "true");
  localStorage.removeItem(COLOR_SCHEME_STORAGE_KEY);
  document.documentElement.dataset.theme = "dark";
  clearHappyViewFetchHandlerCache();
  resetTestGalleryStub();
});


