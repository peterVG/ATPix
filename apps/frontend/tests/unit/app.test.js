import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { renderApp } from "../../src/components/App.js";

describe("renderApp", () => {
  /** @type {HTMLElement} */
  let mount;

  beforeEach(() => {
    mount = document.createElement("div");
    document.body.appendChild(mount);
  });

  afterEach(() => {
    mount.remove();
  });

  it("mounts title and HappyView URL without hydration errors", () => {
    renderApp({ mount, happyviewUrl: "http://127.0.0.1:3001" });
    expect(mount.querySelector("h1")?.textContent).toBe("ATPix");
    expect(mount.querySelector('[data-testid="happyview-url"]')?.textContent).toContain(
      "http://127.0.0.1:3001",
    );
  });
});
