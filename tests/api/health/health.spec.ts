import { test, expect } from "@playwright/test";
import {
  healthApiData,
  dbHealthApiData,
} from "../../../test-data/api/health/health.get";
import { assertJsonSchema } from "../../../utils/jsonSchemaValidator";
import { getDbHealth, getServerHealth } from "../../../utils/api/health.api";
import { createApiEndpoint, getHeader } from "../../../utils/api/api-helpers";
import serverHealthSchema from "../../../test-data/api/health/server-health.schema.json";
import dbHealthSchema from "../../../test-data/api/health/db-health.schema.json";

// GET Health - functional
test.describe("GET /health @api @smoke @health", () => {
  test("should return healthy JSON payload", async ({ request }) => {
    const { response, body } = await getServerHealth(request);

    expect(response.status()).toBe(healthApiData.expectedStatusCode);
    expect(getHeader(response, "Content-Type")).toMatch(/application\/json/);
    expect(body.status).toBe(healthApiData.expectedBody.status);
    assertJsonSchema(serverHealthSchema, body);
  });

  test("should respond quickly", async ({ request }) => {
    const start = Date.now();
    await getServerHealth(request);
    expect.soft(Date.now() - start).toBeLessThan(healthApiData.maxResponseTime);
  });

  test("should return 200 OK", async ({ request }) => {
    const { response } = await getServerHealth(request);
    expect(response.status()).toBe(healthApiData.expectedStatusCode);
  });

  test("should have content-type to be application/json", async ({
    request,
  }) => {
    const { response } = await getServerHealth(request);
    expect(getHeader(response, "Content-Type")).toContain(
      healthApiData.expectedContentType,
    );
  });

  test("should return status field to be ok", async ({ request }) => {
    const { body } = await getServerHealth(request);
    expect(body).toHaveProperty("status");
    expect(body.status).toBe(healthApiData.expectedBody.status);
  });

  test("should respond within 500ms", async ({ request }) => {
    const start = Date.now();
    await getServerHealth(request);
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(healthApiData.maxResponseTime ?? 500);
  });

  test("should match json schema", async ({ request }) => {
    const { body } = await getServerHealth(request);
    assertJsonSchema(serverHealthSchema, body);
  });
});

// Server Health - Negative Tests
test.describe("GET /health negatives @api @health", () => {
  test("should return 404 response for POST /health", async ({ request }) => {
    const response = await request.post(createApiEndpoint("/health"));
    const body = await response.json();
    expect(response.status()).toBe(404);
    expect(getHeader(response, "Content-Type")).toMatch(/application\/json/);
    expect(body.error.message).toBe("Route not found: POST /api/health");
  });
});

// Database API Testing - Postive Tests
test.describe("GET /health/db @db @smoke @health", () => {
  test("should return healthy payload", async ({ request }) => {
    const { response, body } = await getDbHealth(request);

    expect(response.status()).toBe(dbHealthApiData.expectedStatusCode);
    expect(getHeader(response, "Content-Type")).toMatch(/application\/json/);
    expect(body.status).toBe(dbHealthApiData.expectedBody.status);
    assertJsonSchema(dbHealthSchema, body);
  });
});

// Database API Testing - Negative Tests
test.describe("GET /health/db negatives @api @db @health", () => {
  test("should return 404 response for POST /health/db", async ({
    request,
  }) => {
    const response = await request.post(createApiEndpoint("/health/db"));
    const body = await response.json();
    expect(response.status()).toBe(404);
    expect(getHeader(response, "Content-Type")).toMatch(/application\/json/);
    expect(body.error.message).toContain("Route not found: POST /api/health/db");
  });

  test("should return 404 response for wrong endpoint on GET /health/dbs", async ({
    request,
  }) => {
    const response = await request.get(createApiEndpoint("/health/dbs"));
    const body = await response.json();
    expect(response.status()).toBe(404);
    expect(getHeader(response, "Content-Type")).toMatch(/application\/json/);
    expect(body.error.message).toContain("Route not found: GET /api/health/dbs");
  });
});
