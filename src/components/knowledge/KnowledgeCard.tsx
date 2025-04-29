import React from 'react';
import { BookOpen, Tag } from 'lucide-react';
import { KnowledgeArticle, AnimalType } from '../../types';
import Badge from '../ui/Badge';

interface KnowledgeCardProps {
  article: KnowledgeArticle;
  onClick: (id: string) => void;
}

// Get badge color based on animal type
const getAnimalBadgeColor = (type: AnimalType): "primary" | "secondary" | "success" | "danger" | "warning" | "info" => {
  switch (type) {
    case 'cow':
    case 'buffalo':
      return 'primary';
    case 'goat':
    case 'sheep':
      return 'success';
    case 'chicken':
    case 'duck':
      return 'warning';
    case 'pig':
      return 'danger';
    default:
      return 'secondary';
  }
};

// Get badge color based on category
const getCategoryBadgeColor = (category: string): "primary" | "secondary" | "success" | "danger" | "warning" | "info" => {
  switch (category) {
    case 'feeding':
      return 'success';
    case 'shelter':
      return 'info';
    case 'hygiene':
      return 'primary';
    case 'breeding':
      return 'danger';
    case 'health':
      return 'warning';
    default:
      return 'secondary';
  }
};

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({ article, onClick }) => {
  const { id, title, content, category, animalTypes, imageUrl } = article;
  
  // Truncate content for preview
  const truncatedContent = content.length > 120 
    ? content.substring(0, 120) + '...' 
    : content;
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg"
      onClick={() => onClick(id)}
    >
      {imageUrl && (
        <div className="h-40 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start mb-2">
          <div className="mr-2 mt-1">
            <BookOpen size={18} className="text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{truncatedContent}</p>
        
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant={getCategoryBadgeColor(category)} 
            className="capitalize"
          >
            {category}
          </Badge>
          
          {animalTypes.map(type => (
            <Badge 
              key={type} 
              variant={getAnimalBadgeColor(type)}
              className="capitalize"
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeCard;