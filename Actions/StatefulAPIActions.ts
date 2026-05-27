
import { APIRequestContext, request, LaunchOptions } from "@playwright/test";

type Headers = Record<string, string>;
type Cookies = Record<string, string>;

type RequestBody =
    | { type?: "none"; body?: undefined }
    | { type: "json"; body: Record<string, any> }
    | { type: "form"; body?: Record<string, string> }
    | { type: "multipart"; body?: Record<string, any> };

type ApiOptions = {
    headers?: Headers;
    cookies?: Cookies;
} & RequestBody;

export class ApiClient {
    private context!: APIRequestContext;

    private baseUrl: string = "";
    private globalHeaders: Headers = {};
    private cookies: Cookies = {};
    private proxy?: LaunchOptions["proxy"];

    constructor(baseUrl?: string ) {
        if (baseUrl) this.baseUrl = baseUrl;
    }

    // ----------------------------
    // INIT CONTEXT
    // ----------------------------
    async init(storageState?: string) {
            this.context = await request.newContext({
                baseURL: this.baseUrl || undefined,
                proxy: this.proxy,
                storageState
            });
    }

    // ----------------------------
    // BASE URL
    // ----------------------------
    setBaseUrl(url: string) {
        this.baseUrl = url;
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

    private buildCookieHeader(): string | undefined {
        if (!Object.keys(this.cookies).length) return undefined;

        return Object.entries(this.cookies)
            .map(([k, v]) => `${k}=${v}`)
            .join("; ");
    }

    // ----------------------------
    // PROXY CONFIG (BEFORE INIT ONLY)
    // ----------------------------
    setProxy(proxy: LaunchOptions["proxy"]) {
        this.proxy = proxy;
    }

    // ----------------------------
    // CORE REQUEST
    // ----------------------------
    private async request(
        method: "GET" | "POST",
        url: string,
        options: ApiOptions = {}
    ) {
        const { headers, cookies, type, body } = options;

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

        const cookieHeader = Object.entries(finalCookies).length
            ? Object.entries(finalCookies)
                .map(([k, v]) => `${k}=${v}`)
                .join("; ")
            : undefined;

        if (cookieHeader) {
            mergedHeaders["cookie"] = cookieHeader;
        }

        let payload: any = {};

        if (type === "json") payload.data = body;
        if (type === "form") payload.form = body;
        if (type === "multipart") payload.multipart = body;

        return this.context[method.toLowerCase() as "get" | "post"](url, {
            headers: mergedHeaders,
            ...payload,
        });
    }

    // ----------------------------
    // PUBLIC METHODS
    // ----------------------------
    get( endpoint?: string, options?: ApiOptions) {
            const url = endpoint ? `${this.baseUrl}${endpoint}` : this.baseUrl;
        return this.request("GET", url, options);
    }

    post( endpoint?: string, options?: ApiOptions) {
        const url = endpoint ? `${this.baseUrl}${endpoint}` : this.baseUrl;
        return this.request("POST", url, options);
    }

    // ----------------------------
    // CONTEXT ACCESS
    // ----------------------------
    getContext() {
        return this.context;
    }

    async dispose() {
        await this.context.dispose();
    }
}