"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Chocolate } from "@/data/chocolates";
import { useCart } from "@/context/CartContext";
import { Plus, Minus, ShoppingBag, Sparkles, Check } from "lucide-react";

interface ProductCardProps {
  chocolate: Chocolate;
}

export default function ProductCard({ chocolate }: ProductCardProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(chocolate, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div className="group bg-white rounded-2xl border border-[#EADDC9] hover:border-[#D4AF37] overflow-hidden transition-all duration-300 card-shadow card-shadow-hover flex flex-col justify-between">
      
      {/* Top Image & Badges Container */}
      <div className="relative aspect-[4/3] w-full bg-[#FAF6F0] overflow-hidden">
        <Image
          src={chocolate.image}
          alt={chocolate.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          {chocolate.badge ? (
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#1A0C06]/90 text-[#F3E5AB] border border-[#D4AF37]/50 backdrop-blur-sm shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              {chocolate.badge}
            </span>
          ) : <span />}

          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FAF6F0]/95 text-[#2A150C] border border-[#EADDC9] backdrop-blur-sm shadow-sm">
            {chocolate.cacaoPercentage}
          </span>
        </div>

        {/* Weight Tag at bottom of image */}
        <div className="absolute bottom-2.5 left-3 text-[11px] font-medium text-white/90 drop-shadow-md">
          {chocolate.weight}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Arabic Subtitle */}
          <div className="flex items-center justify-between text-xs text-[#7E4B2F] mb-1">
            <span className="uppercase tracking-widest font-semibold">{chocolate.category}</span>
            <span className="font-serif text-[#997D26]">{chocolate.arabicName}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-[#1A0C06] group-hover:text-[#997D26] transition-colors leading-snug">
            {chocolate.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#6E5B52] mt-2 line-clamp-2 leading-relaxed">
            {chocolate.description}
          </p>

          {/* Flavor Notes Pills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {chocolate.flavorNotes.map((note) => (
              <span
                key={note}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#FAF6F0] text-[#5C331E] border border-[#EADDC9]/60"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Add to Cart Action Bar */}
        <div className="pt-5 mt-4 border-t border-[#EADDC9]/60 flex items-center justify-between gap-3">
          
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-[10px] text-[#7E4B2F] font-semibold uppercase tracking-wider">Price</span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-2xl font-bold text-[#2A150C]">
                {chocolate.priceAED}
              </span>
              <span className="text-xs font-semibold text-[#D4AF37]">AED</span>
            </div>
          </div>

          {/* Quantity and Add Button */}
          <div className="flex items-center gap-2">
            
            {/* Quantity Stepper */}
            <div className="flex items-center border border-[#EADDC9] rounded-lg bg-[#FAF6F0] p-0.5">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-7 h-7 flex items-center justify-center text-[#5C331E] hover:text-[#1A0C06] hover:bg-white rounded transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center text-xs font-bold text-[#1A0C06]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-7 h-7 flex items-center justify-center text-[#5C331E] hover:text-[#1A0C06] hover:bg-white rounded transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add Button */}
            <button
              type="button"
              onClick={handleAdd}
              disabled={isAdded}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 ${
                isAdded
                  ? "bg-emerald-600 text-white"
                  : "bg-gradient-to-r from-[#D4AF37] via-[#C49E2B] to-[#997D26] text-[#1A0C06] hover:brightness-105"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
