"use client";

import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "./CartContext";
import { formatIDR } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCart();
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/20 z-40 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-5" />
            <span className="font-semibold text-sm tracking-wide uppercase">Your Order</span>
          </div>
          <button
            onClick={closeCart}
            className="size-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3 py-16">
              <ShoppingBag className="size-10 opacity-30" />
              <p className="text-sm">No lots added yet.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.lot.id}-${item.selectedTier.kg}`}
                className="bg-background rounded-2xl p-4 space-y-3"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="font-semibold text-sm leading-tight">{item.lot.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.selectedTier.kg === 1
                        ? "Custom lot"
                        : `${item.selectedTier.kg}kg bag`}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.lot.id, item.selectedTier.kg)}
                    className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-muted rounded-full px-2 py-1">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.lot.id,
                          item.selectedTier.kg,
                          item.quantity - 1
                        )
                      }
                      className="size-5 flex items-center justify-center hover:opacity-60 transition-opacity"
                    >
                      <Minus className="size-3" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.lot.id,
                          item.selectedTier.kg,
                          item.quantity + 1
                        )
                      }
                      className="size-5 flex items-center justify-center hover:opacity-60 transition-opacity"
                    >
                      <Plus className="size-3" />
                    </button>
                  </div>
                  <p className="text-sm font-semibold">
                    {formatIDR(item.selectedTier.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-border space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">{formatIDR(totalPrice)}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Shipping &amp; final price confirmed via WhatsApp.
            </p>
            <button
              onClick={() => {
                closeCart();
                router.push("/checkout");
              }}
              className="w-full bg-primary text-primary-foreground rounded-full py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
