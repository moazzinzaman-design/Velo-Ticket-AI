"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProfile {
    name: string;
    email: string;
    avatar: string;
    memberSince: string;
}

interface Ticket {
    id: string;
    eventId: number;
    eventTitle: string;
    eventDate: string;
    eventVenue: string;
    eventImage: string;
    seat?: string;
    qrCode?: string;
}

interface UserState {
    profile: UserProfile;
    tickets: Ticket[];
    isVeloPlus: boolean;
    toggleVeloPlus: () => void;
    joinVeloPlus: () => void;
    cancelVeloPlus: () => void;
    updateProfile: (data: Partial<UserProfile>) => void;
    addTicket: (ticket: Ticket) => void;
}

export const useUser = create<UserState>()(
    persist(
        (set) => ({
            profile: {
                name: 'Alex Rivera',
                email: 'alex.rivera@example.com',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
                memberSince: 'Oct 2024'
            },
            tickets: [
                {
                    id: 'tkt_12345',
                    eventId: 1,
                    eventTitle: 'Coldplay: Music of the Spheres',
                    eventDate: 'Fri, Oct 12 • 8:00 PM',
                    eventVenue: 'Wembley Stadium',
                    eventImage: 'https://images.unsplash.com/photo-1459749411177-718f43d57004?q=80&w=2670&auto=format&fit=crop',
                    seat: 'Section 102, Row A, Seat 12'
                },
                {
                    id: 'tkt_67890',
                    eventId: 2,
                    eventTitle: 'Daft Punk 2026',
                    eventDate: 'Sat, Nov 15 • 9:00 PM',
                    eventVenue: 'The Sphere',
                    eventImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2670&auto=format&fit=crop',
                    seat: 'General Admission'
                }
            ],
            isVeloPlus: false,
            toggleVeloPlus: () => set((state) => ({ isVeloPlus: !state.isVeloPlus })),
            joinVeloPlus: () => set({ isVeloPlus: true }),
            cancelVeloPlus: () => set({ isVeloPlus: false }),
            updateProfile: (data) => set((state) => ({ profile: { ...state.profile, ...data } })),
            addTicket: (ticket) => set((state) => ({ tickets: [...state.tickets, ticket] })),
        }),
        {
            name: 'velo-user-storage',
        }
    )
);
