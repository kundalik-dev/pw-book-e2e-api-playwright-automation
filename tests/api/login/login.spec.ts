import { test, expect } from "@playwright/test";
import envConfig from "../../../env/env-config";

test.describe("Login Page - API Test @api", () => {
  test("should have status code 200", async ({ request }) => { 
    const response = await request.get(`${envConfig.apiBaseURL}/health`);
    console.log(await response.json());
  });
});
