import dotenv from "dotenv";

dotenv.config();

import { betterAuth } from "better-auth";
import { firestoreAdapter } from "better-auth-firestore";
import { db } from "./db/firestore.js";
import { admin, bearer } from "better-auth/plugins";

if (!process.env.BETTER_AUTH_SECRET) {
    throw new Error("BETTER_AUTH_SECRET is not defined in .env file");
}

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    database: firestoreAdapter({
        firestore: db
    }),
    user: {
        modelName: "users"
    },
    session: {
        modelName: "sessions"
    },
    account: {
        modelName: "accounts"
    },
    verification: {
        modelName: "verifications"
    },
    plugins: [
        admin(),
        bearer()
    ],
    emailAndPassword: {
        enabled: true
    },
    trustedOrigins: ["http://localhost:3000"]
});
