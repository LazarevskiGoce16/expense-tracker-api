import React from 'react';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
    showRetry?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
    message, 
    onRetry, 
    showRetry = true 
}) => {
    return (
        <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '1rem',
            borderRadius: '4px',
            border: '1px solid #f5c6cb',
            textAlign: 'center',
            margin: '1rem 0'
        }}>
            <div style={{ marginBottom: showRetry && onRetry ? '1rem' : 0 }}>
                <strong>Error:</strong> {message}
            </div>
            
            {showRetry && onRetry && (
                <button
                    onClick={onRetry}
                    style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
