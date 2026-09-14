# 05 — Data, schemas & types guide

## Separation of concerns

| Kind of “data” | Put it in | Example |
|----------------|-----------|---------|
| TypeScript shape | `types/` | `HealthResponse` |
| Expected values / tables | `test-data/` | status 200, `"ok"` |
| Runtime JSON Schema | `test-data/**/*.schema.json` | Ajv contract |
| Secrets | `.env` | `EMAIL`, `PASSWORD` |
| Unique dynamic values | `test-data/factories/` | `user_${Date.now()}@mail.test` |

Never mix secrets into committed data files. Prefer env getters (as `loginUsers.valid` already does).

## Recommended resource layout

```
test-data/api/health/
  health.get.ts            # endpoint + expectedStatusCode + body + SLA
  health.schema.json       # Ajv schema (fix typo: shema → schema)

types/api/health.ts        # interface matching schema

test-data/factories/
  user.factory.ts          # buildRegisterPayload()
```

### Expectation file pattern (keep)

Your current `health.get.ts` style is good — keep it:

```ts
export const healthApiData = {
  endpoint: "/health",
  expectedStatusCode: 200,
  expectedContentType: "application/json; charset=utf-8",
  expectedBody: { status: "ok" },
  maxResponseTime: 500,
};
```

### Schema pattern

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "additionalProperties": false,
  "required": ["status"],
  "properties": {
    "status": { "type": "string", "const": "ok" }
  }
}
```

Tips:

- Start permissive (`additionalProperties` omitted), tighten when the API is stable
- Use `assertJsonSchema(schema, body)` — never pass `APIResponse`
- Enable `"resolveJsonModule": true` in `tsconfig.json`

### Factory pattern (when you need unique users)

```ts
// test-data/factories/user.factory.ts
export function buildRegisterUser(overrides: Partial<{ email: string; password: string }> = {}) {
  const stamp = Date.now();
  return {
    email: overrides.email ?? `user_${stamp}@example.test`,
    password: overrides.password ?? "ValidPass1!",
    name: `User ${stamp}`,
  };
}
```

Use for register API/E2E; clean up via delete API or `/system/reset` if available.

## UI data

Keep page copy/routes in `test-data/` (`loginpage-data.ts`, `routes-data.ts`).

Improvements:

- Move hardcoded `loggedInUserName: "kundalik jadhav"` to env or derive from API `/auth/me`
- Export types from `types/` if shared across many files

## Checklist

- [ ] Rename `health-shema.json` → `health.schema.json` and update imports
- [ ] Add `resolveJsonModule` to `tsconfig.json`
- [ ] Add `types/api/health.ts`
- [ ] One folder per API resource under `test-data/api/`
- [ ] Decide: fill or delete empty `users.*.ts` stubs
- [ ] Add factory only when a test needs unique mutable data

## Pitfalls

- Duplicate `health.get.ts` at `test-data/api/health.get.ts` vs nested folder — keep **one** location
- Don’t put large fixtures JSON in specs
- Keep schema and TypeScript interface in sync when fields change
