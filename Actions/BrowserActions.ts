import {Page} from "@playwright/test";

export async function navigateToHomePage(page: Page, url: string) {
    await page.goto(url);
}