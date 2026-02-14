"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeCheck, Info, X, DollarSign, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import type { Ticket } from '../types/ticket';
import HapticButton from './HapticButton';

interface ResaleModalProps {
    ticket: Ticket;
    onClose: () => void;
    onConfirmSearch: (price: number) => void;
}

export default function ResaleModal({ ticket, onClose, onConfirmSearch }: ResaleModalProps) {
    const [price, setPrice] = useState<string>(ticket.price.toString());
    const [step, setStep] = useState<'pricing' | 'confirm'>('pricing');

    const maxPrice = ticket.maxResalePrice || ticket.price;
    const currentPrice = parseFloat(price) || 0;
    const isOverCap = currentPrice > maxPrice;

    // Calculate payout (mock 10% fee)
    const processingFee = currentPrice * 0.10;
    const payout = currentPrice - processingFee;

    const handleConfirm = () => {
        if (isOverCap) return;
        setStep('confirm');
    };

    const handleList = () => {
        onConfirmSearch(currentPrice);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="w-full max-w-md bg-velo-bg-deep border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {step === 'pricing' ? (
                    <>
                        <div className="p-6 border-b border-white/5 bg-gradient-to-br from-velo-violet/10 to-transparent">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-white">Sell Ticket</h3>
                                <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            <p className="text-sm text-velo-text-secondary">
                                List your ticket on the Velo Exchange.
                            </p>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Ticket Info */}
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="w-12 h-12 rounded-xl bg-velo-violet/20 flex items-center justify-center">
                                    <BadgeCheck className="text-velo-violet" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">{ticket.eventName}</h4>
                                    <p className="text-xs text-velo-text-muted">{ticket.seat}</p>
                                </div>
                            </div>

                            {/* Price Input */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-velo-text-secondary flex justify-between">
                                    Selling Price
                                    <span className="text-velo-cyan text-xs flex items-center gap-1">
                                        <ShieldCheck size={12} /> Fair Value Cap: £{maxPrice.toFixed(2)}
                                    </span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">£</span>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className={`w-full bg-black/40 border rounded-xl py-4 pl-10 pr-4 text-white text-lg font-mono focus:outline-none focus:ring-2 transition-all ${isOverCap ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-velo-violet/50'
                                            }`}
                                    />
                                </div>
                                {isOverCap && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-xs flex items-center gap-1.5"
                                    >
                                        <AlertCircle size={12} />
                                        Anti-scalping active. Max allowed price is £{maxPrice.toFixed(2)}.
                                    </motion.p>
                                )}
                            </div>

                            {/* Breakdown */}
                            <div className="space-y-2 pt-2 border-t border-white/5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-velo-text-muted">Processing Fee (10%)</span>
                                    <span className="text-white/60">-£{processingFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-base font-bold text-white pt-2">
                                    <span>You Receive</span>
                                    <span className="text-green-400">£{payout.toFixed(2)}</span>
                                </div>
                            </div>

                            <HapticButton
                                onClick={handleConfirm}
                                disabled={isOverCap || currentPrice <= 0}
                                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isOverCap ? 'bg-white/5 text-white/20' : 'bg-velo-violet text-white hover:bg-velo-indigo shadow-lg shadow-velo-violet/20'
                                    }`}
                            >
                                Continue <ArrowRight size={18} />
                            </HapticButton>
                        </div>
                    </>
                ) : (
                    <div className="p-8 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <ShieldCheck size={40} className="text-green-500" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-2">Confirm Listing</h3>
                        <p className="text-velo-text-secondary mb-8">
                            Your ticket will be listed on Velo Exchange for <strong className="text-white">£{currentPrice.toFixed(2)}</strong>.
                            Funds will be transferred to your wallet instantly upon sale.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setStep('pricing')}
                                className="flex-1 py-3 rounded-xl bg-white/5 text-white font-medium hover:bg-white/10 transition-colors"
                            >
                                Back
                            </button>
                            <HapticButton
                                onClick={handleList}
                                className="flex-1 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-500 shadow-lg shadow-green-900/20"
                            >
                                List Ticket
                            </HapticButton>
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}
