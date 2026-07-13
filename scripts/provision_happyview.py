#!/usr/bin/env python3
"""Provision HappyView with ATPix lexicons and feature flags (Task 1.2 / ADR-007).

Uploads ``net.atpix.gallery.*`` lexicons from ``docs/lexicon/`` per
``config/happyview/provision-manifest.json`` and enables ``feature.spaces_enabled``.

Environment:
    HAPPYVIEW_URL: Base URL (default ``http://127.0.0.1:3001``).
    HAPPYVIEW_ADMIN_KEY: Admin API key (``hv_*``). Required for upload unless ``--check-only``.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from dotenv import load_dotenv

REPO_ROOT = Path(__file__).resolve().parent.parent
MANIFEST_PATH = REPO_ROOT / "config" / "happyview" / "provision-manifest.json"
ENV_FILE = REPO_ROOT / ".env"
DEFAULT_URL = "http://127.0.0.1:3001"
SPACES_FLAG = "feature.spaces_enabled"
RECORD_TYPES = frozenset({"record"})
QUERY_PROCEDURE_TYPES = frozenset({"query", "procedure"})


def _load_dotenv() -> None:
    """Load root ``.env`` without overriding variables already set in the shell."""
    load_dotenv(ENV_FILE, override=False)


def _load_manifest() -> dict[str, Any]:
    """Load and return the provision manifest JSON."""
    with MANIFEST_PATH.open(encoding="utf-8") as handle:
        return json.load(handle)


def _lexicon_type(lexicon_json: dict[str, Any]) -> str | None:
    """Return the main lexicon def type (record, query, procedure, etc.)."""
    defs = lexicon_json.get("defs", {})
    main = defs.get("main")
    if isinstance(main, dict):
        return main.get("type")
    return None


def validate_manifest(manifest: dict[str, Any]) -> list[str]:
    """Validate manifest entries against on-disk lexicon files. Returns error messages."""
    errors: list[str] = []
    lexicon_dir = REPO_ROOT / manifest["lexicon_dir"]
    seen_ids: set[str] = set()

    for entry in manifest["upload_order"]:
        path = lexicon_dir / entry["file"]
        if not path.is_file():
            errors.append(f"missing lexicon file: {path}")
            continue

        with path.open(encoding="utf-8") as handle:
            lexicon_json = json.load(handle)

        nsid = lexicon_json.get("id")
        if not nsid:
            errors.append(f"{entry['file']}: missing id")
            continue
        if nsid in seen_ids:
            errors.append(f"duplicate NSID in manifest: {nsid}")
        seen_ids.add(nsid)

        if not nsid.startswith(manifest["namespace"]):
            errors.append(f"{nsid}: expected namespace {manifest['namespace']}")

        lex_type = _lexicon_type(lexicon_json)
        if lex_type in RECORD_TYPES and not entry.get("backfill", False):
            errors.append(f"{nsid}: record lexicon must set backfill true")
        if lex_type in QUERY_PROCEDURE_TYPES and not entry.get("target_collection"):
            errors.append(f"{nsid}: {lex_type} lexicon must set target_collection")

    return errors


def _http_json(
    method: str,
    url: str,
    token: str | None = None,
    body: dict[str, Any] | None = None,
) -> tuple[int, Any]:
    """Perform an HTTP request and parse JSON response."""
    headers = {"Accept": "application/json"}
    data = None
    if body is not None:
        headers["Content-Type"] = "application/json"
        data = json.dumps(body).encode("utf-8")
    if token:
        headers["Authorization"] = f"Bearer {token}"

    request = Request(url, data=data, headers=headers, method=method)
    try:
        with urlopen(request, timeout=30) as response:
            raw = response.read().decode("utf-8")
            payload = json.loads(raw) if raw else None
            return response.status, payload
    except HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"{method} {url} failed ({exc.code}): {detail}") from exc
    except URLError as exc:
        raise RuntimeError(f"{method} {url} unreachable: {exc.reason}") from exc


def check_health(base_url: str) -> bool:
    """Return True when HappyView health endpoint responds."""
    try:
        status, _ = _http_json("GET", f"{base_url.rstrip('/')}/health")
        return status == 200
    except RuntimeError:
        return False


def upload_lexicons(base_url: str, token: str, manifest: dict[str, Any]) -> int:
    """Upload all lexicons in manifest order. Returns count uploaded."""
    lexicon_dir = REPO_ROOT / manifest["lexicon_dir"]
    uploaded = 0

    for entry in manifest["upload_order"]:
        path = lexicon_dir / entry["file"]
        with path.open(encoding="utf-8") as handle:
            lexicon_json = json.load(handle)

        payload: dict[str, Any] = {"lexicon_json": lexicon_json}
        if "backfill" in entry:
            payload["backfill"] = entry["backfill"]
        if entry.get("target_collection"):
            payload["target_collection"] = entry["target_collection"]

        nsid = lexicon_json["id"]
        status, result = _http_json("POST", f"{base_url.rstrip('/')}/admin/lexicons", token, payload)
        if status not in (200, 201):
            raise RuntimeError(f"upload {nsid} unexpected status {status}")
        print(f"uploaded {nsid} (revision {result.get('revision', '?')})")
        uploaded += 1

    return uploaded


def enable_spaces_flag(base_url: str, token: str, enabled: bool) -> None:
    """Set feature.spaces_enabled via admin settings API."""
    key = SPACES_FLAG
    value = "true" if enabled else "false"
    status, _ = _http_json(
        "PUT",
        f"{base_url.rstrip('/')}/admin/settings/{key}",
        token,
        {"value": value},
    )
    if status not in (200, 201, 204):
        raise RuntimeError(f"set {key} unexpected status {status}")
    print(f"set {key}={value}")


def verify_provision(base_url: str, token: str, manifest: dict[str, Any]) -> list[str]:
    """Verify lexicons and spaces flag after provisioning. Returns error messages."""
    errors: list[str] = []
    expected_ids = set()

    for entry in manifest["upload_order"]:
        path = REPO_ROOT / manifest["lexicon_dir"] / entry["file"]
        with path.open(encoding="utf-8") as handle:
            expected_ids.add(json.load(handle)["id"])

    status, lexicons = _http_json("GET", f"{base_url.rstrip('/')}/admin/lexicons", token)
    if status != 200:
        errors.append(f"GET /admin/lexicons returned {status}")
        return errors

    uploaded_ids = {item["id"] for item in lexicons}
    missing = expected_ids - uploaded_ids
    if missing:
        errors.append(f"missing lexicons on HappyView: {sorted(missing)}")

    status, flags = _http_json("GET", f"{base_url.rstrip('/')}/admin/feature-flags", token)
    if status != 200:
        errors.append(f"GET /admin/feature-flags returned {status}")
        return errors

    spaces = next((f for f in flags if f.get("key") == SPACES_FLAG), None)
    if not spaces or not spaces.get("enabled"):
        errors.append(f"{SPACES_FLAG} is not enabled")

    return errors


def main() -> int:
    """CLI entry point."""
    parser = argparse.ArgumentParser(description="Provision HappyView for ATPix (ADR-007).")
    parser.add_argument(
        "--check-only",
        action="store_true",
        help="Validate manifest and lexicon files without calling HappyView.",
    )
    parser.add_argument(
        "--verify-only",
        action="store_true",
        help="Verify existing HappyView provisioning (requires admin key).",
    )
    args = parser.parse_args()
    _load_dotenv()

    manifest = _load_manifest()
    validation_errors = validate_manifest(manifest)
    if validation_errors:
        for message in validation_errors:
            print(f"ERROR: {message}", file=sys.stderr)
        return 1

    print(f"manifest OK ({len(manifest['upload_order'])} lexicons)")

    if args.check_only:
        return 0

    base_url = os.environ.get("HAPPYVIEW_URL", DEFAULT_URL)
    token = os.environ.get("HAPPYVIEW_ADMIN_KEY", "").strip()

    if not check_health(base_url):
        print(f"ERROR: HappyView not reachable at {base_url}/health", file=sys.stderr)
        print("Start with: docker compose -f docker-compose.happyview.yml up -d", file=sys.stderr)
        return 1

    print(f"happyview healthy at {base_url}")

    if not token:
        print("ERROR: HAPPYVIEW_ADMIN_KEY (hv_*) is required", file=sys.stderr)
        print("Create one at HappyView dashboard → Settings → API Keys", file=sys.stderr)
        return 1

    if args.verify_only:
        verify_errors = verify_provision(base_url, token, manifest)
        for message in verify_errors:
            print(f"ERROR: {message}", file=sys.stderr)
        return 1 if verify_errors else 0

    upload_lexicons(base_url, token, manifest)
    flag_enabled = manifest.get("feature_flags", {}).get(SPACES_FLAG, True)
    enable_spaces_flag(base_url, token, flag_enabled)

    verify_errors = verify_provision(base_url, token, manifest)
    for message in verify_errors:
        print(f"ERROR: {message}", file=sys.stderr)
    return 1 if verify_errors else 0


if __name__ == "__main__":
    sys.exit(main())