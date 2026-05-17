import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import apiRoutes from "./routes/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// --- Global Middleware ---
app.use(morgan("dev"));
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Public Base Routes ---
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Path to Peace API" });
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

// --- API Router Mounting ---
app.use("/api", apiRoutes);

// --- Server & Database Connection ---
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
