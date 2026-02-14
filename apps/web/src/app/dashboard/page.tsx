"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Calendar, Plus, ExternalLink } from 'lucide-react';
import SalesChart from '../../components/dashboard/SalesChart';
import EventList from '../../components/dashboard/EventList';

export default function DashboardPage() {
    const [liveUsers, setLiveUsers] = useState(124);
    const [revenue, setRevenue] = useState(45230);

    // Simulate live data
    useEffect(() => {
        const interval = setInterval(() => {
            setLiveUsers(prev => prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5));
            if (Math.random() > 0.7) {
                setRevenue(prev => prev + 65 + Math.floor(Math.random() * 50));
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen pt-28 pb-20 px-6 md:px-12 bg-black">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">My Dashboard</h1>
                        <p className="text-velo-text-secondary">Welcome back, Moazzin. Here's what's happening today.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
                            <ExternalLink size={16} /> View Shop
                        </button>
                        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-velo-violet to-velo-indigo text-white font-bold shadow-lg shadow-velo-violet/20 hover:scale-[1.02] transition-transform flex items-center gap-2">
                            <Plus size={18} /> Create Event
                        </button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-velo-bg-card border border-white/10 rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-velo-text-muted text-sm font-medium">Total Revenue</span>
                            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                                <DollarSign size={16} className="text-green-500" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">
                            £{revenue.toLocaleString()}
                        </div>
                        <div className="text-xs text-green-400 flex items-center gap-1">
                            <TrendingUp size={12} />
                            +12.5% from last month
                        </div>
                    </div>

                    <div className="bg-velo-bg-card border border-white/10 rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-velo-text-muted text-sm font-medium">Active Events</span>
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <Calendar size={16} className="text-blue-500" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">
                            8
                        </div>
                        <div className="text-xs text-velo-text-muted">
                            3 selling fast
                        </div>
                    </div>

                    <div className="bg-velo-bg-card border border-white/10 rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-velo-text-muted text-sm font-medium">Live Visitors</span>
                            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center relative">
                                <span className="absolute top-0 right-0 w-2 h-2 bg-amber-500 rounded-full animate-ping" />
                                <Users size={16} className="text-amber-500" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">
                            {liveUsers}
                        </div>
                        <div className="text-xs text-amber-500">
                            Current active sessions
                        </div>
                    </div>

                    <div className="bg-velo-bg-card border border-white/10 rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-velo-text-muted text-sm font-medium">Conversion Rate</span>
                            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                <TrendingUp size={16} className="text-purple-500" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">
                            4.2%
                        </div>
                        <div className="text-xs text-green-400">
                            +0.8% this week
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Chart Section */}
                    <div className="lg:col-span-2 bg-velo-bg-card border border-white/10 rounded-3xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg text-white">Revenue Overview</h3>
                            <select className="bg-black/20 border border-white/10 rounded-lg px-3 py-1 text-xs text-white focus:outline-none">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>Year to Date</option>
                            </select>
                        </div>
                        <SalesChart />
                    </div>

                    {/* Events List */}
                    <div className="lg:col-span-1">
                        <EventList />
                    </div>
                </div>
            </div>
        </div>
    );
}
