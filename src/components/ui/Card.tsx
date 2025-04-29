import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
  icon?: ReactNode;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  children, 
  className = '', 
  footer,
  icon
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {title && (
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            {icon && <div className="mr-2">{icon}</div>}
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          </div>
        </div>
      )}
      <div className="p-4">{children}</div>
      {footer && <div className="bg-gray-50 px-4 py-3 border-t">{footer}</div>}
    </div>
  );
};

export default Card;