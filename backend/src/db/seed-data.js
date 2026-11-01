export const categories = [
    {
        slug: "ui-kits",
        name: "UI Kits",
        description: "Figma And Sketch Systems, Screens And Components.",
    },
    {
        slug: "code-templates",
        name: "Code Templates",
        description: "Starters, Dashboards And Boilerplates That Ship.",
    },
    {
        slug: "icons",
        name: "Icon Sets",
        description: "Pixel-Tuned Glyphs In SVG, PNG And Icon Fonts.",
    },
    {
        slug: "illustrations",
        name: "Illustrations",
        description: "Scenes, Characters And 3D Renders For Product Work.",
    },
    {
        slug: "fonts",
        name: "Fonts",
        description: "Display And Text Families With Web Licences.",
    },
    {
        slug: "ebooks",
        name: "E-Books & Gids",
        description: "Playbooks And Handbooks From Working Practitioners.",
    },
    {
        slug: "notion-templates",
        name: "Notion Templates",
        description: "Workspaces, Planners And Trackers.",
    },
    {
        slug: "presets",
        name: "Photo Presets",
        description: "Lightroom Presets And LUTs For Consistent Grading.",
    },
    {
        slug: "audio",
        name: "Audio & SFX",
        description: "Interface Sounds, Loops And Sample Packs.",
    },
];

export const sellers = [
    {
        id: "seed_seller_northlight",
        name: "Northlight Studio",
        email: "hello@northlight.example",
        bio: "A Two-Person Product Studio In Oslo Building Design Systems And SaaS Starters We Use On Client Work First.",
    },
    {
        id: "seed_seller_glyphworks",
        name: "Glyphworks",
        email: "team@glyphworks.example",
        bio: "Icons, Type And Illustration Drawn On A Strict Gid Every Glyph Hand-Hinted At 16, 20 And 24px.",
    },
    {
        id: "seed_seller_paperpixel",
        name: "Paper & Pixel",
        email: "shop@paperpixel.example",
        bio: "Gids And Notion Systems For Founders, Freelancers And Small Teams Who Would Rather Ship Than Organise.",
    },
    {
        id: "seed_seller_grainfield",
        name: "Grainfield",
        email: "studio@grainfield.example",
        bio: "Film-Inspired Presets And Field-Recorded Sound For Photographers And Motion Designers.",
    },
];

export const products = [
    {
        seller: "seed_seller_northlight",
        category: "code-templates",
        slug: "orbit-saas-admin-dashboard",
        title: "Orbit - SaaS Admin Dashboard",
        tagline:
            "A React + Tailwind Admin With Auth Screens, Billing, Team Management And 40+ Pages.",
        price: 7900,
        discount: 20,
        quality: 0.92,
        popularity: 1.0,
        tags: [
            "react",
            "admin-dashboard",
            "saas",
            "tailwind",
            "typescript",
            "vite",
            "charts",
        ],
        features: [
            "42 Responsive Pages Incl. Billing, Teams And Settings",
            "React 19, TypeScript And Tailwind CSS V4",
            "Recharts Analytics Widgets With Dark Mode",
            "Role-Based Navigation And Protected Routes",
            "Figma Source File Included",
        ],
        audience:
            "SaaS Founders And Front-End Developers Who Need A Production-Grade Admin Without Building The Shell From Scratch.",
        description:
            "Orbit Is The Admin Dashboard We Kept Rebuilding For Client SaaS Projects, Finally Packaged Properly.\n\nIt Ships As A Vite + React 19 App With TypeScript, Tailwind CSS V4 And A Small Set Of Headless Primitives, So It Reads Like Code You Would Have Written Yourself. Pages Are Wired With Mock Data And Typed API Hooks; Swap In Your Backend And Go.\n\n### What's Included\n- 42 Pages: Overview, Analytics, Customers, Billing, Invoices, Team, Settings, Auth\n- 70+ Components With Keyboard And Screen-Reader Support\n- Light And Dark Themes Driven By CSS Variables\n- Figma File With Matching Components And Auto-Layout",
    },
    {
        seller: "seed_seller_northlight",
        category: "code-templates",
        slug: "launchpad-nextjs-saas-starter",
        title: "Launchpad - Next.js SaaS Starter",
        tagline:
            "Auth, Stripe Subscriptions, Postgres And A Marketing Site, Wired Together And Tested.",
        price: 14900,
        quality: 0.88,
        popularity: 0.8,
        tags: [
            "nextjs",
            "saas",
            "stripe",
            "postgres",
            "boilerplate",
            "typescript",
            "starter",
        ],
        features: [
            "Next.js App Router With Server Actions",
            "Stripe Subscriptions With Webhook Handling",
            "Postgres + Drizzle Schema And Migrations",
            "Marketing Site, Blog And Docs Pages",
            "Playwright End-To-End Tests",
        ],
        audience:
            "Indie Hackers And Small Teams Launching A Subscription Product Who Want The Boring Parts Done Right.",
        description:
            "Launchpad Gives You The First Three Weeks Of A SaaS Build On Day One.\n\nAuthentication, Subscription Billing, A Postgres Schema With Migrations, Transactional Email And A Marketing Site Are Already Connected And Covered By End-To-End Tests.\n\n### What's Included\n- Next.js App Router Project With TypeScript\n- Stripe Checkout, Customer Portal And Webhook Handlers\n- Drizzle ORM Schema For Users, Teams And Subscriptions\n- MDX Blog And Docs\n- Deployment Guide For Vercel And Fly.io",
    },
    {
        seller: "seed_seller_northlight",
        category: "ui-kits",
        slug: "meridian-design-system",
        title: "Meridian Design System For Figma",
        tagline:
            "Variables-First Figma System With 600+ Components, Light And Dark Modes.",
        price: 9900,
        quality: 0.9,
        popularity: 0.75,
        tags: [
            "figma",
            "design system",
            "components",
            "variables",
            "ui kit",
            "dark mode",
        ],
        features: [
            "600+ Components Built On Figma Variables",
            "Light, Dark And High-Contrast Modes",
            "Responsive Web And Mobile Templates",
            "Token Export For Tailwind And CSS",
            "Monthly Updates",
        ],
        audience:
            "Product Designers And Design-System Teams Who Want A Solid Foundation They Can Rebrand In An Afternoon.",
        description:
            "Meridian Is A Figma Design System Built Entirely On Variables, So Rebranding Is A Matter Of Changing A Few Tokens.\n\n### What's Included\n- 600+ Components With Variants And Auto-Layout\n- 120 Ready-Made Screens For Web And Mobile\n- Token Export Compatible With Tailwind And CSS Custom Properties\n- Documentation Pages Inside The File",
    },
    {
        seller: "seed_seller_northlight",
        category: "ui-kits",
        slug: "pocket-mobile-banking-ui-kit",
        title: "Pocket - Mobile Banking UI Kit",
        tagline:
            "86 iOS And Android Screens For Fintech Apps, From Onboarding To Card Controls.",
        price: 5900,
        discount: 30,
        quality: 0.84,
        popularity: 0.55,
        tags: [
            "figma",
            "mobile",
            "fintech",
            "banking",
            "ios",
            "android",
            "ui kit",
        ],
        features: [
            "86 Screens For iOS And Android",
            "Onboarding, KYC, Cards, Transfers And Insights Flows",
            "Built With Auto-Layout And Variants",
            "Prototype Links Included",
        ],
        audience: "Designers Working On Fintech, Wallet And Banking Apps.",
        description:
            "Pocket Covers The Flows Every Money App Needs, Designed With The Edge Cases Left In: Failed Transfers, Frozen Cards, Pending KYC.\n\n### What's Included\n- 86 Screens In Light And Dark\n- Component Library With 200+ Elements\n- Clickable Prototype",
    },
    {
        seller: "seed_seller_northlight",
        category: "code-templates",
        slug: "folio-astro-portfolio-template",
        title: "Folio - Astro Portfolio Template",
        tagline:
            "A Fast, Content-First Portfolio For Designers And Developers. Free.",
        price: 0,
        quality: 0.86,
        popularity: 0.9,
        tags: [
            "astro",
            "portfolio",
            "template",
            "free",
            "markdown",
            "tailwind",
        ],
        features: [
            "Astro With Content Collections",
            "Perfect Lighthouse Scores Out Of The Box",
            "Case-Study Layouts With MDX",
            "RSS, Sitemap And Open Graph Images",
        ],
        audience:
            "Designers And Developers Who Want A Portfolio Online This Weekend.",
        description:
            "Folio Is Our Free Astro Portfolio Template. Write Case Studies In Markdown, Push, And It Deploys.\n\n### What's Included\n- Astro Project With Typed Content Collections\n- Three Case-Study Layouts\n- Automatic Open Graph Images",
    },
    {
        seller: "seed_seller_northlight",
        category: "code-templates",
        slug: "relay-react-native-starter",
        title: "Relay - React Native Expo Starter",
        tagline:
            "Expo Router App With Auth, Push Notifications, In-App Purchases And Theming.",
        price: 6900,
        quality: 0.8,
        popularity: 0.45,
        tags: [
            "react native",
            "expo",
            "mobile",
            "starter",
            "typescript",
            "ios",
            "android",
        ],
        features: [
            "Expo Router With Typed Routes",
            "Email And OAuth Sign-In Screens",
            "Push Notifications And Deep Links",
            "RevenueCat In-App Purchases",
            "Light And Dark Themes",
        ],
        audience: "Mobile Developers Starting A Cross-Platform App.",
        description:
            "Relay Is A React Native Starter That Ships With The Pieces App-Store Apps Actually Need.\n\n### What's Included\n- Expo SDK Project With TypeScript\n- Auth, Onboarding, Paywall And Settings Screens\n- CI Workflow For EAS Builds",
    },
    {
        seller: "seed_seller_glyphworks",
        category: "icons",
        slug: "lumen-icons-2400",
        title: "Lumen Icons — 2,400 Line Icons",
        tagline:
            "A Consistent Line Icon Family In 3 Weights, Drawn On A 24px Grid.",
        price: 3900,
        quality: 0.94,
        popularity: 0.95,
        tags: ["icons", "svg", "line icons", "figma", "react", "icon font"],
        features: [
            "2,400 Icons Across 28 Categories",
            "Light, Regular And Bold Weights",
            "SVG, PNG, Icon Font And React Components",
            "Figma Library With Variants",
        ],
        audience:
            "Product Designers And Developers Who Need One Icon Family That Covers Everything.",
        description:
            "Lumen Is A Line Icon Family Drawn On A 24px Grid With 1.5px Strokes, Tuned At Small Sizes.\n\n### What's Included\n- 2,400 Icons × 3 Weights\n- SVG, PNG (1×, 2×), WOFF2 Icon Font\n- React Package With Tree-Shaking\n- Figma Component Library",
    },
    {
        seller: "seed_seller_glyphworks",
        category: "icons",
        slug: "duotone-finance-icons",
        title: "Duotone Finance Icons",
        tagline:
            "320 Two-Colour Icons For Fintech, Crypto And Accounting Products.",
        price: 1900,
        quality: 0.82,
        popularity: 0.4,
        tags: ["icons", "duotone", "finance", "fintech", "crypto", "svg"],
        features: [
            "320 Duotone Icons",
            "Recolourable Via CSS Variables",
            "SVG And Figma",
        ],
        audience: "Designers Building Finance Dashboards And Banking Apps.",
        description:
            "Two-Colour Icons Where The Accent Layer Is A CSS Variable, So They Adapt To Any Brand.\n\n### What's Included\n- 320 Icons In SVG\n- Figma Library",
    },
    {
        seller: "seed_seller_glyphworks",
        category: "illustrations",
        slug: "softscape-3d-illustrations",
        title: "Softscape 3D Illustrations",
        tagline:
            "60 Soft-Clay 3D Scenes For Onboarding, Empty States And Landing Pages.",
        price: 4900,
        discount: 15,
        quality: 0.87,
        popularity: 0.6,
        tags: [
            "3d",
            "illustrations",
            "blender",
            "empty states",
            "onboarding",
            "png",
        ],
        features: [
            "60 Scenes Rendered At 4K",
            "Blender Source Files",
            "Transparent PNG And WebP",
            "Colour Variants For Light UIs",
        ],
        audience:
            "Product And Marketing Designers Who Want Friendly 3D Art Without A 3D Artist.",
        description:
            "Softscape Is A Set Of Soft-Clay 3D Scenes Designed For The Moments Products Usually Leave Blank.\n\n### What's Included\n- 60 Scenes, 4K Transparent PNG And WebP\n- Blender Source With Materials And Lighting",
    },
    {
        seller: "seed_seller_glyphworks",
        category: "illustrations",
        slug: "people-of-work-illustrations",
        title: "People Of Work - Character Kit",
        tagline:
            "A Mix-And-Match Character Builder With 900 Parts And 40 Poses.",
        price: 3500,
        quality: 0.78,
        popularity: 0.35,
        tags: [
            "illustrations",
            "characters",
            "vector",
            "figma",
            "svg",
            "diversity",
        ],
        features: [
            "900 Interchangeable Parts",
            "40 Poses And 120 Props",
            "Figma And SVG",
        ],
        audience: "Designers Illustrating SaaS Marketing Pages And Docs.",
        description:
            "Build Inclusive Characters In Minutes: Swap Heads, Outfits, Poses And Props.\n\n## What's Included\n- Figma Builder File\n- 200 Pre-Built SVG Characters",
    },
    {
        seller: "seed_seller_glyphworks",
        category: "fonts",
        slug: "halden-grotesk-font-family",
        title: "Halden Grotesk - Font Family",
        tagline:
            "A Sharp Neo-Grotesk In 9 Weights With Variable Font And Web Licence.",
        price: 5900,
        quality: 0.91,
        popularity: 0.5,
        tags: [
            "font",
            "typeface",
            "sans serif",
            "grotesk",
            "variable font",
            "web font",
        ],
        features: [
            "9 Weights Plus Italics",
            "Variable Font (Wght)",
            "Latin Extended, 600+ Glyphs",
            "Desktop And Web Licence",
        ],
        audience:
            "Brand And Product Designers Looking For A Characterful UI And Display Sans.",
        description:
            "Halden Is A Neo-Grotesk With Ink Traps That Open Up At Small Sizes And Tighten Into Sharp Shapes At Display Sizes.\n\n### What's Included\n- OTF, TTF, WOFF2\n- Variable Font\n- Licence For Desktop And Up To 500k Monthly Web Views",
    },
    {
        seller: "seed_seller_glyphworks",
        category: "fonts",
        slug: "margin-serif-free-font",
        title: "Margin Serif",
        tagline:
            "A Free Text Serif For Long-Form Reading, With Regular And Italic.",
        price: 0,
        quality: 0.83,
        popularity: 0.7,
        tags: ["font", "serif", "free", "editorial", "web font"],
        features: ["Regular And Italic", "Open Font Licence", "WOFF2 Included"],
        audience: "Writers, Bloggers And Editorial Designers.",
        description:
            "Margin Is A Calm Text Serif For Long Reading On Screens, Released Free Under The OFL.\n\n## What's Included\n- OTF And WOFF2\n- Specimen PDF",
    },
    {
        seller: "seed_seller_paperpixel",
        category: "ebooks",
        slug: "pricing-your-saas-playbook",
        title: "Pricing Your SaaS - The Playbook",
        tagline:
            "A 140-Page Guide To Packaging, Pricing Pages And Raising Prices Without Churn.",
        price: 2900,
        quality: 0.9,
        popularity: 0.65,
        tags: ["ebook", "saas", "pricing", "startup", "pdf", "growth"],
        features: [
            "140 Pages, PDF And EPUB",
            "28 Pricing Page Teardowns",
            "Spreadsheet Models For Tiers And Usage Pricing",
            "Email Scripts For Price Increases",
        ],
        audience:
            "SaaS Founders And Product Managers Setting Or Changing Prices.",
        description:
            "Most SaaS Products Are Underpriced. This Playbook Walks Through Choosing A Value Metric, Designing Tiers And Raising Prices With Existing Customers.\n\n### What's Included\n- PDF And EPUB\n- Pricing Model Spreadsheet\n- 28 Annotated Pricing Page Teardowns",
    },
    {
        seller: "seed_seller_paperpixel",
        category: "ebooks",
        slug: "freelance-design-contracts-kit",
        title: "Freelance Design Contracts Kit",
        tagline:
            "Lawyer-Reviewed Contract, Proposal And Invoice Templates For Freelancers.",
        price: 2400,
        discount: 25,
        quality: 0.85,
        popularity: 0.5,
        tags: [
            "freelance",
            "contracts",
            "templates",
            "design business",
            "proposal",
            "invoice",
        ],
        features: [
            "Contract, SOW And NDA Templates",
            "Proposal Template In Google Docs And Notion",
            "Invoice And Late-Payment Email Templates",
        ],
        audience:
            "Freelance Designers And Developers Who Want To Stop Rewriting Contracts.",
        description:
            "Everything You Need To Sign And Get Paid On A Freelance Project.\n\n### What's Included\n- 6 Legal Templates (DOCX + Google Docs)\n- Proposal And Invoice Templates\n- Short Guide To Scope And Change Requests",
    },
    {
        seller: "seed_seller_paperpixel",
        category: "notion-templates",
        slug: "founder-os-notion",
        title: "Founder OS For Notion",
        tagline:
            "One Notion Workspace For Goals, CRM, Hiring, Investors And Weekly Reviews.",
        price: 3900,
        quality: 0.86,
        popularity: 0.85,
        tags: ["notion", "productivity", "startup", "crm", "okr", "template"],
        features: [
            "OKR And Weekly Review System",
            "Lightweight CRM And Investor Pipeline",
            "Hiring Tracker With Scorecards",
            "Video Walkthrough",
        ],
        audience: "Early-Stage Founders Running The Company From Notion.",
        description:
            "Founder OS Connects Goals, People And Pipelines In One Notion Workspace So Your Weekly Review Takes 20 Minutes.\n\n### What's Included\n- Notion Template (Duplicate Link)\n- 25-Minute Video Walkthrough",
    },
    {
        seller: "seed_seller_paperpixel",
        category: "notion-templates",
        slug: "content-calendar-notion",
        title: "Content Calendar For Notion",
        tagline:
            "Plan, Write And Publish Across Blog, Newsletter And Social From One Board.",
        price: 0,
        quality: 0.8,
        popularity: 0.8,
        tags: [
            "notion",
            "content calendar",
            "free",
            "marketing",
            "social media",
        ],
        features: [
            "Kanban And Calendar Views",
            "Repurposing Checklist",
            "Free Forever",
        ],
        audience: "Creators And Small Marketing Teams.",
        description:
            "A Free Notion Board For Planning Content Across Channels.\n\n## What's Included\n- Notion Template Link",
    },
    {
        seller: "seed_seller_paperpixel",
        category: "notion-templates",
        slug: "student-planner-notion",
        title: "Semester Planner For Notion",
        tagline:
            "Courses, Assignments, Exams And Grade Tracking In One Aesthetic Dashboard.",
        price: 980,
        quality: 0.83,
        popularity: 0.6,
        tags: ["notion", "student", "planner", "study", "productivity"],
        features: [
            "Assignment Tracker With Due-Date Views",
            "Grade Calculator",
            "Exam Revision Planner",
        ],
        audience: "University And High-School Students.",
        description:
            "Keep Every Course, Deadline And Grade In One Place.\n\n## What's Included\n- Notion Template Link\n- Setup Guide",
    },
    {
        seller: "seed_seller_paperpixel",
        category: "ebooks",
        slug: "design-systems-handbook",
        title: "The Practical Design Systems Handbook",
        tagline:
            "How Small Teams Build, Document And Govern A Design System That Gets Used.",
        price: 3400,
        quality: 0.88,
        popularity: 0.45,
        tags: ["ebook", "design system", "figma", "documentation", "pdf"],
        features: [
            "180 Pages, PDF And EPUB",
            "Governance And Contribution Templates",
            "Token Naming Cheat Sheet",
        ],
        audience:
            "Designers And Front-End Engineers Starting Or Redoing A Design System.",
        description:
            "A Practical Guide To Design Systems For Teams Of 2 To 20.\n\n## What's Included\n- PDF And EPUB\n- Notion Templates For RFCs And Changelogs",
    },
    {
        seller: "seed_seller_grainfield",
        category: "presets",
        slug: "kodak-portra-lightroom-presets",
        title: "Portra Film - Lightroom Presets",
        tagline: "24 Presets Modelled On Portra 160, 400 And 800 Film Stocks.",
        price: 2900,
        quality: 0.9,
        popularity: 0.7,
        tags: [
            "lightroom",
            "presets",
            "film",
            "photography",
            "portrait",
            "luts",
        ],
        features: [
            "24 Lightroom Presets (Desktop + Mobile)",
            "Matching .cube LUTs For Video",
            "Grain And Halation Variants",
        ],
        audience: "Portrait And Wedding Photographers Chasing A Film Look.",
        description:
            "Calibrated Against Scanned Rolls Of Portra 160, 400 And 800.\n\n## What's Included\n- XMP And DNG Presets\n- 12 .cube LUTs\n- Install Guide",
    },
    {
        seller: "seed_seller_grainfield",
        category: "presets",
        slug: "nordic-moody-presets",
        title: "Nordic Moody Presets",
        tagline:
            "Muted Greens And Deep Shadows For Landscape And Travel Photography.",
        price: 1900,
        discount: 40,
        quality: 0.8,
        popularity: 0.5,
        tags: ["lightroom", "presets", "moody", "landscape", "travel"],
        features: ["16 Presets", "Mobile And Desktop Versions"],
        audience: "Landscape And Travel Photographers.",
        description:
            "Presets Built On A Winter In Northern Norway.\n\n## What's Included\n- XMP And DNG Presets",
    },
    {
        seller: "seed_seller_grainfield",
        category: "audio",
        slug: "tactile-ui-sounds",
        title: "Tactile - UI Sound Pack",
        tagline:
            "180 Interface Sounds Recorded From Real Switches, Paper And Glass.",
        price: 2500,
        quality: 0.89,
        popularity: 0.55,
        tags: ["audio", "ui sounds", "sfx", "wav", "app", "game"],
        features: [
            "180 Sounds In WAV And OGG",
            "Tags, Toggles, Notifications And Errors",
            "Royalty-Free For Apps And Games",
        ],
        audience: "App, Game And Motion Designers Adding Sound To Interfaces.",
        description:
            "Interface Sounds Recorded From Physical Objects, Then Trimmed For UI.\n\n## What's Included\n- 180 WAV (48kHz/24-bit) And OGG Files\n- Royalty-Free License",
    },
    {
        seller: "seed_seller_grainfield",
        category: "audio",
        slug: "lofi-loops-vol-1",
        title: "Lo-Fi Loops Vol. 1",
        tagline:
            "60 Royalty-Free Lo-Fi Loops And Stems For Videos And Streams. Free.",
        price: 0,
        quality: 0.78,
        popularity: 0.75,
        tags: ["audio", "music", "lofi", "loops", "free", "royalty free"],
        features: [
            "60 Loops With Stems",
            "Tempo And Key Labelled",
            "Royalty-Free",
        ],
        audience: "Video Creators And Streamers.",
        description:
            "Warm, Dusty Loops For Background Music.\n\n## What's Included\n- 60 Loops (WAV) With Stems",
    },
    {
        seller: "seed_seller_grainfield",
        category: "presets",
        slug: "cinematic-luts-pack",
        title: "Cinematic LUTs - Teal & Amber",
        tagline:
            "30 LUTs For Premiere, Resolve And Final Cut With Log And Rec.709 Versions.",
        price: 3900,
        quality: 0.84,
        popularity: 0.4,
        tags: [
            "luts",
            "video",
            "color grading",
            "premiere",
            "davinci resolve",
            "cinematic",
        ],
        features: [
            "30 LUTs In .cube Format",
            "S-Log3, V-Log And Rec.709 Versions",
            "Works In All Major Editors",
        ],
        audience: "Video Editors And Filmmakers.",
        description:
            "A Grading Pack Built Around Complementary Teal And Amber Palettes.\n\n## What's Included\n- 30 .cube LUTs\n- 3 Input Profiles\n- Install Guide",
    },
];

export const buyerNames = [
    "Maya Chen",
    "Lucas Ferreira",
    "Aisha Khan",
    "Jonas Weber",
    "Priya Nair",
    "Tom Okafor",
    "Sofia Rossi",
    "Ethan Brooks",
    "Hana Sato",
    "Diego Morales",
    "Elena Petrova",
    "Noah Kim",
    "Zara Ahmed",
    "Liam Murphy",
    "Chloe Martin",
    "Arjun Mehta",
    "Freya Lindqvist",
    "Omar Haddad",
    "Isabel Costa",
    "Ben Carter",
    "Mei Lin",
    "Kofi Mensah",
    "Nina Novak",
    "Sam Rivera",
    "Leila Farah",
    "Max Schmidt",
    "Ana Silva",
    "Ryo Tanaka",
    "Grace Lee",
    "Victor Dubois",
    "Ivy Walsh",
    "Ravi Patel",
];

export const reviewTemplates = {
    5: [
        [
            "Exactly What I Needed",
            "Saved Me Days Of Setup. Clean Structure And The Docs Answer The Questions Before You Ask Them.",
        ],
        [
            "Best Purchase This Year",
            "The Quality Is Obvious The Moment You Open The Files. Already Used It On Two Client Projects.",
        ],
        [
            "Worth Every Cent",
            "Thoughtful Details Everywhere. Updates Have Been Regular Too.",
        ],
        [
            "Polished And Practical",
            "Not Just Pretty — It Holds Up In A Real Project. Support Replied Within A Day.",
        ],
    ],
    4: [
        [
            "Very Good, Small Gaps",
            "Solid Overall. A Couple Of Edge Cases I Had To Handle Myself, But Nothing Major.",
        ],
        [
            "Great Value",
            "Does What It Says. I Would Love A Few More Examples, But I Am Happy With It.",
        ],
        [
            "Recommended",
            "Well Organised And Easy To Customise. Docs Could Go A Little Deeper.",
        ],
    ],
    3: [
        [
            "Decent Starting Point",
            "Useful, But I Ended Up Changing More Than I Expected.",
        ],
        [
            "Okay",
            "Good Quality But Not Quite The Style I Was After. Fair Price Though.",
        ],
    ],
    2: [
        [
            "Not For Me",
            "Looked Different From The Previews In A Few Places. Refund Process Was Easy.",
        ],
    ],
};
