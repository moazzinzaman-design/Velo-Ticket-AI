'use client';

import { useState, useEffect } from 'react';

interface GeolocationState {
    latitude: number | null;
    longitude: number | null;
    error: string | null;
    loading: boolean;
    permissionDenied: boolean;
}

export function useGeolocation() {
    const [state, setState] = useState<GeolocationState>({
        latitude: null,
        longitude: null,
        error: null,
        loading: false,
        permissionDenied: false
    });

    const requestLocation = () => {
        if (!navigator.geolocation) {
            setState(prev => ({
                ...prev,
                error: 'Geolocation is not supported by your browser',
                loading: false
            }));
            return;
        }

        setState(prev => ({ ...prev, loading: true, error: null }));

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                    loading: false,
                    permissionDenied: false
                });
            },
            (error) => {
                let errorMessage = 'Unable to retrieve your location';
                let permissionDenied = false;

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location permission denied';
                        permissionDenied = true;
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information unavailable';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out';
                        break;
                }

                setState({
                    latitude: null,
                    longitude: null,
                    error: errorMessage,
                    loading: false,
                    permissionDenied
                });
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    };

    return {
        ...state,
        requestLocation,
        hasLocation: state.latitude !== null && state.longitude !== null
    };
}
