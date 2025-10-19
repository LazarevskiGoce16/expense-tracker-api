import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models";

interface AuthenticatedRequest extends Request {
    user?: any;
};

export const authenticateToken = async (
    req: AuthenticatedRequest, res: Response, next: NextFunction
) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer [0] TOKEN [1]

    if (!token) {
        return res.status(401).json({ message: "Access Token required!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        const user = await User.findByPk(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: "Invalid Token." });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired Token." });
    }
};
