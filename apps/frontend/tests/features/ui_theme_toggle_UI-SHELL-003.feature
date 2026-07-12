# UI-SHELL-003: Dark / light color scheme toggle
Feature: Color scheme toggle
  As a user
  I want to switch between dark and light appearance
  So that I can browse comfortably in different lighting conditions

  Background:
    Given the application shell is rendered

  Scenario: Default appearance is dark mode
    Given I have no saved color scheme preference
    When I open the application
    Then the root element should use the dark theme
    And surfaces should use dark mode background tokens

  Scenario: Header toggle switches to light mode
    Given the application is in dark mode
    When I activate the color scheme toggle in the header
    Then the root element should use the light theme
    And surfaces should use light mode background tokens
    And body text should remain legible with high contrast

  Scenario: Light mode preserves semantic badge colors
    Given the application is in light mode
    And the gallery displays photos with status and C2PA badges
    Then Public badges should retain the public status color
    And Trusted badges should retain the trusted C2PA color
    And Invalid badges should retain the invalid C2PA color

  Scenario: Theme preference persists across sessions
    Given I select light mode in Settings Appearance
    When I reload the application
    Then the application should open in light mode

  Scenario: System preference follows OS color scheme
    Given I select System in Settings Appearance
    And my OS prefers dark color scheme
    Then the application should use the dark theme
    When my OS prefers light color scheme
    Then the application should use the light theme

  Scenario: Theme change does not alter photo thumbnails
    Given a photo is visible in the gallery
    When I switch from dark mode to light mode
    Then the photo thumbnail pixels should remain unchanged
    And only application chrome colors should update

  Scenario: Color scheme toggle is accessible
    Then the header color scheme control should have an accessible name
    And the Settings Appearance options should be keyboard reachable

# Source
# - ui-requirements.md UI-SHELL-003, UI-CMP-008
# - references/000-UX-guide.md Theme toggle, Theme modes