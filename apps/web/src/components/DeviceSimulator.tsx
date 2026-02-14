"use client";

import { motion } from 'framer-motion';
import { Smartphone, Monitor, Car, RefreshCw } from 'lucide-react';

interface DeviceSimulatorProps {
    currentDevice: 'web' | 'mobile' | 'carplay';
    setDevice: (device: 'web' | 'mobile' | 'carplay') => void;
}

export default function DeviceSimulator({ currentDevice, setDevice }: DeviceSimulatorProps) {
    return (
        <div className="flex gap-2 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/10 w-fit mx-auto shadow-lg">
            <button
                onClick={() => setDevice('web')}
                className={`p-2 rounded-full transition-all ${currentDevice === 'web' ? 'bg-white text-black shadow-lg scale-110' : 'text-gray-400 hover:text-white'}`}
                title="Desktop / Web"
            >
                <Monitor size={16} />
            </button>
            <button
                onClick={() => setDevice('mobile')}
                className={`p-2 rounded-full transition-all ${currentDevice === 'mobile' ? 'bg-white text-black shadow-lg scale-110' : 'text-gray-400 hover:text-white'}`}
                title="Mobile App"
            >
                <Smartphone size={16} />
            </button>
            <button
                onClick={() => setDevice('carplay')}
                className={`p-2 rounded-full transition-all ${currentDevice === 'carplay' ? 'bg-green-500 text-white shadow-lg scale-110' : 'text-gray-400 hover:text-white'}`}
                title="CarPlay / Auto"
            >
                <Car size={16} />
            </button>

            <div className="w-px h-6 bg-white/10 mx-1 self-center" />

            <div className="flex items-center gap-1 px-2 text-[10px] text-green-400 font-mono">
                <RefreshCw size={10} className="animate-spin" />
                <span>SYNC ACTIVE</span>
            </div>
        </div>
    );
}
