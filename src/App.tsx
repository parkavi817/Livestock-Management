import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/ui/Sidebar';
import Dashboard from './pages/Dashboard';
import AnimalList from './pages/AnimalList';
import HealthTracker from './pages/HealthTracker';
import Breeding from './pages/Breeding';
import KnowledgeCenter from './pages/KnowledgeCenter';
import MarketPrices from './pages/MarketPrices';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/animals" element={<AnimalList />} />
              <Route path="/health" element={<HealthTracker />} />
              <Route path="/breeding" element={<Breeding />} />
              <Route path="/knowledge" element={<KnowledgeCenter />} />
              <Route path="/market" element={<MarketPrices />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;