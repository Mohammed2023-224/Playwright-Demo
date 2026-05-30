import { test as base } from '@playwright/test';
import { APIRequestContext ,request } from '@playwright/test';


type MyFixtures = {
    apiRequest: APIRequestContext;
}

export const test = base.extend<MyFixtures>({
    apiRequest: async ({}, use) => {

        const requestContext = await request.newContext({
            baseURL: 'https://www.automationexercise.com/',
        });

        await use(requestContext);

        await requestContext.dispose();
    }
});