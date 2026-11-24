import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Truck, Award, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1A0C06] text-[#FAF6F0] border-t-2 border-[#D4AF37]/30 mt-auto">
      {/* Artisan Value Highlights */}
      <div className="border-b border-[#D4AF37]/15 bg-[#2A150C]/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-xl bg-[#1A0C06] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 text-[#D4AF37]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#F3E5AB]">Grand Cru Single Origin</h4>
                <p className="text-xs text-[#FAF6F0]/70 mt-0.5">Ethically sourced 100% pure cocoa</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-xl bg-[#1A0C06] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 text-[#D4AF37]">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#F3E5AB]">Chilled Climate Courier</h4>
                <p className="text-xs text-[#FAF6F0]/70 mt-0.5">Melt-free guaranteed delivery across UAE</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-xl bg-[#1A0C06] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 text-[#D4AF37]">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#F3E5AB]">24K Edible Gold Leaf</h4>
                <p className="text-xs text-[#FAF6F0]/70 mt-0.5">Handcrafted luxury toppings & fillings</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-xl bg-[#1A0C06] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 text-[#D4AF37]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#F3E5AB]">Artisan Quality Assured</h4>
                <p className="text-xs text-[#FAF6F0]/70 mt-0.5">Zero palm oil, artificial flavors or additives</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37] bg-gradient-to-br from-[#3E2012] to-[#1A0C06] flex items-center justify-center">
                <span className="text-[#D4AF37] font-serif font-bold text-lg">C</span>
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-[#FAF6F0]">
                THE CHOCOLATE SHOP
              </span>
            </div>
            <p className="text-xs text-[#FAF6F0]/75 leading-relaxed">
              Maison du Chocolat Dubai crafts bespoke confections combining centuries of European chocolatier tradition with opulent Arabian flavors like royal saffron, roasted pistachio kunafa, and Medjool dates.
            </p>
            <div className="pt-2 text-xs text-[#D4AF37]">
              <span>Licensed in Dubai, United Arab Emirates • Halal Certified</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-serif text-sm font-semibold text-[#D4AF37] tracking-wider uppercase">
              Explore
            </h5>
            <ul className="space-y-2 text-xs text-[#FAF6F0]/80">
              <li><Link href="/" className="hover:text-[#D4AF37] transition-colors">Home Experience</Link></li>
              <li><Link href="/menu" className="hover:text-[#D4AF37] transition-colors">Artisan Chocolate Menu</Link></li>
              <li><Link href="/cart" className="hover:text-[#D4AF37] transition-colors">Shopping Cart</Link></li>
              <li><Link href="/checkout" className="hover:text-[#D4AF37] transition-colors">Direct Checkout</Link></li>
            </ul>
          </div>

          {/* Boutique Locations */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-serif text-sm font-semibold text-[#D4AF37] tracking-wider uppercase">
              UAE Boutiques
            </h5>
            <div className="space-y-3 text-xs text-[#FAF6F0]/80">
              <div>
                <p className="font-semibold text-[#F3E5AB]">The Dubai Mall</p>
                <p className="text-[#FAF6F0]/60">Fashion Avenue, Level G • Daily 10 AM – Midnight</p>
              </div>
              <div>
                <p className="font-semibold text-[#F3E5AB]">The Galleria Al Maryah Island</p>
                <p className="text-[#FAF6F0]/60">Abu Dhabi, Luxury Wing • Daily 10 AM – 11 PM</p>
              </div>
              <div>
                <p className="font-semibold text-[#F3E5AB]">Chilled Concierge Helpline</p>
                <p className="text-[#D4AF37] font-mono">+971 4 800 2462 (CHOC)</p>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-serif text-sm font-semibold text-[#D4AF37] tracking-wider uppercase">
              The Golden Club
            </h5>
            <p className="text-xs text-[#FAF6F0]/75">
              Receive private invitations to seasonal releases, gold tasting flights, and 10% off your first order with code <strong className="text-[#D4AF37]">GOLD10</strong>.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-[#2A150C] border border-[#D4AF37]/30 text-xs rounded-lg px-3 py-2 text-[#FAF6F0] focus:outline-none focus:border-[#D4AF37] w-full placeholder-[#FAF6F0]/40"
              />
              <button className="bg-gradient-to-r from-[#D4AF37] to-[#BF9B27] text-[#1A0C06] text-xs font-bold px-4 py-2 rounded-lg hover:brightness-110 shrink-0 shadow-md">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Payments */}
        <div className="mt-12 pt-8 border-t border-[#D4AF37]/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FAF6F0]/60">
          <p>© {new Date().getFullYear()} The Chocolate Shop LLC. All rights reserved. Prices quoted in UAE Dirhams (AED).</p>
          <div className="flex items-center gap-3 text-xs text-[#D4AF37]">
            <span>Apple Pay</span>
            <span>•</span>
            <span>Visa</span>
            <span>•</span>
            <span>MasterCard</span>
            <span>•</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
