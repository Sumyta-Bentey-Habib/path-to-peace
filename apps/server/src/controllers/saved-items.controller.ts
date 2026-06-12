import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";
import { db } from "../db/firestore.js";

export const getSavedItems = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        let queryRef: any = db.collection("saved_items").where("userId", "==", userId);
        const { type } = req.query;
        if (type) {
            queryRef = queryRef.where("type", "==", type);
        }

        const snapshot = await queryRef.get();
        const items = snapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data()
        }));
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
        const existingSnapshot = await db.collection("saved_items")
            .where("userId", "==", userId)
            .where("type", "==", type)
            .where("itemId", "==", parsedItemId)
            .limit(1)
            .get();

        if (!existingSnapshot.empty) {
            const doc = existingSnapshot.docs[0];
            return res.status(200).json({
                id: doc.id,
                ...doc.data()
            });
        }

        const newItem = {
            userId,
            type,
            itemId: parsedItemId,
            data: data || {},
            createdAt: new Date()
        };

        const docRef = await db.collection("saved_items").add(newItem);
        res.status(201).json({
            message: "Item saved successfully",
            id: docRef.id,
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

        const docRef = db.collection("saved_items").doc(id as string);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: "Item not found or unauthorized to delete" });
        }

        if (doc.data()?.userId !== userId) {
            return res.status(403).json({ message: "Unauthorized to delete this item" });
        }

        await docRef.delete();
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

        const itemIdStr = itemId as string;

        // Clean itemId to match string or number
        let parsedItemId: string | number = itemIdStr;
        if (!isNaN(Number(itemIdStr))) {
            parsedItemId = Number(itemIdStr);
        }

        const snapshot = await db.collection("saved_items")
            .where("userId", "==", userId)
            .where("type", "==", type)
            .where("itemId", "==", parsedItemId)
            .get();

        if (snapshot.empty) {
            return res.status(404).json({ message: "Item not found" });
        }

        const batch = db.batch();
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();

        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete item", error });
    }
};
