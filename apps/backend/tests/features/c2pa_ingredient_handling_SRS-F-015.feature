# SRS-F-015: C2PA Ingredient and Derivative Handling
Feature: C2PA Ingredient and Derivative Handling
  As the ATPix C2PA pipeline
  I want derivatives to preserve upstream credentials
  So that provenance chains remain intact

  Background:
    Given a photo with valid embedded C2PA credentials exists

  Scenario: addToAlbum does not strip manifests
    When the photo is added to an album without pixel changes
    Then the embedded manifest should remain unchanged
    And no new C2PA manifest should be required

  Scenario: Collage composition references source ingredient
    When a collage is created from existing C2PA photos
    Then the new manifest should use c2pa.opened or c2pa.placed
    And c2pa.ingredient.v3 should reference source manifests

  Scenario: Transcode records c2pa.transcoded
    When a photo is re-encoded to a different JPEG quality
    Then the manifest should record c2pa.transcoded or c2pa.repackaged
    And the ingredient chain should validate

  Scenario: Validator walks ingredient chain for Level 3
    Given a photo with a multi-hop ingredient chain
    When Level 3 provenance is requested
    Then the validator should walk the full ingredient chain per specification

# Source
# - srs.md SRS-F-015
# - prd.md F-015