import { escapeHtml } from "../utils/html.js";

import { prepareUploadFile } from "../upload/prepareUploadFile.js";

/**
 * @typedef {import("../upload/prepareUploadFile.js").PreparedUploadFile} PreparedUploadFile
 */

/**
 * @typedef {object} UploadQueueItem
 * @property {string} id - Queue item id.
 * @property {string} name - Filename label.
 * @property {"selected" | "signing" | "ready" | "error"} state - UI state.
 * @property {number} [progress] - Percent complete while signing.
 * @property {boolean} [c2paSigned] - Whether C2PA signing completed.
 * @property {string} [errorMessage] - Actionable error copy.
 * @property {PreparedUploadFile} [prepared] - Signed output when ready.
 */

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

  const displayHandle = identity.handle ? `@${identity.handle}` : identity.did;

  const render = () => {
    const activeItem = queue.find((item) => item.id === activeId) ?? queue[0] ?? null;
    const queueMarkup = queue
      .map((item) => {
        const activeClass = item.id === activeItem?.id ? " upload-queue__item--active" : "";
        const progress =
          item.state === "signing"
            ? `<span class="upload-queue__progress" data-testid="upload-progress">${item.progress ?? 0}% Signing C2PA manifest</span>`
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
            ${c2paBadge}
            ${error}
            ${retry}
          </li>
        `;
      })
      .join("");

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
              <div class="format-chips" data-testid="upload-format-chips">
                <span class="format-chip">RAW</span>
                <span class="format-chip">PNG</span>
                <span class="format-chip">JPEG</span>
              </div>
              <input type="file" accept="image/jpeg,image/png,image/webp" multiple hidden data-testid="upload-input" />
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
            <div class="tag-pills" data-testid="upload-tag-pills"></div>
            <section class="upload-destination" data-testid="upload-destination">
              <p class="label-caps">Destination</p>
              <label class="destination-card destination-card--active">
                <input type="radio" name="destination" value="public" checked data-testid="destination-public" />
                <span>My Public Repository</span>
              </label>
              <label class="destination-card">
                <input type="radio" name="destination" value="permissioned" data-testid="destination-permissioned" />
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
            <p class="upload-step" data-testid="upload-c2pa-step">C2PA signing runs before blob upload.</p>
          </aside>
        </div>
      </section>
    `;

    bindUploadPanelEvents();
  };

  const signFile = async (file) => {
    const itemId = crypto.randomUUID();
    queue = [
      ...queue,
      {
        id: itemId,
        name: file.name,
        state: "signing",
        progress: 35,
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
        progress: 100,
        c2paSigned: true,
        prepared,
      };
    });
    render();
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

    const blob = existing.prepared?.signedBlob ?? new Blob();
    const retryFile = new File([blob], existing.name, { type: blob.type || "image/jpeg" });
    await signFile(retryFile);
  };

  const bindUploadPanelEvents = () => {
    const input = mount.querySelector('[data-testid="upload-input"]');
    const browse = mount.querySelector('[data-testid="upload-browse"]');
    const dropzone = mount.querySelector('[data-testid="upload-dropzone"]');
    const gpsToggle = mount.querySelector('[data-testid="privacy-gps"]');
    const deviceToggle = mount.querySelector('[data-testid="privacy-device"]');

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

  render();

  return {
    getQueue: () => queue,
    retryItem,
  };
}