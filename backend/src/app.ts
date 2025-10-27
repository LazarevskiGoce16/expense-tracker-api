import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";
import { User, Expense } from "./models";
import authRoutes from "./routes/authRoutes";
import expenseRoutes from "./routes/expenseRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(helmet());
app.use(cors({
    origin: [
        "http://localhost",
        "http://localhost:3000",
        "http://localhost:5000",
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
    res.json({
        message: "Expense Tracker API is running!",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development"
    });
});

// Routes
app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes);

app.use("*", (req, res) => {
    res.status(404).json({
        message: "Route not found",
        path: req.originalUrl
    });
});

app.use((
    err: any, req: express.Request, res: express.Response, next: express.NextFunction
) => {
    console.error("Error: " + err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
});

// DB connection and server starting
const startServer = async () => {
    try {
        await connectDatabase();

        // Table creation/synchronization
        await User.sync();
        await Expense.sync();
        console.log("Database tables synchronized.");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Auth endpoints: http://localhost:${PORT}/auth/login`);
            console.log(`Expense endpoints: http://localhost:${PORT}/expenses`);
        });
    } catch (error) {
        console.error("Failed to start server: " + error);
        process.exit(1);
    }
};

startServer();

export default app;