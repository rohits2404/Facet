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
        name: "E-Books & Guides",
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
        bio: "Icons, Type And Illustration Drawn On A Strict Grid. Every Glyph Hand-Hinted At 16, 20 And 24px.",
    },
    {
        id: "seed_seller_paperpixel",
        name: "Paper & Pixel",
        email: "shop@paperpixel.example",
        bio: "Guides And Notion Systems For Founders, Freelancers And Small Teams Who Would Rather Ship Than Organise.",
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
        Seller: "seed_seller_northlight",
        Category: "code-templates",
        Slug: "orbit-saas-admin-dashboard",
        Title: "Orbit - SaaS Admin Dashboard",
        Tagline:
            "A React + Tailwind Admin With Auth Screens, Billing, Team Management And 40+ Pages.",
        Price: 7900,
        Discount: 20,
        Quality: 0.92,
        Popularity: 1.0,
        Tags: [
            "react",
            "admin dashboard",
            "saas",
            "tailwind",
            "typescript",
            "vite",
            "charts",
        ],
        Features: [
            "42 Responsive Pages Incl. Billing, Teams And Settings",
            "React 19, TypeScript And Tailwind CSS v4",
            "Recharts Analytics Widgets With Dark Mode",
            "Role-Based Navigation And Protected Routes",
            "Figma Source File Included",
        ],
        Description:
            "Orbit Is The Admin Dashboard We Kept Rebuilding For Client SaaS Projects, Finally Packaged Properly.\n\nIt Ships As A Vite + React 19 App With TypeScript, Tailwind CSS v4 And A Small Set Of Headless Primitives, So It Reads Like Code You Would Have Written Yourself. Pages Are Wired With Mock Data And Typed API Hooks; Swap In Your Backend And Go.\n\n### What's Included\n- 42 Pages: Overview, Analytics, Customers, Billing, Invoices, Team, Settings, Auth\n- 70+ Components With Keyboard And Screen-Reader Support\n- Light And Dark Themes Driven By CSS Variables\n- Figma File With Matching Components And Auto-Layout",
    },
    {
        Seller: "seed_seller_northlight",
        Category: "code-templates",
        Slug: "launchpad-nextjs-saas-starter",
        Title: "Launchpad - Next.js SaaS Starter",
        Tagline:
            "Auth, Stripe Subscriptions, Postgres And A Marketing Site, Wired Together And Tested.",
        Price: 14900,
        Quality: 0.88,
        Popularity: 0.8,
        Tags: [
            "nextjs",
            "saas",
            "stripe",
            "postgres",
            "boilerplate",
            "typescript",
            "starter",
        ],
        Features: [
            "Next.js App Router With Server Actions",
            "Stripe Subscriptions With Webhook Handling",
            "Postgres + Drizzle Schema And Migrations",
            "Marketing Site, Blog And Docs Pages",
            "Playwright End-To-End Tests",
        ],
        Description:
            "Launchpad Gives You The First Three Weeks Of A SaaS Build On Day One.\n\nAuthentication, Subscription Billing, A Postgres Schema With Migrations, Transactional Email And A Marketing Site Are Already Connected And Covered By End-To-End Tests.\n\n### What's Included\n- Next.js App Router Project With TypeScript\n- Stripe Checkout, Customer Portal And Webhook Handlers\n- Drizzle ORM Schema For Users, Teams And Subscriptions\n- MDX Blog And Docs\n- Deployment Guide For Vercel And Fly.io",
    },
    {
        Seller: "seed_seller_northlight",
        Category: "ui-kits",
        Slug: "meridian-design-system",
        Title: "Meridian Design System For Figma",
        Tagline:
            "Variables-First Figma System With 600+ Components, Light And Dark Modes.",
        Price: 9900,
        Quality: 0.9,
        Popularity: 0.75,
        Tags: [
            "figma",
            "design system",
            "components",
            "variables",
            "ui kit",
            "dark mode",
        ],
        Features: [
            "600+ Components Built On Figma Variables",
            "Light, Dark And High-Contrast Modes",
            "Responsive Web And Mobile Templates",
            "Token Export For Tailwind And CSS",
            "Monthly Updates",
        ],
        Description:
            "Meridian Is A Figma Design System Built Entirely On Variables, So Rebranding Is A Matter Of Changing A Few Tokens.\n\n### What's Included\n- 600+ Components With Variants And Auto-Layout\n- 120 Ready-Made Screens For Web And Mobile\n- Token Export Compatible With Tailwind And CSS Custom Properties\n- Documentation Pages Inside The File",
    },
    {
        Seller: "seed_seller_northlight",
        Category: "ui-kits",
        Slug: "pocket-mobile-banking-ui-kit",
        Title: "Pocket - Mobile Banking UI Kit",
        Tagline:
            "iOS And Android Screens For Fintech Apps, From Onboarding To Card Controls.",
        Price: 5900,
        Discount: 30,
        Quality: 0.84,
        Popularity: 0.55,
        Tags: [
            "figma",
            "mobile",
            "fintech",
            "banking",
            "ios",
            "android",
            "ui kit",
        ],
        Features: [
            "86 Screens For iOS And Android",
            "Onboarding, KYC, Cards, Transfers And Insights Flows",
            "Built With Auto-Layout And Variants",
            "Prototype Links Included",
        ],
        Audience: "Designers Working On Fintech, Wallet And Banking Apps.",
        Description:
            "Pocket Covers The Flows Every Money App Needs, Designed With The Edge Cases Left In: Failed Transfers, Frozen Cards, Pending KYC.\n\n### What's Included\n- 86 Screens In Light And Dark\n- Component Library With 200+ Elements\n- Clickable Prototype",
    },
    {
        Seller: "seed_seller_northlight",
        Category: "code-templates",
        Slug: "folio-astro-portfolio-template",
        Title: "Folio - Astro Portfolio Template",
        Tagline:
            "A Fast, Content-First Portfolio For Designers And Developers. Free.",
        Price: 0,
        Quality: 0.8,
        Popularity: 0.9,
        Tags: [
            "astro",
            "portfolio",
            "template",
            "free",
            "markdown",
            "tailwind",
        ],
        Features: [
            "Astro With Content Collections",
            "Perfect Lighthouse Scores Out Of The Box",
            "Case-Study Layouts With MDX",
            "RSS, Sitemap And Open Graph Images",
        ],
        Audience:
            "Designers And Developers Who Want A Portfolio Online This Weekend.",
        Description:
            "Folio Is Our Free Astro Portfolio Template. Write Case Studies In Markdown, Push, And It Deploys.\n\n### What's Included\n- Astro Project With Typed Content Collections\n- Three Case-Study Layouts\n- Automatic Open Graph Images",
    },
    {
        Seller: "seed_seller_northlight",
        Category: "code-templates",
        Slug: "relay-react-native-starter",
        Title: "Relay - React Native Expo Starter",
        Tagline:
            "Expo Router App With Auth, Push Notifications, In-App Purchases And Theming.",
        Price: 6900,
        Quality: 0.8,
        Popularity: 0.45,
        Tags: [
            "react native",
            "expo",
            "mobile",
            "starter",
            "typescript",
            "ios",
            "android",
        ],
        Features: [
            "Expo Router With Typed Routes",
            "Email And OAuth Sign-In Screens",
            "Push Notifications And Deep Links",
            "RevenueCat In-App Purchases",
            "Light And Dark Themes",
        ],
        Audience: "Mobile Developers Starting A Cross-Platform App.",
        Description:
            "Relay Is A React Native Starter That Ships With The Pieces App-Store Apps Actually Need.\n\n### What's Included\n- Expo SDK Project With TypeScript\n- Auth, Onboarding, Paywall And Settings Screens\n- CI Workflow For EAS Builds",
    },
    {
        Seller: "seed_seller_glyphworks",
        Category: "icons",
        Slug: "lumen-icons-2400",
        Title: "Lumen Icons - 2,400 Line Icons",
        Tagline:
            "A Consistent Line Icon Family In 3 Weights, Drawn On A 24px Grid.",
        Price: 3900,
        Quality: 0.94,
        Popularity: 0.95,
        Tags: ["icons", "svg", "line icons", "figma", "react", "icon font"],
        Features: [
            "2,400 Icons Across 28 Categories",
            "Light, Regular And Bold Weights",
            "SVG, PNG, Icon Font And React Components",
            "Figma Library With Variants",
        ],
        Audience:
            "Product Designers And Developers Who Need One Icon Family That Covers Everything.",
        Description:
            "Lumen Is A Line Icon Family Drawn On A 24px Grid With 1.5px Strokes, Tuned At Small Sizes.\n\n### What's Included\n- 2,400 Icons × 3 Weights\n- SVG, PNG (1×, 2×), WOFF2 Icon Font\n- React Package With Tree-Shaking\n- Figma Component Library",
    },
    {
        Seller: "seed_seller_glyphworks",
        Category: "icons",
        Slug: "duo-tone-finance-icons",
        Title: "Duotone Finance Icons",
        Tagline:
            "320 Two-Colour Icons For Fintech, Crypto And Accounting Products.",
        Price: 1900,
        Quality: 0.82,
        Popularity: 0.4,
        Tags: ["icons", "duotone", "finance", "fintech", "crypto", "svg"],
        Features: [
            "320 Duotone Icons",
            "Recolourable Via CSS Variables",
            "SVG And Figma",
        ],
        Audience:
            "320 Two-Colour Icons For Fintech, Crypto And Accounting Products.",
        Description:
            "Two-Colour Icons Where The Accent Layer Is A CSS Variable, So They Adapt To Any Brand.\n\n### What's Included\n- 320 Icons In SVG\n- Figma Library",
    },
    {
        Seller: "seed_seller_glyphworks",
        Category: "illustrations",
        Slug: "softscape-3d-illustrations",
        Title: "Softscape 3D Illustrations",
        Tagline:
            "60 Soft-Clay 3D Scenes For Onboarding, Empty States And Landing Pages.",
        Price: 4900,
        Discount: 15,
        Quality: 0.87,
        Popularity: 0.6,
        Tags: [
            "3d",
            "illustrations",
            "blender",
            "empty states",
            "onboarding",
            "png",
        ],
        Features: [
            "60 Scenes Rendered At 4K",
            "Blender Source Files",
            "Transparent PNG And WebP",
            "Colour Variants For Light UIs",
        ],
        Audience:
            "Product And Marketing Designers Who Want Friendly 3D Art Without A 3D Artist.",
        Description:
            "Softscape Is A Set Of Soft-Clay 3D Scenes Designed For The Moments Products Usually Leave Blank.\n\n### What's Included\n- 60 Scenes, 4K Transparent PNG And WebP\n- Blender Source With Materials And Lighting",
    },
    {
        Seller: "seed_seller_glyphworks",
        Category: "illustrations",
        Slug: "people-of-work-illustrations",
        Title: "People Of Work - Character Kit",
        Tagline:
            "A Mix-And-Match Character Builder With 900 Parts And 40 Poses.",
        Price: 3500,
        Quality: 0.78,
        Popularity: 0.35,
        Tags: [
            "illustrations",
            "characters",
            "vector",
            "figma",
            "svg",
            "diversity",
        ],
        Features: [
            "900 Interchangeable Parts",
            "40 Poses And 120 Props",
            "Figma And SVG",
        ],
        Audience: "Designers Illustrating SaaS Marketing Pages And Docs.",
        Description:
            "Build Inclusive Characters In Minutes: Swap Heads, Outfits, Poses And Props.\n\n### What's Included\n- Figma Builder File\n- 200 Pre-Built SVG Characters",
    },
    {
        Seller: "seed_seller_glyphworks",
        Category: "fonts",
        Slug: "halden-grotesk-font-family",
        Title: "Halden Grotesk - Font Family",
        Tagline:
            "A Sharp Neo-Grotesk In 9 Weights With Variable Font And Web Licence.",
        Price: 5900,
        Quality: 0.91,
        Popularity: 0.5,
        Tags: [
            "font",
            "typeface",
            "sans serif",
            "grotesk",
            "variable font",
            "web font",
        ],
        Features: [
            "9 Weights Plus Italics",
            "Variable Font (Wght)",
            "Latin Extended, 600+ Glyphs",
            "Desktop And Web Licence",
        ],
        Audience:
            "Brand And Product Designers Looking For A Characterful UI And Display Sans.",
        Description:
            "Halden Is A Neo-Grotesk With Ink Traps That Open Up At Small Sizes And Tighten Into Sharp Shapes At Display Sizes.\n\n### What's Included\n- OTF, TTF, WOFF2\n- Variable Font\n- Licence For Desktop And Up To 500k Monthly Web Views",
    },
    {
        Seller: "seed_seller_glyphworks",
        Category: "fonts",
        Slug: "margin-serif-free-font",
        Title: "Margin Serif",
        Tagline:
            "A Free Text Serif For Long-Form Reading, With Regular And Italic.",
        Price: 0,
        Quality: 0.83,
        Popularity: 0.7,
        Tags: ["font", "serif", "free", "editorial", "web font"],
        Features: ["Regular And Italic", "Open Font Licence", "WOFF2 Included"],
        Audience: "Writers, Bloggers And Editorial Designers.",
        Description:
            "Margin Is A Calm Text Serif For Long Reading On Screens, Released Free Under The OFL.\n\n### What's Included\n- OTF And WOFF2\n- Specimen PDF",
    },
    {
        Seller: "seed_seller_paperpixel",
        Category: "ebooks",
        Slug: "pricing-your-saas-playbook",
        Title: "Pricing Your SaaS - The Playbook",
        Tagline:
            "A 140-Page Guide To Packaging, Pricing Pages And Raising Prices Without Churn.",
        Price: 2900,
        Quality: 0.9,
        Popularity: 0.65,
        Tags: ["ebook", "saas", "pricing", "startup", "pdf", "growth"],
        Features: [
            "140 Pages, PDF And EPUB",
            "28 Pricing Page Teardowns",
            "Spreadsheet Models For Tiers And Usage Pricing",
            "Email Scripts For Price Increases",
        ],
        Audience:
            "SaaS Founders And Product Managers Setting Or Changing Prices.",
        Description:
            "Most SaaS Products Are Underpriced. This Playbook Walks Through Choosing A Value Metric, Designing Tiers And Raising Prices With Existing Customers.\n\n### What's Included\n- PDF And EPUB\n- Pricing Model Spreadsheet\n- 28 Annotated Pricing Page Teardowns",
    },
    {
        Seller: "seed_seller_paperpixel",
        Category: "ebooks",
        Slug: "freelance-design-contracts-kit",
        Title: "Freelance Design Contracts Kit",
        Tagline:
            "Lawyer-Reviewed Contract, Proposal And Invoice Templates For Freelancers.",
        Price: 2400,
        Discount: 25,
        Quality: 0.85,
        Popularity: 0.5,
        Tags: [
            "freelance",
            "contracts",
            "templates",
            "design business",
            "proposal",
            "invoice",
        ],
        Features: [
            "Contract, SOW And NDA Templates",
            "Proposal Template In Google Docs And Notion",
            "Invoice And Late-Payment Email Templates",
        ],
        Audience:
            "Freelance Designers And Developers Who Want To Stop Rewriting Contracts.",
        Description:
            "Everything You Need To Sign And Get Paid On A Freelance Project.\n\n### What's Included\n- 6 Legal Templates (DOCX + Google Docs)\n- Proposal And Invoice Templates\n- Short Guide To Scope And Change Requests",
    },
    {
        Seller: "seed_seller_paperpixel",
        Category: "notion-templates",
        Slug: "founder-os-notion",
        Title: "Founder OS For Notion",
        Tagline:
            "One Notion Workspace For Goals, CRM, Hiring, Investors And Weekly Reviews.",
        Price: 3900,
        Quality: 0.86,
        Popularity: 0.85,
        Tags: ["notion", "productivity", "startup", "crm", "okr", "template"],
        Features: [
            "OKR And Weekly Review System",
            "Lightweight CRM And Investor Pipeline",
            "Hiring Tracker With Scorecards",
            "Video Walkthrough",
        ],
        Audience: "Early-Stage Founders Running The Company From Notion.",
        Description:
            "Founder OS Connects Goals, People And Pipelines In One Notion Workspace So Your Weekly Review Takes 20 Minutes.\n\n### What's Included\n- Notion Template (Duplicate Link)\n- 25-Minute Video Walkthrough",
    },
    {
        Seller: "seed_seller_paperpixel",
        Category: "notion-templates",
        Slug: "content-calendar-notion",
        Title: "Content Calendar For Notion",
        Tagline:
            "Plan, Write And Publish Across Blog, Newsletter And Social From One Board.",
        Price: 0,
        Quality: 0.8,
        Popularity: 0.8,
        Tags: [
            "notion",
            "content calendar",
            "free",
            "marketing",
            "social media",
        ],
        Features: [
            "Kanban And Calendar Views",
            "Repurposing Checklist",
            "Free Forever",
        ],
        Audience: "Creators And Small Marketing Teams.",
        Description:
            "A Free Notion Board For Planning Content Across Channels.\n\n### What’s Included\n- Notion Template Link",
    },
    {
        Seller: "seed_seller_paperpixel",
        Category: "notion-templates",
        Slug: "student-planner-notion",
        Title: "Semester Planner For Notion",
        Tagline:
            "Courses, Assignments, Exams And Grade Tracking In One Aesthetic Dashboard.",
        Price: 900,
        Quality: 0.83,
        Popularity: 0.6,
        Tags: ["notion", "student", "planner", "study", "productivity"],
        Features: [
            "Assignment Tracker With Due-Date Views",
            "Grade Calculator",
            "Exam Revision Planner",
        ],
        Audience: "University And High-School Students.",
        Description:
            "Keep Every Course, Deadline And Grade In One Place.\n\n### What’s Included\n- Notion Template Link\n- Setup Guide",
    },
    {
        Seller: "seed_seller_paperpixel",
        Category: "ebooks",
        Slug: "design-systems-handbook",
        Title: "The Practical Design Systems Handbook",
        Tagline:
            "How Small Teams Build, Document And Govern A Design System That Gets Used.",
        Price: 3400,
        Quality: 0.88,
        Popularity: 0.45,
        Tags: ["ebook", "design system", "figma", "documentation", "pdf"],
        Features: [
            "180 Pages, PDF And EPUB",
            "Governance And Contribution Templates",
            "Token Naming Cheat Sheet",
        ],
        Audience:
            "Designers And Front-End Engineers Starting Or Rescuing A Design System.",
        Description:
            "A Practical Guide To Design Systems For Teams Of 2 To 20.\n\n### What’s Included\n- PDF And EPUB\n- Notion Templates For RFCs And Changelogs",
    },
    {
        Seller: "seed_seller_grainfield",
        Category: "presets",
        Slug: "kodak-portra-lightroom-presets",
        Title: "Portra Film - Lightroom Presets",
        Tagline: "24 Presets Modelled On Portra 160, 400 And 800 Film Stocks.",
        Price: 2900,
        Quality: 0.9,
        Popularity: 0.7,
        Tags: [
            "lightroom",
            "presets",
            "film",
            "photography",
            "portrait",
            "luts",
        ],
        Features: [
            "24 Lightroom Presets (Desktop + Mobile)",
            "Matching .cube LUTs For Video",
            "Grain And Halation Variants",
        ],
        Audience: "Portrait And Wedding Photographers Chasing A Film Look.",
        Description:
            "Calibrated Against Scanned Rolls Of Portra 160, 400 And 800.\n\n### What’s Included\n- XMP And DNG Presets\n- 12 .cube LUTs\n- Install Guide",
    },
    {
        Seller: "seed_seller_grainfield",
        Category: "presets",
        Slug: "nordic-moody-presets",
        Title: "Nordic Moody Presets",
        Tagline:
            "Muted Greens And Deep Shadows For Landscape And Travel Photography.",
        Price: 1900,
        Discount: 40,
        Quality: 0.8,
        Popularity: 0.5,
        Tags: ["lightroom", "presets", "moody", "landscape", "travel"],
        Features: ["16 Presets", "Mobile And Desktop Versions"],
        Audience: "Landscape And Travel Photographers.",
        Description:
            "Presets Built On A Winter In Northern Norway.\n\n### What’s Included\n- XMP And DNG Presets",
    },
    {
        Seller: "seed_seller_grainfield",
        Category: "audio",
        Slug: "tactile-ui-sounds",
        Title: "Tactile - UI Sound Pack",
        Tagline:
            "180 Interface Sounds Recorded From Real Switches, Paper And Glass.",
        Price: 2500,
        Quality: 0.89,
        Popularity: 0.55,
        Tags: ["audio", "ui sounds", "sfx", "wav", "app", "game"],
        Features: [
            "180 Sounds In WAV And OGG",
            "Taps, Toggles, Notifications And Errors",
            "Royalty-Free For Apps And Games",
        ],
        Audience: "App, Game And Motion Designers Adding Sound To Interfaces.",
        Description:
            "Interface Sounds Recorded From Physical Objects, Then Trimmed For UI.\n\n### What’s Included\n- 180 WAV (48kHz/24-bit) And OGG Files\n- Royalty-Free Licence",
    },
    {
        Seller: "seed_seller_grainfield",
        Category: "audio",
        Slug: "lofi-loops-vol-1",
        Title: "Lo-Fi Loops Vol. 1",
        Tagline:
            "60 Royalty-Free Lo-Fi Loops And Stems For Videos And Streams. Free.",
        Price: 0,
        Quality: 0.78,
        Popularity: 0.75,
        Tags: ["audio", "music", "lofi", "loops", "free", "royalty free"],
        Features: [
            "60 Loops With Stems",
            "Tempo And Key Labelled",
            "Royalty-Free",
        ],
        Audience: "Video Creators And Streamers.",
        Description:
            "Warm, Dusty Loops For Background Music.\n\n### What’s Included\n- 60 Loops (WAV) With Stems",
    },
    {
        Seller: "seed_seller_grainfield",
        Category: "presets",
        Slug: "cinematic-luts-pack",
        Title: "Cinematic LUTs - Teal & Amber",
        Tagline:
            "30 LUTs For Premiere, Resolve And Final Cut With Log And Rec.709 Versions.",
        Price: 3900,
        Quality: 0.84,
        Popularity: 0.4,
        Tags: [
            "luts",
            "video",
            "color grading",
            "premiere",
            "davinci resolve",
            "cinematic",
        ],
        Features: [
            "30 LUTs In .cube Format",
            "S-Log3, V-Log And Rec.709 Versions",
            "Works In All Major Editors",
        ],
        Audience: "Video Editors And Filmmakers.",
        Description:
            "A Grading Pack Built Around Complementary Teal And Amber Palettes.\n\n### What’s Included\n- 30 .cube LUTs\n- 3 Input Profiles\n- Install Guide",
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
    "Mana Sato",
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
            "Not Just Pretty - It Holds Up In A Real Project. Support Replied Within A Day.",
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
