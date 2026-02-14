"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, Activity, Map as MapIcon, TrendingUp } from 'lucide-react';

import TakeRateOptimizer from './TakeRateOptimizer';
import DemandForecastChart from './DemandForecastChart';

// Simulated User Data
interface TrackedUser {
    id: number;
    x: number;
    y: number;
    section: string;
    spendingPower: 'high' | 'medium' | 'low';
}

export default function AdminDashboard() {
    const [users, setUsers] = useState<TrackedUser[]>([]);
    const [viewMode, setViewMode] = useState<'tracking' | 'revenue' | 'analytics'>('tracking');
    const [stats, setStats] = useState({ totalUsers: 0, avgSpend: 0, busySection: '' });

    // Initialize and simulate movement
    useEffect(() => {
        // Initial population
        const initialUsers: TrackedUser[] = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            section: Math.random() > 0.5 ? 'A' : 'B',
            spendingPower: Math.random() > 0.7 ? 'high' : (Math.random() > 0.4 ? 'medium' : 'low')
        }));
        setUsers(initialUsers);

        // Movement loop
        const interval = setInterval(() => {
            setUsers(prev => prev.map(u => ({
                ...u,
                x: Math.max(0, Math.min(100, u.x + (Math.random() - 0.5) * 5)),
                y: Math.max(0, Math.min(100, u.y + (Math.random() - 0.5) * 5))
            })));

            // Update stats
            setStats({
                totalUsers: 12450, // Simulated total
                avgSpend: 45.20,
                busySection: 'Section B (VIP)'
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[600px]">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-gray-900/50">
                <div className="flex items-center gap-2">
                    <Activity className="text-blue-500" size={18} />
                    <h2 className="text-white font-bold text-sm tracking-wider">VELO ENTEPRISE • <span className="text-gray-400">VENUE OPS</span></h2>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode('tracking')}
                        className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${viewMode === 'tracking' ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'
                            }`}
                    >
                        <Users size={14} /> Tracking
                    </button>
                    <button
                        onClick={() => setViewMode('revenue')}
                        className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${viewMode === 'revenue' ? 'bg-green-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'
                            }`}
                    >
                        <DollarSign size={14} /> Revenue
                    </button>
                    <button
                        onClick={() => setViewMode('analytics')}
                        className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${viewMode === 'analytics' ? 'bg-velo-cyan text-black' : 'bg-white/5 text-gray-400 hover:text-white'
                            }`}
                    >
                        <TrendingUp size={14} /> Analytics
                    </button>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-px bg-white/10">
                <div className="bg-black/40 p-3 text-center">
                    <p className="text-[10px] text-gray-500 uppercase">Live Attendance</p>
                    <p className="text-lg font-mono text-white">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <div className="bg-black/40 p-3 text-center">
                    <p className="text-[10px] text-gray-500 uppercase">Avg. Spend</p>
                    <p className="text-lg font-mono text-green-400">${stats.avgSpend.toFixed(2)}</p>
                </div>
                <div className="bg-black/40 p-3 text-center">
                    <p className="text-[10px] text-gray-500 uppercase">Hot Zone</p>
                    <p className="text-lg font-mono text-red-400">{stats.busySection}</p>
                </div>
            </div>

            {/* Main Content Area */}
            {viewMode === 'analytics' ? (
                <div className="flex-1 m-4 rounded-xl border border-white/5 bg-gray-900 overflow-hidden">
                    <DemandForecastChart />
                </div>
            ) : (
                <div className="flex-1 relative bg-gray-900 m-4 rounded-xl border border-white/5 overflow-hidden group mb-0">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}
                    />

                    {/* Labels */}
                    <span className="absolute top-2 left-2 text-[10px] text-gray-500 font-mono">SECTION A (GEN ADM)</span>
                    <span className="absolute bottom-2 right-2 text-[10px] text-gray-500 font-mono">SECTION B (VIP)</span>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[48px] font-bold text-white/5 pointer-events-none">STAGE</span>

                    {/* Users (Dots) */}
                    {users.map(user => (
                        <motion.div
                            key={user.id}
                            layout
                            initial={false}
                            animate={{ x: `${user.x}%`, y: `${user.y}%` }}
                            transition={{ duration: 1, ease: "linear" }}
                            className={`absolute w-1.5 h-1.5 rounded-full shadow-lg ${viewMode === 'revenue'
                                ? (user.spendingPower === 'high' ? 'bg-green-400 box-shadow-green' : user.spendingPower === 'medium' ? 'bg-yellow-400' : 'bg-gray-600')
                                : 'bg-blue-400'
                                }`}
                            style={{ boxShadow: viewMode === 'tracking' ? '0 0 4px #60A5FA' : 'none' }}
                        />
                    ))}

                    {viewMode === 'tracking' && (
                        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                            <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_4px_#60A5FA]" /> Active User
                            </div>
                        </div>
                    )}

                    {viewMode === 'revenue' && (
                        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                            <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400" /> High Spender
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" /> Med Spender
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-600" /> Low Spender
                            </div>
                        </div>
                    )}

                </div>
            )}

            {/* Optimizer Section */}
            <div className="px-4 pb-4">
                <TakeRateOptimizer />
            </div>
        </div>
    );
}
