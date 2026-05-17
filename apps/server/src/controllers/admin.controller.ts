import { Request, Response } from "express";
import { db } from "../db/mongo.js";
import { ObjectId } from "mongodb";

// --- Users ---

/**
 * Fetch all users in the system.
 */
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await db.collection("users").find({}).toArray();
        const mappedUsers = users.map(user => ({
            ...user,
            id: user._id.toString()
        }));
        res.json(mappedUsers);
    } catch (error) {
        console.error("Failed to fetch users:", error);
        res.status(500).json({ message: "Failed to fetch users" });
    }
};

/**
 * Update a user's details.
 */
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string" || !ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    const updateData = { ...req.body };
    delete updateData._id; // Ensure we don't try to update the immutable ID field

    try {
        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User updated successfully", result });
    } catch (error) {
        console.error("Failed to update user:", error);
        res.status(500).json({ message: "Failed to update user" });
    }
};

/**
 * Securely deletes a user and cascades deletion to all user-associated data.
 */
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string" || !ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const userObjectId = new ObjectId(id);

        // Pre-check if user exists
        const user = await db.collection("users").findOne({ _id: userObjectId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Cascade delete all user-related data to ensure DB integrity
        const [userResult, accountsResult, sessionsResult, enrollmentsResult, savedItemsResult] = await Promise.all([
            db.collection("users").deleteOne({ _id: userObjectId }),
            db.collection("accounts").deleteMany({ userId: userObjectId }),
            db.collection("sessions").deleteMany({ userId: userObjectId }),
            db.collection("enrollments").deleteMany({ userId: id }),
            db.collection("saved_items").deleteMany({ userId: id })
        ]);
        
        res.json({ 
            message: "User and all associated data deleted successfully", 
            result: userResult,
            details: {
                userDeleted: userResult.deletedCount,
                accountsDeleted: accountsResult.deletedCount,
                sessionsDeleted: sessionsResult.deletedCount,
                enrollmentsDeleted: enrollmentsResult.deletedCount,
                savedItemsDeleted: savedItemsResult.deletedCount
            }
        });
    } catch (error) {
        console.error("Failed to delete user:", error);
        res.status(500).json({ message: "Failed to delete user" });
    }
};


// --- Courses ---

/**
 * Fetch all courses.
 */
export const getCourses = async (req: Request, res: Response) => {
    try {
        const courses = await db.collection("courses").find({}).toArray();
        res.json(courses);
    } catch (error) {
        console.error("Failed to fetch courses:", error);
        res.status(500).json({ message: "Failed to fetch courses" });
    }
};

/**
 * Creates a new course with input validation.
 */
export const createCourse = async (req: Request, res: Response) => {
    try {
        const { title, amount } = req.body;
        if (!title || typeof title !== "string" || title.trim() === "") {
            return res.status(400).json({ message: "Course title is required and must be a non-empty string" });
        }
        
        const parsedAmount = Number(amount);
        if (isNaN(parsedAmount) || parsedAmount < 0) {
            return res.status(400).json({ message: "Course amount is required and must be a valid non-negative number" });
        }

        const courseData = {
            ...req.body,
            amount: parsedAmount,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        delete courseData._id;

        const result = await db.collection("courses").insertOne(courseData);
        res.status(201).json({ message: "Course created successfully", result });
    } catch (error) {
        console.error("Failed to create course:", error);
        res.status(500).json({ message: "Failed to create course" });
    }
};

/**
 * Updates course details by ID.
 */
export const updateCourse = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string" || !ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    const updateData = { ...req.body };
    delete updateData._id; // Prevent updating immutable MongoDB ID

    if (updateData.amount !== undefined) {
        const parsedAmount = Number(updateData.amount);
        if (isNaN(parsedAmount) || parsedAmount < 0) {
            return res.status(400).json({ message: "Course amount must be a valid non-negative number" });
        }
        updateData.amount = parsedAmount;
    }

    try {
        const result = await db.collection("courses").updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.json({ message: "Course updated successfully", result });
    } catch (error) {
        console.error("Failed to update course:", error);
        res.status(500).json({ message: "Failed to update course" });
    }
};

/**
 * Deletes a course by ID.
 */
export const deleteCourse = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string" || !ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const result = await db.collection("courses").deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json({ message: "Course deleted successfully", result });
    } catch (error) {
        console.error("Failed to delete course:", error);
        res.status(500).json({ message: "Failed to delete course" });
    }
};

// --- Duas ---

/**
 * Fetch all Duas.
 */
export const getDuas = async (req: Request, res: Response) => {
    try {
        const duas = await db.collection("duas").find({}).toArray();
        res.json(duas);
    } catch (error) {
        console.error("Failed to fetch duas:", error);
        res.status(500).json({ message: "Failed to fetch duas" });
    }
};

/**
 * Creates a new Dua with input validation.
 */
export const createDua = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;
        if (!title || typeof title !== "string" || title.trim() === "") {
            return res.status(400).json({ message: "Dua title is required and must be a non-empty string" });
        }

        const duaData = {
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        delete duaData._id;

        const result = await db.collection("duas").insertOne(duaData);
        res.status(201).json({ message: "Dua created successfully", result });
    } catch (error) {
        console.error("Failed to create dua:", error);
        res.status(500).json({ message: "Failed to create dua" });
    }
};

/**
 * Updates a Dua by ID.
 */
export const updateDua = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string" || !ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    const updateData = { ...req.body };
    delete updateData._id; // Prevent updating immutable MongoDB ID

    try {
        const result = await db.collection("duas").updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Dua not found" });
        }

        res.json({ message: "Dua updated successfully", result });
    } catch (error) {
        console.error("Failed to update dua:", error);
        res.status(500).json({ message: "Failed to update dua" });
    }
};

/**
 * Deletes a Dua by ID.
 */
export const deleteDua = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string" || !ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const result = await db.collection("duas").deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Dua not found" });
        }
        res.json({ message: "Dua deleted successfully", result });
    } catch (error) {
        console.error("Failed to delete dua:", error);
        res.status(500).json({ message: "Failed to delete dua" });
    }
};

// --- Feelings ---

/**
 * Fetch all feelings/emotions tools.
 */
export const getFeelings = async (req: Request, res: Response) => {
    try {
        const feelings = await db.collection("feelings").find({}).toArray();
        res.json(feelings);
    } catch (error) {
        console.error("Failed to fetch feelings:", error);
        res.status(500).json({ message: "Failed to fetch feelings" });
    }
};

/**
 * Creates a new Feeling Tool with input validation.
 */
export const createFeeling = async (req: Request, res: Response) => {
    try {
        const { label, icon } = req.body;
        if (!label || typeof label !== "string" || label.trim() === "") {
            return res.status(400).json({ message: "Feeling label is required and must be a non-empty string" });
        }
        if (!icon || typeof icon !== "string" || icon.trim() === "") {
            return res.status(400).json({ message: "Feeling icon is required and must be a non-empty string" });
        }

        const feelingData = {
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        delete feelingData._id;

        const result = await db.collection("feelings").insertOne(feelingData);
        res.status(201).json({ message: "Feeling created successfully", result });
    } catch (error) {
        console.error("Failed to create feeling:", error);
        res.status(500).json({ message: "Failed to create feeling" });
    }
};

/**
 * Updates a Feeling Tool by ID.
 */
export const updateFeeling = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string" || !ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    const updateData = { ...req.body };
    delete updateData._id; // Prevent updating immutable MongoDB ID

    try {
        const result = await db.collection("feelings").updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Feeling not found" });
        }

        res.json({ message: "Feeling updated successfully", result });
    } catch (error) {
        console.error("Failed to update feeling:", error);
        res.status(500).json({ message: "Failed to update feeling" });
    }
};

/**
 * Deletes a Feeling Tool by ID.
 */
export const deleteFeeling = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string" || !ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const result = await db.collection("feelings").deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Feeling not found" });
        }
        res.json({ message: "Feeling deleted successfully", result });
    } catch (error) {
        console.error("Failed to delete feeling:", error);
        res.status(500).json({ message: "Failed to delete feeling" });
    }
};

// --- Stats ---

/**
 * Fetch total stats count.
 */
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
        console.error("Failed to fetch stats:", error);
        res.status(500).json({ message: "Failed to fetch stats" });
    }
};
