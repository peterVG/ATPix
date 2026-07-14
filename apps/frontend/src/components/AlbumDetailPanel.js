import { addToAlbum, deleteAlbum, getAlbum, listPhotos } from "../api/galleryApi.js";
import { getHappyViewFetchHandler } from "../auth/happyViewFetch.js";
import { applyCardBackgrounds } from "../gallery/applyCardBackgrounds.js";
import { normalizeAlbumPhotoItem } from "../gallery/normalizeAlbumItem.js";
import { isVerifiedPhotoRecord, renderMediaCard } from "../gallery/renderMediaCard.js";
import { renderVisibilityChip } from "../gallery/visibilityChip.js";
import { GRID_COLUMNS, breakpointFromWidth } from "../layout/breakpoint.js";
import { albumDetailHref, navigateToRoute, navigateToSpaceAdmin } from "../router/router.js";
import { escapeHtml } from "../utils/html.js";

/** @typedef {"all" | "verified" | "collaborators"} AlbumTab */

/**
 * Build a stable share URL for the current album hash route.
 *
 * @param {string} albumUri - Album AT URI.
 * @returns {string} Absolute share URL.
 */
function buildAlbumShareLink(albumUri) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}${albumDetailHref(albumUri)}`;
}

/**
 * Summarize C2PA validation counts with neutral wording.
 *
 * @param {object[]} photos - Hydrated photo views in the album.
 * @returns {string} Neutral provenance summary sentence.
 */
function buildProvenanceSummary(photos) {
  let trusted = 0;
  let valid = 0;
  let invalid = 0;

  photos.forEach((photo) => {
    const state = photo.record?.c2paValidationState;
    if (state === "trusted") {
      trusted += 1;
      return;
    }
    if (state === "invalid") {
      invalid += 1;
      return;
    }
    if (state === "wellFormed" || state === "valid") {
      valid += 1;
    }
  });

  return `${trusted} Trusted · ${valid} Valid · ${invalid} Invalid manifest states in this album.`;
}

/**
 * Render UI-SCR-004 album detail with holistic permissioned gating.
 *
 * @param {object} options - Render options.
 * @param {HTMLElement} options.mount - DOM node to render into.
 * @param {{ did: string, handle?: string }} options.identity - Signed-in identity.
 * @param {string} options.albumUri - Album AT URI from the hash route.
 * @returns {{ refresh: () => Promise<void>, destroy: () => void }} Panel controls.
 */
export function renderAlbumDetailPanel({ mount, identity, albumUri }) {
  let albumView = null;
  /** @type {object[]} */
  let memberPhotos = [];
  /** @type {AlbumTab} */
  let activeTab = "all";
  let loading = true;
  let errorMessage = null;
  let showDestroyConfirm = false;
  let showManagePhotos = false;
  let availablePhotos = [];
  let managingPhotos = false;
  let destroying = false;

  const record = () => albumView?.record ?? {};
  const visibility = () => record().visibility ?? "public";
  const isPermissioned = () => visibility() === "permissioned";

  const filteredPhotos = () => {
    if (activeTab === "verified") {
      return memberPhotos.filter((photo) => isVerifiedPhotoRecord(photo.record ?? {}));
    }
    return memberPhotos;
  };

  const renderTabs = () => {
    const tabs = [
      { id: "all", label: "All Media" },
      { id: "verified", label: "Verified Only" },
      { id: "collaborators", label: "Collaborators" },
    ];

    return tabs
      .map((tab) => {
        const active = activeTab === tab.id;
        return `
          <button
            type="button"
            class="album-tab${active ? " chip--active" : ""}"
            data-album-tab="${tab.id}"
            data-testid="album-tab-${tab.id}"
            aria-pressed="${active ? "true" : "false"}"
          >${tab.label}</button>
        `;
      })
      .join("");
  };

  const renderPermissionedActions = () => {
    if (!isPermissioned()) {
      return "";
    }

    return `
      <button type="button" class="btn btn-primary" data-testid="album-invite-members">
        Invite Members
      </button>
    `;
  };

  const renderShareLink = () => {
    if (isPermissioned()) {
      return "";
    }

    const shareUrl = buildAlbumShareLink(albumUri);
    return `
      <div class="album-sidebar__field" data-testid="album-share-link">
        <p class="label-caps">Share link</p>
        <a class="album-share-link metadata-code" href="${escapeHtml(shareUrl)}" target="_blank" rel="noopener noreferrer">
          ${escapeHtml(shareUrl)}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    `;
  };

  const renderSpaceUri = () => {
    if (!isPermissioned()) {
      return "";
    }

    const spaceUri = record().spaceUri ?? "ats://pending.space.uri";
    return `
      <div class="album-sidebar__field" data-testid="album-space-uri">
        <p class="label-caps">Space URI</p>
        <p class="metadata-code album-space-uri">${escapeHtml(spaceUri)}</p>
        <button type="button" class="btn btn-ghost btn-sm" data-testid="album-space-uri-copy">Copy</button>
      </div>
    `;
  };

  const renderCollaboratorsPanel = () => {
    if (!isPermissioned()) {
      return `
        <div class="album-collaborators" data-testid="album-collaborators-panel">
          <p data-testid="album-collaborator-empty">Public and unlisted albums do not use permissioned space collaborators.</p>
        </div>
      `;
    }

    return `
      <div class="album-collaborators" data-testid="album-collaborators-panel">
        <p data-testid="album-collaborator-empty">Open space administration to manage collaborators.</p>
        <button type="button" class="btn btn-ghost btn-sm" data-testid="album-open-space-admin">Manage space</button>
      </div>
    `;
  };

  const renderManagePhotosModal = () => {
    if (!showManagePhotos) {
      return "";
    }

    const options = availablePhotos
      .map((photo) => {
        const title = escapeHtml(photo.record?.title ?? "Untitled");
        const alreadyMember = memberPhotos.some((member) => member.uri === photo.uri);
        return `
          <label class="manage-photo-option">
            <input type="checkbox" data-photo-uri="${escapeHtml(photo.uri)}" ${alreadyMember ? "checked disabled" : ""} />
            <span>${title}</span>
          </label>
        `;
      })
      .join("");

    return `
      <div class="modal-backdrop" data-testid="manage-photos-backdrop">
        <section class="modal-panel" data-testid="manage-photos-modal" role="dialog" aria-label="Manage album photos">
          <h3 class="headline-md">Add photos from your uploads</h3>
          <div class="manage-photo-list">${options || "<p>No uploads available yet.</p>"}</div>
          <footer class="modal-panel__footer">
            <button type="button" class="btn btn-ghost" data-testid="manage-photos-cancel">Cancel</button>
            <button type="button" class="btn btn-primary" data-testid="manage-photos-save" ${managingPhotos ? "disabled" : ""}>
              ${managingPhotos ? "Saving…" : "Add selected"}
            </button>
          </footer>
        </section>
      </div>
    `;
  };

  const renderDestroyConfirm = () => {
    if (!showDestroyConfirm) {
      return "";
    }

    return `
      <div class="modal-backdrop" data-testid="destroy-album-backdrop">
        <section class="modal-panel" data-testid="destroy-album-dialog" role="alertdialog" aria-labelledby="destroy-album-title">
          <h3 id="destroy-album-title" class="headline-md">Destroy album?</h3>
          <p>Photos in this album will remain in your gallery. This removes the album and its membership links only.</p>
          <footer class="modal-panel__footer">
            <button type="button" class="btn btn-ghost" data-testid="destroy-album-cancel">Cancel</button>
            <button type="button" class="btn btn-danger" data-testid="destroy-album-confirm" ${destroying ? "disabled" : ""}>
              ${destroying ? "Destroying…" : "Destroy Album"}
            </button>
          </footer>
        </section>
      </div>
    `;
  };

  const syncView = () => {
    const breakpoint =
      document.documentElement.dataset.breakpoint || breakpointFromWidth(window.innerWidth);
    const columns = GRID_COLUMNS[breakpoint];
    const albumRecord = record();
    const title = escapeHtml(albumRecord.name ?? "Album");
    const description = escapeHtml(albumRecord.description ?? "");
    const photosForGrid = activeTab === "collaborators" ? [] : filteredPhotos();

    const headerMarkup = loading
      ? `<p class="gallery-status" data-testid="album-loading">Loading album…</p>`
      : `
        <header class="album-detail__header">
          <div class="album-detail__title-block">
            ${renderVisibilityChip(visibility())}
            <p class="metadata-code album-detail__uri" data-testid="album-at-uri">${escapeHtml(albumUri)}</p>
            <h2 class="display-lg" data-testid="album-title">${title}</h2>
            ${description ? `<p class="album-detail__description" data-testid="album-description">${description}</p>` : ""}
          </div>
          <div class="album-detail__actions">
            ${renderPermissionedActions()}
            <button type="button" class="btn btn-ghost" data-testid="album-manage-photos">Manage Photos</button>
          </div>
        </header>
      `;

    const bodyMarkup = loading
      ? ""
      : `
        <div class="album-detail__body">
          <div class="album-detail__main">
            <nav class="album-tabs" data-testid="album-tabs" aria-label="Album content filters">${renderTabs()}</nav>
            ${errorMessage ? `<p class="gallery-error" data-testid="album-error">${escapeHtml(errorMessage)}</p>` : ""}
            ${activeTab === "collaborators" ? renderCollaboratorsPanel() : `
              <div
                class="gallery-grid"
                data-testid="album-media-grid"
                data-columns="${columns}"
                data-breakpoint="${breakpoint}"
              >
                ${photosForGrid.map((photo, index) => renderMediaCard({ photo, index })).join("")}
              </div>
            `}
          </div>
          <aside class="album-sidebar" data-testid="album-sidebar">
            ${renderSpaceUri()}
            ${renderShareLink()}
            <div class="album-sidebar__field" data-testid="album-provenance-summary">
              <p class="label-caps">Provenance summary</p>
              <p>${escapeHtml(buildProvenanceSummary(memberPhotos))}</p>
            </div>
            <button type="button" class="btn btn-danger btn-block" data-testid="album-destroy">Destroy Album</button>
          </aside>
        </div>
      `;

    mount.innerHTML = `
      <section class="album-detail" data-testid="album-detail-screen">
        ${headerMarkup}
        ${bodyMarkup}
        ${renderManagePhotosModal()}
        ${renderDestroyConfirm()}
      </section>
    `;

    const grid = mount.querySelector('[data-testid="album-media-grid"]');
    if (grid instanceof HTMLElement) {
      void applyCardBackgrounds(grid, photosForGrid, identity.did);
    }
  };

  const loadAlbum = async () => {
    loading = true;
    errorMessage = null;
    syncView();

    try {
      const fetchHandler = await getHappyViewFetchHandler();
      const payload = await getAlbum(fetchHandler, { uri: albumUri, hydrateItems: true });
      albumView = payload.album;
      memberPhotos = (payload.items ?? [])
        .map((item) => normalizeAlbumPhotoItem(item))
        .filter((photo) => photo !== null);
      loading = false;
      syncView();
    } catch (error) {
      loading = false;
      errorMessage = error instanceof Error ? error.message : "Unable to load album";
      syncView();
    }
  };

  const openManagePhotos = async () => {
    showManagePhotos = true;
    syncView();

    try {
      const fetchHandler = await getHappyViewFetchHandler();
      let collected = [];
      let pendingCursor = undefined;
      do {
        const page = await listPhotos(fetchHandler, {
          did: identity.did,
          limit: 100,
          cursor: pendingCursor,
        });
        collected = [...collected, ...(page.photos ?? [])];
        pendingCursor = page.cursor;
      } while (pendingCursor);
      availablePhotos = collected;
      syncView();
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : "Unable to load uploads";
      showManagePhotos = false;
      syncView();
    }
  };

  const saveManagedPhotos = async () => {
    const modal = mount.querySelector('[data-testid="manage-photos-modal"]');
    if (!(modal instanceof HTMLElement)) {
      return;
    }

    const selected = [...modal.querySelectorAll('input[type="checkbox"]:checked:not(:disabled)')]
      .map((input) => (input instanceof HTMLInputElement ? input.getAttribute("data-photo-uri") : null))
      .filter((uri) => typeof uri === "string");

    if (selected.length === 0) {
      showManagePhotos = false;
      syncView();
      return;
    }

    managingPhotos = true;
    syncView();

    try {
      const fetchHandler = await getHappyViewFetchHandler();
      for (const photoUri of selected) {
        await addToAlbum(fetchHandler, { albumUri, photoUri });
      }
      showManagePhotos = false;
      managingPhotos = false;
      await loadAlbum();
    } catch (error) {
      managingPhotos = false;
      errorMessage = error instanceof Error ? error.message : "Unable to add photos";
      syncView();
    }
  };

  const confirmDestroy = async () => {
    destroying = true;
    syncView();

    try {
      const fetchHandler = await getHappyViewFetchHandler();
      await deleteAlbum(fetchHandler, { uri: albumUri, deleteSpace: isPermissioned() });
      destroying = false;
      showDestroyConfirm = false;
      navigateToRoute("albums");
    } catch (error) {
      destroying = false;
      errorMessage = error instanceof Error ? error.message : "Unable to delete album";
      syncView();
    }
  };

  const onClick = (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const tab = target.closest("[data-album-tab]");
    if (tab instanceof HTMLElement) {
      const next = tab.dataset.albumTab;
      if (next === "all" || next === "verified" || next === "collaborators") {
        activeTab = next;
        syncView();
      }
      return;
    }

    if (target.closest('[data-testid="album-manage-photos"]')) {
      void openManagePhotos();
      return;
    }

    if (target.closest('[data-testid="manage-photos-cancel"]')) {
      showManagePhotos = false;
      syncView();
      return;
    }

    const manageBackdrop = target.closest('[data-testid="manage-photos-backdrop"]');
    if (manageBackdrop instanceof HTMLElement && manageBackdrop === target) {
      showManagePhotos = false;
      syncView();
      return;
    }

    if (target.closest('[data-testid="manage-photos-save"]')) {
      void saveManagedPhotos();
      return;
    }

    if (target.closest('[data-testid="album-destroy"]')) {
      showDestroyConfirm = true;
      syncView();
      return;
    }

    if (target.closest('[data-testid="destroy-album-cancel"]')) {
      showDestroyConfirm = false;
      syncView();
      return;
    }

    if (target.closest('[data-testid="destroy-album-confirm"]')) {
      void confirmDestroy();
      return;
    }

    if (target.closest('[data-testid="album-space-uri-copy"]')) {
      const spaceUri = record().spaceUri;
      if (spaceUri && navigator.clipboard?.writeText) {
        void navigator.clipboard.writeText(spaceUri);
      }
      return;
    }

    if (target.closest('[data-testid="album-invite-members"]')) {
      navigateToSpaceAdmin(albumUri);
      return;
    }

    if (target.closest('[data-testid="album-open-space-admin"]')) {
      navigateToSpaceAdmin(albumUri);
    }
  };

  mount.addEventListener("click", onClick);
  void loadAlbum();

  return {
    refresh: loadAlbum,
    destroy: () => {
      mount.removeEventListener("click", onClick);
    },
  };
}