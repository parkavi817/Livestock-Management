import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/ui/Header';
import Card from '../components/ui/Card';
import PriceCard from '../components/market/PriceCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import { Search, Plus, RefreshCw as Refresh, Calendar } from 'lucide-react';

const MarketPrices: React.FC = () => {
  const { state } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');

  const locations = Array.from(new Set(state.marketPrices.map(price => price.location)));

  const filteredPrices = state.marketPrices.filter(price => {
    const matchesSearch = price.item.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === 'all' || price.location === locationFilter;
    return matchesSearch && matchesLocation;
  });

  const groupedPrices: Record<string, typeof state.marketPrices> = {};
  filteredPrices.forEach(price => {
    if (!groupedPrices[price.item]) groupedPrices[price.item] = [];
    groupedPrices[price.item].push(price);
  });

  const processedPrices = Object.keys(groupedPrices).map(item => {
    const prices = groupedPrices[item].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const latestPrice = prices[0];
    const previousPrice = prices.length > 1 ? prices[1].price : undefined;
    return { ...latestPrice, previousPrice };
  });

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    ...locations.map(location => ({ value: location, label: location }))
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-white text-gray-800">
      <Header title="📊 Livestock Market Prices" />

      <main className="flex-grow p-6 max-w-7xl mx-auto">
        {/* Page Title & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-purple-800">Current Market Overview</h2>
          <div className="flex gap-3">
            <Button variant="light" icon={<Refresh size={18} />} className="hover:bg-purple-100 transition-all">
              Refresh
            </Button>
            <Button variant="primary" icon={<Plus size={18} />} className="bg-purple-600 hover:bg-purple-700 text-white transition-all">
              Add Price
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6 p-6 bg-white shadow-md rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Search by product (e.g., Milk, Eggs)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} className="text-gray-400" />}
            />
            <Select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              options={locationOptions}
            />
          </div>
        </Card>

        {/* Last Updated Info */}
        <div className="mb-6 flex items-center text-sm text-purple-700">
          <Calendar size={16} className="mr-2" />
          <span>
            Last updated: {
              state.marketPrices.length > 0 
                ? new Date(
                    Math.max(
                      ...state.marketPrices.map(p => new Date(p.date).getTime())
                    )
                  ).toLocaleDateString()
                : 'N/A'
            }
          </span>
        </div>

        {/* Price Cards */}
        {processedPrices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {processedPrices.map(price => (
              <PriceCard 
                key={price.id}
                price={price}
                previousPrice={price.previousPrice}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center border border-dashed border-purple-200">
            <h3 className="text-xl font-medium text-purple-700 mb-2">No Results</h3>
            <p className="text-gray-500 mb-4">
              {state.marketPrices.length === 0 
                ? "No market prices have been added yet."
                : "Try adjusting your filters."}
            </p>
            <Button
              variant="light"
              onClick={() => {
                setSearchQuery('');
                setLocationFilter('all');
              }}
              className="hover:bg-purple-100"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MarketPrices;
