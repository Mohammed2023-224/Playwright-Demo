import { Page,Locator } from "@playwright/test";

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
        await this.usernameInputLocator.fill(username);
    }

    async enterEmail(email: string) {
        await this.emailInputLocator.fill(email);
    }

        async enterLoginEmail(email: string) {
        await this.loginEmailInputLocator.fill(email);
    }

    async enterLoginPassword(password: string) {
        await this.loginPasswordInputLocator.fill(password);
    }

    async clickSignUpButton() {
        await this.signUpButtonLocator.click();
    }

        async clickLoginButton() {
        await this.loginButtonLocator.click();
    }
}