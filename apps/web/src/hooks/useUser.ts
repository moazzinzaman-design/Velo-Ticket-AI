"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createClient } from '../lib/supabase/client';

interface UserProfile {
    id?: string;
    name: string;
    email: string;
    avatar: string;
    memberSince: string;
    stripeAccountId?: string;
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
    isLoading: boolean;
    toggleVeloPlus: () => void;
    joinVeloPlus: () => void;
    cancelVeloPlus: () => void;
    updateProfile: (data: Partial<UserProfile>) => void;
    addTicket: (ticket: Ticket) => void;
    checkSession: () => Promise<void>;
    signOut: () => Promise<void>;
}

export const useUser = create<UserState>()(
    persist(
        (set, get) => ({
            profile: {
                name: 'Guest User',
                email: '',
                avatar: '',
                memberSince: ''
            },
            tickets: [], // Logic to fetch real tickets will be added in Phase 2
            isVeloPlus: false,
            isLoading: true,

            toggleVeloPlus: () => set((state) => ({ isVeloPlus: !state.isVeloPlus })),
            joinVeloPlus: () => set({ isVeloPlus: true }),
            cancelVeloPlus: () => set({ isVeloPlus: false }),
            updateProfile: (data) => set((state) => ({ profile: { ...state.profile, ...data } })),
            addTicket: (ticket) => set((state) => ({ tickets: [...state.tickets, ticket] })),

            checkSession: async () => {
                const supabase = createClient();
                const { data: { session }, error } = await supabase.auth.getSession();

                if (session?.user) {
                    set({
                        profile: {
                            id: session.user.id,
                            name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'Velo User',
                            email: session.user.email || '',
                            avatar: session.user.user_metadata.avatar_url || '',
                            memberSince: new Date(session.user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                            stripeAccountId: session.user.user_metadata.stripe_account_id
                        },
                        isLoading: false
                    });
                } else {
                    set({ isLoading: false });
                }
            },

            signOut: async () => {
                const supabase = createClient();
                await supabase.auth.signOut();
                set({
                    profile: { name: 'Guest User', email: '', avatar: '', memberSince: '' },
                    tickets: [],
                    isVeloPlus: false
                });
            }
        }),
        {
            name: 'velo-user-storage',
            partialize: (state) => ({ isVeloPlus: state.isVeloPlus, tickets: state.tickets }), // Don't persist profile, fetch fresh from DB
        }
    )
);
