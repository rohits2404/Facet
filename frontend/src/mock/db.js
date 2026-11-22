import snapshot from "./data.json";

const STORAGE_KEY = "facet.mock.db.v1";
const DAY = 86_400_000;

function fromSnapshot() {
    const now = Date.now();
    const at = (ago) => (ago == null ? null : now - ago);
    const usedSellers = new Set(snapshot.products.map((p) => p.sellerId));

    return {
        savedAt: now,
        ownerId: snapshot.ownerId,
        categories: snapshot.categories,
        sellers: snapshot.sellers
            .filter((s) => usedSellers.has(s.id))
            .map(({ joinedAgo, ...s }) => ({ ...s, joinedAt: at(joinedAgo) })),
        products: snapshot.products.map(
            ({ createdAgo, updatedAgo, ...p }, i) => ({
                ...p,
                createdAt: at(createdAgo),
                updatedAt: at(updatedAgo),
                discountEndsAt:
                    p.discountPercent > 0 ? now + (6 + (i % 9)) * DAY : null,
            }),
        ),
        reviews: snapshot.reviews.map(({ createdAgo, ...r }) => ({
            ...r,
            userId: null,
            createdAt: at(createdAgo),
        })),
        sales: snapshot.sales.map(({ paidAgo, ...s }) => ({
            ...s,
            sellerId: snapshot.ownerId,
            paidAt: at(paidAgo),
        })),
        profiles: {
            [snapshot.ownerId]: {
                id: snapshot.ownerId,
                email: "alex@timetoprogram.com",
                name: "Alex",
                avatarUrl: null,
                isSeller: true,
                storeName:
                    snapshot.sellers.find((s) => s.id === snapshot.ownerId)
                        ?.name ?? "Northlight Studio",
                bio:
                    snapshot.sellers.find((s) => s.id === snapshot.ownerId)
                        ?.bio ?? "",
                createdAt: now - 400 * DAY,
            },
        },
        wishlists: {},
        orders: [],
    };
}

function shiftTimes(value, delta) {
    if (Array.isArray(value)) return value.map((v) => shiftTimes(v, delta));
    if (value && typeof value === "object") {
        return Object.fromEntries(
            Object.entries(value).map(([k, v]) => [
                k,
                k.endsWith("At") && typeof v === "number"
                    ? v + delta
                    : shiftTimes(v, delta),
            ]),
        );
    }
    return value;
}

function load() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (saved?.products)
            return {
                ...shiftTimes(saved, Date.now() - saved.savedAt),
                savedAt: Date.now(),
            };
    } catch {}
    return fromSnapshot();
}

export const db = load();

export function save() {
    db.savedAt = Date.now();
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch {}
}

export function resetMockData() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch {}
    window.location.reload();
}

if (typeof window !== "undefined") window.resetMockData = resetMockData;
