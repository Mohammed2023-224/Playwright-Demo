import { test } from "../fixtures/TestFixtures";
import { test as test2 } from "../fixtures/TestFixturesNoLogin";
import { Links } from "../pages/NavigationBar";
import { expect } from "@playwright/test";
import fs from 'fs';
import path from 'path';
import { parse } from "csv-parse/sync";
import { generateFakeName, generateFakeEmail } from "../utilities/GenerateFakeData";
import { captureScreenshot } from "../utilities/Screenshots";
import { AxeBuilder } from "@axe-core/playwright";

type ProductRecord = { name: string; price: string };

const csvPath = path.join(
    __dirname,
    '../resources/testData.csv'
);
const productData = parse<ProductRecord>(fs.readFileSync(csvPath, 'utf-8'), { columns: true, skip_empty_lines: true });

test.describe("Sign Up Tests", () => {
    test2("test new features", async ({ homePage, navigationBar, signUpLoginPage, signUpPage, currentTestInfo, accessibility }) => {
        console.log(`Hello ${process.env.HELLO}`)
        await navigationBar.clickOnLink(Links.SIGNUP_IN, currentTestInfo);
        const results = await accessibility.withTags(["wcag2a", "wcag2aa"]).analyze();
        await captureScreenshot(homePage.page, "signup_login", currentTestInfo);
        await signUpLoginPage.enterUsername("testuser");
        await signUpLoginPage.enterEmail("testuser01036@example.com");
        await signUpLoginPage.clickSignUpButton();
        expect(results.violations).toEqual([]);
        await signUpPage.selectGender("male");
        await signUpPage.enterName("Test User");
        await signUpPage.enterPassword("password123");
        await signUpPage.selectDateOfBirth("1", "January", "1990");
        await signUpPage.checkNewsletterSubscription();
        await signUpPage.checkOffersSubscription();
        await signUpPage.enterFirstName("Test");
        await signUpPage.enterLastName("User");
        await signUpPage.enterCompany("Test Company");
        await signUpPage.enterAddress1("123 Test Street");
        await signUpPage.enterAddress2("Apt 4");
        await signUpPage.selectCountry("United States");
        await signUpPage.enterState("Test State");
        await signUpPage.enterCity("Test City");
        await signUpPage.enterZipcode("12345");
        await signUpPage.enterMobileNumber("1234567890");
        await signUpPage.clickSignUpButton();
        await signUpPage.assertAccountCreatedMessage("Account Created!");
        await signUpPage.clickContinueButton();
        await signUpPage.assertContinueButtonNavigation();

    });
});

test.describe("login", () => {
    test("Add product to cart", async ({ homePage, navigationBar, productsPage, cartPage, checkoutPage, cardDetails, placedOrder, currentTestInfo }) => {
        await homePage.page.route("**/add_to_cart/1", async route => {
            // Only intercept POST requests to the API endpoint
            if (route.request().method() === 'POST' &&
                route.request().url().includes('/add_to_cart')) {
                await route.continue();
            } else {
                await route.continue();
            }
        });

        // ✅ Fulfill with proper response, not just error
        await homePage.page.route("**/view_cart", async route => {
            console.log("View cart intercepted - returning 500");
            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({ error: 'Database connection failed' })
            });
        });
        homePage.page.route("**/static/*", async route => {
            console.log("Having fun here aborting ");
            await route.abort()
        }
        )
        homePage.page.route("**/css/**", async route => {
            console.log("Having fun here aborting2 ");
            await route.abort()
        }
        )

        await navigationBar.clickOnLink(Links.PRODUCTS, currentTestInfo);
        await homePage.page.waitForLoadState('networkidle');

        await productsPage.typeInSearchButton("Sleeveless Dress");
        await productsPage.clickOnSearchButton();
        await homePage.page.waitForLoadState('networkidle');
        await productsPage.hoverAddToCartButton("Sleeveless Dress", 1);
        await productsPage.clickAddToCartButton("Sleeveless Dress", 1);
        await productsPage.clickViewCartButton();
        await cartPage.table.validateProductInCart("Sleeveless Dress", true);
        await cartPage.table.ValidateProductPrice("Sleeveless Dress", "Rs. 1000");
        await cartPage.table.ValidateProductQuantity("Sleeveless Dress", "1");
        await cartPage.table.ValidateProductName("Sleeveless Dress");
        await cartPage.clickCheckoutButton();
        await checkoutPage.table.validateProductInCart("Sleeveless Dress", true);
        await checkoutPage.table.ValidateProductPrice("Sleeveless Dress", "Rs. 1000");
        await checkoutPage.table.ValidateProductQuantity("Sleeveless Dress", "1");
        await checkoutPage.table.ValidateProductName("Sleeveless Dress");
        await checkoutPage.ValidateTotalPrice(1000);
        await checkoutPage.validateAddressDetails({
            title: "Your delivery address",
            userName: "Mr. Test User",
            addressOne: "Test Company",
            addressOne2ndPart: "123 Test Street",
            cityStatePostalCode: "Test City Test State 12345",
            country: "United States",
            phone: "1234567890"
        });

        await checkoutPage.validateInvoiceDetails({
            title: "Your billing address",
            userName: "Mr. Test User",
            addressOne: "Test Company",
            addressOne2ndPart: "123 Test Street",
            cityStatePostalCode: "Test City Test State 12345",
            country: "United States",
            phone: "1234567890"
        });
        await checkoutPage.clickPlaceOrderButton();
        await cardDetails.enterCardNumber("1234 5678 9012 3456");
        await cardDetails.enterNameOnCard("Test User");
        await cardDetails.enterExpirationMonth("01");
        await cardDetails.enterExpirationYear("2025");
        await cardDetails.enterCVC("123");
        await cardDetails.clickPaymentButton();
        await placedOrder.assertPlacedOrderMessage("Congratulations! Your order has been confirmed!");
        await placedOrder.assertPlacedOrderHeader("Order Placed!");
        await placedOrder.clickContinueButton();
        await placedOrder.assertContinueButtonNavigation("https://www.automationexercise.com/");
    });
});




test.describe("params", () => {

    [
        { name: 'Sleeveless Dress', price: 'Rs. 1000' },
        { name: 'Blue Top', price: 'Rs. 500' },
    ].forEach(({ name, price }) => {
        test(`test ${name}`, async ({ homePage, navigationBar, productsPage, cartPage, checkoutPage, cardDetails, placedOrder, currentTestInfo }) => {
            await navigationBar.clickOnLink(Links.PRODUCTS, currentTestInfo);
            await productsPage.typeInSearchButton(name);
            await productsPage.clickOnSearchButton();
            await productsPage.hoverAddToCartButton(name, 1);
            await productsPage.clickAddToCartButton(name, 1);
            await productsPage.clickViewCartButton();
            await cartPage.table.validateProductInCart(name, true);
            await cartPage.table.ValidateProductPrice(name, price);
            await cartPage.table.ValidateProductQuantity(name, "1");
            await cartPage.table.ValidateProductName(name);
            await cartPage.clickCheckoutButton();
            await checkoutPage.table.validateProductInCart(name, true);
            await checkoutPage.table.ValidateProductPrice(name, price);
            await checkoutPage.table.ValidateProductQuantity(name, "1");
            await checkoutPage.table.ValidateProductName(name);
            // await checkoutPage.ValidateTotalPrice(1000);
            await checkoutPage.validateAddressDetails({
                title: "Your delivery address",
                userName: "Mr. Test User",
                addressOne: "Test Company",
                addressOne2ndPart: "123 Test Street",
                cityStatePostalCode: "Test City Test State 12345",
                country: "United States",
                phone: "1234567890"
            });

            await checkoutPage.validateInvoiceDetails({
                title: "Your billing address",
                userName: "Mr. Test User",
                addressOne: "Test Company",
                addressOne2ndPart: "123 Test Street",
                cityStatePostalCode: "Test City Test State 12345",
                country: "United States",
                phone: "1234567890"
            });
            await checkoutPage.clickPlaceOrderButton();
            await cardDetails.enterCardNumber("1234 5678 9012 3456");
            await cardDetails.enterNameOnCard("Test User");
            await cardDetails.enterExpirationMonth("01");
            await cardDetails.enterExpirationYear("2025");
            await cardDetails.enterCVC("123");
            await cardDetails.clickPaymentButton();
            await placedOrder.assertPlacedOrderMessage("Congratulations! Your order has been confirmed!");
            await placedOrder.assertPlacedOrderHeader("Order Placed!");
            await placedOrder.clickContinueButton();
            await placedOrder.assertContinueButtonNavigation("https://www.automationexercise.com/");
        });
    })
});



test.describe("paramsCSV", () => {
    for (const record of productData) {
        test(`test ${record.name}`, async ({ homePage, navigationBar, productsPage, cartPage, checkoutPage, cardDetails, placedOrder, currentTestInfo }) => {
            await navigationBar.clickOnLink(Links.PRODUCTS, currentTestInfo);
            await productsPage.typeInSearchButton(`${record.name}`);
            await productsPage.clickOnSearchButton();
            await productsPage.hoverAddToCartButton(`${record.name}`, 1);
            await productsPage.clickAddToCartButton(`${record.name}`, 1);
            await productsPage.clickViewCartButton();
            await cartPage.table.validateProductInCart(`${record.name}`, true);
            await cartPage.table.ValidateProductPrice(`${record.name}`, `${record.price}`);
            await cartPage.table.ValidateProductQuantity(`${record.name}`, "1");
            await cartPage.table.ValidateProductName(`${record.name}`);
            await cartPage.clickCheckoutButton();
            await checkoutPage.table.validateProductInCart(`${record.name}`, true);
            await checkoutPage.table.ValidateProductPrice(`${record.name}`, `${record.price}`);
            await checkoutPage.table.ValidateProductQuantity(`${record.name}`, "1");
            await checkoutPage.table.ValidateProductName(`${record.name}`);
            // await checkoutPage.ValidateTotalPrice(1000);
            await checkoutPage.validateAddressDetails({
                title: "Your delivery address",
                userName: "Mr. Test User",
                addressOne: "Test Company",
                addressOne2ndPart: "123 Test Street",
                cityStatePostalCode: "Test City Test State 12345",
                country: "United States",
                phone: "1234567890"
            });

            await checkoutPage.validateInvoiceDetails({
                title: "Your billing address",
                userName: "Mr. Test User",
                addressOne: "Test Company",
                addressOne2ndPart: "123 Test Street",
                cityStatePostalCode: "Test City Test State 12345",
                country: "United States",
                phone: "1234567890"
            });
            await checkoutPage.clickPlaceOrderButton();
            await cardDetails.enterCardNumber("1234 5678 9012 3456");
            await cardDetails.enterNameOnCard("Test User");
            await cardDetails.enterExpirationMonth("01");
            await cardDetails.enterExpirationYear("2025");
            await cardDetails.enterCVC("123");
            await cardDetails.clickPaymentButton();
            await placedOrder.assertPlacedOrderMessage("Congratulations! Your order has been confirmed!");
            await placedOrder.assertPlacedOrderHeader("Order Placed!");
            await placedOrder.clickContinueButton();
            await placedOrder.assertContinueButtonNavigation("https://www.automationexercise.com/");
        });
    }
});


test.describe("tetss", () => {
    test("test", async ({ }) => {

        console.log(`Hello ${process.env.HELLO}`)
        console.log(`Hello ${process.env.OPENAI_API_KEY}`)
        console.log(`Hello ${process.env.test}`)
        console.log(`Hello ${generateFakeName()}`)
        console.log(`Hello ${generateFakeEmail()}`)
        console.log(`Hello ${generateFakeName()}`)
        console.log(`Hello ${generateFakeEmail()}`)
        console.log(`Hello ${generateFakeName()}`)
        console.log(`Hello ${generateFakeEmail()}`)
    });
});

