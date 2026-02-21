import { useEffect } from 'react';
import { useStore } from './store/useStore';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Flow from './pages/Flow';
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
    <div className="min-h-screen bg-dark relative overflow-hidden">
      {/* Ambient Orbs - Observatory Effect */}
      <div className="orb-spirit w-96 h-96 -top-48 left-1/4 opacity-60" />
      <div className="orb-self w-80 h-80 -bottom-40 right-1/4 opacity-50" />
      <div className="orb-space w-64 h-64 top-1/3 -left-32 opacity-40" />
      <div className="orb-story w-72 h-72 top-1/2 -right-36 opacity-40" />

      <div className="relative z-10 flex flex-col md:flex-row">
        {/* Sidebar Navigation (Desktop) */}
        <aside className="hidden md:block md:w-64 md:sticky md:top-0 md:h-screen border-r border-glass-border">
          <Navigation />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {currentPage === 'flow' && <Flow />}
          {currentPage === 'stats' && <Stats />}
          {currentPage === 'about' && <About />}
        </main>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <div className="md:hidden relative z-10">
        <Navigation />
      </div>
    </div>
  );
}

export default App;
