import type React from "react";
import { useEffect, useState } from "react";
import { CATEGORIES, type ExpenseRequest } from "../../types";
import { validateExpenseForm, type ValidationErrors } from "../../utils/validation";
import { useNavigate, useParams } from "react-router-dom";
import { expensesAPI } from "../../services/api";
import { capitalizeFirst, formatDateForInput } from "../../utils/formatters";
import LoadingSpinner from "../Common/LoadingSpinner";
import ErrorMessage from "../Common/ErrorMessage";
import "../../styles/forms.css";

const ExpenseForm: React.FC = () => {
    const [formData, setFormData] = useState<ExpenseRequest>({
        title: "",
        amount: 0,
        category: "",
        date: new Date().toISOString().split("T")[0]
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // To load the existing expense if editing
    useEffect(() => {
        if (id) {
            setIsEditing(true);
            fetchExpense(parseInt(id));
        }
    }, [id]);

    const fetchExpense = async (expenseId: number) => {
        setLoading(true);
        try {
            const expense = await expensesAPI.getById(expenseId);
            setFormData({
                title: expense.title,
                amount: expense.amount,
                category: expense.category,
                date: formatDateForInput(expense.date)
            });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch expense');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        // Handling rapid and concurrent typing issues
        setFormData(prev => ({
            ...prev,
            [name]: name === "amount" ? parseFloat(value) || 0 : value
        }));

        // To clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setErrors({});

        const validationErrors = validateExpenseForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        try {
            if (isEditing && id) {
                await expensesAPI.update(parseInt(id), formData);
            } else {
                await expensesAPI.create(formData);
            }
            navigate("/expenses");
        } catch (err: any) {
            setError(err.response?.data?.message || 
                `Failed to ${isEditing ? 'update' : 'create'} expense`
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/expenses');
    };

    if (loading && isEditing) {
        return <LoadingSpinner message="Loading expense..." />;
    }

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <h2 className="form-title">
                    {isEditing ? 'Edit Expense' : 'Add New Expense'}
                </h2>

                {error && (
                    <ErrorMessage 
                        message={error} 
                        onRetry={() => setError('')}
                        showRetry={false}
                    />
                )}

                <form onSubmit={handleSubmit} className="form">
                    {/* Title */}
                    <div className="form-group">
                        <label htmlFor="title">Title: *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter expense title..."
                            disabled={loading}
                            className={`form-input ${errors.title ? 'error' : ''}`}
                        />
                        {errors.title && 
                            <div className="error-text">{errors.title}</div>
                        }
                    </div>

                    {/* Amount */}
                    <div className="form-group">
                        <label htmlFor="amount">Amount ($): *</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount || ''}
                            onChange={handleInputChange}
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            disabled={loading}
                            className={`form-input ${errors.amount ? 'error' : ''}`}
                        />
                        {errors.amount && 
                            <div className="error-text">{errors.amount}</div>
                        }
                    </div>

                    {/* Category */}
                    <div className="form-group">
                        <label htmlFor="category">Category: *</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            disabled={loading}
                            className={`form-input ${errors.category ? 'error' : ''}`}
                        >
                            <option value="">Select a category...</option>
                            {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>
                                    {capitalizeFirst(cat)}
                                </option>
                            ))}
                        </select>
                        {errors.category && 
                            <div className="error-text">{errors.category}</div>
                        }
                    </div>

                    {/* Date */}
                    <div className="form-group">
                        <label htmlFor="date">Date: *</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            disabled={loading}
                            className={`form-input ${errors.date ? 'error' : ''}`}
                        />
                        {errors.date && 
                            <div className="error-text">{errors.date}</div>
                        }
                    </div>

                    {/* Submit and cancel buttons */}
                    <div className="form-actions">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-success"
                        >
                            {loading ? 'Saving...' : (isEditing ? 'Update Expense' : 'Add Expense')}
                        </button>

                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={loading}
                            className="btn-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExpenseForm;
