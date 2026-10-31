// A mock of the Facet REST API that runs in the browser. Every route returns
// the same shape as the real Express backend, so the UI behaves identically.
// It's swapped out for real `fetch` calls when we go live (see src/lib/api.js).
import { db, save } from "./db.js";
import { currentUserId, ensureProfile } from "./auth.js";
import { generateListing, recommendProducts } from "./ai.js";

const DAY = 86_400_000;
const latency = () =>
    new Promise((r) => setTimeout(r, 120 + Math.random() * 220));
const iso = (ms) => (ms == null ? null : new Date(ms).toISOString());
const uid = () =>
    crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

function fail(status, message, body) {
    throw Object.assign(new Error(message), {
        status,
        body: { error: message, ...body },
    });
}

/* ───────── helpers mirroring the backend ───────── */

function effectivePrice(p, now = Date.now()) {
    const active =
        p.discountPercent > 0 && (!p.discountEndsAt || p.discountEndsAt > now);
    const percent = active ? p.discountPercent : 0;
    return {
        listCents: p.priceCents,
        finalCents: Math.round(p.priceCents * (1 - percent / 100)),
        discountPercent: percent,
    };
}

const category = (slug) => db.categories.find((c) => c.slug === slug);
const seller = (id) =>
    db.sellers.find((s) => s.id === id) ??
    (db.profiles[id] && {
        id,
        name: db.profiles[id].storeName ?? db.profiles[id].name,
        bio: db.profiles[id].bio,
        avatarUrl: db.profiles[id].avatarUrl,
    });
const paidOrders = () => db.orders.filter((o) => o.status === "paid");
const owns = (userId, productId) =>
    paidOrders().some(
        (o) =>
            o.buyerId === userId &&
            o.items.some((i) => i.productId === productId),
    );
const wishlistOf = (userId) => (db.wishlists[userId] ??= []);

function serializeProduct(p, userId) {
    const price = effectivePrice(p);
    const c = category(p.category);
    const s = seller(p.sellerId);
    return {
        id: p.id,
        slug: p.slug,
        title: p.title,
        tagline: p.tagline,
        tags: p.tags ?? [],
        price: {
            ...price,
            isFree: price.finalCents === 0,
            discountEndsAt: price.discountPercent
                ? iso(p.discountEndsAt)
                : null,
        },
        thumbnailUrl: p.thumbnailUrl ?? null,
        rating: p.rating,
        ratingCount: p.ratingCount,
        salesCount: p.salesCount,
        status: p.status,
        category: c ? { slug: c.slug, name: c.name } : null,
        seller: { id: p.sellerId, name: s?.name },
        createdAt: iso(p.createdAt),
        updatedAt: iso(p.updatedAt),
        wishlisted: userId ? wishlistOf(userId).includes(p.id) : false,
    };
}

function serializeDetail(p, userId) {
    const s = seller(p.sellerId);
    return {
        ...serializeProduct(p, userId),
        description: p.description,
        features: p.features ?? [],
        targetAudience: p.targetAudience,
        seoTitle: p.seoTitle,
        seoDescription: p.seoDescription,
        version: p.version,
        file: p.file,
        screenshots: (p.screenshots ?? []).map((url) => ({ key: url, url })),
        thumbnailKey: p.thumbnailUrl,
        viewCount: p.viewCount,
        seller: {
            id: p.sellerId,
            name: s?.name,
            bio: s?.bio,
            avatarUrl: s?.avatarUrl,
        },
    };
}

function recomputeRating(productId) {
    const p = db.products.find((x) => x.id === productId);
    const rs = db.reviews.filter((r) => r.productId === productId);
    p.ratingCount = rs.length;
    p.rating = rs.length
        ? Math.round((rs.reduce((s, r) => s + r.rating, 0) / rs.length) * 100) /
          100
        : 0;
}

const receiptNumber = () =>
    `FCT-${new Date().getFullYear()}-${Math.random().toString(16).slice(2, 8).toUpperCase()}`;

function requireUser() {
    const id = currentUserId();
    if (!id) fail(401, "Sign in to continue.");
    ensureProfile();
    return id;
}

function requireSeller() {
    const id = requireUser();
    if (!db.profiles[id]?.isSeller) fail(403, "Open your seller studio first.");
    return id;
}

function profileOut(p) {
    return {
        id: p.id,
        email: p.email,
        name: p.name,
        avatarUrl: p.avatarUrl,
        isSeller: p.isSeller,
        storeName: p.storeName,
        bio: p.bio,
        createdAt: iso(p.createdAt),
    };
}

function markPaid(order, { last4 = null } = {}) {
    if (order.status === "paid") return;
    order.status = "paid";
    order.paidAt = Date.now();
    order.paymentRef = `demo_${uid()}`;
    order.last4 = last4;
    const buyer = db.profiles[order.buyerId];
    for (const item of order.items) {
        const p = db.products.find((x) => x.id === item.productId);
        if (p) p.salesCount += 1;
        db.sales.unshift({
            id: uid(),
            productId: item.productId,
            sellerId: item.sellerId,
            title: item.title,
            priceCents: item.unitPriceCents,
            listPriceCents: item.listPriceCents,
            receiptNumber: order.receiptNumber,
            paidAt: order.paidAt,
            buyer: {
                name: buyer?.name ?? "Customer",
                email: buyer?.email ?? "",
                avatarUrl: buyer?.avatarUrl ?? null,
            },
        });
    }
}

function createOrder(userId, products) {
    const lines = products.map((p) => ({ p, ...effectivePrice(p) }));
    const subtotal = lines.reduce((s, l) => s + l.listCents, 0);
    const total = lines.reduce((s, l) => s + l.finalCents, 0);
    const order = {
        id: uid(),
        receiptNumber: receiptNumber(),
        buyerId: userId,
        status: "pending",
        subtotalCents: subtotal,
        discountCents: subtotal - total,
        totalCents: total,
        paymentProvider: "demo",
        paymentRef: null,
        last4: null,
        createdAt: Date.now(),
        paidAt: null,
        items: lines.map((l) => ({
            productId: l.p.id,
            sellerId: l.p.sellerId,
            title: l.p.title,
            unitPriceCents: l.finalCents,
            listPriceCents: l.listCents,
        })),
    };
    db.orders.unshift(order);
    return order;
}

const STOP = new Set(
    "a an and are as at be but by for from has have i in is it its me my need of on or that the this to want with you your looking something some any can could would like please".split(
        " ",
    ),
);
const words = (text) =>
    [
        ...new Set(
            String(text)
                .toLowerCase()
                .match(/[a-z0-9+#]{2,}/g) ?? [],
        ),
    ].filter((w) => !STOP.has(w));

function readForm(form) {
    const fields = {};
    const files = {};
    for (const [k, v] of form.entries()) {
        if (v instanceof File) (files[k] ??= []).push(v);
        else fields[k] = v;
    }
    return { fields, files };
}

const jsonArray = (v) => {
    if (!v) return [];
    try {
        const a = JSON.parse(v);
        return Array.isArray(a) ? a.map(String).filter(Boolean) : [];
    } catch {
        return [];
    }
};

const slugify = (s) =>
    s
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/[\s_-]+/g, "-")
        .slice(0, 60) || "product";

/* ───────── routes ───────── */

const routes = [];
const route = (method, pattern, handler) => {
    const keys = [];
    const re = new RegExp(
        `^${pattern.replace(/:(\w+)/g, (_, k) => (keys.push(k), "([^/]+)"))}$`,
    );
    routes.push({ method, re, keys, handler });
};

// Catalog
route("GET", "/categories", () =>
    db.categories.map((c) => ({
        ...c,
        productCount: db.products.filter(
            (p) => p.category === c.slug && p.status === "published",
        ).length,
    })),
);

route("GET", "/stats", () => {
    const pub = db.products.filter((p) => p.status === "published");
    const rated = pub.filter((p) => p.rating > 0);
    return {
        products: pub.length,
        sellers: new Set(pub.map((p) => p.sellerId)).size,
        sales: pub.reduce((s, p) => s + p.salesCount, 0),
        avgRating: rated.length
            ? Math.round(
                  (rated.reduce((s, p) => s + p.rating, 0) / rated.length) *
                      100,
              ) / 100
            : 0,
        free: pub.filter((p) => p.priceCents === 0).length,
    };
});

route("GET", "/products", ({ params }) => {
    const userId = currentUserId();
    const {
        q,
        category: cat,
        sort = "popular",
        minPrice,
        maxPrice,
        minRating,
        free,
        onSale,
        tag,
        seller: sellerId,
    } = params;
    const page = Math.max(1, Number(params.page) || 1);
    const limit = Math.min(48, Math.max(1, Number(params.limit) || 12));
    const terms = q ? words(q) : [];

    let items = db.products.filter((p) => p.status === "published");
    if (terms.length) {
        items = items
            .map((p) => {
                const hay =
                    `${p.title} ${p.tagline} ${p.tags.join(" ")} ${p.description}`.toLowerCase();
                const title = p.title.toLowerCase();
                const score = terms.reduce(
                    (s, w) =>
                        s +
                        (title.includes(w) ? 3 : 0) +
                        (p.tags.includes(w) ? 2 : 0) +
                        (hay.includes(w) ? 1 : 0),
                    0,
                );
                return {
                    p,
                    score,
                    all:
                        terms.every((w) => hay.includes(w)) ||
                        title.includes(q.toLowerCase()),
                };
            })
            .filter((x) => x.all)
            .sort((a, b) => b.score - a.score)
            .map((x) => x.p);
    }
    const final = (p) => effectivePrice(p).finalCents;
    if (cat) items = items.filter((p) => p.category === cat);
    if (tag)
        items = items.filter((p) => p.tags.includes(String(tag).toLowerCase()));
    if (sellerId) items = items.filter((p) => p.sellerId === sellerId);
    if (minPrice)
        items = items.filter((p) => final(p) >= Number(minPrice) * 100);
    if (maxPrice)
        items = items.filter((p) => final(p) <= Number(maxPrice) * 100);
    if (minRating) items = items.filter((p) => p.rating >= Number(minRating));
    if (free === "true") items = items.filter((p) => final(p) === 0);
    if (onSale === "true")
        items = items.filter((p) => effectivePrice(p).discountPercent > 0);

    const sorters = {
        popular: (a, b) => b.salesCount - a.salesCount || b.rating - a.rating,
        rating: (a, b) => b.rating - a.rating || b.ratingCount - a.ratingCount,
        newest: (a, b) => b.createdAt - a.createdAt,
        price_asc: (a, b) => final(a) - final(b) || b.salesCount - a.salesCount,
        price_desc: (a, b) =>
            final(b) - final(a) || b.salesCount - a.salesCount,
    };
    if (!(terms.length && sort === "relevance"))
        items = [...items].sort(sorters[sort] ?? sorters.popular);

    const total = items.length;
    return {
        items: items
            .slice((page - 1) * limit, page * limit)
            .map((p) => serializeProduct(p, userId)),
        page,
        limit,
        total,
        pages: Math.max(1, Math.ceil(total / limit)),
    };
});

route("GET", "/products/:slug", ({ slug }) => {
    const userId = currentUserId();
    const p = db.products.find((x) => x.slug === slug);
    if (!p || (p.status !== "published" && p.sellerId !== userId))
        fail(404, "This product is not available.");
    p.viewCount += 1;
    save();

    const breakdown = Object.fromEntries([5, 4, 3, 2, 1].map((n) => [n, 0]));
    db.reviews
        .filter((r) => r.productId === p.id)
        .forEach((r) => (breakdown[r.rating] += 1));
    const related = db.products
        .filter(
            (x) =>
                x.status === "published" &&
                x.id !== p.id &&
                (x.category === p.category ||
                    x.tags.some((t) => p.tags.includes(t))),
        )
        .map((x) => ({
            x,
            score:
                (x.category === p.category ? 1 : 0) +
                x.tags.filter((t) => p.tags.includes(t)).length,
        }))
        .sort((a, b) => b.score - a.score || b.x.salesCount - a.x.salesCount)
        .slice(0, 4)
        .map(({ x }) => serializeProduct(x, userId));

    return {
        ...serializeDetail(p, userId),
        ratingBreakdown: breakdown,
        related,
        viewer: {
            owned: userId ? owns(userId, p.id) || p.sellerId === userId : false,
            wishlisted: userId ? wishlistOf(userId).includes(p.id) : false,
            reviewed: userId
                ? db.reviews.some(
                      (r) => r.productId === p.id && r.userId === userId,
                  )
                : false,
            isSeller: p.sellerId === userId,
        },
    };
});

route("GET", "/products/:id/reviews", ({ id }) =>
    db.reviews
        .filter((r) => r.productId === id)
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 50)
        .map((r) => ({
            id: r.id,
            rating: r.rating,
            title: r.title,
            body: r.body,
            createdAt: iso(r.createdAt),
            author: r.author,
            avatarUrl: r.avatarUrl,
        })),
);

route("GET", "/sellers/:id", ({ id }) => {
    const s = seller(id);
    if (!s) fail(404, "Seller not found.");
    const mine = db.products.filter((p) => p.sellerId === id);
    return {
        id,
        name: s.name,
        bio: s.bio,
        avatarUrl: s.avatarUrl,
        joinedAt: iso(s.joinedAt),
        productCount: mine.filter((p) => p.status === "published").length,
        sales: mine.reduce((n, p) => n + p.salesCount, 0),
    };
});

// Account
route("GET", "/me", () => profileOut(db.profiles[requireUser()]));

route("PATCH", "/me", ({ body }) => {
    const p = db.profiles[requireUser()];
    if (body.storeName !== undefined && body.storeName.trim().length < 2)
        fail(
            400,
            "storeName: Too small: expected string to have >=2 characters",
        );
    if (body.name) p.name = body.name.trim();
    if (body.storeName) p.storeName = body.storeName.trim();
    if (body.bio !== undefined) p.bio = body.bio.trim();
    if (body.becomeSeller) p.isSeller = true;
    save();
    return profileOut(p);
});

route("GET", "/wishlist", () => {
    const userId = requireUser();
    return wishlistOf(userId)
        .map((id) =>
            db.products.find((p) => p.id === id && p.status === "published"),
        )
        .filter(Boolean)
        .map((p) => serializeProduct(p, userId));
});

route("PUT", "/wishlist/:productId", ({ productId }) => {
    const list = wishlistOf(requireUser());
    if (!list.includes(productId)) list.unshift(productId);
    save();
    return null;
});

route("DELETE", "/wishlist/:productId", ({ productId }) => {
    const userId = requireUser();
    db.wishlists[userId] = wishlistOf(userId).filter((id) => id !== productId);
    save();
    return null;
});

route("POST", "/products/:id/reviews", ({ id, body }) => {
    const userId = requireUser();
    if (!owns(userId, id))
        fail(403, "Only customers who own this product can review it.");
    const rating = Number(body.rating);
    if (!(rating >= 1 && rating <= 5)) fail(400, "rating: Invalid input");
    const profile = db.profiles[userId];
    const existing = db.reviews.find(
        (r) => r.productId === id && r.userId === userId,
    );
    const review = {
        title: body.title ?? "",
        body: body.body ?? "",
        rating,
        createdAt: Date.now(),
    };
    if (existing) Object.assign(existing, review);
    else
        db.reviews.unshift({
            id: uid(),
            productId: id,
            userId,
            author: profile.name,
            avatarUrl: profile.avatarUrl,
            ...review,
        });
    recomputeRating(id);
    save();
    return { ok: true };
});

// Checkout & orders
route("GET", "/payments/config", () => ({ provider: "demo", testMode: true }));

route("POST", "/checkout", ({ body }) => {
    const userId = requireUser();
    const ids = [...new Set(body.productIds ?? [])];
    if (!ids.length)
        fail(
            400,
            "productIds: Invalid input: expected array, received undefined",
        );
    const products = ids.map((id) =>
        db.products.find((p) => p.id === id && p.status === "published"),
    );
    if (products.some((p) => !p))
        fail(409, "Some items are no longer available. Refresh your cart.");
    if (products.some((p) => p.sellerId === userId))
        fail(400, "You can't buy your own product.");
    const owned = ids.filter((id) => owns(userId, id));
    if (owned.length)
        fail(
            409,
            "You already own some of these items — they are in your library.",
            { ownedIds: owned },
        );
    const order = createOrder(userId, products);
    save();
    return {
        orderId: order.id,
        totalCents: order.totalCents,
        subtotalCents: order.subtotalCents,
        discountCents: order.discountCents,
    };
});

route("POST", "/checkout/:orderId/stripe", () =>
    fail(400, "Stripe is not configured on the server."),
);
route("POST", "/checkout/:orderId/confirm", () =>
    fail(400, "Stripe is not configured on the server."),
);

route("POST", "/checkout/:orderId/pay", ({ orderId, body }) => {
    const userId = requireUser();
    const order = db.orders.find(
        (o) => o.id === orderId && o.buyerId === userId,
    );
    if (!order) fail(404, "Order not found.");
    if (order.status === "paid") return { status: "paid", orderId };
    const number = String(body.card?.number ?? "").replace(/\D/g, "");
    if (order.totalCents > 0) {
        if (number.length < 12) fail(402, "Enter a full card number.");
        if (number === "4000000000000002") {
            order.status = "failed";
            save();
            fail(402, "The card was declined. Try another card.");
        }
    }
    markPaid(order, { last4: order.totalCents > 0 ? number.slice(-4) : null });
    save();
    return { status: "paid", orderId, receiptNumber: order.receiptNumber };
});

route("POST", "/products/:id/claim", ({ id }) => {
    const userId = requireUser();
    const p = db.products.find((x) => x.id === id && x.status === "published");
    if (!p) fail(404, "Product not found.");
    if (effectivePrice(p).finalCents !== 0)
        fail(400, "This product is not free.");
    if (owns(userId, id)) return { status: "owned" };
    const order = createOrder(userId, [p]);
    markPaid(order);
    save();
    return { status: "paid", orderId: order.id };
});

route("GET", "/orders", () => {
    const userId = requireUser();
    return paidOrders()
        .filter((o) => o.buyerId === userId)
        .map((o) => ({
            id: o.id,
            receiptNumber: o.receiptNumber,
            status: o.status,
            totalCents: o.totalCents,
            createdAt: iso(o.createdAt),
            paidAt: iso(o.paidAt),
            items: o.items.map((i) => ({
                productId: i.productId,
                title: i.title,
                priceCents: i.unitPriceCents,
            })),
        }));
});

route("GET", "/orders/:id", ({ id }) => {
    const userId = requireUser();
    const o = db.orders.find((x) => x.id === id && x.buyerId === userId);
    if (!o) fail(404, "Receipt not found.");
    const buyer = db.profiles[userId];
    return {
        id: o.id,
        receiptNumber: o.receiptNumber,
        status: o.status,
        subtotalCents: o.subtotalCents,
        discountCents: o.discountCents,
        totalCents: o.totalCents,
        paymentProvider: o.paymentProvider,
        paymentRef: o.paymentRef,
        last4: o.last4,
        createdAt: iso(o.createdAt),
        paidAt: iso(o.paidAt),
        buyer: { name: buyer.name, email: buyer.email },
        items: o.items.map((i) => {
            const p = db.products.find((x) => x.id === i.productId);
            return {
                productId: i.productId,
                slug: p?.slug,
                title: i.title,
                seller: seller(i.sellerId)?.name,
                priceCents: i.unitPriceCents,
                listPriceCents: i.listPriceCents,
                thumbnailUrl: p?.thumbnailUrl ?? null,
                category: p ? { slug: p.category } : null,
            };
        }),
    };
});

route("GET", "/library", () => {
    const userId = requireUser();
    const seen = new Map();
    for (const o of paidOrders().filter((x) => x.buyerId === userId)) {
        for (const i of o.items)
            if (!seen.has(i.productId)) seen.set(i.productId, o);
    }
    return [...seen.entries()]
        .map(([productId, o]) => {
            const p = db.products.find((x) => x.id === productId);
            if (!p) return null;
            const c = category(p.category);
            return {
                id: p.id,
                slug: p.slug,
                title: p.title,
                tagline: p.tagline,
                thumbnailUrl: p.thumbnailUrl ?? null,
                category: c ? { slug: c.slug, name: c.name } : null,
                seller: seller(p.sellerId)?.name,
                file: p.file,
                version: p.version,
                updatedAt: iso(p.updatedAt),
                purchasedAt: iso(o.paidAt),
                orderId: o.id,
                receiptNumber: o.receiptNumber,
                reviewed: db.reviews.some(
                    (r) => r.productId === p.id && r.userId === userId,
                ),
            };
        })
        .filter(Boolean)
        .sort((a, b) => new Date(b.purchasedAt) - new Date(a.purchasedAt));
});

route("POST", "/downloads/:productId", ({ productId }) => {
    const userId = requireUser();
    const p = db.products.find((x) => x.id === productId);
    if (!p) fail(404, "Product not found.");
    if (!owns(userId, productId) && p.sellerId !== userId)
        fail(403, "Buy this product to download it.");
    if (!p.file)
        fail(404, "The seller hasn't uploaded a file for this product yet.");
    return { url: "/mock/facet-demo-download.zip", expiresIn: 300 };
});

// Seller studio
const ownProduct = (id, sellerId) => {
    const p = db.products.find((x) => x.id === id && x.sellerId === sellerId);
    if (!p) fail(404, "Product not found.");
    return p;
};
const revenueOf = (productId) =>
    db.sales
        .filter((s) => s.productId === productId)
        .reduce((n, s) => n + s.priceCents, 0);

route("GET", "/seller/products", () => {
    const sellerId = requireSeller();
    return db.products
        .filter((p) => p.sellerId === sellerId)
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .map((p) => ({
            ...serializeProduct(p, sellerId),
            viewCount: p.viewCount,
            revenueCents: revenueOf(p.id),
        }));
});

route("GET", "/seller/products/:id", ({ id }) =>
    serializeDetail(ownProduct(id, requireSeller()), currentUserId()),
);

function applyFields(p, f, files) {
    const set = (key, value) => value !== undefined && (p[key] = value);
    set("title", f.title?.trim());
    set("tagline", f.tagline);
    set("description", f.description);
    if (f.features !== undefined) p.features = jsonArray(f.features);
    if (f.tags !== undefined)
        p.tags = [
            ...new Set(jsonArray(f.tags).map((t) => t.toLowerCase())),
        ].slice(0, 15);
    if (f.categorySlug !== undefined) p.category = f.categorySlug || null;
    if (f.priceCents !== undefined)
        p.priceCents = Math.max(0, Math.min(99_900, Number(f.priceCents) || 0));
    if (f.discountPercent !== undefined)
        p.discountPercent = Math.max(
            0,
            Math.min(90, Number(f.discountPercent) || 0),
        );
    if (f.discountEndsAt !== undefined)
        p.discountEndsAt = f.discountEndsAt
            ? new Date(f.discountEndsAt).getTime()
            : null;
    set("targetAudience", f.targetAudience);
    set("seoTitle", f.seoTitle);
    set("seoDescription", f.seoDescription);
    if (f.version) p.version = f.version;
    if (f.status) p.status = f.status;
    // Uploaded files stay in the browser for this session (object URLs).
    if (files.file?.[0])
        p.file = { name: files.file[0].name, size: files.file[0].size };
    if (files.thumbnail?.[0])
        p.thumbnailUrl = URL.createObjectURL(files.thumbnail[0]);
    if (files.screenshots?.length)
        p.screenshots = [
            ...(p.screenshots ?? []),
            ...files.screenshots.map((s) => URL.createObjectURL(s)),
        ].slice(0, 8);
    p.updatedAt = Date.now();
}

route("POST", "/seller/products", ({ form }) => {
    const sellerId = requireSeller();
    const { fields, files } = readForm(form);
    if (!fields.title || fields.title.trim().length < 3)
        fail(400, "title: Too small: expected string to have >=3 characters");
    if (fields.status === "published" && !files.file?.[0])
        fail(
            400,
            "Attach the product file before publishing, or save as a draft.",
        );
    const base = slugify(fields.title);
    const p = {
        id: uid(),
        sellerId,
        slug: db.products.some((x) => x.slug === base)
            ? `${base}-${Math.random().toString(16).slice(2, 6)}`
            : base,
        title: "",
        tagline: "",
        description: "",
        features: [],
        tags: [],
        category: null,
        targetAudience: "",
        seoTitle: "",
        seoDescription: "",
        priceCents: 0,
        discountPercent: 0,
        discountEndsAt: null,
        status: "draft",
        version: "1.0.0",
        file: null,
        thumbnailUrl: null,
        screenshots: [],
        salesCount: 0,
        viewCount: 0,
        rating: 0,
        ratingCount: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
    applyFields(p, fields, files);
    db.products.unshift(p);
    save();
    return serializeDetail(p, sellerId);
});

route("PATCH", "/seller/products/:id", ({ id, form }) => {
    const sellerId = requireSeller();
    const p = ownProduct(id, sellerId);
    const { fields, files } = readForm(form);
    if (fields.status === "published" && !(files.file?.[0] || p.file))
        fail(400, "Attach the product file before publishing.");
    const remove = jsonArray(fields.removeScreenshots);
    if (remove.length)
        p.screenshots = (p.screenshots ?? []).filter(
            (s) => !remove.includes(s),
        );
    applyFields(p, fields, files);
    save();
    return serializeDetail(p, sellerId);
});

route("PATCH", "/seller/products/:id/pricing", ({ id, body }) => {
    const sellerId = requireSeller();
    const p = ownProduct(id, sellerId);
    if (body.status === "published" && !p.file)
        fail(400, "Attach the product file before publishing.");
    if (body.priceCents !== undefined) p.priceCents = body.priceCents;
    if (body.discountPercent !== undefined)
        p.discountPercent = body.discountPercent;
    if (body.discountEndsAt !== undefined)
        p.discountEndsAt = body.discountEndsAt
            ? new Date(body.discountEndsAt).getTime()
            : null;
    if (body.status) p.status = body.status;
    p.updatedAt = Date.now();
    save();
    return serializeDetail(p, sellerId);
});

route("DELETE", "/seller/products/:id", ({ id }) => {
    const p = ownProduct(id, requireSeller());
    if (p.salesCount > 0) {
        p.status = "archived";
        save();
        return { archived: true };
    }
    db.products = db.products.filter((x) => x.id !== id);
    save();
    return { deleted: true };
});

const dayKey = (ms) => {
    const d = new Date(ms);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

route("GET", "/seller/stats", ({ params }) => {
    const sellerId = requireSeller();
    const days = Math.min(365, Math.max(7, Number(params.days) || 30));
    const now = Date.now();
    const sales = db.sales.filter((s) => s.sellerId === sellerId);
    const sum = (list) => list.reduce((n, s) => n + s.priceCents, 0);
    const inPeriod = sales.filter((s) => s.paidAt >= now - days * DAY);
    const prevPeriod = sales.filter(
        (s) => s.paidAt >= now - 2 * days * DAY && s.paidAt < now - days * DAY,
    );
    const mine = db.products.filter((p) => p.sellerId === sellerId);
    const rated = mine.filter((p) => p.rating > 0);
    const views = mine.reduce((n, p) => n + p.viewCount, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const series = Array.from({ length: days }, (_, i) => {
        const key = dayKey(today.getTime() - (days - 1 - i) * DAY);
        const daySales = sales.filter((s) => dayKey(s.paidAt) === key);
        return {
            day: key,
            revenueCents: sum(daySales),
            sales: daySales.length,
        };
    });

    const topProducts = mine
        .map((p) => {
            const ps = sales.filter((s) => s.productId === p.id);
            return {
                id: p.id,
                slug: p.slug,
                title: p.title,
                views: p.viewCount,
                rating: p.rating,
                ratingCount: p.ratingCount,
                sales: ps.length,
                revenueCents: sum(ps),
            };
        })
        .sort((a, b) => b.revenueCents - a.revenueCents || b.sales - a.sales)
        .slice(0, 6);

    return {
        days,
        revenueCents: sum(sales),
        sales: sales.length,
        customers: new Set(sales.map((s) => s.buyer.name)).size,
        periodRevenueCents: sum(inPeriod),
        periodSales: inPeriod.length,
        previousPeriodRevenueCents: sum(prevPeriod),
        published: mine.filter((p) => p.status === "published").length,
        drafts: mine.filter((p) => p.status === "draft").length,
        views,
        avgRating: rated.length
            ? Math.round(
                  (rated.reduce((n, p) => n + p.rating, 0) / rated.length) *
                      100,
              ) / 100
            : 0,
        conversionRate: views ? sales.length / views : 0,
        series,
        topProducts,
    };
});

route("GET", "/seller/orders", ({ params }) => {
    const sellerId = requireSeller();
    const limit = Math.min(100, Number(params.limit) || 25);
    return db.sales
        .filter((s) => s.sellerId === sellerId)
        .sort((a, b) => b.paidAt - a.paidAt)
        .slice(0, limit)
        .map((s) => ({
            id: s.id,
            title: s.title,
            slug: db.products.find((p) => p.id === s.productId)?.slug,
            priceCents: s.priceCents,
            listPriceCents: s.listPriceCents,
            receiptNumber: s.receiptNumber,
            paidAt: iso(s.paidAt),
            buyer: s.buyer,
        }));
});

route("GET", "/seller/reviews", () => {
    const sellerId = requireSeller();
    const mine = new Map(
        db.products
            .filter((p) => p.sellerId === sellerId)
            .map((p) => [p.id, p]),
    );
    return db.reviews
        .filter((r) => mine.has(r.productId))
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 30)
        .map((r) => ({
            id: r.id,
            rating: r.rating,
            title: r.title,
            body: r.body,
            createdAt: iso(r.createdAt),
            author: r.author,
            avatarUrl: r.avatarUrl,
            product: {
                title: mine.get(r.productId).title,
                slug: mine.get(r.productId).slug,
            },
        }));
});

// AI
route("GET", "/ai/status", () => ({
    enabled: true,
    model: "gemini-3.8-flash",
}));

route("POST", "/ai/listing", async ({ form }) => {
    requireSeller();
    const { fields, files } = readForm(form);
    if (!fields.name && !fields.notes && !files.file?.[0])
        fail(
            400,
            "Add a working name, a few notes, or the product file so there is something to describe.",
        );
    await new Promise((r) => setTimeout(r, 1400));
    return generateListing({
        name: fields.name ?? "",
        notes: fields.notes ?? "",
        categoryHint: fields.categoryHint,
        fileName: files.file?.[0]?.name,
        categories: db.categories,
    });
});

route("POST", "/ai/assistant", async ({ body }) => {
    const message = String(body.message ?? "").trim();
    if (message.length < 2)
        fail(400, "message: Too small: expected string to have >=2 characters");
    await new Promise((r) => setTimeout(r, 900));
    const userId = currentUserId();
    const history = (body.history ?? [])
        .filter((h) => h.role === "user")
        .map((h) => h.content);
    const candidates = db.products.filter((p) => p.status === "published");
    const result = recommendProducts({
        message: [...history, message].join(" "),
        candidates,
        effectivePrice,
        categoryName: (s) => category(s)?.name ?? "",
    });
    return {
        reply: result.reply,
        followUp: result.followUp || null,
        source: "mock",
        recommendations: result.picks.map((pick) => ({
            reason: pick.reason,
            product: serializeProduct(
                candidates.find((p) => p.id === pick.productId),
                userId,
            ),
        })),
    };
});

/** Entry point used by src/lib/api.js in mock mode. */
export async function mockRequest(
    method,
    path,
    { body, form, params = {} } = {},
) {
    await latency();
    const cleanParams = Object.fromEntries(
        Object.entries(params)
            .filter(
                ([, v]) =>
                    v !== undefined && v !== null && v !== "" && v !== false,
            )
            .map(([k, v]) => [k, String(v)]),
    );
    for (const r of routes) {
        if (r.method !== method) continue;
        const m = path.match(r.re);
        if (!m) continue;
        const named = Object.fromEntries(
            r.keys.map((k, i) => [k, decodeURIComponent(m[i + 1])]),
        );
        return structuredClone(
            await r.handler({
                ...named,
                body: body ?? {},
                form,
                params: cleanParams,
            }),
        );
    }
    fail(404, "Not found.");
}
