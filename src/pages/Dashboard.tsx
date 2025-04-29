import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/ui/Header';
import Card from '../components/ui/Card';
import StatsCard from '../components/common/StatsCard';
import AlertCard from '../components/common/AlertCard';
import VaccinationCard from '../components/health/VaccinationCard';
import BreedingCard from '../components/breeding/BreedingCard';
import { Cog as Cow, AlertCircle, Droplets, Syringe, Heart, Calendar, Egg, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Animal, AnimalType, HealthRecord } from '../types';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  
  const upcomingVaccinations = state.healthRecords
    .filter(record => {
      if (!record.nextScheduledDate) return false;
      
      const today = new Date();
      const nextDate = new Date(record.nextScheduledDate);
      const diffTime = nextDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays >= 0 && diffDays <= 7;
    })
    .sort((a, b) => {
      return new Date(a.nextScheduledDate!).getTime() - new Date(b.nextScheduledDate!).getTime();
    })
    .slice(0, 3);
  
  const upcomingBreedings = state.breedingRecords
    .filter(record => {
      if (!record.expectedDueDate || record.successStatus !== 'pending') return false;
      
      const today = new Date();
      const dueDate = new Date(record.expectedDueDate);
      const diffTime = dueDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays >= 0 && diffDays <= 14;
    })
    .sort((a, b) => {
      return new Date(a.expectedDueDate!).getTime() - new Date(b.expectedDueDate!).getTime();
    })
    .slice(0, 3);
  
  const getAnimalDistribution = () => {
    const distribution: Record<AnimalType, number> = {
      cow: 0,
      goat: 0,
      sheep: 0,
      chicken: 0,
      duck: 0,
      pig: 0,
      buffalo: 0,
      other: 0
    };
    
    state.animals.forEach(animal => {
      distribution[animal.type]++;
    });
    
    return distribution;
  };
  
  const animalDistribution = getAnimalDistribution();
  
  const totalAnimals = state.animals.length;
  const maleCount = state.animals.filter(a => a.gender === 'male').length;
  const femaleCount = state.animals.filter(a => a.gender === 'female').length;
  
  const calculateRecentProduction = () => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const recentRecords = state.productionRecords.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= lastWeek && recordDate <= today;
    });
    
    const totalMilk = recentRecords
      .filter(r => r.type === 'milk')
      .reduce((sum, record) => sum + record.quantity, 0);
    
    const totalEggs = recentRecords
      .filter(r => r.type === 'eggs')
      .reduce((sum, record) => sum + record.quantity, 0);
    
    return { milk: totalMilk, eggs: totalEggs };
  };
  
  const recentProduction = calculateRecentProduction();
  
  const handleVaccinationComplete = (id: string) => {
    const record = state.healthRecords.find(r => r.id === id);
    if (!record) return;
    
    const notificationId = state.notifications.find(
      n => n.type === 'vaccination' && n.relatedId === id
    )?.id;
    
    if (notificationId) {
      dispatch({ 
        type: 'UPDATE_NOTIFICATION_STATUS', 
        payload: { id: notificationId, status: 'done' } 
      });
    }
    
    navigate('/health');
  };
  
  const handleBreedingUpdate = (id: string) => {
    navigate(`/breeding?id=${id}`);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Dashboard" />
      
      <main className="flex-grow px-4 md:px-6 pt-6 pb-8">
        {/* Stats Overview */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          <motion.div variants={item}>
            <StatsCard
              title="Total Animals"
              value={totalAnimals}
              icon={<Cow size={24} className="text-indigo-600" />}
              trend={totalAnimals > 0 ? 'up' : 'neutral'}
              trendValue="5%"
              bgColor="bg-indigo-50"
            />
          </motion.div>
          
          <motion.div variants={item}>
            <StatsCard
              title="Upcoming Vaccinations"
              value={upcomingVaccinations.length}
              icon={<Syringe size={24} className="text-red-600" />}
              trend={upcomingVaccinations.length > 0 ? 'warning' : 'neutral'}
              trendValue={upcomingVaccinations.length > 0 ? 'Action needed' : 'All clear'}
              bgColor="bg-red-50"
            />
          </motion.div>
          
          <motion.div variants={item}>
            <StatsCard
              title="Expected Births"
              value={upcomingBreedings.length}
              icon={<Heart size={24} className="text-pink-600" />}
              trend={upcomingBreedings.length > 0 ? 'up' : 'neutral'}
              trendValue={upcomingBreedings.length > 0 ? 'New births' : 'None'}
              bgColor="bg-pink-50"
            />
          </motion.div>
          
          <motion.div variants={item}>
            <StatsCard
              title="Weekly Milk"
              value={`${recentProduction.milk} L`}
              icon={<Droplets size={24} className="text-blue-600" />}
              trend={recentProduction.milk > 0 ? 'up' : 'neutral'}
              trendValue="+12%"
              bgColor="bg-blue-50"
            />
          </motion.div>
        </motion.div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Alerts Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card 
                title="Recent Alerts" 
                icon={<AlertCircle size={20} className="text-red-500" />}
                className="border-l-4 border-red-500"
              >
                <div className="space-y-3">
                  {state.notifications
                    .filter(n => n.status === 'pending')
                    .slice(0, 3)
                    .map(notification => (
                      <AlertCard
                        key={notification.id}
                        title={notification.title}
                        message={notification.description}
                        type={notification.type === 'vaccination' || notification.type === 'health' 
                          ? 'warning' 
                          : notification.type === 'breeding' 
                            ? 'info' 
                            : 'error'}
                        onDismiss={() => {
                          dispatch({ 
                            type: 'UPDATE_NOTIFICATION_STATUS', 
                            payload: { id: notification.id, status: 'done' } 
                          });
                        }}
                      />
                    ))}
                  
                  {state.notifications.filter(n => n.status === 'pending').length === 0 && (
                    <div className="text-center py-6 text-gray-400">
                      <CheckCircle size={24} className="mx-auto text-green-500 mb-2" />
                      <p>No pending alerts - everything looks good!</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Upcoming Vaccinations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card 
                title="Upcoming Vaccinations" 
                icon={<Syringe size={20} className="text-blue-500" />}
                className="border-l-4 border-blue-500"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingVaccinations.map((record, index) => (
                    <VaccinationCard
                      key={record.id}
                      record={record}
                      onMarkComplete={handleVaccinationComplete}
                      variant={index % 2 === 0 ? 'primary' : 'secondary'}
                    />
                  ))}
                  
                  {upcomingVaccinations.length === 0 && (
                    <div className="col-span-2 text-center py-6 text-gray-400">
                      <Calendar size={24} className="mx-auto text-blue-300 mb-2" />
                      <p>No vaccinations scheduled this week</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Expected Births */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card 
                title="Expected Births" 
                icon={<Heart size={20} className="text-pink-500" />}
                className="border-l-4 border-pink-500"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingBreedings.map((record, index) => (
                    <BreedingCard
                      key={record.id}
                      record={record}
                      onUpdate={handleBreedingUpdate}
                      variant={index % 2 === 0 ? 'primary' : 'secondary'}
                    />
                  ))}
                  
                  {upcomingBreedings.length === 0 && (
                    <div className="col-span-2 text-center py-6 text-gray-400">
                      <Heart size={24} className="mx-auto text-pink-300 mb-2" />
                      <p>No expected births in the next two weeks</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Animal Types */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card 
                title="Animal Distribution" 
                icon={<Cow size={20} className="text-indigo-500" />}
                className="border-l-4 border-indigo-500"
              >
                <div className="space-y-4">
                  {Object.entries(animalDistribution)
                    .filter(([_, count]) => count > 0)
                    .map(([type, count]) => (
                      <div key={type} className="flex items-center">
                        <div className="w-24 capitalize text-gray-700 font-medium">
                          {type === 'cow' ? 'Cattle' : 
                           type === 'buffalo' ? 'Buffalo' : 
                           type.charAt(0).toUpperCase() + type.slice(1)}
                        </div>
                        <div className="flex-grow mx-2 h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${(count / totalAnimals) * 100}%` }}
                          />
                        </div>
                        <div className="w-8 text-right font-medium text-gray-700">{count}</div>
                      </div>
                    ))}
                  
                  {totalAnimals === 0 && (
                    <div className="text-center py-6 text-gray-400">
                      <Cow size={24} className="mx-auto text-gray-300 mb-2" />
                      <p>No animals registered yet</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Gender Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card 
                title="Gender Distribution" 
                icon={<Heart size={20} className="text-pink-500" />}
                className="border-l-4 border-pink-500"
              >
                <div className="flex flex-col items-center py-4">
                  <div className="relative w-40 h-40 mb-4">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle cx="50" cy="50" r="45" fill="#f3f4f6" />
                      
                      {/* Female segment */}
                      <path 
                        d={totalAnimals === 0 ? 
                          "" : 
                          `M50,50 L50,5 A45,45 0 ${femaleCount > totalAnimals/2 ? 1 : 0},1 ${50 + 45 * Math.cos(2 * Math.PI * femaleCount/totalAnimals)},${50 - 45 * Math.sin(2 * Math.PI * femaleCount/totalAnimals)} Z`}
                        fill="#ec4899"
                      />
                      
                      {/* Male segment */}
                      <path 
                        d={totalAnimals === 0 ? 
                          "" : 
                          `M50,50 L${50 + 45 * Math.cos(2 * Math.PI * femaleCount/totalAnimals)},${50 - 45 * Math.sin(2 * Math.PI * femaleCount/totalAnimals)} A45,45 0 ${maleCount > totalAnimals/2 ? 1 : 0},1 50,5 Z`}
                        fill="#6366f1"
                      />
                    </svg>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{totalAnimals}</div>
                        <div className="text-xs text-gray-500">Total</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-6">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                      <span className="text-sm text-gray-700">Male: {maleCount}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
                      <span className="text-sm text-gray-700">Female: {femaleCount}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Weekly Production */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card 
                title="Weekly Production" 
                icon={<TrendingUp size={20} className="text-green-500" />}
                className="border-l-4 border-green-500"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-100">
                    <Droplets size={24} className="mx-auto text-blue-600 mb-2" />
                    <div className="text-2xl font-bold text-blue-800">{recentProduction.milk} L</div>
                    <div className="text-sm text-blue-600">Milk Production</div>
                    <div className="text-xs mt-1 text-blue-500">+12% from last week</div>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-4 text-center border border-amber-100">
                    <Egg size={24} className="mx-auto text-amber-600 mb-2" />
                    <div className="text-2xl font-bold text-amber-800">{recentProduction.eggs}</div>
                    <div className="text-sm text-amber-600">Eggs Collected</div>
                    <div className="text-xs mt-1 text-amber-500">+8% from last week</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;