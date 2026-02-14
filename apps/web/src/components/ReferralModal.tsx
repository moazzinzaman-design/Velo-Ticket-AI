"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Gift, Users, DollarSign, Share2, Twitter, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useReferral } from '../hooks/useReferral';

interface ReferralModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ReferralModal({ isOpen, onClose }: ReferralModalProps) {
    const { referralCode, earnings, referralCount, addMockReferral, claimEarnings } = useReferral();
    const [copied, setCopied] = useState(false);
    const referralLink = `https://velo.app/join/${referralCode}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-velo-bg-card border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        {/* Header Image/Icon */}
                        <div className="h-32 bg-gradient-to-br from-velo-violet to-velo-indigo flex items-center justify-center relative">
                            <Gift className="w-16 h-16 text-white animate-bounce" />
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white/50 hover:bg-black/40 hover:text-white transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-white mb-2">Give £5, Get £5</h2>
                                <p className="text-velo-text-secondary text-sm">
                                    Invite your friends to Velo. They get £5 off their first booking, and you get £5 credit.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
                                    <div className="text-velo-text-muted text-[10px] uppercase font-bold tracking-wider mb-1">Friends Joined</div>
                                    <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
                                        <Users size={16} className="text-velo-cyan" /> {referralCount}
                                    </div>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
                                    <div className="text-velo-text-muted text-[10px] uppercase font-bold tracking-wider mb-1">Total Earned</div>
                                    <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
                                        <DollarSign size={16} className="text-green-400" /> £{earnings}
                                    </div>
                                </div>
                            </div>

                            {/* Referral Code Box */}
                            <div className="bg-black/40 rounded-2xl p-4 border border-white/10 mb-6">
                                <div className="text-[10px] text-velo-text-muted uppercase font-bold mb-2">Your Unique Link</div>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-sm text-white truncate font-mono">
                                        {referralLink}
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        className="w-10 h-10 rounded-lg bg-velo-violet hover:bg-velo-violet/80 flex items-center justify-center text-white transition-all active:scale-95"
                                    >
                                        {copied ? <Check size={18} /> : <Copy size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Social Buttons */}
                            <div className="flex justify-center gap-4 mb-8">
                                <button className="w-12 h-12 rounded-full bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 flex items-center justify-center text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-all">
                                    <Twitter size={20} />
                                </button>
                                <button className="w-12 h-12 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/20 transition-all">
                                    <MessageCircle size={20} />
                                </button>
                                <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all">
                                    <Share2 size={20} />
                                </button>
                            </div>

                            <div className="space-y-3">
                                <button
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-velo-violet to-velo-indigo text-white font-bold shadow-lg shadow-velo-violet/20 hover:scale-[1.02] transition-transform"
                                    onClick={onClose}
                                >
                                    Done
                                </button>

                                {/* Debug button to simulate a referral */}
                                <button
                                    onClick={addMockReferral}
                                    className="w-full py-2 text-[10px] text-velo-text-muted hover:text-white transition-colors"
                                >
                                    (Debug: Simulate successful referral)
                                </button>

                                {earnings > 0 && (
                                    <button
                                        onClick={claimEarnings}
                                        className="w-full py-2 text-xs text-green-400 font-bold hover:underline"
                                    >
                                        Claim £{earnings} Reward
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
