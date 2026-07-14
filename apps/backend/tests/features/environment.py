"""Behave environment hooks for ATPix backend BDD features."""

from __future__ import annotations

import os
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[4]
PROVISION_SCRIPT = REPO_ROOT / "scripts" / "provision_happyview.py"


def before_all(context) -> None:
    """Store repo paths and HappyView URL on the behave context."""
    from dotenv import load_dotenv

    load_dotenv(REPO_ROOT / ".env")

    context.repo_root = REPO_ROOT
    context.happyview_url = os.environ.get("HAPPYVIEW_URL", "http://127.0.0.1:3001").rstrip("/")
    context.happyview_admin_key = os.environ.get("HAPPYVIEW_ADMIN_KEY", "").strip()
    context.deployment_origin = os.environ.get(
        "ATPIX_DEPLOYMENT_ORIGIN", "http://127.0.0.1:5173"
    ).rstrip("/")

    os.environ.setdefault("C2PA_ALLOW_DEV_SIGNING", "true")
    os.environ.setdefault("C2PA_REQUIRE_AUTH", "false")
    os.environ.pop("C2PA_SIGNING_CERTS_PATH", None)
    os.environ.pop("C2PA_SIGNING_KEY_PATH", None)

    from app.core.config import settings

    settings.c2pa_allow_dev_signing = True
    settings.c2pa_require_auth = False
    settings.c2pa_signing_certs_path = ""
    settings.c2pa_signing_key_path = ""
