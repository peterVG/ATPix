# SRS-F-005: Captions and Tags
Feature: Captions and Tags
  As a photographer
  I want to add captions and tags to my photos
  So that I can describe and find images later

  Background:
    Given I am signed in
    And I have an uploaded photo

  Scenario: Set caption on upload
    When I upload a photo with caption "Sunset at the lake"
    Then the photo detail should show that caption

  Scenario: Edit caption from photo detail
    Given my photo has caption "Old caption"
    When I change the caption to "New caption"
    Then the photo detail should show "New caption"
    And the change should persist on my PDS

  Scenario: Add and remove tags
    When I add tags "nature" and "sunset" to my photo
    Then the photo should list those keywords
    When I remove the tag "sunset"
    Then only "nature" should remain

  Scenario: Caption exceeds maximum length
    Given I enter a caption longer than 2000 characters
    When I save the caption
    Then I should see a validation error
    And the caption should not be saved

# Source
# - srs.md SRS-F-005, SRS-F-013
# - prd.md F-005, F-013