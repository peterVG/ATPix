# SRS-NFR-004: Observability and Logging
Feature: Observability and Logging
  As an operator
  I want structured stdout logs routed to the observability stack
  So that I can monitor ATPix services centrally

  Scenario: Backend logs to stdout only
    Given the FastAPI backend is running
    When a request is processed
    Then log events should be written unbuffered to stdout
    And no log files should be created by the application

  Scenario: Observability stack services are reachable
    Given docker compose observability profile is started
    Then Grafana should be available on port 3000
    And Loki should accept log streams
    And Prometheus should scrape metrics endpoints

# Source
# - srs.md SRS-NFR-004
# - prd.md NFR-004, RC-005