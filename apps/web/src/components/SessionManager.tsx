"use client";

import { useEffect } from 'react';
import { useUser } from '../hooks/useUser';

export default function SessionManager() {
    const { checkSession } = useUser();

    useEffect(() => {
        checkSession();
    }, [checkSession]);

    return null;
}
