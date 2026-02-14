import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';



export async function POST(req: NextRequest) {
    try {
        let apiKey = process.env.STRIPE_SECRET_KEY || '';

        // Aggressively sanitize the key: remove all whitespace, newlines, and quotes
        apiKey = apiKey.replace(/\s/g, '').replace(/["']/g, '');

        console.log('--- DEBUG ENV ---');
        console.log('Sanitized API Key Length:', apiKey.length);

        if (!apiKey || apiKey.trim() === '') {
            throw new Error('STRIPE_SECRET_KEY is missing or empty');
        }

        const stripe = new Stripe(apiKey.trim(), {
            apiVersion: '2023-10-16',
            maxNetworkRetries: 3, // Retry up to 3 times on network errors
            timeout: 10000, // 10 second timeout
        } as any);

        const { price, title, quantity = 1 } = await req.json();

        if (!price || !title) {
            return NextResponse.json({ error: 'Missing price or title' }, { status: 400 });
        }

        // Determine origin safely
        const origin = req.headers.get('origin') || req.headers.get('referer') || 'http://localhost:3000';

        // Dynamic Fee Calculation (e.g., 10% Take Rate)
        const applicationFee = Math.round(price * 100 * 0.10); // 10% in cents

        console.log('--- STRIPE SESSION CREATE ---');
        console.log('Origin:', origin);
        console.log('Price:', price);
        console.log('Title:', title);
        console.log('Fee:', applicationFee);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: title,
                            description: 'Official Velo Verified Ticket',
                        },
                        unit_amount: Math.round(price * 100), // Convert to cents
                    },
                    quantity,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/?payment=cancelled`,
            metadata: {
                velo_fee: applicationFee.toString(),
            },
        });

        console.log('Session URL:', session.url);
        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (err: any) {
        console.error('Stripe API Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
