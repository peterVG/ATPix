# SRS-NFR-017: C2PA Validation Performance
Feature: C2PA Validation Performance
  As a gallery viewer
  I want Content Credentials validation to complete quickly
  So that browsing is not blocked by provenance checks

  Scenario: Level 1-2 validation within 3 seconds p95
    Given a 10MB JPEG with embedded manifest
    When Level 1 and Level 2 validation runs on reference hardware
    Then p95 completion time should be under 3 seconds

  Scenario: Embedded manifest validates without network
    Given the manifest is embedded in the asset
    When validation runs offline
    Then Level 1 status should still be produced

# Source
# - srs.md SRS-NFR-017
# - prd.md NFR-017