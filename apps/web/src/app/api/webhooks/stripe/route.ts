import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { EmailService } from '../../../../lib/email/EmailService';
import { AIMessageGenerator } from '../../../../lib/ai/generator';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover' as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
    if (!webhookSecret) {
        console.error('STRIPE_WEBHOOK_SECRET is not set');
        return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    const body = await req.text();
    const signature = (await headers()).get('stripe-signature');

    let event: Stripe.Event;

    try {
        if (!signature) throw new Error('No signature');
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Processing checkout session: ${session.id}`);

        try {
            await handleCheckoutCompleted(session);
        } catch (err: any) {
            console.error('Error handling checkout completion:', err);
            return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        console.error('Missing Supabase credentials for webhook (SUPABASE_SERVICE_ROLE_KEY required)');
        // We log error but don't fail the webhook 500 loop to avoid retries if it's a config issue
        return;
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Expand line items to get details
    const expandedSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['line_items'],
    });

    const userId = session.metadata?.userId;
    const userEmail = session.customer_details?.email || session.metadata?.customerEmail;
    const eventTitle = session.metadata?.eventTitle || 'Event Ticket';

    // Create Order Record
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
            user_id: userId || null, // Can be null if guest checkout (though we try to force auth)
            stripe_session_id: session.id,
            total_amount: session.amount_total,
            status: 'completed'
        })
        .select()
        .single();

    if (orderError) {
        console.error('Failed to create order:', orderError);
        throw new Error('Database error creating order');
    }

    // Create Tickets
    const tickets_to_insert = [];
    const lineItems = expandedSession.line_items?.data || [];

    for (const item of lineItems) {
        // Skip potential non-ticket items like fees or add-ons if needed, 
        // but for now we treat main items as tickets.
        // You might want to filter based on metadata or description.

        // If specific quantity > 1, generate multiple tickets
        const quantity = item.quantity || 1;

        for (let i = 0; i < quantity; i++) {
            const uniqueQr = `VELO-${session.id.slice(-6)}-${Math.random().toString(36).substring(2, 7)}`.toUpperCase();

            tickets_to_insert.push({
                user_id: userId || null,
                event_title: item.description || eventTitle,
                price_paid: item.amount_total / quantity,
                qr_code: uniqueQr,
                status: 'valid',
                metadata: {
                    stripe_line_item_id: item.id,
                    order_id: order.id
                }
            });

            // Send email for each ticket? Or one email for all?
            // EmailService currently handles single ticket. 
            // We'll trigger it once per ticket for now, or optimise to send one summary email.
        }
    }

    if (tickets_to_insert.length > 0) {
        const { error: ticketError } = await supabase
            .from('tickets')
            .insert(tickets_to_insert);

        if (ticketError) {
            console.error('Failed to create tickets:', ticketError);
            throw new Error('Database error creating tickets');
        }

        // Send confirmation email
        if (userEmail) {
            // Generate AI Hype Message
            const aiMessage = await AIMessageGenerator.generateTicketHype(
                eventTitle,
                'Music Fan', // We don't have name easily here unless we query profile, fine for now
                'Velo Venue'
            );

            // Just sending one confirmation for the first ticket valid for now
            // In production, you'd send a summary or iterate
            await EmailService.sendBookingConfirmation(
                userEmail,
                eventTitle,
                tickets_to_insert[0].qr_code,
                aiMessage
            );
        }
    }
}
