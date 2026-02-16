"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, Save, Loader2 } from 'lucide-react';
import { useUser } from '../../hooks/useUser';

export default function ProfileSettings() {
    const { profile, updateProfile } = useUser();
    const [fullName, setFullName] = useState(profile?.full_name || '');
    const [email, setEmail] = useState(profile?.email || ''); // Read only usually
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateProfile({ full_name: fullName });
            // In a real app, we'd save bio and avatar here too
            await new Promise(resolve => setTimeout(resolve, 800)); // Simulate save
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-6">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 bg-white/5">
                        {profile?.avatar_url ? (
                            <img src={profile.avatar_url} alt={fullName} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/20">
                                <User size={40} />
                            </div>
                        )}
                    </div>
                    <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Camera size={24} className="text-white" />
                    </div>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">Public Profile</h3>
                    <p className="text-white/60 text-sm">Customize how you appear to other Velo members.</p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1">Display Name</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-velo-violet/50 focus:ring-1 focus:ring-velo-violet/50 transition-all"
                        placeholder="Your Name"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        disabled
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/50 cursor-not-allowed"
                        placeholder="your@email.com"
                    />
                    <p className="text-[10px] text-white/30 ml-1">Contact support to change your email.</p>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1">Bio</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-velo-violet/50 focus:ring-1 focus:ring-velo-violet/50 transition-all resize-none"
                        placeholder="Tell us a bit about yourself..."
                    />
                </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-white/10">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 bg-gradient-to-r from-velo-violet to-velo-indigo hover:from-velo-indigo hover:to-velo-violet text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-velo-violet/20 transition-all disabled:opacity-50"
                >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
}
