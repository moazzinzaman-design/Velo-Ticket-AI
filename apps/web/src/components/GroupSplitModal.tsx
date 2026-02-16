"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, Check, Users, ArrowRight, X, Crown, Armchair, Plus } from 'lucide-react';
import type { GroupBooking } from '../types/group';

interface GroupSplitModalProps {
    booking: GroupBooking;
    onClose: () => void;
}

export default function GroupSplitModal({ booking, onClose }: GroupSplitModalProps) {
    const [copied, setCopied] = useState(false);

    // In a real app this would be the actual URL
    const shareUrl = `${window.location.origin}/split/${booking.id}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const progress = (booking.members.filter(m => m.status === 'paid').length / booking.members.length) * 100;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[250] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="w-full max-w-md glass-elevated rounded-3xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 bg-gradient-to-br from-velo-violet/20 to-transparent">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                            <Users size={20} className="text-white" />
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">Group Booking Created!</h3>
                    <p className="text-sm text-velo-text-secondary">
                        <span className="text-velo-cyan font-semibold">1/4</span> friends have paid
                    </p>
                </div>

                {/* Progress */}
                <div className="px-6 py-4 border-b border-white/10">
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                        <motion.div
                            className="h-full bg-gradient-to-r from-velo-cyan to-velo-violet"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        />
                    </div>
                    <p className="text-xs text-velo-text-muted text-center">
                        Invite your friends to pay for their tickets within 15:00
                    </p>
                </div>

                {/* Group Upgrades */}
                <div className="px-6 py-4 bg-white/5 border-b border-white/10">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-velo-text-muted mb-3 flex items-center justify-between">
                        Upgrade Your Squad
                        <span className="text-velo-cyan text-[10px] px-2 py-0.5 bg-velo-cyan/10 rounded-full">New</span>
                    </h4>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-black/20 hover:border-velo-violet/50 hover:bg-velo-violet/5 transition-colors cursor-pointer group">
                            <div className="w-10 h-10 rounded-lg bg-velo-violet/20 flex items-center justify-center text-velo-violet group-hover:scale-110 transition-transform">
                                <Crown size={18} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <h5 className="font-bold text-sm text-white">VIP Package</h5>
                                    <span className="text-xs font-bold text-velo-cyan">+£20<span className="text-white/40 font-normal">/pp</span></span>
                                </div>
                                <p className="text-[11px] text-white/50">Skip the queue & get a free drink.</p>
                            </div>
                            <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center group-hover:border-velo-violet">
                                <Plus size={12} className="text-white/0 group-hover:text-velo-violet transition-colors" />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-black/20 hover:border-amber-400/50 hover:bg-amber-400/5 transition-colors cursor-pointer group">
                            <div className="w-10 h-10 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                                <Armchair size={18} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <h5 className="font-bold text-sm text-white">Private Booth</h5>
                                    <span className="text-xs font-bold text-amber-400">+£200<span className="text-white/40 font-normal"> total</span></span>
                                </div>
                                <p className="text-[11px] text-white/50">Dedicated seating for 6 + bottle service.</p>
                            </div>
                            <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center group-hover:border-amber-400">
                                <Plus size={12} className="text-white/0 group-hover:text-amber-400 transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Share Link */}
                <div className="p-6 space-y-4">
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                        <label className="text-xs font-semibold uppercase tracking-wider text-velo-text-muted mb-2 block">
                            Share Invite Link
                        </label>
                        <div className="flex items-center gap-2">
                            <code className="flex-1 text-sm text-velo-cyan bg-black/20 px-3 py-2 rounded-lg border border-white/5 truncate">
                                {shareUrl}
                            </code>
                            <button
                                onClick={handleCopy}
                                className={`p-2 rounded-lg transition-colors ${copied
                                    ? 'bg-velo-emerald/20 text-velo-emerald'
                                    : 'bg-white/5 hover:bg-white/10 text-white'
                                    }`}
                            >
                                {copied ? <Check size={18} /> : <Copy size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={async () => {
                            if (navigator.share) {
                                try {
                                    await navigator.share({
                                        title: `Join me for ${booking.eventName}`,
                                        text: `I've reserved tickets for ${booking.eventName}. Pay your share here:`,
                                        url: shareUrl,
                                    });
                                } catch (e) {
                                    console.log('Error sharing:', e);
                                }
                            } else {
                                handleCopy();
                            }
                        }}
                        className="w-full bg-gradient-to-r from-velo-violet to-velo-indigo text-white font-semibold px-6 py-3.5 rounded-xl hover:shadow-lg hover:shadow-velo-violet/20 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <Share2 size={18} />
                        Share with Friends
                    </button>
                </div>

                {/* Members List */}
                <div className="bg-black/20 p-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-velo-text-muted mb-3">
                        Who's Going?
                    </h4>
                    <div className="space-y-3">
                        {booking.members.map((member) => (
                            <div key={member.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${member.status === 'paid'
                                        ? 'bg-velo-emerald/20 text-velo-emerald border-velo-emerald/30'
                                        : 'bg-white/5 text-white/40 border-white/10'
                                        }`}>
                                        {member.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm text-white font-medium">{member.name}</p>
                                        <p className="text-xs text-velo-text-muted">
                                            {member.status === 'paid' ? 'Paid' : 'Pending payment'}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-sm text-white/70">£{member.shareAmount.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
