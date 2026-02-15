'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Download, Calendar, Filter, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';


// Mock Data
const revenueData = [
    { name: 'Jan', revenue: 4000, projected: 2400 },
    { name: 'Feb', revenue: 3000, projected: 1398 },
    { name: 'Mar', revenue: 2000, projected: 9800 },
    { name: 'Apr', revenue: 2780, projected: 3908 },
    { name: 'May', revenue: 1890, projected: 4800 },
    { name: 'June', revenue: 2390, projected: 3800 },
    { name: 'July', revenue: 3490, projected: 4300 },
];

const categoryData = [
    { name: 'Concerts', value: 400 },
    { name: 'Sports', value: 300 },
    { name: 'Theater', value: 300 },
    { name: 'Festivals', value: 200 },
];

const COLORS = ['#8b5cf6', '#06b6d4', '#f43f5e', '#10b981'];

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState('7d');

    return (
        <>
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Analytics & Reports</h1>
                    <p className="text-velo-text-secondary">Deep dive into your platform's performance.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors">
                        <Calendar size={16} />
                        <span>Last 30 Days</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-velo-violet hover:bg-velo-indigo rounded-lg text-sm font-bold text-white transition-colors shadow-lg shadow-velo-violet/20">
                        <Download size={16} />
                        <span>Export Report</span>
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Revenue', value: '£124,500', change: '+12.5%', icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/10' },
                    { label: 'Active Users', value: '856', change: '+24.0%', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { label: 'Avg. Ticket Price', value: '£68.50', change: '+5.2%', icon: Activity, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                    { label: 'Conversion Rate', value: '3.2%', change: '+1.1%', icon: TrendingUp, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-velo-text-muted text-xs uppercase tracking-wider font-bold">{stat.label}</p>
                                <h3 className="text-2xl font-bold mt-1 text-white">{stat.value}</h3>
                            </div>
                            <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                        <div className={`text-xs font-bold ${stat.color} flex items-center gap-1`}>
                            {stat.change} <span className="text-white/30 font-normal">vs last period</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Revenue Growth</h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="name" stroke="#666" axisLine={false} tickLine={false} />
                                <YAxis stroke="#666" axisLine={false} tickLine={false} tickFormatter={(value) => `£${value}`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sales by Category */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Sales by Category</h3>
                    <div className="h-[350px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-bold text-white">1.4k</span>
                            <span className="text-xs text-white/50 uppercase tracking-widest">Sales</span>
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 mt-4 flex-wrap">
                        {categoryData.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-white/70">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                                {entry.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
