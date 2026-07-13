# SRS-F-008: Permissioned Spaces Integration
Feature: Permissioned Spaces Integration
  As the ATPix integration layer
  I want end-to-end permissioned album workflows
  So that HappyView Permissioned Spaces are validated in a real media app

  Background:
    Given HappyView has feature.spaces_enabled enabled
    And two test atproto accounts exist

  Scenario: Create space and permissioned album
    When the owner creates a permissioned album
    Then a space should be created with type net.atpix.gallery.albumSpace
    And the album record should link a spaceUri

  Scenario: Invite member and authorized read succeeds
    When the owner invites a second user
    And the member accepts the invite
    And a photo is uploaded to the space
    Then the member should read album contents with space credentials
    And unauthorized users should be denied without metadata leakage

  Scenario: Permissioned content excluded from public index
    When permissioned photos exist in a space
    Then public listPhotos queries should not return those photos
    And space-scoped queries should require valid credentials

  Scenario: Feature flag disabled returns FeatureDisabled
    Given HappyView has feature.spaces_enabled disabled
    When permissioned album creation is attempted
    Then the response should indicate the feature is disabled

# Source
# - srs.md SRS-F-008, SRS-NFR-013, SRS-TC-004, SRS-TC-008
# - prd.md F-008, NFR-013, TC-004, TC-008, RC-007