import React from 'react';

import Loader from './Loader';
import { ButtonProps } from './interface';

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  loading = false, 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30 border border-transparent",
    outline: "bg-white/5 hover:bg-white/10 text-white border border-white/20 backdrop-blur-sm",
    ghost: "bg-transparent hover:bg-white/5 text-gray-300 hover:text-white",
  };
  
  const widthStyles = fullWidth ? "w-full" : "";
  const sizeStyles = "px-6 py-3.5 text-sm";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthStyles} ${sizeStyles} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          {/* Explicitly use spinner variant for buttons */}
          <div className="scale-75 origin-center">
             <Loader size="sm" variant="spinner" className="text-current" />
          </div>
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;