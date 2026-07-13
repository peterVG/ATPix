# Architecture Decision Record - ATPix

**003-observability-stack.md**

## Title

Centralized observability stack (Promtail, Redpanda, Loki, Prometheus, Grafana)

## Status

Accepted

## Context / Requirement Reference

[AGENTS.md](../../AGENTS.md) Centralized Logging & Observability mandates stdout-only application logs routed through Promtail → Redpanda → Loki with Prometheus metrics and Grafana dashboards. [docs/overview/002-prd.md](../overview/002-prd.md) NFR-004 and RC-005 repeat this requirement. Root [docker-compose.yml](../../docker-compose.yml) already provisions the stack.

## Decision

Retain the template `docker-compose.yml` observability services. ATPix `apps/backend` and `apps/frontend` containers emit logs to stdout; Promtail scrapes Docker container logs via `config/promtail/docker-config.yaml`. Grafana listens on port **3000**; HappyView runs on a **separate** port (default **3001**) to avoid conflict.

## Rationale

Reusing the Open Agent Dev stack avoids bespoke logging infrastructure. Separating HappyView from Grafana prevents port collisions during local development.

## Assumptions

Developers run `docker compose up` for observability; HappyView is deployed independently (Docker, Railway, or `cargo run`).

## Alternatives Considered

- **File-based app logging:** Rejected per stdout mandate.
- **Running HappyView on 3000:** Rejected; Grafana is already bound to 3000 in compose.

## Consequences / Implications

Local setup requires Docker. Production observability wiring is deferred to deployment ADRs.

## Related Decisions / Notes

[config/loki/local-config.yaml](../../config/loki/local-config.yaml), [config/prometheus/prometheus.yml](../../config/prometheus/prometheus.yml).