"use client";

import { useEffect, useState, useCallback } from "react";
import { authClient, getAuthHeaders } from "@/lib/auth-client";

export interface SavedItem {
    _id: string;
    type: "dua" | "quran" | "feeling" | string;
    itemId: string;
    data: any;
    userId: string;
    createdAt: string;
}

export function useSavedItems(type?: "dua" | "quran" | "feeling") {
    const { data: session } = authClient.useSession();
    const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSavedItems = useCallback(async () => {
        if (!session) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const urlTypeParam = type ? `?type=${type}` : "";
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/saved-items${urlTypeParam}`,
                {
                    credentials: "include",
                    headers: await getAuthHeaders()
                }
            );
            if (response.ok) {
                const data = await response.json();
                setSavedItems(data);
                setError(null);
            } else {
                setError("Failed to fetch saved sanctuary items");
            }
        } catch (err: any) {
            console.error("Failed to fetch saved sanctuary items:", err);
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }, [session, type]);

    useEffect(() => {
        if (session) {
            fetchSavedItems();
        } else {
            setSavedItems([]);
            setLoading(false);
        }
    }, [session, fetchSavedItems]);

    const isItemSaved = useCallback((itemType: string, itemId: string | number) => {
        return savedItems.some(
            item => item.type === itemType && String(item.itemId) === String(itemId)
        );
    }, [savedItems]);

    const saveItem = async (itemType: string, itemId: string | number, data: any) => {
        if (!session) return false;
        
        // Optimistic UI update
        const tempId = `temp-${Date.now()}`;
        const newItem: SavedItem = {
            _id: tempId,
            type: itemType,
            itemId: String(itemId),
            data,
            userId: session.user.id || "",
            createdAt: new Date().toISOString()
        };
        
        setSavedItems(prev => [...prev, newItem]);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/saved-items`,
                {
                    method: "POST",
                    headers: await getAuthHeaders(true),
                    credentials: "include",
                    body: JSON.stringify({
                        type: itemType,
                        itemId: String(itemId),
                        data
                    })
                }
            );
            if (response.ok) {
                const savedItem = await response.json();
                // Replace temp item with real saved item
                setSavedItems(prev => prev.map(item => item._id === tempId ? savedItem : item));
                return true;
            } else {
                // Revert optimistic update
                setSavedItems(prev => prev.filter(item => item._id !== tempId));
                return false;
            }
        } catch (err) {
            console.error("Failed to save item:", err);
            // Revert optimistic update
            setSavedItems(prev => prev.filter(item => item._id !== tempId));
            return false;
        }
    };

    const deleteItemById = async (id: string) => {
        if (!session) return false;

        // Optimistic UI update
        const itemToDelete = savedItems.find(item => item._id === id);
        setSavedItems(prev => prev.filter(item => item._id !== id));

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/saved-items/${id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                    headers: await getAuthHeaders()
                }
            );
            if (response.ok) {
                return true;
            } else {
                // Revert optimistic update if failed
                if (itemToDelete) {
                    setSavedItems(prev => [...prev, itemToDelete]);
                }
                return false;
            }
        } catch (err) {
            console.error("Failed to delete item:", err);
            if (itemToDelete) {
                setSavedItems(prev => [...prev, itemToDelete]);
            }
            return false;
        }
    };

    const deleteItemByTypeAndId = async (itemType: string, itemId: string | number) => {
        if (!session) return false;

        const stringId = String(itemId);
        // Find matching item for optimistic revert
        const itemToDelete = savedItems.find(
            item => item.type === itemType && String(item.itemId) === stringId
        );
        setSavedItems(prev => prev.filter(
            item => !(item.type === itemType && String(item.itemId) === stringId)
        ));

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/saved-items/${itemType}/${itemId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                    headers: await getAuthHeaders()
                }
            );
            if (response.ok) {
                return true;
            } else {
                if (itemToDelete) {
                    setSavedItems(prev => [...prev, itemToDelete]);
                }
                return false;
            }
        } catch (err) {
            console.error("Failed to delete item by type and id:", err);
            if (itemToDelete) {
                setSavedItems(prev => [...prev, itemToDelete]);
            }
            return false;
        }
    };

    const toggleSaveItem = async (itemType: string, itemId: string | number, data: any) => {
        const isSaved = isItemSaved(itemType, itemId);
        if (isSaved) {
            return await deleteItemByTypeAndId(itemType, itemId);
        } else {
            return await saveItem(itemType, itemId, data);
        }
    };

    return {
        savedItems,
        loading,
        error,
        isItemSaved,
        saveItem,
        deleteItemById,
        deleteItemByTypeAndId,
        toggleSaveItem,
        refetch: fetchSavedItems
    };
}
