import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import morgan from "morgan";
import { auth } from "./auth.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import { getProfile } from "./controllers/user.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Path to Peace API" });
});

// Mount Better Auth handler
app.use("/api/auth", toNodeHandler(auth));

// Protected Routes
app.get("/api/me", authMiddleware, getProfile);

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
    try {
        const { client } = await import("./db/mongo.js");
        await client.db("admin").command({ ping: 1 });
        console.log("MongoDB connection: SUCCESSFUL (Pinged)");
    } catch (error) {
        console.error("MongoDB connection: FAILED", error);
    }
});
