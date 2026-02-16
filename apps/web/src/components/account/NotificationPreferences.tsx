"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, Smartphone, Globe } from 'lucide-react';

interface Preference {
    id: string;
    label: string;
    description: string;
    channels: {
        email: boolean;
        push: boolean;
        sms: boolean;
    };
}

export default function NotificationPreferences() {
    const [preferences, setPreferences] = useState<Preference[]>([
        {
            id: 'tickets',
            label: 'Ticket Availability',
            description: 'Get notified when tickets go on sale for events you follow.',
            channels: { email: true, push: true, sms: false },
        },
        {
            id: 'prices',
            label: 'Price Alerts',
            description: 'Receive alerts when prices drop for events on your wishlist.',
            channels: { email: true, push: true, sms: true },
        },
        {
            id: 'marketing',
            label: 'News & Offers',
            description: 'Stay updated on new features, promotions, and partner deals.',
            channels: { email: true, push: false, sms: false },
        },
        {
            id: 'security',
            label: 'Security Alerts',
            description: 'Important notifications about your account security and sign-ins.',
            channels: { email: true, push: true, sms: true },
        },
    ]);

    const toggleChannel = (prefId: string, channel: 'email' | 'push' | 'sms') => {
        setPreferences(prev => prev.map(p =>
            p.id === prefId
                ? { ...p, channels: { ...p.channels, [channel]: !p.channels[channel] } }
                : p
        ));
    };

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-bold text-white mb-1">Notification Preferences</h3>
                <p className="text-white/60 text-sm">Choose how and when you want to be notified.</p>
            </div>

            <div className="space-y-6">
                {preferences.map((pref) => (
                    <div key={pref.id} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div className="flex-1">
                                <h4 className="font-bold text-white mb-1">{pref.label}</h4>
                                <p className="text-sm text-white/50 leading-relaxed">{pref.description}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <Toggle
                                    active={pref.channels.email}
                                    icon={<Mail size={14} />}
                                    label="Email"
                                    onClick={() => toggleChannel(pref.id, 'email')}
                                />
                                <Toggle
                                    active={pref.channels.push}
                                    icon={<Bell size={14} />}
                                    label="Push"
                                    onClick={() => toggleChannel(pref.id, 'push')}
                                />
                                <Toggle
                                    active={pref.channels.sms}
                                    icon={<Smartphone size={14} />}
                                    label="SMS"
                                    onClick={() => toggleChannel(pref.id, 'sms')}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-4">
                <button className="bg-white text-black font-bold px-6 py-2.5 rounded-xl hover:bg-white/90 transition-colors">
                    Save Changes
                </button>
            </div>
        </div>
    );
}

function Toggle({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center gap-2 transition-all group ${active ? 'opacity-100' : 'opacity-40 hover:opacity-60'}`}
        >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${active
                    ? 'bg-velo-cyan/20 border-velo-cyan text-velo-cyan shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                    : 'bg-white/5 border-white/10 text-white group-hover:border-white/20'
                }`}>
                {icon}
            </div>
            <span className="text-[10px] font-medium text-white uppercase tracking-wider">{label}</span>
        </button>
    );
}
