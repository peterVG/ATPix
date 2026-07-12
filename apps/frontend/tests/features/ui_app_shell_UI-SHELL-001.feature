# UI-SHELL-001: Application chrome
Feature: Application shell chrome
  As a signed-in user
  I want consistent navigation across ATPix
  So that I can move between gallery, discovery, and albums predictably

  Background:
    Given I am signed in
    And the application shell is rendered

  Scenario: Header displays primary navigation tabs
    Then I should see the ATPix wordmark
    And I should see navigation tabs for Gallery, Discovery, and Albums
    And I should see a color scheme toggle, search, upload, notifications, and my avatar in the header

  Scenario: Active route is visually indicated
    When I navigate to Discovery
    Then the Discovery tab should be visually marked as active
    And the Gallery tab should not be marked as active

  Scenario: Sidebar shows protocol identity
    Then I should see my atproto handle or DID in the sidebar
    And I should see sidebar links for Home, Trending, Collections, and Settings

  Scenario: Sidebar provides primary upload and sign out actions
    Then I should see an Upload Media button in the sidebar
    And I should see a Sign Out control in the sidebar

# Source
# - ui-requirements.md UI-SHELL-001
# - srs.md SRS-F-001.3