import type React from "react";
import { type FilterParams } from "../../types";
import { Link } from "react-router-dom";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseItem from "./ExpenseItem";
import { useExpenses } from "../../hooks/useExpenses";
import LoadingSpinner from "../Common/LoadingSpinner";
import ErrorMessage from "../Common/ErrorMessage";

const ExpenseList:React.FC = () => {
    const {
        expenses,
        loading,
        error,
        pagination,
        deleteExpense,
        updateFilters,
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
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>My Expenses</h1>
                <Link 
                    to="/expenses/new"
                    style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        textDecoration: 'none',
                        borderRadius: '4px'
                    }}
                >
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

            <ExpenseFilter onFilterChange={handleFilterChange} />

            {expenses.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p>No expenses found. <Link to="/expenses/new">Add your first expense!</Link></p>
                </div>
            ) : (
                <>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f8f9fa' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #ddd' }}>Title</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #ddd' }}>Amount</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #ddd' }}>Category</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #ddd' }}>Date</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #ddd' }}>Actions</th>
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
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: page === pagination.currentPage ? '#007bff' : '#f8f9fa',
                                        color: page === pagination.currentPage ? 'white' : '#000',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default ExpenseList;
