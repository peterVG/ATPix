# SRS-F-006: Public Profile Gallery
Feature: Public Profile Gallery
  As a visitor
  I want to browse another user's public gallery
  So that I can view photos they published with ATPix Lexicons

  Background:
    Given a user has public photos indexed under net.atpix.gallery.photo

  Scenario: Browse public gallery by DID without signing in
    Given I am not signed in
    When I open a public profile gallery by DID
    Then I should see that user's public photos
    And I should not be prompted to sign in

  Scenario: Browse public gallery by handle
    When I open a public profile gallery by handle
    Then the handle should resolve to a DID
    And I should see that user's public photos

  Scenario: Public gallery uses cursor pagination
    Given the user has more than 20 public photos
    When I open their public gallery
    Then I should see the first page
    When I load the next page
    Then I should see more photos

  Scenario: Permissioned content is not shown on public profile
    Given a user has permissioned album photos
    When I open their public profile gallery
    Then permissioned photos should not appear

# Source
# - srs.md SRS-F-006
# - prd.md F-006