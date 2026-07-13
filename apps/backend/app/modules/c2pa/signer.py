"""C2PA signing credential loader for ATPix claim generation."""

from __future__ import annotations

import logging
from pathlib import Path

import c2pa
from cryptography import x509
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec

from app.core.config import settings
from app.modules.c2pa.constants import (
    C2PA_CLAIM_SIGNING_EKU_OID,
    DEFAULT_DEV_CERTS_PATH,
    DEFAULT_DEV_KEY_PATH,
    EMAIL_PROTECTION_EKU_OID,
)

logger = logging.getLogger(__name__)


class C2paSigningNotConfiguredError(Exception):
    """Raised when claim-signing material is unavailable or invalid."""


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


def _leaf_certificate_ekus(certs_pem: bytes) -> set[str]:
    """Return Extended Key Usage OIDs from the first certificate in a PEM chain.

    Args:
        certs_pem: PEM-encoded certificate chain bytes.

    Returns:
        Dotted-string OIDs advertised by the leaf certificate EKU extension.
    """
    for block in certs_pem.split(b"-----END CERTIFICATE-----"):
        if b"BEGIN CERTIFICATE" not in block:
            continue

        pem = block.strip() + b"\n-----END CERTIFICATE-----\n"
        certificate = x509.load_pem_x509_certificate(pem, default_backend())
        try:
            eku = certificate.extensions.get_extension_for_class(x509.ExtendedKeyUsage).value
        except x509.ExtensionNotFound:
            return set()

        return {usage.dotted_string for usage in eku}

    return set()


def _certificate_has_valid_signing_eku(certs_pem: bytes, *, allow_dev_eku: bool) -> bool:
    """Return True when the leaf certificate includes an acceptable signing EKU.

    Args:
        certs_pem: PEM-encoded certificate chain bytes.
        allow_dev_eku: Whether CAI dev certs may use `id-kp-emailProtection`.

    Returns:
        Whether the leaf certificate advertises a supported signing EKU.
    """
    ekus = _leaf_certificate_ekus(certs_pem)
    if C2PA_CLAIM_SIGNING_EKU_OID in ekus:
        return True

    return allow_dev_eku and EMAIL_PROTECTION_EKU_OID in ekus


def resolve_signing_paths() -> tuple[Path, Path]:
    """Resolve certificate chain and private-key paths from settings.

    Returns:
        Tuple of `(certs_path, key_path)`.

    Raises:
        C2paSigningNotConfiguredError: When production signing material is absent.
    """
    if settings.c2pa_signing_certs_path and settings.c2pa_signing_key_path:
        return (
            Path(settings.c2pa_signing_certs_path),
            Path(settings.c2pa_signing_key_path),
        )

    if settings.c2pa_allow_dev_signing:
        return DEFAULT_DEV_CERTS_PATH, DEFAULT_DEV_KEY_PATH

    raise C2paSigningNotConfiguredError(
        "C2PA signing credentials are not configured; set C2PA_SIGNING_CERTS_PATH "
        "and C2PA_SIGNING_KEY_PATH or enable C2PA_ALLOW_DEV_SIGNING for development",
    )


def is_signing_configured() -> bool:
    """Return whether claim-signing material is present and EKU-valid.

    Returns:
        True when signing can proceed without raising configuration errors.
    """
    try:
        certs_path, key_path = resolve_signing_paths()
    except C2paSigningNotConfiguredError:
        return False

    if not certs_path.is_file() or not key_path.is_file():
        return False

    try:
        certs = certs_path.read_bytes()
    except OSError:
        return False

    using_dev_fixtures = (
        settings.c2pa_allow_dev_signing
        and certs_path == DEFAULT_DEV_CERTS_PATH
        and not settings.c2pa_signing_certs_path
    )
    return _certificate_has_valid_signing_eku(certs, allow_dev_eku=using_dev_fixtures)


def create_callback_signer() -> c2pa.Signer:
    """Build an ES256 callback signer from configured PEM material.

    Returns:
        Configured `c2pa.Signer` ready for manifest signing.

    Raises:
        C2paSigningNotConfiguredError: When signing PEM files are missing or invalid.
        ValueError: When PEM material cannot be parsed.
    """
    certs_path, key_path = resolve_signing_paths()
    certs = _read_signing_material(certs_path, "signing certificate chain")
    key_bytes = _read_signing_material(key_path, "signing private key")

    using_dev_fixtures = (
        settings.c2pa_allow_dev_signing
        and certs_path == DEFAULT_DEV_CERTS_PATH
        and not settings.c2pa_signing_certs_path
    )
    if not _certificate_has_valid_signing_eku(certs, allow_dev_eku=using_dev_fixtures):
        detail = (
            "C2PA signing certificate is missing the c2pa-kp-claimSigning EKU"
            if not using_dev_fixtures
            else "C2PA signing certificate is missing c2pa-kp-claimSigning or "
            "id-kp-emailProtection EKU required for development fixtures"
        )
        raise C2paSigningNotConfiguredError(detail)

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
