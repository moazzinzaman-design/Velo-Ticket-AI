import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Restaurant } from '../../services/DiningService';

interface RestaurantCarouselProps {
    restaurants: Restaurant[];
    onReserve: (restaurant: Restaurant) => void;
}

export default function RestaurantCarousel({ restaurants, onReserve }: RestaurantCarouselProps) {
    return (
        <div className="w-full mt-2 -ml-2">
            <div className="flex overflow-x-auto pb-4 px-2 gap-3 snap-x scrollbar-hide">
                {restaurants.map((place) => (
                    <motion.div
                        key={place.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="snap-center shrink-0 w-64 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col"
                    >
                        {/* Image */}
                        <div className="h-32 relative">
                            <img
                                src={place.imageUrl}
                                alt={place.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1">
                                <Star size={10} className="text-yellow-400 fill-yellow-400" />
                                <span className="text-xs font-bold text-white">{place.rating}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-3 flex flex-col gap-1">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-white text-sm truncate">{place.name}</h4>
                                <span className="text-xs text-white/50">{place.priceRange}</span>
                            </div>
                            <p className="text-xs text-velo-cyan">{place.cuisine}</p>

                            <div className="flex items-center gap-1 text-[10px] text-white/40 mb-2">
                                <MapPin size={10} />
                                <span>{place.distance}km from venue</span>
                            </div>

                            <button
                                onClick={() => onReserve(place)}
                                className="mt-auto w-full py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <Calendar size={12} />
                                Reserve Table
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
