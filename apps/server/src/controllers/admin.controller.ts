import { Request, Response } from "express";
import { db } from "../db/firestore.js";

/**
 * Fetch all users in the system.
 */
export const getUsers = async (req: Request, res: Response) => {
    try {
        const snapshot = await db.collection("users").get();
        const mappedUsers = snapshot.docs.map((doc: any) => ({
            ...doc.data() as any,
            id: doc.id,
            _id: doc.id
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
    if (typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    const updateData = { ...req.body };
    delete updateData._id; // Ensure we don't try to update immutable fields
    delete updateData.id;

    try {
        const docRef = db.collection("users").doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: "User not found" });
        }

        await docRef.update(updateData);
        res.json({ message: "User updated successfully" });
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
    if (typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const userDocRef = db.collection("users").doc(id);
        const userDoc = await userDocRef.get();
        if (!userDoc.exists) {
            return res.status(404).json({ message: "User not found" });
        }

        // Cascade delete all user-related data in a batch
        const batch = db.batch();
        batch.delete(userDocRef);

        const collections = ["accounts", "sessions", "enrollments", "saved_items"];
        const deletedCounts = {
            userDeleted: 1,
            accountsDeleted: 0,
            sessionsDeleted: 0,
            enrollmentsDeleted: 0,
            savedItemsDeleted: 0
        };

        for (const col of collections) {
            const snap = await db.collection(col).where("userId", "==", id).get();
            snap.docs.forEach((doc: any) => {
                batch.delete(doc.ref);
            });
            if (col === "accounts") deletedCounts.accountsDeleted = snap.size;
            if (col === "sessions") deletedCounts.sessionsDeleted = snap.size;
            if (col === "enrollments") deletedCounts.enrollmentsDeleted = snap.size;
            if (col === "saved_items") deletedCounts.savedItemsDeleted = snap.size;
        }

        await batch.commit();

        res.json({
            message: "User and all associated data deleted successfully",
            details: deletedCounts
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
        const snapshot = await db.collection("courses").get();
        const courses = snapshot.docs.map((doc: any) => ({
            ...doc.data() as any,
            id: doc.id,
            _id: doc.id
        }));
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
        delete courseData.id;

        const docRef = await db.collection("courses").add(courseData);
        res.status(201).json({ message: "Course created successfully", id: docRef.id, _id: docRef.id });
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
    if (typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.id;

    if (updateData.amount !== undefined) {
        const parsedAmount = Number(updateData.amount);
        if (isNaN(parsedAmount) || parsedAmount < 0) {
            return res.status(400).json({ message: "Course amount must be a valid non-negative number" });
        }
        updateData.amount = parsedAmount;
    }

    try {
        const docRef = db.collection("courses").doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: "Course not found" });
        }

        await docRef.update(updateData);
        res.json({ message: "Course updated successfully" });
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
    if (typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const docRef = db.collection("courses").doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: "Course not found" });
        }

        await docRef.delete();
        res.json({ message: "Course deleted successfully" });
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
        const snapshot = await db.collection("duas").get();
        const duas = snapshot.docs.map((doc: any) => ({
            ...doc.data() as any,
            id: doc.id,
            _id: doc.id
        }));
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
        delete duaData.id;

        const docRef = await db.collection("duas").add(duaData);
        res.status(201).json({ message: "Dua created successfully", id: docRef.id, _id: docRef.id });
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
    if (typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.id;

    try {
        const docRef = db.collection("duas").doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: "Dua not found" });
        }

        await docRef.update(updateData);
        res.json({ message: "Dua updated successfully" });
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
    if (typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const docRef = db.collection("duas").doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: "Dua not found" });
        }

        await docRef.delete();
        res.json({ message: "Dua deleted successfully" });
    } catch (error) {
        console.error("Failed to delete dua:", error);
        res.status(500).json({ message: "Failed to delete dua" });
    }
};

// --- Feelings ---

/**
 * Fetch all feelings.
 */
export const getFeelings = async (req: Request, res: Response) => {
    try {
        const snapshot = await db.collection("feelings").get();
        const feelings = snapshot.docs.map((doc: any) => ({
            ...doc.data() as any,
            id: doc.id,
            _id: doc.id
        }));
        res.json(feelings);
    } catch (error) {
        console.error("Failed to fetch feelings:", error);
        res.status(500).json({ message: "Failed to fetch feelings" });
    }
};

/**
 * Creates a new feeling with input validation.
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
        delete feelingData.id;

        const docRef = await db.collection("feelings").add(feelingData);
        res.status(201).json({ message: "Feeling created successfully", id: docRef.id, _id: docRef.id });
    } catch (error) {
        console.error("Failed to create feeling:", error);
        res.status(500).json({ message: "Failed to create feeling" });
    }
};

/**
 * Updates a feeling by ID.
 */
export const updateFeeling = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.id;

    try {
        const docRef = db.collection("feelings").doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: "Feeling not found" });
        }

        await docRef.update(updateData);
        res.json({ message: "Feeling updated successfully" });
    } catch (error) {
        console.error("Failed to update feeling:", error);
        res.status(500).json({ message: "Failed to update feeling" });
    }
};

/**
 * Deletes a feeling by ID.
 */
export const deleteFeeling = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const docRef = db.collection("feelings").doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: "Feeling not found" });
        }

        await docRef.delete();
        res.json({ message: "Feeling deleted successfully" });
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
        const [usersSnap, coursesSnap, duasSnap, feelingsSnap] = await Promise.all([
            db.collection("users").count().get(),
            db.collection("courses").count().get(),
            db.collection("duas").count().get(),
            db.collection("feelings").count().get(),
        ]);
        res.json({
            users: usersSnap.data().count,
            courses: coursesSnap.data().count,
            duas: duasSnap.data().count,
            feelings: feelingsSnap.data().count
        });
    } catch (error) {
        console.error("Failed to fetch stats:", error);
        res.status(500).json({ message: "Failed to fetch stats" });
    }
};
