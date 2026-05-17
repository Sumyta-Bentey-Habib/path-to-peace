import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { 
    getSavedItems, 
    addSavedItem, 
    deleteSavedItemById, 
    deleteSavedItemByItem 
} from "../controllers/saved-items.controller.js";

const router = Router();

router.get("/saved-items", authMiddleware, getSavedItems);
router.post("/saved-items", authMiddleware, addSavedItem);
router.delete("/saved-items/:id", authMiddleware, deleteSavedItemById);
router.delete("/saved-items/:type/:itemId", authMiddleware, deleteSavedItemByItem);

export default router;
