# UI-SCR-007: Public profile gallery
Feature: Public profile gallery presentation
  As a visitor
  I want a read-only public gallery layout
  So that I can browse another user's published photos without signing in

  Background:
    Given I am not signed in
    And I am viewing a public profile gallery

  Scenario: Profile gallery is read-only
    Then I should see a photo grid matching the gallery card component
    And I should not see Upload or Delete controls
    And I should not be prompted to sign in for public content

  Scenario: Resolved DID is shown for durable identity
    When I open the profile by handle
    Then the resolved DID should be displayed in monospaced metadata style

  Scenario: Permissioned content is excluded from public profile grid
    Given the profile owner has permissioned album photos
    Then those photos should not appear in the public profile grid

# Source
# - ui-requirements.md UI-SCR-007