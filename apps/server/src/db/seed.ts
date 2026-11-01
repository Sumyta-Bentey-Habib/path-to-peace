import { prisma } from "./prisma.js";
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

        // 1. Seed Duas
        const duasCount = await prisma.dua.count();
        if (duasCount === 0 && fs.existsSync(duasPath)) {
            console.log("[Seeder] Seeding Duas...");
            const duasData = JSON.parse(fs.readFileSync(duasPath, "utf-8"));
            if (duasData.duas && duasData.duas.length > 0) {
                const formattedDuas = duasData.duas.map((dua: any) => ({
                    category: dua.category || "Daily Life",
                    title: dua.title,
                    description: dua.description || null,
                    arabic: dua.arabic || null,
                    transliteration: dua.transliteration || null,
                    meaning: dua.meaning || null,
                    reference: dua.reference || null,
                }));
                await prisma.dua.createMany({
                    data: formattedDuas
                });
                console.log(`[Seeder] Seeded ${formattedDuas.length} Duas successfully`);
            }
        } else {
            console.log("[Seeder] Duas table is not empty or JSON file missing, skipping.");
        }

        // 2. Seed Feelings
        const feelingsCount = await prisma.feeling.count();
        if (feelingsCount === 0) {
            console.log("[Seeder] Seeding default feelings...");
            const defaultFeelings = [
                { label: "Sad", icon: "Frown" },
                { label: "Anxious", icon: "AlertCircle" },
                { label: "Stressed", icon: "Zap" },
                { label: "Grateful", icon: "Heart" },
                { label: "Angry", icon: "Flame" },
                { label: "Weak", icon: "Activity" }
            ];
            await prisma.feeling.createMany({
                data: defaultFeelings
            });
            console.log("[Seeder] Seeded default feelings successfully");
        } else {
            console.log("[Seeder] Feelings table is not empty, skipping feelings seeding.");
        }

        // 3. Seed Courses
        const coursesCount = await prisma.course.count();
        if (coursesCount === 0) {
            console.log("[Seeder] Seeding default courses...");
            const defaultCourses = [
                {
                    title: "Introduction to Peace",
                    description: "Learn the basics of inner peace and mindfulness.",
                    duration: "4 weeks",
                    instructor: "Admin",
                    status: "active",
                    amount: 1200
                }
            ];
            await prisma.course.createMany({
                data: defaultCourses
            });
            console.log("[Seeder] Seeded default courses successfully");
        } else {
            console.log("[Seeder] Courses table is not empty, skipping.");
        }

        // 4. Seed Default Users (Admin & Regular User)
        const usersCount = await prisma.user.count();
        if (usersCount === 0) {
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

                if (adminUser?.user?.id) {
                    await prisma.user.update({
                        where: { id: adminUser.user.id },
                        data: { role: "admin" }
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
            console.log("[Seeder] Users table is not empty, skipping user seeding.");
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
