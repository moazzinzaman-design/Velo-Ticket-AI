'use client';

import { useUser } from '../../hooks/useUser';
import { Home, Ticket, Crown, Settings, LogOut, Calendar } from 'lucide-react';
import Link from 'next/link';

interface ProfileLayoutProps {
    children: React.ReactNode;
    activeTab: 'overview' | 'tickets' | 'history' | 'membership' | 'settings';
    onTabChange: (tab: any) => void;
}

export default function ProfileLayout({ children, activeTab, onTabChange }: ProfileLayoutProps) {
    const { profile } = useUser();

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: Home },
        { id: 'tickets', label: 'My Tickets', icon: Ticket },
        { id: 'history', label: 'Order History', icon: Calendar },
        { id: 'membership', label: 'Membership', icon: Crown },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* User Profile Card */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                        <div className="relative inline-block mb-4">
                            <img
                                src={profile.avatar_url || ''}
                                alt={profile.full_name || 'User'}
                                className="w-24 h-24 rounded-full border-2 border-velo-cyan object-cover"
                            />
                            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-black rounded-full" />
                        </div>
                        <h2 className="text-xl font-bold text-white">{profile.full_name || 'User'}</h2>
                        <p className="text-white/60 text-sm mb-4">{profile.email}</p>
                        <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-velo-cyan tracking-wider">
                            MEMBER SINCE {profile.member_since?.toUpperCase()}
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                        <ul className="space-y-2">
                            {menuItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => onTabChange(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id
                                            ? "bg-velo-cyan text-black font-bold shadow-lg shadow-velo-cyan/20"
                                            : "text-white/60 hover:bg-white/10 hover:text-white"
                                            }`}
                                    >
                                        <item.icon size={18} />
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 pt-6 border-t border-white/10">
                            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
                                <LogOut size={18} />
                                Sign Out
                            </button>
                        </div>
                    </nav>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md min-h-[600px]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
