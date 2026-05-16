import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "./db/mongo.js";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
    database: mongodbAdapter(db),
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
        admin()
    ],
    emailAndPassword: {
        enabled: true
    },
    trustedOrigins: ["http://localhost:3000"]
});
