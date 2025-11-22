import React from 'react';

export default function VideoAICoursePage() {
  // Aici vom simula verificarea plății pe viitor
  const areAcces = false; 

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* --- HEADERUL GLOBAL ESTE ACUM APLICAT AUTOMAT --- */}

      <main className="max-w-4xl mx-auto p-6 mt-8">
        {/* Titlu și Descriere Curs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Curs Premium
            </div>
            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Creare Video cu AI: De la Zero la Expert
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Învață cum să folosești instrumente de ultimă generație pentru a genera, edita și optimiza conținut video folosind Inteligența Artificială.
            </p>
          </div>
        </div>

        {/* Zona de Conținut (Protejată condiționat) */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Conținutul Cursului</h2>
          
          {areAcces ? (
            // CONȚINUTUL PENTRU CEI CARE AU PLĂTIT
            <div className="space-y-6">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-bold text-green-800">Lecția 1: Introducere în AI Video</h3>
                <p className="text-green-700">Aici este player-ul video și resursele...</p>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-gray-800">Lecția 2: Generarea Scriptului</h3>
                <p className="text-gray-600">Continutul lecției 2...</p>
              </div>
            </div>
          ) : (
            // ZONA BLOCATĂ (PAYWALL)
            <div className="text-center py-12">
              <div className="mb-4">
                <span className="text-5xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Acest conținut este blocat
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Pentru a accesa lecțiile video și tutorialele pas cu pas, este necesară achiziționarea cursului complet.
              </p>
              
              <div className="bg-gray-100 p-6 rounded-lg max-w-sm mx-auto mb-6">
                <p className="text-lg font-semibold text-gray-800">Preț Curs: 250 RON</p>
                <ul className="text-sm text-gray-600 mt-2 text-left list-disc list-inside">
                  <li>Acces pe viață</li>
                  <li>5 Module video</li>
                  <li>Resurse descărcabile</li>
                </ul>
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg">
                Cumpără Accesul Acum
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}