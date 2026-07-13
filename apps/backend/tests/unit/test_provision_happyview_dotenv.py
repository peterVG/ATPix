"""Unit tests for HappyView provision script .env loading (SRS-TC-008)."""

from __future__ import annotations

import os

from dotenv import load_dotenv


def test_dotenv_parses_export_prefix_and_strips_inline_comments(tmp_path, monkeypatch) -> None:
    """python-dotenv must handle export KEY= and inline comments used in .env files."""
    env_file = tmp_path / ".env"
    env_file.write_text(
        "export HAPPYVIEW_ADMIN_KEY=hv_test\nHAPPYVIEW_URL=http://127.0.0.1:3001 # local\n",
        encoding="utf-8",
    )
    monkeypatch.delenv("HAPPYVIEW_ADMIN_KEY", raising=False)
    monkeypatch.delenv("HAPPYVIEW_URL", raising=False)

    load_dotenv(env_file, override=False)

    assert os.environ["HAPPYVIEW_ADMIN_KEY"] == "hv_test"
    assert os.environ["HAPPYVIEW_URL"] == "http://127.0.0.1:3001"
