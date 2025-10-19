import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error: " + error });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        // Check if JWT exists
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error("JWT_SECRET is not defined in environment variables");
            return res.status(500).json({ message: "Server configuration error" });
        }

        // Generate JWT Token otherwise
        const token = jwt.sign(
            { userId: user.id },
            jwtSecret as jwt.Secret,
            { expiresIn: (process.env.JWT_EXPIRES_IN || "24h") as jwt.SignOptions['expiresIn'] }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error: " + error });
    }
};
