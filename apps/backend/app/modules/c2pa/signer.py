"""C2PA signing credential loader for ATPix claim generation."""

from __future__ import annotations

import logging
from pathlib import Path

import c2pa
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec

from app.core.config import settings
from app.modules.c2pa.constants import DEFAULT_DEV_CERTS_PATH, DEFAULT_DEV_KEY_PATH

logger = logging.getLogger(__name__)


def _read_signing_material(path: Path, label: str) -> bytes:
    """Load a PEM signing file from disk.

    Args:
        path: Filesystem path to the PEM material.
        label: Human-readable label used in error messages.

    Returns:
        Raw PEM bytes.

    Raises:
        FileNotFoundError: When the configured path does not exist.
    """
    if not path.is_file():
        raise FileNotFoundError(f"C2PA {label} not found at {path}")

    return path.read_bytes()


def resolve_signing_paths() -> tuple[Path, Path]:
    """Resolve certificate chain and private-key paths from settings.

    Returns:
        Tuple of `(certs_path, key_path)`.
    """
    certs_path = Path(settings.c2pa_signing_certs_path or DEFAULT_DEV_CERTS_PATH)
    key_path = Path(settings.c2pa_signing_key_path or DEFAULT_DEV_KEY_PATH)
    return certs_path, key_path


def create_callback_signer() -> c2pa.Signer:
    """Build an ES256 callback signer from configured PEM material.

    Returns:
        Configured `c2pa.Signer` ready for manifest signing.

    Raises:
        FileNotFoundError: When signing PEM files are missing.
        ValueError: When PEM material cannot be parsed.
    """
    certs_path, key_path = resolve_signing_paths()
    certs = _read_signing_material(certs_path, "signing certificate chain")
    key_bytes = _read_signing_material(key_path, "signing private key")

    def callback_signer_es256(data: bytes) -> bytes:
        private_key = serialization.load_pem_private_key(
            key_bytes,
            password=None,
            backend=default_backend(),
        )
        return private_key.sign(data, ec.ECDSA(hashes.SHA256()))

    tsa_url = settings.c2pa_tsa_url or "http://timestamp.digicert.com"
    logger.info("initializing C2PA signer certs=%s key=%s", certs_path, key_path)
    return c2pa.Signer.from_callback(
        callback_signer_es256,
        c2pa.C2paSigningAlg.ES256,
        certs.decode("utf-8"),
        tsa_url,
    )
