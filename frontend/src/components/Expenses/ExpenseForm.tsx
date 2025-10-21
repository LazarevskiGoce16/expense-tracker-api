import type React from "react";
import { useEffect, useState } from "react";
import { CATEGORIES, type ExpenseRequest } from "../../types";
import { validateExpenseForm, type ValidationErrors } from "../../utils/validation";
import { useNavigate, useParams } from "react-router-dom";
import { expensesAPI } from "../../services/api";
import { capitalizeFirst, formatDateForInput } from "../../utils/formatters";

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
        return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading expense...</div>;
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>{isEditing ? 'Edit Expense' : 'Add New Expense'}</h2>

            {error && (
                <div style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', border: '1px solid red', borderRadius: '4px' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Title */}
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Title: *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter expense title..."
                        disabled={loading}
                        style={{ 
                            width: '100%', 
                            padding: '0.75rem', 
                            border: errors.title ? '1px solid red' : '1px solid #ddd', 
                            borderRadius: '4px' 
                        }}
                    />
                    {errors.title && 
                    <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                        {errors.title}
                    </div>
                    }
                </div>

                {/* Amount */}
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="amount" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Amount ($): *
                    </label>
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
                        style={{ 
                            width: '100%', 
                            padding: '0.75rem', 
                            border: errors.amount ? '1px solid red' : '1px solid #ddd', 
                            borderRadius: '4px' 
                        }}
                    />
                    {errors.amount && 
                    <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                        {errors.amount}
                    </div>
                    }
                </div>

                {/* Category */}
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="category" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Category: *
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        disabled={loading}
                        style={{ 
                            width: '100%', 
                            padding: '0.75rem', 
                            border: errors.category ? '1px solid red' : '1px solid #ddd', 
                            borderRadius: '4px' 
                        }}
                    >
                        <option value="">Select a category...</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                                {capitalizeFirst(cat)}
                            </option>
                        ))}
                    </select>
                    {errors.category && 
                    <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                        {errors.category}
                    </div>
                    }
                </div>

                {/* Date */}
                <div style={{ marginBottom: '2rem' }}>
                    <label htmlFor="date" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Date: *
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        disabled={loading}
                        style={{ 
                            width: '100%', 
                            padding: '0.75rem', 
                            border: errors.date ? '1px solid red' : '1px solid #ddd', 
                            borderRadius: '4px' 
                        }}
                    />
                    {errors.date && 
                    <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                        {errors.date}
                    </div>
                    }
                </div>

                {/* Submit and cancel buttons */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            backgroundColor: loading ? '#ccc' : '#28a745',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 2rem',
                            borderRadius: '4px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            flex: 1
                        }}
                    >
                        {loading ? 'Saving...' : (isEditing ? 'Update Expense' : 'Add Expense')}
                    </button>

                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={loading}
                        style={{
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 2rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            flex: 1
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ExpenseForm;
