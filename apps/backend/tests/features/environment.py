"""Behave environment hooks for ATPix backend BDD features."""

from __future__ import annotations

import os
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[4]
PROVISION_SCRIPT = REPO_ROOT / "scripts" / "provision_happyview.py"


def before_all(context) -> None:
    """Store repo paths and HappyView URL on the behave context."""
    context.repo_root = REPO_ROOT
    context.happyview_url = os.environ.get("HAPPYVIEW_URL", "http://127.0.0.1:3001").rstrip("/")
    context.happyview_admin_key = os.environ.get("HAPPYVIEW_ADMIN_KEY", "").strip()
