import { listPhotos } from "../api/galleryApi.js";
import { getHappyViewUrl } from "../api/happyview.js";
import { getHappyViewFetchHandler } from "../auth/happyViewFetch.js";
import {
  getPendingGalleryUploads,
  onGalleryRefresh,
  onPendingUploadsChange,
} from "../gallery/galleryEvents.js";
import { resolveImageUrl } from "../gallery/resolveImageUrl.js";
import { renderMediaCard } from "../gallery/renderMediaCard.js";
import { renderPhotoCaptionEditor } from "./PhotoCaptionEditor.js";
import { GALLERY_PAGE_SIZE } from "../gallery/constants.js";
import { GRID_COLUMNS, breakpointFromWidth } from "../layout/breakpoint.js";
import { escapeHtml } from "../utils/html.js";

/**
 * Filter photo views by a case-insensitive vault search query.
 *
 * @param {object[]} photos - Photo view entries.
 * @param {string} query - Vault search text.
 * @returns {object[]} Filtered photo views.
 */
function filterPhotos(photos, query) {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return photos;
  }

  return photos.filter((photo) => {
    const record = photo.record ?? {};
    const fields = [record.title, record.caption, ...(record.keywords ?? [])];
    return fields.some((value) => typeof value === "string" && value.toLowerCase().includes(needle));
  });
}

/**
 * Apply gallery card background images through DOM APIs to avoid style-attribute injection.
 *
 * @param {HTMLElement} grid - Gallery grid element.
 * @param {object[]} filteredPhotos - Photos currently visible in the grid.
 * @param {string} fallbackDid - Signed-in author DID for blob resolution.
 * @returns {void}
 */
function applyCardBackgrounds(grid, filteredPhotos, fallbackDid) {
  grid.querySelectorAll('[data-testid="gallery-card"]').forEach((card) => {
    if (!(card instanceof HTMLElement)) {
      return;
    }

    const indexValue = card.getAttribute("data-card-index");
    if (indexValue === null) {
      return;
    }

    const index = Number(indexValue);
    const photo = filteredPhotos[index];
    const media = card.querySelector(".gallery-card__media");
    if (!photo || !(media instanceof HTMLElement)) {
      return;
    }

    const record = photo.record ?? {};
    const authorDid = typeof photo.author === "string" ? photo.author : fallbackDid;
    const imageUrl = resolveImageUrl(record.image, getHappyViewUrl(), authorDid);
    if (imageUrl) {
      media.style.backgroundImage = `url("${imageUrl}")`;
    }
  });
}

/**
 * Render the authenticated My Gallery screen (UI-SCR-001).
 *
 * @param {object} options - Render options.
 * @param {HTMLElement} options.mount - DOM node to render into.
 * @param {{ did: string, handle?: string }} options.identity - Signed-in identity.
 * @param {() => void} options.onUpload - Upload navigation handler.
 * @returns {{ refresh: () => Promise<void>, destroy: () => void }} Panel controls.
 */
export function renderGalleryPanel({ mount, identity, onUpload }) {
  let photos = [];
  let cursor = undefined;
  let nextCursor = undefined;
  let cursorHistory = [];
  let searchQuery = "";
  let loading = true;
  let loadingSearchPages = false;
  let errorMessage = null;
  let pageNumber = 1;
  let eventsBound = false;
  /** @type {{ destroy: () => void } | null} */
  let activeCaptionEditor = null;

  const closeCaptionEditor = () => {
    activeCaptionEditor?.destroy();
    activeCaptionEditor = null;
    const overlay = mount.querySelector('[data-testid="gallery-caption-overlay"]');
    overlay?.remove();
  };

  const openCaptionEditor = (photo) => {
    closeCaptionEditor();
    const overlay = document.createElement("div");
    overlay.setAttribute("data-testid", "gallery-caption-overlay");
    mount.appendChild(overlay);
    activeCaptionEditor = renderPhotoCaptionEditor({
      mount: overlay,
      photo,
      onClose: closeCaptionEditor,
      onSaved: () => {
        void refresh();
      },
    });
  };

  const renderPendingCard = (pending) => `
    <article class="gallery-card gallery-card--uploading" data-testid="gallery-card-uploading">
      <div class="gallery-card__overlay" data-testid="gallery-upload-overlay">
        <span class="gallery-card__spinner" aria-hidden="true"></span>
        <p class="gallery-card__upload-label">UPLOADING…</p>
        <progress max="100" value="${pending.progress}" data-testid="gallery-upload-progress"></progress>
      </div>
      <div class="gallery-card__media"></div>
    </article>
  `;

  const buildCardsMarkup = (filtered) => {
    const pending = getPendingGalleryUploads();
    return [
      ...pending.map((entry) => renderPendingCard(entry)),
      ...filtered.map((photo, index) => renderMediaCard({ photo, index })),
    ].join("");
  };

  const ensureShell = () => {
    if (mount.querySelector('[data-testid="gallery-screen"]')) {
      return;
    }

    mount.innerHTML = `
      <section class="gallery-screen" data-testid="gallery-screen">
        <header class="route-header gallery-header">
          <div>
            <p class="label-caps">Personal archive</p>
            <h2 class="headline-md" data-testid="gallery-title">My Gallery</h2>
          </div>
          <div class="gallery-toolbar" data-testid="gallery-toolbar">
            <input
              class="sign-in-input gallery-search"
              type="search"
              placeholder="Search your vault…"
              data-testid="gallery-search"
            />
            <button type="button" class="btn btn-primary" data-testid="gallery-upload">Upload</button>
          </div>
        </header>
        <div data-gallery-dynamic></div>
      </section>
    `;

    bindPersistentEvents();
  };

  const syncView = () => {
    ensureShell();

    const breakpoint =
      document.documentElement.dataset.breakpoint || breakpointFromWidth(window.innerWidth);
    const columns = GRID_COLUMNS[breakpoint];
    const pending = getPendingGalleryUploads();
    const filtered = filterPhotos(photos, searchQuery);
    const showEmpty = !loading && !errorMessage && photos.length === 0 && pending.length === 0;
    const showNoResults =
      !loading &&
      !errorMessage &&
      searchQuery.trim().length > 0 &&
      filtered.length === 0 &&
      (photos.length > 0 || pending.length > 0);
    const showPagination = !loading && (nextCursor || cursorHistory.length > 0);

    const search = mount.querySelector('[data-testid="gallery-search"]');
    if (search instanceof HTMLInputElement && search.value !== searchQuery) {
      search.value = searchQuery;
    }

    const dynamic = mount.querySelector("[data-gallery-dynamic]");
    if (!(dynamic instanceof HTMLElement)) {
      return;
    }

    dynamic.innerHTML = `
      ${loading ? `<p class="gallery-status" data-testid="gallery-loading">Loading your gallery…</p>` : ""}
      ${loadingSearchPages ? `<p class="gallery-status" data-testid="gallery-search-loading">Searching your vault…</p>` : ""}
      ${errorMessage ? `<p class="gallery-error" data-testid="gallery-error">${escapeHtml(errorMessage)}</p>` : ""}
      ${showEmpty ? `
        <div class="gallery-empty" data-testid="gallery-empty">
          <p>Upload your first photo to start your personal archive.</p>
          <button type="button" class="btn btn-primary" data-testid="gallery-empty-upload">Upload your first photo</button>
        </div>
      ` : ""}
      ${showNoResults ? `
        <div class="gallery-empty" data-testid="gallery-no-results">
          <p>No photos match your search.</p>
        </div>
      ` : ""}
      <div
        class="gallery-grid"
        data-testid="gallery-grid"
        data-columns="${columns}"
        data-breakpoint="${breakpoint}"
      >
        ${buildCardsMarkup(filtered)}
      </div>
      ${showPagination ? `
        <nav class="gallery-pagination" data-testid="gallery-pagination" aria-label="Gallery pagination">
          <button type="button" class="btn btn-ghost" data-testid="gallery-page-prev" ${cursorHistory.length === 0 ? "disabled" : ""}>Previous</button>
          <span data-testid="gallery-page-label">Page ${pageNumber}</span>
          <button type="button" class="btn btn-ghost" data-testid="gallery-page-next" ${nextCursor ? "" : "disabled"}>Next</button>
        </nav>
      ` : ""}
    `;

    const grid = dynamic.querySelector('[data-testid="gallery-grid"]');
    if (grid instanceof HTMLElement) {
      applyCardBackgrounds(grid, filtered, identity.did);
    }
  };

  const bindPersistentEvents = () => {
    if (eventsBound) {
      return;
    }
    eventsBound = true;

    mount.addEventListener("input", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) {
        return;
      }
      if (target.dataset.testid !== "gallery-search") {
        return;
      }

      searchQuery = target.value;
      syncView();
      void loadRemainingPagesForSearch();
    });

    mount.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (target.closest('[data-testid="gallery-upload"], [data-testid="gallery-empty-upload"]')) {
        onUpload();
        return;
      }

      if (target.closest('[data-testid="gallery-page-next"]')) {
        if (!nextCursor) {
          return;
        }
        cursorHistory.push(cursor ?? "");
        pageNumber += 1;
        void loadPage(nextCursor);
        return;
      }

      if (target.closest('[data-testid="gallery-page-prev"]')) {
        const previous = cursorHistory.pop();
        if (previous === undefined) {
          return;
        }
        pageNumber = Math.max(1, pageNumber - 1);
        void loadPage(previous || undefined);
        return;
      }

      const card = target.closest('[data-testid="gallery-card"]');
      if (card instanceof HTMLElement) {
        const indexValue = card.getAttribute("data-card-index");
        if (indexValue === null) {
          return;
        }
        const photo = filterPhotos(photos, searchQuery)[Number(indexValue)];
        if (photo) {
          openCaptionEditor(photo);
        }
      }
    });
  };

  const loadPage = async (requestedCursor) => {
    loading = true;
    errorMessage = null;
    syncView();

    try {
      const fetchHandler = await getHappyViewFetchHandler();
      const page = await listPhotos(fetchHandler, {
        did: identity.did,
        limit: GALLERY_PAGE_SIZE,
        cursor: requestedCursor,
      });
      photos = page.photos ?? [];
      cursor = requestedCursor;
      nextCursor = page.cursor;
      loading = false;
      syncView();
    } catch (error) {
      loading = false;
      errorMessage = error instanceof Error ? error.message : "Unable to load gallery";
      syncView();
    }
  };

  const loadRemainingPagesForSearch = async () => {
    if (!searchQuery.trim() || !nextCursor || loadingSearchPages) {
      return;
    }

    loadingSearchPages = true;
    syncView();

    try {
      const fetchHandler = await getHappyViewFetchHandler();
      let pendingCursor = nextCursor;
      while (pendingCursor) {
        const page = await listPhotos(fetchHandler, {
          did: identity.did,
          limit: GALLERY_PAGE_SIZE,
          cursor: pendingCursor,
        });
        photos = [...photos, ...(page.photos ?? [])];
        pendingCursor = page.cursor;
      }
      nextCursor = undefined;
      cursorHistory = [];
      pageNumber = 1;
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : "Unable to search gallery";
    } finally {
      loadingSearchPages = false;
      syncView();
    }
  };

  const refresh = async () => {
    cursorHistory = [];
    pageNumber = 1;
    await loadPage(undefined);
  };

  const unsubscribeRefresh = onGalleryRefresh(() => {
    void refresh();
  });
  const unsubscribePending = onPendingUploadsChange(() => {
    syncView();
  });

  void refresh();

  return {
    refresh,
    destroy: () => {
      closeCaptionEditor();
      unsubscribeRefresh();
      unsubscribePending();
      eventsBound = false;
    },
  };
}