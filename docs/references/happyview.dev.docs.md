# https://happyview.dev

<!--
URL: https://happyview.dev
title: Introduction | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Introduction

## Introduction

HappyView is the best way to build an [AppView](https://atproto.com/guides/glossary#app-view) for the [AT Protocol](https://atproto.com). Upload your [lexicon](reference/glossary#atproto-terms) schemas and get a fully functional AppView, complete with [XRPC](reference/glossary#atproto-terms) endpoints, OAuth, real-time network sync, and historical [backfill](guides/backfill), without writing a single line of server code.

Building an AppView from scratch means wiring up real-time event streams, record storage, XRPC routing, OAuth flows, and PDS write proxying before you can even think about your application. HappyView handles all of that. Define your data model with lexicons, add custom logic with Lua scripts when you need it, and ship your app.

### [Features](#features)

* **Schema-driven endpoints:** Upload a [lexicon](guides/lexicons) and HappyView generates XRPC query and procedure routes, storage, and indexing from it — updatable at runtime with no restart.
* **Network sync built in:** Real-time record streaming via [Jetstream](https://github.com/bluesky-social/jetstream), historical [backfill](guides/backfill) from each user's PDS, and atproto OAuth with DPoP-bound proxy writes back to the PDS.
* **Customize with Lua scripts and plugins:** Trigger-keyed [Lua scripts](guides/lua-scripting) for XRPC query/procedure logic and [record/label event handling](guides/label-scripts), WASM [plugins](guides/plugins) for external platform integration, and [labeler](guides/labelers) subscriptions for content moderation.
* **Protocol-native:** Works with any PDS, resolves DIDs through the directory, and fetches [network lexicons](guides/lexicons#network-lexicons) via DNS authority resolution.
* **Permissioned Spaces:** Experimental support for [AT Protocol Proposal 0016](experimental/spaces/index) — membership-gated data containers with per-user repo state, cross-service credentials, and write notifications.
* **Full admin surface:** Built-in [dashboard](getting-started/dashboard) and [admin API](api-reference/admin/admin-api) for managing lexicons, users, API keys, API clients, backfill jobs, and plugins.

### [Design Principles](#design-principles)

* **Schema-first**: Your Lexicons are the source of truth. Upload a schema and HappyView derives endpoints, indexing rules, and network sync from it. You describe *what* your data looks like; HappyView figures out the rest.
* **Zero boilerplate**: HappyView handles AppView infrastructure (Jetstream, backfill, OAuth, PDS proxying) for you. You should be writing application logic from minute one, not plumbing.
* **Runtime-configurable**: Lexicons can be added, updated, and removed without restarting the server. New endpoints and sync rules take effect immediately, so you can iterate on your data model in real time.
* **Protocol-native**: HappyView works with *any* PDS, resolves DIDs through the directory, and follows atproto conventions. It's a first-class citizen of the network, not a wrapper around it.

### [Next Steps](#next-steps)

* [Quickstart](getting-started/deployment/railway): Deploy HappyView on Railway or run it locally
* [Lexicons](guides/lexicons): Upload lexicon schemas and start indexing records
* [Lua Scripting](guides/lua-scripting): Write custom query and procedure logic
* [Record & Label Scripts](guides/label-scripts): React to record changes and label events in real time
* [Labelers](guides/labelers): Subscribe to external labelers and manage content labels
* [Plugins](guides/plugins): Integrate with external platforms using WASM plugins
* [Permissioned Spaces](experimental/spaces/index): Create membership-gated data containers with the AT Protocol spaces API
* [Event Logs](guides/event-logs): Monitor system activity, debug script errors, and audit admin actions

[Quickstart

Next Page](/getting-started/quickstart)

#### On this page

[Features](#features)[Design Principles](#design-principles)[Next Steps](#next-steps)

---
<!--
URL: https://happyview.dev/getting-started/deployment/railway
title: Railway | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

[Railway](/getting-started/deployment/railway)[Docker](/getting-started/deployment/docker)[From Source](/getting-started/deployment/other)[Production](/getting-started/deployment/production)

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Railway

Deployment

## Railway

The fastest way to get HappyView running is with Railway. Choose the database you want and these templates will deploy HappyView with a single click:

| SQLite | PostgreSQL |
| --- | --- |
| [![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/happyview-2-sqlite-1?referralCode=0QOgj_) | [![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/happyview-2-postgresql?referralCode=0QOgj_) |

### [Required configuration](#required-configuration)

After deploying the template, you'll need to configure a few things before the stack works properly:

1. **Set your session secret.** In the HappyView service variables, set `SESSION_SECRET` to a random string of at least 64 characters. This is used to sign session cookies.

   ```
   openssl rand -base64 48
   ```
2. **Set your token encryption secret.** In the HappyView service variables, `TOKEN_ENCRYPTION_KEY` must be a Base64-encoded 32-byte key. This is used for encrypting plugin secrets and DPoP private keys at rest.

   ```
   openssl rand -base64 32
   ```
3. **Assign a public domain.** In the Railway dashboard, add a public domain to the HappyView service. The service needs a publicly accessible URL for OAuth callbacks. Set `PUBLIC_URL` to this domain (e.g. `https://happyview-production.up.railway.app`).
   :::note
   Your instance can use a custom domain or Railway's generated URL with no additional configuration.
   :::
4. Access your HappyView dashboard at the instance's public URL. The first user to log in is automatically bootstrapped as the super user.

### [Next steps](#next-steps)

* [Configuration](../configuration) — full list of environment variables
* [Dashboard](../dashboard) — manage lexicons, users, and plugins via the web UI
* [Production deployment](production) — hardening checklist for production instances

[Authentication

Previous Page](/getting-started/authentication)[Docker

Next Page](/getting-started/deployment/docker)

#### On this page

[Required configuration](#required-configuration)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/guides/permissions
title: Permissions | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Permissions

## Permissions

HappyView uses a granular permission system to control access to the admin API. Each user has a set of permissions that determine which endpoints they can access. Permissions can be assigned individually, via templates, or both.

### [Permission list](#permission-list)

HappyView defines 44 permissions organized by category:

#### [Lexicons](#lexicons)

| Permission | Description |
| --- | --- |
| `lexicons:create` | Upload and register new lexicon schemas |
| `lexicons:read` | View registered lexicon schemas |
| `lexicons:delete` | Remove lexicon schemas |

#### [Records](#records)

| Permission | Description |
| --- | --- |
| `records:read` | Browse indexed AT Protocol records |
| `records:delete` | Delete individual records from the index |
| `records:delete-collection` | Bulk-delete all records in a collection |

#### [Scripts](#scripts)

| Permission | Description |
| --- | --- |
| `scripts:read` | View trigger-keyed scripts |
| `scripts:manage` | Create, update, and delete trigger-keyed scripts |

#### [Script Variables](#script-variables)

| Permission | Description |
| --- | --- |
| `script-variables:create` | Add or update environment variables for Lua scripts |
| `script-variables:read` | View script environment variable keys and values |
| `script-variables:delete` | Remove script environment variables |

#### [Users](#users)

| Permission | Description |
| --- | --- |
| `users:create` | Add new dashboard users |
| `users:read` | View the user list and their permissions |
| `users:update` | Modify user permissions |
| `users:delete` | Remove dashboard users |

#### [API Keys](#api-keys)

| Permission | Description |
| --- | --- |
| `api-keys:create` | Generate new API keys for admin access |
| `api-keys:read` | View existing API keys |
| `api-keys:delete` | Revoke existing API keys |

#### [Backfill](#backfill)

| Permission | Description |
| --- | --- |
| `backfill:create` | Trigger historical record backfill jobs |
| `backfill:read` | View backfill job status and progress |

#### [Labelers](#labelers)

| Permission | Description |
| --- | --- |
| `labelers:create` | Subscribe to external labeler services |
| `labelers:read` | View subscribed labeler services |
| `labelers:delete` | Unsubscribe from labeler services |

#### [Settings](#settings)

| Permission | Description |
| --- | --- |
| `settings:manage` | Modify instance settings, logo, and configuration |

#### [Plugins](#plugins)

| Permission | Description |
| --- | --- |
| `plugins:read` | View installed plugins and their configuration |
| `plugins:create` | Install and configure new plugins |
| `plugins:delete` | Uninstall plugins |

#### [API Clients](#api-clients)

| Permission | Description |
| --- | --- |
| `api-clients:view` | View registered OAuth API clients |
| `api-clients:create` | Register new OAuth API clients |
| `api-clients:edit` | Modify API client settings and credentials |
| `api-clients:delete` | Remove registered API clients |

#### [Dead Letters](#dead-letters)

| Permission | Description |
| --- | --- |
| `dead-letters:read` | View failed hook executions |
| `dead-letters:manage` | Retry, re-index, or dismiss dead letters |

#### [Spaces](#spaces)

| Permission | Description |
| --- | --- |
| `spaces:create` | Create new permissioned data spaces |
| `spaces:read` | View space details and metadata |
| `spaces:update` | Modify space settings |
| `spaces:delete` | Remove spaces and their data |
| `spaces:manage-members` | Add or remove space members and roles |
| `spaces:manage-invites` | Create and revoke space invitations |
| `spaces:manage-records` | Read and write records within spaces |
| `spaces:manage-credentials` | Issue and revoke space access credentials |

#### [System](#system)

| Permission | Description |
| --- | --- |
| `stats:read` | View collection statistics and record counts |
| `events:read` | View the event log |

### [Permission templates](#permission-templates)

Templates are predefined sets of permissions that simplify user creation. Pass a `template` value when creating a user via `POST /admin/users`.

#### [Viewer](#viewer)

Read-only access. Can browse lexicons, records, scripts, stats, events, dead letters, and user lists but cannot modify anything.

Includes: `lexicons:read`, `records:read`, `scripts:read`, `script-variables:read`, `users:read`, `api-keys:read`, `backfill:read`, `stats:read`, `events:read`, `dead-letters:read`

#### [Operator](#operator)

Everything in Viewer, plus the ability to run backfill jobs, manage API keys, and manage dead letters.

Adds: `backfill:create`, `api-keys:create`, `api-keys:delete`, `dead-letters:manage`

#### [Manager](#manager)

Everything in Operator, plus the ability to manage lexicons, records, scripts, labelers, settings, plugins, API clients, and spaces.

Adds: `lexicons:create`, `lexicons:delete`, `scripts:manage`, `script-variables:create`, `script-variables:delete`, `records:delete`, `labelers:create`, `labelers:read`, `labelers:delete`, `settings:manage`, `plugins:read`, `plugins:create`, `plugins:delete`, `api-clients:view`, `api-clients:create`, `api-clients:edit`, `api-clients:delete`, `spaces:create`, `spaces:read`, `spaces:update`, `spaces:delete`, `spaces:manage-members`, `spaces:manage-invites`, `spaces:manage-records`, `spaces:manage-credentials`

#### [Full Access](#full-access)

All 44 permissions. Equivalent to granting every permission individually (but still not a super user).

### [Super user](#super-user)

The super user is a special user created automatically when the first person logs in to a fresh HappyView instance. The super user:

* Has unrestricted access to all endpoints, regardless of which permissions are assigned
* Is the only user who can call `POST /admin/users/transfer-super`
* Cannot be deleted
* Cannot have their permissions modified by other users

There is always exactly one super user. Super status can be transferred to another user via the dashboard or transfer endpoint in the Admin API.

### [Escalation guards](#escalation-guards)

HappyView prevents privilege escalation:

* When creating a user or API key, you can only grant permissions that you yourself have. Attempting to grant a permission you lack returns `403 Forbidden`.
* When updating a user's permissions, the same rule applies — you cannot grant permissions beyond your own.

### [Self-modification guards](#self-modification-guards)

Users cannot modify their own account in destructive ways:

* You cannot delete yourself
* You cannot revoke your own permissions

These guards prevent accidental lockout.

### [API key permissions](#api-key-permissions)

API keys have their own set of permissions, specified at creation time. The effective permissions of an API key are the **intersection** of:

1. The permissions assigned to the key
2. The permissions of the user who owns the key

This means if a user's permissions are later reduced, any API keys they created are also effectively reduced — even though the key's own permission list doesn't change.

For example, if a user with `lexicons:create` and `lexicons:read` creates a key with both permissions, and the user later loses `lexicons:create`, the key can only use `lexicons:read`.

### [Managing permissions](#managing-permissions)

#### [Via the dashboard](#via-the-dashboard)

Go to **Settings > Users** to view and manage user permissions. Click on a user to see their current permissions and modify them. You can also assign templates when creating new users.

#### [Via the API](#via-the-api)

* `POST /admin/users` — create a user with a template or explicit permissions
* `PATCH /admin/users/{id}/permissions` — grant or revoke individual permissions
* `POST /admin/users/transfer-super` — transfer super user status (super user only)

See the [Admin API — Users](../api-reference/admin/users) for full details.

### [Next steps](#next-steps)

* [Admin API reference](../api-reference/admin/admin-api) — endpoint documentation with required permissions
* [API Keys](api-keys) — creating scoped API keys
* [Event Logs](event-logs) — permission-denied events are logged for auditing

[API Keys

Previous Page](/guides/api-keys)[Event Logs

Next Page](/guides/event-logs)

#### On this page

[Permission list](#permission-list)[Lexicons](#lexicons)[Records](#records)[Scripts](#scripts)[Script Variables](#script-variables)[Users](#users)[API Keys](#api-keys)[Backfill](#backfill)[Labelers](#labelers)[Settings](#settings)[Plugins](#plugins)[API Clients](#api-clients)[Dead Letters](#dead-letters)[Spaces](#spaces)[System](#system)[Permission templates](#permission-templates)[Viewer](#viewer)[Operator](#operator)[Manager](#manager)[Full Access](#full-access)[Super user](#super-user)[Escalation guards](#escalation-guards)[Self-modification guards](#self-modification-guards)[API key permissions](#api-key-permissions)[Managing permissions](#managing-permissions)[Via the dashboard](#via-the-dashboard)[Via the API](#via-the-api)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/guides/developing-plugins
title: Developing Plugins | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Developing Plugins

## Developing Plugins

This guide covers how to build your own HappyView WASM plugins. For installing and configuring plugins, see the [Plugins guide](plugins).

See the [happyview-plugins](https://tangled.org/gamesgamesgamesgames.games/happyview-plugins) repository for examples and the plugin SDK.

### [Plugin Manifest](#plugin-manifest)

Each plugin has a `manifest.json` that describes its metadata:

```
{
  "id": "steam",
  "name": "Steam",
  "version": "1.0.0",
  "api_version": "1",
  "description": "Import your Steam game library and playtime data.",
  "icon_url": "https://example.com/steam-icon.png",
  "auth_type": "openid",
  "wasm_file": "steam.wasm",
  "required_secrets": [
    {
      "key": "PLUGIN_STEAM_API_KEY",
      "name": "Steam Web API Key",
      "description": "Get your API key at steamcommunity.com/dev/apikey"
    }
  ]
}
```

| Field | Description |
| --- | --- |
| `id` | Unique plugin identifier |
| `name` | Display name |
| `version` | Semantic version |
| `api_version` | Plugin API version (currently "1") |
| `description` | Brief description shown during install |
| `icon_url` | Optional icon URL |
| `auth_type` | Authentication type: `oauth2`, `openid`, or `api_key` |
| `wasm_file` | WASM binary filename (default: `plugin.wasm`) |
| `required_secrets` | Array of secrets the plugin needs |

### [API Endpoints](#api-endpoints)

#### [Public Endpoints](#public-endpoints)

| Endpoint | Description |
| --- | --- |
| `GET /external-auth/providers` | List available auth providers |
| `GET /external-auth/accounts` | List user's linked accounts |
| `GET /external-auth/{plugin}/authorize` | Start OAuth flow |
| `GET /external-auth/{plugin}/callback` | OAuth callback handler |
| `POST /external-auth/{plugin}/sync` | Sync data from linked account |
| `POST /external-auth/{plugin}/unlink` | Unlink account |
| `POST /external-auth/{plugin}/connect` | Connect with API key (for `api_key` auth type) |

#### [Admin Endpoints](#admin-endpoints)

| Endpoint | Description |
| --- | --- |
| `GET /admin/plugins` | List installed plugins |
| `POST /admin/plugins` | Install a plugin |
| `POST /admin/plugins/preview` | Preview plugin before installing |
| `GET /admin/plugins/official` | Browse the official plugin registry catalog |
| `DELETE /admin/plugins/{id}` | Remove a plugin |
| `POST /admin/plugins/{id}/reload` | Reload plugin from source |
| `POST /admin/plugins/{id}/check-update` | Check whether a newer version is available |
| `GET /admin/plugins/{id}/secrets` | Get configured secrets (masked) |
| `PUT /admin/plugins/{id}/secrets` | Update plugin secrets |

The dashboard's **Settings > Plugins** page calls `GET /admin/plugins/official` to populate the install browser, and `POST /admin/plugins/{id}/check-update` to display update badges on installed plugins.

### [Plugin Exports](#plugin-exports)

Plugins must export these functions:

| Export | Signature | Description |
| --- | --- | --- |
| `alloc` | `(size: u32) -> u32` | Allocate memory |
| `dealloc` | `(ptr: u32, size: u32)` | Deallocate memory |
| `get_authorize_url` | `(ptr: u32, len: u32) -> i64` | Generate OAuth authorize URL |
| `handle_callback` | `(ptr: u32, len: u32) -> i64` | Handle OAuth callback |
| `refresh_tokens` | `(ptr: u32, len: u32) -> i64` | Refresh expired tokens |
| `get_profile` | `(ptr: u32, len: u32) -> i64` | Get external profile info |
| `sync_account` | `(ptr: u32, len: u32) -> i64` | Sync data and return records |

### [Host Functions](#host-functions)

Plugins can import these host functions:

| Import | Description |
| --- | --- |
| `host_http_request` | Make HTTP requests |
| `host_get_secret` | Read configured secrets |
| `host_log` | Write to server logs |
| `host_kv_get` | Read from KV storage |
| `host_kv_set` | Write to KV storage |
| `host_kv_delete` | Delete from KV storage |

### [Next steps](#next-steps)

* [Official plugins repository](https://tangled.org/gamesgamesgamesgames.games/happyview-plugins) — ready-to-use plugins and the plugin SDK
* [Plugins guide](plugins) — install and configure plugins
* [API Keys](./api-keys) — authenticate programmatic access to admin endpoints
* [Permissions](./permissions) — configure user access to plugin management

[Plugins

Previous Page](/guides/plugins)[API Keys

Next Page](/guides/api-keys)

#### On this page

[Plugin Manifest](#plugin-manifest)[API Endpoints](#api-endpoints)[Public Endpoints](#public-endpoints)[Admin Endpoints](#admin-endpoints)[Plugin Exports](#plugin-exports)[Host Functions](#host-functions)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/reference/troubleshooting
title: Troubleshooting | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Troubleshooting

## Troubleshooting

Common issues and how to resolve them.

### [XRPC endpoint returns 404](#xrpc-endpoint-returns-404)

**Symptom**: `GET /xrpc/your.method.name` returns `{"error": "method not found"}`.

**Causes**:

* The lexicon hasn't been uploaded yet. Check with `GET /admin/lexicons` or the [dashboard](../getting-started/dashboard).
* The lexicon's `defs.main.type` doesn't match the HTTP method. Queries are `GET`, procedures are `POST`.
* The NSID in the URL doesn't match the `id` field in the uploaded lexicon JSON.

### [Queries return empty results](#queries-return-empty-results)

**Symptom**: The XRPC query endpoint returns `{"records": []}` even though records should exist.

**Causes**:

* The query lexicon is missing a `target_collection`. Without it, the query doesn't know which records to read. See [Lexicons - target\_collection](../guides/lexicons#target-collection).
* The record-type lexicon hasn't finished backfilling. Check backfill status with `GET /admin/backfill/status` or the dashboard.
* Records exist on the network but HappyView hasn't indexed them yet. Jetstream only delivers events from after the collection was added to the filter. Use [backfill](../guides/backfill) to import historical records.

### [Procedure returns 401 Unauthorized](#procedure-returns-401-unauthorized)

**Symptom**: `POST /xrpc/your.method.name` returns `{"error": "..."}` with status 401.

**Causes**:

* No `Authorization: DPoP` header or `X-Client-Key` header is present.
* The DPoP proof is invalid or expired.
* The API client key is not registered or is inactive.

### [Admin endpoints return 403 Forbidden](#admin-endpoints-return-403-forbidden)

**Symptom**: Admin API calls return `{"error": "forbidden"}`.

**Causes**:

* Your DID is not in the users table. Ask an existing user with `users:create` permission to add you via `POST /admin/users`.
* If this is a fresh deployment with no users, the first authenticated request to any admin endpoint automatically bootstraps you as the super user. Make sure you're logged in via the dashboard or using a valid API key.
* You may be in the users table but lack the required permission for the endpoint you're calling. Check your permissions with `GET /admin/users` or ask a user with `users:update` permission to grant the permission you need.

### [Permission denied errors](#permission-denied-errors)

**Symptom**: Admin API calls return `{"error": "insufficient permissions"}` with status 403, even though you can access other endpoints.

**Causes**:

* Your user account doesn't have the specific permission required by the endpoint. Each endpoint requires a specific permission — see the [permissions table](../api-reference/admin/admin-api#permissions).
* If using an API key, the key's effective permissions are the intersection of the key's permissions and your user permissions. A key can never have more access than the user who created it.
* Only the super user can call `POST /admin/users/transfer-super`. This endpoint cannot be accessed with any permission — it requires super user status.

### [Lua script errors](#lua-script-errors)

**Symptom**: An XRPC endpoint returns `{"error": "script execution failed"}` or `{"error": "script exceeded execution time limit"}`.

**What to do**:

1. Check the server logs: the full error message is logged at error level but not exposed to the client.
2. Use `log("message")` in your script to trace execution. Output appears in server logs at debug level (requires `RUST_LOG` to include debug).
3. If you hit the execution limit, your script likely has an infinite loop or is processing too much data. See [Lua Scripting - Sandbox](../guides/lua-scripting#sandbox).

See [Lua Scripting - Debugging](../guides/lua-scripting#debugging) for more.

### [Backfill job stuck in "pending" or "running"](#backfill-job-stuck-in-pending-or-running)

**Symptom**: A backfill job doesn't progress or stays in `pending`.

**Causes**:

* The backfill worker processes one job at a time. If another job is running, yours will wait.
* The relay (`RELAY_URL`) may be unreachable or slow to respond. Check connectivity.
* Individual PDS fetches can fail silently. The worker logs warnings and continues. Check server logs for details.

See [Backfill](../guides/backfill) for how the process works.

### [Records not appearing in real time](#records-not-appearing-in-real-time)

**Symptom**: New records created on the network don't show up in queries.

**Causes**:

* HappyView receives real-time events via [Jetstream](https://github.com/bluesky-social/jetstream). Verify the `JETSTREAM_URL` is reachable and check server logs for `jetstream.disconnected` events.
* No record-type lexicon exists for the collection. HappyView only indexes collections that have a corresponding record-type lexicon.
* The Jetstream subscription hasn't reconnected with the new collection filter after a lexicon change. This should happen automatically. Check server logs for connection errors.

### [Lua script can't find records](#lua-script-cant-find-records)

**Symptom**: `db.query` or `db.get` returns empty results inside a Lua script, even though the admin dashboard shows records exist.

**Causes**:

* The `collection` global is only set when the lexicon has a `target_collection`. If you're using `db.raw` with a hardcoded collection name, double-check the spelling matches exactly.
* `db.get` expects a full AT URI (`at://did:plc:abc/collection/rkey`), not just an rkey.
* If querying by DID, make sure you're passing the full DID string including the `did:plc:` or `did:web:` prefix.

### [Plugin secrets not working](#plugin-secrets-not-working)

**Symptom**: A plugin fails with authentication errors even though you've configured its secrets.

**Causes**:

* `TOKEN_ENCRYPTION_KEY` is not set. Plugin secrets are encrypted at rest and cannot be read without this key. See [Plugins - Configuration](../guides/plugins#plugin-configuration).
* If `TOKEN_ENCRYPTION_KEY` changed since the secrets were saved, the existing encrypted values are unreadable. Re-enter the secrets via the dashboard or `PUT /admin/plugins/{id}/secrets`.
* Environment variable secrets (`PLUGIN_<ID>_<KEY>`) are overridden by dashboard-configured secrets. If you've set both, the dashboard values take precedence.

### [OAuth or login issues](#oauth-or-login-issues)

HappyView handles atproto OAuth internally via the `atrium-oauth` library. If users can't log in:

1. Verify `PUBLIC_URL` is set correctly and the URL is publicly accessible (required for OAuth callbacks).
2. Check that the user's PDS authorization server is reachable.
3. Verify `SESSION_SECRET` hasn't changed since sessions were created (changing it invalidates all existing dashboard sessions).
4. Check server logs for OAuth-specific error messages.

### [Third-party app can't authenticate](#third-party-app-cant-authenticate)

**Symptom**: A third-party app using DPoP authentication gets 401 errors on XRPC endpoints.

**Causes**:

* The app hasn't registered an API client. Every XRPC request needs an `X-Client-Key` header with a valid `hvc_`-prefixed client key. Register one via **Settings > API Clients** or `POST /admin/api-clients`.
* The DPoP proof is malformed or expired. Proofs include a timestamp and are valid for a short window.
* The API client has been deactivated (`is_active: false`). Re-enable it via the dashboard or `PUT /admin/api-clients/{id}`.

### [Database connection errors](#database-connection-errors)

**Symptom**: HappyView fails to start or returns 500 errors.

**Causes**:

* `DATABASE_URL` is not set or points to an unreachable Postgres instance.
* The database user doesn't have sufficient permissions. HappyView needs to create tables (migrations run automatically on startup).
* Postgres version is too old. HappyView requires Postgres 17+.

See [Configuration](../getting-started/configuration) for environment variable details.

### [Switching databases loses data](#switching-databases-loses-data)

**Symptom**: After changing `DATABASE_URL` from SQLite to Postgres (or vice versa), all records, lexicons, and users are gone.

**Explanation**: Each database is independent. Switching `DATABASE_URL` points HappyView at a fresh database. Your old data is still in the previous database file or Postgres instance.

**Recovery**: Re-upload your lexicons and run backfills to re-index records from the network. Admin settings, users, and API keys need to be re-created manually. See the [SQLite → Postgres](../guides/database/sqlite-to-postgres-migration) or [Postgres → SQLite](../guides/database/postgres-to-sqlite-migration) migration guides.

### [Jetstream disconnects frequently](#jetstream-disconnects-frequently)

**Symptom**: Server logs show repeated `jetstream.disconnected` / `jetstream.connected` events.

**Causes**:

* Network instability between HappyView and the Jetstream server. Verify `JETSTREAM_URL` is reachable.
* The default Jetstream instance may be under heavy load. Consider pointing `JETSTREAM_URL` at a different instance if available.
* HappyView reconnects automatically and resumes from its last cursor, so brief disconnections don't cause data loss. Prolonged outages may require a backfill to catch up on missed records.

[Meilisearch Sync

Previous Page](/reference/script-examples/meilisearch-sync)[HappyView

Next Page](/reference/changelog)

#### On this page

[XRPC endpoint returns 404](#xrpc-endpoint-returns-404)[Queries return empty results](#queries-return-empty-results)[Procedure returns 401 Unauthorized](#procedure-returns-401-unauthorized)[Admin endpoints return 403 Forbidden](#admin-endpoints-return-403-forbidden)[Permission denied errors](#permission-denied-errors)[Lua script errors](#lua-script-errors)[Backfill job stuck in "pending" or "running"](#backfill-job-stuck-in-pending-or-running)[Records not appearing in real time](#records-not-appearing-in-real-time)[Lua script can't find records](#lua-script-cant-find-records)[Plugin secrets not working](#plugin-secrets-not-working)[OAuth or login issues](#oauth-or-login-issues)[Third-party app can't authenticate](#third-party-app-cant-authenticate)[Database connection errors](#database-connection-errors)[Switching databases loses data](#switching-databases-loses-data)[Jetstream disconnects frequently](#jetstream-disconnects-frequently)

---
<!--
URL: https://happyview.dev/guides/plugins
title: Plugins | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Plugins

## Plugins

HappyView uses WASM plugins to extend its functionality. Plugins can integrate with external platforms, sync data to users' atproto identities, and more. Auth plugins — the first supported plugin type — enable users to link accounts from platforms like Steam, Xbox, itch.io, and others, then sync data like game libraries.

Official plugins for Steam, Xbox, itch.io, and other platforms are available in the [happyview-plugins](https://tangled.org/gamesgamesgamesgames.games/happyview-plugins) repository.

### [Installing Plugins](#installing-plugins)

#### [Via Dashboard](#via-dashboard)

1. Go to **Settings > Plugins**
2. Click **Add Plugin**
3. Enter the URL to a plugin's `manifest.json` or `.wasm` file
4. Review the plugin details and click **Install Plugin**
5. Configure any required secrets using the settings button

#### [Via Environment Variables](#via-environment-variables)

Set `PLUGIN_URLS` to load plugins at startup:

```
PLUGIN_URLS=steam|https://example.com/plugins/steam/manifest.json
```

Format: `id|url` or `id|url|sha256:hash` (comma-separated for multiple).

#### [Via File System](#via-file-system)

Place plugins in the `./plugins/` directory:

```
plugins/
  steam/
    manifest.json
    plugin.wasm
```

### [Plugin Configuration](#plugin-configuration)

Plugins may require secrets (API keys, client credentials, etc.) to function. There are two ways to configure these:

#### [Dashboard Configuration](#dashboard-configuration)

Click the settings icon next to a plugin to enter secrets. These are encrypted using AES-256-GCM and stored in the database.

**Requires:** `TOKEN_ENCRYPTION_KEY` environment variable (base64-encoded 32-byte key).

Generate one with:

```
openssl rand -base64 32
```

#### [Environment Variables](#environment-variables)

Set secrets as environment variables with the `PLUGIN_<ID>_` prefix:

```
PLUGIN_STEAM_API_KEY=your-api-key
PLUGIN_XBOX_CLIENT_ID=your-client-id
PLUGIN_XBOX_CLIENT_SECRET=your-client-secret
```

These are only necessary if you can't configure variables via the dashboard. Dashboard-configured secrets take precedence over environment variables.

### [Security](#security)

* **Sandboxed execution**: Plugins run in isolated WASM environments
* **Limited host access**: Plugins can only call approved host functions (HTTP requests, KV storage, secrets, logging)
* **Encrypted storage**: OAuth tokens and secrets are encrypted at rest using AES-256-GCM
* **Scoped storage**: Plugin KV storage is isolated per-plugin and per-user
* **No filesystem access**: Plugins cannot access the host filesystem

### [Next steps](#next-steps)

* [Developing Plugins](developing-plugins) — create your own plugins with the WASM plugin API
* [Official plugins repository](https://tangled.org/gamesgamesgamesgames.games/happyview-plugins) — ready-to-use plugins for Steam, Xbox, itch.io, and more
* [API Keys](./api-keys) — authenticate programmatic access to admin endpoints
* [Permissions](./permissions) — configure user access to plugin management

[Labelers

Previous Page](/guides/labelers)[Developing Plugins

Next Page](/guides/developing-plugins)

#### On this page

[Installing Plugins](#installing-plugins)[Via Dashboard](#via-dashboard)[Via Environment Variables](#via-environment-variables)[Via File System](#via-file-system)[Plugin Configuration](#plugin-configuration)[Dashboard Configuration](#dashboard-configuration)[Environment Variables](#environment-variables)[Security](#security)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/api-reference/admin/admin-api
title: Overview | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Overview

Admin API

## Overview

The admin API lets you manage lexicons, monitor records, run backfill jobs, and control user access. All endpoints live under `/admin` and require authentication from a DID that exists in the `happyview_users` table, with the appropriate [permissions](../../guides/permissions) for the endpoint being called. You can also manage all of this through the [web dashboard](../../getting-started/dashboard).

### [Auth](#auth)

The admin API supports three authentication methods:

1. **API keys** — read/write tokens starting with `hv_`, passed as `Authorization: Bearer hv_...`. See the [API Keys guide](../../guides/api-keys) for details.
2. **Service auth JWT** — atproto inter-service authentication via signed JWTs.
3. **Cookie-based session auth** — signed session cookies set during the dashboard OAuth login flow. The [web dashboard](../../getting-started/dashboard) uses this method.

In all cases the resolved DID is checked against the `happyview_users` table, and the user's permissions are loaded to authorize the request.

**Auto-bootstrap**: If the `happyview_users` table is empty, the first authenticated request automatically creates the caller as the **super user** with all permissions granted.

Non-user DIDs receive a `403 Forbidden` response. Users without the required permission for a specific endpoint also receive `403 Forbidden`.

### [Errors](#errors)

All error responses return JSON with an `error` field:

```
{
  "error": "description of what went wrong"
}
```

| Status | Meaning |
| --- | --- |
| `400 Bad Request` | Invalid input (missing required fields, malformed lexicon JSON) |
| `401 Unauthorized` | Missing or invalid API key or service auth JWT |
| `403 Forbidden` | Authenticated DID is not in the users table, or user lacks the required permission |
| `404 Not Found` | Lexicon, user, or backfill job not found |

```

## All examples assume $TOKEN is an API key (hv_...)

AUTH="Authorization: Bearer $TOKEN"
```

### [Endpoint groups](#endpoint-groups)

| Group | Description |
| --- | --- |
| [Lexicons](lexicons) | Upload, list, get, and delete lexicons and network lexicons |
| [Stats](stats) | Record counts by collection |
| [Backfill](backfill) | Create and monitor historical backfill jobs |
| [Event Logs](events) | Query the audit trail of system events |
| [API Keys](api-keys) | Create, list, and revoke API keys |
| [Users](users) | Create, list, update, and delete admin users |
| [Labelers](labelers) | Manage external labeler subscriptions |
| [Records](records) | List and delete indexed records |
| [Instance Settings](settings) | Configure app name, logo, policy URLs, and concurrency settings |
| [Domains](domains) | Manage domains and their OAuth client identities |
| [Scripts](scripts) | Create, list, update, and delete Lua scripts |
| [Script Variables](script-variables) | Encrypted key/value pairs for Lua scripts |
| [API Clients](api-clients) | Register and manage third-party XRPC clients |
| [Plugins](plugins) | Install, configure, and manage WASM plugins |
| [Dead Letters](dead-letters) | List, inspect, dismiss, retry, and reindex dead-lettered events |
| [Service Identity](service-identity) | Get and update service identity configuration |
| [Service Entries](service-entries) | Manage service entries and their XRPC bindings |
| [Verification Methods](verification-methods) | Create, list, and delete DID verification methods |
| [Feature Flags](feature-flags) | List feature flag status |
| [Permissions](permissions) | List available permission definitions |

### [Permissions](#permissions)

Each admin API endpoint requires a specific permission. See the [Permissions guide](../../guides/permissions) for the full list of permissions and templates.

| Endpoint | Required Permission |
| --- | --- |
| `POST /admin/lexicons` | `lexicons:create` |
| `GET /admin/lexicons` | `lexicons:read` |
| `GET /admin/lexicons/{id}` | `lexicons:read` |
| `DELETE /admin/lexicons/{id}` | `lexicons:delete` |
| `POST /admin/network-lexicons` | `lexicons:create` |
| `GET /admin/network-lexicons` | `lexicons:read` |
| `DELETE /admin/network-lexicons/{id}` | `lexicons:delete` |
| `GET /admin/stats` | `stats:read` |
| `POST /admin/backfill` | `backfill:create` |
| `GET /admin/backfill/status` | `backfill:read` |
| `POST /admin/backfill/{id}/cancel` | `backfill:create` |
| `POST /admin/backfill/{id}/pause` | `backfill:create` |
| `POST /admin/backfill/{id}/resume` | `backfill:create` |
| `GET /admin/backfill/{id}/events` | `backfill:read` |
| `GET /admin/backfill/{id}/repos` | `backfill:read` |
| `GET /admin/backfill/{id}/pds-summary` | `backfill:read` |
| `DELETE /admin/backfill/{id}/details` | `backfill:create` |
| `DELETE /admin/backfill/details` | `backfill:create` |
| `GET /admin/events` | `events:read` |
| `POST /admin/api-keys` | `api-keys:create` |
| `GET /admin/api-keys` | `api-keys:read` |
| `DELETE /admin/api-keys/{id}` | `api-keys:delete` |
| `POST /admin/users` | `users:create` |
| `GET /admin/users` | `users:read` |
| `GET /admin/users/{id}` | `users:read` |
| `PATCH /admin/users/{id}/permissions` | `users:update` |
| `DELETE /admin/users/{id}` | `users:delete` |
| `POST /admin/users/transfer-super` | Super user only |
| `GET /admin/script-variables` | `script-variables:read` |
| `POST /admin/script-variables` | `script-variables:create` |
| `DELETE /admin/script-variables/{key}` | `script-variables:delete` |
| `GET /admin/scripts` | `scripts:read` |
| `POST /admin/scripts` | `scripts:manage` |
| `GET /admin/scripts/{id}` | `scripts:read` |
| `PATCH /admin/scripts/{id}` | `scripts:manage` |
| `DELETE /admin/scripts/{id}` | `scripts:manage` |
| `POST /admin/labelers` | `labelers:create` |
| `GET /admin/labelers` | `labelers:read` |
| `PATCH /admin/labelers/{did}` | `labelers:create` |
| `DELETE /admin/labelers/{did}` | `labelers:delete` |
| `GET /admin/records` | `records:read` |
| `GET /admin/records/collections` | `records:read` |
| `DELETE /admin/records` | `records:delete` |
| `DELETE /admin/records/collection` | `records:delete-collection` |
| `GET /admin/settings` | `settings:manage` |
| `GET /admin/settings/db-info` | `settings:manage` |
| `PUT /admin/settings/{key}` | `settings:manage` |
| `DELETE /admin/settings/{key}` | `settings:manage` |
| `PUT /admin/settings/logo` | `settings:manage` |
| `DELETE /admin/settings/logo` | `settings:manage` |
| `GET /admin/plugins` | `plugins:read` |
| `POST /admin/plugins` | `plugins:create` |
| `POST /admin/plugins/preview` | `plugins:read` |
| `GET /admin/plugins/official` | `plugins:read` |
| `DELETE /admin/plugins/{id}` | `plugins:delete` |
| `POST /admin/plugins/{id}/reload` | `plugins:create` |
| `POST /admin/plugins/{id}/check-update` | `plugins:read` |
| `GET /admin/plugins/{id}/secrets` | `plugins:read` |
| `PUT /admin/plugins/{id}/secrets` | `plugins:create` |
| `GET /admin/domains` | `settings:manage` |
| `POST /admin/domains` | `settings:manage` |
| `DELETE /admin/domains/{id}` | `settings:manage` |
| `POST /admin/domains/{id}/primary` | `settings:manage` |
| `GET /admin/api-clients` | `api-clients:view` |
| `POST /admin/api-clients` | `api-clients:create` |
| `GET /admin/api-clients/{id}` | `api-clients:view` |
| `PUT /admin/api-clients/{id}` | `api-clients:edit` |
| `DELETE /admin/api-clients/{id}` | `api-clients:delete` |
| `GET /admin/dead-letters` | `dead-letters:read` |
| `GET /admin/dead-letters/count` | `dead-letters:read` |
| `GET /admin/dead-letters/{id}` | `dead-letters:read` |
| `POST /admin/dead-letters/{id}/dismiss` | `dead-letters:manage` |
| `POST /admin/dead-letters/{id}/retry` | `dead-letters:manage` |
| `POST /admin/dead-letters/{id}/reindex` | `dead-letters:manage` |
| `POST /admin/dead-letters/bulk/dismiss` | `dead-letters:manage` |
| `POST /admin/dead-letters/bulk/retry` | `dead-letters:manage` |
| `POST /admin/dead-letters/bulk/reindex` | `dead-letters:manage` |
| `GET /admin/service-identity` | `settings:manage` |
| `PUT /admin/service-identity` | `settings:manage` |
| `GET /admin/service-entries` | `settings:manage` |
| `POST /admin/service-entries` | `settings:manage` |
| `PUT /admin/service-entries/{id}` | `settings:manage` |
| `DELETE /admin/service-entries/{id}` | `settings:manage` |
| `GET /admin/service-entries/{id}/xrpcs` | `settings:manage` |
| `POST /admin/service-entries/{id}/xrpcs` | `settings:manage` |
| `DELETE /admin/service-entries/{id}/xrpcs` | `settings:manage` |
| `POST /admin/service-entries/sync-plc` | `settings:manage` |
| `POST /admin/service-entries/sync-plc/request` | `settings:manage` |
| `POST /admin/service-entries/sync-plc/submit` | `settings:manage` |
| `GET /admin/lexicons/{id}/services` | `settings:manage` |
| `GET /admin/verification-methods` | `settings:manage` |
| `POST /admin/verification-methods` | `settings:manage` |
| `DELETE /admin/verification-methods/{fragment_id}` | `settings:manage` |
| `GET /admin/feature-flags` | `settings:manage` |
| `GET /admin/network-lexicons/resolve/{nsid}` | `lexicons:read` |
| `GET /admin/permissions` | `users:read` |
| `GET /admin/settings/xrpc-proxy` | `settings:manage` |
| `PUT /admin/settings/xrpc-proxy` | `settings:manage` |

[XRPC API

Previous Page](/api-reference/xrpc-api)[Lexicons

Next Page](/api-reference/admin/lexicons)

#### On this page

[Auth](#auth)[Errors](#errors)[Endpoint groups](#endpoint-groups)[Permissions](#permissions)

---
<!--
URL: https://happyview.dev/reference/changelog
title: HappyView | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

HappyView

## HappyView

### [v2.10.2](#v2102)

*Released 2026-06-30*

#### [Bug Fixes](#bug-fixes)

* out-of-order migrations (for real this time) ([eef213e](https://github.com/gamesgamesgamesgamesgames/happyview/commit/eef213e4e344c298b7005fbd7fee74fb2dc51885))

### [v2.10.1](#v2101)

*Released 2026-06-30*

#### [Bug Fixes](#bug-fixes-1)

* out-of-order migrations ([044c03f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/044c03f7e792556333fc4f2928350b1d28060f2a))

### [v2.10.0](#v2100)

*Released 2026-06-30*

#### [Bug Fixes](#bug-fixes-2)

* add better reporting and proper resume on backfills ([bdd9bc9](https://github.com/gamesgamesgamesgamesgames/happyview/commit/bdd9bc9711ab10cf34c1950a8831ead688366b85))
* add better retry logic for backfills ([d4ae6a7](https://github.com/gamesgamesgamesgamesgames/happyview/commit/d4ae6a727e297e4b55c84bf0682035c6ff07ec11))
* add permissions to the internal API ([87a19e9](https://github.com/gamesgamesgamesgamesgames/happyview/commit/87a19e9e27c726a651fbe4a6ae62cfa01eb77410))
* add permissions to the internal API ([a119510](https://github.com/gamesgamesgamesgamesgames/happyview/commit/a119510f2929d62c8fd63e5175cac87246a48d34))
* add reauth button for service identity ([a2907d9](https://github.com/gamesgamesgamesgamesgames/happyview/commit/a2907d9e0f76584f681fa985da9d290517496536))
* add reauth button for service identity ([c72c398](https://github.com/gamesgamesgamesgamesgames/happyview/commit/c72c3985e020cb3a34f425582566d0e87571c42b))
* add reauth button for service identity ([6b3e797](https://github.com/gamesgamesgamesgamesgames/happyview/commit/6b3e7977c12711bf26b3e8c5c931f36130008cf9))
* add success and dead-letter logging to label scripts ([c6d7bca](https://github.com/gamesgamesgamesgamesgames/happyview/commit/c6d7bcabb6e85e11efdc8568db77de18e788226d))
* address copilot feedback ([bc135cd](https://github.com/gamesgamesgamesgamesgames/happyview/commit/bc135cdc9fb07799e929423c507d3840405e479a))
* allow docker containers to execute HappyView binaries ([d1da97b](https://github.com/gamesgamesgamesgamesgames/happyview/commit/d1da97b34897ac59e1d49ed75b45addad6f91204))
* allow log verbosity toggle to override env var ([fe191ce](https://github.com/gamesgamesgamesgamesgames/happyview/commit/fe191ceeb58c4f3db3f3bffc43326236b2f9187a))
* allow sheets to be much larger ([2b379cc](https://github.com/gamesgamesgamesgamesgames/happyview/commit/2b379ccb05872dad08125025779952944a97f99f))
* allow sheets to be much larger ([efd6140](https://github.com/gamesgamesgamesgamesgames/happyview/commit/efd6140c6f4d9c8ef8a34c8051b51bb5e98a8cd8))
* better handling for PDS errors ([0ac3e2c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/0ac3e2c524c7075937fe91f8d73e076a650972ec))
* better icons for stages ([c633f09](https://github.com/gamesgamesgamesgamesgames/happyview/commit/c633f09c942f20a25be47ec219a26f24edb28026))
* better pool size accounting when using sqlite ([e023d39](https://github.com/gamesgamesgamesgamesgames/happyview/commit/e023d39d4b4035970921bc8bc8abba45bdc6e895))
* build SDKs even if base client has no changes ([b3f2dad](https://github.com/gamesgamesgamesgamesgames/happyview/commit/b3f2dada416acb338976abbe9bae2b8d92f634e6))
* bulk insert in discovery, seed records on resume, dedupe retry helper, add cancel tests ([4e74bcd](https://github.com/gamesgamesgamesgamesgames/happyview/commit/4e74bcd03373acfaad7181219e747034a5194058))
* chunk bulk inserts for sqlite, use rows\_affected for counts, faster cancel checks, users page a11y ([2947a90](https://github.com/gamesgamesgamesgamesgames/happyview/commit/2947a908ba5251a43346c727cc7c508bc0cc67d8))
* clamp backfill concurrency values ([de42a7f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/de42a7f1b20ec60fd15f1f0b5cdad47dd19d0887))
* cleanup broken sessions ([7c4ad56](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7c4ad56c44084e2d5ffb77d613f4d9209ed5b3c8))
* cleanup derelict items after successful auth ([6c76088](https://github.com/gamesgamesgamesgamesgames/happyview/commit/6c760888cd7aa3df88cc65f14d9e6043b3dc7ecc))
* **dead-letters:** admin endpoints span both legacy + new tables ([e720b2b](https://github.com/gamesgamesgamesgamesgames/happyview/commit/e720b2be0e3abe07c30f0966f4b1cd24cf73910f))
* delegate to backend for network lexicon resolution ([606c752](https://github.com/gamesgamesgamesgamesgames/happyview/commit/606c752a79229845c9936709d7140a327524c4f4)), closes [#49](https://github.com/gamesgamesgamesgamesgames/happyview/issues/49)
* display sync warning after refresh ([17a5f03](https://github.com/gamesgamesgamesgamesgames/happyview/commit/17a5f03921952d568335a2e3b79b41a1b81d013d))
* display sync warning after refresh ([e599a1f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/e599a1f0315ef51e6fae110b5b3ef24b4f31ce41))
* display sync warning after refresh ([2833ab3](https://github.com/gamesgamesgamesgamesgames/happyview/commit/2833ab3eac4b90d2262e108420db9c7141c574e8))
* dont block space creds on client key check ([6108edd](https://github.com/gamesgamesgamesgamesgames/happyview/commit/6108edd94f1121e665d7fe61a980334e76ab0a01))
* dont refresh tokens on 4xx status codes ([ca5b6a5](https://github.com/gamesgamesgamesgamesgames/happyview/commit/ca5b6a5539c202a644e9fa547e28d5e8ab67dff7))
* dont use use timestamptz in migrations (Ill remember that... one day) ([24320ba](https://github.com/gamesgamesgamesgamesgames/happyview/commit/24320bada562f38a4970e960f69e25017facf1f2))
* dynamic cookie security handling and harden tests for service proxies ([9732a21](https://github.com/gamesgamesgamesgamesgames/happyview/commit/9732a21c1b9b3b390b06ca86eb08039b5cd1a2cb))
* dynamic cookie security handling and harden tests for service proxies ([d609358](https://github.com/gamesgamesgamesgamesgames/happyview/commit/d609358e166bf613830cf54c1f28572a8cb9e507))
* dynamic cookie security handling and harden tests for service proxies ([584eeeb](https://github.com/gamesgamesgamesgamesgames/happyview/commit/584eeeba1755ea4a4d17366cfc77023395476d27))
* expose approved oauth scopes to clients ([0a5b826](https://github.com/gamesgamesgamesgamesgames/happyview/commit/0a5b826a3eaa62abe448bf85a84663df36350815))
* expose oauth scopes via the SDKs ([ae69736](https://github.com/gamesgamesgamesgamesgames/happyview/commit/ae69736cdb6323c46e2b8e746940d5e9ac8685c0))
* filter nesting was allowed to 6 levels instead of 5 ([59b9d5b](https://github.com/gamesgamesgamesgamesgames/happyview/commit/59b9d5bda167dd7d41f13983f398553b01de54d8))
* fix base path not being respected by trailing slash redirects ([2d1d60d](https://github.com/gamesgamesgamesgamesgames/happyview/commit/2d1d60dd9f1b3b18fa21dcdb13c95e936cdd21ac))
* generate missing IDs for dead letters ([671a753](https://github.com/gamesgamesgamesgamesgames/happyview/commit/671a753f772a8bcbf25d7c5e1a7656b7ee7abc9c)), closes [#20](https://github.com/gamesgamesgamesgamesgames/happyview/issues/20)
* get max connections from Postgres instead of current connections ([79e794c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/79e794c04720890c97493b7221b6134e631d8fe8))
* handle reauthenticating to service entry accounts ([2c83781](https://github.com/gamesgamesgamesgamesgames/happyview/commit/2c837814a9daad7536b32ebc36eb3abdc1b04379))
* handle reauthenticating to service entry accounts ([3234b9c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3234b9cb7389ab3ac404f9f4eb89d6ce63df8b42))
* handle reauthenticating to service entry accounts ([feac3d0](https://github.com/gamesgamesgamesgamesgames/happyview/commit/feac3d074134fcfe59cee54ff94e8df1ea40f800))
* handle the scope format returned from Bluesky PDS ([2066c7f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/2066c7f76ea2af14670c547e42d13364b3275b03))
* harden backfill cancel idempotency, SQL injection guard, DID retry cap, and row a11y ([92c8a98](https://github.com/gamesgamesgamesgamesgames/happyview/commit/92c8a982b8c6089bc5581cff3a7f867b2ad36a5c))
* harden the setup wizard ([a210849](https://github.com/gamesgamesgamesgamesgames/happyview/commit/a210849f6f3ce44d208dd0e9bf0bc37d775d134c))
* harden the setup wizard ([ed663f6](https://github.com/gamesgamesgamesgamesgames/happyview/commit/ed663f6103c368d5606ba17dc7fe72e542ed4e7b))
* harden the setup wizard ([13c855b](https://github.com/gamesgamesgamesgamesgames/happyview/commit/13c855bfad847d572d16fe57d402e48cc44a1f66))
* issues with backfill stage/status separation and progress tracking ([6da4ac8](https://github.com/gamesgamesgamesgamesgames/happyview/commit/6da4ac8dc59204cda0c3152e082cd3ba91ebdb52))
* make backfill progress headings more accessible ([4e80754](https://github.com/gamesgamesgamesgamesgames/happyview/commit/4e807547fa2e58c542bf8e70cf16b66f41472317))
* make the service entry dashboard more user friendly ([c5111c7](https://github.com/gamesgamesgamesgamesgames/happyview/commit/c5111c73ed382ac79f600f1ae1c3687551013c91))
* make the service entry dashboard more user friendly ([78d097f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/78d097f2d9970c8ce23bbd538d584bc678d34cee))
* make the service entry dashboard more user friendly ([6e0d59e](https://github.com/gamesgamesgamesgamesgames/happyview/commit/6e0d59e16a31e2bcba58057e613746b913787fd5))
* move record info into sheets ([d129d26](https://github.com/gamesgamesgamesgamesgames/happyview/commit/d129d2667f1db871e59ae599f31f853c8d628e6e))
* move user permission management into sheets ([e79b9f1](https://github.com/gamesgamesgamesgamesgames/happyview/commit/e79b9f17c9ab7731fb077ba749b19f09ce9ed19b)), closes [#23](https://github.com/gamesgamesgamesgamesgames/happyview/issues/23)
* move user permission management into sheets ([1d8b400](https://github.com/gamesgamesgamesgamesgames/happyview/commit/1d8b4001e1b71d358e7ae22e318947889366db93)), closes [#23](https://github.com/gamesgamesgamesgamesgames/happyview/issues/23)
* only count successful PDS resolutions, cap retry-after, update backfill docs ([f53e545](https://github.com/gamesgamesgamesgamesgames/happyview/commit/f53e545f6829ecba1584e2596f1dcd7be245959f))
* port service entry design optimisations to other pages ([1485f4b](https://github.com/gamesgamesgamesgamesgames/happyview/commit/1485f4ba745443d7eaddcb5fe856b160729d71b5))
* port service entry design optimisations to other pages ([bba3a20](https://github.com/gamesgamesgamesgamesgames/happyview/commit/bba3a20f7bbbed675c68c8acd416f2e8538edaac))
* port service entry design optimisations to other pages ([8d8b92e](https://github.com/gamesgamesgamesgamesgames/happyview/commit/8d8b92e9c96cd8785e9f81992345cb09b950ff73))
* post-conflict resolution cleanup ([b4676f1](https://github.com/gamesgamesgamesgamesgames/happyview/commit/b4676f1f955fa38b88b6741fb6b74a38e1a17cb4))
* prevent backfill jobs from locking locking out pause/cancellation ([92e0a21](https://github.com/gamesgamesgamesgamesgames/happyview/commit/92e0a21a5874952890cb410dbef5fbc70ff5d18e))
* prevent base path collision ([4ae8c29](https://github.com/gamesgamesgamesgamesgames/happyview/commit/4ae8c292c9d8e47e59f6051fd83660d7a08bd7fd))
* prevent concurrency settings from being set to invalid values ([c5b4b87](https://github.com/gamesgamesgamesgamesgames/happyview/commit/c5b4b8751aa4ebdac6555673aba88ab33ab5691d))
* prevent creation of API clients that would break HappyView core client ([cd10300](https://github.com/gamesgamesgamesgamesgames/happyview/commit/cd1030022148af3dc410da21a93cf90d2dbcc5e9))
* prevent dead letters from being created without an ID ([50a3786](https://github.com/gamesgamesgamesgamesgames/happyview/commit/50a378624dcd78a6ff0de35808ccfb1580bf70b8)), closes [#20](https://github.com/gamesgamesgamesgamesgames/happyview/issues/20)
* prevent errors with IPv6 addresses when building loopback clients ([23e858b](https://github.com/gamesgamesgamesgamesgames/happyview/commit/23e858b449e613df460f5d1c67d3f2c7a31f3d39))
* prevent false match rewrites when a base path is in use ([2a9bc80](https://github.com/gamesgamesgamesgamesgames/happyview/commit/2a9bc80dea4e56b9dd69e09d21e23e40c7f1020e))
* prevent opening "discovering trepos stage" from locking the ui thread ([13e2e63](https://github.com/gamesgamesgamesgamesgames/happyview/commit/13e2e638edbee1c2206cdf21fe5ac32d3d2a7cc4))
* prevent reprocessing of sse ([c56bc77](https://github.com/gamesgamesgamesgamesgames/happyview/commit/c56bc779af0552b2db3d123bda23967331f98492))
* prevent unauthenticated users from being redirected to setup ([fe3529b](https://github.com/gamesgamesgamesgamesgames/happyview/commit/fe3529b12d6c5c737487a5b573f2f8c54d995599))
* prevent unauthenticated users from being redirected to setup ([66413a7](https://github.com/gamesgamesgamesgamesgames/happyview/commit/66413a73e176ae53c132bfeebc4434944f1079c6))
* prevent unauthenticated users from being redirected to setup ([98af6e4](https://github.com/gamesgamesgamesgamesgames/happyview/commit/98af6e4f225623c6b13eb898a43ca7561b385b43))
* prevent unauthorized privilege escalation ([4f97576](https://github.com/gamesgamesgamesgamesgames/happyview/commit/4f9757617240c706315c137a6be317f5176b7d8f))
* rate-limit unauthenticated procedure requests before rejecting ([79ea8ef](https://github.com/gamesgamesgamesgamesgames/happyview/commit/79ea8ef059bb096fe4da4f78972176cdba122961))
* reduce backfill db contention and sse event flooding for pds discovery and record fetching during backfill ([9a3b93d](https://github.com/gamesgamesgamesgamesgames/happyview/commit/9a3b93d4d5f50033df63a23ae96ad5ef2b688591))
* reject JWT at exact expiry second ([aadf092](https://github.com/gamesgamesgamesgamesgames/happyview/commit/aadf092a9ede51ef2660e0e8b58fffb08dd4a5b1))
* remove broken timestamping ([908efca](https://github.com/gamesgamesgamesgamesgames/happyview/commit/908efca88eed4ff197ea98f77b4b0a456da042c8))
* remove broken timestamping ([b9ba42d](https://github.com/gamesgamesgamesgamesgames/happyview/commit/b9ba42d744c864bde25c0b9065f8886540604a58))
* remove broken timestamping ([3cbe22e](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3cbe22eafa3e866d7d3b39ef52d5f1307cc3936f))
* remove cleanup delay caused by tick eater ([aa5e842](https://github.com/gamesgamesgamesgamesgames/happyview/commit/aa5e842a62cd9b4acdd294821dc83466472cf505))
* remove clippy suppression ([4db01f0](https://github.com/gamesgamesgamesgamesgames/happyview/commit/4db01f009d89665acd207308ace3526bba1e536c))
* remove counts from records dropdowns ([6be8848](https://github.com/gamesgamesgamesgamesgames/happyview/commit/6be88485284a0ec2559c79e4603fe2fad8a131b6))
* remove duplicate exports in api.ts from merge ([a4f990f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/a4f990f6c129f547d00a4dc8a2c61bd9a88d82af))
* remove forced HappyView redirect URI from API client creation ([849f097](https://github.com/gamesgamesgamesgamesgames/happyview/commit/849f0970494f90141b8585d52ecbe8f6c15d94f0))
* remove oauth redirect hop, and add explicit redirect for the root url ([59cbd39](https://github.com/gamesgamesgamesgamesgames/happyview/commit/59cbd39842111a6cea18cddbe615bdceb222136c))
* remove prefix typo from db.query filter generation ([230b4d4](https://github.com/gamesgamesgamesgamesgames/happyview/commit/230b4d440b39cc9cb880511232d9f1b8e9b2d797))
* remove public record aggregation from permissioned spaces ([55cf1b6](https://github.com/gamesgamesgamesgamesgames/happyview/commit/55cf1b65304d68d7af5e48f212ae67a4aba72b5c))
* remove public record aggregation from permissioned spaces ([34c630c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/34c630c355be06116192f9f8a733903a8bf55525))
* remove public record aggregation from permissioned spaces ([55afaaf](https://github.com/gamesgamesgamesgamesgames/happyview/commit/55afaaffe129cce2c89422d3ddc11ca1dfc8e795))
* remove route dupes ([12241ab](https://github.com/gamesgamesgamesgamesgames/happyview/commit/12241abe11858650216e3bebf0d6d9b13841741c))
* remove superfluous early exit on invalid session token (pds concern, not happyview concern) ([c274314](https://github.com/gamesgamesgamesgamesgames/happyview/commit/c274314de6a4718962f14b3786c210c5d74d2158))
* replace the base path sentinel in next.js text files ([5e128a4](https://github.com/gamesgamesgamesgamesgames/happyview/commit/5e128a41e5e3e3534324ce95a855609f73afcd75))
* require client key for rate limiting on all XRPC routes ([8c578de](https://github.com/gamesgamesgamesgamesgames/happyview/commit/8c578deb6d9c5222320aa83a54ffa25fc76ba0b2))
* reset backfill ui when flushing details ([a83a4fa](https://github.com/gamesgamesgamesgamesgames/happyview/commit/a83a4fad11b4a06bebc90a9780d630298ca72163))
* restore `granted_at` default in migrations ([b4759e9](https://github.com/gamesgamesgamesgamesgames/happyview/commit/b4759e991be28fe8f5dfe7e84099e3d24898884c))
* restore missing log events for verbose logging ([d52b31b](https://github.com/gamesgamesgamesgamesgames/happyview/commit/d52b31b88a2107a81c674c64045140dd20f08450))
* restore plc concurrency ([ffdd110](https://github.com/gamesgamesgamesgamesgames/happyview/commit/ffdd1109645d3e14dccccdbfaabdaf8f85a59e8b))
* restore SDK scopes types after bad conflict resolution ([44986ab](https://github.com/gamesgamesgamesgamesgames/happyview/commit/44986ab404043780ad838cfc35da16b0cda664ae))
* restrict Bearer space credentials to space XRPC routes ([2598b58](https://github.com/gamesgamesgamesgamesgames/happyview/commit/2598b58138612a11ac06942ad347f4889eb308d4))
* return 404 when dismissing a nonexistent dead letter ([909f6f5](https://github.com/gamesgamesgamesgamesgames/happyview/commit/909f6f5c5ae801daf275fcab5e89d45de67421d3))
* scopes types in oauth-client sdk after bad conflict resolution ([d49033e](https://github.com/gamesgamesgamesgamesgames/happyview/commit/d49033ec5f8e35538e5ce31a71619e39053fd0f4))
* **sdk:** support the `kid` param from `@atproto/jwk-webcrypto` ([8a09489](https://github.com/gamesgamesgamesgamesgames/happyview/commit/8a094893395c1894c00484b1ca692ff053f85f32))
* separate backfill db connection pool from main app pool ([dfa0d38](https://github.com/gamesgamesgamesgamesgames/happyview/commit/dfa0d38368ce830232fd4dcd9942d08ded1bd5e0))
* update column type in backfill migration ([3618d9f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3618d9f3deb1737dcb0f40aa10a7a494003ed3f8))
* update scopes type ([635bcd6](https://github.com/gamesgamesgamesgamesgames/happyview/commit/635bcd6d812670f949611ff96c81aa9f56795f9a))
* update the base path rewrite to skip Nexts basePath config ([8470d66](https://github.com/gamesgamesgamesgamesgames/happyview/commit/8470d665808e94c7d8b4c7aed20a286163e116f1))
* use correct permission IDs in dashboard ([cf4a984](https://github.com/gamesgamesgamesgamesgames/happyview/commit/cf4a9849bb46151804b7b34136b980f3c5910105)), closes [#24](https://github.com/gamesgamesgamesgamesgames/happyview/issues/24)
* use correct permission IDs in dashboard ([a37a254](https://github.com/gamesgamesgamesgamesgames/happyview/commit/a37a25479677a03ddb7044444fd563ce79c7217a)), closes [#24](https://github.com/gamesgamesgamesgamesgames/happyview/issues/24)
* use cursors for pagination in spaces endpoints ([7bb7eb6](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7bb7eb6c2c14d70b4de248c3143004b64ca1b685))
* use dpop thumbprints to enable multi-device auth ([28f7fa6](https://github.com/gamesgamesgamesgamesgames/happyview/commit/28f7fa6430c1e29705c64d3c4f69c1f9b9a37eb9))
* use NULL instead of empty string for local-only record CID ([55e65f7](https://github.com/gamesgamesgamesgamesgames/happyview/commit/55e65f764324d051486e5e0c50da75744bccbbac))
* use stateRef pattern in ScriptForm to avoid exhaustive-deps suppression ([c8e5d5c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/c8e5d5cc9646ba485ea5a2045bed5917cdaee6af))
* use the correct connection pool for record upserts ([81a63c8](https://github.com/gamesgamesgamesgamesgames/happyview/commit/81a63c87f6f97ff1153cd9acb5fb3760042de94b))
* use the correct cursors when paginating spaces ([8b65ff6](https://github.com/gamesgamesgamesgamesgames/happyview/commit/8b65ff662a1a0c0efa1109dc56af38cfe039fd00))
* virtualize backfill details and move event stream into a worker ([c741e75](https://github.com/gamesgamesgamesgamesgames/happyview/commit/c741e7507c4830f9d3304a3e35b9da6e39abc621))

#### [Features](#features)

* add `filter` to `db.query` ([8b1ae86](https://github.com/gamesgamesgamesgamesgames/happyview/commit/8b1ae86e20aa02b9460a6336d3d8d87cd5525d08))
* add backfill concurrency settings ([67d3e35](https://github.com/gamesgamesgamesgamesgames/happyview/commit/67d3e35748a974e4bb94c0c9672dd43ed5148f1a))
* add blob upload and download utilities ([44ad24c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/44ad24cec34d030c9188dbcc5c4500148230040a))
* add collection column to dead\_letter\_scripts so we can ditch second-level filtering ([64b1031](https://github.com/gamesgamesgamesgamesgames/happyview/commit/64b10310b4258ecfe5696c5169cf0fd2f2b3ae39))
* add control for experiments to the dashboard ([6adb5ee](https://github.com/gamesgamesgamesgamesgames/happyview/commit/6adb5ee97b6f2d3380c7a84a87651700211b0f63))
* add control for experiments to the dashboard ([de7a94e](https://github.com/gamesgamesgamesgamesgames/happyview/commit/de7a94ed01400abfa8d4a7ff562db670e117c45c))
* add control for experiments to the dashboard ([3d3d7c7](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3d3d7c7a450cb89b5f09046e54182b4c25e45e0a))
* add more detailed information to backfill UI ([5d891b9](https://github.com/gamesgamesgamesgamesgames/happyview/commit/5d891b975c2c57d73c0e26d70bbfc451bafc44ae))
* add new TID functions ([523e19f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/523e19f636d8509685c44cc71f0429458c855ea8)), closes [#16](https://github.com/gamesgamesgamesgamesgames/happyview/issues/16)
* add oauth-client-node SDK ([488a6df](https://github.com/gamesgamesgamesgamesgames/happyview/commit/488a6df874404dfe2fc121c5599331ead8750900))
* add suffix filter to GET /admin/scripts and use it in lexicon detail ([5eda38c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/5eda38cfdf5691d38c2ab5857217e8345907c78d))
* add support for nexted syntax in field selectors ([4f2e027](https://github.com/gamesgamesgamesgamesgames/happyview/commit/4f2e0279b3dc8872019ac87a238d635fe7f3b726))
* add support for service proxying ([d5fa751](https://github.com/gamesgamesgamesgamesgames/happyview/commit/d5fa75169be6ceb1581ffb9835f098966c0db76e))
* add support for service proxying ([86d915c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/86d915c3f4efb67df84f0b15193070d67d7441ef))
* add support for service proxying ([d16ca01](https://github.com/gamesgamesgamesgamesgames/happyview/commit/d16ca0198e2f6c1f84d0de5a842eaa553f76f2ae))
* add support for session hooks ([e1a6b00](https://github.com/gamesgamesgamesgamesgames/happyview/commit/e1a6b004cabfaacd68c9b81e7a29327214554a61))
* allow backfill jobs to be paused and resumed ([25084fb](https://github.com/gamesgamesgamesgamesgames/happyview/commit/25084fb6095fe06d59bc1f428829cd3e8bdf76f9))
* allow backfills to be cancelled ([953c786](https://github.com/gamesgamesgamesgamesgames/happyview/commit/953c786b98468f7f939feb51608535439f80525b))
* allow the base path to be configured ([ee8e541](https://github.com/gamesgamesgamesgamesgames/happyview/commit/ee8e541830ee12af01e7b75f526331131bbaaeda))
* **dashboard:** scripts grouped by trigger family + lexicon targeting panel ([678da37](https://github.com/gamesgamesgamesgamesgames/happyview/commit/678da370c73b445e267b8d8ba4d8fedaec190ae4))
* increase backfill record batch inserts ([9238884](https://github.com/gamesgamesgamesgamesgames/happyview/commit/92388847ce7c12ac49aa0b04a1bc9a6be5f13245))
* make backfill collection discovery concurrent ([231a734](https://github.com/gamesgamesgamesgamesgames/happyview/commit/231a7346c3dd63ef41d05f1ef131d1fe1fef02d3))
* make verbose event logs configurable ([2d7f51e](https://github.com/gamesgamesgamesgamesgames/happyview/commit/2d7f51ec4f5f4e7905e5e249adee62c0eb2d20dd))
* migrate legacy script/index\_hook data to scripts table and drop columns ([1a37d14](https://github.com/gamesgamesgamesgamesgames/happyview/commit/1a37d148a3cf2d4d1658e52c0f492ff9c22def81))
* parallelize PDS resolution and record retrieval during backfills ([a480799](https://github.com/gamesgamesgamesgamesgames/happyview/commit/a48079997997c047f84ef176048d22bf74331e4a))
* permissioned spaces implementation ([693d678](https://github.com/gamesgamesgamesgamesgames/happyview/commit/693d67801ef9b2de8f4f8b4816ee558f1aaa9793))
* permissioned spaces implementation ([6b3d542](https://github.com/gamesgamesgamesgamesgames/happyview/commit/6b3d542ec60e19887b2a1589b0b5b8526ef2b666))
* publish node sdk ([705c575](https://github.com/gamesgamesgamesgamesgames/happyview/commit/705c575f568c1f1523a4a7c27c1a41fa41ff24b2))
* recommend restart when backfill concurrency settings dont match existing connection pool size ([30b97ef](https://github.com/gamesgamesgamesgamesgames/happyview/commit/30b97ef674f2de08773951eb35b068b7426f152a))
* refactor permissioned spaces to better align with Dan's implementation ([7eb4a03](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7eb4a03799f9fb70ee6f2ebf34e2112d398f20c5))
* refactor permissioned spaces to better align with Dan's implementation ([16c3c60](https://github.com/gamesgamesgamesgamesgames/happyview/commit/16c3c6000bf40f214b2ea97563be04ca2fe72cf5))
* **scripts:** promote log() to write into event\_logs ([fb9dfaa](https://github.com/gamesgamesgamesgamesgames/happyview/commit/fb9dfaa1dc3daf1e401b652a17b48042a4709a26))
* **scripts:** trigger-keyed scripts subsystem ([fe4f84f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/fe4f84f1eebdd7aea006c056576e54981f379e5a))
* update JS SDKs to more closely match their [@atproto](https://github.com/atproto) cousins ([77c2083](https://github.com/gamesgamesgamesgamesgames/happyview/commit/77c2083f860681f925ce0cc76742bf1a9ca384a1))
* update JS SDKs to more closely match their [@atproto](https://github.com/atproto) cousins ([357a5d3](https://github.com/gamesgamesgamesgamesgames/happyview/commit/357a5d3b6f6d911bd8c3dfa772baecbb5694c808))
* update JS SDKs to more closely match their [@atproto](https://github.com/atproto) cousins ([df717e9](https://github.com/gamesgamesgamesgamesgames/happyview/commit/df717e9d5a175f7eaae14ae3e7afb36956fa9007))
* update to latest permissioned data spec ([f3875b2](https://github.com/gamesgamesgamesgamesgames/happyview/commit/f3875b2535a455ae4f25e7845114c4d006324717))
* **xrpc-proxy:** add settings to control the XRPC proxy ([63f22d6](https://github.com/gamesgamesgamesgamesgames/happyview/commit/63f22d66afbecd8733c2085eed5de3ea72e566df))
* **xrpc-proxy:** add settings to control the XRPC proxy ([a89d00f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/a89d00f934134df3ef58f880f264b9e11bb431ab))

### [v2.9.2](#v292)

*Released 2026-05-27*

#### [Bug Fixes](#bug-fixes-3)

* dont use use timestamptz in migrations (Ill remember that... one day) ([b131010](https://github.com/gamesgamesgamesgamesgames/happyview/commit/b1310106ef144caeb1ed37ce288539273305b067))

### [v2.9.1](#v291)

*Released 2026-05-27*

#### [Bug Fixes](#bug-fixes-4)

* restore `granted_at` default in migrations ([2b6ca58](https://github.com/gamesgamesgamesgamesgames/happyview/commit/2b6ca58007eb6f4663e9a9ce526c045b8f9da6f2))

### [v2.9.0](#v290)

*Released 2026-05-27*

#### [Bug Fixes](#bug-fixes-5)

* add success and dead-letter logging to label scripts ([c74e317](https://github.com/gamesgamesgamesgamesgames/happyview/commit/c74e31798b96577933718676adb17c7ada7d52ef))
* allow docker containers to execute HappyView binaries ([9265641](https://github.com/gamesgamesgamesgamesgames/happyview/commit/926564103417a45390f7f99c46ba07ed2a4c06c2))
* allow log verbosity toggle to override env var ([e8268c4](https://github.com/gamesgamesgamesgamesgames/happyview/commit/e8268c4038d3724492895253aa0686aa06b8202b))
* better pool size accounting when using sqlite ([3a0fb9c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3a0fb9cb18b6afd901e428c3e70976978706e673))
* clamp backfill concurrency values ([9c2847a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/9c2847ae2e3d3ff80117ee8cdd69341a9a17f471))
* **dead-letters:** admin endpoints span both legacy + new tables ([4a576ea](https://github.com/gamesgamesgamesgamesgames/happyview/commit/4a576ea814834f185c7a5df95d7ab34f55266bff))
* filter nesting was allowed to 6 levels instead of 5 ([698c099](https://github.com/gamesgamesgamesgamesgames/happyview/commit/698c099211eb053bf2d4f24cb60c0fed107b3a23))
* get max connections from Postgres instead of current connections ([66b4804](https://github.com/gamesgamesgamesgamesgames/happyview/commit/66b4804a7db626aabc27e354b5fb6da1c0ed4a9e))
* make backfill progress headings more accessible ([f83f150](https://github.com/gamesgamesgamesgamesgames/happyview/commit/f83f15009187196dadb81fbf86f213ec2981ec9b))
* post-conflict resolution cleanup ([02e6e1a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/02e6e1a3e19797ffad63011bd4f881c6eb73fb01))
* prevent backfill jobs from locking locking out pause/cancellation ([62adab0](https://github.com/gamesgamesgamesgamesgames/happyview/commit/62adab05522156e4146fc32e6d36182033908127))
* prevent concurrency settings from being set to invalid values ([3d31877](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3d31877d207916c2170150357e423d237f793eac))
* prevent opening "discovering trepos stage" from locking the ui thread ([016b0e5](https://github.com/gamesgamesgamesgamesgames/happyview/commit/016b0e529445031bc2481285b2c534eb9da4cd2a))
* prevent reprocessing of sse ([ce68c66](https://github.com/gamesgamesgamesgamesgames/happyview/commit/ce68c6694b2cc0f5d2789b938133577c5bc1de6b))
* reduce backfill db contention and sse event flooding for pds discovery and record fetching during backfill ([ec860a5](https://github.com/gamesgamesgamesgamesgames/happyview/commit/ec860a528ce455f3c743913dbbf0a1d01b1f9c95))
* remove cleanup delay caused by tick eater ([bd745ae](https://github.com/gamesgamesgamesgamesgames/happyview/commit/bd745ae7d501251c40398065a40c7b9e69698502))
* remove clippy suppression ([6a34d5f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/6a34d5f3ba13ac6c006081e0373b02ce759f1dc4))
* remove counts from records dropdowns ([dd6d9ae](https://github.com/gamesgamesgamesgamesgames/happyview/commit/dd6d9ae9452b45f9f0cfd23fd8419914a2b3aa87))
* remove prefix typo from db.query filter generation ([cd411d6](https://github.com/gamesgamesgamesgamesgames/happyview/commit/cd411d6aeec0919729901c12258349a4292400f8))
* remove superfluous early exit on invalid session token (pds concern, not happyview concern) ([bc06766](https://github.com/gamesgamesgamesgamesgames/happyview/commit/bc06766fc9760ee6a61457dd3b433f907bc4ea4d))
* reset backfill ui when flushing details ([1cf8f75](https://github.com/gamesgamesgamesgamesgames/happyview/commit/1cf8f751eb20365e0a92ad48044d364a4f0d88ea))
* restore missing log events for verbose logging ([d38d05d](https://github.com/gamesgamesgamesgamesgames/happyview/commit/d38d05d672e0f692c013565cc49a32e7dd4cbd8f))
* restore plc concurrency ([3aa10b5](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3aa10b525c4486db29d596f5a434e3f8b4991169))
* return 404 when dismissing a nonexistent dead letter ([280a837](https://github.com/gamesgamesgamesgamesgames/happyview/commit/280a83783ec809509fa9294bdc1d20ad97908cf7))
* **sdk:** support the `kid` param from `@atproto/jwk-webcrypto` ([e12f526](https://github.com/gamesgamesgamesgamesgames/happyview/commit/e12f526835555e9126e4657446cdc4cec9945fbf))
* separate backfill db connection pool from main app pool ([c14a168](https://github.com/gamesgamesgamesgamesgames/happyview/commit/c14a168d5a7d531a965997ac724dddbaea1ac7af))
* use dpop thumbprints to enable multi-device auth ([454d239](https://github.com/gamesgamesgamesgamesgames/happyview/commit/454d23956d9bac6ad559eba71124f86642c576f5))
* use NULL instead of empty string for local-only record CID ([21952d7](https://github.com/gamesgamesgamesgamesgames/happyview/commit/21952d79ee9a37a67baba590080911ed5ad5254a))
* use stateRef pattern in ScriptForm to avoid exhaustive-deps suppression ([4bcb0b1](https://github.com/gamesgamesgamesgamesgames/happyview/commit/4bcb0b13cae8ce88ff9309bbe1680627a3d61029))
* use the correct connection pool for record upserts ([22f3ba9](https://github.com/gamesgamesgamesgamesgames/happyview/commit/22f3ba92acecba1c84b4355871eb617003f7a7ea))
* virtualize backfill details and move event stream into a worker ([3e33527](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3e33527c1c0c49d500c79c292228fe9b83f5b6e3))

#### [Features](#features-1)

* add `filter` to `db.query` ([18a01fd](https://github.com/gamesgamesgamesgamesgames/happyview/commit/18a01fdf436a71b2f4b6bd73672f2008ae05f880))
* add backfill concurrency settings ([f5ab1b4](https://github.com/gamesgamesgamesgamesgames/happyview/commit/f5ab1b4a69451b589851fec1ce9cc66ec187ef62))
* add collection column to dead\_letter\_scripts so we can ditch second-level filtering ([7283c21](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7283c21d7a52f1a3d66f479adb682c73d642861a))
* add more detailed information to backfill UI ([66fe12a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/66fe12ac0ea1d2f87c6642fedcd4d56027b272d2))
* add suffix filter to GET /admin/scripts and use it in lexicon detail ([527aed3](https://github.com/gamesgamesgamesgamesgames/happyview/commit/527aed388c630ef058bddfa127f8873c2dc0f72c))
* add support for nexted syntax in field selectors ([950594b](https://github.com/gamesgamesgamesgamesgames/happyview/commit/950594bb5d12eb7fefe3cc21a76ade00c242f675))
* allow backfill jobs to be paused and resumed ([bd65caf](https://github.com/gamesgamesgamesgamesgames/happyview/commit/bd65caf32eafcc42ef65aae68559bae03b9f22a4))
* **dashboard:** scripts grouped by trigger family + lexicon targeting panel ([735e104](https://github.com/gamesgamesgamesgamesgames/happyview/commit/735e1047c42db5fa550dbe6fd330b54c181a43d0))
* increase backfill record batch inserts ([7ff501a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7ff501afe91b8f45e0c7c34bf016a989ae0d36f5))
* make backfill collection discovery concurrent ([060cba3](https://github.com/gamesgamesgamesgamesgames/happyview/commit/060cba303f392233554f1744ea4714ec09c51fa5))
* make verbose event logs configurable ([4856579](https://github.com/gamesgamesgamesgamesgames/happyview/commit/485657997b901f08725385921798b26c253b6e70))
* migrate legacy script/index\_hook data to scripts table and drop columns ([44cdc21](https://github.com/gamesgamesgamesgamesgames/happyview/commit/44cdc2162014bbdf09d4a04db72532e18943cfe9))
* parallelize PDS resolution and record retrieval during backfills ([8f21474](https://github.com/gamesgamesgamesgamesgames/happyview/commit/8f21474dbdefd550d4a39c2d4afdc9576779d217))
* recommend restart when backfill concurrency settings dont match existing connection pool size ([b0d382b](https://github.com/gamesgamesgamesgamesgames/happyview/commit/b0d382b2979a2d1f0fbc4976e06db8011bc7bfd8))
* **scripts:** promote log() to write into event\_logs ([673de09](https://github.com/gamesgamesgamesgamesgames/happyview/commit/673de0972700ad9ece1a4e9dcf899395fd438587))
* **scripts:** trigger-keyed scripts subsystem ([0fd7601](https://github.com/gamesgamesgamesgamesgames/happyview/commit/0fd76010212e3ce87057b3a32268b0ae5822326b))

### [v2.8.1](#v281)

*Released 2026-05-19*

#### [Bug Fixes](#bug-fixes-6)

* delegate to backend for network lexicon resolution ([afde802](https://github.com/gamesgamesgamesgamesgames/happyview/commit/afde8027d224e67d8c8b9425ea86bb88cd9ec2d9)), closes [#49](https://github.com/gamesgamesgamesgamesgames/happyview/issues/49)

### [v2.8.0](#v280)

*Released 2026-05-14*

#### [Bug Fixes](#bug-fixes-7)

* add better reporting and proper resume on backfills ([33b56e5](https://github.com/gamesgamesgamesgamesgames/happyview/commit/33b56e5b226c4903d3538366fbc4a6313c5c8cfe))
* add better retry logic for backfills ([a751352](https://github.com/gamesgamesgamesgamesgames/happyview/commit/a75135214de9c066f0064b8c00040cbebdda4d96))
* add permissions to the internal API ([39d9465](https://github.com/gamesgamesgamesgamesgames/happyview/commit/39d9465d8fcca7eabf8146000fa98eaba3b05cbc))
* add permissions to the internal API ([2b8ec1c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/2b8ec1c1d9eec60b66b0fc25ecd665179847bb73))
* allow sheets to be much larger ([dced566](https://github.com/gamesgamesgamesgamesgames/happyview/commit/dced56697a5aed830de2e9a6122b916f5c275f9c))
* allow sheets to be much larger ([7f49a77](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7f49a77771b70acc076fb6d6e1613a652c994b20))
* better icons for stages ([47ee0b0](https://github.com/gamesgamesgamesgamesgames/happyview/commit/47ee0b0583a0f66ea9a133d019c4411317618b22))
* build SDKs even if base client has no changes ([f86de63](https://github.com/gamesgamesgamesgamesgames/happyview/commit/f86de6398aa0e0fc1cf264a22127336b63cb1753))
* bulk insert in discovery, seed records on resume, dedupe retry helper, add cancel tests ([274ab01](https://github.com/gamesgamesgamesgamesgames/happyview/commit/274ab01d24a71f5fddb8da1c65c02623e4603104))
* chunk bulk inserts for sqlite, use rows\_affected for counts, faster cancel checks, users page a11y ([f25ade7](https://github.com/gamesgamesgamesgamesgames/happyview/commit/f25ade7675cc356babba5ce05030f64e37f4e1df))
* harden backfill cancel idempotency, SQL injection guard, DID retry cap, and row a11y ([25f0955](https://github.com/gamesgamesgamesgamesgames/happyview/commit/25f095520d4190fd93c8e2466e2de6ce1e639c7e))
* issues with backfill stage/status separation and progress tracking ([54d8e28](https://github.com/gamesgamesgamesgamesgames/happyview/commit/54d8e28229c986745c8a09c07a5aedc69aff610f))
* move user permission management into sheets ([7e6a1f1](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7e6a1f111ead434de8f08d001c323ee555c9f313)), closes [#23](https://github.com/gamesgamesgamesgamesgames/happyview/issues/23)
* move user permission management into sheets ([32942fb](https://github.com/gamesgamesgamesgamesgames/happyview/commit/32942fb2d4b71465ccfadd62d0f64f8df72d0e6c)), closes [#23](https://github.com/gamesgamesgamesgamesgames/happyview/issues/23)
* only count successful PDS resolutions, cap retry-after, update backfill docs ([cb3797e](https://github.com/gamesgamesgamesgamesgames/happyview/commit/cb3797e918cae1860083acb04c676e4f65dea5e9))
* update column type in backfill migration ([81c4ea8](https://github.com/gamesgamesgamesgamesgames/happyview/commit/81c4ea84c1f0cccc5027ea4141286f414af2b1a3))
* use correct permission IDs in dashboard ([b258408](https://github.com/gamesgamesgamesgamesgames/happyview/commit/b258408121613bc9d6f29587a23011c4872cc4be)), closes [#24](https://github.com/gamesgamesgamesgamesgames/happyview/issues/24)
* use correct permission IDs in dashboard ([66c792f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/66c792f87e20615abcfe50a487a246add3ff4e8a)), closes [#24](https://github.com/gamesgamesgamesgamesgames/happyview/issues/24)
* use cursors for pagination in spaces endpoints ([3e6c561](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3e6c561d2202ca9986281b8a2d200eafb911784e))

#### [Features](#features-2)

* allow backfills to be cancelled ([5a3a4b9](https://github.com/gamesgamesgamesgamesgames/happyview/commit/5a3a4b92b966cadf33efe21b3c8d62c1ba2b6c47))

### [v2.7.0](#v270)

*Released 2026-05-13*

#### [Bug Fixes](#bug-fixes-8)

* generate missing IDs for dead letters ([174b6ef](https://github.com/gamesgamesgamesgamesgames/happyview/commit/174b6ef084fc4684b3b20902714e3530757cf3ec)), closes [#20](https://github.com/gamesgamesgamesgamesgames/happyview/issues/20)
* move record info into sheets ([b814b1c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/b814b1ce29ed33bf5c6c3a341bfee99afd747a1d))
* prevent dead letters from being created without an ID ([ea4a340](https://github.com/gamesgamesgamesgamesgames/happyview/commit/ea4a340c4b7dc5cc2e3154974c8e5aba5510efbe)), closes [#20](https://github.com/gamesgamesgamesgamesgames/happyview/issues/20)

#### [Features](#features-3)

* publish node sdk ([d81e23c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/d81e23cec7152d14dace745301cbafa10638f67c))

### [v2.6.0](#v260)

*Released 2026-05-12*

#### [Bug Fixes](#bug-fixes-9)

* cleanup broken sessions ([8840ac0](https://github.com/gamesgamesgamesgamesgames/happyview/commit/8840ac05b83da48b90c626777b4e044ef14d9e08))
* cleanup derelict items after successful auth ([9fe1989](https://github.com/gamesgamesgamesgamesgames/happyview/commit/9fe1989140df60a1b02a531d488e2a4c957046ef))
* dont block space creds on client key check ([07c6065](https://github.com/gamesgamesgamesgamesgames/happyview/commit/07c6065bdfe00fe0b778aabe2d6f1bb00aa61f0b))
* fix base path not being respected by trailing slash redirects ([fba918e](https://github.com/gamesgamesgamesgamesgames/happyview/commit/fba918ebf8a079feeb302a1ed6bbb9c5c5eac57c))
* prevent base path collision ([4f5a8ef](https://github.com/gamesgamesgamesgamesgames/happyview/commit/4f5a8ef572613f0db314dbb774d8dd8ae622193a))
* prevent creation of API clients that would break HappyView core client ([3ab5e7e](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3ab5e7e56f89138071d5fe3a1f43f24e9d066011))
* prevent errors with IPv6 addresses when building loopback clients ([df77c02](https://github.com/gamesgamesgamesgamesgames/happyview/commit/df77c025024b9eba1ab9011742545cfab5ea1bc9))
* prevent false match rewrites when a base path is in use ([73078bf](https://github.com/gamesgamesgamesgamesgames/happyview/commit/73078bf370f5f73a0375b441388f8d491efac550))
* prevent unauthorized privilege escalation ([942a520](https://github.com/gamesgamesgamesgamesgames/happyview/commit/942a520f4ddb1dabb78b014ac1beee3f871a66f0))
* rate-limit unauthenticated procedure requests before rejecting ([abd9e3d](https://github.com/gamesgamesgamesgamesgames/happyview/commit/abd9e3daf3ff8333ecdaa5ec6318fc61cd6ed67c))
* reject JWT at exact expiry second ([27f9cf8](https://github.com/gamesgamesgamesgamesgames/happyview/commit/27f9cf893e87cb3a97856ff2d84d04c45ab213e8))
* remove duplicate exports in api.ts from merge ([deffbd7](https://github.com/gamesgamesgamesgamesgames/happyview/commit/deffbd7cdc6314aa2d59c112bdf19f2406526c47))
* remove forced HappyView redirect URI from API client creation ([572ca51](https://github.com/gamesgamesgamesgamesgames/happyview/commit/572ca514608fa65dbeb2a994b645a538d2912937))
* remove oauth redirect hop, and add explicit redirect for the root url ([fdb6fac](https://github.com/gamesgamesgamesgamesgames/happyview/commit/fdb6fac8581ccf6b0ee3478e49e60cc5a6d395ab))
* remove public record aggregation from permissioned spaces ([91684f3](https://github.com/gamesgamesgamesgamesgames/happyview/commit/91684f369eb71455783753229638bed19552ef1e))
* remove route dupes ([ec0f624](https://github.com/gamesgamesgamesgamesgames/happyview/commit/ec0f6242654d8951c3930663af21427b46d53102))
* replace the base path sentinel in next.js text files ([33028b1](https://github.com/gamesgamesgamesgamesgames/happyview/commit/33028b1fa69c47b7f87216fa1839c21797bff9c8))
* require client key for rate limiting on all XRPC routes ([671db5a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/671db5a01ea4131b8d38e0912d2ed5e12fb39170))
* restore SDK scopes types after bad conflict resolution ([2003680](https://github.com/gamesgamesgamesgamesgames/happyview/commit/20036807334f44d693a565b0fd33cabeec5b1c12))
* restrict Bearer space credentials to space XRPC routes ([d6ae5cd](https://github.com/gamesgamesgamesgamesgames/happyview/commit/d6ae5cd216c57fc32d56955d3eef03036f0d7100))
* scopes types in oauth-client sdk after bad conflict resolution ([fecc410](https://github.com/gamesgamesgamesgamesgames/happyview/commit/fecc4106c48be64b7cd38470dc44111e032509e6))
* update scopes type ([992e6e0](https://github.com/gamesgamesgamesgamesgames/happyview/commit/992e6e0ed93c94ad48e45f91fcae3d9b4e1f6a88))
* use the correct cursors when paginating spaces ([11fda6f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/11fda6f2a910c9c1ed1199c7ff904b1aa639abfd))

#### [Features](#features-4)

* add control for experiments to the dashboard ([b7bca04](https://github.com/gamesgamesgamesgamesgames/happyview/commit/b7bca04f1c8cab8ff38c4e67c7db8b4d9abe7aa1))
* add new TID functions ([1f51965](https://github.com/gamesgamesgamesgamesgames/happyview/commit/1f51965134c4bc9a9faa16e4fdb802337858985e)), closes [#16](https://github.com/gamesgamesgamesgamesgames/happyview/issues/16)
* add oauth-client-node SDK ([4ea257c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/4ea257c49d9509739acfb1c12b7d8e1a5639f11a))
* add support for session hooks ([538d033](https://github.com/gamesgamesgamesgamesgames/happyview/commit/538d03380e1940789e67ce4c13e4f808680581f4))
* allow the base path to be configured ([a23efe6](https://github.com/gamesgamesgamesgamesgames/happyview/commit/a23efe6c9432bebef1caf5b0cea2754f9bd4b0c4))
* permissioned spaces implementation ([4ca2bd8](https://github.com/gamesgamesgamesgamesgames/happyview/commit/4ca2bd89a9f2bfe383857f571cd5a4d271f9b85a))
* refactor permissioned spaces to better align with Dan's implementation ([6db92e0](https://github.com/gamesgamesgamesgamesgames/happyview/commit/6db92e008d107a8b8dbc9568034c4eda36492ca0))
* update JS SDKs to more closely match their [@atproto](https://github.com/atproto) cousins ([1731533](https://github.com/gamesgamesgamesgamesgames/happyview/commit/173153345cca38ea0ac96469d68bd33ae75b09e9))
* **xrpc-proxy:** add settings to control the XRPC proxy ([267ab7a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/267ab7a0a31b8a9f385acef1b4142d81869cf648))

### [v2.5.2](#v252)

*Released 2026-05-08*

#### [Bug Fixes](#bug-fixes-10)

* better handling for PDS errors ([7863b43](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7863b4392c4e0d8676f08b60743e3d7577330255))
* expose approved oauth scopes to clients ([d49b6f5](https://github.com/gamesgamesgamesgamesgames/happyview/commit/d49b6f538d54a8649b1df742ec38436a09cbb258))
* expose oauth scopes via the SDKs ([bbcddd0](https://github.com/gamesgamesgamesgamesgames/happyview/commit/bbcddd08fd12105e1c047616cf84dc71a44bf9b7))
* update the base path rewrite to skip Nexts basePath config ([23227a1](https://github.com/gamesgamesgamesgamesgames/happyview/commit/23227a16a5e1a6a17c2ae411126a337842fe30c4))

### [v2.5.1](#v251)

*Released 2026-05-07*

#### [Bug Fixes](#bug-fixes-11)

* dont refresh tokens on 4xx status codes ([cde70f7](https://github.com/gamesgamesgamesgamesgames/happyview/commit/cde70f76adc50f69f21b8fcd0996e56e0f800f65))

### [v2.5.0 — v2.5.0 - The Permissioned Data Release](#v250--v250---the-permissioned-data-release)

*Released 2026-05-05*

#### [Bug Fixes](#bug-fixes-12)

* remove public record aggregation from permissioned spaces ([9ee009f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/9ee009fa3fe2dbcbb86ad741eb96172c00ddc25f))

#### [Features](#features-5)

* add control for experiments to the dashboard ([83df252](https://github.com/gamesgamesgamesgamesgames/happyview/commit/83df252a3d1d57e67c58b6e4e099642d40790c28))
* add support for account write delegation ([9026232](https://github.com/gamesgamesgamesgamesgames/happyview/commit/90262329a777a44cbb778facd700ea99aaca00ed))
* permissioned spaces implementation ([17cc659](https://github.com/gamesgamesgamesgamesgames/happyview/commit/17cc6593f9887164810c518810bd8f06ead48c6a))
* put permissioned spaces behind an experimental flag ([6b666d7](https://github.com/gamesgamesgamesgamesgames/happyview/commit/6b666d7f25374b36434a7accb08ff0571b383780))
* update JS SDKs to more closely match their [@atproto](https://github.com/atproto) cousins ([7b87c36](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7b87c36ffd9458942c321009b4a39013abb9cff7))
* **xrpc-proxy:** add settings to control the XRPC proxy ([53f63da](https://github.com/gamesgamesgamesgamesgames/happyview/commit/53f63dada520596765b401d726ba22f11b06b8ea))

### [v2.4.1](#v241)

*Released 2026-05-03*

#### [Bug Fixes](#bug-fixes-13)

* add atproto/lex headers to prevent CORS errors ([760e0aa](https://github.com/gamesgamesgamesgamesgames/happyview/commit/760e0aa17126383f86f0c201edc1d55d1f17fd0c))

### [v2.4.0](#v240)

*Released 2026-04-28*

#### [Bug Fixes](#bug-fixes-14)

* **ci:** temp disable ATCR pushes ([8ed28e5](https://github.com/gamesgamesgamesgamesgames/happyview/commit/8ed28e51080644c3dba5d6ff8f70b49da9e855e1))

#### [Features](#features-6)

* allow first party API clients to child API clients ([cdb69c4](https://github.com/gamesgamesgamesgamesgames/happyview/commit/cdb69c4b91910cf336f58c7ddaad7a4f8ddea64c))
* **dashboard:** warn users before they use `transition:generic` ([7d4c44a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7d4c44a74c0639f0eadd2daf6199ab56454b315f))
* **oauth:** move third party api client management into built-in XRPCs ([fde532d](https://github.com/gamesgamesgamesgamesgames/happyview/commit/fde532dc18139e16d5af39dca16130c9882c6501))

### [v2.3.1](#v231)

*Released 2026-04-27*

#### [Bug Fixes](#bug-fixes-15)

* **auth:** better handling for allowed scopes during oauth ([b27b883](https://github.com/gamesgamesgamesgamesgames/happyview/commit/b27b8835935ee07ba40e98e56dbab7ab8c0962f8))

### [v2.3.0](#v230)

*Released 2026-04-26*

#### [Features](#features-7)

* **login:** add handle autocomplete ([4ee385b](https://github.com/gamesgamesgamesgamesgames/happyview/commit/4ee385ba2513265bb94fc6000aecff37ecd429b3))

### [v2.2.0](#v220)

*Released 2026-04-25*

#### [Bug Fixes](#bug-fixes-16)

* **db:** convert dead letter resolved\_at to TEXT in Postgres setups ([deb4aee](https://github.com/gamesgamesgamesgamesgames/happyview/commit/deb4aeef93cb36d232f43517ee220b4c12f5c64d))

#### [Features](#features-8)

* **sdk:** allow client to configure clientId ([e76acbe](https://github.com/gamesgamesgamesgamesgames/happyview/commit/e76acbea356b453910ffdc6eaac78b42bfd2fd74))

### [v2.1.1](#v211)

*Released 2026-04-23*

#### [Bug Fixes](#bug-fixes-17)

* **sdk:** add gh links to packages ([718075a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/718075a53c7e69efecf24cc5c9989e600745a378))

### [v2.1.0](#v210)

*Released 2026-04-23*

#### [Bug Fixes](#bug-fixes-18)

* remove linked accounts page ([abe1c04](https://github.com/gamesgamesgamesgamesgames/happyview/commit/abe1c04e93906f177d79f2ab8a0fa4097e439a4b))

#### [Features](#features-9)

* **dashboard:** add UI for managing dead letters ([0345f0b](https://github.com/gamesgamesgamesgamesgames/happyview/commit/0345f0bcbd593b106a9db37fe9d5b620229473fd))

### [v2.0.1](#v201)

*Released 2026-04-22*

#### [Bug Fixes](#bug-fixes-19)

* **ci:** remove ATCR from publish step ([f58d189](https://github.com/gamesgamesgamesgamesgames/happyview/commit/f58d18962af012519bf18e064e1f233e05bc6d9f))

### [v2.0.0](#v200)

*Released 2026-04-22*

#### [Bug Fixes](#bug-fixes-20)

* add automatic handling for incompatible db.raw ([8a13fdf](https://github.com/gamesgamesgamesgamesgames/happyview/commit/8a13fdfd100d0843b52f5899e3fa990effff79b6))
* add CORS reflection for auth requests ([e813713](https://github.com/gamesgamesgamesgamesgames/happyview/commit/e813713a09f38966eec8d287526947404f244afd))
* allow HappyView redirect cookie to be read appropriately ([b69c59f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/b69c59ff08b1a16474aaf7ca3ff14f315903108b))
* allow session cookies to work cross origin ([494cb05](https://github.com/gamesgamesgamesgamesgames/happyview/commit/494cb058269e21aac7b25aac7be4892f4724f16c))
* **auth:** prevent unauthorized users from seeing the dashboard ([fcb3ac2](https://github.com/gamesgamesgamesgamesgames/happyview/commit/fcb3ac26e20f9fca4861f705f3eb245467a44103))
* backfill all collections when no collection is selected during backfill creation ([5cd2e01](https://github.com/gamesgamesgamesgamesgames/happyview/commit/5cd2e01bbab33ea26df2e12489d2b1485d416439))
* coerce query params based on lexicon schema ([38bd0d3](https://github.com/gamesgamesgamesgamesgames/happyview/commit/38bd0d357c482d863e9f9f4759de749d0d8ebf1f))
* convert plugin config to text column ([dade035](https://github.com/gamesgamesgamesgamesgames/happyview/commit/dade03519c20639d8263e3bcfdb36b8e94d73922))
* convert plugin timestamp columns ([9d190cb](https://github.com/gamesgamesgamesgamesgames/happyview/commit/9d190cbcb2cde1b3f215c045eeeac46b02319c48))
* copy migrations in image ([593d361](https://github.com/gamesgamesgamesgamesgames/happyview/commit/593d361d58eb574c6187ae3e2d806a1325bf63e6))
* create a dummy bin for the build step ([7741c8f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7741c8f0338c64bb8134c9fcac2af49ece72b807))
* **dashboard:** fix broken interactivity on collection combobox ([5cbfc3c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/5cbfc3c5f49db38e75dccb369d30d7aa1cd0db28))
* database column type mismatch ([3932db0](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3932db09c1f7247676656722faab284dd25ef15b))
* delete auth redirect cookie before redirecting ([2dd8b19](https://github.com/gamesgamesgamesgamesgames/happyview/commit/2dd8b19539fa14440d648463a79bee5fb1f650ac))
* delete auth redirect cookie before redirecting ([00d6b8f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/00d6b8f10217670153c53b57ed83453d0f5ffc61))
* display the correct version on the about page ([e6504fa](https://github.com/gamesgamesgamesgamesgames/happyview/commit/e6504fa438666c63d02f7027d6d421d1d6c16484))
* ditch redirect cookies in favor of storing redirect info in the db ([52caa37](https://github.com/gamesgamesgamesgamesgames/happyview/commit/52caa3708a24588f5d853a355a7c26d72db9ea09))
* dont skip HappyView in the external auth callbackloop ([210b326](https://github.com/gamesgamesgamesgamesgames/happyview/commit/210b3269332d427b9849e6f9cecbb8680ac21d10))
* ensure handles are always forced to lowercase during dashboard auth ([785b00f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/785b00f98c1e667aa1c2a3fe49a2ed02da0b903d))
* ensure oauth cookies are correctly removed ([7dc2443](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7dc244399de90165e0c861276a22c66780ab258f))
* **event-log:** prevent double filtering ([cf7a227](https://github.com/gamesgamesgamesgamesgames/happyview/commit/cf7a227a78f640ffc67ba0633cb31a8e21012c69))
* fix auth tests ([0036280](https://github.com/gamesgamesgamesgamesgames/happyview/commit/00362802383be38b29ebf99a1a2b70f666614281))
* http resolution for labeler websocket connections ([405e61a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/405e61ac7249e837834738339019960eaf58f21f))
* issue in redirect state capture ([9d95cee](https://github.com/gamesgamesgamesgamesgames/happyview/commit/9d95ceebe7440f23325dbbe0a5f817b65b999692))
* lint errors ([1436f4c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/1436f4ce8401736f330b7b08007ef1f7d876b071))
* lint issues ([de48479](https://github.com/gamesgamesgamesgamesgames/happyview/commit/de48479c758b4a5c4813821625aa2fa723a327fc))
* lint issues ([760f50a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/760f50a5eee6bfbc85bb19c7bd1a4d462fb96906))
* make sure auth is passed when necessary in lua scripts ([cdde018](https://github.com/gamesgamesgamesgamesgames/happyview/commit/cdde01846472d12c2c0a2ae6f7bf5fd3698b2996))
* missed a variable ref ([fc34c9c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/fc34c9c5727e29d6f4f3bb1694b2e35c1c2cc798))
* pin to debian bookworm, otherwise we have an issue with glibc version ([a9a62f0](https://github.com/gamesgamesgamesgamesgames/happyview/commit/a9a62f06712204e08ac666b1565d758865570b57))
* prevent code blocks from overflowing dialog containers ([0618e96](https://github.com/gamesgamesgamesgamesgames/happyview/commit/0618e9677f52a8089ec0791ca7e24c77373942e3))
* prevent errors on plugin page when user hasn't set up encryption tokens ([41aa70a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/41aa70ac4c666a0360c103fb57b0006bbd72bd5e))
* prevent permission redirects before permissions are known ([2b73757](https://github.com/gamesgamesgamesgamesgames/happyview/commit/2b737571d941569f6d7c6efc48e6397c90d5383a))
* prevent record backfill from blocking startup ([b502295](https://github.com/gamesgamesgamesgamesgames/happyview/commit/b502295c39e48366946b6d344db39e20d74b58e7))
* remove sqlite db from git ([134ae00](https://github.com/gamesgamesgamesgamesgames/happyview/commit/134ae004d8de2e03a5636003816f486a0e9a88fb))
* remove user swap ([deaa25a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/deaa25a356e3636baaa77d377b232de969db662c))
* resolve proper endpoints for labelers ([8e6575e](https://github.com/gamesgamesgamesgamesgames/happyview/commit/8e6575e9d0bc68dce13b30c04c1e81e331106275))
* restore reading scopes from redirect uri ([8e01945](https://github.com/gamesgamesgamesgamesgames/happyview/commit/8e019459dbb232b25842be79940a3de1939746fb))
* return the correct host data for plugin secrets ([937fa4c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/937fa4ceef05ca0e80d57bf89ba5428b3ca410e1))
* **sdk:** prevent CI crash if versions are already deployed ([3c4a6d0](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3c4a6d07b1da0e40c142df7baae76251f58dd793))
* **sdk:** take advantage of prior art on crypto from bsky ([7df0576](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7df0576080632d46b907d7587cbe79be8bbae62e))
* separate scopes on the api client page ([0bc0f95](https://github.com/gamesgamesgamesgamesgames/happyview/commit/0bc0f95d315393c96648fdcd80e373bf2bba8c52))
* switch from /oauth/client-metadata.json to /oauth-client-metadata.json ([b94f90f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/b94f90f0740244cb0d3b96ae9a19cd5c9c982ab9))
* switch Tap to sqlite by default ([ab7f97b](https://github.com/gamesgamesgamesgamesgames/happyview/commit/ab7f97b71c7326a7f243332beb58588fcb8b7387))
* sync plugin and host body types ([fd25cb2](https://github.com/gamesgamesgamesgamesgames/happyview/commit/fd25cb21507ea5c1363905fb896fdd43f84c711c))
* timestamp comparisons when using Postgres ([4bd8b2f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/4bd8b2fffa41075d1684030d5e7bbe7a2b4e51e1))
* update dashboard to use new internal auth ([68a1123](https://github.com/gamesgamesgamesgamesgames/happyview/commit/68a11233e6365a9ab0ea9cc24a2b0d3dd50ae6ab))
* update primary domain if PUBLIC\_URL changes ([5e93653](https://github.com/gamesgamesgamesgamesgames/happyview/commit/5e9365398843f011ef7ec00f2da9df553544d55e))
* update types for rate limits ([ab909d3](https://github.com/gamesgamesgamesgamesgames/happyview/commit/ab909d3e07e3ef2182d837f308b2b2fc75ea1c52))
* use async calls to get host secrets ([753a3af](https://github.com/gamesgamesgamesgamesgames/happyview/commit/753a3af554383b6a58cf04932685e39436f6313e))
* **xrpc:** fix XRPC writes to use the new auth system ([ed5434f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/ed5434f0af1bb7e8681eafa53d0a998d760d8658))

#### [Features](#features-10)

* add about page for debugging ([00e92b3](https://github.com/gamesgamesgamesgamesgames/happyview/commit/00e92b395e6a8df4cf62593d9103b7d1821dfe3e))
* add API clients ([3cd960b](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3cd960b828b8fa4bb55691c34fc5cca04d305161))
* add attestation support to atproto api ([fbd65b1](https://github.com/gamesgamesgamesgamesgames/happyview/commit/fbd65b1cddf2b2bc60d0ad6f78c1eef6eba46ea2))
* add backfill and realtime streaming directly to HappyView (no more Tap dependency) ([0bf605e](https://github.com/gamesgamesgamesgamesgames/happyview/commit/0bf605e6640835510d5f9a592c0ea3dd2015a1f2))
* add builtin oauth, removing AIP dependency ([14abcda](https://github.com/gamesgamesgamesgamesgames/happyview/commit/14abcda992db4c84868a99c079fbe797af57ce68))
* add config for oauth screen values ([0777d8c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/0777d8c6ffe3c907187dc970a4621262582db2e5))
* add configurable rate limiting ([ca65897](https://github.com/gamesgamesgamesgamesgames/happyview/commit/ca65897d6c5d73fa5033554da83d1860c22623ae))
* add js sdks ([3fd4645](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3fd4645aee26193a97f436d71cd5782ffbcce206))
* add labelers to the dashboard ([4ee83d8](https://github.com/gamesgamesgamesgamesgames/happyview/commit/4ee83d81597047ba9a5b675af154a2c265e89d44))
* add Lua module for atproto ([a34fb0d](https://github.com/gamesgamesgamesgamesgames/happyview/commit/a34fb0d30174064112e384b3276d050a0a2bbe14))
* add missing HappyView Lua APIs to autocomplete and hover docs ([14a1dae](https://github.com/gamesgamesgamesgamesgames/happyview/commit/14a1dae32e4c6bdbed95babae2a056ec46e4cae8))
* add oauth config ui ([6f09a58](https://github.com/gamesgamesgamesgamesgames/happyview/commit/6f09a58b06f39370727c55ae46debb6c4e18c507))
* add proper cursors and a separate index for backfill ([d9d0544](https://github.com/gamesgamesgamesgamesgames/happyview/commit/d9d0544f09814fa528aa1d3df892910ece5f254c))
* add rate limiting ([ec9f55a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/ec9f55a3442dc2f8ba4a4e15cd8ce30a7c08bf32)), closes [#3](https://github.com/gamesgamesgamesgamesgames/happyview/issues/3)
* add rate limiting + config ([7c47bcf](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7c47bcf7d69710cce5e0077836721ca2c89d0433))
* add safe subset of Lua's table ([d18eca4](https://github.com/gamesgamesgamesgamesgames/happyview/commit/d18eca40ebd01898331d7a396393f32e7db137b0))
* add support for API clients ([435737a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/435737a9db0134e6ba8798d0d64054f05bd17de9))
* add support for arbitrary oauth scopes ([22fddeb](https://github.com/gamesgamesgamesgamesgames/happyview/commit/22fddebe6f4511b027aff009bec4fcd1a41023e4))
* add support for labelers ([b8e6caa](https://github.com/gamesgamesgamesgamesgames/happyview/commit/b8e6caaa41fc191fd1ef7484789aca24749110ad))
* add support for multiple domains ([b5400c9](https://github.com/gamesgamesgamesgamesgames/happyview/commit/b5400c9bdf77f7e0fc0c2176b62cc7f91645a80d))
* add support for params to procedures ([fda2118](https://github.com/gamesgamesgamesgamesgames/happyview/commit/fda2118de89fea0c70a73070e448a93f3872622e))
* add support for plugin manifests and configuration via the dashboard ([acc735e](https://github.com/gamesgamesgamesgamesgames/happyview/commit/acc735e395ba4fe59af8f79419e910077c752c60))
* add support for redirect uri on auth ([1f590ef](https://github.com/gamesgamesgamesgamesgames/happyview/commit/1f590ef343d5e6d12d738c95a6bdb07db3f9f3d8))
* add support for sqlite ([0ba593c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/0ba593ce865605e77466c3bba72bfe3c213a66f7))
* add support for upgrading plugins ([0bf0673](https://github.com/gamesgamesgamesgamesgames/happyview/commit/0bf067327feef215e430800894dd09809f43a635))
* add the lex-agent sdk ([9481601](https://github.com/gamesgamesgamesgamesgames/happyview/commit/9481601cd539fe9016ef48afcc0ad3099ca14192))
* add user permissions ([89e3925](https://github.com/gamesgamesgamesgamesgames/happyview/commit/89e3925053ef3463cf87b3818f5b87442d2fa866))
* add xrpc libs for Lua ([d45bf70](https://github.com/gamesgamesgamesgamesgames/happyview/commit/d45bf70dc8d2aff74395d2237e68a49b824f768f))
* allow admin to change logo/document title for the dashboard ([b4b5534](https://github.com/gamesgamesgamesgamesgames/happyview/commit/b4b55348107d19df87c0f80c21b4ea80932558d5))
* allow plugins to be loaded dynamically ([9653984](https://github.com/gamesgamesgamesgamesgames/happyview/commit/9653984691711bc842bed648cac910f24d34b7ed))
* automate generation of attestatioon signing keys ([3b0d335](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3b0d33576f2ecb074ec7a63ab5e18310a2a8746e))
* complete plugin sync pipeline with auth, tokens, and PDS writes ([7cf33cf](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7cf33cffcf1fdeae23d2820ee2302e6059bd69ab))
* **dashboard:** allow API clients to be created without rate limits ([72d1d71](https://github.com/gamesgamesgamesgamesgames/happyview/commit/72d1d71f7ad72687bfcb2e9bf99df99b9e3e1e1a))
* display plugin logs in event logs ui ([847706a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/847706a548346999d4f5d02f514137da30060c05))
* display user handles in users page ([47209bd](https://github.com/gamesgamesgamesgamesgames/happyview/commit/47209bd9656f88c62f672433079fc9aa13ca223c))
* external auth infra ([be081fd](https://github.com/gamesgamesgamesgamesgames/happyview/commit/be081fdb9be0ed085b8417208dace9023e0f359d))
* include success status and error messages ([368b969](https://github.com/gamesgamesgamesgamesgames/happyview/commit/368b96911d332893efa39eb5892c7db4498f9618))
* indicate plugins that still need config ([6dce092](https://github.com/gamesgamesgamesgamesgames/happyview/commit/6dce0929026e15cb3830a4f97574f2b88da25eb0))
* make db connection pool size configurable ([f128034](https://github.com/gamesgamesgamesgamesgames/happyview/commit/f12803453e11bda3dfe948533c374a6702a006e6))
* move dashboard under the `/dashboard` route ([81e74be](https://github.com/gamesgamesgamesgamesgames/happyview/commit/81e74be3f386347c855ef643e6ddc38449d591fd))
* move user management into Settings ([4012f47](https://github.com/gamesgamesgamesgamesgames/happyview/commit/4012f471028ebee517a2740de73a4f23c9b3d957))
* reorganize the nav ([587ff4c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/587ff4c9235f7b138f137b65c14e670e79d5cfaa))
* switch to DPoP auth ([98bccce](https://github.com/gamesgamesgamesgamesgames/happyview/commit/98bcccec6790fdfa92442e69d04bb0c6f33eabe0))
* switch to sqlite as the default ([5868b52](https://github.com/gamesgamesgamesgamesgames/happyview/commit/5868b524f337a36f098b22b026efb0f95a73ed13))

#### [BREAKING CHANGES](#breaking-changes)

* Scripts should now use cursors instead of offsets.

### [v1.12.0](#v1120)

*Released 2026-03-12*

#### [Bug Fixes](#bug-fixes-21)

* add additional debug logging for Tap connections ([fb807f2](https://github.com/gamesgamesgamesgamesgames/happyview/commit/fb807f27ef62290fd07b8aa3316dfa5732d03007))
* proper parsing for array query params ([8f1146a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/8f1146a75e609834681c0706c4ddfee890c170e1))
* return the avatar ref from bsky getProfile ([391ab19](https://github.com/gamesgamesgamesgamesgames/happyview/commit/391ab1908ba3ffee2dc0b4b4bb86b96a910795b5))
* use ResponsiveDialog from DiceUI ([fd54d3b](https://github.com/gamesgamesgamesgamesgames/happyview/commit/fd54d3b5873141ba43c48cb72530da62ce695c03))

#### [Features](#features-11)

* add more structure to event logs ([6506ff2](https://github.com/gamesgamesgamesgamesgames/happyview/commit/6506ff283f22f1017167a06bbe4e3963a19c950e))
* add request and response data to success events in event log ([6aed219](https://github.com/gamesgamesgamesgamesgames/happyview/commit/6aed219c192f732acf23403035b6d28bd90c15ce))
* allow query XRPCs to receive auth ([14beec3](https://github.com/gamesgamesgamesgamesgames/happyview/commit/14beec3ce6aa12cc106d6bfb789ad924c1a967fa))
* improved error logging for scripts ([938efc0](https://github.com/gamesgamesgamesgamesgames/happyview/commit/938efc08c222ad6118407f29de0ed06813bdebc3))
* process Tap events concurrently ([28a1057](https://github.com/gamesgamesgamesgamesgames/happyview/commit/28a1057635fa7ea48da8555d31097594a1f2244b))
* remove read-only restriction from db.raw ([5f71d40](https://github.com/gamesgamesgamesgamesgames/happyview/commit/5f71d409aebb1f19adda27a5e0d10320f490d5dd))
* run index hooks before storing records to enable record bypass and manipulation ([518bfc7](https://github.com/gamesgamesgamesgamesgames/happyview/commit/518bfc717454de3309edd964633d88cbcf53c4bf))

### [v1.11.0](#v1110)

*Released 2026-03-06*

#### [Features](#features-12)

* add API keys for things like CI/CD ([9f57f1d](https://github.com/gamesgamesgamesgamesgames/happyview/commit/9f57f1dc07a90d91d92ce8949258ec578418ee5e))
* move API keys into settings ([e0e1baa](https://github.com/gamesgamesgamesgamesgames/happyview/commit/e0e1baaefcf6fd38625562d0af028cd54f66c2e9))

### [v1.10.0](#v1100)

*Released 2026-03-05*

#### [Bug Fixes](#bug-fixes-22)

* add support for `did:web` when resolving DIDs ([1bc5114](https://github.com/gamesgamesgamesgamesgames/happyview/commit/1bc5114c65b567a0e03dd9417b4594ef05fc8ba7))

#### [Features](#features-13)

* resolve and proxy unrecognized XRPCs ([ee43d05](https://github.com/gamesgamesgamesgamesgames/happyview/commit/ee43d056c2a6db48e58e8a8fe107ca47180c4939))

### [v1.9.0](#v190)

*Released 2026-03-05*

#### [Bug Fixes](#bug-fixes-23)

* add `env` table so lua script validation passes ([4b45161](https://github.com/gamesgamesgamesgamesgames/happyview/commit/4b451614dade55cac175261bf221b1953d1ee9ff))
* backfill create test failed without an existing lexicon ([4f7a6a0](https://github.com/gamesgamesgamesgamesgames/happyview/commit/4f7a6a0f9a6063ebad8016333d16426e1883af65))
* backfill create test failed without an existing lexicon (again?) ([cf10723](https://github.com/gamesgamesgamesgamesgames/happyview/commit/cf107239d39fd2e2e3539dc79a3e6aa9c5e0ea95))
* client error on event logs ([2ee0589](https://github.com/gamesgamesgamesgamesgames/happyview/commit/2ee0589786a7035569c473299d6f14f68bbcf521))
* make sure Tap collections are up-to-date on reconnect ([38f89e7](https://github.com/gamesgamesgamesgamesgames/happyview/commit/38f89e7c3a7bfd13fb8bccd0029c87d947f432b4))
* match design to other tables pages ([8f6fe4e](https://github.com/gamesgamesgamesgamesgames/happyview/commit/8f6fe4e272c008b2ade68585e6517da087325992))
* prevent logo from clipping ([cf7cadb](https://github.com/gamesgamesgamesgamesgames/happyview/commit/cf7cadbb2fa522e69d560459ab27ea2feede9b50))
* prevent validation error when attempting to concat with env vars in lua scripts ([349234e](https://github.com/gamesgamesgamesgamesgames/happyview/commit/349234e3d5d92c05cec90689a810cc0876eaca15))

#### [Features](#features-14)

* add `http` module for Lua scripts ([4eb108c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/4eb108c8d93d7f34191b59f9087895851ad8f91f))
* add event logs to the dashboard ([8477dd3](https://github.com/gamesgamesgamesgamesgames/happyview/commit/8477dd354ccac88be708a7741ad2adcf4d3e9f57))
* add event\_logs migration ([0df2fc4](https://github.com/gamesgamesgamesgamesgames/happyview/commit/0df2fc4cd183d2d62ef8c74b42a27d44649895a1))
* add index hook scripts ([f8cf24d](https://github.com/gamesgamesgamesgamesgames/happyview/commit/f8cf24dc9e17c925e128fef5bd538216df9cf0fa))
* add Lua ENV vars ([7190018](https://github.com/gamesgamesgamesgamesgames/happyview/commit/719001863340305ec6421e245259519a88c06747))
* add support for sorting to the `db` module ([6c91bab](https://github.com/gamesgamesgamesgamesgames/happyview/commit/6c91bab1ed296372da2a447dc8c3191efe08d27b))
* event logs ([76627d2](https://github.com/gamesgamesgamesgamesgames/happyview/commit/76627d22f0db86fc66f87fdd7b79a5fff28ca954))
* index hooks ([db44e97](https://github.com/gamesgamesgamesgamesgames/happyview/commit/db44e9774b217d582ef63c17713ec6c49430c5ca))

### [v1.8.0](#v180)

*Released 2026-02-27*

#### [Features](#features-15)

* add `db.backlinks` for filtering results based on backlinks ([0a682c9](https://github.com/gamesgamesgamesgamesgames/happyview/commit/0a682c992896c7a1a10d8b079dbc544119579b01))
* add `db.raw` for complex queries (read-only) ([c347718](https://github.com/gamesgamesgamesgamesgames/happyview/commit/c347718c9fda3bf6bc77bbcba15a6970e419d743))

### [v1.7.1](#v171)

*Released 2026-02-27*

#### [Bug Fixes](#bug-fixes-24)

* database URLs were busted for local dev ([a59d70b](https://github.com/gamesgamesgamesgamesgames/happyview/commit/a59d70b3899a646fa370c466a758e4cd0cc96d9a))

### [v1.7.0](#v170)

*Released 2026-02-27*

#### [Bug Fixes](#bug-fixes-25)

* force records from `db` to serialize to arrays ([66cc7af](https://github.com/gamesgamesgamesgamesgames/happyview/commit/66cc7afe6d6e5c743061abc4a8fa3a58487e09b7))

#### [Features](#features-16)

* add `toarray()` so users can force a Lua table to serialize to an array ([6827ceb](https://github.com/gamesgamesgamesgamesgames/happyview/commit/6827ceba4b744e030b446c20fa984d8f2ee6fdd9))
* enable more complex database operations with `db.search()` ([7bcb5aa](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7bcb5aaa007370dde4320bbc2568bdde59760c32))

### [v1.6.2](#v162)

*Released 2026-02-26*

#### [Bug Fixes](#bug-fixes-26)

* use original auth scheme instead of hardcoded dpop ([14252b2](https://github.com/gamesgamesgamesgamesgames/happyview/commit/14252b22448c342456c87a0f8c7acb4834d19bd4))

### [v1.6.1](#v161)

*Released 2026-02-24*

#### [Bug Fixes](#bug-fixes-27)

* dynamic page routes were broken ([a09ce1b](https://github.com/gamesgamesgamesgamesgames/happyview/commit/a09ce1b2ad19ef36501a4af9759f4589df720f3f))

### [v1.6.0](#v160)

*Released 2026-02-24*

#### [Bug Fixes](#bug-fixes-28)

* backfill now loads previously deleted records ([75dcd8c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/75dcd8c31e0e128515ebd6e27911936143f54a42))
* show collections on Records page even if they have no records ([5eab462](https://github.com/gamesgamesgamesgamesgames/happyview/commit/5eab462287e7ff2884859be853ffba60ab3618c5))

#### [Features](#features-17)

* add "View Records" buttons to lexicons ([a9db22c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/a9db22c9a65f32eaef6a976fbdcafbe4106ba7dc))
* add bulk collection record deletion to the API ([3f4833a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3f4833a0b855838926b2f84d85209dfc57a6ab1b))
* add bulk collection record deletion to the dashboard ([310f3f8](https://github.com/gamesgamesgamesgamesgames/happyview/commit/310f3f8ff99d7e14051ca07d1e7d9a8af8837f5d))
* allow records to be deleted from the dashboard ([e7000a1](https://github.com/gamesgamesgamesgamesgames/happyview/commit/e7000a1929e4a1efcd18013d447585aac6573f37))
* allow records to be deleted via the API ([417f60a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/417f60a3f070574eeb6c1a1059e6d261d98f1c73))

### [v1.5.1](#v151)

*Released 2026-02-24*

#### [Bug Fixes](#bug-fixes-29)

* remove backfill switch for query and procedure lexicons ([e8c3ec7](https://github.com/gamesgamesgamesgamesgames/happyview/commit/e8c3ec70a380db31ea348fcc19df7c712646a7a7))

### [v1.5.0](#v150)

*Released 2026-02-24*

#### [Bug Fixes](#bug-fixes-30)

* prevent rogue records from being stored ([26d8400](https://github.com/gamesgamesgamesgamesgames/happyview/commit/26d8400cddf9aa4fa11d1813141b93d7e517bf98))
* records page now properly lists collections in dropdown ([c7d2c44](https://github.com/gamesgamesgamesgamesgames/happyview/commit/c7d2c44d91577776897974ad4f1d420fe836b258))
* wrap dynamic page with a server component to fix build ([a2e4a32](https://github.com/gamesgamesgamesgamesgames/happyview/commit/a2e4a32d2824de48353f2610563341bbc994fb8d))

#### [Features](#features-18)

* add column visibility and better scrolling to records table ([2d37ca8](https://github.com/gamesgamesgamesgamesgames/happyview/commit/2d37ca8fb59cc30d4fb96afc68101c9f26008864))
* add custom processing scripts to procedure and query lexicons ([6db74fc](https://github.com/gamesgamesgamesgamesgames/happyview/commit/6db74fcabf1e20954fe440c63adabc68f353bda0))
* add dark mode ([6e35616](https://github.com/gamesgamesgamesgamesgames/happyview/commit/6e356168dff5ad22b7a0ea44e161f10c11ea6e5c))
* add Docusaurus site and GitHub Pages deploy workflow ([5b25d27](https://github.com/gamesgamesgamesgamesgames/happyview/commit/5b25d279a400918415d563612ef69dd260e30366))
* add proper backfill stats tracking ([08989b1](https://github.com/gamesgamesgamesgamesgames/happyview/commit/08989b171feeff98460a914e34946234050269e0))
* additional Lua completions and docs ([55a510d](https://github.com/gamesgamesgamesgamesgames/happyview/commit/55a510dfdea173a3320b77cd4919dd7da6a72de8))
* merge network and local lexicons ([ed7af39](https://github.com/gamesgamesgamesgamesgames/happyview/commit/ed7af3988004156e7df3af9b7068692bc31e686f))
* use data table with dynamic columns for records page ([3111322](https://github.com/gamesgamesgamesgamesgames/happyview/commit/31113223ade71c34636b4b1729802d48ed1a7514))
* use Shiki for code blocks ([461a2fa](https://github.com/gamesgamesgamesgamesgames/happyview/commit/461a2faf5463fc003ee04415312be4fcd9ed92ab))

### [v1.4.3](#v143)

*Released 2026-02-17*

#### [Bug Fixes](#bug-fixes-31)

* enable trailing slash for static export compatibility ([80afc2d](https://github.com/gamesgamesgamesgamesgames/happyview/commit/80afc2d3d3360c242f7ddf7b2450620891a86c22))

### [v1.4.2](#v142)

*Released 2026-02-16*

#### [Bug Fixes](#bug-fixes-32)

* improve AIP proxy error logging and cache Rust deps in Docker ([cd1d843](https://github.com/gamesgamesgamesgamesgames/happyview/commit/cd1d843c9fa046245aaa12c8ce322bb8a4ba0699))

### [v1.4.1](#v141)

*Released 2026-02-16*

#### [Bug Fixes](#bug-fixes-33)

* add AIP\_PUBLIC\_URL for frontend-facing AIP address ([ae9f023](https://github.com/gamesgamesgamesgamesgames/happyview/commit/ae9f0238361c69de7b38c8c0583a397088248f8b))

### [v1.4.0](#v140)

*Released 2026-02-16*

#### [Features](#features-19)

* add AIP reverse proxy and runtime config endpoint ([c7fb89d](https://github.com/gamesgamesgamesgamesgames/happyview/commit/c7fb89d23fdc57d72e244d0cc725f6575aed4e0d))

### [v1.3.0](#v130)

*Released 2026-02-16*

#### [Bug Fixes](#bug-fixes-34)

* fix dpop resolution for dashboard login ([b7c7bbb](https://github.com/gamesgamesgamesgamesgames/happyview/commit/b7c7bbba59ff8c49459ffddf7bdf1930726b348f))
* update backfill e2e test for synchronous handler ([1adc65e](https://github.com/gamesgamesgamesgamesgames/happyview/commit/1adc65eb9806a3f8440bf1e071d1724f0e25ee04))

#### [Features](#features-20)

* add admin login page with token auth ([bff9876](https://github.com/gamesgamesgamesgamesgames/happyview/commit/bff987628efea446d77736f4b7175d91b6ec6768))
* add admins management page ([3259868](https://github.com/gamesgamesgamesgamesgames/happyview/commit/32598680c708046380ff6597432a61e52e877eea))
* add ATProto OAuth login via handle ([16379e5](https://github.com/gamesgamesgamesgamesgames/happyview/commit/16379e595b930af4bcda882958a3a9f1d8b29457))
* add backfill jobs page ([5db4bdc](https://github.com/gamesgamesgamesgamesgames/happyview/commit/5db4bdcca64218b8866ed145967c4ba735a7e424))
* add dashboard navigation with sidebar layout ([7643c9b](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7643c9b90da8c14420fe7ea7ab7b9c03e5cdf5f0))
* add lexicons CRUD page ([d6e4f62](https://github.com/gamesgamesgamesgamesgames/happyview/commit/d6e4f629ede2192b0f5d629a76369a0fc9a64e12))
* add network lexicons page ([4d882f4](https://github.com/gamesgamesgamesgamesgames/happyview/commit/4d882f471eeab1617098f29ed19795243d1ea2af))
* add records browsing page to admin dashboard ([994d7cb](https://github.com/gamesgamesgamesgamesgames/happyview/commit/994d7cb6c177da5141549a20e5eed05c5d3cbbab))
* consolidate docker compose to single postgres instance ([5a8863d](https://github.com/gamesgamesgamesgamesgames/happyview/commit/5a8863df631b2cfe04811a0735478896ec5b0acf))
* replace Jetstream and backfill with Tap ([dbd2233](https://github.com/gamesgamesgamesgamesgames/happyview/commit/dbd22337e3216e4cbe0f44172ed0c6363dc208ff))
* scaffold web admin app with static file serving ([b1977b4](https://github.com/gamesgamesgamesgamesgames/happyview/commit/b1977b4700fb904c6183557f3fc7378c5e0e53cd))
* switch to AIP OAuth with PKCE and improve lexicon UX ([374a2a1](https://github.com/gamesgamesgamesgamesgames/happyview/commit/374a2a1a41b4b4a14fea5059ad591657983cae80))

### [v1.2.0](#v120)

*Released 2026-02-14*

#### [Features](#features-21)

* add convention-based action field for procedure lexicons ([1b879c2](https://github.com/gamesgamesgamesgamesgames/happyview/commit/1b879c2f3c8b5cdbf85ea8450aa59289416ee006))

### [v1.1.0](#v110)

*Released 2026-02-14*

#### [Features](#features-22)

* load lexicons from ATProto network via DNS TXT resolution ([731c35d](https://github.com/gamesgamesgamesgamesgames/happyview/commit/731c35d3e4761cd2b6ac3059b3285109f89661d1)), closes [#6](https://github.com/gamesgamesgamesgamesgames/happyview/issues/6)

### [v1.0.2](#v102)

*Released 2026-02-14*

#### [Bug Fixes](#bug-fixes-35)

* clear existing admins before adding did column ([bc54913](https://github.com/gamesgamesgamesgamesgames/happyview/commit/bc54913027bc9b58d1525457ba9e6846d5381a61))

### [v1.0.1](#v101)

*Released 2026-02-13*

#### [Bug Fixes](#bug-fixes-36)

* remove unused did field from AdminAuth ([0a5657d](https://github.com/gamesgamesgamesgamesgames/happyview/commit/0a5657d92f27e0653b8103618dae0196fe64b7a0))

### [v1.0.0](#v100)

*Released 2026-02-13*

#### [Bug Fixes](#bug-fixes-37)

* resolve clippy warnings and formatting issues ([77b3b39](https://github.com/gamesgamesgamesgamesgames/happyview/commit/77b3b397b810e46efbe8553d1911944aab9b5d57))

#### [Features](#features-23)

* add backfill system for historical record discovery and indexing ([15e8ffd](https://github.com/gamesgamesgamesgamesgames/happyview/commit/15e8ffd0acaf60c4493538de41c04cf30c6bb445))
* add Dockerfile, docker-compose, and CI workflow ([7c5e7b8](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7c5e7b83c68948ce6dfdc077d4df9e4abd828e16))
* add game record XRPC endpoints with DPoP auth ([66f097f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/66f097f77aff6cf974f3c29d7c576c19e8eecf72))
* add Jetstream listener and record indexing with sqlx migrations ([8352043](https://github.com/gamesgamesgamesgamesgames/happyview/commit/83520434e0b5e787ea931aa0ce6722b4fc640a78))
* add lexicon storage and admin API ([94dbfaa](https://github.com/gamesgamesgamesgamesgames/happyview/commit/94dbfaa4266b8d284992e48299e68fddc5efc446))
* add listGames query endpoint with cursor-based pagination ([a0ec4b5](https://github.com/gamesgamesgamesgamesgames/happyview/commit/a0ec4b5e126fd9250776fc5ee402dff2adcc1eb0))
* add unauthenticated getGame query endpoint ([1983251](https://github.com/gamesgamesgamesgamesgames/happyview/commit/198325117b411a158fc6713ae8aa53bde6bac7a5))
* add user profile endpoint with AIP userinfo auth ([76754e9](https://github.com/gamesgamesgamesgamesgames/happyview/commit/76754e9c7d1f42e678a7038bf1b62eaa63327f9c))
* catch-all XRPC router replaces hardcoded game routes ([b763b26](https://github.com/gamesgamesgamesgamesgames/happyview/commit/b763b26796325abee8c451f99620cc3da96c69dd))
* dynamic Jetstream subscription driven by lexicon registry ([74b0e24](https://github.com/gamesgamesgamesgamesgames/happyview/commit/74b0e24b87137669e5c8cc15fe9c648071d93ffa))
* index records on create/put, add created\_at column ([445c862](https://github.com/gamesgamesgamesgamesgames/happyview/commit/445c862a77979f761e1fd1a0c05884ddcd91e6f9))
* initial server with health endpoint and JWT auth ([db5ba0b](https://github.com/gamesgamesgamesgamesgames/happyview/commit/db5ba0b14d434050fd6f6e757b76f7aee434175d))
* multi-admin system with API key management and bootstrap ([7628cf9](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7628cf93b1f34c3ab87865504ed268f2515cf8ae))
* parallel multi-arch docker builds with manifest append ([a587461](https://github.com/gamesgamesgamesgamesgames/happyview/commit/a587461352d6ad56083368c94d17e76fa30e62d4))
* read getGame and listGames from database index instead of PDS ([5c6713e](https://github.com/gamesgamesgamesgamesgames/happyview/commit/5c6713e32f2df8841004862c01f8da0d537b883b))

[Troubleshooting

Previous Page](/reference/troubleshooting)

#### On this page

[v2.10.2](#v2102)[Bug Fixes](#bug-fixes)[v2.10.1](#v2101)[Bug Fixes](#bug-fixes-1)[v2.10.0](#v2100)[Bug Fixes](#bug-fixes-2)[Features](#features)[v2.9.2](#v292)[Bug Fixes](#bug-fixes-3)[v2.9.1](#v291)[Bug Fixes](#bug-fixes-4)[v2.9.0](#v290)[Bug Fixes](#bug-fixes-5)[Features](#features-1)[v2.8.1](#v281)[Bug Fixes](#bug-fixes-6)[v2.8.0](#v280)[Bug Fixes](#bug-fixes-7)[Features](#features-2)[v2.7.0](#v270)[Bug Fixes](#bug-fixes-8)[Features](#features-3)[v2.6.0](#v260)[Bug Fixes](#bug-fixes-9)[Features](#features-4)[v2.5.2](#v252)[Bug Fixes](#bug-fixes-10)[v2.5.1](#v251)[Bug Fixes](#bug-fixes-11)[v2.5.0 — v2.5.0 - The Permissioned Data Release](#v250--v250---the-permissioned-data-release)[Bug Fixes](#bug-fixes-12)[Features](#features-5)[v2.4.1](#v241)[Bug Fixes](#bug-fixes-13)[v2.4.0](#v240)[Bug Fixes](#bug-fixes-14)[Features](#features-6)[v2.3.1](#v231)[Bug Fixes](#bug-fixes-15)[v2.3.0](#v230)[Features](#features-7)[v2.2.0](#v220)[Bug Fixes](#bug-fixes-16)[Features](#features-8)[v2.1.1](#v211)[Bug Fixes](#bug-fixes-17)[v2.1.0](#v210)[Bug Fixes](#bug-fixes-18)[Features](#features-9)[v2.0.1](#v201)[Bug Fixes](#bug-fixes-19)[v2.0.0](#v200)[Bug Fixes](#bug-fixes-20)[Features](#features-10)[BREAKING CHANGES](#breaking-changes)[v1.12.0](#v1120)[Bug Fixes](#bug-fixes-21)[Features](#features-11)[v1.11.0](#v1110)[Features](#features-12)[v1.10.0](#v1100)[Bug Fixes](#bug-fixes-22)[Features](#features-13)[v1.9.0](#v190)[Bug Fixes](#bug-fixes-23)[Features](#features-14)[v1.8.0](#v180)[Features](#features-15)[v1.7.1](#v171)[Bug Fixes](#bug-fixes-24)[v1.7.0](#v170)[Bug Fixes](#bug-fixes-25)[Features](#features-16)[v1.6.2](#v162)[Bug Fixes](#bug-fixes-26)[v1.6.1](#v161)[Bug Fixes](#bug-fixes-27)[v1.6.0](#v160)[Bug Fixes](#bug-fixes-28)[Features](#features-17)[v1.5.1](#v151)[Bug Fixes](#bug-fixes-29)[v1.5.0](#v150)[Bug Fixes](#bug-fixes-30)[Features](#features-18)[v1.4.3](#v143)[Bug Fixes](#bug-fixes-31)[v1.4.2](#v142)[Bug Fixes](#bug-fixes-32)[v1.4.1](#v141)[Bug Fixes](#bug-fixes-33)[v1.4.0](#v140)[Features](#features-19)[v1.3.0](#v130)[Bug Fixes](#bug-fixes-34)[Features](#features-20)[v1.2.0](#v120)[Features](#features-21)[v1.1.0](#v110)[Features](#features-22)[v1.0.2](#v102)[Bug Fixes](#bug-fixes-35)[v1.0.1](#v101)[Bug Fixes](#bug-fixes-36)[v1.0.0](#v100)[Bug Fixes](#bug-fixes-37)[Features](#features-23)

---
<!--
URL: https://happyview.dev/getting-started/quickstart
title: Quickstart | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Quickstart

## Quickstart

This page walks you through the fastest path to a working HappyView instance. By the end, you'll have an AppView that indexes records from the atproto network and serves XRPC endpoints.

### [1. Deploy HappyView](#1-deploy-happyview)

Pick whichever option fits your situation:

| Option | Best for |
| --- | --- |
| [**Railway**](deployment/railway) | Fastest path — one-click deploy of HappyView + Postgres |
| [**Docker Compose**](deployment/docker) | Local development with the full stack in containers |
| [**From source**](deployment/other) | Running HappyView with `cargo run` and managing dependencies yourself |

If you're just trying HappyView for the first time, start with Railway.

### [2. Log in to the dashboard](#2-log-in-to-the-dashboard)

The built-in <dashboard> is served at your instance's root URL. Log in with your atproto identity — on a fresh deployment, the first handle to authenticate is automatically bootstrapped as the **super user** with all permissions, so use the handle you want to own the instance.

### [3. Add your first lexicon](#3-add-your-first-lexicon)

Lexicons tell HappyView what data to index and what endpoints to serve. The quickest way to get started is to add one from the network:

1. In the dashboard, go to **Lexicons > Add Lexicon > Network**
2. Enter an NSID (e.g. `xyz.statusphere.status`)
3. HappyView [resolves the schema](https://atproto.com/specs/lexicon#lexicon-publication-and-resolution) from its authority domain records and shows a preview
4. Click **Add**

HappyView starts indexing records for that collection. A backfill job fetches historical records, and new records stream in via Jetstream.

You can also upload lexicons manually via the dashboard or the [admin API](../api-reference/admin/admin-api). See [Lexicons](../guides/lexicons) for the full details.

### [4. Verify records are being indexed](#4-verify-records-are-being-indexed)

The dashboard home shows a live record count and a per-collection breakdown. For a deeper look, browse **Records** to inspect individual rows or **Backfill** to watch the historical fetch job drain.

### [5. Query your data](#5-query-your-data)

Once you have a record lexicon indexed, add a query lexicon to expose a read endpoint. Go to **Lexicons > Add Lexicon > Local** and create a query lexicon with `target_collection` set to your record collection's NSID. (`target_collection` is a HappyView-specific field that tells a query or procedure which record collection it operates on.)

Without a Lua script, HappyView generates a default query endpoint that supports `limit`, `cursor`, `did`, and `uri` parameters:

```
GET /xrpc/xyz.statusphere.listStatuses?limit=5
```

For custom query logic, attach a [Lua script](../guides/lua-scripting).

### [Next steps](#next-steps)

* [**Statusphere tutorial**](../tutorials/statusphere): full walkthrough building a complete AppView with record, query, and procedure lexicons
* [**Lexicons guide**](../guides/lexicons): target collections, backfill flag, network lexicons
* [**Lua Scripting**](../guides/lua-scripting): custom query and procedure logic
* [**Configuration**](configuration): environment variables and tuning
* [**Authentication**](authentication): how OAuth works and how to get API tokens

[Introduction

Previous Page](/)[Configuration

Next Page](/getting-started/configuration)

#### On this page

[1. Deploy HappyView](#1-deploy-happyview)[2. Log in to the dashboard](#2-log-in-to-the-dashboard)[3. Add your first lexicon](#3-add-your-first-lexicon)[4. Verify records are being indexed](#4-verify-records-are-being-indexed)[5. Query your data](#5-query-your-data)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/getting-started/authentication
title: Authentication | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Authentication

## Authentication

HappyView has two distinct authentication surfaces:

* **XRPC** (`/xrpc/*`) — client-level identification via an **API client key** on every request, plus optional user-level atproto OAuth for endpoints that need a specific user's identity (e.g. procedures that write to a PDS).
* **Admin API** (`/admin/*`) — user-level authentication via admin API keys or service auth JWTs, gated by [permissions](../guides/permissions).

### [Which endpoints require what?](#which-endpoints-require-what)

| Endpoint type | Client identification | User authentication |
| --- | --- | --- |
| Queries (`GET /xrpc/{method}`) | `X-Client-Key` required | Optional — DPoP auth if the query needs to know who the user is |
| Procedures (`POST /xrpc/{method}`) | `X-Client-Key` required | Required — DPoP auth so HappyView can proxy writes to the user's PDS |
| Admin API (`/admin/*`) | — | Required — admin API key or service auth JWT with the right [permissions](../guides/permissions) |
| Health check (`GET /health`) | — | — |

### [XRPC: API client identification](#xrpc-api-client-identification)

Every XRPC request — including unauthenticated `GET` queries — must identify itself with a registered API client. The client key is HappyView's rate-limit bucket key and its way of knowing who is calling. A request without one returns `401 Unauthorized` with `Missing client identification`.

Register a client in the dashboard (**Settings > API Clients > New client**) or via `POST /admin/api-clients`. You'll get back an `hvc_…` client key and an `hvs_…` client secret — **the secret is only shown once**, so capture it immediately.

HappyView resolves the client key from the first of:

1. The `X-Client-Key` request header.
2. A `client_key` query-string parameter.

On top of the client key, HappyView does best-effort validation that the caller actually controls the client:

* If an `Origin` header is present (typical for browser apps), it must match the client's registered `client_uri`.
* Otherwise, an `X-Client-Secret` header may be supplied and must match the stored secret (typical for server-to-server callers).

Both checks currently log warnings on mismatch rather than rejecting the request, but the intent is clear: don't share client keys, and treat the secret like a password.

#### [Calling a query](#calling-a-query)

TypeScriptJavaScriptRustGocURL

```
const CLIENT_KEY = "hvc_a1b2c3..."; // your API client key

const response = await fetch(
  "https://happyview.example.com/xrpc/com.example.feed.getHot",
  { headers: { "X-Client-Key": CLIENT_KEY } },
);
```

For a server-to-server integration, add the secret:

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "https://happyview.example.com/xrpc/com.example.feed.getHot",
  {
    headers: {
      "X-Client-Key": "hvc_a1b2c3...",
      "X-Client-Secret": "hvs_d4e5f6...",
    },
  },
);
```

#### [Authenticating users for procedures](#authenticating-users-for-procedures)

Queries that don't care who is calling need nothing more than the client key. Procedures — and queries whose Lua scripts read the caller's DID — need a real atproto OAuth session.

XRPC routes accept several auth methods, resolved in this order:

1. **DPoP auth** (`Authorization: DPoP <token>` + `DPoP` proof header + `X-Client-Key`) — used by third-party apps that went through the [DPoP key provisioning](#dpop-key-provisioning-for-third-party-apps) flow.
2. **Bearer space credential** (`Authorization: Bearer <space_credential_jwt>`) — a signed JWT granting access to a specific space; accepted on space routes.
3. **Bearer service auth JWT** (`Authorization: Bearer <service_auth_jwt>`) — a standard atproto inter-service JWT signed by a DID's atproto signing key; the caller is identified as the issuer DID.
4. **Cookie session** — when no `Authorization` header is present, HappyView falls back to the signed session cookie set after dashboard login.
5. **Anonymous** — if none of the above is present, the request proceeds with no identity. The endpoint's Lua script determines whether that is acceptable.

Bearer API keys (`hv_*`) are **not** accepted on XRPC endpoints — those are for admin API access only.

Third-party apps authenticate users through the [DPoP key provisioning](#dpop-key-provisioning-for-third-party-apps) flow: your app gets a DPoP keypair from HappyView, runs a standard OAuth flow with the user's PDS using that keypair, then registers the resulting tokens back with HappyView.

The [JavaScript SDK](../sdk/overview) handles this entire flow for you:

```
import { Client } from "@atproto/lex";
import { HappyViewBrowserClient } from "@happyview/oauth-client-browser";
import { createAgent } from "@happyview/lex-agent";

const oauthClient = new HappyViewBrowserClient({
  instanceUrl: "https://happyview.example.com",
  clientKey: "hvc_your_client_key",
});

// Sign in — redirects to the user's PDS for authorization
await oauthClient.signIn("alice.bsky.social");

// On page load — restore session or process OAuth callback
const result = await oauthClient.init();
const session = result?.session;

// Create a type-safe Lex client
const agent = createAgent(session);
const lex = new Client(agent);

// Make authenticated XRPC calls
await lex.xrpc(myLexicons.com.example.createPost, {
  input: { text: "Hello from HappyView!" },
});
```

For procedures, HappyView proxies the write to the user's PDS using the stored OAuth session (see [Proxying procedures](#proxying-procedures-to-the-users-pds) below).

### [Admin API: user authentication](#admin-api-user-authentication)

Admin endpoints don't use API clients. They require a real HappyView user, identified by one of two methods:

#### [Admin API key](#admin-api-key)

For automation — CI/CD, monitoring, cron jobs — create an [admin API key](../guides/api-keys) at **Settings > API Keys** or via `POST /admin/api-keys` and pass it as a bearer token:

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_your-api-key-here";

const response = await fetch("http://127.0.0.1:3000/admin/lexicons", {
  headers: { Authorization: `Bearer ${TOKEN}` },
});
```

A key only carries the permissions selected at creation time and can never exceed the permissions of the user who created it. Admin API keys are not valid for XRPC endpoints — they exist solely for admin API access.

#### [Service auth JWT](#service-auth-jwt)

HappyView also accepts standard atproto inter-service auth JWTs in the `Authorization` header. Another AppView, relay, or PDS can sign a short-lived ES256 or ES256K JWT with its DID's signing key; HappyView resolves the issuer's DID document, verifies the signature against the `#atproto` verification method, and treats the issuer DID as the caller identity.

For a service auth JWT to validate:

* `alg` must be `ES256` or `ES256K`.
* `typ` must not be `at+jwt`, `refresh+jwt`, or `dpop+jwt` (those are other token types, not inter-service JWTs).
* `exp` must be in the future.
* The signature must verify against the issuer DID's atproto signing key.

As with the other methods, the resolved DID still has to exist in the HappyView `happyview_users` table with the right permissions to hit admin endpoints — service auth gets you identified, not privileged.

#### [Admin access and the first user](#admin-access-and-the-first-user)

On a fresh deployment, the `happyview_users` table is empty. The first authenticated request to any admin endpoint auto-bootstraps that user as the **super user** with all permissions granted. This includes logging in to the dashboard — the dashboard makes admin API calls on your behalf, so the first person to log in becomes the super user.

To add more users after that, use `POST /admin/users` or the <dashboard>. You can assign permissions individually or use a template (`viewer`, `operator`, `manager`, `full_access`). See [Admin API — Users](../api-reference/admin/users) for details.

### [Proxying procedures to the user's PDS](#proxying-procedures-to-the-users-pds)

When a client calls an XRPC procedure that writes a record, HappyView proxies the write to the user's PDS. This requires a DPoP-authenticated session — the app must have gone through the [DPoP key provisioning](#dpop-key-provisioning-for-third-party-apps) flow and registered tokens for the user. HappyView uses the app's provisioned DPoP key to generate fresh proofs and attach the stored access token to the outbound PDS request.

A request that only carries an `X-Client-Key` header (no DPoP token) can hit queries but can't proxy writes — there's no user to write as.

### [DPoP key provisioning for third-party apps](#dpop-key-provisioning-for-third-party-apps)

Third-party apps that want HappyView to make PDS writes on behalf of their users use the **DPoP key provisioning** flow. This avoids browser-based redirects through HappyView's domain, which can be blocked by Firefox's Bounce Tracker Protection.

The idea: for each device, the app gets a DPoP keypair from HappyView, uses that keypair during its own OAuth flow with the user's PDS, then registers the resulting tokens back with HappyView. Each device gets its own keypair and session, so a user can be signed in on multiple devices simultaneously. From that point on, XRPC requests authenticated with `Authorization: DPoP <access_token>` plus a `DPoP` proof header and `X-Client-Key` will have HappyView proxy writes using the stored session that matches the request's DPoP key.

The client app and HappyView share the same DPoP keypair, so both can generate valid proofs that the PDS will accept. The PDS binds tokens to a key's thumbprint but it doesn't care who signs the proof, only that it was signed by the right key.

#### [Flow overview](#flow-overview)

#### [API clients: confidential vs public](#api-clients-confidential-vs-public)

API clients have a `client_type` field — either `confidential` (default) or `public`.

* **Confidential clients** authenticate with `X-Client-Key` + `X-Client-Secret` headers on every `/oauth/*` request.
* **Public clients** (browser apps that can't keep a secret) authenticate with `X-Client-Key` header + PKCE. The app sends a `pkce_challenge` (S256) in the body when provisioning a key, then proves possession with `pkce_verifier` when registering a session. Public clients also have `allowed_origins` — the `Origin` header must match.

#### [The full flow](#the-full-flow)

##### [1. Provision a DPoP key](#1-provision-a-dpop-key)

```
POST /oauth/dpop-keys
X-Client-Key: hvc_...
X-Client-Secret: hvs_...
Content-Type: application/json

{}
```

For public clients, omit `X-Client-Secret` and include the PKCE challenge in the body:

```
POST /oauth/dpop-keys
X-Client-Key: hvc_...
Origin: http://127.0.0.1:3000
Content-Type: application/json

{ "pkce_challenge": "base64url..." }
```

Response:

```
{
  "provision_id": "hvp_...",
  "dpop_key": {
    "kty": "EC",
    "crv": "P-256",
    "x": "...",
    "y": "...",
    "d": "..."
  }
}
```

The `dpop_key` is the private JWK. Use it to generate DPoP proofs during your OAuth flow with the user's PDS.

##### [2. Run OAuth with the user's PDS](#2-run-oauth-with-the-users-pds)

Use the provisioned DPoP key as your DPoP keypair in a standard atproto OAuth flow with the user's PDS. HappyView is not involved in this step — the app talks directly to the PDS authorization server.

##### [3. Register the session](#3-register-the-session)

After the OAuth callback, register the token set with HappyView:

```
POST /oauth/sessions
X-Client-Key: hvc_...
X-Client-Secret: hvs_...
Content-Type: application/json

{
  "provision_id": "hvp_...",
  "did": "did:plc:user123",
  "access_token": "...",
  "refresh_token": "...",
  "expires_at": "2026-04-17T00:00:00Z",
  "scopes": "atproto transition:generic",
  "pds_url": "https://bsky.social",
  "issuer": "https://bsky.social"
}
```

For public clients, omit `X-Client-Secret` and include the PKCE verifier in the body:

```
{
  "provision_id": "hvp_...",
  "pkce_verifier": "...",
  "did": "did:plc:user123",
  "access_token": "...",
  "refresh_token": "...",
  "expires_at": "2026-04-17T00:00:00Z",
  "scopes": "atproto transition:generic",
  "pds_url": "https://bsky.social",
  "issuer": "https://bsky.social"
}
```

Response:

```
{
  "session_id": "uuid",
  "did": "did:plc:user123"
}
```

##### [4. Make XRPC requests](#4-make-xrpc-requests)

With a registered session, send XRPC requests using DPoP auth:

TypeScriptJavaScriptRustGocURL

```
const CLIENT_KEY = "hvc_..."; // your API client key
const ACCESS_TOKEN = "..."; // DPoP access token
const DPOP_PROOF = "..."; // DPoP proof JWT

const response = await fetch(
  "https://happyview.example.com/xrpc/com.example.feed.createPost",
  {
    method: "POST",
    headers: {
      "X-Client-Key": CLIENT_KEY,
      Authorization: `DPoP ${ACCESS_TOKEN}`,
      DPoP: DPOP_PROOF,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: "Hello world" }),
  },
);
```

HappyView validates the DPoP proof, looks up the stored session, and proxies the write to the user's PDS using the provisioned DPoP key to generate a fresh proof.

##### [5. Logout](#5-logout)

Confidential clients authenticate with `X-Client-Key` + `X-Client-Secret`. This revokes **all** device sessions for the user under this client — useful for a full sign-out:

```
DELETE /oauth/sessions/did:plc:user123
X-Client-Key: hvc_...
X-Client-Secret: hvs_...
```

Public clients must provide a valid DPoP proof to prove they hold the key. This revokes only the session that matches the DPoP key used in the proof — other device sessions for the same user are unaffected:

```
DELETE /oauth/sessions/did:plc:user123
X-Client-Key: hvc_...
Authorization: DPoP <access_token>
DPoP: <proof_jwt>
```

To revoke a specific device session (for either client type), use the [device management endpoints](#6-managing-device-sessions) instead.

##### [6. Managing device sessions](#6-managing-device-sessions)

When a user registers sessions from multiple devices (each with its own DPoP keypair), each session is tracked separately. You can list and revoke individual device sessions without affecting the others.

**List device sessions:**

Confidential clients authenticate with `X-Client-Key` + `X-Client-Secret`. Public clients authenticate with DPoP proof.

```
GET /oauth/sessions/did:plc:user123/devices
X-Client-Key: hvc_...
X-Client-Secret: hvs_...
```

Response:

```
[
  {
    "id": "uuid-session-1",
    "dpop_key_id": "uuid-key-1",
    "scopes": ["atproto", "transition:generic"],
    "created_at": "2026-05-20T12:00:00Z",
    "updated_at": "2026-05-20T12:00:00Z"
  },
  {
    "id": "uuid-session-2",
    "dpop_key_id": "uuid-key-2",
    "scopes": ["atproto", "transition:generic"],
    "created_at": "2026-05-21T08:30:00Z",
    "updated_at": "2026-05-21T08:30:00Z"
  }
]
```

**Delete a specific device session:**

```
DELETE /oauth/sessions/did:plc:user123/devices/uuid-session-1
X-Client-Key: hvc_...
X-Client-Secret: hvs_...
```

For public clients, use DPoP auth instead of `X-Client-Secret`:

```
DELETE /oauth/sessions/did:plc:user123/devices/uuid-session-1
X-Client-Key: hvc_...
Authorization: DPoP <access_token>
DPoP: <proof_jwt>
```

Returns `204 No Content` on success, `404 Not Found` if the session doesn't exist or doesn't belong to the client/user.

#### [Security notes](#security-notes)

* Private keys and tokens are encrypted at rest with AES-256-GCM using `TOKEN_ENCRYPTION_KEY`.
* DPoP proofs are validated for method, URL, timestamp (5-minute window), access token binding, and JWK thumbprint.
* Scopes requested must include `atproto` and must be a subset of the API client's registered scopes.

### [Next steps](#next-steps)

* [JavaScript SDK](../sdk/overview) — authenticate and make XRPC calls from JavaScript
* [Permissions](../guides/permissions) — full list of permissions and what each one grants
* [API Keys](../guides/api-keys) — create scoped admin API keys for automation
* [Admin API — API Clients](../api-reference/admin/api-clients) — register API clients and configure rate limits
* [Third-Party API Clients](../api-reference/oauth/api-clients) — let third-party apps manage their own API clients programmatically

[Dashboard

Previous Page](/getting-started/dashboard)[Railway

Next Page](/getting-started/deployment/railway)

#### On this page

[Which endpoints require what?](#which-endpoints-require-what)[XRPC: API client identification](#xrpc-api-client-identification)[Calling a query](#calling-a-query)[Authenticating users for procedures](#authenticating-users-for-procedures)[Admin API: user authentication](#admin-api-user-authentication)[Admin API key](#admin-api-key)[Service auth JWT](#service-auth-jwt)[Admin access and the first user](#admin-access-and-the-first-user)[Proxying procedures to the user's PDS](#proxying-procedures-to-the-users-pds)[DPoP key provisioning for third-party apps](#dpop-key-provisioning-for-third-party-apps)[Flow overview](#flow-overview)[API clients: confidential vs public](#api-clients-confidential-vs-public)[The full flow](#the-full-flow)[1. Provision a DPoP key](#1-provision-a-dpop-key)[2. Run OAuth with the user's PDS](#2-run-oauth-with-the-users-pds)[3. Register the session](#3-register-the-session)[4. Make XRPC requests](#4-make-xrpc-requests)[5. Logout](#5-logout)[6. Managing device sessions](#6-managing-device-sessions)[Security notes](#security-notes)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/tutorials/statusphere
title: Statusphere | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Statusphere

## Statusphere

[Statusphere](https://github.com/bluesky-social/statusphere-example-app) is an example atproto application where users set their current status as a single emoji. It's a great way to learn how HappyView works because the data model is simple but the queries are interesting.

In this tutorial, you'll set up HappyView to act as the AppView for Statusphere. By the end, you'll have indexed records and working XRPC endpoints.

### [The Statusphere lexicon](#the-statusphere-lexicon)

Statusphere uses a single record type, `xyz.statusphere.status`. Each record has two fields:

* `status`: a single emoji
* `createdAt`: a timestamp

Users can set their status as many times as they want. Each status is a new record in their repository, keyed by a TID (timestamp-based identifier). The most recent record is their "current" status.

For more background on how the app works, see the [ATProto Statusphere guide](https://atproto.com/guides/applications).

### [Step 1: Add the record lexicon](#step-1-add-the-record-lexicon)

First, tell HappyView to start indexing Statusphere records. Since `xyz.statusphere.status` is [published on the atproto network](../guides/lexicons#network-lexicons), you can add it directly from the dashboard:

1. Go to **Lexicons > Add Lexicon > Network**
2. Enter `xyz.statusphere.status`
3. HappyView resolves the schema from its authority domain records and shows a preview
4. Enable the **Backfill** toggle so HappyView fetches existing records from the network
5. Click **Add**

HappyView now subscribes to `xyz.statusphere.status` via Jetstream and kicks off a backfill job to index historical records.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/admin/lexicons", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    lexicon_json: {
      lexicon: 1,
      id: "xyz.statusphere.status",
      defs: {
        main: {
          type: "record",
          key: "tid",
          record: {
            type: "object",
            required: ["status", "createdAt"],
            properties: {
              status: { type: "string", maxGraphemes: 1 },
              createdAt: { type: "string", format: "datetime" },
            },
          },
        },
      },
    },
    backfill: true,
  }),
});
```

### [Step 2: Verify records are being indexed](#step-2-verify-records-are-being-indexed)

Once the backfill starts, you should see records appearing in the dashboard:

1. The **home page** shows a live record count and per-collection breakdown
2. Go to **Records** to browse individual indexed statuses
3. Go to **Backfill** to watch the backfill job progress — you'll see the number of repos processed and records fetched

### [Step 3: Create an API client](#step-3-create-an-api-client)

Before you can call any XRPC endpoint, you need an [API client](../guides/api-clients). The client key identifies your application to HappyView and is required on every request.

1. Go to **Settings > API Clients > New client**
2. Set the **Name** to something like "Statusphere Dev"
3. Set the **Client ID URL** and **Client URI** to your app's URL (for local testing, `http://localhost:3000` works)
4. Add a **Redirect URI** (e.g. `http://localhost:3000/oauth/callback`)
5. Click **Create**

Copy the `hvc_`-prefixed **client key** — you'll use it in every request. If you created a confidential client, also save the `hvs_`-prefixed **client secret** immediately; it's only shown once.

For the rest of this tutorial, we'll use `$CLIENT_KEY` to refer to your client key.

### [Step 4: Add a query endpoint for listing statuses](#step-4-add-a-query-endpoint-for-listing-statuses)

Now add a query endpoint to read the indexed data:

1. Go to **Lexicons > Add Lexicon > Local**
2. In the JSON editor, set the `id` to `xyz.statusphere.listStatuses` and change the type to `query`:

```
{
  "lexicon": 1,
  "id": "xyz.statusphere.listStatuses",
  "defs": {
    "main": {
      "type": "query"
    }
  }
}
```

3. A [Lua script](../guides/lua-scripting) editor appears automatically. Replace the default script with:

```
collection = "xyz.statusphere.status"

function handle()
  if params.uri then
    local record = db.get(params.uri)
    if not record then
      error("record not found")
    end
    return { record = record }
  end

  return db.query({
    collection = collection,
    did = params.did,
    limit = tonumber(params.limit) or 20,
    cursor = params.cursor,
  })
end
```

The `collection` variable at the top tells the script which record collection to query. The `handle()` function supports single-record lookups by URI and paginated listing with an optional DID filter.

4. Click **Upload**

Try it out:

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "http://127.0.0.1:3000/xrpc/xyz.statusphere.listStatuses?limit=5",
  { headers: { "X-Client-Key": CLIENT_KEY } },
);
const data = await response.json();
```

```
{
  "records": [
    {
      "uri": "at://did:plc:abc/xyz.statusphere.status/3abc123",
      "status": "😊",
      "createdAt": "2025-01-01T12:00:00Z"
    },
    {
      "uri": "at://did:plc:def/xyz.statusphere.status/3def456",
      "status": "🌟",
      "createdAt": "2025-01-01T11:30:00Z"
    }
  ],
  "cursor": "MjAyNS0wMS0wMVQxMjowMDowMFp8YXQ6Ly9kaWQ6..."
}
```

Filter by a specific user:

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "http://127.0.0.1:3000/xrpc/xyz.statusphere.listStatuses?did=did:plc:abc&limit=1",
  { headers: { "X-Client-Key": CLIENT_KEY } },
);
const data = await response.json();
```

Fetch a single record by URI:

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "http://127.0.0.1:3000/xrpc/xyz.statusphere.listStatuses?uri=at://did:plc:abc/xyz.statusphere.status/3abc123",
  { headers: { "X-Client-Key": CLIENT_KEY } },
);
const data = await response.json();
```

### [Step 5: Add a procedure endpoint for setting status](#step-5-add-a-procedure-endpoint-for-setting-status)

Add a write endpoint so users can set their status through your AppView:

1. Go to **Lexicons > Add Lexicon > Local**
2. In the JSON editor, set the `id` to `xyz.statusphere.setStatus` and change the type to `procedure`:

```
{
  "lexicon": 1,
  "id": "xyz.statusphere.setStatus",
  "defs": {
    "main": {
      "type": "procedure"
    }
  }
}
```

3. A default Lua script is generated — replace it with:

```
collection = "xyz.statusphere.status"

function handle()
  local r = Record(collection, {
    status = input.status,
    createdAt = now(),
  })
  r:save()
  return { uri = r._uri, cid = r._cid }
end
```

4. Click **Upload**

This creates a `POST /xrpc/xyz.statusphere.setStatus` endpoint that creates records on the user's PDS and indexes them locally.

### [Step 6: Test the procedure endpoint](#step-6-test-the-procedure-endpoint)

Set a status. This requires DPoP authentication — the [JavaScript SDK](../sdk/overview) handles this for you, but you can test with curl if you have a token:

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/xrpc/xyz.statusphere.setStatus", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    Authorization: `DPoP ${ACCESS_TOKEN}`,
    DPoP: DPOP_PROOF,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ status: "🚀" }),
});
const data = await response.json();
```

```
{
  "uri": "at://did:plc:yourDID/xyz.statusphere.status/3xyz789",
  "cid": "bafyreiabc123..."
}
```

The record is created on your PDS and immediately indexed by HappyView.

### [What you've built](#what-youve-built)

With three lexicons and a few lines of Lua, you have a complete Statusphere AppView:

* **Real-time indexing** of `xyz.statusphere.status` records from the entire atproto network
* **Historical backfill** of existing status records
* **A query endpoint** (`xyz.statusphere.listStatuses`) with filtering, pagination, and single-record lookups
* **A write endpoint** (`xyz.statusphere.setStatus`) that creates records on the user's PDS and indexes them locally

Everything was done through the dashboard — no server restarts, no config files, no deploys. For automation and CI/CD, the same operations are available via the [admin API](../api-reference/admin/admin-api).

### [Next steps](#next-steps)

* [API Clients](../guides/api-clients): Public vs. confidential clients, DPoP authentication, and rate limiting
* [Lua Scripting](../guides/lua-scripting): Explore the full Record and database APIs to build more complex queries
* [Lexicons](../guides/lexicons): Learn about network lexicons, the backfill flag, and record collections
* [XRPC API](../api-reference/xrpc-api): Understand how the generated endpoints behave
* [Admin API](../api-reference/admin/admin-api): Automate lexicon management via the API
* [Statusphere example app](https://github.com/bluesky-social/statusphere-example-app): See the full Statusphere frontend
* [ATProto Statusphere guide](https://atproto.com/guides/applications): How the app works at the protocol level

[Production

Previous Page](/getting-started/deployment/production)[Migrating from v1

Next Page](/guides/upgrading-to-v2)

#### On this page

[The Statusphere lexicon](#the-statusphere-lexicon)[Step 1: Add the record lexicon](#step-1-add-the-record-lexicon)[Step 2: Verify records are being indexed](#step-2-verify-records-are-being-indexed)[Step 3: Create an API client](#step-3-create-an-api-client)[Step 4: Add a query endpoint for listing statuses](#step-4-add-a-query-endpoint-for-listing-statuses)[Step 5: Add a procedure endpoint for setting status](#step-5-add-a-procedure-endpoint-for-setting-status)[Step 6: Test the procedure endpoint](#step-6-test-the-procedure-endpoint)[What you've built](#what-youve-built)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/api-reference/xrpc-api
title: XRPC API | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

XRPC API

## XRPC API

[XRPC](https://atproto.com/specs/xrpc) is the HTTP-based RPC protocol used by the atproto. HappyView dynamically registers XRPC endpoints based on your uploaded [lexicons](../guides/lexicons): query lexicons become `GET /xrpc/{nsid}` routes, procedure lexicons become `POST /xrpc/{nsid}` routes.

If a query or procedure lexicon has a [Lua script](../guides/lua-scripting) attached, the script handles the request. Otherwise, HappyView uses built-in default behavior (described below).

### [Auth](#auth)

XRPC routes accept several authentication methods:

* **DPoP auth** — `Authorization: DPoP <token>` + `DPoP` proof header + `X-Client-Key`
* **Space credentials** — `Authorization: Bearer <space_credential_jwt>` (space-scoped routes only)
* **Service auth JWTs** — `Authorization: Bearer <service_auth_jwt>` (inter-service calls)
* **Cookie-based session auth** — signed session cookies (used by the dashboard, falls back when no `Authorization` header is present)
* **Anonymous** — no auth headers (identity is `nil` in Lua scripts)

Bearer API keys (`hv_*`) are rejected on XRPC routes — they are only accepted on the [admin API](admin/admin-api).

Default auth behavior:

* **Queries** (`GET /xrpc/{method}`): unauthenticated by default (identity available if provided)
* **Procedures** (`POST /xrpc/{method}`): require authentication (DPoP, session cookie, or service auth)
* **getProfile**: requires auth
* **uploadBlob**: requires auth

### [Fixed endpoints](#fixed-endpoints)

These endpoints are always available regardless of which lexicons are loaded.

#### [Health check](#health-check)

```
GET /health
```

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/health");
const text = await response.text(); // "ok"
```

**Response**: `200 OK` with body `ok`

#### [Get profile](#get-profile)

```
GET /xrpc/app.bsky.actor.getProfile
```

Returns the authenticated user's profile, resolved from their PDS via PLC directory lookup.

TypeScriptJavaScriptRustGocURL

```
const CLIENT_KEY = "hvc_..."; // your API client key
const TOKEN = "..."; // your access token

interface ProfileResponse {
  did: string;
  handle: string;
  displayName: string;
  description: string;
  avatarURL: string;
}

const response = await fetch(
  "http://127.0.0.1:3000/xrpc/app.bsky.actor.getProfile",
  {
    headers: {
      "X-Client-Key": CLIENT_KEY,
      Authorization: `Bearer ${TOKEN}`,
    },
  },
);

const profile: ProfileResponse = await response.json();
```

**Response**: `200 OK`

```
{
  "did": "did:plc:abc123",
  "handle": "user.bsky.social",
  "displayName": "User Name",
  "description": "Bio text",
  "avatarURL": "https://pds.example.com/xrpc/com.atproto.sync.getBlob?did=did:plc:abc123&cid=bafyabc"
}
```

#### [Upload blob](#upload-blob)

```
POST /xrpc/com.atproto.repo.uploadBlob
```

Proxies a blob upload to the authenticated user's PDS. Maximum size: 50MB.

TypeScriptJavaScriptRustGocURL

```
import { readFile } from "node:fs/promises";

const imageData = await readFile("image.png");

const response = await fetch(
  "http://127.0.0.1:3000/xrpc/com.atproto.repo.uploadBlob",
  {
    method: "POST",
    headers: {
      "X-Client-Key": CLIENT_KEY,
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "image/png",
    },
    body: imageData,
  },
);
```

**Response**: proxied from the user's PDS.

### [Dynamic query endpoints](#dynamic-query-endpoints)

Query endpoints are generated from lexicons with `type: "query"`. Without a [Lua script](../guides/lua-scripting), they support two built-in modes depending on whether a `uri` parameter is provided.

#### [Single record](#single-record)

```
GET /xrpc/{method}?uri={at-uri}
```

TypeScriptJavaScriptRustGocURL

```
const CLIENT_KEY = "hvc_..."; // your API client key

const params = new URLSearchParams({
  uri: "at://did:plc:abc/xyz.statusphere.status/abc123",
});

interface RecordResponse {
  record: {
    uri: string;
    $type: string;
    status: string;
    createdAt: string;
  };
}

const response = await fetch(
  `http://127.0.0.1:3000/xrpc/xyz.statusphere.listStatuses?${params}`,
  { headers: { "X-Client-Key": CLIENT_KEY } },
);

const data: RecordResponse = await response.json();
```

**Response**: `200 OK`

```
{
  "record": {
    "uri": "at://did:plc:abc/xyz.statusphere.status/abc123",
    "$type": "xyz.statusphere.status",
    "status": "\ud83d\ude0a",
    "createdAt": "2025-01-01T12:00:00Z"
  }
}
```

Media blobs are automatically enriched with a `url` field pointing to the user's PDS.

#### [List records](#list-records)

```
GET /xrpc/{method}?limit=20&cursor=<opaque>&did=optional
```

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `limit` | integer | 20 | Max records to return (max 100) |
| `cursor` | string | --- | Opaque pagination cursor from a previous response |
| `did` | string | --- | Filter records by DID |

TypeScriptJavaScriptRustGocURL

```
const params = new URLSearchParams({ limit: "10", did: "did:plc:abc" });

interface ListResponse {
  records: Array<{
    uri: string;
    status: string;
    createdAt: string;
  }>;
  cursor?: string;
}

const response = await fetch(
  `http://127.0.0.1:3000/xrpc/xyz.statusphere.listStatuses?${params}`,
  { headers: { "X-Client-Key": CLIENT_KEY } },
);

const data: ListResponse = await response.json();
```

**Response**: `200 OK`

```
{
  "records": [
    {
      "uri": "at://did:plc:abc/xyz.statusphere.status/abc123",
      "status": "\ud83d\ude0a",
      "createdAt": "2025-01-01T12:00:00Z"
    }
  ],
  "cursor": "MjAyNS0wMS0wMVQxMjowMDowMFp8YXQ6Ly9kaWQ6..."
}
```

The `cursor` field is an opaque string present only when more records exist. Pass it back as-is to fetch the next page.

### [Dynamic procedure endpoints](#dynamic-procedure-endpoints)

Procedure endpoints are generated from lexicons with `type: "procedure"`. Without a [Lua script](../guides/lua-scripting), HappyView auto-detects create vs update based on whether the request body contains a `uri` field.

#### [Create a record](#create-a-record)

```
POST /xrpc/{method}
```

When the body does **not** contain a `uri` field, a new record is created.

TypeScriptJavaScriptRustGocURL

```
const CLIENT_KEY = "hvc_..."; // your API client key
const ACCESS_TOKEN = "..."; // DPoP access token
const DPOP_PROOF = "..."; // DPoP proof JWT

const response = await fetch(
  "http://127.0.0.1:3000/xrpc/xyz.statusphere.setStatus",
  {
    method: "POST",
    headers: {
      "X-Client-Key": CLIENT_KEY,
      Authorization: `DPoP ${ACCESS_TOKEN}`,
      DPoP: DPOP_PROOF,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "\ud83d\ude0a",
      createdAt: "2025-01-01T12:00:00Z",
    }),
  },
);
```

HappyView proxies this to the user's PDS as `com.atproto.repo.createRecord`, then indexes the created record locally.

#### [Update a record](#update-a-record)

When the body **contains** a `uri` field, the existing record is updated.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "http://127.0.0.1:3000/xrpc/xyz.statusphere.setStatus",
  {
    method: "POST",
    headers: {
      "X-Client-Key": CLIENT_KEY,
      Authorization: `DPoP ${ACCESS_TOKEN}`,
      DPoP: DPOP_PROOF,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uri: "at://did:plc:abc/xyz.statusphere.status/abc123",
      status: "\ud83c\udf1f",
      createdAt: "2025-01-01T13:00:00Z",
    }),
  },
);
```

HappyView proxies this to the user's PDS as `com.atproto.repo.putRecord`, then upserts the record locally.

**Response** for both: proxied from the user's PDS.

### [XRPC proxy](#xrpc-proxy)

When a request targets an NSID that has no locally registered lexicon, HappyView resolves the NSID's authority via DNS and forwards the request. Admins can restrict which NSIDs are proxied — see [XRPC Proxy settings](admin/xrpc-proxy).

### [Errors](#errors)

All error responses return JSON with an `error` field:

```
{
  "error": "description of what went wrong"
}
```

| Status | Meaning | Common causes |
| --- | --- | --- |
| `400 Bad Request` | Invalid input | Missing required fields, malformed JSON, invalid AT URI |
| `401 Unauthorized` | Authentication failed | Missing or invalid client identification or DPoP authentication |
| `404 Not Found` | Method or record not found | XRPC method has no matching lexicon, or the requested record doesn't exist |
| `500 Internal Server Error` | Server-side failure | Lua script error, database error, or upstream PDS failure |

#### [Lua script errors](#lua-script-errors)

When a Lua script fails, the response is `500` with one of:

* `{"error": "script execution failed"}`: syntax error, runtime error, or missing `handle()` function
* `{"error": "script exceeded execution time limit"}`: the script hit the 1,000,000 instruction limit

The full error details are logged server-side but not exposed to the client. See [Lua Scripting - Debugging](../guides/lua-scripting#debugging) for how to diagnose script issues.

#### [PDS errors](#pds-errors)

When a procedure proxies a write to the user's PDS and the PDS returns an error, HappyView forwards the PDS response status code and body directly to the client.

### [Next steps](#next-steps)

* [Lua Scripting](../guides/lua-scripting): Override the default query and procedure behavior with custom logic
* [Lexicons](../guides/lexicons): Understand how lexicons generate these endpoints
* [Admin API](admin/admin-api): Manage lexicons and monitor your instance

[Changelog

Previous Page](/experimental/spaces/changelog)[Overview

Next Page](/api-reference/admin/admin-api)

#### On this page

[Auth](#auth)[Fixed endpoints](#fixed-endpoints)[Health check](#health-check)[Get profile](#get-profile)[Upload blob](#upload-blob)[Dynamic query endpoints](#dynamic-query-endpoints)[Single record](#single-record)[List records](#list-records)[Dynamic procedure endpoints](#dynamic-procedure-endpoints)[Create a record](#create-a-record)[Update a record](#update-a-record)[XRPC proxy](#xrpc-proxy)[Errors](#errors)[Lua script errors](#lua-script-errors)[PDS errors](#pds-errors)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/getting-started/dashboard
title: Dashboard | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Dashboard

## Dashboard

HappyView ships with a web dashboard that provides a visual interface for everything the [admin API](../api-reference/admin/admin-api) offers. It runs as a separate Next.js application alongside the Rust backend and authenticates via atproto OAuth.

On a fresh deployment with no users in the database, the first person to log in to the dashboard is automatically bootstrapped as the super user with all permissions — so log in with the handle you want to own the instance first.

### [Data](#data)

#### [Lexicons](#lexicons)

Navigate to **Lexicons** to see all uploaded lexicons. Each entry shows the NSID, type (record, query, procedure), and whether a Lua script is attached.

##### [Adding a lexicon](#adding-a-lexicon)

Click **Add Lexicon** and choose **Local** or **Network**.

**Local** lexicons are defined by you. The editor shows two side-by-side panels (stacked on mobile):

* **Lexicon JSON** (left): define your lexicon schema
* **Lua Script** (right): write the handler for query/procedure types

The Lua panel only appears when the lexicon's `defs.main.type` is `query` or `procedure`. For record-type lexicons, only the JSON panel is shown.

HappyView generates a default Lua script when you first set the type to query or procedure. The template updates when the type changes, but once you edit the script your changes are preserved.

Toggle **Enable backfill** to index historical records when uploading a record-type lexicon.

**Network** lexicons are fetched from the atproto network. Enter an NSID (e.g. `xyz.statusphere.status`) and HappyView resolves the schema automatically. If found, the lexicon JSON is displayed in a read-only editor. Click **Add** to track it. Network lexicons are kept up to date via the Jetstream subscription. See [Lexicons - Network lexicons](../guides/lexicons#network-lexicons) for how resolution works.

##### [JSON editor](#json-editor)

The JSON editor provides real-time validation against the atproto Lexicon v1 schema:

* Validation for Lexicon format
* Auto-complete for definition types (`record`, `query`, `procedure`, `subscription`), property types (`string`, `integer`, `boolean`, `ref`, `union`, `blob`, `cid-link`, etc.), and schema structure (`defs`, `main`, `properties`, `required`)
* Enforces the required top-level shape: `lexicon`, `id`, and `defs.main`

##### [Lua editor](#lua-editor)

The Lua editor provides context-aware code completions, including suggestions for the `Record`, `db`, `input`, and `params` APIs as well as Lua keywords, builtins, and standard library functions. It also has snippets for `if`, `for`, `function`, etc.

See [Lua Scripting](../guides/lua-scripting) for the full runtime reference and examples.

#### [Records](#records)

Navigate to **Records** to browse all indexed atproto records. Records are grouped by collection and searchable. Each record shows its AT URI, author DID, and the raw record JSON.

#### [Backfill](#backfill)

Navigate to **Backfill** to view and manage backfill jobs. You can start a new backfill for any record-type lexicon to import historical records from the network. The table shows each job's collection, DID scope, current stage, and start time. Click a row to open a detail sheet with full metadata and a stage-by-stage progress log that updates in real time. Running jobs can be cancelled from the detail sheet — the job transitions to "cancelling" while the worker finishes its current batch, then to "cancelled". See [Backfill](../guides/backfill) for how the process works.

#### [Dead Letters](#dead-letters)

Navigate to **Dead Letters** to view records that failed to index. Each entry shows the AT URI, error reason, and the raw record payload. You can retry, reindex, or dismiss individual dead letters, or use bulk actions to handle many at once. The sidebar badge shows the count of unresolved dead letters.

### [Access](#access)

#### [Users](#users)

Navigate to **Users** to manage who can access the admin API and dashboard. You can add users by DID, assign permissions individually or via a template (`viewer`, `operator`, `manager`, `full_access`), and remove users. The super user is highlighted and has all permissions by default. See [Permissions](../guides/permissions) for what each permission grants.

#### [API Keys](#api-keys)

Create and revoke admin API keys for automation. Each key is scoped to specific permissions and tied to the creating user. See [API Keys](../guides/api-keys) for details.

#### [API Clients](#api-clients)

Register and manage third-party API clients. Each client gets an `hvc_…` client key and `hvs_…` client secret. You can configure the client type (confidential or public), allowed origins, scopes, and per-client rate limits. See [Authentication — API client identification](authentication#xrpc-api-client-identification) for how clients are used.

### [Integrations](#integrations)

#### [Plugins](#plugins)

Manage installed plugins and configure plugin secrets. Plugins extend HappyView with additional functionality. Plugin secrets are encrypted at rest when `TOKEN_ENCRYPTION_KEY` is configured. See [Plugins](../guides/plugins) for details.

#### [Labelers](#labelers)

Configure labeler subscriptions for content labeling. See [Labelers](../guides/labelers) for details.

### [System](#system)

#### [General](#general)

Configure instance-level settings: application name, logo, terms of service URL, and privacy policy URL. These values appear on OAuth authorization screens and can also be set via environment variables — dashboard values take precedence.

#### [XRPC Proxy](#xrpc-proxy)

Control which unrecognized XRPC methods are forwarded to their resolved authority. Choose from four modes: **Disabled** (block all proxy requests), **Open** (proxy everything — the default), **Allowlist** (only proxy NSIDs matching your patterns), or **Blocklist** (proxy everything except matching patterns). Allowlist and blocklist modes accept NSID patterns with trailing wildcards (e.g. `com.example.*`). Locally registered lexicons are always served regardless of this setting. See [XRPC Proxy](../api-reference/admin/xrpc-proxy) for the full API reference.

#### [ENV Variables](#env-variables)

View the current values of all environment variables that affect HappyView's behavior. This is a read-only view — values are set via your deployment environment, not the dashboard.

#### [Event Logs](#event-logs)

View the audit log of admin actions. Events include user creation, lexicon uploads, permission changes, backfill starts, and more. Each entry shows the event type, severity, actor, subject, and timestamp. Events are retained for the number of days configured by `EVENT_LOG_RETENTION_DAYS` (default 30).

#### [Service Identity](#service-identity)

Configure the AT Protocol service identity for your HappyView instance — either a `did:web` derived from your public URL, a `did:plc` you control, or a linked atproto account. This determines the DID that signs service-level interactions on the network.

#### [Experiments](#experiments)

Toggle experimental feature flags for your instance. Flags like `feature.spaces_enabled` can be enabled here before they are promoted to stable configuration options.

#### [Scripts](#scripts)

Manage script variables that are injected into Lua scripts at runtime. Variables defined here are available to all scripts and can be used to store shared configuration without hardcoding values in individual scripts.

### [About](#about)

The **About** page shows the current HappyView version and instance configuration: public URL, database backend, Jetstream URL, relay URL, and PLC directory URL.

### [Next steps](#next-steps)

* [Lexicons](../guides/lexicons) — how lexicons drive HappyView's indexing and routing
* [Lua Scripting](../guides/lua-scripting) — write custom query and procedure logic
* [Permissions](../guides/permissions) — manage user access to admin features
* [Configuration](configuration) — full list of environment variables

[Service Identity

Previous Page](/getting-started/service-identity)[Authentication

Next Page](/getting-started/authentication)

#### On this page

[Data](#data)[Lexicons](#lexicons)[Adding a lexicon](#adding-a-lexicon)[JSON editor](#json-editor)[Lua editor](#lua-editor)[Records](#records)[Backfill](#backfill)[Dead Letters](#dead-letters)[Access](#access)[Users](#users)[API Keys](#api-keys)[API Clients](#api-clients)[Integrations](#integrations)[Plugins](#plugins)[Labelers](#labelers)[System](#system)[General](#general)[XRPC Proxy](#xrpc-proxy)[ENV Variables](#env-variables)[Event Logs](#event-logs)[Service Identity](#service-identity)[Experiments](#experiments)[Scripts](#scripts)[About](#about)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/getting-started/service-identity
title: Service Identity | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Service Identity

## Service Identity

An AT Protocol service identity lets your AppView authenticate itself to other services on the network. When a user's PDS routes a request, it verifies the destination by resolving the AppView's DID — without a service identity, standard AT Protocol app routing won't reach your instance.

HappyView can operate without a service identity using its built-in auth, but configuring one is recommended for full network compatibility.

### [Identity modes](#identity-modes)

HappyView supports three ways to establish a service identity during setup.

#### [Domain identity (did:web)](#domain-identity-didweb)

Your domain name becomes your identity. HappyView generates a signing keypair and serves a [DID document](https://atproto.com/specs/did#did-web) at `/.well-known/did.json` automatically.

This is the simplest option — no external registration is needed. The identity is tied to your domain: if you change domains, you'll need to reconfigure.

#### [Network identity (did:plc)](#network-identity-didplc)

HappyView registers a new identity in the [PLC directory](https://atproto.com/specs/did#did-plc), a public registry that maps DIDs to their metadata. This is the most durable option — the identity survives domain changes because it isn't tied to any single hostname.

During registration, HappyView generates two keypairs:

* **Signing key** — Used to authenticate requests from your AppView. Stored encrypted on the server and managed automatically.
* **Rotation key** — Used to recover or update the identity if the signing key is lost or the server goes down. This key is generated once and must be downloaded immediately — it cannot be retrieved later.

Store the rotation key file somewhere safe and offline (e.g. a password manager, encrypted USB drive, or secure backup). You will need it if you ever need to migrate your identity to a new server or recover from data loss.

#### [Linked account](#linked-account)

Link your AppView to an existing AT Protocol account you control. HappyView verifies ownership by redirecting you to sign in through that account's PDS, then uses the account's existing DID as the service identity.

### [Choosing an identity mode](#choosing-an-identity-mode)

|  | Domain (did:web) | Network (did:plc) | Linked account |
| --- | --- | --- | --- |
| Setup complexity | Automatic | Requires key backup | Requires existing account |
| Domain independence | No — tied to your domain | Yes — survives domain changes | Depends on the linked account |
| Key management | Automatic | You must back up the rotation key | Managed by the linked account's PDS |
| Best for | Single-domain deployments | Long-lived production instances | Operators who already have an AT Protocol presence |

### [Skipping setup](#skipping-setup)

You can skip service identity configuration during setup. Your AppView will work with HappyView's built-in authentication, but standard AT Protocol service-to-service routing won't be available. You can configure a service identity later from **Settings > Service Identity** in the dashboard.

### [Further reading](#further-reading)

* [AT Protocol identity specification](https://atproto.com/guides/identity)
* [DID methods in AT Protocol](https://atproto.com/specs/did)
* [AT Protocol glossary](https://atproto.com/guides/glossary)

[Configuration

Previous Page](/getting-started/configuration)[Dashboard

Next Page](/getting-started/dashboard)

#### On this page

[Identity modes](#identity-modes)[Domain identity (did:web)](#domain-identity-didweb)[Network identity (did:plc)](#network-identity-didplc)[Linked account](#linked-account)[Choosing an identity mode](#choosing-an-identity-mode)[Skipping setup](#skipping-setup)[Further reading](#further-reading)

---
<!--
URL: https://happyview.dev/guides/lexicons
title: Lexicons | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Lexicons

## Lexicons

Lexicons are the core building block of HappyView. They're [atproto schema definitions](https://atproto.com/specs/lexicon) that describe your data model, and HappyView uses them to decide which records to index from the network and what XRPC endpoints to serve.

You don't write route handlers or database queries; you upload a lexicon and HappyView generates the infrastructure from it. There are two ways to add lexicons: uploading them via the [admin API](../api-reference/admin/lexicons) or [dashboard](../getting-started/dashboard), or fetching them directly from the atproto network via [DNS authority resolution](#network-lexicons).

### [Supported lexicon types](#supported-lexicon-types)

| Type | Effect |
| --- | --- |
| `record` | Adds the collection to the Jetstream subscription filter and indexes records into the database. Supports [record scripts](label-scripts) |
| `query` | Registers a `GET /xrpc/{nsid}` endpoint that queries indexed records |
| `procedure` | Registers a `POST /xrpc/{nsid}` endpoint that proxies writes to the user's PDS |
| `definitions` | Stored but does not generate routes or subscriptions |

A typical setup has three lexicons working together: a **record** lexicon that defines the data and triggers indexing, a **query** lexicon that exposes a read endpoint, and a **procedure** lexicon that exposes a write endpoint. The [Statusphere tutorial](../tutorials/statusphere) walks through this pattern end-to-end.

### [Target collection](#target-collection)

Query and procedure lexicons don't store data themselves. They operate on records stored by a record-type lexicon. The `target_collection` field tells HappyView which record collection to read from or write to. Without it, default queries and procedures won't know which DB records to operate on.

For example, a query lexicon `xyz.statusphere.listStatuses` would set `target_collection` to `xyz.statusphere.status` to read from that record collection.

See the [admin API](../api-reference/admin/lexicons#upload--upsert-a-lexicon) for how to set `target_collection` when uploading.

### [Backfill flag](#backfill-flag)

When uploading a record-type lexicon, HappyView automatically creates a backfill job to discover existing records. If you only want to index new records going forward, you can set `backfill` to `false`.

### [Jetstream collection filters](#jetstream-collection-filters)

When record-type lexicons change (uploaded or deleted), HappyView reconnects to Jetstream with an updated collection filter. HappyView always includes `com.atproto.lexicon.schema` in the filter to track network lexicon updates.

Deleting a lexicon stops live indexing for that collection but does **not** remove previously indexed records from the database. If you want to start fresh, you'll need to delete the records separately (e.g. via the admin API or directly in the database) before re-adding the lexicon and running a <backfill>.

### [Network lexicons](#network-lexicons)

If a lexicon has already been published, you don't need to upload the JSON manually. Point HappyView at the NSID and it fetches the lexicon directly from the network. Network lexicons are kept updated automatically via the Jetstream subscription. If the publisher updates their schema, your instance will pick up the change.

#### [NSID authority resolution](#nsid-authority-resolution)

Lexicons are stored as records themselves with the `com.atproto.lexicon.schema` NSID and the rkey set to the lexicon's NSID. To find which repo holds a lexicon, HappyView resolves the NSID's authority:

1. Extract the authority from the NSID (all segments except the last). For example, `xyz.statusphere.status` has authority `xyz.statusphere`.
2. Reverse the authority segments to form a domain: `statusphere.xyz`.
3. Look up the DNS TXT record at `_lexicon.{domain}` (e.g. `_lexicon.statusphere.xyz`).
4. Parse the TXT record for a `did=<DID>` value.
5. Resolve the DID to a PDS endpoint via the PLC directory.

#### [Fetching](#fetching)

Once the authority DID and PDS endpoint are known, HappyView calls `com.atproto.repo.getRecord` with:

* `repo` = the authority DID
* `collection` = `com.atproto.lexicon.schema`
* `rkey` = the NSID

The `value` field of the response is the raw lexicon JSON.

#### [Live updates via Jetstream](#live-updates-via-jetstream)

HappyView's Jetstream subscription always includes the `com.atproto.lexicon.schema` collection, so it receives real-time events whenever a lexicon schema record is created, updated, or deleted on the network. When an event arrives, HappyView checks whether the record's DID and rkey (the NSID) match any tracked network lexicon:

* **create/update**: The new schema is parsed and upserted into the `happyview_lexicons` table and the in-memory registry. If it's a record-type lexicon, Jetstream collection filters are updated to include the new collection.
* **delete**: The lexicon is removed from the `happyview_lexicons` table and registry, and collection filters are updated accordingly.

#### [Startup re-fetch](#startup-re-fetch)

On every startup, HappyView re-fetches all network lexicons from their respective PDSes. This ensures consistency even if events were missed while offline. Failures are logged as warnings but don't block startup.

### [XRPC routing for unknown methods](#xrpc-routing-for-unknown-methods)

When a client calls `/xrpc/{method}` and HappyView has a local lexicon for that NSID, the request is handled by the lexicon's Lua script (or HappyView's default behavior if no script is attached). Otherwise, HappyView attempts to proxy the request to the method's **home authority** using the same DNS-based authority resolution described above:

1. Extract the authority from the NSID (all segments except the last). `com.example.foo.getBar` → authority `com.example.foo`.
2. Reverse it to form a domain: `foo.example.com`.
3. Look up the `_lexicon.foo.example.com` TXT record for the authority's DID.
4. Resolve that DID to a PDS endpoint via the PLC directory.
5. Proxy the request to `{pds_endpoint}/xrpc/{method}`.

A few things to note:

* HappyView does **not** proxy to the reversed hostname directly. `foo.example.com` is only the DNS host for the TXT record — the actual XRPC request goes to whatever PDS endpoint the authority DID resolves to.
* Proxying applies equally to queries and procedures. For procedures, HappyView uses the caller's OAuth session to attach a DPoP-bound access token (see [Authentication](../getting-started/authentication#proxying-procedures-to-the-users-pds)).
* If authority resolution fails — no TXT record, unresolvable DID, or the target PDS doesn't support the method — the client gets an error back. HappyView does not fall back to any other routing strategy.
* Tracking a network lexicon does **not** make HappyView handle requests for that NSID locally. Network lexicons are only about indexing record collections and keeping the schema up to date. If a client calls a query NSID that you've tracked as a network lexicon but haven't uploaded a local query lexicon for, HappyView still proxies the request out — it won't query your local record table. To serve a method locally, upload a local query or procedure lexicon with a matching `target_collection`.

In short: if you want to serve an XRPC method on your instance, you need a local lexicon for it. Otherwise HappyView attempts to proxy to the method's home authority.

### [Next steps](#next-steps)

* [Lua Scripting](./lua-scripting): Add custom query and procedure logic to your endpoints
* [Record & Label Scripts](label-scripts): Run Lua scripts when records are indexed or labels arrive
* [XRPC API](../api-reference/xrpc-api): Understand how the generated endpoints behave
* [Backfill](backfill): Learn how historical records are indexed
* [Admin API](../api-reference/admin/admin-api): Full reference for lexicon management endpoints

[Migrating from v1

Previous Page](/guides/upgrading-to-v2)[Backfill

Next Page](/guides/backfill)

#### On this page

[Supported lexicon types](#supported-lexicon-types)[Target collection](#target-collection)[Backfill flag](#backfill-flag)[Jetstream collection filters](#jetstream-collection-filters)[Network lexicons](#network-lexicons)[NSID authority resolution](#nsid-authority-resolution)[Fetching](#fetching)[Live updates via Jetstream](#live-updates-via-jetstream)[Startup re-fetch](#startup-re-fetch)[XRPC routing for unknown methods](#xrpc-routing-for-unknown-methods)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/guides/labelers
title: Labelers | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Labelers

## Labelers

Labelers are external services that apply content labels to records. They operate out-of-band — labeler data does not appear in repos or flow through relays. HappyView can subscribe to labelers and store the labels they emit, making them available on records in the admin dashboard and via Lua scripts.

### [How labelers work](#how-labelers-work)

A labeler is identified by its DID. When you subscribe to a labeler, HappyView connects directly to the labeler's WebSocket and streams label events in real time. Each label targets a specific record URI and carries a value like `nudity`, `spam`, or any custom string the labeler defines.

Labels are stored in a `happyview_labels` table in the database. HappyView tracks a cursor per labeler subscription so it can resume from where it left off after a restart.

Records can also have **self-labels** — labels applied by the record's author and embedded directly in the record's `labels.values` array. These are not managed by external labelers but are displayed alongside external labels in the dashboard.

### [Adding a labeler](#adding-a-labeler)

1. Go to **Settings > Labelers** in the dashboard sidebar
2. Click **Add Labeler**
3. Enter the labeler's DID (e.g., `did:plc:ar7c4by46qjdydhdevvrndac`)
4. Click **Add**

HappyView begins consuming labels from the labeler immediately. The subscription appears in the table with an `active` status.

You can also add a labeler via the API:

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key
const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

const response = await fetch("http://127.0.0.1:3000/admin/labelers", {
  method: "POST",
  headers,
  body: JSON.stringify({ did: "did:plc:ar7c4by46qjdydhdevvrndac" }),
});
```

### [Pausing and resuming](#pausing-and-resuming)

You can pause a labeler subscription to temporarily stop consuming labels without losing your cursor position. Click the pause icon next to the labeler in the table, or use the API:

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key

const response = await fetch(
  "http://127.0.0.1:3000/admin/labelers/did:plc:ar7c4by46qjdydhdevvrndac",
  {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: "paused" }),
  },
);
```

Resume by clicking the play icon or sending `{ "status": "active" }`.

### [Deleting a labeler](#deleting-a-labeler)

Deleting a labeler removes the subscription **and all labels it has emitted**. This cannot be undone.

1. Click the trash icon next to the labeler
2. Confirm in the dialog

Or via the API:

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "http://127.0.0.1:3000/admin/labelers/did:plc:ar7c4by46qjdydhdevvrndac",
  {
    method: "DELETE",
    headers: { Authorization: `Bearer ${TOKEN}` },
  },
);
```

### [Labels on records](#labels-on-records)

Labels appear in the **Labels** column on the Records page as color-coded badges:

* **Red** — content warnings: `nudity`, `sexual`, `graphic-media`, `violence`, `gore`
* **Amber** — moderation labels: `spam`, `impersonation`
* **Neutral** — everything else

Self-labels (applied by the record author) use an outline badge style to distinguish them from external labels. Hover over a badge to see the source labeler's DID.

Labels are also available in the records API response and in Lua scripts via the [`atproto.get_labels` and `atproto.get_labels_batch`](../api-reference/lua/atproto-api#atprotoget_labels) functions.

### [Using labels in your AppView](#using-labels-in-your-appview)

Labeler subscriptions give your AppView access to content moderation signals without building your own moderation system. Some ways to use them:

* **Content filtering**: Use labels in query scripts to exclude or down-rank flagged content. Check labels with `atproto.get_labels` and filter results before returning them.
* **Moderation dashboards**: Display labels alongside records in your admin dashboard to review flagged content. Labels appear automatically on the Records page once a labeler is subscribed.
* **Custom labelers**: You can subscribe to any labeler that implements the atproto labeler spec, including community-run labelers or one you operate yourself for domain-specific moderation (e.g. labeling game content by age rating).

### [Permissions](#permissions)

| Action | Permission |
| --- | --- |
| View labeler list | `labelers:read` |
| Add or pause/resume | `labelers:create` |
| Delete a labeler | `labelers:delete` |

### [Next steps](#next-steps)

* [Admin API — Labelers](../api-reference/admin/labelers) — full endpoint documentation
* [atproto API](../api-reference/lua/atproto-api) — access labels in Lua scripts with `get_labels` and `get_labels_batch`
* [Permissions](./permissions) — manage user access to labeler operations

[Attestation Signing

Previous Page](/guides/attestation-signing)[Plugins

Next Page](/guides/plugins)

#### On this page

[How labelers work](#how-labelers-work)[Adding a labeler](#adding-a-labeler)[Pausing and resuming](#pausing-and-resuming)[Deleting a labeler](#deleting-a-labeler)[Labels on records](#labels-on-records)[Using labels in your AppView](#using-labels-in-your-appview)[Permissions](#permissions)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/reference/glossary
title: Glossary | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Glossary

## Glossary

Key terms used throughout the HappyView documentation. For a broader introduction to the atproto, see the [official ATProto glossary](https://atproto.com/guides/glossary).

### [atproto terms](#atproto-terms)

**AppView** — A backend service that indexes atproto records and serves them through an API. HappyView is an AppView. See the [ATProto docs](https://atproto.com/guides/glossary#app-view) for more.

**DID** (Decentralized Identifier) — A persistent, globally unique identifier for an account (e.g. `did:plc:abc123`).

**Firehose** — A real-time stream of all record events (creates, updates, deletes) across the atproto network. HappyView consumes a filtered slice of this via [Jetstream](https://github.com/bluesky-social/jetstream).

**Handle** — A human-readable name for an account (e.g. `user.bsky.social`). Handles resolve to a DID via a DNS TXT record or an HTTP `.well-known/atproto-did` lookup.

**Lexicon** — A schema definition for atproto data types and API methods. Lexicons define what records look like, what endpoints exist, and what parameters they accept. See [Lexicons](../guides/lexicons).

**NSID** (Namespaced Identifier) — A reverse-DNS identifier for a lexicon (e.g. `xyz.statusphere.status`). The authority is everything except the last segment.

**PDS** (Personal Data Server) — The server that hosts a user's data. Users can be on any PDS — there's no single server. HappyView proxies writes back to each user's PDS.

**PLC directory** — A public service (e.g. `plc.directory`) that maps DIDs to their DID documents, which contain the user's PDS endpoint and other metadata.

**Record** — A single piece of data in an atproto repository, identified by an AT URI (e.g. `at://did:plc:abc/xyz.statusphere.status/abc123`).

**Relay** — A network service that aggregates repository data from many PDSes. HappyView queries the relay during [backfill](../guides/backfill) to discover which repos contain records for a given collection, then fetches each repo's records directly from its PDS.

**rkey** (Record Key) — The unique key for a record within a collection and repo. These are most commonly TIDs (timestamp-based) or NSIDs.

**TID** (Timestamp Identifier) — A 13-character sortable identifier used as a record key. Generated from the current timestamp.

**XRPC** — The HTTP-based RPC protocol used by the atproto. Query methods map to GET requests, procedure methods map to POST requests. See [XRPC API](../api-reference/xrpc-api).

**Jetstream** — A [filtered firehose](https://github.com/bluesky-social/jetstream) that delivers atproto record commit events as JSON over WebSocket. Not part of the core atproto spec, but widely used. HappyView subscribes to Jetstream with a collection filter built from its indexed record lexicons, and persists a cursor for resume on reconnect.

### [HappyView-specific terms](#happyview-specific-terms)

**App Access** — Controls which third-party apps can interact with a space. Either `open` (any app) or `allowList` (only specified apps). Set via `com.atproto.simplespace.updateConfig`.

**Authority DID** — The DID that controls a space. Distinct from the creator DID (who originally created it). Replaces the earlier `owner_did` concept.

**Backfill** — The process of bulk-indexing existing records from the network. HappyView discovers repos via the relay and fetches each repo's records directly from its PDS. Runs when a new record-type lexicon is uploaded or triggered manually. See [Backfill](../guides/backfill).

**Delegation Token** — A short-lived JWT (`typ: atproto-space-delegation+jwt`, ES256K, 60-second TTL) that proves a user is a member of a space. Used as step 1 of the credential issuance flow. Obtained via `com.atproto.space.getDelegationToken`.

**LtHash** — A homomorphic set-hash used for per-user repo state in spaces. Uses a 2048-byte state with 1024 little-endian uint16 lanes and BLAKE3 XOF. Supports incremental insert/remove operations.

**Mint Policy** — Controls who can create permissioned repos in a space: `member-list` (only members), `public` (anyone), or `managing-app` (only the managing app).

**Network lexicon** — A lexicon fetched directly from the atproto network via DNS authority resolution, rather than uploaded manually. See [Lexicons - Network lexicons](../guides/lexicons#network-lexicons).

**Permission** — A granular access control right that authorizes a specific action in the admin API. HappyView defines 44 permissions organized by category (e.g. `lexicons:create`, `users:read`). See [Permissions](../guides/permissions).

**Permissioned Data** — AT Protocol data that is gated by membership in a space, as opposed to public repo data. Defined by AT Protocol Proposal 0016.

**Permission template** — A predefined set of permissions that can be applied when creating a user. Templates are: **Viewer** (read-only access), **Operator** (viewer + backfill and API key management), **Manager** (operator + lexicon, record, spaces, and plugin management), and **Full Access** (all 44 permissions).

**Space** — A container for permissioned data in AT Protocol. Identified by a space DID, type NSID, and space key (skey), forming an `ats://` URI.

**Space Credential** — A short-lived JWT (`typ: atproto-space-credential+jwt`, ES256, 2-hour TTL) for cross-service read access to space data. Signed by the space's P-256 keypair. Obtained by exchanging a delegation token via `com.atproto.space.getSpaceCredential`.

**Super user** — The bootstrapped user created on first login to a fresh HappyView instance. The super user has unrestricted access to all endpoints regardless of permissions, can transfer super status to another user, and cannot be deleted.

**Target collection** — The record collection that a query or procedure lexicon operates on. Set via the `target_collection` field when uploading a lexicon.

[Standard Libraries

Previous Page](/api-reference/lua/standard-libraries)[Architecture

Next Page](/reference/architecture)

#### On this page

[atproto terms](#atproto-terms)[HappyView-specific terms](#happyview-specific-terms)

---
<!--
URL: https://happyview.dev/guides/api-clients
title: API Clients | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

API Clients

## API Clients

API clients identify your application to a HappyView instance. Every XRPC request — even unauthenticated queries — must include a client key. This guide walks through creating a client, choosing between public and confidential types, and authenticating users.

For the admin CRUD endpoints, see the [API reference](../api-reference/admin/api-clients). For the JavaScript SDK, see the [SDK docs](../sdk/overview).

### [Concepts](#concepts)

An API client represents **your application**, not individual users. Create one client for your app and use the same client key everywhere. Users authenticate separately via OAuth — the client key identifies *who built the app*, not *who is using it*.

Each client has:

* An `hvc_`-prefixed **client key** — included in every request to identify your app
* An `hvs_`-prefixed **client secret** — used by server-side apps to prove ownership (confidential clients only)
* **Rate limits** — a token bucket that controls how many requests your app can make
* **Scopes** — which lexicons your app is allowed to access

### [Public vs. confidential clients](#public-vs-confidential-clients)

Choose based on where your code runs:

|  | Confidential | Public |
| --- | --- | --- |
| **Use when** | Server-side apps, CLI tools, bots | Browser apps, mobile apps |
| **Authentication** | `X-Client-Key` + `X-Client-Secret` headers | `X-Client-Key` + `Origin` header + PKCE |
| **Can keep a secret?** | Yes | No |
| **Origin validation** | No | Yes — `Origin` must match `allowed_origins` |
| **PKCE required?** | No | Yes (S256) |

### [Creating a client](#creating-a-client)

#### [From the dashboard](#from-the-dashboard)

Go to **Settings > API Clients > New client** and fill in:

* **Client type** — `confidential` (default) or `public`
* **Name** — a human-readable label (e.g. "My atproto Client")
* **Client ID URL** — URL to your published [OAuth client metadata](https://drafts.aaronpk.com/draft-parecki-oauth-client-id-metadata-document/draft-parecki-oauth-client-id-metadata-document.html) document
* **Client URI** — your app's root domain (e.g. <https://example.com>)
* **Redirect URIs** — where the PDS should redirect after authorization
* **Allowed origins** — (public clients only) which `Origin` headers to accept
* **Scopes** — `atproto` is always included; add custom scopes if your instance uses them

**Save the client secret immediately.** It is only shown once and is hashed before storage.

#### [From the API](#from-the-api)

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key

interface ClientResponse {
  id: string;
  client_key: string;
  client_secret?: string;
  name: string;
  client_id_url: string;
  client_uri: string;
  redirect_uris: string[];
  client_type: string;
  allowed_origins: string[];
}

const response = await fetch("http://127.0.0.1:3000/admin/api-clients", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "My atproto Client",
    client_id_url: "https://example.com/client-metadata.json",
    client_uri: "https://example.com",
    redirect_uris: ["https://example.com/oauth/callback"],
    client_type: "public",
    allowed_origins: ["https://example.com"],
  }),
});

const client: ClientResponse = await response.json();
```

See the [API reference](../api-reference/admin/api-clients#create-an-api-client) for all fields.

### [Using your client key](#using-your-client-key)

Every XRPC request must include the client key. HappyView looks for it in this order:

1. `X-Client-Key` request header (preferred)
2. `client_key` query parameter

#### [Unauthenticated queries](#unauthenticated-queries)

For public queries that don't need a user identity:

TypeScriptJavaScriptRustGocURL

```
const CLIENT_KEY = "hvc_a1b2c3..."; // your API client key

const response = await fetch(
  "https://happyview.example.com/xrpc/com.example.feed.getHot",
  { headers: { "X-Client-Key": CLIENT_KEY } },
);
```

Server-side callers should also include the secret (since there's no origin to authenticate):

TypeScriptJavaScriptRustGocURL

```
const CLIENT_SECRET = "hvs_d4e5f6..."; // your API client secret

const response = await fetch(
  "https://happyview.example.com/xrpc/com.example.feed.getHot",
  {
    headers: {
      "X-Client-Key": "hvc_a1b2c3...",
      "X-Client-Secret": CLIENT_SECRET,
    },
  },
);
```

#### [Authenticated requests (user identity)](#authenticated-requests-user-identity)

Procedures — and queries whose scripts need to know who the caller is — require a user's OAuth session. This uses [DPoP authentication](../getting-started/authentication#dpop-key-provisioning-for-third-party-apps), where each request includes a cryptographic proof that the caller holds the right key.

TypeScriptJavaScriptRustGocURL

```
const CLIENT_KEY = "hvc_..."; // your API client key
const ACCESS_TOKEN = "..."; // DPoP access token
const DPOP_PROOF = "..."; // DPoP proof JWT

const response = await fetch(
  "https://happyview.example.com/xrpc/com.example.createPost",
  {
    method: "POST",
    headers: {
      "X-Client-Key": CLIENT_KEY,
      Authorization: `DPoP ${ACCESS_TOKEN}`,
      DPoP: DPOP_PROOF,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: "Hello world" }),
  },
);
```

### [Authenticating users](#authenticating-users)

#### [Using the JavaScript SDK](#using-the-javascript-sdk)

The SDK handles the entire DPoP flow. A complete browser example:

```
import { HappyViewBrowserClient } from "@happyview/oauth-client-browser";

const client = new HappyViewBrowserClient({
  instanceUrl: "https://happyview.example.com",
  clientKey: "hvc_your_client_key",
});

// Sign in — redirects to the user's PDS
await client.signIn("alice.bsky.social");
```

On page load, restore a session or process the OAuth callback:

```
const result = await client.init();
if (result) {
  const { session } = result;

  // Make authenticated requests
  const response = await session.fetchHandler(
    "/xrpc/com.example.getStuff?limit=10",
    { method: "GET" },
  );
}
```

For server-side Node.js apps, use the core [`@happyview/oauth-client`](../sdk/oauth-client) package with a confidential client. For type-safe XRPC calls, pair either client with [`@happyview/lex-agent`](../sdk/lex-agent).

#### [Manual DPoP flow](#manual-dpop-flow)

If you're not using JavaScript, or want to understand the protocol, the DPoP flow has four phases.

##### [Phase 1: Provision a DPoP key](#phase-1-provision-a-dpop-key)

Ask HappyView for an ES256 keypair that will be shared between your app and the instance.

**Confidential client:**

```
POST /oauth/dpop-keys
X-Client-Key: hvc_...
X-Client-Secret: hvs_...
Content-Type: application/json

{}
```

**Public client:**

```
POST /oauth/dpop-keys
X-Client-Key: hvc_...
Origin: https://example.com
Content-Type: application/json

{"pkce_challenge": "<base64url-encoded S256 challenge>"}
```

**Response:**

```
{
  "provision_id": "hvp_...",
  "dpop_key": {
    "kty": "EC",
    "crv": "P-256",
    "x": "...",
    "y": "...",
    "d": "..."
  }
}
```

The `dpop_key` is the full private JWK. Store it securely — you'll use it to sign DPoP proofs.

##### [Phase 2: OAuth with the user's PDS](#phase-2-oauth-with-the-users-pds)

Run a standard atproto OAuth flow with the user's PDS authorization server, using the provisioned DPoP key as your keypair. HappyView is not involved in this step.

1. Resolve the user's handle to a DID
2. Resolve the DID document to find the PDS URL
3. Fetch the PDS's OAuth authorization server metadata
4. Redirect the user to the PDS authorization endpoint
5. Exchange the authorization code for tokens (using DPoP proofs signed with the provisioned key)

##### [Phase 3: Register the session](#phase-3-register-the-session)

After the OAuth callback, register the token set with HappyView so it can proxy requests on behalf of the user.

**Confidential client:**

```
POST /oauth/sessions
X-Client-Key: hvc_...
X-Client-Secret: hvs_...
Content-Type: application/json

{
  "provision_id": "hvp_...",
  "did": "did:plc:user123",
  "access_token": "...",
  "refresh_token": "...",
  "expires_at": "2026-04-17T00:00:00Z",
  "scopes": "atproto transition:generic",
  "pds_url": "https://bsky.social",
  "issuer": "https://bsky.social"
}
```

**Public client** — omit the secret, include the PKCE verifier:

```
POST /oauth/sessions
X-Client-Key: hvc_...
Content-Type: application/json

{
  "provision_id": "hvp_...",
  "pkce_verifier": "...",
  "did": "did:plc:user123",
  "access_token": "...",
  "refresh_token": "...",
  "expires_at": "2026-04-17T00:00:00Z",
  "scopes": "atproto transition:generic",
  "pds_url": "https://bsky.social",
  "issuer": "https://bsky.social"
}
```

##### [Phase 4: Make authenticated XRPC requests](#phase-4-make-authenticated-xrpc-requests)

With a registered session, sign each request with a DPoP proof:

TypeScriptJavaScriptRustGocURL

```
const CLIENT_KEY = "hvc_..."; // your API client key
const ACCESS_TOKEN = "..."; // DPoP access token
const DPOP_PROOF = "..."; // DPoP proof JWT

const response = await fetch(
  "https://happyview.example.com/xrpc/com.example.createPost",
  {
    method: "POST",
    headers: {
      "X-Client-Key": CLIENT_KEY,
      Authorization: `DPoP ${ACCESS_TOKEN}`,
      DPoP: DPOP_PROOF,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: "Hello world" }),
  },
);
```

HappyView validates the proof, looks up the stored session, and proxies writes to the user's PDS using the shared DPoP key.

##### [Logout](#logout)

**Confidential:**

```
DELETE /oauth/sessions/did:plc:user123
X-Client-Key: hvc_...
X-Client-Secret: hvs_...
```

**Public** (must prove key possession):

```
DELETE /oauth/sessions/did:plc:user123
X-Client-Key: hvc_...
Authorization: DPoP <access_token>
DPoP: <proof_jwt>
```

#### [DPoP proof format](#dpop-proof-format)

If you're implementing the flow without the SDK, a DPoP proof JWT looks like this:

**Header:**

```
{
  "alg": "ES256",
  "typ": "dpop+jwt",
  "jwk": {
    "kty": "EC",
    "crv": "P-256",
    "x": "...",
    "y": "..."
  }
}
```

**Payload:**

```
{
  "htm": "POST",
  "htu": "https://happyview.example.com/xrpc/com.example.createPost",
  "iat": 1745452800,
  "ath": "<base64url SHA-256 of the access token>",
  "jti": "<unique identifier>"
}
```

Validation rules:

* `htm` must match the HTTP method (case-insensitive)
* `htu` must match the request URL (scheme + host + path, no query string)
* `iat` must be within 5 minutes of the server's clock
* `ath` must be the base64url-encoded SHA-256 hash of the access token
* The JWK thumbprint (RFC 7638, SHA-256) must match the key used during provisioning
* The signature must verify against the embedded public JWK

### [Scopes](#scopes)

By default, a client's scopes are just `atproto`. You can add custom scopes when creating or updating the client.

HappyView supports an `include:` directive that expands permission sets defined in lexicons. For example, if your instance has a lexicon `com.example.authBasic` with a `permissions` array in its definition, you can set the client's scopes to:

```
atproto include:com.example.authBasic
```

This expands to include all RPC methods and repository actions defined in that permission set.

### [Rate limiting](#rate-limiting)

Each API client has its own token bucket for rate limiting:

* **Capacity** — maximum tokens in the bucket
* **Refill rate** — tokens added per second

If not set on the client, the instance defaults apply (`DEFAULT_RATE_LIMIT_CAPACITY` and `DEFAULT_RATE_LIMIT_REFILL_RATE`).

Rate limit state is returned in response headers:

| Header | Description |
| --- | --- |
| `RateLimit-Limit` | Bucket capacity |
| `RateLimit-Remaining` | Tokens remaining |
| `RateLimit-Reset` | Unix timestamp when the bucket will be full |
| `Retry-After` | Seconds to wait (only on `429` responses) |

Adjust per-client rate limits via the dashboard or the [admin API](../api-reference/admin/api-clients#update-an-api-client).

### [Security notes](#security-notes)

* Client secrets are SHA-256 hashed before storage — HappyView never stores the plaintext.
* DPoP private keys and OAuth tokens are encrypted at rest with AES-256-GCM using the `TOKEN_ENCRYPTION_KEY` environment variable.
* Re-authenticating the same user with the same client upserts the session. The old DPoP key is cleaned up automatically.
* Multiple clients can have active sessions for the same user — sessions are isolated per client.

### [Next steps](#next-steps)

* [Authentication](../getting-started/authentication) — full protocol details and security model
* [JavaScript SDK](../sdk/overview) — get started with the SDK
* [Admin API — API Clients](../api-reference/admin/api-clients) — CRUD endpoints
* [Permissions](./permissions) — control who can manage API clients

[Lua Scripting

Previous Page](/guides/lua-scripting)[Attestation Signing

Next Page](/guides/attestation-signing)

#### On this page

[Concepts](#concepts)[Public vs. confidential clients](#public-vs-confidential-clients)[Creating a client](#creating-a-client)[From the dashboard](#from-the-dashboard)[From the API](#from-the-api)[Using your client key](#using-your-client-key)[Unauthenticated queries](#unauthenticated-queries)[Authenticated requests (user identity)](#authenticated-requests-user-identity)[Authenticating users](#authenticating-users)[Using the JavaScript SDK](#using-the-javascript-sdk)[Manual DPoP flow](#manual-dpop-flow)[Phase 1: Provision a DPoP key](#phase-1-provision-a-dpop-key)[Phase 2: OAuth with the user's PDS](#phase-2-oauth-with-the-users-pds)[Phase 3: Register the session](#phase-3-register-the-session)[Phase 4: Make authenticated XRPC requests](#phase-4-make-authenticated-xrpc-requests)[Logout](#logout)[DPoP proof format](#dpop-proof-format)[Scopes](#scopes)[Rate limiting](#rate-limiting)[Security notes](#security-notes)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/blog
title: Blog | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

## Blog

Project updates, release notes, and feature announcements.

[## Looking Ahead with HappyView

What's next on the roadmap for your favorite AppView software?

![Trezy](/_next/image?url=%2Fauthors%2Ftrezy.webp&w=48&q=75)Trezy

July 2, 2026

announcementsroadmap](/blog/looking-ahead-with-happyview)[## HappyView v2.10

Service identity, permissioned spaces, and new blob utilities.

![Trezy](/_next/image?url=%2Fauthors%2Ftrezy.webp&w=48&q=75)Trezy

June 30, 2026

announcements](/blog/happyview-2.10)[## HappyView v2.9

Trigger-keyed scripts, backfill concurrency, db.query filters, multi-device DPoP sessions, plus bugs fixes and performance improvements.

![Trezy](/_next/image?url=%2Fauthors%2Ftrezy.webp&w=48&q=75)Trezy

May 27, 2026

announcements](/blog/happyview-2.9)[## HappyView v2.8

Backfill cancellation, a rebuilt permission system, and a brand new docs site.

![Trezy](/_next/image?url=%2Fauthors%2Ftrezy.webp&w=48&q=75)Trezy

May 14, 2026

announcements](/blog/happyview-2.8)[## HappyView v2.6 + v2.7

Base path support, a Node.js SDK, security hardening, and a pile of quality-of-life fixes.

![Trezy](/_next/image?url=%2Fauthors%2Ftrezy.webp&w=48&q=75)Trezy

May 13, 2026

announcements](/blog/happyview-2.6-and-2.7)[## HappyView v2.5: Permissioned Spaces

Private groups, invite-only communities, and gated content come to atproto.

![Trezy](/_next/image?url=%2Fauthors%2Ftrezy.webp&w=48&q=75)Trezy

May 8, 2026

announcements](/blog/happyview-2.5)[## Releasing HappyView 2 Into the Wild

One binary, no companion services, and a lot fewer moving parts.

![Trezy](/_next/image?url=%2Fauthors%2Ftrezy.webp&w=48&q=75)Trezy

April 24, 2026

announcements](/blog/releasing-happyview-2-into-the-wild)

---
<!--
URL: https://happyview.dev/guides/attestation-signing
title: Attestation Signing | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Attestation Signing

## Attestation Signing

HappyView can sign records with an ECDSA (secp256k1) keypair so their origin can be verified later. Lua scripts call `atproto.sign()` to attach an inline signature to a record and `atproto.verify_signature()` to check one. HappyView's implementation follows the [atproto attestation spec](https://tangled.org/strings/did%3Aplc%3Acbkjy5n7bk3ax2wplmtjofq2/3m3fy2xuahc22).

### [How it works](#how-it-works)

1. HappyView loads or generates a secp256k1 keypair on startup
2. `atproto.sign(record)` encodes the record to DAG-CBOR, computes its CID, and signs the CID with the private key
3. The signature is added to the record's `signatures` array as an inline object
4. `atproto.verify_signature(record, sig, repo_did)` recomputes the CID and verifies the signature

The repo DID is included in the signed data — a signature for one user's record can't be replayed against another's. Any modification to the record invalidates the signature.

### [Setup](#setup)

Attestation signing is enabled by default — HappyView generates a keypair on first startup and persists it to the `happyview_instance_settings` database table. No configuration is required.

To use an explicit key instead, set the `ATTESTATION_PRIVATE_KEY` environment variable:

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `ATTESTATION_PRIVATE_KEY` | no | auto-generated | Hex-encoded 32-byte secp256k1 private key |
| `ATTESTATION_KEY_ID` | no | `did:web:{host}#attestation` | Key identifier included in signatures. Derived from `PUBLIC_URL` by default |
| `ATTESTATION_SIG_TYPE` | no | app-specific NSID | The `$type` value used in signature objects |

The key ID defaults to a `did:web` derived from your `PUBLIC_URL`. For example, `PUBLIC_URL=https://happyview.example.com` produces a key ID of `did:web:happyview.example.com#attestation`.

#### [Priority order](#priority-order)

HappyView checks for signing configuration in this order:

1. **Environment variables** — if `ATTESTATION_PRIVATE_KEY` is set, it's used
2. **Database** — if previously generated keys exist in `happyview_instance_settings`, they're loaded
3. **Auto-generation** — a new key is generated and persisted to the database

If key loading fails for any reason, signing is disabled and `atproto.sign` / `atproto.verify_signature` will be `nil` in Lua scripts.

### [Using in Lua scripts](#using-in-lua-scripts)

Available in queries, procedures, and record/label scripts via the [atproto API](../api-reference/lua/atproto-api).

#### [Signing a record](#signing-a-record)

```
function handle()
  local r = Record(collection, input)
  r:save()

  local sig = atproto.sign({ text = input.text, createdAt = input.createdAt })
  return { uri = r._uri, cid = r._cid, signature = sig }
end
```

The returned signature object:

```
{
  "$type": "your.app.attestation",
  "key": "did:web:happyview.example.com#attestation",
  "signature": {
    "$bytes": "base64-encoded-signature"
  }
}
```

#### [Verifying a signature](#verifying-a-signature)

```
function handle()
  local record = db.get(params.uri)
  if not record then
    return { error = "not found" }
  end

  local sig = record.signatures and record.signatures[1]
  if not sig then
    return { record = record, verified = false }
  end

  local valid = atproto.verify_signature(record, sig, record.did)
  return { record = record, verified = valid }
end
```

#### [Checking availability](#checking-availability)

Both functions are `nil` when no signer is configured:

```
if atproto.sign then
  record.signature = atproto.sign(record)
end
```

### [Signature format](#signature-format)

Signatures are stored as objects in the record's `signatures` array:

| Field | Type | Description |
| --- | --- | --- |
| `$type` | string | Signature type NSID |
| `key` | string | Key identifier (DID with fragment) |
| `signature` | table | Contains `$bytes` (base64-encoded) |

### [Next steps](#next-steps)

* [atproto API reference](../api-reference/lua/atproto-api#atprotosign) — `atproto.sign` and `atproto.verify_signature` parameter docs
* [Signed Record](../reference/script-examples/signed-record) — save a record with an attestation signature
* [Verify Signed Record](../reference/script-examples/signed-record-verify) — fetch a record and verify its signature

[API Clients

Previous Page](/guides/api-clients)[Labelers

Next Page](/guides/labelers)

#### On this page

[How it works](#how-it-works)[Setup](#setup)[Priority order](#priority-order)[Using in Lua scripts](#using-in-lua-scripts)[Signing a record](#signing-a-record)[Verifying a signature](#verifying-a-signature)[Checking availability](#checking-availability)[Signature format](#signature-format)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/guides/api-keys
title: API Keys | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

API Keys

## API Keys

API keys let you authenticate with the admin API without going through the OAuth flow. They're useful for CI/CD pipelines, scripts, and any automation that needs to manage your HappyView instance programmatically.

### [How API keys work](#how-api-keys-work)

Each API key is a 35-character token with the format `hv_` followed by 32 random hex characters:

```
hv_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
```

When you create a key, HappyView shows the full token **once**. After that, only the prefix (`hv_a1b2c3d4`) is stored for display — the key itself is SHA-256 hashed before being saved to the database. This means nobody (including you) can retrieve the full key after creation.

Each API key has its own set of **scoped permissions**. When you create a key, you specify which permissions it should have. The key's effective permissions are the **intersection** of the permissions assigned to the key and the permissions of the user who created it — a key can never have more access than its creator. A revoked key immediately stops working.

### [Creating a key](#creating-a-key)

1. Go to **Settings > API Keys** in the dashboard sidebar
2. Click **Create API Key**
3. Enter a descriptive name (e.g., "CI Deploy", "Monitoring Script")
4. Select the permissions the key should have
5. Copy the full key from the confirmation dialog — you won't see it again

### [Using a key](#using-a-key)

Pass the key as a Bearer token in the `Authorization` header:

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4";

const response = await fetch("http://127.0.0.1:3000/admin/lexicons", {
  headers: { Authorization: `Bearer ${TOKEN}` },
});

interface LexiconsResponse {
  lexicons: Array<{
    id: string;
    nsid: string;
    revision: number;
  }>;
}

const data: LexiconsResponse = await response.json();
```

This works for all [admin API](../api-reference/admin/admin-api) endpoints that the key has permissions for. Unlike OAuth tokens which carry the user's full permissions, API keys are limited to the specific permissions assigned at creation time.

### [Revoking a key](#revoking-a-key)

1. Go to **Settings > API Keys**
2. Click **Revoke** next to the key
3. Confirm in the dialog

Revoked keys are soft-deleted: they remain visible in the table (with a strikethrough) for audit purposes but can no longer authenticate. Any service using the key will immediately receive `401 Unauthorized` responses.

### [Tracking usage](#tracking-usage)

The **Last Used** column in the API Keys table shows when each key was last used to authenticate a request. Keys that have never been used show "Never". This helps you identify unused keys that can be safely revoked.

### [Security considerations](#security-considerations)

* **Treat API keys like passwords.** Anyone with the key can access your HappyView instance with the key's permissions.
* **Use the principle of least privilege.** Only grant the permissions a key actually needs. A CI deploy key probably only needs `lexicons:create` and `backfill:create`, not full access.
* **Use descriptive names** so you can identify which service uses which key.
* **Revoke keys you no longer need.** If a key is compromised, revoke it immediately.
* **Don't commit keys to version control.** Use environment variables or secret managers instead.

### [Next steps](#next-steps)

* [Admin API reference](../api-reference/admin/admin-api) — full endpoint documentation
* [Scripting](./lua-scripting) — automate record processing with Lua scripts
* [Record & label scripts](./label-scripts) — react to record changes and label events

[Developing Plugins

Previous Page](/guides/developing-plugins)[Permissions

Next Page](/guides/permissions)

#### On this page

[How API keys work](#how-api-keys-work)[Creating a key](#creating-a-key)[Using a key](#using-a-key)[Revoking a key](#revoking-a-key)[Tracking usage](#tracking-usage)[Security considerations](#security-considerations)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/
title: Introduction | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Introduction

## Introduction

HappyView is the best way to build an [AppView](https://atproto.com/guides/glossary#app-view) for the [AT Protocol](https://atproto.com). Upload your [lexicon](reference/glossary#atproto-terms) schemas and get a fully functional AppView, complete with [XRPC](reference/glossary#atproto-terms) endpoints, OAuth, real-time network sync, and historical [backfill](guides/backfill), without writing a single line of server code.

Building an AppView from scratch means wiring up real-time event streams, record storage, XRPC routing, OAuth flows, and PDS write proxying before you can even think about your application. HappyView handles all of that. Define your data model with lexicons, add custom logic with Lua scripts when you need it, and ship your app.

### [Features](#features)

* **Schema-driven endpoints:** Upload a [lexicon](guides/lexicons) and HappyView generates XRPC query and procedure routes, storage, and indexing from it — updatable at runtime with no restart.
* **Network sync built in:** Real-time record streaming via [Jetstream](https://github.com/bluesky-social/jetstream), historical [backfill](guides/backfill) from each user's PDS, and atproto OAuth with DPoP-bound proxy writes back to the PDS.
* **Customize with Lua scripts and plugins:** Trigger-keyed [Lua scripts](guides/lua-scripting) for XRPC query/procedure logic and [record/label event handling](guides/label-scripts), WASM [plugins](guides/plugins) for external platform integration, and [labeler](guides/labelers) subscriptions for content moderation.
* **Protocol-native:** Works with any PDS, resolves DIDs through the directory, and fetches [network lexicons](guides/lexicons#network-lexicons) via DNS authority resolution.
* **Permissioned Spaces:** Experimental support for [AT Protocol Proposal 0016](experimental/spaces/index) — membership-gated data containers with per-user repo state, cross-service credentials, and write notifications.
* **Full admin surface:** Built-in [dashboard](getting-started/dashboard) and [admin API](api-reference/admin/admin-api) for managing lexicons, users, API keys, API clients, backfill jobs, and plugins.

### [Design Principles](#design-principles)

* **Schema-first**: Your Lexicons are the source of truth. Upload a schema and HappyView derives endpoints, indexing rules, and network sync from it. You describe *what* your data looks like; HappyView figures out the rest.
* **Zero boilerplate**: HappyView handles AppView infrastructure (Jetstream, backfill, OAuth, PDS proxying) for you. You should be writing application logic from minute one, not plumbing.
* **Runtime-configurable**: Lexicons can be added, updated, and removed without restarting the server. New endpoints and sync rules take effect immediately, so you can iterate on your data model in real time.
* **Protocol-native**: HappyView works with *any* PDS, resolves DIDs through the directory, and follows atproto conventions. It's a first-class citizen of the network, not a wrapper around it.

### [Next Steps](#next-steps)

* [Quickstart](getting-started/deployment/railway): Deploy HappyView on Railway or run it locally
* [Lexicons](guides/lexicons): Upload lexicon schemas and start indexing records
* [Lua Scripting](guides/lua-scripting): Write custom query and procedure logic
* [Record & Label Scripts](guides/label-scripts): React to record changes and label events in real time
* [Labelers](guides/labelers): Subscribe to external labelers and manage content labels
* [Plugins](guides/plugins): Integrate with external platforms using WASM plugins
* [Permissioned Spaces](experimental/spaces/index): Create membership-gated data containers with the AT Protocol spaces API
* [Event Logs](guides/event-logs): Monitor system activity, debug script errors, and audit admin actions

[Quickstart

Next Page](/getting-started/quickstart)

#### On this page

[Features](#features)[Design Principles](#design-principles)[Next Steps](#next-steps)

---
<!--
URL: https://happyview.dev/guides/upgrading-to-v2
title: Migrating from v1 | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Migrating from v1

## Migrating from v1

v2 consolidates HappyView, [Tap](https://github.com/bluesky-social/indigo/tree/main/cmd/tap), and [AIP](https://tangled.org/gamesgamesgamesgames.games/aip) into a single binary. Real-time indexing, backfill, and OAuth are now built in — there are no companion services to deploy.

This guide covers every breaking change and the steps to migrate.

### [Architecture changes](#architecture-changes)

| v1 | v2 |
| --- | --- |
| HappyView + Tap + AIP (3 services) | Single HappyView binary |
| Postgres only | SQLite (default) or Postgres |
| AIP handles OAuth | Built-in atproto OAuth with DPoP |
| Tap handles indexing + backfill | Built-in Jetstream streaming + backfill |
| Offset-based pagination | Cursor-based pagination |
| Admin bootstrapping via config | First authenticated user becomes admin |

### [1. Remove Tap and AIP](#1-remove-tap-and-aip)

Tap and AIP are no longer needed. Remove them from your `docker-compose.yml` (or equivalent) and delete any associated containers/volumes.

**Environment variables to remove:**

| Variable | Reason |
| --- | --- |
| `AIP_URL` | OAuth is now built in |
| `AIP_PUBLIC_URL` | No longer needed |
| `TAP_URL` | Indexing is now built in |
| `TAP_ADMIN_PASSWORD` | No longer needed |
| `TAP_DATABASE_URL` | Tap no longer exists |
| `TAP_RELAY_URL` | Use `RELAY_URL` on HappyView directly |
| `TAP_PLC_URL` | Use `PLC_URL` on HappyView directly |
| `TAP_COLLECTION_FILTERS` | Collection filtering now uses lexicon config |
| `TAP_SIGNAL_COLLECTIONS` | Collection filtering now uses lexicon config |

### [2. Update environment variables](#2-update-environment-variables)

**New required variables:**

| Variable | Description |
| --- | --- |
| `PUBLIC_URL` | Public-facing URL (e.g. `https://happyview.example.com`). Used for OAuth callbacks |
| `SESSION_SECRET` | Secret key for signing session cookies (at least 64 chars). **Must be set in production** |

**New optional variables:**

| Variable | Default | Description |
| --- | --- | --- |
| `DATABASE_BACKEND` | auto-detected | Force `sqlite` or `postgres` |
| `JETSTREAM_URL` | `wss://jetstream1.us-east.bsky.network` | Replaces Tap's Jetstream connection |
| `STATIC_DIR` | `./web/out` | Dashboard static assets directory |
| `TOKEN_ENCRYPTION_KEY` | --- | Base64-encoded 32-byte key for encrypting stored OAuth tokens. **Strongly recommended in production** |
| `DEFAULT_RATE_LIMIT_CAPACITY` | `100` | Default token bucket capacity for new API clients |
| `DEFAULT_RATE_LIMIT_REFILL_RATE` | `2.0` | Default refill rate (tokens/sec) for new API clients |
| `APP_NAME` | --- | App name shown on OAuth screens |
| `LOGO_URI` | --- | Logo URL for OAuth screens |
| `TOS_URI` | --- | Terms of service URL |
| `POLICY_URI` | --- | Privacy policy URL |

**Unchanged variables:** `DATABASE_URL`, `HOST`, `PORT`, `RELAY_URL`, `PLC_URL`, `EVENT_LOG_RETENTION_DAYS`, `RUST_LOG`.

See [Configuration](../getting-started/configuration) for the full reference.

### [3. Choose your database](#3-choose-your-database)

v2 defaults to SQLite. If you're running Postgres in v1, you have two options:

**Keep Postgres** — no changes needed. Your `DATABASE_URL` stays the same and v2 auto-detects the backend from the connection string.

**Migrate to SQLite** — follow the [Postgres to SQLite migration guide](database/postgres-to-sqlite-migration). SQLite is simpler to operate (no separate database server) and is the recommended default for most deployments.

### [4. Update Lua scripts](#4-update-lua-scripts)

#### [Cursor-based pagination (breaking change)](#cursor-based-pagination-breaking-change)

`db.query` no longer supports `offset`. Replace offset-based pagination with cursors:

**Before (v1):**

```
local result = db.query({
  collection = collection,
  limit = limit,
  offset = page * limit,
})
```

**After (v2):**

```
local result = db.query({
  collection = collection,
  limit = limit,
  cursor = params.cursor,
})

-- result.cursor is an opaque string; pass it back as ?cursor= for the next page
```

Clients should pass the `cursor` value from the response as a query parameter to fetch the next page. Don't parse or construct cursors — they're opaque.

#### [New APIs available](#new-apis-available)

v2 adds several new Lua APIs that you can optionally adopt:

* [`atproto.resolve_service_endpoint`](../api-reference/lua/atproto-api) — resolve a DID to its PDS endpoint
* [`atproto.get_labels`](../api-reference/lua/atproto-api) / [`atproto.get_labels_batch`](../api-reference/lua/atproto-api) — fetch content labels from subscribed labelers
* [`os.time`](../api-reference/lua/standard-libraries), `os.date`, `os.difftime`, `os.clock` — safe `os` subset

### [5. Update API key prefixes](#5-update-api-key-prefixes)

v1 API keys used the `hv_` prefix. v2 keeps existing `hv_` keys working but new keys use the `hv_` prefix as well. No migration needed.

v2 also adds **API clients** for third-party OAuth apps, which use the `hvc_` prefix. These are separate from API keys — see the [API Clients guide](api-clients).

### [6. Update the dashboard URL](#6-update-the-dashboard-url)

The dashboard has moved from the root path to `/dashboard`:

| v1 | v2 |
| --- | --- |
| `/` | `/dashboard` |
| `/lexicons` | `/dashboard/lexicons` |
| `/records` | `/dashboard/records` |
| `/settings` | `/dashboard/settings` |

Update any bookmarks or internal links.

### [7. User permissions](#7-user-permissions)

v2 introduces granular user permissions. After upgrading:

1. The first user to authenticate becomes the **super user** (full access).
2. Additional users are created with no permissions by default.
3. Assign permissions or use a template (Viewer, Operator, Manager, Full Access).

See the [Permissions guide](permissions) for details.

### [8. Docker Compose (example)](#8-docker-compose-example)

**Before (v1):**

```
services:
  postgres:
    image: postgres:17
    # ...

  tap:
    image: ghcr.io/bluesky-social/indigo/tap:latest
    environment:
      TAP_DATABASE_URL: postgres://...
      TAP_RELAY_URL: https://bsky.network
      TAP_ADMIN_PASSWORD: secret
    depends_on: [postgres]

  happyview:
    image: ghcr.io/gamesgamesgamesgamesgames/happyview:latest
    environment:
      DATABASE_URL: postgres://...
      AIP_URL: http://aip:8080
      TAP_URL: http://tap:2480
      TAP_ADMIN_PASSWORD: secret
    depends_on: [postgres, tap]
```

**After (v2):**

```
services:
  happyview:
    image: ghcr.io/gamesgamesgamesgamesgames/happyview:latest
    environment:
      DATABASE_URL: sqlite://data/happyview.db?mode=rwc
      PUBLIC_URL: https://happyview.example.com
      SESSION_SECRET: your-64-char-secret
    volumes:
      - data:/app/data

volumes:
  data:
```

Or with Postgres:

```
services:
  postgres:
    image: postgres:17
    # ...

  happyview:
    image: ghcr.io/gamesgamesgamesgamesgames/happyview:latest
    environment:
      DATABASE_URL: postgres://happyview:happyview@postgres/happyview
      PUBLIC_URL: https://happyview.example.com
      SESSION_SECRET: your-64-char-secret
    depends_on: [postgres]
```

### [Checklist](#checklist)

* Remove Tap and AIP services
* Remove old environment variables (`AIP_URL`, `TAP_URL`, `TAP_ADMIN_PASSWORD`, etc.)
* Add `PUBLIC_URL` and `SESSION_SECRET`
* Add `TOKEN_ENCRYPTION_KEY` (recommended for production)
* Decide on SQLite (default) or keep Postgres
* Update Lua scripts to use cursor-based pagination instead of offsets
* Update any bookmarks/links to use `/dashboard` prefix
* Set up user permissions after first login

[Statusphere

Previous Page](/tutorials/statusphere)[Lexicons

Next Page](/guides/lexicons)

#### On this page

[Architecture changes](#architecture-changes)[1. Remove Tap and AIP](#1-remove-tap-and-aip)[2. Update environment variables](#2-update-environment-variables)[3. Choose your database](#3-choose-your-database)[4. Update Lua scripts](#4-update-lua-scripts)[Cursor-based pagination (breaking change)](#cursor-based-pagination-breaking-change)[New APIs available](#new-apis-available)[5. Update API key prefixes](#5-update-api-key-prefixes)[6. Update the dashboard URL](#6-update-the-dashboard-url)[7. User permissions](#7-user-permissions)[8. Docker Compose (example)](#8-docker-compose-example)[Checklist](#checklist)

---
<!--
URL: https://happyview.dev/guides/backfill
title: Backfill | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Backfill

## Backfill

When you add a new record-type lexicon, HappyView starts indexing new records from that moment via [Jetstream](https://github.com/bluesky-social/jetstream). But what about records that already exist on the network? That's what backfill does: HappyView discovers repos via the relay and fetches records directly from each user's PDS.

### [When backfill runs](#when-backfill-runs)

* **Automatically** when a record-type lexicon is uploaded with `backfill: true` (the default). See [Lexicons - Backfill flag](lexicons#backfill-flag).
* **Manually** via `POST /admin/backfill` or the [dashboard](../getting-started/dashboard). You can scope a manual backfill to a specific collection, a specific DID, or both.

See the [admin API](../api-reference/admin/backfill) for endpoint details.

### [How it works](#how-it-works)

A backfill job starts with a discovery phase and then pipelines resolution and fetching concurrently:

1. **Discovering repos** — HappyView calls the relay's `com.atproto.sync.listReposByCollection` to find repos that contain records for each target collection. Discovered DIDs are stored in a tracking table so progress can be resumed.
2. **Resolving PDS + Fetching records** (pipelined) — Resolution and fetching run concurrently. As each DID is resolved (via PLC directory or `did:web`), it's immediately handed off for record fetching — there's no need to wait for all DIDs to resolve before fetching begins. HappyView calls `com.atproto.repo.listRecords` on each PDS for the target collection(s), upserting each record into the local database. PDS endpoints are processed concurrently (up to 10 PDS hosts, 3 DIDs per host).

Progress counters (`total_repos`, `resolved_repos`, `processed_repos`, `total_records`) and the current `stage` are updated in real time. The dashboard's Backfill page shows live progress, and clicking a job opens a detail sheet with a stage-by-stage progress log.

#### [Rate limiting](#rate-limiting)

All three phases handle HTTP 429 responses. HappyView reads the `RateLimit-Reset` header (a Unix timestamp, the AT Protocol convention) to determine how long to wait, falling back to the `retry-after` header, then defaulting to 5 seconds.

### [Job lifecycle](#job-lifecycle)

A backfill job has both a `status` (overall state) and a `stage` (current phase):

| Status | Description |
| --- | --- |
| `running` | Job is actively processing |
| `cancelling` | Cancel requested, waiting for the worker to stop |
| `cancelled` | Worker has stopped and cleaned up |
| `completed` | Worker finished processing all resolvable repos |
| `failed` | An error occurred |

The `stage` field tracks which phase the job is in: `pending`, `discovering_repos`, `resolving_and_fetching`, `completed`, `failed`, or `cancelled`.

### [Cancelling a job](#cancelling-a-job)

Running jobs can be cancelled via `POST /admin/backfill/{id}/cancel` or the Cancel button in the dashboard. Cancellation is two-phase:

1. The endpoint sets the job status to `cancelling`.
2. The worker checks for cancellation at natural checkpoints (between relay pages, every 100 DIDs during resolution, every 10 repos during fetching). When it detects the `cancelling` status, it stops work and sets the final status to `cancelled`.

This means there may be a short delay between clicking Cancel and the job fully stopping, depending on what the worker is doing at that moment.

### [Resuming after restart](#resuming-after-restart)

Backfill jobs survive server restarts. On startup, HappyView checks for jobs that were running when the server last stopped:

* **Running** jobs are re-spawned and resume from where they left off. Each phase is idempotent — discovery skips already-known DIDs, resolution skips already-resolved endpoints, and fetching skips already-completed repos.
* **Cancelling** jobs (where the cancel was requested but the worker hadn't stopped yet) are immediately finalised as `cancelled`.

Per-DID progress is tracked in the database, so a job that was halfway through fetching records will pick up from the next unprocessed repo, not start over.

### [Re-running backfills](#re-running-backfills)

Re-running a backfill for a collection that's already been backfilled is safe. Each record is upserted by its AT URI, so existing records are refreshed in place and any new records discovered since the last run are added. This also picks up new repos that have joined the network since the previous backfill.

### [Restoring deleted records](#restoring-deleted-records)

Deleting records from HappyView (via the dashboard or API) only removes them from the local database — the records still exist on the atproto network. To restore deleted records, create a backfill job for the affected collection. The backfill will re-discover the repos and re-fetch all records from each PDS, restoring any that were previously deleted.

### [Diagnostics](#diagnostics)

The dashboard's backfill detail panel includes expandable sections for each processing phase. Clicking a phase row reveals per-repo and per-PDS detail data in real time.

#### [Per-repo tracking](#per-repo-tracking)

Every DID discovered during a backfill job is tracked in the database with its PDS endpoint, processing status, and record count. This data powers three expandable sections:

* **Discovering repos** — lists all DIDs discovered for the job, with profile avatars and handles resolved from the Bluesky API.
* **Resolving PDS** — summarises PDS endpoints involved in the job, showing how many repos each PDS is responsible for and how many have been processed.
* **Fetching records** — lists completed repos with their record counts and PDS hostnames.

All three sections update in real time via SSE (Server-Sent Events) while the job is running.

#### [Data retention](#data-retention)

Per-repo detail data is retained after job completion to support post-mortem analysis. A background task runs daily and deletes detail rows for jobs completed more than 28 days ago (configurable via the `backfill_retention_days` setting in **Settings > General**, or the `BACKFILL_RETENTION_DAYS` environment variable). Set to `0` to keep data indefinitely.

You can also manually clear detail data:

* **Per-job**: "Clear details" button in the job detail panel footer.
* **All completed jobs**: "Clear all details" button on the Backfill page header.

Both actions require the `backfill:create` permission.

### [Next steps](#next-steps)

* [Lexicons](lexicons#backfill-flag): Control whether lexicons trigger backfill on upload
* [Admin API — Backfill](../api-reference/admin/backfill): Full reference for backfill endpoints

[Lexicons

Previous Page](/guides/lexicons)[Lua Scripting

Next Page](/guides/lua-scripting)

#### On this page

[When backfill runs](#when-backfill-runs)[How it works](#how-it-works)[Rate limiting](#rate-limiting)[Job lifecycle](#job-lifecycle)[Cancelling a job](#cancelling-a-job)[Resuming after restart](#resuming-after-restart)[Re-running backfills](#re-running-backfills)[Restoring deleted records](#restoring-deleted-records)[Diagnostics](#diagnostics)[Per-repo tracking](#per-repo-tracking)[Data retention](#data-retention)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/reference/architecture
title: Architecture | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Architecture

## Architecture

Guide for contributors working on HappyView itself. For a user-facing overview, see the [Introduction](../index).

### [System overview](#system-overview)

Queries go through the query handler to the database (SQLite by default, or Postgres). Writes go through the procedure handler to the user's PDS, then HappyView indexes the record locally. Real-time record events stream in via [Jetstream](https://github.com/bluesky-social/jetstream); historical records are backfilled in-process by discovering repos via the relay's `listReposByCollection` and fetching records directly from each PDS. [Labelers](../guides/labelers) are external services that emit content labels over a direct WebSocket connection — they operate out-of-band, outside the relay/repo system. [Spaces](../experimental/spaces/index) provide permissioned data containers with membership-gated access, per-user repo state tracking (LtHash + signed commits), and cross-service credential-based authentication.

### [Request flow](#request-flow)

#### [Reads (queries)](#reads-queries)

#### [Writes (procedures)](#writes-procedures)

#### [Admin endpoints](#admin-endpoints)

### [Data flow](#data-flow)

#### [Real-time indexing](#real-time-indexing)

#### [Backfill](#backfill)

### [Database schema](#database-schema)

#### [`records`](#records)

| Column | Type | Description |
| --- | --- | --- |
| `uri` | text (PK) | AT URI (`at://did/collection/rkey`) |
| `did` | text | Author DID |
| `collection` | text | Lexicon NSID |
| `rkey` | text | Record key |
| `record` | jsonb | Record value |
| `cid` | text | Content identifier |
| `indexed_at` | timestamptz | When HappyView indexed this record |

#### [`lexicons`](#lexicons)

| Column | Type | Description |
| --- | --- | --- |
| `id` | text (PK) | Lexicon NSID |
| `revision` | integer | Incremented on upsert |
| `lexicon_json` | jsonb | Raw lexicon definition |
| `lexicon_type` | text | record, query, procedure, definitions |
| `backfill` | boolean | Whether to backfill on upload |
| `target_collection` | text | For queries/procedures: which record collection |
| `created_at` | timestamptz |  |
| `updated_at` | timestamptz |  |

#### [`users`](#users)

| Column | Type | Description |
| --- | --- | --- |
| `id` | uuid (PK) |  |
| `did` | text (unique) | User's atproto DID |
| `is_super` | boolean | Whether this is the super user (only one allowed) |
| `created_at` | timestamptz |  |
| `last_used_at` | timestamptz | Updated on each authenticated request |

#### [`user_permissions`](#user_permissions)

| Column | Type | Description |
| --- | --- | --- |
| `user_id` | uuid (FK) | References `users.id` |
| `permission` | text | Permission string (e.g. `lexicons:create`) |
| (PK) |  | Composite primary key: (`user_id`, `permission`) |

#### [`api_keys`](#api_keys)

| Column | Type | Description |
| --- | --- | --- |
| `id` | uuid (PK) |  |
| `user_id` | uuid (FK) | References `users.id` |
| `name` | text | Descriptive label |
| `key_hash` | text | SHA-256 hash of the full key |
| `key_prefix` | text | First 11 characters for display |
| `permissions` | text[] | Permissions granted to this key |
| `created_at` | timestamptz |  |
| `last_used_at` | timestamptz |  |
| `revoked_at` | timestamptz | Set when revoked (soft delete) |

#### [`oauth_sessions`](#oauth_sessions)

| Column | Type | Description |
| --- | --- | --- |
| `did` | text (PK) | User's atproto DID |
| `session_data` | text | Serialized OAuth session (managed by atrium) |
| `created_at` | timestamptz |  |
| `updated_at` | timestamptz |  |

#### [`oauth_state`](#oauth_state)

| Column | Type | Description |
| --- | --- | --- |
| `state_key` | text (PK) | OAuth state parameter |
| `state_data` | text | Serialized state (managed by atrium) |
| `created_at` | timestamptz |  |

#### [`instance_settings`](#instance_settings)

| Column | Type | Description |
| --- | --- | --- |
| `key` | text (PK) | Setting name (e.g. `app_name`) |
| `value` | text | Setting value |
| `updated_at` | timestamptz | Last modified |

#### [`event_logs`](#event_logs)

| Column | Type | Description |
| --- | --- | --- |
| `id` | uuid (PK) |  |
| `event_type` | text | Category.action format (e.g. `user.created`) |
| `severity` | text | `info`, `warn`, or `error` |
| `actor_did` | text | DID of the user who triggered the event |
| `subject` | text | What was affected (DID, NSID, URI, etc.) |
| `detail` | jsonb | Event-specific data |
| `created_at` | timestamptz |  |

#### [`script_variables`](#script_variables)

| Column | Type | Description |
| --- | --- | --- |
| `key` | text (PK) | Variable name |
| `value` | text | Variable value (encrypted at rest) |
| `created_at` | timestamptz |  |
| `updated_at` | timestamptz |  |

#### [`spaces`](#spaces)

| Column | Type | Description |
| --- | --- | --- |
| `id` | text (PK) | Internal space identifier |
| `did` | text | The space's own DID |
| `authority_did` | text | DID that controls the space |
| `creator_did` | text | DID of the user who created the space |
| `type_nsid` | text | Space type as an NSID |
| `skey` | text | Space key (differentiates spaces of the same type) |
| `display_name` | text | Human-readable name (optional) |
| `description` | text | Description (optional) |
| `mint_policy` | text | `member-list`, `public`, or `managing-app` |
| `app_access` | text (JSON) | `{"type":"open"}` or `{"type":"allowList","allowed":[...]}` |
| `managing_app_did` | text | DID of the managing app (optional) |
| `config` | text (JSON) | Space config (`membershipPublic`, `recordsPublic`, extras) |
| `revision` | text | Current revision TID |
| `created_at` | text |  |
| `updated_at` | text |  |

#### [`space_members`](#space_members)

| Column | Type | Description |
| --- | --- | --- |
| `id` | text (PK) |  |
| `space_id` | text (FK) | References `spaces.id` |
| `did` | text | Member's DID (or space URI for delegation) |
| `access` | text | `read`, `read_self`, or `write` |
| `is_delegation` | boolean | Whether this member is a delegated space |
| `granted_by` | text | DID of who granted membership |
| `created_at` | text |  |

#### [`space_records`](#space_records)

| Column | Type | Description |
| --- | --- | --- |
| `uri` | text (PK) | `ats://` URI of the record |
| `space_id` | text (FK) | References `spaces.id` |
| `author_did` | text | DID of the record author |
| `collection` | text | Lexicon NSID |
| `rkey` | text | Record key |
| `record` | jsonb | Record value |
| `cid` | text | Content identifier |
| `indexed_at` | text |  |

#### [`space_repo_state`](#space_repo_state)

| Column | Type | Description |
| --- | --- | --- |
| `id` | text (PK) |  |
| `space_id` | text (FK) | References `spaces.id` |
| `author_did` | text | DID of the repo author |
| `lthash_state` | bytea | 2048-byte LtHash state |
| `rev` | text | Current revision |
| `hash` | bytea | Content hash |
| `ikm` | bytea | Input keying material for deniable signatures |
| `sig` | bytea | Signature |
| `mac` | bytea | Message authentication code |
| `updated_at` | text |  |

#### [`space_record_oplog`](#space_record_oplog)

| Column | Type | Description |
| --- | --- | --- |
| `id` | text (PK) |  |
| `space_id` | text (FK) | References `spaces.id` |
| `author_did` | text | DID of the operation author |
| `rev` | text | Revision this operation belongs to |
| `idx` | integer | Index within the revision |
| `action` | text | `create`, `update`, or `delete` |
| `collection` | text | Lexicon NSID |
| `rkey` | text | Record key |
| `cid` | text | Content identifier (for create/update) |
| `prev` | text | Previous CID (for update/delete) |
| `created_at` | text |  |

#### [`space_notify_registrations`](#space_notify_registrations)

| Column | Type | Description |
| --- | --- | --- |
| `id` | text (PK) |  |
| `space_id` | text (FK) | References `spaces.id` |
| `author_did` | text | Filter by author DID (optional) |
| `endpoint` | text | Notification endpoint URL |
| `registered_by` | text | DID of who registered |
| `expires_at` | text | When the registration expires |
| `created_at` | text |  |

#### [`space_invites`](#space_invites)

| Column | Type | Description |
| --- | --- | --- |
| `id` | text (PK) |  |
| `space_id` | text (FK) | References `spaces.id` |
| `token_hash` | text | SHA-256 hash of the invite token |
| `created_by` | text | DID of the user who created the invite |
| `access` | text | Access level granted: `read`, `read_self`, `write` |
| `max_uses` | integer? | Maximum number of uses (null = unlimited) |
| `uses` | integer | Current use count |
| `expires_at` | text? | Expiry timestamp (null = never) |
| `revoked` | boolean | Whether the invite has been revoked |
| `created_at` | text |  |

#### [`space_credentials`](#space_credentials)

| Column | Type | Description |
| --- | --- | --- |
| `id` | text (PK) |  |
| `space_id` | text (FK) | References `spaces.id` |
| `issued_to` | text | DID the credential was issued to |
| `token_hash` | text | Hash of the credential token |
| `expires_at` | text | When the credential expires |
| `created_at` | text |  |

#### [`space_dids`](#space_dids)

| Column | Type | Description |
| --- | --- | --- |
| `id` | text (PK) |  |
| `did` | text | The space's DID |
| `space_id` | text (FK) | References `spaces.id` |
| `signing_key_enc` | text | Encrypted signing key (AES-256-GCM) |
| `rotation_key_enc` | text | Encrypted rotation key (AES-256-GCM) |
| `created_by` | text | DID of who provisioned the key |
| `created_at` | text |  |

#### [`service_identity`](#service_identity)

| Column | Type | Description |
| --- | --- | --- |
| `id` | integer (PK) | Always 1 (singleton) |
| `mode` | text | `did_web`, `did_plc`, or `linked_account` |
| `did` | text | The service's DID |
| `signing_key_enc` | text | Encrypted signing key |
| `rotation_key_enc` | text? | Encrypted rotation key (did:plc only) |
| `attached_account_did` | text? | Linked account DID (linked\_account mode) |
| `setup_complete` | boolean | Whether setup has been finalized |
| `created_at` | text |  |
| `updated_at` | text |  |

#### [`service_entries`](#service_entries)

| Column | Type | Description |
| --- | --- | --- |
| `id` | integer (PK) |  |
| `fragment_id` | text | DID document fragment identifier |
| `service_type` | text | Service type (e.g. `AtprotoAppView`) |
| `access_mode` | text | `all` or scoped to specific XRPCs |
| `created_at` | text |  |
| `updated_at` | text |  |

#### [`service_entry_xrpcs`](#service_entry_xrpcs)

| Column | Type | Description |
| --- | --- | --- |
| `service_entry_id` | integer (FK) | References `service_entries.id` |
| `lexicon_id` | text | Lexicon NSID this entry handles |

#### [`verification_methods`](#verification_methods)

| Column | Type | Description |
| --- | --- | --- |
| `id` | text (PK) |  |
| `fragment_id` | text | DID document fragment (e.g. `#atproto_space`) |
| `key_type` | text | Always `Multikey` |
| `public_key_multibase` | text | Public key in multibase encoding |
| `private_key_enc` | text | Encrypted private key (AES-256-GCM) |
| `created_at` | text |  |

#### [`backfill_jobs`](#backfill_jobs)

| Column | Type | Description |
| --- | --- | --- |
| `id` | uuid (PK) |  |
| `collection` | text | Target collection (null = all) |
| `did` | text | Target DID (null = all) |
| `status` | text | pending, running, pausing, paused, cancelling, cancelled, completed, failed |
| `stage` | text | pending, discovering\_repos, resolving\_and\_fetching, completed, failed, cancelled |
| `total_repos` | integer | Total DIDs discovered |
| `resolved_repos` | integer | DIDs with PDS endpoint resolved |
| `processed_repos` | integer | DIDs with records fetched |
| `total_records` | integer | Total records indexed |
| `error` | text | Error message if failed |
| `started_at` | timestamptz |  |
| `completed_at` | timestamptz |  |
| `created_at` | timestamptz |  |

### [Testing](#testing)

```

## Unit tests (no database needed)

cargo test --lib

## All tests including end-to-end (SQLite by default)

cargo test

## Or run against Postgres

docker compose -f docker-compose.test.yml up -d
TEST_DATABASE_URL=postgres://happyview:happyview@localhost:5433/happyview_test cargo test
docker compose -f docker-compose.test.yml down
```

End-to-end tests use `wiremock` to mock external services (PLC directory, PDSes) and a real database for full integration coverage. By default tests use SQLite; set `TEST_DATABASE_URL` to a Postgres connection string to test against Postgres.

[Glossary

Previous Page](/reference/glossary)[Get a Record

Next Page](/reference/script-examples/get-record)

#### On this page

[System overview](#system-overview)[Request flow](#request-flow)[Reads (queries)](#reads-queries)[Writes (procedures)](#writes-procedures)[Admin endpoints](#admin-endpoints)[Data flow](#data-flow)[Real-time indexing](#real-time-indexing)[Backfill](#backfill)[Database schema](#database-schema)[`records`](#records)[`lexicons`](#lexicons)[`users`](#users)[`user_permissions`](#user_permissions)[`api_keys`](#api_keys)[`oauth_sessions`](#oauth_sessions)[`oauth_state`](#oauth_state)[`instance_settings`](#instance_settings)[`event_logs`](#event_logs)[`script_variables`](#script_variables)[`spaces`](#spaces)[`space_members`](#space_members)[`space_records`](#space_records)[`space_repo_state`](#space_repo_state)[`space_record_oplog`](#space_record_oplog)[`space_notify_registrations`](#space_notify_registrations)[`space_invites`](#space_invites)[`space_credentials`](#space_credentials)[`space_dids`](#space_dids)[`service_identity`](#service_identity)[`service_entries`](#service_entries)[`service_entry_xrpcs`](#service_entry_xrpcs)[`verification_methods`](#verification_methods)[`backfill_jobs`](#backfill_jobs)[Testing](#testing)

---
<!--
URL: https://happyview.dev/guides/lua-scripting
title: Lua Scripting | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Lua Scripting

## Lua Scripting

Without Lua scripts, HappyView's query endpoints return raw records and procedure endpoints proxy simple creates and updates. To attach a script to an XRPC endpoint, create a script with trigger `xrpc.query:<nsid>` or `xrpc.procedure:<nsid>` — see [trigger grammar](label-scripts#trigger-grammar). Lua scripts let you go much further:

* Add filtering logic
* Transform responses
* Validate input
* Compose multi-record operations
* Build entirely custom behavior

Scripts run in a sandboxed Lua VM with access to the [Record API](#record-api), a [database API](#database-api), an [HTTP client API](#http-api), a [JSON API](#json-api), and a set of [context globals](#context-globals).

For scripts that react to record changes or label events (rather than XRPC requests), see [Record & Label Scripts](label-scripts).

### [Script structure](#script-structure)

Every script must define a `handle()` function. HappyView calls it when the XRPC endpoint is hit and returns its result as JSON to the client.

```
function handle()
  -- your logic here
  return { key = "value" }
end
```

You can define helper functions and variables outside `handle()`. They're evaluated once when the script loads, then `handle()` is called per request.

### [Sandbox](#sandbox)

Scripts run in a restricted environment. The following standard Lua modules are **removed** and unavailable:

`io`, `debug`, `package`, `require`, `dofile`, `loadfile`, `load`, `collectgarbage`

The `os` module is replaced with a safe subset exposing only `os.time`, `os.date`, `os.difftime`, and `os.clock`. Dangerous functions like `os.execute`, `os.remove`, `os.rename`, and `os.exit` are not available.

An instruction limit of 1,000,000 prevents infinite loops. Exceeding it terminates the script with an error.

See the [Standard Libraries](../api-reference/lua/standard-libraries) reference for the full list of available Lua modules and builtins.

### [Context globals](#context-globals)

These globals are set automatically before `handle()` is called.

#### [Procedure globals](#procedure-globals)

| Global | Type | Description |
| --- | --- | --- |
| `method` | string | The XRPC method name (e.g. `xyz.statusphere.setStatus`) |
| `input` | table | Parsed JSON request body |
| `params` | table | Query string parameters |
| `caller_did` | string | DID of the authenticated user |
| `collection` | string | Target collection NSID |
| `delegate_did` | string? | DID of the delegated account, if using write delegation |
| `env` | table | Script variables configured in the dashboard |

#### [Query globals](#query-globals)

| Global | Type | Description |
| --- | --- | --- |
| `method` | string | The XRPC method name |
| `params` | table | Query string parameters (all values are strings) |
| `collection` | string | Target collection NSID |
| `caller_did` | string? | DID of the authenticated user (nil if unauthenticated) |
| `env` | table | Script variables configured in the dashboard |

#### [Space globals](#space-globals)

When a script handles a space-scoped request, the `space` global is set to a table with the space's metadata. For non-space requests, `space` is `nil`.

| Field | Type | Description |
| --- | --- | --- |
| `space` | string | The full `ats://` space URI |
| `space_id` | string | Internal space identifier |
| `did` | string | The space's DID |
| `authority_did` | string | The space authority's DID |
| `type_nsid` | string | Space type NSID |
| `skey` | string | Space key |

```
function handle()
  if space then
    log("handling request for space: " .. space.space)
    log("space type: " .. space.type_nsid)
  end
end
```

### [Utility globals](#utility-globals)

Available in both queries and procedures:

| Function | Returns | Description |
| --- | --- | --- |
| `now()` | string | Current UTC timestamp in ISO 8601 format |
| `log(message)` | — | Log a message (appears in server logs at debug level) |
| `TID()` | string | Generate a fresh atproto TID (13-character sortable identifier). Also provides conversion methods — see [Utility Globals reference](../api-reference/lua/utility-globals#tid). |
| `toarray(table)` | table | Mark a table as a JSON array for serialization (see [below](#toarray)) |

#### [toarray](#toarray)

Lua tables don't distinguish between arrays and objects. When a table is serialized to JSON, an empty table `{}` becomes a JSON object `{}` instead of an array `[]`. The `toarray()` function marks a table so it always serializes as a JSON array — even when empty.

```
return { items = toarray(results) }
-- With results: [{"name": "a"}, {"name": "b"}]
-- Without results: {"items": []}   (not {"items": {}})
```

You don't need `toarray()` on results from `db.query`, `db.search`, `db.backlinks`, or `db.raw` — those already return properly marked arrays. Use it when you build a table yourself with `table.insert()`.

### [Record API](#record-api)

The `Record` API is available in **procedure**, **query**, and **record/label** scripts. In procedure scripts the full API is available — writes are proxied to the caller's PDS and indexed locally. In query and record/label scripts it runs in **no-auth mode**: `Record.load`, `r:save_local()`, `r:delete_local()`, and `Record.delete_local()` work, but PDS-touching methods (`r:save()`, `r:delete()`) raise an error.

See the full [Record API reference](../api-reference/lua/record-api) for constructor, static methods, instance methods, fields, schema validation, and save behavior.

Quick example:

```
function handle()
  local r = Record(collection, input)
  r:save()
  return { uri = r._uri, cid = r._cid }
end
```

### [Database API](#database-api)

The `db` table provides access to the database. Available in both queries and procedures.

See the full [Database API reference](../api-reference/lua/database-api) for `db.query`, `db.get`, `db.search`, `db.backlinks`, `db.count`, and `db.raw`.

Quick example:

```
function handle()
  local result = db.query({ collection = collection, limit = 20 })
  return { records = result.records, cursor = result.cursor }
end
```

### [HTTP API](#http-api)

The `http` table provides async HTTP client functions. Available in both queries and procedures.

See the full [HTTP API reference](../api-reference/lua/http-api) for all methods, options, and response format.

Quick example:

```
local resp = http.get("https://api.example.com/data")
local data = json.decode(resp.body)
```

### [XRPC Lua API](#xrpc-lua-api)

The `xrpc` table lets scripts call other XRPC endpoints — both local and proxied. Available in both queries and procedures.

See the full [XRPC Lua API reference](../api-reference/lua/xrpc-lua-api) for `xrpc.query` and `xrpc.procedure`.

Quick example:

```
local resp = xrpc.query("xyz.statusphere.listStatuses", { limit = 5 })
local data = json.decode(resp.body)
```

### [atproto API](#atproto-api)

The `atproto` table provides atproto utility functions like DID resolution, label queries, and record signing.

See the full [atproto API reference](../api-reference/lua/atproto-api) for `atproto.resolve_service_endpoint`, `atproto.get_labels`, `atproto.get_labels_batch`, `atproto.sign`, and `atproto.verify_signature`.

### [JSON API](#json-api)

The `json` global provides JSON serialization and deserialization.

See the full [JSON API reference](../api-reference/lua/json-api) for `json.encode` and `json.decode`.

### [Debugging](#debugging)

#### [Logging](#logging)

Use `log()` to trace script execution. Output appears in the server logs at **debug** level with the field `lua_log`, and is also recorded as a `script.log` event in the [event logs](../api-reference/admin/events) (accessible via `GET /admin/events`):

```
function handle()
  log("handle called with params: " .. tostring(params.limit))
  local result = db.query({ collection = collection, limit = params.limit })
  log("query returned " .. #result.records .. " records")
  return result
end
```

To see log output in stdout, make sure your `RUST_LOG` environment variable includes debug level for HappyView (the default `happyview=debug` works). See [Configuration](../getting-started/configuration).

#### [Error messages](#error-messages)

When a script fails, the client receives a generic `500` response:

* `{"error": "script execution failed"}`: covers syntax errors, runtime errors, missing `handle()` function, and errors raised with `error()`
* `{"error": "script exceeded execution time limit"}`: the script hit the 1,000,000 instruction limit

The **full error message** is logged server-side at error level. Check the server logs to see the actual Lua error, including line numbers and stack traces.

#### [Common mistakes](#common-mistakes)

* **Missing `handle()` function**: Every script must define a global `handle()` function. If it's missing or misspelled, the script fails silently with "script execution failed".
* **Calling `error()` for expected conditions**: Lua's `error()` triggers a 500 response. For expected conditions like "record not found", return a structured error response instead: `return { error = "not found" }`.
* **Infinite loops**: The sandbox enforces a 1,000,000 instruction limit. If your script processes large data sets, paginate with `db.query()` limits instead of loading everything at once.
* **Forgetting `params` values are strings**: All query string parameters arrive as strings. Use `tonumber(params.limit)` if you need a number.

### [Example scripts](#example-scripts)

See the example script references for complete, ready-to-use scripts:

**Queries:**

* [Get a record](../reference/script-examples/get-record) — fetch a single record by AT URI
* [Paginated list](../reference/script-examples/paginated-list) — list records with cursor-based pagination and DID filtering
* [List or fetch](../reference/script-examples/list-or-fetch) — combined single-record lookup and paginated listing
* [Expanded query](../reference/script-examples/expanded-query) — list statuses with user profiles in a single response
* [Verify signed record](../reference/script-examples/signed-record-verify) — fetch a record and verify its attestation signature

**Procedures:**

* [Create a record](../reference/script-examples/create-record) — simple write that saves input as a record
* [Upsert a record](../reference/script-examples/upsert-record) — create or update using a deterministic rkey
* [Update or delete](../reference/script-examples/update-or-delete) — single endpoint handling create, update, and delete
* [Batch save](../reference/script-examples/batch-save) — create multiple records in parallel with `Record.save_all()`
* [Sidecar records](../reference/script-examples/sidecar-records) — create linked records across collections with a shared rkey
* [Cascading delete](../reference/script-examples/cascading-delete) — delete a record and all related records
* [Complex mutations](../reference/script-examples/complex-mutations) — load, transform, and save a record with multiple field changes
* [Signed record](../reference/script-examples/signed-record) — save a record with an attestation signature

**Record & Label Scripts:**

* [Algolia sync](../reference/script-examples/algolia-sync) — push records to an Algolia search index on create/update/delete

### [Next steps](#next-steps)

* [Record & Label Scripts](label-scripts): React to record changes and label events in real time
* [Lexicons](lexicons): Understand how record, query, and procedure lexicons work together
* [Admin API — Scripts](../api-reference/admin/scripts): Manage scripts via the API
* [XRPC API](../api-reference/xrpc-api): See how endpoints behave with and without Lua scripts
* [Dashboard](../getting-started/dashboard#lua-editor): Use the web editor with context-aware completions

[Backfill

Previous Page](/guides/backfill)[API Clients

Next Page](/guides/api-clients)

#### On this page

[Script structure](#script-structure)[Sandbox](#sandbox)[Context globals](#context-globals)[Procedure globals](#procedure-globals)[Query globals](#query-globals)[Space globals](#space-globals)[Utility globals](#utility-globals)[toarray](#toarray)[Record API](#record-api)[Database API](#database-api)[HTTP API](#http-api)[XRPC Lua API](#xrpc-lua-api)[atproto API](#atproto-api)[JSON API](#json-api)[Debugging](#debugging)[Logging](#logging)[Error messages](#error-messages)[Common mistakes](#common-mistakes)[Example scripts](#example-scripts)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/guides/event-logs
title: Event Logs | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Event Logs

## Event Logs

HappyView maintains an internal event log that records system activity — lexicon changes, record operations, Lua script executions and errors, user actions, API key events, backfill jobs, and Jetstream connectivity. Events are stored in the database and queryable via the [admin API](../api-reference/admin/events).

### [Event types](#event-types)

Events follow a `category.action` naming convention. Each event has a severity level (`info`, `warn`, or `error`), an optional `actor_did` (the user who triggered it), an optional `subject` (what was affected), and a `detail` JSON object with event-specific data.

#### [Lexicon events](#lexicon-events)

| Event Type | Severity | Subject | Detail |
| --- | --- | --- | --- |
| `lexicon.created` | info | Lexicon NSID | `revision`, `has_script`, `source` |
| `lexicon.updated` | info | Lexicon NSID | `revision`, `has_script`, `source` |
| `lexicon.deleted` | info | Lexicon NSID | — |

Logged when lexicons are uploaded, updated, or deleted via the [admin API](../api-reference/admin/lexicons). The `actor_did` is the user who performed the action.

#### [Record events](#record-events)

| Event Type | Severity | Subject | Detail |
| --- | --- | --- | --- |
| `record.created` | info | Record AT URI | `collection`, `did`, `rkey` |
| `record.deleted` | info | Record AT URI | `collection`, `did`, `rkey` |

Logged when records are received from Jetstream and stored or removed from the local database. These are system-triggered events (`actor_did` is null). If a database error occurs during the operation, the same event type is logged with `error` severity and the error message is included in the detail.

#### [Script events](#script-events)

| Event Type | Severity | Subject | Detail |
| --- | --- | --- | --- |
| `script.executed` | info | Method NSID | `method`, `caller_did`, `duration_ms` |
| `script.error` | error | Method NSID | `error`, `script_source`, `input`, `caller_did`, `method` |

Logged when Lua scripts run for XRPC query or procedure endpoints. Script errors capture the full context needed to reproduce and debug the issue: the error message, the complete Lua script source, the input that triggered it, and the caller's DID.

#### [User events](#user-events)

| Event Type | Severity | Subject | Detail |
| --- | --- | --- | --- |
| `user.created` | info | New user DID | `template` (if used) |
| `user.deleted` | info | Removed user ID | — |
| `user.bootstrapped` | info | Bootstrapped user DID | — |
| `user.permissions_updated` | info | User ID | `granted`, `revoked` |
| `user.super_transferred` | warn | New super user ID | `from_user_id` |

The `user.bootstrapped` event is logged when the first user is auto-promoted to super user (see [Auth - Auto-bootstrap](../api-reference/admin/admin-api#auth)).

#### [Auth events](#auth-events)

| Event Type | Severity | Subject | Detail |
| --- | --- | --- | --- |
| `auth.permission_denied` | error | Endpoint path | `required_permission`, `user_id` |

Logged when a user attempts to access an endpoint they don't have permission for.

#### [API Key events](#api-key-events)

| Event Type | Severity | Subject | Detail |
| --- | --- | --- | --- |
| `api_key.created` | info | Key ID | `name`, `permissions` |
| `api_key.revoked` | info | Key ID | `name` |

#### [Script Variable events](#script-variable-events)

| Event Type | Severity | Subject | Detail |
| --- | --- | --- | --- |
| `script_variable.upserted` | info | Variable key | — |
| `script_variable.deleted` | info | Variable key | — |

#### [Hook events](#hook-events)

| Event Type | Severity | Subject | Detail |
| --- | --- | --- | --- |
| `script.executed` | info | Trigger ID | `trigger_id` |
| `script.dead_lettered` | error | Trigger ID | `trigger_id`, `error` |

Logged when [record/label scripts](./label-scripts) run. Dead-lettered events indicate a script failed all retry attempts. You can manage dead letters from the **Data > Dead Letters** page in the dashboard — see [Dead Letters](#dead-letters) below.

#### [Backfill events](#backfill-events)

| Event Type | Severity | Subject | Detail |
| --- | --- | --- | --- |
| `backfill.started` | info | Collection NSID | `job_id` |
| `backfill.completed` | info | Collection NSID | `job_id`, `total_repos` |
| `backfill.failed` | error | Collection NSID | `job_id`, `error` |

See [Backfill](./backfill) for background on backfill jobs.

#### [Jetstream events](#jetstream-events)

| Event Type | Severity | Subject | Detail |
| --- | --- | --- | --- |
| `jetstream.connected` | info | — | `url` |
| `jetstream.disconnected` | warn | — | `reason` |

Logged when the WebSocket connection to [Jetstream](https://github.com/bluesky-social/jetstream) is established or lost.

### [Querying events](#querying-events)

Use the admin API to query event logs with filters:

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key
const headers = { Authorization: `Bearer ${TOKEN}` };

interface Event {
  id: string;
  event_type: string;
  severity: string;
  actor_did?: string;
  subject?: string;
  detail: Record<string, unknown>;
  created_at: string;
}

interface EventsResponse {
  events: Event[];
  cursor?: string;
}

// Get all errors
const errors: EventsResponse = await fetch(
  "http://127.0.0.1:3000/admin/events?severity=error",
  { headers },
).then((r) => r.json());

// Get script errors for a specific lexicon
const scriptErrors: EventsResponse = await fetch(
  "http://127.0.0.1:3000/admin/events?event_type=script.error&subject=com.example.feed.like",
  { headers },
).then((r) => r.json());

// Get all lexicon-related events
const lexiconEvents: EventsResponse = await fetch(
  "http://127.0.0.1:3000/admin/events?category=lexicon",
  { headers },
).then((r) => r.json());

// Paginate through results
const page: EventsResponse = await fetch(
  "http://127.0.0.1:3000/admin/events?limit=20&cursor=2026-03-01T11:59:00Z",
  { headers },
).then((r) => r.json());
```

See the [Admin API reference](../api-reference/admin/events#list-event-logs) for full parameter documentation.

### [Retention](#retention)

Event logs are automatically cleaned up based on the `EVENT_LOG_RETENTION_DAYS` environment variable (default: 30 days). A background task runs hourly to delete events older than the configured retention period.

Set `EVENT_LOG_RETENTION_DAYS=0` to disable automatic cleanup and keep logs indefinitely.

See [Configuration](../getting-started/configuration) for all environment variables.

### [Dead Letters](#dead-letters)

When a record or label script fails after all retry attempts, the event is stored in the dead letters queue. You can manage dead letters from the **Data > Dead Letters** page in the dashboard.

From the dead letters page you can:

* **Retry Script** — replay the stored event through the script (use after fixing the script)
* **Re-index** — fetch the record fresh from the PDS and run it through the full indexing pipeline (use when the record may have changed)
* **Dismiss** — mark the dead letter as resolved without retrying

Bulk actions are available for selected rows or all entries matching the current filters.

### [Next steps](#next-steps)

* [Admin API — Event Logs](../api-reference/admin/events) — full query parameters and response format
* [Permissions](permissions) — control which users can read event logs
* [Troubleshooting](../reference/troubleshooting) — using event logs to diagnose issues

[Permissions

Previous Page](/guides/permissions)[Database Setup

Next Page](/guides/database/database-setup)

#### On this page

[Event types](#event-types)[Lexicon events](#lexicon-events)[Record events](#record-events)[Script events](#script-events)[User events](#user-events)[Auth events](#auth-events)[API Key events](#api-key-events)[Script Variable events](#script-variable-events)[Hook events](#hook-events)[Backfill events](#backfill-events)[Jetstream events](#jetstream-events)[Querying events](#querying-events)[Retention](#retention)[Dead Letters](#dead-letters)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/getting-started/configuration
title: Configuration | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Configuration

## Configuration

HappyView is configured via environment variables. A `.env` file in the project root is loaded automatically on startup. See [Deployment](deployment/docker) for local setup or [Production Deployment](deployment/production) for production setup.

### [Environment variables](#environment-variables)

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `DATABASE_URL` | yes | --- | Database connection string. SQLite (`sqlite://path/to/db?mode=rwc`) or Postgres (`postgres://user:pass@host/db`) |
| `DATABASE_BACKEND` | no | auto-detected | Force `sqlite` or `postgres`. Auto-detected from `DATABASE_URL` scheme if not set |
| `PUBLIC_URL` | yes | --- | Public-facing URL for HappyView (used for OAuth callbacks, e.g. `https://happyview.example.com`). **For local development, use `http://127.0.0.1:3000` — not `localhost`** (see note below). Do **not** include the base path — see `BASE_PATH` |
| `BASE_PATH` | no | *(none)* | Subpath prefix for mounting HappyView behind a reverse proxy (e.g. `/hv`). Must start with `/` and have no trailing slash. When set, all routes are served under this prefix and the dashboard is accessible at `https://example.com/hv/`. See [Reverse proxy subpath](deployment/production#reverse-proxy-subpath) |
| `SESSION_SECRET` | no | dev default | Secret key for signing session cookies (at least 64 characters). **Must be set in production** |
| `HOST` | no | `0.0.0.0` | Bind host |
| `PORT` | no | `3000` | Bind port |
| `JETSTREAM_URL` | no | `wss://jetstream1.us-east.bsky.network` | Jetstream WebSocket URL for real-time record streaming |
| `RELAY_URL` | no | `https://bsky.network` | Relay URL for [backfill](../guides/backfill) repo discovery |
| `PLC_URL` | no | `https://plc.directory` | [PLC directory](https://github.com/did-method-plc/did-method-plc) URL for DID resolution |
| `STATIC_DIR` | no | `./web/out` | Directory containing the built dashboard static assets |
| `EVENT_LOG_RETENTION_DAYS` | no | `30` | Number of days to keep event logs before automatic cleanup. Set to `0` to disable cleanup |
| `TOKEN_ENCRYPTION_KEY` | no | --- | Base64-encoded 32-byte key for encrypting stored OAuth tokens. **Strongly recommended in production** |
| `DEFAULT_RATE_LIMIT_CAPACITY` | no | `100` | Default token bucket capacity used when registering a new API client |
| `DEFAULT_RATE_LIMIT_REFILL_RATE` | no | `2.0` | Default token bucket refill rate (tokens/second) for new API clients |
| `ATTESTATION_PRIVATE_KEY` | no | auto-generated | Hex-encoded 32-byte secp256k1 private key for [attestation signing](../guides/attestation-signing). Auto-generated and persisted to database on first run |
| `ATTESTATION_KEY_ID` | no | `did:web:{host}#attestation` | Key identifier included in attestation signatures. Derived from `PUBLIC_URL` by default |
| `ATTESTATION_SIG_TYPE` | no | app-specific NSID | `$type` value used in attestation signature objects |
| `BACKFILL_CONCURRENT_PDS` | no | `10` | How many PDS servers to fetch from simultaneously during backfill. Overridden by database setting if set via admin API |
| `BACKFILL_CONCURRENT_DIDS_PER_PDS` | no | `3` | How many repos to fetch concurrently from each PDS during backfill. Overridden by database setting if set via admin API |
| `BACKFILL_CONCURRENT_RESOLUTION` | no | `100` | How many DID document lookups to run in parallel during PDS resolution. Overridden by database setting if set via admin API |
| `BACKFILL_RETENTION_DAYS` | no | `28` | Days to keep per-repo detail data from completed backfill jobs. `0` to keep indefinitely. Overridden by database setting if set via admin API |
| `BACKFILL_DATABASE_MAX_CONNECTIONS` | no | auto-calculated | Override the backfill connection pool size. Auto-calculated from concurrency settings if not set |
| `VERBOSE_EVENT_LOGGING` | no | `false` | Log every record index, hook execution, and hook skip to the event log. High write volume — recommended only for debugging. Overridden by database setting if set via admin API |
| `RUST_LOG` | no | `happyview=debug,tower_http=debug,sqlx=warn` | Log filter (uses `tracing_subscriber::EnvFilter`) |
| `APP_NAME` | no | --- | Application name shown on OAuth authorization screens. Overridden by database setting if set via admin API |
| `LOGO_URI` | no | --- | URL to application logo for OAuth screens. Overridden by database setting or logo upload |
| `TOS_URI` | no | --- | URL to terms of service. Overridden by database setting if set via admin API |
| `POLICY_URI` | no | --- | URL to privacy policy. Overridden by database setting if set via admin API |

### [Example `.env`](#example-env)

```

## SQLite (default — zero setup required)

DATABASE_URL=sqlite://data/happyview.db?mode=rwc
PUBLIC_URL=http://127.0.0.1:3000
SESSION_SECRET=change-me-in-production

## Or use Postgres instead:

## DATABASE_URL=postgres://happyview:happyview@localhost/happyview

## Optional overrides

## BASE_PATH=/hv

## HOST=0.0.0.0

## PORT=3000

## JETSTREAM_URL=wss://jetstream1.us-east.bsky.network

## RELAY_URL=https://bsky.network

## PLC_URL=https://plc.directory

## STATIC_DIR=./web/out

## EVENT_LOG_RETENTION_DAYS=30

## TOKEN_ENCRYPTION_KEY=base64-encoded-32-byte-key

## DEFAULT_RATE_LIMIT_CAPACITY=100

## DEFAULT_RATE_LIMIT_REFILL_RATE=2.0

## BACKFILL_CONCURRENT_PDS=10

## BACKFILL_CONCURRENT_DIDS_PER_PDS=3

## BACKFILL_CONCURRENT_RESOLUTION=100

## BACKFILL_RETENTION_DAYS=28

## VERBOSE_EVENT_LOGGING=false

## RUST_LOG=happyview=debug,tower_http=debug,sqlx=warn

## APP_NAME=My App

## LOGO_URI=https://example.com/logo.png

## TOS_URI=https://example.com/tos

## POLICY_URI=https://example.com/privacy

```

### [Next steps](#next-steps)

* [Authentication](authentication) — set up OAuth and admin users
* [Dashboard](dashboard) — explore the admin dashboard
* [Production deployment](deployment/production) — deploy HappyView to production

[Quickstart

Previous Page](/getting-started/quickstart)[Service Identity

Next Page](/getting-started/service-identity)

#### On this page

[Environment variables](#environment-variables)[Example `.env`](#example-env)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/sdk/overview
title: Overview | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Overview

## Overview

HappyView provides JavaScript packages for building third-party apps that authenticate with a HappyView instance and make XRPC requests on behalf of users.

| Package | Purpose |
| --- | --- |
| [`@happyview/lex-agent`](https://npmx.dev/package/%40happyview/lex-agent) | Recommended — type-safe XRPC via [`@atproto/lex`](https://npmx.dev/package/%40atproto/lex) `Client` with HappyView DPoP auth |
| [`@happyview/oauth-client`](https://npmx.dev/package/%40happyview/oauth-client) | Platform-agnostic core — DPoP key provisioning, session management, authenticated fetch |
| [`@happyview/oauth-client-browser`](https://npmx.dev/package/%40happyview/oauth-client-browser) | Browser OAuth wrapper for apps already using `@atproto/oauth-client-browser` |
| [`@happyview/oauth-client-node`](https://npmx.dev/package/%40happyview/oauth-client-node) | Node.js OAuth client for server-side apps, matching `@atproto/oauth-client-node` |

### [Which package do I need?](#which-package-do-i-need)

**Starting a new app?** Use `@happyview/lex-agent` with `@atproto/lex`. It gives you type-safe XRPC calls through a `Client` that routes requests to your HappyView instance with DPoP authentication. This is the recommended way to interact with HappyView from JavaScript.

**Already using `@atproto/api`?** `HappyViewSession` works directly as a session manager for `@atproto/api`'s `Agent` — just pass it to `new Agent(session)`. See [Using with @atproto/api](./oauth-client-browser/overview#using-with-atprotoapi).

**Already using `@atproto/oauth-client-browser`?** Add `@happyview/oauth-client-browser` to get a `HappyViewBrowserClient` that handles the HappyView-specific DPoP key provisioning and session registration on top of the standard atproto OAuth flow.

**Building a server-side (Node.js) app?** Use `@happyview/oauth-client-node` — it handles handle resolution, DID resolution, PDS discovery, and the full OAuth flow server-side. Matches the API surface of `@atproto/oauth-client-node`.

**Building something more custom?** Use `@happyview/oauth-client` directly and provide your own `CryptoAdapter` and `StorageAdapter`.

### [How it works](#how-it-works)

Third-party apps authenticate using HappyView's [DPoP key provisioning](../getting-started/authentication#dpop-key-provisioning-for-third-party-apps) flow:

1. The SDK requests a DPoP keypair from the HappyView instance.
2. Your app runs a standard atproto OAuth flow with the user's PDS using that keypair.
3. The SDK registers the resulting tokens with HappyView.
4. All subsequent XRPC requests are authenticated with DPoP proofs — HappyView handles its own lexicons locally and proxies standard atproto writes to the user's PDS.

### [Quick start](#quick-start)

```
npm install @happyview/lex-agent @happyview/oauth-client-browser @atproto/lex
```

```
import { Client } from "@atproto/lex";
import { HappyViewBrowserClient } from "@happyview/oauth-client-browser";
import { createAgent } from "@happyview/lex-agent";

// Set up the OAuth client
const oauthClient = new HappyViewBrowserClient({
  instanceUrl: "https://happyview.example.com",
  clientId: "https://example.com/oauth-client-metadata.json",
  clientKey: "hvc_your_client_key",
});

// Sign in — redirects to the user's PDS
await oauthClient.signIn("alice.bsky.social");

// On page load — restore session or process callback
const result = await oauthClient.init();
const session = result?.session;

// Create a type-safe Lex client
const agent = createAgent(session);
const lex = new Client(agent);

// Make type-safe XRPC calls
const result = await lex.xrpc(myLexicons.com.example.getGame, {
  params: { slug: "celeste" },
});
```

### [Next steps](#next-steps)

* [Lex Agent](./lex-agent/overview): type-safe XRPC with `@atproto/lex`
* [OAuth Client](./oauth-client/overview): platform-agnostic core client
* [Browser Client](./oauth-client-browser/overview): browser OAuth redirect flow
* [Node Client](./oauth-client-node/overview): server-side OAuth flow
* [Authentication](../getting-started/authentication): full details on DPoP key provisioning and API client types

[SQLite to Postgres Migration

Previous Page](/guides/database/sqlite-to-postgres-migration)[Lex Agent

Next Page](/sdk/lex-agent/overview)

#### On this page

[Which package do I need?](#which-package-do-i-need)[How it works](#how-it-works)[Quick start](#quick-start)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/getting-started/deployment/other
title: From Source | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

[Railway](/getting-started/deployment/railway)[Docker](/getting-started/deployment/docker)[From Source](/getting-started/deployment/other)[Production](/getting-started/deployment/production)

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

From Source

Deployment

## From Source

This guide runs HappyView directly with `cargo run`. If you'd rather use Docker Compose, see [Local Development with Docker](docker).

### [Prerequisites](#prerequisites)

* Rust (stable)
* (Optional) PostgreSQL 17+ if you prefer Postgres over the default SQLite

### [1. Clone and configure](#1-clone-and-configure)

```
git clone git@tangled.org:gamesgamesgamesgames.games/happyview
cd happyview
cp .env.example .env
```

Edit `.env` to point at your running services:

```

## SQLite (default — no setup needed, file created automatically)

DATABASE_URL=sqlite://data/happyview.db?mode=rwc
PUBLIC_URL=http://127.0.0.1:3000
SESSION_SECRET=change-me-in-production
```

Or if you prefer Postgres:

```
DATABASE_URL=postgres://happyview:happyview@localhost/happyview
```

See [Configuration](../configuration) for all available variables and the [database setup guide](../../guides/database/database-setup) for details on both backends.

### [2. Create the database (Postgres only)](#2-create-the-database-postgres-only)

If using SQLite, skip this step — HappyView creates the database file automatically.

If using Postgres:

```
createdb happyview
```

Or if using a Postgres user with a password:

```
psql -c "CREATE DATABASE happyview;" -U postgres
```

HappyView runs migrations automatically on startup, so no manual migration step is needed.

### [3. Start HappyView](#3-start-happyview)

```
cargo run
```

HappyView starts on port 3000 (configurable via the `PORT` environment variable).

### [Next steps](#next-steps)

Your HappyView instance is running. Follow the [Statusphere tutorial](../../tutorials/statusphere) to upload lexicons, add custom query logic, and start indexing records from the network.

[Docker

Previous Page](/getting-started/deployment/docker)[Production

Next Page](/getting-started/deployment/production)

#### On this page

[Prerequisites](#prerequisites)[1. Clone and configure](#1-clone-and-configure)[2. Create the database (Postgres only)](#2-create-the-database-postgres-only)[3. Start HappyView](#3-start-happyview)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/getting-started/deployment/docker
title: Docker | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

[Railway](/getting-started/deployment/railway)[Docker](/getting-started/deployment/docker)[From Source](/getting-started/deployment/other)[Production](/getting-started/deployment/production)

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Docker

Deployment

## Docker

This guide runs HappyView and the dashboard locally using Docker Compose.

### [Prerequisites](#prerequisites)

* [Docker](https://docs.docker.com/get-docker/) and Docker Compose

### [1. Clone and configure](#1-clone-and-configure)

```
git clone git@tangled.org:gamesgamesgamesgames.games/happyview
cd happyview
cp .env.example .env
```

Edit `.env` and set at least `PUBLIC_URL` (e.g. `http://127.0.0.1:3000`) and `SESSION_SECRET` (at least 64 characters). The defaults work for everything else. See [Configuration](../configuration) for the full list of environment variables.

### [2. Start the stack](#2-start-the-stack)

```
docker compose up
```

This starts:

| Service | Port | Description |
| --- | --- | --- |
| **happyview** | 3000 | HappyView API server |
| **web** | 3001 | Next.js dashboard |

HappyView runs migrations automatically on startup. The first build will take a few minutes while Rust compiles.

The `happyview` container serves its own bundled dashboard at `http://127.0.0.1:3000`, but that copy is baked in at container build time and only updates when you rebuild the image. For day-to-day development, use the dev dashboard at `http://127.0.0.1:3001` — it hot-reloads on changes to the `web/` source.

### [Next steps](#next-steps)

Your HappyView stack is running. Follow the [Statusphere tutorial](../../tutorials/statusphere) to upload lexicons, add custom query logic, and start indexing records from the network.

[Railway

Previous Page](/getting-started/deployment/railway)[From Source

Next Page](/getting-started/deployment/other)

#### On this page

[Prerequisites](#prerequisites)[1. Clone and configure](#1-clone-and-configure)[2. Start the stack](#2-start-the-stack)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/getting-started/deployment/production
title: Production | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

[Railway](/getting-started/deployment/railway)[Docker](/getting-started/deployment/docker)[From Source](/getting-started/deployment/other)[Production](/getting-started/deployment/production)

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Production

Deployment

## Production

This page covers what to change when taking a HappyView instance from local development to production. For setup instructions, see [Deployment](railway). This page assumes you already have a working deployment and focuses on hardening and operational concerns.

### [Session secret](#session-secret)

Set `SESSION_SECRET` to a random string of at least 64 characters. This signs the session cookies issued during OAuth login; rotating it invalidates every existing session.

```
openssl rand -base64 48
```

Never commit the secret to source control. Store it in your platform's secret manager (Railway variables, Docker secrets, Kubernetes secrets, etc.).

### [Token encryption key](#token-encryption-key)

If you use [plugins](../../guides/plugins) that require secrets (API keys, OAuth credentials), set `TOKEN_ENCRYPTION_KEY` to a base64-encoded 32-byte key. This encrypts plugin secrets at rest using AES-256-GCM:

```
openssl rand -base64 32
```

Without this variable, the dashboard's plugin secret fields are disabled and plugins can only read secrets from environment variables.

### [TLS and `PUBLIC_URL`](#tls-and-public_url)

HappyView does not terminate TLS. Put it behind a reverse proxy (nginx, Caddy, Cloudflare Tunnel, a platform-managed load balancer) and set `PUBLIC_URL` to the public HTTPS URL:

```
PUBLIC_URL=https://happyview.example.com
```

`PUBLIC_URL` is used to construct OAuth redirect URIs, so it must exactly match the URL users hit — including scheme. A mismatch breaks OAuth login.

### [Reverse proxy subpath](#reverse-proxy-subpath)

If you need HappyView to share a domain with other services, set `BASE_PATH` to mount it at a subpath. For example, to serve the dashboard at `https://example.com/hv/`:

```
PUBLIC_URL=https://example.com
BASE_PATH=/hv
```

`PUBLIC_URL` should **not** include the base path — HappyView appends it automatically when constructing OAuth callbacks and other external URLs.

The base path is applied at container startup without rebuilding the image, so prebuilt Docker images (including Railway deployments) work with any subpath.

#### [XRPC endpoints](#xrpc-endpoints)

ATProto clients expect XRPC endpoints at `/xrpc/*` on the domain root. When using a base path, configure your reverse proxy to rewrite `/xrpc/*` requests so they reach HappyView under its base path. Here's an example using Caddy:

```
example.com {
    # Dashboard and API under the base path
    handle /hv/* {
        reverse_proxy happyview:3000
    }

    # Redirect bare /hv to /hv/ for cleaner URLs
    handle /hv {
        redir /hv/ permanent
    }

    # ATProto XRPC — rewrite to base path before proxying
    handle /xrpc/* {
        rewrite * /hv{uri}
        reverse_proxy happyview:3000
    }

    # Everything else goes to another service
    handle {
        reverse_proxy other-app:3001
    }
}
```

The `rewrite * /hv{uri}` directive prepends `/hv` to the request path before proxying, so `/xrpc/com.atproto.sync.getRecord` becomes `/hv/xrpc/com.atproto.sync.getRecord` — which matches HappyView's nested routes.

#### [Health checks with a base path](#health-checks-with-a-base-path)

`GET /health` is always served at the domain root, even when `BASE_PATH` is set. This keeps load balancer probes working without routing changes.

### [Database](#database)

SQLite is fine for small to medium instances and is the default. Switch to Postgres if you need:

* Multiple HappyView replicas sharing one database
* Larger-than-memory working sets
* External tools that need direct read access to the records table

See the [database setup guide](../../guides/database/database-setup) for configuration details and [Postgres → SQLite migration](../../guides/database/postgres-to-sqlite-migration) if you're moving the other direction. Migrations run automatically on startup regardless of backend.

### [Rate limits](#rate-limits)

HappyView has a per-client token-bucket rate limiter for XRPC endpoints. The defaults (set via `DEFAULT_RATE_LIMIT_CAPACITY` and `DEFAULT_RATE_LIMIT_REFILL_RATE`) apply to any [API client](../../guides/api-keys) that doesn't have per-client overrides. Raise the defaults cautiously — they exist so one misbehaving integrator can't saturate the server.

Per-client overrides are set at client creation or via `PUT /admin/api-clients/{id}` (see [Admin API — API Clients](../../api-reference/admin/api-clients)).

### [Logging](#logging)

The default `RUST_LOG` setting (`happyview=debug,tower_http=debug`) is noisy. For production, drop the verbosity:

```
RUST_LOG=happyview=info,tower_http=info
```

Structured logs go to stdout, so any platform that captures container stdout (Railway, Fly, ECS, Kubernetes) will ingest them without further configuration. For retention and querying, ship stdout to your usual log aggregator.

### [Event log retention](#event-log-retention)

The admin [event log](../../guides/event-logs) is stored in the same database as records. `EVENT_LOG_RETENTION_DAYS` (default `30`) controls automatic cleanup. Set to `0` to keep events indefinitely — useful for compliance-sensitive deployments, but plan for database growth.

### [Health checks](#health-checks)

`GET /health` returns `200 ok` when HappyView can bind its HTTP listener. Use it as the readiness/liveness probe for your platform.

For a deeper check, hit `GET /xrpc/com.atproto.server.describeServer` — this exercises the database and lexicon registry, and only returns `200` if HappyView can actually serve requests.

### [Backups](#backups)

* **SQLite**: back up the database file (e.g. `data/happyview.db`) plus its `-wal` and `-shm` sidecar files. Use `sqlite3 happyview.db ".backup '/path/backup.db'"` for a consistent snapshot while HappyView is running.
* **Postgres**: standard `pg_dump` / managed-Postgres snapshots.

Most of what HappyView stores is derivable from the network — lost records can be re-indexed via [backfill](../../guides/backfill). You can't recover from the network: user accounts and permissions, API keys, API clients, plugin secrets, and the Jetstream cursor. Prioritize those in your backup plan.

### [Next steps](#next-steps)

* [Configuration](../configuration) — full environment variable reference
* [Permissions](../../guides/permissions) — lock down admin access before exposing the dashboard publicly
* [Troubleshooting](../../reference/troubleshooting) — diagnose issues with a running instance

[From Source

Previous Page](/getting-started/deployment/other)[Statusphere

Next Page](/tutorials/statusphere)

#### On this page

[Session secret](#session-secret)[Token encryption key](#token-encryption-key)[TLS and `PUBLIC_URL`](#tls-and-public_url)[Reverse proxy subpath](#reverse-proxy-subpath)[XRPC endpoints](#xrpc-endpoints)[Health checks with a base path](#health-checks-with-a-base-path)[Database](#database)[Rate limits](#rate-limits)[Logging](#logging)[Event log retention](#event-log-retention)[Health checks](#health-checks)[Backups](#backups)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/api-reference/admin/users
title: Users | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Users

Admin API

## Users

Manage admin users and their permissions. See the [Permissions guide](../../guides/permissions) for available permissions and templates.

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key
const headers = { Authorization: `Bearer ${TOKEN}` };
```

### [Create a user](#create-a-user)

```
POST /admin/users
```

Requires `users:create` permission. You cannot grant permissions you don't have yourself (escalation guard).

TypeScriptJavaScriptRustGocURL

```
interface User {
  id: string;
  did: string;
  is_super: boolean;
  permissions: string[];
}

const response = await fetch("http://127.0.0.1:3000/admin/users", {
  method: "POST",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    did: "did:plc:newuser",
    template: "operator",
  }),
});
const data: User = await response.json();
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `did` | string | yes | The atproto DID of the user to add |
| `template` | string | no | Permission template: `viewer`, `operator`, `manager`, or `full_access` |
| `permissions` | string[] | no | Explicit list of permissions to grant (used instead of or in addition to `template`) |

If neither `template` nor `permissions` is provided, the user is created with no permissions.

**Response**: `201 Created`

```
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "did": "did:plc:newuser",
  "is_super": false,
  "permissions": ["lexicons:read", "records:read", "script-variables:read", "users:read", "api-keys:read", "api-keys:create", "api-keys:delete", "backfill:read", "backfill:create", "stats:read", "events:read"]
}
```

### [List users](#list-users)

```
GET /admin/users
```

Requires `users:read` permission.

TypeScriptJavaScriptRustGocURL

```
interface UserWithTimestamps {
  id: string;
  did: string;
  is_super: boolean;
  permissions: string[];
  created_at: string;
  last_used_at: string;
}

const response = await fetch("http://127.0.0.1:3000/admin/users", {
  headers,
});
const data: UserWithTimestamps[] = await response.json();
```

**Response**: `200 OK`

```
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "did": "did:plc:admin",
    "is_super": true,
    "permissions": ["lexicons:create", "lexicons:read", "lexicons:delete", "records:read", "records:delete", "records:delete-collection", "script-variables:create", "script-variables:read", "script-variables:delete", "users:create", "users:read", "users:update", "users:delete", "api-keys:create", "api-keys:read", "api-keys:delete", "backfill:create", "backfill:read", "stats:read", "events:read"],
    "created_at": "2025-01-01T00:00:00Z",
    "last_used_at": "2025-01-02T12:00:00Z"
  }
]
```

### [Get a user](#get-a-user)

```
GET /admin/users/{id}
```

Requires `users:read` permission.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "http://127.0.0.1:3000/admin/users/550e8400-e29b-41d4-a716-446655440000",
  { headers },
);
const data: UserWithTimestamps = await response.json();
```

**Response**: `200 OK` with the same shape as a single item from the list response.

### [Update user permissions](#update-user-permissions)

```
PATCH /admin/users/{id}/permissions
```

Requires `users:update` permission. You cannot grant permissions you don't have yourself, and you cannot modify the super user's permissions.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "http://127.0.0.1:3000/admin/users/550e8400-e29b-41d4-a716-446655440000/permissions",
  {
    method: "PATCH",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant: ["lexicons:create", "lexicons:delete"],
      revoke: ["records:delete"],
    }),
  },
);
const data: User = await response.json();
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `grant` | string[] | no | Permissions to add |
| `revoke` | string[] | no | Permissions to remove |

**Response**: `200 OK` with the updated user object.

### [Transfer super user](#transfer-super-user)

```
POST /admin/users/transfer-super
```

Only the current super user can call this endpoint. Transfers super user status to another existing user.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/admin/users/transfer-super", {
  method: "POST",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    target_user_id: "550e8400-e29b-41d4-a716-446655440000",
  }),
});
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `target_user_id` | string | yes | The ID of the user to receive super status |

**Response**: `200 OK`

### [Delete a user](#delete-a-user)

```
DELETE /admin/users/{id}
```

Requires `users:delete` permission. You cannot delete the super user or yourself.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "http://127.0.0.1:3000/admin/users/550e8400-e29b-41d4-a716-446655440000",
  {
    method: "DELETE",
    headers,
  },
);
```

**Response**: `204 No Content`

[API Keys

Previous Page](/api-reference/admin/api-keys)[Labelers

Next Page](/api-reference/admin/labelers)

#### On this page

[Create a user](#create-a-user)[List users](#list-users)[Get a user](#get-a-user)[Update user permissions](#update-user-permissions)[Transfer super user](#transfer-super-user)[Delete a user](#delete-a-user)

---
<!--
URL: https://happyview.dev/guides/database/sqlite-to-postgres-migration
title: SQLite to Postgres Migration | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

[Database Setup](/guides/database/database-setup)[Postgres to SQLite Migration](/guides/database/postgres-to-sqlite-migration)[SQLite to Postgres Migration](/guides/database/sqlite-to-postgres-migration)

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

SQLite to Postgres Migration

Database

## SQLite to Postgres Migration

This guide covers migrating an existing HappyView deployment from SQLite to Postgres. If you are staying on SQLite, no action is required.

### [Overview](#overview)

HappyView writes all internal SQL in SQLite syntax and translates to Postgres automatically at runtime. This means your **Lua scripts do not need any changes** when switching from SQLite to Postgres — they continue to work as-is.

The main steps are: set up the Postgres database, update your environment variables, and re-index your data.

### [Step 1: Set up Postgres](#step-1-set-up-postgres)

Create a Postgres database for HappyView:

```
createdb happyview
```

If you are using Docker Compose, uncomment the `postgres` service and `pgdata` volume in your `docker-compose.yml`. See the [database setup guide](database-setup#docker-compose) for details.

### [Step 2: Back up your SQLite database](#step-2-back-up-your-sqlite-database)

Copy your SQLite database file before making any changes:

```
cp data/happyview.db data/happyview.db.backup
```

### [Step 3: Update environment variables](#step-3-update-environment-variables)

Change your `.env` to use Postgres:

```

## Before

DATABASE_URL=sqlite://data/happyview.db?mode=rwc

## After

DATABASE_URL=postgres://happyview:happyview@localhost/happyview
```

If you had `DATABASE_BACKEND` set, update it as well:

```
DATABASE_BACKEND=postgres
```

### [Step 4: Start HappyView](#step-4-start-happyview)

Start HappyView with the new `DATABASE_URL`. It will connect to Postgres and run migrations automatically, creating all necessary tables.

### [Step 5: Re-index your data](#step-5-re-index-your-data)

Since HappyView indexes records from the atproto network, the simplest way to populate your new Postgres database is to re-run the backfill:

1. Upload your lexicons via the dashboard or admin API (or they will already be there if you exported and re-imported them)
2. Run a backfill for each collection (dashboard or `POST /admin/backfill`)

Backfill fetches all records fresh from the network, so no data transfer between databases is needed.

### [Step 6: Re-create admin settings](#step-6-re-create-admin-settings)

Instance settings (app name, logo, TOS/privacy URIs), API keys, users, and labeler subscriptions are stored in the database and are not carried over automatically. Re-create these via the dashboard or admin API after switching.

### [Lua scripts](#lua-scripts)

No changes needed. Lua scripts use SQLite syntax by default, and HappyView translates to Postgres automatically at runtime. This includes:

* `?` placeholders (translated to `$1`, `$2`, etc.)
* `json_extract()` calls (translated to Postgres JSON operators)
* `datetime('now')` (translated to `NOW()`)
* Boolean literals `1`/`0` (work in both backends)

If you have scripts that already use Postgres-native syntax (e.g., from direct `db.raw()` calls), they will **not** work after switching — HappyView expects SQLite syntax. Use the [codemod tool](postgres-to-sqlite-migration#run-the-codemod-tool) to convert them.

### [Rollback](#rollback)

To switch back to SQLite, revert your `DATABASE_URL` to the SQLite connection string. Your SQLite database file remains unchanged — HappyView does not modify it during the migration to Postgres.

### [Next steps](#next-steps)

* [Postgres → SQLite migration](postgres-to-sqlite-migration) — migrate in the opposite direction
* [Database setup](database-setup) — choose between SQLite and Postgres for new instances
* [Backfill](../backfill) — re-index records from the network after switching backends
* [Lua scripting](../lua-scripting) — write SQL that works against either backend

[Postgres to SQLite Migration

Previous Page](/guides/database/postgres-to-sqlite-migration)[Overview

Next Page](/sdk/overview)

#### On this page

[Overview](#overview)[Step 1: Set up Postgres](#step-1-set-up-postgres)[Step 2: Back up your SQLite database](#step-2-back-up-your-sqlite-database)[Step 3: Update environment variables](#step-3-update-environment-variables)[Step 4: Start HappyView](#step-4-start-happyview)[Step 5: Re-index your data](#step-5-re-index-your-data)[Step 6: Re-create admin settings](#step-6-re-create-admin-settings)[Lua scripts](#lua-scripts)[Rollback](#rollback)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/reference/script-examples/meilisearch-sync
title: Meilisearch Sync | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Get a Record](/reference/script-examples/get-record)[Create Record](/reference/script-examples/create-record)[Upsert Record](/reference/script-examples/upsert-record)[Paginated List](/reference/script-examples/paginated-list)[List or Fetch](/reference/script-examples/list-or-fetch)[Expanded Query](/reference/script-examples/expanded-query)[Update or Delete](/reference/script-examples/update-or-delete)[Batch Save](/reference/script-examples/batch-save)[Sidecar Records](/reference/script-examples/sidecar-records)[Cascading Delete](/reference/script-examples/cascading-delete)[Complex Mutations](/reference/script-examples/complex-mutations)[Signed Record](/reference/script-examples/signed-record)[Verify Signed Record](/reference/script-examples/signed-record-verify)[Algolia Sync](/reference/script-examples/algolia-sync)[Meilisearch Sync](/reference/script-examples/meilisearch-sync)

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Meilisearch Sync

Script Examples

## Meilisearch Sync

Push records to a Meilisearch search index whenever they are created, updated, or deleted on the network.

**Script type:** record event (e.g. `record.index:<nsid>`)

```
function handle()
  local headers = {
    ["Authorization"] = "Bearer " .. env.MEILISEARCH_API_KEY,
    ["Content-Type"] = "application/json"
  }

  if action == "delete" then
    http.delete(env.MEILISEARCH_URL .. "/indexes/records/documents/" .. uri, {
      headers = headers
    })
  else
    http.post(env.MEILISEARCH_URL .. "/indexes/records/documents", {
      headers = headers,
      body = json.encode(toarray({
        {
          id = uri,
          collection = collection,
          did = did,
          record = record
        }
      }))
    })
  end

  return record
end
```

### [How it works](#how-it-works)

1. On **create** or **update**: sends a `POST` request to Meilisearch's document API with the record data wrapped in an array. Meilisearch upserts by `id` — if a document with the same AT URI already exists, it's replaced.
2. On **delete**: sends a `DELETE` request to remove the document from the index by its AT URI.

The `toarray()` function ensures the table is encoded as a JSON array (Meilisearch expects an array of documents). See [JSON API](../../api-reference/lua/json-api).

### [Configuration](#configuration)

This script uses [script variables](../../guides/lua-scripting) instead of hardcoded values. Set these via the [admin API](../../api-reference/admin/admin-api) or dashboard:

| Variable | Value |
| --- | --- |
| `MEILISEARCH_URL` | Your Meilisearch instance URL (e.g. `http://meilisearch.railway.internal:7700`) |
| `MEILISEARCH_API_KEY` | A Meilisearch API key with write permissions |

Script variables are stored in the `happyview_script_variables` table and accessible as `env.*` in Lua.

### [Use case](#use-case)

This hook keeps an external search index in sync with your indexed records in real time. Users searching through Meilisearch get results that reflect the latest state of the network without polling or scheduled jobs.

Meilisearch is a good fit for self-hosted deployments — colocate it alongside HappyView (e.g. on the same Railway project) for sub-millisecond network latency.

Combine this with a [query script](../../guides/lua-scripting) that searches Meilisearch instead of the local database for a full-text search experience that goes beyond what `db.search` offers.

[Algolia Sync

Previous Page](/reference/script-examples/algolia-sync)[Troubleshooting

Next Page](/reference/troubleshooting)

#### On this page

[How it works](#how-it-works)[Configuration](#configuration)[Use case](#use-case)

---
<!--
URL: https://happyview.dev/guides/database/postgres-to-sqlite-migration
title: Postgres to SQLite Migration | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

[Database Setup](/guides/database/database-setup)[Postgres to SQLite Migration](/guides/database/postgres-to-sqlite-migration)[SQLite to Postgres Migration](/guides/database/sqlite-to-postgres-migration)

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Postgres to SQLite Migration

Database

## Postgres to SQLite Migration

This guide covers migrating an existing HappyView deployment from Postgres to SQLite. If you are staying on Postgres, no action is required.

### [Overview](#overview)

HappyView now defaults to SQLite and writes all internal SQL in SQLite syntax. When running against Postgres, HappyView translates queries automatically. However, if you have **Lua scripts** that contain raw Postgres SQL, those scripts need to be updated to use SQLite syntax instead.

### [Step 1: Export your data](#step-1-export-your-data)

Back up your Postgres database before making any changes:

```
pg_dump -U happyview happyview > happyview_backup.sql
```

### [Step 2: Update environment variables](#step-2-update-environment-variables)

Change your `.env` to use SQLite:

```

## Before

DATABASE_URL=postgres://happyview:happyview@localhost/happyview

## After

DATABASE_URL=sqlite://data/happyview.db?mode=rwc
```

If you had `DATABASE_BACKEND` set, update it as well:

```
DATABASE_BACKEND=sqlite
```

### [Step 3: Migrate Lua scripts](#step-3-migrate-lua-scripts)

If you have Lua scripts with raw SQL queries, they need to be converted from Postgres syntax to SQLite syntax. A codemod tool is provided to automate this.

#### [Run the codemod tool](#run-the-codemod-tool)

```
cargo run --bin migrate-lua-sql -- /path/to/lua/scripts
```

The tool scans all `.lua` files in the given directory and rewrites Postgres SQL patterns to SQLite equivalents.

#### [What the codemod converts automatically](#what-the-codemod-converts-automatically)

* `$1`, `$2`, etc. parameter placeholders to `?`
* JSON operators (`->`, `->>`) and `::jsonb` casts to `json_extract()` calls
* `ILIKE` to `LIKE` (SQLite `LIKE` is case-insensitive for ASCII by default)
* `NOW()` to `datetime('now')`
* `NOW() + INTERVAL '...'` / `NOW() - INTERVAL '...'` to `datetime('now', '...')`
* `TRUE`/`FALSE` literals to `1`/`0`

#### [What it flags for manual review](#what-it-flags-for-manual-review)

The tool prints warnings for patterns it cannot convert automatically:

* JSONB `?` (contains-key) operator — consider using `json_each()` with an `EXISTS` subquery
* `make_interval()` — Postgres-specific, needs manual conversion
* `SIMILAR TO` — use `LIKE` or `GLOB` instead
* `ANY()` / `ALL()` array operators — no direct SQLite equivalent
* Type casts other than `::jsonb` (e.g., `::text`, `::integer`) — may need manual conversion to `CAST(... AS ...)`

Review the flagged lines and update them manually.

### [Step 4: Import data into SQLite](#step-4-import-data-into-sqlite)

Start HappyView with the new `DATABASE_URL`. It will create the SQLite database and run migrations automatically. If you need to import existing records, use the backfill feature to re-index from the network:

1. Start HappyView with the new SQLite `DATABASE_URL`
2. Upload your lexicons via the dashboard or admin API
3. Run a backfill for each collection (dashboard or `POST /admin/backfill`)

For small datasets, this is the simplest approach since backfill fetches all records fresh from the network.

### [Step 5: Update Docker Compose (if applicable)](#step-5-update-docker-compose-if-applicable)

If you were running Postgres via Docker Compose, you can now comment out the `postgres` service since it is no longer needed. See the [database setup guide](database-setup#docker-compose) for details.

### [Rollback](#rollback)

To switch back to Postgres, revert your `DATABASE_URL` to the Postgres connection string. Your Postgres database remains unchanged — HappyView does not modify it during the migration to SQLite.

### [Next steps](#next-steps)

* [SQLite → Postgres migration](sqlite-to-postgres-migration) — migrate in the opposite direction
* [Database setup](database-setup) — choose between SQLite and Postgres for new instances
* [Backfill](../backfill) — re-index records from the network after switching backends
* [Lua scripting](../lua-scripting) — write SQL that works against either backend

[Database Setup

Previous Page](/guides/database/database-setup)[SQLite to Postgres Migration

Next Page](/guides/database/sqlite-to-postgres-migration)

#### On this page

[Overview](#overview)[Step 1: Export your data](#step-1-export-your-data)[Step 2: Update environment variables](#step-2-update-environment-variables)[Step 3: Migrate Lua scripts](#step-3-migrate-lua-scripts)[Run the codemod tool](#run-the-codemod-tool)[What the codemod converts automatically](#what-the-codemod-converts-automatically)[What it flags for manual review](#what-it-flags-for-manual-review)[Step 4: Import data into SQLite](#step-4-import-data-into-sqlite)[Step 5: Update Docker Compose (if applicable)](#step-5-update-docker-compose-if-applicable)[Rollback](#rollback)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/api-reference/admin/permissions
title: Permissions | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Permissions

Admin API

## Permissions

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key
const headers = { Authorization: `Bearer ${TOKEN}` };
```

### [List permissions](#list-permissions)

```
GET /admin/permissions
```

Returns all available permission definitions and permission templates. When the Spaces feature flag is disabled, spaces-related permissions and template entries are excluded.

TypeScriptJavaScriptRustGocURL

```
interface PermissionDef {
  key: string;
  name: string;
  description: string;
  category: string;
}

interface PermissionTemplate {
  key: string;
  label: string;
  permissions: string[];
}

interface PermissionsResponse {
  permissions: PermissionDef[];
  templates: PermissionTemplate[];
}

const response = await fetch("http://127.0.0.1:3000/admin/permissions", {
  headers,
});
const data: PermissionsResponse = await response.json();
```

**Response**: `200 OK`

```
{
  "permissions": [
    {
      "key": "lexicons:create",
      "name": "Create Lexicons",
      "description": "Upload lexicon schemas",
      "category": "Lexicons"
    }
  ],
  "templates": [
    {
      "key": "viewer",
      "label": "Viewer",
      "permissions": ["lexicons:read", "records:read", "stats:read", "events:read"]
    }
  ]
}
```

Templates are predefined permission bundles used when creating or updating users. See the [Permissions guide](../../guides/permissions) for the full list.

[Feature Flags

Previous Page](/api-reference/admin/feature-flags)[Third-Party API Clients

Next Page](/api-reference/oauth/api-clients)

#### On this page

[List permissions](#list-permissions)

---
<!--
URL: https://happyview.dev/api-reference/admin/domains
title: Domains | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Domains

Admin API

## Domains

Manage the domains a HappyView instance serves. Each domain gets its own atproto OAuth client identity. The primary domain is set from `PUBLIC_URL` on first boot. All endpoints require the `settings:manage` permission.

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key
const headers = { Authorization: `Bearer ${TOKEN}` };
```

### [List domains](#list-domains)

```
GET /admin/domains
```

TypeScriptJavaScriptRustGocURL

```
interface Domain {
  id: string;
  url: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

const response = await fetch("http://127.0.0.1:3000/admin/domains", {
  headers,
});
const data: Domain[] = await response.json();
```

**Response**: `200 OK`

```
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "url": "https://gamesgamesgamesgames.games",
    "is_primary": true,
    "created_at": "2026-04-16T00:00:00Z",
    "updated_at": "2026-04-16T00:00:00Z"
  }
]
```

### [Add a domain](#add-a-domain)

```
POST /admin/domains
```

TypeScriptJavaScriptRustGocURL

```
interface Domain {
  id: string;
  url: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

const response = await fetch("http://127.0.0.1:3000/admin/domains", {
  method: "POST",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    url: "https://api.example.com",
  }),
});
const data: Domain = await response.json();
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | string | yes | Valid origin (scheme + host, no path or trailing slash). Must be `https` unless `PUBLIC_URL` is a loopback address. |

Returns `400 Bad Request` if the URL is invalid or already registered.

**Response**: `201 Created`

```
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "url": "https://api.example.com",
  "is_primary": false,
  "created_at": "2026-04-16T00:00:00Z",
  "updated_at": "2026-04-16T00:00:00Z"
}
```

Also builds an OAuth client for the domain and updates the in-memory cache.

### [Remove a domain](#remove-a-domain)

```
DELETE /admin/domains/{id}
```

TypeScriptJavaScriptRustGocURL

```
await fetch("http://127.0.0.1:3000/admin/domains/550e8400-e29b-41d4-a716-446655440001", {
  method: "DELETE",
  headers,
});
```

Returns `400 Bad Request` if the domain is primary — set a different domain as primary first. Returns `404 Not Found` if the domain doesn't exist.

**Response**: `204 No Content`

Also removes the domain's OAuth client and cache entry.

### [Set primary domain](#set-primary-domain)

```
POST /admin/domains/{id}/primary
```

TypeScriptJavaScriptRustGocURL

```
await fetch("http://127.0.0.1:3000/admin/domains/550e8400-e29b-41d4-a716-446655440001/primary", {
  method: "POST",
  headers,
});
```

Sets the target domain as the primary. Unsets the current primary in a single operation. Returns `404 Not Found` if the domain doesn't exist.

**Response**: `204 No Content`

Also updates the in-memory cache and primary client reference.

[XRPC Proxy

Previous Page](/api-reference/admin/xrpc-proxy)[Script Variables

Next Page](/api-reference/admin/script-variables)

#### On this page

[List domains](#list-domains)[Add a domain](#add-a-domain)[Remove a domain](#remove-a-domain)[Set primary domain](#set-primary-domain)

---
<!--
URL: https://happyview.dev/api-reference/admin/feature-flags
title: Feature Flags | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Feature Flags

Admin API

## Feature Flags

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key
const headers = { Authorization: `Bearer ${TOKEN}` };
```

### [List feature flags](#list-feature-flags)

```
GET /admin/feature-flags
```

Returns all feature flags and their current status. Flags are backed by the `happyview_instance_settings` table — a flag is enabled when its key is set to `"true"`.

TypeScriptJavaScriptRustGocURL

```
interface FeatureFlag {
  key: string;
  name: string;
  description: string;
  enabled: boolean;
}

const response = await fetch("http://127.0.0.1:3000/admin/feature-flags", {
  headers,
});
const data: FeatureFlag[] = await response.json();
```

**Response**: `200 OK`

```
[
  {
    "key": "feature.spaces_enabled",
    "name": "Permissioned Spaces",
    "description": "Collaborative data spaces with granular permissions, membership, and invites.",
    "enabled": false
  }
]
```

| Field | Type | Description |
| --- | --- | --- |
| `key` | string | Settings key for the flag |
| `name` | string | Human-readable name |
| `description` | string | What the flag controls |
| `enabled` | boolean | Whether the flag is currently enabled |

To toggle a flag, use `PUT /admin/settings/{key}` with the value `"true"` or `"false"`. See [Instance Settings](settings) for details.

[Verification Methods

Previous Page](/api-reference/admin/verification-methods)[Permissions

Next Page](/api-reference/admin/permissions)

#### On this page

[List feature flags](#list-feature-flags)

---
<!--
URL: https://happyview.dev/api-reference/admin/records
title: Records | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Records

Admin API

## Records

Browse and manage indexed records. All endpoints require the appropriate `records:*` permission.

cURL

```

## All examples assume $TOKEN is an API key (hv_...)

AUTH="Authorization: Bearer $TOKEN"
```

### [List records](#list-records)

```
GET /admin/records
```

Paginated list of records in a collection, ordered by `indexed_at` descending.

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| `collection` | string | yes | Collection NSID to list records from |
| `limit` | number | no | Max results per page (default 20, max 100) |
| `cursor` | string | no | Pagination cursor from a previous response |

cURL

```
curl "http://127.0.0.1:3000/admin/records?collection=xyz.statusphere.status&limit=10" -H "$AUTH"
```

**Response**: `200 OK`

```
{
  "records": [
    {
      "uri": "at://did:plc:abc/xyz.statusphere.status/3k...",
      "did": "did:plc:abc",
      "collection": "xyz.statusphere.status",
      "rkey": "3k...",
      "cid": "bafyrei...",
      "indexed_at": "2025-01-01T00:00:00Z",
      "record": { "...": "..." },
      "labels": []
    }
  ],
  "cursor": "20"
}
```

`cursor` is omitted when there are no more results.

### [List collections](#list-collections)

```
GET /admin/records/collections
```

Returns the list of collection NSIDs from registered record-type lexicons. This is a fast lookup (no record counting).

cURL

```
curl http://127.0.0.1:3000/admin/records/collections -H "$AUTH"
```

**Response**: `200 OK`

```
{
  "collections": [
    "xyz.statusphere.status",
    "app.bsky.feed.post"
  ]
}
```

### [Delete a record](#delete-a-record)

```
DELETE /admin/records
```

Delete a single record by AT URI.

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| `uri` | string | yes | AT URI of the record to delete |

cURL

```
curl -X DELETE "http://127.0.0.1:3000/admin/records?uri=at://did:plc:abc/xyz.statusphere.status/3k..." -H "$AUTH"
```

**Response**: `204 No Content`

Returns `404` if the record is not found.

### [Delete all records in a collection](#delete-all-records-in-a-collection)

```
DELETE /admin/records/collection
```

Delete all indexed records for a given collection. Requires both `records:delete` and `records:delete-collection` permissions.

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| `collection` | string | yes | Collection NSID to delete from |

cURL

```
curl -X DELETE "http://127.0.0.1:3000/admin/records/collection?collection=xyz.statusphere.status" -H "$AUTH"
```

**Response**: `200 OK`

```
{
  "deleted": 42
}
```

[Scripts

Previous Page](/api-reference/admin/scripts)[Stats

Next Page](/api-reference/admin/stats)

#### On this page

[List records](#list-records)[List collections](#list-collections)[Delete a record](#delete-a-record)[Delete all records in a collection](#delete-all-records-in-a-collection)

---
<!--
URL: https://happyview.dev/api-reference/admin/scripts
title: Scripts | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Scripts

Admin API

## Scripts

Manage trigger-keyed scripts. Scripts run automatically in response to events like record indexing, XRPC calls, or labeler actions. The trigger id (e.g. `record.index:xyz.statusphere.status`) determines when a script fires.

**Permissions:** `scripts:read` for GET endpoints, `scripts:manage` for mutating endpoints.

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key
const headers = { Authorization: `Bearer ${TOKEN}` };
```

### [List scripts](#list-scripts)

```
GET /admin/scripts
```

Optionally filter by NSID suffix with the `?suffix=` query parameter.

TypeScriptJavaScriptRustGocURL

```
interface Script {
  id: string;
  script_type: string;
  body: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

// List all scripts
const response = await fetch("http://127.0.0.1:3000/admin/scripts", {
  headers,
});
const data: Script[] = await response.json();

// Filter by NSID suffix
const filtered = await fetch(
  "http://127.0.0.1:3000/admin/scripts?suffix=xyz.statusphere.status",
  { headers },
);
const filteredData: Script[] = await filtered.json();
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `suffix` | string | no | Filter to scripts whose id ends with `:<suffix>` (query param) |

**Response**: `200 OK`

```
[
  {
    "id": "record.index:xyz.statusphere.status",
    "script_type": "lua",
    "body": "function handle()\n  return event\nend",
    "description": "Process indexed statuses",
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z"
  }
]
```

### [Get a script](#get-a-script)

```
GET /admin/scripts/{id}
```

The `{id}` path parameter is the trigger string, URL-encoded (e.g. `record.index%3Axyz.statusphere.status`).

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "http://127.0.0.1:3000/admin/scripts/record.index%3Axyz.statusphere.status",
  { headers },
);
const data: Script = await response.json();
```

**Response**: `200 OK`

```
{
  "id": "record.index:xyz.statusphere.status",
  "script_type": "lua",
  "body": "function handle()\n  return event\nend",
  "description": "Process indexed statuses",
  "created_at": "2026-01-01T00:00:00Z",
  "updated_at": "2026-01-01T00:00:00Z"
}
```

### [Create or replace a script](#create-or-replace-a-script)

```
POST /admin/scripts
```

Creates a new script or replaces an existing one by `id`. The trigger grammar and Lua body are validated at write-time.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/admin/scripts", {
  method: "POST",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id: "record.index:xyz.statusphere.status",
    script_type: "lua",
    body: "function handle()\n  return event\nend",
    description: "Process indexed statuses",
  }),
});
const data: Script = await response.json();
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | Trigger string (e.g. `record.index:xyz.statusphere.status`) |
| `script_type` | string | no | Script language; defaults to `"lua"` |
| `body` | string | yes | The script source code |
| `description` | string | no | Human-readable description (max 300 characters) |

**Response**: `201 Created` (new) or `200 OK` (update)

```
{
  "id": "record.index:xyz.statusphere.status",
  "script_type": "lua",
  "body": "function handle()\n  return event\nend",
  "description": "Process indexed statuses",
  "created_at": "2026-01-01T00:00:00Z",
  "updated_at": "2026-01-01T00:00:00Z"
}
```

### [Partial update a script](#partial-update-a-script)

```
PATCH /admin/scripts/{id}
```

Updates individual fields of an existing script. At least one field must be provided. Setting `description` to `null` in JSON clears it. If `script_type` is changed, `body` must also be provided so validation can run against the new type.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "http://127.0.0.1:3000/admin/scripts/record.index%3Axyz.statusphere.status",
  {
    method: "PATCH",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description: "Updated description for status processing",
    }),
  },
);
const data: Script = await response.json();
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `script_type` | string | no | Script language; requires `body` alongside |
| `body` | string | no | New script source; re-validated against `script_type` |
| `description` | string|null | no | New description, or `null` to clear |

**Response**: `200 OK`

```
{
  "id": "record.index:xyz.statusphere.status",
  "script_type": "lua",
  "body": "function handle()\n  return event\nend",
  "description": "Updated description for status processing",
  "created_at": "2026-01-01T00:00:00Z",
  "updated_at": "2026-01-01T00:00:00Z"
}
```

### [Delete a script](#delete-a-script)

```
DELETE /admin/scripts/{id}
```

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "http://127.0.0.1:3000/admin/scripts/record.index%3Axyz.statusphere.status",
  {
    method: "DELETE",
    headers,
  },
);
```

**Response**: `204 No Content`

[Lexicons

Previous Page](/api-reference/admin/lexicons)[Records

Next Page](/api-reference/admin/records)

#### On this page

[List scripts](#list-scripts)[Get a script](#get-a-script)[Create or replace a script](#create-or-replace-a-script)[Partial update a script](#partial-update-a-script)[Delete a script](#delete-a-script)

---
<!--
URL: https://happyview.dev/api-reference/admin/plugins
title: Plugins | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Plugins

Admin API

## Plugins

Plugins extend HappyView with WebAssembly modules sourced from the [official plugin registry](../../guides/plugins) or any URL serving a `manifest.json`. Most endpoints take a plugin manifest URL and load (or reload) the plugin in place — no restart needed. Encrypted plugin secrets require `TOKEN_ENCRYPTION_KEY` to be configured.

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key
const headers = { Authorization: `Bearer ${TOKEN}` };
```

### [List installed plugins](#list-installed-plugins)

```
GET /admin/plugins
```

Requires `plugins:read`. Returns every loaded plugin with its source, required secrets, configuration status, and any pending updates from the official registry cache.

TypeScriptJavaScriptRustGocURL

```
interface RequiredSecret {
  key: string;
  name: string;
  description: string;
}

interface PluginSummary {
  id: string;
  name: string;
  version: string;
  source: string;
  url: string;
  sha256: string | null;
  enabled: boolean;
  auth_type: string;
  required_secrets: RequiredSecret[];
  secrets_configured: boolean;
  loaded_at: string | null;
  update_available: boolean;
  latest_version: string;
  pending_releases: string[];
}

interface PluginsResponse {
  encryption_configured: boolean;
  plugins: PluginSummary[];
}

const response = await fetch("http://127.0.0.1:3000/admin/plugins", {
  headers,
});
const data: PluginsResponse = await response.json();
```

**Response**: `200 OK`

```
{
  "encryption_configured": true,
  "plugins": [
    {
      "id": "steam",
      "name": "Steam",
      "version": "1.2.0",
      "source": "url",
      "url": "https://example.com/plugins/steam/manifest.json",
      "sha256": null,
      "enabled": true,
      "auth_type": "openid",
      "required_secrets": [
        {
          "key": "PLUGIN_STEAM_API_KEY",
          "name": "Steam Web API Key",
          "description": "Get your API key at steamcommunity.com/dev/apikey"
        }
      ],
      "secrets_configured": true,
      "loaded_at": null,
      "update_available": false,
      "latest_version": "1.2.0",
      "pending_releases": []
    }
  ]
}
```

`secrets_configured` is `true` if the plugin has no required secrets, or if a row exists for it in `happyview_plugin_configs`. `update_available` and `pending_releases` are populated from the cached official registry — call `POST /admin/plugins/{id}/check-update` to refresh them.

### [Preview a plugin before installing](#preview-a-plugin-before-installing)

```
POST /admin/plugins/preview
```

Requires `plugins:create`. Fetches and parses a manifest without installing the plugin, so the dashboard can show what it would register.

TypeScriptJavaScriptRustGocURL

```
interface PluginPreview {
  id: string;
  name: string;
  version: string;
  description: string;
  icon_url: string;
  auth_type: string;
  required_secrets: RequiredSecret[];
  manifest_url: string;
  wasm_url: string;
}

const response = await fetch("http://127.0.0.1:3000/admin/plugins/preview", {
  method: "POST",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    url: "https://example.com/plugins/steam/manifest.json",
  }),
});
const data: PluginPreview = await response.json();
```

**Response**: `200 OK`

```
{
  "id": "steam",
  "name": "Steam",
  "version": "1.2.0",
  "description": "Import your Steam game library and playtime data.",
  "icon_url": "https://example.com/steam-icon.png",
  "auth_type": "openid",
  "required_secrets": [
    { "key": "PLUGIN_STEAM_API_KEY", "name": "Steam Web API Key", "description": "..." }
  ],
  "manifest_url": "https://example.com/plugins/steam/manifest.json",
  "wasm_url": "https://example.com/plugins/steam/steam.wasm"
}
```

Returns `400 Bad Request` if the manifest can't be fetched or parsed.

### [Install a plugin](#install-a-plugin)

```
POST /admin/plugins
```

Requires `plugins:create`. Fetches the manifest, downloads the WASM, registers the plugin, and persists it.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/admin/plugins", {
  method: "POST",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    url: "https://example.com/plugins/steam/manifest.json",
    sha256: "abc123...",
  }),
});
const data: PluginSummary = await response.json();
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | string | yes | URL to the plugin's `manifest.json` |
| `sha256` | string | no | Optional sha256 of the WASM binary. If provided, install fails when the downloaded hash mismatches |

**Response**: `200 OK` returning the same `PluginSummary` shape as the list endpoint. `secrets_configured` will be `false` if the plugin requires any secrets — call `PUT /admin/plugins/{id}/secrets` to configure them before the plugin can run.

### [List official plugins](#list-official-plugins)

```
GET /admin/plugins/official
```

Requires `plugins:read`. Returns the cached catalog of plugins from the official registry. The cache is refreshed periodically by the server; use `POST /admin/plugins/{id}/check-update` to force-refresh a single entry.

**Response**: `200 OK`

```
{
  "last_refreshed_at": "2026-04-13T11:00:00Z",
  "plugins": [
    {
      "id": "steam",
      "name": "Steam",
      "description": "Import your Steam game library and playtime data.",
      "icon_url": "https://example.com/steam-icon.png",
      "latest_version": "1.2.0",
      "manifest_url": "https://example.com/plugins/steam/manifest.json"
    }
  ]
}
```

### [Remove a plugin](#remove-a-plugin)

```
DELETE /admin/plugins/{id}
```

Requires `plugins:delete`. Unregisters the plugin from the runtime and deletes its row from the `happyview_plugins` table. Secrets stay in `happyview_plugin_configs`, so they're reused if you reinstall.

**Response**: `204 No Content`. Returns `404 Not Found` if no plugin with that id is loaded.

### [Reload a plugin](#reload-a-plugin)

```
POST /admin/plugins/{id}/reload
```

Requires `plugins:create`. Re-fetches the plugin from its current source URL and re-registers it. Useful after publishing a new version of a plugin you host yourself.

The body is optional. To point the plugin at a new URL, pass:

```
{ "url": "https://example.com/plugins/steam/manifest.json" }
```

When a new URL is provided, the stored `sha256` is cleared (the new version has its own hash). File-based plugins cannot be reloaded via this endpoint and return `400 Bad Request`.

**Response**: `200 OK` with the refreshed `PluginSummary`.

### [Check for plugin updates](#check-for-plugin-updates)

```
POST /admin/plugins/{id}/check-update
```

Requires `plugins:create`. Forces a cache refresh for one plugin from the official registry, then returns the updated `PluginSummary` with `update_available`, `latest_version`, and `pending_releases` reflecting the latest catalog state.

**Response**: `200 OK` with a `PluginSummary`.

### [Get plugin secrets](#get-plugin-secrets)

```
GET /admin/plugins/{id}/secrets
```

Requires `plugins:read`. Returns the plugin's configured secrets with values masked (last 4 characters shown for values longer than 8 characters, otherwise fully masked). Requires `TOKEN_ENCRYPTION_KEY` to be configured.

**Response**: `200 OK`

```
{
  "plugin_id": "steam",
  "secrets": {
    "PLUGIN_STEAM_API_KEY": "********ABCD"
  }
}
```

### [Update plugin secrets](#update-plugin-secrets)

```
PUT /admin/plugins/{id}/secrets
```

Requires `plugins:create`. Encrypts the provided secret values with `TOKEN_ENCRYPTION_KEY` (AES-256-GCM) and upserts them into `happyview_plugin_configs`.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/admin/plugins/steam/secrets", {
  method: "PUT",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    secrets: {
      PLUGIN_STEAM_API_KEY: "your-new-api-key",
    },
  }),
});
```

Special handling:

* Values starting with `********` are treated as masked placeholders and the existing encrypted value is preserved (so you can `GET` then `PUT` without re-typing every secret).
* Empty string values are not stored — use them to clear a secret.

**Response**: `204 No Content`

[API Clients

Previous Page](/api-reference/admin/api-clients)[Dead Letters

Next Page](/api-reference/admin/dead-letters)

#### On this page

[List installed plugins](#list-installed-plugins)[Preview a plugin before installing](#preview-a-plugin-before-installing)[Install a plugin](#install-a-plugin)[List official plugins](#list-official-plugins)[Remove a plugin](#remove-a-plugin)[Reload a plugin](#reload-a-plugin)[Check for plugin updates](#check-for-plugin-updates)[Get plugin secrets](#get-plugin-secrets)[Update plugin secrets](#update-plugin-secrets)

---
<!--
URL: https://happyview.dev/api-reference/admin/xrpc-proxy
title: XRPC Proxy | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

XRPC Proxy

Admin API

## XRPC Proxy

Control which unrecognized XRPC methods HappyView forwards to their resolved authority. Locally registered lexicons are always served regardless of this setting.

All endpoints require the `settings:manage` permission.

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key
const headers = { Authorization: `Bearer ${TOKEN}` };
```

### [Get proxy config](#get-proxy-config)

```
GET /admin/settings/xrpc-proxy
```

TypeScriptJavaScriptRustGocURL

```
interface XrpcProxyConfig {
  mode: string;
  nsids: string[];
}

const response = await fetch("http://127.0.0.1:3000/admin/settings/xrpc-proxy", {
  headers,
});
const data: XrpcProxyConfig = await response.json();
```

**Response**: `200 OK`

```
{
  "mode": "allowlist",
  "nsids": ["com.example.feed.*", "games.gamesgamesgamesgames.*"]
}
```

Returns `{"mode": "open", "nsids": []}` when no config has been saved.

### [Update proxy config](#update-proxy-config)

```
PUT /admin/settings/xrpc-proxy
```

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/admin/settings/xrpc-proxy", {
  method: "PUT",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    mode: "allowlist",
    nsids: ["com.example.feed.*"],
  }),
});
```

**Response**: `204 No Content`

Changes take effect immediately — no restart needed.

#### [Modes](#modes)

| Mode | Behavior |
| --- | --- |
| `disabled` | Block all proxy requests. Return `403` for every unrecognized NSID. |
| `open` | Proxy everything (default). Current behavior on a fresh install. |
| `allowlist` | Proxy only NSIDs matching a pattern in `nsids`. Return `403` for the rest. |
| `blocklist` | Proxy everything except NSIDs matching a pattern in `nsids`. |

When mode is `disabled` or `open`, any `nsids` in the request body are ignored and stored as `[]`.

#### [NSID patterns](#nsid-patterns)

Patterns are dotted NSID identifiers. Trailing wildcards are supported:

* `com.example.feed.getHot` — exact match
* `com.example.feed.*` — matches any NSID starting with `com.example.feed.`
* `games.gamesgamesgamesgames.*` — matches the entire namespace

Mid-segment wildcards (e.g., `com.*.feed`) are not supported.

#### [Validation errors](#validation-errors)

| Status | Cause |
| --- | --- |
| `400` | An NSID pattern is empty, has fewer than two segments, contains invalid characters, or uses an unsupported wildcard |
| `422` | `mode` is not one of `disabled`, `open`, `allowlist`, `blocklist` |

### [Blocked request response](#blocked-request-response)

When the proxy denies a request, the client receives:

```
403 Forbidden
```

```
{
  "error": "NSID not allowed by proxy policy"
}
```

[Instance Settings

Previous Page](/api-reference/admin/settings)[Domains

Next Page](/api-reference/admin/domains)

#### On this page

[Get proxy config](#get-proxy-config)[Update proxy config](#update-proxy-config)[Modes](#modes)[NSID patterns](#nsid-patterns)[Validation errors](#validation-errors)[Blocked request response](#blocked-request-response)

---
<!--
URL: https://happyview.dev/api-reference/admin/dead-letters
title: Dead Letters | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Dead Letters

Admin API

## Dead Letters

Events that failed all retry attempts are stored as dead letters for inspection and manual resolution. Dead letters come from two sources: legacy index hooks (`happyview_dead_letter_hooks`) and trigger-keyed scripts (`happyview_dead_letter_scripts`). Both tables are surfaced through a single unified API.

Read endpoints require `dead-letters:read`. Action endpoints (dismiss, retry, reindex) require `dead-letters:manage`.

cURL

```

## All examples assume $TOKEN is an API key (hv_...)

AUTH="Authorization: Bearer $TOKEN"
```

### [List dead letters](#list-dead-letters)

```
GET /admin/dead-letters
```

Paginated list of dead letters from both tables, merged and sorted by `created_at` descending.

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| `collection` | string | no | Filter by collection NSID |
| `resolved` | string | no | `"true"`, `"false"` (default), or omit for all |
| `cursor` | string | no | Pagination cursor from a previous response |
| `limit` | number | no | Max results per page (default 50, max 100) |

cURL

```
curl "http://127.0.0.1:3000/admin/dead-letters?limit=10" -H "$AUTH"
```

**Response**: `200 OK`

```
{
  "dead_letters": [
    {
      "id": "42",
      "lexicon_id": "xyz.statusphere.status",
      "uri": "at://did:plc:abc/xyz.statusphere.status/3k...",
      "did": "did:plc:abc",
      "collection": "xyz.statusphere.status",
      "rkey": "3k...",
      "action": "create",
      "error": "script error: attempt to index nil value",
      "attempts": 4,
      "created_at": "2026-06-01T12:00:00Z"
    }
  ],
  "cursor": "2026-06-01T11:00:00Z"
}
```

Resolved dead letters include a `resolved_at` timestamp. `cursor` is omitted when there are no more results.

### [Count dead letters](#count-dead-letters)

```
GET /admin/dead-letters/count
```

Returns the total count of dead letters across both tables.

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| `collection` | string | no | Filter by collection NSID |
| `resolved` | string | no | `"true"`, `"false"` (default), or omit for all |

cURL

```
curl "http://127.0.0.1:3000/admin/dead-letters/count" -H "$AUTH"
```

**Response**: `200 OK`

```
{
  "count": 7
}
```

### [Get dead letter detail](#get-dead-letter-detail)

```
GET /admin/dead-letters/{id}
```

Returns the full dead letter including the record body.

cURL

```
curl "http://127.0.0.1:3000/admin/dead-letters/42" -H "$AUTH"
```

**Response**: `200 OK`

The response includes all fields from the list view plus a `record` field containing the original record data (if available). Returns `404` if the dead letter is not found.

### [Dismiss a dead letter](#dismiss-a-dead-letter)

```
POST /admin/dead-letters/{id}/dismiss
```

Marks a dead letter as resolved without retrying it.

cURL

```
curl -X POST "http://127.0.0.1:3000/admin/dead-letters/42/dismiss" -H "$AUTH"
```

**Response**: `200 OK` — `{"ok": true}`

Returns `404` if the dead letter is not found.

### [Retry a dead letter](#retry-a-dead-letter)

```
POST /admin/dead-letters/{id}/retry
```

Re-runs the dead letter's script with the original event payload. On success the dead letter is marked resolved. On failure the error and attempt count are updated.

Label-arrival dead letters cannot be retried — the upstream label event is gone. These return `400 Bad Request`.

cURL

```
curl -X POST "http://127.0.0.1:3000/admin/dead-letters/42/retry" -H "$AUTH"
```

**Response**: `200 OK` — `{"ok": true}`

Returns `404` if no matching script binding is found, or if the dead letter is not found or already resolved.

### [Reindex a dead letter](#reindex-a-dead-letter)

```
POST /admin/dead-letters/{id}/reindex
```

Fetches the record fresh from the author's PDS and re-runs the full record indexing pipeline. On success the dead letter is marked resolved. Label-arrival dead letters cannot be reindexed and return `400 Bad Request`.

cURL

```
curl -X POST "http://127.0.0.1:3000/admin/dead-letters/42/reindex" -H "$AUTH"
```

**Response**: `200 OK` — `{"ok": true}`

### [Bulk dismiss](#bulk-dismiss)

```
POST /admin/dead-letters/bulk/dismiss
```

Dismiss multiple dead letters at once.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ids` | string[] | no | List of dead letter IDs to dismiss |
| `all` | boolean | no | Set to `true` to dismiss all unresolved dead letters |
| `collection` | string | no | When `all` is true, limit to this collection |

One of `ids` or `all: true` is required.

cURL

```
curl -X POST "http://127.0.0.1:3000/admin/dead-letters/bulk/dismiss" \
  -H "$AUTH" \
  -H "Content-Type: application/json" \
  -d '{"ids": ["42", "43", "44"]}'
```

**Response**: `200 OK` — `{"ok": true}`

### [Bulk retry](#bulk-retry)

```
POST /admin/dead-letters/bulk/retry
```

Retry multiple dead letters. Accepts the same input as [bulk dismiss](#bulk-dismiss).

cURL

```
curl -X POST "http://127.0.0.1:3000/admin/dead-letters/bulk/retry" \
  -H "$AUTH" \
  -H "Content-Type: application/json" \
  -d '{"all": true, "collection": "xyz.statusphere.status"}'
```

**Response**: `200 OK` — `{"ok": true}`

### [Bulk reindex](#bulk-reindex)

```
POST /admin/dead-letters/bulk/reindex
```

Reindex multiple dead letters. Accepts the same input as [bulk dismiss](#bulk-dismiss).

cURL

```
curl -X POST "http://127.0.0.1:3000/admin/dead-letters/bulk/reindex" \
  -H "$AUTH" \
  -H "Content-Type: application/json" \
  -d '{"all": true}'
```

**Response**: `200 OK` — `{"ok": true}`

[Plugins

Previous Page](/api-reference/admin/plugins)[Service Identity

Next Page](/api-reference/admin/service-identity)

#### On this page

[List dead letters](#list-dead-letters)[Count dead letters](#count-dead-letters)[Get dead letter detail](#get-dead-letter-detail)[Dismiss a dead letter](#dismiss-a-dead-letter)[Retry a dead letter](#retry-a-dead-letter)[Reindex a dead letter](#reindex-a-dead-letter)[Bulk dismiss](#bulk-dismiss)[Bulk retry](#bulk-retry)[Bulk reindex](#bulk-reindex)

---
<!--
URL: https://happyview.dev/api-reference/admin/api-clients
title: API Clients | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

API Clients

Admin API

## API Clients

API clients identify third-party applications that call HappyView's XRPC endpoints. Every request — authenticated or not — needs an `X-Client-Key` header (or `client_key` query param). Requests without one get `401 Unauthorized`. The client key is HappyView's rate-limit bucket.

A single API client represents your application, not individual users. Create one client for your app and use the same client key across all instances. Users authenticate separately via OAuth — the client key identifies *your app*, not *who is using it*.

Each client has an `hvc_`-prefixed client key and an `hvs_`-prefixed client secret. The secret is only returned at creation and is sha256-hashed in the database. Server-to-server callers pass the secret as `X-Client-Secret`. Browser callers use the `Origin` header, which is matched against the client's `client_uri`. Mismatches currently log warnings rather than rejecting the request, but rate limiting applies either way. See [Authentication — XRPC](../../getting-started/authentication#xrpc-api-client-identification) for the client-side view, and the [API Keys guide](../../guides/api-keys) for how admin API keys differ from API clients.

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key
const headers = { Authorization: `Bearer ${TOKEN}` };
```

### [List API clients](#list-api-clients)

```
GET /admin/api-clients
```

Requires `api-clients:view`. Returns clients ordered by `created_at` descending. Secrets are never returned.

TypeScriptJavaScriptRustGocURL

```
interface ApiClient {
  id: string;
  client_key: string;
  name: string;
  client_id_url: string;
  client_uri: string;
  redirect_uris: string[];
  scopes: string;
  rate_limit_capacity: number;
  rate_limit_refill_rate: number;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

const response = await fetch("http://127.0.0.1:3000/admin/api-clients", {
  headers,
});
const data: ApiClient[] = await response.json();
```

**Response**: `200 OK`

```
[
  {
    "id": "01J9...",
    "client_key": "hvc_a1b2c3...",
    "name": "My Game Client",
    "client_id_url": "https://example.com/client-metadata.json",
    "client_uri": "https://example.com",
    "redirect_uris": ["https://example.com/callback"],
    "scopes": "atproto",
    "rate_limit_capacity": 200,
    "rate_limit_refill_rate": 5.0,
    "is_active": true,
    "created_by": "did:plc:...",
    "created_at": "2026-04-13T12:00:00Z",
    "updated_at": "2026-04-13T12:00:00Z",
    "parent_client_id": null,
    "owner_did": null
  }
]
```

### [Create an API client](#create-an-api-client)

```
POST /admin/api-clients
```

Requires `api-clients:create`. Generates a `client_key` and `client_secret`. Store the secret — it won't be shown again.

TypeScriptJavaScriptRustGocURL

```
interface ApiClient {
  id: string;
  client_key: string;
  client_secret: string;
  name: string;
  client_id_url: string;
}

const response = await fetch("http://127.0.0.1:3000/admin/api-clients", {
  method: "POST",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "My Game Client",
    client_id_url: "https://example.com/client-metadata.json",
    client_uri: "https://example.com",
    redirect_uris: ["https://example.com/callback"],
    scopes: "atproto",
    rate_limit_capacity: 200,
    rate_limit_refill_rate: 5.0,
  }),
});
const data: ApiClient = await response.json();
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes | Human-readable display name |
| `client_id_url` | string | yes | URL to the client's published OAuth client metadata document |
| `client_uri` | string | yes | The client's home/landing URL |
| `redirect_uris` | string[] | yes | Allowed OAuth redirect URIs |
| `scopes` | string | no | Space-separated OAuth scopes (default `"atproto"`) |
| `rate_limit_capacity` | integer | no | Per-client token bucket capacity. Falls back to `DEFAULT_RATE_LIMIT_CAPACITY` if unset |
| `rate_limit_refill_rate` | number | no | Tokens added per second. Falls back to `DEFAULT_RATE_LIMIT_REFILL_RATE` if unset |

**Response**: `201 Created`

```
{
  "id": "01J9...",
  "client_key": "hvc_a1b2c3...",
  "client_secret": "hvs_d4e5f6...",
  "name": "My Game Client",
  "client_id_url": "https://example.com/client-metadata.json"
}
```

The new client is immediately registered with the OAuth registry and rate limiter, so it can authenticate without restarting HappyView.

### [Get an API client](#get-an-api-client)

```
GET /admin/api-clients/{id}
```

Requires `api-clients:view`. Returns the same shape as the list endpoint, or `404 Not Found`.

### [Update an API client](#update-an-api-client)

```
PUT /admin/api-clients/{id}
```

Requires `api-clients:edit`. All fields are optional — only provided fields are changed. Updating either rate-limit field re-registers the client with the rate limiter using the new values.

TypeScriptJavaScriptRustGocURL

```
await fetch("http://127.0.0.1:3000/admin/api-clients/01J9...", {
  method: "PUT",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Renamed Client",
    rate_limit_capacity: 500,
  }),
});
```

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | New display name |
| `client_uri` | string | New home URL |
| `redirect_uris` | string[] | Replace the allowed redirect URIs |
| `scopes` | string | Replace the OAuth scopes |
| `rate_limit_capacity` | integer | New bucket capacity. Pass `null` to clear the override |
| `rate_limit_refill_rate` | number | New refill rate. Pass `null` to clear the override |
| `is_active` | boolean | Disable (`false`) or re-enable (`true`) the client without deleting it |

**Response**: `204 No Content`

The OAuth registry is updated in place. The `client_id_url` is immutable — to change it, delete and recreate the client.

### [Delete an API client](#delete-an-api-client)

```
DELETE /admin/api-clients/{id}
```

Requires `api-clients:delete`. Removes the client from the OAuth registry, the rate limiter, and the client identity store.

TypeScriptJavaScriptRustGocURL

```
await fetch("http://127.0.0.1:3000/admin/api-clients/01J9...", {
  method: "DELETE",
  headers,
});
```

**Response**: `204 No Content`

[Script Variables

Previous Page](/api-reference/admin/script-variables)[Plugins

Next Page](/api-reference/admin/plugins)

#### On this page

[List API clients](#list-api-clients)[Create an API client](#create-an-api-client)[Get an API client](#get-an-api-client)[Update an API client](#update-an-api-client)[Delete an API client](#delete-an-api-client)

---
<!--
URL: https://happyview.dev/api-reference/admin/verification-methods
title: Verification Methods | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Verification Methods

Admin API

## Verification Methods

Manage DID verification methods (P-256 keypairs) used for attestation signing and PLC operations.

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key
const headers = { Authorization: `Bearer ${TOKEN}` };
```

### [List verification methods](#list-verification-methods)

```
GET /admin/verification-methods
```

Requires `settings:manage` permission.

TypeScriptJavaScriptRustGocURL

```
interface VerificationMethod {
  id: string;
  fragment_id: string;
  key_type: string;
  public_key_multibase: string;
  created_at: string;
}

const response = await fetch("http://127.0.0.1:3000/admin/verification-methods", {
  headers,
});
const data: VerificationMethod[] = await response.json();
```

**Response**: `200 OK`

```
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "fragment_id": "#attestation",
    "key_type": "Multikey",
    "public_key_multibase": "zDnae...",
    "created_at": "2026-06-27T00:00:00Z"
  }
]
```

### [Create a verification method](#create-a-verification-method)

```
POST /admin/verification-methods
```

Requires `settings:manage` permission. Generates a new P-256 keypair. The private key is encrypted at rest with AES-256-GCM using `TOKEN_ENCRYPTION_KEY`.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/admin/verification-methods", {
  method: "POST",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    fragment_id: "#attestation",
  }),
});
const data: VerificationMethod = await response.json();
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `fragment_id` | string | yes | DID document fragment identifier, must start with `#` followed by alphanumerics or underscores |

**Response**: `201 Created`

```
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "fragment_id": "#attestation",
  "key_type": "Multikey",
  "public_key_multibase": "zDnae...",
  "created_at": "2026-06-27T00:00:00Z"
}
```

### [Delete a verification method](#delete-a-verification-method)

```
DELETE /admin/verification-methods/{fragment_id}
```

Requires `settings:manage` permission.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "http://127.0.0.1:3000/admin/verification-methods/attestation",
  { method: "DELETE", headers },
);
```

The `fragment_id` path parameter is the identifier without the leading `#` (e.g. `attestation` for `#attestation`).

**Response**: `204 No Content`. Returns `404 Not Found` if no method with that fragment ID exists.

[Service Entries

Previous Page](/api-reference/admin/service-entries)[Feature Flags

Next Page](/api-reference/admin/feature-flags)

#### On this page

[List verification methods](#list-verification-methods)[Create a verification method](#create-a-verification-method)[Delete a verification method](#delete-a-verification-method)

---
<!--
URL: https://happyview.dev/api-reference/admin/service-entries
title: Service Entries | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Service Entries

Admin API

## Service Entries

Manage the service entries published in the instance's DID document. Each entry declares an XRPC service type (e.g. `AtprotoLabeler`, `BskyFeedGenerator`) and controls which lexicons route to HappyView's endpoint. All endpoints require the `settings:manage` permission.

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key
const headers = { Authorization: `Bearer ${TOKEN}` };
```

### [List service entries](#list-service-entries)

```
GET /admin/service-entries
```

TypeScriptJavaScriptRustGocURL

```
interface ServiceEntry {
  id: number;
  fragment_id: string;
  service_type: string;
  access_mode: string;
  created_at: string;
  updated_at: string;
}

const response = await fetch("http://127.0.0.1:3000/admin/service-entries", {
  headers,
});
const data: ServiceEntry[] = await response.json();
```

**Response**: `200 OK`

```
[
  {
    "id": 1,
    "fragment_id": "#happyview",
    "service_type": "AtprotoLabeler",
    "access_mode": "all",
    "created_at": "2026-05-09T12:00:00Z",
    "updated_at": "2026-05-09T12:00:00Z"
  }
]
```

### [Create a service entry](#create-a-service-entry)

```
POST /admin/service-entries
```

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/admin/service-entries", {
  method: "POST",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    fragment_id: "#feed",
    service_type: "BskyFeedGenerator",
  }),
});
const data: ServiceEntry = await response.json();
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `fragment_id` | string | yes | DID document fragment (e.g. `#feed`, `#happyview`) |
| `service_type` | string | yes | AT Protocol service type (e.g. `BskyFeedGenerator`) |

The entry is created with `access_mode` set to `all`. The endpoint URL is derived from `PUBLIC_URL`.

**Response**: `201 Created`

### [Update a service entry](#update-a-service-entry)

```
PUT /admin/service-entries/{id}
```

TypeScriptJavaScriptRustGocURL

```
await fetch("http://127.0.0.1:3000/admin/service-entries/1", {
  method: "PUT",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    service_type: "AtprotoLabeler",
    access_mode: "allowlist",
  }),
});
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `fragment_id` | string | no | Updated DID document fragment |
| `service_type` | string | no | Updated service type |
| `access_mode` | string | no | `all`, `allowlist`, or `disabled` |

All fields are optional. Only provided fields are updated.

**Response**: `204 No Content`

### [Delete a service entry](#delete-a-service-entry)

```
DELETE /admin/service-entries/{id}
```

TypeScriptJavaScriptRustGocURL

```
await fetch("http://127.0.0.1:3000/admin/service-entries/1", {
  method: "DELETE",
  headers,
});
```

Returns `404 Not Found` if the entry doesn't exist.

**Response**: `204 No Content`

### [List XRPCs for a service entry](#list-xrpcs-for-a-service-entry)

```
GET /admin/service-entries/{id}/xrpcs
```

Returns the lexicon IDs (NSIDs) bound to this service entry.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/admin/service-entries/1/xrpcs", {
  headers,
});
const data: string[] = await response.json();
```

**Response**: `200 OK`

```
["app.bsky.feed.getFeedSkeleton", "app.bsky.feed.describeFeedGenerator"]
```

### [Add XRPCs to a service entry](#add-xrpcs-to-a-service-entry)

```
POST /admin/service-entries/{id}/xrpcs
```

TypeScriptJavaScriptRustGocURL

```
await fetch("http://127.0.0.1:3000/admin/service-entries/1/xrpcs", {
  method: "POST",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    lexicon_ids: ["app.bsky.feed.getFeedSkeleton"],
  }),
});
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lexicon_ids` | string[] | yes | Lexicon NSIDs to bind to this entry |

**Response**: `204 No Content`

### [Remove XRPCs from a service entry](#remove-xrpcs-from-a-service-entry)

```
DELETE /admin/service-entries/{id}/xrpcs
```

TypeScriptJavaScriptRustGocURL

```
await fetch("http://127.0.0.1:3000/admin/service-entries/1/xrpcs", {
  method: "DELETE",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    lexicon_ids: ["app.bsky.feed.getFeedSkeleton"],
  }),
});
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lexicon_ids` | string[] | yes | Lexicon NSIDs to unbind from this entry |

**Response**: `204 No Content`

### [List services for a lexicon](#list-services-for-a-lexicon)

```
GET /admin/lexicons/{id}/services
```

Returns service entries that grant access to the specified lexicon.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/admin/lexicons/app.bsky.feed.getFeedSkeleton/services", {
  headers,
});
const data: ServiceEntry[] = await response.json();
```

**Response**: `200 OK` — returns an array of `ServiceEntry` objects.

### [Sync to PLC directory](#sync-to-plc-directory)

These endpoints publish your service entries to the PLC directory so they appear in the DID document. The sync method depends on the [service identity mode](../../getting-started/service-identity).

#### [Direct sync (did:plc mode)](#direct-sync-didplc-mode)

```
POST /admin/service-entries/sync-plc
```

Signs and submits a PLC update operation using the stored rotation key. Only available when the identity mode is `did_plc`.

cURL

```
curl -X POST http://127.0.0.1:3000/admin/service-entries/sync-plc -H "$AUTH"
```

Returns `400 Bad Request` if the identity mode is not `did_plc` or no DID is configured.

**Response**: `204 No Content`

#### [Request PLC token (attach\_account mode)](#request-plc-token-attach_account-mode)

```
POST /admin/service-entries/sync-plc/request
```

Requests a PLC operation signature token via the attached account's PDS. This sends an email confirmation code to the account holder. Only available when the identity mode is `attach_account`.

cURL

```
curl -X POST http://127.0.0.1:3000/admin/service-entries/sync-plc/request -H "$AUTH"
```

Returns `400 Bad Request` if the identity mode is not `attach_account`.

**Response**: `204 No Content`

#### [Submit PLC token (attach\_account mode)](#submit-plc-token-attach_account-mode)

```
POST /admin/service-entries/sync-plc/submit
```

Submits the email confirmation token to sign and publish the PLC operation via the attached account's PDS.

cURL

```
curl -X POST http://127.0.0.1:3000/admin/service-entries/sync-plc/submit \
  -H "$AUTH" \
  -H "Content-Type: application/json" \
  -d '{ "token": "123456" }'
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | string | yes | Email confirmation code from the PDS |

Returns `400 Bad Request` if the identity mode is not `attach_account`.

**Response**: `204 No Content`

[Service Identity

Previous Page](/api-reference/admin/service-identity)[Verification Methods

Next Page](/api-reference/admin/verification-methods)

#### On this page

[List service entries](#list-service-entries)[Create a service entry](#create-a-service-entry)[Update a service entry](#update-a-service-entry)[Delete a service entry](#delete-a-service-entry)[List XRPCs for a service entry](#list-xrpcs-for-a-service-entry)[Add XRPCs to a service entry](#add-xrpcs-to-a-service-entry)[Remove XRPCs from a service entry](#remove-xrpcs-from-a-service-entry)[List services for a lexicon](#list-services-for-a-lexicon)[Sync to PLC directory](#sync-to-plc-directory)[Direct sync (did:plc mode)](#direct-sync-didplc-mode)[Request PLC token (attach\_account mode)](#request-plc-token-attach_account-mode)[Submit PLC token (attach\_account mode)](#submit-plc-token-attach_account-mode)

---
<!--
URL: https://happyview.dev/api-reference/admin/lexicons
title: Lexicons | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Lexicons

Admin API

## Lexicons

Manage lexicons and network lexicons. See the [Lexicons guide](../../guides/lexicons) for background on how lexicons drive indexing and XRPC routing.

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key
const headers = { Authorization: `Bearer ${TOKEN}` };
```

### [Upload / upsert a lexicon](#upload--upsert-a-lexicon)

```
POST /admin/lexicons
```

TypeScriptJavaScriptRustGocURL

```
interface LexiconResult {
  id: string;
  revision: number;
}

const response = await fetch("http://127.0.0.1:3000/admin/lexicons", {
  method: "POST",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    lexicon_json: {
      lexicon: 1,
      id: "xyz.statusphere.status",
      defs: {
        main: {
          type: "record",
          key: "tid",
          record: {
            type: "object",
            required: ["status", "createdAt"],
            properties: {
              status: { type: "string", maxGraphemes: 1 },
              createdAt: { type: "string", format: "datetime" },
            },
          },
        },
      },
    },
    backfill: true,
    target_collection: null,
  }),
});
const data: LexiconResult = await response.json();
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lexicon_json` | object | yes | Raw lexicon JSON (must have `lexicon: 1` and `id`) |
| `backfill` | boolean | no | Whether uploading triggers historical backfill (default `true`) |
| `target_collection` | string | no | For query/procedure lexicons, the record collection they operate on |
| `token_cost` | integer | no | Token cost for query/procedure endpoints (overrides instance default) |

**Response**: `201 Created` (new) or `200 OK` (upsert)

```
{
  "id": "xyz.statusphere.status",
  "revision": 1
}
```

### [List lexicons](#list-lexicons)

```
GET /admin/lexicons
```

TypeScriptJavaScriptRustGocURL

```
interface Lexicon {
  id: string;
  revision: number;
  lexicon_type: string;
  backfill: boolean;
  created_at: string;
  updated_at: string;
}

const response = await fetch("http://127.0.0.1:3000/admin/lexicons", {
  headers,
});
const data: Lexicon[] = await response.json();
```

**Response**: `200 OK`

```
[
  {
    "id": "xyz.statusphere.status",
    "revision": 1,
    "lexicon_type": "record",
    "backfill": true,
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
]
```

### [Get a lexicon](#get-a-lexicon)

```
GET /admin/lexicons/{id}
```

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "http://127.0.0.1:3000/admin/lexicons/xyz.statusphere.status",
  { headers },
);
const data = await response.json();
```

**Response**: `200 OK` with full lexicon details including raw JSON.

### [Delete a lexicon](#delete-a-lexicon)

```
DELETE /admin/lexicons/{id}
```

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "http://127.0.0.1:3000/admin/lexicons/xyz.statusphere.status",
  {
    method: "DELETE",
    headers,
  },
);
```

**Response**: `204 No Content`

### [Network Lexicons](#network-lexicons)

Network lexicons are fetched from the atproto network via DNS TXT resolution and kept updated via the Jetstream subscription. See [Lexicons - Network lexicons](../../guides/lexicons#network-lexicons) for background.

#### [Add a network lexicon](#add-a-network-lexicon)

```
POST /admin/network-lexicons
```

TypeScriptJavaScriptRustGocURL

```
interface NetworkLexiconResult {
  nsid: string;
  authority_did: string;
  revision: number;
}

const response = await fetch("http://127.0.0.1:3000/admin/network-lexicons", {
  method: "POST",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    nsid: "xyz.statusphere.status",
    target_collection: null,
  }),
});
const data: NetworkLexiconResult = await response.json();
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `nsid` | string | yes | The NSID of the lexicon to watch |
| `target_collection` | string | no | For query/procedure lexicons, the record collection they operate on |

HappyView resolves the NSID authority via DNS TXT, fetches the lexicon from the authority's PDS, parses it, and stores it.

**Response**: `201 Created`

```
{
  "nsid": "xyz.statusphere.status",
  "authority_did": "did:plc:authority",
  "revision": 1
}
```

#### [List network lexicons](#list-network-lexicons)

```
GET /admin/network-lexicons
```

TypeScriptJavaScriptRustGocURL

```
interface NetworkLexicon {
  nsid: string;
  authority_did: string;
  target_collection: string | null;
  last_fetched_at: string;
  created_at: string;
}

const response = await fetch("http://127.0.0.1:3000/admin/network-lexicons", {
  headers,
});
const data: NetworkLexicon[] = await response.json();
```

**Response**: `200 OK`

```
[
  {
    "nsid": "xyz.statusphere.status",
    "authority_did": "did:plc:authority",
    "target_collection": null,
    "last_fetched_at": "2025-01-01T00:00:00Z",
    "created_at": "2025-01-01T00:00:00Z"
  }
]
```

#### [Remove a network lexicon](#remove-a-network-lexicon)

```
DELETE /admin/network-lexicons/{nsid}
```

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "http://127.0.0.1:3000/admin/network-lexicons/xyz.statusphere.status",
  {
    method: "DELETE",
    headers,
  },
);
```

Removes the network lexicon tracking and also deletes the lexicon from the `happyview_lexicons` table and in-memory registry.

**Response**: `204 No Content`

[Overview

Previous Page](/api-reference/admin/admin-api)[Scripts

Next Page](/api-reference/admin/scripts)

#### On this page

[Upload / upsert a lexicon](#upload--upsert-a-lexicon)[List lexicons](#list-lexicons)[Get a lexicon](#get-a-lexicon)[Delete a lexicon](#delete-a-lexicon)[Network Lexicons](#network-lexicons)[Add a network lexicon](#add-a-network-lexicon)[List network lexicons](#list-network-lexicons)[Remove a network lexicon](#remove-a-network-lexicon)

---
<!--
URL: https://happyview.dev/api-reference/admin/labelers
title: Labelers | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Labelers

Admin API

## Labelers

Manage external labeler subscriptions. See the [Labelers guide](../../guides/labelers) for background.

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key
const headers = { Authorization: `Bearer ${TOKEN}` };
```

### [Add a labeler](#add-a-labeler)

```
POST /admin/labelers
```

Requires `labelers:create` permission.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/admin/labelers", {
  method: "POST",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ did: "did:plc:ar7c4by46qjdydhdevvrndac" }),
});
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `did` | string | yes | The labeler's atproto DID |

**Response**: `201 Created` (empty body)

### [List labelers](#list-labelers)

```
GET /admin/labelers
```

Requires `labelers:read` permission.

TypeScriptJavaScriptRustGocURL

```
interface Labeler {
  did: string;
  status: string;
  cursor: number | null;
  created_at: string;
  updated_at: string;
}

const response = await fetch("http://127.0.0.1:3000/admin/labelers", {
  headers,
});
const data: Labeler[] = await response.json();
```

**Response**: `200 OK`

```
[
  {
    "did": "did:plc:ar7c4by46qjdydhdevvrndac",
    "status": "active",
    "cursor": 1234,
    "created_at": "2026-03-15T00:00:00Z",
    "updated_at": "2026-03-15T00:00:00Z"
  }
]
```

| Field | Type | Description |
| --- | --- | --- |
| `did` | string | The labeler's DID |
| `status` | string | `active` or `paused` |
| `cursor` | number|null | Last processed event cursor (null if never synced) |
| `created_at` | string | ISO 8601 creation timestamp |
| `updated_at` | string | ISO 8601 last-updated timestamp |

### [Update a labeler](#update-a-labeler)

```
PATCH /admin/labelers/{did}
```

Requires `labelers:create` permission.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "http://127.0.0.1:3000/admin/labelers/did:plc:ar7c4by46qjdydhdevvrndac",
  {
    method: "PATCH",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: "paused" }),
  },
);
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | string | yes | New status: `active` or `paused` |

**Response**: `200 OK`

### [Delete a labeler](#delete-a-labeler)

```
DELETE /admin/labelers/{did}
```

Requires `labelers:delete` permission. Removes the subscription and all labels emitted by this labeler.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "http://127.0.0.1:3000/admin/labelers/did:plc:ar7c4by46qjdydhdevvrndac",
  {
    method: "DELETE",
    headers,
  },
);
```

**Response**: `204 No Content`

[Users

Previous Page](/api-reference/admin/users)[Instance Settings

Next Page](/api-reference/admin/settings)

#### On this page

[Add a labeler](#add-a-labeler)[List labelers](#list-labelers)[Update a labeler](#update-a-labeler)[Delete a labeler](#delete-a-labeler)

---
<!--
URL: https://happyview.dev/api-reference/admin/script-variables
title: Script Variables | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Script Variables

Admin API

## Script Variables

Script variables are encrypted key/value pairs available to Lua scripts via the `env` global. Use them for secrets like API tokens.

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key
const headers = { Authorization: `Bearer ${TOKEN}` };
```

### [List script variables](#list-script-variables)

```
GET /admin/script-variables
```

Requires `script-variables:read`. Returns a list of variable keys (values are not returned).

### [Upsert a script variable](#upsert-a-script-variable)

```
POST /admin/script-variables
```

Requires `script-variables:create`.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/admin/script-variables", {
  method: "POST",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ key: "ALGOLIA_API_KEY", value: "..." }),
});
```

The value is encrypted at rest using `TOKEN_ENCRYPTION_KEY`.

### [Delete a script variable](#delete-a-script-variable)

```
DELETE /admin/script-variables/{key}
```

Requires `script-variables:delete`.

[Domains

Previous Page](/api-reference/admin/domains)[API Clients

Next Page](/api-reference/admin/api-clients)

#### On this page

[List script variables](#list-script-variables)[Upsert a script variable](#upsert-a-script-variable)[Delete a script variable](#delete-a-script-variable)

---
<!--
URL: https://happyview.dev/api-reference/admin/stats
title: Stats | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Stats

Admin API

## Stats

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key
const headers = { Authorization: `Bearer ${TOKEN}` };
```

### [Record counts](#record-counts)

```
GET /admin/stats
```

TypeScriptJavaScriptRustGocURL

```
interface CollectionCount {
  collection: string;
  count: number;
}

interface Stats {
  total_records: number;
  collections: CollectionCount[];
}

const response = await fetch("http://127.0.0.1:3000/admin/stats", {
  headers,
});
const data: Stats = await response.json();
```

**Response**: `200 OK`

```
{
  "total_records": 12345,
  "collections": [{ "collection": "xyz.statusphere.status", "count": 500 }]
}
```

[Records

Previous Page](/api-reference/admin/records)[Backfill

Next Page](/api-reference/admin/backfill)

#### On this page

[Record counts](#record-counts)

---
<!--
URL: https://happyview.dev/api-reference/admin/events
title: Event Logs | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Event Logs

Admin API

## Event Logs

HappyView logs system events — lexicon changes, record operations, script errors, user actions, and more. See the [Event Logs guide](../../guides/event-logs) for details on event types and retention.

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key
const headers = { Authorization: `Bearer ${TOKEN}` };
```

### [List event logs](#list-event-logs)

```
GET /admin/events
```

TypeScriptJavaScriptRustGocURL

```
interface EventLog {
  id: string;
  event_type: string;
  severity: string;
  actor_did: string;
  subject: string;
  detail: Record<string, unknown>;
  created_at: string;
}

interface EventLogResponse {
  events: EventLog[];
  cursor: string | null;
}

const response = await fetch(
  "http://127.0.0.1:3000/admin/events?severity=error&limit=10",
  { headers },
);
const data: EventLogResponse = await response.json();
```

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| `event_type` | string | no | Filter by exact event type (e.g. `script.error`) |
| `category` | string | no | Filter by category prefix (e.g. `lexicon` matches all lexicon events) |
| `severity` | string | no | Filter by severity: `info`, `warn`, or `error` |
| `subject` | string | no | Filter by subject (lexicon ID, record URI, admin DID, etc.) |
| `cursor` | string | no | Pagination cursor (ISO 8601 timestamp from previous response) |
| `limit` | number | no | Results per page (default `50`, max `100`) |

**Response**: `200 OK`

```
{
  "events": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "event_type": "script.error",
      "severity": "error",
      "actor_did": "did:plc:abc123",
      "subject": "com.example.feed.like",
      "detail": {
        "error": "attempt to index nil value",
        "script_source": "function handle() ... end",
        "input": { "status": "hello" },
        "caller_did": "did:plc:abc123",
        "method": "com.example.feed.like"
      },
      "created_at": "2026-03-01T12:00:00Z"
    }
  ],
  "cursor": "2026-03-01T11:59:00Z"
}
```

Events are returned in reverse chronological order (newest first). Pass the `cursor` value from the response to fetch the next page.

[Backfill

Previous Page](/api-reference/admin/backfill)[API Keys

Next Page](/api-reference/admin/api-keys)

#### On this page

[List event logs](#list-event-logs)

---
<!--
URL: https://happyview.dev/api-reference/admin/api-keys
title: API Keys | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

API Keys

Admin API

## API Keys

Manage API keys for programmatic access. See the [API Keys guide](../../guides/api-keys) for usage details.

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key
const headers = { Authorization: `Bearer ${TOKEN}` };
```

### [Create an API key](#create-an-api-key)

```
POST /admin/api-keys
```

Requires `api-keys:create` permission.

TypeScriptJavaScriptRustGocURL

```
interface ApiKey {
  id: string;
  name: string;
  key: string;
  key_prefix: string;
  permissions: string[];
}

const response = await fetch("http://127.0.0.1:3000/admin/api-keys", {
  method: "POST",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "CI Deploy",
    permissions: ["lexicons:read", "lexicons:create", "backfill:create"],
  }),
});
const data: ApiKey = await response.json();
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes | A label to identify this key's usage |
| `permissions` | string[] | yes | Permissions to grant the key (must be a subset of the creating user's own permissions) |

**Response**: `201 Created`

```
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "CI Deploy",
  "key": "hv_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4",
  "key_prefix": "hv_a1b2c3d4",
  "permissions": ["lexicons:read", "lexicons:create", "backfill:create"]
}
```

The `key` field contains the full API key. It is only returned in this response — store it securely. The key's effective permissions are the **intersection** of the permissions specified here and the creating user's permissions at the time of each request.

### [List API keys](#list-api-keys)

```
GET /admin/api-keys
```

Requires `api-keys:read` permission.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/admin/api-keys", {
  headers,
});
const data: ApiKey[] = await response.json();
```

**Response**: `200 OK`

```
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "CI Deploy",
    "key_prefix": "hv_a1b2c3d4",
    "permissions": ["lexicons:read", "lexicons:create", "backfill:create"],
    "created_at": "2026-03-01T00:00:00Z",
    "last_used_at": "2026-03-06T12:00:00Z",
    "revoked_at": null
  }
]
```

Only returns keys belonging to the authenticated user. The full key is never included — only the prefix.

### [Revoke an API key](#revoke-an-api-key)

```
DELETE /admin/api-keys/{id}
```

Requires `api-keys:delete` permission.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "http://127.0.0.1:3000/admin/api-keys/550e8400-e29b-41d4-a716-446655440000",
  { method: "DELETE", headers },
);
```

Sets `revoked_at` on the key. The key remains in the database for audit purposes but can no longer authenticate.

**Response**: `204 No Content`

[Event Logs

Previous Page](/api-reference/admin/events)[Users

Next Page](/api-reference/admin/users)

#### On this page

[Create an API key](#create-an-api-key)[List API keys](#list-api-keys)[Revoke an API key](#revoke-an-api-key)

---
<!--
URL: https://happyview.dev/api-reference/admin/backfill
title: Backfill | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Backfill

Admin API

## Backfill

Create and monitor historical backfill jobs. See the [Backfill guide](../../guides/backfill) for background.

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key
const headers = { Authorization: `Bearer ${TOKEN}` };
```

### [Create a backfill job](#create-a-backfill-job)

```
POST /admin/backfill
```

TypeScriptJavaScriptRustGocURL

```
interface BackfillJob {
  id: string;
  status: string;
}

const response = await fetch("http://127.0.0.1:3000/admin/backfill", {
  method: "POST",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    collection: "xyz.statusphere.status",
  }),
});
const data: BackfillJob = await response.json();
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `collection` | string | no | Limit to a single collection (backfills all if omitted) |
| `did` | string | no | Limit to a single DID (discovers all via relay if omitted) |

**Response**: `201 Created`

```
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "running"
}
```

### [Cancel a backfill job](#cancel-a-backfill-job)

```
POST /admin/backfill/{id}/cancel
```

Requests cancellation of a running backfill job. The job status transitions to `cancelling` immediately; the background worker will stop at its next checkpoint and set the final status to `cancelled`. See the [Backfill guide](../../guides/backfill#cancelling-a-job) for details on the two-phase process.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  `http://127.0.0.1:3000/admin/backfill/${jobId}/cancel`,
  { method: "POST", headers },
);
const data = await response.json();
```

**Response**: `200 OK`

```
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "cancelling"
}
```

Returns `400` if the job is not currently running, or `404` if the job ID is not found.

### [Pause a backfill job](#pause-a-backfill-job)

```
POST /admin/backfill/{id}/pause
```

Requests a running backfill job to pause. The job status transitions to `pausing` immediately; the background worker will stop at its next checkpoint and set the status to `paused`. Paused jobs retain all progress and can be resumed later.

cURL

```
curl -X POST "http://127.0.0.1:3000/admin/backfill/$JOB_ID/pause" -H "$AUTH"
```

**Response**: `200 OK`

```
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "pausing"
}
```

Returns `400` if the job is not currently running, or `404` if the job ID is not found.

### [Resume a backfill job](#resume-a-backfill-job)

```
POST /admin/backfill/{id}/resume
```

Resume a paused backfill job. The job status transitions back to `running` and processing continues from where it left off.

cURL

```
curl -X POST "http://127.0.0.1:3000/admin/backfill/$JOB_ID/resume" -H "$AUTH"
```

**Response**: `200 OK`

```
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "running"
}
```

Returns `400` if the job is not currently paused, or `404` if the job ID is not found.

### [List backfill jobs](#list-backfill-jobs)

```
GET /admin/backfill/status
```

TypeScriptJavaScriptRustGocURL

```
interface BackfillJob {
  id: string;
  collection: string | null;
  did: string | null;
  status: string;
  stage: string;
  total_repos: number | null;
  resolved_repos: number | null;
  processed_repos: number | null;
  total_records: number | null;
  error: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

const response = await fetch("http://127.0.0.1:3000/admin/backfill/status", {
  headers,
});
const data: BackfillJob[] = await response.json();
```

**Response**: `200 OK`

```
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "collection": "xyz.statusphere.status",
    "did": null,
    "status": "completed",
    "stage": "completed",
    "total_repos": 42,
    "resolved_repos": 42,
    "processed_repos": 42,
    "total_records": 1000,
    "error": null,
    "started_at": "2025-01-01T00:01:00Z",
    "completed_at": "2025-01-01T00:05:00Z",
    "created_at": "2025-01-01T00:00:00Z"
  }
]
```

The `status` field tracks the overall job state (`running`, `pausing`, `paused`, `cancelling`, `cancelled`, `completed`, `failed`). The `stage` field tracks the current processing phase (`pending`, `discovering_repos`, `resolving_and_fetching`, `completed`, `failed`, `cancelled`). The `resolved_repos` counter tracks PDS resolution progress during the pipelined phase, while `processed_repos` tracks record fetching progress.

### [List repos for a job](#list-repos-for-a-job)

```
GET /admin/backfill/{id}/repos
```

Paginated list of per-DID tracking rows for a backfill job. Requires `BackfillRead`.

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| `phase` | string | no | Filter: `discovered` (all), `resolved` (PDS known), `fetched` (completed) |
| `cursor` | string | no | Keyset cursor (DID) for pagination |
| `limit` | number | no | Max results per page (default 50, max 100) |

cURL

```
curl "http://127.0.0.1:3000/admin/backfill/$JOB_ID/repos?phase=fetched&limit=10" -H "$AUTH"
```

**Response**: `200 OK`

```
{
  "repos": [
    { "did": "did:plc:abc", "pds_endpoint": "https://pds.example.com", "status": "completed", "records_fetched": 42 }
  ],
  "cursor": "did:plc:def"
}
```

`cursor` is `null` when there are no more results.

### [PDS summary for a job](#pds-summary-for-a-job)

```
GET /admin/backfill/{id}/pds-summary
```

Aggregated PDS breakdown for a backfill job. Requires `BackfillRead`. No pagination — returns all PDS endpoints in one response, sorted by repo count descending.

cURL

```
curl "http://127.0.0.1:3000/admin/backfill/$JOB_ID/pds-summary" -H "$AUTH"
```

**Response**: `200 OK`

```
{
  "pds_endpoints": [
    { "pds_endpoint": "https://morel.us-east.host.bsky.network", "total_repos": 1200, "completed_repos": 800, "total_records": 5000 }
  ]
}
```

### [Stream backfill events (SSE)](#stream-backfill-events-sse)

```
GET /admin/backfill/{id}/events
```

Server-Sent Events stream of real-time backfill progress. Requires `BackfillRead`. The connection stays open until the job completes or the client disconnects. A keepalive comment is sent periodically to prevent timeouts.

Events are sent with `event: event` and a JSON `data` payload. Each event has a `type` field:

| Event type | Description |
| --- | --- |
| `repo_discovered` | A new DID was found during the discovery phase |
| `repo_resolved` | A DID's PDS endpoint was resolved |
| `repo_fetched` | Record fetching completed for a DID |
| `job_counters` | Updated progress counters |
| `job_stage_changed` | The job moved to a new processing stage |
| `job_completed` | The job finished (completed, failed, or cancelled) |

### [Flush job details](#flush-job-details)

```
DELETE /admin/backfill/{id}/details
```

Delete all per-repo tracking rows for a single backfill job. Requires `BackfillCreate`.

cURL

```
curl -X DELETE "http://127.0.0.1:3000/admin/backfill/$JOB_ID/details" -H "$AUTH"
```

**Response**: `204 No Content`

### [Flush all job details](#flush-all-job-details)

```
DELETE /admin/backfill/details
```

Delete per-repo tracking rows for all completed, cancelled, and failed backfill jobs. Requires `BackfillCreate`.

cURL

```
curl -X DELETE "http://127.0.0.1:3000/admin/backfill/details" -H "$AUTH"
```

**Response**: `204 No Content`

[Stats

Previous Page](/api-reference/admin/stats)[Event Logs

Next Page](/api-reference/admin/events)

#### On this page

[Create a backfill job](#create-a-backfill-job)[Cancel a backfill job](#cancel-a-backfill-job)[Pause a backfill job](#pause-a-backfill-job)[Resume a backfill job](#resume-a-backfill-job)[List backfill jobs](#list-backfill-jobs)[List repos for a job](#list-repos-for-a-job)[PDS summary for a job](#pds-summary-for-a-job)[Stream backfill events (SSE)](#stream-backfill-events-sse)[Flush job details](#flush-job-details)[Flush all job details](#flush-all-job-details)

---
<!--
URL: https://happyview.dev/api-reference/admin/service-identity
title: Service Identity | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Service Identity

Admin API

## Service Identity

Manage the service identity configuration: the DID and identity mode that HappyView uses to identify itself on the AT Protocol network. All endpoints require the `settings:manage` permission.

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key
const headers = { Authorization: `Bearer ${TOKEN}` };
```

### [Get service identity](#get-service-identity)

```
GET /admin/service-identity
```

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/admin/service-identity", {
  headers,
});
const data = await response.json();
```

Returns the current service identity configuration, or `null` if no identity has been configured.

**Response:**

| Field | Type | Description |
| --- | --- | --- |
| `mode` | string | Identity mode (see below) |
| `did` | string/null | The service DID |
| `signing_key_enc` | string/null | Encrypted signing key (present for `did_plc`) |
| `attached_account_did` | string/null | Linked account DID (present for `attach_account`) |
| `setup_complete` | boolean | Whether identity setup has been completed |
| `created_at` | string | ISO 8601 timestamp |
| `updated_at` | string | ISO 8601 timestamp |

#### [Identity modes](#identity-modes)

| Mode | Description |
| --- | --- |
| `did_web` | HappyView derives a `did:web` from its public URL |
| `did_plc` | HappyView manages its own `did:plc` identity |
| `attach_account` | HappyView uses an existing AT Protocol account's DID |
| `not_exposed` | No service identity is exposed on the network |

### [Update service identity](#update-service-identity)

```
PUT /admin/service-identity
```

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/admin/service-identity", {
  method: "PUT",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    mode: "did_web",
  }),
});
```

**Input:**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `mode` | string | Yes | `did_web`, `did_plc`, `attach_account`, or `not_exposed` |
| `did` | string | No | Service DID (required for `did_plc`) |
| `signing_key_enc` | string | No | Encrypted signing key (for `did_plc`) |
| `rotation_key_enc` | string | No | Encrypted rotation key (for `did_plc`) |
| `attached_account_did` | string | No | Account DID to attach (for `attach_account`) |

**Response**: `204 No Content`

[Dead Letters

Previous Page](/api-reference/admin/dead-letters)[Service Entries

Next Page](/api-reference/admin/service-entries)

#### On this page

[Get service identity](#get-service-identity)[Identity modes](#identity-modes)[Update service identity](#update-service-identity)

---
<!--
URL: https://happyview.dev/api-reference/admin/settings
title: Instance Settings | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

[Overview](/api-reference/admin/admin-api)[Lexicons](/api-reference/admin/lexicons)[Scripts](/api-reference/admin/scripts)[Records](/api-reference/admin/records)[Stats](/api-reference/admin/stats)[Backfill](/api-reference/admin/backfill)[Event Logs](/api-reference/admin/events)[API Keys](/api-reference/admin/api-keys)[Users](/api-reference/admin/users)[Labelers](/api-reference/admin/labelers)[Instance Settings](/api-reference/admin/settings)[XRPC Proxy](/api-reference/admin/xrpc-proxy)[Domains](/api-reference/admin/domains)[Script Variables](/api-reference/admin/script-variables)[API Clients](/api-reference/admin/api-clients)[Plugins](/api-reference/admin/plugins)[Dead Letters](/api-reference/admin/dead-letters)[Service Identity](/api-reference/admin/service-identity)[Service Entries](/api-reference/admin/service-entries)[Verification Methods](/api-reference/admin/verification-methods)[Feature Flags](/api-reference/admin/feature-flags)[Permissions](/api-reference/admin/permissions)

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Instance Settings

Admin API

## Instance Settings

Instance settings override environment variables at runtime — things like app name, ToS URL, privacy policy URL, and logo. Settings stored here take precedence over their env var equivalents. All endpoints require the `settings:manage` permission.

TypeScriptJavaScriptRustGocURL

```
const TOKEN = "hv_..."; // your API key
const headers = { Authorization: `Bearer ${TOKEN}` };
```

### [List settings](#list-settings)

```
GET /admin/settings
```

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/admin/settings", {
  headers,
});
const data = await response.json();
```

Returns all key/value pairs stored in the `happyview_instance_settings` table, plus any env-var fallback values for keys not stored in the database. Each entry includes a `source` field: `"database"` for stored values, `"env"` for env-var fallbacks.

#### [Known settings](#known-settings)

| Key | Env var | Default | Description |
| --- | --- | --- | --- |
| `app_name` | `APP_NAME` | --- | Application name shown in sidebar and OAuth consent screen |
| `client_uri` | `CLIENT_URI` | --- | Public URL for this instance, linked from OAuth consent screen |
| `logo_uri` | `LOGO_URI` | --- | External URL to a logo image |
| `tos_uri` | `TOS_URI` | --- | Link to terms of service |
| `policy_uri` | `POLICY_URI` | --- | Link to privacy policy |
| `backfill_concurrent_pds` | `BACKFILL_CONCURRENT_PDS` | `10` | How many PDS servers to fetch from simultaneously during backfill |
| `backfill_concurrent_dids_per_pds` | `BACKFILL_CONCURRENT_DIDS_PER_PDS` | `3` | How many repos to fetch concurrently from each PDS |
| `backfill_concurrent_resolution` | `BACKFILL_CONCURRENT_RESOLUTION` | `100` | How many DID document lookups to run in parallel during PDS resolution |
| `backfill_retention_days` | `BACKFILL_RETENTION_DAYS` | `28` | Days to keep per-repo detail data from completed backfill jobs. `0` = keep indefinitely |
| `verbose_event_logging` | `VERBOSE_EVENT_LOGGING` | `false` | Log every record index, hook execution, and hook skip to the event log. High write volume — recommended only for debugging |
| `feature.spaces_enabled` | `FEATURE_SPACES_ENABLED` | --- | Enables the experimental Permissioned Spaces API. When `"true"`, space endpoints are available. When absent or any other value, space endpoints return `404 FeatureDisabled` |

### [Upsert a setting](#upsert-a-setting)

```
PUT /admin/settings/{key}
```

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/admin/settings/app_name", {
  method: "PUT",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ value: "My HappyView" }),
});
```

### [Delete a setting](#delete-a-setting)

```
DELETE /admin/settings/{key}
```

Removes the override; the corresponding environment variable (if any) takes effect again.

### [Database info](#database-info)

```
GET /admin/settings/db-info
```

Returns database backend, connection pool sizes, and whether a server restart is recommended to resize the backfill pool for current concurrency settings.

cURL

```
curl http://127.0.0.1:3000/admin/settings/db-info -H "$AUTH"
```

**Response**: `200 OK`

```
{
  "backend": "sqlite",
  "server_max_connections": null,
  "main_pool_size": 32,
  "backfill_pool_size": 64,
  "restart_recommended": false
}
```

| Field | Type | Description |
| --- | --- | --- |
| `backend` | string | `"sqlite"` or `"postgres"` |
| `server_max_connections` | number | null | Postgres `max_connections` setting. `null` for SQLite |
| `main_pool_size` | number | Current main connection pool size |
| `backfill_pool_size` | number | Current backfill connection pool size |
| `restart_recommended` | boolean | `true` if concurrency settings have changed and a restart would resize the pool |

### [Upload / delete logo](#upload--delete-logo)

```
PUT /admin/settings/logo
DELETE /admin/settings/logo
```

`PUT` accepts a binary image body and stores it as the instance logo (served via the public dashboard). `DELETE` removes the stored logo.

[Labelers

Previous Page](/api-reference/admin/labelers)[XRPC Proxy

Next Page](/api-reference/admin/xrpc-proxy)

#### On this page

[List settings](#list-settings)[Known settings](#known-settings)[Upsert a setting](#upsert-a-setting)[Delete a setting](#delete-a-setting)[Database info](#database-info)[Upload / delete logo](#upload--delete-logo)

---
<!--
URL: https://happyview.dev/api-reference/oauth/api-clients
title: Third-Party API Clients | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

[Third-Party API Clients](/api-reference/oauth/api-clients)

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Third-Party API Clients

OAuth API

## Third-Party API Clients

Third-party applications can manage their own API clients via the `dev.happyview.*` XRPC endpoints. A third-party client is always tied to exactly one parent — the admin-created top-level API client whose DPoP session made the request. Only one level of nesting is allowed; third-party clients cannot create further children. Each third-party client gets its own rate limit bucket with instance default settings.

All endpoints use [DPoP authentication](../../getting-started/authentication#authenticating-users-for-procedures). See the [admin API client docs](../admin/api-clients) for managing clients through the admin API, and the [API Clients guide](../../guides/api-clients) for how API clients work.

### [Authentication](#authentication)

All requests require three headers:

| Header | Value |
| --- | --- |
| `Authorization` | `DPoP <access_token>` |
| `DPoP` | A DPoP proof JWT (method matches the HTTP method, `htu` is scheme + host + path, no query string) |
| `X-Client-Key` | The parent client's `client_key` |

The access token must belong to a valid DPoP session for the parent client.

### [List clients](#list-clients)

```
GET /xrpc/dev.happyview.listApiClients
```

Returns all API clients owned by the authenticated user.

**Response**: `200 OK`

```
{
  "clients": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "clientKey": "hvc_a1b2c3d4e5f6...",
      "name": "My App",
      "clientIdUrl": "https://myapp.example.com/client-metadata.json",
      "clientUri": "https://myapp.example.com",
      "redirectUris": ["https://myapp.example.com/callback"],
      "clientType": "confidential",
      "scopes": "atproto",
      "allowedOrigins": [],
      "isActive": true,
      "createdAt": "2026-04-28T12:00:00Z"
    }
  ]
}
```

### [Get a client](#get-a-client)

```
GET /xrpc/dev.happyview.getApiClient?id=<client_id>
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | The client's UUID |

**Response**: `200 OK`

```
{
  "client": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "clientKey": "hvc_a1b2c3d4e5f6...",
    "name": "My App",
    "clientIdUrl": "https://myapp.example.com/client-metadata.json",
    "clientUri": "https://myapp.example.com",
    "redirectUris": ["https://myapp.example.com/callback"],
    "clientType": "confidential",
    "scopes": "atproto",
    "allowedOrigins": [],
    "isActive": true,
    "createdAt": "2026-04-28T12:00:00Z"
  }
}
```

Returns `404` if the client doesn't exist or isn't owned by the authenticated user.

### [Create a client](#create-a-client)

```
POST /xrpc/dev.happyview.createApiClient
```

TypeScriptJavaScriptRustGocURL

```
const CLIENT_KEY = "hvc_parent_key"; // parent API client key
const ACCESS_TOKEN = "eyJhbG..."; // DPoP access token
const DPOP_PROOF = "eyJhbG..."; // DPoP proof JWT

interface CreateClientResponse {
  client: {
    id: string;
    clientKey: string;
    name: string;
    clientIdUrl: string;
    clientUri: string;
    redirectUris: string[];
    clientType: string;
    scopes: string;
    allowedOrigins: string[];
    isActive: boolean;
    createdAt: string;
  };
  clientSecret?: string;
}

const response = await fetch(
  "https://happyview.example.com/xrpc/dev.happyview.createApiClient",
  {
    method: "POST",
    headers: {
      "X-Client-Key": CLIENT_KEY,
      Authorization: `DPoP ${ACCESS_TOKEN}`,
      DPoP: DPOP_PROOF,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "My Third-Party App",
      clientIdUrl: "https://myapp.example.com/client-metadata.json",
      clientUri: "https://myapp.example.com",
      redirectUris: ["https://myapp.example.com/callback"],
      clientType: "confidential",
    }),
  },
);

const data: CreateClientResponse = await response.json();
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes | Display name for the client |
| `clientIdUrl` | string | yes | Unique OAuth client ID URL |
| `clientUri` | string | yes | The client's homepage URL |
| `redirectUris` | string[] | yes | OAuth redirect URIs |
| `scopes` | string | no | Space-separated OAuth scopes (default `"atproto"`) |
| `clientType` | string | no | `"confidential"` or `"public"` (default `"confidential"`) |
| `allowedOrigins` | string[] | no | CORS allowed origins (relevant for public clients) |

**Response**: `201 Created`

```
{
  "client": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "clientKey": "hvc_a1b2c3d4e5f6...",
    "name": "My Third-Party App",
    "clientIdUrl": "https://myapp.example.com/client-metadata.json",
    "clientUri": "https://myapp.example.com",
    "redirectUris": ["https://myapp.example.com/callback"],
    "clientType": "confidential",
    "scopes": "atproto",
    "allowedOrigins": [],
    "isActive": true,
    "createdAt": "2026-04-28T12:00:00Z"
  },
  "clientSecret": "hvs_f6e5d4c3b2a1..."
}
```

The `clientSecret` is only present for confidential clients and is only returned in this response. It is stored as a SHA-256 hash and cannot be retrieved again.

### [Delete a client](#delete-a-client)

```
POST /xrpc/dev.happyview.deleteApiClient
```

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "https://happyview.example.com/xrpc/dev.happyview.deleteApiClient",
  {
    method: "POST",
    headers: {
      "X-Client-Key": CLIENT_KEY,
      Authorization: `DPoP ${ACCESS_TOKEN}`,
      DPoP: DPOP_PROOF,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: "550e8400-e29b-41d4-a716-446655440000",
    }),
  },
);
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | The client's UUID |

**Response**: `200 OK` with `{}`

Returns `404` if the client doesn't exist or isn't owned by the authenticated user. Deleting a client cascades to all its children.

### [Errors](#errors)

| Status | Error | Cause |
| --- | --- | --- |
| 400 | `Invalid client_type` | `client_type` is not `"confidential"` or `"public"` |
| 400 | `invalid request body` | Missing required fields or malformed JSON |
| 401 | `requires DPoP authentication` | `Authorization` header is missing or doesn't use the DPoP scheme |
| 401 | `requires an API client key` | `X-Client-Key` header is absent |
| 401 | `token_expired` | The access token has expired |
| 401 | `Invalid client` | `X-Client-Key` doesn't match a known client |
| 401 | `child clients cannot manage API clients` | The calling client is itself a third-party (child) client |
| 403 | `Child clients cannot create API clients` | The calling client is itself a third-party (child) client |
| 404 | `API client not found` | No client with that ID owned by the authenticated user |
| 409 | `client_id_url already registered` | Another client already uses that `clientIdUrl` |

### [Operational notes](#operational-notes)

Each third-party client gets its own rate limit bucket using the instance's default capacity and refill rate (`DEFAULT_RATE_LIMIT_CAPACITY` / `DEFAULT_RATE_LIMIT_REFILL_RATE`). Deactivating or deleting a parent via the [admin API](../admin/api-clients) cascades to all its children.

The admin API clients list (`GET /admin/api-clients`) returns `parent_client_id` and `owner_did` fields for each client and supports `?parent_id=` filtering. The dashboard's API Clients table shows these as "Parent Client" and "Owner" columns.

[Permissions

Previous Page](/api-reference/admin/permissions)[Record API

Next Page](/api-reference/lua/record-api)

#### On this page

[Authentication](#authentication)[List clients](#list-clients)[Get a client](#get-a-client)[Create a client](#create-a-client)[Delete a client](#delete-a-client)[Errors](#errors)[Operational notes](#operational-notes)

---
<!--
URL: https://happyview.dev/experimental/spaces/changelog
title: Changelog | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

[Overview](/experimental/spaces)[Managing Spaces](/experimental/spaces/managing-spaces)[Members](/experimental/spaces/members)[Records](/experimental/spaces/records)[Credentials](/experimental/spaces/credentials)[Write Notifications](/experimental/spaces/notifications)[Invites](/experimental/spaces/invites)[Changelog](/experimental/spaces/changelog)

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Changelog

Permissioned Spaces

## Changelog

### [Latest — Proposal 0016 Alignment](#latest--proposal-0016-alignment)

Major restructuring to align with [AT Protocol Proposal 0016](https://github.com/bluesky-social/proposals) (Permissioned Data).

#### [Namespace split](#namespace-split)

* **Protocol routes** now live under `com.atproto.space.*` (queries, data, credentials)
* **Management routes** now live under `com.atproto.simplespace.*` (create/update/delete spaces, membership, config)
* **`dev.happyview.space.*`** endpoints remain as backward-compatible aliases until v3
* Invite endpoints remain under `dev.happyview.space.*` as HappyView extensions

#### [New terminology](#new-terminology)

* **`owner_did` → `authority_did`** — the DID that controls the space. A separate `creator_did` tracks who originally created it.
* **`accessMode` → `mintPolicy`** — controls who can create permissioned repos: `member-list` (default), `public`, or `managing-app`
* **`appAllowlist`/`appDenylist` → `appAccess`** — controls third-party app access: `open` (default) or `allowList`
* **`getMemberGrant` → `getDelegationToken`** — renamed and changed from POST to GET. Returns a delegation token (JWT with `typ: atproto-space-delegation+jwt`, ES256K, 60-second TTL)
* **`redeemInvite` → `acceptInvite`** — renamed for clarity
* **Space credential `typ`** — changed from `space_credential` to `atproto-space-credential+jwt`
* **Space credential TTL** — reduced from 4 hours to 2 hours

#### [New access level](#new-access-level)

* **`read_self`** — a new membership access level that restricts reads to only the member's own records within the space

#### [New endpoints](#new-endpoints)

* **`com.atproto.space.getRepoState`** (GET) — returns per-user repo state including LtHash state and signed commit
* **`com.atproto.space.listRepoOps`** (GET) — returns the record operation log for sync
* **`com.atproto.space.listRepos`** (GET) — lists repos (authors) in a space
* **`com.atproto.space.getBlob`** (GET) — retrieves a blob from a space
* **`com.atproto.space.registerNotify`** (POST) — registers for write notifications
* **`com.atproto.space.notifyWrite`** (POST) — pushes a write notification
* **`com.atproto.space.notifySpaceDeleted`** (POST) — pushes a space-deleted notification
* **`com.atproto.simplespace.getConfig`** (GET) — gets space configuration (mint policy, app access, managing app)
* **`com.atproto.simplespace.updateConfig`** (POST) — updates space configuration

#### [Cryptographic primitives](#cryptographic-primitives)

* **LtHash** — homomorphic set-hash for per-user repo state. 2048-byte state with 1024 little-endian uint16 lanes using BLAKE3 XOF. Supports insert/remove operations for incremental record tracking.
* **Deniable commit signatures** — users sign context (space DID + rev + random IKM) rather than content hash, producing a MAC that proves authorship without binding the user to specific content.

#### [Data model changes](#data-model-changes)

* New `happyview_space_repo_state` table — per-user LtHash state + signed commit per space
* New `happyview_space_record_oplog` table — ordered record operation log per space
* New `happyview_space_notify_registrations` table — write notification registrations
* Spaces now use `authority_did` and `creator_did` instead of `owner_did`
* `mint_policy` and `app_access` columns replace `access_mode`, `app_allowlist`, `app_denylist`

#### [Breaking changes](#breaking-changes)

* Feature flag disabled response changed from `501 Not Implemented` to `404` with `FeatureDisabled` error code
* Deleting a space now cascades to all associated data (records, members, repo state, oplog, notifications, credentials)

---

### [v2.6.0](#v260)

#### [New endpoints](#new-endpoints-1)

* **`createRecord`:** create a record with an auto-generated TID rkey instead of requiring the caller to supply one
* **`applyWrites`:** batch multiple create, update, and delete operations in a single request

#### [Optimistic concurrency](#optimistic-concurrency)

* **`swapRecord`:** optional CID-based concurrency guard on `putRecord`, `deleteRecord`, and individual operations within `applyWrites`. Returns `409 Conflict` when the record's current CID doesn't match.
* **`swapCommit`:** optional revision-based concurrency guard on `applyWrites`. Asserts the space's current revision before applying any writes. Returns `409 Conflict` on mismatch.
* Spaces now track a `revision` field (TID) that advances on every write.

#### [Space DID separation](#space-did-separation)

* Spaces now have their own `did` field, distinct from the `owner_did` of the space creator. For personal spaces these are the same DID; multi-party spaces will have their own DID.
* All URI construction and lookups use the space's DID. Ownership checks use `owner_did`.
* New database migration adds the `did` column to the `spaces` table.

#### [Two-step credential flow](#two-step-credential-flow)

* Replaced the single `getCredential` endpoint with a two-step flow:
  1. **`getMemberGrant`:** proves membership and returns an HMAC-SHA256 grant (5-minute TTL)
  2. **`getSpaceCredential`:** exchanges the grant for an ES256 space credential JWT (4-hour TTL)
* Removed the `refreshCredential` endpoint (just repeat the two-step flow)

#### [Bearer auth for space credentials](#bearer-auth-for-space-credentials)

* Space credentials are now passed as standard `Authorization: Bearer <token>` instead of a custom `X-Space-Credential` header. HappyView distinguishes credentials from other Bearer tokens by checking the JWT `typ` header (`space_credential`), matching Dan's reference implementation.
* No DPoP auth or client key needed when authenticating via space credential.

#### [Endpoint naming](#endpoint-naming)

* Space CRUD endpoints renamed to verbNoun format: `space.create` → `space.createSpace`, `space.get` → `space.getSpace`, `space.list` → `space.listSpaces`, `space.update` → `space.updateSpace`, `space.delete` → `space.deleteSpace`.
* Invite endpoints moved out of the `invite.*` sub-namespace: `invite.create` → `space.createInvite`, `invite.redeem` → `space.redeemInvite`, `invite.revoke` → `space.revokeInvite`, `invite.list` → `space.listInvites`.
* Old endpoint names are still available as legacy aliases and will be removed in a future release.

#### [Bug fixes](#bug-fixes)

* Fixed `WriteOp` serde deserialization. `swapRecord` fields in `update` and `delete` operations now correctly deserialize from camelCase JSON.
* Credential `iss` claim now uses the space's DID instead of the owner's DID.
* `SpaceUri` parsing updated to use `did` (space DID) instead of `owner_did`.

---

### [v2.5.0](#v250)

*Released 2026-05-05*

Initial release of Permissioned Spaces behind the `feature.spaces_enabled` experimental flag.

#### [Features](#features)

* Space CRUD: `create`, `get`, `list`, `update`, `delete`
* Record operations: `putRecord`, `getRecord`, `listRecords`, `deleteRecord`
* Membership management: `addMember`, `removeMember`, `listMembers`
* Invite system: `invite.create`, `invite.redeem`, `invite.revoke`, `invite.list`
* `ats://` URI scheme for addressing permissioned data
* Access model with `default_allow` / `default_deny` modes and app allowlists/denylists
* Space credentials for cross-service read access via `X-Space-Credential` header
* Delegation: adding a space as a member transitively grants access to its members
* Lua scripting context includes space metadata (`space.did`, `space.owner_did`, `space.type_nsid`, `space.skey`)

[Invites

Previous Page](/experimental/spaces/invites)[XRPC API

Next Page](/api-reference/xrpc-api)

#### On this page

[Latest — Proposal 0016 Alignment](#latest--proposal-0016-alignment)[Namespace split](#namespace-split)[New terminology](#new-terminology)[New access level](#new-access-level)[New endpoints](#new-endpoints)[Cryptographic primitives](#cryptographic-primitives)[Data model changes](#data-model-changes)[Breaking changes](#breaking-changes)[v2.6.0](#v260)[New endpoints](#new-endpoints-1)[Optimistic concurrency](#optimistic-concurrency)[Space DID separation](#space-did-separation)[Two-step credential flow](#two-step-credential-flow)[Bearer auth for space credentials](#bearer-auth-for-space-credentials)[Endpoint naming](#endpoint-naming)[Bug fixes](#bug-fixes)[v2.5.0](#v250)[Features](#features)

---
<!--
URL: https://happyview.dev/api-reference/lua/atproto-api
title: atproto API | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

[Record API](/api-reference/lua/record-api)[Database API](/api-reference/lua/database-api)[HTTP API](/api-reference/lua/http-api)[XRPC Lua API](/api-reference/lua/xrpc-lua-api)[atproto API](/api-reference/lua/atproto-api)[JSON API](/api-reference/lua/json-api)[Utility Globals](/api-reference/lua/utility-globals)[Standard Libraries](/api-reference/lua/standard-libraries)

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

atproto API

Lua API

## atproto API

The `atproto` table provides atproto utility functions. Available in all [Lua scripts](../../guides/lua-scripting) — queries, procedures, and [record/label scripts](../../guides/label-scripts).

### [atproto.resolve\_service\_endpoint](#atprotoresolve_service_endpoint)

```
local endpoint = atproto.resolve_service_endpoint(did)
```

Resolves a DID to its atproto service endpoint URL by fetching the DID document. Supports both `did:plc:*` (via the PLC directory) and `did:web:*` (via `.well-known/did.json`).

| Parameter | Type | Description |
| --- | --- | --- |
| `did` | string | The DID to resolve |

**Returns:** The service endpoint URL as a string, or `nil` if resolution fails (DID not found, no PDS service in document, network error).

#### [Examples](#examples)

```
-- Resolve a did:plc DID
local endpoint = atproto.resolve_service_endpoint("did:plc:abc123")
-- endpoint = "https://pds.example.com"

-- Resolve a did:web DID
local endpoint = atproto.resolve_service_endpoint("did:web:example.com")
-- endpoint = "https://example.com"

-- Handle resolution failure
local endpoint = atproto.resolve_service_endpoint("did:plc:unknown")
if not endpoint then
  return { error = "Could not resolve DID" }
end

-- Use with HTTP API to call a remote XRPC endpoint
local endpoint = atproto.resolve_service_endpoint(did)
if endpoint then
  local resp = http.get(endpoint .. "/xrpc/com.example.method")
  local data = json.decode(resp.body)
end
```

### [atproto.get\_labels](#atprotoget_labels)

```
local labels = atproto.get_labels(uri)
```

Returns an array of labels for a single AT URI. Merges external labels (from subscribed labelers) with self-labels (from the record's `labels.values[]` field).

| Parameter | Type | Description |
| --- | --- | --- |
| `uri` | string | AT URI of the record to query |

Each label in the array is a table with:

| Field | Type | Description |
| --- | --- | --- |
| `src` | string | DID of the labeler (or record author) |
| `uri` | string | AT URI this label applies to |
| `val` | string | Label value (e.g. "nsfw", "!hide") |
| `cts` | string | Timestamp when the label was created |

Expired labels are automatically filtered out. Returns an empty array if no labels exist.

### [atproto.get\_labels\_batch](#atprotoget_labels_batch)

```
local labels_by_uri = atproto.get_labels_batch(uris)
```

Batch version of `get_labels`. Takes an array of AT URIs and returns a table keyed by URI, where each value is an array of labels.

| Parameter | Type | Description |
| --- | --- | --- |
| `uris` | table | Array of AT URI strings |

**Returns:** A table keyed by URI. Each value is an array of label tables (same shape as `get_labels`). URIs with no labels have an empty array.

#### [Label examples](#label-examples)

```
-- Get labels for a single game
local labels = atproto.get_labels("at://did:plc:abc/games.gamesgamesgamesgames.game/rkey1")
for _, label in ipairs(labels) do
  if label.val == "!hide" then
    -- skip this game in feed results
  end
end

-- Batch fetch labels for multiple games (efficient for feed hydration)
local uris = {}
for _, item in ipairs(skeleton) do
  uris[#uris + 1] = item.game
end

local labels_by_uri = atproto.get_labels_batch(uris)
for _, uri in ipairs(uris) do
  local labels = labels_by_uri[uri]
  for _, label in ipairs(labels) do
    if label.val == "!hide" then
      -- filter out this game
    end
  end
end
```

### [atproto.blob\_download](#atprotoblob_download)

```
local result = atproto.blob_download(did, cid)
```

Downloads a blob from any DID's PDS via the public `com.atproto.sync.getBlob` endpoint. No authentication is required. The blob bytes are held on the Rust side as an opaque `BlobHandle` — binary data never enters the Lua VM.

| Parameter | Type | Description |
| --- | --- | --- |
| `did` | string | DID of the repo that owns the blob |
| `cid` | string | CID of the blob to download |

**Returns:** A table with:

| Field | Type | Description |
| --- | --- | --- |
| `handle` | BlobHandle | Opaque handle to the blob bytes (pass to `blob_upload`) |
| `mimeType` | string | Content type from the PDS response (e.g. `"image/png"`) |
| `size` | number | Size of the blob in bytes |

If the content-type header is missing from the PDS response, `mimeType` defaults to `"application/octet-stream"`.

**Throws** on any non-2xx response from the PDS, including 404 (blob not found) and 429 (rate limited). Retry logic is the script's responsibility.

**Availability:** All script contexts (queries, procedures, record scripts).

#### [BlobHandle methods](#blobhandle-methods)

The `BlobHandle` userdata exposes two methods:

| Method | Returns | Description |
| --- | --- | --- |
| `:size()` | number | Size of the blob in bytes |
| `:mime_type()` | string | MIME type of the blob |

#### [Examples](#examples-1)

```
-- Download a blob and inspect it
local result = atproto.blob_download("did:plc:abc123", "bafyreie...")
log("downloaded " .. result.size .. " bytes, type: " .. result.mimeType)

-- The handle can also be queried directly
log("handle size: " .. result.handle:size())
log("handle mime: " .. result.handle:mime_type())
```

### [atproto.blob\_upload](#atprotoblob_upload)

```
local response = atproto.blob_upload(handle, content_type)
```

Uploads blob bytes to the caller's PDS via authenticated `com.atproto.repo.uploadBlob`. The `handle` must be a `BlobHandle` from `blob_download`.

| Parameter | Type | Description |
| --- | --- | --- |
| `handle` | BlobHandle | Opaque blob handle from `blob_download` |
| `content_type` | string | MIME type for the upload (e.g. `"image/png"`) |

**Returns:** The PDS `uploadBlob` response, which contains a `blob` field with the new blob reference:

```
{
  blob = {
    ["$type"] = "blob",
    ref = { ["$link"] = "<new-cid>" },
    mimeType = "image/png",
    size = 12345
  }
}
```

**Throws** on any error, including 429 (rate limited) and authentication failures. Retry logic is the script's responsibility.

**Availability:** Procedure scripts only. Returns `nil` in query and record script contexts (no PDS auth available).

#### [Examples](#examples-2)

```
-- Copy a blob from one repo to another
local downloaded = atproto.blob_download(source_did, old_cid)
local uploaded = atproto.blob_upload(downloaded.handle, downloaded.mimeType)

-- Use the new blob ref in a record
local new_cid = uploaded.blob.ref["$link"]

-- Migrate all blobs in a media array
for _, item in ipairs(record.media) do
  if item.blob and item.blob.ref then
    local dl = atproto.blob_download(source_did, item.blob.ref["$link"])
    local ul = atproto.blob_upload(dl.handle, dl.mimeType)
    item.blob = ul.blob
  end
end
```

### [atproto.sign](#atprotosign)

```
local sig = atproto.sign(record)
```

Signs a record and returns the inline signature object. Only available when an attestation signer is configured — if no signer is configured, `atproto.sign` is `nil`.

| Parameter | Type | Description |
| --- | --- | --- |
| `record` | table | The record data to sign |

**Returns:** A signature table with:

| Field | Type | Description |
| --- | --- | --- |
| `key` | string | The signing key ID (e.g. `did:web:example#signing`) |
| `signature` | table | Contains `$bytes` with the signature |

#### [Examples](#examples-3)

```
-- Sign a record before returning it
local record = { contributionType = "correction", changes = { name = "Test" } }
local sig = atproto.sign(record)
record.signature = sig
return record

-- Check if signing is available
if atproto.sign then
  local sig = atproto.sign(record)
end
```

### [atproto.verify\_signature](#atprotoverify_signature)

```
local valid = atproto.verify_signature(record, signature, repo_did)
```

Verifies that an inline signature was produced by this HappyView instance. Only available when an attestation signer is configured — if no signer is configured, `atproto.verify_signature` is `nil`.

| Parameter | Type | Description |
| --- | --- | --- |
| `record` | table | The record data |
| `signature` | table | The signature object from `atproto.sign()` |
| `repo_did` | string | The repo DID |

**Returns:** `true` if the signature is valid, `false` otherwise. Returns `false` on failure rather than raising an error.

#### [Examples](#examples-4)

```
-- Verify a signature roundtrip
local record = { contributionType = "correction", changes = { name = "Test" } }
local sig = atproto.sign(record)
local valid = atproto.verify_signature(record, sig, caller_did)
if not valid then
  return { error = "signature verification failed" }
end
```

[XRPC Lua API

Previous Page](/api-reference/lua/xrpc-lua-api)[JSON API

Next Page](/api-reference/lua/json-api)

#### On this page

[atproto.resolve\_service\_endpoint](#atprotoresolve_service_endpoint)[Examples](#examples)[atproto.get\_labels](#atprotoget_labels)[atproto.get\_labels\_batch](#atprotoget_labels_batch)[Label examples](#label-examples)[atproto.blob\_download](#atprotoblob_download)[BlobHandle methods](#blobhandle-methods)[Examples](#examples-1)[atproto.blob\_upload](#atprotoblob_upload)[Examples](#examples-2)[atproto.sign](#atprotosign)[Examples](#examples-3)[atproto.verify\_signature](#atprotoverify_signature)[Examples](#examples-4)

---
<!--
URL: https://happyview.dev/api-reference/lua/standard-libraries
title: Standard Libraries | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

[Record API](/api-reference/lua/record-api)[Database API](/api-reference/lua/database-api)[HTTP API](/api-reference/lua/http-api)[XRPC Lua API](/api-reference/lua/xrpc-lua-api)[atproto API](/api-reference/lua/atproto-api)[JSON API](/api-reference/lua/json-api)[Utility Globals](/api-reference/lua/utility-globals)[Standard Libraries](/api-reference/lua/standard-libraries)

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Standard Libraries

Lua API

## Standard Libraries

The following Lua 5.4 standard library modules and builtins are available in the HappyView sandbox.

### [string](#string)

* [`byte`](https://lua.org/manual/5.4/manual.html#pdf-string.byte)
* [`char`](https://lua.org/manual/5.4/manual.html#pdf-string.char)
* [`find`](https://lua.org/manual/5.4/manual.html#pdf-string.find)
* [`format`](https://lua.org/manual/5.4/manual.html#pdf-string.format)
* [`gmatch`](https://lua.org/manual/5.4/manual.html#pdf-string.gmatch)
* [`gsub`](https://lua.org/manual/5.4/manual.html#pdf-string.gsub)
* [`len`](https://lua.org/manual/5.4/manual.html#pdf-string.len)
* [`lower`](https://lua.org/manual/5.4/manual.html#pdf-string.lower)
* [`match`](https://lua.org/manual/5.4/manual.html#pdf-string.match)
* [`rep`](https://lua.org/manual/5.4/manual.html#pdf-string.rep)
* [`reverse`](https://lua.org/manual/5.4/manual.html#pdf-string.reverse)
* [`sub`](https://lua.org/manual/5.4/manual.html#pdf-string.sub)
* [`upper`](https://lua.org/manual/5.4/manual.html#pdf-string.upper)

### [table](#table)

* [`concat`](https://lua.org/manual/5.4/manual.html#pdf-table.concat)
* [`insert`](https://lua.org/manual/5.4/manual.html#pdf-table.insert)
* [`remove`](https://lua.org/manual/5.4/manual.html#pdf-table.remove)
* [`sort`](https://lua.org/manual/5.4/manual.html#pdf-table.sort)
* [`unpack`](https://lua.org/manual/5.4/manual.html#pdf-table.unpack)

### [math](#math)

* [`abs`](https://lua.org/manual/5.4/manual.html#pdf-math.abs)
* [`ceil`](https://lua.org/manual/5.4/manual.html#pdf-math.ceil)
* [`floor`](https://lua.org/manual/5.4/manual.html#pdf-math.floor)
* [`max`](https://lua.org/manual/5.4/manual.html#pdf-math.max)
* [`min`](https://lua.org/manual/5.4/manual.html#pdf-math.min)
* [`random`](https://lua.org/manual/5.4/manual.html#pdf-math.random)
* [`sqrt`](https://lua.org/manual/5.4/manual.html#pdf-math.sqrt)
* [`huge`](https://lua.org/manual/5.4/manual.html#pdf-math.huge)
* [`pi`](https://lua.org/manual/5.4/manual.html#pdf-math.pi)

### [os (safe subset)](#os-safe-subset)

Only the following safe functions are available from the `os` module:

* [`time`](https://lua.org/manual/5.4/manual.html#pdf-os.time)
* [`date`](https://lua.org/manual/5.4/manual.html#pdf-os.date)
* [`difftime`](https://lua.org/manual/5.4/manual.html#pdf-os.difftime)
* [`clock`](https://lua.org/manual/5.4/manual.html#pdf-os.clock)

Dangerous functions like `os.execute`, `os.remove`, `os.rename`, and `os.exit` are not available.

### [Builtins](#builtins)

* [`print`](https://lua.org/manual/5.4/manual.html#pdf-print)
* [`tostring`](https://lua.org/manual/5.4/manual.html#pdf-tostring)
* [`tonumber`](https://lua.org/manual/5.4/manual.html#pdf-tonumber)
* [`type`](https://lua.org/manual/5.4/manual.html#pdf-type)
* [`pairs`](https://lua.org/manual/5.4/manual.html#pdf-pairs)
* [`ipairs`](https://lua.org/manual/5.4/manual.html#pdf-ipairs)
* [`next`](https://lua.org/manual/5.4/manual.html#pdf-next)
* [`select`](https://lua.org/manual/5.4/manual.html#pdf-select)
* [`unpack`](https://lua.org/manual/5.4/manual.html#pdf-table.unpack)
* [`error`](https://lua.org/manual/5.4/manual.html#pdf-error)
* [`pcall`](https://lua.org/manual/5.4/manual.html#pdf-pcall)
* [`xpcall`](https://lua.org/manual/5.4/manual.html#pdf-xpcall)
* [`assert`](https://lua.org/manual/5.4/manual.html#pdf-assert)
* [`setmetatable`](https://lua.org/manual/5.4/manual.html#pdf-setmetatable)
* [`getmetatable`](https://lua.org/manual/5.4/manual.html#pdf-getmetatable)
* [`rawget`](https://lua.org/manual/5.4/manual.html#pdf-rawget)
* [`rawset`](https://lua.org/manual/5.4/manual.html#pdf-rawset)
* [`rawequal`](https://lua.org/manual/5.4/manual.html#pdf-rawequal)

### [Removed modules](#removed-modules)

The following standard Lua modules are **removed** and unavailable in the sandbox:

`io`, `debug`, `package`, `require`, `dofile`, `loadfile`, `load`, `collectgarbage`

[Utility Globals

Previous Page](/api-reference/lua/utility-globals)[Glossary

Next Page](/reference/glossary)

#### On this page

[string](#string)[table](#table)[math](#math)[os (safe subset)](#os-safe-subset)[Builtins](#builtins)[Removed modules](#removed-modules)

---
<!--
URL: https://happyview.dev/blog/happyview-2.5
title: HappyView v2.5: Permissioned Spaces | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

## HappyView v2.5: Permissioned Spaces

Private groups, invite-only communities, and gated content come to atproto.

![Trezy](/_next/image?url=%2Fauthors%2Ftrezy.webp&w=48&q=75)Trezy

May 8, 2026

announcements

HappyView 2.5 is out, and it ships with one of the most anticipated features in the [atproto](https://atproto.com) ecosystem:

✨ Permissioned Spaces. ✨

### [The problem](#the-problem)

ATProto is public by default. That's great for open social graphs, but not so great for private groups, invite-only communities, or gated content. If you wanted access-controlled data, you were mostly out of luck.

Spaces fix that. They give you private, access-controlled data under your existing DID.

### [What this means for HappyView](#what-this-means-for-happyview)

Because HappyView is [lexicon-driven](/guides/getting-started), Spaces integrate naturally with everything you've already built. All of your scripts can query Spaces directly for membership checks, access levels, private record queries, and more. Custom lexicons can build on top of Spaces today without waiting for anything else to land.

### [Here be dragons](#here-be-dragons)

The whole feature is experimental, and it's gated behind a feature flag. You can enable it from the new "Experimental" page in the dashboard.

![The Experimental page in the HappyView dashboard](/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fexperimental-page.09m05y_idc97i.png&w=3840&q=75)

Give it a try, tell me what breaks, and tell me what you want to work differently.

### [Standing on shoulders](#standing-on-shoulders)

All of the work on Permissioned Spaces follows [Daniel Holmgren's](https://bsky.app/profile/dholms.at) Permissioned Data Diaries. Big credit to [Zicklag's](https://bsky.app/profile/zicklag.dev) work on Arbiter and [flo-bit's](https://bsky.app/profile/flo-bit.dev) work on [Contrail](https://flo-bit.dev/contrail). We're actively working to make sure Spaces will be compatible between HappyView and Contrail as things evolve.

### [Go get some](#go-get-some)

Check out [the documentation](https://happyview.dev) and give it a shot!

We've been talking about permissioned data for forever, and now it's here. I'm excited to see what y'all do with it.

---
<!--
URL: https://happyview.dev/blog/releasing-happyview-2-into-the-wild
title: Releasing HappyView 2 Into the Wild | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

## Releasing HappyView 2 Into the Wild

One binary, no companion services, and a lot fewer moving parts.

![Trezy](/_next/image?url=%2Fauthors%2Ftrezy.webp&w=48&q=75)Trezy

April 24, 2026

announcements

I originally built HappyView because I needed it for my own [atproto](https://atproto.com) project, [Cartridge](https://cartridge.dev). v2 is still built for my needs, but now I can hand it to someone else without apologizing.

### [If you're new here](#if-youre-new-here)

HappyView is a general-purpose [AppView](https://atproto.com/guides/glossary#app-view) for atproto. Upload your [lexicons](https://atproto.com/guides/glossary#lexicon) and it gives you a fully functional [XRPC](https://atproto.com/guides/glossary#xrpc) API. It also provides a scripting interface that can be used to process records during ingestion, as well as customizing your XRPC handlers.

### [What's new](#whats-new)

HappyView v2 is a *massive* upgrade. Bug fixes, new features, and an interface overhaul across the board.

#### [Fewer moving parts](#fewer-moving-parts)

HappyView v1 required setting up HappyView itself, a [Tap](https://github.com/bluesky-social/indigo/tree/main/cmd/tap) server for ingestion, and an [AIP](https://github.com/graze-social/aip) server for handling auth. All three had to be deployed, configured, and kept in sync, which was a lot of moving parts. HappyView v2 completely absorbs Tap and AIP. Real-time indexing and backfill were fully owned by Tap in v1, but now run as background tasks inside v2. AIP used to handle auth, but now OAuth with DPoP is built natively into v2.

There are no more companion services to stand up.

#### [More databases](#more-databases)

SQLite is now the default so most deployments only require a single binary to run the entire AppView. Postgres is still fully supported for large-scale deployments. A single adapter translates between the two at runtime so your scripts work against either database without modification. That means a fresh HappyView deployment needs no external database, no connection string, and no compose file to run.

#### [Authorize meeeeeee](#authorize-meeeeeee)

HappyView auth has its own system for managing DPoP-bound access tokens, which makes it easy for developers to use the existing atproto SDKs to integrate with HappyView.

That's right: apps built against atproto don't need a separate auth integration to work with a HappyView instance.

Three new npm packages ship alongside to allow existing atproto SDKs and [`@atproto/lex`](https://npmx.dev/package/%40atproto/lex) to integrate directly with HappyView:

* [**`@happyview/lex-agent`**](https://npmx.dev/package/%40happyview/lex-agent) - Allows [`@atproto/lex`](https://npmx.dev/package/%40atproto/lex) to work directly with HappyView.
* [**`@happyview/oauth-client-browser`**](https://npmx.dev/package/%40happyview/oauth-client-browser) - Integrates directly with [`@atproto/oauth-client-browser`](https://npmx.dev/package/%40atproto/oauth-client-browser) for applications using the classic SDK.
* [**`@happyview/oauth-client`**](https://npmx.dev/package/%40happyview/oauth-client) - For use with [`@atproto/oauth-client`](https://npmx.dev/package/%40atproto/oauth-client) when building custom clients or doing more low-level work.

#### [Plugins: The Beginning](#plugins-the-beginning)

v2 introduces a WebAssembly plugin system for extending HappyView without the need to fork it. Plugins run sandboxed with fuel limits, declare their required secrets and auth type up front, and can be installed from anywhere, including an official registry. Plugins currently only support third-party auth, but they'll eventually be expanded to support many more features, like caching, backfill and real-time, and ingestion. The goal is to keep HappyView small and focused at its core while letting operators build exactly the AppView they need.

#### [And much more...](#and-much-more)

Also new:

* **Labeler integration** built in. Subscribe to labelers over WebSocket, store labels locally.
* **Dead letter queue** for failed index hooks, with retry, re-index, and dismiss actions.
* **Rate limiting** configurable per API client with token buckets.
* **Permission system** with 29 granular permissions across four templates.
* **API client management**, **instance branding**, and **multi-domain support** in the dashboard.
* **Expanded Lua scripting** with new APIs for database queries, HTTP and XRPC calls, and atproto operations.

### [Go get some](#go-get-some)

If you're currently running HappyView v1, breaking changes are listed in the [changelog](https://happyview.dev/reference/changelog). Full documentation is at [happyview.dev](https://happyview.dev). If you're running v1, the [migration guide](https://happyview.dev/guides/upgrading-to-v2) walks through the process.

I hope y'all enjoy the release, and make sure to ping me if you're building something cool with it! ✌️

---
<!--
URL: https://happyview.dev/blog/happyview-2.9
title: HappyView v2.9 | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

## HappyView v2.9

Trigger-keyed scripts, backfill concurrency, db.query filters, multi-device DPoP sessions, plus bugs fixes and performance improvements.

![Trezy](/_next/image?url=%2Fauthors%2Ftrezy.webp&w=48&q=75)Trezy

May 27, 2026

announcements

2.9 is a big one. Scripts got an overhaul, backfill got way faster, and there's a mountain of bug fixes and performance improvements across the board.

### [Trigger-keyed scripts](#trigger-keyed-scripts)

The biggest conceptual change in 2.9: scripts are no longer embedded with lexicons, and lexicons are no longer limited to a single script.

| Trigger | Fires when... |
| --- | --- |
| `record.index:<nsid>` | Any record event (create, update, delete) — the wildcard fallback |
| `record.create:<nsid>` | A record is created |
| `record.update:<nsid>` | A record is updated |
| `record.delete:<nsid>` | A record is deleted |
| `xrpc.query:<nsid>` | An XRPC query is called |
| `xrpc.procedure:<nsid>` | An XRPC procedure is called |
| `labeler.apply:<nsid>` | A label arrives on a record of this type |
| `labeler.apply:_actor` | A label arrives on a bare DID (actor-level) |

For record events, the dispatcher tries the action-specific trigger first (e.g. `record.create:com.example.post`), then falls back to the wildcard `record.index:com.example.post`. This means you can have one general-purpose script that handles everything, or surgical scripts for specific actions — or both.

Scripts are managed through the dashboard under **Settings > Scripts**, or via the new [`/admin/scripts`](/api-reference/admin/scripts) API endpoints. The lexicon detail page also shows which scripts target each lexicon, with links to create or edit them.

**If you're upgrading from v2.x to v2.9:** existing index hooks and lexicon scripts will be migrated to the new system automatically.

Full docs: [Record & Label Scripts](/guides/label-scripts), [Lua Scripting](/guides/lua-scripting), [Admin API — Scripts](/api-reference/admin/scripts).

### [Backfill, but concurrent](#backfill-but-concurrent)

The biggest change is that PDS resolution and record fetching now run concurrently. Previously, HappyView resolved every DID's PDS endpoint before it started fetching any records. For large backfills with hundreds of thousands of DIDs, that meant the fetcher sat idle for potentially hours. Now fetching starts as soon as the first DIDs are resolved and runs alongside resolution for the rest of the job.

On top of that:

* **Pause and resume** — you can now manually pause a running backfill and pick it back up later. No lost progress.
* **Concurrency settings** — new settings in the dashboard let you tune PDS concurrency, DID concurrency per PDS, and PLC directory concurrency. HappyView will recommend a restart if the settings require a larger connection pool than the one currently running.
* **Concurrent collection discovery** — the repo discovery phase now runs multiple collection queries in parallel instead of sequentially.
* **Batch record inserts** — record inserts are now batched, significantly reducing database round trips during the fetch phase.
* **Separate connection pool** — backfill jobs now use their own database connection pool so they can't starve the main app of connections during heavy backfills.

The backfill details view got a significant overhaul: progress indicators are more detailed and more accessible.

### [`db.query` filters](#dbquery-filters)

You can now filter records directly in `db.query` without writing raw SQL or post-processing in Lua:

```
local result = db.query({
  collection = "com.example.post",
  filter = { field = "status", value = "published" },
})
```

Filters support comparison operators (`=`, `!=`, `>`, `<`, `>=`, `<=`), `AND`/`OR` groups, and nesting up to 5 levels deep. Field paths use the same dot notation and array indices as `sort` (e.g. `author.handle`, `scores[0]`).

```
local result = db.query({
  collection = "com.example.post",
  filter = {
    combine = "AND",
    { field = "status", value = "published" },
    { field = "views", op = ">", value = 100 },
  },
})
```

Full docs are in the [Database API reference](/api-reference/lua/database-api).

### [Auth fixes](#auth-fixes)

These were bugs that have been making my life hard, but I *finally* figured out what was causing them.

First, users were basically limited to one auth session per client. If you signed into [Cartridge](https://cartridge.dev) from a second device, it would kill your other auth session. Whoops.

Second, there were scenarios where the PDS may refresh the auth session while a HappyView XRPC was in-progress. If that happened, HappyView would handle it internally so any other requests in that XRPC worked, but *it didn't return the refreshed tokens to the client.* Follow up requests from the client would break. Double whoops.

Both of these are fixed properly now, AND I added a couple new endpoints so clients can allow users to see and manage their active sessions:

* `GET /oauth/sessions/{did}/devices` — list all active sessions
* `DELETE /oauth/sessions/{did}/devices/{session_id}` — revoke a session

The existing `DELETE /oauth/sessions/{did}` endpoint still works: confidential clients revoke all device sessions for the user, and public clients revoke the session matching their DPoP key. Full details in the [Authentication guide](/getting-started/authentication#6-managing-device-sessions).

### [SDK fix](#sdk-fix)

If you tried to use `@happyview/oauth-client` with the latest versions of the `@atproto/*` SDKs, things would break because of a missing parameter. `@happyview/oauth-client` now provides that parameter and should also be backwards-compatible.

### [CI & infrastructure](#ci--infrastructure)

* **Binary releases** — Rust binaries are now published to GitHub Releases alongside Docker images, so you can grab a prebuilt binary directly if you're not into Docker.

### [Contributors](#contributors)

**Huge thanks** to [Chris Pardy](https://bsky.app/profile/chris.pardy.family) for doing the bulk of the work for the new script system. 🥰

### [Go play](#go-play)

Full changelog is on [GitHub](https://github.com/gamesgamesgamesgamesgames/happyview/releases/tag/v2.9.0). If you have questions, feature requests, or just need a little help, join the [Cartridge](https://cartridge.dev) [Discord Server](https://discord.gg/BUPnjaBwRZ) and hop into the `#happyview` channel.

---
<!--
URL: https://happyview.dev/blog/happyview-2.6-and-2.7
title: HappyView v2.6 + v2.7 | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

## HappyView v2.6 + v2.7

Base path support, a Node.js SDK, security hardening, and a pile of quality-of-life fixes.

![Trezy](/_next/image?url=%2Fauthors%2Ftrezy.webp&w=48&q=75)Trezy

May 13, 2026

announcements

Two releases in two days. v2.6, followed closely by v2.7. Neither one has a single marquee feature like [Permissioned Spaces](/blog/happyview-2.5), but together they make the whole system noticeably more solid.

### [Base path support](#base-path-support)

HappyView can now run on a subpath to make it easier to use behind a reverse proxy. If your setup already serves something at the root and you want HappyView at `/appview` or `/api`, that just works now. The dashboard, OAuth flows, and XRPC routes all respect the configured base path.

### [Node.js SDK](#nodejs-sdk)

v2 shipped with browser and generic OAuth client packages. v2.6 added the code for a Node.js-specific OAuth client, and v2.7 published it to npm:

* [**`@happyview/oauth-client-node`**](https://npmx.dev/package/%40happyview/oauth-client-node) — For server-side Node.js applications that need to authenticate against a HappyView instance.

This rounds out the SDK story. You've got [`@happyview/oauth-client-browser`](https://npmx.dev/package/%40happyview/oauth-client-browser) for the browser, [`@happyview/oauth-client`](https://npmx.dev/package/%40happyview/oauth-client) for custom or low-level work, and now `oauth-client-node` for server-side apps. All three SDKs were also updated in v2.6 to more closely match their [`@atproto`](https://github.com/bluesky-social/atproto) counterparts, so if you're already using the official SDK the APIs should feel familiar.

### [Security hardening](#security-hardening)

v2.6 includes a batch of security fixes:

* **Privilege escalation prevention** — closed a path that could allow unauthorized permission changes.
* **JWT expiry precision** — tokens are now rejected at the exact expiry second, not after.
* **Rate limiting before rejection** — unauthenticated procedure requests are rate-limited before being rejected, preventing abuse of error responses.
* **Client key enforcement** — rate limiting is now enforced on all XRPC routes, not just a subset.
* **Space credential scoping** — Bearer space credentials are now restricted to space XRPC routes only.

### [Everything else](#everything-else)

* **TID functions** in Lua scripting for generating and working with [TIDs](https://atproto.com/specs/record-key#record-key-type-tid).
* **XRPC proxy settings** in the dashboard for controlling proxy behavior.
* **Experiments page** in the dashboard for toggling feature flags (like the one behind Permissioned Spaces).
* **Dead letter fixes** — dead letters now always get an ID, fixing an issue where some could be created without one ([#20](https://github.com/gamesgamesgamesgamesgames/happyview/issues/20)).
* **Space pagination** — cursors now work correctly when paginating through spaces.

### [Go get some](#go-get-some)

Full changelogs: [v2.6.0](https://github.com/gamesgamesgamesgamesgames/happyview/releases/tag/v2.6.0), [v2.7.0](https://github.com/gamesgamesgamesgamesgames/happyview/releases/tag/v2.7.0). If you have questions, feature requests, or just need a little help, join the [Cartridge](https://cartridge.dev) [Discord Server](https://discord.gg/BUPnjaBwRZ) and hop into the `#happyview` channel.

---
<!--
URL: https://happyview.dev/blog/happyview-2.8
title: HappyView v2.8 | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

## HappyView v2.8

Backfill cancellation, a rebuilt permission system, and a brand new docs site.

![Trezy](/_next/image?url=%2Fauthors%2Ftrezy.webp&w=48&q=75)Trezy

May 14, 2026

announcements

v2.8 is mostly bug fixes, but Backfills did get a serious overhaul. The permissions page was also rebuilt to be much more useful, and the docs site has a whole new look.

### [Backfills, but like way better](#backfills-but-like-way-better)

Backfills have always *worked*, but at the same time they've been a little quirky. v2.8 rewrites most of the backfill pipeline:

* **Cancellation** — you can now cancel a running backfill. Cancellation is two-phase: the UI requests it, and the worker picks it up at the next checkpoint so nothing gets left in a half-finished state.
* **Resume** — backfills that get interrupted (server restart, crash) now properly resume where they left off instead of silently failing.
* **Retry logic** — rate limits from PDS endpoints and the PLC directory are handled with proper backoff using `RateLimit-Reset` headers, with a capped `retry-after` fallback.
* **Progress tracking** — the dashboard does a better job of communicating a backfill job's current stage (discovering repos, resolving PDS endpoints, fetching records), and it updates much more frequently than it used to.

### [Permission system rebuild](#permission-system-rebuild)

The permission system had a few rough edges. Ghost permissions ([#23](https://github.com/gamesgamesgamesgamesgames/happyview/issues/23)), and some permissions couldn't be toggled after user creation ([#24](https://github.com/gamesgamesgamesgamesgames/happyview/issues/24)). Both are fixed, and the dashboard for managing permissions got a massive refresh.

### [New docs site](#new-docs-site)

The documentation [happyview.dev](https://happyview.dev) has been completely rebuilt on [Fumadocs](https://fumadocs.vercel.app). It's faster, has proper search, multi-language code examples, and a vaporwave theme because fuck yeah. There's also a [blog](/blog) now. You're reading it, and you're welcome.

Oh, the vaporwave theme can be... well it's a lot. The animations, gradients, glows... It does, however, respects `prefers-reduced-motion`, and I've added a toggle to the sidebar to disable motion if you can't or don't otherwise want to enable your `prefers-reduced-motion` setting.

### [Roll that beautiful ~~bean~~ HappyView footage](#roll-that-beautiful-bean-happyview-footage)

Full changelog is on [GitHub](https://github.com/gamesgamesgamesgamesgames/happyview/releases/tag/v2.8.0). If you have questions, feature requests, or just need a little help, join the [Cartridge](https://cartridge.dev) [Discord Server](https://discord.gg/BUPnjaBwRZ) and hop into the `#happyview` channel.

---
<!--
URL: https://happyview.dev/blog/looking-ahead-with-happyview
title: Looking Ahead with HappyView | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

## Looking Ahead with HappyView

What's next on the roadmap for your favorite AppView software?

![Trezy](/_next/image?url=%2Fauthors%2Ftrezy.webp&w=48&q=75)Trezy

July 6, 2026

announcementsroadmap

HappyView is a hell of a project. It's ridiculously fast, it's chock full of **big** features, and it does an excellent job of providing the tools you need and then getting out of your way. I'm proud of everything I've built so far, and I am *so excited* for what's to come.

I'd like to start by taking a look at where we are today, including everything that's been built up to now. After that, I'll dive into what's coming next, and where I'd like HappyView to go in the future.

### [HappyView v1](#happyview-v1)

The first version of HappyView got the job done, but it was *so clunky*. Auth was a mess, running an instance of HappyView required running 3 other pieces of software, and there were bugs everywhere. I don't think I even had tests for that first version.

You could upload lexicons, write some basic scripts, and everything would do what you expected! It was already solid, even if it wasn't pretty. But the experience of actually *running* the thing was rough. You needed HappyView itself, a [Tap](https://github.com/bluesky-social/indigo/tree/main/cmd/tap) server for ingestion, an [AIP](https://github.com/graze-social/aip) server for auth, and a Postgres server that all 3 would share. All of them had to be deployed, configured, and kept in sync. If something broke during a backfill, you were basically on your own. Every time somebody else spun up a HappyView instance I felt like I owed them a handwritten apology.

But v1 proved the idea worked. Upload a lexicon, get a working XRPC API. That was always the promise, and it at least delivered that.

### [HappyView v2](#happyview-v2)

v2 is where HappyView actually became *good*.

The companion services got absorbed — no more Tap, no more AIP, no more keeping three separate deployments in sync. Just one binary. SQLite became the default database so you could spin up a fresh instance with zero external dependencies. The barrier to entry dropped from "configure three services and a database" to "download and run."

The scripting system went from one script per lexicon to a proper [trigger-based system](/guides/lua-scripting) with eight different trigger types. Scripts got their own management interface, their own API endpoints, and access to a full suite of Lua APIs for database queries, HTTP requests, XRPC calls, and atproto operations. If scripting in v1 felt like Baby's First AppView, scripting in v2 feels like an AppView that's all grown up.

Auth got a complete rewrite with DPoP-bound tokens. Backfill went from "start it and pray" to a proper two-phase pipeline with pause, resume, cancellation, concurrent fetching, and real progress tracking. The permission system got rebuilt. The docs site got rebuilt. The dashboard got rebuilt.

Uh... I guess almost everything got rebuilt.

Then there's everything that landed in the point releases: [permissioned spaces](/experimental/spaces), [service identity](/getting-started/service-identity) so your AppView can participate in standard atproto routing, a [background job system](/guides/lua-scripting) for long-running tasks, `db.query` filters so you don't have to write raw SQL for basic lookups, blob utilities for Lua scripts. It's been *a lot*.

I'm really happy with where v2 ended up. It's the version of HappyView I wanted to build from the start.

### [HappyView v3](#happyview-v3)

Once the jobs stuff gets merged, I'll be starting on what I expect to be HappyView v3. Aside from cleaning up a bunch of pieces of the system that need attention, there are 4 big things I want to get done for the v3 release.

#### [Interpreters and libraries as plugins](#interpreters-and-libraries-as-plugins)

You'll be able to install Lua, TypeScript, and/or Rust interpreters! This will allow you to start from scratch with writing your scripts in TypeScript, or even install Lua and Rust at the same time so your existing scripts keep working while you migrate. While I'm only planning for Lua, TypeScript, and Rust out-of-the-gate, it should be possible to add support for any of these languages:

* C/C+
* Go
* Python
* C#/.NET
* Kotlin
* Swift
* Zig
* AssemblyScript
* Ruby
* Haskell
* Grain, Moonbit, Virgil

Libraries (e.g. `atproto.*`, `xrpc.*`, `db.*`, etc) will become their own plugins as well, supported by all interpreters. You may only need a subset of these, but the coolest part will be **community libraries**. If you want to write a plugin to issue labels, or integrate with Ollama, or parse Markdown content, or do some PostGIS magic, etc... it'll be substantially easier with v3. I'll be talking to some folks about setting up a proper package registry as well, making it easy to find and install any kind of plugin.

#### [Filesystem-based management](#filesystem-based-management)

Having to copy/paste your scripts into the dashboard sucks. I know. I also hate it. That's why I wrote my own system to handle deploying scripts and lexicons via the Admin API with Github Actions. It's still not an awesome experience, tho, because I have to wait for jobs to run and requests to complete.

In v3, I'll be adding support for managing your lexicons and scripts directly from the filesystem. Make changes directly to the files on disk and HappyView will live update the system appropriately. That includes lexicons and scripts, AND this allows me to enable `import`s. If you have a function you use across 45 different scripts (it me, I have that), you'll no longer have to copy/paste that function 45 times. You can finally abstract it into its own file and import where desired. That said, the old systems will still work: you can still deploy via the admin API, and you can write and edit your scripts directly in the dashboard.

#### [Database optimization](#database-optimization)

The database currently has one giant table for all records. That means if you're indexing `app.bsky.actor.profile` (40+ million records) but you need to retrieve an `at.youandme.connection` record (~2k records), your query has to page through every single record in your database to get the few you need.

With HappyView v3, each lexicon will get its own table with columns generated from the lexicon structure. Paging through smaller collections will be substantially faster, and `db.raw()` queries will no longer have to do a bunch of `jsonb` voodoo to get the data they need. But don't worry: we'll still store the complete JSON version of the record so you hooligans with non-conforming records can still access all the weird junk you toss in there.

#### [Dashboard refresh](#dashboard-refresh)

The current dashboard *works*, but it's also kind of a mess. I want to take a hard look at everything we currently have and make the system make more sense. I feel like the things that should be next to each other aren't, and a lot of the UI feels sparse in a bad way.

If any of y'all know UI/UX people that would be interested in contributing, I'd *love* to connect with them. Please please *please* give them to me.

### [Get involved](#get-involved)

v3 is gonna be a huge shift in the right direction, and hopefully a really, really awesome improvement for everybody. If anybody is interested in contributing or helping shape the next major version of HappyView, please don't hesitate to reach out! I've not been great at onboarding people to HappyView dev, but I'd love to fix that and get some help up in here.

You can find me on [Bluesky](https://bsky.app/profile/trezy.dev), or hop into the `#happyview` channel on the [Cartridge Discord](https://discord.gg/BUPnjaBwRZ). Let's build something cool. ✌️

---
<!--
URL: https://happyview.dev/blog/happyview-2.10
title: HappyView v2.10 | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

## HappyView v2.10

Service identity, permissioned spaces, and new blob utilities.

![Trezy](/_next/image?url=%2Fauthors%2Ftrezy.webp&w=48&q=75)Trezy

June 30, 2026

announcements

This one's been a long time coming. HappyView finally has a real AT Protocol identity, can do service proxying, and permissioned spaces got a big update to match the official spec.

### [Service identity](#service-identity)

When a user's PDS routes a request to your AppView, it resolves the destination by looking up your DID. Without a service identity, that lookup fails and standard atproto routing can't reach you.

HappyView offers three modes:

* **Domain identity (did:web)** - Your domain name becomes your identity. HappyView generates a signing keypair and serves a DID document at `/.well-known/did.json` automatically. The simplest option.
* **Network identity (did:plc)** - Registers a new identity in the PLC directory. This is the most durable option — it survives domain changes if you ever need to migrate.
* **Linked account** - Link your AppView to an existing AT Protocol account.

With a service identity in place, HappyView can act as a service proxy. A PDS sends a request with an `atproto-proxy` header pointing at your AppView, HappyView verifies the caller via service auth, runs your XRPC handler, and responds. This is how atproto apps are *supposed* to work! Up to this point HappyView only supported direct connections via DPoP.

Full docs: [Service Identity](/getting-started/service-identity).

### [Permissioned spaces alignment](#permissioned-spaces-alignment)

This is the big one. The spaces implementation now aligns with [Dan's proposal](https://github.com/bluesky-social/proposals/pull/94), and if you were using the experimental spaces API before, this is a breaking change.

#### [Namespace split](#namespace-split)

Endpoints moved from `dev.happyview.space.*` to two namespaces:

* **`com.atproto.space.*`** - protocol-level routes (queries, data access, credentials)
* **`com.atproto.simplespace.*`** - management routes (create/update/delete spaces, membership)

The old `dev.happyview.space.*` endpoints will work as aliases until HappyView v3.

#### [Access model rewrite](#access-model-rewrite)

The old `accessMode` / `appAllowlist` / `appDenylist` system is gone.

**Mint policy** controls who can create permissioned repos in a space:

* `member-list` (default) - only members
* `public` - anyone
* `managing-app` - only the managing app

**App access** controls which third-party apps can interact with the space:

* `open` (default) - any app
* `allowList` - only explicitly listed apps

Also, `getMemberGrant` is now `getDelegationToken` (and it's a `GET`, not a `POST`).

#### [New concepts](#new-concepts)

* **Authority DID** replaces `owner_did`. There's also a new `creator_did` for tracking who originally created the space
* **`read_self` access level** - members can only read their own data within the space
* **Deniable commit signatures** - per-user repo state uses LtHash (homomorphic set-hash) with deniable signatures. The user signs context (space + rev + random input keying material), not content
* **Record operation log** - `listRepoOps` returns the oplog for sync
* **Write notifications** - `registerNotify`, `notifyWrite`, `notifySpaceDeleted`

Full docs: [Permissioned Spaces](/experimental/spaces).

### [Blob utilities for Lua](#blob-utilities-for-lua)

Two new Lua functions — `atproto.blob_download` and `atproto.blob_upload` — let scripts perform some new magic. For example, you can migrate a blob one PDS to another in just a couple of lines:

```
local downloaded = atproto.blob_download(source_did, old_cid)
local uploaded = atproto.blob_upload(downloaded.handle, downloaded.mimeType)
local new_blob_ref = uploaded.blob
```

Full docs: [atproto API (`blob_download` / `blob_upload`)](/api-reference/lua/atproto-api#atprotoblob_download).

### [Prefixed database tables](#prefixed-database-tables)

All HappyView tables are now prefixed with `happyview_` (e.g. `records` -> `happyview_records`) so they won't collide with your own tables if you're sharing a database. Existing databases are migrated automatically.

If you use `db.raw()` in Lua scripts to query HappyView tables directly, you'll need to update your queries to use the prefixed names.

### [Everything else](#everything-else)

* **Setup wizard hardening** - the setup flow handles edge cases better, especially around re-auth and preventing unauthenticated redirects
* **Dynamic cookie security** - cookies now set their security flags based on the request context, which fixes some issues with service proxying behind a reverse proxy
* **Bluesky PDS scope handling** - fixed a compat issue with the scope format Bluesky's PDS returns during OAuth

### [Go play](#go-play)

Full changelog is on [GitHub](https://github.com/gamesgamesgamesgamesgames/happyview/releases/tag/v2.10.0). If you have questions, feature requests, or just need a little help, join the [Cartridge](https://cartridge.dev) [Discord Server](https://discord.gg/BUPnjaBwRZ) and hop into the `#happyview` channel.

---
<!--
URL: https://happyview.dev/reference/script-examples/signed-record
title: Signed Record | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Get a Record](/reference/script-examples/get-record)[Create Record](/reference/script-examples/create-record)[Upsert Record](/reference/script-examples/upsert-record)[Paginated List](/reference/script-examples/paginated-list)[List or Fetch](/reference/script-examples/list-or-fetch)[Expanded Query](/reference/script-examples/expanded-query)[Update or Delete](/reference/script-examples/update-or-delete)[Batch Save](/reference/script-examples/batch-save)[Sidecar Records](/reference/script-examples/sidecar-records)[Cascading Delete](/reference/script-examples/cascading-delete)[Complex Mutations](/reference/script-examples/complex-mutations)[Signed Record](/reference/script-examples/signed-record)[Verify Signed Record](/reference/script-examples/signed-record-verify)[Algolia Sync](/reference/script-examples/algolia-sync)[Meilisearch Sync](/reference/script-examples/meilisearch-sync)

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Signed Record

Script Examples

## Signed Record

Save a record with an attestation signature attached.

**Lexicon type:** procedure

```
function handle()
  local r = Record(collection, {
    text = input.text,
    createdAt = now(),
  })
  r:save()

  local sig = nil
  if atproto.sign then
    sig = atproto.sign({ text = input.text, createdAt = r.createdAt })
  end

  return { uri = r._uri, cid = r._cid, signature = sig }
end
```

### [How it works](#how-it-works)

1. Create and save the record.
2. Sign the record fields with [`atproto.sign()`](../../api-reference/lua/atproto-api#atprotosign). The `nil` guard lets the script work without a signer configured.
3. Return the signature alongside the URI.

### [Usage](#usage)

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/xrpc/xyz.example.createPost", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ text: "Hello world" }),
});
const data = await response.json();
```

```
{
  "uri": "at://did:plc:abc/xyz.example.post/3abc123",
  "cid": "bafyrei...",
  "signature": {
    "$type": "your.app.attestation",
    "key": "did:web:happyview.example.com#attestation",
    "signature": { "$bytes": "..." }
  }
}
```

### [Use case](#use-case)

Attestation signatures let clients verify that a record was processed by your HappyView instance — useful for contributions, moderation decisions, or cross-instance data where provenance matters. The signature covers both the record content and the author's DID, so it can't be replayed across users or tampered with.

See [Attestation Signing](../../guides/attestation-signing) for setup and configuration, or [Verify Signed Record](signed-record-verify) for the read-side counterpart.

[Complex Mutations

Previous Page](/reference/script-examples/complex-mutations)[Verify Signed Record

Next Page](/reference/script-examples/signed-record-verify)

#### On this page

[How it works](#how-it-works)[Usage](#usage)[Use case](#use-case)

---
<!--
URL: https://happyview.dev/reference/script-examples/signed-record-verify
title: Verify Signed Record | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Get a Record](/reference/script-examples/get-record)[Create Record](/reference/script-examples/create-record)[Upsert Record](/reference/script-examples/upsert-record)[Paginated List](/reference/script-examples/paginated-list)[List or Fetch](/reference/script-examples/list-or-fetch)[Expanded Query](/reference/script-examples/expanded-query)[Update or Delete](/reference/script-examples/update-or-delete)[Batch Save](/reference/script-examples/batch-save)[Sidecar Records](/reference/script-examples/sidecar-records)[Cascading Delete](/reference/script-examples/cascading-delete)[Complex Mutations](/reference/script-examples/complex-mutations)[Signed Record](/reference/script-examples/signed-record)[Verify Signed Record](/reference/script-examples/signed-record-verify)[Algolia Sync](/reference/script-examples/algolia-sync)[Meilisearch Sync](/reference/script-examples/meilisearch-sync)

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Verify Signed Record

Script Examples

## Verify Signed Record

Fetch a record and verify its attestation signature.

**Lexicon type:** query

```
function handle()
  local record = db.get(params.uri)
  if not record then
    return { error = "not found" }
  end

  local verified = false
  if atproto.verify_signature and record.signature then
    verified = atproto.verify_signature(
      { text = record.text, createdAt = record.createdAt },
      record.signature,
      params.did
    )
  end

  return { record = record, verified = verified }
end
```

### [How it works](#how-it-works)

1. Fetch the record by AT URI.
2. If a signature is present, rebuild the same field table that was signed and verify it with [`atproto.verify_signature()`](../../api-reference/lua/atproto-api#atprotoverify_signature).
3. Return `verified = true` if the signature is valid, `false` if it's missing, invalid, or the signer isn't configured.

### [Usage](#usage)

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "http://127.0.0.1:3000/xrpc/xyz.example.getPost?uri=at://did:plc:abc/xyz.example.post/3abc123&did=did:plc:abc",
);
const data = await response.json();
```

```
{
  "record": {
    "uri": "at://did:plc:abc/xyz.example.post/3abc123",
    "text": "Hello world",
    "createdAt": "2026-04-30T12:00:00Z"
  },
  "verified": true
}
```

### [Use case](#use-case)

Pair this with the [Signed Record](signed-record) procedure to create a write-then-verify flow. The query re-derives the CID from the same fields that were originally signed, so any tampering between write and read is caught.

See [Attestation Signing](../../guides/attestation-signing) for setup and configuration.

[Signed Record

Previous Page](/reference/script-examples/signed-record)[Algolia Sync

Next Page](/reference/script-examples/algolia-sync)

#### On this page

[How it works](#how-it-works)[Usage](#usage)[Use case](#use-case)

---
<!--
URL: https://happyview.dev/index
title: Introduction | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Introduction

## Introduction

HappyView is the best way to build an [AppView](https://atproto.com/guides/glossary#app-view) for the [AT Protocol](https://atproto.com). Upload your [lexicon](reference/glossary#atproto-terms) schemas and get a fully functional AppView, complete with [XRPC](reference/glossary#atproto-terms) endpoints, OAuth, real-time network sync, and historical [backfill](guides/backfill), without writing a single line of server code.

Building an AppView from scratch means wiring up real-time event streams, record storage, XRPC routing, OAuth flows, and PDS write proxying before you can even think about your application. HappyView handles all of that. Define your data model with lexicons, add custom logic with Lua scripts when you need it, and ship your app.

### [Features](#features)

* **Schema-driven endpoints:** Upload a [lexicon](guides/lexicons) and HappyView generates XRPC query and procedure routes, storage, and indexing from it — updatable at runtime with no restart.
* **Network sync built in:** Real-time record streaming via [Jetstream](https://github.com/bluesky-social/jetstream), historical [backfill](guides/backfill) from each user's PDS, and atproto OAuth with DPoP-bound proxy writes back to the PDS.
* **Customize with Lua scripts and plugins:** Trigger-keyed [Lua scripts](guides/lua-scripting) for XRPC query/procedure logic and [record/label event handling](guides/label-scripts), WASM [plugins](guides/plugins) for external platform integration, and [labeler](guides/labelers) subscriptions for content moderation.
* **Protocol-native:** Works with any PDS, resolves DIDs through the directory, and fetches [network lexicons](guides/lexicons#network-lexicons) via DNS authority resolution.
* **Permissioned Spaces:** Experimental support for [AT Protocol Proposal 0016](experimental/spaces/index) — membership-gated data containers with per-user repo state, cross-service credentials, and write notifications.
* **Full admin surface:** Built-in [dashboard](getting-started/dashboard) and [admin API](api-reference/admin/admin-api) for managing lexicons, users, API keys, API clients, backfill jobs, and plugins.

### [Design Principles](#design-principles)

* **Schema-first**: Your Lexicons are the source of truth. Upload a schema and HappyView derives endpoints, indexing rules, and network sync from it. You describe *what* your data looks like; HappyView figures out the rest.
* **Zero boilerplate**: HappyView handles AppView infrastructure (Jetstream, backfill, OAuth, PDS proxying) for you. You should be writing application logic from minute one, not plumbing.
* **Runtime-configurable**: Lexicons can be added, updated, and removed without restarting the server. New endpoints and sync rules take effect immediately, so you can iterate on your data model in real time.
* **Protocol-native**: HappyView works with *any* PDS, resolves DIDs through the directory, and follows atproto conventions. It's a first-class citizen of the network, not a wrapper around it.

### [Next Steps](#next-steps)

* [Quickstart](getting-started/deployment/railway): Deploy HappyView on Railway or run it locally
* [Lexicons](guides/lexicons): Upload lexicon schemas and start indexing records
* [Lua Scripting](guides/lua-scripting): Write custom query and procedure logic
* [Record & Label Scripts](guides/label-scripts): React to record changes and label events in real time
* [Labelers](guides/labelers): Subscribe to external labelers and manage content labels
* [Plugins](guides/plugins): Integrate with external platforms using WASM plugins
* [Permissioned Spaces](experimental/spaces/index): Create membership-gated data containers with the AT Protocol spaces API
* [Event Logs](guides/event-logs): Monitor system activity, debug script errors, and audit admin actions

[Quickstart

Next Page](/getting-started/quickstart)

#### On this page

[Features](#features)[Design Principles](#design-principles)[Next Steps](#next-steps)

---
<!--
URL: https://happyview.dev/reference/script-examples/get-record
title: Get a Record | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Get a Record](/reference/script-examples/get-record)[Create Record](/reference/script-examples/create-record)[Upsert Record](/reference/script-examples/upsert-record)[Paginated List](/reference/script-examples/paginated-list)[List or Fetch](/reference/script-examples/list-or-fetch)[Expanded Query](/reference/script-examples/expanded-query)[Update or Delete](/reference/script-examples/update-or-delete)[Batch Save](/reference/script-examples/batch-save)[Sidecar Records](/reference/script-examples/sidecar-records)[Cascading Delete](/reference/script-examples/cascading-delete)[Complex Mutations](/reference/script-examples/complex-mutations)[Signed Record](/reference/script-examples/signed-record)[Verify Signed Record](/reference/script-examples/signed-record-verify)[Algolia Sync](/reference/script-examples/algolia-sync)[Meilisearch Sync](/reference/script-examples/meilisearch-sync)

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Get a Record

Script Examples

## Get a Record

Fetch a single record by its AT URI.

**Lexicon type:** query

```
function handle()
  if not params.uri then
    return { error = "uri parameter is required" }
  end

  local record = db.get(params.uri)
  if not record then
    return { error = "not found" }
  end

  return { record = record }
end
```

### [How it works](#how-it-works)

1. Check that the `uri` query parameter is present. Return a structured error if missing.
2. Look up the record with [`db.get`](../../api-reference/lua/database-api#dbget), which returns the record table or `nil`.
3. Return the record wrapped in an object.

### [Usage](#usage)

```
GET /xrpc/xyz.statusphere.getRecord?uri=at://did:plc:abc/xyz.statusphere.record/abc123
```

### [Use case](#use-case)

A focused read endpoint for detail views or record verification. Returns structured error responses instead of calling `error()`, so the client gets a 200 with an error field it can handle gracefully rather than a 500.

[Architecture

Previous Page](/reference/architecture)[Create Record

Next Page](/reference/script-examples/create-record)

#### On this page

[How it works](#how-it-works)[Usage](#usage)[Use case](#use-case)

---
<!--
URL: https://happyview.dev/reference/script-examples/update-or-delete
title: Update or Delete | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Get a Record](/reference/script-examples/get-record)[Create Record](/reference/script-examples/create-record)[Upsert Record](/reference/script-examples/upsert-record)[Paginated List](/reference/script-examples/paginated-list)[List or Fetch](/reference/script-examples/list-or-fetch)[Expanded Query](/reference/script-examples/expanded-query)[Update or Delete](/reference/script-examples/update-or-delete)[Batch Save](/reference/script-examples/batch-save)[Sidecar Records](/reference/script-examples/sidecar-records)[Cascading Delete](/reference/script-examples/cascading-delete)[Complex Mutations](/reference/script-examples/complex-mutations)[Signed Record](/reference/script-examples/signed-record)[Verify Signed Record](/reference/script-examples/signed-record-verify)[Algolia Sync](/reference/script-examples/algolia-sync)[Meilisearch Sync](/reference/script-examples/meilisearch-sync)

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Update or Delete

Script Examples

## Update or Delete

A single endpoint that handles create, update, and delete based on the input fields.

**Lexicon type:** procedure

```
function handle()
  if input.delete and input.uri then
    local r = Record.load(input.uri)
    if r then r:delete() end
    return { success = true }
  end

  if input.uri then
    -- Update existing
    local r = Record.load(input.uri)
    if not r then error("not found") end
    r.status = input.status
    r:save()
    return { uri = r._uri, cid = r._cid }
  end

  -- Create new
  local r = Record(collection, input)
  r:save()
  return { uri = r._uri, cid = r._cid }
end
```

### [How it works](#how-it-works)

1. If `input.delete` is truthy and `input.uri` is provided, load the record with [`Record.load`](../../api-reference/lua/record-api#static-methods) and delete it.
2. If only `input.uri` is provided, load the existing record with [`Record.load`](../../api-reference/lua/record-api#static-methods), update its fields, and save it back. Since `_uri` is already set, `r:save()` calls `putRecord` instead of `createRecord`.
3. If neither condition matches, create a new record from the input.

### [Usage](#usage)

**Create:**

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/xrpc/xyz.statusphere.setRecord", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ status: "hello" }),
});
const data = await response.json();
```

**Update:**

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/xrpc/xyz.statusphere.setRecord", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    uri: "at://did:plc:abc/xyz.statusphere.record/abc123",
    status: "updated",
  }),
});
const data = await response.json();
```

**Delete:**

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/xrpc/xyz.statusphere.setRecord", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    uri: "at://did:plc:abc/xyz.statusphere.record/abc123",
    delete: true,
  }),
});
const data = await response.json();
```

### [Use case](#use-case)

This pattern reduces the number of endpoints your app needs by multiplexing create, update, and delete through a single procedure. The presence of `uri` and `delete` fields in the input determines the action.

[Expanded Query

Previous Page](/reference/script-examples/expanded-query)[Batch Save

Next Page](/reference/script-examples/batch-save)

#### On this page

[How it works](#how-it-works)[Usage](#usage)[Use case](#use-case)

---
<!--
URL: https://happyview.dev/reference/script-examples/upsert-record
title: Upsert Record | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Get a Record](/reference/script-examples/get-record)[Create Record](/reference/script-examples/create-record)[Upsert Record](/reference/script-examples/upsert-record)[Paginated List](/reference/script-examples/paginated-list)[List or Fetch](/reference/script-examples/list-or-fetch)[Expanded Query](/reference/script-examples/expanded-query)[Update or Delete](/reference/script-examples/update-or-delete)[Batch Save](/reference/script-examples/batch-save)[Sidecar Records](/reference/script-examples/sidecar-records)[Cascading Delete](/reference/script-examples/cascading-delete)[Complex Mutations](/reference/script-examples/complex-mutations)[Signed Record](/reference/script-examples/signed-record)[Verify Signed Record](/reference/script-examples/signed-record-verify)[Algolia Sync](/reference/script-examples/algolia-sync)[Meilisearch Sync](/reference/script-examples/meilisearch-sync)

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Upsert Record

Script Examples

## Upsert Record

Create a new record, or update an existing one if the client provides its rkey.

**Lexicon type:** procedure

```
function handle()
  local rkey = input.rkey or TID()
  local uri = "at://" .. caller_did .. "/" .. collection .. "/" .. rkey

  local r = Record.load(uri)
  if r then
    -- Update existing record
    r.status = input.status
    r.updatedAt = now()
    r:save()
  else
    -- Create new record
    r = Record(collection, {
      status = input.status,
      createdAt = now(),
      updatedAt = now(),
    })
    r:set_rkey(rkey)
    r:save()
  end

  return { uri = r._uri, cid = r._cid }
end
```

### [How it works](#how-it-works)

1. Use the client-provided `input.rkey` if present, otherwise generate a new [`TID()`](../../guides/lua-scripting#utility-globals). This means omitting `rkey` always creates, while providing one enables updates.
2. Build the AT URI from the caller's DID, the target collection, and the rkey, then try to load it with [`Record.load`](../../api-reference/lua/record-api#static-methods).
3. If the record exists, update its fields and save. Since `_uri` is already set, `r:save()` calls `putRecord`.
4. If it doesn't exist, create a new record, set the rkey explicitly with `r:set_rkey()`, and save. This calls `createRecord` with the specified rkey.

### [Usage](#usage)

**Create** (no rkey, so a new TID is generated):

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/xrpc/xyz.statusphere.setStatus", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ status: "hello" }),
});
const data = await response.json();
// → { "uri": "at://did:plc:abc/xyz.statusphere.status/3abc123", "cid": "bafyrei..." }
```

**Update** (pass the rkey back to update the same record):

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/xrpc/xyz.statusphere.setStatus", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ rkey: "3abc123", status: "updated" }),
});
const data = await response.json();
// → { "uri": "at://did:plc:abc/xyz.statusphere.status/3abc123", "cid": "bafyrei..." }
```

### [Use case](#use-case)

This is useful when the client knows whether it's creating or editing, but you want a single endpoint for both. The client omits `rkey` for new records and includes it when editing an existing one. The rkey from the initial create response acts as the record's stable identifier for future updates.

[Create Record

Previous Page](/reference/script-examples/create-record)[Paginated List

Next Page](/reference/script-examples/paginated-list)

#### On this page

[How it works](#how-it-works)[Usage](#usage)[Use case](#use-case)

---
<!--
URL: https://happyview.dev/reference/script-examples/paginated-list
title: Paginated List | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Get a Record](/reference/script-examples/get-record)[Create Record](/reference/script-examples/create-record)[Upsert Record](/reference/script-examples/upsert-record)[Paginated List](/reference/script-examples/paginated-list)[List or Fetch](/reference/script-examples/list-or-fetch)[Expanded Query](/reference/script-examples/expanded-query)[Update or Delete](/reference/script-examples/update-or-delete)[Batch Save](/reference/script-examples/batch-save)[Sidecar Records](/reference/script-examples/sidecar-records)[Cascading Delete](/reference/script-examples/cascading-delete)[Complex Mutations](/reference/script-examples/complex-mutations)[Signed Record](/reference/script-examples/signed-record)[Verify Signed Record](/reference/script-examples/signed-record-verify)[Algolia Sync](/reference/script-examples/algolia-sync)[Meilisearch Sync](/reference/script-examples/meilisearch-sync)

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Paginated List

Script Examples

## Paginated List

List records from a collection with cursor-based pagination and an optional DID filter.

**Lexicon type:** query

```
function handle()
  local limit = tonumber(params.limit) or 20
  if limit > 100 then limit = 100 end

  local result = db.query({
    collection = collection,
    did = params.did,
    limit = limit,
    cursor = params.cursor,
  })

  return result
end
```

### [How it works](#how-it-works)

1. Parse `limit` from the query string, defaulting to 20 and capping at 100.
2. Call [`db.query`](../../api-reference/lua/database-api#dbquery) with the target collection, optional DID filter, and cursor for pagination.
3. Return the result directly. `db.query` returns `{ records = [...], cursor = "..." }` where `cursor` is an opaque string present when more records exist.

### [Usage](#usage)

```
GET /xrpc/xyz.statusphere.listStatuses
GET /xrpc/xyz.statusphere.listStatuses?limit=50
GET /xrpc/xyz.statusphere.listStatuses?did=did:plc:abc&limit=10
GET /xrpc/xyz.statusphere.listStatuses?cursor=<opaque>&limit=20
```

### [Use case](#use-case)

A list endpoint for feeds, timelines, or browsing records by collection. The `cursor` value returned by `db.query` is an opaque string. Clients pass it back as the `cursor` parameter to fetch the next page — don't parse or modify it.

[Upsert Record

Previous Page](/reference/script-examples/upsert-record)[List or Fetch

Next Page](/reference/script-examples/list-or-fetch)

#### On this page

[How it works](#how-it-works)[Usage](#usage)[Use case](#use-case)

---
<!--
URL: https://happyview.dev/api-reference/lua/json-api
title: JSON API | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

[Record API](/api-reference/lua/record-api)[Database API](/api-reference/lua/database-api)[HTTP API](/api-reference/lua/http-api)[XRPC Lua API](/api-reference/lua/xrpc-lua-api)[atproto API](/api-reference/lua/atproto-api)[JSON API](/api-reference/lua/json-api)[Utility Globals](/api-reference/lua/utility-globals)[Standard Libraries](/api-reference/lua/standard-libraries)

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

JSON API

Lua API

## JSON API

The `json` global provides JSON serialization and deserialization. Available in all [Lua scripts](../../guides/lua-scripting) — queries, procedures, and [record/label scripts](../../guides/label-scripts).

### [json.encode](#jsonencode)

```
local str = json.encode({ key = "value", items = { 1, 2, 3 } })
-- '{"key":"value","items":[1,2,3]}'
```

Converts a Lua table to a JSON string.

### [json.decode](#jsondecode)

```
local tbl = json.decode('{"key": "value"}')
-- tbl.key == "value"
```

Parses a JSON string into a Lua table. Returns an error if the input is not valid JSON.

[atproto API

Previous Page](/api-reference/lua/atproto-api)[Utility Globals

Next Page](/api-reference/lua/utility-globals)

#### On this page

[json.encode](#jsonencode)[json.decode](#jsondecode)

---
<!--
URL: https://happyview.dev/reference/script-examples/complex-mutations
title: Complex Mutations | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Get a Record](/reference/script-examples/get-record)[Create Record](/reference/script-examples/create-record)[Upsert Record](/reference/script-examples/upsert-record)[Paginated List](/reference/script-examples/paginated-list)[List or Fetch](/reference/script-examples/list-or-fetch)[Expanded Query](/reference/script-examples/expanded-query)[Update or Delete](/reference/script-examples/update-or-delete)[Batch Save](/reference/script-examples/batch-save)[Sidecar Records](/reference/script-examples/sidecar-records)[Cascading Delete](/reference/script-examples/cascading-delete)[Complex Mutations](/reference/script-examples/complex-mutations)[Signed Record](/reference/script-examples/signed-record)[Verify Signed Record](/reference/script-examples/signed-record-verify)[Algolia Sync](/reference/script-examples/algolia-sync)[Meilisearch Sync](/reference/script-examples/meilisearch-sync)

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Complex Mutations

Script Examples

## Complex Mutations

Load an existing record, apply multiple transformations, and save it back.

**Lexicon type:** procedure

```
function handle()
  if not input.uri then
    return { error = "uri is required" }
  end

  local r = Record.load(input.uri)
  if not r then
    return { error = "not found" }
  end

  -- Increment a counter
  r.likeCount = (r.likeCount or 0) + 1

  -- Merge tags, deduplicating and capping at 10
  r.tags = r.tags or {}
  if input.tags then
    for _, tag in ipairs(input.tags) do
      local found = false
      for _, t in ipairs(r.tags) do
        if t == tag then
          found = true
          break
        end
      end
      if not found then
        r.tags[#r.tags + 1] = tag
      end
    end
    -- Keep only the last 10
    while #r.tags > 10 do
      table.remove(r.tags, 1)
    end
  end

  -- Normalize a string field
  if input.title then
    r.title = string.gsub(input.title, "^%s+", "")
    r.title = string.gsub(r.title, "%s+$", "")
  end

  -- Set a computed field
  r.updatedAt = now()

  r:save()

  return { uri = r._uri, cid = r._cid }
end
```

### [How it works](#how-it-works)

1. Load the existing record with [`Record.load`](../../api-reference/lua/record-api#static-methods). This gives you a mutable `Record` instance with all the current field values.
2. Apply transformations directly on the record's fields:
   * **Increment a counter**: use `or 0` to handle the field being `nil` on first access.
   * **Merge tags**: iterate over `input.tags`, skip duplicates already in `r.tags`, append new ones, then trim the list to 10.
   * **Normalize a string**: use `string.gsub` to trim whitespace.
   * **Set a timestamp**: use [`now()`](../../guides/lua-scripting#utility-globals) for UTC ISO 8601.
3. Call `r:save()`. Since `_uri` is set (from the load), this calls `putRecord` to update the record on the user's PDS.

### [Usage](#usage)

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/xrpc/xyz.statusphere.updatePost", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    uri: "at://did:plc:abc/xyz.statusphere.post/abc123",
    tags: ["tutorial", "atproto"],
    title: "  My Post Title  ",
  }),
});
const data = await response.json();
```

### [Use case](#use-case)

This pattern is useful when updates involve more than simple field replacement: counters, bounded lists, string normalization, or computed fields. All mutations happen in memory before the single `r:save()` call, so there's no partial save: either all changes are written or none are.

If the record has a schema, HappyView only sends fields defined in the schema's `properties` to the PDS on save. Extra fields you set on the record instance are ignored.

[Cascading Delete

Previous Page](/reference/script-examples/cascading-delete)[Signed Record

Next Page](/reference/script-examples/signed-record)

#### On this page

[How it works](#how-it-works)[Usage](#usage)[Use case](#use-case)

---
<!--
URL: https://happyview.dev/reference/script-examples/create-record
title: Create Record | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Get a Record](/reference/script-examples/get-record)[Create Record](/reference/script-examples/create-record)[Upsert Record](/reference/script-examples/upsert-record)[Paginated List](/reference/script-examples/paginated-list)[List or Fetch](/reference/script-examples/list-or-fetch)[Expanded Query](/reference/script-examples/expanded-query)[Update or Delete](/reference/script-examples/update-or-delete)[Batch Save](/reference/script-examples/batch-save)[Sidecar Records](/reference/script-examples/sidecar-records)[Cascading Delete](/reference/script-examples/cascading-delete)[Complex Mutations](/reference/script-examples/complex-mutations)[Signed Record](/reference/script-examples/signed-record)[Verify Signed Record](/reference/script-examples/signed-record-verify)[Algolia Sync](/reference/script-examples/algolia-sync)[Meilisearch Sync](/reference/script-examples/meilisearch-sync)

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Create Record

Script Examples

## Create Record

The simplest write: take the request body, save it as a record, and return the URI.

**Lexicon type:** procedure

```
function handle()
  local r = Record(collection, input)
  r:save()
  return { uri = r._uri, cid = r._cid }
end
```

### [How it works](#how-it-works)

1. Create a new [`Record`](../../api-reference/lua/record-api) instance from the target collection, populated with the fields from the request body.
2. Call `r:save()`, which creates the record on the caller's PDS and indexes it locally.
3. Return the AT URI and CID of the newly created record.

### [Usage](#usage)

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/xrpc/xyz.statusphere.createRecord", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    text: "Hello world",
    createdAt: "2025-01-01T00:00:00Z",
  }),
});
const data = await response.json();
```

### [Use case](#use-case)

This is the simplest possible write procedure. It works well when the client is responsible for populating all record fields and no server-side validation or transformation is needed.

[Get a Record

Previous Page](/reference/script-examples/get-record)[Upsert Record

Next Page](/reference/script-examples/upsert-record)

#### On this page

[How it works](#how-it-works)[Usage](#usage)[Use case](#use-case)

---
<!--
URL: https://happyview.dev/reference/script-examples/sidecar-records
title: Sidecar Records | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Get a Record](/reference/script-examples/get-record)[Create Record](/reference/script-examples/create-record)[Upsert Record](/reference/script-examples/upsert-record)[Paginated List](/reference/script-examples/paginated-list)[List or Fetch](/reference/script-examples/list-or-fetch)[Expanded Query](/reference/script-examples/expanded-query)[Update or Delete](/reference/script-examples/update-or-delete)[Batch Save](/reference/script-examples/batch-save)[Sidecar Records](/reference/script-examples/sidecar-records)[Cascading Delete](/reference/script-examples/cascading-delete)[Complex Mutations](/reference/script-examples/complex-mutations)[Signed Record](/reference/script-examples/signed-record)[Verify Signed Record](/reference/script-examples/signed-record-verify)[Algolia Sync](/reference/script-examples/algolia-sync)[Meilisearch Sync](/reference/script-examples/meilisearch-sync)

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Sidecar Records

Script Examples

## Sidecar Records

Create two records with different collection NSIDs but the same rkey, linking them together by key.

**Lexicon type:** procedure

```
function handle()
  local rkey = TID()

  local post = Record("xyz.statusphere.post", {
    text = input.text,
    createdAt = now(),
  })
  post:set_rkey(rkey)

  local metadata = Record("xyz.statusphere.postMetadata", {
    lang = input.lang or "en",
    source = input.source or "web",
    createdAt = now(),
  })
  metadata:set_rkey(rkey)

  Record.save_all({ post, metadata })

  return {
    post = { uri = post._uri, cid = post._cid },
    metadata = { uri = metadata._uri, cid = metadata._cid },
  }
end
```

### [How it works](#how-it-works)

1. Generate a single [`TID()`](../../guides/lua-scripting#utility-globals) to use as the rkey for both records.
2. Create a `Record` for each collection and call `r:set_rkey()` with the shared rkey.
3. Save both records in parallel with [`Record.save_all()`](../../api-reference/lua/record-api#static-methods).
4. Return both URIs so the client knows the identity of each record.

### [Usage](#usage)

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/xrpc/xyz.statusphere.createPost", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    text: "Hello world",
    lang: "en",
    source: "web",
  }),
});
const data = await response.json();
```

The response includes URIs for both the post and its metadata:

```
{
  "post": {
    "uri": "at://did:plc:abc/xyz.statusphere.post/3abc123",
    "cid": "bafyrei..."
  },
  "metadata": {
    "uri": "at://did:plc:abc/xyz.statusphere.postMetadata/3abc123",
    "cid": "bafyrei..."
  }
}
```

### [Use case](#use-case)

Sidecar records are useful when you want to associate related data across collections without embedding everything in a single record. Because they share an rkey, you can derive one URI from the other:

```
at:// did:plc:abc /xyz.statusphere.post         /3abc123
at:// did:plc:abc /xyz.statusphere.postMetadata /3abc123
                                                 ^^^^^^^ same rkey
```

This is a common atproto pattern for keeping a primary record lean while storing auxiliary data (metadata, reactions, settings) in a companion collection.

[Batch Save

Previous Page](/reference/script-examples/batch-save)[Cascading Delete

Next Page](/reference/script-examples/cascading-delete)

#### On this page

[How it works](#how-it-works)[Usage](#usage)[Use case](#use-case)

---
<!--
URL: https://happyview.dev/api-reference/lua/xrpc-lua-api
title: XRPC Lua API | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

[Record API](/api-reference/lua/record-api)[Database API](/api-reference/lua/database-api)[HTTP API](/api-reference/lua/http-api)[XRPC Lua API](/api-reference/lua/xrpc-lua-api)[atproto API](/api-reference/lua/atproto-api)[JSON API](/api-reference/lua/json-api)[Utility Globals](/api-reference/lua/utility-globals)[Standard Libraries](/api-reference/lua/standard-libraries)

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

XRPC Lua API

Lua API

## XRPC Lua API

The `xrpc` table provides cross-endpoint XRPC calls. Available in all [Lua scripts](../../guides/lua-scripting) — queries, procedures, and [record/label scripts](../../guides/label-scripts).

### [xrpc.query](#xrpcquery)

```
local resp = xrpc.query("xyz.statusphere.listStatuses", {  -- required: XRPC method name
  limit = 10,                                               -- optional: query parameters
})
```

Calls an XRPC query. If the method matches a locally registered query lexicon, it runs locally. Otherwise, the request is proxied to the NSID's authority.

**Returns:** A table with:

| Field | Type | Description |
| --- | --- | --- |
| `status` | integer | HTTP status code |
| `body` | string | Response body (JSON) |

The body is a raw JSON string — use `json.decode(resp.body)` to parse it.

#### [Examples](#examples)

```
-- Call a local query endpoint
local resp = xrpc.query("xyz.statusphere.listStatuses", { limit = 5 })
local data = json.decode(resp.body)
for _, record in ipairs(data.records) do
  log(record.uri)
end

-- Call without parameters
local resp = xrpc.query("com.example.getConfig")

-- Proxy to a remote XRPC endpoint
local resp = xrpc.query("app.bsky.feed.getAuthorFeed", {
  actor = "did:plc:abc123",
  limit = 10,
})
```

### [xrpc.procedure](#xrpcprocedure)

```
local resp = xrpc.procedure(
  "xyz.statusphere.setStatus",    -- required: XRPC method name
  { status = "hello" },           -- required: request body
  { someParam = "value" }         -- optional: query parameters
)
```

Calls an XRPC procedure using the current request's `caller_did` for authentication. If the method matches a locally registered procedure lexicon, it runs locally. Otherwise, the request is proxied.

Requires a `caller_did` — raises an error without one.

**Returns:** A table with the same shape as `xrpc.query` responses (`status` and `body`).

#### [Examples](#examples-1)

```
-- Call a local procedure
local resp = xrpc.procedure("xyz.statusphere.setStatus", {
  status = "hello",
  createdAt = now(),
})

if resp.status ~= 200 then
  return { error = "failed: " .. resp.body }
end

-- Parse the response
local result = json.decode(resp.body)
return { uri = result.uri }
```

[HTTP API

Previous Page](/api-reference/lua/http-api)[atproto API

Next Page](/api-reference/lua/atproto-api)

#### On this page

[xrpc.query](#xrpcquery)[Examples](#examples)[xrpc.procedure](#xrpcprocedure)[Examples](#examples-1)

---
<!--
URL: https://happyview.dev/api-reference/lua/record-api
title: Record API | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

[Record API](/api-reference/lua/record-api)[Database API](/api-reference/lua/database-api)[HTTP API](/api-reference/lua/http-api)[XRPC Lua API](/api-reference/lua/xrpc-lua-api)[atproto API](/api-reference/lua/atproto-api)[JSON API](/api-reference/lua/json-api)[Utility Globals](/api-reference/lua/utility-globals)[Standard Libraries](/api-reference/lua/standard-libraries)

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Record API

Lua API

## Record API

The `Record` API is available in **procedure**, **query**, and **record/label** scripts. In procedure scripts the full API is available — writes are proxied to the caller's PDS and indexed locally. In query and record/label scripts it runs in **no-auth mode**: `Record.load`, `r:save_local()`, `r:delete_local()`, and `Record.delete_local()` work, but PDS-touching methods (`r:save()`, `r:delete()`) raise an error.

### [Constructor](#constructor)

```
local r = Record("xyz.statusphere.status", { status = "\ud83d\ude0a", createdAt = now() })
```

Creates a new record instance for the given collection. The optional second argument sets initial field values. The record's `_key_type` is automatically set from the lexicon's `key` definition. Default values from the schema are populated for any missing fields.

### [Static methods](#static-methods)

```
-- Save multiple records in parallel
Record.save_all({ record1, record2, record3 })

-- Load a record from the local database by AT URI
local r = Record.load("at://did:plc:abc/xyz.statusphere.status/abc123")
-- Returns nil if not found

-- Load multiple records in parallel
local records = Record.load_all({ uri1, uri2 })
-- Returns nil entries for URIs not found

-- Delete a record from the local database only (no PDS call)
local ok = Record.delete_local("at://did:plc:abc/xyz.statusphere.status/abc123")
-- Returns true if deleted, false if not found
```

### [Instance methods](#instance-methods)

```
-- Save (creates or updates depending on whether _uri is set)
r:save()

-- Delete from PDS and local database
r:delete()

-- Save directly to the local database (no PDS call)
r:save_local()

-- Delete from the local database only (no PDS call)
r:delete_local()

-- Set the repo DID (for no-auth contexts like record/label scripts)
r:set_repo("did:plc:abc")

-- Set the record key type (tid, any, nsid, or literal:*)
r:set_key_type("tid")

-- Set a specific record key
r:set_rkey("my-key")

-- Auto-generate a record key based on _key_type
local key = r:generate_rkey()
```

**Key type behavior for `generate_rkey()`:**

| Key type | Generated rkey |
| --- | --- |
| `tid` | Sortable timestamp-based ID |
| `any` | Same as `tid` |
| `literal:value` | The literal value after the colon |
| `nsid` | Error — use `set_rkey()` instead |

### [Instance fields](#instance-fields)

These fields are set automatically and are read-only (writes raise an error):

| Field | Type | Description |
| --- | --- | --- |
| `_uri` | string? | AT URI — set after `save()`, cleared after `delete()` |
| `_cid` | string? | Content hash — set after `save()`, cleared after `delete()` |
| `_key_type` | string? | Record key type from the lexicon definition |
| `_rkey` | string? | Record key — set via `set_rkey()` or `generate_rkey()` |
| `_collection` | string | Collection NSID (always set) |
| `_schema` | table? | Schema definition from the lexicon (used for validation) |
| `_repo_override` | string? | DID set by `set_repo()`, used in no-auth contexts to target a repo |

### [Schema validation](#schema-validation)

When a record has a schema (loaded from the lexicon):

* **On save:** required fields are checked, and missing required fields raise an error
* **On construction:** default values from schema properties are auto-populated
* **On save:** only fields defined in the schema's `properties` are sent to the PDS

### [Save behavior](#save-behavior)

`r:save()` auto-detects create vs update:

* If `_uri` is nil → calls `createRecord` on the PDS
* If `_uri` is set → calls `putRecord` on the PDS

After a successful save, `_uri` and `_cid` are updated on the record instance.

[Third-Party API Clients

Previous Page](/api-reference/oauth/api-clients)[Database API

Next Page](/api-reference/lua/database-api)

#### On this page

[Constructor](#constructor)[Static methods](#static-methods)[Instance methods](#instance-methods)[Instance fields](#instance-fields)[Schema validation](#schema-validation)[Save behavior](#save-behavior)

---
<!--
URL: https://happyview.dev/reference/script-examples/expanded-query
title: Expanded Query | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Get a Record](/reference/script-examples/get-record)[Create Record](/reference/script-examples/create-record)[Upsert Record](/reference/script-examples/upsert-record)[Paginated List](/reference/script-examples/paginated-list)[List or Fetch](/reference/script-examples/list-or-fetch)[Expanded Query](/reference/script-examples/expanded-query)[Update or Delete](/reference/script-examples/update-or-delete)[Batch Save](/reference/script-examples/batch-save)[Sidecar Records](/reference/script-examples/sidecar-records)[Cascading Delete](/reference/script-examples/cascading-delete)[Complex Mutations](/reference/script-examples/complex-mutations)[Signed Record](/reference/script-examples/signed-record)[Verify Signed Record](/reference/script-examples/signed-record-verify)[Algolia Sync](/reference/script-examples/algolia-sync)[Meilisearch Sync](/reference/script-examples/meilisearch-sync)

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Expanded Query

Script Examples

## Expanded Query

List statuses and include the profile of each user who created one.

**Lexicon type:** query

```
function handle()
  local limit = tonumber(params.limit) or 20
  if limit > 100 then limit = 100 end

  local result = db.query({
    collection = "xyz.statusphere.status",
    did = params.did,
    limit = limit,
    cursor = params.cursor,
  })

  -- Collect unique DIDs from the statuses
  local seen = {}
  local profile_uris = {}
  for _, status in ipairs(result.records) do
    local did = string.match(status.uri, "at://([^/]+)/")
    if did and not seen[did] then
      seen[did] = true
      profile_uris[#profile_uris + 1] = "at://" .. did .. "/app.bsky.actor.profile/self"
    end
  end

  -- Load all profiles in parallel
  local profiles = {}
  if #profile_uris > 0 then
    local loaded = Record.load_all(profile_uris)
    for i, profile in ipairs(loaded) do
      if profile then
        profiles[#profiles + 1] = profile
      end
    end
  end

  return {
    statuses = result.records,
    profiles = profiles,
    cursor = result.cursor,
  }
end
```

### [How it works](#how-it-works)

1. Query statuses from the target collection with pagination, same as a normal list query.
2. Extract the unique DIDs from the returned status URIs using `string.match`.
3. Build an AT URI for each DID's `app.bsky.actor.profile/self` record (this is where Bluesky profiles live).
4. Load all profiles in parallel with [`Record.load_all`](../../api-reference/lua/record-api#static-methods). Profiles that aren't indexed locally return `nil` and are skipped.
5. Return statuses and profiles as separate keys, with the cursor from the status query.

### [Usage](#usage)

```
GET /xrpc/xyz.statusphere.listStatusesWithProfiles?limit=10
GET /xrpc/xyz.statusphere.listStatusesWithProfiles?did=did:plc:abc
GET /xrpc/xyz.statusphere.listStatusesWithProfiles?cursor=<opaque>&limit=20
```

```
{
  "statuses": [
    { "uri": "at://did:plc:abc/xyz.statusphere.status/3abc123", "status": "😊", "createdAt": "..." },
    { "uri": "at://did:plc:def/xyz.statusphere.status/3def456", "status": "🌟", "createdAt": "..." }
  ],
  "profiles": [
    { "uri": "at://did:plc:abc/app.bsky.actor.profile/self", "displayName": "Alice", "avatar": "..." },
    { "uri": "at://did:plc:def/app.bsky.actor.profile/self", "displayName": "Bob", "avatar": "..." }
  ],
  "cursor": "MjAyNi0wMS0wMVQxMjowMDowMFp8YXQ6Ly9kaWQ6..."
}
```

### [Use case](#use-case)

This avoids N+1 queries on the client side — the client gets statuses and profiles in one call. The deduplication step loads each profile only once even if multiple statuses share an author.

`Record.load_all` reads from HappyView's local index. Profiles only appear if `app.bsky.actor.profile` is also indexed. Missing profiles are skipped.

[List or Fetch

Previous Page](/reference/script-examples/list-or-fetch)[Update or Delete

Next Page](/reference/script-examples/update-or-delete)

#### On this page

[How it works](#how-it-works)[Usage](#usage)[Use case](#use-case)

---
<!--
URL: https://happyview.dev/reference/script-examples/list-or-fetch
title: List or Fetch | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Get a Record](/reference/script-examples/get-record)[Create Record](/reference/script-examples/create-record)[Upsert Record](/reference/script-examples/upsert-record)[Paginated List](/reference/script-examples/paginated-list)[List or Fetch](/reference/script-examples/list-or-fetch)[Expanded Query](/reference/script-examples/expanded-query)[Update or Delete](/reference/script-examples/update-or-delete)[Batch Save](/reference/script-examples/batch-save)[Sidecar Records](/reference/script-examples/sidecar-records)[Cascading Delete](/reference/script-examples/cascading-delete)[Complex Mutations](/reference/script-examples/complex-mutations)[Signed Record](/reference/script-examples/signed-record)[Verify Signed Record](/reference/script-examples/signed-record-verify)[Algolia Sync](/reference/script-examples/algolia-sync)[Meilisearch Sync](/reference/script-examples/meilisearch-sync)

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

List or Fetch

Script Examples

## List or Fetch

This query handles both single-record lookups (when a `uri` param is provided) and paginated listing.

**Lexicon type:** query

```
function handle()
  if params.uri then
    local record = db.get(params.uri)
    if not record then
      return { error = "record not found" }
    end
    return { record = record }
  end

  return db.query({
    collection = collection,
    did = params.did,
    limit = tonumber(params.limit) or 20,
    cursor = params.cursor,
  })
end
```

### [How it works](#how-it-works)

1. If a `uri` query parameter is provided, fetch that single record with [`db.get`](../../api-reference/lua/database-api#dbget) and return it. If it doesn't exist, return a structured error (using `error()` would trigger a 500 response).
2. Otherwise, list records from the target collection using [`db.query`](../../api-reference/lua/database-api#dbquery), with optional filtering by `did` and cursor-based pagination. The `cursor` is an opaque string from a previous response — pass it through directly. Since `limit` arrives as a string, `tonumber()` converts it to a number.

### [Usage](#usage)

```
GET /xrpc/xyz.statusphere.listRecords?limit=10
GET /xrpc/xyz.statusphere.listRecords?did=did:plc:abc
GET /xrpc/xyz.statusphere.listRecords?uri=at://did:plc:abc/xyz.statusphere.record/abc123
```

### [Use case](#use-case)

Useful when one endpoint needs to handle both listing and single-record fetches.

[Paginated List

Previous Page](/reference/script-examples/paginated-list)[Expanded Query

Next Page](/reference/script-examples/expanded-query)

#### On this page

[How it works](#how-it-works)[Usage](#usage)[Use case](#use-case)

---
<!--
URL: https://happyview.dev/reference/script-examples/cascading-delete
title: Cascading Delete | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Get a Record](/reference/script-examples/get-record)[Create Record](/reference/script-examples/create-record)[Upsert Record](/reference/script-examples/upsert-record)[Paginated List](/reference/script-examples/paginated-list)[List or Fetch](/reference/script-examples/list-or-fetch)[Expanded Query](/reference/script-examples/expanded-query)[Update or Delete](/reference/script-examples/update-or-delete)[Batch Save](/reference/script-examples/batch-save)[Sidecar Records](/reference/script-examples/sidecar-records)[Cascading Delete](/reference/script-examples/cascading-delete)[Complex Mutations](/reference/script-examples/complex-mutations)[Signed Record](/reference/script-examples/signed-record)[Verify Signed Record](/reference/script-examples/signed-record-verify)[Algolia Sync](/reference/script-examples/algolia-sync)[Meilisearch Sync](/reference/script-examples/meilisearch-sync)

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Cascading Delete

Script Examples

## Cascading Delete

Delete a record and all related records across collections.

**Lexicon type:** procedure

```
function handle()
  if not input.uri then
    return { error = "uri is required" }
  end

  -- Load the primary record
  local primary = Record.load(input.uri)
  if not primary then
    return { error = "not found" }
  end

  -- Find related records that reference this URI
  local comments = db.query({
    collection = "xyz.statusphere.comment",
    did = caller_did,
    limit = 100,
  })

  -- Collect records to delete
  local to_delete = { primary }
  for _, comment in ipairs(comments.records) do
    if comment.postUri == input.uri then
      local r = Record.load(comment.uri)
      if r then
        to_delete[#to_delete + 1] = r
      end
    end
  end

  -- Delete all matched records
  for _, r in ipairs(to_delete) do
    r:delete()
  end

  return {
    deleted = #to_delete,
  }
end
```

### [How it works](#how-it-works)

1. Load the primary record by URI. Return early if it doesn't exist.
2. Query for related records, in this example comments by the same user that reference the primary record's URI.
3. Load each related record with [`Record.load`](../../api-reference/lua/record-api#static-methods) to get a deletable `Record` instance.
4. Delete everything. Each `r:delete()` removes the record from the user's PDS and the local index.

### [Usage](#usage)

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/xrpc/xyz.statusphere.deletePost", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    uri: "at://did:plc:abc/xyz.statusphere.post/abc123",
  }),
});
const data = await response.json();
```

```
{
  "deleted": 4
}
```

### [Use case](#use-case)

Cascading deletes are useful when your data model has parent-child relationships across collections. For example, deleting a post should also clean up its comments, reactions, or metadata records. This keeps the user's repo and the local index consistent.

Note that this only deletes records owned by `caller_did`. atproto records can only be deleted by their owner. If the related records could have more than 100 matches, paginate through all of them before deleting.

[Sidecar Records

Previous Page](/reference/script-examples/sidecar-records)[Complex Mutations

Next Page](/reference/script-examples/complex-mutations)

#### On this page

[How it works](#how-it-works)[Usage](#usage)[Use case](#use-case)

---
<!--
URL: https://happyview.dev/api-reference/lua/database-api
title: Database API | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

[Record API](/api-reference/lua/record-api)[Database API](/api-reference/lua/database-api)[HTTP API](/api-reference/lua/http-api)[XRPC Lua API](/api-reference/lua/xrpc-lua-api)[atproto API](/api-reference/lua/atproto-api)[JSON API](/api-reference/lua/json-api)[Utility Globals](/api-reference/lua/utility-globals)[Standard Libraries](/api-reference/lua/standard-libraries)

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Database API

Lua API

## Database API

The `db` table provides access to the database. Available in all [Lua scripts](../../guides/lua-scripting) — queries, procedures, and [record/label scripts](../../guides/label-scripts).

### [db.query](#dbquery)

```
local result = db.query({
  collection = "xyz.statusphere.status",  -- required
  did = "did:plc:abc",                    -- optional: filter by DID
  limit = 20,                             -- optional: max 100, default 20
  cursor = params.cursor,                 -- optional: opaque cursor from a previous response
  sort = "name",                          -- optional: field to sort by, default "indexed_at"
  sortDirection = "asc",                  -- optional: "asc" or "desc", default "desc"
  filter = { field = "status", value = "active" },  -- optional: filter conditions
})

-- result.records — array of record tables (each includes a "uri" field)
-- result.cursor — present when more records exist (opaque string, pass back as-is)
```

The `cursor` is an opaque string returned in a previous response. Pass it through directly — don't parse or modify it. When no `sort` field is specified, `db.query` uses keyset pagination (based on `created_at` and `uri`), which is stable even when records are inserted between pages. When a custom `sort` field is specified, offset-based pagination is used instead.

The `sort` field can be a top-level column (`indexed_at`, `did`, `uri`) or any field inside the record (e.g. `name`, `createdAt`). Nested paths are supported with dot notation and array indices (e.g. `author.handle`, `scores[0]`).

#### [Filtering](#filtering)

The `filter` option lets you restrict results by record field values. Field names correspond to the fields defined in your lexicon schema (e.g. `streamer`, `status`, `viewers`).

**Simple condition** — match a single field (operator defaults to `=`):

```
db.query({
  collection = "xyz.statusphere.status",
  filter = { field = "streamer", value = "did:plc:abc" },
})
```

**With operator** — specify a comparison operator:

```
db.query({
  collection = "xyz.statusphere.status",
  filter = { field = "viewers", op = ">", value = 100 },
})
```

Supported operators: `=`, `!=`, `<`, `>`, `<=`, `>=`, `LIKE`, `NOT LIKE`.

**Combining conditions** — group multiple conditions with `AND` or `OR`:

```
db.query({
  collection = "xyz.statusphere.status",
  filter = {
    combine = "AND",
    { field = "streamer", value = "did:plc:abc" },
    { field = "viewers", op = ">", value = 50 },
  },
})
```

When `combine` is omitted it defaults to `"AND"`.

**Nesting** — groups can contain other groups, up to 5 levels deep:

```
db.query({
  collection = "xyz.statusphere.status",
  filter = {
    combine = "AND",
    { field = "streamer", value = "did:plc:abc" },
    {
      combine = "OR",
      { field = "status", value = "live" },
      { field = "viewers", op = ">=", value = 100 },
    },
  },
})
```

This matches records where `streamer` is `did:plc:abc` **and** either `status` is `live` **or** `viewers` is at least 100.

Field names support dot notation for nested objects and bracket syntax for array indices:

```
-- Nested object field
filter = { field = "author.handle", value = "alice.bsky.social" }

-- Array index
filter = { field = "tags[0]", value = "gaming" }

-- Combined
filter = { field = "links[0].url", op = "LIKE", value = "%twitch.tv%" }
```

Each path segment must be alphanumeric or underscores. Values can be strings, numbers, or booleans.

### [db.get](#dbget)

```
local record = db.get("at://did:plc:abc/xyz.statusphere.status/abc123")
-- Returns the record table or nil
-- The returned table includes a "uri" field
```

### [db.search](#dbsearch)

```
local result = db.search({
  collection = "xyz.statusphere.status",  -- required
  field = "displayName",                  -- required: record field to search
  query = "alice",                        -- required: search term
  limit = 10,                             -- optional: max 100, default 10
})

-- result.records — array of matching records, ranked by relevance:
--   exact match > prefix match > contains match, then alphabetical
```

### [db.backlinks](#dbbacklinks)

Find records that reference a given AT URI anywhere in their data. Useful for finding likes on a post, replies to a thread, or any record that links to another.

```
local result = db.backlinks({
  collection = "xyz.statusphere.status",                -- required
  uri = "at://did:plc:abc/xyz.statusphere.status/foo",  -- required: the URI to find references to
  did = "did:plc:abc",                                  -- optional: filter by DID
  limit = 20,                                           -- optional: max 100, default 20
  cursor = params.cursor,                               -- optional: opaque cursor from a previous response
})

-- result.records — array of records whose data contains the given URI
-- result.cursor — present when more records exist (opaque string, pass back as-is)
```

The search checks the full record data, so it works regardless of which field holds the reference (`subject`, `parent`, `reply.root`, etc.).

### [db.count](#dbcount)

```
local n = db.count("xyz.statusphere.status")
local n = db.count("xyz.statusphere.status", "did:plc:abc")  -- filter by DID
```

### [db.raw](#dbraw)

Run a raw SQL query against the database. Supports `SELECT`, `INSERT`, `UPDATE`, `DELETE`, and `CREATE TABLE` statements.

```
-- Read query
local rows = db.raw(
  "SELECT uri, did, record FROM happyview_records WHERE collection = $1 AND did = $2 LIMIT $3",
  { "xyz.statusphere.status", "did:plc:abc", 10 }
)

for _, row in ipairs(rows) do
  -- row.uri, row.did, row.record (JSONB is returned as a Lua table)
end

-- Write query (returns affected rows, if any)
db.raw("CREATE TABLE IF NOT EXISTS my_table (id TEXT PRIMARY KEY, value TEXT NOT NULL)")
db.raw("INSERT INTO my_table (id, value) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET value = $2",
  { "key1", "hello" })
```

Parameters are passed as an array and bound to `$1`, `$2`, etc. Supported parameter types: strings, integers, numbers, booleans, and nil.

#### [SQL dialect](#sql-dialect)

Unlike the structured API methods (`db.query`, `db.get`, etc.), `db.raw` does **not** translate SQL between backends. Write native SQL for the database you're running against — `$1`/`$2` placeholders for Postgres, `?` for SQLite. Use `db.backend()` to branch when you need to support both.

#### [Column type mapping](#column-type-mapping)

| SQLite type | Postgres type | Lua type |
| --- | --- | --- |
| `TEXT` | `TEXT`, `VARCHAR` | string |
| `INTEGER` | `INT4`, `INT8` | integer |
| `REAL` | `FLOAT4`, `FLOAT8` | number |
| `INTEGER` (0/1) | `BOOL` | boolean |
| `TEXT` (JSON) | `JSON`, `JSONB` | table |
| `TEXT` (ISO 8601) | `TIMESTAMPTZ` | string (ISO 8601) |
| Other | Other | string (fallback) |

### [db.backend](#dbbackend)

```
local backend = db.backend()
-- "sqlite" or "postgres"
```

Returns `"sqlite"` or `"postgres"`. Useful when you need database-specific SQL that can't be automatically translated.

```
if db.backend() == "postgres" then
  db.raw("SELECT * FROM happyview_records WHERE record @> $1::jsonb", { json.encode({ status = "active" }) })
else
  -- SQLite fallback
  db.raw("SELECT * FROM happyview_records WHERE json_extract(record, '$.status') = $1", { "active" })
end
```

[Record API

Previous Page](/api-reference/lua/record-api)[HTTP API

Next Page](/api-reference/lua/http-api)

#### On this page

[db.query](#dbquery)[Filtering](#filtering)[db.get](#dbget)[db.search](#dbsearch)[db.backlinks](#dbbacklinks)[db.count](#dbcount)[db.raw](#dbraw)[SQL dialect](#sql-dialect)[Column type mapping](#column-type-mapping)[db.backend](#dbbackend)

---
<!--
URL: https://happyview.dev/api-reference/lua/utility-globals
title: Utility Globals | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

[Record API](/api-reference/lua/record-api)[Database API](/api-reference/lua/database-api)[HTTP API](/api-reference/lua/http-api)[XRPC Lua API](/api-reference/lua/xrpc-lua-api)[atproto API](/api-reference/lua/atproto-api)[JSON API](/api-reference/lua/json-api)[Utility Globals](/api-reference/lua/utility-globals)[Standard Libraries](/api-reference/lua/standard-libraries)

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Utility Globals

Lua API

## Utility Globals

Global functions available in all [Lua scripts](../../guides/lua-scripting) — queries, procedures, and [record/label scripts](../../guides/label-scripts). These don't belong to a specific API table — they're available at the top level of any script.

### [now](#now)

```
local timestamp = now()
-- "2026-04-19T15:30:00Z"
```

Returns the current UTC time as an ISO 8601 string. Use this for `createdAt`, `updatedAt`, and similar timestamp fields.

### [log](#log)

```
log("processing record: " .. uri)
log("count: " .. tostring(n))
```

Writes a message to the server logs at debug level and records a `script.log` event in the [event logs](../../api-reference/admin/events). Useful for debugging scripts during development. Log output appears in HappyView's stdout and is also accessible via `GET /admin/events`.

### [TID](#tid)

```
local id = TID()
-- "3abc123def456"
```

Generates a fresh atproto TID (Timestamp Identifier) — a 13-character, base32-sortable string derived from the current timestamp. TIDs are the standard record key format in atproto. Use this when creating records with a specific rkey:

```
local r = Record(collection, { text = "hello" })
r:set_rkey(TID())
r:save()
```

#### [TID.toISO8601](#tidtoiso8601)

```
local iso = TID.toISO8601(tid)
-- "2026-04-19T15:30:00.123456Z"
```

Converts a TID to an ISO 8601 timestamp string with microsecond precision. This is lossy — the 10-bit clock ID embedded in the TID is discarded.

#### [TID.fromISO8601](#tidfromiso8601)

```
local tid = TID.fromISO8601("2026-04-19T15:30:00Z")
```

Creates a TID from an ISO 8601 timestamp string. Accepts timezone offsets and fractional seconds. The resulting TID uses a zero clock ID, so it won't match any specific generated TID but will sort correctly relative to TIDs from the same moment.

#### [TID.toUnixMicroseconds](#tidtounixmicroseconds)

```
local us = TID.toUnixMicroseconds(tid)
-- 1745074200123456
```

Extracts the microsecond timestamp from a TID (microseconds since the Unix epoch). Lossy — drops the clock ID.

#### [TID.fromUnixMicroseconds](#tidfromunixmicroseconds)

```
local tid = TID.fromUnixMicroseconds(1745074200123456)
```

Creates a TID from a microsecond timestamp. Uses a zero clock ID.

#### [TID.toNumber](#tidtonumber)

```
local n = TID.toNumber(tid)
local same_tid = TID.fromNumber(n)
-- same_tid == tid
```

Decodes a TID to its full numeric representation (timestamp + clock ID). This is the only lossless conversion — `TID.fromNumber(TID.toNumber(tid))` always returns the original TID.

#### [TID.fromNumber](#tidfromnumber)

```
local tid = TID.fromNumber(n)
```

Encodes a number back into a TID. Inverse of `TID.toNumber`.

### [toarray](#toarray)

```
return { items = toarray(results) }
```

Marks a Lua table so it serializes as a JSON array rather than a JSON object. This matters for empty tables — without `toarray`, an empty `{}` becomes a JSON object `{}` instead of an array `[]`.

```
-- Without toarray:
return { items = {} }
-- → {"items": {}}

-- With toarray:
return { items = toarray({}) }
-- → {"items": []}
```

You don't need `toarray()` on results from `db.query`, `db.search`, `db.backlinks`, or `db.raw` — those already return properly marked arrays. Use it when you build a table yourself with `table.insert()` or array-index assignment.

[JSON API

Previous Page](/api-reference/lua/json-api)[Standard Libraries

Next Page](/api-reference/lua/standard-libraries)

#### On this page

[now](#now)[log](#log)[TID](#tid)[TID.toISO8601](#tidtoiso8601)[TID.fromISO8601](#tidfromiso8601)[TID.toUnixMicroseconds](#tidtounixmicroseconds)[TID.fromUnixMicroseconds](#tidfromunixmicroseconds)[TID.toNumber](#tidtonumber)[TID.fromNumber](#tidfromnumber)[toarray](#toarray)

---
<!--
URL: https://happyview.dev/api-reference/lua/http-api
title: HTTP API | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

[Record API](/api-reference/lua/record-api)[Database API](/api-reference/lua/database-api)[HTTP API](/api-reference/lua/http-api)[XRPC Lua API](/api-reference/lua/xrpc-lua-api)[atproto API](/api-reference/lua/atproto-api)[JSON API](/api-reference/lua/json-api)[Utility Globals](/api-reference/lua/utility-globals)[Standard Libraries](/api-reference/lua/standard-libraries)

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

HTTP API

Lua API

## HTTP API

The `http` table provides async HTTP client functions. Available in all [Lua scripts](../../guides/lua-scripting) — queries, procedures, and [record/label scripts](../../guides/label-scripts).

### [Methods](#methods)

All methods take a URL and an optional options table, and return a [response table](#response).

```
http.get(url, opts?)
http.post(url, opts?)
http.put(url, opts?)
http.patch(url, opts?)
http.delete(url, opts?)
http.head(url, opts?)
```

### [Options](#options)

The optional second argument is a table with:

| Field | Type | Description |
| --- | --- | --- |
| `headers` | table | Request headers as key-value string pairs |
| `body` | string | Request body (ignored for GET and HEAD) |

### [Response](#response)

Every method returns a table with:

| Field | Type | Description |
| --- | --- | --- |
| `status` | integer | HTTP status code |
| `body` | string | Response body text (empty string for HEAD) |
| `headers` | table | Response headers as key-value pairs (lowercase keys) |

### [Examples](#examples)

```
-- Simple GET
local resp = http.get("https://api.example.com/data")
-- resp.status = 200, resp.body = "...", resp.headers["content-type"] = "application/json"

-- GET with custom headers
local resp = http.get("https://api.example.com/data", {
  headers = { ["authorization"] = "Bearer token123" }
})

-- POST with JSON body
local resp = http.post("https://api.example.com/hook", {
  body = '{"key": "value"}',
  headers = { ["content-type"] = "application/json" }
})

-- PUT, PATCH, DELETE, HEAD follow the same pattern
local resp = http.put(url, { body = data, headers = { ... } })
local resp = http.patch(url, { body = data, headers = { ... } })
local resp = http.delete(url, { headers = { ... } })
local resp = http.head(url)
```

[Database API

Previous Page](/api-reference/lua/database-api)[XRPC Lua API

Next Page](/api-reference/lua/xrpc-lua-api)

#### On this page

[Methods](#methods)[Options](#options)[Response](#response)[Examples](#examples)

---
<!--
URL: https://happyview.dev/reference/script-examples/algolia-sync
title: Algolia Sync | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Get a Record](/reference/script-examples/get-record)[Create Record](/reference/script-examples/create-record)[Upsert Record](/reference/script-examples/upsert-record)[Paginated List](/reference/script-examples/paginated-list)[List or Fetch](/reference/script-examples/list-or-fetch)[Expanded Query](/reference/script-examples/expanded-query)[Update or Delete](/reference/script-examples/update-or-delete)[Batch Save](/reference/script-examples/batch-save)[Sidecar Records](/reference/script-examples/sidecar-records)[Cascading Delete](/reference/script-examples/cascading-delete)[Complex Mutations](/reference/script-examples/complex-mutations)[Signed Record](/reference/script-examples/signed-record)[Verify Signed Record](/reference/script-examples/signed-record-verify)[Algolia Sync](/reference/script-examples/algolia-sync)[Meilisearch Sync](/reference/script-examples/meilisearch-sync)

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Algolia Sync

Script Examples

## Algolia Sync

Push records to an Algolia search index whenever they are created, updated, or deleted on the network.

**Script type:** record event (e.g. `record.index:<nsid>`)

```
function handle()
  local headers = {
    ["X-Algolia-API-Key"] = "your-api-key",
    ["X-Algolia-Application-Id"] = "your-app-id",
    ["Content-Type"] = "application/json"
  }

  if action == "delete" then
    http.delete("https://YOUR-APP.algolia.net/1/indexes/records/" .. uri, {
      headers = headers
    })
  else
    http.put("https://YOUR-APP.algolia.net/1/indexes/records/" .. uri, {
      headers = headers,
      body = json.encode({
        objectID = uri,
        collection = collection,
        did = did,
        record = record
      })
    })
  end

  return record
end
```

### [How it works](#how-it-works)

1. On **create** or **update**: sends a `PUT` request to Algolia's index API with the record data, using the AT URI as the `objectID`. Algolia upserts the object — if it already exists, it's replaced.
2. On **delete**: sends a `DELETE` request to remove the object from the index by its AT URI.

The `json.encode()` function converts the Lua table into a JSON string for the request body. See [JSON API](../../api-reference/lua/json-api).

### [Configuration](#configuration)

Replace the placeholder values:

| Placeholder | Value |
| --- | --- |
| `your-api-key` | Your Algolia Admin API key (with write permissions) |
| `your-app-id` | Your Algolia Application ID |
| `YOUR-APP` | Your Algolia application subdomain (same as the Application ID) |
| `records` | The Algolia index name (choose any name you like) |

### [Use case](#use-case)

This hook keeps an external search index in sync with your indexed records in real time. Users searching through Algolia get results that reflect the latest state of the network without polling or scheduled jobs.

Combine this with a [query script](../../guides/lua-scripting) that searches Algolia instead of the local database for a full-text search experience that goes beyond what `db.search` offers.

[Verify Signed Record

Previous Page](/reference/script-examples/signed-record-verify)[Meilisearch Sync

Next Page](/reference/script-examples/meilisearch-sync)

#### On this page

[How it works](#how-it-works)[Configuration](#configuration)[Use case](#use-case)

---
<!--
URL: https://happyview.dev/reference/script-examples/batch-save
title: Batch Save | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Get a Record](/reference/script-examples/get-record)[Create Record](/reference/script-examples/create-record)[Upsert Record](/reference/script-examples/upsert-record)[Paginated List](/reference/script-examples/paginated-list)[List or Fetch](/reference/script-examples/list-or-fetch)[Expanded Query](/reference/script-examples/expanded-query)[Update or Delete](/reference/script-examples/update-or-delete)[Batch Save](/reference/script-examples/batch-save)[Sidecar Records](/reference/script-examples/sidecar-records)[Cascading Delete](/reference/script-examples/cascading-delete)[Complex Mutations](/reference/script-examples/complex-mutations)[Signed Record](/reference/script-examples/signed-record)[Verify Signed Record](/reference/script-examples/signed-record-verify)[Algolia Sync](/reference/script-examples/algolia-sync)[Meilisearch Sync](/reference/script-examples/meilisearch-sync)

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Batch Save

Script Examples

## Batch Save

Use `Record.save_all()` to create multiple records in parallel.

**Lexicon type:** procedure

```
function handle()
  local records = {}
  for _, item in ipairs(input.items) do
    local r = Record(collection, item)
    records[#records + 1] = r
  end
  Record.save_all(records)

  local uris = {}
  for _, r in ipairs(records) do
    uris[#uris + 1] = r._uri
  end
  return { uris = uris }
end
```

### [How it works](#how-it-works)

1. Iterate over `input.items` and create a [`Record`](../../api-reference/lua/record-api) instance for each item.
2. Call [`Record.save_all()`](../../api-reference/lua/record-api#static-methods) to save all records in parallel, rather than one at a time.
3. Collect the resulting AT URIs and return them.

### [Usage](#usage)

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/xrpc/xyz.statusphere.batchCreate", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    items: [
      { text: "First", createdAt: "2025-01-01T00:00:00Z" },
      { text: "Second", createdAt: "2025-01-01T00:01:00Z" },
    ],
  }),
});
const data = await response.json();
```

### [Use case](#use-case)

Batch saving is useful when a single user action should create multiple records (e.g. importing data, multi-step forms). `save_all` is significantly faster than calling `r:save()` in a loop because the PDS writes happen concurrently.

[Update or Delete

Previous Page](/reference/script-examples/update-or-delete)[Sidecar Records

Next Page](/reference/script-examples/sidecar-records)

#### On this page

[How it works](#how-it-works)[Usage](#usage)[Use case](#use-case)

---
<!--
URL: https://happyview.dev/guides/database/database-setup
title: Database Setup | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

[Database Setup](/guides/database/database-setup)[Postgres to SQLite Migration](/guides/database/postgres-to-sqlite-migration)[SQLite to Postgres Migration](/guides/database/sqlite-to-postgres-migration)

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Database Setup

Database

## Database Setup

HappyView supports two database backends: **SQLite** (default) and **PostgreSQL**. The backend is auto-detected from your `DATABASE_URL` scheme, or you can set `DATABASE_BACKEND` explicitly.

### [SQLite (default)](#sqlite-default)

SQLite requires zero setup. HappyView creates the database file automatically on first startup.

```
DATABASE_URL=sqlite://data/happyview.db?mode=rwc
```

The `?mode=rwc` parameter tells SQLite to create the file if it does not exist. The path is relative to the working directory (or use an absolute path).

**When to use SQLite:**

* Getting started or local development
* Small to medium deployments
* Single-server setups where simplicity is preferred

### [PostgreSQL (optional)](#postgresql-optional)

For larger deployments or when you need concurrent write scalability, use Postgres.

```
DATABASE_URL=postgres://happyview:happyview@localhost/happyview
```

You need to create the database before starting HappyView:

```
createdb happyview
```

HappyView runs migrations automatically on startup for both backends.

**When to use Postgres:**

* High write concurrency from many simultaneous users
* You need Postgres-specific features (e.g., advanced JSON queries in Lua scripts)
* You already have a Postgres infrastructure

### [Environment variables](#environment-variables)

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Connection string. `sqlite://...` for SQLite, `postgres://...` for Postgres |
| `DATABASE_BACKEND` | Optional. Force `sqlite` or `postgres`. Auto-detected from `DATABASE_URL` if not set |

### [Docker Compose](#docker-compose)

The default `docker-compose.yml` ships with the Postgres service commented out. To use Postgres:

1. Uncomment the `postgres` service and `pgdata` volume in `docker-compose.yml`
2. Uncomment the `depends_on: postgres` block in the `happyview` service
3. Update `DATABASE_URL` in `.env`:

   ```
   DATABASE_URL=postgres://happyview:happyview@postgres/happyview
   ```
4. Set the Postgres credentials:

   ```
   POSTGRES_USER=happyview
   POSTGRES_PASSWORD=happyview
   POSTGRES_DB=happyview
   ```

### [Lua scripts](#lua-scripts)

Both backends support the same Lua database API (`db.query`, `db.get`, `db.count`). Write SQL in **SQLite syntax** by default. If you are using Postgres, HappyView automatically translates common SQLite patterns to Postgres equivalents at runtime.

If you are migrating existing Lua scripts from Postgres SQL syntax to SQLite syntax, see the [Postgres to SQLite migration guide](postgres-to-sqlite-migration).

### [Next steps](#next-steps)

* [SQLite → Postgres migration](sqlite-to-postgres-migration) — switch an existing instance from SQLite to Postgres
* [Postgres → SQLite migration](postgres-to-sqlite-migration) — switch an existing instance from Postgres to SQLite
* [Lua scripting](../lua-scripting) — write queries that target either backend
* [Configuration](../../getting-started/configuration) — `DATABASE_URL` and related variables

[Event Logs

Previous Page](/guides/event-logs)[Postgres to SQLite Migration

Next Page](/guides/database/postgres-to-sqlite-migration)

#### On this page

[SQLite (default)](#sqlite-default)[PostgreSQL (optional)](#postgresql-optional)[Environment variables](#environment-variables)[Docker Compose](#docker-compose)[Lua scripts](#lua-scripts)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/sdk/oauth-client/overview
title: OAuth Client | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

[OAuth Client](/sdk/oauth-client/overview)[@happyview/oauth-client](/sdk/oauth-client/changelog)

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

OAuth Client

OAuth Client

## OAuth Client

The core OAuth client handles DPoP key provisioning, session registration, and session restoration against a HappyView instance. It's platform-agnostic — you provide a `CryptoAdapter` and optional `StorageAdapter` for your environment.

If you're building a browser app, use the [Browser Client](../oauth-client-browser/overview) instead. It wraps this package with Web Crypto, localStorage, and a complete OAuth redirect flow.

### [Installation](#installation)

```
npm install @happyview/oauth-client
```

### [Setup](#setup)

```
import { HappyViewOAuthClient } from "@happyview/oauth-client";

const client = new HappyViewOAuthClient({
  instanceUrl: "https://happyview.example.com",
  clientKey: "hvc_your_client_key",
  clientSecret: "hvs_your_secret", // optional, for confidential clients
  crypto: myCryptoAdapter,
  storage: myStorageAdapter, // optional, defaults to in-memory
});
```

The `clientSecret` parameter makes this a **confidential client**. Omit it for public clients (browser apps), which use PKCE instead. See [Authentication — API clients](../../getting-started/authentication#api-clients-confidential-vs-public) for details.

### [DPoP key provisioning](#dpop-key-provisioning)

Request a DPoP keypair from the HappyView instance. This is the first step of the [DPoP key provisioning flow](../../getting-started/authentication#dpop-key-provisioning-for-third-party-apps).

```
const { provisionId, dpopKey, pkceVerifier } =
  await client.provisionDpopKey();
```

For public clients, `pkceVerifier` is included and must be passed back when registering the session. For confidential clients it will be `undefined`.

Use the returned `dpopKey` (a private JWK) as your DPoP keypair during your atproto OAuth flow with the user's PDS.

### [Session registration](#session-registration)

After completing OAuth authorization with the user's PDS, register the session with HappyView:

```
const session = await client.registerSession({
  provisionId,
  pkceVerifier,       // required for public clients
  did: "did:plc:abc123",
  accessToken: tokens.access_token,
  refreshToken: tokens.refresh_token,
  scopes: "atproto",
  pdsUrl: "https://bsky.social",
  issuer: tokens.iss,
  dpopKey,
});
```

The returned `HappyViewSession` is ready to make authenticated requests. The session data is also persisted to the `StorageAdapter` for later restoration.

The response includes the scopes that were approved by the authorization server, available on the session:

```
console.log(session.scopes);
// ["atproto", "transition:generic"]
```

### [Retrieving session info](#retrieving-session-info)

To fetch the current session's approved scopes from the server (e.g., after restoring from storage):

```
const info = await client.getSession("did:plc:abc123");
console.log(info.scopes);
// ["atproto", "transition:generic"]
```

### [Making authenticated requests](#making-authenticated-requests)

`HappyViewSession.fetchHandler` works like `fetch` but automatically attaches DPoP proof, authorization, and client key headers:

```
// Relative path — prepends the HappyView instance URL
const response = await session.fetchHandler(
  "/xrpc/com.example.getStuff?limit=10",
  { method: "GET" },
);

// Absolute URL — used as-is
const response = await session.fetchHandler(
  "https://other-service.example.com/xrpc/test.method",
  { method: "GET" },
);
```

### [Session restoration](#session-restoration)

Restore a previously stored session without re-authenticating:

```
// Restore the last active session
const session = await client.restore();

// Restore a specific user's session
const session = await client.restoreSession("did:plc:abc123");
```

Returns `null` if no stored session is found.

### [Logout](#logout)

```
await client.deleteSession("did:plc:abc123");
```

This deletes the session from both HappyView and local storage.

### [Adapters](#adapters)

#### [CryptoAdapter](#cryptoadapter)

Implement this interface for your platform's cryptographic primitives:

```
interface CryptoAdapter {
  generatePkceVerifier(): Promise<string>;
  computePkceChallenge(verifier: string): Promise<string>;
  signEs256(privateKey: JsonWebKey, payload: Uint8Array): Promise<Uint8Array>;
  sha256(data: Uint8Array): Promise<Uint8Array>;
  getRandomValues(length: number): Uint8Array;
}
```

#### [StorageAdapter](#storageadapter)

Implement this interface to persist sessions:

```
interface StorageAdapter {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}
```

If no `StorageAdapter` is provided, sessions are stored in memory and won't survive page reloads or process restarts.

### [Error handling](#error-handling)

All errors extend `HappyViewError`:

| Error | When |
| --- | --- |
| `ApiError` | HappyView API returned a non-OK response (has `status` and `body`) |
| `AuthenticationError` | Authentication failed (default status 401) |
| `InvalidStateError` | Missing or invalid OAuth state |
| `TokenExchangeError` | Token exchange with the PDS failed (has `status` and `body`) |
| `ResolutionError` | Handle or DID resolution failed |

```
import { ApiError } from "@happyview/oauth-client";

try {
  await client.registerSession(params);
} catch (err) {
  if (err instanceof ApiError) {
    console.error(`API error ${err.status}:`, err.body);
  }
}
```

[@happyview/lex-agent

Previous Page](/sdk/lex-agent/changelog)[@happyview/oauth-client

Next Page](/sdk/oauth-client/changelog)

#### On this page

[Installation](#installation)[Setup](#setup)[DPoP key provisioning](#dpop-key-provisioning)[Session registration](#session-registration)[Retrieving session info](#retrieving-session-info)[Making authenticated requests](#making-authenticated-requests)[Session restoration](#session-restoration)[Logout](#logout)[Adapters](#adapters)[CryptoAdapter](#cryptoadapter)[StorageAdapter](#storageadapter)[Error handling](#error-handling)

---
<!--
URL: https://happyview.dev/sdk/oauth-client-browser/overview
title: Browser Client | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

[Browser Client](/sdk/oauth-client-browser/overview)[@happyview/oauth-client-browser](/sdk/oauth-client-browser/changelog)

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Browser Client

OAuth Client Browser

## Browser Client

The browser client handles the full OAuth redirect flow for browser apps authenticating with a HappyView instance. It wraps the [OAuth Client](../oauth-client/overview) with Web Crypto, localStorage, and atproto handle/DID resolution.

If you're starting a new app, consider using [`@happyview/lex-agent`](../lex-agent/overview) with `@atproto/lex` instead — it provides type-safe XRPC calls and is the recommended way to interact with HappyView. This package is primarily useful if your app already uses `@atproto/oauth-client-browser` and you want to add HappyView authentication alongside it.

### [Installation](#installation)

```
npm install @happyview/oauth-client-browser
```

### [Setup](#setup)

```
import { HappyViewBrowserClient } from "@happyview/oauth-client-browser";

const client = new HappyViewBrowserClient({
  instanceUrl: "https://happyview.example.com",
  clientId: "https://example.com/oauth-client-metadata.json",
  clientKey: "hvc_your_client_key",
});
```

| Option | Required | Description |
| --- | --- | --- |
| `instanceUrl` | Yes | The HappyView instance URL |
| `clientId` | Yes | URL where your app serves its [OAuth client metadata](#oauth-client-metadata) |
| `clientKey` | Yes | API client key from the HappyView admin dashboard |
| `redirectUri` | No | OAuth callback URL. Defaults to `${window.location.origin}/oauth/callback` |
| `scopes` | No | OAuth scopes to request. Defaults to `"atproto"` |
| `storage` | No | Custom storage adapter. Defaults to localStorage |
| `sessionHooks` | No | Event hooks for session lifecycle events |
| `fetch` | No | Custom fetch implementation |

The client uses localStorage by default. You can override it:

```
const client = new HappyViewBrowserClient({
  instanceUrl: "https://happyview.example.com",
  clientId: "https://example.com/oauth-client-metadata.json",
  clientKey: "hvc_your_client_key",
  storage: myCustomStorageAdapter,
});
```

### [Sign in](#sign-in)

`signIn()` resolves the user's handle, discovers their PDS, provisions a DPoP key, and redirects the browser to the PDS authorization server:

```
await client.signIn("alice.bsky.social");
// Browser redirects — code stops here
```

To sign in via a popup window instead:

```
const session = await client.signIn("alice.bsky.social", {
  display: "popup",
});
```

Or use the explicit methods:

```
// Full-page redirect (equivalent to signIn without display option)
await client.signInRedirect("alice.bsky.social");

// Popup window
const session = await client.signInPopup("alice.bsky.social");
```

If you need the authorization URL without redirecting (e.g., for a custom UI), use `prepareLogin()`:

```
const { authorizationUrl, did, state } =
  await client.prepareLogin("alice.bsky.social");
```

#### [What happens during sign in](#what-happens-during-sign-in)

1. The handle is resolved to a DID via `resolveHandleToDid`.
2. The DID document is fetched to find the PDS URL.
3. The PDS's OAuth authorization server metadata is fetched.
4. A DPoP key is provisioned from HappyView.
5. PKCE challenge/verifier pairs are generated (one for HappyView's DPoP provisioning, one for the PDS authorization server).
6. The pending auth state is stored in localStorage.
7. The browser is redirected to the PDS authorization endpoint (or a popup is opened).

### [Initialization](#initialization)

On page load, call `init()` to automatically handle both session restoration and OAuth callbacks:

```
const result = await client.init();
if (result) {
  const { session, state } = result;
  // session is ready to use
}
```

`init()` checks the URL for OAuth callback parameters. If found, it processes the callback and returns `{ session, state }`. Otherwise, it tries to restore the last active session from localStorage.

For more control, use the specific methods:

```
// Restore only — ignores callback params in the URL
const result = await client.initRestore();
if (result) {
  const { session } = result;
}

// Callback only — throws if no callback params are present
const { session, state } = await client.initCallback();
```

#### [Restoring a specific session](#restoring-a-specific-session)

To restore a specific user's session by DID:

```
const session = await client.restore("did:plc:abc123");
```

Calling `restore()` with no arguments returns the last active session, or `null` if none is found.

### [Detecting callback params](#detecting-callback-params)

`readCallbackParams()` checks the current URL for OAuth callback parameters without processing them. This is useful when your app uses client-side routing and needs to detect callbacks before the router changes the URL:

```
const params = client.readCallbackParams();
if (params) {
  // URL contains OAuth callback params — process them
  const { session } = await client.initCallback();
}
```

### [Checking approved scopes](#checking-approved-scopes)

After sign in or session restoration, you can check which scopes were approved:

```
console.log(session.scopes);
// ["atproto", "transition:generic"]
```

To fetch the latest scopes from the server:

```
const info = await client.getSession("did:plc:abc123");
console.log(info.scopes);
// ["atproto", "transition:generic"]
```

### [Session](#session)

#### [Authenticated requests](#authenticated-requests)

The session's `fetchHandler` attaches DPoP proof headers automatically:

```
const response = await session.fetchHandler(
  "/xrpc/com.example.getStuff?limit=10",
  { method: "GET" },
);

const data = await response.json();
```

Pass a relative path (prepends the HappyView instance URL) or a full URL (used as-is).

### [Revoke session](#revoke-session)

```
await client.revoke(session.did);
```

### [Resolution utilities](#resolution-utilities)

| Property | Type | Description |
| --- | --- | --- |
| `did` | `string` | The authenticated user's DID |
| `sub` | `string` | Alias for `did` (matches upstream naming) |

#### [Sign out](#sign-out)

Sessions can self-revoke:

```
await session.signOut();
```

This is equivalent to calling `client.revoke(session.did)`.

### [Session event hooks](#session-event-hooks)

React to session lifecycle events with `sessionHooks`:

```
const client = new HappyViewBrowserClient({
  // ...
  sessionHooks: {
    onSessionUpdate(did) {
      console.log(`Session created/updated for ${did}`);
    },
    onSessionDelete(did) {
      console.log(`Session deleted for ${did}`);
    },
  },
});
```

* `onSessionUpdate(did)` fires after a new session is registered (from `callback()`).
* `onSessionDelete(did)` fires after a session is revoked (from `revoke()`, `logout()`, or `session.signOut()`).

### [Error handling](#error-handling)

Callback errors are always wrapped in `OAuthCallbackError`, which carries the original callback params and state:

```
import { OAuthCallbackError } from "@happyview/oauth-client-browser";

try {
  const session = await client.callback();
} catch (err) {
  if (err instanceof OAuthCallbackError) {
    console.log(err.state);           // the state from the callback
    console.log(err.params.get("error")); // e.g. "access_denied"
    console.log(err.cause);           // the underlying error, if any
  }
}
```

If the authorization server returns an error (e.g., the user denied access), the `params` contain the `error` and `error_description` fields from the server response. If the token exchange fails, the underlying `TokenExchangeError` is available as `err.cause`.

### [Using with @atproto/api](#using-with-atprotoapi)

`HappyViewSession` is directly compatible with `@atproto/api`'s `Agent`. Pass it as the session manager:

```
import { Agent } from "@atproto/api";

const result = await client.init();
if (result) {
  const agent = new Agent(result.session);

  // Use the full @atproto/api surface
  const profile = await agent.getProfile({ actor: agent.did });
  await agent.like(postUri, postCid);
}
```

This works because `HappyViewSession` implements the `SessionManager` interface that `Agent` expects — it has `did` and a `fetchHandler` that attaches DPoP authentication headers and prepends the HappyView instance URL.

### [Revoke session](#revoke-session-1)

From the client:

```
await client.revoke(session.did);
```

Or from the session itself:

```
await session.signOut();
```

### [Identity resolution](#identity-resolution)

The client exposes its handle and DID resolvers for advanced use:

```
const did = await client.handleResolver.resolve("alice.bsky.social");
const doc = await client.didResolver.resolve(did);
```

### [Validate client metadata](#validate-client-metadata)

Verify that your OAuth client metadata is served correctly:

```
import { HappyViewBrowserClient } from "@happyview/oauth-client-browser";

const metadata = await HappyViewBrowserClient.fetchMetadata({
  clientId: "https://example.com/oauth-client-metadata.json",
});
console.log(metadata.client_name);
```

### [OAuth client metadata](#oauth-client-metadata)

Your app must serve an OAuth client metadata JSON document at the URL you pass as `clientId`. The PDS fetches this during authorization to validate the redirect URI and display your app's information.

Example for a Next.js app:

```
// src/app/oauth-client-metadata.json/route.ts
import { type NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;

  return Response.json({
    client_id: `${origin}/oauth-client-metadata.json`,
    client_name: "My App",
    client_uri: origin,
    redirect_uris: [`${origin}/oauth/callback`],
    token_endpoint_auth_method: "none",
    grant_types: ["authorization_code", "refresh_token"],
    scope: "atproto",
    application_type: "web",
    dpop_bound_access_tokens: true,
  });
}
```

For a static site, serve a plain JSON file at `/oauth-client-metadata.json`.

The `redirect_uris` array must include the `redirectUri` your client is configured with (defaults to `${origin}/oauth/callback`).

### [Local development](#local-development)

For local development with ATProto's loopback client ID convention, use `buildLoopbackClientId`:

```
import { buildLoopbackClientId } from "@happyview/oauth-client-browser";

const clientId = buildLoopbackClientId(window.location);
// → "http://localhost?redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2F"
```

This builds a client ID that authorization servers recognize as a local development app. The `redirect_uri` is encoded in the client ID URL query string.

### [Cleanup](#cleanup)

The browser client implements `AsyncDisposable` for use with `await using`:

```
await using client = new HappyViewBrowserClient({ ... });
// client.dispose() called automatically when scope exits
```

Or call `dispose()` manually:

```
client.dispose();
```

### [Re-exports](#re-exports)

This package re-exports everything from `@happyview/oauth-client`, `@atproto-labs/handle-resolver`, and `@atproto-labs/did-resolver`. You don't need to install these packages separately:

```
import {
  // From @happyview/oauth-client
  HappyViewBrowserClient,
  HappyViewSession,
  ApiError,
  OAuthCallbackError,
  Key,
  type SessionEventHooks,
  type StorageAdapter,
  type TokenInfo,
  type Jwk,

  // From @atproto-labs/handle-resolver
  AtprotoDohHandleResolver,

  // From @atproto-labs/did-resolver
  DidResolverCommon,
  type DidDocument,
} from "@happyview/oauth-client-browser";
```

[@happyview/oauth-client

Previous Page](/sdk/oauth-client/changelog)[@happyview/oauth-client-browser

Next Page](/sdk/oauth-client-browser/changelog)

#### On this page

[Installation](#installation)[Setup](#setup)[Sign in](#sign-in)[What happens during sign in](#what-happens-during-sign-in)[Initialization](#initialization)[Restoring a specific session](#restoring-a-specific-session)[Detecting callback params](#detecting-callback-params)[Checking approved scopes](#checking-approved-scopes)[Session](#session)[Authenticated requests](#authenticated-requests)[Revoke session](#revoke-session)[Resolution utilities](#resolution-utilities)[Sign out](#sign-out)[Session event hooks](#session-event-hooks)[Error handling](#error-handling)[Using with @atproto/api](#using-with-atprotoapi)[Revoke session](#revoke-session-1)[Identity resolution](#identity-resolution)[Validate client metadata](#validate-client-metadata)[OAuth client metadata](#oauth-client-metadata)[Local development](#local-development)[Cleanup](#cleanup)[Re-exports](#re-exports)

---
<!--
URL: https://happyview.dev/sdk/lex-agent/overview
title: Lex Agent | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

[Lex Agent](/sdk/lex-agent/overview)[@happyview/lex-agent](/sdk/lex-agent/changelog)

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Lex Agent

Lex Agent

## Lex Agent

The Lex agent adapter is the recommended way to interact with HappyView from JavaScript. It creates an [`@atproto/lex`](https://npmx.dev/package/%40atproto/lex) `Agent` from a `HappyViewSession`, so you can use `@atproto/lex`'s type-safe `Client` to make XRPC calls with HappyView's DPoP authentication. All requests are routed to your HappyView instance, which handles its own lexicons locally and proxies standard atproto methods (e.g., `com.atproto.repo.createRecord`) to the user's PDS.

The adapter gives you lexicon-level type checking on parameters, input bodies, and responses, and works with any library or tool that accepts an `@atproto/lex` `Agent`.

### [Installation](#installation)

```
npm install @happyview/lex-agent @atproto/lex
```

`@atproto/lex` is a peer dependency (`>=0.0.20`).

### [Usage](#usage)

```
import { Client } from "@atproto/lex";
import { HappyViewBrowserClient } from "@happyview/oauth-client-browser";
import { createAgent } from "@happyview/lex-agent";

const client = new HappyViewBrowserClient({
  instanceUrl: "https://happyview.example.com",
  clientId: "https://example.com/oauth-client-metadata.json",
  clientKey: "hvc_your_client_key",
});

// Restore an existing session
const result = await client.init();
const session = result?.session;

// Create a Lex agent from the session
const agent = createAgent(session);
const lex = new Client(agent);
```

### [Type-safe XRPC calls](#type-safe-xrpc-calls)

With a `Client` instance, you can make type-safe XRPC calls using lexicon definitions:

```
// Query
const result = await lex.xrpc(myLexicons.com.example.getGame, {
  params: { slug: "celeste" },
});

// Procedure
await lex.xrpc(myLexicons.com.example.createPost, {
  input: { text: "Hello from HappyView!" },
});
```

The `Client` validates parameters and return types against the lexicon schema at the type level, so your IDE catches mismatches before runtime.

### [API](#api)

#### [`createAgent(session: HappyViewSession): Agent`](#createagentsession-happyviewsession-agent)

Creates an `@atproto/lex` `Agent` from a `HappyViewSession`.

* `agent.did` — the session user's DID
* `agent.fetchHandler(path, init)` — delegates to `session.fetchHandler`, which attaches DPoP authentication headers and prepends the HappyView instance URL to relative paths

[Overview

Previous Page](/sdk/overview)[@happyview/lex-agent

Next Page](/sdk/lex-agent/changelog)

#### On this page

[Installation](#installation)[Usage](#usage)[Type-safe XRPC calls](#type-safe-xrpc-calls)[API](#api)[`createAgent(session: HappyViewSession): Agent`](#createagentsession-happyviewsession-agent)

---
<!--
URL: https://happyview.dev/sdk/oauth-client-node/overview
title: Node Client | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

[Node Client](/sdk/oauth-client-node/overview)[@happyview/oauth-client-node](/sdk/oauth-client-node/changelog)

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Node Client

OAuth Client Node

## Node Client

Server-side OAuth client for authenticating with a HappyView instance using AT Protocol. Built on top of [`@happyview/oauth-client`](../oauth-client/overview), matching the API surface of [`@atproto/oauth-client-node`](https://www.npmjs.com/package/%40atproto/oauth-client-node).

### [Installation](#installation)

```
npm install @happyview/oauth-client-node
```

### [Setup](#setup)

```
import { HappyViewNodeClient } from "@happyview/oauth-client-node";

const client = new HappyViewNodeClient({
  instanceUrl: "https://happyview.example.com",
  clientId: "https://example.com/oauth-client-metadata.json",
  clientKey: "hvc_your_client_key",
  redirectUri: "https://example.com/oauth/callback",
  storage: myStorageAdapter,
});
```

| Option | Required | Description |
| --- | --- | --- |
| `instanceUrl` | Yes | The HappyView instance URL |
| `clientId` | Yes | URL where your app serves its [OAuth client metadata](#oauth-client-metadata) |
| `clientKey` | Yes | API client key from the HappyView admin dashboard |
| `redirectUri` | Yes | OAuth callback URL |
| `storage` | Yes | Storage adapter for persisting sessions and auth state |
| `clientSecret` | No | Secret for confidential clients |
| `scopes` | No | OAuth scopes to request. Defaults to `"atproto"` |
| `sessionHooks` | No | Event hooks for session lifecycle events |
| `fetch` | No | Custom fetch implementation |

#### [Storage](#storage)

You must provide a `StorageAdapter`. The built-in `MemoryStorage` works for development but won't survive restarts:

```
import { MemoryStorage } from "@happyview/oauth-client-node";

const client = new HappyViewNodeClient({
  // ...
  storage: new MemoryStorage(),
});
```

For production, implement the `StorageAdapter` interface backed by your database or cache:

```
interface StorageAdapter {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}
```

### [Authorize](#authorize)

Generate an authorization URL and redirect the user:

```
const url = await client.authorize("alice.bsky.social");
res.redirect(url.href);
```

Options:

```
const url = await client.authorize("alice.bsky.social", {
  scope: "atproto transition:generic",
  redirect_uri: "https://example.com/alt-callback",
  state: "my-custom-state",
  prompt: "login",
  display: "page",
});
```

| Option | Description |
| --- | --- |
| `scope` | OAuth scopes for this request (overrides constructor default) |
| `scopes` | Deprecated alias for `scope`. `scope` takes priority if both passed. |
| `state` | Custom state value. Defaults to a random hex string. |
| `redirect_uri` | Override the redirect URI for this request |
| `signal` | `AbortSignal` for cancellation |
| `display` | Display hint: `"page"`, `"popup"`, `"touch"`, or `"wap"` |
| `prompt` | Prompt mode (e.g. `"login"` to force re-authentication) |
| `nonce` | OIDC nonce value |
| `max_age` | Max elapsed seconds since last active authentication |
| `ui_locales` | Space-separated locale tags (e.g. `"en fr"`) |
| `dpop_jkt` | DPoP JWK thumbprint |
| `claims` | OIDC claims request object |
| `authorization_details` | RFC 9396 authorization details |
| `id_token_hint` | Previous ID token hint |

#### [Abort a pending request](#abort-a-pending-request)

If you need to cancel a pending authorization (e.g., the user navigates away), pass the URL returned from `authorize()`:

```
const url = await client.authorize("alice.bsky.social");
// ...later, if the user cancels:
await client.abortRequest(url);
```

This cleans up the stored pending auth state.

### [Callback](#callback)

On your callback route, process the OAuth response:

```
app.get("/oauth/callback", async (req, res) => {
  const params = new URLSearchParams(req.url.split("?")[1]);
  const { session, state } = await client.callback(params);

  // session.did is the authenticated user's DID
  // state is the value passed to authorize() (or the auto-generated one)
});
```

You can override the redirect URI for this specific callback:

```
const { session } = await client.callback(params, {
  redirect_uri: "https://other.example.com/callback",
});
```

### [Restore session](#restore-session)

Restore a session by DID:

```
const session = await client.restore("did:plc:abc123");
```

The `did` parameter is required in the node client (unlike the browser client, there's no "last active" session concept on the server).

A second `refresh` parameter is accepted for API compatibility with upstream (`restore(did, refresh?)`). HappyView manages token refresh server-side, so this parameter is accepted but ignored.

### [Session](#session)

#### [Authenticated requests](#authenticated-requests)

The session's `fetchHandler` attaches DPoP proof headers automatically:

```
const response = await session.fetchHandler(
  "/xrpc/com.example.getStuff?limit=10",
  { method: "GET" },
);

const data = await response.json();
```

Pass a relative path (prepends the HappyView instance URL) or a full URL (used as-is).

#### [Token info](#token-info)

```
const info = session.getTokenInfo();
// { sub, scope, iss, aud, expiresAt?, expired? }
```

Returns available metadata about the session. `expiresAt` and `expired` are always `undefined` since HappyView manages token lifecycle server-side.

#### [Properties](#properties)

| Property | Type | Description |
| --- | --- | --- |
| `did` | `string` | The authenticated user's DID |
| `sub` | `string` | Alias for `did` (matches upstream naming) |

#### [Sign out](#sign-out)

Sessions can self-revoke:

```
await session.signOut();
```

This is equivalent to calling `client.revoke(session.did)`.

### [Confidential vs public clients](#confidential-vs-public-clients)

Clients created with a `clientSecret` are confidential — they can hold secrets safely on the server. Clients without a secret are public. Use `client.isConfidential` to check:

```
const client = new HappyViewNodeClient({
  // ...
  clientSecret: "hvs_your_secret",
});
client.isConfidential; // true
```

Public clients use PKCE to secure the DPoP key provisioning step. Confidential clients authenticate with their secret instead.

### [Session event hooks](#session-event-hooks)

React to session lifecycle events with `sessionHooks`:

```
const client = new HappyViewNodeClient({
  // ...
  sessionHooks: {
    onSessionUpdate(did) {
      console.log(`Session created/updated for ${did}`);
    },
    onSessionDelete(did) {
      console.log(`Session deleted for ${did}`);
    },
  },
});
```

* `onSessionUpdate(did)` fires after a new session is registered (from `callback()`).
* `onSessionDelete(did)` fires after a session is revoked (from `revoke()` or `session.signOut()`).

### [Error handling](#error-handling)

Callback errors are always wrapped in `OAuthCallbackError`, which carries the original callback params and state:

```
import { OAuthCallbackError } from "@happyview/oauth-client-node";

try {
  const { session } = await client.callback(params);
} catch (err) {
  if (err instanceof OAuthCallbackError) {
    console.log(err.state);           // the state from the callback
    console.log(err.params.get("error")); // e.g. "access_denied"
    console.log(err.cause);           // the underlying error, if any
  }
}
```

If the authorization server returns an error (e.g., the user denied access), the `params` contain the `error` and `error_description` fields from the server response. If the token exchange fails, the underlying `TokenExchangeError` is available as `err.cause`.

### [Using with @atproto/api](#using-with-atprotoapi)

`HappyViewSession` is directly compatible with `@atproto/api`'s `Agent`:

```
import { Agent } from "@atproto/api";

const session = await client.restore("did:plc:abc123");
const agent = new Agent(session);

const profile = await agent.getProfile({ actor: agent.did });
await agent.like(postUri, postCid);
```

This works because `HappyViewSession` implements the `SessionManager` interface that `Agent` expects.

### [Revoke session](#revoke-session)

From the client:

```
await client.revoke("did:plc:abc123");
```

Or from the session itself:

```
await session.signOut();
```

### [Validate client metadata](#validate-client-metadata)

Verify that your OAuth client metadata is served correctly:

```
const metadata = await HappyViewNodeClient.fetchMetadata({
  clientId: "https://example.com/oauth-client-metadata.json",
});
console.log(metadata.client_name);
```

### [Identity resolution](#identity-resolution)

The client exposes its handle and DID resolvers for advanced use:

```
const did = await client.handleResolver.resolve("alice.bsky.social");
const doc = await client.didResolver.resolve(did);
```

### [OAuth client metadata](#oauth-client-metadata)

Your app must serve an OAuth client metadata JSON document at the URL you pass as `clientId`. The PDS fetches this during authorization.

For a confidential Node.js server:

```
app.get("/oauth-client-metadata.json", (req, res) => {
  const origin = `${req.protocol}://${req.get("host")}`;
  res.json({
    client_id: `${origin}/oauth-client-metadata.json`,
    client_name: "My Server App",
    client_uri: origin,
    redirect_uris: [`${origin}/oauth/callback`],
    token_endpoint_auth_method: "none",
    grant_types: ["authorization_code", "refresh_token"],
    scope: "atproto",
    application_type: "web",
    dpop_bound_access_tokens: true,
  });
});
```

### [Re-exports](#re-exports)

This package re-exports everything from `@happyview/oauth-client`, `@atproto-labs/handle-resolver`, and `@atproto-labs/did-resolver`. You don't need to install these packages separately:

```
import {
  // From @happyview/oauth-client
  HappyViewNodeClient,
  HappyViewSession,
  MemoryStorage,
  ApiError,
  OAuthCallbackError,
  Key,
  type SessionEventHooks,
  type StorageAdapter,
  type TokenInfo,
  type Jwk,

  // From @atproto-labs/handle-resolver
  AtprotoDohHandleResolver,

  // From @atproto-labs/did-resolver
  DidResolverCommon,
  type DidDocument,
} from "@happyview/oauth-client-node";
```

### [Differences from upstream](#differences-from-upstream)

The HappyView SDK matches the upstream `@atproto/oauth-client-node` public API but differs architecturally:

| Area | Upstream | HappyView |
| --- | --- | --- |
| DPoP keys | Generated client-side | Provisioned from HappyView instance |
| Token refresh | Client-side with `refresh` param | Server-side (HappyView manages lifecycle) |
| `restore(did, refresh?)` | `refresh` controls token refresh behavior | `refresh` accepted but ignored |
| `session.getTokenInfo()` | Includes `expiresAt`/`expired` | These fields are `undefined` |
| `jwks` | Returns client's public keyset | Not applicable (no client keypairs) |

[@happyview/oauth-client-browser

Previous Page](/sdk/oauth-client-browser/changelog)[@happyview/oauth-client-node

Next Page](/sdk/oauth-client-node/changelog)

#### On this page

[Installation](#installation)[Setup](#setup)[Storage](#storage)[Authorize](#authorize)[Abort a pending request](#abort-a-pending-request)[Callback](#callback)[Restore session](#restore-session)[Session](#session)[Authenticated requests](#authenticated-requests)[Token info](#token-info)[Properties](#properties)[Sign out](#sign-out)[Confidential vs public clients](#confidential-vs-public-clients)[Session event hooks](#session-event-hooks)[Error handling](#error-handling)[Using with @atproto/api](#using-with-atprotoapi)[Revoke session](#revoke-session)[Validate client metadata](#validate-client-metadata)[Identity resolution](#identity-resolution)[OAuth client metadata](#oauth-client-metadata)[Re-exports](#re-exports)[Differences from upstream](#differences-from-upstream)

---
<!--
URL: https://happyview.dev/experimental/spaces/credentials
title: Credentials | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

[Overview](/experimental/spaces)[Managing Spaces](/experimental/spaces/managing-spaces)[Members](/experimental/spaces/members)[Records](/experimental/spaces/records)[Credentials](/experimental/spaces/credentials)[Write Notifications](/experimental/spaces/notifications)[Invites](/experimental/spaces/invites)[Changelog](/experimental/spaces/changelog)

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Credentials

Permissioned Spaces

## Credentials

Space credentials are short-lived JWTs for cross-service access to space data. A member requests a delegation token to prove their membership, exchanges the token for a credential JWT, then passes it to an external service that needs to read the space's records.

### [How credentials work](#how-credentials-work)

Credential issuance is a two-step process. The delegation token is a short-lived proof of membership (60-second TTL), and the credential is the bearer token used for cross-service access (2-hour TTL).

Credentials are ES256 JWTs signed with a P-256 keypair unique to each space. The keypair is generated on first credential request and stored encrypted (AES-256-GCM).

### [Step 1: Get a delegation token](#step-1-get-a-delegation-token)

The caller must be an authenticated member of the space. The delegation token is a short-lived proof of membership (60-second TTL).

Note: this endpoint is a GET request (not POST). The previous `getMemberGrant` endpoint (POST) is available as a legacy alias via `dev.happyview.space.getMemberGrant`.

TypeScriptJavaScriptRustGocURL

```
const params = new URLSearchParams({
  space: "ats://did:plc:abc123/com.example.forum/main",
});
const response = await fetch(`https://happyview.example.com/xrpc/com.atproto.space.getDelegationToken?${params}`, {
  headers: {
    "X-Client-Key": CLIENT_KEY,
    "Authorization": `DPoP ${ACCESS_TOKEN}`,
    "DPoP": DPOP_PROOF,
  },
});
interface DelegationTokenResponse {
  delegationToken: string;
  expiresAt: string;
}
const data: DelegationTokenResponse = await response.json();
```

**Response:**

```
{
  "delegationToken": "eyJhbGciOiJFUzI1NktFWSJ9...",
  "expiresAt": "2026-05-09T12:01:00Z"
}
```

### [Step 2: Get a space credential](#step-2-get-a-space-credential)

Exchange the delegation token for a space credential JWT. The credential is signed by the space's keypair and has a 2-hour TTL.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("https://happyview.example.com/xrpc/com.atproto.space.getSpaceCredential", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    "Authorization": `DPoP ${ACCESS_TOKEN}`,
    "DPoP": DPOP_PROOF,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    grant: "eyJhbGciOiJFUzI1NktFWSJ9...",
  }),
});
interface CredentialResponse {
  credential: string;
  expiresAt: string;
}
const data: CredentialResponse = await response.json();
```

**Response:**

```
{
  "credential": "eyJhbGciOiJFUzI1NiJ9...",
  "expiresAt": "2026-05-09T14:00:00Z"
}
```

#### [Credential claims](#credential-claims)

The JWT payload contains:

| Claim | Description |
| --- | --- |
| `iss` | The space authority's DID (who signed it) |
| `sub` | The full `ats://` space URI |
| `iat` | Issued at (Unix timestamp) |
| `exp` | Expiry (Unix timestamp) |
| `jti` | Random nonce for replay protection |

### [Using a credential](#using-a-credential)

Pass the credential as a standard Bearer token in the `Authorization` header. HappyView distinguishes space credentials from other tokens by checking the JWT header's `typ` field (`atproto-space-credential+jwt`).

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "https://happyview.example.com/xrpc/com.atproto.space.getRecord?space=...&collection=...&rkey=...",
  {
    headers: {
      "Authorization": `Bearer ${SPACE_CREDENTIAL}`,
    },
  },
);
const data = await response.json();
```

No DPoP auth or client key is needed when authenticating via space credential — the credential itself is sufficient. The `sub` claim identifies the space being accessed.

HappyView verifies the credential by resolving the issuer's DID document, extracting the `#atproto_space` signing key, and validating the JWT signature and expiry. If valid, the request is granted read access to the space identified by `sub`.

### [App access control](#app-access-control)

Before issuing a credential, HappyView checks whether the calling app (identified by its DPoP client key) is allowed to access the space:

* **`open` (default)**: any app can get credentials
* **`allowList`**: only apps whose client metadata URL appears in the `allowed` array can get credentials

For `open` spaces, requests without a client key are allowed. For `allowList` spaces, a client key is required — requests without one are rejected.

### [External credential verification](#external-credential-verification)

HappyView can also verify credentials issued by *other* HappyView instances or space-aware services. When a Bearer space credential is presented, HappyView:

1. Decodes the JWT without verification to extract the `iss` (issuer DID)
2. Resolves the issuer's DID document
3. Extracts the `#atproto_space` signing key from the DID doc
4. Verifies the JWT signature and expiry
5. Checks that the `sub` claim matches the requested space

A credential issued by one instance can be used to read from another instance that hosts the same space's data.

[Records

Previous Page](/experimental/spaces/records)[Write Notifications

Next Page](/experimental/spaces/notifications)

#### On this page

[How credentials work](#how-credentials-work)[Step 1: Get a delegation token](#step-1-get-a-delegation-token)[Step 2: Get a space credential](#step-2-get-a-space-credential)[Credential claims](#credential-claims)[Using a credential](#using-a-credential)[App access control](#app-access-control)[External credential verification](#external-credential-verification)

---
<!--
URL: https://happyview.dev/experimental/spaces/notifications
title: Write Notifications | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

[Overview](/experimental/spaces)[Managing Spaces](/experimental/spaces/managing-spaces)[Members](/experimental/spaces/members)[Records](/experimental/spaces/records)[Credentials](/experimental/spaces/credentials)[Write Notifications](/experimental/spaces/notifications)[Invites](/experimental/spaces/invites)[Changelog](/experimental/spaces/changelog)

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Write Notifications

Permissioned Spaces

## Write Notifications

Write notifications let external services receive webhooks when records change in a space. A service registers an endpoint, and HappyView pushes notifications to it when records are created, updated, or deleted — or when the space itself is deleted.

Registrations expire after 24 hours and must be renewed.

### [Registering for notifications](#registering-for-notifications)

Requires DPoP auth or a space credential. The caller provides the DID of the service that will receive notifications and the HTTPS endpoint to deliver them to.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("https://happyview.example.com/xrpc/com.atproto.space.registerNotify", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    "Authorization": `DPoP ${ACCESS_TOKEN}`,
    "DPoP": DPOP_PROOF,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    space: "ats://did:plc:abc123/com.example.forum/main",
    serviceDid: "did:web:feed.example.com",
    endpoint: "https://feed.example.com/webhooks/space-writes",
  }),
});
interface RegisterNotifyResponse {
  id: string;
}
const data: RegisterNotifyResponse = await response.json();
```

**Input:**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `space` | string | Yes | Space URI (`ats://...`) |
| `serviceDid` | string | Yes | DID of the service receiving notifications |
| `endpoint` | string | Yes | HTTPS endpoint to deliver notifications to |

**Response (200):**

```
{
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

### [Write notification payload](#write-notification-payload)

When a record is created, updated, or deleted in a space, HappyView POSTs a JSON payload to each registered endpoint:

```
{
  "space": "space-id",
  "did": "did:plc:author",
  "collection": "com.example.forum.post",
  "rkey": "3jwq5dya2gy2z",
  "cid": "bafyreie5cvv4h45feadgeuwhbcutmh6t7ceseocckahdoe6uat64zmz454"
}
```

| Field | Type | Description |
| --- | --- | --- |
| `space` | string | Internal space ID |
| `did` | string | DID of the author who made the change |
| `collection` | string (NSID) | Collection the record belongs to |
| `rkey` | string | Record key |
| `cid` | string? | CID of the new record value (null for deletes) |

Notifications are delivered to both per-author registrations (matching `serviceDid`) and space-wide registrations (no author filter). Delivery is best-effort — if the endpoint is unreachable, the notification is dropped.

### [Pushing a write notification](#pushing-a-write-notification)

Server-to-server endpoint. Triggers write notifications to all registered endpoints for a space. This is used internally by HappyView when records change, but can also be called externally.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("https://happyview.example.com/xrpc/com.atproto.space.notifyWrite", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    space: "ats://did:plc:abc123/com.example.forum/main",
    did: "did:plc:author456",
    collection: "com.example.forum.post",
    rkey: "3jwq5dya2gy2z",
    cid: "bafyreie5cvv4h45feadgeuwhbcutmh6t7ceseocckahdoe6uat64zmz454",
  }),
});
const data = await response.json();
// { "success": true }
```

**Input:**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `space` | string | Yes | Space URI (`ats://...`) |
| `did` | string | Yes | DID of the author who made the change |
| `collection` | string (NSID) | Yes | Collection the record belongs to |
| `rkey` | string | Yes | Record key |
| `cid` | string | No | CID of the record (omit for deletes) |

**Response (200):**

```
{
  "success": true
}
```

### [Notifying space deletion](#notifying-space-deletion)

Server-to-server endpoint. Notifies all registered endpoints that a space has been deleted. Registered endpoints receive `{ "space": "<space-id>" }`.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("https://happyview.example.com/xrpc/com.atproto.space.notifySpaceDeleted", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    space: "ats://did:plc:abc123/com.example.forum/main",
  }),
});
const data = await response.json();
// { "success": true }
```

**Input:**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `space` | string | Yes | Space URI (`ats://...`) |

**Response (200):**

```
{
  "success": true
}
```

[Credentials

Previous Page](/experimental/spaces/credentials)[Invites

Next Page](/experimental/spaces/invites)

#### On this page

[Registering for notifications](#registering-for-notifications)[Write notification payload](#write-notification-payload)[Pushing a write notification](#pushing-a-write-notification)[Notifying space deletion](#notifying-space-deletion)

---
<!--
URL: https://happyview.dev/experimental/spaces/records
title: Records | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

[Overview](/experimental/spaces)[Managing Spaces](/experimental/spaces/managing-spaces)[Members](/experimental/spaces/members)[Records](/experimental/spaces/records)[Credentials](/experimental/spaces/credentials)[Write Notifications](/experimental/spaces/notifications)[Invites](/experimental/spaces/invites)[Changelog](/experimental/spaces/changelog)

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Records

Permissioned Spaces

## Records

Space records are stored separately from public AT Protocol records. They follow the same URI pattern but use the `ats://` scheme and include the space identity:

```
ats:// did:plc:abcdefghijklmnop1234567890 / com.example.forum / main        / did:plc:author / com.example.forum.post / abcdefghijklmnop1234567890
       └── space DID ───────────────────┘   └── space type ─┘   └── skey ─┘   └── author ──┘   └── collection ──────┘   └── rkey ────────────────┘
```

### [Creating a record](#creating-a-record)

Requires `write` membership in the space. The rkey is auto-generated using a TID.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("https://happyview.example.com/xrpc/com.atproto.space.createRecord", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    "Authorization": `DPoP ${ACCESS_TOKEN}`,
    "DPoP": DPOP_PROOF,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    space: "ats://did:plc:abc123/com.example.forum/main",
    collection: "com.example.forum.post",
    record: {
      $type: "com.example.forum.post",
      text: "Hello from the forum!",
      createdAt: "2026-05-09T12:00:00Z",
    },
  }),
});
interface CreateRecordResponse {
  uri: string;
  cid: string;
}
const data: CreateRecordResponse = await response.json();
```

**Input:**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `space` | string | Yes | The space to write into |
| `collection` | string (NSID) | Yes | The record collection |
| `record` | object | Yes | The record data |

**Response (201):**

```
{
  "uri": "ats://did:plc:abc123/com.example.forum/main/did:plc:author/com.example.forum.post/3l2tkbx7225co",
  "cid": "bafyrei..."
}
```

`createRecord` always inserts a new record. If a record with the generated URI already exists, it returns `409 Conflict`.

### [Updating a record](#updating-a-record)

Requires `write` membership in the space.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("https://happyview.example.com/xrpc/com.atproto.space.putRecord", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    "Authorization": `DPoP ${ACCESS_TOKEN}`,
    "DPoP": DPOP_PROOF,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    space: "ats://did:plc:abc123/com.example.forum/main",
    collection: "com.example.forum.post",
    rkey: "3k2abc",
    record: {
      $type: "com.example.forum.post",
      text: "Hello from the forum!",
      createdAt: "2026-05-09T12:00:00Z",
    },
  }),
});
interface PutRecordResponse {
  uri: string;
  cid: string;
}
const data: PutRecordResponse = await response.json();
```

**Input:**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `space` | string | Yes | The space to write into |
| `collection` | string (NSID) | Yes | The record collection |
| `rkey` | string | Yes | The record key |
| `record` | object | Yes | The record data |
| `swapRecord` | string | No | Expected CID of the existing record (for optimistic concurrency) |

**Response (201):**

```
{
  "uri": "ats://did:plc:abc123/com.example.forum/main/did:plc:author/com.example.forum.post/3k2abc",
  "cid": "bafyrei..."
}
```

The author DID is taken from the authenticated user. You can only write records as yourself, so the URI's author component will always be your DID.

`putRecord` performs an upsert: if a record with the same collection + rkey already exists for this author in this space, it's overwritten. Use `swapRecord` to prevent unintended overwrites (see [Optimistic concurrency](#optimistic-concurrency) below).

### [Getting a record](#getting-a-record)

Requires `read` membership (or a valid [space credential](credentials)).

Members with `read_self` access can only retrieve their own records. Attempting to read another user's record returns `403 Forbidden`.

TypeScriptJavaScriptRustGocURL

```
const params = new URLSearchParams({
  space: "ats://did:plc:abc123/com.example.forum/main",
  collection: "com.example.forum.post",
  rkey: "3k2abc",
});
const response = await fetch(
  `https://happyview.example.com/xrpc/com.atproto.space.getRecord?${params}`,
  {
    headers: {
      "X-Client-Key": CLIENT_KEY,
      "Authorization": `DPoP ${ACCESS_TOKEN}`,
      "DPoP": DPOP_PROOF,
    },
  },
);
interface GetRecordResponse {
  uri: string;
  cid: string;
  value: Record<string, unknown>;
}
const data: GetRecordResponse = await response.json();
```

**Parameters:**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `space` | string | Yes | The space containing the record |
| `collection` | string (NSID) | Yes | The record collection |
| `rkey` | string | Yes | The record key |

**Response:**

```
{
  "uri": "ats://did:plc:abc123/com.example.forum/main/did:plc:author/com.example.forum.post/3k2abc",
  "cid": "bafyrei...",
  "value": {
    "$type": "com.example.forum.post",
    "text": "Hello from the forum!",
    "createdAt": "2026-05-09T12:00:00Z"
  }
}
```

### [Listing records](#listing-records)

TypeScriptJavaScriptRustGocURL

```
const params = new URLSearchParams({
  space: "ats://did:plc:abc123/com.example.forum/main",
  collection: "com.example.forum.post",
  limit: "20",
});
const response = await fetch(
  `https://happyview.example.com/xrpc/com.atproto.space.listRecords?${params}`,
  {
    headers: {
      "X-Client-Key": CLIENT_KEY,
      "Authorization": `DPoP ${ACCESS_TOKEN}`,
      "DPoP": DPOP_PROOF,
    },
  },
);
interface RecordEntry {
  collection: string;
  rkey: string;
  cid: string;
}
interface ListRecordsResponse {
  records: RecordEntry[];
  cursor?: string;
}
const data: ListRecordsResponse = await response.json();
```

**Parameters:**

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `space` | string | Yes |  | The space to list from |
| `repo` | string | No |  | Filter by author DID |
| `collection` | string | No |  | Filter by collection NSID |
| `limit` | integer | No | 50 | Max records to return (1-100) |
| `cursor` | string | No |  | Pagination cursor |
| `reverse` | boolean | No | `false` | Reverse sort order (oldest first) |

**Response:**

```
{
  "records": [
    {
      "collection": "com.example.forum.post",
      "rkey": "3k2abc",
      "cid": "bafyrei..."
    }
  ],
  "cursor": "MjAyNi0wNS0wOVQxMjowMDowMFp8YXRzOi8vZGlkOnBsYzphYmMxMjMvY29tLmV4YW1wbGUuZm9ydW0vbWFpbg"
}
```

### [Deleting a record](#deleting-a-record)

You can only delete your own records. Requires `write` membership.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("https://happyview.example.com/xrpc/com.atproto.space.deleteRecord", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    "Authorization": `DPoP ${ACCESS_TOKEN}`,
    "DPoP": DPOP_PROOF,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    space: "ats://did:plc:abc123/com.example.forum/main",
    collection: "com.example.forum.post",
    rkey: "3k2abc",
  }),
});
```

**Input:**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `space` | string | Yes | The space containing the record |
| `collection` | string (NSID) | Yes | The record collection |
| `rkey` | string | Yes | The record key |
| `swapRecord` | string | No | Expected CID of the existing record (for optimistic concurrency) |

Attempting to delete another user's record returns `403 Forbidden`.

### [Batch writes (applyWrites)](#batch-writes-applywrites)

`applyWrites` performs multiple create, update, and delete operations in a single request. Requires `write` membership.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("https://happyview.example.com/xrpc/com.atproto.space.applyWrites", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    "Authorization": `DPoP ${ACCESS_TOKEN}`,
    "DPoP": DPOP_PROOF,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    space: "ats://did:plc:abc123/com.example.forum/main",
    writes: [
      {
        action: "create",
        collection: "com.example.forum.post",
        value: { $type: "com.example.forum.post", text: "First post" },
      },
      {
        action: "update",
        collection: "com.example.forum.post",
        rkey: "3k2abc",
        value: { $type: "com.example.forum.post", text: "Edited post" },
        swapRecord: "bafyrei...",
      },
      {
        action: "delete",
        collection: "com.example.forum.post",
        rkey: "old-post",
      },
    ],
  }),
});
interface ApplyWritesResult {
  uri?: string;
  cid?: string;
}
const data: { results: ApplyWritesResult[] } = await response.json();
```

**Input:**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `space` | string | Yes | The space to write into |
| `swapCommit` | string | No | Expected space revision (for optimistic concurrency) |
| `writes` | array | Yes | List of write operations |

Each write operation has an `action` field:

| Action | Fields | Description |
| --- | --- | --- |
| `create` | `collection`, `value`, `rkey?` | Insert a new record. Auto-generates rkey if omitted. |
| `update` | `collection`, `rkey`, `value`, `swapRecord?` | Upsert a record. |
| `delete` | `collection`, `rkey`, `swapRecord?` | Delete a record. |

**Response:**

```
{
  "results": [
    { "uri": "ats://...", "cid": "bafyrei..." },
    { "uri": "ats://...", "cid": "bafyrei..." },
    {}
  ]
}
```

Each entry in `results` corresponds to the write at the same index. Create and update operations return `uri` and `cid`; delete operations return an empty object.

### [Optimistic concurrency](#optimistic-concurrency)

`swapRecord` and `swapCommit` provide optimistic concurrency control to prevent lost updates when multiple clients write to the same space.

#### [swapRecord](#swaprecord)

Pass the `swapRecord` field on `putRecord`, `deleteRecord`, or individual operations within `applyWrites`. The value is the CID of the record you expect to be replacing. If the record's current CID doesn't match, the operation fails with `409 Conflict`.

```
{
  "space": "ats://did:plc:abc123/com.example.forum/main",
  "collection": "com.example.forum.post",
  "rkey": "3k2abc",
  "record": { "text": "updated safely" },
  "swapRecord": "bafyrei_old_cid"
}
```

#### [swapCommit](#swapcommit)

Pass the `swapCommit` field on `applyWrites` to assert the space's current revision. If another client has written to the space since you last read its state, the operation fails with `409 Conflict` before any writes are applied.

The space's current revision is available as `revision` in the space object returned by `com.atproto.space.getSpace`.

```
{
  "space": "ats://did:plc:abc123/com.example.forum/main",
  "swapCommit": "3l2tkbx7225co",
  "writes": [...]
}
```

### [Repo state](#repo-state)

Returns the per-user repo state for a space, including the current revision and deniable commit data.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "https://happyview.example.com/xrpc/com.atproto.space.getRepoState?space=ats://did:plc:abc123/com.example.forum/main&did=did:plc:author",
  {
    headers: {
      "X-Client-Key": CLIENT_KEY,
      "Authorization": `DPoP ${ACCESS_TOKEN}`,
      "DPoP": DPOP_PROOF,
    },
  },
);
interface RepoStateResponse {
  rev: string | null;
  commit: {
    hash: string;
    ikm: string;
    sig: string;
    mac: string;
    rev: string;
  } | null;
}
const data: RepoStateResponse = await response.json();
```

**Parameters:**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `space` | string | Yes | The space URI |
| `did` | string | Yes | The DID of the user to get state for |

**Response:**

| Field | Type | Description |
| --- | --- | --- |
| `rev` | string/null | Current revision for this user's repo in the space |
| `commit` | object/null | Deniable commit data (base64url-encoded `hash`, `ikm`, `sig`, `mac`, and `rev`) |

### [Record operation log](#record-operation-log)

Returns the operation log for a user in a space. Each write (create, update, delete) is recorded as an oplog entry.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "https://happyview.example.com/xrpc/com.atproto.space.listRepoOps?space=ats://did:plc:abc123/com.example.forum/main&did=did:plc:author",
  {
    headers: {
      "X-Client-Key": CLIENT_KEY,
      "Authorization": `DPoP ${ACCESS_TOKEN}`,
      "DPoP": DPOP_PROOF,
    },
  },
);
const data = await response.json();
// data.ops — array of oplog entries
```

**Parameters:**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `space` | string | Yes | The space URI |
| `did` | string | Yes | The DID of the user whose ops to list |
| `limit` | integer | No | Max number of entries to return (default 100, max 1000) |
| `cursor` | string | No | Revision to start after (for pagination) |

**Response:**

```
{
  "ops": [
    {
      "id": "...",
      "rev": "3l2tkbx7225co",
      "idx": 0,
      "action": "create",
      "collection": "com.example.forum.post",
      "rkey": "3k2abc",
      "cid": "bafyrei...",
      "prev": null,
      "createdAt": "2026-05-09T12:00:00Z"
    }
  ]
}
```

Each entry records a single write operation. The `action` is one of `create`, `update`, or `delete`. The `prev` field contains the CID of the record before the operation (for updates and deletes).

### [Listing repos](#listing-repos)

Returns the list of users who have records in a space, along with their current revision.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "https://happyview.example.com/xrpc/com.atproto.space.listRepos?space=ats://did:plc:abc123/com.example.forum/main",
  {
    headers: {
      "X-Client-Key": CLIENT_KEY,
      "Authorization": `DPoP ${ACCESS_TOKEN}`,
      "DPoP": DPOP_PROOF,
    },
  },
);
interface Repo {
  did: string;
  rev: string | null;
}
const data: { repos: Repo[] } = await response.json();
```

**Parameters:**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `space` | string | Yes | The space URI |

**Response:**

```
{
  "repos": [
    { "did": "did:plc:author1", "rev": "3l2tkbx7225co" },
    { "did": "did:plc:author2", "rev": null }
  ]
}
```

### [Getting a blob](#getting-a-blob)

Retrieves a blob from a space. The blob is fetched from the author's PDS and proxied through HappyView with access control.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "https://happyview.example.com/xrpc/com.atproto.space.getBlob?space=ats://did:plc:abc123/com.example.forum/main&cid=bafyrei...",
  {
    headers: {
      "X-Client-Key": CLIENT_KEY,
      "Authorization": `DPoP ${ACCESS_TOKEN}`,
      "DPoP": DPOP_PROOF,
    },
  },
);
const blob = await response.blob();
```

**Parameters:**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `space` | string | Yes | The space URI |
| `cid` | string | Yes | The CID of the blob |

The response body is the raw blob data with the original `Content-Type` header preserved.

### [Cross-service access](#cross-service-access)

Records can also be read using a [space credential](credentials) instead of direct membership. Pass the credential as a Bearer token:

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "https://happyview.example.com/xrpc/com.atproto.space.getRecord?space=...&collection=...&rkey=...",
  {
    headers: {
      "Authorization": `Bearer ${SPACE_CREDENTIAL}`,
    },
  },
);
const data = await response.json();
```

A feed generator or other service that isn't a direct member can use a credential issued by the space authority to read data without joining the space. No DPoP auth is needed — the credential itself authenticates the request.

[Members

Previous Page](/experimental/spaces/members)[Credentials

Next Page](/experimental/spaces/credentials)

#### On this page

[Creating a record](#creating-a-record)[Updating a record](#updating-a-record)[Getting a record](#getting-a-record)[Listing records](#listing-records)[Deleting a record](#deleting-a-record)[Batch writes (applyWrites)](#batch-writes-applywrites)[Optimistic concurrency](#optimistic-concurrency)[swapRecord](#swaprecord)[swapCommit](#swapcommit)[Repo state](#repo-state)[Record operation log](#record-operation-log)[Listing repos](#listing-repos)[Getting a blob](#getting-a-blob)[Cross-service access](#cross-service-access)

---
<!--
URL: https://happyview.dev/experimental/spaces/managing-spaces
title: Managing Spaces | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

[Overview](/experimental/spaces)[Managing Spaces](/experimental/spaces/managing-spaces)[Members](/experimental/spaces/members)[Records](/experimental/spaces/records)[Credentials](/experimental/spaces/credentials)[Write Notifications](/experimental/spaces/notifications)[Invites](/experimental/spaces/invites)[Changelog](/experimental/spaces/changelog)

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Managing Spaces

Permissioned Spaces

## Managing Spaces

### [Creating a space](#creating-a-space)

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("https://happyview.example.com/xrpc/com.atproto.simplespace.createSpace", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    "Authorization": `DPoP ${ACCESS_TOKEN}`,
    "DPoP": DPOP_PROOF,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    type: "com.example.forum",
    skey: "main",
    displayName: "My Forum",
    description: "A place for discussion",
    mintPolicy: "member-list",
  }),
});
interface CreateSpaceResponse {
  uri: string;
}
const data: CreateSpaceResponse = await response.json();
```

**Input:**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | string (NSID) | Yes | The space type; describes what this space is for |
| `skey` | string | Yes | Space key; differentiates spaces of the same type |
| `displayName` | string | No | Human-readable name |
| `description` | string | No | Description of the space |
| `mintPolicy` | string | No | `member-list` (default), `public`, or `managing-app` |
| `appAccess` | object | No | `{"type": "open"}` (default) or `{"type": "allowList", "allowed": [...]}` |
| `managingAppDid` | string | No | DID of the application that manages this space |
| `config` | object | No | Space configuration (see below) |

**Response (201):**

```
{
  "uri": "ats://did:plc:abc123/com.example.forum/main"
}
```

The creator is automatically added as a write member. Use [`com.atproto.space.getSpace`](#getting-a-space) to retrieve the full space object.

#### [Space configuration](#space-configuration)

The `config` object supports:

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `membershipPublic` | boolean | `false` | Whether the member list is visible without authentication |
| `recordsPublic` | boolean | `false` | Whether records are readable without membership |

Additional fields are preserved as-is.

### [Getting a space](#getting-a-space)

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "https://happyview.example.com/xrpc/com.atproto.space.getSpace?space=ats://did:plc:abc123/com.example.forum/main",
  {
    headers: {
      "X-Client-Key": CLIENT_KEY,
      "Authorization": `DPoP ${ACCESS_TOKEN}`,
      "DPoP": DPOP_PROOF,
    },
  },
);
interface GetSpaceResponse {
  uri: string;
  space: Space;
  config: SpaceConfig;
}
const data: GetSpaceResponse = await response.json();
```

If `membershipPublic` is `false`, the caller must be authenticated and be a member (or the authority) to see the space. Non-members receive a `404 Not Found`.

### [Listing spaces](#listing-spaces)

Returns spaces where the authenticated user is a member.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "https://happyview.example.com/xrpc/com.atproto.space.listSpaces?limit=20",
  {
    headers: {
      "X-Client-Key": CLIENT_KEY,
      "Authorization": `DPoP ${ACCESS_TOKEN}`,
      "DPoP": DPOP_PROOF,
    },
  },
);
interface Space {
  uri: string;
  isOwner: boolean;
}
interface ListSpacesResponse {
  spaces: Space[];
  cursor?: string;
}
const data: ListSpacesResponse = await response.json();
```

**Parameters:**

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `did` | string | No | authenticated user | Filter by DID |
| `limit` | integer | No | 50 | Max spaces to return (1-100) |
| `cursor` | string | No |  | Pagination cursor |

**Response:**

```
{
  "spaces": [
    {
      "uri": "ats://did:plc:abc123/com.example.forum/main",
      "isOwner": true
    }
  ],
  "cursor": "MjAyNi0wNS0wOVQxMjowMDowMFp8YXRzOi8vZGlkOnBsYzphYmMxMjMvY29tLmV4YW1wbGUuZm9ydW0vbWFpbg"
}
```

### [Updating a space](#updating-a-space)

Only the space authority or a HappyView super admin can update a space.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("https://happyview.example.com/xrpc/com.atproto.simplespace.updateSpace", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    "Authorization": `DPoP ${ACCESS_TOKEN}`,
    "DPoP": DPOP_PROOF,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    space: "ats://did:plc:abc123/com.example.forum/main",
    displayName: "Updated Forum Name",
    mintPolicy: "public",
  }),
});
```

All fields except `space` are optional. Only provided fields are updated. To clear an optional field, pass `null`.

### [Deleting a space](#deleting-a-space)

Only the space authority or a HappyView super admin can delete a space.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("https://happyview.example.com/xrpc/com.atproto.simplespace.deleteSpace", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    "Authorization": `DPoP ${ACCESS_TOKEN}`,
    "DPoP": DPOP_PROOF,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    space: "ats://did:plc:abc123/com.example.forum/main",
  }),
});
```

### [Getting configuration](#getting-configuration)

Returns the simplespace configuration for a space. Requires admin access (space authority or super admin).

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "https://happyview.example.com/xrpc/com.atproto.simplespace.getConfig?space=ats://did:plc:abc123/com.example.forum/main",
  {
    headers: {
      "X-Client-Key": CLIENT_KEY,
      "Authorization": `DPoP ${ACCESS_TOKEN}`,
      "DPoP": DPOP_PROOF,
    },
  },
);
interface SpaceConfig {
  $type: "com.atproto.simplespace.defs#spaceConfig";
  mintPolicy: string;
  appAccess: object;
  managingApp: string | null;
}
const data: SpaceConfig = await response.json();
```

**Response:**

```
{
  "$type": "com.atproto.simplespace.defs#spaceConfig",
  "mintPolicy": "member-list",
  "appAccess": { "type": "open" },
  "managingApp": null
}
```

| Field | Type | Description |
| --- | --- | --- |
| `mintPolicy` | string | `member-list`, `public`, or `managing-app` |
| `appAccess` | object | `{"type": "open"}` or `{"type": "allowList", "allowed": ["did:...", ...]}` |
| `managingApp` | string | null | DID of the application that manages this space |

### [Updating configuration](#updating-configuration)

Updates the simplespace configuration for a space. Requires admin access (space authority or super admin).

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("https://happyview.example.com/xrpc/com.atproto.simplespace.updateConfig", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    "Authorization": `DPoP ${ACCESS_TOKEN}`,
    "DPoP": DPOP_PROOF,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    space: "ats://did:plc:abc123/com.example.forum/main",
    mintPolicy: "public",
    appAccess: { type: "allowList", allowed: ["did:web:myapp.example.com"] },
  }),
});
```

**Input:**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `space` | string | Yes | Space URI |
| `mintPolicy` | string | No | `member-list`, `public`, or `managing-app` |
| `appAccess` | object | No | `{"type": "open"}` or `{"type": "allowList", "allowed": ["did:...", ...]}` |
| `managingApp` | string | null | No | DID of the managing app, or `null` to clear |

All fields except `space` are optional. Only provided fields are updated. The response returns the updated configuration in the same format as `getConfig`.

[Overview

Previous Page](/experimental/spaces)[Members

Next Page](/experimental/spaces/members)

#### On this page

[Creating a space](#creating-a-space)[Space configuration](#space-configuration)[Getting a space](#getting-a-space)[Listing spaces](#listing-spaces)[Updating a space](#updating-a-space)[Deleting a space](#deleting-a-space)[Getting configuration](#getting-configuration)[Updating configuration](#updating-configuration)

---
<!--
URL: https://happyview.dev/experimental/spaces/invites
title: Invites | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

[Overview](/experimental/spaces)[Managing Spaces](/experimental/spaces/managing-spaces)[Members](/experimental/spaces/members)[Records](/experimental/spaces/records)[Credentials](/experimental/spaces/credentials)[Write Notifications](/experimental/spaces/notifications)[Invites](/experimental/spaces/invites)[Changelog](/experimental/spaces/changelog)

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Invites

Permissioned Spaces

## Invites

Invites let space authorities distribute membership tokens without knowing recipients' DIDs in advance.

### [Creating an invite](#creating-an-invite)

Only the space authority or a super admin can create invites.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("https://happyview.example.com/xrpc/dev.happyview.space.createInvite", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    "Authorization": `DPoP ${ACCESS_TOKEN}`,
    "DPoP": DPOP_PROOF,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    space: "ats://did:plc:abc123/com.example.forum/main",
    access: "write",
    maxUses: 10,
    expiresAt: "2026-06-01T00:00:00Z",
  }),
});
interface CreateInviteResponse {
  inviteId: string;
  token: string;
  access: string;
  maxUses: number;
  expiresAt: string;
}
const data: CreateInviteResponse = await response.json();
```

**Input:**

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `space` | string | Yes |  | The space this invite is for |
| `access` | string | No | `read` | Access level granted on acceptance (`read`, `read_self`, or `write`) |
| `maxUses` | integer | No | unlimited | Maximum number of times the invite can be redeemed |
| `expiresAt` | string (datetime) | No | never | When the invite expires |

**Response (201):**

```
{
  "inviteId": "uuid",
  "token": "a1b2c3d4e5f6...",
  "access": "write",
  "maxUses": 10,
  "expiresAt": "2026-06-01T00:00:00Z"
}
```

### [Accepting an invite](#accepting-an-invite)

Any authenticated user can accept an invite token to join the space.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("https://happyview.example.com/xrpc/dev.happyview.space.acceptInvite", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    "Authorization": `DPoP ${ACCESS_TOKEN}`,
    "DPoP": DPOP_PROOF,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    token: "a1b2c3d4e5f6...",
  }),
});
interface AcceptInviteResponse {
  uri: string;
  access: string;
}
const data: AcceptInviteResponse = await response.json();
```

**Response (201):**

```
{
  "uri": "ats://did:plc:abc123/com.example.forum/main",
  "access": "write"
}
```

Acceptance fails if:

* The token is invalid (no matching hash found)
* The invite has been revoked
* The invite has reached its `maxUses`
* The invite has expired
* The user is already a member of the space

### [Revoking an invite](#revoking-an-invite)

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("https://happyview.example.com/xrpc/dev.happyview.space.revokeInvite", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    "Authorization": `DPoP ${ACCESS_TOKEN}`,
    "DPoP": DPOP_PROOF,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    space: "ats://did:plc:abc123/com.example.forum/main",
    inviteId: "uuid",
  }),
});
```

Revoking an invite prevents future redemptions but does not remove members who already redeemed it.

### [Listing invites](#listing-invites)

Only the space authority or a super admin can list invites.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "https://happyview.example.com/xrpc/dev.happyview.space.listInvites?space=ats://did:plc:abc123/com.example.forum/main",
  {
    headers: {
      "X-Client-Key": CLIENT_KEY,
      "Authorization": `DPoP ${ACCESS_TOKEN}`,
      "DPoP": DPOP_PROOF,
    },
  },
);
interface Invite {
  id: string;
  access: string;
  maxUses: number;
  uses: number;
  expiresAt: string;
  revoked: boolean;
  createdBy: string;
  createdAt: string;
}
const data: { invites: Invite[] } = await response.json();
```

**Parameters:**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `space` | string | Yes | The space to list invites for |

**Response:**

```
{
  "invites": [
    {
      "id": "uuid",
      "access": "write",
      "maxUses": 10,
      "uses": 3,
      "expiresAt": "2026-06-01T00:00:00Z",
      "revoked": false,
      "createdBy": "did:plc:abc123",
      "createdAt": "2026-05-09T12:00:00Z"
    }
  ]
}
```

The token itself is never returned in list responses — only the invite metadata.

[Write Notifications

Previous Page](/experimental/spaces/notifications)[Changelog

Next Page](/experimental/spaces/changelog)

#### On this page

[Creating an invite](#creating-an-invite)[Accepting an invite](#accepting-an-invite)[Revoking an invite](#revoking-an-invite)[Listing invites](#listing-invites)

---
<!--
URL: https://happyview.dev/experimental/spaces
title: Overview | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

[Overview](/experimental/spaces)[Managing Spaces](/experimental/spaces/managing-spaces)[Members](/experimental/spaces/members)[Records](/experimental/spaces/records)[Credentials](/experimental/spaces/credentials)[Write Notifications](/experimental/spaces/notifications)[Invites](/experimental/spaces/invites)[Changelog](/experimental/spaces/changelog)

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Overview

Permissioned Spaces

## Overview

Spaces are containers for permissioned data in atproto. Unlike regular public records that live in a user's repo, space records are gated by membership — only members can read or write data within a space.

### [Concepts](#concepts)

A **space** is identified by three components:

* **Space DID** — the space's own decentralized identifier (for personal spaces, this is the user's DID)
* **Type** — the space type as an NSID, describing the modality (e.g. a forum, a group chat, a photo album)
* **Space key (skey)** — a short string differentiating multiple spaces of the same type

These form the space URI: `ats://<space-did>/<type>/<skey>`

A **space record** adds three more components to the URI: the author's DID, the collection NSID, and the record key:

```
ats://<space-did>/<type-nsid>/<skey>/<author-did>/<collection>/<rkey>
```

### [Feature flag](#feature-flag)

In HappyView, spaces are gated behind the `feature.spaces_enabled` instance setting. Enable it in the dashboard under **Settings** or via the admin API:

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("http://127.0.0.1:3000/admin/settings/feature.spaces_enabled", {
  method: "PUT",
  headers: {
    "Authorization": `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ value: "true" }),
});
```

When disabled, all space endpoints return a `404` error with `FeatureDisabled` as the error code.

### [Endpoints](#endpoints)

Space endpoints are split across two namespaces:

* **`com.atproto.space.*`** — protocol-level routes (queries, data, credentials)
* **`com.atproto.simplespace.*`** — management routes (create/update/delete spaces, membership)

The previous `dev.happyview.space.*` endpoints remain as backward-compatible aliases until v3. All endpoints require [DPoP authentication](../../getting-started/authentication) or cookie-based session auth.

| Endpoint | Method | Description |
| --- | --- | --- |
| `com.atproto.simplespace.createSpace` | POST | Create a space |
| `com.atproto.space.getSpace` | GET | Get a space by URI |
| `com.atproto.space.listSpaces` | GET | List spaces by membership |
| `com.atproto.simplespace.updateSpace` | POST | Update space metadata |
| `com.atproto.simplespace.deleteSpace` | POST | Delete a space |
| `com.atproto.simplespace.getConfig` | GET | Get space configuration |
| `com.atproto.simplespace.updateConfig` | POST | Update space configuration |
| `com.atproto.space.createRecord` | POST | Create a record (auto-generated rkey) |
| `com.atproto.space.putRecord` | POST | Write a record |
| `com.atproto.space.getRecord` | GET | Get a record |
| `com.atproto.space.listRecords` | GET | List records |
| `com.atproto.space.deleteRecord` | POST | Delete a record |
| `com.atproto.space.applyWrites` | POST | Batch write operations |
| `com.atproto.simplespace.addMember` | POST | Add a member |
| `com.atproto.simplespace.removeMember` | POST | Remove a member |
| `com.atproto.simplespace.listMembers` | GET | List resolved members |
| `com.atproto.space.getRepoState` | GET | Get per-user repo state (LtHash + commit) |
| `com.atproto.space.listRepoOps` | GET | List record operation log entries |
| `com.atproto.space.listRepos` | GET | List repos (authors) in a space |
| `com.atproto.space.getDelegationToken` | GET | Get a delegation token (step 1 of credentials) |
| `com.atproto.space.getSpaceCredential` | POST | Get a space credential (step 2) |
| `com.atproto.space.getBlob` | GET | Get a blob from a space |
| `com.atproto.space.registerNotify` | POST | Register for write notifications |
| `com.atproto.space.notifyWrite` | POST | Push a write notification |
| `com.atproto.space.notifySpaceDeleted` | POST | Push a space-deleted notification |
| `dev.happyview.space.createInvite` | POST | Create an invite (HappyView extension) |
| `dev.happyview.space.acceptInvite` | POST | Accept an invite (HappyView extension) |
| `dev.happyview.space.revokeInvite` | POST | Revoke an invite (HappyView extension) |
| `dev.happyview.space.listInvites` | GET | List invites (HappyView extension) |

### [Access model](#access-model)

Spaces use two independent controls for access:

**Mint policy** controls who can create permissioned repos in the space:

* **`member-list`** (default) — only members can create repos
* **`public`** — anyone can create repos
* **`managing-app`** — only the managing app can create repos

**App access** controls which third-party apps can interact with the space:

* **`open`** (default) — any app can access
* **`allowList`** — only explicitly listed apps can access

Individual users access spaces through **membership**. Members have one of three access levels:

* **`write`** — can read and write data
* **`read`** — can read all data in the space
* **`read_self`** — can only read their own data within the space

Write access implies read. The space creator is automatically added as a write member.

Spaces also support **delegation** — adding another space as a member, which transitively grants access to all members of the delegated space.

### [Alignment with Proposal 0016](#alignment-with-proposal-0016)

HappyView implements [AT Protocol Proposal 0016](https://github.com/bluesky-social/proposals) (Permissioned Data) with some HappyView-specific extensions.

#### [Protocol features implemented](#protocol-features-implemented)

* **Namespace split** — `com.atproto.space.*` for protocol routes, `com.atproto.simplespace.*` for management
* **Mint policy** — `member-list`, `public`, `managing-app` (replaces `accessMode`)
* **App access** — `open`, `allowList` (replaces `appAllowlist`/`appDenylist`)
* **Delegation tokens** — `getDelegationToken` (GET, 60-second TTL) replaces `getMemberGrant`
* **Space credentials** — `atproto-space-credential+jwt` typ, ES256, 2-hour TTL
* **Deniable commit signatures** — user signs context (space + rev + random IKM), not content hash
* **LtHash** — homomorphic set-hash (2048-byte state, 1024 uint16 lanes, BLAKE3 XOF)
* **Record operation log** — `listRepoOps` returns the oplog for sync
* **Repo state** — `getRepoState` returns LtHash state + signed commit
* **Write notifications** — `registerNotify`, `notifyWrite`, `notifySpaceDeleted`
* **Space-scoped blobs** — `getBlob`
* **Authority DID** — spaces use `authority_did` (not `owner_did`) with a separate `creator_did`

#### [HappyView extensions (not in the protocol spec)](#happyview-extensions-not-in-the-protocol-spec)

* **Invite system** — `createInvite`, `acceptInvite`, `revokeInvite`, `listInvites` (under `dev.happyview.space.*`)
* **`isDelegation` on members** — allows spaces to be members of other spaces
* **`displayName`, `description` on spaces** — human-readable metadata
* **`config` object** — `membershipPublic`, `recordsPublic`, plus arbitrary extra fields
* **`read_self` access level** — restricts reads to the member's own data

### [Next steps](#next-steps)

* [Managing Spaces](./managing-spaces) — create, update, and delete spaces
* [Members](./members) — manage membership and delegation
* [Records](./records) — read and write permissioned data
* [Credentials](./credentials) — cross-service authentication for spaces
* [Invites](./invites) — invite-based membership
* [Changelog](./changelog) — version history

[@happyview/oauth-client-node

Previous Page](/sdk/oauth-client-node/changelog)[Managing Spaces

Next Page](/experimental/spaces/managing-spaces)

#### On this page

[Concepts](#concepts)[Feature flag](#feature-flag)[Endpoints](#endpoints)[Access model](#access-model)[Alignment with Proposal 0016](#alignment-with-proposal-0016)[Protocol features implemented](#protocol-features-implemented)[HappyView extensions (not in the protocol spec)](#happyview-extensions-not-in-the-protocol-spec)[Next steps](#next-steps)

---
<!--
URL: https://happyview.dev/experimental/spaces/members
title: Members | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

[Overview](/experimental/spaces)[Managing Spaces](/experimental/spaces/managing-spaces)[Members](/experimental/spaces/members)[Records](/experimental/spaces/records)[Credentials](/experimental/spaces/credentials)[Write Notifications](/experimental/spaces/notifications)[Invites](/experimental/spaces/invites)[Changelog](/experimental/spaces/changelog)

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

Members

Permissioned Spaces

## Members

Membership determines who can read and write within a space. Members have one of three access levels — `write`, `read`, or `read_self`. Write implies read. `read_self` restricts the member to reading only their own records within the space.

### [Adding a member](#adding-a-member)

Only the space authority or a super admin can add members.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("https://happyview.example.com/xrpc/com.atproto.simplespace.addMember", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    "Authorization": `DPoP ${ACCESS_TOKEN}`,
    "DPoP": DPOP_PROOF,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    space: "ats://did:plc:abc123/com.example.forum/main",
    did: "did:plc:newmember",
    access: "write",
    isDelegation: false,
  }),
});
interface Member {
  id: string;
  spaceId: string;
  did: string;
  access: string;
  isDelegation: boolean;
  grantedBy: string;
  createdAt: string;
}
const data: { member: Member } = await response.json();
```

**Input:**

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `space` | string | Yes |  | The space to add the member to |
| `did` | string | Yes |  | DID of the member (or space for delegation) |
| `access` | string | No | `read` | `read`, `read_self`, or `write` |
| `isDelegation` | boolean | No | `false` | Whether this member is a delegated space |

**Response (201):**

```
{
  "member": {
    "id": "uuid",
    "spaceId": "space-uuid",
    "did": "did:plc:newmember",
    "access": "write",
    "isDelegation": false,
    "grantedBy": "did:plc:abc123",
    "createdAt": "2026-05-09T12:00:00Z"
  }
}
```

### [Removing a member](#removing-a-member)

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("https://happyview.example.com/xrpc/com.atproto.simplespace.removeMember", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    "Authorization": `DPoP ${ACCESS_TOKEN}`,
    "DPoP": DPOP_PROOF,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    space: "ats://did:plc:abc123/com.example.forum/main",
    did: "did:plc:newmember",
  }),
});
```

### [Listing members](#listing-members)

TypeScriptJavaScriptRustGocURL

```
const response = await fetch(
  "https://happyview.example.com/xrpc/com.atproto.simplespace.listMembers?space=ats://did:plc:abc123/com.example.forum/main",
  {
    headers: {
      "X-Client-Key": CLIENT_KEY,
      "Authorization": `DPoP ${ACCESS_TOKEN}`,
      "DPoP": DPOP_PROOF,
    },
  },
);
interface ResolvedMember {
  did: string;
  access: string;
}
const data: { members: ResolvedMember[] } = await response.json();
```

If the space's `membershipPublic` config is `true`, this endpoint is accessible without authentication. Otherwise, the caller must be authenticated and be a member.

The response returns the **resolved** member list — delegation chains are traversed and flattened:

```
{
  "members": [
    { "did": "did:plc:abc123", "access": "write" },
    { "did": "did:plc:newmember", "access": "write" },
    { "did": "did:plc:delegated-user", "access": "read" }
  ]
}
```

### [Delegation](#delegation)

A space can be added as a member of another space by setting `isDelegation: true`. This transitively grants access to all members of the delegated space.

TypeScriptJavaScriptRustGocURL

```
const response = await fetch("https://happyview.example.com/xrpc/com.atproto.simplespace.addMember", {
  method: "POST",
  headers: {
    "X-Client-Key": CLIENT_KEY,
    "Authorization": `DPoP ${ACCESS_TOKEN}`,
    "DPoP": DPOP_PROOF,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    space: "ats://did:plc:abc123/com.example.forum/main",
    did: "ats://did:plc:org/com.example.team/engineering",
    access: "read",
    isDelegation: true,
  }),
});
```

Delegation chains are resolved up to 10 levels deep. When a user appears in multiple chains, the highest access level wins (`write` > `read`).

#### [Example: nested teams](#example-nested-teams)

In this example:

* Alice has `write` access (via Engineering)
* Bob has `write` access (via Engineering)
* Carol has `read` access (via Design)
* Alice also appears in Design, but `write` wins over `read`

[Managing Spaces

Previous Page](/experimental/spaces/managing-spaces)[Records

Next Page](/experimental/spaces/records)

#### On this page

[Adding a member](#adding-a-member)[Removing a member](#removing-a-member)[Listing members](#listing-members)[Delegation](#delegation)[Example: nested teams](#example-nested-teams)

---
<!--
URL: https://happyview.dev/sdk/oauth-client/changelog
title: @happyview/oauth-client | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

[OAuth Client](/sdk/oauth-client/overview)[@happyview/oauth-client](/sdk/oauth-client/changelog)

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

@happyview/oauth-client

OAuth Client

## @happyview/oauth-client

### [v1.3.0](#v130)

*Released 2026-06-30*

#### [Bug Fixes](#bug-fixes)

* expose oauth scopes via the SDKs ([ae69736](https://github.com/gamesgamesgamesgamesgames/happyview/commit/ae69736cdb6323c46e2b8e746940d5e9ac8685c0))
* handle the scope format returned from Bluesky PDS ([2066c7f](https://github.com/gamesgamesgamesgamesgames/happyview/commit/2066c7f76ea2af14670c547e42d13364b3275b03))
* restore SDK scopes types after bad conflict resolution ([44986ab](https://github.com/gamesgamesgamesgamesgames/happyview/commit/44986ab404043780ad838cfc35da16b0cda664ae))
* scopes types in oauth-client sdk after bad conflict resolution ([d49033e](https://github.com/gamesgamesgamesgamesgames/happyview/commit/d49033ec5f8e35538e5ce31a71619e39053fd0f4))
* **sdk:** support the `kid` param from `@atproto/jwk-webcrypto` ([8a09489](https://github.com/gamesgamesgamesgamesgames/happyview/commit/8a094893395c1894c00484b1ca692ff053f85f32))
* update scopes type ([635bcd6](https://github.com/gamesgamesgamesgamesgames/happyview/commit/635bcd6d812670f949611ff96c81aa9f56795f9a))

#### [Features](#features)

* add support for session hooks ([e1a6b00](https://github.com/gamesgamesgamesgamesgames/happyview/commit/e1a6b004cabfaacd68c9b81e7a29327214554a61))
* update JS SDKs to more closely match their [@atproto](https://github.com/atproto) cousins ([df717e9](https://github.com/gamesgamesgamesgamesgames/happyview/commit/df717e9d5a175f7eaae14ae3e7afb36956fa9007))

### [v1.1.1](#v111)

*Released 2026-05-08*

#### [Bug Fixes](#bug-fixes-1)

* expose oauth scopes via the SDKs ([bbcddd0](https://github.com/gamesgamesgamesgamesgames/happyview/commit/bbcddd08fd12105e1c047616cf84dc71a44bf9b7))

### [v1.1.0](#v110)

*Released 2026-05-05*

#### [Features](#features-1)

* update JS SDKs to more closely match their [@atproto](https://github.com/atproto) cousins ([7b87c36](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7b87c36ffd9458942c321009b4a39013abb9cff7))

### [v1.0.0](#v100)

*Released 2026-04-23*

#### [Bug Fixes](#bug-fixes-2)

* **event-log:** prevent double filtering ([cf7a227](https://github.com/gamesgamesgamesgamesgames/happyview/commit/cf7a227a78f640ffc67ba0633cb31a8e21012c69))
* **sdk:** add gh links to packages ([718075a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/718075a53c7e69efecf24cc5c9989e600745a378))
* **sdk:** prevent CI crash if versions are already deployed ([3c4a6d0](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3c4a6d07b1da0e40c142df7baae76251f58dd793))
* **sdk:** take advantage of prior art on crypto from bsky ([7df0576](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7df0576080632d46b907d7587cbe79be8bbae62e))

#### [Features](#features-2)

* add js sdks ([3fd4645](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3fd4645aee26193a97f436d71cd5782ffbcce206))

[OAuth Client

Previous Page](/sdk/oauth-client/overview)[Browser Client

Next Page](/sdk/oauth-client-browser/overview)

#### On this page

[v1.3.0](#v130)[Bug Fixes](#bug-fixes)[Features](#features)[v1.1.1](#v111)[Bug Fixes](#bug-fixes-1)[v1.1.0](#v110)[Features](#features-1)[v1.0.0](#v100)[Bug Fixes](#bug-fixes-2)[Features](#features-2)

---
<!--
URL: https://happyview.dev/sdk/lex-agent/changelog
title: @happyview/lex-agent | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

[Lex Agent](/sdk/lex-agent/overview)[@happyview/lex-agent](/sdk/lex-agent/changelog)

OAuth Client

OAuth Client Browser

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

@happyview/lex-agent

Lex Agent

## @happyview/lex-agent

### [v1.2.0](#v120)

*Released 2026-06-30*

#### [Features](#features)

* update JS SDKs to more closely match their [@atproto](https://github.com/atproto) cousins ([df717e9](https://github.com/gamesgamesgamesgamesgames/happyview/commit/df717e9d5a175f7eaae14ae3e7afb36956fa9007))

### [v1.1.0](#v110)

*Released 2026-05-05*

#### [Features](#features-1)

* update JS SDKs to more closely match their [@atproto](https://github.com/atproto) cousins ([7b87c36](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7b87c36ffd9458942c321009b4a39013abb9cff7))

### [v1.0.1](#v101)

*Released 2026-04-24*

#### [Bug Fixes](#bug-fixes)

* **sdk:** add gh links to packages ([718075a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/718075a53c7e69efecf24cc5c9989e600745a378))

### [v1.0.0](#v100)

*Released 2026-04-24*

#### [Bug Fixes](#bug-fixes-1)

* **event-log:** prevent double filtering ([cf7a227](https://github.com/gamesgamesgamesgamesgames/happyview/commit/cf7a227a78f640ffc67ba0633cb31a8e21012c69))
* **sdk:** add gh links to packages ([718075a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/718075a53c7e69efecf24cc5c9989e600745a378))
* **sdk:** prevent CI crash if versions are already deployed ([3c4a6d0](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3c4a6d07b1da0e40c142df7baae76251f58dd793))
* **sdk:** take advantage of prior art on crypto from bsky ([7df0576](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7df0576080632d46b907d7587cbe79be8bbae62e))

#### [Features](#features-2)

* add js sdks ([3fd4645](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3fd4645aee26193a97f436d71cd5782ffbcce206))

[Lex Agent

Previous Page](/sdk/lex-agent/overview)[OAuth Client

Next Page](/sdk/oauth-client/overview)

#### On this page

[v1.2.0](#v120)[Features](#features)[v1.1.0](#v110)[Features](#features-1)[v1.0.1](#v101)[Bug Fixes](#bug-fixes)[v1.0.0](#v100)[Bug Fixes](#bug-fixes-1)[Features](#features-2)

---
<!--
URL: https://happyview.dev/sdk/oauth-client-browser/changelog
title: @happyview/oauth-client-browser | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

[Browser Client](/sdk/oauth-client-browser/overview)[@happyview/oauth-client-browser](/sdk/oauth-client-browser/changelog)

OAuth Client Node

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

@happyview/oauth-client-browser

OAuth Client Browser

## @happyview/oauth-client-browser

### [v1.4.0](#v140)

*Released 2026-06-30*

#### [Bug Fixes](#bug-fixes)

* prevent errors with IPv6 addresses when building loopback clients ([23e858b](https://github.com/gamesgamesgamesgamesgames/happyview/commit/23e858b449e613df460f5d1c67d3f2c7a31f3d39))

#### [Features](#features)

* add support for session hooks ([e1a6b00](https://github.com/gamesgamesgamesgamesgames/happyview/commit/e1a6b004cabfaacd68c9b81e7a29327214554a61))
* update JS SDKs to more closely match their [@atproto](https://github.com/atproto) cousins ([df717e9](https://github.com/gamesgamesgamesgamesgames/happyview/commit/df717e9d5a175f7eaae14ae3e7afb36956fa9007))

### [v1.2.0](#v120)

*Released 2026-05-05*

#### [Features](#features-1)

* update JS SDKs to more closely match their [@atproto](https://github.com/atproto) cousins ([7b87c36](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7b87c36ffd9458942c321009b4a39013abb9cff7))

### [v1.1.0](#v110)

*Released 2026-04-25*

#### [Features](#features-2)

* **sdk:** allow client to configure clientId ([e76acbe](https://github.com/gamesgamesgamesgamesgames/happyview/commit/e76acbea356b453910ffdc6eaac78b42bfd2fd74))

### [v1.0.0](#v100)

*Released 2026-04-23*

#### [Bug Fixes](#bug-fixes-1)

* **sdk:** add gh links to packages ([718075a](https://github.com/gamesgamesgamesgamesgames/happyview/commit/718075a53c7e69efecf24cc5c9989e600745a378))
* **sdk:** prevent CI crash if versions are already deployed ([3c4a6d0](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3c4a6d07b1da0e40c142df7baae76251f58dd793))
* **sdk:** take advantage of prior art on crypto from bsky ([7df0576](https://github.com/gamesgamesgamesgamesgames/happyview/commit/7df0576080632d46b907d7587cbe79be8bbae62e))

#### [Features](#features-3)

* add js sdks ([3fd4645](https://github.com/gamesgamesgamesgamesgames/happyview/commit/3fd4645aee26193a97f436d71cd5782ffbcce206))

[Browser Client

Previous Page](/sdk/oauth-client-browser/overview)[Node Client

Next Page](/sdk/oauth-client-node/overview)

#### On this page

[v1.4.0](#v140)[Bug Fixes](#bug-fixes)[Features](#features)[v1.2.0](#v120)[Features](#features-1)[v1.1.0](#v110)[Features](#features-2)[v1.0.0](#v100)[Bug Fixes](#bug-fixes-1)[Features](#features-3)

---
<!--
URL: https://happyview.dev/sdk/oauth-client-node/changelog
title: @happyview/oauth-client-node | HappyView
-->

[![HappyView](/img/logo.dark.png)![HappyView](/img/logo.light.png)](/)

* [Docs](/)
* [Blog](/blog)
* [Source](https://tangled.org/gamesgamesgamesgames.games/happyview)

Search

`⌘``K`

[Introduction](/)

Getting Started

[Quickstart](/getting-started/quickstart)[Configuration](/getting-started/configuration)[Service Identity](/getting-started/service-identity)[Dashboard](/getting-started/dashboard)[Authentication](/getting-started/authentication)

Deployment

Tutorials

[Statusphere](/tutorials/statusphere)

Guides

[Migrating from v1](/guides/upgrading-to-v2)[Lexicons](/guides/lexicons)[Backfill](/guides/backfill)[Lua Scripting](/guides/lua-scripting)[API Clients](/guides/api-clients)[Attestation Signing](/guides/attestation-signing)[Labelers](/guides/labelers)[Plugins](/guides/plugins)[Developing Plugins](/guides/developing-plugins)[API Keys](/guides/api-keys)[Permissions](/guides/permissions)[Event Logs](/guides/event-logs)

Database

JavaScript SDKs

[Overview](/sdk/overview)

Lex Agent

OAuth Client

OAuth Client Browser

OAuth Client Node

[Node Client](/sdk/oauth-client-node/overview)[@happyview/oauth-client-node](/sdk/oauth-client-node/changelog)

Experimental

Permissioned Spaces

API Reference

[XRPC API](/api-reference/xrpc-api)

Admin API

OAuth API

Lua API

Reference

[Glossary](/reference/glossary)[Architecture](/reference/architecture)

Script Examples

[Troubleshooting](/reference/troubleshooting)[HappyView](/reference/changelog)

@happyview/oauth-client-node

OAuth Client Node

## @happyview/oauth-client-node

### [v1.0.0](#v100)

*Released 2026-06-30*

#### [Bug Fixes](#bug-fixes)

* cleanup derelict items after successful auth ([9fe1989](https://github.com/gamesgamesgamesgamesgames/happyview/commit/9fe1989140df60a1b02a531d488e2a4c957046ef))
* cleanup derelict items after successful auth ([6c76088](https://github.com/gamesgamesgamesgamesgames/happyview/commit/6c760888cd7aa3df88cc65f14d9e6043b3dc7ecc))

#### [Features](#features)

* add oauth-client-node SDK ([4ea257c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/4ea257c49d9509739acfb1c12b7d8e1a5639f11a))
* add oauth-client-node SDK ([488a6df](https://github.com/gamesgamesgamesgamesgames/happyview/commit/488a6df874404dfe2fc121c5599331ead8750900))
* publish node sdk ([d81e23c](https://github.com/gamesgamesgamesgamesgames/happyview/commit/d81e23cec7152d14dace745301cbafa10638f67c))
* publish node sdk ([705c575](https://github.com/gamesgamesgamesgamesgames/happyview/commit/705c575f568c1f1523a4a7c27c1a41fa41ff24b2))

[Node Client

Previous Page](/sdk/oauth-client-node/overview)[Overview

Next Page](/experimental/spaces)

#### On this page

[v1.0.0](#v100)[Bug Fixes](#bug-fixes)[Features](#features)

---