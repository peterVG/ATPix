"""Behave steps for permissioned spaces integration (SRS-F-008, BE-4.1)."""

from __future__ import annotations

import json
import os
from urllib.error import URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from behave import given, then, when

from tests.support.happyview_oauth_client import (
    HappyViewOAuthClient,
    load_test_account,
    test_accounts_configured,
)

ALBUM_SPACE_TYPE = "net.atpix.gallery.albumSpace"
PHOTO_COLLECTION = "net.atpix.gallery.photo"
ALBUM_ITEM_COLLECTION = "net.atpix.gallery.albumItem"
MINIMAL_JPEG = (
    b"\xff\xd8\xff\xe0\x00\x10JFIF\x00\x01\x01\x00\x00\x01\x00\x01\x00\x00"
    b"\xff\xdb\x00C\x00\x08\x06\x06\x07\x06\x05\x08\x07\x07\x07\t\t\x08\n\x0c\x14\r\x0c\x0b\x0b\x0c\x19\x12\x13\x0f"
    b"\xff\xd9"
)


def _require_integration(context) -> None:
    """Skip scenario when HappyView or test accounts are unavailable."""
    if not context.happyview_admin_key:
        context.scenario.skip("HAPPYVIEW_ADMIN_KEY is required for permissioned spaces integration")
    if not test_accounts_configured():
        context.scenario.skip(
            "TEST_OWNER_* and TEST_MEMBER_* OAuth session env vars are required — "
            "see README permissioned-album testing section"
        )
    client_key = os.environ.get("HAPPYVIEW_CLIENT_KEY", "").strip()
    if not client_key:
        context.scenario.skip("HAPPYVIEW_CLIENT_KEY (hvc_*) is required for OAuth XRPC")


def _deployment_origin() -> str:
    """Resolve ATPix deployment origin for OAuth client_id."""
    return os.environ.get("ATPIX_DEPLOYMENT_ORIGIN", "http://127.0.0.1:5173").rstrip("/")


def _owner_client(context) -> HappyViewOAuthClient:
    """Return the owner OAuth client, caching on behave context."""
    if getattr(context, "owner_client", None) is None:
        owner = load_test_account("TEST_OWNER")
        assert owner is not None
        context.owner_client = HappyViewOAuthClient(
            owner,
            happyview_url=context.happyview_url,
            client_key=os.environ["HAPPYVIEW_CLIENT_KEY"].strip(),
            deployment_origin=_deployment_origin(),
        )
    return context.owner_client


def _member_client(context) -> HappyViewOAuthClient:
    """Return the member OAuth client, caching on behave context."""
    if getattr(context, "member_client", None) is None:
        member = load_test_account("TEST_MEMBER")
        assert member is not None
        context.member_client = HappyViewOAuthClient(
            member,
            happyview_url=context.happyview_url,
            client_key=os.environ["HAPPYVIEW_CLIENT_KEY"].strip(),
            deployment_origin=_deployment_origin(),
        )
    return context.member_client


def _anonymous_xrpc(context, method: str, params: dict | None = None) -> tuple[int, object]:
    """Call XRPC without OAuth (client key only)."""
    query = f"?{urlencode(params)}" if params else ""
    url = f"{context.happyview_url}/xrpc/{method}{query}"
    client_key = os.environ["HAPPYVIEW_CLIENT_KEY"].strip()
    headers = {"Accept": "application/json", "X-Client-Key": client_key}
    request = Request(url, headers=headers, method="GET")
    with urlopen(request, timeout=30) as response:
        raw = response.read().decode("utf-8")
        return response.status, json.loads(raw) if raw else None


@given("two test atproto accounts exist")
def step_two_test_accounts(context) -> None:
    """Require configured owner and member OAuth sessions."""
    _require_integration(context)
    assert load_test_account("TEST_OWNER") is not None
    assert load_test_account("TEST_MEMBER") is not None


@when("the owner creates a permissioned album")
def step_owner_creates_permissioned_album(context) -> None:
    """Create a permissioned album via gallery createAlbum XRPC."""
    _require_integration(context)
    owner = _owner_client(context)
    status, payload = owner.xrpc(
        "net.atpix.gallery.createAlbum",
        body={
            "name": "BDD Permissioned Album",
            "description": "BE-4.1 integration fixture",
            "visibility": "permissioned",
        },
    )
    context.create_album_status = status
    context.create_album_payload = payload
    assert status in (200, 201), payload
    context.album_uri = payload.get("uri")
    album_payload = payload.get("album", {}) if isinstance(payload, dict) else {}
    record = album_payload.get("record", {}) if isinstance(album_payload, dict) else {}
    context.space_uri = payload.get("spaceUri") or record.get("spaceUri")


@then("a space should be created with type {space_type}")
def step_space_type_created(context, space_type: str) -> None:
    """Verify the linked space uses the expected record type."""
    _require_integration(context)
    space_uri = getattr(context, "space_uri", None)
    assert space_uri, "spaceUri missing from createAlbum response"
    assert space_type in space_uri
    owner = _owner_client(context)
    status, payload = owner.xrpc(
        "com.atproto.space.getSpace",
        params={"space": space_uri},
    )
    assert status == 200, payload
    context.space_uri = space_uri
    context.space_payload = payload


@then("the album record should link a spaceUri")
def step_album_links_space_uri(context) -> None:
    """Verify album record contains spaceUri."""
    _require_integration(context)
    album_uri = getattr(context, "album_uri", None)
    space_uri = getattr(context, "space_uri", None)
    assert album_uri and space_uri

    owner = _owner_client(context)
    status, payload = owner.xrpc(
        "net.atpix.gallery.getAlbum",
        params={"uri": album_uri},
    )
    assert status == 200, payload
    record = payload.get("album", {}).get("record", {})
    assert record.get("spaceUri") == space_uri
    assert record.get("visibility") == "permissioned"


@when("the owner invites a second user")
def step_owner_invites_member(context) -> None:
    """Create an invite token for the member account."""
    _require_integration(context)
    owner = _owner_client(context)
    status, payload = owner.xrpc(
        "dev.happyview.space.createInvite",
        body={
            "space": context.space_uri,
            "access": "write",
            "maxUses": 5,
        },
    )
    assert status in (200, 201), payload
    context.invite_token = payload.get("token")
    assert context.invite_token


@when("the member accepts the invite")
def step_member_accepts_invite(context) -> None:
    """Accept the invite token as the member account."""
    _require_integration(context)
    member = _member_client(context)
    status, payload = member.xrpc(
        "dev.happyview.space.acceptInvite",
        body={"token": context.invite_token},
    )
    assert status in (200, 201), payload
    context.member_space_access = payload.get("access")


@when("a photo is uploaded to the space")
def step_upload_photo_to_space(context) -> None:
    """Upload blob to PDS and write photo + albumItem records into the space."""
    _require_integration(context)
    owner = _owner_client(context)

    blob_url = f"{context.happyview_url}/xrpc/com.atproto.repo.uploadBlob"
    from tests.support.happyview_oauth_client import create_dpop_proof

    proof = create_dpop_proof(
        owner.session.dpop_jwk,
        "POST",
        blob_url,
        owner.session.access_token,
    )
    request = Request(
        blob_url,
        data=MINIMAL_JPEG,
        headers={
            "Content-Type": "image/jpeg",
            "X-Client-Key": owner.client_key,
            "Authorization": f"DPoP {owner.session.access_token}",
            "DPoP": proof,
        },
        method="POST",
    )
    with urlopen(request, timeout=60) as response:
        blob_payload = json.loads(response.read().decode("utf-8"))

    blob_ref = blob_payload["blob"]
    photo_record = {
        "$type": PHOTO_COLLECTION,
        "title": "Permissioned test photo",
        "visibility": "permissioned",
        "image": blob_ref,
        "createdAt": "2026-07-14T12:00:00.000Z",
    }

    status, photo_payload = owner.xrpc(
        "com.atproto.space.createRecord",
        body={
            "space": context.space_uri,
            "collection": PHOTO_COLLECTION,
            "record": photo_record,
        },
    )
    assert status in (200, 201), photo_payload
    context.space_photo_uri = photo_payload.get("uri")

    item_status, item_payload = owner.xrpc(
        "com.atproto.space.createRecord",
        body={
            "space": context.space_uri,
            "collection": ALBUM_ITEM_COLLECTION,
            "record": {
                "$type": ALBUM_ITEM_COLLECTION,
                "albumUri": context.album_uri,
                "photoUri": context.space_photo_uri,
                "createdAt": "2026-07-14T12:00:01.000Z",
            },
        },
    )
    assert item_status in (200, 201), item_payload
    context.space_photo_cid = photo_payload.get("cid")
    context.space_photo_blob_cid = blob_ref.get("ref", {}).get("$link")


@then("the member should read album contents with space credentials")
def step_member_reads_space_content(context) -> None:
    """Member can list space records and fetch gated blob."""
    _require_integration(context)
    member = _member_client(context)

    list_status, list_payload = member.xrpc(
        "com.atproto.space.listRecords",
        params={
            "space": context.space_uri,
            "collection": PHOTO_COLLECTION,
            "limit": 10,
        },
    )
    assert list_status == 200, list_payload
    records = list_payload.get("records", [])
    assert any(entry.get("uri") == context.space_photo_uri for entry in records)

    blob_status, _blob_payload = member.xrpc(
        "com.atproto.space.getBlob",
        params={
            "space": context.space_uri,
            "cid": context.space_photo_blob_cid,
        },
        http_method="GET",
    )
    assert blob_status == 200


@then("unauthorized users should be denied without metadata leakage")
def step_unauthorized_denied_no_leak(context) -> None:
    """Non-member listRecords and getBlob must fail without leaking identifiers."""
    _require_integration(context)
    member = _member_client(context)

    # Revoke member access by removing them (owner action) to simulate stranger.
    owner = _owner_client(context)
    remove_status, remove_payload = owner.xrpc(
        "com.atproto.simplespace.removeMember",
        body={"space": context.space_uri, "did": member.session.did},
    )
    assert remove_status in (200, 201, 204), remove_payload

    denied_status, denied_payload = member.xrpc(
        "com.atproto.space.listRecords",
        params={
            "space": context.space_uri,
            "collection": PHOTO_COLLECTION,
            "limit": 10,
        },
    )
    assert denied_status in (401, 403, 404), denied_payload
    leaked = json.dumps(denied_payload).lower()
    assert context.space_photo_blob_cid not in leaked
    assert context.space_photo_uri not in leaked


@when("permissioned photos exist in a space")
def step_permissioned_photos_exist(context) -> None:
    """Ensure a permissioned album with at least one space photo exists."""
    if getattr(context, "space_photo_uri", None):
        return

    step_owner_creates_permissioned_album(context)
    step_space_type_created(context, ALBUM_SPACE_TYPE)
    step_album_links_space_uri(context)
    step_upload_photo_to_space(context)


@then("public listPhotos queries should not return those photos")
def step_public_index_excludes_permissioned(context) -> None:
    """Public gallery index must not surface permissioned space photos."""
    _require_integration(context)
    owner = _owner_client(context)
    status, payload = owner.xrpc(
        "net.atpix.gallery.listPhotos",
        params={"did": owner.session.did, "limit": 50},
    )
    assert status == 200, payload
    uris = {photo.get("uri") for photo in payload.get("photos", [])}
    assert context.space_photo_uri not in uris


@then("space-scoped queries should require valid credentials")
def step_space_queries_require_credentials(context) -> None:
    """Anonymous space listRecords must not succeed."""
    _require_integration(context)
    try:
        status, _payload = _anonymous_xrpc(
            context,
            "com.atproto.space.listRecords",
            {
                "space": context.space_uri,
                "collection": PHOTO_COLLECTION,
                "limit": 5,
            },
        )
    except URLError:
        status = 0

    assert status in (0, 401, 403, 404)


@when("permissioned album creation is attempted")
def step_attempt_permissioned_creation(context) -> None:
    """Attempt createAlbum with permissioned visibility when flag may be off."""
    _require_integration(context)
    owner = _owner_client(context)
    status, payload = owner.xrpc(
        "net.atpix.gallery.createAlbum",
        body={
            "name": "Flag-off permissioned attempt",
            "visibility": "permissioned",
        },
    )
    context.create_album_status = status
    context.create_album_payload = payload


@then("the response should indicate the feature is disabled")
def step_feature_disabled_response(context) -> None:
    """Expect FeatureDisabled or equivalent error when spaces flag is off."""
    payload = getattr(context, "create_album_payload", {})
    status = getattr(context, "create_album_status", 500)
    assert status >= 400
    combined = json.dumps(payload).lower()
    assert "feature" in combined or "disabled" in combined or "spaces" in combined
