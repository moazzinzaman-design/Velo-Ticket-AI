import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createClient } from '../lib/supabase/client';

export interface UserProfile {
    id: string;
    email: string | null;
    full_name: string | null;
    avatar_url: string | null;
    role: 'user' | 'admin' | 'organizer';
    member_since: string | null;
    stripe_account_id?: string;
    onboarding_step?: number;
}

import type { Ticket } from '../types/ticket';

interface UserState {
    user: any | null; // Supabase Auth User
    profile: UserProfile | null;
    tickets: Ticket[];
    isVeloPlus: boolean;
    loading: boolean;
    isAdmin: boolean;

    // Actions
    toggleVeloPlus: () => void;
    joinVeloPlus: () => void;
    cancelVeloPlus: () => void;
    checkSession: () => Promise<void>;
    signOut: () => Promise<void>;
    addTicket: (ticket: Ticket) => void;
    updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

export const useUser = create<UserState>()(
    persist(
        (set, get) => ({
            user: null,
            profile: null,
            tickets: [],
            isVeloPlus: false,
            loading: true,
            isAdmin: false,

            toggleVeloPlus: () => set((state) => ({ isVeloPlus: !state.isVeloPlus })),
            joinVeloPlus: () => set({ isVeloPlus: true }),
            cancelVeloPlus: () => set({ isVeloPlus: false }),
            addTicket: (ticket) => set((state) => ({ tickets: [...state.tickets, ticket] })),

            checkSession: async () => {
                const supabase = createClient();
                try {
                    const { data: { session } } = await supabase.auth.getSession();

                    if (!session?.user) {
                        set({ user: null, profile: null, loading: false, isAdmin: false });
                        return;
                    }

                    // Fetch profile from DB
                    const { data: profileData, error } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', session.user.id)
                        .single();

                    if (error && error.code !== 'PGRST116') {
                        console.error('Error fetching profile:', error);
                    }

                    // Construct profile object (fallback to auth metadata if DB profile missing)
                    const userProfile: UserProfile = {
                        id: session.user.id,
                        email: session.user.email ?? null,
                        full_name: profileData?.full_name || session.user.user_metadata.full_name || session.user.email?.split('@')[0],
                        avatar_url: profileData?.avatar_url || session.user.user_metadata.avatar_url,
                        role: profileData?.role || 'user',
                        member_since: new Date(session.user.created_at).toLocaleDateString(),
                        stripe_account_id: profileData?.stripe_account_id,
                        onboarding_step: profileData?.onboarding_step
                    };

                    set({
                        user: session.user,
                        profile: userProfile,
                        isAdmin: userProfile.role === 'admin',
                        loading: false
                    });

                } catch (error) {
                    console.error('Session check failed:', error);
                    set({ loading: false });
                }
            },

            signOut: async () => {
                const supabase = createClient();
                await supabase.auth.signOut();
                set({ user: null, profile: null, tickets: [], isAdmin: false, isVeloPlus: false });
            },

            updateProfile: async (data: Partial<UserProfile>) => {
                const supabase = createClient();
                const session = await supabase.auth.getSession();
                const user = session.data.session?.user;

                if (!user) return;

                const updates = {
                    id: user.id,
                    ...data,
                    updated_at: new Date().toISOString(),
                };

                const { error } = await supabase.from('profiles').upsert(updates);

                if (error) {
                    console.error('Error updating profile:', error);
                    throw error;
                }

                set((state) => ({
                    profile: state.profile ? { ...state.profile, ...data } : null
                }));
            }
        }),
        {
            name: 'velo-user-storage',
            partialize: (state) => ({ isVeloPlus: state.isVeloPlus, tickets: state.tickets }), // Persist tickets too
        }
    )
);
