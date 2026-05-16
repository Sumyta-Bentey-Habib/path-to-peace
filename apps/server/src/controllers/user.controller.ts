import { Request, Response } from "express";

export const getProfile = async (req: Request, res: Response) => {
    const user = (req as any).user;
    res.json({
        message: "User profile fetched successfully",
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            emailVerified: user.emailVerified,
            image: user.image
        }
    });
};
