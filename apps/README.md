# Apps Directory (`/apps`)

Monorepo workspace for deployable ATPix applications. Global tooling and docs stay at the repository root; each app owns its dependencies, tests, and Dockerfile.

## Layout

| Path | Role | Port (dev) |
|------|------|------------|
| [`frontend/`](./frontend/) | Vanilla JS + Vite gallery UI; HappyView OAuth/XRPC via `@happyview/*` SDKs | 5173 |
| [`backend/`](./backend/) | FastAPI auxiliary API (health, future C2PA 2.2 processing) | 8000 |

**HappyView App View** (PRD TC-001) runs **outside** this repo — typically `http://127.0.0.1:3001` so it does not conflict with Grafana on port 3000.

## Python virtual environment

All Python commands run inside `apps/backend/.venv`:

```bash
cd apps/backend
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

## Testing

- Backend: `cd apps/backend && pytest` → `tests/allure-results/`
- Frontend: `cd apps/frontend && npm run test:unit` → `tests/allure-results/`

See [docs/architecture/001-test-runners-and-reporting.md](../docs/architecture/001-test-runners-and-reporting.md).

## Docker

Root `docker-compose.yml` builds `frontend` and `backend` alongside the observability and datastore services.