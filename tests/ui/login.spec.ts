import { test, expect } from "@playwright/test";
import envConfig from "../../env/env-config";

test("Login", async ({ page }) => {
  await page.goto(envConfig.baseURL);
}); 