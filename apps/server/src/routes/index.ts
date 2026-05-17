import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../auth.js";
import userRoutes from "./user.routes.js";
import courseRoutes from "./course.routes.js";
import paymentRoutes from "./payment.routes.js";
import savedItemsRoutes from "./saved-items.routes.js";
import adminRoutes from "./admin.routes.js";

const router = Router();

// Better Auth integration (Mounted under /api/auth)
router.use("/auth", toNodeHandler(auth));

// Mount specialized sub-routers
router.use("/", userRoutes);
router.use("/", courseRoutes);
router.use("/", paymentRoutes);
router.use("/", savedItemsRoutes);
router.use("/admin", adminRoutes);

export default router;
