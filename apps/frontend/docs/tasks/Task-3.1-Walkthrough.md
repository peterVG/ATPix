# Task 3.1 / FE-3.1 Walkthrough — C2PA Pre-Upload Client Integration

## Summary

Implemented frontend C2PA pre-upload integration per UI-SCR-005:

- `embedManifestBeforeUpload()` calls `POST /c2pa/manifest/embed` on the FastAPI auxiliary API
- Upload workspace route (`#/upload`) with drop zone, provenance sidebar, privacy toggles, and destination picker
- 50 MB client-side rejection before C2PA signing
- C2PA step indicator and queue badge after signing
- Production-build UI tests with `VITE_TEST_C2PA_STUB=true` in repo-root `.env.test`

## SRS traceability

| Requirement | Verification |
| ----------- | ------------ |
| SRS-F-012 pre-upload embed | `api/c2pa.js`, `upload/prepareUploadFile.js` |
| SRS-F-002.1 50 MB limit | `upload/constants.js`, `uploadLimits.test.js` |
| UI-SCR-005 upload workspace | `UploadPanel.js`, `uploadFlow.ui.test.js` |

## Test output (raw CLI)

### Unit tests

```
 Test Files  8 passed (8)
      Tests  30 passed (30)
```

Includes `uploadLimits.test.js` (3) and `backend.test.js` (1).

### UI tests (production build)

```
 Test Files  5 passed (5)
      Tests  13 passed (13)
```

Includes `uploadFlow.ui.test.js` (4) with strict DOM assertions on `dist/` artifacts.

## Mocked environment

UI test builds set `VITE_TEST_C2PA_STUB=true` so C2PA signing is stubbed without a live backend during `npm run test:ui`. Manual verification requires the FastAPI server on port 8000 (README Step 8).