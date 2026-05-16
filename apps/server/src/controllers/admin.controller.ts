import { Request, Response } from "express";
import { db } from "../db/mongo.js";
import { ObjectId } from "mongodb";

// --- Users ---
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await db.collection("users").find({}).toArray();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        delete updateData._id; // Ensure we don't try to update the ID
        const result = await db.collection("users").updateOne(
            { id: id }, // Better auth uses 'id' string usually, but check if it's _id
            { $set: updateData }
        );
        res.json({ message: "User updated successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to update user", error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await db.collection("users").deleteOne({ id: id });
        res.json({ message: "User deleted successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user", error });
    }
};

// --- Courses ---
export const getCourses = async (req: Request, res: Response) => {
    try {
        const courses = await db.collection("courses").find({}).toArray();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch courses", error });
    }
};

export const createCourse = async (req: Request, res: Response) => {
    try {
        const result = await db.collection("courses").insertOne(req.body);
        res.json({ message: "Course created successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to create course", error });
    }
};

export const updateCourse = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await db.collection("courses").updateOne(
            { _id: new ObjectId(id as string) },
            { $set: req.body }
        );
        res.json({ message: "Course updated successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to update course", error });
    }
};

export const deleteCourse = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await db.collection("courses").deleteOne({ _id: new ObjectId(id as string) });
        res.json({ message: "Course deleted successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete course", error });
    }
};

// --- Duas ---
export const getDuas = async (req: Request, res: Response) => {
    try {
        const duas = await db.collection("duas").find({}).toArray();
        res.json(duas);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch duas", error });
    }
};

export const createDua = async (req: Request, res: Response) => {
    try {
        const result = await db.collection("duas").insertOne(req.body);
        res.json({ message: "Dua created successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to create dua", error });
    }
};

export const updateDua = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await db.collection("duas").updateOne(
            { _id: new ObjectId(id as string) },
            { $set: req.body }
        );
        res.json({ message: "Dua updated successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to update dua", error });
    }
};

export const deleteDua = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await db.collection("duas").deleteOne({ _id: new ObjectId(id as string) });
        res.json({ message: "Dua deleted successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete dua", error });
    }
};

// --- Feelings ---
export const getFeelings = async (req: Request, res: Response) => {
    try {
        const feelings = await db.collection("feelings").find({}).toArray();
        res.json(feelings);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch feelings", error });
    }
};

export const createFeeling = async (req: Request, res: Response) => {
    try {
        const result = await db.collection("feelings").insertOne(req.body);
        res.json({ message: "Feeling created successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to create feeling", error });
    }
};

export const updateFeeling = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await db.collection("feelings").updateOne(
            { _id: new ObjectId(id as string) },
            { $set: req.body }
        );
        res.json({ message: "Feeling updated successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to update feeling", error });
    }
};

export const deleteFeeling = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await db.collection("feelings").deleteOne({ _id: new ObjectId(id as string) });
        res.json({ message: "Feeling deleted successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete feeling", error });
    }
};
// --- Stats ---
export const getStats = async (req: Request, res: Response) => {
    try {
        const [users, courses, duas, feelings] = await Promise.all([
            db.collection("users").countDocuments(),
            db.collection("courses").countDocuments(),
            db.collection("duas").countDocuments(),
            db.collection("feelings").countDocuments(),
        ]);
        res.json({
            users,
            courses,
            duas,
            feelings
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch stats", error });
    }
};
