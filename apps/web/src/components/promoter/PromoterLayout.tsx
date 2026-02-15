'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    CalendarPlus,
    BarChart3,
    Settings,
    LogOut,
    Ticket
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PromoterLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { label: 'Overview', href: '/promoter', icon: LayoutDashboard },
        { label: 'Create Event', href: '/promoter/create', icon: CalendarPlus },
        { label: 'Analytics', href: '/promoter/analytics', icon: BarChart3 },
        { label: 'Settings', href: '/promoter/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-black flex text-white pt-20">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 hidden md:flex flex-col fixed top-20 bottom-0 left-0 bg-black/50 backdrop-blur-xl z-10">
                <div className="p-6">
                    <div className="flex items-center gap-3 px-2 mb-8">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-velo-cyan to-blue-600 flex items-center justify-center">
                            <Ticket className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-lg tracking-tight">Promoter Console</span>
                    </div>

                    <nav className="flex flex-col gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${isActive
                                            ? 'text-white font-medium'
                                            : 'text-white/50 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="promoterNav"
                                            className="absolute inset-0 bg-white/10 rounded-xl border border-white/5"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <item.icon size={18} className={`relative z-10 ${isActive ? 'text-velo-cyan' : 'group-hover:text-white transition-colors'}`} />
                                    <span className="relative z-10">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-white/5">
                    <button className="flex items-center gap-3 px-4 py-3 text-white/40 hover:text-red-400 transition-colors w-full rounded-xl hover:bg-red-500/10">
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                    <div className="mt-4 px-4 text-[10px] text-white/20 text-center font-mono">
                        Velo Promoter v1.0.0
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-6 md:p-10 relative overflow-hidden">
                {/* Background ambient glow specific to promoter area */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-velo-cyan/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="relative z-10 max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
