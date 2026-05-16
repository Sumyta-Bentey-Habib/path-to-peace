import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import morgan from "morgan";
import { auth } from "./auth.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import { getProfile } from "./controllers/user.controller.js";

import { adminMiddleware } from "./middleware/auth.middleware.js";
import { 
    getUsers, updateUser, deleteUser,
    getCourses, createCourse, updateCourse, deleteCourse,
    getDuas, createDua, updateDua, deleteDua,
    getFeelings, createFeeling, updateFeeling, deleteFeeling,
    getStats
} from "./controllers/admin.controller.js";

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

// Admin Routes
app.get("/api/admin/stats", adminMiddleware, getStats);
app.get("/api/admin/users", adminMiddleware, getUsers);
app.patch("/api/admin/users/:id", adminMiddleware, updateUser);
app.delete("/api/admin/users/:id", adminMiddleware, deleteUser);

app.get("/api/admin/courses", adminMiddleware, getCourses);
app.post("/api/admin/courses", adminMiddleware, createCourse);
app.patch("/api/admin/courses/:id", adminMiddleware, updateCourse);
app.delete("/api/admin/courses/:id", adminMiddleware, deleteCourse);

app.get("/api/admin/duas", adminMiddleware, getDuas);
app.post("/api/admin/duas", adminMiddleware, createDua);
app.patch("/api/admin/duas/:id", adminMiddleware, updateDua);
app.delete("/api/admin/duas/:id", adminMiddleware, deleteDua);

app.get("/api/admin/feelings", adminMiddleware, getFeelings);
app.post("/api/admin/feelings", adminMiddleware, createFeeling);
app.patch("/api/admin/feelings/:id", adminMiddleware, updateFeeling);
app.delete("/api/admin/feelings/:id", adminMiddleware, deleteFeeling);

// Public Routes (Visible to all users)
app.get("/api/courses", async (req, res) => {
    try {
        const { db } = await import("./db/mongo.js");
        const courses = await db.collection("courses").find({ status: "active" }).toArray();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch courses" });
    }
});

app.get("/api/admin/set-me-as-admin", authMiddleware, async (req, res) => {
    const user = (req as any).user;
    try {
        const { db } = await import("./db/mongo.js");
        await db.collection("users").updateOne(
            { id: user.id },
            { $set: { role: "admin" } }
        );
        res.json({ message: "You are now an admin. Please refresh the page." });
    } catch (error) {
        res.status(500).json({ message: "Failed to set admin role" });
    }
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
    try {
        const { client } = await import("./db/mongo.js");
        await client.db("admin").command({ ping: 1 });
        console.log("MongoDB connection: SUCCESSFUL (Pinged)");
        
        const { seedDatabase } = await import("./db/seed.js");
        await seedDatabase();
    } catch (error) {
        console.error("MongoDB connection: FAILED", error);
    }
});

