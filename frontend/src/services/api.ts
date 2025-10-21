import axios from "axios";
import type { 
    LoginRequest, 
    RegisterRequest, 
    AuthResponse, 
    ExpenseRequest, 
    ExpenseResponse, 
    ExpenseSummary, 
    FilterParams 
} from '../types';

const API_BASE_URL = "http://localhost:9000";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Token handling
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (data: RegisterRequest): Promise<AuthResponse> =>
        api.post("/auth/register", data).then(res => res.data),
    login: (data: LoginRequest): Promise<AuthResponse> =>
        api.post("/auth/login", data).then(res => res.data)
};

// Expenses API
export const expensesAPI = {
    getAll: (params?: FilterParams): Promise<ExpenseResponse> =>
        api.get("/expenses", { params }).then(res => res.data),
    getById: (id: number) =>
        api.get(`/expenses/${id}`).then(res => res.data),
    create: (data: ExpenseRequest) =>
        api.post('/expenses', data).then(res => res.data),
    update: (id: number, data: ExpenseRequest) =>
        api.put(`/expenses/${id}`, data).then(res => res.data),
    delete: (id: number) =>
        api.delete(`/expenses/${id}`).then(res => res.data),
    getSummary: (): Promise<ExpenseSummary> =>
        api.get('/expenses/summary').then(res => res.data),
};

export default api;
