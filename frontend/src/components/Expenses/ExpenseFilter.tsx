import type React from "react";
import { CATEGORIES, type FilterParams } from "../../types";
import { useState } from "react";
import { capitalizeFirst } from "../../utils/formatters";

interface ExpenseFilterProps {
    onFilterChange: (filters: FilterParams) => void;
};

const ExpenseFilter:React.FC<ExpenseFilterProps> = ({ onFilterChange }) => {
    const [category, setCategory] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [search, setSearch] = useState('');

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const filters: FilterParams = {};

        if (category) filters.category = category;
        if (fromDate) filters.from = fromDate;
        if (toDate) filters.to = toDate;
        if (search) filters.search = search;

        onFilterChange(filters);
    };

    const handleClearFilters = () => {
        setCategory('');
        setFromDate('');
        setToDate('');
        setSearch('');
        onFilterChange({});
    };

    return (
        <div style={{
            backgroundColor: '#f8f9fa', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            marginBottom: '2rem'
        }}>
            <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Filter Expenses</h3>

            <form onSubmit={handleFilterSubmit}>
                <div style={{
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '1rem',
                    marginBottom: '1rem'
                }}>
                    {/* Search */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                            Search by title:
                        </label>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Enter expense title..."
                            style={{ 
                                width: '100%', 
                                padding: '0.5rem', 
                                border: '1px solid #ddd', 
                                borderRadius: '4px' 
                            }}
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                            Category:
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{ 
                                width: '100%', 
                                padding: '0.5rem', 
                                border: '1px solid #ddd', 
                                borderRadius: '4px' 
                            }}
                        >
                            <option value="">All Categories</option>
                            {CATEGORIES.map((c) => (
                                <option key={c} value={c}>
                                    {capitalizeFirst(c)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* From Date */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                            From Date:
                        </label>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            style={{ 
                                width: '100%', 
                                padding: '0.5rem', 
                                border: '1px solid #ddd', 
                                borderRadius: '4px' 
                            }}
                        />
                    </div>

                    {/* To Date */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                            To Date:
                        </label>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            style={{ 
                                width: '100%', 
                                padding: '0.5rem', 
                                border: '1px solid #ddd', 
                                borderRadius: '4px' 
                            }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Apply Filters
                    </button>
                    
                    <button
                        type="button"
                        onClick={handleClearFilters}
                        style={{
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Clear Filters
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ExpenseFilter;
