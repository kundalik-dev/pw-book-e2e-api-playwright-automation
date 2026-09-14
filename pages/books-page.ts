import { type Locator, type Page } from "@playwright/test";
import { loginUsers } from "../test-data/loginpage-data";

class BooksPage {
  private readonly page: Page;

  // navbar menu locator
  readonly userAccountMenu: Locator;
  readonly userName: Locator;

  // book page locator
  readonly pageHeading: Locator;
  private readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;

    this.userAccountMenu = page.getByTestId("account-menu");
    this.userName = this.userAccountMenu.getByRole("button", {
      name: loginUsers.valid.loggedInUserName,
    });

    this.pageHeading = page.getByRole("heading", { name: "Books" });
    this.searchInput = page.getByRole("searchbox", { name: "Search books" });
  }
}

export default BooksPage;
