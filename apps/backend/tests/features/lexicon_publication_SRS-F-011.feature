# SRS-F-011: Lexicon Publication and Network Indexing
Feature: Lexicon Publication and Network Indexing
  As a developer
  I want ATPix Lexicons published on the network
  So that compatible clients can read and write gallery records

  Background:
    Given HappyView is running with lexicon upload capability

  Scenario: Lexicon JSON artifacts validate against atproto schema
    When I validate docs/lexicon JSON files
    Then each record lexicon should define a valid collection schema
    And each query and procedure should declare target_collection

  Scenario: Upload lexicons with backfill enabled
    When lexicons are uploaded to HappyView with backfill true
    Then historical compatible records should be indexed network-wide
    And ATPix should not run a separate Jetstream subscription

  Scenario: Photo records stay under CBOR size limit
    Given a photo metadata record with blob references only
    When the record is CBOR-encoded
    Then the encoded size should be well under 1 MiB

  Scenario: Breaking lexicon changes require new NSID
    Given an immutable published lexicon field
    When a breaking constraint change is proposed
    Then a new NSID must be used instead of in-place tightening

# Source
# - srs.md SRS-F-011, SRS-TC-005, SRS-NFR-008
# - prd.md F-011, TC-005, TC-012