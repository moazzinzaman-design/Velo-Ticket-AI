"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleNecessary = () => {
        localStorage.setItem('cookie-consent', 'necessary-only');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-6 z-[9999] md:max-w-xl md:left-auto"
                >
                    <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl">
                        <h3 className="text-lg font-bold text-white mb-2">Cookie Preferences</h3>
                        <p className="text-sm text-zinc-400 mb-6">
                            We use cookies to improve your experience. Technically necessary cookies are always on.
                            Read our <Link href="/privacy" className="text-amber-400 hover:underline">Privacy Policy</Link> for details.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleAccept}
                                className="flex-1 bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-colors"
                            >
                                Accept All
                            </button>
                            <button
                                onClick={handleNecessary}
                                className="flex-1 bg-white/5 text-white font-bold py-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                Necessary Only
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
