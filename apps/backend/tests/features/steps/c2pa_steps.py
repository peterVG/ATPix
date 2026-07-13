"""Step definitions for C2PA manifest generation BDD features."""

from __future__ import annotations

from pathlib import Path

from behave import given, then, when

from app.modules.c2pa.constants import ACTION_CREATED, ACTION_OPENED
from app.modules.c2pa.service import embed_manifest, summarize_manifest

FIXTURES = Path(__file__).resolve().parents[2] / "fixtures" / "c2pa"


@given("the C2PA signing service is configured")
def step_signing_service_configured(context) -> None:
    """Ensure CAI development signing fixtures are available."""
    assert (FIXTURES / "es256_certs.pem").is_file()
    assert (FIXTURES / "es256_private.key").is_file()


@given("a valid claim-signing certificate is available")
def step_claim_signing_certificate_available(context) -> None:
    """Alias step confirming signing material exists."""
    step_signing_service_configured(context)


@given("I have a JPEG with no prior C2PA manifest")
def step_jpeg_without_manifest(context) -> None:
    """Load a pristine JPEG fixture."""
    context.source_bytes = (FIXTURES / "A.jpg").read_bytes()
    context.mime_type = "image/jpeg"
    context.creator_did = "did:plc:uploader"


@given("I have a JPEG with an existing C2PA manifest")
def step_jpeg_with_manifest(context) -> None:
    """Prepare a JPEG that already contains a manifest store."""
    source = (FIXTURES / "A.jpg").read_bytes()
    context.source_bytes = embed_manifest(source, "image/jpeg", "did:plc:source")
    context.mime_type = "image/jpeg"
    context.creator_did = "did:plc:importer"


@given("the uploader DID is did:plc:example")
def step_uploader_did_example(context) -> None:
    """Set the creator DID used for signing assertions."""
    context.creator_did = "did:plc:example"


@given("the user declines GPS and device metadata")
def step_user_declines_optional_metadata(context) -> None:
    """Record privacy opt-out flags for optional assertions."""
    context.include_gps = False
    context.include_device = False


@when("the claim generator processes the upload")
def step_process_upload(context) -> None:
    """Sign a new capture upload."""
    context.signed_bytes = embed_manifest(
        context.source_bytes,
        context.mime_type,
        context.creator_did,
        include_gps=getattr(context, "include_gps", False),
        include_device=getattr(context, "include_device", False),
    )
    context.summary = summarize_manifest(context.signed_bytes, context.mime_type)


@when("the claim generator processes the import")
def step_process_import(context) -> None:
    """Sign an import upload with ingredient linkage."""
    step_process_upload(context)


@when("the claim generator signs a PNG upload")
def step_sign_png_upload(context) -> None:
    """Sign a PNG capture upload."""
    context.source_bytes = (FIXTURES / "sample.png").read_bytes()
    context.mime_type = "image/png"
    context.creator_did = "did:plc:png"
    step_process_upload(context)


@when("the manifest is signed")
def step_manifest_signed(context) -> None:
    """Sign using the currently configured creator DID."""
    if not hasattr(context, "source_bytes"):
        context.source_bytes = (FIXTURES / "A.jpg").read_bytes()
        context.mime_type = "image/jpeg"
    if not hasattr(context, "creator_did"):
        context.creator_did = "did:plc:example"
    step_process_upload(context)


@then("the manifest should include c2pa.created as the first action")
def step_assert_created_action(context) -> None:
    """Verify the first action is c2pa.created."""
    assert context.summary.first_action == ACTION_CREATED


@then("the manifest should include c2pa.opened as the first action")
def step_assert_opened_action(context) -> None:
    """Verify the first action is c2pa.opened."""
    assert context.summary.first_action == ACTION_OPENED


@then("c2pa.hash.data should be present for the asset")
def step_assert_hash_binding(context) -> None:
    """Verify hard-binding assertion presence."""
    assert context.summary.has_hash_data is True


@then("an ingredient reference should link to the source manifest")
def step_assert_ingredient_reference(context) -> None:
    """Verify import manifests include ingredient linkage."""
    assert context.summary.has_ingredient is True


@then("the manifest store should be embedded in the image file by default")
def step_assert_embedded_store(context) -> None:
    """Verify in-file manifest embedding."""
    assert context.summary.embedded is True


@then("the blob bytes should contain the signed manifest")
def step_assert_signed_blob_bytes(context) -> None:
    """Verify signed output differs from the source payload."""
    assert len(context.signed_bytes) > len(context.source_bytes)


@then("the assertion net.atpix.gallery.creatorDid should record did:plc:example")
def step_assert_creator_did_example(context) -> None:
    """Verify custom creator DID assertion value."""
    assert context.summary.creator_did == "did:plc:example"


@then("optional location and device assertions should be omitted")
def step_assert_optional_metadata_omitted(context) -> None:
    """Verify privacy opt-out removed optional metadata."""
    assert context.summary.has_gps_metadata is False
    assert context.summary.has_device_metadata is False


@then("required actions and hash assertions should remain")
def step_assert_required_assertions_remain(context) -> None:
    """Verify integrity assertions remain after privacy opt-out."""
    assert context.summary.first_action in {ACTION_CREATED, ACTION_OPENED}
    assert context.summary.has_hash_data is True


@when("the API receives an unsupported upload content type")
def step_api_receives_unsupported_type(context) -> None:
    """POST an unsupported MIME type to the embed endpoint."""
    from fastapi.testclient import TestClient

    from app.main import app

    client = TestClient(app)
    context.api_response = client.post(
        "/c2pa/manifest/embed",
        data={"creator_did": "did:plc:reject"},
        files={"file": ("notes.txt", b"hello", "text/plain")},
    )


@then("the embed request should be rejected before signing")
def step_embed_request_rejected(context) -> None:
    """Verify unsupported uploads return HTTP 415."""
    assert context.api_response.status_code == 415
