import { createAuthClient } from "@neondatabase/auth";
import { BetterAuthReactAdapter } from "@neondatabase/auth/react/adapters";

const AUTH_URL = import.meta.env.VITE_NEON_AUTH_URL;

if (!AUTH_URL) {
    console.warn("VITE_NEON_AUTH_URL Is Not Set — Sign-In Will Not Work.");
}

export const authClient = createAuthClient(
    AUTH_URL ?? "http://localhost/missing-neon-auth-url",
    {
        adapter: BetterAuthReactAdapter(),
    },
);

export async function getAccessToken() {
    try {
        const { data } = await authClient.getSession();
        return data?.session?.token ?? null;
    } catch {
        return null;
    }
}
