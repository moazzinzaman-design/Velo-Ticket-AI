import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16' as any,
});

export async function POST(req: NextRequest) {
    try {
        const { accountId } = await req.json();
        const origin = req.headers.get('origin') || 'http://localhost:3000';

        const accountLink = await stripe.accountLinks.create({
            account: accountId,
            refresh_url: `${origin}/promoter?refresh=true`,
            return_url: `${origin}/promoter?success=true`,
            type: 'account_onboarding',
        });

        return NextResponse.json({ url: accountLink.url });
    } catch (error: any) {
        console.error('Stripe Account Link Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
