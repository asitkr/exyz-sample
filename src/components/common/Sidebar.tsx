import React, { useEffect, useState } from 'react'
import { Anchor, ChevronDown, ChevronsLeft, ChevronsRight, Grid, LogOut, Settings, X } from 'lucide-react';

import { closeMobileMenu, handleNavigate, resetActiveModuleId, setSidebarCollapsed } from '../../redux/slices/uiSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/slices/authSlice';
import { MenuItem } from '../../utils/types';
import { SidebarProps } from './interface';
import { selectMenusForModule } from '../../redux/slices/staticSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC<SidebarProps> = ({ activeContext }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { sidebarCollapsed, mobileMenuOpen, activeModuleId } = useAppSelector(state => state.ui);
    const { role, userId } = useAppSelector(state => state.auth);
    const { filteredMenus } = useAppSelector(state => state.static);
    const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
    // const { selectMenusForModule}

    useEffect(() => {
        if (activeModuleId) {
            dispatch(selectMenusForModule({ moduleId: activeModuleId, role: role, userId }));
        }
    }, [activeModuleId, role, userId, dispatch]);

    const renderMenuItem = (item: MenuItem, depth: number = 0, parentId: string | null = null, grandParentId: string | null = null) => {
        const hasChildren = item.subItems && item.subItems.length > 0;
        const isExpanded = expandedMenus[item.id];
        const Icon = item.icon;

        let isActive = false;
        if (depth === 0) isActive = activeContext.menuId === item.id;
        if (depth === 1) isActive = activeContext.subId === item.id;
        if (depth === 2) isActive = activeContext.childId === item.id;

        const paddingLeft = depth === 0 ? '0.75rem' : `${depth * 1.5 + 0.75}rem`;

        // Determine if we are in a visual state where text is hidden (Desktop Collapsed)
        // On Mobile, sidebar is always "Expanded" width when visible.
        const isVisualCollapsed = sidebarCollapsed;

        const toggleExpand = (id: string, e: React.MouseEvent) => {
            e.stopPropagation();

            // Auto-expand sidebar if it's collapsed (Desktop)
            if (sidebarCollapsed && window.innerWidth >= 768) {
                dispatch(setSidebarCollapsed(false));
            }

            setExpandedMenus(prev => ({ ...prev, [id]: !prev[id] }));
        };

        return (
            <div key={item.id} className="w-full relative group">
                <button
                    onClick={(e) => {
                        if (hasChildren) {
                            toggleExpand(item.id, e);
                        } else {
                            if (depth === 0) handleNavigate({ workflow: item.id });
                            if (depth === 1 && parentId) handleNavigate({ workflow: parentId, subMenu: item.id });
                            if (depth === 2 && grandParentId && parentId) handleNavigate({ workflow: grandParentId, subMenu: parentId, childMenu: item.id });
                            // Close mobile menu on navigate
                            if (window.innerWidth < 768) dispatch(closeMobileMenu());
                        }
                    }}
                    className={`w-full flex items-center justify-between py-3 pr-3 my-0.5 rounded-xl transition-all duration-300
                        ${isActive && !hasChildren
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                            : isActive && hasChildren
                                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-white/5 font-semibold'
                                : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'}
                        `}
                    style={{ paddingLeft: isVisualCollapsed && depth === 0 ? '0.75rem' : paddingLeft }}
                >
                    <div className="flex items-center gap-3">
                        {depth === 0 && Icon && (
                            <Icon className={`w-5 h-5 min-w-[20px] ${isActive && !hasChildren ? 'text-white' : 'text-slate-400 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white'}`} />
                        )}
                        {(!isVisualCollapsed) && (
                            <span className={`font-medium whitespace-nowrap text-sm ${isActive ? 'font-semibold' : ''}`}>
                                {item.label}
                            </span>
                        )}
                    </div>

                    {!isVisualCollapsed && hasChildren && (
                        <ChevronDown
                            className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        />
                    )}
                </button>

                {/* Hover Tooltip when Collapsed (Desktop Only) */}
                {isVisualCollapsed && depth === 0 && (
                    <div className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[100] whitespace-nowrap border border-slate-700">
                        {item.label}
                        <div className="absolute top-1/2 right-full -translate-y-1/2 -mr-[1px] border-4 border-transparent border-r-slate-800"></div>
                    </div>
                )}

                {!isVisualCollapsed && hasChildren && (
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        {item.subItems!.map(sub => renderMenuItem(sub, depth + 1, item.id, parentId))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            {/* Mobile Backdrop */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden animate-fade-in-up"
                    onClick={() => dispatch(closeMobileMenu())}
                ></div>
            )}

            <aside
                className={`fixed left-0 top-0 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-white/10 shadow-2xl z-50
          transition-all duration-300 ease-in-out flex flex-col ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 ${sidebarCollapsed ? 'max-w-72 md:max-w-20' : 'w-72'}`}
            >
                {/* Sidebar Header */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950/50">
                    {/* Logo Area - Visible when Expanded */}
                    <div className={`flex items-center gap-3 overflow-hidden ${sidebarCollapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100 flex'} transition-all duration-300`}>
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
                            <Anchor className="text-white w-5 h-5" />
                        </div>
                        <div className="min-w-max">
                            <span className="text-lg font-bold tracking-[0.1em] text-slate-900 dark:text-white block leading-none">HORIZON</span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-widest leading-none">{activeModuleId || 'APP'}</span>
                        </div>
                    </div>

                    {/* Collapsed State: Expand Button Centered */}
                    {sidebarCollapsed && (
                        <button
                            onClick={() => dispatch(setSidebarCollapsed(false))}
                            className="hidden md:flex w-full items-center justify-center h-10 text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all"
                            title="Expand Sidebar"
                        >
                            <ChevronsRight size={24} />
                        </button>
                    )}

                    {/* Expanded State: Collapse Button Right */}
                    {!sidebarCollapsed && (
                        <button
                            onClick={() => dispatch(setSidebarCollapsed(true))}
                            className="hidden md:flex p-2 text-slate-400 hover:text-blue-500 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                            title="Collapse Sidebar"
                        >
                            <ChevronsLeft size={20} />
                        </button>
                    )}

                    {/* Mobile Close Button */}
                    <button onClick={() => dispatch(closeMobileMenu())} className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                        <X size={20} />
                    </button>
                </div>

                {/* App Switcher */}
                <div className="p-3 border-b border-slate-200 dark:border-white/10 relative group">
                    <button
                        onClick={() => {dispatch(resetActiveModuleId()); navigate('/')} }
                        className={`w-full flex items-center gap-3 p-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-md ${sidebarCollapsed ? 'md:justify-center' : ''}`}
                    >
                        <Grid className="w-5 h-5 min-w-[20px]" />
                        <span className={`font-bold text-sm whitespace-nowrap transition-all duration-300 ${sidebarCollapsed ? 'md:opacity-0 md:w-0 md:hidden' : 'opacity-100 w-auto block'}`}>Switch Apps</span>
                    </button>

                    {sidebarCollapsed && (
                        <div className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[100] whitespace-nowrap border border-slate-700">
                            Switch Apps
                            <div className="absolute top-1/2 right-full -translate-y-1/2 -mr-[1px] border-4 border-transparent border-r-slate-800"></div>
                        </div>
                    )}
                </div>

                {/* Menu Items */}
                <div className="flex-1 py-6 px-3 space-y-1 scrollbar-hide">
                    {filteredMenus.map(item => renderMenuItem(item))}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/30">
                    <div className="relative group w-full">
                        <button
                            onClick={() => { dispatch(handleNavigate({ workflow: 'global-settings' })); dispatch(closeMobileMenu()); }}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl text-slate-500 dark:text-gray-400 hover:bg-white hover:shadow-md dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all ${sidebarCollapsed ? 'md:justify-center' : ''}`}
                        >
                            <Settings className="w-5 h-5 min-w-[20px]" />
                            <span className={`font-medium whitespace-nowrap transition-all duration-300 ${sidebarCollapsed ? 'md:opacity-0 md:w-0 md:hidden' : 'opacity-100 w-auto block'}`}>
                                Settings
                            </span>
                        </button>
                        {sidebarCollapsed && (
                            <div className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[100] whitespace-nowrap border border-slate-700">
                                Settings
                                <div className="absolute top-1/2 right-full -translate-y-1/2 -mr-[1px] border-4 border-transparent border-r-slate-800"></div>
                            </div>
                        )}
                    </div>

                    <div className="relative group w-full mt-1">
                        <button onClick={() => dispatch(logout())} className={`w-full flex items-center gap-3 p-3 rounded-xl text-red-500/80 dark:text-red-400 hover:bg-red-50 hover:shadow-md dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-300 transition-all ${sidebarCollapsed ? 'md:justify-center' : ''}`}>
                            <LogOut className="w-5 h-5 min-w-[20px]" />
                            <span className={`font-medium whitespace-nowrap transition-all duration-300 ${sidebarCollapsed ? 'md:opacity-0 md:w-0 md:hidden' : 'opacity-100 w-auto block'}`}>
                                Sign Out
                            </span>
                        </button>
                        {sidebarCollapsed && (
                            <div className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[100] whitespace-nowrap border border-slate-700">
                                Sign Out
                                <div className="absolute top-1/2 right-full -translate-y-1/2 -mr-[1px] border-4 border-transparent border-r-slate-800"></div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar;