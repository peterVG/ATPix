# SRS-TC-012: HappyView-Only Network Sync
Feature: HappyView-Only Network Sync
  As the ATPix architecture
  I want network discovery to use only HappyView indexing
  So that we do not operate duplicate sync infrastructure

  Scenario: No standalone firehose consumer in codebase
    When the repository is scanned for relay firehose clients
    Then ATPix should not implement a standalone firehose subscription
    And ATPix should not implement a custom PDS crawler for discovery

  Scenario: Discovery queries use HappyView lexicon endpoints
    When network photos are discovered
    Then listFeedPhotos should query the HappyView local index only
    And collection rules should not scrape non-atproto services

# Source
# - srs.md SRS-TC-012, SRS-F-010
# - prd.md TC-012, F-010