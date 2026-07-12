# SRS-F-002: Photo Upload
Feature: Photo Upload
  As a creator
  I want to upload photos to my gallery
  So that they are stored in my PDS and visible in my personal gallery

  Background:
    Given I am signed in with a PDS account
    And C2PA manifest generation is available

  Scenario: Upload JPEG successfully
    Given I have a 5MB JPEG image file
    When I upload the photo
    Then I should see upload progress
    And the upload should complete successfully
    And the photo should appear in my personal gallery

  Scenario: Upload rejects files over 50MB
    Given I have a 51MB image file
    When I attempt to upload the photo
    Then I should see an error that the file exceeds the size limit
    And the upload should not start transfer

  Scenario: Upload failure surfaces error state
    Given I have a valid image file
    And the PDS upload will fail
    When I upload the photo
    Then I should see a clear error state
    And the photo should not appear in my gallery

  Scenario: Photo record uses RFC 3339 UTC timestamp
    Given I have uploaded a photo successfully
    When I inspect the created photo record
    Then the createdAt field should use RFC 3339 UTC format

# Source
# - srs.md SRS-F-002, SRS-NFR-005
# - prd.md F-002, TC-002