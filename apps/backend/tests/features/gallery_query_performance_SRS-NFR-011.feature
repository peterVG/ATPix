# SRS-NFR-011: Gallery Query Performance
Feature: Gallery Query Performance
  As a gallery user
  I want fast paginated gallery queries
  So that browsing remains responsive

  Scenario: First page returns within performance target
    Given the index contains up to 10000 photos
    And a single HappyView instance with SQLite is running
    When listPhotos first page is queried
    Then p95 latency should be under 2 seconds on reference hardware

  Scenario: Album list pagination meets same target
    When listAlbums first page is queried
    Then p95 latency should be under 2 seconds on reference hardware

# Source
# - srs.md SRS-NFR-011
# - prd.md NFR-011, RC-002