
import { APIRequestContext, request, LaunchOptions } from "@playwright/test";
import { ReadStream } from "fs";

type Headers = Record<string, string>;
type Cookies = Record<string, string>;
type QueryParams = Record<string, string | number | boolean | string[]>;
type MultipartBody = Record<string, string | number | boolean | Buffer | ReadStream | Record<string, string>>;
type RequestBody =
    | { type?: "none"; body?: undefined }
    | { type: "json"; body: Record<string, any> }
    | { type: "form"; body?: Record<string, string> }
    | { type: "multipart"; body?: MultipartBody };

type ApiOptions = {
    headers?: Headers;
    cookies?: Cookies;
    queryParams?:QueryParams;
} & RequestBody;

export class ApiClient {
    private context!: APIRequestContext;
    private baseUrl: string = "";
    private globalHeaders: Headers = {};
    private cookies: Cookies = {};
    private proxy?: LaunchOptions["proxy"];

    // ----------------------------
    // INIT CONTEXT
    // ----------------------------
    async init(options?: {
        storageState?: string;
        baseUrl?: string;
        context?: APIRequestContext;
        proxy?: LaunchOptions["proxy"];
    }) {
        if (!options?.context && !options?.baseUrl) { throw new Error("Either baseUrl or context must be provided to initialize ApiClient"); }
        if (options?.baseUrl) this.baseUrl = options.baseUrl;
        this.context = options?.context ?? await request.newContext({
            baseURL: this.baseUrl || undefined,
            proxy: options?.proxy || this.proxy,
            storageState: options?.storageState
        });
    }


    // ----------------------------
    // HEADERS (GLOBAL)
    // ----------------------------
    setHeaders(headers: Headers) {
        this.globalHeaders = {
            ...this.globalHeaders,
            ...headers,
        };
    }

    clearHeaders() {
        this.globalHeaders = {};
    }

    // ----------------------------
    // COOKIES (MANUAL STATE)
    // ----------------------------
    setCookies(cookies: Cookies) {
        this.cookies = {
            ...this.cookies,
            ...cookies,
        };
    }

    clearCookies() {
        this.cookies = {};
    }

    private buildCookieHeader(cookies?: Cookies): string | undefined {
        if (!cookies) cookies = this.cookies;
        if (!Object.keys(cookies).length) return undefined;

        return Object.entries(cookies)
            .map(([k, v]) => `${k}=${v}`)
            .join("; ");
    }

    // ----------------------------
    // CORE REQUEST
    // ----------------------------
    private async request(
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
        url: string,
        options: ApiOptions = {},
    ) {

        const { headers, cookies, queryParams, type, body } = options;
        if (method === "GET" && (type === "json" || type === "form" || type === "multipart")) {
            throw new Error("GET requests cannot have a request body");
        }
        // merge headers
        const mergedHeaders: Headers = {
            ...this.globalHeaders,
            ...headers,
        };

        // merge cookies (manual + per request)
        const finalCookies = {
            ...this.cookies,
            ...cookies,
        };

        const cookieHeader = this.buildCookieHeader(finalCookies);

        if (cookieHeader) {
            mergedHeaders["cookie"] = cookieHeader;
        }


        let payload: any = {};

        if (type === "json") payload.data = body;
        if (type === "form") payload.form = body;
        if (type === "multipart") payload.multipart = body;

        const methodName = method.toLowerCase() as 'get' | 'post' | 'put' | 'delete' | 'patch';
        return this.context[methodName](url, {
            headers: mergedHeaders, params:queryParams,
            ...payload,
        });
    }

    // ----------------------------
    // PUBLIC METHODS
    // ----------------------------
    get(endpoint?: string, options?: ApiOptions) {
        this.validateInit();
        const url = endpoint ? `${this.baseUrl}${endpoint}` : this.baseUrl;
        this.validateURL(url);
        return this.request("GET", url, options);
    }

    post(endpoint?: string, options?: ApiOptions) {
        this.validateInit();
        const url = endpoint ? `${this.baseUrl}${endpoint}` : this.baseUrl;
        this.validateURL(url);
        return this.request("POST", url, options);
    }

        put(endpoint?: string, options?: ApiOptions) {
        this.validateInit();
        const url = endpoint ? `${this.baseUrl}${endpoint}` : this.baseUrl;
        this.validateURL(url);
        return this.request("PUT", url, options);
    }

    delete(endpoint?: string, options?: ApiOptions) {
        this.validateInit();
        const url = endpoint ? `${this.baseUrl}${endpoint}` : this.baseUrl;
        this.validateURL(url);
        return this.request("DELETE", url, options);
    }

        patch(endpoint?: string, options?: ApiOptions) {
        this.validateInit();
        const url = endpoint ? `${this.baseUrl}${endpoint}` : this.baseUrl;
        this.validateURL(url);
        return this.request("PATCH", url, options);
    }
    // ----------------------------
    // CONTEXT ACCESS
    // ----------------------------
    getContext() {
        return this.context;
    }

    async dispose() {
        if (this.context) {
            await this.context.dispose();
        }
    }



    // ----------------------------
    // Some validations
    // ----------------------------
    private validateInit() {
        if (!this.context) {
            throw new Error("ApiClient not initialized. Call init() first");
        }
    }


    private validateURL(url: string) {
        if (!url) {
            throw new Error("No URL provided. Set baseUrl or provide endpoint");
        }
    }
}