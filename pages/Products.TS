import { Page, Locator } from "@playwright/test";

export class Products {
    page: Page;
    searchButtonLocator: Locator;
    searchInputLocator: Locator;
    successMessageLocator: Locator;
    viewCartButtonLocator: Locator;
    productImageBoxLocator: Locator;
    constructor(page: Page) {
        this.page = page;

        this.searchButtonLocator = this.page.locator("#submit_search");
        this.successMessageLocator = this.page.getByText(
            "Your product has been added to cart.",
        );
        this.viewCartButtonLocator = this.page.getByText("View Cart");
        this.productImageBoxLocator = this.page.locator(".product-image-wrapper");
        this.searchInputLocator = this.page.getByRole("textbox", { name: "Search" });
    }

    // ---------- LOCATOR METHODS ----------

    getProductImageBox(option: string) {
         return this.productImageBoxLocator.filter({
        has: this.page.locator("p", {
            hasText: option,
        }),
    });
    }

    getLinkByOption(option: string, parent: Locator) {
        return parent.locator("a", { hasText: option })
    }

    getAddToCartButton(option: string, index: number) {
    let elemt= this.getProductImageBox(option)
    return this.getLinkByOption("Add to cart", elemt).nth(index); 
    }

    getViewProductButton(option: string) {
    let elemt= this.getProductImageBox(option)
    return this.getLinkByOption("View Product", elemt); 
    }

    // ---------- ACTION METHODS ----------

    async clickAddToCartButton(option: string, index: number) {
        await this.getAddToCartButton(option, index).click();
    }

        async hoverAddToCartButton(option: string, index: number) {
        await this.getAddToCartButton(option, index).hover();
    }


    async clickViewCartButton() {
        await this.viewCartButtonLocator.click();
    }

    async clickViewProductButton(option: string) {
        await this.getViewProductButton(option).click();
    }

    async clickOnSearchButton() {
        await this.searchButtonLocator.click();
    }

    async typeInSearchButton(option: string) {
        await this.searchInputLocator.fill(option);
    }
}
