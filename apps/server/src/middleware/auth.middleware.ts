import { Request, Response, NextFunction } from "express";
import { auth } from "../auth.js";
import { fromNodeHeaders } from "better-auth/node";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
    });

    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach user and session to request for use in controllers
    (req as any).user = session.user;
    (req as any).session = session.session;

    next();
};
