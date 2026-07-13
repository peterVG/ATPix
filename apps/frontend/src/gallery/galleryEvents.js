/**
 * Lightweight gallery refresh and optimistic upload notifications.
 */

/** @typedef {{ id: string, label: string, progress: number }} PendingGalleryUpload */

/** @type {Set<() => void>} */
const refreshListeners = new Set();

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
 * Notify subscribers that gallery data should reload.
 *
 * @returns {void}
 */
export function notifyGalleryRefresh() {
  refreshListeners.forEach((listener) => listener());
}

/**
 * Replace the optimistic upload queue snapshot.
 *
 * @param {PendingGalleryUpload[]} next - Pending upload entries.
 * @returns {void}
 */
export function setPendingGalleryUploads(next) {
  pendingUploads = next;
  notifyGalleryRefresh();
}

/**
 * Read the current optimistic upload queue.
 *
 * @returns {PendingGalleryUpload[]} Pending upload entries.
 */
export function getPendingGalleryUploads() {
  return pendingUploads;
}