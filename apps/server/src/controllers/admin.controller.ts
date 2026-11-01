import { Request, Response } from "express";
import { prisma } from "../db/prisma.js";

/**
 * Fetch all users in the system.
 */
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" }
        });
        const mappedUsers = users.map((u) => ({
            ...u,
            _id: u.id
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

    const { role, name, email, banned, banReason, banExpires } = req.body;

    try {
        const existing = await prisma.user.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ message: "User not found" });
        }

        await prisma.user.update({
            where: { id },
            data: {
                ...(role !== undefined && { role }),
                ...(name !== undefined && { name }),
                ...(email !== undefined && { email }),
                ...(banned !== undefined && { banned }),
                ...(banReason !== undefined && { banReason }),
                ...(banExpires !== undefined && { banExpires: banExpires ? new Date(banExpires) : null }),
            }
        });
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
        const existing = await prisma.user.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ message: "User not found" });
        }

        // Prisma schema handles cascading deletes to accounts, sessions, enrollments, saved_items
        await prisma.user.delete({
            where: { id }
        });

        res.json({
            message: "User and all associated data deleted successfully",
            details: { userDeleted: 1 }
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
        const courses = await prisma.course.findMany({
            orderBy: { createdAt: "desc" }
        });
        const mappedCourses = courses.map((c) => ({
            ...c,
            _id: c.id
        }));
        res.json(mappedCourses);
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
        const { title, description, duration, instructor, status, amount } = req.body;
        if (!title || typeof title !== "string" || title.trim() === "") {
            return res.status(400).json({ message: "Course title is required and must be a non-empty string" });
        }

        const parsedAmount = Number(amount);
        if (isNaN(parsedAmount) || parsedAmount < 0) {
            return res.status(400).json({ message: "Course amount is required and must be a valid non-negative number" });
        }

        const created = await prisma.course.create({
            data: {
                title: title.trim(),
                description: description ?? null,
                duration: duration ?? null,
                instructor: instructor ?? null,
                status: status ?? "active",
                amount: parsedAmount
            }
        });

        res.status(201).json({ message: "Course created successfully", id: created.id, _id: created.id });
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

    const { title, description, duration, instructor, status, amount } = req.body;

    let parsedAmount: number | undefined;
    if (amount !== undefined) {
        parsedAmount = Number(amount);
        if (isNaN(parsedAmount) || parsedAmount < 0) {
            return res.status(400).json({ message: "Course amount must be a valid non-negative number" });
        }
    }

    try {
        const existing = await prisma.course.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ message: "Course not found" });
        }

        await prisma.course.update({
            where: { id },
            data: {
                ...(title !== undefined && { title: String(title).trim() }),
                ...(description !== undefined && { description }),
                ...(duration !== undefined && { duration }),
                ...(instructor !== undefined && { instructor }),
                ...(status !== undefined && { status }),
                ...(parsedAmount !== undefined && { amount: parsedAmount })
            }
        });
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
        const existing = await prisma.course.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ message: "Course not found" });
        }

        await prisma.course.delete({ where: { id } });
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
        const duas = await prisma.dua.findMany({
            orderBy: { createdAt: "asc" }
        });
        const mappedDuas = duas.map((d) => ({
            ...d,
            _id: d.id
        }));
        res.json(mappedDuas);
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
        const { title, category, description, arabic, transliteration, meaning, reference } = req.body;
        if (!title || typeof title !== "string" || title.trim() === "") {
            return res.status(400).json({ message: "Dua title is required and must be a non-empty string" });
        }

        const created = await prisma.dua.create({
            data: {
                title: title.trim(),
                category: category ?? "Daily Life",
                description: description ?? null,
                arabic: arabic ?? null,
                transliteration: transliteration ?? null,
                meaning: meaning ?? null,
                reference: reference ?? null
            }
        });

        res.status(201).json({ message: "Dua created successfully", id: created.id, _id: created.id });
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

    const { title, category, description, arabic, transliteration, meaning, reference } = req.body;

    try {
        const existing = await prisma.dua.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ message: "Dua not found" });
        }

        await prisma.dua.update({
            where: { id },
            data: {
                ...(title !== undefined && { title: String(title).trim() }),
                ...(category !== undefined && { category }),
                ...(description !== undefined && { description }),
                ...(arabic !== undefined && { arabic }),
                ...(transliteration !== undefined && { transliteration }),
                ...(meaning !== undefined && { meaning }),
                ...(reference !== undefined && { reference }),
            }
        });
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
        const existing = await prisma.dua.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ message: "Dua not found" });
        }

        await prisma.dua.delete({ where: { id } });
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
        const feelings = await prisma.feeling.findMany({
            orderBy: { createdAt: "asc" }
        });
        const mappedFeelings = feelings.map((f) => ({
            ...f,
            _id: f.id
        }));
        res.json(mappedFeelings);
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

        const created = await prisma.feeling.create({
            data: {
                label: label.trim(),
                icon: icon.trim()
            }
        });

        res.status(201).json({ message: "Feeling created successfully", id: created.id, _id: created.id });
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

    const { label, icon } = req.body;

    try {
        const existing = await prisma.feeling.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ message: "Feeling not found" });
        }

        await prisma.feeling.update({
            where: { id },
            data: {
                ...(label !== undefined && { label: String(label).trim() }),
                ...(icon !== undefined && { icon: String(icon).trim() }),
            }
        });
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
        const existing = await prisma.feeling.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ message: "Feeling not found" });
        }

        await prisma.feeling.delete({ where: { id } });
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
        const [usersCount, coursesCount, duasCount, feelingsCount] = await Promise.all([
            prisma.user.count(),
            prisma.course.count(),
            prisma.dua.count(),
            prisma.feeling.count(),
        ]);
        res.json({
            users: usersCount,
            courses: coursesCount,
            duas: duasCount,
            feelings: feelingsCount
        });
    } catch (error) {
        console.error("Failed to fetch stats:", error);
        res.status(500).json({ message: "Failed to fetch stats" });
    }
};
