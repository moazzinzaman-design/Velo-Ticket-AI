import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, ShoppingBag, Check } from 'lucide-react';

export interface AddOn {
    id: string;
    name: string;
    description: string;
    price: number;
    type: 'insurance' | 'fast-track' | 'merch';
    icon: React.ElementType;
}

interface AddOnSelectorProps {
    addons: AddOn[];
    selectedIds: string[];
    onToggle: (id: string) => void;
    baseTicketPrice: number;
}

export default function AddOnSelector({ addons, selectedIds, onToggle, baseTicketPrice }: AddOnSelectorProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Customize Your Experience</h3>
            <div className="space-y-3">
                {addons.map((addon) => {
                    const isSelected = selectedIds.includes(addon.id);
                    // Dynamic price for insurance (e.g. 7%)
                    const price = addon.type === 'insurance'
                        ? Math.round(baseTicketPrice * 0.07)
                        : addon.price;

                    return (
                        <motion.div
                            key={addon.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`relative p-4 rounded-xl border transition-all cursor-pointer overflow-hidden group ${isSelected
                                    ? 'bg-velo-violet/20 border-velo-violet shadow-[0_0_20px_rgba(139,92,246,0.2)]'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                                }`}
                            onClick={() => onToggle(addon.id)}
                        >
                            <div className="flex items-start gap-4 relative z-10">
                                <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-velo-violet text-white' : 'bg-white/10 text-white/50'}`}>
                                    <addon.icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className={`font-semibold ${isSelected ? 'text-white' : 'text-white/80'}`}>
                                            {addon.name}
                                        </h4>
                                        <span className={`font-bold ${isSelected ? 'text-velo-cyan' : 'text-white/60'}`}>
                                            +£{price.toFixed(2)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-white/50 mt-1">{addon.description}</p>
                                </div>
                                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${isSelected
                                        ? 'bg-velo-violet border-velo-violet'
                                        : 'border-white/20 group-hover:border-white/40'
                                    }`}>
                                    {isSelected && <Check size={14} className="text-white" />}
                                </div>
                            </div>

                            {/* Selection Glow */}
                            {isSelected && (
                                <div className="absolute inset-0 bg-gradient-to-r from-velo-violet/10 to-transparent pointer-events-none" />
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
