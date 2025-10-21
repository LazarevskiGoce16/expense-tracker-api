import type React from "react";
import { useEffect, useState } from "react";
import type { ExpenseSummary } from "../../types";
import { expensesAPI } from "../../services/api";
import { capitalizeFirst, formatCurrency } from "../../utils/formatters";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import LoadingSpinner from "../Common/LoadingSpinner";
import ErrorMessage from "../Common/ErrorMessage";

const Summary: React.FC = () => {
    const [summary, setSummary] = useState<ExpenseSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [chartType, setChartType] = useState<"pie" | "bar">("pie");

    useEffect(() => {
        fetchSummary();
    }, []);

    const fetchSummary = async () => {
        setLoading(true);
        try {
            const response = await expensesAPI.getSummary();
            setSummary(response);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch summary');
        } finally {
            setLoading(false);
        }
    };

    // Preparing the data for charts
    const chartData = summary ? Object.entries(summary.summary).map(([category, amount]) => ({
        name: capitalizeFirst(category),
        value: amount,
        amount: formatCurrency(amount)
    })) : [];

    const COLORS = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#e83e8c', '#20c997', '#6c757d'];

    if (loading) {
        return <LoadingSpinner message="Loading summary..." />;
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <ErrorMessage 
                    message={error} 
                    onRetry={fetchSummary}
                />
            </div>
        );
    }

    if (!summary || Object.keys(summary.summary).length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h2>No Expenses Found</h2>
                <p>Add some expenses to see your summary!</p>
            </div>
        );
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Expense Summary</h1>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={() => setChartType('pie')}
                        style={{
                            backgroundColor: chartType === 'pie' ? '#007bff' : '#f8f9fa',
                            color: chartType === 'pie' ? 'white' : '#000',
                            border: '1px solid #ddd',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Pie Chart
                    </button>
                    <button
                        onClick={() => setChartType('bar')}
                        style={{
                            backgroundColor: chartType === 'bar' ? '#007bff' : '#f8f9fa',
                            color: chartType === 'bar' ? 'white' : '#000',
                            border: '1px solid #ddd',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Bar Chart
                    </button>
                </div>
            </div>

            {/* Total Amount */}
            <div style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '1.5rem', 
                borderRadius: '8px', 
                marginBottom: '2rem',
                textAlign: 'center'
            }}>
                <h2 style={{ margin: '0 0 0.5rem 0', color: '#007bff' }}>
                    Total Expenses: {formatCurrency(summary.total)}
                </h2>
                <p style={{ margin: 0, color: '#666' }}>
                    Across {Object.keys(summary.summary).length} categories
                </p>
            </div>

            {/* Chart */}
            <div style={{ 
                backgroundColor: 'white', 
                padding: '2rem', 
                borderRadius: '8px', 
                border: '1px solid #ddd',
                marginBottom: '2rem'
            }}>
                <ResponsiveContainer width="100%" height={400}>
                    {chartType === 'pie' ? (
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={(entry: any) => `${entry.name ?? ''} ${(((entry.percent ?? 0) as number) * 100).toFixed(1)}%`}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {chartData.map((_entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        </PieChart>
                    ) : (
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => `$${value}`} />
                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                            <Legend />
                            <Bar dataKey="value" fill="#007bff" />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>

            {/* Category Breakdown Table */}
            <div style={{ 
                backgroundColor: 'white', 
                padding: '2rem', 
                borderRadius: '8px', 
                border: '1px solid #ddd'
            }}>
                <h3 style={{ marginTop: 0 }}>Category Breakdown</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f8f9fa' }}>
                            <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #ddd' }}>Category</th>
                            <th style={{ padding: '1rem', textAlign: 'right', border: '1px solid #ddd' }}>Amount</th>
                            <th style={{ padding: '1rem', textAlign: 'right', border: '1px solid #ddd' }}>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(summary.summary)
                            .sort(([, a], [, b]) => b - a) // descending sort
                            .map(([category, amount], index) => {
                                const percentage = ((amount / summary.total) * 100).toFixed(1);
                                return (
                                    <tr key={category}>
                                        <td style={{ padding: '1rem', border: '1px solid #ddd' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div 
                                                    style={{
                                                        width: '12px',
                                                        height: '12px',
                                                        backgroundColor: COLORS[index % COLORS.length],
                                                        borderRadius: '2px'
                                                    }}
                                                />
                                                {capitalizeFirst(category)}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right', border: '1px solid #ddd', fontWeight: 'bold' }}>
                                            {formatCurrency(amount)}
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right', border: '1px solid #ddd' }}>
                                            {percentage}%
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Summary;
