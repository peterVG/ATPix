# Task 3.2 / FE-3.2 Walkthrough — Photo Upload and My Gallery Grid

## Summary

Implemented Path A public upload and My Gallery grid (frontend-only; backend remains C2PA auxiliary):

- `galleryApi.js` — HappyView XRPC helpers: `uploadBlob`, `createPhoto`, `listPhotos`
- `happyViewFetch.js` — DPoP `fetchHandler` from OAuth session (test stub when `VITE_TEST_GALLERY_STUB=true`)
- `publishPreparedPhoto.js` — C2PA-signed blob → PDS → `net.atpix.gallery.photo` record
- `GalleryPanel.js` — UI-SCR-001: Personal archive header, vault search, 4-column grid, badges, empty state, cursor pagination
- `UploadPanel.js` — upload progress, publish after C2PA signing, gallery refresh on success
- Production-build UI tests with strict DOM assertions on `dist/` artifacts

## SRS traceability

| Requirement | Verification |
| ----------- | ------------ |
| SRS-F-002 photo upload (public path) | `publishPreparedPhoto.js`, `uploadGallery.ui.test.js` |
| SRS-F-002.2 50 MB limit | Existing FE-3.1 `uploadLimits.test.js` (unchanged) |
| SRS-F-003 personal gallery grid | `GalleryPanel.js`, `myGallery.ui.test.js` |
| SRS-F-003.2 empty state | `GalleryPanel.js`, `myGallery.ui.test.js` |
| SRS-NFR-005 RFC 3339 UTC | `formatCreatedAt.js`, `formatCreatedAt.test.js` |
| UI-SCR-001 My Gallery | `GalleryPanel.js`, `myGallery.ui.test.js` |
| UI-SCR-005 upload progress | `UploadPanel.js`, `uploadGallery.ui.test.js` |

## Test output (raw CLI)

### Lint

```
> atpix-frontend@0.1.0 lint
> eslint .
```

### Unit tests

```
 RUN  v2.1.9 /Users/petervangarderen/Dev/ATPix/apps/frontend

 ✓ tests/unit/router.test.js (4 tests) 1ms
 ✓ tests/unit/selectPhotoBadge.test.js (3 tests) 2ms
 ✓ tests/unit/happyview.test.js (3 tests) 1ms
 ✓ tests/unit/galleryApi.test.js (3 tests) 4ms
 ✓ tests/unit/backend.test.js (3 tests) 5ms
 ✓ tests/unit/colorScheme.test.js (6 tests) 7ms
 ✓ tests/unit/uploadLimits.test.js (3 tests) 2ms
 ✓ tests/unit/oauthClientMetadata.test.js (10 tests) 8ms
 ✓ tests/unit/app.test.js (2 tests) 23ms
 ✓ tests/unit/formatCreatedAt.test.js (3 tests) 1ms
 ✓ tests/unit/breakpoint.test.js (1 test) 1ms

 Test Files  11 passed (11)
      Tests  41 passed (41)
```

### UI tests (production build)

```
vite v6.4.3 building for test...
✓ built in 385ms

 RUN  v2.1.9 /Users/petervangarderen/Dev/ATPix/apps/frontend

 ✓ tests/ui/signIn.ui.test.js (1 test) 126ms
 ✓ tests/ui/uploadGallery.ui.test.js (1 test) 233ms
 ✓ tests/ui/responsiveLayout.ui.test.js (3 tests) 230ms
 ✓ tests/ui/myGallery.ui.test.js (2 tests) 184ms
 ✓ tests/ui/uploadFlow.ui.test.js (4 tests) 283ms
 ✓ tests/ui/themeToggle.ui.test.js (3 tests) 266ms
 ✓ tests/ui/appShell.ui.test.js (3 tests) 289ms

 Test Files  7 passed (7)
      Tests  17 passed (17)
```

## Mocked environment variables

UI test builds use repo-root `.env.test`:

| Variable | Purpose |
| -------- | ------- |
| `VITE_TEST_AUTH_STUB=true` | Stub OAuth session for signed-in shell |
| `VITE_TEST_C2PA_STUB=true` | Stub C2PA embed without live FastAPI |
| `VITE_TEST_GALLERY_STUB=true` | Stub HappyView `uploadBlob` / `createPhoto` / `listPhotos` XRPC |

Replace stub values with real HappyView OAuth session and live services for manual end-to-end verification (README Steps 7–8).