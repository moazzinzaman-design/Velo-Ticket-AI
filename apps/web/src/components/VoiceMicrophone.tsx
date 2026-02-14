"use client";

import { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';
import HapticButton from './HapticButton';
import WaveformVisualizer from './WaveformVisualizer';
import { useQuest } from '../context/QuestContext';

interface VoiceMicrophoneProps {
    onResult: (text: string) => void;
    isProcessing: boolean;
}

export default function VoiceMicrophone({ onResult, isProcessing }: VoiceMicrophoneProps) {
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { completeQuest } = useQuest();

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            setError('Voice input not supported in this browser.');
            return;
        }
    }, []);

    const toggleListening = () => {
        if (error) return;

        if (isListening) {
            setIsListening(false);
            return;
        }

        setIsListening(true);
        const SpeechRecognition = (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            console.log('Voice recognition started');
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            console.log('Voice result:', transcript);
            onResult(transcript);
            setIsListening(false);
        };

        recognition.onerror = (event: any) => {
            console.error('Voice recognition error', event.error);
            setIsListening(false);
            if (event.error === 'not-allowed') {
                setError('Microphone access denied.');
            }
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    return (
        <div className="flex items-center gap-2">
            <div className="relative">
                <HapticButton
                    onClick={toggleListening}
                    className={`p-3 rounded-full transition-all duration-300 ${isListening
                        ? 'bg-red-500/20 text-red-500 border-red-500/50 animate-pulse'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                >
                    {isListening ? <Mic size={20} /> : <MicOff size={20} />}
                </HapticButton>

                {/* Visualizer Overlay */}
                {isListening && (
                    <div className="absolute top-1/2 left-full ml-4 transform -translate-y-1/2 min-w-[60px]">
                        <WaveformVisualizer isListening={true} />
                    </div>
                )}
            </div>

            {error && (
                <span className="text-xs text-red-400">{error}</span>
            )}
        </div>
    );
}
