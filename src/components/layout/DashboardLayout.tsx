import React, { lazy } from 'react';

import { SidebarLayoutProps } from './interface';
import { useAppSelector } from '../../redux/hooks';

const Sidebar = lazy(() => import('../common/Sidebar'));

const DashboardLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
    const { navContext } = useAppSelector(state => state.ui);

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden font-inter transition-colors duration-300">
            <Sidebar
                activeContext={{ menuId: navContext?.workflow, subId: navContext?.subMenu, childId: navContext?.childMenu }}
            />

            {children}
        </div>
    )
}

export default DashboardLayout;