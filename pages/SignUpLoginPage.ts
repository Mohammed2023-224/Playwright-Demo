import { Page,Locator } from "@playwright/test";
import {clickOnElement,typeInElement } from "../Actions/ElementActions";

export class SignUpLoginPage {
    page: Page;
    usernameInputLocator: Locator;
    emailInputLocator: Locator;
    signUpButtonLocator: Locator;
    loginEmailInputLocator: Locator;
    loginPasswordInputLocator: Locator;
        loginButtonLocator: Locator;
    constructor(page: Page) {
        this.page = page;
        this.usernameInputLocator = this.page.locator("input[name='name']");
        this.signUpButtonLocator = this.page.getByRole("button", { name: "Signup" });
        this.loginButtonLocator = this.page.getByRole("button", { name: "Login" });

        this.emailInputLocator = this.page.locator("input[data-qa='signup-email']");
        this.loginEmailInputLocator = this.page.locator("input[data-qa='login-email']");
        this.loginPasswordInputLocator = this.page.locator("input[data-qa='login-password']");

    
    }

    //Action Methods
    async enterUsername(username: string) {
        await typeInElement(this.usernameInputLocator, username);
    }

    async enterEmail(email: string) {
        await typeInElement(this.emailInputLocator, email);
    }

        async enterLoginEmail(email: string) {
        await typeInElement(this.loginEmailInputLocator, email);
    }

    async enterLoginPassword(password: string) {
        await typeInElement(this.loginPasswordInputLocator, password);
    }

    async clickSignUpButton() {
        await clickOnElement(this.signUpButtonLocator);
    }

        async clickLoginButton() {
        await clickOnElement(this.loginButtonLocator);
    }
}