'use client';

import { useState } from 'react';
import ProfileLayout from '../../components/account/ProfileLayout';
import TicketWallet from '../../components/account/TicketWallet';
import MembershipCard from '../../components/account/MembershipCard';
import SettingsForm from '../../components/account/SettingsForm';
import { useUser } from '../../hooks/useUser';
import { motion } from 'framer-motion';

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'membership' | 'settings'>('overview');
    const { profile, tickets, isVeloPlus } = useUser();

    // Render content based on active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'tickets':
                return <TicketWallet />;
            case 'membership':
                return <MembershipCard />;
            case 'settings':
                return <SettingsForm />;
            case 'overview':
            default:
                return (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {profile.name.split(' ')[0]}</h2>
                            <p className="text-white/60">Here is what's happening with your Velo account.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Summary Cards */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
                            >
                                <h3 className="text-white/60 text-sm font-bold uppercase tracking-wider mb-2">Upcoming Events</h3>
                                <p className="text-4xl font-bold text-white">{tickets.length}</p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
                            >
                                <h3 className="text-white/60 text-sm font-bold uppercase tracking-wider mb-2">Membership Status</h3>
                                <p className={`text-2xl font-bold ${isVeloPlus ? 'text-amber-400' : 'text-white'}`}>
                                    {isVeloPlus ? 'Velo Black' : 'Standard'}
                                </p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
                            >
                                <h3 className="text-white/60 text-sm font-bold uppercase tracking-wider mb-2">Loyalty Points</h3>
                                <p className="text-4xl font-bold text-velo-cyan">2,450</p>
                            </motion.div>
                        </div>

                        {/* Recent Activity / Next Event Teaser */}
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 mt-8">
                            <h3 className="text-xl font-bold text-white mb-4">Next Up</h3>
                            {tickets.length > 0 ? (
                                <div className="flex items-center gap-6">
                                    <img src={tickets[0].eventImage} alt="Event" className="w-20 h-20 rounded-xl object-cover" />
                                    <div>
                                        <h4 className="text-lg font-bold text-white">{tickets[0].eventTitle}</h4>
                                        <p className="text-white/60">{tickets[0].eventDate} • {tickets[0].eventVenue}</p>
                                    </div>
                                    <button
                                        onClick={() => setActiveTab('tickets')}
                                        className="ml-auto px-4 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
                                    >
                                        View Ticket
                                    </button>
                                </div>
                            ) : (
                                <p className="text-white/60">No upcoming events. <a href="/events" className="text-velo-cyan hover:underline">Browse events</a></p>
                            )}
                        </div>
                    </div>
                );
        }
    };

    return (
        <ProfileLayout activeTab={activeTab} onTabChange={setActiveTab}>
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {renderContent()}
            </motion.div>
        </ProfileLayout>
    );
}
