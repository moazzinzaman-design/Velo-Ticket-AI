import { z } from 'zod';

export const RideRequestSchema = z.object({
    type: z.literal('RIDE_REQUEST'),
    destination: z.string().optional(),
    pickup: z.string().optional(),
    provider: z.enum(['UBER', 'LYFT', 'WAYMO']).optional().default('UBER'),
});

export const TicketPurchaseSchema = z.object({
    type: z.literal('TICKET_PURCHASE'),
    event: z.string(),
    quantity: z.number().default(1),
    maxPrice: z.number().optional(),
});

export const DiningReservationSchema = z.object({
    type: z.literal('DINING_RESERVATION'),
    cuisine: z.string().optional(),
    time: z.string().optional(),
    partySize: z.number().default(2),
});

export const SecurityUpgradeSchema = z.object({
    type: z.literal('SECURITY_UPGRADE'),
    protocol: z.enum(['KYBER_768', 'DILITHIUM_V3', 'FALCON']).default('KYBER_768'),
});

export const ChurnInterventionSchema = z.object({
    type: z.literal('CHURN_INTERVENTION'),
    reason: z.string().optional(),
    sentiment: z.enum(['HESITANT', 'FRUSTRATED', 'DISENGAGED']).default('HESITANT'),
});

export const PitchPresentationSchema = z.object({
    type: z.literal('PITCH_PRESENTATION'),
});

export const UnknownIntentSchema = z.object({
    type: z.literal('UNKNOWN'),
    originalQuery: z.string(),
});

export const UserIntentSchema = z.discriminatedUnion('type', [
    RideRequestSchema,
    TicketPurchaseSchema,
    DiningReservationSchema,
    UnknownIntentSchema,
    SecurityUpgradeSchema,
    ChurnInterventionSchema,
    PitchPresentationSchema,
]);

export type UserIntent = z.infer<typeof UserIntentSchema>;
