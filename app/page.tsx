"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  // Funcția care inițiază plata către Stripe
  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Apelăm API-ul nostru intern
      const response = await fetch('/api/checkout', {
        method: 'POST',
      });
      const data = await response.json();
      
      if (data.url) {
        // Redirecționăm utilizatorul către pagina de plată Stripe
        window.location.href = data.url;
      } else {
        console.error('Nu s-a primit URL-ul de plată', data);
        alert('A apărut o eroare la inițierea plății. Te rugăm să încerci din nou.');
      }
    } catch (error) {
      console.error('Eroare fetch:', error);
      alert('Eroare de conexiune. Verifică internetul și încearcă din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white font-sans text-gray-900">
      
      {/* --- 1. HERO SECTION: HOOK-UL --- */}
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
        {/* Background subtil */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2560&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-8 animate-fade-in-up">
            🚀 Noul Val în Social Media
          </div>
          <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-7xl mb-6">
            Transformă ideile în <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
              Video Viral cu AI
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 mb-10">
            Nu ai nevoie de față, nu ai nevoie de voce, nu ai nevoie de echipament. 
            Descoperă sistemul "Copy-Paste" prin care generezi conținut video nelimitat în 15 minute pe zi.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleCheckout}
              disabled={loading}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30 transition transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Se procesează...
                </span>
              ) : (
                <>
                  Vreau Acces Imediat
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
            <Link href="#detalii" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-gray-700 bg-gray-100 hover:bg-gray-200 transition">
              Vezi ce înveți
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            🔒 Plată securizată • Acces instant • Garanție 30 de zile
          </p>
        </div>
      </section>

      {/* --- 2. SOCIAL PROOF (Statistici) --- */}
      <section className="bg-gray-900 py-10 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            <div>
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-gray-400 text-sm mt-1">Cursanți Activi</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">10k+</div>
              <div className="text-gray-400 text-sm mt-1">Video-uri Generate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">4.9/5</div>
              <div className="text-gray-400 text-sm mt-1">Rating Mediu</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-gray-400 text-sm mt-1">Suport Comunitate</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. PROBLEMA & SOLUȚIA --- */}
      <section className="py-20 bg-white" id="detalii">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-10 lg:mb-0">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
                Editarea video clasică este <span className="text-red-600">moartă</span>.
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Te-ai săturat să pierzi ore întregi în Premiere Pro sau CapCut? Să cauți imagini stock scumpe? Să înregistrezi vocea de 10 ori până sună bine?
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Majoritatea creatorilor renunță pentru că procesul este prea greu. Dar există o scurtătură.
              </p>
              
              <div className="space-y-4 mt-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-500 mt-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-4 text-lg text-gray-900">AI-ul scrie scriptul pentru tine.</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-500 mt-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-4 text-lg text-gray-900">AI-ul generează voce umană (în română!).</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-500 mt-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-4 text-lg text-gray-900">AI-ul alege vizualurile și le animă.</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl bg-gray-100 p-8 h-96 flex items-center justify-center shadow-inner">
               {/* Placeholder pentru Demo Visual */}
               <div className="text-center">
                 <div className="mx-auto h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                 </div>
                 <p className="font-bold text-gray-500">Demo: De la Text la Video în 60 sec</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. CURRICULUM (Ce primești) --- */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">Ce vei învăța, pas cu pas</h2>
            <p className="mt-4 text-lg text-gray-500">Programa completă, de la instalarea softurilor până la prima încasare.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Modul 1 */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:border-blue-200 transition">
              <div className="text-blue-600 font-bold text-xl mb-4">Modulul 1</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fundamentele AI</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-2"><span>✅</span> Ce este Generative AI</li>
                <li className="flex gap-2"><span>✅</span> Setup conturi (Midjourney, ElevenLabs)</li>
                <li className="flex gap-2"><span>✅</span> Prompt Engineering de bază</li>
              </ul>
            </div>
             {/* Modul 2 */}
             <div className="bg-white rounded-xl shadow-md p-8 border-2 border-blue-600 relative transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase">Cel mai popular</div>
              <div className="text-blue-600 font-bold text-xl mb-4">Modulul 2</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Producția Video</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-2"><span>✅</span> Clonarea vocii tale</li>
                <li className="flex gap-2"><span>✅</span> Generare imagini consistente</li>
                <li className="flex gap-2"><span>✅</span> Animarea personajelor (Lip-sync)</li>
                <li className="flex gap-2"><span>✅</span> Editare automată cu CapCut AI</li>
              </ul>
            </div>
             {/* Modul 3 */}
             <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:border-blue-200 transition">
              <div className="text-blue-600 font-bold text-xl mb-4">Modulul 3</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Monetizare</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-2"><span>✅</span> Creșterea canalelor de TikTok</li>
                <li className="flex gap-2"><span>✅</span> YouTube Automation</li>
                <li className="flex gap-2"><span>✅</span> Cum vinzi servicii către firme</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. PRICING (Oferta) --- */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-2xl overflow-hidden text-white text-center relative">
            {/* Elemente decorative fundal */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
               <div className="absolute -top-24 -left-24 w-64 h-64 bg-white rounded-full blur-3xl"></div>
               <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
            </div>

            <div className="relative p-10 md:p-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ofertă Lansare Beta</h2>
              <p className="text-blue-100 text-lg mb-8">Obține acces pe viață la preț redus. Prețul va crește în curând.</p>
              
              <div className="flex items-baseline justify-center gap-4 mb-8">
                <span className="text-2xl text-blue-200 line-through">500 RON</span>
                <span className="text-6xl font-extrabold text-white">250 RON</span>
              </div>

              <div className="flex flex-col gap-4 max-w-sm mx-auto mb-10 text-left">
                 <div className="flex items-center gap-3">
                    <div className="bg-blue-500 rounded-full p-1"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>
                    <span>Acces nelimitat la curs (5h+ video)</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="bg-blue-500 rounded-full p-1"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>
                    <span>Acces în comunitatea privată Discord</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="bg-blue-500 rounded-full p-1"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>
                    <span>Resurse: Prompt-uri gata făcute</span>
                 </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={loading}
                className="inline-block w-full md:w-auto bg-white text-blue-700 font-bold text-xl px-10 py-4 rounded-full hover:bg-gray-100 transition shadow-lg transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Te redirecționăm...' : 'Cumpără Acum'}
              </button>
              <p className="mt-4 text-sm text-blue-200 opacity-80">O singură plată. Acces pe viață.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. FAQ (Întrebări Frecvente) --- */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Întrebări Frecvente</h2>
           
           <div className="space-y-6">
             <div className="bg-white p-6 rounded-lg shadow-sm">
               <h3 className="font-bold text-lg text-gray-900 mb-2">Am nevoie de un calculator puternic?</h3>
               <p className="text-gray-600">Nu. Majoritatea uneltelor AI rulează în Cloud (pe serverele lor). Ai nevoie doar de un browser și conexiune la internet.</p>
             </div>
             <div className="bg-white p-6 rounded-lg shadow-sm">
               <h3 className="font-bold text-lg text-gray-900 mb-2">Cât costă abonamentele la uneltele AI?</h3>
               <p className="text-gray-600">În curs îți arătăm variantele gratuite pentru început. Ulterior, uneltele profesionale pot costa între 10-30$ pe lună, dar se plătesc singure odată ce începi să produci.</p>
             </div>
             <div className="bg-white p-6 rounded-lg shadow-sm">
               <h3 className="font-bold text-lg text-gray-900 mb-2">Primesc factură?</h3>
               <p className="text-gray-600">Da, platforma emite automat factură fiscală pe persoană fizică sau juridică imediat după plată.</p>
             </div>
           </div>
        </div>
      </section>

      {/* --- 7. FINAL CTA --- */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Nu lăsa revoluția AI să treacă pe lângă tine</h2>
          <p className="text-xl text-gray-600 mb-10">Începe astăzi și fii cu un pas înaintea competiției.</p>
          <button 
            onClick={handleCheckout}
            disabled={loading}
            className="inline-flex items-center justify-center px-10 py-4 text-xl font-bold rounded-full text-white bg-gray-900 hover:bg-black transition shadow-xl disabled:opacity-70"
          >
            {loading ? 'Se procesează...' : 'Începe Cursul Acum'}
          </button>
        </div>
      </section>

    </div>
  );
}