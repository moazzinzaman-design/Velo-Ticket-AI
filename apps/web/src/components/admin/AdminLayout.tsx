'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, BarChart3, Settings, Shield, LogOut } from 'lucide-react';
import { useUser } from '../../hooks/useUser';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();
    const { profile, signOut } = useUser();

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
        { label: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
        { label: 'Settings', icon: Settings, href: '/admin/settings' },
    ];

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-white/5 backdrop-blur-xl fixed inset-y-0 left-0 z-50 flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-velo-violet to-velo-indigo flex items-center justify-center shadow-lg shadow-velo-violet/20">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg tracking-tight">Velo Admin</h1>
                            <p className="text-xs text-velo-text-muted">Promoter Console</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 mt-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href}>
                                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-velo-violet text-white shadow-lg shadow-velo-violet/20' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                                    <item.icon size={20} className={`${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`} />
                                    <span className="font-medium text-sm">{item.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeAdminNav"
                                            className="absolute left-0 w-1 h-8 bg-velo-violet rounded-r-full"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        />
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10 flex items-center justify-center text-xs font-bold font-mono">
                            {profile?.full_name?.charAt(0) || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{profile?.full_name || 'Admin'}</p>
                            <p className="text-xs text-velo-text-muted truncate">{profile?.email}</p>
                        </div>
                        <button
                            onClick={signOut}
                            className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-red-400 transition-colors"
                            title="Sign Out"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 min-h-screen bg-velo-bg-deep relative">
                {/* Background Ambient Glow */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-velo-violet/10 rounded-full blur-[150px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-velo-cyan/5 rounded-full blur-[150px]" />
                </div>

                <div className="relative z-10 p-8 pt-12 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
