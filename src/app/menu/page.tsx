"use client";

import React, { useState, useMemo, useEffect } from "react";
import { chocolates as defaultChocolates, Chocolate } from "@/data/chocolates";
import { fetchChocolates, isSupabaseConfigured } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import { Sparkles, Search, SlidersHorizontal, ArrowUpDown, Database } from "lucide-react";

export default function MenuPage() {
  const [items, setItems] = useState<Chocolate[]>(defaultChocolates);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");

  const categories = ["All", "Signature", "Truffles", "Dark", "Milk", "White", "Gift Box"];

  useEffect(() => {
    async function loadData() {
      if (isSupabaseConfigured) {
        setLoading(true);
        const data = await fetchChocolates();
        setItems(data);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredChocolates = useMemo(() => {
    return items
      .filter((item) => {
        const matchesCategory =
          selectedCategory === "All" || item.category === selectedCategory;
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.arabicName.includes(searchQuery) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.flavorNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.priceAED - b.priceAED;
        if (sortBy === "price-desc") return b.priceAED - a.priceAED;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return 0; // featured default
      });
  }, [items, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="bg-[#FAF6F0] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title & Intro */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EADDC9]/60 border border-[#D4AF37]/40 text-xs text-[#7E4B2F] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The Complete Collection • 8 Distinct Creations</span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1A0C06] tracking-tight">
            Artisan Chocolate Menu
          </h1>
          
          <p className="text-sm sm:text-base text-[#6E5B52] mt-3 font-light leading-relaxed">
            Every piece is tempered and poured by hand in our Dubai atelier using ethically harvested single-origin cacao, Swiss Alpine dairy, and exotic Arabian ingredients.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-3 text-xs text-[#997D26] font-medium">
            <span>All prices are in UAE Dirhams (AED)</span>
            <span>•</span>
            <span>Free chilled UAE delivery on orders above 150 AED</span>
            {isSupabaseConfigured && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full border border-emerald-300">
                  <Database className="w-3 h-3 text-emerald-700" />
                  Synced with Supabase
                </span>
              </>
            )}
          </div>
        </div>

        {/* Filter and Search Controls Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#EADDC9] card-shadow mb-10 space-y-4">
          
          {/* Top Row: Search and Sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#7E4B2F]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search flavors, cacao %, pistachio..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[#FAF6F0] border border-[#EADDC9] focus:outline-none focus:border-[#D4AF37] text-[#1A0C06] placeholder-[#6E5B52]/60"
              />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs text-[#6E5B52] flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#D4AF37]" />
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort chocolates"
                className="text-xs bg-[#FAF6F0] border border-[#EADDC9] rounded-xl px-3 py-2 text-[#1A0C06] font-medium focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>

          </div>

          {/* Bottom Row: Category Tabs */}
          <div className="pt-2 border-t border-[#EADDC9]/60 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs text-[#7E4B2F] font-semibold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-[#D4AF37]" />
              Filter:
            </span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-[#1A0C06] text-[#F3E5AB] border border-[#D4AF37] shadow-sm"
                    : "bg-[#FAF6F0] text-[#5C331E] border border-[#EADDC9] hover:border-[#D4AF37]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#6E5B52] mb-6">
          <span>Showing <strong>{filteredChocolates.length}</strong> of <strong>{items.length}</strong> artisan chocolates</span>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-[#997D26] hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Grid of Chocolates */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="bg-white rounded-2xl border border-[#EADDC9] p-4 h-80 animate-pulse flex flex-col justify-between">
                <div className="w-full h-40 bg-[#FAF6F0] rounded-xl" />
                <div className="space-y-2 mt-4">
                  <div className="h-4 bg-[#FAF6F0] rounded w-3/4" />
                  <div className="h-3 bg-[#FAF6F0] rounded w-1/2" />
                </div>
                <div className="h-8 bg-[#FAF6F0] rounded mt-4" />
              </div>
            ))}
          </div>
        ) : filteredChocolates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredChocolates.map((chocolate) => (
              <ProductCard key={chocolate.id} chocolate={chocolate} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#EADDC9] p-8">
            <p className="font-serif text-lg text-[#1A0C06] font-bold">No chocolates found matching your search</p>
            <p className="text-xs text-[#6E5B52] mt-1">Try searching for &quot;truffle&quot;, &quot;pistachio&quot;, &quot;dark&quot;, or clear your filters.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-4 py-2 text-xs font-bold rounded-lg bg-[#1A0C06] text-[#F3E5AB]"
            >
              View All Chocolates
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
