'use client';

import { useUser } from '../../hooks/useUser';
import { useState } from 'react';
import { User, Mail, Bell, Shield, CreditCard } from 'lucide-react';

export default function SettingsForm() {
    const { profile, updateProfile } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<any>(profile || { full_name: '', email: '' });

    // Update formData when profile loads
    if (profile && !formData.id) {
        setFormData(profile);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile(formData);
        setIsEditing(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Account Settings</h2>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-sm font-semibold text-velo-cyan hover:text-white transition-colors"
                >
                    {isEditing ? "Cancel" : "Edit Profile"}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs text-white/50 uppercase font-bold tracking-wider">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                            <input
                                type="text"
                                value={formData?.full_name || ''}
                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                disabled={!isEditing}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-velo-cyan disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-white/50 uppercase font-bold tracking-wider">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                            <input
                                type="email"
                                value={formData?.email || ''}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                disabled={!isEditing}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-velo-cyan disabled:opacity-50"
                            />
                        </div>
                    </div>
                </div>

                {isEditing && (
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-velo-cyan text-black font-bold px-6 py-2 rounded-full hover:bg-white transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                )}
            </form>

            <hr className="border-white/10 my-8" />

            <div className="space-y-6">
                <h3 className="text-lg font-bold text-white">Preferences</h3>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-white/10 rounded-lg"><Bell size={20} className="text-white" /></div>
                        <div>
                            <h4 className="font-bold text-white">Push Notifications</h4>
                            <p className="text-sm text-white/50">Receive alerts for ticket sales and event updates</p>
                        </div>
                    </div>
                    <ToggleSwitch />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-white/10 rounded-lg"><Shield size={20} className="text-white" /></div>
                        <div>
                            <h4 className="font-bold text-white">Two-Factor Authentication</h4>
                            <p className="text-sm text-white/50">Secure your account with 2FA</p>
                        </div>
                    </div>
                    <ToggleSwitch />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-white/10 rounded-lg"><CreditCard size={20} className="text-white" /></div>
                        <div>
                            <h4 className="font-bold text-white">Saved Payment Methods</h4>
                            <p className="text-sm text-white/50">Manage your cards and billing info</p>
                        </div>
                    </div>
                    <button className="text-sm font-bold text-white/60 hover:text-white">Manage</button>
                </div>
            </div>
        </div>
    );
}

function ToggleSwitch() {
    const [enabled, setEnabled] = useState(true);
    return (
        <button
            onClick={() => setEnabled(!enabled)}
            className={`w-12 h-7 rounded-full transition-colors relative ${enabled ? 'bg-velo-cyan' : 'bg-white/10'}`}
        >
            <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
    );
}
