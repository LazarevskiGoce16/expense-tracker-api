export interface User {
    id: number;
    email: string;
};

export interface LoginRequest {
    email: string;
    password: string;
};

export interface RegisterRequest {
    email: string;
    password: string;
};

export interface AuthResponse {
    message: string;
    token: string;
    user: User;
};

export interface Expense {
    id: number;
    userId: number;
    title: string;
    amount: number;
    category: string;
    date: string;
    createdAt: string;
    updatedAt: string;
};

export interface ExpenseRequest {
    title: string;
    amount: number;
    category: string;
    date: string;
};

export interface ExpenseResponse {
    expenses: Expense[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
};

export interface ExpenseSummary {
    summary: { [category: string]: number };
    total: number;
};

export const CATEGORIES = [
    "food",
    "transport",
    "bills",
    "entertainment",
    "shopping",
    "health",
    "other"
] as const;

export type Category = typeof CATEGORIES[number];

export interface FilterParams {
    category?: string;
    from?: string;
    to?: string;
    search?: string;
    page?: number;
    limit?: number;
};
