# SRS-NFR-003: Authentication Security
Feature: Authentication Security
  As the ATPix security baseline
  I want OAuth with DPoP and no plaintext credential storage
  So that user authentication meets security requirements

  Scenario: No plaintext passwords in client storage
    Given a user has signed in via OAuth
    When client storage is inspected
    Then PDS passwords and app passwords should not be present

  Scenario: DPoP-bound session tokens
    Given an active OAuth session
    When the client makes authenticated XRPC calls
    Then requests should use DPoP-bound tokens per HappyView client library

  Scenario: Production token encryption recommended
    Given a production HappyView deployment checklist
    Then TOKEN_ENCRYPTION_KEY configuration should be documented as required

# Source
# - srs.md SRS-NFR-003
# - prd.md NFR-003, RC-004