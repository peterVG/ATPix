# SRS-F-003: Personal Gallery Grid
Feature: Personal Gallery Grid
  As a signed-in user
  I want to browse my uploaded photos in a paginated grid
  So that I can review and manage my own library

  Background:
    Given I am signed in
    And I have uploaded photos to my PDS

  Scenario: My Gallery shows own uploads in a grid
    When I open My Gallery
    Then I should see my photos in a grid layout
    And thumbnails should resolve from PDS blob URLs

  Scenario: My Gallery is distinct from discovery feed
    When I open My Gallery
    Then I should not see the Following or Hashtags discovery feed
    And only my authored photos should appear

  Scenario: Empty gallery shows guidance
    Given I have not uploaded any photos
    When I open My Gallery
    Then I should see guidance to upload my first photo

  Scenario: Gallery supports cursor pagination
    Given I have more than 20 uploaded photos
    When I open My Gallery
    Then I should see the first page of results
    When I load the next page
    Then I should see additional photos without duplicates

# Source
# - srs.md SRS-F-003
# - prd.md F-003