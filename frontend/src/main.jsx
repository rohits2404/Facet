import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./lib/toast.jsx";
import { CartProvider } from "./lib/cart.jsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
            retry: (count, err) =>
                err?.status && err.status < 500 ? false : count < 1,
        },
    },
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ToastProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </ToastProvider>
        </QueryClientProvider>
    </StrictMode>,
);
