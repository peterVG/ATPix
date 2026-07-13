# Architecture Decision Record - ATPix

**001-test-runners-and-reporting.md**

## Title

Test runners and Allure reporting for the Python/JavaScript monorepo

## Status

Accepted

## Context / Requirement Reference

[AGENTS.md](../../AGENTS.md) mandates unit, integration, UI, BDD, and performance tests with structured reporting. [docs/overview/002-prd.md](../overview/002-prd.md) NFR-006 requires traceable tests for every MUST requirement. The init-python-js skill defines symmetrical test taxonomy under `apps/frontend/tests/` and `apps/backend/tests/`.

## Decision

- **Backend:** `pytest` with `pytest-asyncio` for unit and integration tests; `behave` for BDD features; `locust` for performance tests; **Allure** via `allure-pytest` and `allure-behave`, writing only to `apps/backend/tests/allure-results/` with `--clean-alluredir`.
- **Frontend:** `vitest` + `jsdom` for unit/UI component tests against production `vite build` artifacts where applicable; `playwright` reserved for e2e; **Allure** plugins when e2e is added; results only in `apps/frontend/tests/allure-results/` with `pretest` cleanup.

## Rationale

pytest and vitest are fast, widely adopted, and align with the Open Agent Dev template. Allure provides a single stakeholder-facing report format across Python and JavaScript. Isolated `allure-results` directories prevent monorepo root pollution per artifact-isolation rules.

## Assumptions

Developers install Allure CLI separately to render HTML reports. Playwright browsers are installed explicitly via `npx playwright install` when e2e suites land.

## Alternatives Considered

- **Jest instead of Vitest:** Rejected; Vite-native vitest reduces config for vanilla JS.
- **Coverage-only HTML reports:** Rejected; AGENTS.md explicitly requires structured Allure history.

## Consequences / Implications

Easier cross-stack test reporting; additional dev dependency on Allure CLI. Performance and full e2e suites are scaffolded but not yet populated.

## Related Decisions / Notes

See [004-coding-style-and-linting.md](./004-coding-style-and-linting.md). HappyView integration tests will target external XRPC per PRD TC-001.