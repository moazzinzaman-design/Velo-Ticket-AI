"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, MapPin, Ticket } from 'lucide-react';

// Mock data for order history
const orders = [
    {
        id: 'ORD-12345-AB',
        date: 'Oct 15, 2025',
        event: 'The Rolling Stones - Hackney Diamonds Tour',
        venue: 'SoFi Stadium, Los Angeles',
        total: '$450.00',
        tickets: 2,
        status: 'Completed',
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=300'
    },
    {
        id: 'ORD-98765-CD',
        date: 'Sep 22, 2025',
        event: 'Neon Garden - Immersive Art Experience',
        venue: 'Area15, Las Vegas',
        total: '$120.00',
        tickets: 4,
        status: 'Completed',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=300'
    },
    {
        id: 'ORD-54321-EF',
        date: 'Aug 10, 2025',
        event: 'Formula 1 - Las Vegas Grand Prix',
        venue: 'Las Vegas Strip Circuit',
        total: '$1,250.00',
        tickets: 1,
        status: 'Refunded',
        image: 'https://images.unsplash.com/photo-1517177646641-83fe10f14633?auto=format&fit=crop&q=80&w=300'
    }
];

export default function OrderHistory() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-bold text-white mb-1">Order History</h3>
                <p className="text-white/60 text-sm">View past transactions and download invoices.</p>
            </div>

            <div className="space-y-4">
                {orders.map((order, i) => (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors group"
                    >
                        <div className="flex flex-col md:flex-row gap-4 items-start">
                            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                                <img src={order.image} alt={order.event} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-white text-lg truncate pr-4">{order.event}</h4>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${order.status === 'Completed'
                                            ? 'bg-velo-emerald/20 text-velo-emerald'
                                            : 'bg-red-400/20 text-red-400'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="text-sm text-white/50 space-y-0.5 mt-1">
                                    <p className="flex items-center gap-1.5"><Calendar size={12} /> {order.date}</p>
                                    <p className="flex items-center gap-1.5"><MapPin size={12} /> {order.venue}</p>
                                </div>
                            </div>

                            <div className="w-full md:w-auto flex md:flex-col items-center md:items-end justify-between gap-2 mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
                                <div className="text-right">
                                    <p className="text-lg font-bold text-white">{order.total}</p>
                                    <p className="text-xs text-white/40">{order.tickets} Ticket{order.tickets > 1 ? 's' : ''}</p>
                                </div>
                                <button className="flex items-center gap-2 text-xs font-bold text-velo-cyan bg-velo-cyan/10 hover:bg-velo-cyan/20 px-3 py-1.5 rounded-lg transition-colors">
                                    <Download size={14} />
                                    Invoice
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
