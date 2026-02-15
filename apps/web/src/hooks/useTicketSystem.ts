"use client";

import { useState, useEffect } from 'react';
import type { Ticket, TicketGroup } from '../types/ticket';

const MOCK_TICKETS: Ticket[] = [
    {
        id: 'TKT-8842-AB',
        eventId: 'evt-1',
        eventName: 'Daft Punk 2026',
        venueName: 'The Sphere, London',
        eventDate: 'Fri, 14 Aug',
        eventTime: '19:30',
        seat: 'Sec VIP, Row A, Seat 1',
        section: 'VIP',
        row: 'A',
        seatNumber: '1',
        price: 256,
        qrPayload: 'VELO:8842:SIG:xyz',
        status: 'active',
        ownerName: 'Moazzin Zaman',
        purchaseDate: '2026-02-14T10:00:00Z',
        gate: 'A',
        isResalable: true,
        maxResalePrice: 256,
        isVerified: true,
        authenticityHash: '0x7f83...9a2b',
        originalIssuer: 'Velo Protocol',
        tier: 'platinum'
    },
    {
        id: 'TKT-8842-AC',
        eventId: 'evt-1',
        eventName: 'Daft Punk 2026',
        venueName: 'The Sphere, London',
        eventDate: 'Fri, 14 Aug',
        eventTime: '19:30',
        seat: 'Sec VIP, Row A, Seat 2',
        section: 'VIP',
        row: 'A',
        seatNumber: '2',
        price: 256,
        qrPayload: 'VELO:8842:SIG:abc',
        status: 'active',
        ownerName: 'Moazzin Zaman',
        purchaseDate: '2026-02-14T10:00:00Z',
        gate: 'A',
        isResalable: true,
        maxResalePrice: 256,
        isVerified: true,
        authenticityHash: '0x3c21...8b4a',
        originalIssuer: 'Velo Protocol',
        isPriceProtected: true,
        purchasePrice: 275, // Higher original price to show drop
        tier: 'vip'
    },
    {
        id: 'TKT-9921-ZA',
        eventId: 'evt-2',
        eventName: 'Formula 1: British GP',
        venueName: 'Silverstone Circuit',
        eventDate: 'Sun, 07 Jul',
        eventTime: '14:00',
        seat: 'Grandstand A, Row 20, Seat 45',
        section: 'Grandstand A',
        row: '20',
        seatNumber: '45',
        price: 450,
        qrPayload: 'VELO:9921:SIG:f1f1',
        status: 'active',
        ownerName: 'Moazzin Zaman',
        purchaseDate: '2026-01-20T15:30:00Z',
        gate: 'Green',
        isResalable: false,
        isVerified: true,
        authenticityHash: '0x1a9b...7c4d',
        originalIssuer: 'Silverstone Circuit',
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
            if (!groups[ticket.eventId]) {
                groups[ticket.eventId] = {
                    eventId: ticket.eventId,
                    eventName: ticket.eventName,
                    eventDate: ticket.eventDate,
                    eventTime: ticket.eventTime,
                    venueName: ticket.venueName,
                    tickets: []
                };
            }
            groups[ticket.eventId].tickets.push(ticket);
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
                    resalePrice: price
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
