import React from 'react';
import { Calendar, Syringe, Clock } from 'lucide-react';
import { HealthRecord } from '../../types';
import Button from '../ui/Button';
import { useAppContext } from '../../context/AppContext';

interface VaccinationCardProps {
  record: HealthRecord;
  onMarkComplete: (id: string) => void;
}

const VaccinationCard: React.FC<VaccinationCardProps> = ({ record, onMarkComplete }) => {
  const { state } = useAppContext();
  
  // Find the related animal
  const animal = state.animals.find(a => a.id === record.animalId);
  
  // Calculate days remaining for next vaccination
  const daysRemaining = () => {
    if (!record.nextScheduledDate) return null;
    
    const today = new Date();
    const nextDate = new Date(record.nextScheduledDate);
    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  const days = daysRemaining();
  const isPastDue = days !== null && days < 0;
  const isDueSoon = days !== null && days >= 0 && days <= 7;
  
  return (
    <div className={`border rounded-lg overflow-hidden ${
      isPastDue ? 'border-red-300 bg-red-50' : 
      isDueSoon ? 'border-yellow-300 bg-yellow-50' : 
      'border-gray-200'
    }`}>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-800">
              {record.description}
            </h3>
            <p className="text-sm text-gray-600">
              {animal?.name} ({animal?.tagNumber || animal?.id})
            </p>
          </div>
          <div className="bg-white p-2 rounded-full shadow-sm">
            <Syringe size={20} className="text-green-600" />
          </div>
        </div>
        
        <div className="mt-3 flex flex-col space-y-2">
          <div className="flex items-center text-sm">
            <Calendar size={16} className="mr-2 text-gray-500" />
            <span>Last vaccination: {new Date(record.date).toLocaleDateString()}</span>
          </div>
          
          {record.nextScheduledDate && (
            <div className="flex items-center text-sm">
              <Clock size={16} className={`mr-2 ${
                isPastDue ? 'text-red-500' : 
                isDueSoon ? 'text-yellow-500' : 
                'text-gray-500'
              }`} />
              <span className={
                isPastDue ? 'text-red-600 font-medium' : 
                isDueSoon ? 'text-yellow-600 font-medium' : 
                'text-gray-600'
              }>
                {isPastDue 
                  ? `Overdue by ${Math.abs(days!)} days` 
                  : `Next scheduled: ${new Date(record.nextScheduledDate).toLocaleDateString()} (${days} days)`}
              </span>
            </div>
          )}
        </div>
        
        {(isPastDue || isDueSoon) && (
          <div className="mt-3">
            <Button 
              variant={isPastDue ? "danger" : "warning"} 
              size="sm"
              className="w-full"
              onClick={() => onMarkComplete(record.id)}
            >
              Mark as Completed
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VaccinationCard;