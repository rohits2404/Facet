// Mock version of the Neon Auth client. Same methods and return shapes as the
// real `authClient`, so pages and hooks don't change when we go live.
// Any email and password signs you in; the demo account is the seller who owns
// Northlight Studio.
import { useSyncExternalStore } from "react";
import { db, save } from "./db.js";

const SESSION_KEY = "facet.mock.session";
const listeners = new Set();
const delay = (ms = 450) => new Promise((r) => setTimeout(r, ms));

function readSession() {
    try {
        return JSON.parse(localStorage.getItem(SESSION_KEY));
    } catch {
        return null;
    }
}

let session = readSession();

function setSession(next) {
    session = next;
    try {
        if (next) localStorage.setItem(SESSION_KEY, JSON.stringify(next));
        else localStorage.removeItem(SESSION_KEY);
    } catch {
        // storage blocked — session lasts for this tab only
    }
    listeners.forEach((l) => l());
}

const idFor = (email) =>
    email.toLowerCase() === "alex@timetoprogram.com"
        ? db.ownerId
        : `user_${email.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`;

function startSession(email, name) {
    const id = idFor(email);
    if (!db.profiles[id]) {
        db.profiles[id] = {
            id,
            email,
            name: name || email.split("@")[0],
            avatarUrl: null,
            isSeller: false,
            storeName: null,
            bio: null,
            createdAt: Date.now(),
        };
        save();
    }
    const profile = db.profiles[id];
    setSession({
        user: {
            id,
            email: profile.email,
            name: profile.name,
            image: profile.avatarUrl,
        },
        session: { token: `mock.${id}` },
    });
}

export const currentUserId = () => session?.user?.id ?? null;

/** Makes sure the signed-in user has a profile (e.g. after the mock data was reset). */
export function ensureProfile() {
    if (session?.user && !db.profiles[session.user.id])
        startSession(session.user.email, session.user.name);
}

export const authClient = {
    // Shown as a "Use demo account" button on the sign-in page (mock only).
    demoCredentials: {
        email: "alex@timetoprogram.com",
        password: "demo-password",
    },

    useSession() {
        const data = useSyncExternalStore(
            (cb) => (listeners.add(cb), () => listeners.delete(cb)),
            () => session,
        );
        return { data, isPending: false };
    },

    async getSession() {
        return { data: session };
    },

    signIn: {
        async email({ email, password }) {
            await delay();
            if (!email || !password)
                return { error: { message: "Enter your email and password." } };
            startSession(email);
            return { data: session };
        },
        async social() {
            await delay();
            startSession("alex@timetoprogram.com");
            window.location.assign("/");
            return { data: session };
        },
    },

    signUp: {
        async email({ name, email, password }) {
            await delay();
            if (!email || !password)
                return {
                    error: { message: "Enter your email and a password." },
                };
            startSession(email, name);
            return { data: session };
        },
    },

    async signOut() {
        setSession(null);
        return { data: null };
    },
};

export async function getAccessToken() {
    return session?.session?.token ?? null;
}
