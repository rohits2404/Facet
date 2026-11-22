const STOPWORDS = new Set(
    "a an and are as at be but by for from has have i in is it its me my need of on or that the this to want with you your looking something some any can could would like please under over below less than just good best nice cheap get buy".split(
        " ",
    ),
);

const keywords = (text) =>
    [
        ...new Set(
            (
                String(text)
                    .toLowerCase()
                    .match(/[a-z0-9+#.]{2,}/g) ?? []
            ).map((w) => w.replace(/^\.+|\.+$/g, "")),
        ),
    ].filter((w) => w.length > 1 && !STOPWORDS.has(w));

const CATEGORY_SIGNALS = {
    "ui-kits": [
        "figma",
        "ui",
        "kit",
        "design",
        "components",
        "wireframe",
        "mobile",
        "app",
    ],
    "code-templates": [
        "react",
        "next",
        "vue",
        "svelte",
        "template",
        "boilerplate",
        "starter",
        "dashboard",
        "saas",
        "admin",
        "tailwind",
        "node",
        "api",
    ],
    icons: ["icon", "icons", "svg", "glyph", "pictogram"],
    illustrations: [
        "illustration",
        "illustrations",
        "3d",
        "scene",
        "character",
        "vector",
    ],
    fonts: ["font", "typeface", "otf", "ttf", "woff", "serif", "sans"],
    ebooks: ["ebook", "book", "guide", "pdf", "course", "handbook", "playbook"],
    "notion-templates": [
        "notion",
        "planner",
        "tracker",
        "workspace",
        "productivity",
    ],
    presets: [
        "lightroom",
        "preset",
        "presets",
        "lut",
        "luts",
        "photo",
        "filter",
    ],
    audio: ["audio", "sound", "music", "sfx", "loop", "wav", "mp3"],
};

const BASE_PRICE = {
    "ui-kits": 4900,
    "code-templates": 7900,
    icons: 2400,
    illustrations: 2900,
    fonts: 3500,
    ebooks: 1900,
    "notion-templates": 1500,
    presets: 1900,
    audio: 2500,
};

const titleCase = (s) =>
    s.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1));

export function generateListing({
    name,
    notes,
    categoryHint,
    fileName,
    categories,
}) {
    const words = keywords(`${name} ${notes} ${fileName ?? ""}`);
    const slugs = categories.map((c) => c.slug);
    let categorySlug = slugs.includes(categoryHint) ? categoryHint : null;
    if (!categorySlug) {
        let best = 0;
        for (const [slug, signals] of Object.entries(CATEGORY_SIGNALS)) {
            const score = signals.filter((s) => words.includes(s)).length;
            if (score > best && slugs.includes(slug))
                [best, categorySlug] = [score, slug];
        }
    }
    categorySlug ??= slugs[0];
    const category = categories.find((c) => c.slug === categorySlug);
    const label = category?.name.toLowerCase() ?? "digital product";

    const title = titleCase(
        (name || words.slice(0, 3).join(" ") || "Untitled Product").trim(),
    ).slice(0, 60);

    const firstSentence = (notes || "").split(/(?<=[.!?])\s/)[0]?.trim();

    const tagline =
        firstSentence ||
        `A Polished ${label} Ready To Drop Into Your Next Project.`;

    const features = (notes || "")
        .split(/\n|[.;]\s/)
        .map((s) => s.replace(/^[-*•\s]+/, "").trim())
        .filter((s) => s.length > 8)
        .slice(0, 5);

    const featureList = features.length
        ? features
        : [
              "Ready-To-Use Source Files",
              "Clear Documentation",
              "Free Lifetime Updates",
          ];

    return {
        title,
        tagline: tagline.slice(0, 110),
        description: `${notes || tagline}\n\n### What's Included\n${featureList.map((f) => `- ${f}`).join("\n")}`,
        features: featureList,
        tags: [
            ...new Set([
                ...words.filter((w) => w.length > 2).slice(0, 8),
                categorySlug.replace("-", " "),
            ]),
        ].slice(0, 10),
        categorySlug,
        seoTitle: `${title} — ${category?.name ?? "Digital Product"}`.slice(
            0,
            60,
        ),
        seoDescription: tagline.slice(0, 155),
        suggestedPriceCents: BASE_PRICE[categorySlug] ?? 2900,
        pricingRationale: `Comparable ${label} Of This Scope Sell In This Range On Established Marketplaces.`,
        targetAudience: `Designers, Developers And Creators Who Want ${label} Without Building Them From Scratch.`,
        source: "mock",
    };
}

export function recommendProducts({
    message,
    candidates,
    effectivePrice,
    categoryName,
}) {
    const words = keywords(message);
    const budget = Number(
        message.match(/(?:under|below|less than|<)\s*\$?(\d+)/i)?.[1] ?? NaN,
    );
    const wantsFree = /\bfree\b/i.test(message);

    const scored = candidates
        .map((p) => {
            const final = effectivePrice(p).finalCents;
            const hay =
                `${p.title} ${p.tagline} ${p.tags.join(" ")} ${categoryName(p.category)} ${p.description ?? ""}`.toLowerCase();

            let score = words.reduce(
                (s, w) =>
                    s + (hay.includes(w) ? (p.tags.includes(w) ? 3 : 1) : 0),
                0,
            );

            if (!Number.isNaN(budget) && final > budget * 100) score -= 4;
            if (wantsFree && final > 0) score -= 3;

            score += p.rating * 0.2;

            return {
                p,
                score,
                matched: words.filter((w) => hay.includes(w)),
            };
        })
        .filter((x) => x.score > 1.5)
        .sort((a, b) => b.score - a.score);

    const top = scored[0]?.score ?? 0;

    const picks = scored
        .slice(0, 4)
        .filter((x, i) => i === 0 || x.score >= top / 2);

    return {
        reply: picks.length
            ? `Here ${picks.length === 1 ? "Is The Closest Match" : `Are The ${picks.length} Closest Matches`} In The Catalog For What You Described.`
            : "I Couldn't Find A Close Match. Try Naming The Tool Or Framework You Use, The Kind Of Asset, Or A Budget.",

        picks: picks.map(({ p, matched }) => ({
            productId: p.id,
            reason: matched.length
                ? `Matches ${matched.slice(0, 3).join(", ")}.`
                : `Highly Rated In ${categoryName(p.category)}.`,
        })),

        followUp: picks.length
            ? "Do You Have A Budget Or A Specific Stack In Mind?"
            : "",
    };
}
