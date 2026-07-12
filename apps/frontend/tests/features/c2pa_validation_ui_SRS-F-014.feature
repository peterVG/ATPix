# SRS-F-014: C2PA Validation and Content Credentials UI
Feature: C2PA Validation and Content Credentials UI
  As a viewer
  I want to see Content Credentials status for images
  So that I can make my own trust decision

  Background:
    Given I am viewing a photo in gallery or album view

  Scenario: Level 1 and 2 credentials display for valid manifest
    Given the photo has an embedded C2PA manifest
    When I view the photo
    Then I should see whether Content Credentials are present
    And I should see validation status
    And I should see an action summary such as created or edited

  Scenario: No Content Credentials state
    Given the photo has no C2PA manifest
    When I view the photo
    Then I should see an explicit No Content Credentials state
    And I should not see an error

  Scenario: Neutral validation presentation
    Given validation reports an untrusted signer
    When I view Content Credentials
    Then I should see validation state and signer identity
    And the UI should not label the content as fake or authentic

  Scenario: Dual provenance surfaced
    Given the photo has atproto record signature and C2PA credentials
    When I expand provenance details
    Then I should see both protocol record signing and file-level credentials

  Scenario: Expandable Level 3 provenance for signed-in users
    Given I am signed in
    And the photo has a multi-step C2PA chain
    When I expand the credentials panel
    Then I should see detailed provenance steps

# Source
# - srs.md SRS-F-014, SRS-NFR-016, SRS-TC-011
# - prd.md F-014, NFR-016, TC-011