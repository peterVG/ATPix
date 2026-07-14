import { createAlbum, listAlbums } from "../api/galleryApi.js";
import { getHappyViewFetchHandler } from "../auth/happyViewFetch.js";
import { albumDetailHref, navigateToAlbum } from "../router/router.js";
import { renderVisibilityChip } from "../gallery/visibilityChip.js";
import { escapeHtml } from "../utils/html.js";

/** @typedef {"public" | "unlisted" | "permissioned"} AlbumVisibility */

/**
 * Render the authenticated albums list and creation form.
 *
 * @param {object} options - Render options.
 * @param {HTMLElement} options.mount - DOM node to render into.
 * @param {{ did: string, handle?: string }} options.identity - Signed-in identity.
 * @returns {{ refresh: () => Promise<void>, destroy: () => void }} Panel controls.
 */
export function renderAlbumsPanel({ mount, identity }) {
  /** @type {object[]} */
  let albums = [];
  let loading = true;
  let creating = false;
  let errorMessage = null;
  let createName = "";
  let createDescription = "";
  /** @type {AlbumVisibility} */
  let createVisibility = "public";

  const visibilityOptions = [
    { value: "public", label: "Public" },
    { value: "unlisted", label: "Unlisted" },
    { value: "permissioned", label: "Permissioned" },
  ];

  const renderVisibilityChips = () =>
    visibilityOptions
      .map((option) => {
        const active = createVisibility === option.value;
        return `
          <button
            type="button"
            class="visibility-chip${active ? " visibility-chip--active" : ""}"
            data-visibility="${option.value}"
            data-testid="album-visibility-${option.value}"
            aria-pressed="${active ? "true" : "false"}"
          >${option.label}</button>
        `;
      })
      .join("");

  const renderAlbumCards = () => {
    if (albums.length === 0) {
      return `
        <div class="gallery-empty" data-testid="albums-empty">
          <p>Create your first album to organize uploads.</p>
        </div>
      `;
    }

    return `
      <div class="album-list" data-testid="album-list">
        ${albums
          .map((album) => {
            const record = album.record ?? {};
            const name = escapeHtml(record.name ?? "Untitled album");
            const visibility = record.visibility ?? "public";
            return `
              <a class="album-card" href="${albumDetailHref(album.uri)}" data-testid="album-card">
                <div class="album-card__header">
                  ${renderVisibilityChip(visibility, `album-card-visibility-${visibility}`)}
                  <h3 class="album-card__title">${name}</h3>
                </div>
                <p class="metadata-code album-card__uri">${escapeHtml(album.uri)}</p>
              </a>
            `;
          })
          .join("")}
      </div>
    `;
  };

  const syncView = () => {
    mount.innerHTML = `
      <section class="albums-screen" data-testid="albums-screen">
        <header class="route-header gallery-header">
          <div>
            <p class="label-caps">Collections</p>
            <h2 class="headline-md" data-testid="albums-title">Albums</h2>
          </div>
        </header>
        <form class="album-create" data-testid="album-create-form">
          <h3 class="headline-md">Create album</h3>
          <label class="sign-in-label" for="album-create-name">Name</label>
          <input
            id="album-create-name"
            class="sign-in-input"
            data-testid="album-create-name"
            maxlength="200"
            value="${escapeHtml(createName)}"
            required
          />
          <label class="sign-in-label" for="album-create-description">Description</label>
          <textarea
            id="album-create-description"
            class="sign-in-input"
            data-testid="album-create-description"
            maxlength="5000"
            rows="2"
          >${escapeHtml(createDescription)}</textarea>
          <p class="label-caps">Visibility</p>
          <div class="visibility-chip-row" data-testid="album-visibility-chips">${renderVisibilityChips()}</div>
          <button type="submit" class="btn btn-primary" data-testid="album-create-submit" ${creating ? "disabled" : ""}>
            ${creating ? "Creating…" : "Create album"}
          </button>
        </form>
        ${loading ? `<p class="gallery-status" data-testid="albums-loading">Loading albums…</p>` : ""}
        ${errorMessage ? `<p class="gallery-error" data-testid="albums-error">${escapeHtml(errorMessage)}</p>` : ""}
        ${!loading ? renderAlbumCards() : ""}
      </section>
    `;

    const nameInput = mount.querySelector('[data-testid="album-create-name"]');
    if (nameInput instanceof HTMLInputElement && nameInput.value !== createName) {
      nameInput.value = createName;
    }
  };

  const loadAlbums = async () => {
    loading = true;
    errorMessage = null;
    syncView();

    try {
      const fetchHandler = await getHappyViewFetchHandler();
      const page = await listAlbums(fetchHandler, { did: identity.did, limit: 50 });
      albums = page.albums ?? [];
      loading = false;
      syncView();
    } catch (error) {
      loading = false;
      errorMessage = error instanceof Error ? error.message : "Unable to load albums";
      syncView();
    }
  };

  const submitCreate = async () => {
    const trimmedName = createName.trim();
    if (!trimmedName) {
      errorMessage = "Album name is required.";
      syncView();
      return;
    }

    creating = true;
    errorMessage = null;
    syncView();

    try {
      const fetchHandler = await getHappyViewFetchHandler();
      const created = await createAlbum(fetchHandler, {
        name: trimmedName,
        description: createDescription.trim() || undefined,
        visibility: createVisibility,
      });
      creating = false;
      createName = "";
      createDescription = "";
      navigateToAlbum(created.uri);
    } catch (error) {
      creating = false;
      errorMessage = error instanceof Error ? error.message : "Unable to create album";
      syncView();
    }
  };

  const onInput = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) {
      return;
    }

    if (target.dataset.testid === "album-create-name") {
      createName = target.value;
      return;
    }

    if (target.dataset.testid === "album-create-description") {
      createDescription = target.value;
    }
  };

  const onClick = (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const visibilityButton = target.closest("[data-visibility]");
    if (visibilityButton instanceof HTMLElement) {
      const next = visibilityButton.dataset.visibility;
      if (next === "public" || next === "unlisted" || next === "permissioned") {
        createVisibility = next;
        syncView();
      }
    }
  };

  const onSubmit = (event) => {
    if (!(event.target instanceof HTMLFormElement)) {
      return;
    }
    if (!event.target.matches('[data-testid="album-create-form"]')) {
      return;
    }

    event.preventDefault();
    void submitCreate();
  };

  mount.addEventListener("input", onInput);
  mount.addEventListener("click", onClick);
  mount.addEventListener("submit", onSubmit);
  void loadAlbums();

  return {
    refresh: loadAlbums,
    destroy: () => {
      mount.removeEventListener("input", onInput);
      mount.removeEventListener("click", onClick);
      mount.removeEventListener("submit", onSubmit);
    },
  };
}