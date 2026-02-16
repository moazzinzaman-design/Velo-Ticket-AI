'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Loader2, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIEventDetailsProps {
    title: string;
    venue: string;
    date: string;
    originalDescription?: string;
}

export default function AIEventDetails({ title, venue, date, originalDescription }: AIEventDetailsProps) {
    const [description, setDescription] = useState(originalDescription);
    const [loading, setLoading] = useState(false);
    const [generated, setGenerated] = useState(false);

    useEffect(() => {
        // If description is missing or too short, generate one
        const shouldGenerate = !originalDescription || originalDescription.length < 50;

        if (shouldGenerate && !generated) {
            setLoading(true);
            fetch('/api/events/description', {
                method: 'POST',
                body: JSON.stringify({ title, venue, date }),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.description) {
                        setDescription(data.description);
                        setGenerated(true);
                    }
                })
                .catch(err => console.error('Failed to generate description', err))
                .finally(() => setLoading(false));
        }
    }, [title, venue, date, originalDescription, generated]);

    if (loading) {
        return (
            <div className="flex items-center gap-2 text-velo-cyan/70 text-sm animate-pulse">
                <Sparkles size={14} />
                <span>Velo AI is curating event details...</span>
            </div>
        );
    }

    return (
        <div className="relative group">
            <AnimatePresence>
                {generated && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-8 left-0 flex items-center gap-1.5 px-2 py-1 rounded-md bg-velo-violet/10 border border-velo-violet/20 text-[10px] font-bold text-velo-violet uppercase tracking-wider"
                    >
                        <Bot size={12} />
                        AI Generated Insight
                    </motion.div>
                )}
            </AnimatePresence>

            <p className="text-xl text-velo-text-secondary leading-relaxed font-light">
                {description}
            </p>
        </div>
    );
}
