import { Page, Locator, expect } from "@playwright/test";
import { clickOnElement, typeInElement,checkCheckBox,selectOption } from "../Actions/ElementActions";

export class SignUpPage {
    page: Page;
    maleGenderRadioLocator: Locator;
    femaleGenderRadioLocator: Locator;
    nameInputLocator: Locator;
    emailInputLocator: Locator
    passwordInputLocator: Locator;
    dateOfBirthDayInputLocator: Locator;
    dateOfBirthMonthInputLocator: Locator;
    dateOfBirthYearInputLocator: Locator;
    newLetterCheckboxLocator: Locator;
    offersCheckboxLocator: Locator;
    firstNameInputLocator: Locator;
    lastNameInputLocator: Locator;
    companyInputLocator: Locator;
    address1InputLocator: Locator
    address2InputLocator: Locator;
    countrySelectLocator: Locator
    stateInputLocator: Locator;
    cityInputLocator: Locator
    zipcodeInputLocator: Locator;
    mobileNumberInputLocator: Locator
    signUpButtonLocator: Locator;
    accountCreatedMessageLocator: Locator;
    continueButtonLocator: Locator;
    constructor(page: Page) {
        this.page = page;
        this.maleGenderRadioLocator = this.page.locator("#id_gender1");
        this.femaleGenderRadioLocator = this.page.locator("#id_gender2");
        this.nameInputLocator = this.page.locator("input[name='name']");
        this.emailInputLocator = this.page.locator("input[name='email']");
        this.passwordInputLocator = this.page.locator("input[name='password']");
        this.dateOfBirthDayInputLocator = this.page.locator("select[name='days']");
        this.dateOfBirthMonthInputLocator = this.page.locator("select[name='months']");
        this.dateOfBirthYearInputLocator = this.page.locator("select[name='years']");
        this.newLetterCheckboxLocator = this.page.locator("input[name='newsletter']");
        this.offersCheckboxLocator = this.page.locator("input[name='optin']");
        this.firstNameInputLocator = this.page.locator("input[name='first_name']");
        this.lastNameInputLocator = this.page.locator("input[name='last_name']");
        this.companyInputLocator = this.page.locator("input[name='company']");
        this.address1InputLocator = this.page.locator("input[name='address1']");
        this.address2InputLocator = this.page.locator("input[name='address2']");
        this.countrySelectLocator = this.page.locator("select[name='country']");
        this.stateInputLocator = this.page.locator("input[name='state']");
        this.cityInputLocator = this.page.locator("input[name='city']");
        this.zipcodeInputLocator = this.page.locator("input[name='zipcode']");
        this.mobileNumberInputLocator = this.page.locator("input[name='mobile_number']");
        this.signUpButtonLocator = this.page.getByRole("button", { name: "Create Account" });
        this.accountCreatedMessageLocator = this.page.locator("h2[data-qa='account-created']");
        this.continueButtonLocator = this.page.getByRole("link", { name: "Continue" });
    }

    //Action Methods
    async selectGender(gender: "male" | "female") {
        if (gender === "male") {
            await checkCheckBox(this.maleGenderRadioLocator);
        } else {
            await checkCheckBox(this.femaleGenderRadioLocator);
        }
    }

    async enterName(name: string) {
        await typeInElement(this.nameInputLocator, name);
    }

    async getEmailtext() {
        return await this.emailInputLocator.inputValue();
    }

    async enterPassword(password: string) {
        await typeInElement(this.passwordInputLocator, password);
    }

    async selectDateOfBirth(day: string, month: string, year: string) {
        await selectOption(this.dateOfBirthDayInputLocator, day);
        await selectOption(this.dateOfBirthMonthInputLocator, month);
        await selectOption(this.dateOfBirthYearInputLocator, year);
    }

    async checkNewsletterSubscription() {
        await checkCheckBox(this.newLetterCheckboxLocator);
    }

    async checkOffersSubscription() {
        await checkCheckBox(this.offersCheckboxLocator);
    }

    async enterFirstName(firstName: string) {
        await typeInElement(this.firstNameInputLocator, firstName);
    }

    async enterLastName(lastName: string) {
        await typeInElement(this.lastNameInputLocator, lastName);
    }

    async enterCompany(company: string) {
        await typeInElement(this.companyInputLocator, company);
    }

    async enterAddress1(address1: string) {
        await typeInElement(this.address1InputLocator, address1);
    }

    async enterAddress2(address2: string) {
        await typeInElement(this.address2InputLocator, address2);
    }

    async selectCountry(country: string) {
        await this.countrySelectLocator.selectOption(country);
    }

    async enterState(state: string) {
        await typeInElement(this.stateInputLocator, state);
    }

    async enterCity(city: string) {
        await typeInElement(this.cityInputLocator, city);
    }

    async enterZipcode(zipcode: string) {
        await typeInElement(this.zipcodeInputLocator, zipcode);
    }

    async enterMobileNumber(mobileNumber: string) {
        await typeInElement(this.mobileNumberInputLocator, mobileNumber);
    }

    async clickSignUpButton() {
        await clickOnElement(this.signUpButtonLocator);
    }

    async getAccountCreatedMessageText() {
        return await this.accountCreatedMessageLocator.textContent();
    }

    async clickContinueButton() {
        await clickOnElement(this.continueButtonLocator);
    }


    //Assertion Methods
    async assertAccountCreatedMessage(expectedMessage: string) {
        await expect(this.accountCreatedMessageLocator).toHaveText(expectedMessage);
    }
    async assertContinueButtonNavigation() {
        await expect(this.page).toHaveURL("https://www.automationexercise.com/");
    }
}