import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";
import { db } from "../db/mongo.js";
import { ObjectId } from "mongodb";
import crypto from "crypto";
import dotenv from "dotenv";

// Load environment variables immediately
dotenv.config();

const STORE_ID = process.env.SSL_STORE_ID;
const STORE_PASSWORD = process.env.SSL_STORE_PASSWORD;
const SESSION_API = process.env.SSL_SESSION_API;
const VALIDATION_API = process.env.SSL_VALIDATION_API;
const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
const API_URL = process.env.BETTER_AUTH_URL;

if (!STORE_ID || !STORE_PASSWORD || !SESSION_API || !VALIDATION_API || !WEB_URL || !API_URL) {
    throw new Error("Missing critical SSLCommerz configuration in your backend environment variables (dotenv). Please configure them in apps/server/.env.");
}

/**
 * Initiates SSLCommerz payment session for a course.
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

        // The price is already configured in BDT directly
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

        // Build SSLCommerz session request payload
        const sslParams = new URLSearchParams();
        sslParams.append("store_id", STORE_ID);
        sslParams.append("store_passwd", STORE_PASSWORD);
        sslParams.append("total_amount", amountInBDT.toFixed(2));
        sslParams.append("currency", "BDT");
        sslParams.append("tran_id", tranId);

        // Redirect endpoints pointing back to our backend
        sslParams.append("success_url", `${API_URL}/api/payment/success`);
        sslParams.append("fail_url", `${API_URL}/api/payment/fail`);
        sslParams.append("cancel_url", `${API_URL}/api/payment/cancel`);
        sslParams.append("ipn_url", `${API_URL}/api/payment/ipn`);

        // Customer Details
        sslParams.append("cus_name", req.user?.name || "Kazi Hasibul Haque Hasib");
        sslParams.append("cus_email", req.user?.email || "hasib46739@gmail.com");
        sslParams.append("cus_add1", "Khulna, Bangladesh");
        sslParams.append("cus_city", "Khulna");
        sslParams.append("cus_state", "Khulna");
        sslParams.append("cus_postcode", "9100");
        sslParams.append("cus_country", "Bangladesh");
        sslParams.append("cus_phone", (req.user as any)?.phone || "01812004315");

        // Product & Shipping Profile Details (Required by SSLCommerz)
        sslParams.append("shipping_method", "NO");
        sslParams.append("num_of_item", "1");
        sslParams.append("product_name", course.title);
        sslParams.append("product_category", "Education");
        sslParams.append("product_profile", "non-physical-goods");

        console.log(`[Payment] Initiating SSLCommerz session for Course: "${course.title}", Amount: ${amountInBDT} BDT, TranId: ${tranId}`);

        // Hit SSLCommerz Session API
        const response = await fetch(SESSION_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: sslParams.toString()
        });

        const data: any = await response.json();

        if (data && data.status === "SUCCESS" && data.GatewayPageURL) {
            console.log(`[Payment] Gateway Session Created. URL: ${data.GatewayPageURL}`);
            return res.json({ url: data.GatewayPageURL });
        } else {
            console.error("[Payment] SSLCommerz Initiation Failed:", data);
            // Delete the pending enrollment since initiation failed
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
 */
export const paymentSuccess = async (req: any, res: Response) => {
    try {
        const { val_id, tran_id, amount, card_type, bank_tran_id } = req.body;
        console.log(`[Payment] Received SUCCESS callback for TranId: ${tran_id}, ValId: ${val_id}`);

        if (!val_id) {
            console.error("[Payment] Missing validation ID (val_id) in success callback");
            return res.redirect(`${WEB_URL}/payment/fail?reason=missing_val_id`);
        }

        // Validate the transaction with SSLCommerz Validation API
        const valUrl = `${VALIDATION_API}?val_id=${val_id}&store_id=${STORE_ID}&store_passwd=${STORE_PASSWORD}&format=json`;
        const response = await fetch(valUrl);
        const validationData: any = await response.json();

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

            // Mark transaction as failed
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
export const paymentFail = async (req: any, res: Response) => {
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
export const paymentCancel = async (req: any, res: Response) => {
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
 * Handles SSLCommerz Instant Payment Notification (IPN).
 */
export const paymentIpn = async (req: any, res: Response) => {
    try {
        const { val_id, tran_id, status, amount, card_type, bank_tran_id } = req.body;
        console.log(`[Payment] Received IPN callback for TranId: ${tran_id}, Status: ${status}`);

        if (status === "VALID") {
            const valUrl = `${VALIDATION_API}?val_id=${val_id}&store_id=${STORE_ID}&store_passwd=${STORE_PASSWORD}&format=json`;
            const response = await fetch(valUrl);
            const validationData: any = await response.json();

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
 * Allows a user to enroll in a free course directly.
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
