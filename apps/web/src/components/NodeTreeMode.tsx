"use client";

import { motion } from 'framer-motion';
import { ChevronRight, Circle } from 'lucide-react';

interface NodeTreeModeProps {
    messages: { role: 'user' | 'agent', text?: string, component?: React.ReactNode }[];
}

export default function NodeTreeMode({ messages }: NodeTreeModeProps) {
    return (
        <div className="flex-1 bg-black p-6 overflow-y-auto font-mono text-green-400">
            <h3 className="text-xl font-bold mb-6 border-b border-green-800 pb-2 uppercase tracking-widest">
                /// SYSTEM_NODE_TREE_VIEW ///
            </h3>

            <div className="space-y-6">
                {messages.map((msg, idx) => (
                    <div key={idx} className="relative pl-6 border-l border-green-900/50">
                        {/* Connector Node */}
                        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-black border border-green-600 rounded-full" />

                        <div className="mb-2 flex items-center gap-2 opacity-70">
                            <span className="text-xs uppercase">{msg.role === 'user' ? '>> USER_INPUT' : '<< SYSTEM_RESPONSE'}</span>
                            <span className="text-[10px] text-green-700">{new Date().toLocaleTimeString()}</span>
                        </div>

                        {msg.text && (
                            <div className="bg-green-900/10 p-4 border border-green-900/30 rounded-sm mb-2">
                                <p className="leading-relaxed">{msg.text}</p>
                            </div>
                        )}

                        {/* If there's a component (Card), we simplify it for Zen Mode text representation */}
                        {msg.component && (
                            <div className="mt-2 text-sm text-green-300 border border-dashed border-green-800 p-3">
                                [INTERACTIVE_ELEMENT_DETECTED]
                                <br />
                                ACTION_REQUIRED: Review detailed visual interface if needed.
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
