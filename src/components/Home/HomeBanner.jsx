'use client';

import dynamic from 'next/dynamic';

const Antigravity = dynamic(() => import('@/components/Antigravity'), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-white" />
});

export default function HomeBanner() {
    return (
        <div className="relative min-h-screen bg-white text-slate-900 flex flex-col justify-between font-sans overflow-hidden select-none">
            {/* Background Interactive Antigravity Canvas Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Antigravity
                    count={2000}
                    magnetRadius={8}
                    ringRadius={10}
                    waveSpeed={1.5}
                    waveAmplitude={1}
                    particleSize={1.2}
                    lerpSpeed={0.05}
                    multiColor={true}
                    autoAnimate={true}
                    particleVariance={1.1}
                    rotationSpeed={0}
                    depthFactor={1.9}
                    pulseSpeed={2.5}
                    particleShape="sphere"
                    fieldStrength={10}
                />
            </div>

            <main className="relative z-10 w-full top-20 px-6 py-20 flex flex-col items-center text-center h-screen pointer-events-none">
                <div className="flex items-center gap-2 mb-8 cursor-default pointer-events-none">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3L4 19H8.5L12 11.5L15.5 19H20L12 3Z" fill="url(#google-grad-hero)" />
                        <defs>
                            <linearGradient id="google-grad-hero" x1="4" y1="3" x2="20" y2="19" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4285F4" />
                                <stop offset="0.33" stopColor="#EA4335" />
                                <stop offset="0.66" stopColor="#FBBC05" />
                                <stop offset="1" stopColor="#34A853" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span className="text-2xl font-bold tracking-tight text-slate-900">
                        Google <span className="font-normal text-slate-700">Antigravity</span>
                    </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-slate-900 leading-[1.08] mb-12 pointer-events-none select-none w-4xl">
                    Experience liftoff with the next-gen agent platform
                </h1>

                <div className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
                    <a
                        href="#download-windows"
                        className="w-full sm:w-auto bg-slate-950 hover:bg-slate-800 text-white px-7 py-3.5 rounded-full font-medium text-base shadow-md transition-all flex items-center justify-center gap-2.5 hover:scale-105 active:scale-95"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M0 3.449L9.75 2.1v9.451H0m10.95-9.6L24 0v11.4H10.95M0 12.6h9.75v9.451L0 20.701M10.95 12.6H24V24l-13.05-1.8" />
                        </svg>
                        Download for Windows
                    </a>
                    <a
                        href="#explore"
                        className="w-full sm:w-auto bg-slate-100/90 hover:bg-slate-200/90 text-slate-800 border border-slate-200/60 px-7 py-3.5 rounded-full font-medium text-base transition-all flex items-center justify-center hover:scale-105 active:scale-95"
                    >
                        Explore use cases
                    </a>
                </div>
            </main>

        </div>
    );
}
