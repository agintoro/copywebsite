"use client";

import { useState } from "react";
import { FileText, MessageCircle } from "lucide-react";
import type { Lot, PriceTier } from "@/types/lot";
import { StatusBadge, ProcessBadge } from "./StatusBadge";
import { useCart } from "@/components/cart/CartContext";
import { formatIDR, cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "6287774872494";

export function LotCard({ lot }: { lot: Lot }) {
  const { addItem } = useCart();
  const [selectedTier, setSelectedTier] = useState<PriceTier>(lot.prices[0]);
  const canOrder = lot.status === "available";

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi Driva Coffee! I'm interested in the *${lot.name}* lot.\n\nProcess: ${lot.process}\nOrigin: ${lot.origin}, ${lot.region}\nAltitude: ${lot.altitude}\nVarietal: ${lot.varietal}\n\nPlease send me more details.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  const handleAddToCart = () => {
    addItem(lot, selectedTier, 1);
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
      {/* Badges */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <StatusBadge status={lot.status} />
          {lot.isCustom && (
            <span className="inline-block text-[11px] font-medium tracking-wide px-2.5 py-0.5 rounded-full border border-border text-muted-foreground">
              Custom
            </span>
          )}
        </div>
        <ProcessBadge process={lot.process} />
      </div>

      {/* Title & Meta */}
      <div>
        <h3 className="font-heading text-xl leading-tight mb-2">{lot.name}</h3>
        <dl className="space-y-0.5 text-sm">
          {[
            ["Origin", lot.origin],
            ["Region", lot.region],
            ["Altitude", lot.altitude],
            ["Varietal", lot.varietal],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-1.5">
              <dt className="text-muted-foreground shrink-0">{label}:</dt>
              <dd className="text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Price tiers */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {lot.prices.map((tier) => (
          <button
            key={tier.kg}
            onClick={() => setSelectedTier(tier)}
            className={cn(
              "text-sm px-3 py-1 rounded-full border transition-colors",
              selectedTier.kg === tier.kg
                ? "bg-foreground text-primary-foreground border-foreground"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            )}
          >
            {tier.kg === 1 ? "Custom" : `${tier.kg}kg`} — {formatIDR(tier.price)}
            {tier.kg > 1 && <span className="text-xs opacity-70">/kg</span>}
          </button>
        ))}
      </div>

      {/* Flavor notes */}
      <div className="flex flex-wrap gap-1.5">
        {lot.flavorNotes.map((note) => (
          <span
            key={note}
            className="text-xs px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground"
          >
            {note}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
        {lot.description}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-auto pt-2">
        <button
          onClick={handleWhatsApp}
          className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-full border border-border hover:bg-muted transition-colors"
        >
          <FileText className="size-3.5" />
          PDF Sheet
        </button>
        {canOrder ? (
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-1.5 text-sm px-4 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium"
          >
            Add to Order
          </button>
        ) : (
          <button
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center gap-1.5 text-sm px-4 py-2 rounded-full border border-border hover:bg-muted transition-colors"
          >
            <MessageCircle className="size-3.5" />
            WhatsApp
          </button>
        )}
      </div>
    </div>
  );
}
