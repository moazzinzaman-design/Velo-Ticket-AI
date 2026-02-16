"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Zap, Globe, Star, Calendar, MapPin, Clock, ChevronRight, Users, BarChart3, Lock, Ticket, TrendingUp, Mail } from 'lucide-react';
import VeloAgentPanel from '../components/VeloAgentPanel';
import ParticleCanvas from '../components/ParticleCanvas';
import WaitlistButton from '../components/WaitlistButton';

import ScrollReveal from '../components/visuals/ScrollReveal';
import { veloBus } from '../lib/veloBus';

import { RealEvent } from '../data/realEvents';
/* ─── Featured Events Data ─── */
const useFeaturedEvents = () => {
    const [events, setEvents] = useState<RealEvent[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('/api/events?limit=3');
                const data = await res.json();
                if (data.events && Array.isArray(data.events)) {
                    setEvents(data.events);
                }
            } catch (error) {
                console.error('Failed to fetch featured events', error);
            }
        };
        fetchEvents();
    }, []);
    return events;
};

/* ─── How It Works Steps ─── */
const steps = [
    {
        icon: Sparkles,
        title: 'Discover',
        description: 'Our AI concierge learns your taste and surfaces events you\'ll love, before you even search.',
        gradient: 'from-velo-violet to-velo-indigo',
    },
    {
        icon: Lock,
        title: 'Book Securely',
        description: 'Quantum-encrypted transactions with anti-scalping protection. Fair prices, always.',
        gradient: 'from-velo-cyan to-blue-600',
    },
    {
        icon: Zap,
        title: 'Experience',
        description: 'From ride coordination to dining and real-time updates, your entire evening is orchestrated.',
        gradient: 'from-velo-emerald to-teal-500',
    },
];

/* ─── Stats ─── */
const stats = [
    { target: 99, suffix: '.9%', label: 'Uptime', icon: TrendingUp },
    { target: 100, suffix: '%', label: 'Secure', icon: Shield },
    { target: 24, suffix: '/7', label: 'AI Concierge', icon: Sparkles },
    { target: 0.8, suffix: 's', label: 'Avg Booking', icon: Zap },
];

/* ─── Feature Highlights ─── */
const features = [
    {
        icon: Sparkles,
        title: 'AI Concierge',
        description: 'Natural language discovery and full-evening orchestration powered by agentic AI.',
        gradient: 'from-velo-violet to-velo-indigo',
        stat: 'Understands 40+ intents',
    },
    {
        icon: Shield,
        title: 'Quantum Security',
        description: 'Post-quantum cryptographic protocols protect every transaction with military-grade encryption.',
        gradient: 'from-velo-cyan to-blue-600',
        stat: 'Zero breaches since launch',
    },
    {
        icon: Globe,
        title: 'Multi-Platform Sync',
        description: 'Seamlessly continue across web, mobile, and CarPlay with real-time state synchronisation.',
        gradient: 'from-velo-emerald to-teal-500',
        stat: '< 50ms sync latency',
    },
    {
        icon: BarChart3,
        title: 'Smart Pricing',
        description: 'Dynamic pricing engine with demand heatmaps and anti-scalping protection for fair access.',
        gradient: 'from-velo-rose to-velo-violet',
        stat: 'Saves fans 23% on avg',
    },
];

/* ─── Animated Counter ─── */
function AnimatedStat({ target, suffix, label, icon: Icon }: {
    target: number; suffix: string; label: string; icon: any;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const duration = 2000;
        const startTime = performance.now();
        const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(Number((target * eased).toFixed(target < 10 ? 1 : 0)));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [isInView, target]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center group"
        >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-velo-violet/30 group-hover:bg-velo-violet/5 transition-all duration-500">
                <Icon className="w-6 h-6 text-velo-violet" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-1 tabular-nums">
                {count}{suffix}
            </div>
            <div className="text-xs text-velo-text-muted uppercase tracking-widest">{label}</div>
        </motion.div>
    );
}



import { useBooking } from '../context/BookingContext';
import { useRouter } from 'next/navigation';

/* ─── Tilt Event Card ─── */
function EventCard({ event, index }: { event: RealEvent; index: number }) {
    const { openBooking } = useBooking();
    const router = useRouter(); // Use router
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [5, -5]);
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);
    const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
    const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

    const handleMouse = useCallback((e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
    }, [x, y]);

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

    return (
        <ScrollReveal delay={index * 0.12}>
            <motion.div
                ref={cardRef}
                style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 1000 }}
                onMouseMove={handleMouse}
                onMouseLeave={handleMouseLeave}
                className={`group relative rounded-3xl overflow-hidden h-[440px] holographic-card ${event.soldPercentage < 100 ? 'cursor-pointer' : 'cursor-default'}`}
                onClick={() => event.soldPercentage < 100 && router.push(`/events/${event.id}`)}
            >
                {/* Image */}
                <img
                    src={event.image}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

                {/* Tag */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <div className={`relative px-3 py-1.5 rounded-full ${event.tagColor} text-[11px] font-bold text-white shadow-lg uppercase tracking-wider`}>
                        <span className="relative z-10">{event.tag}</span>
                    </div>
                </div>

                {/* Sold percentage ring */}
                <div className="absolute top-4 right-4 z-20">
                    <div className="w-12 h-12 relative">
                        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none" stroke="url(#gradient)" strokeWidth="2.5"
                                strokeDasharray={`${event.soldPercentage}, 100`}
                                strokeLinecap="round" />
                            <defs>
                                <linearGradient id="gradient">
                                    <stop offset="0%" stopColor="rgb(124 58 237)" />
                                    <stop offset="100%" stopColor="rgb(6 182 212)" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white">{event.soldPercentage}%</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-y-[-4px] transition-transform duration-500">
                        {event.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-white/70 mb-4">
                        <span className="flex items-center gap-1.5"><MapPin size={14} /> {event.venue}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-white/60">
                            <span className="flex items-center gap-1"><Calendar size={12} /> {event.date}</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> {event.time}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-white">£{event.price}</span>
                            {event.soldPercentage === 100 ? (
                                <div onClick={(e) => e.stopPropagation()}>
                                    <WaitlistButton eventId={event.id} eventTitle={event.title} />
                                </div>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(`/events/${event.id}`);
                                    }}
                                    className="text-sm font-semibold text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500"
                                >
                                    View Details
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </ScrollReveal>
    );
}

/* ═══════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════ */
export default function Home() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const featuredEvents = useFeaturedEvents();

    return (
        <>
            {/* ─── HERO ─── */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                {/* Particle canvas */}
                <ParticleCanvas />

                {/* Animated mesh background */}
                <div className="absolute inset-0 mesh-background" />
                {/* Aurora blobs — organic, alive */}
                <div className="absolute top-[5%] left-[10%] w-[600px] h-[600px] bg-velo-violet/20 rounded-full blur-[160px] aurora-blob-1" />
                <div className="absolute bottom-[5%] right-[5%] w-[500px] h-[500px] bg-velo-cyan/15 rounded-full blur-[140px] aurora-blob-2" />
                <div className="absolute top-[40%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-velo-rose/10 rounded-full blur-[120px] aurora-blob-3" />
                <div className="absolute top-[20%] right-[20%] w-[350px] h-[350px] bg-velo-emerald/8 rounded-full blur-[100px] aurora-blob-1" style={{ animationDelay: '-4s' }} />

                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full px-5 py-2 mb-10 backdrop-blur-sm"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <div className="w-2 h-2 bg-velo-emerald rounded-full animate-pulse" />
                            <span className="text-xs font-medium text-velo-text-secondary tracking-wide">AI-Powered Event Platform — Now Live</span>
                        </motion.div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.92] tracking-[-0.03em] mb-8">
                            <span className="block text-white">The Future of</span>
                            <span className="block gradient-text mt-2">Live Events</span>
                        </h1>

                        <p className="text-lg md:text-xl text-velo-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
                            Discover, book, and experience events like never before. AI-powered concierge, quantum-secure tickets, and seamless orchestration from discovery to door.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/events">
                                <button className="btn-primary flex items-center gap-2 text-base px-8 py-4">
                                    <Ticket size={18} /> Explore Events <ArrowRight size={18} />
                                </button>
                            </Link>
                            <Link href="/features">
                                <button className="btn-outline flex items-center gap-2 text-base px-8 py-4">
                                    See How It Works
                                </button>
                            </Link>
                        </div>

                        {/* Trust bar */}
                        <motion.div
                            className="mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-xs text-velo-text-muted"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                        >
                            <span className="flex items-center gap-1.5"><Shield size={14} className="text-velo-cyan/60" /> Quantum-Secure</span>
                            <span className="flex items-center gap-1.5"><Sparkles size={14} className="text-velo-violet/60" /> AI Concierge</span>
                            <span className="flex items-center gap-1.5"><Lock size={14} className="text-velo-emerald/60" /> Anti-Scalping</span>
                            <span className="flex items-center gap-1.5"><Globe size={14} className="text-velo-rose/60" /> Multi-Platform</span>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    <div className="w-6 h-10 rounded-full border-2 border-white/15 flex items-start justify-center p-1.5">
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-white/50"
                            animate={{ y: [0, 16, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* ─── FEATURED EVENTS ─── */}
            <section className="section-padding" id="events">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
                            <div>
                                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-velo-violet mb-3">Curated For You</div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">Featured Events</h2>
                                <p className="text-velo-text-secondary max-w-md">Handpicked experiences curated by our AI, tailored just for you.</p>
                            </div>
                            <Link href="/events" className="text-sm font-medium text-velo-cyan hover:text-white transition-colors flex items-center gap-1 group">
                                View All Events <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredEvents.map((event, i) => (
                            <EventCard key={event.id} event={event} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── HOW IT WORKS ─── */}
            <section className="section-padding relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-velo-violet/[0.03] to-transparent" />
                <div className="max-w-7xl mx-auto relative">
                    <ScrollReveal>
                        <div className="text-center mb-20">
                            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-velo-cyan mb-3">Simple & Seamless</div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">How Velo Works</h2>
                            <p className="text-velo-text-secondary max-w-lg mx-auto">Three simple steps to your perfect evening. No hassle, no scalpers, just unforgettable experiences.</p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {steps.map((step, i) => (
                            <ScrollReveal key={step.title} delay={i * 0.15}>
                                <div className="relative text-center group">
                                    {/* Connector line */}
                                    {i < steps.length - 1 && (
                                        <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/10 to-transparent z-0" />
                                    )}

                                    {/* Step icon */}
                                    <div className={`relative z-10 w-28 h-28 mx-auto mb-8 rounded-3xl bg-gradient-to-br ${step.gradient} p-[1px] group-hover:shadow-lg group-hover:shadow-velo-violet/20 transition-all duration-500`}>
                                        <div className="w-full h-full rounded-3xl bg-velo-bg-deep flex flex-col items-center justify-center">
                                            <step.icon className="w-8 h-8 text-white mb-1.5" />
                                            <span className="text-[10px] text-velo-text-muted font-mono tracking-wider">STEP 0{i + 1}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                    <p className="text-sm text-velo-text-secondary leading-relaxed max-w-xs mx-auto">{step.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── STATS ─── */}
            <section className="py-20 border-y border-white/[0.04] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-velo-violet/[0.03] via-transparent to-velo-cyan/[0.03]" />
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {stats.map((stat) => (
                            <AnimatedStat key={stat.label} {...stat} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FEATURES PREVIEW ─── */}
            <section className="section-padding">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-velo-emerald mb-3">Powered by Innovation</div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Built for the Future</h2>
                            <p className="text-velo-text-secondary max-w-lg mx-auto">Powered by 20 stages of innovation, Velo is the most advanced event platform ever built.</p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, i) => (
                            <ScrollReveal key={feature.title} delay={i * 0.1}>
                                <div className="glass-card-hover rounded-2xl p-8 cursor-default group holographic-card magnetic-hover liquid-glass">
                                    <div className="flex items-start justify-between mb-5 relative z-10">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-velo-violet/20 transition-all duration-500`}>
                                            <feature.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <span className="text-[11px] font-medium text-velo-text-muted border border-white/10 rounded-full px-3 py-1">
                                            {feature.stat}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 relative z-10">{feature.title}</h3>
                                    <p className="text-sm text-velo-text-secondary leading-relaxed relative z-10">{feature.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal delay={0.3}>
                        <div className="text-center mt-10">
                            <Link href="/features" className="text-sm font-medium text-velo-cyan hover:text-white transition-colors inline-flex items-center gap-1 group">
                                Explore All Features <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ─── NEWSLETTER / CTA BANNER ─── */}
            <section className="section-padding">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal>
                        <div className="relative rounded-3xl overflow-hidden">
                            {/* Aurora gradient background */}
                            <div className="absolute inset-0 aurora-bg" />
                            <div className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                                }}
                            />

                            <div className="relative z-10 px-8 md:px-16 py-16 md:py-20 text-center">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Ready to Experience the Future?</h2>
                                <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
                                    Join thousands of fans who've upgraded their live event journeys with Velo.
                                </p>

                                {/* Newsletter signup */}
                                {!subscribed ? (
                                    <div className="max-w-md mx-auto mb-8">
                                        <div className="flex gap-2 bg-black/20 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
                                            <div className="flex items-center gap-2 flex-1 px-3">
                                                <Mail size={16} className="text-white/50" />
                                                <input
                                                    type="email"
                                                    placeholder="Enter your email for early access"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full bg-transparent text-white text-sm placeholder:text-white/40 outline-none"
                                                />
                                            </div>
                                            <button
                                                onClick={() => { if (email) setSubscribed(true); }}
                                                className="bg-white text-velo-indigo font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors text-sm whitespace-nowrap"
                                            >
                                                Get Access
                                            </button>
                                        </div>
                                        <p className="text-white/40 text-xs mt-3">No spam. Just priority access to events and features.</p>
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mb-8 text-white/90 font-medium"
                                    >
                                        ✓ You're on the list! We'll be in touch.
                                    </motion.div>
                                )}

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link href="/events" className="bg-white text-velo-indigo font-semibold px-8 py-4 rounded-xl hover:bg-white/90 transition-all duration-300 inline-flex items-center gap-2 hover:shadow-lg hover:shadow-white/10">
                                        Browse Events <ArrowRight size={18} />
                                    </Link>
                                    <Link href="/about" className="text-white/90 border border-white/30 px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 font-semibold">
                                        Learn About Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
