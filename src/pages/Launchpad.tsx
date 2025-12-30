import React, { lazy, useEffect, useState } from 'react';
import { useTheme } from '../context/useTheme';
import { Activity, Anchor, Briefcase, Calendar, Clock, FileText, MapPin, Pin, Shield, User } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { handleSelectModule } from '../redux/actions/uiActions';
import { useNavigate } from 'react-router-dom';
import { setSidebarCollapsed } from '../redux/slices/uiSlice';

const LaunchpadLayout = lazy(() => import('../components/layout/LaunchpadLayout'));

const STORAGE_KEY = 'pinnedModules';

const Launchpad: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isDarkMode } = useTheme();
    const userId = useAppSelector(state => state.auth.userId);
    const allUsers = useAppSelector(state => state.static.allUsers);
    const modules = useAppSelector(state => state.static.modules);
    const [pinnedModules, setPinnedModules] = useState<string[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });
    const [storedUser, setStoredUser] = useState<any>(null);

    const user = allUsers.find(u => u?.id === userId) || { username: '', rank: '', email: '', serviceNumber: '', designation: '', unit: '', dateOfJoining: '', dateOfSeniority: '', dateOfRetirement: '' };

    useEffect(() => {
        if(user) {
            localStorage.setItem("auth", JSON.stringify(user));
        }
    }, []);

    useEffect(() => {
        console.log("User Data on Launchpad:", localStorage.getItem("auth"));
        const storedData = localStorage.getItem("auth");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setStoredUser(parsedData);
        }
    }, [])
    
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const handlePinToggle = (e: React.MouseEvent, moduleId: string) => {
        e.stopPropagation();
        setPinnedModules(prev => {
            const updated = prev.includes(moduleId)
                ? prev.filter(id => id !== moduleId)
                : [...prev, moduleId];

            // Save to localStorage
            localStorage.setItem('pinnedModules', JSON.stringify(updated));
            return updated;
        });
    };

    const sortedModules = [...modules].sort((a, b) => {
        const isAPinned = pinnedModules.includes(a.id);
        const isBPinned = pinnedModules.includes(b.id);
        if (isAPinned === isBPinned) return 0;
        return isAPinned ? -1 : 1;
    });

    const handleCardMenu = (moduleId: string) => {
        localStorage.setItem('module_id', moduleId);

        navigate(`/${moduleId}`);
    }

    return (
        <LaunchpadLayout>
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-10 custom-scrollbar">

                <div className="my-10 animate-fade-in-up">
                    <h2 className={`text-4xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {getGreeting()}, {storedUser?.rank} {storedUser?.username.split(' ').pop()}.
                    </h2>
                    <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Your operational dashboard is ready.
                    </p>
                </div>

                {/* USER DETAILS HEADER BLOCK */}
                <div className={`mb-12 p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200 shadow-sm'} animate-fade-in-up`}>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block tracking-wider">Full Name</label>
                            <div className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
                                <User size={16} className="text-blue-500" /> {storedUser?.username}
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block tracking-wider">Service No.</label>
                            <div className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
                                <FileText size={16} className="text-blue-500" /> {storedUser?.serviceNumber}
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block tracking-wider">Rank</label>
                            <div className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
                                <Shield size={16} className="text-blue-500" /> {storedUser?.rank}
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block tracking-wider">Designation</label>
                            <div className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
                                <Briefcase size={16} className="text-blue-500" /> {storedUser?.designation}
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block tracking-wider">Unit</label>
                            <div className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
                                <MapPin size={16} className="text-blue-500" /> {storedUser?.unit}
                            </div>
                        </div>

                        {/* New Date Fields */}
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block tracking-wider">Date of Joining</label>
                            <div className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
                                <Calendar size={16} className="text-emerald-500" /> {storedUser?.dateOfJoining || 'N/A'}
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block tracking-wider">Date of Seniority</label>
                            <div className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
                                <Activity size={16} className="text-amber-500" /> {storedUser?.dateOfSeniority || 'N/A'}
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block tracking-wider">Date of Retirement</label>
                            <div className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
                                <Clock size={16} className="text-red-500" /> {storedUser?.dateOfRetirement || 'N/A'}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block tracking-wider">Command</label>
                            <div className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
                                <Anchor size={16} className="text-blue-500" /> Pacific Fleet
                            </div>
                        </div>
                    </div>
                </div>

                {/* DYNAMIC BENTO GRID - Based on Pinned Items */}
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 pb-12`}>
                    {sortedModules.map((module, idx) => {
                        const isPinned = pinnedModules.includes(module.id);

                        let spanClass = "";
                        let isHero = false;

                        if (isPinned) {
                            if (idx === 0) {
                                spanClass = "md:col-span-2 md:row-span-1";
                                isHero = true;
                            }
                        }

                        return (
                            <div
                                key={module.id}
                                onClick={() => {dispatch(handleSelectModule(module.id)); handleCardMenu(module.id); dispatch(setSidebarCollapsed(true)) }}
                                className={`group relative border rounded-[2rem] transition-all duration-500 cursor-pointer overflow-hidden flex flex-col animate-fade-in-up ${spanClass}
                                ${isDarkMode
                                        ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20'
                                        : 'bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50 border-slate-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-100'
                                    }`}
                                style={{ animationDelay: `${idx * 50}ms` }}
                            >
                                {/* Decorative Background Elements */}
                                {isHero && (
                                    <div className={`absolute inset-0 bg-gradient-to-br from-${module.themeColor}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                                )}
                                <div className={`absolute -right-16 -top-16 w-64 h-64 rounded-full bg-${module.themeColor}-500/5 group-hover:bg-${module.themeColor}-500/10 blur-3xl transition-all duration-700`}></div>

                                {/* Pin Button */}
                                <button
                                    onClick={(e) => handlePinToggle(e, module.id)}
                                    className={`absolute top-6 right-6 z-20 p-2.5 rounded-full transition-all duration-300 ${isPinned
                                        ? `bg-${module.themeColor}-500 text-white opacity-100 shadow-lg`
                                        : `bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 opacity-60 group-hover:opacity-100 hover:bg-slate-200 dark:hover:bg-slate-600`
                                        }`}
                                    title={isPinned ? "Unpin Module" : "Pin Module"}
                                >
                                    <Pin size={18} className={isPinned ? "fill-current" : ""} />
                                </button>

                                <div className="p-8 flex-1 flex flex-col relative z-10">
                                    <div className="flex justify-between items-start mb-6 pr-10">
                                        <div className={`p-5 rounded-2xl transition-all duration-500 group-hover:scale-110 shadow-sm ${isHero
                                            ? `bg-${module.themeColor}-600 text-white shadow-lg shadow-${module.themeColor}-500/30`
                                            : (isDarkMode ? `bg-${module.themeColor}-500/20 text-${module.themeColor}-400 group-hover:bg-${module.themeColor}-500/30` : `bg-${module.themeColor}-50 text-${module.themeColor}-600 group-hover:bg-${module.themeColor}-100`)
                                            }`}>
                                            <module.icon size={isHero ? 48 : 32} />
                                        </div>
                                        {!isHero && (
                                            <div className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-sm ${isDarkMode ? 'border-slate-700 text-slate-400 bg-slate-800' : 'border-slate-200 text-slate-500 bg-white/50'}`}>
                                                {module.category}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <h4 className={`font-bold group-hover:translate-x-1 transition-transform ${isHero ? 'text-4xl mb-4' : 'text-2xl mb-3'} ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{module.title}</h4>
                                        <p className={`line-clamp-2 ${isHero ? 'text-lg opacity-90' : 'text-base'} ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                            {module.description}
                                        </p>
                                    </div>

                                    {/* NEW: Quick Actions Deck (No Numbers!) */}
                                    <div className="mt-auto pt-6">
                                        <div className="flex flex-wrap gap-2">
                                            {module.quickActions?.map((action, actionIdx) => (
                                                <button
                                                    key={actionIdx}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        dispatch(handleSelectModule(module.id, action.context));
                                                    }}
                                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wide border transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${isDarkMode
                                                        ? `bg-slate-900/50 border-slate-700 text-${module.themeColor}-400 hover:bg-${module.themeColor}-500/20 hover:border-${module.themeColor}-500/50`
                                                        : `bg-white/50 border-slate-200 text-${module.themeColor}-600 hover:bg-${module.themeColor}-50 hover:border-${module.themeColor}-200`
                                                        }`}
                                                >
                                                    {React.createElement(action.icon, { size: 14 })}
                                                    {action.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </LaunchpadLayout>
    )
}

export default Launchpad;