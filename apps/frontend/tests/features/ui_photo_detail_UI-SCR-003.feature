# UI-SCR-003: Photo detail screen
Feature: Photo detail screen presentation
  As a viewer
  I want a split-view photo detail layout
  So that I can inspect media, metadata, and Content Credentials together

  Background:
    Given I am viewing a photo detail screen

  Scenario: Split view shows image and metadata sidebar
    Then I should see the full photo in the primary viewing area
    And I should see a back navigation control
    And I should see a metadata sidebar beside the image on desktop

  Scenario: Sidebar shows visibility chip and caption
    Then I should see a visibility chip for the photo
    And I should see the photo caption in the sidebar
    And keyword tags should appear as removable pills

  Scenario: Content Credentials Level 2 panel is present
    Given the photo has an embedded C2PA manifest
    Then I should see a Content Credentials section
    And I should see validation status without authentic or fake labels
    And I should see the signer DID in monospaced metadata style
    And I should see an action history list with timestamps

  Scenario: Level 3 provenance expands on demand
    Given I am signed in
    When I expand the full provenance panel
    Then I should see the ingredient audit trail
    And DID and key values should use monospaced metadata styling

  Scenario: Destructive delete requires confirmation
    When I choose Delete Photo
    Then I should see a confirmation dialog before deletion proceeds

# Source
# - ui-requirements.md UI-SCR-003
# - references/mockups/03-photo-detail.jpg