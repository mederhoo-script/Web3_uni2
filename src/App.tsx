import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useAddress, useConnectionStatus } from '@thirdweb-dev/react';

// Layouts
import { AuthLayout } from './layouts/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { CoursesPage } from './pages/courses/CoursesPage';
import { CohortsPage } from './pages/cohorts/CohortsPage';
import { ChatPage } from './pages/chat/ChatPage';
import { AdminPage } from './pages/admin/AdminPage';

// Contexts
import { useAuthStore } from './contexts/AuthContext';
import { authService } from './services/auth';
import { UserRole } from './types/index';

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Auth initialization component
const AuthInitializer: React.FC = () => {
  const address = useAddress();
  const connectionStatus = useConnectionStatus();
  const { setLoading, disconnectWallet } = useAuthStore();

  useEffect(() => {
    if (connectionStatus === 'connecting') {
      setLoading(true);
      return;
    }

    if (address && connectionStatus === 'connected') {
      const user = authService.createUserFromAddress(address);
      useAuthStore.setState({
        user,
        token: address,
        isAuthenticated: true,
        isLoading: false,
      });
    } else if (connectionStatus === 'disconnected') {
      disconnectWallet();
    } else {
      setLoading(false);
    }
  }, [address, connectionStatus, setLoading, disconnectWallet]);

  return null;
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; roles?: UserRole[] }> = ({ 
  children, 
  roles 
}) => {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LandingPage />; //<Navigate to="/" replace />;
  }

  if (roles && user && !roles.includes(user.role)) {
    //return <Navigate to="/dashboard" replace />;
        }

  return <>{children}</>;
};

// Public Route Component (redirect if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Landing Route Component (show landing page for unauthorized, redirect authenticated users)
const LandingRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

   if (isAuthenticated) {
     return <Navigate to="/chat" replace />;
   }

  return <LandingPage />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <AuthInitializer />
          <Routes>
            {/* Landing Page Route */}
            <Route path="/" element={<LandingRoute />} />
            
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <AuthLayout />
                </PublicRoute>
              }
            >
              <Route index element={<LoginPage />} />
            </Route>
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <AuthLayout />
                </PublicRoute>
              }
            >
              <Route index element={<RegisterPage />} />
            </Route>

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
            </Route>

            <Route
              path="/courses"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<CoursesPage />} />
              {/* TODO: Add course detail routes */}
            </Route>

            <Route
              path="/cohorts"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<CohortsPage />} />
            </Route>

            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<ChatPage />} />
            </Route>

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={[UserRole.ADMIN]}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminPage />} />
            </Route>

            {/* Mentor Routes */}
            <Route
              path="/mentor"
              element={
                <ProtectedRoute roles={[UserRole.MENTOR, UserRole.ADMIN]}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<div>Mentor Panel Coming Soon...</div>} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>

          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#4ade80',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
