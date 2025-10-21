import type React from "react";
import type { Expense } from "../../types";
import { capitalizeFirst, formatCurrency, formatDate } from "../../utils/formatters";
import { Link } from "react-router-dom";

interface ExpenseItemProps {
    expense: Expense;
    onDelete: (id: number) => void;
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${expense.title}"?`)) {
            onDelete(expense.id);
        }
    };

    return (
        <tr>
            <td style={{ padding: '1rem', border: '1px solid #ddd' }}>
                <div style={{ fontWeight: 'bold' }}>{expense.title}</div>
                <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.25rem' }}>
                    Created: {formatDate(expense.createdAt)}
                </div>
            </td>
            <td style={{ padding: '1rem', border: '1px solid #ddd', fontWeight: 'bold' }}>
                {formatCurrency(expense.amount)}
            </td>
            <td style={{ padding: '1rem', border: '1px solid #ddd' }}>
                <span style={{ 
                    backgroundColor: getCategoryColor(expense.category),
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: '0.875rem'
                }}>
                    {capitalizeFirst(expense.category)}
                </span>
            </td>
            <td style={{ padding: '1rem', border: '1px solid #ddd' }}>
                {formatDate(expense.date)}
            </td>
            <td style={{ padding: '1rem', border: '1px solid #ddd' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link
                        to={`/expenses/${expense.id}/edit`}
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            textDecoration: 'none',
                            borderRadius: '4px',
                            fontSize: '0.875rem'
                        }}
                    >
                        Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        style={{
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.875rem'
                        }}
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
};

const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
        food: '#28a745',
        transport: '#007bff',
        bills: '#dc3545',
        entertainment: '#ffc107',
        shopping: '#e83e8c',
        health: '#20c997',
        other: '#6c757d'
    };
    return colors[category] || '#6c757d';
};

export default ExpenseItem;