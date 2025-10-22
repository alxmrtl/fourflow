import { useEffect } from 'react';
import { useStore } from './store/useStore';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Flow from './pages/Flow';
import Setup from './pages/Setup';
import Stats from './pages/Stats';
import About from './pages/About';
import FocusMode from './pages/FocusMode';

function App() {
  const { currentPage, isInFocusMode, initializeApp } = useStore();

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  // Full-screen focus mode
  if (isInFocusMode) {
    return <FocusMode />;
  }

  return (
    <div className="min-h-screen bg-ivory">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar Navigation (Desktop) */}
        <aside className="hidden md:block md:w-64 md:sticky md:top-0 md:h-screen border-r border-gray-200">
          <Navigation />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {currentPage === 'flow' && <Flow />}
          {currentPage === 'setup' && <Setup />}
          {currentPage === 'stats' && <Stats />}
          {currentPage === 'about' && <About />}
        </main>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <div className="md:hidden">
        <Navigation />
      </div>
    </div>
  );
}

export default App;
