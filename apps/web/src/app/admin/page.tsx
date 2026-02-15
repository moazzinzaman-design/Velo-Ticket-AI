'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../hooks/useUser';
import { createClient } from '../../lib/supabase/client';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Shield, Users, DollarSign, Ticket, Search, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminDashboard() {
    const { user, profile, isAdmin, loading, checkSession } = useUser();
    const router = useRouter();
    const [stats, setStats] = useState({ revenue: 0, ticketsSold: 0, activeUsers: 0 });
    const [recentSales, setRecentSales] = useState<any[]>([]);
    const [scanResult, setScanResult] = useState<{ status: 'valid' | 'invalid' | 'used' | null; message?: string }>({ status: null });
    const [scanInput, setScanInput] = useState('');
    const supabase = createClient();

    // Check session on mount to ensure we have the latest role
    useEffect(() => {
        checkSession();
    }, []);

    useEffect(() => {
        if (!loading && !isAdmin) {
            // Redirect non-admins
            router.push('/');
        }
    }, [isAdmin, loading, router]);

    useEffect(() => {
        if (isAdmin) {
            fetchStats();
        }
    }, [isAdmin]);

    async function fetchStats() {
        // Mock stats for V1 visual (would be real DB queries)
        // In real app: await supabase.from('orders').select('sum(total_amount)')...
        setStats({
            revenue: 124500, // £124,500
            ticketsSold: 1420,
            activeUsers: 856
        });

        // Fetch recent tickets
        const { data } = await supabase
            .from('tickets')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);

        setRecentSales(data || []);
    }

    async function handleScan() {
        if (!scanInput) return;
        setScanResult({ status: null });

        try {
            // Check if ticket exists via UUID or QR code string
            const { data, error } = await supabase
                .from('tickets')
                .select('*')
                .eq('qr_code', scanInput) // Asuming input is QR code
                .single();

            if (error || !data) {
                setScanResult({ status: 'invalid', message: 'Ticket not found.' });
                return;
            }

            if (data.status === 'used') {
                setScanResult({ status: 'used', message: `Ticket already used at ${new Date().toLocaleTimeString()}` });
            } else {
                // Mark as used
                await supabase.from('tickets').update({ status: 'used' }).eq('id', data.id);
                setScanResult({ status: 'valid', message: `Valid Ticket! Access Granted for ${data.event_title}` });
            }
        } catch (err) {
            setScanResult({ status: 'invalid', message: 'Error scanning ticket.' });
        }
    }

    if (loading) return <div className="h-screen flex items-center justify-center bg-black text-white"><Loader2 className="animate-spin" /></div>;
    if (!isAdmin) return null;

    return (
        <>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-velo-text-secondary">Real-time platform overview.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 text-sm backdrop-blur-md">
                        <span className="text-gray-400 mr-2">System Status:</span>
                        <span className="text-green-400 font-bold animate-pulse">● OPERATIONAL</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-400 text-sm uppercase tracking-wider">Total Revenue</p>
                            <h3 className="text-3xl font-bold mt-1">£{stats.revenue.toLocaleString()}</h3>
                        </div>
                        <div className="p-3 bg-green-500/20 rounded-xl text-green-400"><DollarSign size={24} /></div>
                    </div>
                    <div className="text-sm text-green-400 flex items-center gap-1">+12.5% <span className="text-gray-500">vs last month</span></div>
                </motion.div>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-400 text-sm uppercase tracking-wider">Tickets Sold</p>
                            <h3 className="text-3xl font-bold mt-1">{stats.ticketsSold.toLocaleString()}</h3>
                        </div>
                        <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400"><Ticket size={24} /></div>
                    </div>
                    <div className="text-sm text-blue-400 flex items-center gap-1">+8.2% <span className="text-gray-500">new orders</span></div>
                </motion.div>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-400 text-sm uppercase tracking-wider">Active Users</p>
                            <h3 className="text-3xl font-bold mt-1">{stats.activeUsers.toLocaleString()}</h3>
                        </div>
                        <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400"><Users size={24} /></div>
                    </div>
                    <div className="text-sm text-purple-400 flex items-center gap-1">+24% <span className="text-gray-500">engagement rate</span></div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-6">Revenue Trends</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                                { name: 'Mon', value: 4000 }, { name: 'Tue', value: 3000 }, { name: 'Wed', value: 5000 },
                                { name: 'Thu', value: 2780 }, { name: 'Fri', value: 1890 }, { name: 'Sat', value: 2390 }, { name: 'Sun', value: 3490 }
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="name" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                                <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Ticket Scanner */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Search className="text-velo-cyan" /> Gate Scanner
                    </h3>
                    <div className="bg-black/40 rounded-xl p-4 mb-6">
                        <p className="text-sm text-gray-400 mb-3">Enter Ticket ID or QR Code</p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={scanInput}
                                onChange={(e) => setScanInput(e.target.value)}
                                placeholder="UUID..."
                                className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-velo-violet"
                            />
                            <button onClick={handleScan} className="bg-velo-violet hover:bg-velo-indigo px-4 py-2 rounded-lg font-bold">
                                Scan
                            </button>
                        </div>
                    </div>

                    {scanResult.status && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`p-4 rounded-xl border ${scanResult.status === 'valid' ? 'bg-green-500/10 border-green-500/30' :
                                scanResult.status === 'used' ? 'bg-yellow-500/10 border-yellow-500/30' :
                                    'bg-red-500/10 border-red-500/30'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-1">
                                {scanResult.status === 'valid' && <CheckCircle className="text-green-400" />}
                                {scanResult.status === 'used' && <AlertCircle className="text-yellow-400" />}
                                {scanResult.status === 'invalid' && <AlertCircle className="text-red-400" />}
                                <h4 className={`font-bold ${scanResult.status === 'valid' ? 'text-green-400' :
                                    scanResult.status === 'used' ? 'text-yellow-400' :
                                        'text-red-400'
                                    }`}>
                                    {scanResult.status === 'valid' ? 'ACCESS GRANTED' :
                                        scanResult.status === 'used' ? 'ALREADY SCANNED' :
                                            'INVALID TICKET'}
                                </h4>
                            </div>
                            <p className="text-sm text-white/70">{scanResult.message}</p>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/10">
                    <h3 className="font-bold text-lg">Recent Tickets</h3>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="p-4">Event</th>
                            <th className="p-4">User</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {recentSales.map((ticket, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-medium">{ticket.event_title}</td>
                                <td className="p-4 text-gray-400">{ticket.user_id?.slice(0, 8)}...</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${ticket.status === 'valid' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                        {ticket.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-400 text-sm">{new Date(ticket.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        {recentSales.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">No recent tickets found via Supabase.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </>
    );
}
