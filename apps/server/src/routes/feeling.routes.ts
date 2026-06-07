import { Router } from "express";
import { db } from "../db/mongo.js";

const router = Router();

router.get("/duas", async (req, res) => {
    try {
        const duas = await db.collection("duas").find({}).toArray();
        const mappedDuas = duas.map(d => ({
            ...d,
            id: d.id || d._id.toString()
        }));
        res.json(mappedDuas);
    } catch (error) {
        console.error("Failed to fetch public duas:", error);
        res.status(500).json({ message: "Failed to fetch duas" });
    }
});

export default router;
