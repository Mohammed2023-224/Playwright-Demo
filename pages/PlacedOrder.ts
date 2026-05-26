import { Page, Locator, expect } from "@playwright/test";
import { clickOnElement,getTextFromElement } from "../Actions/ElementActions";


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
        await clickOnElement(this.downloadInvoiceButtonLocator);
    }

    async clickContinueButton() {
        await clickOnElement(this.continueButtonLocator);
    }

    // ---------- Get Text Methods ----------
    async getPlacedOrderMessageText() {
        return await getTextFromElement(this.placedOrderMessageLocator);
    }

    async getPlacedOrderHeaderText() {
        return await getTextFromElement(this.placedOrderHeader);
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