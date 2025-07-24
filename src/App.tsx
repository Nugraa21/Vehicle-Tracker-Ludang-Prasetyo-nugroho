import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Tampilkan tombol hanya jika rute adalah /vehicles/:id
  const showBackButton = location.pathname.startsWith('/vehicles/');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 text-gray-900">
      <header className="bg-white shadow animate-in fade-in duration-700">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Vehicle Tracker Dashboard</h1>
          {showBackButton && (
            <Button
              variant="outline"
              className="border-blue-300 hover:bg-blue-500 hover:text-white transition-colors duration-300"
              onClick={() => navigate('/')}
            >
              Back to List
            </Button>
          )}
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default App;