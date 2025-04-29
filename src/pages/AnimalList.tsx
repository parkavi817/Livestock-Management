import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/ui/Header';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import AnimalCard from '../components/animals/AnimalCard';
import { Plus, Search, FilterX } from 'lucide-react';
import { AnimalType } from '../types';
import { useNavigate } from 'react-router-dom';

const AnimalList: React.FC = () => {
  const { state } = useAppContext();
  const navigate = useNavigate();
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [animalTypeFilter, setAnimalTypeFilter] = useState<string>('all');
  
  // Filter animals based on search and type
  const filteredAnimals = state.animals.filter(animal => {
    const matchesSearch = 
      animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (animal.tagNumber && animal.tagNumber.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = animalTypeFilter === 'all' || animal.type === animalTypeFilter;
    
    return matchesSearch && matchesType;
  });
  
  // Handle adding a new animal
  const handleAddAnimal = () => {
    navigate('/animals/add');
  };
  
  // Handle editing an animal
  const handleEditAnimal = (id: string) => {
    navigate(`/animals/edit/${id}`);
  };
  
  // Handle deleting an animal
  const handleDeleteAnimal = (id: string) => {
    // In a real app, would show a confirmation dialog
    console.log('Delete animal:', id);
  };
  
  // Handle viewing an animal profile
  const handleViewAnimal = (id: string) => {
    navigate(`/animals/${id}`);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setAnimalTypeFilter('all');
  };
  
  // Animal type options for filter dropdown
  const animalTypeOptions = [
    { value: 'all', label: 'All Animals' },
    { value: 'cow', label: 'Cows' },
    { value: 'buffalo', label: 'Buffaloes' },
    { value: 'goat', label: 'Goats' },
    { value: 'sheep', label: 'Sheep' },
    { value: 'chicken', label: 'Chickens' },
    { value: 'duck', label: 'Ducks' },
    { value: 'pig', label: 'Pigs' },
    { value: 'other', label: 'Other' },
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header title="Animal Management" />
      
      <main className="flex-grow p-6">
        {/* Top controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold">Animal List</h2>
          
          <Button 
            variant="primary" 
            onClick={handleAddAnimal}
            icon={<Plus size={18} />}
          >
            Add Animal
          </Button>
        </div>
        
        {/* Filters and search */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search by name, breed, or tag"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} className="text-gray-400" />}
            />
            
            <Select
              value={animalTypeFilter}
              onChange={(e) => setAnimalTypeFilter(e.target.value)}
              options={animalTypeOptions}
            />
            
            <Button
              variant="light"
              onClick={clearFilters}
              className="w-full md:w-auto"
              icon={<FilterX size={18} />}
            >
              Clear Filters
            </Button>
          </div>
        </div>
        
        {/* Animal cards grid */}
        <div>
          {filteredAnimals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAnimals.map(animal => (
                <AnimalCard 
                  key={animal.id}
                  animal={animal}
                  onEdit={handleEditAnimal}
                  onDelete={handleDeleteAnimal}
                  onSelect={handleViewAnimal}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-lg font-medium text-gray-700 mb-2">No animals found</h3>
              <p className="text-gray-500 mb-4">
                {state.animals.length === 0 
                  ? "You haven't added any animals yet."
                  : "No animals match your search criteria."}
              </p>
              
              {state.animals.length === 0 && (
                <Button 
                  variant="primary" 
                  onClick={handleAddAnimal}
                  icon={<Plus size={18} />}
                >
                  Add Your First Animal
                </Button>
              )}
              
              {state.animals.length > 0 && (
                <Button 
                  variant="light" 
                  onClick={clearFilters}
                  icon={<FilterX size={18} />}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AnimalList;