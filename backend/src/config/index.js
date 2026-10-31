import "dotenv/config";

const required = (name) => {
    const value = process.env[name];
    if (!value)
        throw new Error(`Missing Required Environment Variable ${name}`);
    return value;
};

export const config = {
    port: Number(process.env.PORT ?? 4000),
    clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
    databaseUrl: required("DATABASE_URL"),
    neonAuthUrl: required("NEON_AUTH_URL").replace(/\/$/, ""),
    s3: {
        endpoint: required("AWS_ENDPOINT_URL_S3"),
        region: process.env.AWS_REGION ?? "ap-southeast-1",
        accessKeyId: required("AWS_ACCESS_KEY_ID"),
        secretAccessKey: required("AWS_SECRET_ACCESS_KEY"),
        bucket: process.env.S3_BUCKET ?? "uploads",
    },
    stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY || null,
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || null,
    },
    groq: {
        apiKey: process.env.GROQ_API_KEY || null,
        model: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
        fallbackModel: process.env.GROQ_FALLBACK_MODEL || "openai/gpt-oss-120b",
    },
};
