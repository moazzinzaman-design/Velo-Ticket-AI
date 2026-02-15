"use client";

import { useState, useEffect } from 'react';
import type { Ticket, TicketGroup } from '../types/ticket';

const MOCK_TICKETS: Ticket[] = [
    {
        id: 'TKT-8842-AB',
        event_id: 'evt-1',
        event_title: 'Daft Punk 2026',
        venue_name: 'The Sphere, London',
        event_date: 'Fri, 14 Aug',
        event_time: '19:30',
        seat_info: 'Sec VIP, Row A, Seat 1',
        section: 'VIP',
        row: 'A',
        seat_number: '1',
        price: 256,
        qr_code: 'VELO:8842:SIG:xyz',
        status: 'active',
        owner_name: 'Moazzin Zaman',
        purchase_date: '2026-02-14T10:00:00Z',
        gate: 'A',
        is_resalable: true,
        max_resale_price: 256,
        is_verified: true,
        authenticity_hash: '0x7f83...9a2b',
        original_issuer: 'Velo Protocol',
        tier: 'platinum'
    },
    {
        id: 'TKT-8842-AC',
        event_id: 'evt-1',
        event_title: 'Daft Punk 2026',
        venue_name: 'The Sphere, London',
        event_date: 'Fri, 14 Aug',
        event_time: '19:30',
        seat_info: 'Sec VIP, Row A, Seat 2',
        section: 'VIP',
        row: 'A',
        seat_number: '2',
        price: 256,
        qr_code: 'VELO:8842:SIG:abc',
        status: 'active',
        owner_name: 'Moazzin Zaman',
        purchase_date: '2026-02-14T10:00:00Z',
        gate: 'A',
        is_resalable: true,
        max_resale_price: 256,
        is_verified: true,
        authenticity_hash: '0x3c21...8b4a',
        original_issuer: 'Velo Protocol',
        is_price_protected: true,
        purchase_price: 275, // Higher original price to show drop
        tier: 'vip'
    },
    {
        id: 'TKT-9921-ZA',
        event_id: 'evt-2',
        event_title: 'Formula 1: British GP',
        venue_name: 'Silverstone Circuit',
        event_date: 'Sun, 07 Jul',
        event_time: '14:00',
        seat_info: 'Grandstand A, Row 20, Seat 45',
        section: 'Grandstand A',
        row: '20',
        seat_number: '45',
        price: 450,
        qr_code: 'VELO:9921:SIG:f1f1',
        status: 'active',
        owner_name: 'Moazzin Zaman',
        purchase_date: '2026-01-20T15:30:00Z',
        gate: 'Green',
        is_resalable: false,
        is_verified: true,
        authenticity_hash: '0x1a9b...7c4d',
        original_issuer: 'Silverstone Circuit',
        tier: 'standard'
    }
];

export function useTicketSystem() {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        // In a real app, fetch from API. For now, use mock data.
        // potentially merge with localStorage data from checkout flow
        setTickets(MOCK_TICKETS);
    }, []);

    const getGroupedTickets = (): TicketGroup[] => {
        const groups: Record<string, TicketGroup> = {};

        tickets.forEach(ticket => {
            if (!groups[ticket.event_id]) {
                groups[ticket.event_id] = {
                    event_id: ticket.event_id,
                    event_title: ticket.event_title,
                    event_date: ticket.event_date,
                    event_time: ticket.event_time,
                    venue_name: ticket.venue_name,
                    tickets: []
                };
            }
            groups[ticket.event_id].tickets.push(ticket);
        });

        return Object.values(groups);
    };

    const rotateQR = (ticketId: string) => {
        // Simulate QR rotation for security
        console.log(`Rotating QR for ${ticketId}`);
        return `VELO:${ticketId}:${Date.now()}`;
    };

    const listForResale = (ticketId: string, price: number) => {
        setTickets(prev => prev.map(t => {
            if (t.id === ticketId) {
                return {
                    ...t,
                    status: 'listed',
                    resale_price: price
                };
            }
            return t;
        }));
    };

    return {
        tickets,
        getGroupedTickets,
        rotateQR,
        listForResale
    };
}
