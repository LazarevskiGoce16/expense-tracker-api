import express from 'express';
import {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpenseSummary,
} from '../controllers/expenseController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Authentication required for all expense routes
router.use(authenticateToken);

router.post("/", createExpense);
router.get("/", getAllExpenses);
router.get("/:id", getExpenseById);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);
router.get("/sumarry", getExpenseSummary);

export default router;
