export type LotStatus = "available" | "reserved" | "sold_out";

export interface PriceTier {
  kg: number;
  price: number; // IDR
}

export interface Lot {
  id: string;
  name: string;
  origin: string;
  region: string;
  altitude: string;
  varietal: string;
  process: string;
  status: LotStatus;
  isCustom?: boolean;
  prices: PriceTier[];
  flavorNotes: string[];
  description: string;
}

export interface CartItem {
  lot: Lot;
  selectedTier: PriceTier;
  quantity: number; // in kg
}
