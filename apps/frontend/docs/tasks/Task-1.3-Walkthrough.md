# Task 1.3 — OAuth client metadata serving

**Branch:** `task/1.3-oauth-client-metadata`  
**Date:** 2026-07-13  
**Related requirements:** [F-001](../../../../docs/prd.md#f-001-atproto-oauth-sign-in), [F-008](../../../../docs/prd.md#f-008-permissioned-gallery--album-access-happyview-permissioned-spaces-validation), [TC-006](../../../../docs/prd.md#tc-006-api-client-identification), [SRS-F-001](../../../../docs/srs.md#srs-f-001-atproto-oauth-sign-in), [SRS-F-008.1](../../../../docs/srs.md#srs-f-008-permissioned-album-access-happyview-spaces)  
**ADRs:** [006-oauth-dpop-authentication.md](../../../../docs/architecture/006-oauth-dpop-authentication.md), [010-permissioned-spaces-storage.md](../../../../docs/architecture/010-permissioned-spaces-storage.md)

## Summary

Implemented atproto OAuth client metadata for ATPix per ADR-006:

- `src/config/oauthClientMetadata.js` — builders for metadata document, `client_id`, redirect URI, and space `appAccess` allowList (ADR-010)
- `plugins/oauthClientMetadataPlugin.js` — serves `/oauth-client-metadata.json` in Vite dev/preview; emits static JSON at build time from `VITE_DEPLOYMENT_ORIGIN`
- Unit tests in `tests/unit/oauthClientMetadata.test.js`
- `.env.example` and README updated with deployment origin and HappyView API client registration steps
- Checked off Task 1.3 in `docs/plan.md` and FE-1.3 in `apps/frontend/docs/plan.md`

## Lint

```text
$ cd apps/frontend && npm run lint
> atpix-frontend@0.1.0 lint
> eslint .
```

## Unit tests

```text
$ cd apps/frontend && npm run test:unit
> atpix-frontend@0.1.0 test:unit
> vitest run

 RUN  v2.1.9 /Users/petervangarderen/Dev/ATPix/apps/frontend

 ✓ tests/unit/happyview.test.js (1 test) 1ms
 ✓ tests/unit/oauthClientMetadata.test.js (6 tests) 2ms
 ✓ tests/unit/app.test.js (1 test) 14ms

 Test Files  3 passed (3)
      Tests  8 passed (8)
   Duration  433ms (transform 50ms, setup 0ms, collect 61ms, tests 17ms, environment 749ms, prepare 124ms)
```

## Production build + metadata artifact

```text
$ cd apps/frontend && VITE_DEPLOYMENT_ORIGIN=http://127.0.0.1:5173 npm run build
> atpix-frontend@0.1.0 build
> vite build

vite v6.4.3 building for production...
✓ built in 40ms

$ cat dist/oauth-client-metadata.json
{
  "client_id": "http://127.0.0.1:5173/oauth-client-metadata.json",
  "client_name": "ATPix",
  "client_uri": "http://127.0.0.1:5173",
  "redirect_uris": [
    "http://127.0.0.1:5173/oauth/callback"
  ],
  "grant_types": [
    "authorization_code",
    "refresh_token"
  ],
  "response_types": [
    "code"
  ],
  "scope": "atproto blob:*/* repo:net.atpix.gallery.photo repo:net.atpix.gallery.album repo:net.atpix.gallery.albumItem repo:net.atpix.gallery.collectionRule",
  "token_endpoint_auth_method": "none",
  "application_type": "web",
  "dpop_bound_access_tokens": true
}
```

## Cubic review fixes (PR #8)

- Loopback `client_id` for `127.0.0.1` / `localhost` via `buildLoopbackClientId` (P1)
- Vite `loadEnv` + `configResolved` for build origin and `outDir` (P1/P3)
- Reuse `OAUTH_CLIENT_METADATA_PATH` in plugin (P3)
- Exact scope token matching via `OAUTH_CLIENT_SCOPE_LIST` (P2)

## Operator next steps

1. Start frontend (`npm run dev`) and verify `curl http://127.0.0.1:5173/oauth-client-metadata.json`.
2. Register a public API client in HappyView admin with Client ID matching the `client_id` above.
3. Copy `hvc_*` key to `VITE_HAPPYVIEW_CLIENT_KEY` in `.env`.
4. Task 2.1 will wire `@happyview/oauth-client-browser` sign-in using this metadata URL.
