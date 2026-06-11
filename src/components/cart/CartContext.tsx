"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { CartItem, Lot, PriceTier } from "@/types/lot";

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  addItem: (lot: Lot, tier: PriceTier, quantity: number) => void;
  removeItem: (lotId: string, kg: number) => void;
  updateQuantity: (lotId: string, kg: number, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((lot: Lot, tier: PriceTier, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.lot.id === lot.id && i.selectedTier.kg === tier.kg
      );
      if (existing) {
        return prev.map((i) =>
          i.lot.id === lot.id && i.selectedTier.kg === tier.kg
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { lot, selectedTier: tier, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((lotId: string, kg: number) => {
    setItems((prev) =>
      prev.filter((i) => !(i.lot.id === lotId && i.selectedTier.kg === kg))
    );
  }, []);

  const updateQuantity = useCallback((lotId: string, kg: number, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) =>
        prev.filter((i) => !(i.lot.id === lotId && i.selectedTier.kg === kg))
      );
    } else {
      setItems((prev) =>
        prev.map((i) =>
          i.lot.id === lotId && i.selectedTier.kg === kg ? { ...i, quantity } : i
        )
      );
    }
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.selectedTier.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
