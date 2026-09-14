# 04 — Typed API client guide

## Why

Today specs call:

```ts
await request.get(apiBaseURL(healthApiData.endpoint));
```

That scales poorly: duplicated paths, easy to forget headers, no typed body, schema validation bolted on ad hoc.

Industry pattern: thin **resource modules** that wrap Playwright’s `APIRequestContext`.

## Target layout

```
api/
  client.ts          # shared helpers (optional base headers)
  health.api.ts
  auth.api.ts
  books.api.ts
types/api/
  health.ts          # interfaces matching response JSON
```

## Step-by-step

### 1. Add response types

```ts
// types/api/health.ts
export type HealthResponse = {
  status: string;
};
```

Keep types aligned with `health.schema.json` (see [05](./05-data-schema-types.md)).

### 2. Create resource helper

```ts
// api/health.api.ts
import type { APIRequestContext, APIResponse } from "@playwright/test";
import { apiBaseURL } from "../utils/api-helpers";
import type { HealthResponse } from "../types/api/health";

export async function getHealth(
  request: APIRequestContext,
): Promise<{ response: APIResponse; body: HealthResponse }> {
  const response = await request.get(apiBaseURL("/health"));
  const body = (await response.json()) as HealthResponse;
  return { response, body };
}
```

### 3. Use in specs

```ts
import { getHealth } from "../../../api/health.api";
import { assertJsonSchema } from "../../../utils/jsonSchemaValidator";
import healthSchema from "../../../test-data/api/health/health.schema.json";

test("should match json schema", async ({ request }) => {
  const { response, body } = await getHealth(request);
  expect(response.status()).toBe(200);
  assertJsonSchema(healthSchema, body);
});
```

### 4. Auth-aware client (next)

```ts
export async function getMe(request: APIRequestContext, token: string) {
  return request.get(apiBaseURL("/auth/me"), {
    headers: { Authorization: `Bearer ${token}` },
  });
}
```

Or bake the token into a fixture that returns a pre-configured request context / wrapper.

## Checklist

- [ ] `api/health.api.ts` used by health specs (no raw path strings in tests)
- [ ] `types/api/health.ts` exists
- [ ] Rename/fix `health-shema.json` → `health.schema.json`
- [ ] Add `auth.api.ts` when writing login API tests
- [ ] Empty stub files under `test-data/api/users/` either filled or removed

## Pitfalls

- Don’t build a huge “framework” class — keep functions small and typed
- Cast JSON carefully; schema assert is the runtime safety net
- Keep endpoint strings in **one** place (helper or `test-data`), not both conflicting
