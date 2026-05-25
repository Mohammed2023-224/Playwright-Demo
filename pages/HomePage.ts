import {Page} from "@playwright/test";  

export class HomePage {
    page: Page
    constructor(page: Page) {
        this.page = page;
    }

    async navigateToHomePage() {
        await this.page.goto("https://www.automationexercise.com/");
    }   
}