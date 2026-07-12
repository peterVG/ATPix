# SRS-F-008: Permissioned Album Access
Feature: Permissioned Album Access
  As a creator
  I want to restrict album access to selected users
  So that I can share private curated collections without making them network-public

  Background:
    Given HappyView permissioned spaces are enabled
    And I am signed in as an album owner

  Scenario: Create permissioned album with space link
    When I create an album with permissioned visibility
    Then the album should have a linked space URI
    And the album visibility should be permissioned

  Scenario: Invite member to permissioned album
    Given I have a permissioned album
    When I invite another atproto user
    Then the invited user should be able to accept the invite
    And the invited user should view album photos

  Scenario: Unauthorized user is denied access
    Given I have a permissioned album with photos
    And I am not a space member
    When I attempt to open the permissioned album
    Then I should see an access-denied state
    And I should not see photo thumbnails or metadata

  Scenario: Permissioned sharing disclosure
    When I create a permissioned album
    Then I should see that access is membership-gated via spaces
    And I should not see claims of client-side encryption

# Source
# - srs.md SRS-F-008, SRS-NFR-002, SRS-NFR-013
# - prd.md F-008, NFR-002, NFR-013, TC-004, TC-008