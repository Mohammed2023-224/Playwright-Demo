import { Locator, Page } from "@playwright/test";

export enum Links {
  HOME = "Home",
  PRODUCTS = "Products",
  CART = "Cart",
  SIGNUP_IN = "Signup / Login",
}

export class NavigationBar {
  page: Page;
  navigationBarLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigationBarLocator = this.page.locator(".nav.navbar-nav");
  }

  // ---------- LOCATOR ----------
  getNavBarLocator(link: Links) {
    return this.navigationBarLocator.getByRole("link", { name: link });
  }

  // ---------- ACTION ----------
  async clickOnLink(link: Links) {
    await this.getNavBarLocator(link).click();
  }

  // ---------- UTILS ----------

  getNameByValue(value: string): string | undefined {
    return Object.keys(Links).find(
      (key) => Links[key as keyof typeof Links] === value
    );
  }

  getValueByName(name: keyof typeof Links): string {
    return Links[name];
  }
}