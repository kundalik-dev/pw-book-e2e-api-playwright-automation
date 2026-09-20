# 01 — Current state & gaps

## What this project already does well

| Area          | Reality today                                          |
| ------------- | ------------------------------------------------------ |
| Test taxonomy | `tests/ui`, `tests/e2e`, `tests/api` with clear intent |
| Env           | Typed `EnvConfig`, QA/PROD switch, secrets via `.env`  |
| POM           | `LoginPage` uses `getByRole` + `getByTestId`           |
| API data      | `healthApiData` separates expectations from assertions |
| Schema        | Ajv helper `assertJsonSchema` with compile cache       |
| Docs          | Naming, UI vs E2E, endpoint inventory                  |

## What blocks scale

| Gap                | Why it hurts                                                     |
| ------------------ | ---------------------------------------------------------------- |
| Empty `fixtures/`  | Every spec repeats `new LoginPage(page)`; hard to share auth/API |
| No `storageState`  | Every E2E re-logins; no shared authenticated context             |
| Raw `request.get`  | Paths, headers, JSON parse duplicated; easy to pass wrong types  |
| Stub pages/tests   | Register/books/users look like coverage but are empty            |
| HTML reporter only | Weak for CI gates and history                                    |
| Few npm scripts    | No `test:api` / `test:smoke` / typecheck                         |
| QA ≈ PROD URLs     | Env switch does not yet model real environments                  |
| `tsconfig` gaps    | Need `resolveJsonModule` for schema JSON imports                 |

## Target architecture (mental model)

```
tests/          → thin specs (arrange / act / assert)
fixtures/       → wire page objects + API + auth into `test`
pages/          → UI locators + actions only
api/            → typed HTTP helpers (wrap Playwright request)
test-data/      → static expectations + schemas + factories
types/          → TypeScript shapes for env + API bodies
utils/          → pure helpers (URL, headers, schema assert)
```

Rule: **specs should not know how to build URLs, compile schemas, or construct POMs** once fixtures/API clients exist.

## Suggested end-state folder additions

```
api/
  client.ts
  auth.api.ts
  health.api.ts
fixtures/
  base.fixture.ts
types/api/
  health.ts
test-data/factories/
  user.factory.ts
tests/setup/
  auth.setup.ts
```

Next: implement in the order listed in [`goal.md`](./goal.md).
