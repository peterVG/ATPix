import { describe, expect, it } from "vitest";

import {
  buildProposalSpaceRecordUri,
  buildProposalSpaceUri,
  isDialectAtsUri,
  isProposalSpaceUri,
  normalizeSpaceUriToProposal,
  parseSpaceDid,
  parseSpaceRecordRkey,
} from "../../src/space/spaceUri.js";

describe("spaceUri helpers", () => {
  const proposalSpace = "at://did:plc:space/space/net.atpix.gallery.albumSpace/album1";
  const dialectSpace = "ats://did:plc:space/net.atpix.gallery.albumSpace/album1";
  const proposalRecord =
    "at://did:plc:space/space/net.atpix.gallery.albumSpace/album1/did:plc:alice/net.atpix.gallery.photo/stub42";
  const dialectRecord =
    "ats://did:plc:space/net.atpix.gallery.albumSpace/album1/did:plc:alice/net.atpix.gallery.photo/stub42";

  it("detects proposal and dialect forms", () => {
    expect(isProposalSpaceUri(proposalSpace)).toBe(true);
    expect(isProposalSpaceUri(dialectSpace)).toBe(false);
    expect(isDialectAtsUri(dialectSpace)).toBe(true);
    expect(isDialectAtsUri(proposalSpace)).toBe(false);
  });

  it("parses space DID from proposal and dialect URIs", () => {
    expect(parseSpaceDid(proposalSpace)).toBe("did:plc:space");
    expect(parseSpaceDid(dialectSpace)).toBe("did:plc:space");
    expect(parseSpaceDid(proposalRecord)).toBe("did:plc:space");
  });

  it("parses record keys from both URI forms", () => {
    expect(parseSpaceRecordRkey(proposalRecord)).toBe("stub42");
    expect(parseSpaceRecordRkey(dialectRecord)).toBe("stub42");
    expect(parseSpaceRecordRkey("invalid")).toBe("invalid");
  });

  it("normalizes dialect space and record URIs to proposal form", () => {
    expect(normalizeSpaceUriToProposal(dialectSpace)).toBe(proposalSpace);
    expect(normalizeSpaceUriToProposal(dialectRecord)).toBe(proposalRecord);
    expect(normalizeSpaceUriToProposal(proposalSpace)).toBe(proposalSpace);
  });

  it("builds proposal URIs", () => {
    expect(buildProposalSpaceUri("did:plc:x", "net.atpix.gallery.albumSpace", "s1")).toBe(
      "at://did:plc:x/space/net.atpix.gallery.albumSpace/s1",
    );
    expect(
      buildProposalSpaceRecordUri(
        "did:plc:x",
        "net.atpix.gallery.albumSpace",
        "s1",
        "did:plc:a",
        "net.atpix.gallery.photo",
        "r1",
      ),
    ).toBe(
      "at://did:plc:x/space/net.atpix.gallery.albumSpace/s1/did:plc:a/net.atpix.gallery.photo/r1",
    );
  });
});
