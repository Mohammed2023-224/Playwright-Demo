import { test } from "../fixtures/ApiFixtures";
import { performGetCall } from "../Actions/StatelessAPIActions";
import { expect } from "@playwright/test";




test.describe("API Tests", () => {
    test.skip("Login API Test", async ({ apiRequest }) => {
        const response = await performGetCall('products', apiRequest);
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




test.describe("Pet swagger store", () => {


    test("check pet with ID", async ({ petAPIRequest }) => {
        const response = await petAPIRequest.get("pet/70409");
        console.log(response.status());
        console.log((await response.text()));
        expect(await response.text()).toContain("TestDog-70409")
        // const responseData = await response.json();
    });

    test("check pet with status", async ({ petAPIRequest }) => {
        const response = await petAPIRequest.get("pet/findByStatus", { queryParams: { "status": "available" } });
        console.log(response.status());
        console.log((await response.text()));
        expect(await response.text()).toContain("available")
        // const responseData = await response.json();
    });

    test("add pet ", async ({ petAPIRequest }) => {
        const response = await petAPIRequest.post("pet", {
            "type": "json", "body": {
                "id": 9999,
                "category": {
                    "id": 0,
                    "name": "string"
                },
                "name": "doggie0011",
                "photoUrls": [
                    "string"
                ],
                "tags": [
                    {
                        "id": 0,
                        "name": "string"
                    }
                ],
                "status": "available"
            }
        });
        console.log(response.status());
        console.log((await response.text()));
        expect(await response.text()).toContain("doggie")
    });


    test("update pet ", async ({ petAPIRequest }) => {
        const response = await petAPIRequest.put("pet", {
            "type": "json", "body": {
                "id": 70409,
                "category": {
                    "id": 0,
                    "name": "string"
                },
                "name": "doggie12223",
                "photoUrls": [
                    "string"
                ],
                "tags": [
                    {
                        "id": 0,
                        "name": "string"
                    }
                ],
                "status": "test"
            }
        });
        console.log(response.status());
        console.log((await response.text()));
        expect(await response.text()).toContain("doggie12223")
    });



    test("update pet image ", async ({ petAPIRequest }) => {
        const response = await petAPIRequest.post("pet/70409/uploadImage", {
            type: "multipart", "body": {
                additionalMetadata: 'test',
                file: {
                    name: 'test.jpg',
                    mimeType: 'image/jpeg',
                    buffer: Buffer.from('fake image content for testing')
                }
            }
        });
        console.log(response.status());
        console.log((await response.text()));
        expect(await response.text()).toContain("200")
    });


    test("update pet data", async ({ petAPIRequest }) => {
        const response = await petAPIRequest.post("pet/70409", {
            type: "form", "body": {
                name: 'testDOG',
                status: "status"
            }
        });
        console.log(response.status());
        console.log((await response.text()));
        expect(await response.text()).toContain("200")
    });

    test("delete pet  ", async ({ petAPIRequest }) => {
        const response = await petAPIRequest.delete("pet/70409")
        console.log(response.status());
        console.log((await response.text()));
        expect(await response.text()).toContain("200")
    });


    test("Full e2e", async ({ petAPIRequest }) => {
        const id = 9999;
        let response = await petAPIRequest.get(`pet/${id}`);
        console.log((await response.text()));
        console.log((response.status()));
        let res = JSON.parse(await response.text());
        console.log(res.code);
        console.log(res.type);
console.log("========================== after get requests");
        if (res?.type?.includes("error") && res?.message?.includes("Pet not found")) {
            response = await petAPIRequest.post("pet", {
                "type": "json", "body": {
                    "id": 9998,
                    "category": {
                        "id": 0,
                        "name": "string"
                    },
                    "name": "doggie0011",
                    "photoUrls": [
                        "string"
                    ],
                    "tags": [
                        {
                            "id": 0,
                            "name": "string"
                        }
                    ],
                    "status": "sold"
                }
            });
            console.log((await response.text()));
            console.log((response.status()));
            res = JSON.parse(await response.text());
            console.log(res.status)
        }
console.log("========================== after post ");

        response = await petAPIRequest.get("pet/9998");
        console.log((await response.text()));
        console.log((response.status()));
        res = JSON.parse(await response.text());
        console.log(res.id);
        console.log(res.category[`name`]);
        console.log(res.name);
console.log("========================== after get ");

        response = await petAPIRequest.put("pet", {
            "type": "json", "body": {
                "id": id,
                "category": {
                    "id": 0,
                    "name": "string"
                },
                "name": "doggie12224",
                "photoUrls": [
                    "string"
                ],
                "tags": [
                    {
                        "id": 0,
                        "name": "string"
                    }
                ],
                "status": "test"
            }
        });
        console.log((await response.text()));
        console.log((response.status()));
        res = JSON.parse(await response.text());
        console.log(res.id);
        console.log(res.category[`name`]);
        console.log(res.name);
console.log("========================== after put ");



        response = await petAPIRequest.get(`pet/${id}`);
        console.log((await response.text()));
        console.log((response.status()));
        res = JSON.parse(await response.text());
        console.log(res.id);
        console.log(res.category[`name`]);
        console.log(res.name);
console.log("========================== after get");


        response = await petAPIRequest.get("pet/findByStatus", { queryParams: { "status": "test" } });
        console.log(response.status());
        console.log((await response.text()));
        expect(await response.text()).toContain("test")
console.log("========================== after get");

        response = await petAPIRequest.post(`pet/${id}`, {
            type: "form", body: {
                name: 'testDOG',
                status: "status",
                "category[id]": "455"
            }
        });
        console.log((await response.text()));
        console.log((response.status()));
        res = JSON.parse(await response.text());
        console.log(res.type);
        console.log(res.code);
        console.log(res.message);
console.log("========================== after post");



        response = await petAPIRequest.get(`pet/${id}`);
        console.log((await response.text()));
        console.log((response.status()));
        res = JSON.parse(await response.text());
        console.log(res.id);
        console.log(res.category[`name`]);
        console.log(res.name);
console.log("========================== after get");


        response = await petAPIRequest.post(`pet/${id}/uploadImage`, {
            type: "multipart", "body": {
                additionalMetadata: 'test132231',
                file: {
                    name: 'test123.jpg',
                    mimeType: 'image/jpeg',
                    buffer: Buffer.from('fake image content for testing')
                }
            }
        });

        console.log((await response.text()));
        console.log((response.status()));
        res = JSON.parse(await response.text());
        console.log(res.message);
console.log("========================== after post image");



        response = await petAPIRequest.get(`pet/${id}`);
        console.log((await response.text()));
        console.log((response.status()));
        res = JSON.parse(await response.text());
        console.log(res.id);
        console.log(res.category[`name`]);
        console.log(res.name);
console.log("========================== after get");

        response = await petAPIRequest.delete(`pet/${id}`)
        console.log(response.status());
        console.log((await response.text()));
        expect(await response.text()).toContain("200")
console.log("========================== after delete");



        response = await petAPIRequest.get(`pet/${id}`);
        console.log((await response.text()));
        console.log((response.status()));
        res = JSON.parse(await response.text());
        console.log(res.code);
        console.log(res.type);
        console.log(res.message);

    });
});