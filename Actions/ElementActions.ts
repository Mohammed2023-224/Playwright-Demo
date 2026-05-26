import {Page,Locator} from "@playwright/test";


export async function clickOnElement( locator: Locator) {
    await locator.click();
}

export async function typeInElement( locator: Locator, text: string) {
    await locator.fill( text);
}

export async function getTextFromElement( locator: Locator) {
    return (await locator.textContent())?.trim();
}


export async function hoverOverElement( locator: Locator) {
    await locator.hover();
}

export async function checkCheckBox( locator: Locator) {
    await locator.check();
}

export async function uncheckCheckBox( locator: Locator) {
    await locator.uncheck();
}

export async function selectOption( locator: Locator, option: string) {
    await locator.selectOption(option);
}