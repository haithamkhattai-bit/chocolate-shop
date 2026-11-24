"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Chocolate } from "@/data/chocolates";

export interface CartItem {
  product: Chocolate;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Chocolate, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  appliedPromo: string | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  total: number;
  lastAddedItem: Chocolate | null;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [lastAddedItem, setLastAddedItem] = useState<Chocolate | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("chocolate_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
      const savedPromo = localStorage.getItem("chocolate_promo");
      if (savedPromo) {
        const promo = JSON.parse(savedPromo);
        setAppliedPromo(promo.code);
        setDiscountPercent(promo.discount);
      }
    } catch {
      // ignore JSON errors
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("chocolate_cart", JSON.stringify(cart));
      } catch {
        // ignore
      }
    }
  }, [cart, isLoaded]);

  const addToCart = (product: Chocolate, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setLastAddedItem(product);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
    setDiscountPercent(0);
    try {
      localStorage.removeItem("chocolate_cart");
      localStorage.removeItem("chocolate_promo");
    } catch {
      // ignore
    }
  };

  const dismissToast = () => {
    setLastAddedItem(null);
  };

  const applyPromo = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "GOLD10" || cleanCode === "DUBAI10") {
      setAppliedPromo(cleanCode);
      setDiscountPercent(0.10);
      try {
        localStorage.setItem("chocolate_promo", JSON.stringify({ code: cleanCode, discount: 0.10 }));
      } catch {}
      return { success: true, message: "10% Golden Discount applied!" };
    } else if (cleanCode === "ROYAL20") {
      setAppliedPromo(cleanCode);
      setDiscountPercent(0.20);
      try {
        localStorage.setItem("chocolate_promo", JSON.stringify({ code: cleanCode, discount: 0.20 }));
      } catch {}
      return { success: true, message: "20% Royal VIP Discount applied!" };
    }
    return { success: false, message: "Invalid promo code. Try GOLD10 or ROYAL20." };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setDiscountPercent(0);
    try {
      localStorage.removeItem("chocolate_promo");
    } catch {}
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.priceAED * item.quantity,
    0
  );
  // Free delivery across UAE over 150 AED, otherwise 20 AED
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 150 ? 0 : 20;
  const discount = Math.round(subtotal * discountPercent);
  const total = Math.max(0, subtotal - discount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        deliveryFee,
        discount,
        appliedPromo,
        applyPromo,
        removePromo,
        total,
        lastAddedItem,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
