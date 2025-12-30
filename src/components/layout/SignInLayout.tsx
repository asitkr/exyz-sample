import React, { lazy } from 'react';

import { SignInLayoutProps } from './interface';

const SignInHeader = lazy(() => import('../headers/SignInHeader'));
const SignInFooter = lazy(() => import('../footers/SignInFooter'));

const SignInLayout: React.FC<SignInLayoutProps> = ({ children }) => {
    return (
        <div className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden font-inter transition-all duration-700 dark:bg-slate-950 bg-slate-50`}>
            {/* Dynamic CSS Background (Non-WebGL 3D) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Animated 3D Grid Floor */}
                <div className="absolute bottom-0 left-[-50%] w-[200%] h-[100%] bg-[linear-gradient(to_right,#3b82f633_1px,transparent_1px),linear-gradient(to_bottom,#3b82f633_1px,transparent_1px)] bg-[size:50px_50px] [transform:perspective(500px)_rotateX(60deg)] [transform-origin:top] animate-grid-move opacity-20 dark:opacity-40"></div>

                {/* Atmospheric Blur Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[120px] animate-float"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-600/10 blur-[120px] animate-float-delayed"></div>

                {/* Decorative Grid Lines */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]"></div>
            </div>

            {/* Header */}
            <SignInHeader />

            {/* Main Content */}
            {children}

            {/* Footer */}
            <SignInFooter />
        </div>
    )
}

export default SignInLayout;