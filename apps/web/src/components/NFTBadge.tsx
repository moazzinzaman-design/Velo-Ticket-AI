"use client";

import { Gem, CheckCircle } from 'lucide-react';

export default function NFTBadge() {
    return (
        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 text-[10px] font-bold text-purple-200 uppercase tracking-wide">
            <Gem size={10} className="text-purple-400" />
            <span>Minted on VeloChain</span>
            <CheckCircle size={10} className="text-green-400 ml-1" />
        </div>
    );
}
