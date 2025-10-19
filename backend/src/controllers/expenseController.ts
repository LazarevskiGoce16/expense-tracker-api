import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import { Expense } from "../models";

interface AuthenticatedRequest extends Request {
    user?: any;
};

export const createExpense = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { title, amount, category, date } = req.body;

        if (!title || !amount || !category || !date) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const expense = await Expense.create({
            userId: req.body.id,
            title,
            amount,
            category,
            date
        });

        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error: " + error });
    }
};

export const getAllExpenses = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { category, from, to, page = "1", limit = "10" } = req.query;
        const userId = req.user.id;

        // From & to queries logic
        const whereConditions: any = { userId };

        if (category) {
            whereConditions.category = category;
        }

        if (from && to) {
            whereConditions.date = {
                [Op.between]: [from, to]
            };
        } else if (from) {
            whereConditions.date = {
                [Op.gte]: from
            };
        } else if (to) {
            whereConditions.date = {
                [Op.lte]: to
            };
        }

        // Pagination logic
        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const offset = (pageNum - 1) * limitNum;

        const { count, rows: expenses } = await Expense.findAndCountAll({
            where: whereConditions,
            limit: limitNum,
            offset,
            order: [["date", "DESC"]]
        });

        res.json({
            expenses,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(count / limitNum),
                totalItems: count,
                itemsPerPage: limitNum
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error: " + error });
    }
};

export const getExpenseById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;

        const expense = await Expense.findOne({
            where: { id, userId: req.user.id }
        });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found." });
        }

        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error: " + error });
    }
};

export const updateExpense = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { title, amount, category, date } = req.body;
        
        const expense = await Expense.findOne({
            where: { id, userId: req.user.id }
        });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found." });
        }

        await expense.update({
            title,
            amount,
            category,
            date
        });

        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error: " + error });
    }    
};

export const deleteExpense = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;

        const expense = await Expense.findOne({
            where: { id, userId: req.user.id },
        });

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        await expense.destroy();
        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error: " + error });
    }
};

export const getExpenseSummary = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const expenses = await Expense.findAll({
            where: { userId: req.user.id },
            attributes: ["category", "amount"]
        });

        const summary: { [key: string]: number } = {};
        let total = 0;

        expenses.forEach(expense => {
            const category = expense.category;
            const amount = parseFloat(expense.amount.toString());

            if (summary[category]) {
                summary[category] += amount;
            } else {
                summary[category] = amount;
            }

            total += amount;
        });

        res.json({ summary, total });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error: " + error });
    }
};
