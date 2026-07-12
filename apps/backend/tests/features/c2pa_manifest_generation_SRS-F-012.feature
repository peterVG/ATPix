# SRS-F-012: C2PA Manifest Generation on Upload
Feature: C2PA Manifest Generation on Upload
  As the ATPix claim generator
  I want to embed Content Credentials on upload
  So that viewers can verify how the image was created

  Background:
    Given the C2PA signing service is configured
    And a valid claim-signing certificate is available

  Scenario: New capture receives c2pa.created action
    Given I have a JPEG with no prior C2PA manifest
    When the claim generator processes the upload
    Then the manifest should include c2pa.created as the first action
    And c2pa.hash.data should be present for the asset

  Scenario: Import receives c2pa.opened with ingredient
    Given I have a JPEG with an existing C2PA manifest
    When the claim generator processes the import
    Then the manifest should include c2pa.opened as the first action
    And an ingredient reference should link to the source manifest

  Scenario: Manifest is embedded in JPEG before blob upload
    When the claim generator signs a PNG upload
    Then the manifest store should be embedded in the image file by default
    And the blob bytes should contain the signed manifest

  Scenario: Creator DID assertion is recorded
    Given the uploader DID is did:plc:example
    When the manifest is signed
    Then the assertion com.atpix.gallery.creatorDid should record did:plc:example

  Scenario: User opts out of sensitive metadata
    Given the user declines GPS and device metadata
    When the manifest is signed
    Then optional location and device assertions should be omitted
    And required actions and hash assertions should remain

# Source
# - srs.md SRS-F-012, SRS-NFR-014, SRS-NFR-015, SRS-TC-009, SRS-TC-010
# - prd.md F-012, NFR-014, NFR-015, TC-009, TC-010