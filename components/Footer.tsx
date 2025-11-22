import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Coloana 1 */}
        <div>
          <h3 className="text-xl font-bold mb-4">AI Masterclass</h3>
          <p className="text-gray-400 text-sm">
            Platforma ta numărul 1 pentru a învăța skill-urile viitorului.
          </p>
        </div>

        {/* Coloana 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Link-uri utile</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/cursuri/video-ai" className="hover:text-white transition">Curs Video AI</Link></li>
            <li><Link href="#" className="hover:text-white transition">Contact</Link></li>
            <li><Link href="#" className="hover:text-white transition">Termeni și condiții</Link></li>
          </ul>
        </div>

        {/* Coloana 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Abonează-te</h3>
          <p className="text-gray-400 text-sm mb-2">Primește noutăți despre cursuri noi.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Email-ul tău" 
              className="px-4 py-2 rounded-l-md w-full text-gray-900 focus:outline-none" 
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition">
              Trimite
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} AI Masterclass. Toate drepturile rezervate.
      </div>
    </footer>
  );
}