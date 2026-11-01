import { Router } from "express";
import { prisma } from "../db/prisma.js";

const router = Router();

router.get("/duas", async (req, res) => {
    try {
        const duas = await prisma.dua.findMany();
        const mappedDuas = duas.map((d) => ({
            ...d,
            _id: d.id
        }));
        res.json(mappedDuas);
    } catch (error) {
        console.error("Failed to fetch public duas:", error);
        res.status(500).json({ message: "Failed to fetch duas" });
    }
});

export default router;
