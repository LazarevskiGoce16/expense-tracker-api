import type React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <nav style={{ 
            backgroundColor: '#007bff', 
            padding: '1rem 2rem', 
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div>
                <Link 
                    to="/expenses" 
                    style={{ 
                        color: 'white', 
                        textDecoration: 'none', 
                        fontSize: '1.5rem', 
                        fontWeight: 'bold' 
                    }}
                >
                    Expense Tracker
                </Link>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link 
                    to="/expenses" 
                    style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}
                >
                    Expenses
                </Link>
                <Link 
                    to="/expenses/new" 
                    style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}
                >
                    Add Expense
                </Link>
                <Link 
                    to="/summary" 
                    style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}
                >
                    Summary
                </Link>
                
                <div style={{ color: 'white', marginLeft: '1rem' }}>
                    Welcome, {user?.email}
                </div>
                
                <button
                    onClick={handleLogout}
                    style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
