import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { generateTicketPDF, TicketData } from '../../../../lib/tickets/pdfGenerator';
import { sendTicketEmail } from '../../../../lib/email/ticketEmail';

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
    const eventId = session.metadata?.eventId || '';
    const eventDate = session.metadata?.eventDate || 'TBD';
    const eventTime = session.metadata?.eventTime || 'TBD';
    const venueName = session.metadata?.venueName || 'Venue TBD';
    const venueAddress = session.metadata?.venueAddress || '';

    if (!userEmail) {
        console.error('No email found for session:', session.id);
        return;
    }

    // Create Order Record
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
            user_id: userId || null,
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

    // Generate Tickets
    const lineItems = expandedSession.line_items?.data || [];
    const ticketsToGenerate: TicketData[] = [];
    const ticketsToInsert = [];

    let ticketNumber = 1;
    for (const item of lineItems) {
        const quantity = item.quantity || 1;

        for (let i = 0; i < quantity; i++) {
            const ticketId = `VELO-${session.id.slice(-6)}-${Math.random().toString(36).substring(2, 7)}`.toUpperCase();

            const ticketData: TicketData = {
                ticketId,
                orderId: order.id,
                eventTitle,
                eventDate,
                eventTime,
                venueName,
                venueAddress,
                customerName: session.customer_details?.name || 'Guest',
                customerEmail: userEmail,
                seatInfo: session.metadata?.[`seat_${ticketNumber}`] || undefined,
                ticketType: item.description || 'General Admission',
                price: (item.amount_total || 0) / 100 / quantity
            };

            ticketsToGenerate.push(ticketData);

            ticketsToInsert.push({
                user_id: userId || null,
                event_title: eventTitle,
                price_paid: ticketData.price,
                qr_code: ticketId,
                status: 'valid',
                metadata: {
                    stripe_line_item_id: item.id,
                    order_id: order.id,
                    event_id: eventId
                }
            });

            ticketNumber++;
        }
    }

    // Store tickets in database
    if (ticketsToInsert.length > 0) {
        const { error: ticketError } = await supabase
            .from('tickets')
            .insert(ticketsToInsert);

        if (ticketError) {
            console.error('Failed to create tickets:', ticketError);
            throw new Error('Database error creating tickets');
        }

        // Generate PDF with all tickets
        console.log(`Generating PDF for ${ticketsToGenerate.length} ticket(s)...`);
        const ticketPDF = await generateTicketPDF(ticketsToGenerate[0]);

        // Send email with tickets
        console.log(`Sending ticket email to ${userEmail}...`);
        const emailResult = await sendTicketEmail(
            {
                to: userEmail,
                customerName: session.customer_details?.name || 'Guest',
                orderId: order.id,
                eventTitle,
                eventDate,
                eventTime,
                venueName,
                venueAddress,
                ticketCount: ticketsToGenerate.length,
                totalPrice: (session.amount_total || 0) / 100,
                tickets: ticketsToGenerate
            },
            ticketPDF
        );

        if (emailResult.success) {
            console.log(`✅ Tickets sent successfully to ${userEmail}`);
        } else {
            console.error(`❌ Failed to send tickets: ${emailResult.error}`);
        }
    }
}
