# Architecture Decision Record - ATPix

**004-coding-style-and-linting.md**

## Title

Coding style and linting tooling (Ruff, ESLint, Prettier)

## Status

Accepted

## Context / Requirement Reference

[AGENTS.md](../../AGENTS.md) Linting Mandate requires formatted, lint-clean code before tests or merge. [.agents/rules/lint-enforce.md](../../.agents/rules/lint-enforce.md) operationalizes this for the Python/JS stack.

## Decision

- **Backend (`apps/backend/`):** `ruff` for lint and format; configuration in `pyproject.toml`.
- **Frontend (`apps/frontend/`):** `eslint` (flat config) + `prettier`; scripts `npm run lint` and `npm run format`.

## Rationale

Ruff replaces flake8/black/isort in one fast tool. ESLint + Prettier is the standard JavaScript pairing and matches the init skill.

## Assumptions

Python 3.11+ and Node 20+ are available locally or via version managers (`mise`, `asdf`, `nvm`, `pyenv`).

## Alternatives Considered

- **Black + flake8:** Rejected in favor of unified Ruff.
- **Biome:** Rejected to stay aligned with init-python-js skill defaults.

## Consequences / Implications

Pre-commit and CI should invoke lint commands per workspace boundary. Agents must not skip lint before commits.

## Related Decisions / Notes

See [001-test-runners-and-reporting.md](./001-test-runners-and-reporting.md).