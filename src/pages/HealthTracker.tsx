import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/ui/Header';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { Table, Thead, Tbody, Tr, Th, Td } from '../components/ui/Table';
import VaccinationCard from '../components/health/VaccinationCard';
import { Calendar, Plus, Syringe, Activity, Search, Filter, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { HealthRecord } from '../types';
import { useNavigate } from 'react-router-dom';
import Badge from '../components/ui/Badge';

// Calculate days until next health record
const calculateDaysUntil = (dateString: string | undefined) => {
  if (!dateString) return null;
  
  const targetDate = new Date(dateString);
  const today = new Date();
  
  // Reset time components to compare just the dates
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);
  
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

const HealthTracker: React.FC = () => {
  const { state } = useAppContext();
  const navigate = useNavigate();
  
  // State for filters and view mode
  const [searchQuery, setSearchQuery] = useState('');
  const [animalFilter, setAnimalFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  
  // Filter health records
  const filteredRecords = state.healthRecords.filter(record => {
    // Find the associated animal
    const animal = state.animals.find(a => a.id === record.animalId);
    if (!animal) return false;
    
    // Apply animal filter
    if (animalFilter !== 'all' && record.animalId !== animalFilter) {
      return false;
    }
    
    // Apply type filter
    if (typeFilter !== 'all' && record.type !== typeFilter) {
      return false;
    }
    
    // Apply search query
    const searchIn = [
      animal.name,
      animal.tagNumber || '',
      record.description,
      record.medicine || '',
      record.veterinarian || ''
    ].map(s => s.toLowerCase());
    
    return searchIn.some(text => text.includes(searchQuery.toLowerCase()));
  });
  
  // Sort records by date (most recent first)
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  // Get upcoming health events (within 30 days)
  const upcomingEvents = state.healthRecords
    .filter(record => {
      if (!record.nextScheduledDate) return false;
      const days = calculateDaysUntil(record.nextScheduledDate);
      return days !== null && days >= 0 && days <= 30;
    })
    .sort((a, b) => {
      return new Date(a.nextScheduledDate!).getTime() - new Date(b.nextScheduledDate!).getTime();
    });
  
  // Get overdue health events
  const overdueEvents = state.healthRecords
    .filter(record => {
      if (!record.nextScheduledDate) return false;
      const days = calculateDaysUntil(record.nextScheduledDate);
      return days !== null && days < 0;
    })
    .sort((a, b) => {
      return new Date(a.nextScheduledDate!).getTime() - new Date(b.nextScheduledDate!).getTime();
    });

  // Add new health record
  const handleAddHealthRecord = () => {
    navigate('/health/add');
  };
  
  // View health record details
  const handleViewRecord = (id: string) => {
    navigate(`/health/${id}`);
  };
  
  // Handle completing a vaccination
  const handleVaccinationComplete = (id: string) => {
    // In real app, this would update the record and create a new scheduled one
    console.log('Mark vaccination complete:', id);
  };
  
  // Get animal options for filter dropdown
  const animalOptions = [
    { value: 'all', label: 'All Animals' },
    ...state.animals.map(animal => ({
      value: animal.id,
      label: `${animal.name} (${animal.tagNumber || animal.id})`
    }))
  ];
  
  // Health record type options
  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'vaccination', label: 'Vaccination' },
    { value: 'deworming', label: 'Deworming' },
    { value: 'treatment', label: 'Treatment' },
    { value: 'checkup', label: 'Check-up' }
  ];
  
  // Get icon for record type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vaccination':
        return <Syringe size={16} className="text-green-600" />;
      case 'deworming':
        return <Activity size={16} className="text-purple-600" />;
      case 'treatment':
        return <Activity size={16} className="text-red-600" />;
      case 'checkup':
        return <Activity size={16} className="text-blue-600" />;
      default:
        return <Activity size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Health Tracker" />
      
      <main className="flex-grow p-4 md:p-6 max-w-7xl mx-auto w-full">
        {/* Page header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Animal Health Management</h1>
            <p className="text-gray-600">
              {state.healthRecords.length} health record{state.healthRecords.length !== 1 ? 's' : ''} tracked
            </p>
          </div>
          
          <div className="flex gap-3">
            {/* View mode toggle */}
            <div className="flex rounded-md overflow-hidden border border-gray-200 bg-white">
              <button
                className={`px-3 py-1.5 text-sm flex items-center gap-1 ${viewMode === 'table' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setViewMode('table')}
              >
                <span>Table</span>
              </button>
              <button
                className={`px-3 py-1.5 text-sm flex items-center gap-1 ${viewMode === 'cards' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setViewMode('cards')}
              >
                <span>Cards</span>
              </button>
            </div>
            
            <Button 
              variant="primary" 
              onClick={handleAddHealthRecord}
              icon={<Plus size={18} className="mr-1" />}
              className="whitespace-nowrap"
            >
              New Record
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - left side (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <Card className="p-4 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Search & Filter</h3>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-5">
                  <Input
                    placeholder="Search records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={<Search size={18} className="text-gray-400" />}
                  />
                </div>
                
                <div className="md:col-span-4">
                  <Select
                    value={animalFilter}
                    onChange={(e) => setAnimalFilter(e.target.value)}
                    options={animalOptions}
                    icon={<Filter size={16} className="text-gray-400" />}
                  />
                </div>
                
                <div className="md:col-span-3">
                  <Select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    options={typeOptions}
                    icon={<Activity size={16} className="text-gray-400" />}
                  />
                </div>
              </div>
            </Card>
            
            {/* Results header */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">
                {filteredRecords.length} record{filteredRecords.length !== 1 ? 's' : ''} found
              </h3>
              {(searchQuery || animalFilter !== 'all' || typeFilter !== 'all') && (
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setAnimalFilter('all');
                    setTypeFilter('all');
                  }}
                  className="text-sm text-green-600 hover:text-green-800 flex items-center"
                >
                  <Filter size={16} className="mr-1" />
                  Clear filters
                </button>
              )}
            </div>
            
            {/* Health Records (Table or Card view) */}
            {viewMode === 'table' ? (
              <Card className="border border-gray-200 overflow-hidden">
                <Table className="min-w-full">
                  <Thead className="bg-gray-50">
                    <Tr>
                      <Th>Date</Th>
                      <Th>Animal</Th>
                      <Th>Type</Th>
                      <Th>Description</Th>
                      <Th>Status</Th>
                      <Th>Next Due</Th>
                    </Tr>
                  </Thead>
                  <Tbody className="divide-y divide-gray-200">
                    {sortedRecords.length > 0 ? (
                      sortedRecords.map(record => {
                        const animal = state.animals.find(a => a.id === record.animalId);
                        const daysUntilNext = calculateDaysUntil(record.nextScheduledDate);
                        
                        return (
                          <Tr 
                            key={record.id}
                            onClick={() => handleViewRecord(record.id)}
                            className="hover:bg-gray-50 cursor-pointer transition-colors"
                          >
                            <Td className="whitespace-nowrap">
                              <div className="flex items-center">
                                <Calendar size={16} className="mr-2 text-gray-400" />
                                {new Date(record.date).toLocaleDateString()}
                              </div>
                            </Td>
                            <Td>
                              <div className="font-medium text-gray-900">{animal?.name || 'Unknown'}</div>
                              {animal?.tagNumber && (
                                <div className="text-xs text-gray-500">#{animal.tagNumber}</div>
                              )}
                            </Td>
                            <Td>
                              <div className="flex items-center gap-2">
                                {getTypeIcon(record.type)}
                                <span className="capitalize">{record.type}</span>
                              </div>
                            </Td>
                            <Td className="max-w-xs truncate">{record.description}</Td>
                            <Td>
                              {daysUntilNext === null ? (
                                <Badge variant="light">Completed</Badge>
                              ) : daysUntilNext < 0 ? (
                                <Badge variant="danger" icon={<AlertTriangle size={14} />}>
                                  Overdue
                                </Badge>
                              ) : daysUntilNext <= 7 ? (
                                <Badge variant="warning" icon={<Clock size={14} />}>
                                  Due Soon
                                </Badge>
                              ) : (
                                <Badge variant="success" icon={<CheckCircle size={14} />}>
                                  Upcoming
                                </Badge>
                              )}
                            </Td>
                            <Td>
                              {record.nextScheduledDate ? (
                                <div className="flex items-center">
                                  {new Date(record.nextScheduledDate).toLocaleDateString()}
                                  {daysUntilNext !== null && (
                                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                                      daysUntilNext < 0 
                                        ? 'bg-red-100 text-red-800' 
                                        : daysUntilNext <= 7 
                                          ? 'bg-yellow-100 text-yellow-800' 
                                          : 'bg-green-100 text-green-800'
                                    }`}>
                                      {daysUntilNext >= 0 ? `${daysUntilNext}d` : 'Overdue'}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-gray-400">N/A</span>
                              )}
                            </Td>
                          </Tr>
                        );
                      })
                    ) : (
                      <Tr>
                        <Td colSpan={6} className="text-center py-12">
                          <div className="flex flex-col items-center justify-center text-gray-500">
                            <Search size={40} className="mb-3 text-gray-300" />
                            <h4 className="font-medium text-gray-700">No records found</h4>
                            <p className="max-w-md mt-1">
                              {state.healthRecords.length === 0 
                                ? "You haven't added any health records yet."
                                : "No records match your current filters."}
                            </p>
                            {state.healthRecords.length === 0 && (
                              <Button 
                                variant="primary" 
                                onClick={handleAddHealthRecord}
                                icon={<Plus size={16} className="mr-1" />}
                                className="mt-4"
                              >
                                Create First Record
                              </Button>
                            )}
                          </div>
                        </Td>
                      </Tr>
                    )}
                  </Tbody>
                </Table>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedRecords.length > 0 ? (
                  sortedRecords.map(record => {
                    const animal = state.animals.find(a => a.id === record.animalId);
                    const daysUntilNext = calculateDaysUntil(record.nextScheduledDate);
                    
                    return (
                      <Card 
                        key={record.id} 
                        className="border border-gray-200 hover:border-green-200 hover:shadow-sm transition-all cursor-pointer"
                        onClick={() => handleViewRecord(record.id)}
                      >
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">
                              {record.description}
                            </h3>
                            <p className="text-sm text-gray-600 truncate">
                              {animal?.name} {animal?.tagNumber && `(#${animal.tagNumber})`}
                            </p>
                          </div>
                          <div className={`p-2 rounded-full ${
                            record.type === 'vaccination' ? 'bg-green-100 text-green-600' :
                            record.type === 'deworming' ? 'bg-purple-100 text-purple-600' :
                            record.type === 'treatment' ? 'bg-red-100 text-red-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {getTypeIcon(record.type)}
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar size={14} className="mr-2 text-gray-400" />
                                <span>{new Date(record.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                            {daysUntilNext !== null && record.nextScheduledDate && (
                              <div className={`text-xs px-2 py-1 rounded-full ${
                                daysUntilNext < 0 
                                  ? 'bg-red-100 text-red-800' 
                                  : daysUntilNext <= 7 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-green-100 text-green-800'
                              }`}>
                                {daysUntilNext >= 0 ? `Due in ${daysUntilNext}d` : 'Overdue'}
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })
                ) : (
                  <div className="col-span-2">
                    <Card className="text-center py-8 border border-gray-200">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <Search size={48} className="mb-4 text-gray-300" />
                        <h4 className="text-lg font-medium text-gray-700 mb-1">No health records found</h4>
                        <p className="max-w-md mb-4">
                          {state.healthRecords.length === 0 
                            ? "Start by adding your first health record."
                            : "Try adjusting your search filters."}
                        </p>
                        <Button 
                          variant="primary" 
                          onClick={handleAddHealthRecord}
                          icon={<Plus size={16} className="mr-1" />}
                        >
                          Add Health Record
                        </Button>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Sidebar - right side (1/3) */}
          <div className="space-y-6">
            {/* Overdue Events */}
            {overdueEvents.length > 0 && (
              <Card title="Overdue Health Events" icon={<AlertTriangle size={18} className="text-red-600" />}>
                <div className="space-y-3">
                  {overdueEvents.slice(0, 3).map(record => (
                    <VaccinationCard
                      key={record.id}
                      record={record}
                      onMarkComplete={handleVaccinationComplete}
                      variant="danger"
                    />
                  ))}
                  {overdueEvents.length > 3 && (
                    <Button 
                      variant="light" 
                      onClick={() => {
                        setTypeFilter('all');
                        setAnimalFilter('all');
                        setSearchQuery('overdue');
                      }}
                      className="w-full mt-2"
                    >
                      View All {overdueEvents.length} Overdue
                    </Button>
                  )}
                </div>
              </Card>
            )}
            
            {/* Upcoming Health Events */}
            <Card 
              title={`Upcoming (${upcomingEvents.length})`} 
              icon={<Clock size={18} className="text-yellow-600" />}
            >
              <div className="space-y-3">
                {upcomingEvents.length > 0 ? (
                  <>
                    {upcomingEvents.slice(0, 3).map(record => (
                      <VaccinationCard
                        key={record.id}
                        record={record}
                        onMarkComplete={handleVaccinationComplete}
                        variant="warning"
                      />
                    ))}
                    {upcomingEvents.length > 3 && (
                      <Button 
                        variant="light" 
                        onClick={() => {
                          setTypeFilter('all');
                          setAnimalFilter('all');
                          setSearchQuery('upcoming');
                        }}
                        className="w-full mt-2"
                      >
                        View All Upcoming
                      </Button>
                    )}
                  </>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    No upcoming health events in the next 30 days
                  </div>
                )}
              </div>
            </Card>
            
            {/* Health Statistics */}
            <Card title="Health Overview" icon={<Activity size={18} className="text-green-600" />}>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center gap-2 text-green-800 mb-1">
                    <Syringe size={16} />
                    <div className="text-sm font-medium">Vaccinations</div>
                  </div>
                  <div className="text-2xl font-bold text-green-800">
                    {state.healthRecords.filter(r => r.type === 'vaccination').length}
                  </div>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="flex items-center gap-2 text-purple-800 mb-1">
                    <Activity size={16} />
                    <div className="text-sm font-medium">Deworming</div>
                  </div>
                  <div className="text-2xl font-bold text-purple-800">
                    {state.healthRecords.filter(r => r.type === 'deworming').length}
                  </div>
                </div>
                
                <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                  <div className="flex items-center gap-2 text-red-800 mb-1">
                    <Activity size={16} />
                    <div className="text-sm font-medium">Treatments</div>
                  </div>
                  <div className="text-2xl font-bold text-red-800">
                    {state.healthRecords.filter(r => r.type === 'treatment').length}
                  </div>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-2 text-blue-800 mb-1">
                    <Activity size={16} />
                    <div className="text-sm font-medium">Check-ups</div>
                  </div>
                  <div className="text-2xl font-bold text-blue-800">
                    {state.healthRecords.filter(r => r.type === 'checkup').length}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HealthTracker;