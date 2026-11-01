import { Request, Response } from "express";
import { prisma } from "../db/prisma.js";

/**
 * Fetch all active courses for public display.
 */
export const getPublicCourses = async (req: Request, res: Response) => {
    try {
        const courses = await prisma.course.findMany({
            where: { status: "active" }
        });
        const mapped = courses.map((course) => ({
            ...course,
            _id: course.id
        }));
        res.json(mapped);
    } catch (error) {
        console.error("Failed to fetch public courses:", error);
        res.status(500).json({ message: "Failed to fetch courses" });
    }
};
