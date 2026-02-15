"use client";

import { useEffect, useState, useMemo } from 'react';
import Map, { Marker, Popup, NavigationControl, FullscreenControl, ScaleControl, GeolocateControl } from 'react-map-gl/mapbox';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Ticket, Calendar, Clock } from 'lucide-react';
import { RealEvent } from '../data/realEvents';
import Image from 'next/image';

interface MapViewProps {
    events: RealEvent[];
    center?: { lat: number; lng: number };
    zoom?: number;
    onEventClick?: (event: RealEvent) => void;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapView({
    events,
    center = { lat: 51.5074, lng: -0.1278 }, // Default to London
    zoom = 11,
    onEventClick
}: MapViewProps) {
    const [viewState, setViewState] = useState({
        latitude: center.lat,
        longitude: center.lng,
        zoom: zoom
    });
    const [selectedEvent, setSelectedEvent] = useState<RealEvent | null>(null);

    // Update view state when center prop changes
    useEffect(() => {
        setViewState(prev => ({
            ...prev,
            latitude: center.lat,
            longitude: center.lng,
            zoom: zoom
        }));
    }, [center.lat, center.lng, zoom]);

    const handleMarkerClick = (event: MouseEvent | React.MouseEvent, eventData: RealEvent) => {
        event.stopPropagation();
        setSelectedEvent(eventData);
        onEventClick?.(eventData);
    };

    if (!MAPBOX_TOKEN) {
        return (
            <div className="w-full h-[600px] rounded-2xl bg-zinc-900/50 border border-white/10 flex items-center justify-center">
                <div className="text-center p-6">
                    <MapPin className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Map View Unavailable</h3>
                    <p className="text-white/60 max-w-sm">
                        Please configure your Mapbox token in the .env.local file to enable the interactive map.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-white/10 relative group">
            <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/dark-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />

                {events.map((event) => (
                    <Marker
                        key={`marker-${event.id}`}
                        longitude={event.location.coordinates.lng}
                        latitude={event.location.coordinates.lat}
                        anchor="bottom"
                        onClick={(e) => handleMarkerClick(e.originalEvent, event)}
                    >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="cursor-pointer group relative"
                        >
                            <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-lg
                                ${selectedEvent?.id === event.id ? 'bg-white scale-110' : 'bg-velo-violet'}
                                transition-colors duration-300
                            `}>
                                <Ticket
                                    size={14}
                                    className={`${selectedEvent?.id === event.id ? 'text-velo-violet' : 'text-white'}`}
                                />
                            </div>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black/20 blur-[2px] rounded-full" />
                        </motion.div>
                    </Marker>
                ))}

                {selectedEvent && (
                    <Popup
                        longitude={selectedEvent.location.coordinates.lng}
                        latitude={selectedEvent.location.coordinates.lat}
                        anchor="top"
                        onClose={() => setSelectedEvent(null)}
                        closeButton={false}
                        className="z-50"
                        maxWidth="300px"
                    >
                        <div className="bg-zinc-900 text-white rounded-xl overflow-hidden shadow-2xl border border-white/10 p-0 min-w-[280px]">
                            <div className="relative h-32 w-full">
                                <Image
                                    src={selectedEvent.image}
                                    alt={selectedEvent.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                                    <span className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-md text-xs font-medium border border-white/10">
                                        {selectedEvent.category}
                                    </span>
                                    <span className="text-lg font-bold">£{selectedEvent.price}</span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg leading-tight mb-1 line-clamp-2">{selectedEvent.title}</h3>
                                <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
                                    <MapPin size={14} />
                                    <span className="truncate">{selectedEvent.venue}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-white/40 pt-3 border-t border-white/5">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={12} />
                                        <span>{selectedEvent.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={12} />
                                        <span>{selectedEvent.time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
}
