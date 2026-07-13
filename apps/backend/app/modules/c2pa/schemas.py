"""Schemas for C2PA auxiliary endpoints (F-012–F-016 implementation surface)."""

from pydantic import BaseModel, Field

from app.modules.c2pa.constants import SUPPORTED_EMBED_MIME_TYPES


class C2paStatusResponse(BaseModel):
    """C2PA module readiness and specification target.

    Attributes:
        module: Module identifier.
        ready: Whether claim-generator signing material is configured.
        spec_version: Target C2PA specification version.
        supported_mime_types: Image MIME types accepted for embedding.
    """

    module: str = Field(default="c2pa")
    ready: bool = Field(default=False)
    spec_version: str = Field(default="2.2")
    supported_mime_types: list[str] = Field(
        default_factory=lambda: sorted(SUPPORTED_EMBED_MIME_TYPES),
    )


class C2paEmbedMetadata(BaseModel):
    """Response metadata returned alongside signed bytes.

    Attributes:
        first_action: First `c2pa.actions` entry after signing.
        creator_did: DID recorded in `net.atpix.gallery.creatorDid`.
        embedded: Whether the manifest store is embedded in-file.
        byte_size: Size of the signed asset in bytes.
    """

    first_action: str
    creator_did: str
    embedded: bool = True
    byte_size: int
