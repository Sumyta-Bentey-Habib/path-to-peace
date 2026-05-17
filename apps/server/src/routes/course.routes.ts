import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getPublicCourses } from "../controllers/course.controller.js";
import { enrollFreeCourse, getEnrolledCourses } from "../controllers/payment.controller.js";

const router = Router();

router.get("/courses", getPublicCourses);
router.post("/courses/enroll-free", authMiddleware, enrollFreeCourse);
router.get("/courses/enrolled", authMiddleware, getEnrolledCourses);

export default router;
