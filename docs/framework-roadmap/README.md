# Framework roadmap — learning guides

Hands-on guides to evolve this Playwright + TypeScript suite from a learning repo into a scalable, industry-style framework.

Start with [`goal.md`](./goal.md) for the ordered checklist. Use the guides below when you implement each step.

| Doc | When to read |
|-----|----------------|
| [01 — Current state & gaps](./01-current-state-and-gaps.md) | Orientation: what you have vs what scales |
| [02 — Custom fixtures](./02-fixtures-guide.md) | Goal 1: `test.extend`, inject page objects |
| [03 — Auth & storageState](./03-auth-and-storage-state.md) | Goal 2: login once, reuse session |
| [04 — Typed API client](./04-typed-api-client.md) | Goal 3: thin API wrappers + types |
| [05 — Data, schemas & types](./05-data-schema-types.md) | Goal 4: organize expectations & Ajv |
| [06 — Scripts, reporters & CI](./06-ci-scripts-reporting.md) | Goal 5: npm scripts, JUnit, CI |

Related project docs:

- [`../04-ui-and-e2e-testing-diff.md`](../04-ui-and-e2e-testing-diff.md) — UI vs E2E
- [`../test-case-naming.md`](../test-case-naming.md) — test titles
- [`../api-endpoints.md`](../api-endpoints.md) — API surface
- [`../../AGENTS.md`](../../AGENTS.md) — conventions for humans & AI agents
