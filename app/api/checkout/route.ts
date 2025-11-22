import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, nume, prenume, tipPersoana, cui, numeFirma, regCom, adresa, judet, oras } = body;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Construim metadata (atenție: Stripe acceptă doar string-uri simple, fără nested objects)
    const metadata: any = {
      email,
      numeClient: tipPersoana === 'juridica' ? numeFirma : `${nume} ${prenume}`,
      adresa,
      judet,
      oras,
      tipPersoana,
    };

    if (tipPersoana === 'juridica') {
      metadata.cif = cui;
      metadata.regCom = regCom;
    } else {
        // Punem CNP opțional sau gol, Oblio cere uneori identificator pt PF
        // Pentru simplitate lăsăm fără CNP obligatoriu momentan
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email, // Pre-populăm emailul în Stripe
      line_items: [
        {
          price_data: {
            currency: 'ron',
            product_data: {
              name: 'Curs Video AI: De la Zero la Expert',
              description: 'Acces complet + Factură fiscală',
            },
            unit_amount: 10, 
          },
          quantity: 1,
        },
      ],
      metadata: metadata, // AICI SE STOCHEAZĂ DATELE PENTRU WEBHOOK
      mode: 'payment',
      success_url: `${baseUrl}/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Eroare Stripe:', error);
    return NextResponse.json({ error: 'Eroare la inițierea plății' }, { status: 500 });
  }
}