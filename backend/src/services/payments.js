import { randomUUID } from "node:crypto";

export async function charge({ amountCents, card }) {
    const number = String(card?.number ?? "").replace(/\D/g, "");

    if (amountCents === 0)
        return {
            status: "succeeded",
            reference: `free_${randomUUID()}`,
            last4: null,
        };
    if (number.length < 12)
        return { status: "failed", reason: "Enter a Full Card Number." };
    if (number === "4000000000000002")
        return {
            status: "failed",
            reason: "The Card Was Declined. Try Another Card.",
        };

    await new Promise((r) => setTimeout(r, 600));
    return {
        status: "succeeded",
        reference: `demo_${randomUUID()}`,
        last4: number.slice(-4),
    };
}
