'use client';

import { useEffect } from 'react';

export default function SupportWidget() {
    useEffect(() => {
        // Check if Intercom/Crisp ID is present
        const APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

        if (APP_ID) {
            // Load script here
            console.log('Support Widget Loaded');
        }
    }, []);

    return null;
}
