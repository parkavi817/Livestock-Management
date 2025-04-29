import React, { ReactNode } from 'react';

// Table container component
export const Table: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
        {children}
      </table>
    </div>
  );
};

// Table head component
export const Thead: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <thead className={`bg-gray-50 ${className}`}>
      {children}
    </thead>
  );
};

// Table body component
export const Tbody: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>
      {children}
    </tbody>
  );
};

// Table row component
export const Tr: React.FC<{ 
  children: ReactNode; 
  className?: string;
  onClick?: () => void;
}> = ({ 
  children, 
  className = '',
  onClick 
}) => {
  return (
    <tr 
      className={`${className} ${onClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

// Table header cell component
export const Th: React.FC<{ 
  children: ReactNode; 
  className?: string;
  align?: 'left' | 'center' | 'right';
}> = ({ 
  children, 
  className = '',
  align = 'left'
}) => {
  const alignClass = 
    align === 'left' ? 'text-left' : 
    align === 'center' ? 'text-center' : 'text-right';
  
  return (
    <th 
      className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${alignClass} ${className}`}
      scope="col"
    >
      {children}
    </th>
  );
};

// Table data cell component
export const Td: React.FC<{ 
  children: ReactNode; 
  className?: string;
  align?: 'left' | 'center' | 'right';
}> = ({ 
  children, 
  className = '',
  align = 'left'
}) => {
  const alignClass = 
    align === 'left' ? 'text-left' : 
    align === 'center' ? 'text-center' : 'text-right';
  
  return (
    <td className={`px-6 py-4 whitespace-nowrap ${alignClass} ${className}`}>
      {children}
    </td>
  );
};