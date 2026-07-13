# Task 1.1 — Verify monorepo scaffold against ADRs

**Branch:** `task/1.1-verify-scaffold`
**Date:** 2026-07-12
**Related requirements:** [NFR-006](../../../../docs/prd.md#nfr-006-testability-and-quality-gates), [NFR-007](../../../../docs/prd.md#nfr-007-zero-friction-local-setup), [TC-007](../../../../docs/prd.md#tc-007-standalone-production-code)
**ADRs:** [001](../../../../docs/architecture/001-test-runners-and-reporting.md), [004](../../../../docs/architecture/004-coding-style-and-linting.md), [005](../../../../docs/architecture/005-application-architecture.md)

## Summary

Verified monorepo scaffold matches ADR-005 layout (Vite frontend, FastAPI backend, external HappyView), ADR-004 lint tooling (ESLint/Prettier, Ruff), and ADR-001 test runners (vitest, pytest + Allure). All lint and existing unit/integration tests passed.

## Scaffold verification

```text
=== Scaffold verification ===
OK apps/frontend
OK apps/backend
OK docker-compose.yml
OK .env.example
OK apps/frontend/vite.config.js
OK apps/frontend/vitest.config.js
OK apps/backend/pyproject.toml
OK apps/backend/pytest.ini
OK apps/backend/requirements.txt
OK apps/backend/requirements-dev.txt
OK apps/frontend/eslint.config.js
```

**ADR-005 alignment:** `apps/frontend/` (Vite vanilla JS), `apps/backend/` (FastAPI port 8000), HappyView external via `VITE_HAPPYVIEW_URL` in `.env.example`.

**ADR-004 alignment:** `eslint.config.js` + `npm run lint` / `npm run format`; `pyproject.toml` Ruff config.

**ADR-001 alignment:** `vitest` + `test:unit` / `test:ui`; `pytest` with `--alluredir=tests/allure-results --clean-alluredir`; behave feature files present under `apps/backend/tests/features/`; locust declared in requirements-dev.txt (performance scaffold not yet created).

## Lint (raw CLI output)

### Frontend

```text
$ cd apps/frontend && npx prettier --write .
.prettierrc 13ms (unchanged)
docs/plan.md 41ms
eslint.config.js 4ms (unchanged)
index.html 11ms
jsdoc.json 1ms (unchanged)
package-lock.json 29ms (unchanged)
package.json 0ms (unchanged)
src/api/happyview.js 4ms (unchanged)
src/components/App.js 3ms
src/main.js 1ms (unchanged)
src/styles.css 18ms
tests/README.md 1ms (unchanged)
tests/unit/app.test.js 2ms (unchanged)
tests/unit/happyview.test.js 1ms (unchanged)
vite.config.js 1ms (unchanged)
vitest.config.js 1ms (unchanged)

$ npx eslint . --fix
(exit 0)
FRONTEND_LINT_EXIT=0
```

### Backend

```text
$ cd apps/backend && ruff check . --fix
All checks passed!

$ ruff format .
15 files left unchanged
BACKEND_LINT_EXIT=0
```

## Tests (raw CLI output)

### Frontend unit tests

```text
$ npm run test:unit

> atpix-frontend@0.1.0 test:unit
> vitest run


 RUN  v2.1.9 /Users/petervangarderen/Dev/ATPix/apps/frontend

 ✓ tests/unit/happyview.test.js (1 test) 1ms
 ✓ tests/unit/app.test.js (1 test) 14ms

 Test Files  2 passed (2)
      Tests  2 passed (2)
   Start at  10:21:01
   Duration  410ms (transform 27ms, setup 0ms, collect 26ms, tests 15ms, environment 493ms, prepare 64ms)

FRONTEND_TEST_EXIT=0
```

### Backend unit + integration tests

```text
$ pytest tests/unit tests/integration -v
============================= test session starts ==============================
platform darwin -- Python 3.12.0, pytest-9.1.1, pluggy-1.6.0
collected 2 items

tests/unit/test_health.py::test_health_response_defaults PASSED          [ 50%]
tests/integration/test_health_api.py::test_health_endpoint_returns_ok PASSED [100%]

========================= 2 passed, 1 warning in 0.23s =========================
BACKEND_TEST_EXIT=0
```

## Result

Task 1.1 complete. No scaffold drift requiring code fixes. Prettier applied minor formatting normalization to four frontend files (trailing newline consistency).