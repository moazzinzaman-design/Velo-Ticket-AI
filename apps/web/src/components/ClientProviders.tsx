"use client";

import { DynamicThemeProvider } from '../hooks/useDynamicTheme';
import { SoundToggle } from './SoundToggle';
import { LiquidTurbulenceFilter } from './LiquidTurbulenceFilter';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <DynamicThemeProvider>
            {children}
            <SoundToggle />
            <LiquidTurbulenceFilter />
        </DynamicThemeProvider>
    );
}
