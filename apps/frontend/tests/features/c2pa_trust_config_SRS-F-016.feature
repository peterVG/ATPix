# SRS-F-016: C2PA Trust Configuration
Feature: C2PA Trust Configuration
  As a verifier
  I want to configure trusted signers
  So that Trusted status reflects my policy

  Background:
    Given I am signed in
    And Content Credentials validation is available

  Scenario: Default trust list is applied
    When I open trust configuration
    Then I should see the default C2PA trust list for claim signing
    And trusted timestamp authorities should be listed

  Scenario: Add custom signer trust anchor
    When I add a signer to my trust list
    And I explicitly approve the entry
    Then photos signed by that signer should reach Trusted state when otherwise valid

  Scenario: Private credential store is not pre-populated
    When I open trust configuration for the first time
    Then the private credential store should be empty
    And I should need to approve any private entries explicitly

  Scenario: Trust changes affect Trusted state only
    Given a manifest is Valid but not in my trust list
    When I add the signer to my trust list
    Then the manifest should become Trusted
    And Well-Formed and Valid evaluation should be unchanged by trust list alone

# Source
# - srs.md SRS-F-016
# - prd.md F-016