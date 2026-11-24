import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartToast from "@/components/CartToast";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Chocolate Shop | Luxury Artisan Chocolatier Dubai & UAE",
  description: "Handcrafted grand cru chocolates, viral Dubai pistachio kunafa bars, and 24K edible gold truffles. Chilled temperature-controlled delivery across the UAE.",
  keywords: ["chocolate shop", "dubai chocolate", "kunafa chocolate", "luxury chocolates dubai", "artisan chocolate aed"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAF6F0] text-[#2E170E] font-sans selection:bg-[#D4AF37]/30 selection:text-[#1A0C06]">
        <CartProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <CartToast />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
