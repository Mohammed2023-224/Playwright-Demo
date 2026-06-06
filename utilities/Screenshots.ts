import { Page, Locator, TestInfo } from "@playwright/test";

export async function captureScreenshot(page: Page, screenshotName: string, testInfo: TestInfo) {
    const screenshotBuffer = await page.screenshot();
    await testInfo.attach(screenshotName, {
        body: screenshotBuffer,
        contentType: "image/png"
    });
}


export async function captureElementScreenshot(locator: Locator, screenshotName: string, testInfo: TestInfo) {
    const screenshotBuffer = await locator.screenshot();
    await testInfo.attach(screenshotName, {
        body: screenshotBuffer,
        contentType: "image/png"
    });
}
