// src/db/firestore.ts
import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();
if (admin.apps.length === 0) {
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT;
  const projectId = process.env.FIREBASE_PROJECT_ID || "path-to-peace-4cacd";
  if (serviceAccountPath && fs.existsSync(serviceAccountPath)) {
    console.log(`[Firebase] Initializing with service account from: ${serviceAccountPath}`);
    const serviceAccount = JSON.parse(fs.readFileSync(path.resolve(serviceAccountPath), "utf8"));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId
    });
  } else {
    console.log(`[Firebase] Initializing default application (Emulator or Default Credentials) for project: ${projectId}`);
    admin.initializeApp({
      projectId
    });
  }
}
var db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

export {
  db
};
