import { mockRequest } from "../mock/server.js";

export class ApiError extends Error {
    constructor(message, status, body) {
        super(message);
        this.status = status;
        this.body = body;
    }
}

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
