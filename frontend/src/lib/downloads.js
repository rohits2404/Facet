import { useMutation } from "@tanstack/react-query";
import { api } from "./api.js";
import { useToast } from "./toast.jsx";

export function useDownload() {
    const toast = useToast();
    return useMutation({
        mutationFn: (productId) => api.post(`/downloads/${productId}`),
        onSuccess: ({ url }) => {
            window.location.href = url;
        },
        onError: (err) => toast(err.message, { tone: "error" }),
    });
}
