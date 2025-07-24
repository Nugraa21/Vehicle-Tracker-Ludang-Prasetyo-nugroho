import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon, ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isVehicleDetailPage = location.pathname.startsWith('/vehicles/') && location.pathname.split('/').length === 3;
  const showBackButton = isVehicleDetailPage;

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500 ease-in-out flex flex-col font-inter">
      {/* Navbar (Fixed di Atas untuk “

Semua Layar) */}
      <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg border-b border-blue-200 dark:border-gray-800 fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-blue-600 dark:text-blue-300 tracking-tight">Vehicle Tracker</h1>
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Button
                variant="outline"
                className="flex items-center gap-2 border-2 border-blue-400 dark:border-blue-600 text-blue-600 dark:text-blue-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-4 h-4" /> Kembali
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105"
            >
              {theme === 'dark' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
              <span className="hidden sm:inline">{theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-grow ${isVehicleDetailPage ? 'p-0' : 'pt-20 pb-6'}`}>
        <div className={`${isVehicleDetailPage ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default App;