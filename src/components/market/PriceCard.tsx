import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MarketPrice } from '../../types';

interface PriceCardProps {
  price: MarketPrice;
  previousPrice?: number;
}

const PriceCard: React.FC<PriceCardProps> = ({ price, previousPrice }) => {
  // Calculate price change percentage if previous price exists
  const calculateChange = () => {
    if (!previousPrice) return null;
    
    const change = ((price.price - previousPrice) / previousPrice) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change > 0,
      isNeutral: change === 0
    };
  };
  
  const change = calculateChange();
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800">{price.item}</h3>
          
          {change && (
            <div 
              className={`flex items-center text-sm font-medium p-1 rounded ${
                change.isPositive 
                  ? 'text-green-700 bg-green-100' 
                  : change.isNeutral 
                    ? 'text-gray-700 bg-gray-100' 
                    : 'text-red-700 bg-red-100'
              }`}
            >
              {change.isPositive ? (
                <TrendingUp size={16} className="mr-1" />
              ) : change.isNeutral ? (
                <Minus size={16} className="mr-1" />
              ) : (
                <TrendingDown size={16} className="mr-1" />
              )}
              {change.value}%
            </div>
          )}
        </div>
        
        <div className="mt-2 mb-3">
          <span className="text-2xl font-bold text-gray-900">₹{price.price}</span>
          <span className="text-sm text-gray-600 ml-1">{price.unit}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{price.location}</span>
          <span>Updated: {new Date(price.date).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;