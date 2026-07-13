import { describe, expect, it } from "vitest";

import {
  OAUTH_CALLBACK_PATH,
  OAUTH_CLIENT_METADATA_PATH,
  OAUTH_CLIENT_NAME,
  OAUTH_CLIENT_SCOPE,
  OAUTH_CLIENT_SCOPE_LIST,
  buildOAuthClientMetadata,
  buildSpaceAppAccess,
  getOAuthClientId,
  getOAuthRedirectUri,
  isLoopbackOrigin,
  normalizeOrigin,
} from "../../src/config/oauthClientMetadata.js";

describe("oauthClientMetadata", () => {
  const origin = "https://app.example.com";
  const loopbackOrigin = "http://127.0.0.1:5173";

  it("normalizes trailing slashes on origins", () => {
    expect(normalizeOrigin("https://app.example.com/")).toBe("https://app.example.com");
  });

  it("detects loopback origins", () => {
    expect(isLoopbackOrigin(loopbackOrigin)).toBe(true);
    expect(isLoopbackOrigin(origin)).toBe(false);
  });

  it("builds production client_id at oauth-client-metadata.json path", () => {
    expect(getOAuthClientId(origin)).toBe(`https://app.example.com${OAUTH_CLIENT_METADATA_PATH}`);
  });

  it("builds loopback client_id for local development", () => {
    const clientId = getOAuthClientId(loopbackOrigin);

    expect(clientId).toMatch(/^http:\/\/localhost\/oauth\/callback\?redirect_uri=/);
    expect(decodeURIComponent(clientId)).toContain("http://127.0.0.1:5173/oauth/callback");
  });

  it("builds production redirect URI at /oauth/callback", () => {
    expect(getOAuthRedirectUri(origin)).toBe(`https://app.example.com${OAUTH_CALLBACK_PATH}`);
  });

  it("builds loopback redirect URI at 127.0.0.1", () => {
    expect(getOAuthRedirectUri(loopbackOrigin)).toBe(`http://127.0.0.1:5173${OAUTH_CALLBACK_PATH}`);
  });

  it("returns metadata required by ADR-006 and HappyView OAuth docs", () => {
    const metadata = buildOAuthClientMetadata(origin);

    expect(metadata.client_id).toBe(getOAuthClientId(origin));
    expect(metadata.client_name).toBe(OAUTH_CLIENT_NAME);
    expect(metadata.client_uri).toBe(origin);
    expect(metadata.redirect_uris).toEqual([getOAuthRedirectUri(origin)]);
    expect(metadata.grant_types).toEqual(["authorization_code", "refresh_token"]);
    expect(metadata.response_types).toEqual(["code"]);
    expect(metadata.scope).toBe(OAUTH_CLIENT_SCOPE);
    expect(metadata.token_endpoint_auth_method).toBe("none");
    expect(metadata.application_type).toBe("web");
    expect(metadata.dpop_bound_access_tokens).toBe(true);
  });

  it("includes gallery record scopes and blob upload scope as exact tokens", () => {
    expect(OAUTH_CLIENT_SCOPE_LIST).toContain("atproto");
    expect(OAUTH_CLIENT_SCOPE_LIST).toContain("blob:*/*");
    expect(OAUTH_CLIENT_SCOPE_LIST).toContain("repo:net.atpix.gallery.photo");
    expect(OAUTH_CLIENT_SCOPE_LIST).toContain("repo:net.atpix.gallery.album");
    expect(OAUTH_CLIENT_SCOPE_LIST).toContain("repo:net.atpix.gallery.albumItem");
  });

  it("builds space appAccess allowList with OAuth clientId URL (ADR-010)", () => {
    const appAccess = buildSpaceAppAccess(origin);

    expect(appAccess).toEqual({
      type: "allowList",
      allowed: [getOAuthClientId(origin)],
    });
  });
});
