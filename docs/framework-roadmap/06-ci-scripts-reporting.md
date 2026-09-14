# 06 — Scripts, reporters & CI guide

## npm / pnpm scripts

Today: only `test` and `report`. Add focused scripts so local and CI stay consistent.

Suggested `package.json` scripts:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test tests/ui",
    "test:e2e": "playwright test tests/e2e",
    "test:api": "playwright test tests/api",
    "test:smoke": "playwright test --grep @smoke",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "report": "playwright show-report",
    "typecheck": "tsc --noEmit"
  }
}
```

Use tags in describe titles (`@smoke`, `@api`) consistently until you migrate to Playwright native `tag:`.

## Reporters

HTML alone is fine locally. For CI, combine:

```ts
// playwright.config.ts
reporter: process.env.CI
  ? [["list"], ["html"], ["junit", { outputFile: "results/junit.xml" }]]
  : [["list"], ["html"]],
```

Upload `playwright-report/`, `test-results/`, and `results/junit.xml` as CI artifacts.

## Minimal GitHub Actions sketch

```yaml
# .github/workflows/playwright.yml
name: Playwright
on:
  push:
  pull_request:
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install
      - run: pnpm exec playwright install --with-deps chromium
      - run: pnpm test
        env:
          CI: true
          ENV: QA
          EMAIL: ${{ secrets.TEST_EMAIL }}
          PASSWORD: ${{ secrets.TEST_PASSWORD }}
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

You still need the app (UI + API) running — either:

- Start services in the workflow, or
- Point `baseURL` / `apiBaseURL` at a shared QA environment, or
- Uncomment/configure `webServer` in `playwright.config.ts`

## Env cleanup (with CI)

- Give PROD real URLs when you have them; don’t leave QA and PROD as identical localhost
- Wire `envConfig.screenshot` into Playwright `use` **or** remove unused env fields to avoid drift
- Keep `.env.sample` updated whenever you add required vars

## Checklist

- [ ] Scripts for ui / e2e / api / smoke / typecheck
- [ ] List + HTML (+ JUnit on CI) reporters
- [ ] CI workflow with secrets + artifact upload
- [ ] Document how to run against local vs remote env in README
- [ ] Optional: ESLint with Playwright plugin (`test.only` ban)

## Pitfalls

- `workers: 1` on CI is safer until tests are isolated; raise later
- Don’t commit reports or auth state
- Smoke grep only works if tags are actually present on critical tests
