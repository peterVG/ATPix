import { updatePhoto } from "../api/galleryApi.js";
import { getHappyViewFetchHandler } from "../auth/happyViewFetch.js";
import {
  CAPTION_MAX_LENGTH,
  KEYWORD_MAX_LENGTH,
  KEYWORDS_MAX_COUNT,
  validateCaptionLength,
} from "../gallery/captionLimits.js";
import { escapeHtml } from "../utils/html.js";

/**
 * Render a reusable photo caption and keyword editor modal (SRS-F-005).
 *
 * @param {object} options - Editor options.
 * @param {HTMLElement} options.mount - DOM node to render into.
 * @param {object} options.photo - Photo view entry.
 * @param {() => void} options.onClose - Close handler without saving.
 * @param {() => void} [options.onSaved] - Callback after successful save.
 * @returns {{ destroy: () => void }} Panel teardown controls.
 */
export function renderPhotoCaptionEditor({ mount, photo, onClose, onSaved }) {
  const record = photo.record ?? {};
  let caption = typeof record.caption === "string" ? record.caption : "";
  let keywords = Array.isArray(record.keywords) ? [...record.keywords] : [];
  let tagInput = "";
  let saving = false;
  let errorMessage = null;

  const renderKeywordPills = () =>
    keywords
      .map(
        (tag) => `
          <span class="tag-pill" data-testid="caption-tag-pill">
            ${escapeHtml(tag)}
            <button type="button" class="tag-pill__remove" data-remove-tag="${escapeHtml(tag)}" aria-label="Remove ${escapeHtml(tag)}">×</button>
          </span>
        `,
      )
      .join("");

  const syncView = () => {
    mount.innerHTML = `
      <div class="modal-backdrop" data-testid="caption-editor-backdrop">
        <section class="modal-panel caption-editor" data-testid="caption-editor" role="dialog" aria-labelledby="caption-editor-title">
          <header class="modal-panel__header">
            <h3 id="caption-editor-title" class="headline-md">Edit caption & tags</h3>
            <button type="button" class="icon-btn" data-testid="caption-editor-close" aria-label="Close editor">×</button>
          </header>
          <label class="sign-in-label" for="caption-editor-input">Caption</label>
          <textarea
            id="caption-editor-input"
            class="sign-in-input caption-editor__input"
            data-testid="caption-editor-input"
            maxlength="${CAPTION_MAX_LENGTH}"
            rows="4"
          >${escapeHtml(caption)}</textarea>
          <p class="caption-editor__counter" data-testid="caption-char-count">${caption.length} / ${CAPTION_MAX_LENGTH}</p>
          <p class="label-caps">Keywords</p>
          <div class="tag-pill-row" data-testid="caption-tag-list">${renderKeywordPills()}</div>
          <input
            class="sign-in-input"
            data-testid="caption-tag-input"
            placeholder="Add tag and press Enter"
            value="${escapeHtml(tagInput)}"
          />
          ${errorMessage ? `<p class="gallery-error" data-testid="caption-editor-error">${escapeHtml(errorMessage)}</p>` : ""}
          <footer class="modal-panel__footer">
            <button type="button" class="btn btn-ghost" data-testid="caption-editor-cancel">Cancel</button>
            <button type="button" class="btn btn-primary" data-testid="caption-editor-save" ${saving ? "disabled" : ""}>
              ${saving ? "Saving…" : "Save"}
            </button>
          </footer>
        </section>
      </div>
    `;

    const textarea = mount.querySelector('[data-testid="caption-editor-input"]');
    if (textarea instanceof HTMLTextAreaElement && textarea.value !== caption) {
      textarea.value = caption;
    }
  };

  const addTag = (raw) => {
    const normalized = raw.trim().replace(/^#/, "").toLowerCase();
    if (!normalized || normalized.length > KEYWORD_MAX_LENGTH) {
      return;
    }
    if (keywords.length >= KEYWORDS_MAX_COUNT) {
      return;
    }
    if (keywords.includes(normalized)) {
      return;
    }

    keywords = [...keywords, normalized];
    tagInput = "";
    errorMessage = null;
    syncView();
  };

  const save = async () => {
    const validation = validateCaptionLength(caption);
    if (!validation.valid) {
      errorMessage = validation.message ?? "Caption is too long.";
      syncView();
      return;
    }

    saving = true;
    errorMessage = null;
    syncView();

    try {
      const fetchHandler = await getHappyViewFetchHandler();
      await updatePhoto(fetchHandler, {
        uri: photo.uri,
        caption: caption.trim() || undefined,
        keywords,
      });
      onSaved?.();
      onClose();
    } catch (error) {
      saving = false;
      errorMessage = error instanceof Error ? error.message : "Unable to save caption";
      syncView();
    }
  };

  const onClick = (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    if (target.closest('[data-testid="caption-editor-close"], [data-testid="caption-editor-cancel"]')) {
      onClose();
      return;
    }

    if (target.closest('[data-testid="caption-editor-backdrop"]') && target === target.closest('[data-testid="caption-editor-backdrop"]')) {
      onClose();
      return;
    }

    const removeTag = target.closest("[data-remove-tag]");
    if (removeTag instanceof HTMLElement) {
      const tag = removeTag.getAttribute("data-remove-tag");
      keywords = keywords.filter((entry) => entry !== tag);
      syncView();
      return;
    }

    if (target.closest('[data-testid="caption-editor-save"]')) {
      void save();
    }
  };

  const onInput = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) {
      return;
    }

    if (target.dataset.testid === "caption-editor-input") {
      caption = target.value;
      syncView();
      return;
    }

    if (target.dataset.testid === "caption-tag-input") {
      tagInput = target.value;
    }
  };

  const onKeyDown = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    if (target.dataset.testid !== "caption-tag-input" || event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    addTag(target.value);
  };

  mount.addEventListener("click", onClick);
  mount.addEventListener("input", onInput);
  mount.addEventListener("keydown", onKeyDown);
  syncView();

  return {
    destroy: () => {
      mount.removeEventListener("click", onClick);
      mount.removeEventListener("input", onInput);
      mount.removeEventListener("keydown", onKeyDown);
      mount.innerHTML = "";
    },
  };
}