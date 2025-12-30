import React, { lazy } from 'react';

const DashboardLayout = lazy(() => import('../components/layout/DashboardLayout'));

const Dashboard: React.FC = () => {
    return (
        <DashboardLayout>
            Dashboard
        </DashboardLayout>
    )
}

export default Dashboard;