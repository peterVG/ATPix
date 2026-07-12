# UI-SCR-001: My Gallery screen
Feature: My Gallery screen presentation
  As a signed-in user
  I want a clear personal gallery layout
  So that I can review my uploads with provenance and visibility indicators

  Background:
    Given I am signed in
    And I am on the My Gallery screen

  Scenario: Page header and toolbar are present
    Then I should see the section label Personal Archive
    And I should see the page title My Gallery
    And I should see a vault search field
    And I should see a primary Upload button

  Scenario: Media cards show C2PA and visibility badges
    Given my gallery contains photos with varied validation states
    Then trusted photos should display a Trusted badge
    And valid photos should display a Valid badge
    And invalid photos should display an Invalid badge
    And permissioned photos should display a Private badge

  Scenario: Uploading photo shows optimistic overlay
    Given a photo upload is in progress
    Then the uploading card should show a semi-transparent overlay
    And I should see an Uploading label with a progress indicator

  Scenario: Empty gallery shows upload guidance
    Given I have no uploaded photos
    Then I should see guidance to upload my first photo
    And I should see a primary Upload call to action

  Scenario: Pagination controls are visible
    Given I have more than twenty photos
    Then I should see pagination controls with previous and next actions

# Source
# - ui-requirements.md UI-SCR-001
# - references/mockups/02-my-gallery.jpg