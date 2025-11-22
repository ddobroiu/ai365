import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Inițializăm fontul Inter de la Google
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Platforma Cursuri AI",
  description: "Învață skill-urile viitorului",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        <Header />
        {/* pt-16 asigură că navbar-ul fix nu acoperă conținutul */}
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}