import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getProfile, setMeAsAdmin } from "../controllers/user.controller.js";

const router = Router();

router.get("/me", authMiddleware, getProfile);
router.get("/admin/set-me-as-admin", authMiddleware, setMeAsAdmin);

export default router;
