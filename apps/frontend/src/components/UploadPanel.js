import { notifyGalleryRefresh, setPendingGalleryUploads } from "../gallery/galleryEvents.js";
import {
  C2PA_EMBED_ACCEPT,
  UPLOAD_FORMAT_LABELS,
} from "../upload/constants.js";
import { prepareUploadFile } from "../upload/prepareUploadFile.js";
import { publishPreparedPhoto } from "../upload/publishPreparedPhoto.js";
import { escapeHtml } from "../utils/html.js";

/**
 * @typedef {import("../upload/prepareUploadFile.js").PreparedUploadFile} PreparedUploadFile
 */

/**
 * @typedef {object} UploadQueueItem
 * @property {string} id - Queue item id.
 * @property {string} name - Filename label.
 * @property {File} sourceFile - Original browser file for retries.
 * @property {"selected" | "signing" | "ready" | "uploading" | "complete" | "error"} state - UI state.
 * @property {number} [uploadProgress] - Transfer progress percentage.
 * @property {boolean} [c2paSigned] - Whether C2PA signing completed.
 * @property {string} [errorMessage] - Actionable error copy.
 * @property {PreparedUploadFile} [prepared] - Signed output when ready.
 */

/**
 * Parse comma-separated tag input into normalized labels.
 *
 * @param {string} raw - Raw tag input value.
 * @returns {string[]} Distinct non-empty tag labels.
 */
function parseTags(raw) {
  const seen = new Set();
  const tags = [];

  for (const part of raw.split(",")) {
    const label = part.trim();
    if (!label || seen.has(label)) {
      continue;
    }
    seen.add(label);
    tags.push(label);
  }

  return tags;
}

/**
 * Render the upload workspace main content (UI-SCR-005).
 *
 * @param {object} options - Render options.
 * @param {HTMLElement} options.mount - DOM node to render into.
 * @param {{ did: string, handle?: string }} options.identity - Signed-in identity.
 * @returns {{ getQueue: () => UploadQueueItem[], retryItem: (id: string) => Promise<void> }} Panel controls.
 */
export function renderUploadPanel({ mount, identity }) {
  /** @type {UploadQueueItem[]} */
  let queue = [];
  /** @type {string | null} */
  let activeId = null;
  let includeGps = false;
  let includeDevice = false;
  let destination = "public";
  /** @type {string[]} */
  let tags = [];

  const displayHandle = identity.handle ? `@${identity.handle}` : identity.did;

  const renderTagPills = () =>
    tags
      .map(
        (tag, index) => `
          <button
            type="button"
            class="tag-pill"
            data-testid="upload-tag-pill"
            data-tag-index="${index}"
          >
            ${escapeHtml(tag)} <span aria-hidden="true">×</span>
          </button>
        `,
      )
      .join("");

  const render = () => {
    const activeItem = queue.find((item) => item.id === activeId) ?? queue[0] ?? null;
    const queueMarkup = queue
      .map((item) => {
        const activeClass = item.id === activeItem?.id ? " upload-queue__item--active" : "";
        const progress =
          item.state === "signing"
            ? `<span class="upload-queue__progress upload-queue__progress--indeterminate" data-testid="upload-progress">Signing C2PA manifest…</span>`
            : item.state === "uploading"
              ? `<progress class="upload-queue__bar" max="100" value="${item.uploadProgress ?? 0}" data-testid="upload-progress"></progress>`
              : "";
        const complete =
          item.state === "complete"
            ? `<span class="status-chip status-chip--trusted" data-testid="upload-complete">Uploaded</span>`
            : "";
        const c2paBadge = item.c2paSigned
          ? `<span class="status-chip status-chip--trusted" data-testid="upload-c2pa-badge">C2PA</span>`
          : "";
        const error = item.errorMessage
          ? `<p class="upload-queue__error" data-testid="upload-error">${escapeHtml(item.errorMessage)}</p>`
          : "";
        const retry = item.state === "error"
          ? `<button type="button" class="btn btn-ghost" data-testid="upload-retry" data-retry-id="${item.id}">Retry</button>`
          : "";

        return `
          <li class="upload-queue__item${activeClass}" data-testid="upload-queue-item" data-item-id="${item.id}">
            <button type="button" class="upload-queue__select" data-select-id="${item.id}">${escapeHtml(item.name)}</button>
            ${progress}
            ${complete}
            ${c2paBadge}
            ${error}
            ${retry}
          </li>
        `;
      })
      .join("");

    const formatChips = UPLOAD_FORMAT_LABELS.map(
      (label) => `<span class="format-chip">${label}</span>`,
    ).join("");

    const publicDestinationClass =
      destination === "public" ? " destination-card destination-card--active" : " destination-card";
    const permissionedDestinationClass =
      destination === "permissioned"
        ? " destination-card destination-card--active"
        : " destination-card";

    mount.innerHTML = `
      <section class="upload-screen" data-testid="upload-screen">
        <header class="route-header">
          <p class="label-caps">Upload workspace</p>
          <h2 class="headline-md" data-testid="upload-title">Upload Media</h2>
        </header>
        <div class="upload-layout">
          <div class="upload-main">
            <div class="upload-dropzone" data-testid="upload-dropzone">
              <p class="upload-dropzone__title">Upload Media</p>
              <p class="upload-dropzone__hint">
                Drag and drop images here or <button type="button" class="link-btn" data-testid="upload-browse">browse files</button>
              </p>
              <div class="format-chips" data-testid="upload-format-chips">${formatChips}</div>
              <input type="file" accept="${C2PA_EMBED_ACCEPT}" multiple hidden data-testid="upload-input" />
            </div>
            <ul class="upload-queue" data-testid="upload-queue">${queueMarkup}</ul>
          </div>
          <aside class="upload-sidebar" data-testid="upload-sidebar">
            <section class="upload-provenance" data-testid="upload-provenance">
              <p class="label-caps">Provenance identity</p>
              <p class="metadata-code" data-testid="upload-signer-did">ATPix will sign this photo as created by: ${escapeHtml(displayHandle)}</p>
            </section>
            <label class="sign-in-label" for="upload-title-input">Title</label>
            <input id="upload-title-input" class="sign-in-input" data-testid="upload-title-input" />
            <label class="sign-in-label" for="upload-caption-input">Caption</label>
            <input id="upload-caption-input" class="sign-in-input" data-testid="upload-caption-input" />
            <label class="sign-in-label" for="upload-tags-input">Tags</label>
            <input id="upload-tags-input" class="sign-in-input" data-testid="upload-tags-input" placeholder="sunset, lake" />
            <div class="tag-pills" data-testid="upload-tag-pills">${renderTagPills()}</div>
            <section class="upload-destination" data-testid="upload-destination">
              <p class="label-caps">Destination</p>
              <label class="${publicDestinationClass}">
                <input type="radio" name="destination" value="public" ${destination === "public" ? "checked" : ""} data-testid="destination-public" />
                <span>My Public Repository</span>
              </label>
              <label class="${permissionedDestinationClass}">
                <input type="radio" name="destination" value="permissioned" ${destination === "permissioned" ? "checked" : ""} data-testid="destination-permissioned" />
                <span>Permissioned Space — visible to invited members only</span>
                <small>Membership-gated access via HappyView spaces (not encrypted).</small>
              </label>
            </section>
            <section class="upload-privacy" data-testid="upload-privacy">
              <p class="label-caps">Privacy controls</p>
              <label><input type="checkbox" data-testid="privacy-gps" /> Include GPS metadata</label>
              <label><input type="checkbox" data-testid="privacy-device" /> Include device identifiers</label>
              <p class="upload-privacy__note" data-testid="privacy-required-note">Required integrity assertions (actions and hash) always remain enabled.</p>
            </section>
            <p class="upload-step" data-testid="upload-c2pa-step">C2PA signing runs before blob upload to your PDS.</p>
            ${
              destination === "permissioned"
                ? `<p class="upload-step upload-step--note" data-testid="upload-permissioned-note">Permissioned uploads ship in a later release. Choose My Public Repository for Path A uploads.</p>`
                : ""
            }
          </aside>
        </div>
      </section>
    `;

    bindUploadPanelEvents();
  };

  const readPublishMetadata = () => {
    const titleInput = mount.querySelector('[data-testid="upload-title-input"]');
    const captionInput = mount.querySelector('[data-testid="upload-caption-input"]');
    return {
      title: titleInput instanceof HTMLInputElement ? titleInput.value.trim() : "",
      caption: captionInput instanceof HTMLInputElement ? captionInput.value.trim() : "",
      keywords: tags,
    };
  };

  const publishItem = async (itemId) => {
    const item = queue.find((entry) => entry.id === itemId);
    if (!item?.prepared?.signedBlob) {
      return;
    }

    queue = queue.map((entry) =>
      entry.id === itemId ? { ...entry, state: "uploading", uploadProgress: 0, errorMessage: undefined } : entry,
    );
    setPendingGalleryUploads([
      { id: itemId, label: item.name, progress: 0 },
    ]);
    render();

    const metadata = readPublishMetadata();
    const result = await publishPreparedPhoto({
      signedBlob: item.prepared.signedBlob,
      mimeType: item.sourceFile.type,
      fileName: item.name,
      visibility: "public",
      title: metadata.title || undefined,
      caption: metadata.caption || undefined,
      keywords: metadata.keywords.length > 0 ? metadata.keywords : undefined,
      onProgress: (progress) => {
        queue = queue.map((entry) =>
          entry.id === itemId ? { ...entry, uploadProgress: progress } : entry,
        );
        setPendingGalleryUploads([{ id: itemId, label: item.name, progress }]);
        render();
      },
    });

    setPendingGalleryUploads([]);

    if (result.status === "error") {
      queue = queue.map((entry) =>
        entry.id === itemId
          ? { ...entry, state: "error", errorMessage: result.errorMessage ?? "Upload failed" }
          : entry,
      );
      render();
      return;
    }

    queue = queue.map((entry) =>
      entry.id === itemId ? { ...entry, state: "complete", uploadProgress: 100 } : entry,
    );
    notifyGalleryRefresh();
    render();
  };

  const signFile = async (file, itemId = crypto.randomUUID()) => {
    queue = [
      ...queue,
      {
        id: itemId,
        name: file.name,
        sourceFile: file,
        state: "signing",
      },
    ];
    activeId = itemId;
    render();

    const prepared = await prepareUploadFile({
      file,
      creatorDid: identity.did,
      includeGps,
      includeDevice,
    });

    queue = queue.map((item) => {
      if (item.id !== itemId) {
        return item;
      }

      if (prepared.status === "error") {
        return {
          ...item,
          state: "error",
          errorMessage: prepared.errorMessage ?? "C2PA signing failed",
          c2paSigned: false,
        };
      }

      return {
        ...item,
        state: "ready",
        c2paSigned: true,
        prepared,
      };
    });
    render();

    const signedItem = queue.find((entry) => entry.id === itemId);
    if (destination === "public" && signedItem?.state === "ready") {
      await publishItem(itemId);
    }
  };

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList);
    for (const file of files) {
      await signFile(file);
    }
  };

  const retryItem = async (id) => {
    const existing = queue.find((item) => item.id === id);
    if (!existing) {
      return;
    }

    queue = queue.filter((item) => item.id !== id);
    render();
    await signFile(existing.sourceFile, id);
  };

  const bindUploadPanelEvents = () => {
    const input = mount.querySelector('[data-testid="upload-input"]');
    const browse = mount.querySelector('[data-testid="upload-browse"]');
    const dropzone = mount.querySelector('[data-testid="upload-dropzone"]');
    const gpsToggle = mount.querySelector('[data-testid="privacy-gps"]');
    const deviceToggle = mount.querySelector('[data-testid="privacy-device"]');
    const tagsInput = mount.querySelector('[data-testid="upload-tags-input"]');

    browse?.addEventListener("click", () => {
      if (input instanceof HTMLInputElement) {
        input.click();
      }
    });

    input?.addEventListener("change", () => {
      if (input instanceof HTMLInputElement && input.files) {
        void handleFiles(input.files);
        input.value = "";
      }
    });

    dropzone?.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    dropzone?.addEventListener("drop", (event) => {
      event.preventDefault();
      if (event.dataTransfer?.files) {
        void handleFiles(event.dataTransfer.files);
      }
    });

    if (gpsToggle instanceof HTMLInputElement) {
      gpsToggle.checked = includeGps;
      gpsToggle.addEventListener("change", () => {
        includeGps = gpsToggle.checked;
      });
    }

    if (deviceToggle instanceof HTMLInputElement) {
      deviceToggle.checked = includeDevice;
      deviceToggle.addEventListener("change", () => {
        includeDevice = deviceToggle.checked;
      });
    }

    if (tagsInput instanceof HTMLInputElement) {
      tagsInput.value = tags.join(", ");
      tagsInput.addEventListener("input", () => {
        tags = parseTags(tagsInput.value);
        const pills = mount.querySelector('[data-testid="upload-tag-pills"]');
        if (pills instanceof HTMLElement) {
          pills.innerHTML = renderTagPills();
          bindTagPillEvents();
        }
      });
    }

    mount.querySelectorAll('input[name="destination"]').forEach((radio) => {
      radio.addEventListener("change", () => {
        if (radio instanceof HTMLInputElement && radio.checked) {
          destination = radio.value;
          render();
        }
      });
    });

    bindTagPillEvents();

    mount.querySelectorAll("[data-select-id]").forEach((button) => {
      button.addEventListener("click", () => {
        activeId = button.getAttribute("data-select-id");
        render();
      });
    });

    mount.querySelectorAll("[data-retry-id]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-retry-id");
        if (id) {
          void retryItem(id);
        }
      });
    });
  };

  const bindTagPillEvents = () => {
    mount.querySelectorAll("[data-tag-index]").forEach((button) => {
      button.addEventListener("click", () => {
        const indexValue = button.getAttribute("data-tag-index");
        const index = Number(indexValue);
        if (!Number.isInteger(index) || index < 0 || index >= tags.length) {
          return;
        }
        tags = tags.filter((_, tagIndex) => tagIndex !== index);
        render();
      });
    });
  };

  render();

  return {
    getQueue: () => queue,
    retryItem,
  };
}