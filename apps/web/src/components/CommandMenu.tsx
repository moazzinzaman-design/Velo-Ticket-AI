'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, MapPin, Ticket, User, Command } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CommandItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    shortcut?: string;
    action: () => void;
}

export default function CommandMenu() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const commands: CommandItem[] = [
        { id: 'events', label: 'Browse Events', icon: <Calendar size={16} />, action: () => router.push('/events') },
        { id: 'tickets', label: 'My Tickets', icon: <Ticket size={16} />, action: () => router.push('/tickets') },
        { id: 'profile', label: 'Profile Settings', icon: <User size={16} />, action: () => router.push('/profile') },
        { id: 'venues', label: 'Explore Venues', icon: <MapPin size={16} />, action: () => router.push('/venues') },
    ];

    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (action: () => void) => {
        action();
        setOpen(false);
        setQuery('');
    };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[300] flex items-start justify-center pt-[20vh] px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden relative z-10"
                    >
                        <div className="flex items-center px-4 py-3 border-b border-white/5 gap-3">
                            <Search className="w-5 h-5 text-white/40" />
                            <input
                                autoFocus
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Type a command or search..."
                                className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 font-medium"
                            />
                            <div className="flex items-center gap-1">
                                <span className="text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/60">ESC</span>
                            </div>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto p-2">
                            {filteredCommands.length > 0 ? (
                                filteredCommands.map((cmd) => (
                                    <button
                                        key={cmd.id}
                                        onClick={() => handleSelect(cmd.action)}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 text-left transition-colors group"
                                    >
                                        <div className="text-white/40 group-hover:text-white transition-colors">
                                            {cmd.icon}
                                        </div>
                                        <span className="flex-1 text-sm font-medium text-white/80 group-hover:text-white">
                                            {cmd.label}
                                        </span>
                                        {cmd.shortcut && (
                                            <span className="text-xs text-white/30 font-mono">{cmd.shortcut}</span>
                                        )}
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-center text-sm text-white/40">
                                    No results found.
                                </div>
                            )}
                        </div>
                        <div className="px-4 py-2 border-t border-white/5 bg-white/[0.02] flex items-center justify-between text-[10px] text-white/30">
                            <span>Velo Command</span>
                            <div className="flex gap-2">
                                <span className="flex items-center gap-1"><Command size={10} />K</span>
                                <span>to open</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
