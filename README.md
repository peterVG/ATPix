# About this project

ATPix is a decentralized photo gallery on the [AT Protocol](https://atproto.com). Users authenticate via OAuth, store photos as signed PDS records, and browse through a [HappyView](https://happyview.dev) App View. This monorepo contains the **vanilla JS frontend** and **FastAPI auxiliary backend** (C2PA/health); HappyView handles atproto indexing and XRPC per [docs/architecture/005-application-architecture.md](docs/architecture/005-application-architecture.md).

## Prerequisites

Install runtimes using a version manager ([mise](https://mise.jdx.dev/), [asdf](https://asdf-vm.com/), [nvm](https://github.com/nvm-sh/nvm), or [pyenv](https://github.com/pyenv/pyenv)) — do not rely on OS-shipped Python/Node alone.

| Tool | Version | Docs |
|------|---------|------|
| Python | 3.11+ | [python.org/downloads](https://www.python.org/downloads/) |
| Node.js | 22+ | [nodejs.org](https://nodejs.org/) |
| Docker | latest | [docs.docker.com](https://docs.docker.com/get-docker/) |

Copy environment template: `cp .env.example .env` and set `VITE_HAPPYVIEW_CLIENT_KEY`.

# Setup Development Environment

## Run the application

**HappyView** (separate process): deploy per [happyview.dev](https://happyview.dev) on port **3001** (Grafana uses **3000** in compose).

**Backend** (from `apps/backend/`):

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

**Frontend** (from `apps/frontend/`):

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173). API health: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health).

**Full stack via Docker:**

```bash
docker compose up backend frontend grafana loki promtail prometheus redpanda
```

## Run tests

Lint first (see [.agents/rules/lint-enforce.md](.agents/rules/lint-enforce.md)):

```bash
cd apps/backend && source .venv/bin/activate && ruff check . --fix && ruff format .
cd apps/frontend && npm run format && npm run lint
```

**Backend** (`apps/backend/`, venv active):

```bash
pytest
```

**Frontend** (`apps/frontend/`):

```bash
npm install
npx playwright install    # required before e2e tests are added
npm run build             # production artifact for UI test mandate
npm run test:unit
```

**Allure reports** (install [Allure CLI](https://allurereport.org/docs/install/)):

```bash
allure serve apps/backend/tests/allure-results
allure serve apps/frontend/tests/allure-results
```

## View logs

Start the observability stack:

```bash
docker compose up -d loki promtail prometheus redpanda grafana
```

- **Grafana:** [http://localhost:3000](http://localhost:3000) (default `admin` / `admin`)
- **Prometheus:** [http://localhost:9090](http://localhost:9090)
- **Loki:** [http://localhost:3100](http://localhost:3100)

Application containers (`backend`, `frontend`) log to stdout; Promtail ships Docker logs to Loki per `config/promtail/docker-config.yaml`.

## Viewing Developer Documentation

# Setup Production Environment

## Deploy to Production

## Monitor and Update

---

# About Open Agent Dev

This project has been created using Open Agent Dev, an opionated AI Agent project template focused on docs-as-code development. 

It enforces a strict Branch-Per-Task workflow and Test-Driven Development (TDD). Designed to guide AI dev agents to comply with industry standards and best practices. Tech stack and AI agent neutral.

# Getting Started with Open Agent Dev

## Upload reference documents if you have any
Upload any reference documents to the `/docs/references/` directory. This includes technical specifications, API references, RFC documents, industry standards, academic papers, technical architecture documents, research papers, library documentation, framework guides, platform specifications, etc.

```text
@AGENTS.md read any reference documents in @docs/references/ and use the @.agents/skills/kb-synthesizer skill to generate a knowledge base in @.agents/kb/
```

## Create a Product Vision
Fill out [`docs/templates/product-vision.md`](./docs/templates/product-vision-template.md) as best as possible and save it as [`/docs/product-vision.md`](./docs/product-vision.md)

If you want AI Agent assistance to write the product vision document, you can invoke the bundled skill:
```text
/product-vision I want to build [XYZ]. Refer to the @.agents/kb/ folder for any relevant background information.
```

## Create a Product Requirements Document

```text
@AGENTS.md Generate a prd.md in @docs using the @.agents/skills/prd-writer skill. Base it on @docs/product-vision.md, the @.agents/kb/ folder and the principles in the AGENTS.md file.
```
Review and revise [`/docs/prd.md`](./docs/prd.md) as needed. Check [`/docs/templates/prd-template.md`](./docs/templates/prd-template.md) for additional guidance. Make sure to add any additional requirements that you think are necessary to fully define the product vision.

## Initialize the project

Open Agent Dev currently supports best practices for the Python/Javascript and BEAM/Elixir tech stacks.

```text
@AGENTS.md Initialize the project using the @.agents/skills/SKILL-init-beam-elixir.md skill, the technical stack decisions in @docs/prd.md and the principles in the AGENTS.md file.
```

OR

```text
@AGENTS.md Initialize the project using the @.agents/skills/SKILL-init-python-js.md skill, the technical stack decisions in @docs/prd.md and the principles in the AGENTS.md file.
```

## Create a Software Requirement Specification document and Architecture Decision Records

```text
@AGENTS.md Generate a srs.md in @docs [or @apps/app_123/docs] using the @.agents/skills/srs-writer skill. Base it on @docs/prd.md and the principles in the AGENTS.md file. Use the @.agents/skills/feature-writer skill to generate BDD feature scenarios for each unique requirement in @docs/srs.md and @docs/prd.md. Use the @.agents/rules/adr-formatting.md rule to generate ADR files in the @docs/architecture/ folder based on the technical decisions in @docs/prd.md and @docs/srs.md. Populate the # About this project section of this README.md file with a description of the project based on the @docs/product-vision.md, @docs/prd.md, @docs/srs.md, ADR files and BDD feature files.
```

## Generate an implementation plan to guide development
### The "Global Holistic Execution" Prompt
Use this when you have updated the core PRD or added entirely new modules to a monorepo and need the AI to synthesize everything across the entire project from scratch.
```text
@AGENTS.md Invoke the @plan-writer skill. Delete any existing \plan.md` files across the repository. Then, rigorously analyze the root @docs/prd.md, all `srs.md` configurations in the `apps/` directory, and the @docs/architecture/ records. Synthesize these requirements and generate the global roadmap at `docs/plan.md`, sequentially followed by granular module-specific checklists distributed strictly into each app's respective `apps/[Module Name]/docs/plan.md` location.`
```

### The "Single Module Focus" Prompt
Use this when you've just drilled down into defining a specific app in a monorepo (e.g., you heavily updated apps/app_123/docs/srs.md) and just want to regenerate that specific localized checklist without touching the global roadmap or other apps.

```text
@AGENTS.md Please invoke the @plan-writer skill to generate an implementation plan strictly for the \app_123` module. Read its specific @apps/app_123/docs/srs.md, the global @docs/prd.md, and relevant ADRs, and output the tracking checklist directly into @apps/app_123/docs/plan.md.`
```

## Use the AGENTS.md prompts in your Implementation Plan
Check @docs/plan.md for specific task prompts in your implementation plan.These will guide you through the task list to generate and test your code in compliance with the Open Dev Agent principles and workflow.

## NOTE: Branch-per-task enforcement
A branch-per-task workflow is strictly enforced to ensure all code is reviewed before merging. Direct commits to the `main` branch is blocked by local pre-commit hooks.

If you are a human developer and absolutely must push a hotfix directly to `main`, you can override this safeguard by prefixing your commit command:

```bash
FORCE_MAIN_COMMIT=1 git commit -m "emergency hotfix"
```



