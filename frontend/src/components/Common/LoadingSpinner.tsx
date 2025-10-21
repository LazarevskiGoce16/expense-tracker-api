import React from 'react';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
    size = 'medium', 
    message = 'Loading...' 
}) => {
    const sizeStyles = {
        small: { width: '20px', height: '20px' },
        medium: { width: '40px', height: '40px' },
        large: { width: '60px', height: '60px' }
    };

    const spinnerStyle = {
        ...sizeStyles[size],
        border: '3px solid #f3f3f3',
        borderTop: '3px solid #007bff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto'
    };

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column' as const, 
            alignItems: 'center', 
            gap: '1rem',
            padding: '2rem' 
        }}>
            <div style={spinnerStyle}></div>
            <p style={{ margin: 0, color: '#666' }}>{message}</p>
            
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default LoadingSpinner;
