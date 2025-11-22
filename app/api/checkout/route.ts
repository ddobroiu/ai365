import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Inițializăm Stripe cu cheia secretă
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia', // Folosește cea mai recentă versiune sau '2023-10-16'
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
              images: ['https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500'], // Imaginea produsului
            },
            unit_amount: 25000, // 250.00 RON (Stripe folosește cea mai mică unitate, deci bani)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Aici e trucul: Cerem doar plata, contul se face după
      success_url: `${baseUrl}/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}`,
      // Putem forța colectarea adresei de email dacă nu sunt logați
      customer_email: undefined, // Dacă am avea user logat, am pune emailul lui aici
    });

    // Returnăm URL-ul către care trebuie să redirecționăm utilizatorul
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Eroare Stripe:', error);
    return NextResponse.json({ error: 'Eroare la inițierea plății' }, { status: 500 });
  }
}