"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, ArrowRight, X } from "lucide-react";

export default function CartToast() {
  const { lastAddedItem, dismissToast, totalItems } = useCart();

  if (!lastAddedItem) return null;

  return (
    <aside
      aria-label="Cart Notification"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#1A0C06] border-2 border-[#D4AF37] rounded-2xl p-4 shadow-2xl text-[#FAF6F0] animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-[#D4AF37]/40 bg-[#2A150C]">
          <Image
            src={lastAddedItem.image}
            alt={lastAddedItem.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[#D4AF37] text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            <span>Added to Cart</span>
          </div>
          <h4 className="font-serif font-bold text-sm text-[#FAF6F0] truncate mt-0.5">
            {lastAddedItem.name}
          </h4>
          <p className="text-xs text-[#F3E5AB]">
            {lastAddedItem.priceAED} AED • Cart total: {totalItems} items
          </p>
        </div>

        <button
          onClick={dismissToast}
          className="text-[#FAF6F0]/60 hover:text-[#FAF6F0] p-1"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between gap-3">
        <button
          onClick={dismissToast}
          className="text-xs text-[#FAF6F0]/70 hover:text-[#FAF6F0] underline"
        >
          Keep shopping
        </button>
        <Link
          href="/cart"
          onClick={dismissToast}
          className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#BF9B27] text-[#1A0C06] hover:brightness-110 shadow-sm"
        >
          <span>View Cart</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
}
