"""Stdout logging configuration per AGENTS.md centralized logging mandate."""

import logging
import sys


def configure_stdout_logging(level: int = logging.INFO) -> None:
    """Configure the root logger to emit unbuffered JSON-friendly text to stdout.

    Args:
        level: Logging level for the root logger (default INFO).
    """
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(logging.Formatter("%(asctime)sZ %(levelname)s %(name)s %(message)s"))
    root = logging.getLogger()
    root.handlers.clear()
    root.addHandler(handler)
    root.setLevel(level)
