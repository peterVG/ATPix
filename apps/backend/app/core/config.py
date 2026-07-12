"""Application configuration loaded from environment variables."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime settings for the ATPix auxiliary API.

    Attributes:
        app_name: Human-readable service name for logs and OpenAPI.
        debug: When True, enables verbose error responses.
        cors_origins: Comma-separated list of allowed browser origins.
        happyview_url: Base URL of the HappyView App View instance.
    """

    app_name: str = "atpix-backend"
    debug: bool = False
    cors_origins: str = "http://127.0.0.1:5173,http://localhost:5173"
    happyview_url: str = "http://127.0.0.1:3001"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    def cors_origin_list(self) -> list[str]:
        """Return parsed CORS origin URLs.

        Returns:
            List of origin strings suitable for FastAPI CORSMiddleware.
        """
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


settings = Settings()
