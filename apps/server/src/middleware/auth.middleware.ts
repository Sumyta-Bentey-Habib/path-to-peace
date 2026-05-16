import { Request, Response, NextFunction } from "express";
import { auth } from "../auth.js";
import { fromNodeHeaders } from "better-auth/node";

/**
 * Extended Express Request to include Better Auth session and user data.
 */
export interface AuthRequest extends Request {
    user?: typeof auth.$Infer.Session.user;
    session?: typeof auth.$Infer.Session.session;
}

/**
 * Private helper to fetch the current session from Better Auth.
 */
const getAuthSession = async (req: Request) => {
    return await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
    });
};

/**
 * Middleware: Requires a valid user session.
 * Attaches user and session data to the request object.
 */
export const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const session = await getAuthSession(req);

        if (!session) {
            return res.status(401).json({ message: "Unauthorized: Please log in to continue" });
        }

        req.user = session.user;
        req.session = session.session;

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(500).json({ message: "Internal server error during authentication" });
    }
};

/**
 * Middleware: Requires a valid session with 'admin' role.
 * Standardizes access control for administrative routes.
 */
export const adminMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const session = await getAuthSession(req);

        if (!session) {
            return res.status(401).json({ message: "Unauthorized: No active session found" });
        }

        if (session.user.role !== "admin") {
            console.warn(`Admin Access Denied: User ${session.user.email} with role '${session.user.role}' attempted to access admin routes.`);
            return res.status(403).json({ message: "Forbidden: Administrator privileges required" });
        }

        req.user = session.user;
        req.session = session.session;

        next();
    } catch (error) {
        console.error("Admin Middleware Error:", error);
        return res.status(500).json({ message: "Internal server error during authorization" });
    }
};

