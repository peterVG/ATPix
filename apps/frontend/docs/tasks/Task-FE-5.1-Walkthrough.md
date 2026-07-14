# Task FE-5.1 Walkthrough — Permissioned Albums & Space Admin

**Global task:** [Task 5.1](../../../../docs/overview/005-plan.md)  
**SRS:** SRS-F-008, NFR-002 · **UI:** UI-SCR-006 · **ADR:** [010](../../../../docs/architecture/010-permissioned-spaces-storage.md)

## Summary

- Added `spaceApi.js` (members, invites, space records, handle resolve, `buildSpaceBlobUrl`).
- Added `buildSpaceConfig()` alongside `buildSpaceAppAccess()` in `oauthClientMetadata.js`.
- Implemented `SpaceAdminPanel.js` at `#/albums/:uri/space` (UI-SCR-006).
- Wired `AlbumDetailPanel` Invite Members → space admin; permissioned disclosure on album create.
- Enabled permissioned upload path via `publishPermissionedPhoto.js` + album picker in `UploadPanel`.
- Extended `testGalleryStub` and added `spaceAdmin.ui.test.js`; merged SRS-F-002 gallery upload assertion into `uploadFlow.ui.test.js`.

## Verification (raw CLI)

```bash
cd apps/frontend
npm run lint
```

```
> atpix-frontend@0.1.0 lint
> eslint .
```

```
(exit 0)
```

```bash
npm run test:unit
```

```
 Test Files  15 passed (15)
      Tests  71 passed (71)
```

```bash
npm run test:ui
```

```
 Test Files  10 passed (10)
      Tests  28 passed (28)
```

Production build UI tests run against `dist/` per ADR-001.

## Mocked environment variables

UI tests use `VITE_TEST_AUTH_STUB`, `VITE_TEST_GALLERY_STUB`, and `VITE_TEST_C2PA_STUB` in test mode — no live HappyView or OAuth tokens required for vitest.