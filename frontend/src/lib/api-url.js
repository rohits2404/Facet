const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

export const API_BASE_URL = configuredApiUrl
    ? `${configuredApiUrl.replace(/\/+$/, "").replace(/\/api$/, "")}/api`
    : "/api";

export function getApiUrl(path = "") {
    if (/^https?:\/\//i.test(path)) {
        return path;
    }

    const normalizedPath = String(path).startsWith("/") ? path : `/${path}`;

    return `${API_BASE_URL}${normalizedPath}`;
}

export function getMediaUrl(path) {
    if (!path) return null;

    if (
        /^https?:\/\//i.test(path) ||
        path.startsWith("data:") ||
        path.startsWith("blob:")
    ) {
        return path;
    }

    if (path.startsWith("/api/")) {
        return getApiUrl(path.slice(4));
    }

    if (path.startsWith("media/")) {
        return getApiUrl(`/${path}`);
    }

    return getApiUrl(path);
}
