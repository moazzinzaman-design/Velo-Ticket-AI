import React from 'react';
import { motion } from 'framer-motion';
import { Car, Zap, Clock, ExternalLink } from 'lucide-react';
import { RideOption } from '../../services/RideService';

interface RideOptionsCardProps {
    options: RideOption[];
    destination: string;
}

export default function RideOptionsCard({ options, destination }: RideOptionsCardProps) {
    return (
        <div className="w-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden mt-2">
            <div className="p-3 bg-white/5 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2 text-white/70">
                    <Car size={16} />
                    <span className="text-xs font-medium uppercase tracking-wider">Rides to {destination}</span>
                </div>
                <span className="text-[10px] text-white/30">Estimates ±2 min</span>
            </div>

            <div className="divide-y divide-white/5">
                {options.map((option, idx) => (
                    <a
                        key={idx}
                        href={option.deepLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3 hover:bg-white/5 transition-colors group cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            {/* Icon Based on Provider */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${option.provider === 'Uber' ? 'bg-black text-white' :
                                    option.provider === 'Lyft' ? 'bg-pink-600 text-white' :
                                        'bg-velo-violet text-white'
                                }`}>
                                {option.provider === 'Velo Black' ? <Zap size={14} /> : <Car size={14} />}
                            </div>

                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm text-white">{option.provider}</span>
                                    <span className="text-xs text-white/50">{option.product}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-green-400">
                                    <Clock size={10} />
                                    <span>{option.eta} min away</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="font-bold text-white">£{option.price}</span>
                            <ExternalLink size={14} className="text-white/30 group-hover:text-white transition-colors" />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
