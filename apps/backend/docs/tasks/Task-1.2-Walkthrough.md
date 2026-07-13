# Task 1.2 — Provision HappyView with ATPix lexicons and spaces flag

**Branch:** `task/1.2-happyview-provisioning`  
**Date:** 2026-07-13  
**Related requirements:** [F-011](../../../../docs/overview/002-prd.md#f-011-lexicon-publication-and-network-indexing), [TC-001](../../../../docs/overview/002-prd.md#tc-001-happyview-app-view), [TC-008](../../../../docs/overview/002-prd.md#tc-008-permissioned-spaces-feature-flag), [SRS-F-011](../../../../docs/overview/003-srs.md#srs-f-011-lexicon-publication-and-network-indexing)  
**ADR:** [007-happyview-app-view-integration.md](../../../../docs/architecture/007-happyview-app-view-integration.md)

## Summary

Configured external HappyView provisioning for ATPix per ADR-007:

- `docker-compose.happyview.yml` — HappyView on port **3001** (`ghcr.io/gamesgamesgamesgamesgames/happyview:latest`, SQLite)
- `config/happyview/provision-manifest.json` — ordered upload of 23 `net.atpix.gallery.*` lexicons with `backfill` / `target_collection`
- `scripts/provision_happyview.py` — uploads lexicons and enables `feature.spaces_enabled`
- BDD `happyview_provisioning_SRS-TC-008.feature` + behave steps
- Unit/integration pytest coverage for offline manifest validation
- README and `.env.example` updated with `HAPPYVIEW_ADMIN_KEY`
- Lexicon namespace migrated **`com.atpix.gallery.*` → `net.atpix.gallery.*`** (authority domain **atpix.net** per ADR-009)

## Provision manifest check (offline)

```text
$ python3 scripts/provision_happyview.py --check-only
manifest OK (23 lexicons)
```

## HappyView health (Docker daemon not running in CI agent)

```text
$ curl -s -o /dev/null -w "http_code=%{http_code}\n" http://127.0.0.1:3001/health
http_code=000
```

```text
$ docker compose -f docker-compose.happyview.yml pull
unable to get image 'ghcr.io/gamesgamesgamesgamesgames/happyview:latest': failed to connect to the docker API at unix:///Users/petervangarderen/.orbstack/run/docker.sock
```

**Operator action:** Start Docker (OrbStack/Docker Desktop), then:

```bash
docker compose -f docker-compose.happyview.yml up -d
curl http://127.0.0.1:3001/health
# Log in at http://127.0.0.1:3001/ → Settings → API Keys → create hv_* key
export HAPPYVIEW_ADMIN_KEY=hv_...
python3 scripts/provision_happyview.py
python3 scripts/provision_happyview.py --verify-only
```

## Lint

```text
$ cd apps/backend && source .venv/bin/activate && ruff check . --fix && ruff format .
Found 2 errors (2 fixed, 0 remaining).
4 files reformatted, 15 files left unchanged
```

## Pytest (unit + integration)

```text
$ pytest tests/unit/test_lexicon_artifacts.py tests/integration/test_happyview_provision.py -v
======================== 28 passed, 3 skipped in 0.08s =========================
```

Integration tests against live HappyView are **skipped** when `/health` is unreachable; `test_provision_script_check_only` passes offline.

## Behave (connectivity error scenario)

```text
$ cd apps/backend && behave tests/features/happyview_provisioning_SRS-TC-008.feature:28 --no-capture
1 feature passed, 0 failed, 0 skipped
1 scenario passed, 0 failed, 3 skipped
3 steps passed, 0 failed, 11 skipped
```

Live HappyView scenarios (lexicon upload, spaces flag, idempotency) require Docker + `HAPPYVIEW_ADMIN_KEY`; run after `docker compose -f docker-compose.happyview.yml up -d`.

## Mocked / blocked environment

| Item | Status |
|------|--------|
| Docker daemon | Not running during agent verification (OrbStack socket missing) |
| `HAPPYVIEW_ADMIN_KEY` | Placeholder in `.env.example` only — operator must create real `hv_*` key after dashboard login |
| Live lexicon upload | Not executed; provision script verified via `--check-only` and pytest skip guards |

Replace placeholder credentials and start HappyView before Task 1.3 (OAuth client registration).

## Cubic PR #6 fix verification (2026-07-13)

```text
pytest tests/unit/test_lexicon_artifacts.py -v
# 27 passed in 0.46s

python3 scripts/provision_happyview.py --check-only
# manifest OK (23 lexicons)

ruff check tests/features/steps/happyview_steps.py tests/unit/test_lexicon_artifacts.py
# All checks passed!
```

## Files added/changed

| Path | Purpose |
|------|---------|
| `docker-compose.happyview.yml` | External HappyView on port 3001 |
| `config/happyview/provision-manifest.json` | Lexicon upload order and flags |
| `scripts/provision_happyview.py` | Provisioner CLI |
| `apps/backend/tests/unit/test_lexicon_artifacts.py` | Offline lexicon validation |
| `apps/backend/tests/integration/test_happyview_provision.py` | Live HappyView checks |
| `apps/backend/tests/features/happyview_provisioning_SRS-TC-008.feature` | BDD scenarios (feature-writer) |
| `apps/backend/tests/features/steps/happyview_steps.py` | Behave step definitions |
| `apps/backend/tests/features/environment.py` | Behave environment hooks |
| `README.md` | HappyView setup + provision steps |
| `.env.example` | `HAPPYVIEW_ADMIN_KEY` |
| `docs/overview/005-plan.md` | Task 1.2 checked off |