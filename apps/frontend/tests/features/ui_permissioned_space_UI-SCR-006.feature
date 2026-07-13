# UI-SCR-006: Permissioned space administration
Feature: Permissioned space administration presentation
  As an album owner
  I want a space management portal
  So that I can govern members, audit access, and configure space policy

  Background:
    Given I am the owner of a permissioned album space

  Scenario: Space header describes membership-gated storage
    Then I should see a Permissioned Space label with lock icon
    And I should see a description of membership-gated storage
    And the description should not claim client-side encryption
    And I should see Export Logs and Share Access actions

  Scenario: Space metadata card shows DID and record type
    Then I should see the space DID in monospaced metadata style
    And I should see record type net.atpix.gallery.albumSpace
    And I should see a Gated status badge

  Scenario: Member directory lists roles and actions
    Then I should see a member table with Identity, DID, Role, and Actions columns
    And members should display ADMIN, MEMBER, or VIEWER roles

  Scenario: Invite flow validates handle before enabling submit
    When I enter an invalid handle in the invite search field
    Then the invite action should remain disabled
    When I enter a valid resolvable handle
    Then the invite action should become available

  Scenario: Access audit trail shows chronological events
    Then I should see color-coded audit entries with RFC 3339 timestamps

  Scenario: Unauthorized viewer sees access denied without leaks
    Given I am not a space member
    When I attempt to open the permissioned space
    Then I should see an access-denied panel
    And I should not see photo thumbnails or blob identifiers
    And I should see a Request Access or sign-in call to action

# Source
# - ui-requirements.md UI-SCR-006
# - references/mockups/06-permissioned-space-admin.jpg