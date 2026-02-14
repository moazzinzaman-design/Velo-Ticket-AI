"use client";

import { Crown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VeloPlusBadge() {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-1 bg-gradient-to-r from-amber-200 to-yellow-400 text-black px-2 py-0.5 rounded-full text-[10px] font-bold shadow-[0_0_10px_rgba(251,191,36,0.4)]"
        >
            <Crown size={10} fill="currentColor" />
            PLUS
        </motion.div>
    );
}
