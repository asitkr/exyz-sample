import React from 'react';

import { CardProps } from './interface';

const Card: React.FC<CardProps> = ({ children, className = '', noPadding = false, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm 
        transition-all duration-300
        ${noPadding ? 'p-0 overflow-hidden' : 'p-6'} 
        ${onClick ? 'cursor-pointer hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500/30' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;