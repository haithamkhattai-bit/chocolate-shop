"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { chocolates } from "@/data/chocolates";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Truck,
  Star,
  ChevronRight,
  Flame,
} from "lucide-react";

export default function HomePage() {
  const { addToCart } = useCart();
  const featuredChocolates = chocolates.slice(0, 4);
  const viralChocolate = chocolates.find((c) => c.id === "dubai-pistachio-kunafa") || chocolates[1];
  const goldTruffle = chocolates.find((c) => c.id === "royal-gold-truffle") || chocolates[0];

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1A0C06] via-[#2A150C] to-[#3E2012] text-[#FAF6F0] py-20 lg:py-28">
        
        {/* Subtle Luxury Pattern & Ambient Light */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A150C]/90 border border-[#D4AF37]/50 text-xs text-[#F3E5AB] shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-semibold tracking-wider uppercase">Grand Cru Chocolatier Dubai</span>
                <span className="text-[#D4AF37]">•</span>
                <span>Prices in AED</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF6F0] leading-[1.15]">
                Bespoke Cocoa Art, Infused With{" "}
                <span className="gold-shimmer block sm:inline">24K Pure Gold</span> & Arabian Heritage
              </h1>

              <p className="text-base sm:text-lg text-[#FAF6F0]/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                Indulge in mastercrafted confectionery: from single-origin Ecuadorian dark cocoa and viral Dubai pistachio kunafa bars to exquisite royal saffron bonbons. Delivered chilled across all seven Emirates.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/menu"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-[#D4AF37] via-[#C49E2B] to-[#997D26] text-[#1A0C06] hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 transition-all active:scale-95"
                >
                  <span>Explore All 8 Creations</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold bg-[#2A150C]/90 border border-[#D4AF37]/40 text-[#F3E5AB] hover:bg-[#2A150C] hover:border-[#D4AF37] transition-all"
                >
                  <span>View Shopping Bag</span>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                </Link>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#D4AF37]/20 max-w-xl mx-auto lg:mx-0 text-center">
                <div>
                  <p className="font-serif text-2xl font-bold text-[#F3E5AB]">8</p>
                  <p className="text-[11px] text-[#FAF6F0]/70 uppercase tracking-wider">Artisan Creations</p>
                </div>
                <div className="border-x border-[#D4AF37]/20">
                  <p className="font-serif text-2xl font-bold text-[#F3E5AB]">100%</p>
                  <p className="text-[11px] text-[#FAF6F0]/70 uppercase tracking-wider">Halal & Pure Butter</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-[#F3E5AB]">2 Hrs</p>
                  <p className="text-[11px] text-[#FAF6F0]/70 uppercase tracking-wider">Chilled Dubai Delivery</p>
                </div>
              </div>

            </div>

            {/* Right Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Decorative Frame */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#D4AF37]/30 to-transparent blur-xl opacity-75" />
                
                <div className="relative rounded-3xl overflow-hidden border-2 border-[#D4AF37] shadow-2xl bg-[#1A0C06]">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={goldTruffle.image}
                      alt={goldTruffle.name}
                      fill
                      priority
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A0C06] via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Floating Overlay Badge on Hero Image */}
                  <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#1A0C06]/90 border border-[#D4AF37]/60 backdrop-blur-md shadow-xl">
                    <div className="flex items-center justify-between text-xs text-[#D4AF37] mb-1 font-semibold uppercase tracking-wider">
                      <span>Chef&apos;s Crown Piece</span>
                      <span className="flex items-center gap-1 text-[#F3E5AB]">
                        <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" /> 5.0 (420+ reviews)
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#FAF6F0]">
                      {goldTruffle.name}
                    </h3>
                    <p className="text-xs text-[#FAF6F0]/70 mt-1 line-clamp-1">
                      {goldTruffle.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#D4AF37]/20">
                      <div>
                        <span className="text-[10px] text-[#D4AF37] uppercase">Price</span>
                        <p className="font-serif text-lg font-bold text-[#F3E5AB]">
                          {goldTruffle.priceAED} <span className="text-xs font-normal">AED</span>
                        </p>
                      </div>
                      <button
                        onClick={() => addToCart(goldTruffle, 1)}
                        className="px-4 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-[#D4AF37] to-[#BF9B27] text-[#1A0C06] hover:brightness-110 shadow"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 2. VIRAL SENSATION SPOTLIGHT: DUBAI PISTACHIO KUNAFA BAR */}
      <section className="py-16 bg-[#F5EDE2] border-y border-[#EADDC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1A0C06] rounded-3xl border-2 border-[#D4AF37] p-8 md:p-12 text-[#FAF6F0] relative overflow-hidden shadow-2xl">
            
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-xs text-[#F3E5AB] font-semibold">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>The Worldwide Viral Phenomenon</span>
                </div>
                
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF6F0] leading-tight">
                  Dubai Pistachio & Golden Kunafa Chocolate Bar
                </h2>

                <p className="text-sm sm:text-base text-[#FAF6F0]/80 leading-relaxed font-light">
                  Crispy, golden-toasted kataifi shredded phyllo pastry blended with velvety pistachio cream and tahini butter, enveloped in our signature 45% Swiss milk chocolate. Experience the authentic Dubai crunch.
                </p>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-[#2A150C] p-3 rounded-xl border border-[#D4AF37]/30 text-center">
                    <span className="text-[10px] uppercase text-[#D4AF37] block font-semibold">Pastry</span>
                    <span className="text-xs font-bold text-[#F3E5AB]">Toasted Kataifi</span>
                  </div>
                  <div className="bg-[#2A150C] p-3 rounded-xl border border-[#D4AF37]/30 text-center">
                    <span className="text-[10px] uppercase text-[#D4AF37] block font-semibold">Pistachio</span>
                    <span className="text-xs font-bold text-[#F3E5AB]">100% Bronte Nut</span>
                  </div>
                  <div className="bg-[#2A150C] p-3 rounded-xl border border-[#D4AF37]/30 text-center">
                    <span className="text-[10px] uppercase text-[#D4AF37] block font-semibold">Weight</span>
                    <span className="text-xs font-bold text-[#F3E5AB]">200g Fresh Bar</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-3xl font-bold text-[#F3E5AB]">65</span>
                    <span className="text-sm font-semibold text-[#D4AF37]">AED</span>
                  </div>
                  <button
                    onClick={() => addToCart(viralChocolate, 1)}
                    className="px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-[#D4AF37] to-[#BF9B27] text-[#1A0C06] hover:brightness-110 shadow-lg active:scale-95 transition-all"
                  >
                    Add Viral Bar to Cart
                  </button>
                  <Link
                    href="/menu"
                    className="text-xs text-[#D4AF37] hover:underline"
                  >
                    View All Flavors & Ingredients →
                  </Link>
                </div>

              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#D4AF37]/60 shadow-xl">
                  <Image
                    src={viralChocolate.image}
                    alt={viralChocolate.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#1A0C06]/85 border border-[#D4AF37] text-[#F3E5AB] text-xs font-bold px-3 py-1 rounded-full shadow">
                    65 AED
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURED ARTISAN COLLECTION */}
      <section className="py-20 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#997D26] uppercase tracking-widest mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Handcrafted Luxury</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A0C06]">
                Featured Masterpieces
              </h2>
              <p className="text-sm text-[#6E5B52] mt-1 max-w-xl">
                A selection from our 8 bespoke recipes made daily with single-origin beans, natural spices, and Swiss conching techniques.
              </p>
            </div>

            <Link
              href="/menu"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#7E4B2F] hover:text-[#D4AF37] transition-colors"
            >
              <span>Explore Complete Menu (8 Items)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grid of Chocolates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredChocolates.map((chocolate) => (
              <ProductCard key={chocolate.id} chocolate={chocolate} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-[#1A0C06] text-[#F3E5AB] border border-[#D4AF37]/50 hover:bg-[#2A150C] shadow-md transition-all"
            >
              <span>View All 8 Chocolates with Pricing in AED</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. THE CHOCOLATIER'S CODE & REVIEWS */}
      <section className="py-16 bg-[#2A150C] text-[#FAF6F0] border-t border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest">
              Uncompromising Quality
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2">
              The Artisan Promise
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF6F0]/70 mt-2">
              Every creation that leaves our Dubai atelier honors three sacred tenets of haute confectionery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1A0C06]/80 p-8 rounded-2xl border border-[#D4AF37]/30 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-[#2A150C] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F3E5AB]">1. Single-Origin Cacao</h3>
              <p className="text-xs text-[#FAF6F0]/75 mt-2 leading-relaxed">
                Direct trade partnerships with sustainable plantations in Ecuador, Madagascar, and Venezuela. Traceable from pod to palate.
              </p>
            </div>

            <div className="bg-[#1A0C06]/80 p-8 rounded-2xl border border-[#D4AF37]/30 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-[#2A150C] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F3E5AB]">2. Chilled Logistics</h3>
              <p className="text-xs text-[#FAF6F0]/75 mt-2 leading-relaxed">
                Custom temperature-controlled packaging guaranteed to prevent melting during delivery across Dubai, Abu Dhabi, and the Northern Emirates.
              </p>
            </div>

            <div className="bg-[#1A0C06]/80 p-8 rounded-2xl border border-[#D4AF37]/30 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-[#2A150C] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F3E5AB]">3. Purity & Elegance</h3>
              <p className="text-xs text-[#FAF6F0]/75 mt-2 leading-relaxed">
                Zero palm oil, artificial emulsifiers, or preservatives. Embellished exclusively with certified 24-karat food-grade gold leaf.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="py-16 bg-[#FAF6F0] text-center border-t border-[#EADDC9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-[#1A0C06] via-[#2A150C] to-[#3E2012] border-2 border-[#D4AF37] text-[#FAF6F0] shadow-2xl relative overflow-hidden">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF6F0]">
              Ready to Experience Haute Chocolaterie?
            </h2>
            <p className="text-sm text-[#FAF6F0]/80 mt-3 max-w-xl mx-auto font-light">
              Order your favorite artisanal selections today. Free chilled delivery across the UAE on orders over 150 AED.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/menu"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-[#D4AF37] to-[#BF9B27] text-[#1A0C06] hover:brightness-110 shadow-lg"
              >
                Browse All 8 Chocolates
              </Link>
              <Link
                href="/cart"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold bg-[#2A150C] border border-[#D4AF37]/50 text-[#F3E5AB] hover:bg-[#3E2012]"
              >
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
