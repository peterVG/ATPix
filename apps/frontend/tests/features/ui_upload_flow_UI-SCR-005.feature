# UI-SCR-005: Upload flow screen
Feature: Upload flow screen presentation
  As a creator uploading photos
  I want a clear upload workspace with provenance controls
  So that I can prepare media before publishing to my repository

  Background:
    Given I am on the upload screen

  Scenario: Drop zone displays format guidance
    Then I should see an Upload Media drop zone with dashed border
    And I should see drag and drop guidance with a browse link
    And I should see informational format chips for RAW, PNG, and JPEG

  Scenario: Thumbnail queue shows selection and progress states
    Given I have selected multiple image files
    Then one file should be marked as the active selection
    And in-progress uploads should show a percent label and progress bar
    And completed files should show a C2PA indicator when signed

  Scenario: Provenance sidebar shows signer identity and metadata fields
    Then I should see provenance identity with my signer DID
    And I should see Title, Caption, and Tags input fields
    And tag pills should be removable

  Scenario: Destination picker uses membership-gated wording for spaces
    Then I should see My Public Repository as the default destination
    And I should see a Permissioned Space destination option
    And the permissioned option should describe membership-gated access
    And the permissioned option should not claim encryption

  Scenario: Privacy toggles are available before signing
    Then I should see opt-out controls for GPS and device metadata
    And required integrity assertions should remain enabled

  Scenario: Upload failure shows actionable retry
    Given an upload has failed
    Then I should see a clear error message
    And I should see a Retry action

# Source
# - ui-requirements.md UI-SCR-005
# - references/mockups/05-upload-flow.jpg