'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ResaleModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticket: {
        event_title: string;
        original_price: number; // We might need to add this to the ticket type or pass it separately
        seat_info: string;
    };
    onConfirmListing: (price: number) => void;
}

export default function ResaleModal({ isOpen, onClose, ticket, onConfirmListing }: ResaleModalProps) {
    const [price, setPrice] = useState<string>(ticket.original_price?.toString() || '0');
    const [isConfirming, setIsConfirming] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Derived values
    const numPrice = parseFloat(price) || 0;
    const maxPrice = (ticket.original_price || 0) * 1.1; // 110% cap
    const veloFee = numPrice * 0.10; // 10% fee
    const payout = numPrice - veloFee;
    const isPriceValid = numPrice > 0 && numPrice <= maxPrice;

    const handleList = () => {
        setIsConfirming(true);
        // Simulate API call
        setTimeout(() => {
            setIsConfirming(false);
            setIsSuccess(true);
            setTimeout(() => {
                onConfirmListing(numPrice);
                onClose();
            }, 1500);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-velo-bg-card border border-white/10 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col relative">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors z-10"
                            >
                                <X size={20} />
                            </button>

                            {/* Header */}
                            <div className="p-6 bg-gradient-to-r from-velo-violet/20 to-velo-rose/20 border-b border-white/5">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <DollarSign className="text-green-400" /> Sell Ticket
                                </h3>
                                <p className="text-sm text-white/60 mt-1">
                                    List your ticket for {ticket.event_title} on the verified market.
                                </p>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-6 bg-velo-bg-deep">
                                {isSuccess ? (
                                    <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
                                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                                            <CheckCircle2 size={32} className="text-green-400" />
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-2">Ticket Listed!</h4>
                                        <p className="text-white/60">Your ticket is now active on the marketplace.</p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Price Input */}
                                        <div>
                                            <label className="text-xs text-velo-text-muted uppercase font-bold tracking-wider mb-2 block">
                                                Selling Price (£)
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">£</span>
                                                <input
                                                    type="number"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-8 pr-4 text-white font-mono text-lg focus:outline-none focus:border-velo-cyan/50 transition-colors"
                                                    placeholder="0.00"
                                                />
                                            </div>
                                            <div className="mt-2 text-xs flex justify-between">
                                                <span className={`${numPrice > maxPrice ? 'text-red-400' : 'text-white/40'}`}>
                                                    Max allowed: £{maxPrice.toFixed(2)} (110% cap)
                                                </span>
                                                {numPrice > maxPrice && (
                                                    <span className="flex items-center gap-1 text-red-400 font-bold">
                                                        <AlertCircle size={12} /> Cap Exceeded
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Breakdown */}
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                                            <div className="flex justify-between text-sm text-white/60">
                                                <span>Your Price</span>
                                                <span>£{numPrice.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-white/60">
                                                <span>Velo Service Fee (10%)</span>
                                                <span>-£{veloFee.toFixed(2)}</span>
                                            </div>
                                            <div className="h-px bg-white/10 my-2" />
                                            <div className="flex justify-between font-bold text-white text-lg">
                                                <span className="flex items-center gap-2">
                                                    <ShieldCheck size={18} className="text-velo-emerald" /> You Receive
                                                </span>
                                                <span className="text-green-400">£{payout.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="flex gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200">
                                            <ShieldCheck size={32} className="shrink-0" />
                                            <p>
                                                To prevent scalping, prices are capped at 110% of face value.
                                                When sold, your original QR code will be invalidated instantly.
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Footer */}
                            {!isSuccess && (
                                <div className="p-6 pt-0 bg-velo-bg-deep">
                                    <button
                                        onClick={handleList}
                                        disabled={!isPriceValid || isConfirming}
                                        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isPriceValid
                                                ? 'bg-gradient-to-r from-velo-violet to-velo-rose text-white shadow-lg hover:shadow-velo-violet/25 active:scale-95'
                                                : 'bg-white/10 text-white/30 cursor-not-allowed'
                                            }`}
                                    >
                                        {isConfirming ? (
                                            <>Processing...</>
                                        ) : (
                                            <>List Ticket for £{numPrice.toFixed(2)}</>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
