export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 8;
};

export const validateAmount = (amount: number): boolean => {
  return amount > 0;
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export interface ValidationErrors {
  [key: string]: string;
};

export const validateExpenseForm = (data: {
    title: string;
    amount: number;
    category: string;
    date: string;
}): ValidationErrors => {
    const errors: ValidationErrors = {};
    
    if (!validateRequired(data.title)) {
        errors.title = "Title is required!";
    }

    if (!validateAmount(data.amount)) {
        errors.amount = "Amount must be greater than 0!";
    }

    if (!validateRequired(data.category)) {
        errors.category = "Category is required!";
    }

    if (!validateRequired(data.date)) {
        errors.date = "Date is required!";
    }

    return errors;
};
