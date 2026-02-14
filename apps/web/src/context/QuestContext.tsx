"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

export interface Quest {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    reward: string;
}

interface QuestContextType {
    quests: Quest[];
    completeQuest: (id: string) => void;
}

const QuestContext = createContext<QuestContextType | undefined>(undefined);

export const useQuest = () => {
    const context = useContext(QuestContext);
    if (!context) {
        throw new Error('useQuest must be used within a QuestProvider');
    }
    return context;
};

export const QuestProvider = ({ children }: { children: React.ReactNode }) => {
    const [quests, setQuests] = useState<Quest[]>([
        { id: 'voice_cmd', title: 'Voice of Reason', description: 'Use a voice command', isCompleted: false, reward: 'Neon Theme' },
        { id: 'ar_view', title: 'New Dimension', description: 'Launch the AR View', isCompleted: false, reward: 'Hologram Sticker' },
        { id: 'zen_mode', title: 'Inner Peace', description: 'Activate Zen Mode', isCompleted: false, reward: 'Matrix Code' },
    ]);
    const [notification, setNotification] = useState<Quest | null>(null);

    const completeQuest = (id: string) => {
        setQuests(prev => {
            const questIndex = prev.findIndex(q => q.id === id);
            if (questIndex === -1 || prev[questIndex].isCompleted) return prev;

            const newQuests = [...prev];
            newQuests[questIndex] = { ...newQuests[questIndex], isCompleted: true };

            // Trigger notification
            setNotification(newQuests[questIndex]);
            setTimeout(() => setNotification(null), 4000);

            return newQuests;
        });
    };

    return (
        <QuestContext.Provider value={{ quests, completeQuest }}>
            {children}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="fixed bottom-8 left-8 z-[100] p-4 bg-gradient-to-r from-yellow-600/90 to-yellow-800/90 backdrop-blur-xl border border-yellow-400/30 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.3)] flex items-center gap-4 max-w-sm pointer-events-none"
                    >
                        <div className="p-3 bg-yellow-400/20 rounded-full border border-yellow-400/50">
                            <Trophy className="text-yellow-300" size={24} />
                        </div>
                        <div>
                            <h4 className="text-yellow-100 font-bold text-sm uppercase tracking-wider">Quest Completed!</h4>
                            <p className="text-white font-bold text-lg leading-tight">{notification.title}</p>
                            <p className="text-yellow-200/80 text-xs mt-1">Reward Unlocked: {notification.reward}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </QuestContext.Provider>
    );
};
