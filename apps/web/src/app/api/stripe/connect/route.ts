import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16' as any, // Verify API version later
});

export async function POST(req: NextRequest) {
    try {
        // In a real app, you'd get the authenticated user from the session
        // const { data: { user } } = await supabase.auth.getUser();

        const account = await stripe.accounts.create({
            type: 'express',
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
            },
        });

        return NextResponse.json({ accountId: account.id });
    } catch (error: any) {
        console.error('Stripe Connect Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
