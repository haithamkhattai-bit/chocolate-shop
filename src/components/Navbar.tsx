"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu as MenuIcon, X, Sparkles, MapPin } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Artisan Menu", href: "/menu" },
    { name: "Cart", href: "/cart" },
    { name: "Checkout", href: "/checkout" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#1A0C06]/95 backdrop-blur-md border-b border-[#D4AF37]/30 transition-all">
      {/* Top Notification Announcement Bar */}
      <div className="bg-[#2A150C] text-[#F3E5AB] text-xs py-1.5 px-4 text-center border-b border-[#D4AF37]/20 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>Complimentary Chilled Delivery across the UAE on orders above <strong>150 AED</strong></span>
        <span className="hidden md:inline text-[#D4AF37]">•</span>
        <span className="hidden md:inline flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#D4AF37]" />
          Boutiques at Dubai Mall & Galleria Abu Dhabi
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full border border-[#D4AF37] bg-gradient-to-br from-[#3E2012] to-[#1A0C06] flex items-center justify-center shadow-lg group-hover:border-[#FFF2B2] transition-colors">
              <span className="text-[#D4AF37] font-serif text-xl font-bold">C</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl md:text-2xl font-bold tracking-wider text-[#FAF6F0] group-hover:text-[#D4AF37] transition-colors">
                CHOCOLATE SHOP
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-sans">
                Haute Chocolaterie • Dubai
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                  isActive(link.href)
                    ? "text-[#D4AF37] font-semibold"
                    : "text-[#FAF6F0]/80 hover:text-[#D4AF37]"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-4">
            {/* UAE Currency Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2A150C] border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>AED (د.إ)</span>
            </div>

            {/* Shopping Cart Button */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#997D26] text-[#1A0C06] hover:brightness-110 transition-all shadow-md active:scale-95"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#FAF6F0] text-[#1A0C06] font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#1A0C06] shadow-sm animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#FAF6F0] hover:text-[#D4AF37] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1A0C06] border-b border-[#D4AF37]/30 px-6 py-5 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-[#2A150C] text-[#D4AF37] border-l-4 border-[#D4AF37]"
                    : "text-[#FAF6F0]/80 hover:bg-[#2A150C]/50 hover:text-[#FAF6F0]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs text-[#FAF6F0]/70">
            <span>Currency: <strong>AED (United Arab Emirates Dirham)</strong></span>
            <span className="text-[#D4AF37]">Dubai, UAE</span>
          </div>
        </div>
      )}
    </header>
  );
}
