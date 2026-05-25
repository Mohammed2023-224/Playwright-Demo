import {Page, Locator, expect} from "@playwright/test";

export class CardDetails {
    page: Page;
    nameOnCardLocator: Locator;
    cardNumberLocator: Locator
        expirationMonthLocator: Locator;
    expirationYearLocator: Locator;
    cvcLocator: Locator;
    paymentButtonLocator: Locator;

constructor(page: Page) {
    this.page = page;
    this.nameOnCardLocator = this.page.locator("input[name='name_on_card']");
    this.cardNumberLocator = this.page.locator("input[name='card_number']");
    this.expirationMonthLocator = this.page.locator("input[name='expiry_month']");
    this.expirationYearLocator = this.page.locator("input[name='expiry_year']");
    this.cvcLocator = this.page.locator("input[name='cvc']");
    this.paymentButtonLocator = this.page.getByRole("button", { name: "Pay and Confirm Order" });
}

//Action Methods
async enterNameOnCard(name: string) {
    await this.nameOnCardLocator.fill(name);
}

async enterCardNumber(cardNumber: string) {
    await this.cardNumberLocator.fill(cardNumber);  
}

async enterExpirationMonth(month: string) {
    await this.expirationMonthLocator.fill(month);
}

async enterExpirationYear(year: string) {
    await this.expirationYearLocator.fill(year);
}

async enterCVC(cvc: string) {
    await this.cvcLocator.fill(cvc);
}

async clickPaymentButton() {
    await this.paymentButtonLocator.click();   
}

}