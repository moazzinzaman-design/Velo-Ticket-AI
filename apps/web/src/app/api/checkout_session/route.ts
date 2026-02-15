import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';



export async function POST(req: NextRequest) {
    try {
        const apiKey = process.env.STRIPE_SECRET_KEY;

        if (!apiKey) {
            console.error('STRIPE_SECRET_KEY is not set in environment variables');
            throw new Error('Payment system configuration error');
        }

        console.log('Stripe key configured:', apiKey.substring(0, 7) + '...');

        const { price, title, quantity = 1, addOns, customerEmail, userId } = await req.json();

        if (!price || !title) {
            return NextResponse.json({ error: 'Missing price or title' }, { status: 400 });
        }

        // Determine origin safely
        const origin = req.headers.get('origin') || req.headers.get('referer') || 'http://localhost:3000';

        const stripe = new Stripe(apiKey, {
            apiVersion: '2023-10-16',
            maxNetworkRetries: 3,
            timeout: 10000,
        } as any);

        // Dynamic Fee Calculation (e.g., 10% Take Rate)
        const applicationFee = Math.round(price * 100 * 0.10); // 10% in cents

        const line_items: any[] = [
            {
                price_data: {
                    currency: 'gbp',
                    product_data: {
                        name: title,
                        description: 'Official Velo Verified Ticket',
                    },
                    unit_amount: Math.round(price * 100), // Ticket Price
                },
                quantity,
            },
            {
                price_data: {
                    currency: 'gbp',
                    product_data: {
                        name: 'Velo Service Fee',
                        description: '10% Booking Commission',
                    },
                    unit_amount: Math.round(price * 100 * 0.10), // 10% Fee
                },
                quantity, // Fee per ticket
            },
        ];

        // Process Add-Ons
        if (addOns) {
            const addOnsConfig: Record<string, { name: string, price: number }> = {
                'velo-shield': { name: 'Velo Shield (Insurance)', price: 800 },
                'fast-track': { name: 'Fast Track Entry', price: 1500 },
                'vip-lounge': { name: 'VIP Lounge Access', price: 4500 },
                'parking': { name: 'Premium Parking', price: 2500 },
                'tour-shirt': { name: 'Tour T-Shirt (Pre-order)', price: 3500 },
            };

            Object.entries(addOns).forEach(([id, qty]) => {
                const addon = addOnsConfig[id];
                if (addon && (qty as number) > 0) {
                    line_items.push({
                        price_data: {
                            currency: 'gbp',
                            product_data: { name: addon.name },
                            unit_amount: addon.price,
                        },
                        quantity: qty,
                    });
                }
            });
        }

        console.log('--- STRIPE SESSION CREATE ---');
        console.log('Origin:', origin);
        console.log('Price:', price);
        console.log('Title:', title);
        console.log('Fee:', applicationFee);
        console.log('AddOns:', addOns);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            ...(customerEmail ? { customer_email: customerEmail } : {}),
            success_url: `${origin}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/?payment=cancelled`,
            metadata: {
                velo_fee: applicationFee.toString(),
                userId: userId || '', // Store userId for webhook
                eventTitle: title,
            },
        });

        console.log('Session URL:', session.url);
        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (err: any) {
        console.error('=== STRIPE ERROR DETAILS ===');
        console.error('Error name:', err?.name);
        console.error('Error message:', err?.message);
        console.error('Error stack:', err?.stack);

        if (err instanceof Stripe.errors.StripeError) {
            console.error('Stripe Error Type:', err.type);
            console.error('Stripe Error Code:', err.code);
            console.error('Stripe Error Param:', err.param);
            console.error('Stripe Raw Error:', JSON.stringify(err.raw, null, 2));
        } else {
            console.error('Non-Stripe Error:', JSON.stringify(err, null, 2));
        }

        return NextResponse.json({
            error: err.message || 'Payment initialization failed',
            details: err instanceof Stripe.errors.StripeError ? {
                type: err.type,
                code: err.code
            } : undefined
        }, { status: 500 });
    }
}
