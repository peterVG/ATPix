/**
 * Root application shell for ATPix.
 *
 * @param {object} options - Render options.
 * @param {HTMLElement} options.mount - DOM node to render into.
 * @param {string} options.happyviewUrl - HappyView App View base URL.
 * @returns {void}
 */
export function renderApp({ mount, happyviewUrl }) {
  mount.innerHTML = `
    <header>
      <h1>ATPix</h1>
      <p>Decentralized photo gallery on AT Protocol</p>
    </header>
    <main>
      <p data-testid="happyview-url">HappyView: <code>${happyviewUrl}</code></p>
      <p data-testid="status">Sign in to browse and upload photos.</p>
    </main>
  `;
}
