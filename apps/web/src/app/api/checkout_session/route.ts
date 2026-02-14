import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';



export async function POST(req: NextRequest) {
    try {
        let apiKey = process.env.STRIPE_SECRET_KEY || '';

        // STRICT sanitization: Remove whitespace and non-printable control characters.
        // We allow dashes, underscores, and alphanumeric characters.
        apiKey = apiKey.replace(/[\s\x00-\x1F\x7F]/g, '');

        console.log('--- DEBUG ENV ---');
        console.log('Raw Key Length:', process.env.STRIPE_SECRET_KEY?.length || 0);
        console.log('Sanitized API Key Length:', apiKey.length);
        console.log('First 7 chars:', apiKey.substring(0, 7));
        console.log('Last 7 chars:', apiKey.substring(apiKey.length - 7));
        console.log('Key starts with sk_test:', apiKey.startsWith('sk_test_'));
        console.log('Key starts with sk_live:', apiKey.startsWith('sk_live_'));

        if (!apiKey || apiKey.trim() === '') {
            throw new Error('STRIPE_SECRET_KEY is missing or empty');
        }

        if (!apiKey.startsWith('sk_test_') && !apiKey.startsWith('sk_live_')) {
            throw new Error('STRIPE_SECRET_KEY has invalid format (must start with sk_test_ or sk_live_)');
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
        if (err instanceof Stripe.errors.StripeError) {
            console.error('Stripe Error Type:', err.type);
            console.error('Stripe Error Code:', err.code);
            console.error('Stripe Error Param:', err.param);
            console.error('Stripe Error Message:', err.message);
        }
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
