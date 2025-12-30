import React from 'react';
import { Activity, ArrowRight, CheckCircle } from 'lucide-react';

import { useTheme } from '../../context/useTheme';
import { ASIDE_COLORS_MAP, NOTIFICATIONS } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { handleSelectModule } from '../../redux/actions/uiActions';

const LaunchpadAside: React.FC = () => {
    const { isDarkMode } = useTheme();
    const dispatch = useAppDispatch();
    const modules = useAppSelector(state => state.static.modules);

    const appStats = NOTIFICATIONS.reduce((acc, curr) => {
      const app = curr.app;
      if (!acc[app]) {
          acc[app] = { 
              count: 0, 
              urgentCount: 0, 
              latestActivity: curr.title, 
              latestTime: curr.time 
          };
      }
      acc[app].count += 1;
      if (curr.urgency === 'high') acc[app].urgentCount += 1;
      return acc;
  }, {} as Record<string, { count: number, urgentCount: number, latestActivity: string, latestTime: string }>);

    const handleAppClick = (appName: string) => {
        let moduleId = 'logistics';
        let context = { workflow: 'home', subMenu: '' };

        if (appName === 'eAnumodan') {
            moduleId = 'logistics';
            context = { workflow: 'laptop-request', subMenu: 'laptop-inbox' };
        } else if (appName === 'eVigam') {
            moduleId = 'cyber';
            context = { workflow: 'nws-policy', subMenu: 'nws-inbox' };
        } else if (appName === 'eSamman') {
            moduleId = 'personnel';
            context = { workflow: 'admin-console', subMenu: 'personnel-records' };
        } else {
            const map: Record<string, string> = { 'FVSCS': 'fleet', 'NIC Mail': 'facilities' };
            moduleId = map[appName] || 'logistics';
        }

        dispatch(handleSelectModule(moduleId, context));
    };

    return (
        <aside className={`w-96 mt-16 border-l hidden xl:flex flex-col backdrop-blur-sm transition-colors ${isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/60 border-slate-200'}`}>
            <div className={`p-6 border-b flex items-center justify-between ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                <h3 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    <CheckCircle size={20} className="text-green-500" /> Action Center
                </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {Object.entries(appStats).map(([appName, stats]) => {
                    const module = modules.find(m => m.title === appName);
                    const Icon = module?.icon || Activity;
                    const themeColor = module?.themeColor || 'blue';
                    const hasUrgent = stats.urgentCount > 0;
                    const theme = ASIDE_COLORS_MAP[themeColor as keyof typeof ASIDE_COLORS_MAP];               

                    return (
                        <div
                            key={appName}
                            onClick={() => handleAppClick(appName)}
                            className={`group cursor-pointer rounded-2xl border transition-all duration-300 relative overflow-hidden ${isDarkMode
                                ? 'bg-slate-900 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
                                : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5'
                                }`}
                        >
                            {/* Status Indicator Bar */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${hasUrgent ? 'bg-red-500' : theme?.solid}`}></div>

                            <div className="p-5 pl-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2.5 rounded-xl ${isDarkMode ? `${theme?.darkBg} ${theme?.darkText}` : `${theme?.lightBg} ${theme?.lightText}`}`}>
                                            <Icon size={22} />
                                        </div>
                                        <div>
                                            <h4 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{appName}</h4>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-wider">{module?.category || 'System'}</p>
                                        </div>
                                    </div>
                                    {hasUrgent && (
                                        <span className="flex h-2.5 w-2.5 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-end justify-between">
                                    <div>
                                        <div className={`text-3xl font-bold leading-none mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                            {stats.count}
                                        </div>
                                        <div className="text-xs text-slate-500 font-medium">Pending Requests</div>
                                    </div>

                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDarkMode ? 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                                        <ArrowRight size={20} />
                                    </div>
                                </div>

                                {/* Latest Activity Snippet */}
                                <div className={`mt-4 pt-3 border-t text-xs truncate ${isDarkMode ? 'border-slate-800 text-slate-500' : 'border-slate-100 text-slate-500'}`}>
                                    <span className="font-medium opacity-70">Latest:</span> {stats.latestActivity}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {Object.keys(appStats).length === 0 && (
                    <div className="text-center py-10 text-slate-400">
                        <CheckCircle size={40} className="mx-auto mb-3 opacity-50" />
                        <p>All caught up!</p>
                    </div>
                )}
            </div>
        </aside>
    )
}

export default LaunchpadAside;