# UI-SCR-002: Discovery feed screen
Feature: Discovery feed screen presentation
  As a signed-in user
  I want a structured discovery feed layout
  So that I can browse network photos with clear scope and status

  Background:
    Given I am signed in
    And I am on the Discovery screen

  Scenario: Feed scope tabs and collection rules action
    Then I should see Following and Trending Hashtags sub-tabs
    And I should see a Manage Collection Rules action
    And I should see a network search field in the header

  Scenario: Discovery cards show network status badges
    Given the feed contains indexed public photos
    Then public items should display a Public badge
    And items pending index should display an Indexing status

  Scenario: Feed footer supports pagination
    Given the feed has more results available
    Then I should see a Load more results control
    And I should see a status line showing how many photos are displayed

  Scenario: Empty discovery shows guidance not an error
    Given my follow graph has no matching photos
    Then I should see an empty state with guidance
    And I should not see an error page

# Source
# - ui-requirements.md UI-SCR-002
# - references/mockups/01-discovery-feed.jpg