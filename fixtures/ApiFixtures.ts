import { test as base } from '@playwright/test';
import { APIRequestContext ,request } from '@playwright/test';
import {ApiClient} from '../Actions/StatefulAPIActions'


type MyFixtures = {
    apiRequest: APIRequestContext,
    petAPIRequest:ApiClient;
}

export const test = base.extend<MyFixtures>({
    apiRequest: async ({}, use) => {

        const requestContext = await request.newContext({
            baseURL: 'https://www.automationexercise.com/',
        });

        await use(requestContext);

        await requestContext.dispose();
    }
    ,
    petAPIRequest:async ({}, use) => {
        const requestContext = new ApiClient(); 
        await requestContext.init( {baseUrl:"https://petstore.swagger.io/v2/"});
        await use(requestContext);
        await requestContext.dispose();
    }
    
});