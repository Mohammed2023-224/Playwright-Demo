import { expect, test } from "../fixtures/TestFixtures";
import { Links } from "../pages/NavigationBar";
import fs from 'fs';
import path from 'path';

import {parse} from "csv-parse/sync";

type ProductRecord = { name: string; price: string };

const csvPath = path.join(
  __dirname,
  '../resources/testData.csv'
);
const productData = parse<ProductRecord>(fs.readFileSync(csvPath,'utf-8'), { columns: true, skip_empty_lines: true });

test.describe("Sign Up Tests", () => {
    test.skip("Sign Up with valid credentials", async ({ homePage, navigationBar, signUpLoginPage, signUpPage }) => {
        await navigationBar.clickOnLink(Links.SIGNUP_IN);
        await signUpLoginPage.enterUsername("testuser");
        await signUpLoginPage.enterEmail("testuser01036@example.com");
        await signUpLoginPage.clickSignUpButton();
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
    test("Add product to cart", async ({ homePage, navigationBar, productsPage, cartPage, checkoutPage, cardDetails, placedOrder }) => {
        await navigationBar.clickOnLink(Links.PRODUCTS);
        await productsPage.typeInSearchButton("Sleeveless Dress");
        await productsPage.clickOnSearchButton();
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
    test(`test ${name}`, async ({ homePage, navigationBar, productsPage, cartPage, checkoutPage, cardDetails, placedOrder }) => {
        await navigationBar.clickOnLink(Links.PRODUCTS);
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
  for (const record of productData) 
   {
    test(`test ${record.name}`, async ({ homePage, navigationBar, productsPage, cartPage, checkoutPage, cardDetails, placedOrder }) => {
        await navigationBar.clickOnLink(Links.PRODUCTS);
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

