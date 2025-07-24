import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon, ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const showBackButton = location.pathname.startsWith('/vehicles/');

  const [theme, setTheme] = useState<'light' | 'dark'>(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-500 ease-in-out">
      
      {/* Navbar - atas untuk desktop */}
      <header className="hidden sm:block bg-white/80 dark:bg-gray-900/90 backdrop-blur-md shadow-md border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Vehicle Tracker Dashboard</h1>
          <div className="flex items-center gap-2">
            {showBackButton && (
              <Button
                variant="outline"
                className="border-blue-300 hover:bg-blue-500 hover:text-white dark:border-blue-500 dark:hover:bg-blue-600 transition-colors"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center gap-2 border-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 hover:bg-gray-100 transition"
            >
              {theme === 'dark' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </div>
        </div>
      </header>

      {/* Navbar - bawah untuk mobile */}
      <nav className="fixed bottom-0 sm:hidden w-full bg-white dark:bg-gray-900 border-t dark:border-gray-700 flex justify-between items-center px-4 py-2 shadow-md z-50">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <div className="flex items-center gap-2">
          {showBackButton && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="px-2 py-1 border-blue-300 dark:border-blue-500"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="px-2 py-1 border-gray-300 dark:border-gray-600"
          >
            {theme === 'dark' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
          </Button>
        </div>
      </nav>

      <main className="pt-4 pb-20 sm:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default App;
