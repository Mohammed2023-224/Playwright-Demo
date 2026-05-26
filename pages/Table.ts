import { Page, Locator, expect } from "@playwright/test";
import { getTextFromElement } from "../Actions/ElementActions";


export class Table {
    page: Page;
    Table: Locator;
    TableRow: Locator;
    constructor(page: Page) {
        this.page = page;
        this.Table = this.page.getByRole("table");
        this.TableRow = this.Table.getByRole("row");
    }

    // ---------- LOCATOR METHODS ----------
    getCartTableRowByProductName(productName: string) {
        return this.TableRow.filter({
            hasText: productName
        });
    }

    getDeleteButtonByProductName(productName: string) {
        return this.getCartTableRowByProductName(productName).locator(".cart_quantity_delete");
    };

    getProductPriceByProductName(productName: string) {
        return this.getCartTableRowByProductName(productName).locator(".cart_price");
    }

    async getTotalPrice() {
        const prices = await this.page
            .locator(".cart_price p")
            .allTextContents();
        return prices
            .map(price => {
                const m = price.match(/\d+(\.\d+)?/g);
                return m && m[0] ? parseFloat(m[0]) : 0;
            })
            .reduce((acc, curr) => acc + curr, 0);
    }

    getProductQuantityByProductName(productName: string) {
        return this.getCartTableRowByProductName(productName).locator(".cart_quantity");
    }

    // getProductNameCell(productName: string) {
    //     return this.getCartTableRowByProductName(productName)
    //         .locator("a" ,{ hasText: productName })
    //         }


    //Action Methods
    async clickDeleteButtonByProductName(productName: string) {
        await this.getDeleteButtonByProductName(productName).click();
    }

    //get Text Methods
    async isProductInCart(productName: string) {
        return await this.getCartTableRowByProductName(productName).isVisible();
    }

    async getProductPrice(productName: string) {
        return getTextFromElement(this.getProductPriceByProductName(productName));
    }

    async getProductQuantity(productName: string) {
        return getTextFromElement(this.getProductQuantityByProductName(productName));
    }

    //Assertion methods
    async ValidateProductPrice(productName: string, expectedPrice: string) {
    
        await expect(this.getProductPriceByProductName(productName)).toHaveText(new RegExp(expectedPrice));
    }

    async ValidateProductQuantity(productName: string, expectedQuantity: string) {
        await expect(this.getProductQuantityByProductName(productName)).toHaveText(new RegExp(expectedQuantity));
    }

    async ValidateProductName(productName: string) {
        await expect(this.getCartTableRowByProductName(productName)).toHaveText(new RegExp(productName));
    }

    async validateProductInCart(productName: string, shouldExist: boolean) {
        if (shouldExist) {
            await expect(this.getCartTableRowByProductName(productName)).toBeVisible();
        } else {
            await expect(this.getCartTableRowByProductName(productName)).not.toBeVisible();
        }
    }

}