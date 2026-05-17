import { db } from "./mongo.js";
import fs from "fs";
import path from "path";
export const seedDatabase = async () => {
    try {

        // Paths to dummy data in apps/web (relative to apps/server)
        const webLibPath = path.join(process.cwd(), "../web/lib/data");

        const duasPath = path.join(webLibPath, "duas.json");
        const feelingsPath = path.join(webLibPath, "feelings.json");

        // Seed Duas
        const duasCount = await db.collection("duas").countDocuments();
        if (duasCount === 0 && fs.existsSync(duasPath)) {
            const duasData = JSON.parse(fs.readFileSync(duasPath, "utf-8"));
            if (duasData.duas && duasData.duas.length > 0) {
                await db.collection("duas").insertMany(duasData.duas);
                console.log("Seeded Duas successfully");
            }
        }

        // Seed Feelings
        const feelingsCount = await db.collection("feelings").countDocuments();
        if (feelingsCount === 0 && fs.existsSync(feelingsPath)) {
            const feelingsData = JSON.parse(fs.readFileSync(feelingsPath, "utf-8"));
            if (feelingsData.feelings && feelingsData.feelings.length > 0) {
                await db.collection("feelings").insertMany(feelingsData.feelings);
                console.log("Seeded Feelings successfully");
            }
        }
        
        // Seed default courses if empty
        const coursesCount = await db.collection("courses").countDocuments();
        if (coursesCount === 0) {
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
            await db.collection("courses").insertMany(defaultCourses);
            console.log("Seeded default courses successfully");
        }

    } catch (error) {
        console.error("Error seeding database:", error);
    }
};
