# AGENTS.md — pw-books Playwright Framework

Guidance for AI agents and contributors working in this repository. Prefer these conventions over inventing new patterns.

---

## Project overview

Playwright + TypeScript automation for **pw-books** (books library app).

| Layer   | Purpose                                                                           | Location     |
| ------- | --------------------------------------------------------------------------------- | ------------ |
| **UI**  | Presentation only: layout, visibility, labels, links — no backend-dependent flows | `tests/ui/`  |
| **E2E** | Full user journeys that hit real FE + API + auth                                  | `tests/e2e/` |
| **API** | HTTP contract, status, headers, body, schema                                      | `tests/api/` |

Stack: `@playwright/test`, TypeScript (`strict`), `pnpm`, `dotenv`, `ajv` (JSON Schema).

App under test (local defaults): UI `http://localhost:5173`, API `http://localhost:3000/api`.

---

## Quick commands

```bash
pnpm install
pnpm exec playwright install   # browsers (first time)
cp .env.sample .env            # set ENV, EMAIL, PASSWORD
pnpm test                      # all tests
pnpm report                    # open HTML report
```

Filter by folder or title tags (string grep today):

```bash
pnpm playwright test tests/api
pnpm playwright test tests/ui
pnpm playwright test tests/e2e
pnpm playwright test --grep @smoke
```

Do **not** commit `.env`. Secrets come from env via `env/*.ts` + `requireEnv`.

---

## Directory map

```
pages/                 # Page Object Model (UI/E2E only)
fixtures/              # Custom Playwright fixtures (target: test.extend) — currently empty
tests/
  ui/                  # UI-only specs
  e2e/                 # End-to-end flows
  api/                 # API specs by resource
  setup/               # Env / future auth setup
test-data/             # Static expectations, fixtures data, schemas
  api/<resource>/      # e.g. health.get.ts + *.schema.json
types/                 # Shared TypeScript types (env, domain)
env/                   # QA/PROD config selection
utils/                 # Pure helpers (API URL, headers, schema assert, dotenv)
docs/                  # Learning notes + API endpoint inventory
api/                   # (preferred future) typed API clients — not created yet
```

---

## Architecture rules

### UI vs E2E (must follow)

- **UI**: assert what the user sees (title, headings, form fields, link visibility). Prefer not depending on successful login/API unless unavoidable.
- **E2E**: real flows (login → dashboard, CRUD via UI). If a server response is required for the assertion, it belongs in E2E (or API), not UI.
- Details: `docs/04-ui-and-e2e-testing-diff.md`.

### Page Object Model

- One class per page under `pages/<name>-page.ts`.
- Locators: prefer **`getByRole`**, then **`getByTestId`** for error/stable hooks. Avoid brittle CSS/XPath.
- Expose **actions** (`navigate`, `login`) and **readonly locators** for assertions in tests.
- Do not put `expect` inside page objects unless the project later adopts a deliberate “component assertion” pattern.
- Today pages are constructed manually (`new LoginPage(page)`). Prefer injecting via fixtures when `fixtures/` is implemented.

### API tests

- Use Playwright `request` fixture (or a future typed client wrapping it).
- Build URLs with `apiBaseURL(path)` from `utils/api-helpers.ts`.
- Keep expected status / content-type / body / SLA in `test-data/api/<resource>/`.
- Validate response shape with `assertJsonSchema(schema, body)` from `utils/jsonSchemaValidator.ts`.
- Always `await response.json()` before schema validation — never pass the `APIResponse` object to Ajv.
- Auth: API uses Bearer JWT (`docs/api-endpoints.md`). Prefer a shared login helper / `storageState` setup over copy-pasting tokens in every test.

### Env & config

- `ENV` must be `QA` or `PROD` (`utils/get-env-config.ts`).
- Entry: `playwright.config.ts` imports `./utils/load-dotenv` then reads `env/env-config`.
- Types live in `types/env-types.ts`. Add new env fields there first, then QA/PROD files.
- Credentials: `EMAIL` / `PASSWORD` via `requireEnv` — never hardcode secrets in tests or data files.

---

## Test naming

Follow `docs/test-case-naming.md`:

- `should <expected behavior>`
- `should <expected behavior> when <action>`
- `should <expected behavior> with <data>`

Describe blocks may include tags in the title for grep, e.g. `@api @smoke`, `@ui @login`. Prefer consistent tags: `@ui`, `@e2e`, `@api`, `@smoke`.

---

## Data, schemas, types — preferred layout

### Current (keep for small resources)

```
test-data/api/health/
  health.get.ts           # expectations + endpoint metadata
  health-schema.json      # JSON Schema (draft-07+)
```

### Target (scale to many resources)

```
types/
  api/
    health.ts             # Response/request interfaces
    user.ts
test-data/
  api/
    health/
      health.get.ts       # runtime expectation values
      health.schema.json  # Ajv schema (keep in sync with types)
  factories/
    user.factory.ts       # unique emails, builders for create flows
  ui/
    loginpage-data.ts
fixtures/
  base.fixture.ts         # loginPage, booksPage, apiClient, authenticatedRequest
api/
  client.ts               # shared headers / base URL
  health.api.ts           # getHealth(request) → typed body
  auth.api.ts             # login → token
```

**Rules of thumb**

| Concern                        | Where                                             |
| ------------------------------ | ------------------------------------------------- |
| TypeScript shapes              | `types/` (or colocated `*.types.ts`)              |
| Expected values / tables       | `test-data/`                                      |
| JSON Schema for runtime assert | `test-data/**/*.schema.json` (or `*.schema.json`) |
| Dynamic unique data            | factories under `test-data/factories/`            |
| Secrets                        | `.env` only                                       |
| Shared page/API wiring         | `fixtures/` via `test.extend`                     |

Keep schema filenames spelled **`schema`** (not `shema`). Enable `resolveJsonModule` in `tsconfig.json` when importing JSON.

For data-driven cases, export typed tables (see `loginUsers.inValid`) and loop with a clear `testCase` name.

---

## Fixtures (target pattern)

When extending Playwright, export a single `test` from fixtures and use it in specs:

```ts
// fixtures/base.fixture.ts (target)
import { test as base } from "@playwright/test";
import LoginPage from "../pages/login-page";

type Fixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});
export { expect } from "@playwright/test";
```

Specs should `import { test, expect } from "../../fixtures/base.fixture"` (path relative to file), not construct POMs ad hoc once fixtures exist.

Auth setup (target): `tests/setup/auth.setup.ts` writes `playwright/.auth/user.json`; dependent projects use `storageState` + `dependencies: ['setup']`. That folder is already gitignored.

---

## Coding standards for agents

**Do**

- Match existing file naming: `kebab-case` for files (`login-page.ts`, `health.spec.ts`).
- Colocate API data under `test-data/api/<resource>/`.
- Reuse `assertJsonSchema`, `apiBaseURL`, `getHeader`, `envConfig`.
- Keep changes scoped; do not refactor unrelated stubs unless asked.
- Prefer role/testId locators in new page objects.

**Don’t**

- Put secrets or production passwords in repo files.
- Mix UI layout checks into E2E files (or vice versa) without reason.
- Add `console.log` debugging in committed tests.
- Pass Playwright `APIResponse` into Ajv.
- Invent a second POM / helper style when one already exists for that page.
- Leave empty placeholder specs that claim coverage; either implement or leave clearly stubbed without false `@smoke` confidence.

---

## Known gaps (improve intentionally)

Treat these as backlog, not accidental omissions:

1. **Empty `fixtures/`** — no `test.extend` yet; POM is manual.
2. **No auth setup / `storageState`** — JWT documented but not automated.
3. **No typed API client layer** — raw `request.get/post` in specs.
4. **Stub pages/tests** — register/books/users API data mostly empty.
5. **Chromium-only**; HTML reporter only; minimal npm scripts (`test`, `report`).
6. **QA ≈ PROD URLs** in env files — split when real environments exist.
7. **`tsconfig`**: add `resolveJsonModule` for schema JSON imports; consider path aliases later.
8. Learning / duplicate API describes (e.g. health “My Test” block, misnamed `tests/api/login`) — clean when touching those files.

---

## Adding a new feature — checklist

### New UI page

1. Add/extend `pages/<page>-page.ts` with role/testId locators + actions.
2. Add static copy/routes to `test-data/` if needed.
3. Add `tests/ui/<area>.spec.ts` for layout-only checks.
4. Wire page into fixtures when fixtures exist.

### New E2E flow

1. Reuse page objects; drive with `test-data` tables.
2. Put under `tests/e2e/`; tag `@e2e` (+ `@smoke` if critical path).
3. Prefer authenticated project/`storageState` once available.

### New API resource

1. `test-data/api/<resource>/<method>.ts` — endpoint + expected status/body.
2. `<resource>.schema.json` — response schema.
3. Optional `types/api/<resource>.ts` — TypeScript interface aligned with schema.
4. Spec under `tests/api/<resource>/`; use `assertJsonSchema`.
5. Prefer a small `api/<resource>.api.ts` wrapper over duplicating paths.

---

## Reference docs in-repo

- `docs/framework-roadmap/` — implementation guides + sequenced goals (`goal.md`)
- `docs/test-case-naming.md` — test titles
- `docs/04-ui-and-e2e-testing-diff.md` — UI vs E2E
- `docs/api-endpoints.md` — API surface (auth, books, loans, admin)
- `docs/05-naming-variables.md` — naming notes
- `README.md` — project overview & setup

When docs and code disagree, **prefer code behavior**, then update docs in the same change if the user asked for docs.

---

## PR / change hygiene

- Do not commit unless the user asks.
- Do not force-push or rewrite git config.
- Keep diffs focused; no drive-by refactors.
- After test changes, run the affected slice (`pnpm playwright test <path>`).
