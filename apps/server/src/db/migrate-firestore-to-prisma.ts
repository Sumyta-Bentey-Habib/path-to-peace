import dotenv from "dotenv";
dotenv.config();

import { db } from "./firestore.js";
import { prisma } from "./prisma.js";

/**
 * Utility script to migrate all Firestore records into Prisma (PostgreSQL).
 * Run directly with: pnpm --filter server exec tsx src/db/migrate-firestore-to-prisma.ts
 */
export async function migrateFromFirestore() {
    console.log("[Migration] Starting migration from Firestore to Prisma...");

    try {
        // 1. Migrate Users
        console.log("[Migration] Fetching users from Firestore...");
        const usersSnap = await db.collection("users").get();
        for (const doc of usersSnap.docs) {
            const data = doc.data();
            await prisma.user.upsert({
                where: { id: doc.id },
                update: {
                    name: data.name || "Unknown",
                    email: data.email || `${doc.id}@migrated.local`,
                    emailVerified: data.emailVerified ?? false,
                    image: data.image || null,
                    role: data.role || "user",
                    banned: data.banned ?? false,
                    banReason: data.banReason || null,
                    banExpires: data.banExpires ? new Date(data.banExpires) : null,
                },
                create: {
                    id: doc.id,
                    name: data.name || "Unknown",
                    email: data.email || `${doc.id}@migrated.local`,
                    emailVerified: data.emailVerified ?? false,
                    image: data.image || null,
                    role: data.role || "user",
                    banned: data.banned ?? false,
                    banReason: data.banReason || null,
                    banExpires: data.banExpires ? new Date(data.banExpires) : null,
                    createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
                    updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
                }
            });
        }
        console.log(`[Migration] Migrated ${usersSnap.size} users.`);

        // 2. Migrate Courses
        console.log("[Migration] Fetching courses from Firestore...");
        const coursesSnap = await db.collection("courses").get();
        for (const doc of coursesSnap.docs) {
            const data = doc.data();
            await prisma.course.upsert({
                where: { id: doc.id },
                update: {
                    title: data.title || "Untitled",
                    description: data.description || null,
                    duration: data.duration || null,
                    instructor: data.instructor || null,
                    status: data.status || "active",
                    amount: Number(data.amount) || 0,
                },
                create: {
                    id: doc.id,
                    title: data.title || "Untitled",
                    description: data.description || null,
                    duration: data.duration || null,
                    instructor: data.instructor || null,
                    status: data.status || "active",
                    amount: Number(data.amount) || 0,
                    createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
                    updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
                }
            });
        }
        console.log(`[Migration] Migrated ${coursesSnap.size} courses.`);

        // 3. Migrate Feelings
        console.log("[Migration] Fetching feelings from Firestore...");
        const feelingsSnap = await db.collection("feelings").get();
        for (const doc of feelingsSnap.docs) {
            const data = doc.data();
            await prisma.feeling.upsert({
                where: { id: doc.id },
                update: {
                    label: data.label || "Feeling",
                    icon: data.icon || "Heart",
                },
                create: {
                    id: doc.id,
                    label: data.label || "Feeling",
                    icon: data.icon || "Heart",
                    createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
                    updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
                }
            });
        }
        console.log(`[Migration] Migrated ${feelingsSnap.size} feelings.`);

        // 4. Migrate Duas
        console.log("[Migration] Fetching duas from Firestore...");
        const duasSnap = await db.collection("duas").get();
        for (const doc of duasSnap.docs) {
            const data = doc.data();
            await prisma.dua.upsert({
                where: { id: doc.id },
                update: {
                    category: data.category || "Daily Life",
                    title: data.title || "Supplication",
                    description: data.description || null,
                    arabic: data.arabic || null,
                    transliteration: data.transliteration || null,
                    meaning: data.meaning || null,
                    reference: data.reference || null,
                },
                create: {
                    id: doc.id,
                    category: data.category || "Daily Life",
                    title: data.title || "Supplication",
                    description: data.description || null,
                    arabic: data.arabic || null,
                    transliteration: data.transliteration || null,
                    meaning: data.meaning || null,
                    reference: data.reference || null,
                    createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
                    updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
                }
            });
        }
        console.log(`[Migration] Migrated ${duasSnap.size} duas.`);

        // 5. Migrate Enrollments
        console.log("[Migration] Fetching enrollments from Firestore...");
        const enrollmentsSnap = await db.collection("enrollments").get();
        for (const doc of enrollmentsSnap.docs) {
            const data = doc.data();
            if (!data.userId || !data.courseId) continue;

            // Ensure course and user exist before linking
            const userExists = await prisma.user.findUnique({ where: { id: data.userId } });
            const courseExists = await prisma.course.findUnique({ where: { id: data.courseId } });
            if (!userExists || !courseExists) continue;

            const tranId = data.tranId || `TXN-${doc.id}`;
            await prisma.enrollment.upsert({
                where: { tranId },
                update: {
                    status: data.status || "pending",
                    paymentStatus: data.paymentStatus || "pending",
                    cardType: data.cardType || null,
                    bankTranId: data.bankTranId || null,
                    validationDetails: data.validationDetails || null,
                    failureReason: data.failureReason || null,
                },
                create: {
                    id: doc.id,
                    userId: data.userId,
                    courseId: data.courseId,
                    courseTitle: data.courseTitle || courseExists.title,
                    amount: Number(data.amount) || 0,
                    tranId,
                    status: data.status || "pending",
                    paymentStatus: data.paymentStatus || "pending",
                    cardType: data.cardType || null,
                    bankTranId: data.bankTranId || null,
                    validationDetails: data.validationDetails || null,
                    failureReason: data.failureReason || null,
                    createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
                    updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
                }
            });
        }
        console.log(`[Migration] Processed ${enrollmentsSnap.size} enrollments.`);

        // 6. Migrate Saved Items
        console.log("[Migration] Fetching saved items from Firestore...");
        const savedSnap = await db.collection("saved_items").get();
        for (const doc of savedSnap.docs) {
            const data = doc.data();
            if (!data.userId || !data.type || data.itemId === undefined) continue;

            const userExists = await prisma.user.findUnique({ where: { id: data.userId } });
            if (!userExists) continue;

            const itemIdStr = String(data.itemId);
            await prisma.savedItem.upsert({
                where: {
                    userId_type_itemId: {
                        userId: data.userId,
                        type: data.type,
                        itemId: itemIdStr
                    }
                },
                update: {
                    data: data.data || {}
                },
                create: {
                    id: doc.id,
                    userId: data.userId,
                    type: data.type,
                    itemId: itemIdStr,
                    data: data.data || {},
                    createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
                    updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
                }
            });
        }
        console.log(`[Migration] Processed ${savedSnap.size} saved items.`);

        console.log("[Migration] Firestore to Prisma migration completed successfully!");
    } catch (error) {
        console.error("[Migration] Error during migration:", error);
        throw error;
    }
}

if (process.argv[1] && process.argv[1].includes("migrate-firestore-to-prisma")) {
    migrateFromFirestore()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}

