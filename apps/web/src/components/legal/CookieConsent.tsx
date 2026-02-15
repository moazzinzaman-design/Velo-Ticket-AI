'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Check } from 'lucide-react';
import Link from 'next/link';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consented = localStorage.getItem('velo_cookie_consent');
        if (!consented) {
            // Show after a short delay
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('velo_cookie_consent', 'true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('velo_cookie_consent', 'false');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-[100] p-4 rounded-2xl bg-velo-bg-card/90 backdrop-blur-md border border-white/10 shadow-2xl"
                >
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-velo-violet/10 text-velo-violet">
                            <Cookie size={20} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-bold text-white mb-1">Cookie Preferences</h3>
                            <p className="text-xs text-white/60 mb-3 leading-relaxed">
                                We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                                <Link href="/legal/cookies" className="text-velo-cyan hover:underline ml-1">Learn more</Link>
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 py-1.5 bg-white text-black text-xs font-bold rounded-lg hover:bg-white/90 transition-colors"
                                >
                                    Accept All
                                </button>
                                <button
                                    onClick={handleDecline}
                                    className="px-3 py-1.5 bg-white/5 text-white/60 text-xs font-medium rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-white/30 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
