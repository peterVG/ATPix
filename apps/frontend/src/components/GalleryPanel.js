import { listPhotos } from "../api/galleryApi.js";
import { getHappyViewUrl } from "../api/happyview.js";
import { getHappyViewFetchHandler } from "../auth/happyViewFetch.js";
import { formatCreatedAtUtc } from "../gallery/formatCreatedAt.js";
import { getPendingGalleryUploads, onGalleryRefresh } from "../gallery/galleryEvents.js";
import { resolveImageUrl } from "../gallery/resolveImageUrl.js";
import { badgeClassForLabel, selectPhotoBadges } from "../gallery/selectPhotoBadge.js";
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
 * Render badge chips for a gallery card.
 *
 * @param {object} record - Photo record payload.
 * @returns {string} HTML string for badge chips.
 */
function renderBadges(record) {
  const labels = selectPhotoBadges({
    visibility: record.visibility ?? "public",
    c2paState: "trusted",
  });

  return labels
    .map((label) => {
      const modifier = badgeClassForLabel(label);
      const testId =
        label === "Trusted"
          ? "badge-trusted"
          : label === "Valid"
            ? "badge-valid"
            : label === "Invalid"
              ? "badge-invalid"
              : "badge-private";
      return `<span class="status-chip status-chip--${modifier}" data-testid="${testId}">${label}</span>`;
    })
    .join("");
}

/**
 * Render the authenticated My Gallery screen (UI-SCR-001).
 *
 * @param {object} options - Render options.
 * @param {HTMLElement} options.mount - DOM node to render into.
 * @param {{ did: string, handle?: string }} options.identity - Signed-in identity.
 * @param {() => void} options.onUpload - Upload navigation handler.
 * @returns {{ refresh: () => Promise<void> }} Panel controls.
 */
export function renderGalleryPanel({ mount, identity, onUpload }) {
  let photos = [];
  let cursor = undefined;
  let nextCursor = undefined;
  let cursorHistory = [];
  let searchQuery = "";
  let loading = true;
  let errorMessage = null;
  let pageNumber = 1;

  const renderCard = (photo, index) => {
    const record = photo.record ?? {};
    const imageUrl = resolveImageUrl(record.image, getHappyViewUrl());
    const title = record.title ? escapeHtml(record.title) : "Untitled";
    const timestamp = record.createdAt ? formatCreatedAtUtc(record.createdAt) : "";
    const imageStyle = imageUrl ? ` style="background-image:url('${imageUrl}')"` : "";

    return `
      <article class="gallery-card gallery-card--loaded" data-testid="gallery-card" data-card-index="${index}">
        <div class="gallery-card__media"${imageStyle} role="img" aria-label="${title}"></div>
        <div class="gallery-card__badges">${renderBadges(record)}</div>
        <p class="gallery-card__meta">${timestamp}</p>
      </article>
    `;
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

  const render = () => {
    const breakpoint =
      document.documentElement.dataset.breakpoint || breakpointFromWidth(window.innerWidth);
    const columns = GRID_COLUMNS[breakpoint];
    const pending = getPendingGalleryUploads();
    const filtered = filterPhotos(photos, searchQuery);
    const showEmpty = !loading && !errorMessage && filtered.length === 0 && pending.length === 0;
    const showPagination = !loading && (nextCursor || cursorHistory.length > 0);

    const cards = [
      ...pending.map((entry) => renderPendingCard(entry)),
      ...filtered.map((photo, index) => renderCard(photo, index)),
    ].join("");

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
              value="${escapeHtml(searchQuery)}"
              data-testid="gallery-search"
            />
            <button type="button" class="btn btn-primary" data-testid="gallery-upload">Upload</button>
          </div>
        </header>
        ${loading ? `<p class="gallery-status" data-testid="gallery-loading">Loading your gallery…</p>` : ""}
        ${errorMessage ? `<p class="gallery-error" data-testid="gallery-error">${escapeHtml(errorMessage)}</p>` : ""}
        ${showEmpty ? `
          <div class="gallery-empty" data-testid="gallery-empty">
            <p>Upload your first photo to start your personal archive.</p>
            <button type="button" class="btn btn-primary" data-testid="gallery-empty-upload">Upload your first photo</button>
          </div>
        ` : ""}
        <div
          class="gallery-grid"
          data-testid="gallery-grid"
          data-columns="${columns}"
          data-breakpoint="${breakpoint}"
        >
          ${cards}
        </div>
        ${showPagination ? `
          <nav class="gallery-pagination" data-testid="gallery-pagination" aria-label="Gallery pagination">
            <button type="button" class="btn btn-ghost" data-testid="gallery-page-prev" ${cursorHistory.length === 0 ? "disabled" : ""}>Previous</button>
            <span data-testid="gallery-page-label">Page ${pageNumber}</span>
            <button type="button" class="btn btn-ghost" data-testid="gallery-page-next" ${nextCursor ? "" : "disabled"}>Next</button>
          </nav>
        ` : ""}
      </section>
    `;

    bindGalleryEvents();
  };

  const loadPage = async (requestedCursor) => {
    loading = true;
    errorMessage = null;
    render();

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
      render();
    } catch (error) {
      loading = false;
      errorMessage = error instanceof Error ? error.message : "Unable to load gallery";
      render();
    }
  };

  const refresh = async () => {
    cursorHistory = [];
    pageNumber = 1;
    await loadPage(undefined);
  };

  const bindGalleryEvents = () => {
    mount.querySelector('[data-testid="gallery-upload"]')?.addEventListener("click", onUpload);
    mount.querySelector('[data-testid="gallery-empty-upload"]')?.addEventListener("click", onUpload);

    const search = mount.querySelector('[data-testid="gallery-search"]');
    if (search instanceof HTMLInputElement) {
      search.addEventListener("input", () => {
        searchQuery = search.value;
        render();
      });
    }

    mount.querySelector('[data-testid="gallery-page-next"]')?.addEventListener("click", () => {
      if (!nextCursor) {
        return;
      }
      cursorHistory.push(cursor ?? "");
      pageNumber += 1;
      void loadPage(nextCursor);
    });

    mount.querySelector('[data-testid="gallery-page-prev"]')?.addEventListener("click", () => {
      const previous = cursorHistory.pop();
      if (previous === undefined) {
        return;
      }
      pageNumber = Math.max(1, pageNumber - 1);
      void loadPage(previous || undefined);
    });
  };

  const unsubscribe = onGalleryRefresh(() => {
    void refresh();
  });

  void refresh();

  return {
    refresh,
    destroy: () => unsubscribe(),
  };
}