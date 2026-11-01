import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";
import { prisma } from "../db/prisma.js";

export const getSavedItems = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { type } = req.query;
        const items = await prisma.savedItem.findMany({
            where: {
                userId,
                ...(type ? { type: String(type) } : {})
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch saved items", error });
    }
};

export const addSavedItem = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { type, itemId, data } = req.body;
        if (!type || itemId === undefined || itemId === null) {
            return res.status(400).json({ message: "Missing required fields: type, itemId" });
        }

        const parsedItemId = String(itemId);

        // Check if item already exists
        const existing = await prisma.savedItem.findFirst({
            where: {
                userId,
                type: String(type),
                itemId: parsedItemId
            }
        });

        if (existing) {
            return res.status(200).json(existing);
        }

        const newItem = await prisma.savedItem.create({
            data: {
                userId,
                type: String(type),
                itemId: parsedItemId,
                data: data ?? {}
            }
        });

        res.status(201).json({
            message: "Item saved successfully",
            ...newItem
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to save item", error });
    }
};

export const deleteSavedItemById = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Missing item ID" });
        }

        const item = await prisma.savedItem.findUnique({
            where: { id: String(id) }
        });

        if (!item) {
            return res.status(404).json({ message: "Item not found or unauthorized to delete" });
        }

        if (item.userId !== userId) {
            return res.status(403).json({ message: "Unauthorized to delete this item" });
        }

        await prisma.savedItem.delete({
            where: { id: String(id) }
        });

        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete item", error });
    }
};

export const deleteSavedItemByItem = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { type, itemId } = req.params;
        if (!type || itemId === undefined || itemId === null) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const parsedItemId = String(itemId);

        const deleteResult = await prisma.savedItem.deleteMany({
            where: {
                userId,
                type: String(type),
                itemId: parsedItemId
            }
        });

        if (deleteResult.count === 0) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete item", error });
    }
};
