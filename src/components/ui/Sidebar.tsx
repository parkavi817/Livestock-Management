import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Cat,
  Stethoscope,
  Heart,
  LineChart,
  BookOpen,
  ShoppingCart,
  Settings,
  Bell,
  Menu,
  X,
  Globe
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useLanguage } from '../../hooks/useLanguage';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { state } = useAppContext();
  const { t } = useLanguage();
  const pendingNotificationsCount = state.notifications.filter(n => n.status === 'pending').length;

  const navItems = [
    { name: t('common.dashboard'), path: '/', icon: <LayoutDashboard size={18} /> },
    { name: t('common.animals'), path: '/animals', icon: <Cat size={18} /> },
    { name: t('common.health'), path: '/health', icon: <Stethoscope size={18} /> },
    { name: t('common.breeding'), path: '/breeding', icon: <Heart size={18} /> },
    { name: t('common.knowledge'), path: '/knowledge', icon: <BookOpen size={18} /> },
    { name: t('common.market'), path: '/market', icon: <ShoppingCart size={18} /> },
    { name: t('common.settings'), path: '/settings', icon: <Settings size={18} /> },
    {
      name: t('common.notifications'),
      path: '/notifications',
      icon: <Bell size={18} />,
      badge: pendingNotificationsCount > 0 ? pendingNotificationsCount : null
    }
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-green-700 text-white p-2 rounded-md shadow-lg"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-green-900 text-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} md:relative md:translate-x-0`}
      >
        <div className="flex flex-col h-full p-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Cat size={24} />
              <h1 className="text-lg font-semibold">LiveStock Pro</h1>
            </div>
            <button
              className="md:hidden text-white hover:bg-green-700 rounded-full p-1 transition"
              onClick={closeSidebar}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-grow overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={closeSidebar}
                    className={`flex items-center justify-between p-2 rounded-md transition-colors hover:bg-green-700 ${
                      location.pathname === item.path ? 'bg-green-700' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span className="text-sm">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-red-500 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Language info */}
          <div className="mt-4 border-t border-green-700 pt-3 px-2">
            <div className="flex items-center space-x-2 text-sm opacity-80">
              <Globe size={16} />
              <span>
                {state.language === 'english'
                  ? 'English'
                  : state.language === 'hindi'
                  ? 'हिन्दी'
                  : 'অসমীয়া'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
