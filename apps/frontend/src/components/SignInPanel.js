/**
 * Render the unauthenticated sign-in panel.
 *
 * @param {object} options - Render options.
 * @param {HTMLElement} options.mount - DOM node to render into.
 * @param {string} options.happyviewUrl - HappyView App View base URL.
 * @param {(handle: string) => void} options.onSignIn - Invoked when the user submits a handle.
 * @returns {void}
 */
export function renderSignInPanel({ mount, happyviewUrl, onSignIn }) {
  mount.innerHTML = `
    <section class="sign-in-panel" data-testid="sign-in-panel">
      <p class="overview-eyebrow">ATPix · atproto OAuth</p>
      <h1>Sign in to ATPix</h1>
      <p class="sign-in-lede">
        Use your existing PDS account. ATPix does not store passwords — authentication
        flows through HappyView with DPoP-bound OAuth tokens.
      </p>
      <form class="sign-in-form" data-testid="sign-in-form">
        <label class="sign-in-label" for="atpix-handle">atproto handle</label>
        <input
          id="atpix-handle"
          class="sign-in-input"
          name="handle"
          type="text"
          placeholder="you.bsky.social"
          autocomplete="username"
          required
          data-testid="sign-in-handle"
        />
        <button class="btn btn-primary" type="submit" data-testid="sign-in-submit">
          Sign in with atproto
        </button>
      </form>
      <p class="sign-in-meta" data-testid="happyview-url">
        HappyView endpoint: <code>${happyviewUrl}</code>
      </p>
    </section>
  `;

  const form = mount.querySelector('[data-testid="sign-in-form"]');
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = mount.querySelector('[data-testid="sign-in-handle"]');
    const handle = input instanceof HTMLInputElement ? input.value.trim() : "";
    if (handle.length > 0) {
      onSignIn(handle);
    }
  });
}
