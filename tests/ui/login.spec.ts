import { test, expect } from "@playwright/test";

test("Login", async ({ page }) => {
  await page.goto("/login");
  await expect(page).toHaveTitle("pw-books");
});
