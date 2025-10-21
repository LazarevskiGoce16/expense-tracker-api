import type React from "react";
import { type FilterParams } from "../../types";
import { Link } from "react-router-dom";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseItem from "./ExpenseItem";
import { useExpenses } from "../../hooks/useExpenses";
import LoadingSpinner from "../Common/LoadingSpinner";
import ErrorMessage from "../Common/ErrorMessage";
import "../../styles/expenses.css";

const ExpenseList:React.FC = () => {
    const {
        expenses,
        loading,
        error,
        pagination,
        deleteExpense,
        updateFilters,
        clearFilters,
        changePage,
        setError
    } = useExpenses();

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this expense?')) {
            return;
        }

        const result = await deleteExpense(id);
        if (!result.success) {
            console.error('Failed to delete expense:', result.error);
        }
    };

    const handleFilterChange = (newFilters: FilterParams) => {
        updateFilters(newFilters);
    };

    const handlePageChange = (page: number) => {
        changePage(page);
    };

    if (loading) {
        return <LoadingSpinner message="Loading expenses..." />;
    }

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">My Expenses</h1>
                <Link to="/expenses/new" className="btn-add-expense">
                    + Add New Expense
                </Link>
            </div>

            {error && (
                <ErrorMessage 
                    message={error} 
                    onRetry={() => setError('')}
                    showRetry={false}
                />
            )}

            <ExpenseFilter onFilterChange={handleFilterChange} onClearFilters={clearFilters} />

            {expenses.length === 0 ? (
                <div className="empty-state">
                    <p>No expenses found. <Link to="/expenses/new">Add your first expense!</Link></p>
                </div>
            ) : (
                <>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Amount</th>
                                    <th>Category</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.map((expense) => (
                                    <ExpenseItem 
                                        key={expense.id}
                                        expense={expense}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination logic */}
                    {pagination.totalPages > 1 && (
                        <div className="pagination">
                            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`pagination-btn ${page === pagination.currentPage ? 'active' : ''}`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ExpenseList;
