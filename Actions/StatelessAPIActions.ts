import { APIRequestContext, request } from '@playwright/test';


type RequestOptions =
{  
        headers?: Record<string, string>,
         cookies?: Record<string, string>,
         form?: Record<string, string>, 
        json?: Record<string, any>, multipart?: Record<string, any>,
        params?:Record<string, string | number | boolean>
     } 


export async function performGetCall(url: string,requestContext?: APIRequestContext, options:
   RequestOptions= {}) {
    const { headers, cookies,params } = options;
    const mainRequestContext = requestContext ? requestContext : await request.newContext();
    let mergedHeaders = mergeHeader(headers ||{},cookies|| {});
    return await mainRequestContext.get(url, { headers: mergedHeaders ,params:params });
}



export async function performPostCall(url: string, requestContext: APIRequestContext, options:
   RequestOptions= {}) {
    const { headers, cookies, form, json, multipart,params } = options;
    const mainRequestContext = requestContext ? requestContext : await request.newContext();
    let mergedHeaders = mergeHeader(headers ||{},cookies|| {});
    return await mainRequestContext.post(url, { headers: mergedHeaders, form, data: json, multipart: multipart ,params:params});
}



  function mergeHeader(head:Record<string, string> , cookies: Record<string, string>){
    let header ={...head};
        if (cookies && Object.keys(cookies).length) {
        const cookieHeader = Object.entries(cookies).map(([k, v]) => `${k}=${v}`).join('; ');
        header = { ...header, cookie: cookieHeader };
    }
    return header;
}