import { useEffect } from 'react';
import { useStore } from './store/useStore';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Spirit from './pages/Spirit';
import Story from './pages/Story';
import Space from './pages/Space';
import Self from './pages/Self';

function App() {
  const { currentPillar, initializeApp } = useStore();

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  return (
    <div className="min-h-screen bg-ivory">
      <Header />

      <div className="flex flex-col md:flex-row">
        {/* Sidebar Navigation (Desktop) */}
        <aside className="hidden md:block md:w-64 md:sticky md:top-0 md:h-screen border-r border-gray-200">
          <Navigation />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {currentPillar === 'spirit' && <Spirit />}
          {currentPillar === 'story' && <Story />}
          {currentPillar === 'space' && <Space />}
          {currentPillar === 'self' && <Self />}
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
