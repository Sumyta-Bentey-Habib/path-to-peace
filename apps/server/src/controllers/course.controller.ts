import { Request, Response } from "express";
import { db } from "../db/firestore.js";

/**
 * Fetch all active courses for public display.
 */
export const getPublicCourses = async (req: Request, res: Response) => {
    try {
        const snapshot = await db.collection("courses").where("status", "==", "active").get();
        const courses = snapshot.docs.map((doc: any) => ({
            id: doc.id,
            _id: doc.id,
            ...doc.data()
        }));
        res.json(courses);
    } catch (error) {
        console.error("Failed to fetch public courses:", error);
        res.status(500).json({ message: "Failed to fetch courses" });
    }
};
