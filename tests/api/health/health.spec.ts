import { test, expect } from "@playwright/test"; 
import { healthApiData } from "../../../test-data/api/health/health.get";
import { assertJsonSchema } from "../../../utils/jsonSchemaValidator"; 
import { getHealth } from "../../../utils/api/health.api";
import { getHeader } from "../../../utils/api/api-helpers";
import healthApiSchema from "../../../test-data/api/health/health.schema.json";

test.describe("GET /health - Positive Tests @api @smoke @health", () => {
  test("should return healthy JSON payload", async ({ request }) => {
    const { response, body } = await getHealth(request);

    expect(response.status()).toBe(healthApiData.expectedStatusCode);
    expect(getHeader(response, "Content-Type")).toMatch(/application\/json/);
    expect(body.status).toBe(healthApiData.expectedBody.status);
    assertJsonSchema(healthApiSchema, body);
  });

  test("should respond quickly", async ({ request }) => {
    const start = Date.now();
    await getHealth(request);
    expect.soft(Date.now() - start).toBeLessThan(healthApiData.maxResponseTime);
  });
});
  

test.describe("GET /health - Functional Tests @api @smoke @health", () => {
  test("should return 200 OK", async ({ request }) => {
    const { response } =  await getHealth(request);
    expect(response.status()).toBe(healthApiData.expectedStatusCode);
  });

  test("should have content-type to be application/json", async ({ request }) => {
    const { response } =  await getHealth(request);
    expect(getHeader(response, "Content-Type")).toContain(
      healthApiData.expectedContentType,
    );
  });

  test("should return status field to be ok", async ({ request }) => {
    const { body } =  await getHealth(request);
    expect(body).toHaveProperty("status");
    expect(body.status).toBe(healthApiData.expectedBody.status);
  });

  test("should respond within 500ms", async ({ request }) => {
    const start = Date.now();
    await getHealth(request);
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(healthApiData.maxResponseTime ?? 500);
  });

  test("should match json schema", async ({ request }) => {
    const { body } =  await getHealth(request); 
    assertJsonSchema(healthApiSchema, body);
  });
});

