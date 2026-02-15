import { NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase/server';
import { stripe } from '../../../../lib/stripe-server';

export async function POST(req: Request) {
    try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Get or create Stripe Customer
        let stripeCustomerId = user.user_metadata.stripe_customer_id;

        if (!stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: user.email,
                name: user.user_metadata.full_name,
                metadata: {
                    supabaseUserId: user.id,
                },
            });
            stripeCustomerId = customer.id;

            // Update user metadata with Stripe Customer ID
            await supabase.auth.updateUser({
                data: { stripe_customer_id: stripeCustomerId },
            });
        }

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomerId,
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: 'Velo Plus Membership',
                            description: 'Priority access, zero fees, and VIP status.',
                        },
                        unit_amount: 999, // £9.99
                        recurring: {
                            interval: 'month',
                        },
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/plus/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/plus`,
            metadata: {
                userId: user.id,
                type: 'velo_plus_subscription',
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('[STRIPE_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
