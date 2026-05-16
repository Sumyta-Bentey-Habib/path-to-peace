import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
    plugins: [
        adminClient()
    ]
});

export const getAuthHeaders = async (includeJson = false) => {
    try {
        const sessionInfo = await authClient.getSession();
        const token = sessionInfo?.data?.session?.token || sessionInfo?.data?.session?.id;
        const headers: Record<string, string> = {};
        if (includeJson) {
            headers["Content-Type"] = "application/json";
        }
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        return headers;
    } catch (error) {
        console.error("Failed to construct auth headers:", error);
        return includeJson ? { "Content-Type": "application/json" } : {};
    }
};
