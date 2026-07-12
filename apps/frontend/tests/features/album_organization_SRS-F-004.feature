# SRS-F-004: Album Organization
Feature: Album Organization
  As a creator
  I want to organize photos into named albums
  So that I can group related images and share curated collections

  Background:
    Given I am signed in
    And I have photos in my gallery

  Scenario: Create a named album
    When I create an album named "Summer Trip"
    Then the album should appear in my album list
    And the album should have the display name "Summer Trip"

  Scenario: Add and remove photos from an album
    Given I have an album "Summer Trip"
    When I add a photo to the album
    Then the photo should appear in the album detail view
    When I remove the photo from the album
    Then the photo should remain in my gallery
    And the photo should not appear in the album

  Scenario: Delete album does not delete photos
    Given I have an album with photos
    When I delete the album
    Then the album should no longer exist
    And the photos should still exist in my gallery

  Scenario: Seed album from own uploads and discovery matches
    Given I have own uploads and discovery feed matches
    When I create an album
    Then I should be able to add photos from my uploads
    And I should be able to add photos from Following or Hashtag discovery

# Source
# - srs.md SRS-F-004, SRS-F-015
# - prd.md F-004, F-015