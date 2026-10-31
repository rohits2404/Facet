import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowUp, ArrowUpRight, RotateCcw, Sparkles } from "lucide-react";
import { api } from "../lib/api.js";
import { cx } from "../lib/format.js";
import { ProductCard } from "../components/ProductCard.jsx";

const STARTERS = [
    "A React Admin Dashboard Template For A SaaS App",
    "Icons That Work For A Fintech Product, Under $30",
    "Something To Help Me Price My Startup",
    "Cinematic Color Grading For Travel Videos",
    "A Free Serif Font For Long-Form Reading",
    "Notion Templates For A Student",
];

function AssistantTurn({ turn, onFollowUp, last }) {
    return (
        <div className="animate-rise">
            <div className="flex gap-3">
                <span
                    className="grid size-10 shrink-0 place-items-center rounded-full text-white"
                    style={{ background: "var(--gradient-brand)" }}
                >
                    <Sparkles className="size-4.5" />
                </span>
                <div className="min-w-0 flex-1">
                    <p className="card inline-block max-w-2xl rounded-tl-lg px-5 py-3.5 text-[15px] leading-relaxed text-ink">
                        {turn.content}
                    </p>
                    {turn.recommendations?.length > 0 && (
                        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                            {turn.recommendations.map((r) => (
                                <ProductCard
                                    key={r.product.id}
                                    product={r.product}
                                    reason={r.reason}
                                />
                            ))}
                        </div>
                    )}
                    {last && turn.followUp && (
                        <button
                            onClick={() => onFollowUp(turn.followUp)}
                            className="chip mt-4 border-transparent bg-lilac text-iris hover:text-iris-deep"
                        >
                            <Sparkles className="size-3 text-iris" />{" "}
                            {turn.followUp}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Assistant() {
    const [params, setParams] = useSearchParams();
    const [turns, setTurns] = useState([]);
    const [input, setInput] = useState("");
    const endRef = useRef(null);
    const inputRef = useRef(null);
    const status = useQuery({
        queryKey: ["ai-status"],
        queryFn: () => api.get("/ai/status"),
        staleTime: Infinity,
    });

    const ask = useMutation({
        mutationFn: ({ message, history }) =>
            api.post("/ai/assistant", { message, history }),
        onSuccess: (data) =>
            setTurns((t) => [
                ...t,
                {
                    role: "assistant",
                    content: data.reply,
                    recommendations: data.recommendations,
                    followUp: data.followUp,
                },
            ]),
        onError: (err) =>
            setTurns((t) => [
                ...t,
                {
                    role: "assistant",
                    content: err.message,
                    recommendations: [],
                },
            ]),
    });

    const send = (text) => {
        const message = text.trim();
        if (!message || ask.isPending) return;
        const history = turns.map(({ role, content }) => ({ role, content }));
        setTurns((t) => [...t, { role: "user", content: message }]);
        setInput("");
        ask.mutate({ message, history });
    };

    // Arriving from the home page hero with ?q=… (ref guard: StrictMode mounts twice in dev)
    const initial = params.get("q");
    const sentInitial = useRef(false);
    useEffect(() => {
        if (initial && !sentInitial.current) {
            sentInitial.current = true;
            send(initial);
            setParams({}, { replace: true });
        }
        // Mount-only: runs once for the ?q= the page was opened with.
        // oxlint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [turns.length, ask.isPending]);

    const empty = turns.length === 0;

    return (
        <div className="container-page flex min-h-[calc(100dvh-5rem)] flex-col pt-6">
            <header
                className={cx(
                    "mx-auto w-full max-w-3xl text-center transition-all",
                    empty ? "mt-[6vh]" : "mt-0",
                )}
            >
                <p className="mx-auto mb-5 flex w-fit items-center justify-center gap-2 rounded-full bg-surface px-3.5 py-1.5 text-[13px] font-medium text-ink-soft shadow-(--shadow-pop)">
                    <Sparkles className="size-3.5 text-iris" />
                    {status.data?.enabled
                        ? `Marketplace Assistant · Groq`
                        : "Marketplace Assistant · Keyword Matching"}
                </p>
                {empty && (
                    <>
                        <h1 className="text-[44px] leading-[1.02] tracking-[-0.045em] sm:text-[68px]">
                            Tell Me What You’re{" "}
                            <span className="text-opal">Making</span>.
                        </h1>
                        <p className="mx-auto mt-4 max-w-lg text-ink-soft">
                            Describe The Project, Your Stack And Your Budget.
                            I’ll Pick The Products From The Catalog That
                            Actually Fit, And Say Why.
                        </p>
                    </>
                )}
            </header>

            <div
                className={cx(
                    "mx-auto w-full flex-1 space-y-8",
                    empty ? "max-w-3xl" : "max-w-6xl",
                )}
            >
                {empty ? (
                    <div className="mt-10 grid gap-3 sm:grid-cols-2">
                        {STARTERS.map((s) => (
                            <button
                                key={s}
                                onClick={() => send(s)}
                                className="card group flex items-center justify-between gap-3 p-5 text-left text-sm font-medium text-ink-soft transition hover:-translate-y-0.5 hover:shadow-(--shadow-lift) hover:text-ink"
                            >
                                {s}
                                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-wash text-ink-soft transition group-hover:bg-night group-hover:text-white">
                                    <ArrowUpRight className="size-4" />
                                </span>
                            </button>
                        ))}
                    </div>
                ) : (
                    turns.map((turn, i) =>
                        turn.role === "user" ? (
                            <div
                                key={i}
                                className="flex animate-rise justify-end"
                            >
                                <p className="max-w-xl rounded-3xl rounded-br-lg bg-night px-5 py-3.5 text-[15px] text-white">
                                    {turn.content}
                                </p>
                            </div>
                        ) : (
                            <AssistantTurn
                                key={i}
                                turn={turn}
                                last={i === turns.length - 1}
                                // The follow-up is a question for the buyer, so prefill the box instead of sending it.
                                onFollowUp={(q) => {
                                    setInput(`${q.replace(/\?$/, "")}: `);
                                    inputRef.current?.focus();
                                }}
                            />
                        ),
                    )
                )}
                {ask.isPending && (
                    <div className="flex items-center gap-3 text-sm text-muted">
                        <span
                            className="grid size-10 place-items-center rounded-full text-white"
                            style={{ background: "var(--gradient-brand)" }}
                        >
                            <Sparkles className="size-4.5 animate-pulse" />
                        </span>
                        Looking Through The Catalog…
                    </div>
                )}
                <div ref={endRef} />
            </div>

            <div className="sticky bottom-0 mx-auto mt-8 w-full max-w-3xl bg-linear-to-t from-paper via-paper to-transparent pb-6 pt-6">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        send(input);
                    }}
                    className="flex items-end gap-2 rounded-card bg-surface p-2 pl-5 shadow-(--shadow-lift) focus-within:ring-4 focus-within:ring-iris/10"
                >
                    <textarea
                        ref={inputRef}
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                send(input);
                            }
                        }}
                        placeholder={
                            empty
                                ? "E.g. A Next.js Starter With Stripe Billing, Under $150"
                                : "Refine — Add A Budget, A Stack, A Style…"
                        }
                        aria-label="Message The Assistant"
                        className="max-h-40 min-h-10 flex-1 resize-none bg-transparent py-2 text-[15px] outline-none placeholder:text-muted"
                    />
                    {!empty && (
                        <button
                            type="button"
                            onClick={() => setTurns([])}
                            className="btn-quiet size-10 rounded-full p-0"
                            aria-label="Start over"
                        >
                            <RotateCcw className="size-4" />
                        </button>
                    )}
                    <button
                        className="grid size-11 shrink-0 place-items-center rounded-full bg-night text-white transition hover:bg-iris disabled:opacity-35"
                        disabled={!input.trim() || ask.isPending}
                        aria-label="Send"
                    >
                        <ArrowUp className="size-4.5" />
                    </button>
                </form>
                <p className="mt-2 text-center text-[11px] text-muted">
                    Recommendations Come Only From Products Listed On Facet.
                </p>
            </div>
        </div>
    );
}
