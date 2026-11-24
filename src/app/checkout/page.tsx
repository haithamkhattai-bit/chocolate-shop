"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { saveOrder, isSupabaseConfigured } from "@/lib/supabase";
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Clock,
  Lock,
  Database,
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, subtotal, deliveryFee, discount, total, clearCart } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    fullName: "Sheikha Al Maktoum",
    email: "client@chocolateshop.ae",
    phone: "+971 50 123 4567",
    emirate: "Dubai",
    area: "Downtown Dubai",
    streetAddress: "Burj Khalifa Boulevard, Villa 12",
    deliverySlot: "Today, Evening (7:00 PM – 10:00 PM)",
    giftNote: "Please include a gold wax-sealed gift note: 'With warmest wishes.'",
    paymentMethod: "card" as "card" | "applepay" | "cod",
    cardNumber: "•••• •••• •••• 4242",
    cardExpiry: "12/28",
    cardCvc: "888",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState("");
  const [dbStatusMessage, setDbStatusMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderId = `MDC-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderPayload = {
      orderReference: orderId,
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      emirate: formData.emirate,
      area: formData.area,
      streetAddress: formData.streetAddress,
      deliverySlot: formData.deliverySlot,
      giftNote: formData.giftNote,
      paymentMethod: formData.paymentMethod,
      items: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        priceAED: item.product.priceAED,
        quantity: item.quantity,
        cacaoPercentage: item.product.cacaoPercentage,
      })),
      subtotalAED: subtotal,
      deliveryFeeAED: deliveryFee,
      discountAED: discount,
      totalAED: total,
    };

    // Save order to Supabase
    const result = await saveOrder(orderPayload);
    if (result.success) {
      setDbStatusMessage(
        isSupabaseConfigured
          ? "✓ Successfully saved to Supabase 'orders' table"
          : "✓ Order processed locally (connect Supabase to store permanently)"
      );
    } else {
      setDbStatusMessage(`Note: Database save error (${result.error}), order recorded locally.`);
    }

    setConfirmedOrderId(orderId);
    setIsSubmitting(false);
    setOrderComplete(true);
    clearCart();
  };

  // If cart is empty and order is not just placed
  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="bg-[#FAF6F0] min-h-[75vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 border border-[#EADDC9] card-shadow text-center">
          <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#7E4B2F] mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1A0C06]">
            No Items to Checkout
          </h2>
          <p className="text-xs sm:text-sm text-[#6E5B52] mt-2">
            Your shopping bag is currently empty. Please select chocolates from our artisan menu first.
          </p>
          <div className="mt-6">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold bg-[#1A0C06] text-[#F3E5AB] hover:bg-[#2A150C]"
            >
              <span>Go to Chocolate Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Order Confirmation Success Screen
  if (orderComplete) {
    return (
      <div className="bg-[#FAF6F0] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border-2 border-[#D4AF37] card-shadow overflow-hidden p-8 sm:p-12 animate-in fade-in zoom-in-95 duration-500">
          
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#997D26] flex items-center justify-center mx-auto text-[#1A0C06] shadow-xl">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#D4AF37]/50 text-xs font-semibold text-[#997D26]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Order Confirmed & In Preparation</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A0C06]">
              Thank You for Your Order!
            </h1>

            <p className="text-xs sm:text-sm text-[#6E5B52] max-w-md mx-auto leading-relaxed">
              Our master chocolatiers in Dubai have received your bespoke confectionery order. It is being delicately packaged in a luxury chilled box.
            </p>

            {dbStatusMessage && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>{dbStatusMessage}</span>
              </div>
            )}
          </div>

          {/* Receipt Card */}
          <div className="mt-8 p-6 rounded-2xl bg-[#FAF6F0] border border-[#EADDC9] space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-[#EADDC9] pb-3">
              <span className="text-[#7E4B2F] font-semibold uppercase tracking-wider">Order Reference</span>
              <span className="font-mono text-sm font-bold text-[#1A0C06]">{confirmedOrderId}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#6E5B52]">Customer Name</span>
              <span className="font-medium text-[#1A0C06]">{formData.fullName}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#6E5B52]">Delivery Destination</span>
              <span className="font-medium text-[#1A0C06]">{formData.area}, {formData.emirate}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#6E5B52]">Delivery Window</span>
              <span className="font-medium text-emerald-800 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                {formData.deliverySlot}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#6E5B52]">Payment Status</span>
              <span className="font-semibold text-[#997D26] uppercase">
                {formData.paymentMethod === "cod" ? "Cash on Delivery" : "Paid Securely Online"}
              </span>
            </div>

            <div className="pt-3 border-t border-[#EADDC9] flex justify-between items-center text-sm font-bold text-[#1A0C06]">
              <span>Total Amount</span>
              <span className="font-serif text-lg text-[#2A150C]">{total} AED</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-1/2 py-3.5 rounded-xl text-xs font-bold text-center bg-[#1A0C06] text-[#F3E5AB] hover:bg-[#2A150C]"
            >
              Return to Home
            </Link>
            <Link
              href="/menu"
              className="w-full sm:w-1/2 py-3.5 rounded-xl text-xs font-bold text-center bg-gradient-to-r from-[#D4AF37] to-[#BF9B27] text-[#1A0C06] hover:brightness-110 shadow"
            >
              Explore More Chocolates
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
        <div className="mb-10 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-[#997D26] uppercase tracking-wider mb-1">
            <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>256-Bit Encrypted UAE Checkout</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A0C06]">
            Secure Order Checkout
          </h1>
          <p className="text-xs sm:text-sm text-[#6E5B52] mt-1">
            Complete your shipping details for temperature-controlled delivery across the Emirates.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Cols: Form Sections */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* 1. Contact Information */}
              <div className="bg-white rounded-2xl p-6 border border-[#EADDC9] card-shadow space-y-4">
                <div className="flex items-center gap-2 border-b border-[#EADDC9]/60 pb-3">
                  <span className="w-6 h-6 rounded-full bg-[#1A0C06] text-[#D4AF37] text-xs font-bold flex items-center justify-center">1</span>
                  <h2 className="font-serif text-lg font-bold text-[#1A0C06]">Client Information</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2A150C] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full text-xs bg-[#FAF6F0] border border-[#EADDC9] rounded-xl px-3.5 py-2.5 text-[#1A0C06] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A150C] mb-1">
                      Email Address (for order tracking) *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full text-xs bg-[#FAF6F0] border border-[#EADDC9] rounded-xl px-3.5 py-2.5 text-[#1A0C06] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#2A150C] mb-1">
                      UAE Contact Number * (for courier delivery coordination)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+971 50 123 4567"
                      className="w-full text-xs bg-[#FAF6F0] border border-[#EADDC9] rounded-xl px-3.5 py-2.5 text-[#1A0C06] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. UAE Delivery Address */}
              <div className="bg-white rounded-2xl p-6 border border-[#EADDC9] card-shadow space-y-4">
                <div className="flex items-center gap-2 border-b border-[#EADDC9]/60 pb-3">
                  <span className="w-6 h-6 rounded-full bg-[#1A0C06] text-[#D4AF37] text-xs font-bold flex items-center justify-center">2</span>
                  <h2 className="font-serif text-lg font-bold text-[#1A0C06]">UAE Chilled Delivery Destination</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2A150C] mb-1">
                      Emirate *
                    </label>
                    <select
                      name="emirate"
                      value={formData.emirate}
                      onChange={handleInputChange}
                      className="w-full text-xs bg-[#FAF6F0] border border-[#EADDC9] rounded-xl px-3.5 py-2.5 text-[#1A0C06] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Dubai">Dubai</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                      <option value="Sharjah">Sharjah</option>
                      <option value="Ajman">Ajman</option>
                      <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                      <option value="Fujairah">Fujairah</option>
                      <option value="Umm Al Quwain">Umm Al Quwain</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A150C] mb-1">
                      Area / Community *
                    </label>
                    <input
                      type="text"
                      name="area"
                      required
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="e.g. Palm Jumeirah, Downtown, Saadiyat"
                      className="w-full text-xs bg-[#FAF6F0] border border-[#EADDC9] rounded-xl px-3.5 py-2.5 text-[#1A0C06] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#2A150C] mb-1">
                      Street Address / Villa / Apartment Number *
                    </label>
                    <input
                      type="text"
                      name="streetAddress"
                      required
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      placeholder="e.g. Al Wasl Road, Villa 45B"
                      className="w-full text-xs bg-[#FAF6F0] border border-[#EADDC9] rounded-xl px-3.5 py-2.5 text-[#1A0C06] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#2A150C] mb-1">
                      Preferred Delivery Window
                    </label>
                    <select
                      name="deliverySlot"
                      value={formData.deliverySlot}
                      onChange={handleInputChange}
                      className="w-full text-xs bg-[#FAF6F0] border border-[#EADDC9] rounded-xl px-3.5 py-2.5 text-[#1A0C06] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Today, Evening (7:00 PM – 10:00 PM)">Today, Evening (7:00 PM – 10:00 PM)</option>
                      <option value="Tomorrow, Morning (10:00 AM – 1:00 PM)">Tomorrow, Morning (10:00 AM – 1:00 PM)</option>
                      <option value="Tomorrow, Afternoon (2:00 PM – 6:00 PM)">Tomorrow, Afternoon (2:00 PM – 6:00 PM)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#2A150C] mb-1">
                      Gift Message or Special Handling Instructions
                    </label>
                    <textarea
                      name="giftNote"
                      rows={2}
                      value={formData.giftNote}
                      onChange={handleInputChange}
                      placeholder="Complimentary handwritten luxury card message..."
                      className="w-full text-xs bg-[#FAF6F0] border border-[#EADDC9] rounded-xl px-3.5 py-2 text-[#1A0C06] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Payment Method */}
              <div className="bg-white rounded-2xl p-6 border border-[#EADDC9] card-shadow space-y-4">
                <div className="flex items-center gap-2 border-b border-[#EADDC9]/60 pb-3">
                  <span className="w-6 h-6 rounded-full bg-[#1A0C06] text-[#D4AF37] text-xs font-bold flex items-center justify-center">3</span>
                  <h2 className="font-serif text-lg font-bold text-[#1A0C06]">Payment Method</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Card Option */}
                  <label
                    className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.paymentMethod === "card"
                        ? "bg-[#FAF6F0] border-[#D4AF37] shadow-sm ring-1 ring-[#D4AF37]"
                        : "border-[#EADDC9] hover:border-[#D4AF37]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <CreditCard className="w-5 h-5 text-[#997D26]" />
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={handleInputChange}
                        className="accent-[#D4AF37]"
                      />
                    </div>
                    <span className="text-xs font-bold text-[#1A0C06] mt-2">Credit / Debit Card</span>
                    <span className="text-[10px] text-[#6E5B52]">Visa, Mastercard, Amex</span>
                  </label>

                  {/* Apple Pay Option */}
                  <label
                    className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.paymentMethod === "applepay"
                        ? "bg-[#FAF6F0] border-[#D4AF37] shadow-sm ring-1 ring-[#D4AF37]"
                        : "border-[#EADDC9] hover:border-[#D4AF37]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm"> Pay</span>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="applepay"
                        checked={formData.paymentMethod === "applepay"}
                        onChange={handleInputChange}
                        className="accent-[#D4AF37]"
                      />
                    </div>
                    <span className="text-xs font-bold text-[#1A0C06] mt-2">Apple Pay</span>
                    <span className="text-[10px] text-[#6E5B52]">One-tap UAE checkout</span>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.paymentMethod === "cod"
                        ? "bg-[#FAF6F0] border-[#D4AF37] shadow-sm ring-1 ring-[#D4AF37]"
                        : "border-[#EADDC9] hover:border-[#D4AF37]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Banknote className="w-5 h-5 text-[#997D26]" />
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={handleInputChange}
                        className="accent-[#D4AF37]"
                      />
                    </div>
                    <span className="text-xs font-bold text-[#1A0C06] mt-2">Cash on Delivery</span>
                    <span className="text-[10px] text-[#6E5B52]">Pay when chilled box arrives</span>
                  </label>

                </div>

                {formData.paymentMethod === "card" && (
                  <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#EADDC9] space-y-3 pt-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#2A150C] mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full text-xs bg-white border border-[#EADDC9] rounded-lg px-3 py-2 text-[#1A0C06] font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#2A150C] mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          className="w-full text-xs bg-white border border-[#EADDC9] rounded-lg px-3 py-2 text-[#1A0C06] font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#2A150C] mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          className="w-full text-xs bg-white border border-[#EADDC9] rounded-lg px-3 py-2 text-[#1A0C06] font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Right 4 Cols: Order Items & Place Order Summary */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-[#1A0C06] text-[#FAF6F0] rounded-2xl p-6 border-2 border-[#D4AF37] shadow-xl space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#FAF6F0] border-b border-[#D4AF37]/20 pb-3 flex items-center justify-between">
                  <span>Order Items</span>
                  <span className="text-xs font-sans text-[#D4AF37]">{cart.length} items</span>
                </h3>

                {/* Items Mini List */}
                <div className="max-h-60 overflow-y-auto divide-y divide-[#D4AF37]/15 pr-1 space-y-2">
                  {cart.map((item) => (
                    <div key={item.product.id} className="pt-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-[#D4AF37]/30">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="truncate">
                          <p className="font-serif font-bold text-[#FAF6F0] truncate">{item.product.name}</p>
                          <p className="text-[10px] text-[#FAF6F0]/60">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-[#F3E5AB] shrink-0">
                        {item.product.priceAED * item.quantity} AED
                      </span>
                    </div>
                  ))}
                </div>

                {/* Financial Summary */}
                <div className="pt-4 border-t border-[#D4AF37]/20 space-y-2 text-xs">
                  <div className="flex justify-between text-[#FAF6F0]/80">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#F3E5AB]">{subtotal} AED</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Savings</span>
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

                  <div className="pt-2 border-t border-[#D4AF37]/30 flex items-baseline justify-between">
                    <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider">Total in AED</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-3xl font-bold text-[#F3E5AB]">{total}</span>
                      <span className="text-sm font-semibold text-[#D4AF37]">AED</span>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-[#D4AF37] via-[#C49E2B] to-[#997D26] text-[#1A0C06] hover:brightness-110 shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#1A0C06] border-t-transparent rounded-full animate-spin" />
                      <span>Saving Order to Supabase...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Place Order ({total} AED)</span>
                    </>
                  )}
                </button>

                <div className="text-[10px] text-center text-[#FAF6F0]/60 space-y-1">
                  <p>✓ Chilled climate-controlled transport included</p>
                  <p>✓ Real-time order sync to Supabase</p>
                </div>

              </div>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
}
