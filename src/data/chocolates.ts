export interface Chocolate {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  cacaoPercentage: string;
  priceAED: number;
  category: "Truffles" | "Signature" | "Dark" | "Milk" | "White" | "Gift Box";
  image: string;
  badge?: string;
  ingredients: string[];
  weight: string;
  flavorNotes: string[];
}

export const chocolates: Chocolate[] = [
  {
    id: "royal-gold-truffle",
    name: "Royal 24K Gold Truffle",
    arabicName: "كمأة الذهب عيار 24 الملكية",
    description: "Handcrafted 72% Ecuadorian single-origin dark chocolate ganache draped in edible 24-karat gold leaf with roasted Piedmont hazelnut crunch.",
    cacaoPercentage: "72% Cacao",
    priceAED: 85,
    category: "Truffles",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80",
    badge: "Signature",
    ingredients: ["Ecuadorian Cocoa Mass", "24K Edible Gold Leaf", "Piedmont Hazelnuts", "Organic Dairy Cream", "Bourbon Vanilla"],
    weight: "120g (4 pcs)",
    flavorNotes: ["Toasted Hazelnut", "Dark Ganache", "Smoky Vanilla"]
  },
  {
    id: "dubai-pistachio-kunafa",
    name: "Dubai Pistachio & Kunafa Bar",
    arabicName: "لوح كنافة وفستق دبي",
    description: "The viral sensation: crispy golden kataifi shredded phyllo blended with rich Sicilian pistachio butter, encased in silky Swiss milk chocolate.",
    cacaoPercentage: "45% Cacao",
    priceAED: 65,
    category: "Signature",
    image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
    ingredients: ["Swiss Milk Chocolate", "Roasted Pistachio Cream", "Crispy Kataifi Pastry", "Pure Tahini", "Sea Salt"],
    weight: "200g",
    flavorNotes: ["Crisp Kataifi", "Pistachio Butter", "Velvet Milk"]
  },
  {
    id: "madagascar-noir-ganache",
    name: "Madagascar Noir 85% Ganache",
    arabicName: "جناش مدغشقر الأسود 85٪",
    description: "Single-estate bittersweet cacao from Sambirano Valley with naturally fruit-forward notes of wild raspberries, red currants, and dark molasses.",
    cacaoPercentage: "85% Cacao",
    priceAED: 48,
    category: "Dark",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=80",
    badge: "Artisan Grand Cru",
    ingredients: ["Madagascar Sambirano Cocoa", "Organic Raw Cane Sugar", "Cocoa Butter", "Madagascar Vanilla Pods"],
    weight: "100g",
    flavorNotes: ["Red Currant", "Wild Raspberry", "Roasted Cocoa"]
  },
  {
    id: "arabian-date-salted-pecan",
    name: "Arabian Date & Salted Pecan",
    arabicName: "تمر عربي وبيكان مملح",
    description: "Sun-ripened Madinah Medjool dates creamed with slow-roasted Texas pecans and sea salt crystals, enveloped in rich 65% dark chocolate.",
    cacaoPercentage: "65% Cacao",
    priceAED: 52,
    category: "Dark",
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=80",
    badge: "Local Heritage",
    ingredients: ["Medjool Date Puree", "Roasted Pecans", "65% Dark Cocoa", "Arabian Gulf Sea Salt", "Cardamom Infusion"],
    weight: "150g (6 bonbons)",
    flavorNotes: ["Caramelized Date", "Toasted Pecan", "Flaky Sea Salt"]
  },
  {
    id: "imperial-saffron-cardamom",
    name: "Imperial Saffron & Cardamom White",
    arabicName: "شوكولاتة بيضاء بالزعفران الإمبراطوري والهيل",
    description: "Velvety ivory chocolate made from unrefined cocoa butter, perfumed with Persian Super Negin saffron filaments and freshly ground green cardamom.",
    cacaoPercentage: "36% Cocoa Butter",
    priceAED: 55,
    category: "White",
    image: "https://images.unsplash.com/photo-1575372587186-500b39fbb24a?auto=format&fit=crop&w=800&q=80",
    badge: "Exotic",
    ingredients: ["Swiss Cocoa Butter", "Whole Cream Milk Powder", "Persian Saffron Threads", "Green Cardamom", "Golden Honey"],
    weight: "110g",
    flavorNotes: ["Royal Saffron", "Green Cardamom", "Honeyed Cream"]
  },
  {
    id: "piedmont-hazelnut-gianduja",
    name: "Piedmont Hazelnut Gianduja",
    arabicName: "جياندويا بندق بييمونتي",
    description: "A melt-in-your-mouth Italian recipe blending 45% IGP Piedmont hazelnuts with sweet Alpine milk chocolate for an impossibly creamy bite.",
    cacaoPercentage: "42% Cacao",
    priceAED: 58,
    category: "Milk",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80",
    badge: "Classic",
    ingredients: ["Roasted IGP Hazelnuts (45%)", "Alpine Milk Chocolate", "Bourbon Vanilla", "Cocoa Mass"],
    weight: "140g (8 bars)",
    flavorNotes: ["Brown Butter", "Warm Hazelnut", "Malty Milk"]
  },
  {
    id: "valencia-orange-chipotle",
    name: "Valencia Orange & Smoked Chipotle",
    arabicName: "برتقال فالنسيا مع فلفل شيبوتلي المدخن",
    description: "Slow-candied Valencia orange zest paired with 70% dark chocolate and a delicate smoky finish from sun-dried chipotle chili flakes.",
    cacaoPercentage: "70% Cacao",
    priceAED: 45,
    category: "Dark",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    badge: "Spiced & Zesty",
    ingredients: ["70% Single Origin Cocoa", "Valencia Orange Peel", "Natural Orange Blossom Water", "Smoked Chipotle"],
    weight: "100g",
    flavorNotes: ["Zesty Citrus", "Smoky Chili", "Bittersweet Cocoa"]
  },
  {
    id: "royal-grand-cru-box",
    name: "The Royal Grand Cru Assortment (12 Pcs)",
    arabicName: "صندوق جراند كرو الملكي الفاخر (12 قطعة)",
    description: "The ultimate luxury gift: an exquisite assortment of 12 bespoke handcrafted bonbons, kunafa chocolates, and 24K gold truffles in a velvet keepsake box.",
    cacaoPercentage: "Assorted 36% - 85%",
    priceAED: 160,
    category: "Gift Box",
    image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=800&q=80",
    badge: "Luxury Gift",
    ingredients: ["Assorted Grand Cru Cocoa", "24K Gold Leaf", "Bronte Pistachio", "Persian Saffron", "Medjool Dates", "Piedmont Hazelnuts"],
    weight: "280g (12 pcs)",
    flavorNotes: ["Gold Truffle", "Kunafa Crisp", "Saffron Ivory", "Smoked Orange"]
  }
];
