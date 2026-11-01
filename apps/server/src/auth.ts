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
    plugins: [
        admin(),
        bearer()
    ],
    emailAndPassword: {
        enabled: true
    },
    trustedOrigins: [
        process.env.FRONTEND_URL!,
    ],
});
