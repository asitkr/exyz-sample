import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  sublabel?: string;
  error?: string;
  icon?: React.ElementType;
  touched?: boolean;
  dirty?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      sublabel,
      error,
      type = 'text',
      icon: Icon,
      className = '',
      touched,
      dirty,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const showError = !!error && (touched || dirty);

    return (
      <div className="w-full">
        <div className="flex justify-between items-baseline mb-1.5 ml-1">
          {label && (
            <label className="block text-xs font-bold text-slate-500 uppercase">
              {label}
            </label>
          )}
          {sublabel && (
            <span className="text-[10px] text-slate-400 italic">{sublabel}</span>
          )}
        </div>

        <div className="relative group">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon size={16} className="text-slate-400 group-focus-within:text-blue-500" />
            </div>
          )}

          <input
            ref={ref}
            type={inputType}
            className={`
              w-full bg-slate-50 dark:bg-black/20
              border text-slate-900 dark:text-white
              placeholder-slate-400 text-sm rounded-xl
              focus:ring-2 block p-3 outline-none transition-all
              ${Icon ? 'pl-10' : ''}
              ${
                showError
                  ? 'border-red-500/50 focus:ring-red-500/50'
                  : 'border-slate-200 dark:border-white/10 focus:ring-blue-500'
              }
              ${className}
            `}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 text-slate-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {showError && (
          <p className="mt-1 text-xs text-red-500 ml-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
