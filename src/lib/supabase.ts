import { createClient } from "@supabase/supabase-js";
import { chocolates as fallbackChocolates, Chocolate } from "@/data/chocolates";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Fetch chocolates from Supabase with graceful fallback to sample chocolates
 */
export async function fetchChocolates(): Promise<Chocolate[]> {
  if (!supabase) {
    return fallbackChocolates;
  }

  try {
    const { data, error } = await supabase
      .from("chocolates")
      .select("*")
      .order("created_at", { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) {
        console.warn("Could not fetch chocolates from Supabase, using fallback:", error.message);
      }
      return fallbackChocolates;
    }

    // Map database snake_case columns to Chocolate interface if needed
    return data.map((item: any): Chocolate => ({
      id: item.id,
      name: item.name,
      arabicName: item.arabic_name || item.arabicName || "",
      description: item.description || "",
      cacaoPercentage: item.cacao_percentage || item.cacaoPercentage || "",
      priceAED: Number(item.price_aed ?? item.priceAED ?? 0),
      category: item.category,
      image: item.image,
      badge: item.badge || undefined,
      ingredients: item.ingredients || [],
      weight: item.weight || "",
      flavorNotes: item.flavor_notes || item.flavorNotes || [],
    }));
  } catch (err) {
    console.error("Error fetching chocolates from Supabase:", err);
    return fallbackChocolates;
  }
}

export interface OrderPayload {
  orderReference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  emirate: string;
  area: string;
  streetAddress: string;
  deliverySlot: string;
  giftNote?: string;
  paymentMethod: string;
  items: Array<{
    id: string;
    name: string;
    priceAED: number;
    quantity: number;
    cacaoPercentage: string;
  }>;
  subtotalAED: number;
  deliveryFeeAED: number;
  discountAED: number;
  totalAED: number;
}

/**
 * Save an order to Supabase
 */
export async function saveOrder(order: OrderPayload): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    console.warn("Supabase is not configured yet. Simulating successful local save.");
    return { success: true };
  }

  try {
    const { error } = await supabase.from("orders").insert([
      {
        order_reference: order.orderReference,
        customer_name: order.customerName,
        customer_email: order.customerEmail,
        customer_phone: order.customerPhone,
        emirate: order.emirate,
        area: order.area,
        street_address: order.streetAddress,
        delivery_slot: order.deliverySlot,
        gift_note: order.giftNote || null,
        payment_method: order.paymentMethod,
        items: order.items,
        subtotal_aed: order.subtotalAED,
        delivery_fee_aed: order.deliveryFeeAED,
        discount_aed: order.discountAED,
        total_aed: order.totalAED,
        status: "pending",
      },
    ]);

    if (error) {
      console.error("Failed to save order in Supabase:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Unexpected error saving order:", err);
    return { success: false, error: err?.message || "Unknown error" };
  }
}
