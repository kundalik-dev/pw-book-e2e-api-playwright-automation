import { test, expect } from "@playwright/test";
import LoginPage from "../../pages/login-page";
import BooksPage from "../../pages/books-page";
import {
  loginPageData as loginData,
  loginUsers,
} from "../../test-data/loginpage-data";

test.describe("Login Page Functional Tests @login @e2e", () => {
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
