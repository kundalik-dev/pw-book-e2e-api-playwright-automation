import { type Locator, type Page } from "@playwright/test";
import { UIRoutes } from "../test-data/routes-data";

class LoginPage {
  readonly page: Page;

  readonly pageHeading: Locator;

  private readonly userEmailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  readonly emailErrorMessage: Locator;
  readonly passwordErrorMessage: Locator;

  readonly registerLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageHeading = page.getByRole("heading", { name: "Log in", level: 1 });

    this.userEmailInput = page.getByRole("textbox", { name: "Email" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Log in" });
    this.emailErrorMessage = page.getByTestId("email-error");
    this.passwordErrorMessage = page.getByTestId("password-error");

    this.registerLink = page.getByRole("link", { name: "Register" });
  }

  async navigate(): Promise<void> {
    await this.page.goto(UIRoutes.login);
  }

  async navigateToRegisterPage(): Promise<void> {
    await this.registerLink.last().click();
  }

  get registerLinkLocator(): Locator {
    return this.registerLink;
  }

  async login(userEmail: string, password: string): Promise<void> {
    await this.userEmailInput.fill(userEmail);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

export default LoginPage;
