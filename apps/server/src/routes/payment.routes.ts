import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { 
    initiatePayment, 
    paymentSuccess, 
    paymentFail, 
    paymentCancel, 
    paymentIpn 
} from "../controllers/payment.controller.js";

const router = Router();

router.post("/payment/initiate", authMiddleware, initiatePayment);
router.post("/payment/success", paymentSuccess);
router.post("/payment/fail", paymentFail);
router.post("/payment/cancel", paymentCancel);
router.post("/payment/ipn", paymentIpn);

export default router;
