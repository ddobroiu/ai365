import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { generateInvoice } from "@/lib/oblio"; // Importăm funcția creată

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

const resend = new Resend(process.env.RESEND_API_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();
  const sig = headerList.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (!sig || !endpointSecret) {
      return new NextResponse("Webhook Error: Missing signature or secret", { status: 400 });
    }
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Extragem datele din metadata (puse de noi în pasul anterior)
    const metadata = session.metadata;
    const emailClient = session.customer_details?.email;
    
    if (emailClient && metadata) {
      console.log(`💰 Procesare pentru: ${emailClient}`);

      // 1. GENERĂM FACTURA OBLIO
      const factura = await generateInvoice(metadata);
      
      let invoiceHtml = "";
      if (factura) {
          invoiceHtml = `<p>🧾 Factura ta fiscală (${factura.seriesName} ${factura.number}) este disponibilă aici: <a href="${factura.link}">Descarcă Factura</a></p>`;
      }

      // 2. DATABASE LOGIC (Create User)
      const existingUser = await db.user.findUnique({ where: { email: emailClient } });
      let parolaFinala = "";

      if (!existingUser) {
        const parolaTemporara = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        parolaFinala = parolaTemporara;

        await db.user.create({
          data: {
            email: emailClient,
            name: metadata.numeClient,
            password: parolaTemporara, 
            hasAccess: true
          }
        });
      } else {
         await db.user.update({ where: { email: emailClient }, data: { hasAccess: true } });
      }

      // 3. TRIMITEM EMAIL (Cu link factură)
      // Dacă este user nou sau existent, trimitem mailul de confirmare
      try {
        await resend.emails.send({
            from: 'AI Masterclass <onboarding@resend.dev>',
            to: emailClient,
            subject: 'Acces Curs + Factură Fiscală 🚀',
            html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #2563eb;">Plată confirmată!</h1>
                <p>Mulțumim, <strong>${metadata.numeClient}</strong>.</p>
                
                ${invoiceHtml}

                ${parolaFinala ? `
                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0; font-weight: bold;">Datele tale de autentificare:</p>
                    <p style="margin: 5px 0;">📧 Email: <strong>${emailClient}</strong></p>
                    <p style="margin: 5px 0;">🔑 Parola: <strong>${parolaFinala}</strong></p>
                </div>
                ` : `<p>Ai deja cont. Accesul a fost deblocat pentru adresa ta de email.</p>`}

                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/login" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Accesează Platforma
                </a>
            </div>
            `,
            // Dacă vrei să atașezi fișier (dar necesită PDF Buffer):
            // attachments: factura ? [{ filename: 'factura.pdf', path: factura.link }] : [] 
            // Notă: Resend acceptă URL la path, deci s-ar putea să meargă direct așa!
        });
      } catch (e) { console.error(e); }
    }
  }

  return new NextResponse("Received", { status: 200 });
}