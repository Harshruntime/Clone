import React from 'react'

export default function Header() {
    return (
        <div>
            <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 cursor-pointer pointer-events-auto">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3L4 19H8.5L12 11.5L15.5 19H20L12 3Z" fill="url(#google-grad-nav)" />
                        <defs>
                            <linearGradient id="google-grad-nav" x1="4" y1="3" x2="20" y2="19" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4285F4" />
                                <stop offset="0.33" stopColor="#EA4335" />
                                <stop offset="0.66" stopColor="#FBBC05" />
                                <stop offset="1" stopColor="#34A853" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span className="font-semibold text-lg tracking-tight text-slate-900">
                        Google <span className="font-normal text-slate-700">Antigravity</span>
                    </span>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 pointer-events-auto">
                    <button className="hover:text-slate-900 transition-colors flex items-center gap-1">
                        Products
                    </button>
                    <button className="hover:text-slate-900 transition-colors flex items-center gap-1">
                        Use Cases
                    </button>
                    <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
                    <a href="#enterprise" className="hover:text-slate-900 transition-colors">Enterprise</a>
                    <button className="hover:text-slate-900 transition-colors flex items-center gap-1">
                        Resources
                    </button>
                </nav>

                <a
                    href="#download"
                    className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5 py-2 text-sm font-medium transition-all shadow-sm flex items-center gap-1.5 hover:scale-105 active:scale-95 pointer-events-auto"
                >
                    Download
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </a>
            </header>
        </div>
    )
}
