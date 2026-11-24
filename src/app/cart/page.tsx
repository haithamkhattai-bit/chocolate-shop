"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Truck,
  Tag,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    discount,
    appliedPromo,
    applyPromo,
    removePromo,
    total,
    totalItems,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoMessage, setPromoMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    if (res.success) {
      setPromoMessage({ type: "success", text: res.message });
      setPromoInput("");
    } else {
      setPromoMessage({ type: "error", text: res.message });
    }
  };

  const freeDeliveryThreshold = 150;
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const amountNeeded = Math.max(0, freeDeliveryThreshold - subtotal);

  if (cart.length === 0) {
    return (
      <div className="bg-[#FAF6F0] min-h-[75vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 border border-[#EADDC9] card-shadow text-center">
          <div className="w-20 h-20 rounded-full bg-[#FAF6F0] border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#7E4B2F] mb-6">
            <ShoppingBag className="w-9 h-9 stroke-[1.5]" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1A0C06]">
            Your Bag is Empty
          </h2>
          <p className="text-xs sm:text-sm text-[#6E5B52] mt-2 leading-relaxed">
            Discover our collection of 8 handcrafted artisanal chocolates, 24K gold truffles, and pistachio kunafa bars.
          </p>
          <div className="mt-8">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-[#D4AF37] to-[#BF9B27] text-[#1A0C06] hover:brightness-110 shadow-md transition-all"
            >
              <span>Explore Chocolate Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF6F0] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#997D26] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Maison Chocolatier Dubai</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A0C06]">
            Your Shopping Bag
          </h1>
          <p className="text-xs sm:text-sm text-[#6E5B52] mt-1">
            Review your confectionery selections before proceeding to UAE chilled delivery checkout.
          </p>
        </div>

        {/* Free Delivery Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EADDC9] card-shadow mb-8">
          <div className="flex items-center justify-between text-xs font-medium text-[#2A150C] mb-2">
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#D4AF37]" />
              {subtotal >= freeDeliveryThreshold ? (
                <span className="font-bold text-emerald-700">
                  Congratulations! You unlocked FREE Chilled UAE Delivery
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#D4AF37] font-bold">{amountNeeded} AED</strong> more of chocolate for <strong>FREE Delivery</strong> across UAE
                </span>
              )}
            </span>
            <span className="font-bold text-[#7E4B2F]">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-[#FAF6F0] rounded-full overflow-hidden border border-[#EADDC9]/60">
            <div
              className="h-full bg-gradient-to-r from-[#D4AF37] via-[#C49E2B] to-[#997D26] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="bg-white rounded-2xl border border-[#EADDC9] card-shadow divide-y divide-[#EADDC9]/60 overflow-hidden">
              {cart.map((item) => (
                <div key={item.product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  
                  {/* Image and Title */}
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#FAF6F0] border border-[#EADDC9] shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#997D26]">
                        {item.product.cacaoPercentage} • {item.product.category}
                      </span>
                      <h3 className="font-serif text-base font-bold text-[#1A0C06] truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-[#7E4B2F] font-serif">
                        {item.product.arabicName}
                      </p>
                      <p className="text-xs font-semibold text-[#2A150C] mt-1">
                        {item.product.priceAED} AED <span className="text-[10px] font-normal text-[#6E5B52]">each</span>
                      </p>
                    </div>
                  </div>

                  {/* Quantity Stepper & Subtotal */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EADDC9]/50">
                    
                    {/* Stepper */}
                    <div className="flex items-center border border-[#EADDC9] rounded-lg bg-[#FAF6F0] p-0.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#5C331E] hover:text-[#1A0C06] hover:bg-white rounded transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-[#1A0C06]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#5C331E] hover:text-[#1A0C06] hover:bg-white rounded transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total Price for Item */}
                    <div className="text-right min-w-[70px]">
                      <span className="font-serif text-base font-bold text-[#1A0C06]">
                        {item.product.priceAED * item.quantity}
                      </span>
                      <span className="text-xs font-semibold text-[#D4AF37] ml-1">AED</span>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[#6E5B52]/70 hover:text-rose-600 p-1.5 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>

                </div>
              ))}
            </div>

            {/* Clear Cart & Continue Shopping Bar */}
            <div className="flex items-center justify-between text-xs pt-2">
              <Link
                href="/menu"
                className="font-bold text-[#7E4B2F] hover:text-[#D4AF37] transition-colors"
              >
                ← Continue Adding Chocolates
              </Link>
              <button
                onClick={clearCart}
                className="text-[#6E5B52] hover:text-rose-600 transition-colors"
              >
                Clear entire bag
              </button>
            </div>

          </div>

          {/* Right Column: Order Summary & Promo Code */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Promo Code Box */}
            <div className="bg-white rounded-2xl p-5 border border-[#EADDC9] card-shadow">
              <label htmlFor="promo-code-input" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2A150C] mb-3">
                <Tag className="w-4 h-4 text-[#D4AF37]" />
                <span>Promo or VIP Code</span>
              </label>

              {appliedPromo ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Code <strong>{appliedPromo}</strong> active!</span>
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-emerald-700 hover:text-emerald-900 font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      id="promo-code-input"
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="e.g. GOLD10 or ROYAL20"
                      className="flex-1 bg-[#FAF6F0] border border-[#EADDC9] rounded-xl px-3 py-2 text-xs text-[#1A0C06] uppercase focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#1A0C06] text-[#F3E5AB] text-xs font-bold rounded-xl hover:bg-[#2A150C] shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-xs ${promoMessage.type === "success" ? "text-emerald-700" : "text-rose-600"}`}>
                      {promoMessage.text}
                    </p>
                  )}
                  <p className="text-[10px] text-[#6E5B52]">
                    Tip: Try code <span className="font-mono text-[#997D26] font-bold">GOLD10</span> for 10% off.
                  </p>
                </form>
              )}
            </div>

            {/* Price Breakdown Summary */}
            <div className="bg-[#1A0C06] text-[#FAF6F0] rounded-2xl p-6 border-2 border-[#D4AF37] shadow-xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#FAF6F0] border-b border-[#D4AF37]/20 pb-3">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-[#FAF6F0]/80">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold text-[#F3E5AB]">{subtotal} AED</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Promo Discount ({appliedPromo})</span>
                    <span>-{discount} AED</span>
                  </div>
                )}

                <div className="flex justify-between text-[#FAF6F0]/80">
                  <span>Chilled UAE Courier</span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-400 font-semibold uppercase">Free</span>
                  ) : (
                    <span className="font-semibold text-[#F3E5AB]">{deliveryFee} AED</span>
                  )}
                </div>

                <div className="flex justify-between text-[11px] text-[#FAF6F0]/60">
                  <span>UAE VAT (5% included)</span>
                  <span>{Math.round(total * 0.05)} AED</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="pt-3 border-t border-[#D4AF37]/30 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#D4AF37] uppercase font-bold tracking-wider">Grand Total</span>
                  <p className="text-[10px] text-[#FAF6F0]/60">All taxes included</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-3xl font-bold text-[#F3E5AB]">
                    {total}
                  </span>
                  <span className="text-sm font-semibold text-[#D4AF37]">AED</span>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="pt-2">
                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-[#D4AF37] via-[#C49E2B] to-[#997D26] text-[#1A0C06] hover:brightness-110 shadow-lg active:scale-95 transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <p className="text-[10px] text-center text-[#FAF6F0]/60">
                Guaranteed melted-free chilled courier delivery across all 7 UAE Emirates.
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
