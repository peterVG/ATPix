# Task 3.1 / FE-3.1 Walkthrough — C2PA Pre-Upload Client Integration

## Summary

Implemented frontend C2PA pre-upload integration per UI-SCR-005:

- `embedManifestBeforeUpload()` calls `POST /c2pa/manifest/embed` on the FastAPI auxiliary API
- Upload workspace route (`#/upload`) with drop zone, provenance sidebar, privacy toggles, and destination picker
- Manifest headroom reserved before signing; signed blob size validated after embed
- C2PA step indicator and queue badge after signing
- Production-build UI tests with `VITE_TEST_C2PA_STUB=true` in repo-root `.env.test`

## SRS traceability

| Requirement | Verification |
| ----------- | ------------ |
| SRS-F-012 pre-upload embed | `src/api/c2pa.js`, `src/upload/prepareUploadFile.js` |
| SRS-F-002.2 50 MB limit | `src/upload/constants.js`, `tests/unit/uploadLimits.test.js` |
| UI-SCR-005 upload workspace | `src/components/UploadPanel.js`, `tests/ui/uploadFlow.ui.test.js` |

## Test output (raw CLI)

### Unit tests

```
 Test Files  8 passed (8)
      Tests  32 passed (32)
```

Includes `tests/unit/uploadLimits.test.js` (3) and `tests/unit/backend.test.js` (3).

### UI tests (production build)

```
 Test Files  5 passed (5)
      Tests  14 passed (14)
```

Includes `tests/ui/uploadFlow.ui.test.js` (4) and `tests/ui/appShell.ui.test.js` (3) with strict DOM assertions on `dist/` artifacts.

## Mocked environment

UI test builds set `VITE_TEST_C2PA_STUB=true` with `MODE=test` so C2PA signing is stubbed without a live backend during `npm run test:ui`. Manual verification requires the FastAPI server on port 8000 (README Step 8).