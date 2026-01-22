import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  redirectPath?: string;
}

export const ProtectedRoute = ({
  children,
  redirectPath = '/signin',
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    // Timeout after 2 seconds if still loading
    setTimeout(() => {
      if (useAuthStore.getState().isLoading) {
        useAuthStore.getState().setLoading(false);
      }
    }, 2000);
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }
  

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
