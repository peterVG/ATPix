# SRS-NFR-001: Data Ownership and Verifiability
Feature: Data Ownership and Verifiability
  As a user
  I want my photos in my PDS repository
  So that I retain ownership and portability

  Scenario: Uploaded photo record resides on user PDS
    Given an authenticated user uploads a photo
    When the createPhoto procedure completes
    Then the record URI should reference the user's PDS repository
    And the blob should be stored via com.atproto.repo.uploadBlob on that PDS

  Scenario: App View index is not sole custodian
    Given a photo is indexed in HappyView
    When the App View index is unavailable
    Then the photo should still be retrievable from the user's PDS via AT URI

# Source
# - srs.md SRS-NFR-001
# - prd.md NFR-001