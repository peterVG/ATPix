import { describe, expect, it } from "vitest";

import {
  OAUTH_CALLBACK_PATH,
  OAUTH_CLIENT_METADATA_PATH,
  OAUTH_CLIENT_NAME,
  OAUTH_CLIENT_SCOPE,
  buildOAuthClientMetadata,
  buildSpaceAppAccess,
  getOAuthClientId,
  getOAuthRedirectUri,
  normalizeOrigin,
} from "../../src/config/oauthClientMetadata.js";

describe("oauthClientMetadata", () => {
  const origin = "https://app.example.com";

  it("normalizes trailing slashes on origins", () => {
    expect(normalizeOrigin("https://app.example.com/")).toBe("https://app.example.com");
  });

  it("builds client_id at oauth-client-metadata.json path", () => {
    expect(getOAuthClientId(origin)).toBe(`https://app.example.com${OAUTH_CLIENT_METADATA_PATH}`);
  });

  it("builds redirect URI at /oauth/callback", () => {
    expect(getOAuthRedirectUri(origin)).toBe(`https://app.example.com${OAUTH_CALLBACK_PATH}`);
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

  it("includes gallery record scopes and blob upload scope", () => {
    expect(OAUTH_CLIENT_SCOPE).toContain("atproto");
    expect(OAUTH_CLIENT_SCOPE).toContain("blob:*/*");
    expect(OAUTH_CLIENT_SCOPE).toContain("repo:net.atpix.gallery.photo");
    expect(OAUTH_CLIENT_SCOPE).toContain("repo:net.atpix.gallery.album");
  });

  it("builds space appAccess allowList with OAuth clientId URL (ADR-010)", () => {
    const appAccess = buildSpaceAppAccess(origin);

    expect(appAccess).toEqual({
      type: "allowList",
      allowed: [getOAuthClientId(origin)],
    });
  });
});
