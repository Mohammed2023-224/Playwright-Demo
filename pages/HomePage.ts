import {Page} from "@playwright/test";  
import {navigateToHomePage} from "../Actions/BrowserActions";

export class HomePage {
    page: Page
    constructor(page: Page) {
        this.page = page;
    }

    async navigateToHomePage() {
        await navigateToHomePage(this.page, "https://www.automationexercise.com/");
    }   
}