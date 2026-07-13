# SRS-TC-008: Permissioned Spaces Feature Flag
# SRS-F-011.2: HappyView upload and backfill
Feature: HappyView Provisioning for ATPix
  As an ATPix operator
  I want HappyView provisioned with gallery lexicons and spaces enabled
  So that permissioned album development can proceed on a configured App View

  # Happy Path
  Scenario: All net.atpix.gallery lexicons are registered with backfill on records
    Given HappyView is running with lexicon upload capability
    When lexicons are uploaded to HappyView with backfill true
    Then each record lexicon should have backfill enabled on HappyView
    And each query and procedure should declare target_collection on HappyView

  Scenario: Permissioned spaces feature flag is enabled
    Given HappyView is running with lexicon upload capability
    When feature.spaces_enabled is enabled on HappyView
    Then the HappyView feature flags should show spaces enabled

  # Edge Case
  Scenario: Provision script is idempotent on re-run
    Given HappyView is running with lexicon upload capability
    And lexicons are already uploaded to HappyView
    When lexicons are uploaded to HappyView with backfill true
    Then provisioning should complete without duplicate registration errors

  # Error Case
  Scenario: Provisioning fails when HappyView is unreachable
    Given HappyView is not reachable
    When provisioning is attempted
    Then the operator should see a clear connectivity error

# Source
# - srs.md SRS-TC-008, SRS-F-011.2
# - prd.md TC-008, F-011, TC-001
# - architecture/007-happyview-app-view-integration.md