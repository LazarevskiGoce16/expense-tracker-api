import { useCallback, useState } from "react";

export interface Toast {
    id: string;
    message: string;
    type: "success" | "error" | "info" | "warning";
    duration?: number;
};

export const useToast = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: Toast["type"] = "info", duration = 5000) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast: Toast = { id, message, type, duration };
        
        setToasts(prev => [...prev, newToast]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }

        return id;
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const clearAllToasts = useCallback(() => {
        setToasts([]);
    }, []);

    const success = useCallback((message: string, duration?: number) => 
        addToast(message, "success", duration), [addToast]);
    
    const error = useCallback((message: string, duration?: number) => 
        addToast(message, "error", duration), [addToast]);
    
    const info = useCallback((message: string, duration?: number) => 
        addToast(message, "info", duration), [addToast]);
    
    const warning = useCallback((message: string, duration?: number) => 
        addToast(message, "warning", duration), [addToast]);

    return {
        toasts,
        addToast,
        removeToast,
        clearAllToasts,
        success,
        error,
        info,
        warning
    };
};
