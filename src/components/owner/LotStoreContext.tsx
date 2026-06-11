"use client";

import { createContext, useContext, useState } from "react";
import { lots as defaultLots } from "@/lib/lots";
import type { Lot } from "@/types/lot";

interface LotStoreContextValue {
  lots: Lot[];
  updateLot: (id: string, patch: Partial<Lot>) => void;
}

const LotStoreContext = createContext<LotStoreContextValue | null>(null);

export function LotStoreProvider({ children }: { children: React.ReactNode }) {
  const [lots, setLots] = useState<Lot[]>(defaultLots);

  const updateLot = (id: string, patch: Partial<Lot>) => {
    setLots((prev) =>
      prev.map((lot) => (lot.id === id ? { ...lot, ...patch } : lot))
    );
  };

  return (
    <LotStoreContext.Provider value={{ lots, updateLot }}>
      {children}
    </LotStoreContext.Provider>
  );
}

export function useLotStore() {
  const ctx = useContext(LotStoreContext);
  if (!ctx) throw new Error("useLotStore must be used within LotStoreProvider");
  return ctx;
}
