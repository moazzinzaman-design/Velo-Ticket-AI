"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, X } from 'lucide-react';

interface GuestEmailModalProps {
    onContinue: (email: string, createAccount?: boolean) => void;
    onClose: () => void;
}

export default function GuestEmailModal({ onContinue, onClose }: GuestEmailModalProps) {
    const [email, setEmail] = useState('');
    const [createAccount, setCreateAccount] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (createAccount && password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        onContinue(email, createAccount);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-velo-violet/20 rounded-full blur-[50px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-velo-cyan/20 rounded-full blur-[50px] pointer-events-none" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="text-center mb-8 relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Almost There!
                    </h2>
                    <p className="text-white/60 text-sm">
                        Enter your email to receive your tickets instantly
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-white/60 ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-velo-violet/50 focus:ring-1 focus:ring-velo-violet/50 transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Optional Account Creation */}
                    <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                        <input
                            type="checkbox"
                            id="create-account"
                            checked={createAccount}
                            onChange={(e) => setCreateAccount(e.target.checked)}
                            className="mt-1 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded border border-white/30 bg-white/5 checked:border-velo-violet checked:bg-velo-violet transition-all"
                        />
                        <label htmlFor="create-account" className="text-xs text-white/60 cursor-pointer select-none">
                            <span className="text-white font-semibold">Create an account</span> to save your bookings and unlock exclusive features
                        </label>
                    </div>

                    {createAccount && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-1"
                        >
                            <label className="text-xs font-medium text-white/60 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-velo-violet/50 focus:ring-1 focus:ring-velo-violet/50 transition-all"
                                    minLength={6}
                                />
                            </div>
                        </motion.div>
                    )}

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-lg p-3"
                        >
                            {error}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-velo-violet to-velo-indigo hover:from-velo-indigo hover:to-velo-violet text-white font-bold py-3 rounded-xl shadow-lg shadow-velo-violet/20 hover:shadow-velo-violet/40 transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                        Continue to Payment
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-white/40 text-xs text-center">
                        By continuing, you agree to our <span className="text-white hover:underline cursor-pointer">Terms of Service</span>
                    </p>
                </form>
            </motion.div>
        </motion.div>
    );
}
