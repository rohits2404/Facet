import express, { Router } from "express";
import { config } from "../config/index.js";
import { fulfillCheckoutSession, stripe } from "../services/stripe.js";

const router = Router();

router.post(
    "/",
    express.raw({ type: "application/json" }),
    async (req, res) => {
        if (!stripe || !config.stripe.webhookSecret)
            return res.status(404).end();

        let event;
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                req.get("stripe-signature"),
                config.stripe.webhookSecret,
            );
        } catch (err) {
            console.warn("Rejected Stripe Webhook:", err.message);
            return res
                .status(400)
                .send(`Webhook Signature Verification Failed: ${err.message}`);
        }

        if (
            event.type === "checkout.session.completed" ||
            event.type === "checkout.session.async_payment_succeeded"
        ) {
            const result = await fulfillCheckoutSession(event.data.object.id);
            if (!result.ok)
                console.warn(
                    `Stripe Session ${event.data.object.id} Not Fulfilled: ${result.reason}`,
                );
        }
        res.json({ received: true });
    },
);

export default router;
