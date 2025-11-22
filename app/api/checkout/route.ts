import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Inițializăm Stripe cu versiunea corectă cerută de TypeScript
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover', 
});

export async function POST(req: Request) {
  try {
    // Definim URL-ul de bază (localhost sau producție)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Creăm sesiunea de plată Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'ron',
            product_data: {
              name: 'Curs Video AI: De la Zero la Expert',
              description: 'Acces complet la curs + comunitate Discord',
              images: ['https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500'], 
            },
            unit_amount: 25000, // 250.00 RON
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}`,
      customer_email: undefined, 
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Eroare Stripe:', error);
    return NextResponse.json({ error: 'Eroare la inițierea plății' }, { status: 500 });
  }
}