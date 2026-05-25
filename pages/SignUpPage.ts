import { Page, Locator, expect } from "@playwright/test";

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
            await this.maleGenderRadioLocator.check();
        } else {
            await this.femaleGenderRadioLocator.check();
        }
    }

    async enterName(name: string) {
        await this.nameInputLocator.fill(name);
    }

    async getEmailtext() {
        return await this.emailInputLocator.inputValue();
    }

    async enterPassword(password: string) {
        await this.passwordInputLocator.fill(password);
    }

    async selectDateOfBirth(day: string, month: string, year: string) {
        await this.dateOfBirthDayInputLocator.selectOption(day);
        await this.dateOfBirthMonthInputLocator.selectOption(month);
        await this.dateOfBirthYearInputLocator.selectOption(year);
    }

    async checkNewsletterSubscription() {
        await this.newLetterCheckboxLocator.check();
    }

    async checkOffersSubscription() {
        await this.offersCheckboxLocator.check();
    }

    async enterFirstName(firstName: string) {
        await this.firstNameInputLocator.fill(firstName);
    }

    async enterLastName(lastName: string) {
        await this.lastNameInputLocator.fill(lastName);
    }

    async enterCompany(company: string) {
        await this.companyInputLocator.fill(company);
    }

    async enterAddress1(address1: string) {
        await this.address1InputLocator.fill(address1);
    }

    async enterAddress2(address2: string) {
        await this.address2InputLocator.fill(address2);
    }

    async selectCountry(country: string) {
        await this.countrySelectLocator.selectOption(country);
    }

    async enterState(state: string) {
        await this.stateInputLocator.fill(state);
    }

    async enterCity(city: string) {
        await this.cityInputLocator.fill(city);
    }

    async enterZipcode(zipcode: string) {
        await this.zipcodeInputLocator.fill(zipcode);
    }

    async enterMobileNumber(mobileNumber: string) {
        await this.mobileNumberInputLocator.fill(mobileNumber);
    }

    async clickSignUpButton() {
        await this.signUpButtonLocator.click();
    }

    async getAccountCreatedMessageText() {
        return await this.accountCreatedMessageLocator.textContent();
    }

    async clickContinueButton() {
        await this.continueButtonLocator.click();
    }


    //Assertion Methods
    async assertAccountCreatedMessage(expectedMessage: string) {
        await expect(this.accountCreatedMessageLocator).toHaveText(expectedMessage);
    }
    async assertContinueButtonNavigation() {
        await expect(this.page).toHaveURL("https://www.automationexercise.com/");
    }
}