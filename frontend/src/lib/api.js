// ── REAL ── uncomment when going live
// import { getAccessToken } from './auth.js';

// ── MOCK ── delete when going live
import { mockRequest } from "../mock/server.js";

export class ApiError extends Error {
    constructor(message, status, body) {
        super(message);
        this.status = status;
        this.body = body;
    }
}

// ── REAL ── uncomment when going live: calls the Express API through the Vite proxy
// async function request(method, path, { body, form, params } = {}) {
//   const url = new URL(`/api${path}`, window.location.origin);
//   Object.entries(params ?? {}).forEach(([k, v]) => {
//     if (v !== undefined && v !== null && v !== '' && v !== false) url.searchParams.set(k, v);
//   });
//
//   const headers = {};
//   const token = await getAccessToken();
//   if (token) headers.Authorization = `Bearer ${token}`;
//   if (body !== undefined) headers['Content-Type'] = 'application/json';
//
//   const res = await fetch(url, {
//     method,
//     headers,
//     body: form ?? (body !== undefined ? JSON.stringify(body) : undefined),
//   });
//
//   if (res.status === 204) return null;
//   const data = await res.json().catch(() => null);
//   if (!res.ok) throw new ApiError(data?.error ?? `Request failed (${res.status})`, res.status, data);
//   return data;
// }

// ── MOCK ── delete when going live: answers every request from in-browser mock data
async function request(method, path, opts = {}) {
    try {
        return await mockRequest(method, path, opts);
    } catch (err) {
        throw new ApiError(err.message, err.status ?? 500, err.body);
    }
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
