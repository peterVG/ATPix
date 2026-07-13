"""Integration checks against a live HappyView instance (Task 1.2 / ADR-007)."""

from __future__ import annotations

import json
import os
import subprocess
import sys
from pathlib import Path
from urllib.error import URLError
from urllib.request import urlopen

import pytest

REPO_ROOT = Path(__file__).resolve().parents[4]
MANIFEST_PATH = REPO_ROOT / "config" / "happyview" / "provision-manifest.json"
PROVISION_SCRIPT = REPO_ROOT / "scripts" / "provision_happyview.py"
DEFAULT_URL = "http://127.0.0.1:3001"
SPACES_FLAG = "feature.spaces_enabled"


def _happyview_reachable() -> bool:
    """Return True when HappyView health endpoint responds."""
    base_url = os.environ.get("HAPPYVIEW_URL", DEFAULT_URL).rstrip("/")
    try:
        with urlopen(f"{base_url}/health", timeout=5) as response:
            return response.status == 200
    except (URLError, TimeoutError, OSError):
        return False


requires_happyview = pytest.mark.skipif(
    not _happyview_reachable(),
    reason="HappyView not reachable — start docker-compose.happyview.yml first",
)


def _admin_get(path: str) -> tuple[int, object]:
    """GET an admin endpoint with bearer token."""
    import urllib.request

    base_url = os.environ.get("HAPPYVIEW_URL", DEFAULT_URL).rstrip("/")
    token = os.environ.get("HAPPYVIEW_ADMIN_KEY", "").strip()
    if not token:
        pytest.skip("HAPPYVIEW_ADMIN_KEY not set")

    request = urllib.request.Request(
        f"{base_url}{path}",
        headers={"Authorization": f"Bearer {token}", "Accept": "application/json"},
        method="GET",
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        body = response.read().decode("utf-8")
        return response.status, json.loads(body) if body else None


@requires_happyview
def test_happyview_health() -> None:
    """HappyView /health returns 200 on configured port."""
    base_url = os.environ.get("HAPPYVIEW_URL", DEFAULT_URL).rstrip("/")
    with urlopen(f"{base_url}/health", timeout=5) as response:
        assert response.status == 200


@requires_happyview
def test_gallery_lexicons_uploaded() -> None:
    """All com.atpix.gallery lexicons from manifest are registered on HappyView."""
    with MANIFEST_PATH.open(encoding="utf-8") as handle:
        manifest = json.load(handle)

    expected_ids = set()
    for entry in manifest["upload_order"]:
        lexicon_path = REPO_ROOT / manifest["lexicon_dir"] / entry["file"]
        with lexicon_path.open(encoding="utf-8") as handle:
            expected_ids.add(json.load(handle)["id"])

    status, lexicons = _admin_get("/admin/lexicons")
    assert status == 200
    uploaded_ids = {item["id"] for item in lexicons}
    missing = expected_ids - uploaded_ids
    assert not missing, f"missing lexicons: {sorted(missing)}"


@requires_happyview
def test_spaces_feature_flag_enabled() -> None:
    """feature.spaces_enabled must be true for permissioned album work (TC-008)."""
    status, flags = _admin_get("/admin/feature-flags")
    assert status == 200
    spaces = next((flag for flag in flags if flag.get("key") == SPACES_FLAG), None)
    assert spaces is not None
    assert spaces.get("enabled") is True


def test_provision_script_check_only() -> None:
    """Manifest validation runs offline without HappyView."""
    result = subprocess.run(
        [sys.executable, str(PROVISION_SCRIPT), "--check-only"],
        cwd=REPO_ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    assert result.returncode == 0, result.stderr
    assert "manifest OK" in result.stdout
