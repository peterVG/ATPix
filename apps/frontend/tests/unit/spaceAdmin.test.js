import { describe, expect, it } from "vitest";

import { mapMemberRole } from "../../src/api/spaceApi.js";
import { buildSpaceConfig } from "../../src/config/oauthClientMetadata.js";
import {
  ALBUM_SPACE_RECORD_TYPE,
  isValidInviteHandle,
  parseSpaceDid,
} from "../../src/components/SpaceAdminPanel.js";
import { parseAlbumRouteFromHash, spaceAdminHref } from "../../src/router/router.js";

describe("space admin helpers", () => {
  it("parses space DID from proposal at://…/space/… URI", () => {
    expect(parseSpaceDid("at://did:plc:space/space/net.atpix.gallery.albumSpace/album1")).toBe(
      "did:plc:space",
    );
  });

  it("parses space DID from legacy ats:// dialect URI", () => {
    expect(parseSpaceDid("ats://did:plc:space/net.atpix.gallery.albumSpace/album1")).toBe(
      "did:plc:space",
    );
  });

  it("validates invite handles", () => {
    expect(isValidInviteHandle("")).toBe(false);
    expect(isValidInviteHandle("!!!")).toBe(false);
    expect(isValidInviteHandle("alice.bsky.social")).toBe(true);
  });

  it("maps member roles for UI-SCR-006", () => {
    expect(mapMemberRole({ did: "did:plc:owner", access: "write", isOwner: true }, "did:plc:owner")).toBe(
      "ADMIN",
    );
    expect(mapMemberRole({ did: "did:plc:writer", access: "write" }, "did:plc:owner")).toBe("MEMBER");
    expect(mapMemberRole({ did: "did:plc:reader", access: "read" }, "did:plc:owner")).toBe("VIEWER");
  });

  it("builds ADR-010 space config", () => {
    expect(buildSpaceConfig()).toEqual({ membershipPublic: false, recordsPublic: false });
  });

  it("parses space admin hash routes", () => {
    const uri = "at://did:plc:abc/net.atpix.gallery.album/1";
    const href = spaceAdminHref(uri);
    expect(parseAlbumRouteFromHash(href)).toEqual({ albumUri: uri, spaceAdmin: true });
    expect(ALBUM_SPACE_RECORD_TYPE).toBe("net.atpix.gallery.albumSpace");
  });
});
