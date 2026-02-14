"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, BrainCircuit } from 'lucide-react';
import { VeloAgent } from '@velo/agent';
import HapticButton from './HapticButton';
import RideStatusCard from './RideStatusCard';
import DiningReservationCard from './DiningReservationCard';
import VoiceMicrophone from './VoiceMicrophone';
import NodeTreeMode from './NodeTreeMode';

import { useQuest } from '../context/QuestContext';
import { veloBus } from '../lib/veloBus';
import stripePromise from '../lib/stripe';

import BiometricGate from './BiometricGate';
import IdentityVault from './IdentityVault';

import SmartContractPolicy from './SmartContractPolicy';
import NFTBadge from './NFTBadge';
import PriceTicker from './PriceTicker';
import DemandHeatmap from './DemandHeatmap';
import AdminDashboard from './AdminDashboard';
import DeviceSimulator from './DeviceSimulator';
import CarPlayView from './CarPlayView';
import ChurnInterventionCard from './ChurnInterventionCard';
import QuantumShield from './QuantumShield';
import PitchDeck from './PitchDeck';

// Real agent instance
const agent = new VeloAgent();

export default function VeloAgentPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [isZenMode, setIsZenMode] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'agent', text?: string, component?: React.ReactNode }[]>([]);
    const [isPriceCapEnforced, setIsPriceCapEnforced] = useState(true);
    const [isSurgeMode, setIsSurgeMode] = useState(false);
    const [isAdminMode, setIsAdminMode] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('velo_chat_history');
        if (saved) {
            try {
                // We only save text, not components, so we might need to re-hydrate or just load text
                // For simplicity in this demo, we'll just load text nodes or default
                const parsed = JSON.parse(saved);
                setMessages(parsed);
            } catch (e) {
                console.error("Failed to load chat history", e);
            }
        } else {
            setMessages([
                { role: 'agent', text: 'Welcome to Velo! I can help you secure tickets, orchestrate your evening, or explain our fair pricing model. Try clicking an event or saying "I need tickets for Daft Punk".' }
            ]);
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        if (messages.length > 0) {
            // Filter out components for storage as they aren't serializable
            const serializableMessages = messages.map(m => ({ role: m.role, text: m.text }));
            localStorage.setItem('velo_chat_history', JSON.stringify(serializableMessages));
        }
    }, [messages]);

    // Event Bus Listener
    useEffect(() => {
        const unsubscribe = veloBus.on('open-agent', (data: { message?: string }) => {
            setIsOpen(true);
            if (data?.message) {
                processMessage(data.message);
            }
        });
        return unsubscribe;
    }, []);

    // Check for Stripe Redirect parameters
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('payment') === 'success') {
            setIsOpen(true);
            // delay slightly to Ensure UI is ready
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    role: 'agent',
                    text: "Payment confirmed! Your tickets have been secured in the Velo Vault. 🎟️",
                    component: <NFTBadge />
                }]);
                // Clean URL
                window.history.replaceState({}, '', window.location.pathname);
            }, 500);
        } else if (query.get('payment') === 'cancelled') {
            setIsOpen(true);
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    role: 'agent',
                    text: "Payment cancelled. Let me know if you want to try again or need help with something else.",
                }]);
                window.history.replaceState({}, '', window.location.pathname);
            }, 500);
        }
    }, []);

    const [isTyping, setIsTyping] = useState(false);
    const [isBiometricOpen, setIsBiometricOpen] = useState(false);
    const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
    const [pendingAction, setPendingAction] = useState<{ action: string, data: any } | null>(null);

    const { completeQuest } = useQuest();

    const handleProtectedAction = (action: string, data: any) => {
        setPendingAction({ action, data });
        setIsBiometricOpen(true);
    };

    const handleBiometricVerify = async () => {
        setIsBiometricOpen(false);
        setIsVaultUnlocked(true);

        // Execute the pending action
        if (pendingAction) {
            setMessages(prev => [...prev, {
                role: 'agent',
                text: pendingAction.action === 'ticket_purchase'
                    ? 'Payment authorized securely. Initiating Stripe Checkout...'
                    : 'Access granted.'
            }]);

            // Visual feedback for ticket purchase execution
            if (pendingAction.action === 'ticket_purchase') {
                try {
                    const response = await fetch('/api/checkout_session', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            price: pendingAction.data.total,
                            title: pendingAction.data.event || 'Velo VIP Event',
                            quantity: pendingAction.data.quantity || 1
                        }),
                    });

                    const { url, error } = await response.json();

                    if (error) {
                        console.error('Checkout error:', error);
                        setMessages(prev => [...prev, {
                            role: 'agent',
                            text: `Payment initialization failed: ${error}`,
                        }]);
                        return;
                    }

                    if (url) {
                        window.location.href = url;
                    } else {
                        console.error('No checkout URL returned');
                        setMessages(prev => [...prev, {
                            role: 'agent',
                            text: "Error: Could not generate checkout link.",
                        }]);
                    }
                } catch (err) {
                    console.error('Payment error:', err);
                    setMessages(prev => [...prev, {
                        role: 'agent',
                        text: "Network error initiating payment.",
                    }]);
                }
            }
        }
        setPendingAction(null);
    };

    const processMessage = async (text: string) => {
        setMessages(prev => [...prev, { role: 'user', text: text }]);
        setIsTyping(true);

        const lowerText = text.toLowerCase();

        // Admin Mode Trigger
        if (lowerText.includes('admin') || lowerText.includes('venue ops') || lowerText.includes('uwb')) {
            setIsTyping(false);
            setIsAdminMode(true);
            setMessages(prev => [...prev, {
                role: 'agent',
                text: "Authenticating Velo Enterprise ID... Access Granted. Loading Venue Operations Dashboard.",
                component: <AdminDashboard />
            }]);
            return;
        }

        // Manual triggers
        if (lowerText.includes('surge') || lowerText.includes('demand')) {
            setIsTyping(false);
            setIsSurgeMode(true);
            setMessages(prev => [...prev, {
                role: 'agent',
                text: "Monitoring real-time crowd density. I've detected a demand surge in Section B.",
                component: (
                    <div className="space-y-2">
                        <DemandHeatmap isSurge={true} />
                        <PriceTicker basePrice={120} isSurge={true} />
                    </div>
                )
            }]);
            return;
        }

        // Manual trigger for Policy visualization
        if (lowerText.includes('scalp') || lowerText.includes('resale') || lowerText.includes('policy')) {
            setIsTyping(false);
            setMessages(prev => [...prev, {
                role: 'agent',
                text: isPriceCapEnforced
                    ? "Anti-scalping protocols are active. Ticket resale is cryptographically capped at 110% of face value."
                    : "Price caps are currently disabled.",
                component: <SmartContractPolicy enforced={isPriceCapEnforced} />
            }]);
            return;
        }

        // Revenue/Business Model Explanation
        if (lowerText.includes('revenue') || lowerText.includes('business model') || lowerText.includes('money') || lowerText.includes('profit')) {
            setIsTyping(false);
            setMessages(prev => [...prev, {
                role: 'agent',
                text: "Velo generates revenue through a transparent 'Take Rate' model (10-25% dynamic commission) on all tickets, plus affiliate commissions from ride and dining partners. We also offer a 'Velo Black' membership for £20/month.",
                component: <div className="p-4 bg-white/5 rounded-xl border border-white/10 mt-2">
                    <h4 className="text-velo-violet font-bold mb-2">Revenue Streams</h4>
                    <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                        <li>Dynamic Take Rate (10-25%)</li>
                        <li>Ancillary Commisssions (Rides/Dining)</li>
                        <li>Velo Black Membership (£20/mo)</li>
                    </ul>
                </div>
            }]);
            return;
        }

        try {
            // Real agent processing
            const response = await agent.processIntent(text);
            setIsTyping(false);

            if (response.status === 'success') {
                if (response.action === 'ticket_purchased') {
                    // Update to show price ticker if in surge
                    if (isSurgeMode) {
                        const dynamicFee = 4.50; // Simulated dynamic fee (e.g. 5% of ticket price)

                        setMessages(prev => [...prev, {
                            role: 'agent',
                            text: "Prices are fluctuating due to high demand. Locking in your rate now...",
                            component: <PriceTicker basePrice={120} isSurge={true} />
                        }]);

                        // Add a small delay for "locking" simulation
                        setTimeout(() => {
                            // Inject fee into data
                            const dataWithFee = {
                                ...response.details,
                                total: response.details.total + dynamicFee,
                                suggestion: `Includes $${dynamicFee.toFixed(2)} Velo Priority Fee (Surge Active).`
                            };
                            handleProtectedAction('ticket_purchase', dataWithFee);
                        }, 1500);
                        return;
                    }

                    // INTERCEPT: Require Biometrics for Purchase
                    handleProtectedAction('ticket_purchase', response.details);
                    return;
                }

                if (response.action === 'ride_booked') {
                    setMessages(prev => [...prev, {
                        role: 'agent',
                        text: `Use ${response.provider} to get there.`,
                        component: <RideStatusCard
                            provider={response.provider}
                            eta={response.eta}
                            vehicle={response.vehicle}
                            cost={response.cost}
                            destination={response.destination}
                        />
                    }]);
                } else if (response.action === 'dinner_reserved') {
                    setMessages(prev => [...prev, {
                        role: 'agent',
                        text: `I found a table at ${response.restaurant}.`,
                        component: <DiningReservationCard
                            restaurant={response.restaurant}
                            cuisine={response.cuisine}
                            time={response.time}
                            partySize={response.partySize}
                            rating={response.rating}
                            priceRange={response.priceRange}
                        />
                    }]);
                } else if (response.action === 'churn_intervention') {
                    setMessages(prev => [...prev, {
                        role: 'agent',
                        text: "I want to help you make the right choice.",
                        component: <ChurnInterventionCard
                            title={response.title}
                            message={response.message}
                            offerType={response.offerType}
                            onAccept={() => {
                                setMessages(prev => [...prev, {
                                    role: 'agent',
                                    text: response.offerType === 'DISCOUNT'
                                        ? "Excellent! I've applied the 15% discount to your pending order. Your new total is $108.90."
                                        : "VIP Status Activated. You'll see the 'VIP' badge next to your tickets now."
                                }]);
                            }}
                            onDecline={() => {
                                setMessages(prev => [...prev, {
                                    role: 'agent',
                                    text: "No problem. I'm here if you change your mind."
                                }]);
                            }}
                        />
                    }]);
                } else if (response.action === 'security_upgraded') {
                    setMessages(prev => [...prev, {
                        role: 'agent',
                        text: response.message,
                        component: <QuantumShield protocol={response.protocol} layers={response.layers} />
                    }]);
                } else if (response.action === 'pitch_presentation') {
                    setMessages(prev => [...prev, {
                        role: 'agent',
                        text: response.message,
                        component: <PitchDeck
                            title={response.title}
                            phases={response.phases}
                            metrics={response.metrics}
                            message={response.message}
                        />
                    }]);
                } else {
                    setMessages(prev => [...prev, { role: 'agent', text: JSON.stringify(response) }]);
                }
            } else {
                setMessages(prev => [...prev, { role: 'agent', text: response.message }]);
            }

        } catch (e) {
            console.error(e);
            setIsTyping(false);
            setMessages(prev => [...prev, { role: 'agent', text: "System error. Please try again." }]);
        }
    };

    const handleSend = () => {
        if (!input.trim()) return;
        processMessage(input);
        setInput('');
    };

    return (
        <>
            {/* Trigger Button */}
            <motion.button
                className="fixed bottom-6 right-6 p-4 bg-black text-white rounded-full shadow-2xl z-50 hover:scale-110 transition-transform active:scale-95 touch-manipulation"
                onClick={() => setIsOpen(true)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                aria-label="Open Velo Concierge"
            >
                <div className="absolute inset-0 rounded-full bg-velo-violet/20 animate-ping" />
                <MessageSquare size={28} className="relative z-10" />
            </motion.button>

            {/* Backdrop & Side Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className={`fixed top-0 right-0 h-full w-full md:w-[450px] shadow-2xl z-[100] flex flex-col border-l border-white/10 ${isZenMode ? 'bg-black border-l-green-900' : 'bg-velo-bg-deep/95 backdrop-blur-xl'
                                }`}
                        >
                            {/* Biometric Overlay */}
                            <BiometricGate
                                isOpen={isBiometricOpen}
                                onVerify={handleBiometricVerify}
                                onCancel={() => setIsBiometricOpen(false)}
                                actionName={pendingAction?.action === 'ticket_purchase' ? 'Authorize Payment' : 'Secure Access'}
                            />

                            {/* Header */}
                            <div className={`px-6 py-5 border-b flex justify-between items-center shrink-0 ${isZenMode ? 'bg-black border-green-900' : 'bg-white/5 border-white/5'
                                }`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isZenMode ? 'bg-green-900/20 text-green-500' : 'bg-velo-violet/20 text-velo-violet'
                                        }`}>
                                        <BrainCircuit size={20} />
                                    </div>
                                    <div>
                                        <h2 className={`font-bold text-lg leading-tight ${isZenMode ? 'text-green-500 font-mono' : 'text-white'
                                            }`}>
                                            {isZenMode ? '> VELO_CORE' : 'Velo Concierge'}
                                        </h2>
                                        <p className="text-xs text-white/50">Always here to help</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsZenMode(!isZenMode)}
                                        className={`p-2 rounded-full transition-colors ${isZenMode
                                                ? 'bg-green-900/30 text-green-400'
                                                : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
                                            }`}
                                        title="Toggle Zen Mode"
                                    >
                                        <BrainCircuit size={18} />
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                                        aria-label="Close"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Messages Area */}
                            {isZenMode ? (
                                <NodeTreeMode messages={messages} />
                            ) : (
                                <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                                    {messages.map((msg, idx) => (
                                        <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} space-y-2`}>
                                            <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                                {/* Avatar (Optional) */}
                                                {/* <div className="w-6 h-6 rounded-full bg-white/10 shrink-0" /> */}

                                                {msg.text && (
                                                    <div className={`px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.role === 'user'
                                                            ? 'bg-blue-600 text-white rounded-br-sm'
                                                            : 'bg-white/10 text-gray-100 rounded-bl-sm border border-white/5'
                                                        }`}>
                                                        {msg.text}
                                                    </div>
                                                )}
                                            </div>

                                            {msg.component && (
                                                <div className="max-w-[90%] w-full pl-2">
                                                    {msg.component}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* Vault Display */}
                                    {isVaultUnlocked && (
                                        <div className="w-full animate-fade-in">
                                            <IdentityVault isUnlocked={isVaultUnlocked} />
                                        </div>
                                    )}

                                    {/* Typing Indicator */}
                                    {isTyping && (
                                        <div className="flex items-center gap-2 text-white/50 text-xs ml-2">
                                            <div className="p-3 rounded-2xl bg-white/5 rounded-bl-sm border border-white/5 flex gap-1.5 w-fit">
                                                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                            <span>Velo is thinking...</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Input Area */}
                            <div className={`p-4 md:p-6 border-t shrink-0 ${isZenMode ? 'bg-black border-green-900' : 'bg-white/5 border-white/5'
                                }`}>
                                <div className="flex items-end gap-3 max-w-full">
                                    <VoiceMicrophone
                                        onResult={(text) => processMessage(text)}
                                        isProcessing={isTyping}
                                    />

                                    <div className={`flex-1 flex gap-2 p-1.5 rounded-2xl border transition-all duration-200 ${isZenMode
                                            ? 'bg-black border-green-800 focus-within:ring-1 focus-within:ring-green-500'
                                            : 'bg-black/40 border-white/10 focus-within:bg-black/60 focus-within:border-white/20'
                                        }`}>
                                        <textarea
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSend();
                                                }
                                            }}
                                            placeholder={isZenMode ? "> INPUT_COMMAND..." : "Ask me anything..."}
                                            rows={1}
                                            className={`flex-1 bg-transparent border-none focus:ring-0 px-3 py-2.5 resize-none max-h-32 min-h-[44px] ${isZenMode
                                                    ? 'text-green-400 placeholder-green-800 font-mono'
                                                    : 'text-white placeholder-white/30'
                                                }`}
                                            style={{ height: 'auto', minHeight: '44px' }}
                                        />
                                        <HapticButton
                                            onClick={handleSend}
                                            variant="primary"
                                            className={`self-end p-2.5 rounded-xl shadow-lg shrink-0 transition-all ${input.trim() ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
                                                } ${isZenMode ? '!bg-green-900 text-green-100' : '!bg-velo-violet text-white'
                                                }`}
                                            disabled={!input.trim()}
                                        >
                                            <Send size={20} className={input.trim() ? 'translate-x-0.5' : ''} />
                                        </HapticButton>
                                    </div>
                                </div>
                                {!isZenMode && (
                                    <p className="text-[10px] text-center text-white/20 mt-3">
                                        Velo AI can make mistakes. Please verify important details.
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
