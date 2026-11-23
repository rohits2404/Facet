import express from "express";
import cors from "cors";
import multer from "multer";
import { ZodError } from "zod";
import { config } from "./config/index.js";

import { ensureBucket } from "./services/storage.js";
import { stripeEnabled, stripeTestMode } from "./services/stripe.js";

import accountRoutes from "./routes/account.js";
import catalogRoutes from "./routes/catalog.js";
import sellerRoutes from "./routes/seller.js";
import stripeWebhooks from "./routes/stripe-webhook.js";
import orderRoutes from "./routes/orders.js";

const app = express();

app.use(cors({ origin: config.clientOrigin, credentials: true }));
app.use("/api/webhooks/stripe", stripeWebhooks);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api", accountRoutes);
app.use("/api", catalogRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api", orderRoutes);

app.use("/api", (_req, res) => res.status(404).json({ error: "Not Found." }));

app.use((err, _req, res, _next) => {
    if (err instanceof ZodError) {
        const issue = err.issues[0];
        return res.status(400).json({
            error: `${issue.path.join(".") || "input"}: ${issue.message}`,
            issues: err.issues,
        });
    }
    if (err instanceof multer.MulterError) {
        const status = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;
        return res.status(status).json({
            error:
                err.code === "LIMIT_FILE_SIZE"
                    ? "Files Must Be 150 MB Or Smaller."
                    : err.message,
        });
    }
    if (err?.code === "22P02")
        return res.status(404).json({ error: "Not Found." });
    if (err?.type?.startsWith("Stripe")) {
        console.error("Stripe Error:", err.message);
        return res.status(502).json({ error: `Stripe: ${err.message}` });
    }
    if (err?.status && err.status < 500)
        return res.status(err.status).json({ error: err.message });

    console.error(err);
    res.status(500).json({
        error: "Something Went Wrong On Our Side. Try Again In a Moment.",
    });
});

try {
    await ensureBucket();
} catch (err) {
    console.warn(
        `⚠ Could Not Verify Storage Bucket "${config.s3.bucket}": ${err.message}`,
    );
}

console.log(
    `Payments: ${stripeEnabled() ? `Stripe${stripeTestMode() ? " (test mode)" : ""}${config.stripe.webhookSecret ? " + webhook" : ""}` : "demo provider"}`,
);

app.listen(config.port, () =>
    console.log(`Facet API → http://localhost:${config.port}`),
);
