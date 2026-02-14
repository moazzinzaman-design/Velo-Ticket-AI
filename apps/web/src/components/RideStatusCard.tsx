"use client";

import { motion } from 'framer-motion';
import { Car, MapPin, Clock } from 'lucide-react';

interface RideStatusCardProps {
    provider: 'UBER' | 'LYFT' | 'WAYMO';
    eta: string;
    vehicle: string;
    cost: string;
    destination: string;
}

export default function RideStatusCard({ provider, eta, vehicle, cost, destination }: RideStatusCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 border border-white/10 rounded-xl p-4 w-full backdrop-blur-md"
        >
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${provider === 'UBER' ? 'bg-black text-white' : 'bg-pink-500 text-white'}`}>
                        <Car size={16} />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-sm">{provider}</h4>
                        <p className="text-xs text-gray-400">{vehicle}</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="block font-bold text-white">{cost}</span>
                    <span className="text-xs text-green-400">Confirmed</span>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-300">
                    <Clock size={12} className="text-blue-400" />
                    <span>Arriving in <span className="text-white font-bold">{eta}</span></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                    <MapPin size={12} className="text-red-400" />
                    <span className="truncate">To: {destination}</span>
                </div>
            </div>
        </motion.div>
    );
}
