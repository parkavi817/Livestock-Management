import React from 'react';
import { Animal } from '../../types';
import { Edit2, Trash2 } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface AnimalCardProps {
  animal: Animal;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
}

// Function to calculate age from birth date
const calculateAge = (birthDate: string): string => {
  const birthDateTime = new Date(birthDate).getTime();
  const currentTime = new Date().getTime();
  
  const ageInMs = currentTime - birthDateTime;
  const ageInDays = Math.floor(ageInMs / (1000 * 60 * 60 * 24));
  
  if (ageInDays < 30) {
    return `${ageInDays} days`;
  } else if (ageInDays < 365) {
    const months = Math.floor(ageInDays / 30);
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(ageInDays / 365);
    const remainingMonths = Math.floor((ageInDays % 365) / 30);
    return `${years} year${years !== 1 ? 's' : ''}${remainingMonths > 0 ? `, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}` : ''}`;
  }
};

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, onEdit, onDelete, onSelect }) => {
  const { id, name, type, breed, birthDate, gender, imageUrl, tagNumber } = animal;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="relative">
        <img 
          src={imageUrl || 'https://images.pexels.com/photos/37393/animal-livestock-pig-domestic-37393.jpeg'} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={gender === 'male' ? 'info' : 'danger'}>
            {gender === 'male' ? 'Male' : 'Female'}
          </Badge>
        </div>
        {tagNumber && (
          <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 px-2 py-1 rounded text-sm font-medium">
            ID: {tagNumber}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{name}</h3>
          <Badge variant="primary" className="capitalize">{type}</Badge>
        </div>
        
        <div className="text-sm text-gray-600 space-y-1">
          <p><span className="font-medium">Breed:</span> {breed}</p>
          <p><span className="font-medium">Age:</span> {calculateAge(birthDate)}</p>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <Button 
            variant="primary" 
            size="sm"
            className="flex-1"
            onClick={() => onSelect(id)}
          >
            View
          </Button>
          <Button 
            variant="light" 
            size="sm"
            icon={<Edit2 size={16} />}
            onClick={() => onEdit(id)}
          />
          <Button 
            variant="danger" 
            size="sm"
            icon={<Trash2 size={16} />}
            onClick={() => onDelete(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;