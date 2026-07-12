"""Stdout logging configuration per AGENTS.md centralized logging mandate."""

import logging
import sys
import time


def configure_stdout_logging(level: int = logging.INFO) -> None:
    """Configure the root logger to emit unbuffered JSON-friendly text to stdout.

    Args:
        level: Logging level for the root logger (default INFO).
    """
    handler = logging.StreamHandler(sys.stdout)
    formatter = logging.Formatter("%(asctime)sZ %(levelname)s %(name)s %(message)s")
    formatter.converter = time.gmtime
    handler.setFormatter(formatter)
    root = logging.getLogger()
    root.handlers.clear()
    root.addHandler(handler)
    root.setLevel(level)
