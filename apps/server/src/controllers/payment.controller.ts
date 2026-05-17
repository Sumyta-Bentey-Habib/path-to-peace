import crypto from "crypto";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { db } from "../db/mongo.js";
import { AuthRequest } from "../middleware/auth.middleware.js";
import { initiateSSLSession, validateSSLTransaction } from "../utils/sslcommerz.js";

// Load environment variables immediately
dotenv.config();

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;

if (!WEB_URL) {
    throw new Error("Missing NEXT_PUBLIC_WEB_URL environment variable. Please check your backend environment configuration.");
}

/**
 * Initiates SSLCommerz payment session for a course.
 * Maps authenticated user details to payment registration.
 */
export const initiatePayment = async (req: AuthRequest, res: Response) => {
    try {
        const { courseId } = req.body;
        const userId = req.user?.id;

        if (!courseId || !userId) {
            return res.status(400).json({ message: "Course ID and authentication are required" });
        }

        // Fetch course details
        const course = await db.collection("courses").findOne({ _id: new ObjectId(courseId as string) });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Check if user is already enrolled
        const existingEnrollment = await db.collection("enrollments").findOne({
            userId,
            courseId,
            paymentStatus: "paid"
        });

        if (existingEnrollment) {
            return res.status(400).json({ message: "You are already enrolled in this course." });
        }

        const courseAmount = Number(course.amount) || 0;

        // If the course is free, advise user to use the free-enrollment route
        if (courseAmount <= 0) {
            return res.status(400).json({ message: "This course is free. Please use the free enrollment option." });
        }

        const amountInBDT = Math.round(courseAmount);
        const tranId = `TXN-${crypto.randomBytes(6).toString("hex").toUpperCase()}`;

        // Create a pending enrollment/transaction record in our database
        const pendingEnrollment = {
            userId,
            courseId,
            courseTitle: course.title,
            amount: courseAmount,
            tranId,
            status: "pending",
            paymentStatus: "pending",
            createdAt: new Date(),
            updatedAt: new Date()
        };
        await db.collection("enrollments").insertOne(pendingEnrollment);

        console.log(`[Payment] Initiating SSLCommerz session for Course: "${course.title}", Amount: ${amountInBDT} BDT, TranId: ${tranId}`);

        // Call the centralized SSLCommerz helper to create gateway session
        const data = await initiateSSLSession({
            amount: courseAmount,
            tranId,
            productName: course.title,
            customerName: req.user?.name,
            customerEmail: req.user?.email,
            customerPhone: (req.user as any)?.phone
        });

        if (data && data.status === "SUCCESS" && data.GatewayPageURL) {
            console.log(`[Payment] Gateway Session Created successfully. URL: ${data.GatewayPageURL}`);
            return res.json({ url: data.GatewayPageURL });
        } else {
            console.error("[Payment] SSLCommerz Initiation Failed:", data);
            // Roll back the pending enrollment since payment initialization failed
            await db.collection("enrollments").deleteOne({ tranId });
            return res.status(500).json({ message: "Failed to initiate payment with SSLCommerz gateway", details: data });
        }
    } catch (error) {
        console.error("[Payment] Initiate error:", error);
        res.status(500).json({ message: "Internal server error during payment initiation" });
    }
};

/**
 * Handles the successful payment POST callback from SSLCommerz redirection.
 * Validates the transaction with gateway and updates enrollment.
 */
export const paymentSuccess = async (req: Request, res: Response) => {
    try {
        const { val_id, tran_id, card_type, bank_tran_id } = req.body;
        console.log(`[Payment] Received SUCCESS callback for TranId: ${tran_id}, ValId: ${val_id}`);

        if (!val_id) {
            console.error("[Payment] Missing validation ID (val_id) in success callback");
            return res.redirect(`${WEB_URL}/payment/fail?reason=missing_val_id`);
        }

        // Validate the transaction with SSLCommerz Validation API
        const validationData = await validateSSLTransaction(val_id as string);

        if (validationData && (validationData.status === "VALID" || validationData.status === "VALIDATED")) {
            console.log(`[Payment] Validation Successful for TranId: ${tran_id}`);

            // Find the enrollment
            const enrollment = await db.collection("enrollments").findOne({ tranId: tran_id });
            if (!enrollment) {
                console.error(`[Payment] Success callback: Enrollment not found for TranId ${tran_id}`);
                return res.redirect(`${WEB_URL}/payment/fail?reason=enrollment_not_found`);
            }

            // Update enrollment status to active
            await db.collection("enrollments").updateOne(
                { tranId: tran_id },
                {
                    $set: {
                        status: "active",
                        paymentStatus: "paid",
                        cardType: card_type || validationData.card_type,
                        bankTranId: bank_tran_id || validationData.bank_tran_id,
                        validationDetails: validationData,
                        updatedAt: new Date()
                    }
                }
            );

            console.log(`[Payment] Enrollment activated successfully for User: ${enrollment.userId}, Course: ${enrollment.courseId}`);
            // Redirect user to the success page on our web app
            return res.redirect(`${WEB_URL}/payment/success?tran_id=${tran_id}&course_id=${enrollment.courseId}`);
        } else {
            console.error(`[Payment] Validation FAILED at SSLCommerz for TranId: ${tran_id}. Details:`, validationData);

            // Mark transaction as failed in the DB
            await db.collection("enrollments").updateOne(
                { tranId: tran_id },
                {
                    $set: {
                        status: "failed",
                        paymentStatus: "failed",
                        updatedAt: new Date()
                    }
                }
            );

            return res.redirect(`${WEB_URL}/payment/fail?tran_id=${tran_id}&reason=validation_failed`);
        }
    } catch (error) {
        console.error("[Payment] Success callback error:", error);
        res.redirect(`${WEB_URL}/payment/fail?reason=server_error`);
    }
};

/**
 * Handles the payment failure POST callback from SSLCommerz redirection.
 */
export const paymentFail = async (req: Request, res: Response) => {
    try {
        const { tran_id, error } = req.body;
        console.warn(`[Payment] Received FAIL callback for TranId: ${tran_id}, Error: ${error}`);

        await db.collection("enrollments").updateOne(
            { tranId: tran_id },
            {
                $set: {
                    status: "failed",
                    paymentStatus: "failed",
                    failureReason: error,
                    updatedAt: new Date()
                }
            }
        );

        res.redirect(`${WEB_URL}/payment/fail?tran_id=${tran_id}`);
    } catch (err) {
        console.error("[Payment] Fail callback error:", err);
        res.redirect(`${WEB_URL}/payment/fail`);
    }
};

/**
 * Handles the payment cancel POST callback from SSLCommerz redirection.
 */
export const paymentCancel = async (req: Request, res: Response) => {
    try {
        const { tran_id } = req.body;
        console.warn(`[Payment] Received CANCEL callback for TranId: ${tran_id}`);

        await db.collection("enrollments").updateOne(
            { tranId: tran_id },
            {
                $set: {
                    status: "cancelled",
                    paymentStatus: "cancelled",
                    updatedAt: new Date()
                }
            }
        );

        res.redirect(`${WEB_URL}/payment/cancel`);
    } catch (err) {
        console.error("[Payment] Cancel callback error:", err);
        res.redirect(`${WEB_URL}/payment/cancel`);
    }
};

/**
 * Handles SSLCommerz Instant Payment Notification (IPN) callbacks.
 * Operates in background to validate payments if standard redirect redirects are interrupted.
 */
export const paymentIpn = async (req: Request, res: Response) => {
    try {
        const { val_id, tran_id, status, card_type, bank_tran_id } = req.body;
        console.log(`[Payment] Received IPN callback for TranId: ${tran_id}, Status: ${status}`);

        if (status === "VALID") {
            const validationData = await validateSSLTransaction(val_id as string);

            if (validationData && (validationData.status === "VALID" || validationData.status === "VALIDATED")) {
                const enrollment = await db.collection("enrollments").findOne({ tranId: tran_id });
                if (enrollment && enrollment.paymentStatus !== "paid") {
                    await db.collection("enrollments").updateOne(
                        { tranId: tran_id },
                        {
                            $set: {
                                status: "active",
                                paymentStatus: "paid",
                                cardType: card_type,
                                bankTranId: bank_tran_id,
                                validationDetails: validationData,
                                updatedAt: new Date()
                            }
                        }
                    );
                    console.log(`[Payment IPN] Activated enrollment in background for TranId: ${tran_id}`);
                }
            }
        }
        res.status(200).json({ status: "SUCCESS", message: "IPN Received" });
    } catch (error) {
        console.error("[Payment IPN] Error:", error);
        res.status(500).json({ status: "FAILED", message: "IPN Error" });
    }
};

/**
 * Allows a user to enroll in a free course directly without hitting SSLCommerz.
 */
export const enrollFreeCourse = async (req: AuthRequest, res: Response) => {
    try {
        const { courseId } = req.body;
        const userId = req.user?.id;

        if (!courseId || !userId) {
            return res.status(400).json({ message: "Course ID is required" });
        }

        const course = await db.collection("courses").findOne({ _id: new ObjectId(courseId as string) });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const courseAmount = Number(course.amount) || 0;
        if (courseAmount > 0) {
            return res.status(400).json({ message: "This course is paid. Please use payment gateway." });
        }

        // Check if user is already enrolled
        const existingEnrollment = await db.collection("enrollments").findOne({
            userId,
            courseId,
            paymentStatus: "paid"
        });

        if (existingEnrollment) {
            return res.status(400).json({ message: "You are already enrolled in this course." });
        }

        const tranId = `FREE-${crypto.randomBytes(6).toString("hex").toUpperCase()}`;

        const newEnrollment = {
            userId,
            courseId,
            courseTitle: course.title,
            amount: 0,
            tranId,
            status: "active",
            paymentStatus: "paid",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await db.collection("enrollments").insertOne(newEnrollment);
        console.log(`[Payment] Enrolled in free course: "${course.title}" for User: ${userId}`);

        res.json({ message: "Enrolled in free course successfully", tranId });
    } catch (error) {
        console.error("[Payment] Free enrollment error:", error);
        res.status(500).json({ message: "Internal server error during free enrollment" });
    }
};

/**
 * Returns all courses the logged-in user is enrolled in.
 */
export const getEnrolledCourses = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Find all active/paid enrollments for the user
        const enrollments = await db.collection("enrollments").find({
            userId,
            paymentStatus: "paid"
        }).toArray();

        if (enrollments.length === 0) {
            return res.json([]);
        }

        // Map course ids and fetch full details
        const courseIds = enrollments.map(e => new ObjectId(e.courseId));
        const courses = await db.collection("courses").find({
            _id: { $in: courseIds }
        }).toArray();

        res.json(courses);
    } catch (error) {
        console.error("[Payment] Get enrolled courses error:", error);
        res.status(500).json({ message: "Internal server error while fetching enrolled courses" });
    }
};
