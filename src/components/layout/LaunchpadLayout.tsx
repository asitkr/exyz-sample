import React, { lazy, useState } from 'react';

import { useTheme } from '../../context/useTheme';
import { LaunchpadLayoutProps } from './interface';

const CommandPalette = lazy(() => import('../common/CommandPalette'));
const LaunchpadAside = lazy(() => import('../common/LaunchpadAside'));
const LaunchpadHeader = lazy(() => import('../headers/LaunchpadHeader'));

const LaunchpadLayout: React.FC<LaunchpadLayoutProps> = ({ children }) => {
    const { isDarkMode } = useTheme();
    const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState<boolean>(false);

    return (
        <div className={`min-h-screen font-inter relative overflow-hidden flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
            {/* Background Ambience - Updated for Deep Space Blue */}
            {isDarkMode ? (
                <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-black pointer-events-none"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
                </>
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 pointer-events-none"></div>
            )}

            <LaunchpadHeader setIsCmdPaletteOpen={setIsCmdPaletteOpen} />

            <CommandPalette
                isOpen={isCmdPaletteOpen}
                onClose={() => setIsCmdPaletteOpen(false)}
            />

            <div className="flex-1 flex overflow-hidden relative z-10">
                {children}
                <LaunchpadAside />
            </div>
        </div>
    )
}

export default LaunchpadLayout;