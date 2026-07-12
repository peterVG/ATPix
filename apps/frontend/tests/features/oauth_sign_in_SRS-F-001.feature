# SRS-F-001: atproto OAuth Sign-In
Feature: atproto OAuth Sign-In
  As an atproto-native user
  I want to sign in with my existing PDS account
  So that I can use ATPix without a separate password store

  Background:
    Given the HappyView App View is available
    And a valid OAuth client key is configured

  Scenario: Successful OAuth sign-in displays identity
    Given I am not signed in
    When I complete atproto OAuth sign-in with DPoP
    Then I should see my handle or DID in the UI
    And my session should be bound to my DID

  Scenario: Sign-out revokes current device session only
    Given I am signed in on this device
    When I sign out
    Then I should no longer be authenticated on this device
    And other devices should retain their sessions

  Scenario: Write procedures require authentication
    Given I am not signed in
    When I attempt to upload a photo
    Then I should be prompted to sign in
    And the upload should not proceed

  Scenario: XRPC requests include client identification
    Given I am signed in
    When the client calls a HappyView XRPC endpoint
    Then each request should include a valid X-Client-Key header
    And admin API keys should not be used on XRPC routes

# Source
# - srs.md SRS-F-001
# - prd.md F-001, TC-006