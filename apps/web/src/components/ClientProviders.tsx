"use client";

import { DynamicThemeProvider } from '../hooks/useDynamicTheme';
import { SoundToggle } from './SoundToggle';
import { LiquidTurbulenceFilter } from './LiquidTurbulenceFilter';
import SessionManager from './SessionManager';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <DynamicThemeProvider>
            <SessionManager />
            {children}
            <SoundToggle />
            <LiquidTurbulenceFilter />
        </DynamicThemeProvider>
    );
}
