import React, { useEffect } from 'react';
import type { Toast as ToastType } from '../../hooks/useToast';

interface ToastProps {
    toast: ToastType;
    onRemove: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
    const { id, message, type } = toast;

    const getToastStyles = () => {
        const baseStyles = {
            padding: '1rem 1.5rem',
            borderRadius: '4px',
            marginBottom: '0.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minWidth: '300px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            animation: 'slideIn 0.3s ease-out'
        };

        const typeStyles = {
            success: {
                backgroundColor: '#d4edda',
                color: '#155724',
                border: '1px solid #c3e6cb'
            },
            error: {
                backgroundColor: '#f8d7da',
                color: '#721c24',
                border: '1px solid #f5c6cb'
            },
            warning: {
                backgroundColor: '#fff3cd',
                color: '#856404',
                border: '1px solid #ffeaa7'
            },
            info: {
                backgroundColor: '#d1ecf1',
                color: '#0c5460',
                border: '1px solid #bee5eb'
            }
        };

        return { ...baseStyles, ...typeStyles[type] };
    };

    useEffect(() => {
        if (toast.duration && toast.duration > 0) {
            const timer = setTimeout(() => {
                onRemove(id);
            }, toast.duration);

            return () => clearTimeout(timer);
        }
    }, [id, toast.duration, onRemove]);

    return (
        <div style={getToastStyles()}>
            <span>{message}</span>
            <button
                onClick={() => onRemove(id)}
                style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    marginLeft: '1rem',
                    opacity: 0.7
                }}
                aria-label="Close"
            >
                ×
            </button>
            
            <style>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};

export const ToastContainer: React.FC<{ 
    toasts: ToastType[];
    onRemove: (id: string) => void;
}> = ({ toasts, onRemove }) => {
    if (toasts.length === 0) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000
        }}>
            {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} onRemove={onRemove} />
            ))}
        </div>
    );
};

export default Toast;
