# SRS-F-013: C2PA Provenance on Edit and Publish
Feature: C2PA Provenance on Edit and Publish
  As the ATPix claim generator
  I want edit and publish actions reflected in Content Credentials
  So that viewers see an accurate change history

  Background:
    Given a photo with an active embedded C2PA manifest exists

  Scenario: Metadata edit records c2pa.edited.metadata
    When only caption or keywords are updated
    Then a new update manifest should record c2pa.edited.metadata
    And c2pa.actions should not be redacted

  Scenario: Pixel edit records c2pa.edited with parent ingredient
    When the image is cropped or rotated
    Then a new update manifest should record c2pa.edited
    And the manifest should chain via parentOf to the prior manifest
    And c2pa.hash.data should be recomputed for new bytes

  Scenario: Publish action appended on public visibility
    When a photo becomes publicly visible
    Then the update manifest should include c2pa.published

  Scenario: Photo record stores C2PA summary fields
    When an edit manifest is activated
    Then the photo record should update c2paActiveManifestId
    And c2paLastAction should reflect the latest action type

# Source
# - srs.md SRS-F-013, SRS-TC-010
# - prd.md F-013, TC-010