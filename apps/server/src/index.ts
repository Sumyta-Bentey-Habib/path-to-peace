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

const allowedOrigins = [
    "http://localhost:3000",
    ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL, process.env.FRONTEND_URL.replace(/\/$/, "")] : []),
    ...(process.env.NEXT_PUBLIC_WEB_URL ? [process.env.NEXT_PUBLIC_WEB_URL, process.env.NEXT_PUBLIC_WEB_URL.replace(/\/$/, "")] : [])
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Origin not allowed by CORS: ${origin}`));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Public Base Routes ---
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Path to Peace API" });
});

// --- Health Check Endpoint (Probes DB, Uptime & System Status) ---
app.get(["/health", "/api/health"], async (req, res) => {
    try {
        const { prisma } = await import("./db/prisma.js");
        await prisma.$queryRaw`SELECT 1`;
        res.status(200).json({
            status: "ok",
            timestamp: new Date().toISOString(),
            uptime: Math.floor(process.uptime()),
            database: "connected"
        });
    } catch (error) {
        res.status(503).json({
            status: "error",
            timestamp: new Date().toISOString(),
            uptime: Math.floor(process.uptime()),
            database: "disconnected",
            message: error instanceof Error ? error.message : "Database connection failed"
        });
    }
});

// --- API Router Mounting ---
app.use("/api", apiRoutes);

// --- Server & Database Connection ---
if (!process.env.VERCEL) {
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
}

export default app;
