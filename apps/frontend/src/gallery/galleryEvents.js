/**
 * Lightweight gallery refresh and optimistic upload notifications.
 */

/** @typedef {{ id: string, label: string, progress: number }} PendingGalleryUpload */

/** @type {Set<() => void>} */
const refreshListeners = new Set();

/** @type {Set<() => void>} */
const pendingListeners = new Set();

/** @type {PendingGalleryUpload[]} */
let pendingUploads = [];

/**
 * Subscribe to gallery data refresh requests.
 *
 * @param {() => void} listener - Refresh callback.
 * @returns {() => void} Unsubscribe function.
 */
export function onGalleryRefresh(listener) {
  refreshListeners.add(listener);
  return () => refreshListeners.delete(listener);
}

/**
 * Subscribe to optimistic upload progress updates.
 *
 * @param {() => void} listener - Pending upload callback.
 * @returns {() => void} Unsubscribe function.
 */
export function onPendingUploadsChange(listener) {
  pendingListeners.add(listener);
  return () => pendingListeners.delete(listener);
}

/**
 * Notify subscribers that gallery data should reload.
 *
 * @returns {void}
 */
export function notifyGalleryRefresh() {
  refreshListeners.forEach((listener) => listener());
}

/**
 * Notify subscribers that optimistic upload cards changed.
 *
 * @returns {void}
 */
function notifyPendingUploadsChange() {
  pendingListeners.forEach((listener) => listener());
}

/**
 * Replace the optimistic upload queue snapshot.
 *
 * @param {PendingGalleryUpload[]} next - Pending upload entries.
 * @returns {void}
 */
export function setPendingGalleryUploads(next) {
  pendingUploads = next;
  notifyPendingUploadsChange();
}

/**
 * Insert or update one optimistic upload entry by id.
 *
 * @param {PendingGalleryUpload} entry - Pending upload entry.
 * @returns {void}
 */
export function upsertPendingGalleryUpload(entry) {
  const index = pendingUploads.findIndex((upload) => upload.id === entry.id);
  if (index === -1) {
    pendingUploads = [...pendingUploads, entry];
  } else {
    pendingUploads = pendingUploads.map((upload, uploadIndex) =>
      uploadIndex === index ? entry : upload,
    );
  }
  notifyPendingUploadsChange();
}

/**
 * Remove one optimistic upload entry by id.
 *
 * @param {string} id - Pending upload id.
 * @returns {void}
 */
export function removePendingGalleryUpload(id) {
  pendingUploads = pendingUploads.filter((upload) => upload.id !== id);
  notifyPendingUploadsChange();
}

/**
 * Read the current optimistic upload queue.
 *
 * @returns {PendingGalleryUpload[]} Pending upload entries.
 */
export function getPendingGalleryUploads() {
  return pendingUploads;
}