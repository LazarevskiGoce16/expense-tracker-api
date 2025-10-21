import { useEffect, useState } from "react";
import type { Expense, ExpenseResponse, FilterParams } from "../types";
import { expensesAPI } from "../services/api";


export const useExpenses = (initialFilters: FilterParams = {}) => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filters, setFilters] = useState<FilterParams>({
        page: 1,
        limit: 10,
        ...initialFilters
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
    });

    const fetchExpenses = async () => {
        setLoading(true);
        setError('');
        try {
            const response: ExpenseResponse = await expensesAPI.getAll(filters);
            setExpenses(response.expenses);
            setPagination(response.pagination);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch expenses!");
        } finally {
            setLoading(false);
        }
    };

    const deleteExpense = async (id: number) => {
        try {
            await expensesAPI.delete(id);
            await fetchExpenses(); // Refresh the list
            return { success: true };
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Failed to delete expense";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const updateFilters = (newFilters: FilterParams) => {
        setFilters({ ...filters, ...newFilters, page: 1 });
    };

    const changePage = (page: number) => {
        setFilters({ ...filters, page });
    };

    const clearFilters = () => {
        setFilters({ page: 1, limit: 10 });
    };

    useEffect(() => {
        fetchExpenses();
    }, [filters]);

    return {
        expenses,
        loading,
        error,
        filters,
        pagination,
        fetchExpenses,
        deleteExpense,
        updateFilters,
        changePage,
        clearFilters,
        setError
    };
};