import { test, expect } from "@playwright/test";
import LoginPage from "../../pages/login-page";
import { loginPageData as loginData } from "../../test-data/loginpage-data";
import { Routes } from "../../test-data/routes-data";

test.describe("Login Page - UI and Navigation Functional Tests @ui @login @smoke", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test("should have page title as 'pw-books'", async ({ page }) => {
    await expect(page).toHaveTitle(loginData.pageTitle);
  });

  test("should have page heading as 'Log in'", async ({}) => {
    await expect(loginPage.pageHeading).toHaveText(loginData.pageHeading);
  });

  test("should have page url as /**login/", async ({ page }) => {
    await expect(page).toHaveURL(loginData.pageUrl);
  });

  test("should have register link visible", async ({}) => {
    const registerLink = loginPage.registerLinkLocator;
    await expect(registerLink).toHaveCount(2);
    await expect(registerLink.last()).toHaveText(loginData.registerLinkText);
    await expect(registerLink.last()).toBeVisible();
  });

  test("should navigate to register page when click on register link", async ({
    page,
  }) => {
    await loginPage.navigateToRegisterPage();
    await expect(page).toHaveURL(Routes.register);
  });
});
