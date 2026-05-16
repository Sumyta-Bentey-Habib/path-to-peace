import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";
import { db } from "../db/mongo.js";
import { ObjectId } from "mongodb";

export const getSavedItems = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const query: any = { userId };
        const { type } = req.query;
        if (type) {
            query.type = type;
        }

        const items = await db.collection("saved_items").find(query).toArray();
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

        // Clean itemId to match string or number
        let parsedItemId: string | number = itemId;
        if (typeof itemId === "string" && !isNaN(Number(itemId))) {
            parsedItemId = Number(itemId);
        }

        // Check if item already exists
        const existing = await db.collection("saved_items").findOne({
            userId,
            type,
            itemId: parsedItemId
        });

        if (existing) {
            return res.status(200).json(existing);
        }

        const newItem = {
            userId,
            type,
            itemId: parsedItemId,
            data: data || {},
            createdAt: new Date()
        };

        const result = await db.collection("saved_items").insertOne(newItem);
        res.status(201).json({
            message: "Item saved successfully",
            _id: result.insertedId,
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

        const result = await db.collection("saved_items").deleteOne({
            _id: new ObjectId(id as string),
            userId
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Item not found or unauthorized to delete" });
        }

        res.json({ message: "Item deleted successfully", result });
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

        const itemIdStr = itemId as string;

        // Clean itemId to match string or number
        let parsedItemId: string | number = itemIdStr;
        if (!isNaN(Number(itemIdStr))) {
            parsedItemId = Number(itemIdStr);
        }

        const result = await db.collection("saved_items").deleteOne({
            userId,
            type,
            itemId: parsedItemId
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json({ message: "Item deleted successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete item", error });
    }
};
