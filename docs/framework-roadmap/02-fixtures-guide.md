# 02 — Custom fixtures guide

## Why fixtures

Industry Playwright suites almost always use `test.extend` so:

- Page objects are created once per test with the right `page`
- Auth / API helpers are injectable
- Specs stay readable: `async ({ loginPage }) => { ... }`

Today you do:

```ts
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
});
```

Target:

```ts
test("should login with valid credentials", async ({ loginPage }) => {
  await loginPage.navigate();
  await loginPage.login(email, password);
});
```

## Step-by-step implementation

### 1. Create `fixtures/base.fixture.ts`

```ts
import { test as base } from "@playwright/test";
import LoginPage from "../pages/login-page";
import BooksPage from "../pages/books-page";

type MyFixtures = {
  loginPage: LoginPage;
  booksPage: BooksPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  booksPage: async ({ page }, use) => {
    await use(new BooksPage(page));
  },
});

export { expect } from "@playwright/test";
```

### 2. Update specs to import from fixtures

```ts
// before
import { test, expect } from "@playwright/test";

// after
import { test, expect } from "../../fixtures/base.fixture";
```

Remove local `let loginPage` / `beforeEach` construction.

### 3. (Later) Add API fixture

```ts
type MyFixtures = {
  loginPage: LoginPage;
  api: APIRequestContext; // or your typed client
};
```

Prefer wrapping `request` in a typed client (see [04](./04-typed-api-client.md)) rather than exposing raw context everywhere.

## Checklist

- [ ] `fixtures/base.fixture.ts` exports `test` + `expect`
- [ ] UI login specs use fixture `loginPage`
- [ ] E2E login specs use fixture `loginPage` / `booksPage`
- [ ] No `new LoginPage(page)` left in those specs
- [ ] Add new pages to the fixture map when you create new POMs

## Pitfalls

- Do **not** put assertions inside fixture setup unless you intend a hard pre-condition.
- Keep one “base” fixture file first; split only when it gets large (`auth.fixture.ts`, `api.fixture.ts`).
- Always import `test` from your fixture file — mixing `@playwright/test` and fixtures loses your extensions.
