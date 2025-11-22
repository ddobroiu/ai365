import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia", // Folosește versiunea curentă sau cea din dashboard
});

// Acest secret vine din Dashboard sau din Stripe CLI (vezi instrucțiunile de mai jos)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (!sig || !endpointSecret) {
      return new NextResponse("Webhook Error: Missing signature or secret", { status: 400 });
    }
    // Verificăm că cererea vine chiar de la Stripe (securitate)
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // --- AICI GESTIONĂM EVENIMENTELE ---
  
  // Când plata a fost finalizată cu succes
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const emailClient = session.customer_details?.email;
    const numeClient = session.customer_details?.name;

    console.log(`✅ PLATĂ REUȘITĂ! Email: ${emailClient}, Nume: ${numeClient}`);

    // TODO: AICI VA VENI CODUL PENTRU CREAREA CONTULUI
    // 1. Verifici dacă userul există în baza de date.
    // 2. Dacă nu, îl creezi (Prisma/Supabase etc).
    // 3. Îi trimiți un email de bun venit cu parola temporară sau link de setare parolă.
  }

  return new NextResponse("Received", { status: 200 });
}