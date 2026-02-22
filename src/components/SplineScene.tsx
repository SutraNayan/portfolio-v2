'use client';

import { Suspense, lazy } from 'react';

// Lazy load the heavy Spline component as recommended
const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
    scene: string;
    className?: string;
}

export function SplineScene({ scene, className = '' }: SplineSceneProps) {
    return (
        <div className={`relative w-full h-full ${className}`}>
            <Suspense
                fallback={
                    <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
                        <div className="w-10 h-10 border-2 border-accent-800 border-t-accent-200 rounded-full animate-spin" />
                        <span className="sr-only">Loading 3D Scene...</span>
                    </div>
                }
            >
                <Spline
                    scene={scene}
                    className="w-full h-full opacity-0 animate-[fadeIn_1s_ease-out_forwards]"
                />
            </Suspense>
        </div>
    );
}
