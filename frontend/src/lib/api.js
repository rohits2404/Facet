
import { getAccessToken } from "./auth.js";

const API_BASE_URL = (
    import.meta.env.VITE_API_URL || "/api"
).replace(/\/+$/, "");

export class ApiError extends Error {
    constructor(message, status, body) {
        super(message);
        this.status = status;
        this.body = body;
    }
}

async function request(method, path, { body, form, params } = {}) {
    const normalizedPath = path.startsWith("/")
        ? path
        : `/${path}`;

    const url = new URL(
        `${API_BASE_URL}${normalizedPath}`,
        window.location.origin,
    );

    Object.entries(params ?? {}).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "" && v !== false) {
            url.searchParams.set(k, v);
        }
    });

    const headers = {};
    const token = await getAccessToken();

    if (token) headers.Authorization = `Bearer ${token}`;
    if (body !== undefined) headers["Content-Type"] = "application/json";

    const res = await fetch(url, {
        method,
        headers,
        credentials: "include",
        body: form ?? (body !== undefined ? JSON.stringify(body) : undefined),
    });

    if (res.status === 204) return null;

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        throw new ApiError(
            data?.error ?? `Request failed (${res.status})`,
            res.status,
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
