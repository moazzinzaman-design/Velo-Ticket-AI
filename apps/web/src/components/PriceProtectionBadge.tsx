"use client";

import { motion } from 'framer-motion';
import { ShieldCheck, TrendingDown, Wallet, ArrowDownRight } from 'lucide-react';
import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { useCurrency } from '../hooks/useCurrency';

// Mock Data for Price History (normalized to base currency GBP)
const mockHistory = [
    { date: 'Purchase', price: 150 },
    { date: 'Week 1', price: 155 },
    { date: 'Week 2', price: 160 },
    { date: 'Week 3', price: 145 },
    { date: 'Today', price: 135 },
];

export default function PriceProtectionBadge() {
    return (
        <motion.div
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-full px-3 py-1.5 backdrop-blur-md cursor-pointer hover:bg-blue-500/30 transition-colors"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
        >
            <ShieldCheck size={14} className="text-blue-400" />
            <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-blue-300 leading-none tracking-wider">
                    Price Protected
                </span>
                <span className="text-[8px] text-blue-400/70 leading-none mt-0.5 font-mono">
                    Best Price Guarantee
                </span>
            </div>
        </motion.div>
    );
}

export function PriceHistoryModal({ purchasePrice, currentPrice, onClose }: { purchasePrice: number, currentPrice: number, onClose: () => void }) {
    const { formatPrice, rate } = useCurrency();
    const [claimed, setClaimed] = useState(false);
    const refundAmount = Math.max(0, purchasePrice - currentPrice);

    // Convert history for chart
    const chartData = mockHistory.map(h => ({
        ...h,
        price: h.price * rate
    }));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 text-center"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="bg-velo-bg-card border border-white/10 rounded-2xl p-6 w-full max-w-xs shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />

                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                    <TrendingDown size={32} className="text-blue-400" />
                </div>

                <h3 className="text-lg font-bold text-white mb-1">Price Drop Detected!</h3>
                <p className="text-xs text-white/50 mb-6">Since your purchase, the market price has dropped. You are covered by Velo Price Protection.</p>

                <div className="h-32 w-full mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <XAxis dataKey="date" hide />
                            <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                                formatter={(value: number) => [formatPrice(value / rate), 'Price']}
                            />
                            <Area type="monotone" dataKey="price" stroke="#60A5FA" fill="#60A5FA20" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl mb-6">
                    <div className="text-left">
                        <p className="text-[10px] text-gray-400 uppercase">Refund Amount</p>
                        <p className="text-xl font-bold text-green-400 flex items-center gap-1">
                            +{formatPrice(refundAmount)}
                            {claimed && <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-green-500 ml-1">PAID</motion.span>}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-400 uppercase">New Price</p>
                        <p className="text-sm font-medium text-white">{formatPrice(currentPrice)}</p>
                    </div>
                </div>

                {!claimed ? (
                    <button
                        onClick={() => setClaimed(true)}
                        className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
                    >
                        <Wallet size={18} />
                        Claim Refund
                    </button>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full py-3 bg-green-500/20 border border-green-500/30 text-green-400 font-bold rounded-xl flex items-center justify-center gap-2"
                    >
                        <ShieldCheck size={18} />
                        Refund Processed
                    </motion.div>
                )}

                <button
                    onClick={onClose}
                    className="mt-4 text-xs text-gray-500 hover:text-white transition-colors"
                >
                    Close
                </button>
            </div>
        </motion.div>
    );
}
