'use client';

import React from 'react';
import PromoterLayout from '../../components/promoter/PromoterLayout';
import { ArrowUpRight, Ticket, Users, DollarSign, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Mock data for dashboard
const metrics = [
    { label: 'Total Sales', value: '£124,500', change: '+12.5%', icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Tickets Sold', value: '1,240', change: '+8.2%', icon: Ticket, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Active Events', value: '4', change: '0', icon: Calendar, color: 'text-violet-400', bg: 'bg-violet-400/10' },
    { label: 'Total Attendees', value: '8,500', change: '+24%', icon: Users, color: 'text-amber-400', bg: 'bg-amber-400/10' },
];

const recentEvents = [
    { id: 1, name: 'Neon Nights Festival', date: 'Jul 15, 2026', status: 'Live', sales: 85 },
    { id: 2, name: 'Tech Summit 2026', date: 'Aug 22, 2026', status: 'Draft', sales: 0 },
    { id: 3, name: 'Jazz & Blues Eve', date: 'Sep 10, 2026', status: 'Sold Out', sales: 100 },
];

export default function PromoterDashboard() {
    return (
        <PromoterLayout>
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
                    <p className="text-white/50">Welcome back, Moazzin. Here's what's happening today.</p>
                </div>
                <Link href="/promoter/create" className="bg-white text-black font-semibold px-6 py-2.5 rounded-xl hover:bg-white/90 transition-colors flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Create Event
                </Link>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {metrics.map((metric, i) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-10 h-10 rounded-lg ${metric.bg} flex items-center justify-center`}>
                                <metric.icon className={`w-5 h-5 ${metric.color}`} />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${metric.change.startsWith('+') ? 'bg-emerald-400/10 text-emerald-400' : 'bg-white/5 text-white/40'}`}>
                                {metric.change}
                            </span>
                        </div>
                        <div className="text-2xl font-bold mb-1">{metric.value}</div>
                        <div className="text-sm text-white/40">{metric.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Events Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Recent Events</h3>
                    <Link href="/promoter/events" className="text-sm text-velo-cyan hover:text-white transition-colors flex items-center gap-1">
                        View All <ArrowUpRight size={14} />
                    </Link>
                </div>
                <div className="w-full">
                    <table className="w-full">
                        <thead className="bg-white/5 text-left text-xs text-white/40 uppercase tracking-wider font-medium">
                            <tr>
                                <th className="px-6 py-4">Event Name</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Sales</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {recentEvents.map((event) => (
                                <tr key={event.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4 font-medium">{event.name}</td>
                                    <td className="px-6 py-4 text-white/60">{event.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${event.status === 'Live' ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' :
                                                event.status === 'Sold Out' ? 'bg-velo-purple/10 text-velo-purple border-velo-purple/20' :
                                                    'bg-white/5 text-white/40 border-white/10'
                                            }`}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <span className="text-sm text-white/60">{event.sales}%</span>
                                            <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-velo-cyan to-blue-500 rounded-full"
                                                    style={{ width: `${event.sales}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </PromoterLayout>
    );
}
