"use client";

import { motion } from 'framer-motion';
import { Utensils, Clock, Users, Star } from 'lucide-react';
import HapticButton from './HapticButton';

interface DiningReservationCardProps {
    restaurant: string;
    cuisine: string;
    time: string;
    partySize: number;
    rating: number;
    priceRange: string;
}

export default function DiningReservationCard({ restaurant, cuisine, time, partySize, rating, priceRange }: DiningReservationCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 border border-white/10 rounded-xl p-4 w-full backdrop-blur-md"
        >
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h4 className="font-bold text-white text-base">{restaurant}</h4>
                    <p className="text-xs text-gray-400">{cuisine} • {priceRange}</p>
                </div>
                <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-white">{rating}</span>
                </div>
            </div>

            <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-300">
                    <Clock size={14} className="text-blue-400" />
                    <span className="text-white font-bold">{time}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                    <Users size={14} className="text-pink-400" />
                    <span className="text-white font-bold">{partySize} guests</span>
                </div>
            </div>

            <HapticButton className="w-full py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                Book Table
            </HapticButton>
        </motion.div>
    );
}
