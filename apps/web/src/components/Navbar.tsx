"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Ticket, Search } from 'lucide-react';
import VeloPlusBadge from './VeloPlusBadge';
import { useUser } from '../hooks/useUser';

const navLinks = [
    { label: 'Events', href: '/events' },
    { label: 'My Tickets', href: '/tickets' },
    { label: 'Velo+', href: '/plus' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Features', href: '/features' },
    { label: 'About', href: '/about' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const { isVeloPlus } = useUser();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
                ? 'bg-velo-bg-deep/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-xl shadow-black/30'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-velo-violet to-velo-indigo flex items-center justify-center shadow-lg group-hover:shadow-velo-violet/30 transition-all duration-300 group-hover:scale-105">
                        <Ticket className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">
                        Velo
                    </span>
                    {isVeloPlus && <VeloPlusBadge />}
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${isActive
                                    ? 'text-white'
                                    : 'text-velo-text-secondary hover:text-white'
                                    }`}
                            >
                                {link.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-white/[0.06] rounded-lg border border-white/[0.08]"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* CTA + Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
                        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-sm text-velo-text-secondary hover:text-white transition-colors group"
                    >
                        <Search size={14} />
                        <span className="text-xs">Search...</span>
                        <div className="flex gap-0.5 text-[10px] font-mono opacity-50 bg-black/20 px-1 rounded">
                            <span>⌘</span>
                            <span>K</span>
                        </div>
                    </button>

                    <Link href="/events" className="hidden md:inline-flex btn-primary text-sm gap-2">
                        <span className="relative z-10">Get Started</span>
                    </Link>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="md:hidden bg-velo-bg-deep/95 backdrop-blur-2xl border-t border-white/[0.06] overflow-hidden"
                    >
                        <div className="px-6 py-6 flex flex-col gap-2">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`text-lg font-medium py-3 px-4 rounded-xl transition-all ${isActive
                                            ? 'text-white bg-white/[0.06]'
                                            : 'text-velo-text-secondary hover:text-white hover:bg-white/[0.03]'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                            <Link
                                href="/events"
                                onClick={() => setMobileOpen(false)}
                                className="btn-primary text-center mt-4"
                            >
                                Get Started
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
