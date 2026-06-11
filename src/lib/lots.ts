import type { Lot } from "@/types/lot";

export const lots: Lot[] = [
  {
    id: "indragiri-dark-room-fermentation",
    name: "Indragiri Dark Room Fermentation",
    origin: "Indragiri",
    region: "Rancabali, Ciwidey, Bandung Selatan, West Java",
    altitude: "1600–1800 MASL",
    varietal: "Ateng Super, Typica, Lini S, Yellow Caturra",
    process: "Dark Room Fermentation",
    status: "sold_out",
    isCustom: true,
    prices: [{ kg: 1, price: 350000 }],
    flavorNotes: ["Blueberry", "Strawberry", "Raspberry", "Lemonade"],
    description:
      "Dark Room Fermentation is a controlled process where coffee cherries are fermented in a low-light environment to reduce external stress and guide a slower, steadier transformation. This method helps develop deeper sweetness, rounded fruit character, and a calmer, more polished fermentation profile. Expect dark fruit notes, soft acidity, syrupy sweetness, and a clean, brooding complexity.",
  },
  {
    id: "indragiri-thermal-shock-natural",
    name: "Indragiri Thermal Shock Natural",
    origin: "Indragiri",
    region: "Rancabali, Ciwidey, Bandung Selatan, West Java",
    altitude: "1600–1800 MASL",
    varietal: "Ateng Super, Typica, Lini S, Yellow Caturra",
    process: "Thermal Shock Natural",
    status: "reserved",
    prices: [
      { kg: 50, price: 252000 },
      { kg: 3, price: 280000 },
    ],
    flavorNotes: ["Prune", "Lemon", "Apple", "Citrus", "Cherry", "Guava", "Red Plum"],
    description:
      "Thermal Shock Natural is a precision natural process that uses controlled temperature contrast to shape fermentation, sweetness, and aromatic intensity. The cherries are treated with a thermal step before slow natural drying, helping lock in fruit character while keeping the cup clean and structured. Expect vivid fruit notes, bright acidity, layered sweetness, and a more expressive natural profile.",
  },
  {
    id: "indragiri-slow-dried-natural",
    name: "Indragiri Slow Dried Natural",
    origin: "Indragiri",
    region: "Rancabali, Ciwidey, Bandung Selatan, West Java",
    altitude: "1600–1800 MASL",
    varietal: "Ateng Super, Typica, Lini S, Yellow Caturra",
    process: "Slow Dried Natural",
    status: "reserved",
    prices: [
      { kg: 50, price: 225000 },
      { kg: 3, price: 250000 },
    ],
    flavorNotes: ["Berries", "Malt", "Sweet Fructose"],
    description:
      "Slow Dried Natural is a carefully controlled natural process where ripe coffee cherries are dried slowly to preserve sweetness, clarity, and depth. Instead of forcing speed, the drying curve is stretched gently, allowing the fruit character to develop cleanly while maintaining balance. Expect a cup with deep sweetness, layered fruit notes, soft acidity, and a smooth, syrupy body. A patient process for a coffee that refuses to taste rushed.",
  },
  {
    id: "indragiri-classic-washed",
    name: "Indragiri Classic Washed",
    origin: "Indragiri",
    region: "Rancabali, Ciwidey, Bandung Selatan, West Java",
    altitude: "1600–1800 MASL",
    varietal: "Ateng Super, Typica, Lini S, Yellow Caturra",
    process: "Classic Washed",
    status: "available",
    prices: [
      { kg: 50, price: 210000 },
      { kg: 3, price: 235000 },
    ],
    flavorNotes: ["Jasmine", "Citrus", "Brown Sugar", "Clean"],
    description:
      "Classic Washed is the foundational process — cherries are fully depulped, fermented in water, and dried on raised beds. The result is a clear, transparent cup that lets the origin speak without interference. Bright acidity, floral aromatics, and a clean finish that traces directly back to the terroir of Indragiri.",
  },
  {
    id: "indragiri-dual-phase-natural",
    name: "Indragiri Dual Phase Natural",
    origin: "Indragiri",
    region: "Rancabali, Ciwidey, Bandung Selatan, West Java",
    altitude: "1600–1800 MASL",
    varietal: "Ateng Super, Typica, Lini S, Yellow Caturra",
    process: "Dual Phase Natural",
    status: "reserved",
    prices: [
      { kg: 50, price: 265000 },
      { kg: 3, price: 295000 },
    ],
    flavorNotes: ["Tropical Fruit", "Passionfruit", "Caramel", "Lingering Finish"],
    description:
      "Dual Phase Natural combines two distinct fermentation stages before drying — first anaerobic, then aerobic — building layered complexity that unfolds across the palate. This method produces an intricate cup with tropical fruit bursts, caramelized sweetness, and a long, memorable finish.",
  },
  {
    id: "indragiri-lalvin-yeast-natural",
    name: "Indragiri Lalvin Yeast Natural",
    origin: "Indragiri",
    region: "Rancabali, Ciwidey, Bandung Selatan, West Java",
    altitude: "1600–1800 MASL",
    varietal: "Ateng Super, Typica, Lini S, Yellow Caturra",
    process: "Lalvin Yeast Natural",
    status: "reserved",
    prices: [
      { kg: 50, price: 275000 },
      { kg: 3, price: 305000 },
    ],
    flavorNotes: ["Wine", "Dark Cherry", "Fermented Plum", "Complex"],
    description:
      "Lalvin Yeast Natural introduces selected wine-grade yeast strains into the fermentation environment, guiding the microbial activity toward specific aromatic compounds. The result is a wine-like complexity — bold, structured, and unmistakably intentional. For buyers seeking lots with a distinct fermentation character and expressive depth.",
  },
];

export const processes = [
  "All Lots",
  "Dark Room Fermentation",
  "Thermal Shock Natural",
  "Slow Dried Natural",
  "Classic Washed",
  "Dual Phase Natural",
  "Lalvin Yeast Natural",
];
