import dotenv from "dotenv";
dotenv.config();

import admin from "firebase-admin";
import fs from "fs";
import path from "path";

const serviceAccountPath = "./service-account.json";
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id || process.env.FIREBASE_PROJECT_ID || "path-to-peace-b21d5"
});

const db = admin.firestore();

async function run() {
    try {
        console.log("Checking Firestore collections...");
        const collections = await db.listCollections();
        console.log(`Found ${collections.length} collections:`, collections.map(c => c.id));

        for (const col of collections) {
            const snap = await col.limit(5).get();
            console.log(`- Collection "${col.id}": ${snap.size} documents (sample IDs: ${snap.docs.map(d => d.id).join(", ")})`);
        }
    } catch (err) {
        console.error("Error checking Firestore:", err);
    }
}

run();
