import React, { useEffect, useRef, useState } from 'react';
import { Anchor, ArrowRight, Bell, Briefcase, LogOut, Menu, Moon, Search, Shield, Sun, User, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/slices/authSlice';
// import { handleSelectModule } from '../../redux/actions/uiActions';
import { useTheme } from '../../context/useTheme';
import { handleSelectModule, setCmdPaletteOpen, toggleSidebar } from '../../redux/slices/uiSlice';
import { notifications } from '../../utils/constants';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isDarkMode, toggleTheme } = useTheme();
    const { sidebarCollapsed } = useAppSelector(state => state.ui);
    const { username, role } = useAppSelector(state => state.auth);
    const profileRef = useRef<HTMLDivElement>(null);
    const notifRef = useRef<HTMLButtonElement>(null);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = () => {
        // Clear token from localStorage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');

        // Reset Redux state
        dispatch(logout());

        toast.success('Successfully signed out.');

        // Navigate to /signin
        navigate('/signin');
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setIsNotifOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleNotificationClick = (menuId: string, subId: string) => {
        //   onNavigate(menuId, subId);
        setIsNotifOpen(false);
    };

    return (
        <header className="h-16 bg-white dark:bg-slate-900/90 dark:backdrop-blur-md border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-6 fixed top-0 right-0 left-0 z-40 transition-all duration-300 text-slate-800 dark:text-white shadow-sm">
            {/* Gradient Bottom Border */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50"></div>

            {/* Left Side: Logo & Toggle */}
            <div className="flex items-center gap-6">
                <button
                    onClick={() => dispatch(toggleSidebar())}
                    className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5"
                >
                    <Menu className="w-6 h-6" />
                </button>

                {/* Logo - Hide if sidebar is open on desktop to prevent duplication */}
                <div className={`flex items-center gap-3 transition-opacity duration-300 ${!sidebarCollapsed ? 'opacity-0 md:opacity-100' : 'opacity-100'}`}>
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Anchor className="text-white w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold tracking-[0.2em] text-slate-900 dark:text-white">HORIZON</span>
                </div>
            </div>

            {/* Right Side: Notifications & Profile */}
            <div className="flex items-center gap-4">

                {/* Search Icon / Command Palette Trigger */}
                <button
                    onClick={() => dispatch(setCmdPaletteOpen(true))}
                    className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-white/5"
                    title="Search / Command Palette (Cmd+K)"
                >
                    <Search className="w-5 h-5" />
                </button>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-white/5"
                >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Notifications Dropdown */}
                <div className="relative">
                    <button
                        ref={notifRef}
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                        className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-white/5"
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
                    </button>

                    {isNotifOpen && (
                        <div className="absolute right-0 top-12 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl shadow-blue-500/10 dark:shadow-black/50 overflow-hidden animate-fade-in-up z-50 ring-1 ring-black/5 dark:ring-white/5">
                            <div className="p-4 border-b border-slate-100 dark:border-white/10 flex justify-between items-center bg-white dark:bg-slate-900">
                                <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-medium">3 New</span>
                            </div>
                            <div className="max-h-64 overflow-y-auto bg-white dark:bg-slate-900 custom-scrollbar">

                                {notifications.map(notif => (
                                    <div
                                        key={notif.id}
                                        onClick={() => handleNotificationClick(notif.link.menu, notif.link.sub)}
                                        className="p-3 border-b border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group"
                                    >
                                        <div className="flex gap-3">
                                            <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform ${notif.color}`}></div>
                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{notif.title}</span>
                                                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 rounded border border-slate-200 dark:border-white/20 text-slate-500 dark:text-slate-400">{notif.app}</span>
                                                </div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{notif.desc}</p>
                                                <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <div className="p-3 text-center border-t border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-slate-950/30">
                                <button className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center gap-1 w-full">
                                    View Inbox <ArrowRight size={12} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="h-8 w-px bg-slate-200 dark:bg-white/10 mx-1"></div>

                {/* Profile Dropdown Container */}
                <div className="relative" ref={profileRef}>
                    <div
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className={`flex items-center gap-3 pl-2 cursor-pointer p-1.5 rounded-lg transition-all duration-200 group select-none ${isProfileOpen ? 'bg-slate-100 dark:bg-white/10' : 'hover:bg-slate-100 dark:hover:bg-white/5'}`}
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">{username}</p>
                            <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider">{role.split('_')[0]}</p>
                        </div>
                        <div className={`w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center border border-white/20 dark:border-white/10 shadow-lg transition-transform duration-300 ${isProfileOpen ? 'rotate-12 scale-105 ring-2 ring-blue-500/50' : ''}`}>
                            <span className="text-sm font-bold text-white">{username.substring(0, 2).toUpperCase()}</span>
                        </div>
                    </div>

                    {/* Expanded Profile Card */}
                    {isProfileOpen && (
                        <div className="absolute right-0 top-14 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl shadow-blue-500/10 dark:shadow-black/50 overflow-hidden animate-fade-in-up z-50 ring-1 ring-black/5 dark:ring-white/5">
                            <div className="relative h-24 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-slate-900">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsProfileOpen(false); }}
                                    className="absolute top-2 right-2 p-1 text-white/50 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="px-6 pb-6 -mt-10 relative">
                                <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-full p-1 ring-4 ring-white dark:ring-slate-900 mx-auto shadow-xl">
                                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                                        {username.substring(0, 2).toUpperCase()}
                                    </div>
                                </div>

                                <div className="text-center mt-3 mb-6">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{username}</h3>
                                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium tracking-wide">US NAVY • ACTIVE</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                        <Shield size={16} className="text-slate-400" />
                                        <div>
                                            <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Role</div>
                                            <div className="text-xs font-bold text-slate-800 dark:text-white">{role.replace('_', ' ')}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                        <Briefcase size={16} className="text-slate-400" />
                                        <div>
                                            <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Unit</div>
                                            <div className="text-xs font-bold text-slate-800 dark:text-white">Cyber Command</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 space-y-2">
                                    <button
                                        onClick={() => dispatch(handleSelectModule({moduleId: 'personnel', workflow: 'personnel-records' }))}
                                        className="w-full py-2 flex items-center justify-start px-4 gap-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors"
                                    >
                                        <User size={16} /> My Profile
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full py-2 flex items-center justify-start px-4 gap-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                                    >
                                        <LogOut size={16} /> Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header;