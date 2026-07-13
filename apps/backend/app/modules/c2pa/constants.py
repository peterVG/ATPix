"""C2PA module constants for ATPix claim generation (SRS-F-012)."""

from pathlib import Path

ATPIX_CLAIM_GENERATOR_NAME = "ATPix"
ATPIX_CLAIM_GENERATOR_VERSION = "0.1"
ATPIX_CREATOR_ASSERTION_LABEL = "net.atpix.gallery.creatorDid"
ATPIX_ACTIONS_ASSERTION_LABEL = "c2pa.actions"

ACTION_CREATED = "c2pa.created"
ACTION_OPENED = "c2pa.opened"

SUPPORTED_EMBED_MIME_TYPES = frozenset({"image/jpeg", "image/png"})

FIXTURES_DIR = Path(__file__).resolve().parents[3] / "tests" / "fixtures" / "c2pa"
DEFAULT_DEV_CERTS_PATH = FIXTURES_DIR / "es256_certs.pem"
DEFAULT_DEV_KEY_PATH = FIXTURES_DIR / "es256_private.key"

C2PA_CLAIM_SIGNING_EKU_OID = "1.3.6.1.4.1.62558.2.1"
EMAIL_PROTECTION_EKU_OID = "1.3.6.1.5.5.7.3.4"

MAX_OUTPUT_BYTES = 52_428_800
MANIFEST_HEADROOM_BYTES = 512 * 1024
MAX_EMBED_BYTES = MAX_OUTPUT_BYTES - MANIFEST_HEADROOM_BYTES
