import { Anchor, Moon, Sun } from 'lucide-react';
import React from 'react';
import { useTheme } from '../../context/useTheme';

const SignInHeader = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div className="absolute top-0 left-0 right-0 p-8 md:p-12 z-20 flex justify-between items-start animate-fade-in-down">
            <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40 backdrop-blur-xl transition-all hover:scale-110 active:scale-95 border border-white/20">
                    <Anchor className="text-white w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-[0.2em] text-slate-900 dark:text-white drop-shadow-2xl">
                        HORIZON
                    </h1>
                    <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400 mt-1">Secure Command Interface</p>
                </div>
            </div>

            <button
                onClick={toggleTheme}
                className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all shadow-xl group"
            >
                {isDarkMode ? <Sun size={24} className="group-hover:rotate-45 transition-transform" /> : <Moon size={24} className="group-hover:-rotate-12 transition-transform" />}
            </button>
        </div>
    )
}

export default SignInHeader;