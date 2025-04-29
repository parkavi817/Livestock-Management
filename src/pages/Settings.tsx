import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/ui/Header';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Globe, BellRing, User, DatabaseBackup, Cloud, BellOff } from 'lucide-react';
import { Language } from '../types';

const Settings: React.FC = () => {
  const { state, dispatch } = useAppContext();
  
  // Mock backup functionality
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [lastBackup, setLastBackup] = useState<string | null>(null);
  
  // Handle language change
  const changeLanguage = (language: Language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };
  
  // Simulate backup process
  const handleBackup = () => {
    setIsBackingUp(true);
    
    // Simulate backup delay
    setTimeout(() => {
      setIsBackingUp(false);
      setLastBackup(new Date().toLocaleString());
    }, 2000);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header title="Settings" />
      
      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Language Settings */}
          <Card title="Language Settings" icon={<Globe size={20} />} className="lg:col-span-2">
            <p className="text-gray-600 mb-4">
              Change the display language for the application. All content will be translated.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button 
                className={`p-4 rounded-lg border flex items-center justify-center ${
                  state.language === 'english' 
                    ? 'bg-green-50 border-green-500 text-green-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => changeLanguage('english')}
              >
                <span className="font-medium">English</span>
              </button>
              
              <button 
                className={`p-4 rounded-lg border flex items-center justify-center ${
                  state.language === 'hindi' 
                    ? 'bg-green-50 border-green-500 text-green-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => changeLanguage('hindi')}
              >
                <span className="font-medium">हिन्दी</span>
              </button>
              
              <button 
                className={`p-4 rounded-lg border flex items-center justify-center ${
                  state.language === 'assamese' 
                    ? 'bg-green-50 border-green-500 text-green-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => changeLanguage('assamese')}
              >
                <span className="font-medium">অসমীয়া</span>
              </button>
            </div>
          </Card>
          
          {/* Notification Settings */}
          <Card title="Notification Settings" icon={<BellRing size={20} />}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Vaccination Reminders</p>
                  <p className="text-sm text-gray-600">Get alerts for upcoming vaccinations</p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input 
                    type="checkbox" 
                    id="vaccination-toggle"
                    className="opacity-0 w-0 h-0"
                    defaultChecked={true}
                  />
                  <label 
                    htmlFor="vaccination-toggle"
                    className="block absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all duration-300 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-6"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Breeding Alerts</p>
                  <p className="text-sm text-gray-600">Get alerts for breeding events</p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input 
                    type="checkbox" 
                    id="breeding-toggle"
                    className="opacity-0 w-0 h-0"
                    defaultChecked={true}
                  />
                  <label 
                    htmlFor="breeding-toggle"
                    className="block absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all duration-300 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-6"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Market Price Updates</p>
                  <p className="text-sm text-gray-600">Get alerts for price changes</p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input 
                    type="checkbox" 
                    id="market-toggle"
                    className="opacity-0 w-0 h-0"
                    defaultChecked={false}
                  />
                  <label 
                    htmlFor="market-toggle"
                    className="block absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all duration-300 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-6"
                  />
                </div>
              </div>
              
              <div className="pt-3">
                <Button 
                  variant="light" 
                  size="sm"
                  className="w-full"
                  icon={<BellOff size={16} />}
                >
                  Mute All Notifications
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Data Management */}
          <Card title="Data Management" icon={<DatabaseBackup size={20} />} className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Backup Data</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Create a backup of all your farm data. This allows you to restore your data if needed.
                </p>
                
                <Button 
                  variant="primary" 
                  onClick={handleBackup}
                  isLoading={isBackingUp}
                  icon={<Cloud size={16} />}
                >
                  Create Backup
                </Button>
                
                {lastBackup && (
                  <p className="text-sm text-gray-500 mt-2">
                    Last backup: {lastBackup}
                  </p>
                )}
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Export Data</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Export your data in CSV format for use in other applications or for record keeping.
                </p>
                
                <div className="space-y-2">
                  <Button 
                    variant="light" 
                    size="sm"
                    className="w-full"
                  >
                    Export Animals
                  </Button>
                  
                  <Button 
                    variant="light" 
                    size="sm"
                    className="w-full"
                  >
                    Export Health Records
                  </Button>
                  
                  <Button 
                    variant="light" 
                    size="sm"
                    className="w-full"
                  >
                    Export Production Data
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Profile Settings (placeholder) */}
          <Card title="Profile Settings" icon={<User size={20} />}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-16 w-16 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold">
                FL
              </div>
              
              <div>
                <h3 className="font-medium text-lg">Farmer User</h3>
                <p className="text-gray-600">farmer@example.com</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                variant="light" 
                size="sm"
                className="w-full"
              >
                Edit Profile
              </Button>
              
              <Button 
                variant="light" 
                size="sm"
                className="w-full"
              >
                Change Password
              </Button>
              
              <Button 
                variant="danger" 
                size="sm"
                className="w-full"
              >
                Log Out
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;