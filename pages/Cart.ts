import { Page, Locator } from "@playwright/test";
import { Table } from "./Table";
import { clickOnElement } from "../Actions/ElementActions";

export class Cart {
    page: Page;
    table: Table;

    checkoutButtonLocator: Locator;
    constructor(page: Page) {
        this.page = page;
        this.table = new Table(this.page);
        this.checkoutButtonLocator = this.page.locator("a", { hasText: "Proceed To Checkout" });
    }

    // ---------- LOCATOR METHODS ----------
    //Action Methods
    async clickCheckoutButton() {
        await clickOnElement(this.checkoutButtonLocator);
    }

}