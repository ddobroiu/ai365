import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Actualizăm și aici versiunea
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  // Folosim await headers() conform ultimelor versiuni Next.js
  const headerList = await headers();
  const sig = headerList.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (!sig || !endpointSecret) {
      return new NextResponse("Webhook Error: Missing signature or secret", { status: 400 });
    }
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // --- GESTIONARE EVENIMENTE ---
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const emailClient = session.customer_details?.email;
    const numeClient = session.customer_details?.name;

    console.log(`✅ PLATĂ REUȘITĂ! Email: ${emailClient}, Nume: ${numeClient}`);
    // Aici urmează logica de creare cont
  }

  return new NextResponse("Received", { status: 200 });
}