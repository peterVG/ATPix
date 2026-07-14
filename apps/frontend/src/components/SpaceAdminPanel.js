import { getAlbum } from "../api/galleryApi.js";
import { getHappyViewUrl } from "../api/happyview.js";
import {
  addSpaceMember,
  createSpaceInvite,
  getSpace,
  listSpaceMembers,
  mapMemberRole,
  resolveHandleToDid,
} from "../api/spaceApi.js";
import { getHappyViewFetchHandler } from "../auth/happyViewFetch.js";
import { buildSpaceAppAccess, getDeploymentOrigin, getOAuthClientId } from "../config/oauthClientMetadata.js";
import { albumDetailHref } from "../router/router.js";
import { escapeHtml } from "../utils/html.js";

/** @constant {string} Permissioned album space record type (ADR-010). */
export const ALBUM_SPACE_RECORD_TYPE = "net.atpix.gallery.albumSpace";

/**
 * Extract the space DID from an `ats://` URI.
 *
 * @param {string} spaceUri - Space AT URI.
 * @returns {string} Space DID segment.
 */
export function parseSpaceDid(spaceUri) {
  const normalized = spaceUri.replace(/^ats:\/\//, "");
  return normalized.split("/")[0] ?? spaceUri;
}

/**
 * Validate a handle string for invite UI gating.
 *
 * @param {string} raw - Raw handle input.
 * @returns {boolean} Whether the handle looks resolvable.
 */
export function isValidInviteHandle(raw) {
  const handle = raw.replace(/^@/, "").trim();
  if (!handle || handle.length > 253) {
    return false;
  }

  return /^[a-zA-Z0-9][a-zA-Z0-9.-]*[a-zA-Z0-9]$/.test(handle) || /^[a-zA-Z0-9]$/.test(handle);
}

/**
 * Render UI-SCR-006 permissioned space administration.
 *
 * @param {object} options - Render options.
 * @param {HTMLElement} options.mount - DOM node to render into.
 * @param {{ did: string, handle?: string }} options.identity - Signed-in identity.
 * @param {string} options.albumUri - Album AT URI from the hash route.
 * @returns {{ refresh: () => Promise<void>, destroy: () => void }} Panel controls.
 */
export function renderSpaceAdminPanel({ mount, identity, albumUri }) {
  let loading = true;
  let errorMessage = null;
  let accessDenied = false;
  let albumRecord = null;
  let spaceUri = null;
  /** @type {object[]} */
  let members = [];
  /** @type {object[]} */
  let auditEntries = [];
  let inviteHandle = "";
  let inviteResolvedDid = null;
  let inviteBusy = false;
  let inviteToken = null;
  let mintPolicy = "member-list";

  const pushAudit = (action, detail) => {
    auditEntries = [
      {
        action,
        detail,
        timestamp: new Date().toISOString(),
      },
      ...auditEntries,
    ].slice(0, 20);
  };

  const renderAuditEntry = (entry) => {
    const actionClass = `audit-entry audit-entry--${entry.action.toLowerCase()}`;
    return `
      <li class="${actionClass}" data-testid="space-audit-entry">
        <span class="audit-entry__action" data-testid="space-audit-action">${escapeHtml(entry.action)}</span>
        <span class="audit-entry__detail">${escapeHtml(entry.detail)}</span>
        <time class="audit-entry__time metadata-code" datetime="${escapeHtml(entry.timestamp)}">${escapeHtml(entry.timestamp)}</time>
      </li>
    `;
  };

  const renderMemberRow = (member) => {
    const role = mapMemberRole(member, albumRecord?.author ?? identity.did);
    const handle = member.handle ? `@${member.handle}` : "—";
    const didShort = member.did ? `${member.did.slice(0, 16)}…` : "—";

    return `
      <tr data-testid="space-member-row">
        <td data-testid="space-member-identity">${escapeHtml(handle)}</td>
        <td class="metadata-code" data-testid="space-member-did">${escapeHtml(didShort)}</td>
        <td data-testid="space-member-role">${role}</td>
        <td>
          <button type="button" class="btn btn-ghost btn-sm" data-testid="space-member-actions" disabled>⋯</button>
        </td>
      </tr>
    `;
  };

  const renderAccessDenied = () => `
    <section class="space-access-denied" data-testid="space-access-denied">
      <h2 class="headline-md">Access denied</h2>
      <p>This permissioned space is membership-gated. You are not a member and cannot view photos or metadata.</p>
      <button type="button" class="btn btn-primary" data-testid="space-request-access">Request Access</button>
      <a class="btn btn-ghost" href="${albumDetailHref(albumUri)}" data-testid="space-sign-in-cta">Return to album</a>
    </section>
  `;

  const syncView = () => {
    if (accessDenied) {
      mount.innerHTML = renderAccessDenied();
      return;
    }

    if (loading) {
      mount.innerHTML = `<p class="gallery-status" data-testid="space-admin-loading">Loading space administration…</p>`;
      return;
    }

    const spaceDid = spaceUri ? parseSpaceDid(spaceUri) : "—";
    const appAccess = buildSpaceAppAccess(getDeploymentOrigin());
    const clientId = getOAuthClientId(getDeploymentOrigin());
    const inviteReady = isValidInviteHandle(inviteHandle) && Boolean(inviteResolvedDid);

    mount.innerHTML = `
      <section class="space-admin" data-testid="space-admin-screen">
        <header class="space-admin__header">
          <div class="space-admin__title-block">
            <p class="space-admin__label" data-testid="space-permissioned-label">
              <span aria-hidden="true">🔒</span> Permissioned Space
            </p>
            <h2 class="display-lg" data-testid="space-admin-title">${escapeHtml(albumRecord?.record?.name ?? "Album space")}</h2>
            <p class="space-admin__description" data-testid="space-storage-description">
              Photos in this album are stored in a membership-gated HappyView space — not client-side encrypted.
            </p>
          </div>
          <div class="space-admin__actions">
            <button type="button" class="btn btn-ghost" data-testid="space-export-logs">Export Logs</button>
            <button type="button" class="btn btn-primary" data-testid="space-share-access">Share Access</button>
          </div>
        </header>

        ${errorMessage ? `<p class="gallery-error" data-testid="space-admin-error">${escapeHtml(errorMessage)}</p>` : ""}

        <div class="space-admin__grid">
          <article class="space-metadata-card" data-testid="space-metadata-card">
            <p class="label-caps">Space metadata</p>
            <dl class="space-metadata-card__list">
              <div>
                <dt>Space DID</dt>
                <dd class="metadata-code" data-testid="space-did">${escapeHtml(spaceDid)}</dd>
              </div>
              <div>
                <dt>Record type</dt>
                <dd class="metadata-code" data-testid="space-record-type">${ALBUM_SPACE_RECORD_TYPE}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd><span class="status-chip status-chip--permissioned" data-testid="space-gated-badge">Gated</span></dd>
              </div>
            </dl>
          </article>

          <section class="space-members" data-testid="space-member-directory">
            <h3 class="headline-md">Member directory</h3>
            <table class="space-members__table">
              <thead>
                <tr>
                  <th>Identity</th>
                  <th>DID</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${members.map((member) => renderMemberRow(member)).join("")}
              </tbody>
            </table>
          </section>

          <section class="space-invite" data-testid="space-invite-panel">
            <h3 class="headline-md">Invite member</h3>
            <label class="sign-in-label" for="space-invite-handle">Handle</label>
            <input
              id="space-invite-handle"
              class="sign-in-input"
              data-testid="space-invite-handle"
              placeholder="alice.bsky.social"
              value="${escapeHtml(inviteHandle)}"
            />
            <div class="space-invite__actions">
              <button
                type="button"
                class="btn btn-primary"
                data-testid="space-invite-submit"
                ${inviteReady && !inviteBusy ? "" : "disabled"}
              >${inviteBusy ? "Inviting…" : "Send invite"}</button>
              <button
                type="button"
                class="btn btn-ghost"
                data-testid="space-invite-direct-add"
                ${inviteReady && !inviteBusy ? "" : "disabled"}
              >Add member directly</button>
            </div>
            ${
              inviteToken
                ? `<p class="metadata-code space-invite__token" data-testid="space-invite-token">Invite token: ${escapeHtml(inviteToken)}</p>`
                : ""
            }
          </section>

          <section class="space-audit" data-testid="space-audit-trail">
            <h3 class="headline-md">Access audit trail</h3>
            <ul class="space-audit__list">
              ${auditEntries.map((entry) => renderAuditEntry(entry)).join("")}
            </ul>
          </section>

          <section class="space-settings" data-testid="space-settings">
            <h3 class="headline-md">Space settings</h3>
            <label class="sign-in-label" for="space-mint-policy">Mint Policy</label>
            <select id="space-mint-policy" class="sign-in-input" data-testid="space-mint-policy">
              <option value="member-list" ${mintPolicy === "member-list" ? "selected" : ""}>member-list</option>
              <option value="public" ${mintPolicy === "public" ? "selected" : ""}>public</option>
              <option value="managing-app" ${mintPolicy === "managing-app" ? "selected" : ""}>managing-app</option>
            </select>
            <p class="label-caps">App Access</p>
            <p class="metadata-code" data-testid="space-app-access">${escapeHtml(JSON.stringify(appAccess))}</p>
            <p class="metadata-code" data-testid="space-oauth-client-id">${escapeHtml(clientId)}</p>
          </section>
        </div>

        <footer class="space-admin__footer">
          <a class="btn btn-ghost" href="${albumDetailHref(albumUri)}" data-testid="space-back-to-album">← Back to album</a>
        </footer>
      </section>
    `;

    const handleInput = mount.querySelector('[data-testid="space-invite-handle"]');
    if (handleInput instanceof HTMLInputElement && handleInput.value !== inviteHandle) {
      handleInput.value = inviteHandle;
    }
  };

  const resolveInviteHandle = async () => {
    if (!isValidInviteHandle(inviteHandle)) {
      inviteResolvedDid = null;
      syncView();
      return;
    }

    try {
      const fetchHandler = await getHappyViewFetchHandler();
      inviteResolvedDid = await resolveHandleToDid(fetchHandler, inviteHandle);
      errorMessage = null;
    } catch {
      inviteResolvedDid = null;
    }

    syncView();
  };

  const loadSpaceAdmin = async () => {
    loading = true;
    errorMessage = null;
    accessDenied = false;
    syncView();

    try {
      const fetchHandler = await getHappyViewFetchHandler();
      const albumPayload = await getAlbum(fetchHandler, { uri: albumUri });
      albumRecord = albumPayload.album;
      spaceUri = albumRecord?.record?.spaceUri ?? null;

      if (!spaceUri) {
        throw new Error("Album is missing a linked space URI");
      }

      if (albumRecord.author !== identity.did) {
        try {
          await getSpace(fetchHandler, { space: spaceUri });
        } catch (error) {
          const status = error && typeof error === "object" && "status" in error ? error.status : 0;
          if (status === 401 || status === 403 || status === 404) {
            accessDenied = true;
            loading = false;
            syncView();
            return;
          }
          throw error;
        }
      }

      const memberPayload = await listSpaceMembers(fetchHandler, { space: spaceUri });
      members = memberPayload.members ?? [];
      pushAudit("INF", `Loaded space admin for ${parseSpaceDid(spaceUri)}`);
      loading = false;
      syncView();
    } catch (error) {
      loading = false;
      const status = error && typeof error === "object" && "status" in error ? error.status : 0;
      if (status === 401 || status === 403 || status === 404) {
        accessDenied = true;
        syncView();
        return;
      }

      errorMessage = error instanceof Error ? error.message : "Unable to load space administration";
      syncView();
    }
  };

  const sendInvite = async () => {
    if (!spaceUri || !inviteResolvedDid) {
      return;
    }

    inviteBusy = true;
    syncView();

    try {
      const fetchHandler = await getHappyViewFetchHandler();
      const invite = await createSpaceInvite(fetchHandler, {
        space: spaceUri,
        access: "write",
        maxUses: 10,
      });
      inviteToken = invite.token ?? null;
      pushAudit("ADD", `Invite created for ${inviteHandle}`);
      inviteBusy = false;
      syncView();
    } catch (error) {
      inviteBusy = false;
      errorMessage = error instanceof Error ? error.message : "Unable to create invite";
      syncView();
    }
  };

  const addMemberDirect = async () => {
    if (!spaceUri || !inviteResolvedDid) {
      return;
    }

    inviteBusy = true;
    syncView();

    try {
      const fetchHandler = await getHappyViewFetchHandler();
      await addSpaceMember(fetchHandler, {
        space: spaceUri,
        did: inviteResolvedDid,
        access: "write",
      });
      const memberPayload = await listSpaceMembers(fetchHandler, { space: spaceUri });
      members = memberPayload.members ?? [];
      pushAudit("ADD", `Member added: ${inviteHandle}`);
      inviteBusy = false;
      inviteHandle = "";
      inviteResolvedDid = null;
      syncView();
    } catch (error) {
      inviteBusy = false;
      errorMessage = error instanceof Error ? error.message : "Unable to add member";
      syncView();
    }
  };

  const exportLogs = () => {
    const payload = {
      spaceUri,
      albumUri,
      members,
      auditEntries,
      happyViewUrl: getHappyViewUrl(),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "atpix-space-audit.json";
    anchor.click();
    URL.revokeObjectURL(url);
    pushAudit("INF", "Exported audit logs");
    syncView();
  };

  const onInput = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    if (target.dataset.testid === "space-invite-handle") {
      inviteHandle = target.value;
      void resolveInviteHandle();
    }
  };

  const onChange = (event) => {
    const target = event.target;
    if (target instanceof HTMLSelectElement && target.dataset.testid === "space-mint-policy") {
      mintPolicy = target.value;
      pushAudit("MOD", `Mint policy set to ${mintPolicy}`);
      syncView();
    }
  };

  const onClick = (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    if (target.closest('[data-testid="space-invite-submit"]')) {
      void sendInvite();
      return;
    }

    if (target.closest('[data-testid="space-invite-direct-add"]')) {
      void addMemberDirect();
      return;
    }

    if (target.closest('[data-testid="space-export-logs"]')) {
      exportLogs();
      return;
    }

    if (target.closest('[data-testid="space-share-access"]')) {
      const sharePanel = mount.querySelector('[data-testid="space-invite-panel"]');
      sharePanel?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (target.closest('[data-testid="space-request-access"]')) {
      errorMessage = "Request access is not yet wired to a PDS messaging flow in v1.";
      syncView();
    }
  };

  mount.addEventListener("input", onInput);
  mount.addEventListener("change", onChange);
  mount.addEventListener("click", onClick);
  void loadSpaceAdmin();

  return {
    refresh: loadSpaceAdmin,
    destroy: () => {
      mount.removeEventListener("input", onInput);
      mount.removeEventListener("change", onChange);
      mount.removeEventListener("click", onClick);
    },
  };
}