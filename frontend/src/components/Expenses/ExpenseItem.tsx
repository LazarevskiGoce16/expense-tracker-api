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
            <td>
                <div className="expense-title">{expense.title}</div>
                <div className="expense-meta">
                    Created: {formatDate(expense.createdAt)}
                </div>
            </td>
            <td className="expense-amount">
                {formatCurrency(expense.amount)}
            </td>
            <td>
                <span className={`category-badge category-${expense.category}`}>
                    {capitalizeFirst(expense.category)}
                </span>
            </td>
            <td>
                {formatDate(expense.date)}
            </td>
            <td>
                <div className="action-buttons">
                    <Link to={`/expenses/${expense.id}/edit`} className="btn-primary btn-sm">
                        Edit
                    </Link>
                    <button onClick={handleDelete} className="btn-danger btn-sm">
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default ExpenseItem;