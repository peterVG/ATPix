"""Application configuration loaded from environment variables."""

from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

_BACKEND_ROOT = Path(__file__).resolve().parents[2]
_REPO_ROOT = _BACKEND_ROOT.parent.parent


class Settings(BaseSettings):
    """Runtime settings for the ATPix auxiliary API.

    Attributes:
        app_name: Human-readable service name for logs and OpenAPI.
        debug: When True, enables verbose error responses.
        cors_origins: Comma-separated list of allowed browser origins.
        happyview_url: Base URL of the HappyView App View instance.
        c2pa_signing_certs_path: PEM certificate chain for C2PA claim signing.
        c2pa_signing_key_path: PEM private key for C2PA claim signing.
        c2pa_tsa_url: RFC 3161 timestamp authority URL for signed manifests.
        c2pa_allow_dev_signing: Whether CAI test fixtures may be used as a fallback.
        c2pa_require_auth: Whether embed requests must present a verified OAuth token.
    """

    app_name: str = "atpix-backend"
    debug: bool = False
    cors_origins: str = "http://127.0.0.1:5173,http://localhost:5173"
    happyview_url: str = "http://127.0.0.1:3001"
    c2pa_signing_certs_path: str = ""
    c2pa_signing_key_path: str = ""
    c2pa_tsa_url: str = "http://timestamp.digicert.com"
    c2pa_allow_dev_signing: bool = False
    c2pa_require_auth: bool = True

    model_config = SettingsConfigDict(
        env_file=[_REPO_ROOT / ".env", _BACKEND_ROOT / ".env"],
        extra="ignore",
    )

    def cors_origin_list(self) -> list[str]:
        """Return parsed CORS origin URLs.

        Returns:
            List of origin strings suitable for FastAPI CORSMiddleware.
        """
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


settings = Settings()
