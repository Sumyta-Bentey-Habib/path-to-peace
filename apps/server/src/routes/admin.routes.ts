import { Router } from "express";
import { adminMiddleware } from "../middleware/auth.middleware.js";
import { 
    getUsers, updateUser, deleteUser,
    getCourses, createCourse, updateCourse, deleteCourse,
    getDuas, createDua, updateDua, deleteDua,
    getFeelings, createFeeling, updateFeeling, deleteFeeling,
    getStats
} from "../controllers/admin.controller.js";

const router = Router();

// Secure all sub-routes with administrative authorization middleware
router.use(adminMiddleware);

// --- Administrative Dashboard Stats ---
router.get("/stats", getStats);

// --- User Management ---
router.get("/users", getUsers);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// --- Course Management ---
router.get("/courses", getCourses);
router.post("/courses", createCourse);
router.patch("/courses/:id", updateCourse);
router.delete("/courses/:id", deleteCourse);

// --- Dua Management ---
router.get("/duas", getDuas);
router.post("/duas", createDua);
router.patch("/duas/:id", updateDua);
router.delete("/duas/:id", deleteDua);

// --- Feeling Tools Management ---
router.get("/feelings", getFeelings);
router.post("/feelings", createFeeling);
router.patch("/feelings/:id", updateFeeling);
router.delete("/feelings/:id", deleteFeeling);

export default router;
