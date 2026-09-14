import { test, expect } from "@playwright/test";
import envConfig from "../../../env/env-config";
import { apiBaseURL, getHeader } from "../../../utils/api-helpers";
import { healthApiData } from "../../../test-data/api/health.get";

test.describe("Heath API - My Test @api", () => {
  test("should get status code 200", async ({ request }) => {
    const response = await request.get(`${envConfig.apiBaseURL}/health`);
    expect(response.status()).toBe(200);
  });

  test("should have status to be ok", async ({ request }) => {
    const response = await request.get(`${envConfig.apiBaseURL}/health`);
    const data = await response.json();
    expect(data.status).toContain("ok");
  });

  test("should have content-type to be application/json", async ({
    request,
  }) => {
    const response = await request.get(apiBaseURL("/health"));
    const headers = response.headers();

    expect(response.headers()["content-type"]).toBe(
      "application/json; charset=utf-8",
    );

    expect(headers["content-type"]).toContain("application/json");
  });

  test("should have content-type to be application/json with helper method", async ({
    request,
  }) => {
    const response = await request.get(apiBaseURL("/health"));
    expect(getHeader(response, "Content-Type")).toBe(
      "application/json; charset=utf-8",
    );
  });
});

test.describe("Health API - Functional tests @api @smoke", () => {
  test("should return 200 OK", async ({ request }) => {
    const response = await request.get(apiBaseURL(healthApiData.endpoint));
    expect(response.status()).toBe(healthApiData.expectedStatusCode);
  });

  test("should have content-type application/json", async ({ request }) => {
    const response = await request.get(apiBaseURL(healthApiData.endpoint));
    expect(getHeader(response, "Content-Type")).toBe(
      healthApiData.expectedContentType,
    );
  });

  test("should return status field in body", async ({ request }) => {
    const response = await request.get(apiBaseURL(healthApiData.endpoint));
    const body = await response.json();
    expect(body).toHaveProperty("status");
    expect(body.status).toBe(healthApiData.expectedBody.status);
  });

  test("should respond within 500ms", async ({ request }) => {
    const start = Date.now();
    await request.get(apiBaseURL(healthApiData.endpoint));
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(healthApiData.maxResponseTime ?? 500);
  });
});
