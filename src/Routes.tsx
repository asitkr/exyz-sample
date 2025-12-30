import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// outlet
const SignInOutlet = lazy(() => import('./components/outlet/SignInOutlet'));
const LaunchpadOutlet = lazy(() => import('./components/outlet/LaunchpadOutlet'));
const DashboardOutlet = lazy(() => import('./components/outlet/DashboardOutlet'));

// pages
const SignIn = lazy(() => import('./pages/SignIn'));
const Launchpad = lazy(() => import('./pages/Launchpad'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const configRoutes = {
    signin: SignIn,
    signinlayout: SignInOutlet,
    launchpad: Launchpad,
    launchpadlayout: LaunchpadOutlet,
    dashboardlayout: DashboardOutlet,
    dashboard: Dashboard,
}

export const Routes = createBrowserRouter([
    {
        path: '/signin',
        element: (<configRoutes.signinlayout />),
        children: [
            { index: true, element: (<configRoutes.signin />) }
        ],
    },
    {
        path: '/',
        element: (<configRoutes.launchpadlayout />),
        children: [
            { index: true, element: (<configRoutes.launchpad />) }
        ],
    },
    {
        path: '/:moduleId',
        element: (<configRoutes.dashboardlayout />),
        children: [
            { index: true, element: (<configRoutes.dashboard />) }
        ],
    },
])

