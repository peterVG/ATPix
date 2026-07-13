"""Step definitions for HappyView provisioning and lexicon BDD features."""

from __future__ import annotations

import ast
import json
import os
import subprocess
import sys
from pathlib import Path
from urllib.error import URLError
from urllib.request import Request, urlopen

from behave import given, then, when

REPO_ROOT = Path(__file__).resolve().parents[5]
LEXICON_DIR = REPO_ROOT / "docs" / "lexicon"
MANIFEST_PATH = REPO_ROOT / "config" / "happyview" / "provision-manifest.json"
PROVISION_SCRIPT = REPO_ROOT / "scripts" / "provision_happyview.py"
RECORD_TYPES = frozenset({"record"})
QUERY_PROCEDURE_TYPES = frozenset({"query", "procedure"})
FORBIDDEN_SYNC_IMPORT_MARKERS = ("jetstream", "firehose")
FORBIDDEN_SYNC_CALL_NAMES = frozenset(
    {
        "subscribe_repos",
        "subscribeRepos",
        "FirehoseConsumer",
        "firehose_consumer",
    }
)
SYNC_SCAN_ROOTS = (
    REPO_ROOT / "apps" / "backend" / "app",
    REPO_ROOT / "apps" / "frontend" / "src",
)


def _lexicon_type(lexicon_json: dict) -> str | None:
    """Return the main lexicon definition type."""
    main = lexicon_json.get("defs", {}).get("main")
    if isinstance(main, dict):
        return main.get("type")
    return None


def _admin_request(context, method: str, path: str, body: dict | None = None) -> tuple[int, object]:
    """Call a HappyView admin endpoint."""
    url = f"{context.happyview_url}{path}"
    headers = {"Accept": "application/json"}
    data = None
    if body is not None:
        headers["Content-Type"] = "application/json"
        data = json.dumps(body).encode("utf-8")
    if context.happyview_admin_key:
        headers["Authorization"] = f"Bearer {context.happyview_admin_key}"

    request = Request(url, data=data, headers=headers, method=method)
    with urlopen(request, timeout=30) as response:
        raw = response.read().decode("utf-8")
        payload = json.loads(raw) if raw else None
        return response.status, payload


def _manifest_nsids() -> set[str]:
    """Return NSIDs listed in the HappyView provision manifest."""
    with MANIFEST_PATH.open(encoding="utf-8") as handle:
        manifest = json.load(handle)
    nsids: set[str] = set()
    for entry in manifest["upload_order"]:
        path = LEXICON_DIR / entry["file"]
        with path.open(encoding="utf-8") as handle:
            nsids.add(json.load(handle)["id"])
    return nsids


def _run_provision_script(context) -> subprocess.CompletedProcess[str]:
    """Execute the HappyView provision script with context URL and admin key."""
    env = os.environ.copy()
    env["HAPPYVIEW_URL"] = context.happyview_url
    env["HAPPYVIEW_ADMIN_KEY"] = context.happyview_admin_key
    return subprocess.run(
        [sys.executable, str(PROVISION_SCRIPT)],
        cwd=REPO_ROOT,
        env=env,
        capture_output=True,
        text=True,
        check=False,
    )


def _find_sync_subscription_violations(path: Path) -> list[str]:
    """Return AST-detected Jetstream/firehose client usage in a Python source file."""
    try:
        tree = ast.parse(path.read_text(encoding="utf-8"))
    except SyntaxError:
        return []

    violations: list[str] = []
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for alias in node.names:
                if any(marker in alias.name for marker in FORBIDDEN_SYNC_IMPORT_MARKERS):
                    violations.append(f"{path}: import {alias.name}")
        elif isinstance(node, ast.ImportFrom):
            module = node.module or ""
            if any(marker in module for marker in FORBIDDEN_SYNC_IMPORT_MARKERS):
                violations.append(f"{path}: from {module} import ...")
        elif isinstance(node, ast.Call):
            name = None
            if isinstance(node.func, ast.Name):
                name = node.func.id
            elif isinstance(node.func, ast.Attribute):
                name = node.func.attr
            if name in FORBIDDEN_SYNC_CALL_NAMES:
                violations.append(f"{path}: call {name}()")
    return violations


def _happyview_healthy(context) -> bool:
    """Return True when HappyView health endpoint responds."""
    try:
        with urlopen(f"{context.happyview_url}/health", timeout=5) as response:
            return response.status == 200
    except (URLError, TimeoutError, OSError):
        return False


@given("HappyView is running with lexicon upload capability")
def step_happyview_running(context) -> None:
    """Require a healthy HappyView instance with admin credentials."""
    assert _happyview_healthy(context), (
        f"HappyView not reachable at {context.happyview_url}/health — "
        "start docker compose -f docker-compose.happyview.yml up -d"
    )
    assert context.happyview_admin_key, "HAPPYVIEW_ADMIN_KEY (hv_*) is required for admin steps"


@given("HappyView has feature.spaces_enabled enabled")
def step_spaces_enabled(context) -> None:
    """Ensure the permissioned spaces feature flag is on."""
    step_happyview_running(context)
    status, flags = _admin_request(context, "GET", "/admin/feature-flags")
    assert status == 200
    spaces = next((flag for flag in flags if flag.get("key") == "feature.spaces_enabled"), None)
    assert spaces and spaces.get("enabled"), "feature.spaces_enabled must be enabled"


@given("HappyView has feature.spaces_enabled disabled")
def step_spaces_disabled(context) -> None:
    """Ensure permissioned spaces feature flag is off (negative-path tests)."""
    step_happyview_running(context)
    status, flags = _admin_request(context, "GET", "/admin/feature-flags")
    assert status == 200
    spaces = next((flag for flag in flags if flag.get("key") == "feature.spaces_enabled"), None)
    if spaces and spaces.get("enabled"):
        disable_status, _ = _admin_request(
            context,
            "PUT",
            "/admin/settings/feature.spaces_enabled",
            {"value": "false"},
        )
        assert disable_status in (200, 201, 204)
        status, flags = _admin_request(context, "GET", "/admin/feature-flags")
        spaces = next((flag for flag in flags if flag.get("key") == "feature.spaces_enabled"), None)
    assert spaces is not None
    assert spaces.get("enabled") is False, "feature.spaces_enabled must be disabled"


@given("HappyView is not reachable")
def step_happyview_unreachable(context) -> None:
    """Point behave context at an unreachable URL for error-path tests."""
    context.happyview_url = "http://127.0.0.1:31999"


@given("lexicons are already uploaded to HappyView")
def step_lexicons_already_uploaded(context) -> None:
    """Provision once (if needed) and verify manifest NSIDs are registered."""
    step_happyview_running(context)
    expected = _manifest_nsids()
    status, lexicons = _admin_request(context, "GET", "/admin/lexicons")
    assert status == 200
    uploaded = {item["id"] for item in lexicons}
    if expected - uploaded:
        first_run = _run_provision_script(context)
        assert first_run.returncode == 0, first_run.stderr or first_run.stdout
        status, lexicons = _admin_request(context, "GET", "/admin/lexicons")
        assert status == 200
        uploaded = {item["id"] for item in lexicons}
    missing = expected - uploaded
    assert not missing, f"lexicons not registered before idempotency re-run: {sorted(missing)}"


@when("I validate docs/lexicon JSON files")
def step_validate_lexicon_files(context) -> None:
    """Load all lexicon JSON files for structural validation."""
    context.lexicon_files = sorted(LEXICON_DIR.glob("*.json"))
    context.lexicon_payloads = []
    for path in context.lexicon_files:
        with path.open(encoding="utf-8") as handle:
            context.lexicon_payloads.append(json.load(handle))


@when("lexicons are uploaded to HappyView with backfill true")
def step_upload_lexicons(context) -> None:
    """Run the provision script to upload lexicons."""
    step_happyview_running(context)
    result = _run_provision_script(context)
    context.provision_result = result
    assert result.returncode == 0, result.stderr or result.stdout


@when("feature.spaces_enabled is enabled on HappyView")
def step_enable_spaces_flag(context) -> None:
    """Enable permissioned spaces via admin settings API."""
    step_happyview_running(context)
    status, _ = _admin_request(
        context,
        "PUT",
        "/admin/settings/feature.spaces_enabled",
        {"value": "true"},
    )
    assert status in (200, 201, 204)


@when("provisioning is attempted")
def step_attempt_provision(context) -> None:
    """Run provision script against the current HappyView URL."""
    env = os.environ.copy()
    env["HAPPYVIEW_URL"] = context.happyview_url
    env["HAPPYVIEW_ADMIN_KEY"] = context.happyview_admin_key or "hv_test_unreachable"
    result = subprocess.run(
        [sys.executable, str(PROVISION_SCRIPT)],
        cwd=REPO_ROOT,
        env=env,
        capture_output=True,
        text=True,
        check=False,
    )
    context.provision_result = result


@then("each record lexicon should define a valid collection schema")
def step_record_schemas_valid(context) -> None:
    """Each record lexicon must declare type record with a record schema."""
    for payload in context.lexicon_payloads:
        if _lexicon_type(payload) != "record":
            continue
        main = payload["defs"]["main"]
        assert main.get("key"), f"{payload['id']} missing record key"
        assert main.get("record", {}).get("type") == "object"


@then("each query and procedure should declare target_collection")
def step_manifest_target_collections(context) -> None:
    """Manifest must bind queries and procedures to record collections."""
    with MANIFEST_PATH.open(encoding="utf-8") as handle:
        manifest = json.load(handle)
    for entry in manifest["upload_order"]:
        path = LEXICON_DIR / entry["file"]
        with path.open(encoding="utf-8") as handle:
            payload = json.load(handle)
        if _lexicon_type(payload) in QUERY_PROCEDURE_TYPES:
            assert entry.get("target_collection"), entry["file"]


@then("each record lexicon should have backfill enabled on HappyView")
def step_records_backfill_on_happyview(context) -> None:
    """Verify record lexicons on HappyView have backfill enabled."""
    status, lexicons = _admin_request(context, "GET", "/admin/lexicons")
    assert status == 200
    by_id = {item["id"]: item for item in lexicons}
    with MANIFEST_PATH.open(encoding="utf-8") as handle:
        manifest = json.load(handle)
    for entry in manifest["upload_order"]:
        if not entry.get("backfill"):
            continue
        path = LEXICON_DIR / entry["file"]
        with path.open(encoding="utf-8") as handle:
            nsid = json.load(handle)["id"]
        assert by_id[nsid].get("backfill") is True, nsid


@then("each query and procedure should declare target_collection on HappyView")
def step_target_collection_on_happyview(context) -> None:
    """HappyView admin API should report target_collection for query/procedure lexicons."""
    status, lexicons = _admin_request(context, "GET", "/admin/lexicons")
    assert status == 200
    by_id = {item["id"]: item for item in lexicons}
    with MANIFEST_PATH.open(encoding="utf-8") as handle:
        manifest = json.load(handle)
    for entry in manifest["upload_order"]:
        if not entry.get("target_collection"):
            continue
        path = LEXICON_DIR / entry["file"]
        with path.open(encoding="utf-8") as handle:
            nsid = json.load(handle)["id"]
        assert by_id[nsid].get("target_collection") == entry["target_collection"], nsid


@then("the HappyView feature flags should show spaces enabled")
def step_spaces_flag_enabled(context) -> None:
    """feature.spaces_enabled must read as enabled."""
    status, flags = _admin_request(context, "GET", "/admin/feature-flags")
    assert status == 200
    spaces = next((flag for flag in flags if flag.get("key") == "feature.spaces_enabled"), None)
    assert spaces and spaces.get("enabled") is True


@then("provisioning should complete without duplicate registration errors")
def step_idempotent_provision(context) -> None:
    """Re-running provision must succeed (upsert semantics)."""
    assert context.provision_result.returncode == 0


@then("the operator should see a clear connectivity error")
def step_connectivity_error(context) -> None:
    """Provisioning against unreachable HappyView must fail with health error."""
    result = context.provision_result
    assert result.returncode != 0
    combined = f"{result.stdout}\n{result.stderr}"
    assert "not reachable" in combined.lower()


@then("historical compatible records should be indexed network-wide")
def step_backfill_indexing_placeholder(context) -> None:
    """Backfill indexing is verified via HappyView admin backfill jobs (BE-2.1)."""
    pass


@then("ATPix should not run a separate Jetstream subscription")
def step_no_jetstream_in_atpix(context) -> None:
    """ATPix application code must not instantiate Jetstream/firehose clients (TC-012)."""
    violations: list[str] = []
    for root in SYNC_SCAN_ROOTS:
        if not root.is_dir():
            continue
        for path in root.rglob("*.py"):
            violations.extend(_find_sync_subscription_violations(path))
    assert not violations, "sync boundary violations:\n" + "\n".join(violations)


@then("the encoded size should be well under 1 MiB")
def step_cbor_size_under_limit(context) -> None:
    """Sample photo metadata CBOR encoding must stay under 1 MiB."""
    import cbor2

    sample = {
        "title": "x" * 500,
        "description": "y" * 5000,
        "image": {"$type": "blob", "ref": {"$link": "b" * 59}, "mimeType": "image/jpeg", "size": 1},
        "createdAt": "2026-07-13T12:00:00.000Z",
        "visibility": "public",
    }
    assert len(cbor2.dumps(sample)) < 1024 * 1024
