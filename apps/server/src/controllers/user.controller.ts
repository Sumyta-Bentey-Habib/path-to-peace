import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { db } from "../db/mongo.js";

/**
 * Fetch the current user profile.
 */
export const getProfile = async (req: Request, res: Response) => {
    const user = (req as any).user;
    res.json({
        message: "User profile fetched successfully",
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            emailVerified: user.emailVerified,
            image: user.image
        }
    });
};

/**
 * Set the current user's role to 'admin' (helper endpoint).
 */
export const setMeAsAdmin = async (req: Request, res: Response) => {
    const user = (req as any).user;
    try {
        await db.collection("users").updateOne(
            { _id: new ObjectId(user.id) },
            { $set: { role: "admin" } }
        );
        res.json({ message: "You are now an admin. Please refresh the page." });
    } catch (error) {
        console.error("Failed to set admin role:", error);
        res.status(500).json({ message: "Failed to set admin role" });
    }
};
