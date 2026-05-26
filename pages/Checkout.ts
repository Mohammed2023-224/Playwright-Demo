import { Page, Locator, expect } from "@playwright/test";
import { Table } from "./Table";
import { clickOnElement, typeInElement ,getTextFromElement } from "../Actions/ElementActions";

export class Checkout {
    page: Page;
    table: Table;
    placeOrderButtonLocator: Locator;
    textareaMessageLocator: Locator;
    addressDetailsLocator: Locator;
    addressInvoiceDetailsLocator: Locator;
    cartTotalPriceLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.table = new Table(this.page);
        this.placeOrderButtonLocator = this.page.getByRole("link", { name: "Place Order" });
        this.textareaMessageLocator = this.page.getByRole("textbox", { name: "Message" });
        this.addressDetailsLocator = this.page.locator("#address_delivery");
        this.addressInvoiceDetailsLocator = this.page.locator("#address_invoice");
        this.cartTotalPriceLocator = this.page.locator(".cart_total_price");
    }

    // ---------- LOCATOR METHODS ----------
    getListItemByclasss(className: string, parent: Locator) {
        return parent.locator(`li[class="${className}"]`);
    }

    //Action Methods
    async clickPlaceOrderButton() {
        await clickOnElement(this.placeOrderButtonLocator);
    }

    async enterMessage(message: string) {
        await typeInElement(this.textareaMessageLocator, message);
    }


    //get Text Methods
    //Invoice details
    async getInvoiceDetailsText() {
        return await getTextFromElement(this.getListItemByclasss("address_title", this.addressInvoiceDetailsLocator));
    }

    async getInvoiceUserNameText() {
        return await getTextFromElement(this.getListItemByclasss("address_firstname address_lastname", this.addressInvoiceDetailsLocator));
    
    }

    async getInvoiceOneText() {
        return (await getTextFromElement(this.getListItemByclasss("address_address1 address_address2", this.addressInvoiceDetailsLocator).nth(0)))?.trim();

    }

    async getInvoiceOne2ndPartText() {
        return (await getTextFromElement(this.getListItemByclasss("address_address1 address_address2", this.addressInvoiceDetailsLocator).nth(1)))?.trim();
    }

    async getInvoiceCityStatePostalCodeText() {
        return (await getTextFromElement(this.getListItemByclasss("address_city address_state_name address_postcode", this.addressInvoiceDetailsLocator)))?.replace(/\s+/g, " ").trim();
    }

    async getInvoiceCountryText() {
        return await getTextFromElement(this.getListItemByclasss("address_country_name", this.addressInvoiceDetailsLocator));
    }

    async getInvoicePhoneText() {
        return await getTextFromElement(this.getListItemByclasss("address_phone", this.addressInvoiceDetailsLocator));
    }

    //Address details
    async getAddressDetailsText() {
        return await getTextFromElement(this.getListItemByclasss("address_title", this.addressDetailsLocator));

    }

    async getAddressUserNameText() {
        return await getTextFromElement(this.getListItemByclasss("address_firstname address_lastname", this.addressDetailsLocator));

    }

    async getAddressOneText() {
        return await getTextFromElement(this.getListItemByclasss("address_address1 address_address2", this.addressDetailsLocator).nth(0));
    }

    async getAddressOne2ndPartText() {
        return await getTextFromElement(this.getListItemByclasss("address_address1 address_address2", this.addressDetailsLocator).nth(1));
    }

    async getAddressCityStatePostalCodeText() {
        return (await getTextFromElement(this.getListItemByclasss("address_city address_state_name address_postcode", this.addressDetailsLocator)))?.replace(/\s+/g, " ").trim();
    }

    async getAddressCountryText() {
        return await getTextFromElement(this.getListItemByclasss("address_country_name", this.addressDetailsLocator));

    }

    async getAddressPhoneText() {
        return await getTextFromElement(this.getListItemByclasss("address_phone", this.addressDetailsLocator));
    }

    async getCartTotalPriceText() {
        return await getTextFromElement(this.cartTotalPriceLocator);
   
    }

    getTotalPrice() {
        return this.table.getTotalPrice();
    }

    //Assertion methods

    async ValidateTotalPrice(expectedPrice: number) {
        const totalPrice = await this.getTotalPrice();

        expect(totalPrice).toBe(expectedPrice)
    }

    async validateAddressDetails(expectedDetails: { title: string; userName: string; addressOne: string; addressOne2ndPart: String; cityStatePostalCode: string; country: string; phone: string }) {
        expect(await this.getAddressDetailsText()).toBe(expectedDetails.title);
        expect(await this.getAddressUserNameText()).toBe(expectedDetails.userName);
        expect(await this.getAddressOneText()).toBe(expectedDetails.addressOne);
        expect(await this.getAddressOne2ndPartText()).toBe(expectedDetails.addressOne2ndPart);
        expect(await this.getAddressCityStatePostalCodeText()).toBe(expectedDetails.cityStatePostalCode);
        expect(await this.getAddressCountryText()).toBe(expectedDetails.country);
        expect(await this.getAddressPhoneText()).toBe(expectedDetails.phone);
    }

    async validateInvoiceDetails(expectedDetails: { title: string; userName: string; addressOne: string; addressOne2ndPart: String; cityStatePostalCode: string; country: string; phone: string }) {
        expect(await this.getInvoiceDetailsText()).toBe(expectedDetails.title);
        expect(await this.getInvoiceUserNameText()).toBe(expectedDetails.userName);
        expect(await this.getInvoiceOneText()).toBe(expectedDetails.addressOne);
        expect(await this.getInvoiceOne2ndPartText()).toBe(expectedDetails.addressOne2ndPart);
        expect(await this.getInvoiceCityStatePostalCodeText()).toBe(expectedDetails.cityStatePostalCode);
        expect(await this.getInvoiceCountryText()).toBe(expectedDetails.country);
        expect(await this.getInvoicePhoneText()).toBe(expectedDetails.phone);
    }

}