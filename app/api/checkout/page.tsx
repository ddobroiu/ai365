"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tipPersoana, setTipPersoana] = useState<"fizica" | "juridica">("fizica");

  const [formData, setFormData] = useState({
    nume: "",
    prenume: "",
    email: "",
    telefon: "", // Opțional, dar util pentru curierat/factură
    adresa: "",
    judet: "",
    oras: "",
    // Doar pentru firme
    cui: "",
    regCom: "",
    numeFirma: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tipPersoana,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Eroare la inițierea plății.");
      }
    } catch (error) {
      console.error(error);
      alert("Ceva nu a mers bine.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Detalii Facturare</h2>

        <div className="flex justify-center mb-8 space-x-4">
          <button
            type="button"
            onClick={() => setTipPersoana("fizica")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              tipPersoana === "fizica" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Persoană Fizică
          </button>
          <button
            type="button"
            onClick={() => setTipPersoana("juridica")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              tipPersoana === "juridica" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Persoană Juridică (Firmă)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email - Obligatoriu pentru cont */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email (Aici vei primi accesul)</label>
            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-blue-500 focus:ring-blue-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nume</label>
              <input required type="text" name="nume" value={formData.nume} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Prenume</label>
              <input required type="text" name="prenume" value={formData.prenume} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
            </div>
          </div>

          {tipPersoana === "juridica" && (
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nume Firmă</label>
                <input required={tipPersoana === "juridica"} type="text" name="numeFirma" value={formData.numeFirma} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">CUI (CIF)</label>
                  <input required={tipPersoana === "juridica"} type="text" name="cui" value={formData.cui} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nr. Reg. Com.</label>
                  <input required={tipPersoana === "juridica"} type="text" name="regCom" value={formData.regCom} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" placeholder="J40/..." />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Adresă completă</label>
            <input required type="text" name="adresa" value={formData.adresa} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Județ</label>
              <input required type="text" name="judet" value={formData.judet} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Oraș</label>
              <input required type="text" name="oras" value={formData.oras} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 mt-6"
          >
            {loading ? "Se procesează..." : "Mergi la Plată"}
          </button>
        </form>
      </div>
    </div>
  );
}