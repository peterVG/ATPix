# SRS-F-010: Network Discovery Feed
Feature: Network Discovery Feed
  As an atproto user
  I want photos from followed accounts and tracked hashtags
  So that I can discover network photos and add them to albums

  Background:
    Given I am signed in
    And HappyView has indexed network photos

  Scenario: Following feed shows photos from followed accounts
    Given I follow accounts that publish gallery photos
    When I open the Following or Hashtags discovery feed
    Then I should see matching indexed photos

  Scenario: Hashtag rule matches photo keywords
    Given I have a collection rule for hashtag "landscape"
    And indexed photos include keyword "landscape"
    When I open the discovery feed
    Then I should see those matching photos

  Scenario: Create and edit collection rules
    When I create a collection rule for followed actors
    Then the rule should appear in my rule list
    When I edit the rule
    Then the updated rule should apply on the next feed query

  Scenario: Empty follow graph shows guidance not error
    Given I follow no accounts with gallery photos
    When I open the discovery feed
    Then I should see an empty state with guidance
    And I should not see an error page

  Scenario: Add discovery photo to album
    Given the discovery feed shows a matching photo
    When I add that photo to my album
    Then the photo should appear as an album item
    And the photo should remain on the author's PDS

# Source
# - srs.md SRS-F-010, SRS-TC-012
# - prd.md F-010, TC-012