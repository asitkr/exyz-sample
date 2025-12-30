import React from 'react';
import { Anchor } from 'lucide-react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'radar' | 'dots' | 'anchor';
  text?: string;
  subtext?: string;
  fullScreen?: boolean;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'md', 
  variant = 'radar', 
  text = "COMMAND SYSTEM", 
  subtext = "Initializing...",
  fullScreen = false,
  className = '' 
}) => {
  
  // 1. SPINNER VARIANT (For Buttons/Inline)
  if (variant === 'spinner') {
      const spinnerSize = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8', xl: 'w-12 h-12' };
      return (
          <div className={`relative ${spinnerSize[size]} animate-spin ${className}`}>
             <div className="absolute inset-0 rounded-full border-2 border-current opacity-30"></div>
             <div className="absolute inset-0 rounded-full border-t-2 border-current"></div>
          </div>
      );
  }

  // 2. DOTS VARIANT (For Inline Status)
  if (variant === 'dots') {
      return (
        <div className={`flex space-x-1 ${className}`}>
            {[0, 1, 2].map(i => (
                <div key={i} className={`rounded-full bg-current animate-bounce ${size === 'sm' ? 'w-1.5 h-1.5' : 'w-2.5 h-2.5'}`} style={{ animationDelay: `${i * 0.15}s` }}></div>
            ))}
        </div>
      );
  }

  // 3. NAVY UNIVERSAL LOADER (Default & Radar)
  
  const containerClasses = fullScreen 
    ? 'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-md text-white' 
    : `flex flex-col items-center justify-center w-full min-h-[350px] bg-transparent p-6 ${className}`;

  // Mapping size to scale for the graphic
  const scale = size === 'sm' ? 0.5 : size === 'md' ? 0.75 : size === 'lg' ? 1 : 1.25;

  return (
    <div className={containerClasses}>
      
      {/* Main Radar Graphic Container */}
      <div 
        className="relative w-64 h-64 flex items-center justify-center mb-8"
        style={{ transform: `scale(${scale})` }}
      >
        
        {/* 1. Outer Compass Ring (Static) */}
        <div className={`absolute inset-0 rounded-full border opacity-60 ${fullScreen ? 'border-white/20' : 'border-slate-200 dark:border-slate-700'}`}></div>
        <div className={`absolute inset-2 rounded-full border-2 border-dashed opacity-50 ${fullScreen ? 'border-white/30' : 'border-slate-300 dark:border-slate-600'}`}></div>

        {/* 2. Rotating Radar Sweep */}
        <div className="absolute inset-4 rounded-full overflow-hidden animate-spin-slow">
            {/* The gradient simulates the radar beam */}
            <div className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(14,165,233,0.15)_300deg,rgba(14,165,233,0.5)_360deg)] rounded-full"></div>
        </div>

        {/* 3. Counter-Rotating Decorative Ticks */}
        <div className="absolute inset-0 animate-spin-reverse-slow">
            {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                <div 
                    key={deg} 
                    className="absolute w-1 h-2 bg-amber-500/60 dark:bg-amber-400/80 rounded-full shadow-[0_0_5px_rgba(245,158,11,0.5)]"
                    style={{ 
                        top: '50%', 
                        left: '50%', 
                        transform: `translate(-50%, -50%) rotate(${deg}deg) translate(120px)` 
                    }} 
                />
            ))}
        </div>

        {/* 4. Sonar Ripple Effect */}
        {[0, 1].map((i) => (
             <div
                key={i}
                className="absolute inset-0 rounded-full border border-sky-500/30 dark:border-sky-400/20 animate-ripple"
                style={{ animationDelay: `${i * 1.5}s` }}
            />
        ))}

        {/* 5. Central Hub & Anchor */}
        <div className="relative z-10 flex items-center justify-center">
            {/* Rotating border around anchor */}
            <div className={`absolute inset-[-10px] rounded-full border animate-spin-slower ${fullScreen ? 'border-white/30' : 'border-slate-200 dark:border-slate-600'}`}>
                 <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full shadow-lg ${fullScreen ? 'bg-white' : 'bg-slate-900 dark:bg-white'}`}></div>
            </div>

            <div className={`w-24 h-24 rounded-full shadow-lg border flex items-center justify-center relative overflow-hidden group ${fullScreen ? 'bg-slate-800 border-white/20' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-600'}`}>
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent dark:via-white/5 opacity-50" />
                
                {/* Anchor Icon */}
                <div className={`drop-shadow-sm animate-scale-pulse ${fullScreen ? 'text-sky-400' : 'text-slate-900 dark:text-sky-400'}`}>
                    <Anchor size={48} strokeWidth={1.5} />
                </div>
            </div>
        </div>

        {/* 6. Random "Blip" Detection */}
        <div 
            className="absolute w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_2px_rgba(239,68,68,0.8)] animate-blip"
            style={{ top: '30%', right: '30%' }}
        />

      </div>

      {/* Text Area */}
      <div className="text-center z-10">
        <h2 className={`text-xl font-bold tracking-[0.2em] uppercase font-mono drop-shadow-sm ${fullScreen ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
            {text}
        </h2>
        
        <div className={`mt-3 flex items-center justify-center gap-3 text-xs font-semibold tracking-wider uppercase ${fullScreen ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
            <div className="flex space-x-1">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-dot-flash" style={{ animationDelay: '0s' }} />
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-dot-flash" style={{ animationDelay: '0.2s' }} />
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-dot-flash" style={{ animationDelay: '0.4s' }} />
            </div>
            <span>{subtext}</span>
        </div>
      </div>

    </div>
  );
};

export default Loader;