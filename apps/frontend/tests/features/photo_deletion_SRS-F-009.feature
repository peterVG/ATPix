# SRS-F-009: Photo Deletion and Album Membership
Feature: Photo Deletion and Album Membership
  As a gallery owner
  I want to delete photos and manage album membership
  So that I control what remains in my repository

  Background:
    Given I am signed in
    And I have photos in my gallery and albums

  Scenario: Delete photo with confirmation
    When I initiate delete on my photo
    Then I should be asked to confirm deletion
    When I confirm deletion
    Then the photo should be removed from my gallery and albums

  Scenario: Delete failure shows error not success
    Given PDS deletion will fail
    When I confirm photo deletion
    Then I should see an error message
    And the photo should still appear in my gallery

  Scenario: Remove photo from album without deleting record
    Given my photo is in an album
    When I remove the photo from the album
    Then the photo should remain in my gallery
    And the photo should not appear in the album

# Source
# - srs.md SRS-F-009
# - prd.md F-009