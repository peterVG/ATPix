# SRS-F-007: Shareable Album and Gallery Links
Feature: Shareable Album and Gallery Links
  As a creator
  I want to share links to my gallery or albums
  So that others can view my photos without an account

  Background:
    Given I am signed in as a creator

  Scenario: Copy public profile gallery link
    When I copy my public profile gallery link
    Then the link should be stable and shareable
    And an unauthenticated visitor should open the gallery successfully

  Scenario: Copy public album link
    Given I have a public album with photos
    When I copy the album share link
    Then an unauthenticated visitor should see the album and its photos

  Scenario: Unlisted album is reachable but not listed publicly
    Given I have an unlisted album
    When I copy the unlisted album link
    Then an unauthenticated visitor should open the album via the link
    And the album should not appear in my public profile album list

  Scenario: Users are informed about public visibility
    When I set an album to public visibility
    Then I should see disclosure that public repo content is readable by anyone with the URI

# Source
# - srs.md SRS-F-007, SRS-NFR-002
# - prd.md F-007, NFR-002