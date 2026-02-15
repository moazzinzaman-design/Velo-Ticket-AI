"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Crown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useConfetti } from '../../../hooks/useConfetti';
import LivingBackground from '../../../components/LivingBackground';

export default function VeloPlusSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get('session_id');
    const { fireConfetti } = useConfetti();

    useEffect(() => {
        if (sessionId) {
            fireConfetti();
        }
    }, [sessionId, fireConfetti]);

    return (
        <div className="min-h-screen pt-28 pb-20 overflow-hidden relative flex items-center justify-center">
            <LivingBackground />

            <div className="relative z-10 max-w-md w-full px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-3xl p-8 text-center"
                >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 to-yellow-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/20">
                        <Crown className="w-10 h-10 text-black" />
                    </div>

                    <h1 className="text-3xl font-bold text-white mb-2">Welcome to the Inner Circle</h1>
                    <p className="text-velo-text-secondary mb-8">
                        Your Velo+ membership is now active. You have unlocked priority access, zero fees, and VIP status.
                    </p>

                    <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                                <Check size={14} className="text-green-400" />
                            </div>
                            <span className="text-sm text-white/80">Payment Successful</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                                <Check size={14} className="text-green-400" />
                            </div>
                            <span className="text-sm text-white/80">Velo+ Badge Applied</span>
                        </div>
                    </div>

                    <Link
                        href="/promoter"
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-200 to-yellow-500 text-black font-bold shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 transition-all flex items-center justify-center gap-2"
                    >
                        Go to Dashboard <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
