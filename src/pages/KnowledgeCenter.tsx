import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/ui/Header';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import KnowledgeCard from '../components/knowledge/KnowledgeCard';
import { Search, BookOpen, XCircle, AlertTriangle, ArrowLeft, Filter, Plus, Minus } from 'lucide-react';
import { AnimalType, DiseaseGuide, KnowledgeArticle } from '../types';

const KnowledgeCenter: React.FC = () => {
  const { state } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [animalTypeFilter, setAnimalTypeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [viewMode, setViewMode] = useState<'articles' | 'diseases'>('articles');
  const [selectedDisease, setSelectedDisease] = useState<DiseaseGuide | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get all symptoms from disease guides
  const allSymptoms: string[] = Array.from(
    new Set(
      state.diseaseGuides.flatMap(guide => guide.symptoms)
    )
  ).sort();
  
  // Filter articles based on search, animal type, and category
  const filteredArticles = state.knowledgeArticles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAnimalType = 
      animalTypeFilter === 'all' || 
      article.animalTypes.includes(animalTypeFilter as AnimalType);
    
    const matchesCategory = 
      categoryFilter === 'all' || 
      article.category === categoryFilter;
    
    return matchesSearch && matchesAnimalType && matchesCategory;
  });
  
  // Filter diseases based on selected symptoms
  const filteredDiseases = state.diseaseGuides.filter(disease => {
    if (selectedSymptoms.length === 0) return true;
    
    // Return diseases that match at least one selected symptom
    return selectedSymptoms.some(symptom => 
      disease.symptoms.includes(symptom)
    );
  });
  
  // Handle article selection
  const handleArticleSelect = (id: string) => {
    const article = state.knowledgeArticles.find(a => a.id === id);
    if (article) {
      setSelectedArticle(article);
    }
  };
  
  // Handle disease selection
  const handleDiseaseSelect = (id: string) => {
    const disease = state.diseaseGuides.find(d => d.id === id);
    if (disease) {
      setSelectedDisease(disease);
    }
  };
  
  // Toggle symptom selection
  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };
  
  // Clear all selected symptoms
  const clearSymptoms = () => {
    setSelectedSymptoms([]);
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setAnimalTypeFilter('all');
    setCategoryFilter('all');
    setSelectedSymptoms([]);
  };
  
  // Animal type options for filter
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
  
  // Category options for filter
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'feeding', label: 'Feeding' },
    { value: 'shelter', label: 'Shelter' },
    { value: 'hygiene', label: 'Hygiene' },
    { value: 'breeding', label: 'Breeding' },
    { value: 'health', label: 'Health' },
    { value: 'general', label: 'General' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Knowledge Center" />
      
      <main className="flex-grow p-4 md:p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          {selectedArticle || selectedDisease ? (
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm"
                className="mr-3 hover:bg-gray-100"
                icon={<ArrowLeft size={18} />}
                onClick={() => {
                  setSelectedArticle(null);
                  setSelectedDisease(null);
                }}
              >
                Back
              </Button>
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedArticle?.title || selectedDisease?.name}
              </h2>
            </div>
          ) : (
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800">Knowledge Resources</h2>
              <p className="text-sm text-gray-500">
                {viewMode === 'articles' 
                  ? 'Browse educational articles and guides' 
                  : 'Identify diseases based on symptoms'}
              </p>
            </div>
          )}
          
          {!selectedArticle && !selectedDisease && (
            <div className="flex gap-3">
              <div className="flex rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <button
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'articles' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setViewMode('articles')}
                >
                  Articles
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'diseases' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setViewMode('diseases')}
                >
                  Disease Guide
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Selected Article Detail View */}
        {selectedArticle && (
          <Card className="border-0 shadow-sm">
            <div className="prose max-w-none">
              {selectedArticle.imageUrl && (
                <img 
                  src={selectedArticle.imageUrl} 
                  alt={selectedArticle.title} 
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              
              <h1 className="text-2xl font-bold text-gray-800">{selectedArticle.title}</h1>
              
              <div className="flex flex-wrap gap-2 my-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium capitalize">
                  {selectedArticle.category}
                </span>
                
                {selectedArticle.animalTypes.map(type => (
                  <span key={type} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                    {type}
                  </span>
                ))}
              </div>
              
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {selectedArticle.content}
              </div>
            </div>
          </Card>
        )}
        
        {/* Selected Disease Detail View */}
        {selectedDisease && (
          <Card className="border-0 shadow-sm">
            <div className="prose max-w-none">
              <h1 className="flex items-center text-2xl font-bold text-gray-800">
                <AlertTriangle size={24} className="text-yellow-500 mr-2" />
                {selectedDisease.name}
              </h1>
              
              <div className="flex flex-wrap gap-2 my-4">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  Disease
                </span>
                
                {selectedDisease.animalTypes.map(type => (
                  <span key={type} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                    {type}
                  </span>
                ))}
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Symptoms</h2>
                <ul className="list-disc pl-5 space-y-1 mt-3">
                  {selectedDisease.symptoms.map((symptom, index) => (
                    <li key={index} className="text-gray-700">{symptom}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Treatment</h2>
                <p className="text-gray-700 mt-3 whitespace-pre-line">{selectedDisease.treatment}</p>
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Prevention</h2>
                <p className="text-gray-700 mt-3 whitespace-pre-line">{selectedDisease.prevention}</p>
              </div>
              
              {selectedDisease.emergencyCare && (
                <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-700 flex items-center">
                    <AlertTriangle size={20} className="mr-2" />
                    Emergency Care
                  </h3>
                  <p className="text-gray-700 mt-2 whitespace-pre-line">{selectedDisease.emergencyCare}</p>
                </div>
              )}
            </div>
          </Card>
        )}
        
        {/* Article List View */}
        {!selectedArticle && !selectedDisease && viewMode === 'articles' && (
          <>
            {/* Search and Filters */}
            <Card className="mb-6 border-0 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={<Search size={18} className="text-gray-400" />}
                    className="flex-grow"
                  />
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowFilters(!showFilters)}
                    icon={<Filter size={18} />}
                  >
                    Filters
                  </Button>
                </div>
                
                {showFilters && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <Select
                      value={animalTypeFilter}
                      onChange={(e) => setAnimalTypeFilter(e.target.value)}
                      options={animalTypeOptions}
                      label="Animal Type"
                    />
                    
                    <Select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      options={categoryOptions}
                      label="Category"
                    />
                  </div>
                )}
              </div>
            </Card>
            
            {/* Active Filters */}
            {(searchQuery || animalTypeFilter !== 'all' || categoryFilter !== 'all') && (
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-sm text-gray-500">Active filters:</span>
                {searchQuery && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Search: "{searchQuery}"
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="ml-1.5 text-blue-600 hover:text-blue-800"
                    >
                      <XCircle size={14} />
                    </button>
                  </span>
                )}
                {animalTypeFilter !== 'all' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                    {animalTypeFilter}
                    <button 
                      onClick={() => setAnimalTypeFilter('all')}
                      className="ml-1.5 text-blue-600 hover:text-blue-800"
                    >
                      <XCircle size={14} />
                    </button>
                  </span>
                )}
                {categoryFilter !== 'all' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                    {categoryFilter}
                    <button 
                      onClick={() => setCategoryFilter('all')}
                      className="ml-1.5 text-blue-600 hover:text-blue-800"
                    >
                      <XCircle size={14} />
                    </button>
                  </span>
                )}
                <button 
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all
                </button>
              </div>
            )}
            
            {/* Articles Grid */}
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map(article => (
                  <KnowledgeCard
                    key={article.id}
                    article={article}
                    onClick={handleArticleSelect}
                  />
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-sm">
                <div className="text-center py-12">
                  <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No articles found</h3>
                  <p className="text-gray-500 mb-4 max-w-md mx-auto">
                    Try adjusting your search criteria or clear the filters to see more results.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={clearAllFilters}
                    icon={<XCircle size={16} />}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </Card>
            )}
          </>
        )}
        
        {/* Disease Guide View */}
        {!selectedArticle && !selectedDisease && viewMode === 'diseases' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Symptom Selection Panel */}
            <Card title="Filter by Symptoms" className="lg:col-span-1 border-0 shadow-sm">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Select symptoms to find matching diseases
                  </p>
                  {selectedSymptoms.length > 0 && (
                    <button 
                      onClick={clearSymptoms}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                      <XCircle size={14} className="mr-1" />
                      Clear
                    </button>
                  )}
                </div>
                
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                  {allSymptoms.map((symptom) => (
                    <button
                      key={symptom}
                      onClick={() => toggleSymptom(symptom)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedSymptoms.includes(symptom)
                          ? 'bg-green-50 border border-green-200 text-green-800'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{symptom}</span>
                      {selectedSymptoms.includes(symptom) ? (
                        <Minus size={14} className="text-green-600" />
                      ) : (
                        <Plus size={14} className="text-gray-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
            
            {/* Disease List */}
            <div className="lg:col-span-3">
              <Card title={selectedSymptoms.length > 0 ? "Matching Diseases" : "All Diseases"} className="border-0 shadow-sm">
                {filteredDiseases.length > 0 ? (
                  <div className="space-y-4">
                    {filteredDiseases.map((disease) => (
                      <div
                        key={disease.id}
                        onClick={() => handleDiseaseSelect(disease.id)}
                        className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-xs transition-all cursor-pointer"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-1">
                            <div className="p-2 bg-yellow-50 rounded-full">
                              <AlertTriangle size={20} className="text-yellow-500" />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-medium text-lg text-gray-800">{disease.name}</h3>
                            
                            <div className="flex flex-wrap gap-1 mt-2">
                              {disease.animalTypes.map((type) => (
                                <span 
                                  key={type}
                                  className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium capitalize"
                                >
                                  {type}
                                </span>
                              ))}
                            </div>
                            
                            <div className="mt-3">
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Symptoms:</span>{' '}
                                {disease.symptoms.map((symptom, i) => (
                                  <span 
                                    key={i}
                                    className={
                                      selectedSymptoms.includes(symptom)
                                        ? 'font-medium text-green-600'
                                        : ''
                                    }
                                  >
                                    {symptom}{i < disease.symptoms.length - 1 ? ', ' : ''}
                                  </span>
                                ))}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <AlertTriangle size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-1">No matching diseases found</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      {selectedSymptoms.length > 0
                        ? "Try selecting different symptoms or fewer symptoms."
                        : "No disease guides available. Check back later."}
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default KnowledgeCenter;