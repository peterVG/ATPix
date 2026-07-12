# UI-SCR-004: Album view screen
Feature: Album view screen presentation
  As a user viewing an album
  I want a structured album layout with provenance and sharing details
  So that I can understand visibility, collaborators, and media at a glance

  Background:
    Given I am viewing an album detail screen

  Scenario: Permissioned album shows visibility badge and space URI
    Given the album visibility is permissioned
    Then I should see a Permissioned visibility badge
    And I should see the album AT URI in monospaced metadata style
    And I should see an Invite Members action
    And I should see a Space URI field with copy affordance

  Scenario: Public album hides permissioned-only controls
    Given the album visibility is public
    Then I should not see Invite Members
    And I should not see a Space URI field
    And I should see a share link with external open affordance

  Scenario: Album content tabs filter the grid
    Then I should see All Media, Verified Only, and Collaborators tabs
    When I select Verified Only
    Then the media grid should show only verified assets

  Scenario: Album info panel shows collaborators and provenance summary
    Then I should see a collaborator avatar stack with count
    And I should see a provenance summary with neutral validation wording
    And I should see a Destroy Album destructive action

  Scenario: Destroy album requires confirmation
    When I choose Destroy Album
    Then I should see a confirmation dialog before the album is removed

# Source
# - ui-requirements.md UI-SCR-004
# - references/mockups/04-album-view.jpg