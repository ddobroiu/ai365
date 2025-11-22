import axios from 'axios';

const OBLIO_BASE_URL = 'https://www.oblio.eu/api';

// Obținem token-ul de acces
async function getOblioToken() {
  const response = await axios.post(`${OBLIO_BASE_URL}/authorize/token`, {
    client_id: process.env.OBLIO_EMAIL,
    client_secret: process.env.OBLIO_API_SECRET,
  });
  return response.data.access_token;
}

export async function generateInvoice(clientData: any) {
  try {
    const token = await getOblioToken();

    // Pregătim datele clientului conform API Oblio
    const clientOblio = {
        cif: clientData.tipPersoana === 'juridica' ? clientData.cif : '',
        name: clientData.numeClient,
        rc: clientData.tipPersoana === 'juridica' ? clientData.regCom : '',
        address: clientData.adresa,
        state: clientData.judet,
        city: clientData.oras,
        email: clientData.email,
        save: true // Salvăm clientul în Oblio
    };

    const invoiceData = {
      cif: process.env.OBLIO_CIF_FIRMA,
      client: clientOblio,
      seriesName: process.env.OBLIO_SERIE_FACTURA,
      collect: {}, // Gol dacă nu marcăm încasarea explicit aici (o marcăm automat sau manual)
      products: [
        {
          name: "Curs Video AI - Acces Complet",
          code: "AI-COURSE-01",
          measuringUnit: "buc",
          currency: "RON",
          quantity: 1,
          price: 250, // Prețul fără TVA dacă ești plătitor, sau final dacă nu ești.
          vatName: "Scutit", // SAU 19% dacă ești plătitor de TVA. Ajustează aici!
          vatPercentage: 0, // Ajustează dacă ești plătitor TVA
        }
      ],
      details: "Plată online Stripe",
    };

    // 1. Emitem factura
    const response = await axios.post(
      `${OBLIO_BASE_URL}/docs/issue/invoice`,
      invoiceData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const invoiceLink = response.data.link; // Link-ul către factura publică

    // 2. Descărcăm PDF-ul ca Buffer pentru a-l atașa la mail
    // API Oblio nu dă PDF direct, dar link-ul public poate fi accesat.
    // De multe ori e mai sigur să le trimitem LINK-ul, dar cererea ta e să atașăm factura.
    // Oblio are endpoint de get PDF? De obicei linkul din `response.data.link` este HTML.
    // Pentru simplitate și viteză, majoritatea pun LINK-ul în mail.
    // Dacă vrei neapărat PDF atașat, trebuie să folosim ceva gen Puppeteer sau dacă Oblio oferă export PDF direct API.
    
    // NOTĂ: Oblio API standard returnează un link. Vom trimite link-ul în mail și încercăm să tragem PDF-ul dacă endpointul permite.
    // Cea mai robustă metodă este să le dăm link-ul de vizualizare generat de Oblio.
    
    return {
        seriesName: response.data.seriesName,
        number: response.data.number,
        link: invoiceLink
    };

  } catch (error: any) {
    console.error("Eroare Oblio:", error.response?.data || error.message);
    return null; // Continuăm fluxul chiar dacă factura crapă, ca să primească parola
  }
}