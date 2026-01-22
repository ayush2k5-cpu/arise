import { useAuth } from '../hooks/useAuth';

export const DashboardPage = () => {
  const { email, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-slate-900">ARISE</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">{email}</span>
              <button
                onClick={signOut}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            Welcome to ARISE
          </h2>
          <p className="text-slate-600">
            You're successfully authenticated and can access protected content.
          </p>
        </div>
      </main>
    </div>
  );
};
