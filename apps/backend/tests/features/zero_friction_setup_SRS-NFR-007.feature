# SRS-NFR-007: Zero-Friction Local Setup
Feature: Zero-Friction Local Setup
  As a new developer
  I want local setup to provision dependencies automatically
  So that I can start developing without opaque failures

  Scenario: Missing OAuth client key is surfaced clearly
    Given VITE_HAPPYVIEW_CLIENT_KEY is not configured
    When I start the frontend
    Then I should see guidance to configure the client key
    And the app should not crash with an unhandled stack trace

  Scenario: Environment template documents required variables
    When I read .env.example
    Then HappyView URL and client key variables should be documented

  Scenario: README setup commands are verifiable
    Given I follow README backend and frontend setup steps
    Then health endpoints and dev servers should start successfully

# Source
# - srs.md SRS-NFR-007
# - prd.md NFR-007