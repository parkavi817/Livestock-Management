import React from 'react';
import { Bell, Moon, Sun } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { state } = useAppContext();
  const navigate = useNavigate();
  const pendingNotificationsCount = state.notifications.filter(n => n.status === 'pending').length;

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      
      <div className="flex items-center space-x-4">
        {/* Notifications Icon */}
        <button 
          className="relative p-2 rounded-full hover:bg-gray-100"
          onClick={() => navigate('/notifications')}
          aria-label="Notifications"
        >
          <Bell size={20} />
          {pendingNotificationsCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {pendingNotificationsCount}
            </span>
          )}
        </button>
        
        {/* Theme Toggle Placeholder (not functional in this version) */}
        <button 
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Toggle theme"
        >
          <Sun size={20} className="hidden dark:block" />
          <Moon size={20} className="block dark:hidden" />
        </button>
        
        {/* User Avatar */}
        <div className="relative">
          <button className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center">
            <span className="font-medium text-sm">FL</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;