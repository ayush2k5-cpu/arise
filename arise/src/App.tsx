import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignUpPage } from './auth-system/pages/SignUp';
import { SignInPage } from './auth-system/pages/SignIn';
import { DashboardPage } from './auth-system/pages/Dashboard';
import { ProtectedRoute } from './auth-system/components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Catch all - redirect to signin */}
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
