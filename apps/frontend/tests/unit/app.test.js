import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { bootstrapApp } from "../../src/components/App.js";

describe("bootstrapApp", () => {
  /** @type {HTMLElement} */
  let mount;
  /** @type {(() => void) | undefined} */
  let teardown;

  beforeEach(() => {
    teardown = undefined;
    mount = document.createElement("div");
    document.body.appendChild(mount);
    localStorage.clear();
    window.location.hash = "#/gallery";
  });

  afterEach(() => {
    teardown?.();
    mount.remove();
    vi.restoreAllMocks();
  });

  it("renders sign-in panel when no session is restored", async () => {
    const oauthClient = {
      restoreSession: vi.fn().mockResolvedValue(null),
      signIn: vi.fn(),
      handleCallback: vi.fn(),
      signOut: vi.fn(),
    };

    const state = await bootstrapApp({
      mount,
      happyviewUrl: "http://127.0.0.1:3001",
      oauthClient,
    });
    teardown = state.teardown;

    expect(mount.querySelector('[data-testid="sign-in-panel"]')).not.toBeNull();
    expect(mount.querySelector('[data-testid="sign-in-form"]')).not.toBeNull();
  });

  it("renders authenticated shell with identity card", async () => {
    const oauthClient = {
      restoreSession: vi.fn().mockResolvedValue({
        did: "did:plc:test",
        handle: "alice.test",
      }),
      signIn: vi.fn(),
      handleCallback: vi.fn(),
      signOut: vi.fn(),
    };

    const state = await bootstrapApp({
      mount,
      happyviewUrl: "http://127.0.0.1:3001",
      oauthClient,
    });
    teardown = state.teardown;

    expect(mount.querySelector('[data-testid="app-shell"]')).not.toBeNull();
    expect(mount.querySelector('[data-testid="identity-handle"]')?.textContent).toContain(
      "@alice.test",
    );
    expect(
      mount.querySelector('[data-testid="nav-gallery"]')?.classList.contains("nav-tab--active"),
    ).toBe(true);
  });
});
