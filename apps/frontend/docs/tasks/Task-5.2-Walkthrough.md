# Task 5.2 Walkthrough — Hosted PDS Signup Link & Test Guide (F-017)

**Global task:** [Task 5.2](../../../../docs/overview/005-plan.md)  
**Frontend task:** [FE-5.2](../../plan.md)  
**SRS:** SRS-F-001.4, SRS-F-017 · **UI:** UI-SCR-009 · **ADR:** [006](../../../../docs/architecture/006-oauth-dpop-authentication.md)

## Summary

- Added `VITE_PDS_SIGNUP_URL` and `apps/frontend/src/config/pdsSignup.js`.
- Sign-in panel renders **Create a `*.pds.atpix.net` handle** link when configured (`SignInPanel.js`).
- README Phase B defaults to `alice.pds.atpix.net` / `bob.pds.atpix.net` (no per-user registrar TXT).
- PRD F-018–F-021 and Phase 9 plan entries for post-v1 identity platform.
- README **What you can test right now** section with seven manual/automated test scripts.

## Files changed

| Area | Files |
|------|-------|
| Frontend | `pdsSignup.js`, `SignInPanel.js`, `App.js`, `styles.css`, unit/UI tests |
| Docs | `README.md`, `002-prd.md`, `003-srs.md`, `004-ui-requirements.md`, `005-plan.md`, `001-product-vision.md`, ADR-006 |
| Env | `.env.example`, `.env.test` |

## Verification (raw CLI)

### Frontend lint

```bash
cd apps/frontend && npm run lint
```

```
> atpix-frontend@0.1.0 lint
> eslint .

(exit 0)
```

### Frontend unit tests

```bash
npm run test:unit
```

```
 Test Files  18 passed (18)
      Tests  81 passed (81)
   Duration  1.21s
```

Includes `signInPanel.test.js`, `pdsSignup.test.js` (F-017).

### Frontend UI tests (production build)

```bash
npm run test:ui
```

```
vite v6.4.3 building for test...
✓ built in 411ms

 Test Files  10 passed (10)
      Tests  31 passed (31)
   Duration  1.51s
```

`signIn.ui.test.js` asserts `data-testid="pds-signup-link"` when `VITE_PDS_SIGNUP_URL` is set in `.env.test`.

### Backend (when venv present)

```bash
cd apps/backend && source .venv/bin/activate
ruff check . --fix && ruff format . && ./test
```

```
=================== 49 passed, 3 skipped, 1 warning in 5.91s ===================
```

(3 skipped: `test_happyview_provision.py` integration tests require live HappyView + `HAPPYVIEW_ADMIN_KEY`.)

Run on the host after `pip install -r requirements-dev.txt` per README Step 1b.

## Mocked environment variables

UI/unit test mode (`.env.test`):

| Variable | Value | Purpose |
|----------|-------|---------|
| `VITE_TEST_AUTH_STUB` | `true` | Skip live OAuth in vitest |
| `VITE_TEST_GALLERY_STUB` | `true` | Stub HappyView gallery XRPC |
| `VITE_TEST_C2PA_STUB` | `true` | Stub C2PA embed API |
| `VITE_PDS_SIGNUP_URL` | `https://pds.atpix.net/account` | F-017 signup link DOM assertion |

Replace stub env with real `hv_*` / `hvc_*` keys and live PDS handles for manual tests per [README What you can test right now](../../../../README.md#what-you-can-test-right-now).

## Manual smoke checklist

1. Set `VITE_PDS_SIGNUP_URL=https://pds.atpix.net/account` in root `.env`; restart `npm run dev`.
2. Sign-in panel shows signup link (Test 1 in README).
3. Complete OAuth with `*.pds.atpix.net` or Bluesky handle.
4. Run Tests 2–5 in README for upload, albums, permissioned space, and permissioned upload.