# Task BE-4.1 Walkthrough — Permissioned Spaces Integration

**Global task:** [Task 5.1](../../../../docs/overview/005-plan.md)  
**SRS:** SRS-F-008.1–008.4 · **ADR:** [010](../../../../docs/architecture/010-permissioned-spaces-storage.md)

## Summary

- Added `tests/support/happyview_oauth_client.py` — DPoP XRPC client, `build_space_app_access`, `build_space_config`.
- Added `tests/features/steps/permissioned_spaces_steps.py` for all `permissioned_spaces_integration_SRS-F-008.feature` scenarios.
- Extended `environment.py` and `.env.example` with `HAPPYVIEW_CLIENT_KEY`, `ATPIX_DEPLOYMENT_ORIGIN`, `TEST_OWNER_*`, `TEST_MEMBER_*`.

## Verification (raw CLI)

```bash
cd apps/backend
.venv/bin/ruff check .
.venv/bin/ruff format .
./test -v
```

```
=================== 49 passed, 3 skipped, 1 warning in 5.89s ===================
```

```bash
.venv/bin/behave tests/features/permissioned_spaces_integration_SRS-F-008.feature
```

```
  Scenario: Create space and permissioned album
    Given HappyView has feature.spaces_enabled enabled
      ASSERT FAILED: HappyView not reachable at http://127.0.0.1:3001/health — start docker compose -f docker-compose.happyview.yml up -d
...
0 scenarios passed, 4 failed, 0 skipped
```

Behave scenarios require **live HappyView** (`docker compose -f docker-compose.happyview.yml up -d`), `HAPPYVIEW_ADMIN_KEY`, `HAPPYVIEW_CLIENT_KEY`, and exported `TEST_OWNER_*` / `TEST_MEMBER_*` OAuth session variables (see root README Step 11).

## Mocked environment variables

No dummy credentials were inserted into the repository. Integration steps call `context.scenario.skip()` when `TEST_OWNER_*` / `TEST_MEMBER_*` are unset. **Replace with real OAuth session exports** before expecting green behave output against live HappyView.

## NFR-013 flag status

When HappyView is running, confirm `feature.spaces_enabled=true` via:

```bash
python3 ../../scripts/provision_happyview.py --verify-only
```