"use client";

import { DynamicThemeProvider } from '../hooks/useDynamicTheme';
import { LiquidTurbulenceFilter } from './LiquidTurbulenceFilter';
import SessionManager from './SessionManager';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <DynamicThemeProvider>
            <SessionManager />
            {children}
            <LiquidTurbulenceFilter />
        </DynamicThemeProvider>
    );
}
