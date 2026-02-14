"use client";

import { useState } from 'react';
import HapticButton from './HapticButton';
import { useQuest } from '../context/QuestContext';

export default function ARPreview() {
    const [active, setActive] = useState(false);
    const { completeQuest } = useQuest();

    const launchAR = () => {
        setActive(true);
        completeQuest('ar_view');
    };

    return (
        <div className="w-full h-[400px] relative rounded-2xl overflow-hidden glass-primary group border border-white/10">
            {!active ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-tr from-black/60 to-transparent backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-4 glass-text">Phygital Seat Preview</h3>
                    <p className="text-gray-300 mb-6 text-sm">Experience the view from Section 102, Row B</p>
                    <HapticButton
                        onClick={launchAR}
                        variant="secondary"
                        className="px-6 py-3 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        Launch AR View
                    </HapticButton>
                </div>
            ) : (
                <div className="w-full h-full relative perspective-1000 bg-black overflow-hidden">
                    {/* Simulated 4K 3D Environment - Pan Effect */}
                    <div
                        className="absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center transition-transform duration-200 ease-out"
                        style={{
                            backgroundImage: 'url(/assets/stadium_view_4k.png)',
                        }}
                        onMouseMove={(e) => {
                            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                            const x = (e.clientX - left) / width - 0.5;
                            const y = (e.clientY - top) / height - 0.5;
                            e.currentTarget.style.transform = `translate(${x * -20}px, ${y * -20}px) scale(1.1)`;
                        }}
                    />

                    {/* Phygital HUD Overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Top Left: Status Indicators */}
                        <div className="absolute top-4 left-4 flex gap-2">
                            <span className="px-2 py-1 bg-red-600/80 text-white text-xs font-bold rounded animate-pulse border border-red-400/50 shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                                LIVE 4K FEED
                            </span>
                            <span className="px-2 py-1 bg-blue-600/40 text-blue-200 text-xs font-bold rounded backdrop-blur-md border border-blue-400/30">
                                AR ENHANCED
                            </span>
                        </div>

                        {/* Top Right: Close Button */}
                        <button
                            onClick={() => setActive(false)}
                            className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors pointer-events-auto border border-white/10"
                        >
                            ✕
                        </button>

                        {/* Center: Reticle */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full flex items-center justify-center opacity-30">
                            <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
                        </div>

                        {/* Bottom Left: Seat Stats */}
                        <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                            <div className="p-3 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl">
                                <h4 className="text-white font-bold text-sm mb-1">SECTION 102, ROW B</h4>
                                <div className="flex items-center gap-3 text-xs text-gray-300">
                                    <span className="flex items-center gap-1 text-green-400 font-bold">
                                        $350.00
                                    </span>
                                    <span className="w-px h-3 bg-white/20" />
                                    <span className="flex items-center gap-1 text-yellow-400">
                                        ★★★★★ View
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Right: Exclusive Merch Drop */}
                        <div className="absolute bottom-6 right-6">
                            <div className="p-3 bg-gradient-to-br from-purple-900/80 to-black/80 backdrop-blur-xl rounded-xl border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)] max-w-[180px]">
                                <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider mb-1 block">Exclusive Drop</span>
                                <p className="text-white text-xs font-bold leading-tight">Daft Punk "Discovery" Ltd. Digital Vinyl</p>
                                <button className="mt-2 w-full py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold rounded transition-colors pointer-events-auto">
                                    CLAIM NFT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
