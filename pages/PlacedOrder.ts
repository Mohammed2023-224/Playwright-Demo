import { Page, Locator, expect } from "@playwright/test";


export class PlacedOrder {
    page: Page;
    placedOrderMessageLocator: Locator;
    placedOrderHeader: Locator;
    downloadInvoiceButtonLocator: Locator;
    continueButtonLocator: Locator;
    constructor(page: Page) {
        this.page = page;
        this.placedOrderMessageLocator = this.page.getByText("Congratulations! Your order has been confirmed!");
        this.placedOrderHeader = this.page.locator(".title.text-center");
        this.downloadInvoiceButtonLocator = this.page.getByRole("link", { name: "Download Invoice" });
        this.continueButtonLocator = this.page.getByRole("link", { name: "Continue" });
    }


    // ---------- Action Methods ----------
    async clickDownloadInvoiceButton() {
        await this.downloadInvoiceButtonLocator.click();
    }

    async clickContinueButton() {
        await this.continueButtonLocator.click();
    }

    // ---------- Get Text Methods ----------
    async getPlacedOrderMessageText() {
        return await this.placedOrderMessageLocator.textContent();
    }

    async getPlacedOrderHeaderText() {
        return await this.placedOrderHeader.textContent();
    }


    // ---------- Assertion Methods ----------
    async assertPlacedOrderMessage(expectedMessage: string) {
        await expect(this.placedOrderMessageLocator).toHaveText(expectedMessage);
    }

    async assertPlacedOrderHeader(expectedHeader: string) {
        await expect(this.placedOrderHeader).toHaveText(expectedHeader);
    }


    async assertContinueButtonNavigation(expectedHeader: string) {
        await expect(this.page).toHaveURL(expectedHeader);
    }


}