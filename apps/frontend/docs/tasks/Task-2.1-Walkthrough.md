# Task 2.1 / FE-2.1 Walkthrough — OAuth Sign-In, Shell, Theme

## Summary

Implemented holistic Task FE-2.1:

- OAuth sign-in via `@happyview/oauth-client-browser` with loopback/production `client_id` from `oauthClientMetadata.js`
- Application shell (UI-SHELL-001): header nav, sidebar identity, sign-out, upload actions
- Dark/light/system theme toggle (UI-SHELL-003) with `localStorage` key `atpix-color-scheme`
- Responsive layout hooks (UI-SHELL-002) via `data-breakpoint` and gallery `data-columns`
- Production-build UI tests (`npm run test:ui`) loading `dist/` artifacts per ADR-001

## Security verification (SRS-NFR-003 / RC-004)

| Check                                                        | Evidence                                                                                                                     |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| No app passwords or plaintext PDS credentials in client code | OAuth-only flow via `@happyview/oauth-client-browser`; no password fields or `localStorage` password keys                    |
| DPoP-bound sessions                                          | HappyView browser client provisions DPoP per [ADR-006](../../../../docs/architecture/006-oauth-dpop-authentication.md)       |
| `X-Client-Key` on XRPC                                       | `buildXrpcHeaders()` + browser client `clientKey` option                                                                     |
| Production `TOKEN_ENCRYPTION_KEY`                            | [ADR-006](../../../../docs/architecture/006-oauth-dpop-authentication.md) recommends production HappyView SHOULD set it      |
| Live OAuth sign-in                                           | Manual verification per README Step 7                                                                                        |
| Backend BDD `authentication_security_SRS-NFR-003.feature`    | Scaffold present; step definitions require live HappyView for full behave execution (coordinate in Task 7.1 RC verification) |

## SRS traceability

| Requirement                  | Verification                                                      |
| ---------------------------- | ----------------------------------------------------------------- |
| SRS-F-001.1 OAuth flow       | `createOAuthClient.js`, sign-in panel, `/oauth/callback` handling |
| SRS-F-001.2 X-Client-Key     | `buildXrpcHeaders()` + HappyView browser client `clientKey`       |
| SRS-F-001.3 Identity display | Shell identity card + sign-in gating                              |
| UI-SHELL-001                 | `tests/ui/appShell.ui.test.js`                                    |
| UI-SHELL-002                 | `tests/ui/responsiveLayout.ui.test.js`                            |
| UI-SHELL-003                 | `tests/ui/themeToggle.ui.test.js`                                 |

## Test output (raw CLI)

### Lint

```
> atpix-frontend@0.1.0 lint
> eslint .
```

Exit code: 0

### Unit tests

```
> atpix-frontend@0.1.0 test:unit
> vitest run

 RUN  v2.1.9 (repo root)/apps/frontend

 ✓ tests/unit/breakpoint.test.js (1 test) 2ms
 ✓ tests/unit/happyview.test.js (3 tests) 1ms
 ✓ tests/unit/router.test.js (4 tests) 1ms
 ✓ tests/unit/colorScheme.test.js (6 tests) 4ms
 ✓ tests/unit/oauthClientMetadata.test.js (10 tests) 5ms
 ✓ tests/unit/app.test.js (2 tests) 19ms

 Test Files  6 passed (6)
      Tests  26 passed (26)
   Duration  576ms (transform 107ms, setup 0ms, collect 302ms, tests 33ms, environment 1.79s, prepare 275ms)
```

### UI tests (production build)

```
> atpix-frontend@0.1.0 test:ui
> vite build --mode test && vitest run --config vitest.ui.config.js

vite v6.4.3 building for test...
✓ 291 modules transformed.
✓ built in 387ms

 RUN  v2.1.9 (repo root)/apps/frontend

 ✓ tests/ui/signIn.ui.test.js (1 test) 84ms
 ✓ tests/ui/appShell.ui.test.js (2 tests) 105ms
 ✓ tests/ui/responsiveLayout.ui.test.js (3 tests) 131ms
 ✓ tests/ui/themeToggle.ui.test.js (3 tests) 134ms

 Test Files  4 passed (4)
      Tests  9 passed (9)
   Duration  439ms (transform 76ms, setup 37ms, collect 32ms, tests 454ms, environment 614ms, prepare 118ms)
```

## Manual verification

1. Complete README Steps 1–6 (`hvc_*` client key registered).
2. `cd apps/frontend && npm run dev`
3. Sign in at http://127.0.0.1:5173/ with an atproto handle.
4. Confirm shell chrome, route tabs, theme toggle, and sign-out.
