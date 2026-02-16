'use client';

import { ExternalLink } from 'lucide-react';

interface AffiliateDisclaimerProps {
    platform: 'skiddle' | 'ticketmaster' | 'seatgeek';
}

const platformNames = {
    skiddle: 'Skiddle',
    ticketmaster: 'Ticketmaster',
    seatgeek: 'SeatGeek'
};

const platformLogos = {
    skiddle: '🎫',
    ticketmaster: '🎟️',
    seatgeek: '🎭'
};

export default function AffiliateDisclaimer({ platform }: AffiliateDisclaimerProps) {
    return (
        <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg backdrop-blur-sm">
            <div className="text-2xl">{platformLogos[platform]}</div>
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <ExternalLink size={16} className="text-blue-400" />
                    <p className="text-sm font-semibold text-blue-100">
                        Tickets sold by {platformNames[platform]}
                    </p>
                </div>
                <p className="text-xs text-blue-200/80 leading-relaxed">
                    You'll be redirected to {platformNames[platform]} to complete your purchase.
                    Velo is a discovery platform earning commission on ticket sales.
                </p>
            </div>
        </div>
    );
}
