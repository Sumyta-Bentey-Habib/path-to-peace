import { Request, Response } from "express";
import { db } from "../db/mongo.js";

/**
 * Fetch all active courses for public display.
 */
export const getPublicCourses = async (req: Request, res: Response) => {
    try {
        const courses = await db.collection("courses").find({ status: "active" }).toArray();
        res.json(courses);
    } catch (error) {
        console.error("Failed to fetch public courses:", error);
        res.status(500).json({ message: "Failed to fetch courses" });
    }
};
