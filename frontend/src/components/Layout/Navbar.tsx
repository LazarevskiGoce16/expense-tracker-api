import type React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/layout.css";

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
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/expenses" className="navbar-brand-link">
                    💰 Expense Tracker
                </Link>
            </div>

            <div className="navbar-menu">
                <Link to="/expenses" className="navbar-link">
                    Expenses
                </Link>
                <Link to="/expenses/new" className="navbar-link">
                    Add Expense
                </Link>
                <Link to="/summary" className="navbar-link">
                    Summary
                </Link>
                
                <div className="navbar-user">
                    Welcome, {user?.email}
                </div>
                
                <button onClick={handleLogout} className="btn-danger">
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
