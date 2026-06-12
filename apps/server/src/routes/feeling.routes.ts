import { Router } from "express";
import { db } from "../db/firestore.js";

const router = Router();

router.get("/duas", async (req, res) => {
    try {
        const snapshot = await db.collection("duas").get();
        const mappedDuas = snapshot.docs.map((doc: any) => {
            const d = doc.data();
            return {
                ...d,
                id: doc.id
            };
        });
        res.json(mappedDuas);
    } catch (error) {
        console.error("Failed to fetch public duas:", error);
        res.status(500).json({ message: "Failed to fetch duas" });
    }
});

export default router;
