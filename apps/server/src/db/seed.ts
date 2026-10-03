import { db } from "./firestore.js";
import fs from "fs";
import path from "path";
import process from "node:process";
import { fileURLToPath } from "url";

export const seedDatabase = async () => {
    try {
        console.log("[Seeder] Starting database seeding...");
        
        // Use import.meta.url to construct an absolute path independent of process.cwd()
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const webLibPath = path.resolve(__dirname, "../../../web/lib/data");
        const duasPath = path.join(webLibPath, "duas.json");

        // Helper to chunk arrays for Firestore batches (max 500 ops per batch)
        const chunkArray = <T>(array: T[], size: number): T[][] => {
            const chunked: T[][] = [];
            for (let i = 0; i < array.length; i += size) {
                chunked.push(array.slice(i, i + size));
            }
            return chunked;
        };

        // 1. Seed Duas
        const duasSnapshot = await db.collection("duas").limit(1).get();
        if (duasSnapshot.empty && fs.existsSync(duasPath)) {
            console.log("[Seeder] Seeding Duas...");
            const duasData = JSON.parse(fs.readFileSync(duasPath, "utf-8"));
            if (duasData.duas && duasData.duas.length > 0) {
                const chunks = chunkArray(duasData.duas, 400);
                for (const chunk of chunks) {
                    const batch = db.batch();
                    chunk.forEach((dua: any) => {
                        const docRef = db.collection("duas").doc();
                        batch.set(docRef, {
                            ...dua,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        });
                    });
                    await batch.commit();
                }
                console.log("[Seeder] Seeded Duas successfully");
            }
        } else {
            console.log("[Seeder] Duas collection is not empty or JSON file missing, skipping.");
        }

        // 2. Seed Feelings
        const feelingsSnapshot = await db.collection("feelings").limit(1).get();
        if (feelingsSnapshot.empty) {
            console.log("[Seeder] Seeding default feelings...");
            const defaultFeelings = [
                { label: "Sad", icon: "Frown", createdAt: new Date(), updatedAt: new Date() },
                { label: "Anxious", icon: "AlertCircle", createdAt: new Date(), updatedAt: new Date() },
                { label: "Stressed", icon: "Zap", createdAt: new Date(), updatedAt: new Date() },
                { label: "Grateful", icon: "Heart", createdAt: new Date(), updatedAt: new Date() },
                { label: "Angry", icon: "Flame", createdAt: new Date(), updatedAt: new Date() },
                { label: "Weak", icon: "Activity", createdAt: new Date(), updatedAt: new Date() }
            ];
            const batch = db.batch();
            defaultFeelings.forEach((feeling) => {
                const docRef = db.collection("feelings").doc();
                batch.set(docRef, feeling);
            });
            await batch.commit();
            console.log("[Seeder] Seeded default feelings successfully");
        } else {
            console.log("[Seeder] Feelings collection is not empty, skipping feelings seeding.");
        }

        // 3. Seed Courses
        const coursesSnapshot = await db.collection("courses").limit(1).get();
        if (coursesSnapshot.empty) {
            console.log("[Seeder] Seeding default courses...");
            const defaultCourses = [
                {
                    title: "Introduction to Peace",
                    description: "Learn the basics of inner peace and mindfulness.",
                    duration: "4 weeks",
                    instructor: "Admin",
                    status: "active",
                    amount: 1200,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ];
            const batch = db.batch();
            defaultCourses.forEach((course) => {
                const docRef = db.collection("courses").doc();
                batch.set(docRef, course);
            });
            await batch.commit();
            console.log("[Seeder] Seeded default courses successfully");
        } else {
            console.log("[Seeder] Courses collection is not empty, skipping.");
        }

        // 4. Seed Default Users (Admin & Regular User)
        const usersSnapshot = await db.collection("users").limit(1).get();
        if (usersSnapshot.empty) {
            console.log("[Seeder] Seeding default users...");
            const { auth } = await import("../auth.js");

            // Seed Admin User
            try {
                const adminUser = await auth.api.signUpEmail({
                    body: {
                        name: "Admin Sanctuary",
                        email: "admin@pathtopeace.com",
                        password: "AdminPassword123",
                    }
                });

                if (adminUser) {
                    await db.collection("users").doc(adminUser.user.id).update({
                        role: "admin"
                    });
                    console.log("[Seeder] Seeded admin user (admin@pathtopeace.com) successfully");
                }
            } catch (authError) {
                console.error("[Seeder] Failed to seed admin user:", authError);
            }

            // Seed Regular User
            try {
                await auth.api.signUpEmail({
                    body: {
                        name: "John Seeker",
                        email: "user@pathtopeace.com",
                        password: "UserPassword123",
                    }
                });
                console.log("[Seeder] Seeded regular user (user@pathtopeace.com) successfully");
            } catch (authError) {
                console.error("[Seeder] Failed to seed regular user:", authError);
            }
        } else {
            console.log("[Seeder] Users collection is not empty, skipping user seeding.");
        }
    } catch (error) {
        console.error("[Seeder] Error seeding database:", error);
    }
};

// Allow direct execution via CLI (e.g. tsx src/db/seed.ts)
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
    seedDatabase().then(() => {
        console.log("[Seeder] Seeding process complete.");
        process.exit(0);
    }).catch((err) => {
        console.error("[Seeder] Fatal error:", err);
        process.exit(1);
    });
}
