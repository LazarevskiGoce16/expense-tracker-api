import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/validation";
import { authAPI } from "../../services/api";

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validation
        if (!validateEmail(email)) {
            setError("Please enter a valid email!");
            return;
        }
        
        if (!validatePassword(password)) {
            setError("Password must be at least 8 characters!");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
        }

        setLoading(true);

        try {
            await authAPI.register({ email, password });
            setSuccess("Registration successful! Redirecting to login...");

            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate("/login");
            }, 2000)
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem' }}>
            <form onSubmit={handleSubmit}>
                <h2>Register for Expense Tracker</h2>

                {error && (
                    <div style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', border: '1px solid red', borderRadius: '4px' }}>
                        {error}
                    </div>
                )}

                {success && (
                    <div style={{ color: 'green', marginBottom: '1rem', padding: '0.5rem', border: '1px solid green', borderRadius: '4px' }}>
                        {success}
                    </div>
                )}

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.5rem' }}>Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={loading}
                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{ 
                        width: '100%', 
                        padding: '0.75rem', 
                        backgroundColor: loading ? '#ccc' : '#28a745', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
