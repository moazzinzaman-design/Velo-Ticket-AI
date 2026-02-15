'use client';

import { useUser } from '../../hooks/useUser';
import { motion } from 'framer-motion';
import { Crown, Check, Zap, Sparkles } from 'lucide-react';

export default function MembershipCard() {
    const { isVeloPlus, joinVeloPlus, cancelVeloPlus } = useUser();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Membership</h2>

            <div className={`relative rounded-3xl overflow-hidden p-8 ${isVeloPlus ? 'bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-white/10' : 'bg-white/5 border border-white/10'}`}>
                {/* Metallic Shine Effect for Premium */}
                {isVeloPlus && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent shimmer-effect pointer-events-none" />
                )}

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Crown className={isVeloPlus ? "text-amber-400" : "text-white/40"} size={32} />
                            <h3 className={`text-3xl font-bold ${isVeloPlus ? "text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600" : "text-white"}`}>
                                {isVeloPlus ? "Velo Black" : "Velo Standard"}
                            </h3>
                        </div>
                        <p className="text-white/60">
                            {isVeloPlus
                                ? "You are a founding member of the Velo Black tier."
                                : "Upgrade to unlock exclusive access and perks."}
                        </p>
                    </div>

                    <button
                        onClick={isVeloPlus ? cancelVeloPlus : joinVeloPlus}
                        className={`px-6 py-3 rounded-full font-bold transition-all ${isVeloPlus
                                ? "bg-white/10 text-white hover:bg-white/20"
                                : "bg-gradient-to-r from-amber-400 to-yellow-600 text-black hover:scale-105 shadow-lg shadow-amber-500/20"
                            }`}
                    >
                        {isVeloPlus ? "Manage Membership" : "Upgrade to Black"}
                    </button>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <Benefit
                        icon={<Zap size={20} />}
                        title="Early Access"
                        desc="Book tickets 24h before general public"
                        active={isVeloPlus}
                    />
                    <Benefit
                        icon={<Sparkles size={20} />}
                        title="AI Concierge"
                        desc="Unlimited access to dining & ride booking"
                        active={isVeloPlus}
                    />
                    <Benefit
                        icon={<Crown size={20} />}
                        title="Velo Lounge"
                        desc="VIP entry at supported venues"
                        active={isVeloPlus}
                    />
                </div>
            </div>
        </div>
    );
}

function Benefit({ icon, title, desc, active }: { icon: any, title: string, desc: string, active: boolean }) {
    return (
        <div className={`p-4 rounded-xl border ${active ? "bg-white/5 border-white/10" : "bg-white/5 border-white/5 opacity-50"} transition-colors`}>
            <div className={`mb-3 ${active ? "text-amber-400" : "text-white/40"}`}>{icon}</div>
            <h4 className="font-bold text-white mb-1">{title}</h4>
            <p className="text-sm text-white/50">{desc}</p>
        </div>
    );
}
