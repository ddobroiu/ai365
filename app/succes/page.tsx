"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

// 1. Creăm o componentă internă care se ocupă de logica URL-ului
function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      console.log("Payment success for session:", sessionId);
    }
  }, [sessionId]);

  return (
    <div className="max-w-md w-full space-y-8 text-center bg-white p-10 rounded-xl shadow-lg">
      {/* Iconiță animată de succes */}
      <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
        <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
        Plată efectuată cu succes!
      </h2>
      
      <p className="mt-2 text-sm text-gray-600">
        Mulțumim! Accesul tău a fost activat. 
        Verifică-ți adresa de email pentru <strong>factură</strong> și <strong>parola de acces</strong>.
      </p>

      <div className="mt-8 space-y-4">
        <Link
          href="/login"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Mergi la Autentificare
        </Link>
        
        <Link
          href="/"
          className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Înapoi la Prima Pagină
        </Link>
      </div>

      <p className="mt-6 text-xs text-gray-400">
        ID Tranzacție: <span className="font-mono">{sessionId ? `${sessionId.slice(0, 10)}...` : 'Procesare...'}</span>
      </p>
    </div>
  );
}

// 2. Exportăm pagina principală care învelește conținutul în Suspense
export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <Suspense fallback={
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Se verifică plata...</p>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}