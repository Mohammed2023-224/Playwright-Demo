import { test } from "../fixtures/ApiFixtures";
import {performGetCall} from "../Actions/StatelessAPIActions";




test.describe("API Tests", () => {
    test("Login API Test", async ({ apiRequest }) => {
        const response =  await performGetCall('products', apiRequest);
        console.log(response.status());
        const response1 = await performGetCall('products', apiRequest); 
        console.log(response1.status());
        const response2 = await performGetCall('view_cart', apiRequest);
        console.log(response2.status());
        const response3 = await performGetCall('checkout', apiRequest);
        console.log(response3.status());
        const response4 = await performGetCall('payment', apiRequest);
        console.log(response4.status());
        // const responseData = await response.json();
    });
});