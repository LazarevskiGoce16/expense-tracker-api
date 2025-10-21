import type React from "react";
import { useEffect, useState } from "react";
import { type Expense, type FilterParams } from "../../types";
import { expensesAPI } from "../../services/api";
import { Link } from "react-router-dom";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseItem from "./ExpenseItem";

const ExpenseList:React.FC = () => {
    const [expenses, setExpense] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [filters, setFilters] = useState<FilterParams>({
        page: 1,
        limit: 10
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
    });

    const fetchExpenses = async () => {
        setLoading(true);
        try {
            const response = await expensesAPI.getAll(filters);
            setExpense(response.expenses);
            setPagination(response.pagination);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch expenses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, [filters]);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this expense?')) {
            return;
        }

        try {
           await expensesAPI.delete(id);
           fetchExpenses();  // To refresh the list
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to delete expense');
        }
    };

    const handleFilterChange = (newFilters: FilterParams) => {
        setFilters({ ...filters, ...newFilters, page: 1 });
    };

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading expenses...</div>;
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
                <div style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', border: '1px solid red', borderRadius: '4px' }}>
                    {error}
                </div>
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
