# 03 — Auth & storageState guide

## Why

E2E suites that call `login()` in every test are slow and flaky. Industry pattern:

1. **Setup project** logs in once → saves browser storage to a file
2. Dependent projects load `storageState` so tests start already authenticated

API side (this app): Bearer JWT via `/api/auth/login` (see `docs/api-endpoints.md`). You can:

- Use **UI login** in setup (simplest for E2E), or
- Use **API login** then inject token/cookies if the FE stores auth that way

`.gitignore` already ignores `/playwright/.auth/` — use that path.

## Step-by-step (UI storageState)

### 1. Create `tests/setup/auth.setup.ts`

```ts
import { test as setup, expect } from "@playwright/test";
import path from "node:path";
import envConfig from "../../env/env-config";
import LoginPage from "../../pages/login-page";

const authFile = path.join(__dirname, "../../playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(envConfig.validEmail, envConfig.validPassword);
  // assert you landed on books/dashboard
  await expect(page).toHaveURL(/books|dashboard|\//); // adjust to real post-login URL
  await page.context().storageState({ path: authFile });
});
```

### 2. Wire projects in `playwright.config.ts`

```ts
projects: [
  { name: "setup", testMatch: /.*\.setup\.ts/ },
  {
    name: "chromium",
    dependencies: ["setup"],
    use: {
      ...devices["Desktop Chrome"],
      storageState: "playwright/.auth/user.json",
    },
  },
],
```

### 3. Split authenticated vs public tests (recommended)

Not every test should use saved auth (e.g. login page UI tests must stay logged out).

Options:

- Two projects: `chromium` (with storage) and `chromium-no-auth` (without)
- Or only put authenticated specs under `tests/e2e/` and exclude login/register UI from the authenticated project via `testMatch` / `testIgnore`

Example:

```ts
{
  name: "e2e",
  dependencies: ["setup"],
  testMatch: /tests\/e2e\/.*\.spec\.ts/,
  use: { storageState: "playwright/.auth/user.json" },
},
{
  name: "ui",
  testMatch: /tests\/ui\/.*\.spec\.ts/,
  // no storageState
},
```

## API token helper (parallel track)

```ts
// api/auth.api.ts (sketch)
async function loginViaApi(request: APIRequestContext) {
  const res = await request.post(apiBaseURL("/auth/login"), {
    data: { email: envConfig.validEmail, password: envConfig.validPassword },
  });
  // return access token per real response shape
}
```

Use for API tests that need `Authorization: Bearer …`. Prefer fixture `authenticatedRequest` once tokens work.

## Checklist

- [ ] `auth.setup.ts` writes `playwright/.auth/user.json`
- [ ] Config has setup project + dependency
- [ ] Logged-out UI tests do **not** inherit storageState
- [ ] Auth file remains gitignored
- [ ] Document required `.env` credentials in README

## Pitfalls

- Stale tokens: re-run setup on 401 or expire setup often in CI
- Setup failure fails the whole suite — keep setup assertions clear
- Do not commit real auth JSON
