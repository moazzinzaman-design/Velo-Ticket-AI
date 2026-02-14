"use client";

import { motion } from 'framer-motion';
import { ShieldCheck, Code, Gavel } from 'lucide-react';

interface SmartContractPolicyProps {
    enforced: boolean;
}

export default function SmartContractPolicy({ enforced }: SmartContractPolicyProps) {
    return (
        <div className={`rounded-xl border p-4 backdrop-blur-md overflow-hidden relative ${enforced
                ? 'bg-blue-900/20 border-blue-500/30'
                : 'bg-gray-900/20 border-gray-700/30 grayscale opacity-70'
            }`}>
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${enforced ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700/50 text-gray-400'}`}>
                    <Code size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-white text-sm">VeloChain Resale Protocol</h3>
                    <p className="text-xs text-gray-400">Contract Address: 0x8F...2Ac9</p>
                </div>
                {enforced && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto bg-green-500/20 text-green-400 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider flex items-center gap-1"
                    >
                        <ShieldCheck size={12} /> Active
                    </motion.div>
                )}
            </div>

            <div className="bg-black/50 rounded-lg p-3 font-mono text-xs text-blue-300 overflow-x-auto">
                <p className="opacity-50 mb-1">// Anti-Scalping Logic</p>
                <div className="space-y-1">
                    <p><span className="text-purple-400">function</span> <span className="text-yellow-300">enforceCap</span>(price) {'{'}</p>
                    <p className="pl-4">
                        <span className="text-purple-400">if</span> (price &gt; faceValue * <span className="text-green-400">1.1</span>) {'{'}
                    </p>
                    <p className="pl-8 text-red-400">revert("Price exceeds 110% cap");</p>
                    <p className="pl-4">{'}'}</p>
                    <p>{'}'}</p>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-gray-400 flex items-center gap-1">
                    <Gavel size={12} />
                    <span>Max Resale Markup: <span className="text-white font-bold">10%</span></span>
                </div>
                <div className="text-xs text-gray-400">
                    Royalty to Venue: <span className="text-white font-bold">5%</span>
                </div>
            </div>
        </div>
    );
}
