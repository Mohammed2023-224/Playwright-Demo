import { test as base, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { NavigationBar } from '../pages/NavigationBar';
import { SignUpLoginPage } from '../pages/SignUpLoginPage';
import { Cart } from '../pages/Cart';
import { Products } from '../pages/Products';
import { SignUpPage } from '../pages/SignUpPage';
import { PlacedOrder } from '../pages/PlacedOrder';
import { CardDetails } from '../pages/CardDetails';
import { Checkout } from '../pages/Checkout';
export { expect } from '@playwright/test';
import { PlaywrightBlocker } from '@cliqz/adblocker-playwright';


type MyFixtures = {
    homePage: HomePage;
    navigationBar: NavigationBar;
    userPage: Page;
    signUpLoginPage: SignUpLoginPage;
    signUpPage: SignUpPage;
    productsPage: Products;
    cartPage: Cart;
    checkoutPage: Checkout;
    cardDetails: CardDetails;
    placedOrder: PlacedOrder;
};


export const test = base.extend<MyFixtures>({
    homePage: async ({ userPage }, use) => {

        const homePage = new HomePage(userPage);
        await homePage.navigateToHomePage();
        await use(homePage);
    },
    navigationBar: async ({ userPage }, use) => {
        const navigationBar = new NavigationBar(userPage);
        await use(navigationBar);
    }
    ,

    signUpLoginPage: async ({ userPage }, use) => {
        const signUpLoginPage = new SignUpLoginPage(userPage);
        await use(signUpLoginPage);
    }
    ,
    signUpPage: async ({ userPage }, use) => {
        const signUpPage = new SignUpPage(userPage);
        await use(signUpPage);
    },
    productsPage: async ({ userPage }, use) => {
        const productsPage = new Products(userPage);
        await use(productsPage);
    },
    cartPage: async ({ userPage }, use) => {
        const cartPage = new Cart(userPage);
        await use(cartPage);
    },
    checkoutPage: async ({ userPage }, use) => {
        const checkoutPage = new Checkout(userPage);
        await use(checkoutPage);
    },
    cardDetails: async ({ userPage }, use) => {
        const cardDetails = new CardDetails(userPage);
        await use(cardDetails);
    },
    placedOrder: async ({ userPage }, use) => {
        const placedOrder = new PlacedOrder(userPage);
        await use(placedOrder);
    },


    userPage: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: "../config/auth/user.json"
        });
        const page = await context.newPage();
          const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
         await blocker.enableBlockingInPage(page);
        await use(page);
        await context.close();
    }
});