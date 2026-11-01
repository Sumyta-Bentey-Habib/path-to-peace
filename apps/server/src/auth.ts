import dotenv from "dotenv";

dotenv.config();

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db/prisma.js";
import { admin, bearer } from "better-auth/plugins";

if (!process.env.BETTER_AUTH_SECRET) {
    throw new Error("BETTER_AUTH_SECRET is not defined in .env file");
}

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    advanced: {
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true,
        },
    },
    plugins: [
        admin(),
        bearer()
    ],
    emailAndPassword: {
        enabled: true
    },
    trustedOrigins: [
        process.env.FRONTEND_URL || "https://path-to-peace.vercel.app",
        "https://path-to-peace.vercel.app",
        "http://localhost:3000"
    ],
});
