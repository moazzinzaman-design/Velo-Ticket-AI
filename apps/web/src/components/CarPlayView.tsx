"use client";

import { motion } from 'framer-motion';
import { Mic, Navigation, MapPin, Calendar, Check } from 'lucide-react';

export default function CarPlayView() {
    return (
        <div className="w-full h-full bg-black flex flex-col p-6 font-sans">
            {/* CarPlay Sidebar */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gray-900 border-r border-white/10 flex flex-col items-center py-6 gap-8">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-black rounded-full" />
                </div>
                <Navigation size={32} className="text-blue-500" />
                <Calendar size={32} className="text-white/50" />
                <div className="mt-auto">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                        <Mic size={20} className="text-white" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="ml-24 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-2">Heading to The Sphere</h2>
                        <div className="flex items-center gap-3 text-2xl text-gray-400">
                            <MapPin size={24} />
                            <span>15 min • 3.2 mi</span>
                        </div>
                    </div>
                    <div className="bg-green-600 px-6 py-3 rounded-xl flex items-center gap-3">
                        <span className="text-xl font-bold text-white">ON TIME</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 flex-1">
                    {/* Navigation Card */}
                    <div className="bg-gray-800 rounded-2xl p-6 flex flex-col justify-between">
                        <div className="flex items-start justify-between">
                            <Navigation size={40} className="text-blue-500" />
                            <span className="text-2xl font-bold text-white">200 ft</span>
                        </div>
                        <p className="text-3xl font-medium text-white max-w-[80%]">Turn right onto Sands Ave</p>
                    </div>

                    {/* Velo Agent Context Card */}
                    <div className="bg-blue-900/30 border border-blue-500/30 rounded-2xl p-6 flex flex-col relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-500/10 animate-pulse" />
                        <div className="relative z-10">
                            <h3 className="text-xl text-blue-300 font-bold mb-2">VELO UPDATE</h3>
                            <p className="text-3xl text-white font-medium leading-tight">
                                "Tickets are ready. Scanning at Entry Gate 4."
                            </p>
                        </div>
                        <div className="mt-auto flex gap-4 relative z-10">
                            <button className="bg-white/10 hover:bg-white/20 px-6 py-4 rounded-xl text-xl font-bold text-white flex-1">
                                Read
                            </button>
                            <button className="bg-blue-600 hover:bg-blue-500 px-6 py-4 rounded-xl text-xl font-bold text-white flex-1 flex items-center justify-center gap-2">
                                <Check size={24} /> OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
