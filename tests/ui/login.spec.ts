import { test, expect } from "@playwright/test";
import LoginPage from "../../pages/login-page";
import BooksPage from "../../pages/books-page";
import {
  loginPageData as loginData,
  loginUsers,
} from "../../test-data/loginpage-data";
import { Routes } from "../../test-data/routes-data";

test.describe("Login Page basic test @login", () => {
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

test.describe("Login page functional tests", () => {
  let loginPage: LoginPage;
  let booksPage: BooksPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    booksPage = new BooksPage(page);

    await loginPage.navigate();
  });

  test("should login with valid credentials", async ({}) => {
    await loginPage.login(
      loginUsers.valid.userEmail,
      loginUsers.valid.password,
    );

    await expect(booksPage.userName).toHaveText(
      loginUsers.valid.loggedInUserName,
    );
  });

  for (const invalidUser of loginUsers.inValid) {
    test(`should reject login when ${invalidUser.testCase}`, async ({
      page,
    }) => {
      await loginPage.login(invalidUser.userEmail, invalidUser.password);

      await expect(page).toHaveURL(loginData.pageUrl);

      if (invalidUser.emailErrorMessage) {
        await expect(loginPage.emailErrorMessage).toHaveText(
          invalidUser.emailErrorMessage,
        );
      } else {
        await expect(loginPage.emailErrorMessage).toBeHidden();
      }

      if (invalidUser.passwordErrorMessage) {
        await expect(loginPage.passwordErrorMessage).toHaveText(
          invalidUser.passwordErrorMessage,
        );
      } else {
        await expect(loginPage.passwordErrorMessage).toBeHidden();
      }
    });
  }
});
