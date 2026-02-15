'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, AlertCircle, Loader2, Scan } from 'lucide-react';
import { createClient } from '../../../lib/supabase/client';

export default function ScannerPage() {
    const [scanInput, setScanInput] = useState('');
    const [scanResult, setScanResult] = useState<{ status: 'valid' | 'invalid' | 'used' | null; message?: string }>({ status: null });
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    async function handleScan() {
        if (!scanInput) return;
        setLoading(true);
        setScanResult({ status: null });

        try {
            // Check if ticket exists via UUID or QR code string
            const { data, error } = await supabase
                .from('tickets')
                .select('*')
                .eq('qr_code', scanInput)
                .single();

            if (error || !data) {
                setScanResult({ status: 'invalid', message: 'Ticket not found. Please check the code and try again.' });
                return;
            }

            if (data.status === 'used') {
                setScanResult({ status: 'used', message: `Ticket already used at ${new Date(data.updated_at).toLocaleTimeString()}` });
            } else {
                // Mark as used
                await supabase.from('tickets').update({ status: 'used', updated_at: new Date().toISOString() }).eq('id', data.id);
                setScanResult({ status: 'valid', message: `Valid Ticket! Access Granted for ${data.event_title}` });
            }
        } catch (err) {
            setScanResult({ status: 'invalid', message: 'Error scanning ticket. Please try again.' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <Scan className="text-velo-cyan" size={32} />
                    Gate Scanner
                </h1>
                <p className="text-velo-text-secondary">Scan QR codes or enter Ticket UUIDs to validate entry.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
                <div className="bg-black/40 rounded-xl p-6 mb-8">
                    <p className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">Manual Entry / Scanner Input</p>
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={scanInput}
                                onChange={(e) => setScanInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                                placeholder="Paste UUID or Scan QR..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-lg font-mono text-white outline-none focus:border-velo-violet transition-all"
                                autoFocus
                            />
                            {loading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-white/30" />}
                        </div>
                        <button
                            onClick={handleScan}
                            disabled={loading || !scanInput}
                            className="bg-gradient-to-r from-velo-violet to-velo-indigo px-8 py-4 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-velo-violet/20 transition-all disabled:opacity-50"
                        >
                            Validate
                        </button>
                    </div>
                </div>

                {scanResult.status && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className={`p-8 rounded-2xl border-2 flex flex-col items-center text-center ${scanResult.status === 'valid' ? 'bg-green-500/10 border-green-500/30' :
                                scanResult.status === 'used' ? 'bg-yellow-500/10 border-yellow-500/30' :
                                    'bg-red-500/10 border-red-500/30'
                            }`}
                    >
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${scanResult.status === 'valid' ? 'bg-green-500/20 text-green-400' :
                                scanResult.status === 'used' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-red-500/20 text-red-400'
                            }`}>
                            {scanResult.status === 'valid' && <CheckCircle size={32} />}
                            {scanResult.status === 'used' && <AlertCircle size={32} />}
                            {scanResult.status === 'invalid' && <AlertCircle size={32} />}
                        </div>

                        <h4 className={`text-2xl font-black mb-2 tracking-tight ${scanResult.status === 'valid' ? 'text-green-400' :
                                scanResult.status === 'used' ? 'text-yellow-400' :
                                    'text-red-400'
                            }`}>
                            {scanResult.status === 'valid' ? 'ACCESS GRANTED' :
                                scanResult.status === 'used' ? 'ALREADY SCANNED' :
                                    'INVALID TICKET'}
                        </h4>
                        <p className="text-white/80 max-w-sm">{scanResult.message}</p>

                        {scanResult.status === 'valid' && (
                            <div className="mt-6 pt-6 border-t border-white/5 w-full flex justify-center gap-8">
                                <div>
                                    <p className="text-[10px] uppercase text-white/30 font-bold mb-1">Entry Zone</p>
                                    <p className="text-white font-bold">Main Gate A</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase text-white/30 font-bold mb-1">Time</p>
                                    <p className="text-white font-bold">{new Date().toLocaleTimeString()}</p>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => { setScanInput(''); setScanResult({ status: null }); }}
                            className="mt-8 text-xs font-bold text-white/30 hover:text-white transition-colors uppercase tracking-widest"
                        >
                            Reset for next scan
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
