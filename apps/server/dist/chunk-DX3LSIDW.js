import {
  db
} from "./chunk-T2572XFA.js";

// src/auth.ts
import dotenv from "dotenv";
import { betterAuth } from "better-auth";
import { firestoreAdapter } from "better-auth-firestore";
import { admin, bearer } from "better-auth/plugins";
dotenv.config();
if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET is not defined in .env file");
}
var auth = betterAuth({
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

export {
  auth
};
