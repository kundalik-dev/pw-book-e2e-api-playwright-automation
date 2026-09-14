# pw-books — Playwright TypeScript Automation

End-to-end, UI, and API test automation for the **pw-books** library application, built with [Playwright](https://playwright.dev/) and TypeScript.

## Features

- **Layered tests:** UI (presentation), E2E (full journeys), and API (HTTP contracts)
- **Page Object Model** with accessibility-first locators (`getByRole`, `getByTestId`)
- **Multi-env config** (`QA` / `PROD`) via `.env` + typed `EnvConfig`
- **API expectations + JSON Schema** validation (Ajv)
- **pnpm** package management

## Prerequisites

- Node.js 20+ (22 recommended)
- [pnpm](https://pnpm.io/) 10+
- Running **pw-books** UI and API locally (defaults below), or a reachable QA environment

| Service | Default URL |
|---------|-------------|
| UI | `http://localhost:5173` |
| API | `http://localhost:3000/api` |

## Setup

```bash
pnpm install
pnpm exec playwright install
cp .env.sample .env
```

Edit `.env`:

```env
ENV=QA
EMAIL=your-valid-user@example.com
PASSWORD=your-password
```

## Run tests

```bash
pnpm test                 # all tests
pnpm report               # open last HTML report

# Useful filters
pnpm playwright test tests/ui
pnpm playwright test tests/e2e
pnpm playwright test tests/api
pnpm playwright test --grep @smoke
```

## Project structure

```
pages/              # Page objects (UI / E2E)
fixtures/           # Custom Playwright fixtures (in progress)
tests/
  ui/               # Layout & presentation checks
  e2e/              # Full user flows
  api/              # HTTP API specs
  setup/            # Env / auth setup
test-data/          # Expectations, tables, JSON schemas
types/              # Shared TypeScript types
env/                # QA / PROD configuration
utils/              # Helpers (dotenv, API URL, schema assert)
api/                # Typed API clients (planned)
docs/               # Learning notes + framework roadmap
AGENTS.md           # Conventions for contributors & AI agents
```

### UI vs E2E vs API

| Layer | Focus | Folder |
|-------|--------|--------|
| UI | Visible UI only (titles, fields, links) | `tests/ui/` |
| E2E | Real journeys across FE + API | `tests/e2e/` |
| API | Status, headers, body, schema | `tests/api/` |

See [docs/04-ui-and-e2e-testing-diff.md](./docs/04-ui-and-e2e-testing-diff.md).

## Documentation

| Doc | Description |
|-----|-------------|
| [docs/framework-roadmap/](./docs/framework-roadmap/) | **Start here for improvements** — guides + sequenced goals |
| [docs/framework-roadmap/goal.md](./docs/framework-roadmap/goal.md) | Step-by-step goals & fixes checklist |
| [AGENTS.md](./AGENTS.md) | Project conventions for humans and AI agents |
| [docs/test-case-naming.md](./docs/test-case-naming.md) | `should …` naming patterns |
| [docs/api-endpoints.md](./docs/api-endpoints.md) | API endpoint inventory |

## Test naming

Prefer:

- `should <expected behavior>`
- `should <expected behavior> when <action>`
- `should <expected behavior> with <data>`

## Current status

This is an actively evolving **practice / learning** framework. Strengths today: env typing, login POM, health API + schema checks, clear folder split.

Next priorities (fixtures → schema hygiene → typed API → auth setup → CI) are tracked in [docs/framework-roadmap/goal.md](./docs/framework-roadmap/goal.md).

## Scripts

| Script | Command |
|--------|---------|
| Run all tests | `pnpm test` |
| Show HTML report | `pnpm report` |

Additional scripts (`test:api`, `test:smoke`, etc.) are planned — see the framework roadmap.

## License

ISC
