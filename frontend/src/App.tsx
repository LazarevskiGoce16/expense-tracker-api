import type React from "react";
import { useToast } from "./hooks/useToast";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Layout from "./components/Layout/Layout";
import ExpenseList from "./components/Expenses/ExpenseList";
import ExpenseForm from "./components/Expenses/ExpenseForm";
import Summary from "./components/Reports/Summary";
import { ToastContainer } from "./components/Common/Toast";

const AppContent: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>

            {/* Protected routes */}
            <Route path="/expenses" element={
              <ProtectedRoute>
                <Layout>
                  <ExpenseList />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/expenses/new" element={
              <ProtectedRoute>
                <Layout>
                  <ExpenseForm />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/expenses/:id/edit" element={
              <ProtectedRoute>
                <Layout>
                  <ExpenseForm />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/summary" element={
              <ProtectedRoute>
                <Layout>
                  <Summary />
                </Layout>
              </ProtectedRoute>
            } />

            {/* Redirection routes */}
            <Route path="/" element={<Navigate to="/expenses" replace />} />
            <Route path="*" element={<Navigate to="/expenses" replace />} />
          </Routes>
        </AuthProvider>
      </Router>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
};

const App: React.FC = () => {
  return <AppContent />
};

export default App;
