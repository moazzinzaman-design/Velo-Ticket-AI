'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Shield, CreditCard, Bell, Users, Lock, ToggleLeft, ToggleRight, Mail } from 'lucide-react';


export default function SettingsPage() {
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Platform Settings</h1>
                <p className="text-velo-text-secondary">Configure your platform, teams, and integrations.</p>
            </div>

            <div className="max-w-4xl space-y-8">
                {/* General Settings */}
                <section className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-velo-violet/20 text-velo-violet rounded-lg">
                            <Shield size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-white">General Configuration</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                            <div>
                                <h3 className="font-bold text-white mb-1">Maintenance Mode</h3>
                                <p className="text-sm text-white/50">Temporarily disable the platform for all users.</p>
                            </div>
                            <button
                                onClick={() => setMaintenanceMode(!maintenanceMode)}
                                className={`transition-colors ${maintenanceMode ? 'text-velo-rose' : 'text-white/20'}`}
                            >
                                {maintenanceMode ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-white/50 font-bold mb-2">Platform Name</label>
                                <input type="text" defaultValue="Velo Ticket Sales" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-velo-violet transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-white/50 font-bold mb-2">Support Email</label>
                                <input type="email" defaultValue="support@velotickets.com" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-velo-violet transition-colors" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team & Access */}
                <section className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-velo-cyan/20 text-velo-cyan rounded-lg">
                            <Users size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-white">Team & Access</h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            { name: 'Moazzin Zaman', role: 'Super Admin', email: 'moazzin@velo.com', avatar: 'M' },
                            { name: 'Platform Bot', role: 'Service Account', email: 'bot@velo.com', avatar: 'B' },
                        ].map((member, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center font-bold text-white border border-white/10">
                                        {member.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">{member.name}</h4>
                                        <p className="text-xs text-white/50">{member.email} • {member.role}</p>
                                    </div>
                                </div>
                                <button className="text-xs font-bold text-white/40 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg transition-colors">
                                    Manage
                                </button>
                            </div>
                        ))}

                        <button className="w-full py-3 border border-dashed border-white/20 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all text-sm font-bold flex items-center justify-center gap-2">
                            <Mail size={16} /> Invite New Member
                        </button>
                    </div>
                </section>

                {/* Payments */}
                <section className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-green-500/20 text-green-400 rounded-lg">
                            <CreditCard size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-white">Payments & Billing</h2>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-velo-violet/10 to-transparent rounded-xl border border-velo-violet/20 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white rounded text-[#635BFF]">
                                <svg viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg" width="60" height="25" fill="currentColor">
                                    <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 3.22h2.92c-.06-1.02-.32-3.22-3.22-3.22zM13.25 9.61v9.33h-4.5V9.61H5.48a6.56 6.56 0 0 1 1-3.66l2.35.32a4.4 4.4 0 0 0-.48 2.05h4.9zm13.39 9.33h-4.1V2.85h4.1v16.09zm19.5 0h-4.3V9.61h-.14a6.66 6.66 0 0 1-3.13-1.07v10.4h-4.3V5.7h4.3v1.65c1.4-1.2 3.48-1.74 5.3-1.6l2.27.18v3.68H46.14zM8.88 18.94H4.5V2.85h4.38v16.09z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Stripe Connect</h4>
                                <p className="text-xs text-green-400 font-bold">● Connected & Active</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-white text-black font-bold rounded-lg text-sm hover:bg-white/90 transition-colors">
                            Configure
                        </button>
                    </div>
                </section>

                <div className="flex justify-end pt-4">
                    <button className="flex items-center gap-2 px-8 py-4 bg-velo-violet hover:bg-velo-indigo rounded-xl text-white font-bold transition-all shadow-lg shadow-velo-violet/20 hover:shadow-velo-violet/40">
                        <Save size={20} />
                        Save Changes
                    </button>
                </div>
            </div>
        </>
    );
}
