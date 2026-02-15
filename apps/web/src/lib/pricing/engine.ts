// Simple demand multiplier logic (to be replaced by Redis/AI later)
export function calculateDynamicPrice(basePrice: number, soldPercentage: number, viewsInLastHour: number = 0, eventDate: string): { price: number; demandLevel: 'low' | 'medium' | 'high' | 'peak' } {
    let multiplier = 1.0;

    // 1. Scarcity Multiplier
    if (soldPercentage > 90) multiplier += 0.5; // +50%
    else if (soldPercentage > 75) multiplier += 0.25; // +25%
    else if (soldPercentage > 50) multiplier += 0.1; // +10%

    // 2. Velocity Multiplier (simulated view count)
    if (viewsInLastHour > 100) multiplier += 0.3;
    else if (viewsInLastHour > 50) multiplier += 0.15;

    // 3. Time Decay (Last 24h)
    const daysUntilEvent = Math.ceil((new Date(eventDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (daysUntilEvent <= 1 && soldPercentage > 80) multiplier += 0.2; // Surge for last-minute popular events

    const finalPrice = Math.round(basePrice * multiplier);

    let demandLevel: 'low' | 'medium' | 'high' | 'peak' = 'low';
    if (multiplier > 1.5) demandLevel = 'peak';
    else if (multiplier > 1.25) demandLevel = 'high';
    else if (multiplier > 1.1) demandLevel = 'medium';

    return {
        price: finalPrice,
        demandLevel
    };
}
