'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../hooks/useUser';
import { createClient } from '../../lib/supabase/client';
import TicketCard from '../../components/TicketCard';
import { Loader2, Settings, Ticket, User as UserIcon, LogOut, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleCanvas from '../../components/ParticleCanvas';

export default function ProfilePage() {
    const { user, profile, loading } = useUser();
    const router = useRouter();
    const [tickets, setTickets] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'wallet' | 'access_center' | 'organization'>('wallet');
    const [loadingTickets, setLoadingTickets] = useState(true);

    const supabase = createClient();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/'); // Redirect if not logged in
        }
    }, [user, loading, router]);

    useEffect(() => {
        async function fetchTickets() {
            if (!user) return;
            try {
                const { data, error } = await supabase
                    .from('tickets')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('event_date', { ascending: true });

                if (error) throw error;
                setTickets(data || []);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            } finally {
                setLoadingTickets(false);
            }
        }

        if (user) {
            fetchTickets();
        }
    }, [user]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-velo-bg-deep flex items-center justify-center text-white">
                <Loader2 className="animate-spin" />
            </div>
        );
    }

    if (!user) return null; // Will redirect

    return (
        <div className="min-h-screen bg-velo-bg-deep text-white pt-24 pb-24 px-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0">
                <ParticleCanvas />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-velo-bg-deep/80 to-velo-bg-deep" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-velo-violet/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-velo-cyan/5 blur-[120px] rounded-full pointer-events-none" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-velo-violet to-velo-cyan p-[2px]">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                {profile?.avatar_url ? (
                                    <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <UserIcon className="w-8 h-8 text-white/50" />
                                )}
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{profile?.full_name || user.email?.split('@')[0]}</h1>
                            <p className="text-sm text-velo-text-muted">{user.email}</p>
                            {profile?.role === 'admin' && (
                                <span className="inline-block mt-1 px-2 py-0.5 rounded bg-velo-violet/20 text-velo-violet text-[10px] font-bold uppercase tracking-wider">
                                    Admin Access
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors px-4 py-2 rounded-lg hover:bg-red-500/10"
                    >
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-8 border-b border-white/10 mb-8 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('wallet')}
                        className={`pb-4 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === 'wallet' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
                    >
                        <div className="flex items-center gap-2">
                            <Ticket size={16} /> My Wallet
                        </div>
                        {activeTab === 'wallet' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-velo-cyan" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('access_center')}
                        className={`pb-4 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === 'access_center' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
                    >
                        <div className="flex items-center gap-2">
                            <Settings size={16} /> Access Center
                        </div>
                        {activeTab === 'access_center' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-velo-cyan" />
                        )}
                    </button>
                    {profile?.role === 'organizer' && (
                        <button
                            onClick={() => setActiveTab('organization')}
                            className={`pb-4 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === 'organization' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
                        >
                            <div className="flex items-center gap-2">
                                <Building2 size={16} /> Organization
                            </div>
                            {activeTab === 'organization' && (
                                <motion.div layoutId="activeTab" className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-velo-cyan" />
                            )}
                        </button>
                    )}
                </div>

                {/* Content */}
                {/* Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'wallet' && (
                        <motion.div
                            key="wallet"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {loadingTickets ? (
                                <div className="flex justify-center py-12"><Loader2 className="animate-spin text-white/30" /></div>
                            ) : tickets.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                                    {tickets.map((ticket) => (
                                        <TicketCard key={ticket.id} ticket={ticket} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                                    <Ticket className="w-12 h-12 text-white/20 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-white mb-2">Your wallet is empty</h3>
                                    <p className="text-velo-text-secondary mb-6">You haven't purchased any tickets yet.</p>
                                    <button onClick={() => router.push('/events')} className="btn-primary px-6 py-2 rounded-full text-sm">
                                        Browse Events
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'access_center' && (
                        <motion.div
                            key="access_center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        >
                            {/* Main Identity Card */}
                            <div className="md:col-span-2 bg-white/5 rounded-3xl border border-white/10 p-8">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2 bg-velo-violet/20 rounded-lg text-velo-violet">
                                        <UserIcon size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Identity Management</h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label className="block text-xs font-semibold text-velo-text-muted uppercase tracking-wider mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                defaultValue={profile?.full_name || ''}
                                                placeholder="Your Name"
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-velo-violet transition-colors"
                                                id="full_name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-velo-text-muted uppercase tracking-wider mb-2">Avatar URL</label>
                                            <input
                                                type="text"
                                                defaultValue={profile?.avatar_url || ''}
                                                placeholder="https://..."
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-velo-violet transition-colors"
                                                id="avatar_url"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-white/5">
                                        <button
                                            onClick={async () => {
                                                const fullName = (document.getElementById('full_name') as HTMLInputElement).value;
                                                const avatarUrl = (document.getElementById('avatar_url') as HTMLInputElement).value;
                                                const { error } = await supabase
                                                    .from('profiles')
                                                    .upsert({
                                                        id: user.id,
                                                        full_name: fullName,
                                                        avatar_url: avatarUrl,
                                                        updated_at: new Date().toISOString()
                                                    });

                                                if (error) {
                                                    alert('Error updating profile');
                                                } else {
                                                    alert('Profile updated successfully!');
                                                    window.location.reload();
                                                }
                                            }}
                                            className="bg-white text-black font-bold py-3 px-6 rounded-xl hover:bg-velo-cyan transition-colors"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Security & Membership Card */}
                            <div className="space-y-6">
                                <div className="bg-white/5 rounded-3xl border border-white/10 p-6">
                                    <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                        <Settings size={16} className="text-velo-cyan" /> Security
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-velo-text-muted uppercase tracking-wider mb-1">Email</label>
                                            <div className="flex justify-between items-center text-sm text-white/50 bg-black/20 p-3 rounded-lg border border-white/5">
                                                <span className="truncate">{user.email}</span>
                                                <span className="text-velo-emerald text-xs">Verified</span>
                                            </div>
                                        </div>
                                        <button className="w-full py-2.5 rounded-lg border border-white/10 text-xs font-bold text-velo-text-secondary hover:bg-white/5 transition-colors">
                                            Change Password
                                        </button>
                                        <button className="w-full py-2.5 rounded-lg border border-white/10 text-xs font-bold text-velo-text-secondary hover:bg-white/5 transition-colors">
                                            Manage 2FA
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-velo-violet/20 to-velo-indigo/20 rounded-3xl border border-velo-violet/30 p-6 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-20">
                                        <img src="/stars.png" className="w-20" alt="" />
                                    </div>
                                    <h4 className="text-sm font-bold text-white mb-1">Velo Black</h4>
                                    <p className="text-xs text-velo-violet mb-4">Membership Status</p>

                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center border border-white/10">
                                            <span className="text-lg">💎</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">Free Plan</p>
                                            <p className="text-[10px] text-white/50">Upgrade for 0% fees</p>
                                        </div>
                                    </div>

                                    <button className="w-full py-2.5 rounded-lg bg-white text-black text-xs font-bold hover:bg-velo-cyan transition-colors shadow-lg shadow-velo-violet/10">
                                        Upgrade to Black
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'organization' && (
                        <motion.div
                            key="organization"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white/5 rounded-3xl border border-white/10 p-12 text-center"
                        >
                            <div className="w-20 h-20 bg-velo-cyan/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Building2 size={32} className="text-velo-cyan" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Organizer Dashboard</h2>
                            <p className="text-velo-text-secondary max-w-md mx-auto mb-8">
                                Manage your events, track real-time sales, and access audience insights.
                                <br /> <br />
                                <span className="text-xs font-mono text-velo-cyan bg-velo-cyan/10 px-2 py-1 rounded">BETA ACCESS</span>
                            </p>
                            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-velo-cyan to-blue-500 text-white font-bold hover:shadow-lg hover:shadow-velo-cyan/20 transition-all">
                                Request Access
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
