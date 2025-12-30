import React, { useEffect, useRef, useState } from 'react';
import { Anchor, Bell, Command, LogOut, Moon, Search, Sun, User } from 'lucide-react';

import { useTheme } from '../../context/useTheme';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { handleSelectModule } from '../../redux/actions/uiActions';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CommandPalette from '../common/CommandPalette';

interface LaunchpadHeaderProps {
    setIsCmdPaletteOpen: (isOpen: boolean) => void;
}

const LaunchpadHeader: React.FC<LaunchpadHeaderProps> = ({ setIsCmdPaletteOpen }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();
    const profileRef = useRef<HTMLDivElement>(null);
    const allUsers = useAppSelector(state => state.static.allUsers);
    const userId = useAppSelector(state => state.auth.userId);
    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

    const user = allUsers.find(u => u?.id === userId) || { username: '', rank: '', email: '' };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
            setIsProfileOpen(false);
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

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

    return (
        <header className={`fixed top-0 left-0 right-0 z-20 h-16 border-b flex items-center justify-between px-6 transition-colors ${isDarkMode ? 'bg-slate-950/90 border-slate-800 backdrop-blur-md' : 'bg-white/80 border-slate-200 backdrop-blur-md'}`}>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Anchor className="text-white w-6 h-6" />
                    </div>
                    <div className="hidden md:block">
                        <h1 className={`text-xl font-bold tracking-widest leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>HORIZON</h1>
                        <p className="text-xs text-slate-400 uppercase tracking-widest leading-none mt-1">Workspace</p>
                    </div>
                </div>

                {/* Main Dashboard Search Bar (Command Palette Trigger) */}
                <button
                    onClick={() => setIsCmdPaletteOpen(true)}
                    className={`hidden md:flex items-center gap-3 px-4 py-2.5 border rounded-2xl w-96 transition-all group ${isDarkMode ? 'bg-slate-900 border-slate-700 hover:border-slate-600' : 'bg-slate-100 border-slate-200 hover:border-blue-300'}`}
                >
                    <Search className={`w-5 h-5 ${isDarkMode ? 'text-slate-500 group-hover:text-blue-400' : 'text-slate-500 group-hover:text-blue-500'} transition-colors`} />
                    <span className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>Search apps or type command...</span>
                    <div className={`ml-auto flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded border ${isDarkMode ? 'bg-white/10 border-white/5 text-slate-400' : 'bg-white border-slate-200 text-slate-400'}`}>
                        <Command size={10} /> K
                    </div>
                </button>
            </div>

            <div className="flex items-center gap-4">

                <button
                    onClick={toggleTheme}
                    className={`p-2.5 rounded-full transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                >
                    {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
                </button>

                <button className={`p-2.5 rounded-full transition-colors relative ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
                    <Bell size={22} />
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900"></span>
                </button>

                <div className={`h-8 w-px mx-2 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}></div>

                {/* Profile */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className={`flex items-center gap-3 cursor-pointer p-2 rounded-xl transition-colors group ${isProfileOpen ? (isDarkMode ? 'bg-slate-800' : 'bg-slate-100') : (isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100')}`}
                    >
                        <div className="text-right hidden sm:block">
                            <div className={`text-sm font-bold transition-colors ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'}`}>{user.username}</div>
                            <div className="text-xs text-slate-400">{user?.rank}</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg text-lg">
                            {user?.username.charAt(0)}
                        </div>
                    </button>

                    {isProfileOpen && (
                        <div className={`absolute right-0 top-16 w-72 border rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up z-50 ring-1 ${isDarkMode ? 'bg-slate-900 border-slate-700 ring-white/10' : 'bg-white border-slate-200 ring-slate-900/5'}`}>
                            <div className={`p-5 border-b ${isDarkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                                <p className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{user.username}</p>
                                <p className="text-sm text-slate-500">{user?.email}</p>
                            </div>
                            <div className="p-2">
                                <button
                                    onClick={() => dispatch(handleSelectModule('personnel', { workflow: 'admin-console', subMenu: 'personnel-records' }))}
                                    className={`w-full text-left flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-colors ${isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
                                >
                                    <User size={18} className="text-blue-500" /> My Profile
                                </button>
                                <div className={`h-px my-1 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 rounded-xl transition-colors font-medium"
                                >
                                    <LogOut size={18} /> Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default LaunchpadHeader;