import React from 'react';
import { Shield, Lock, Server } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 py-3 px-6 bg-slate-950/80 backdrop-blur-md border-t border-white/5 text-slate-500 text-[10px] md:text-xs uppercase tracking-widest flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
            <Shield size={12} className="text-blue-500" />
            <span className="font-bold text-slate-300">Horizon Command Systems</span>
        </div>
        <span className="hidden md:inline text-slate-700">|</span>
        <span className="opacity-70">© 2024 US Navy. Authorized Access Only.</span>
      </div>
      
      <div className="flex items-center gap-6 mt-2 md:mt-0 font-medium">
        <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>
            <span className="text-emerald-500/80">System Operational</span>
        </div>
        <div className="flex items-center gap-1.5 opacity-50">
           <Server size={12} />
           <span>NIPRNET Node 04</span>
        </div>
        <div className="flex items-center gap-1.5 text-amber-500/80">
           <Lock size={12} />
           <span>UNCLASSIFIED // FOUO</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;