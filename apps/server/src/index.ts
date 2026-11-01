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
        const { prisma } = await import("./db/prisma.js");
        // Perform a simple query to verify database connection
        await prisma.$queryRaw`SELECT 1`;
        console.log("Database connection: SUCCESSFUL (Pinged)");

        // Run database seeder
        const { seedDatabase } = await import("./db/seed.js");
        await seedDatabase();
    } catch (error) {
        console.error("Database connection: FAILED", error);
    }
});
