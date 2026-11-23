import { getAccessToken } from "./auth.js";
import { getApiUrl } from "./api-url.js";

export class ApiError extends Error {
    constructor(message, status, body) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.body = body;
    }
}

async function request(method, path, { body, form, params } = {}) {
    const url = new URL(getApiUrl(path), window.location.origin);

    Object.entries(params ?? {}).forEach(([key, value]) => {
        if (
            value !== undefined &&
            value !== null &&
            value !== "" &&
            value !== false
        ) {
            url.searchParams.set(key, String(value));
        }
    });

    const headers = {};

    const token = await getAccessToken();

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    if (body !== undefined) {
        headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, {
        method,
        headers,
        body: form ?? (body !== undefined ? JSON.stringify(body) : undefined),
    });

    if (response.status === 204) {
        return null;
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new ApiError(
            data?.error ?? `Request Failed (${response.status})`,
            response.status,
            data,
        );
    }

    return data;
}

export const api = {
    get: (path, params) => request("GET", path, { params }),
    post: (path, body) => request("POST", path, { body }),
    put: (path, body) => request("PUT", path, { body }),
    patch: (path, body) => request("PATCH", path, { body }),
    del: (path) => request("DELETE", path),
    postForm: (path, form) => request("POST", path, { form }),
    patchForm: (path, form) => request("PATCH", path, { form }),
};
