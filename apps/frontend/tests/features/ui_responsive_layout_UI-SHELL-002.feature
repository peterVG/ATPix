# UI-SHELL-002: Responsive layout
Feature: Responsive application layout
  As a user on any device
  I want the gallery layout to adapt to my viewport
  So that I can browse photos comfortably on mobile, tablet, and desktop

  Background:
    Given I am viewing a gallery screen

  Scenario: Mobile viewport uses two-column grid
    Given my viewport width is below 768 pixels
    When the gallery grid is rendered
    Then the grid should display two columns
    And the metadata panel should be available as a full-screen overlay

  Scenario: Tablet viewport uses three-column grid
    Given my viewport width is between 768 and 1024 pixels
    When the gallery grid is rendered
    Then the grid should display three columns
    And the sidebar should remain visible

  Scenario: Desktop viewport uses four-column grid
    Given my viewport width is above 1024 pixels
    When the gallery grid is rendered
    Then the grid should display four columns by default

  Scenario: Photo detail uses fixed metadata sidebar on desktop
    Given my viewport width is above 1024 pixels
    When I open a photo detail view
    Then the metadata panel should appear as a fixed sidebar beside the image

# Source
# - ui-requirements.md UI-SHELL-002
# - references/000-UX-guide.md Breakpoints