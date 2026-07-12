# Architecture Decision Record - ATPix

**002-inline-documentation-generators.md**

## Title

Inline documentation generators (pdoc and JSDoc)

## Status

Accepted

## Context / Requirement Reference

[AGENTS.md](../../AGENTS.md) Inline Documentation Mandate requires Google/NumPy docstrings (Python) and JSDoc (JavaScript), enforced via [.agents/rules/docs-enforce.md](../../.agents/rules/docs-enforce.md).

## Decision

- **Backend:** `pdoc` generates API docs from Python docstrings in `apps/backend/app/`.
- **Frontend:** `jsdoc` with `jsdoc.json` parsing `apps/frontend/src/`, invoked via `npm run docs`.

## Rationale

Both tools extract documentation from source — no duplicate API manuals. They match the init-python-js skill and keep docs co-located with implementation.

## Assumptions

Public API surface remains small until C2PA and gallery modules grow. Generated sites are dev artifacts, not deployed to production.

## Alternatives Considered

- **Sphinx:** Rejected as heavier than needed for a FastAPI auxiliary service.
- **TypeDoc:** Rejected; project uses vanilla JavaScript, not TypeScript.

## Consequences / Implications

Agents must maintain docstrings/JSDoc on every new function. CI may add doc generation checks later.

## Related Decisions / Notes

See [004-coding-style-and-linting.md](./004-coding-style-and-linting.md).