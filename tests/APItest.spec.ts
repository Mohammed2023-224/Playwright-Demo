import { test } from "../fixtures/ApiFixtures";




test.describe("API Tests", () => {
    test("Login API Test", async ({ apiRequest }) => {
        const response = await apiRequest.get('https://automationexercise.com/products');
        console.log(response.status());
        const response1 = await apiRequest.get('https://automationexercise.com/add_to_cart/1');
        console.log(response1.status());
        console.log(await response1.text());
        const response2 = await apiRequest.get('https://automationexercise.com/view_cart');
        console.log(response2.status());
        const response3 = await apiRequest.get('https://automationexercise.com/checkout');
        console.log(response3.status());
        console.log(await response3.text());
        const response4 = await apiRequest.get('https://automationexercise.com/payment');
        console.log(response4.status());
        console.log(await response4.text());
        // const responseData = await response.json();
    });
});