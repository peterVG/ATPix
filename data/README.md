# Data directory

This directory stores local Docker bind-mount data excluded from version control. Contents can grow large and are recreated by `docker compose` on first start.

## Used by ATPix

| Path | Service | Contents |
|------|---------|----------|
| `data/grafana_data/` | Grafana (`docker-compose.yml`) | Dashboards and Grafana state |
| `data/loki_data/` | Loki | Indexed log chunks |
| `data/prometheus_data/` | Prometheus | Time-series metrics |
| `data/redpanda_data/` | Redpanda | Kafka-compatible log buffer |
| `data/happyview_data/` | HappyView (`docker-compose.happyview.yml`) | SQLite index, OAuth sessions, lexicon registry |

User photo libraries are **not** stored here — canonical records and blobs live on each user's remote PDS (and permissioned space repos). See [docs/overview/000-architecture.md](../docs/overview/000-architecture.md#54-local-storage-bind-mounts).