# Task 3.1 / BE-3.1 Walkthrough — C2PA Manifest Generation on Upload

## Summary

Implemented backend C2PA 2.2 claim generation per [ADR-008](../../../../docs/architecture/008-c2pa-sdk-and-signing.md):

- `c2pa-python` SDK wired in `app/modules/c2pa/`
- `POST /c2pa/manifest/embed` embeds signed manifests in JPEG/PNG before `uploadBlob`
- `c2pa.created` for new captures; `c2pa.opened` + ingredient for imports (EDIT intent)
- Custom assertion `net.atpix.gallery.creatorDid`
- Privacy opt-out omits optional GPS/device metadata assertions
- Development signing via CAI test fixtures in `tests/fixtures/c2pa/`

## SRS traceability

| Requirement | Verification |
| ----------- | ------------ |
| SRS-F-012.1 Claim generator | `service.py`, `routers.py`, behave feature |
| SRS-F-012.2 Privacy opt-out | `include_gps` / `include_device` form fields |
| TC-009 Embedded manifest | `test_embed_manifest_*`, behave PNG scenario |
| TC-010 Actions integrity | `c2pa.created` / `c2pa.opened` assertions |

## Test output (raw CLI)

### Ruff

```
All checks passed!
```

### Unit + integration (C2PA)

```
tests/unit/test_c2pa_service.py::test_embed_manifest_adds_created_action_for_jpeg PASSED
tests/unit/test_c2pa_service.py::test_embed_manifest_adds_opened_action_for_import PASSED
tests/unit/test_c2pa_service.py::test_embed_manifest_supports_png PASSED
tests/unit/test_c2pa_service.py::test_privacy_opt_out_omits_optional_metadata PASSED
tests/unit/test_c2pa_service.py::test_rejects_unsupported_mime_type PASSED
tests/integration/test_c2pa_api.py::test_c2pa_status_reports_ready_generator PASSED
tests/integration/test_c2pa_api.py::test_manifest_embed_returns_signed_jpeg_bytes PASSED
tests/integration/test_c2pa_api.py::test_manifest_embed_rejects_unsupported_mime_type PASSED

8 passed
```

### Behave (SRS-F-012)

```
Feature: C2PA Manifest Generation on Upload
6 scenarios passed, 0 failed, 0 skipped
33 steps passed, 0 failed, 0 skipped
```

### Full backend pytest

```
39 passed, 3 skipped
```

## Mocked environment

Automated tests use CAI **test signing certificates** from `tests/fixtures/c2pa/` (not production org-issued credentials).