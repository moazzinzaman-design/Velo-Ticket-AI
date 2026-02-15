"use client";

import { DynamicThemeProvider } from '../hooks/useDynamicTheme';
import { LiquidTurbulenceFilter } from './LiquidTurbulenceFilter';
import SessionManager from './SessionManager';
import UserJourneyOrchestrator from './onboarding/UserJourneyOrchestrator';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <DynamicThemeProvider>
            <SessionManager />
            <UserJourneyOrchestrator />
            {children}
            <LiquidTurbulenceFilter />
        </DynamicThemeProvider>
    );
}
