import React from 'react';
import { Home, Radio, ArrowLeft } from 'lucide-react';

import { NotFoundPageProps } from '../components/common/interface';
import Footer from '../components/signin/Footer';

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onGoHome, onBack }) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center min-h-[500px] text-center p-8 animate-fade-in-up">
      
      {/* Visual Glitch/Radar Effect */}
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full border-4 border-slate-200 dark:border-white/10 flex items-center justify-center relative overflow-hidden">
            {/* Spinning Radar Line */}
            <div className="absolute top-1/2 left-1/2 w-[50%] h-0.5 bg-red-500 origin-left animate-spin duration-[3s]"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-red-500/20 rounded-full animate-pulse"></div>
            
            <Radio size={48} className="text-slate-400 dark:text-slate-600 relative z-10" />
        </div>
        
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce shadow-lg shadow-red-500/30">
            ERR_404
        </div>
      </div>

      <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
        SIGNAL LOST
      </h1>
      
      <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-px w-8 bg-slate-300 dark:bg-white/20"></div>
          <p className="text-sm font-mono text-slate-500 dark:text-red-400 uppercase tracking-widest">Target Coordinates Invalid</p>
          <div className="h-px w-8 bg-slate-300 dark:bg-white/20"></div>
      </div>

      <p className="max-w-md text-slate-600 dark:text-gray-400 mb-8 leading-relaxed">
        The requested module or resource could not be located on the secure network. It may have been decommissioned, moved, or requires higher security clearance.
      </p>

      <div className="flex gap-4">
        <button 
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all font-bold text-sm"
        >
            <ArrowLeft size={18} /> Go Back
        </button>
        
        <button 
            onClick={onGoHome}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition-all font-bold text-sm"
        >
            <Home size={18} /> Return to Base
        </button>
      </div>

      {/* Footer Diagnostic Code */}
      <div className="mt-12 p-4 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 dark:border-white/5 font-mono text-xs text-slate-400 mb-12">
          <div>DIAGNOSTIC: NAV_FAILURE_0X44</div>
          <div className="mt-1">TIMESTAMP: {new Date().toISOString()}</div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFoundPage;