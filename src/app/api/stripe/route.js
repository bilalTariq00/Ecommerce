import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { cartItems } = await req.json();
    console.log('Cart Items:', cartItems);

    if (!cartItems || !Array.isArray(cartItems)) {
      throw new Error('Invalid cartItems format');
    }

    const params = {
      submit_type: 'pay',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [
        { shipping_rate: 'shr_1Pr2uaBmeVZqrFQEfQTOkbdq' },
        { shipping_rate: 'shr_1Pr2wYBmeVZqrFQER0HpoTWx' },
      ],
      line_items: cartItems.map((item) => {
        const img = item.image[0]?.asset?._ref;
        const newImage = img ? img.replace('image-', 'https://cdn.sanity.io/images/ks2i9q1g/production/').replace('-webp', '.webp') : '';

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [newImage],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/canceled`,
    };

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create(params);

    // Return the session ID
    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error('Error creating Stripe session:', err); // Log the error for debugging
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
  }
}
