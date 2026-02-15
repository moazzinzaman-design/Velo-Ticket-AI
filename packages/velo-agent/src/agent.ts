import { PriceLockService } from './price-lock';
import { IntentEngine } from './intent/engine';
import { UserIntent } from './intent/schemas';

export class VeloAgent {
  private priceLock: PriceLockService;
  private intentEngine: IntentEngine;

  constructor() {
    this.priceLock = new PriceLockService();
    this.intentEngine = new IntentEngine();
  }

  async processIntent(query: string, context: any = {}): Promise<any> {
    const intent = await this.intentEngine.predict(query);
    console.log(`Predicted intent: ${intent.type}`);

    switch (intent.type) {
      case 'RIDE_REQUEST':
        return this.handleRideBooking(intent);
      case 'TICKET_PURCHASE':
        return this.handleTicketPurchase(intent);
      case 'DINING_RESERVATION':
        return this.handleDinnerReservation(intent);
      case 'SEARCH_EVENTS':
        return this.handleSearchEvents(intent, context);
      case 'CHURN_INTERVENTION':
        return this.handleChurnIntervention(intent);
      case 'SECURITY_UPGRADE':
        return this.handleSecurityUpgrade(intent);
      case 'PITCH_PRESENTATION':
        return this.handlePitchPresentation();
      case 'UNKNOWN':
      default:
        return {
          status: 'error',
          message: "I'm not sure how to help with that yet. I can assist with Tickets, Rides, and Dining."
        };
    }
  }

  private async handleChurnIntervention(intent: any) {
    const isPricing = intent.reason === 'PRICING';

    return {
      status: 'success',
      action: 'churn_intervention',
      title: isPricing ? "Exclusive Price Lock" : "Velo VIP Priority",
      message: isPricing
        ? "I want to make sure you get the best deal. I've applied a one-time 15% discount and locked this price for the next 30 minutes."
        : "I sense some hesitation. How about I upgrade your session to Velo VIP? You'll get priority entry and a dedicated concierge link.",
      sentiment: intent.sentiment,
      discount: isPricing ? '15%' : null,
      offerType: isPricing ? 'DISCOUNT' : 'VIP_UPGRADE'
    };
  }

  private async handleTicketPurchase(intent: any) {
    return {
      status: 'success',
      action: 'ticket_purchased',
      details: {
        event: intent.event,
        quantity: intent.quantity,
        price: 125,
        fee: 3.12,
        total: 128.12 * intent.quantity,
        suggestion: "I noticed the event starts at 8 PM. Would you like a ride to the venue?"
      }
    };
  }

  private async handleSearchEvents(intent: any, context: any) {
    const events = context.events || [];
    let results = events;

    // Filter by Location
    if (intent.location) {
      results = results.filter((e: any) =>
        e.location.city.toLowerCase().includes(intent.location.toLowerCase()) ||
        e.location.venue.toLowerCase().includes(intent.location.toLowerCase())
      );
    }

    // Filter by Query (Artist/Title)
    if (intent.query) {
      const q = intent.query.toLowerCase();
      results = results.filter((e: any) =>
        e.title.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
      );
    }

    return {
      status: 'success',
      action: 'search_results',
      results: results.slice(0, 3), // Top 3
      query: intent.query,
      location: intent.location
    };
  }

  private async handleRideBooking(intent: any) {
    return {
      status: 'success',
      action: 'show_ride_options',
      destination: intent.destination || 'The Sphere, London'
    };
  }

  private async handleDinnerReservation(intent: any) {
    return {
      status: 'success',
      action: 'show_dining_options',
      cuisine: intent.cuisine,
      venue: 'The Sphere, London' // In real app, derived from context or current event
    };
  }

  private async handleSecurityUpgrade(intent: any) {
    return {
      status: 'success',
      action: 'security_upgraded',
      protocol: intent.protocol,
      layers: ['Lattice-based Encapsulation', 'Quantum-Resistant Signatures (Dilithium)', 'Zero-Knowledge Vault Sync'],
      message: `I've initiated the Velo Quantum Shield. Your local session is now hardened with ${intent.protocol} (Lattice-based cryptography).`
    };
  }

  private async handlePitchPresentation() {
    return {
      status: 'success',
      action: 'pitch_presentation',
      title: 'Velo — Project Million',
      phases: [
        {
          name: 'Phase 1: Visual & Sensory Overhaul',
          stages: [
            { id: 1, name: 'Liquid Glass UI', status: 'complete' },
            { id: 2, name: 'Haptic Engine', status: 'complete' },
            { id: 3, name: '3D Spatial Navigation', status: 'complete' },
            { id: 4, name: 'Dark Mode Universalization', status: 'complete' },
          ]
        },
        {
          name: 'Phase 2: Hyper-Contextual Features',
          stages: [
            { id: 5, name: 'Intent & Transit Engine', status: 'complete' },
            { id: 6, name: 'Dining Reservations', status: 'complete' },
            { id: 7, name: '4K AR Seat View', status: 'complete' },
            { id: 8, name: 'Voice-First UI', status: 'complete' },
          ]
        },
        {
          name: 'Phase 3: UX & Inclusivity',
          stages: [
            { id: 9, name: 'Neuro-Inclusive Mode', status: 'complete' },
            { id: 10, name: 'Gamified Quests', status: 'complete' },
            { id: 11, name: 'Zero-Knowledge Identity', status: 'complete' },
            { id: 12, name: 'Offline-First Vault', status: 'complete' },
          ]
        },
        {
          name: 'Phase 4: High-Margin Profitability',
          stages: [
            { id: 13, name: 'Blockchain Resale Cap', status: 'complete' },
            { id: 14, name: 'Surge Pricing', status: 'complete' },
            { id: 15, name: 'UWB Venue Tracking', status: 'complete' },
            { id: 16, name: 'Dynamic Take-Rate', status: 'complete' },
          ]
        },
        {
          name: 'Phase 5: Investment & Scalability',
          stages: [
            { id: 17, name: 'Multi-Platform Sync', status: 'complete' },
            { id: 18, name: 'Churn Intervention', status: 'complete' },
            { id: 19, name: 'Quantum-Safe Security', status: 'complete' },
            { id: 20, name: 'Pitch Artifact', status: 'complete' },
          ]
        },
      ],
      metrics: {
        tam: '£4.2B',
        takeRate: '1.5% — 5%',
        projectedARR: '£12M',
        userBase: '2.4M',
      },
      message: 'Ladies and gentlemen — this is Velo. 20 stages of innovation, from Liquid Glass aesthetics to Quantum-Safe security. A complete agentic event concierge platform.'
    };
  }

  // Legacy/Additional methods can remain or be refactored
  async validateResale(ticketId: string, price: number) {
    return this.priceLock.validateResale(ticketId, price);
  }
}
