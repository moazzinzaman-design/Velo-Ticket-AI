import { Event, Partner, Booking } from '../types/event';

const INITIAL_EVENTS: Event[] = [
    {
        id: 1,
        title: "Neon Nights: Cyberpunk Rave",
        venue: "The Undercity, Shoreditch",
        date: "Fri, 15 Mar",
        time: "22:00",
        price: 45.00,
        category: "Nightlife",
        image: "https://images.unsplash.com/photo-1550975686-37a7fafd54e7?w=800&q=80",
        tag: "SELLING FAST",
        soldPercentage: 78,
        description: "Experience the ultimate cyberpunk rave with neon lights and futuristic beats.",
        capacity: 500
    },
    {
        id: 2,
        title: "Digital Art Exhibition",
        venue: "Future Gallery, Tate Modern",
        date: "Sat, 22 Mar",
        time: "10:00",
        price: 25.00,
        category: "Art",
        image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80",
        tag: "NEW",
        soldPercentage: 35,
        description: "Immerse yourself in digital masterpieces from world-renowned artists.",
        capacity: 200
    },
    {
        id: 3,
        title: "Tech Startup Summit 2024",
        venue: "ExCeL London",
        date: "Mon, 08 Apr",
        time: "09:00",
        price: 150.00,
        category: "Business",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
        tag: "PREMIUM",
        soldPercentage: 92,
        description: "Connect with industry leaders and innovative startups at the biggest tech summit of the year.",
        capacity: 1000
    },
    {
        id: 4,
        title: "Underground Jazz Club",
        venue: "Ronnie Scott's, Soho",
        date: "Thu, 18 Apr",
        time: "20:00",
        price: 35.00,
        category: "Music",
        image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80",
        tag: "LIMITED",
        soldPercentage: 88,
        description: "Enjoy smooth jazz in an intimate underground setting.",
        capacity: 150
    },
    {
        id: 5,
        title: "Global Food Festival",
        venue: "Southbank Centre",
        date: "Sun, 28 Apr",
        time: "11:00",
        price: 15.00,
        category: "Food & Drink",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
        tag: "POPULAR",
        soldPercentage: 65,
        description: "Taste cuisines from around the world at this vibrant food festival.",
        capacity: 2000
    }
];

const INITIAL_PARTNERS: Partner[] = [
    {
        id: 'partner_01',
        name: 'TicketMaster Integration',
        apiKey: 'velo_partner_test_key',
        active: true
    }
];

class MockDatabase {
    private events: Event[] = [...INITIAL_EVENTS];
    private partners: Partner[] = [...INITIAL_PARTNERS];
    private bookings: Booking[] = [];

    // Events
    getAllEvents(): Event[] {
        return this.events;
    }

    getEventById(id: number): Event | undefined {
        return this.events.find(e => e.id === id);
    }

    updateEventStock(id: number, quantity: number): boolean {
        const eventIndex = this.events.findIndex(e => e.id === id);
        if (eventIndex === -1) return false;

        // In a real app, check capacity. For now, just simulation.
        // We'll increment soldPercentage slightly to simulate stock reduction
        const event = this.events[eventIndex];
        const newSoldPercentage = Math.min(100, event.soldPercentage + (quantity * 0.5));

        this.events[eventIndex] = {
            ...event,
            soldPercentage: newSoldPercentage,
            tag: newSoldPercentage >= 100 ? 'SOLD OUT' : event.tag
        };

        return true;
    }

    // Partners
    validateApiKey(apiKey: string): Partner | undefined {
        return this.partners.find(p => p.apiKey === apiKey && p.active);
    }

    // Bookings
    createBooking(booking: Omit<Booking, 'id' | 'timestamp' | 'status'> & { status?: Booking['status'] }): Booking {
        const newBooking: Booking = {
            id: `bk_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date(),
            status: booking.status || 'confirmed',
            ...booking
        };

        this.bookings.push(newBooking);
        return newBooking;
    }

    getBookingsByPartner(partnerId: string): Booking[] {
        return this.bookings.filter(b => b.partnerId === partnerId);
    }
}

// Singleton instance
export const db = new MockDatabase();
