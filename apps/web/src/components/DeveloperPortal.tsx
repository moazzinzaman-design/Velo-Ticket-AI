'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const DeveloperPortal = () => {
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [generated, setGenerated] = useState(false);

    const generateKey = () => {
        // Simulate API key generation
        const newKey = `vp_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
        setApiKey(newKey);
        setGenerated(true);
    };

    const copyToClipboard = () => {
        if (apiKey) {
            navigator.clipboard.writeText(apiKey);
            alert('API Key copied to clipboard!');
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 text-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl"
            >
                <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            Velo Developer Console
                        </h1>
                        <p className="text-zinc-400 mt-2">
                            Integrate Velo ticketing into your venue or platform.
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium border border-blue-500/20">
                            BETA ACCESS
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* API Key Management */}
                    <div className="bg-black/40 rounded-xl p-6 border border-zinc-800/50">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            🔑 API Credentials
                        </h2>

                        {!generated ? (
                            <div className="text-center py-8">
                                <p className="text-zinc-500 mb-6 text-sm">
                                    You haven't generated an API key yet.
                                </p>
                                <button
                                    onClick={generateKey}
                                    className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-colors"
                                >
                                    Generate New Key
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800 relative group">
                                    <label className="text-xs text-zinc-500 uppercase tracking-wider mb-1 block">
                                        Secret Key
                                    </label>
                                    <div className="font-mono text-green-400 break-all">
                                        {apiKey}
                                    </div>
                                    <button
                                        onClick={copyToClipboard}
                                        className="absolute top-2 right-2 p-2 hover:bg-zinc-800 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                                        title="Copy to clipboard"
                                    >
                                        📋
                                    </button>
                                </div>
                                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-xs text-yellow-200">
                                    ⚠️ Keep this key secure. Do not share it in client-side code.
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Usage Statistics */}
                    <div className="bg-black/40 rounded-xl p-6 border border-zinc-800/50">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            📊 Usage Statistics
                        </h2>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 hover:bg-zinc-800/30 rounded-lg transition-colors cursor-default">
                                <span className="text-zinc-400">Total Calls</span>
                                <span className="font-mono font-bold">1,248</span>
                            </div>
                            <div className="flex justify-between items-center p-3 hover:bg-zinc-800/30 rounded-lg transition-colors cursor-default">
                                <span className="text-zinc-400">Success Rate</span>
                                <span className="font-mono font-bold text-green-400">99.8%</span>
                            </div>
                            <div className="flex justify-between items-center p-3 hover:bg-zinc-800/30 rounded-lg transition-colors cursor-default">
                                <span className="text-zinc-400">Avg Latency</span>
                                <span className="font-mono font-bold text-blue-400">45ms</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-zinc-800">
                            <h3 className="text-sm font-medium text-zinc-300 mb-2">Endpoints</h3>
                            <div className="space-y-2 text-xs font-mono text-zinc-500">
                                <div className="flex gap-2">
                                    <span className="text-green-500">POST</span>
                                    <span>/api/partners/v1/validate</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-blue-500">GET</span>
                                    <span>/api/partners/v1/analytics</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
