# Task 2.1 / FE-2.1 Plan — OAuth Sign-In, Shell Chrome, Theme Toggle

## Traceability

- **PRD:** F-001 (atproto OAuth Sign-In)
- **SRS:** SRS-F-001.1–001.3, SRS-NFR-003, SRS-NFR-008
- **UI:** UI-SHELL-001, UI-SHELL-002, UI-SHELL-003
- **ADR:** [006-oauth-dpop-authentication.md](../../../../docs/architecture/006-oauth-dpop-authentication.md), [001-test-runners-and-reporting.md](../../../../docs/architecture/001-test-runners-and-reporting.md)

## Constraints (from SRS / UI requirements)

| Constraint          | Value / rule                                                                                                                                               |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OAuth library       | `@happyview/oauth-client-browser` v1.4.x only; no app passwords                                                                                            |
| Client key header   | `X-Client-Key` from `VITE_HAPPYVIEW_CLIENT_KEY`; never `hv_*` on XRPC                                                                                      |
| Theme storage key   | `localStorage` key `atpix-color-scheme` — values `dark` \| `light` \| `system`                                                                             |
| Default theme       | Dark when unset; `data-theme="dark"` \| `data-theme="light"` on `<html>`                                                                                   |
| Semantic colors     | `status-public`, `status-unlisted`, `status-permissioned`, `c2pa-trusted`, `c2pa-invalid`, `c2pa-wellformed`, `atproto-blue` — hue unchanged across themes |
| Light surfaces      | `background` #f8f9fc; dark `background` #10131b                                                                                                            |
| Breakpoints         | Mobile &lt;768px (2-col grid, collapsed sidebar); tablet 768–1024px (3-col); desktop &gt;1024px (4-col)                                                    |
| OAuth callback path | `/oauth/callback` per `OAUTH_CALLBACK_PATH`                                                                                                                |
| UI tests            | MUST run against `vite build` production artifacts (ADR-001)                                                                                               |

## Technical approach

1. **`src/auth/`** — OAuth client factory, test stub for `--mode test` builds, session helpers.
2. **`src/theme/colorScheme.js`** — preference read/write, `data-theme` application, `prefers-color-scheme` listener for `system`.
3. **`src/router/router.js`** — hash routes: `#/gallery`, `#/discovery`, `#/albums`, `#/settings`.
4. **`src/components/`** — `AppShell.js`, `SignInPanel.js`, `GalleryPlaceholder.js`; `App.js` orchestrates bootstrap.
5. **`src/styles.css`** — shell layout, responsive grid placeholder, light theme tokens.
6. **`tests/ui/`** — vitest + jsdom loading `dist/` bundle after `vite build --mode test`.
7. **README** — extend "Test current functionality" for Task 2.1 sign-in and theme verification.

## Files to create / modify

- Create: `src/auth/createOAuthClient.js`, `src/auth/testAuthStub.js`, `src/theme/colorScheme.js`, `src/router/router.js`, `src/components/AppShell.js`, `src/components/SignInPanel.js`, `src/components/GalleryPlaceholder.js`
- Modify: `src/components/App.js`, `src/main.js`, `src/styles.css`, `src/api/happyview.js`, `vite.config.js`, `package.json`, `vitest.ui.config.js`, `eslint.config.js`
- Tests: `tests/unit/colorScheme.test.js`, `tests/unit/router.test.js`, `tests/ui/*.ui.test.js`, update `tests/unit/app.test.js`
- Docs: `docs/plan.md`, `apps/frontend/docs/plan.md`, `README.md`, walkthrough

## Verification plan

```bash
cd apps/frontend
npx prettier --write .
npx eslint . --fix
npm run test:unit
VITE_DEPLOYMENT_ORIGIN=http://127.0.0.1:5173 npm run test:ui
```
