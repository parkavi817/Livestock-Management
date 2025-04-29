import React from 'react';
import { Calendar, Heart, AlertCircle } from 'lucide-react';
import { BreedingRecord } from '../../types';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { useAppContext } from '../../context/AppContext';

interface BreedingCardProps {
  record: BreedingRecord;
  onUpdate: (id: string) => void;
}

const BreedingCard: React.FC<BreedingCardProps> = ({ record, onUpdate }) => {
  const { state } = useAppContext();
  
  // Find the related animals
  const femaleAnimal = state.animals.find(a => a.id === record.femaleAnimalId);
  const maleAnimal = record.maleAnimalId 
    ? state.animals.find(a => a.id === record.maleAnimalId) 
    : null;
  
  // Calculate days until expected due date
  const daysUntilDue = () => {
    if (!record.expectedDueDate) return null;
    
    const today = new Date();
    const dueDate = new Date(record.expectedDueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  const days = daysUntilDue();
  const isDueSoon = days !== null && days >= 0 && days <= 7;
  const isOverdue = days !== null && days < 0;
  
  // Get status badge configuration
  const getStatusBadge = () => {
    if (record.successStatus === 'successful') {
      return {
        variant: 'success',
        text: 'Successful'
      };
    } else if (record.successStatus === 'unsuccessful') {
      return {
        variant: 'danger',
        text: 'Unsuccessful'
      };
    } else if (isOverdue) {
      return {
        variant: 'danger',
        text: 'Overdue'
      };
    } else if (isDueSoon) {
      return {
        variant: 'warning',
        text: 'Due Soon'
      };
    } else {
      return {
        variant: 'info',
        text: 'Pending'
      };
    }
  };
  
  const statusBadge = getStatusBadge();
  
  return (
    <div className={`border rounded-lg overflow-hidden ${
      record.successStatus === 'successful' ? 'border-green-300' :
      record.successStatus === 'unsuccessful' ? 'border-red-300' :
      isOverdue ? 'border-red-300 bg-red-50' :
      isDueSoon ? 'border-yellow-300 bg-yellow-50' :
      'border-gray-200'
    }`}>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <h3 className="font-medium text-gray-800">
                {femaleAnimal?.name} 
              </h3>
              <Badge 
                variant={statusBadge.variant as any} 
                className="ml-2"
              >
                {statusBadge.text}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">
              {maleAnimal ? `Bred with ${maleAnimal.name}` : `Artificial insemination`}
            </p>
          </div>
          <div className="bg-white p-2 rounded-full shadow-sm">
            <Heart size={20} className="text-pink-500" />
          </div>
        </div>
        
        <div className="mt-3 flex flex-col space-y-2">
          <div className="flex items-center text-sm">
            <Calendar size={16} className="mr-2 text-gray-500" />
            <span>Breeding date: {new Date(record.date).toLocaleDateString()}</span>
          </div>
          
          {record.expectedDueDate && record.successStatus === 'pending' && (
            <div className="flex items-center text-sm">
              <Calendar size={16} className={`mr-2 ${
                isOverdue ? 'text-red-500' : 
                isDueSoon ? 'text-yellow-500' : 
                'text-gray-500'
              }`} />
              <span className={
                isOverdue ? 'text-red-600 font-medium' : 
                isDueSoon ? 'text-yellow-600 font-medium' : 
                'text-gray-600'
              }>
                {isOverdue 
                  ? `Overdue by ${Math.abs(days!)} days` 
                  : `Expected: ${new Date(record.expectedDueDate).toLocaleDateString()} (${days} days)`}
              </span>
            </div>
          )}
          
          {record.actualBirthDate && (
            <div className="flex items-center text-sm">
              <Calendar size={16} className="mr-2 text-green-500" />
              <span className="text-green-600">
                Birth date: {new Date(record.actualBirthDate).toLocaleDateString()}
                {record.offspringCount && ` (${record.offspringCount} offspring)`}
              </span>
            </div>
          )}
        </div>
        
        {record.successStatus === 'pending' && (
          <div className="mt-3">
            <Button 
              variant="primary" 
              size="sm"
              className="w-full"
              onClick={() => onUpdate(record.id)}
            >
              Update Status
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreedingCard;