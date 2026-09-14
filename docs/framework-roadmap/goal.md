# Goals — next important fixes (in order)

Work **top to bottom**. Finish (or consciously defer) each goal before starting the next. Check boxes as you go.

Guides: see `[README.md](./README.md)` in this folder.

---

## Goal 1 — Custom fixtures (foundation)

**Why first:** Unlocks clean POM injection and later auth/API fixtures.

- [ ] Create `fixtures/base.fixture.ts` with `loginPage` (and `booksPage` when ready)
- [ ] Migrate `tests/ui/login.spec.ts` to fixture `test` / `expect`
- [ ] Migrate `tests/e2e/login.spec.ts` to fixtures
- [ ] Confirm no remaining `new LoginPage(page)` in migrated specs
- [ ] Read / follow [02-fixtures-guide.md](./02-fixtures-guide.md)

**Done when:** Login UI + E2E specs import `test` only from `fixtures/base.fixture`.

---



## Goal 2 — TypeScript + schema hygiene (quick wins)

**Why early:** Unblocks reliable JSON schema imports and naming consistency.

- [x] Add `"resolveJsonModule": true` to `tsconfig.json`
- [x] Rename `health-shema.json` → `health.schema.json` and fix imports
- [ ] Remove or merge duplicate `test-data/api/health.get.ts` if it conflicts with `test-data/api/health/`
- [ ] Run health schema test: `pnpm playwright test tests/api/health -g "schema"`
- [ ] Read [05-data-schema-types.md](./05-data-schema-types.md)

**Done when:** Schema JSON imports compile cleanly and the schema test still passes.

---



## Goal 3 — Typed API layer for health (pattern to copy)

**Why next:** Establishes the pattern before more API resources.

- [ ] Add `types/api/health.ts`
- [ ] Add `api/health.api.ts` with `getHealth(request)`
- [ ] Refactor `tests/api/health/health.spec.ts` to use the helper
- [ ] Collapse or remove the learning-only “Heath API - My Test” describe if redundant
- [ ] Read [04-typed-api-client.md](./04-typed-api-client.md)

**Done when:** Health specs don’t hardcode full URLs; body is typed + schema-validated.

---



## Goal 4 — Auth setup + storageState

**Why now:** Speeds E2E and matches documented JWT/auth flows.

- [ ] Create `tests/setup/auth.setup.ts` writing `playwright/.auth/user.json`
- [ ] Update `playwright.config.ts` projects (`setup` + dependent project)
- [ ] Keep `tests/ui/login` (and register) **without** storageState
- [ ] Point authenticated E2E at storageState; drop redundant login where appropriate
- [ ] Read [03-auth-and-storage-state.md](./03-auth-and-storage-state.md)

**Done when:** One setup login; E2E can open an authenticated page without logging in each test.

---



## Goal 5 — Real API auth tests + fix misnamed login API

**Why:** Docs describe `/auth/login`; current `tests/api/login` is not real coverage.

- [ ] Add `api/auth.api.ts` (login / optional me)
- [ ] Replace or rewrite `tests/api/login/login.spec.ts` for real auth endpoints
- [ ] Add `test-data/api/auth/` expectations + schema
- [ ] Optional fixture: `authenticatedRequest` with Bearer token

**Done when:** API login success/failure cases exist and pass against local/QA API.

---



## Goal 6 — Scripts, reporters, env cleanup

**Why:** Makes daily runs and future CI painless.

- [ ] Add `test:ui`, `test:e2e`, `test:api`, `test:smoke`, `typecheck` scripts
- [ ] Switch reporter to list + html (JUnit when `CI`)
- [ ] Align or document QA vs PROD URLs; wire or remove unused env fields (`screenshot`, etc.)
- [ ] Move display name off hardcoded string if possible (env or `/auth/me`)
- [ ] Read [06-ci-scripts-reporting.md](./06-ci-scripts-reporting.md)

**Done when:** `pnpm test:api` / `pnpm test:smoke` work; `pnpm typecheck` is clean.

---



## Goal 7 — Fill critical stubs (POM + tests)

**Why:** Empty folders create false confidence.

- [ ] Complete `pages/register-page.ts` + UI/E2E register specs
- [ ] Expand `pages/books-page.ts` actions (search, open book, etc.)
- [ ] Implement or delete empty API dirs (`authors`, `books`, `register`, `users` data stubs)
- [ ] Tag true smoke paths with `@smoke` only

**Done when:** Register + books have at least one real UI and one real E2E path each.

---



## Goal 8 — CI pipeline

**Why last among “foundation” goals:** Needs Goals 1–6 stable and a runnable env strategy.

- [ ] Add `.github/workflows/playwright.yml` (or your CI)
- [ ] Secrets for `EMAIL` / `PASSWORD` / `ENV`
- [ ] Upload HTML report (+ traces on failure)
- [ ] Decide: boot app in CI vs hit shared QA

**Done when:** PR runs Playwright and publishes artifacts.

---



## Goal 9 — Scale polish (optional / later)

- [ ] Data factories for unique users
- [ ] Multi-browser projects (Firefox/WebKit) when Chromium suite is green
- [ ] Path aliases (`@pages`, `@api`, `@test-data`)
- [ ] `webServer` in Playwright config for one-command local runs
- [ ] ESLint + Prettier (ban `test.only`)
- [ ] Playwright native `tag:` instead of title grep only

---



## How to use this file

1. Pick the first unchecked Goal.
2. Open its guide link and implement in a focused branch/commit.
3. Run the affected tests before marking **Done when**.
4. Update `[AGENTS.md](../../AGENTS.md)` only if conventions change permanently.

Orientation reading (once): [01-current-state-and-gaps.md](./01-current-state-and-gaps.md).