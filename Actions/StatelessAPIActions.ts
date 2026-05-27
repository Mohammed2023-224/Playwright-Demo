import { APIRequestContext, request } from '@playwright/test';

export async function performGetCall(url: string,requestContext: APIRequestContext, options:
    { headers?: Record<string, string>, cookies?: Record<string, string> } = {}) {
    const { headers, cookies } = options;
    const mainRequestContext = requestContext ? requestContext : await request.newContext();

    let mergedHeaders = { ...headers };
    if (cookies && Object.keys(cookies).length) {
        const cookieHeader = Object.entries(cookies).map(([k, v]) => `${k}=${v}`).join('; ');
        mergedHeaders = { ...mergedHeaders, cookie: cookieHeader };
    }

    return await mainRequestContext.get(url, { headers: mergedHeaders });
}



export async function performPostCall(url: string, requestContext: APIRequestContext, options:
    {
        headers?: Record<string, string>, cookies?: Record<string, string>, form?: Record<string, string>
            , json?: Record<string, any>, multipart?: Record<string, any>
    } = {}) {
    const { headers, cookies, form, json, multipart } = options;
    const mainRequestContext = requestContext ? requestContext : await request.newContext();

    let mergedHeaders = { ...headers };
    if (cookies && Object.keys(cookies).length) {
        const cookieHeader = Object.entries(cookies).map(([k, v]) => `${k}=${v}`).join('; ');
        mergedHeaders = { ...mergedHeaders, cookie: cookieHeader };
    }

    return await mainRequestContext.post(url, { headers: mergedHeaders, form, data: json, multipart: multipart });
}