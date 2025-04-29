import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import Card from '../ui/Card';

type AlertType = 'info' | 'warning' | 'success' | 'error';

interface AlertCardProps {
  title: string;
  message: string;
  type?: AlertType;
  onDismiss?: () => void;
  className?: string;
}

const AlertCard: React.FC<AlertCardProps> = ({
  title,
  message,
  type = 'info',
  onDismiss,
  className = '',
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return {
          containerClass: 'bg-yellow-50 border-yellow-400',
          textClass: 'text-yellow-700',
          icon: <AlertTriangle size={20} className="text-yellow-500" />,
        };
      case 'success':
        return {
          containerClass: 'bg-green-50 border-green-400',
          textClass: 'text-green-700',
          icon: <CheckCircle size={20} className="text-green-500" />,
        };
      case 'error':
        return {
          containerClass: 'bg-red-50 border-red-400',
          textClass: 'text-red-700',
          icon: <AlertCircle size={20} className="text-red-500" />,
        };
      case 'info':
      default:
        return {
          containerClass: 'bg-blue-50 border-blue-400',
          textClass: 'text-blue-700',
          icon: <Info size={20} className="text-blue-500" />,
        };
    }
  };

  const { containerClass, textClass, icon } = getTypeStyles();

  return (
    <Card 
      className={`border-l-4 ${containerClass} ${className}`}
    >
      <div className="flex">
        <div className="flex-shrink-0 mr-3">{icon}</div>
        <div className="flex-1">
          <h4 className={`font-medium ${textClass}`}>{title}</h4>
          <div className={`mt-1 text-sm ${textClass}`}>{message}</div>
        </div>
        {onDismiss && (
          <button
            type="button"
            className={`ml-3 ${textClass} hover:text-opacity-75`}
            onClick={onDismiss}
          >
            <span className="text-2xl">&times;</span>
          </button>
        )}
      </div>
    </Card>
  );
};

export default AlertCard;