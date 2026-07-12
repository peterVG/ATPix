# UI-CMP-001 through UI-CMP-008: Shared UI components
Feature: Shared UI components
  As a user across ATPix screens
  I want consistent reusable components
  So that provenance, status, and actions behave the same everywhere

  Scenario: Media card shows Level 1 C2PA badge and visibility chip
    Given a media card is rendered in a gallery grid
    Then the card should show a C2PA Level 1 indicator
    And the card should show a visibility or validation status chip

  Scenario: Status chip uses semantic color with left border accent
    Given a Public status chip is rendered
    Then the chip should use the public status color token
    And the chip should have a left border accent in the same color

  Scenario: Upload progress overlay matches design spec
    Given a media card is uploading
    Then the overlay opacity should be approximately fifty percent
    And a linear progress bar should appear at the bottom of the card

  Scenario: Confirmation modal blocks destructive actions
    When a destructive action requires confirmation
    Then a modal dialog should appear
    And the action should not complete until I confirm

  Scenario: Pagination control reflects cursor state
    Given more gallery pages are available
    Then pagination should show previous and next controls
    And the current page should be visually indicated

  Scenario: Protocol identity card shows atproto handle format
    Given the protocol identity card is rendered
    Then I should see an at-protocol handle or DID prefix
    And technical identifiers should use monospaced metadata styling

# Source
# - ui-requirements.md UI-CMP-001 through UI-CMP-008
# - references/000-UX-guide.md Components