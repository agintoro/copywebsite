"use client";

import { useState } from "react";
import { Pencil, Check, X, Plus, Trash2 } from "lucide-react";
import type { Lot, LotStatus, PriceTier } from "@/types/lot";
import { StatusBadge, ProcessBadge } from "./StatusBadge";
import { useLotStore } from "@/components/owner/LotStoreContext";
import { formatIDR, cn } from "@/lib/utils";

const ALL_STATUSES: LotStatus[] = ["available", "reserved", "sold_out"];

export function EditableLotCard({ lot }: { lot: Lot }) {
  const { updateLot } = useLotStore();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Lot>({ ...lot });
  const [newNote, setNewNote] = useState("");

  const startEdit = () => {
    setDraft({ ...lot });
    setEditing(true);
  };

  const cancel = () => {
    setDraft({ ...lot });
    setEditing(false);
  };

  const save = () => {
    updateLot(lot.id, draft);
    setEditing(false);
  };

  const updatePrice = (index: number, field: keyof PriceTier, value: string) => {
    const prices = [...draft.prices];
    prices[index] = { ...prices[index], [field]: field === "price" ? Number(value) : Number(value) };
    setDraft((d) => ({ ...d, prices }));
  };

  const addPriceTier = () => {
    setDraft((d) => ({ ...d, prices: [...d.prices, { kg: 0, price: 0 }] }));
  };

  const removePriceTier = (index: number) => {
    setDraft((d) => ({ ...d, prices: d.prices.filter((_, i) => i !== index) }));
  };

  const addFlavorNote = () => {
    if (!newNote.trim()) return;
    setDraft((d) => ({ ...d, flavorNotes: [...d.flavorNotes, newNote.trim()] }));
    setNewNote("");
  };

  const removeFlavorNote = (note: string) => {
    setDraft((d) => ({ ...d, flavorNotes: d.flavorNotes.filter((n) => n !== note) }));
  };

  const field = (key: keyof Lot) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setDraft((d) => ({ ...d, [key]: e.target.value }));

  if (!editing) {
    return (
      <div className="relative group bg-card rounded-2xl border border-border p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
        {/* Owner edit button */}
        <button
          onClick={startEdit}
          className="absolute top-4 right-4 size-7 rounded-full bg-foreground text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
          title="Edit lot"
        >
          <Pencil className="size-3" />
        </button>

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
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {lot.prices.map((tier) => (
            <span
              key={tier.kg}
              className="text-sm px-3 py-1 rounded-full border border-border text-muted-foreground"
            >
              {tier.kg === 1 ? "Custom" : `${tier.kg}kg`} — {formatIDR(tier.price)}
              {tier.kg > 1 && <span className="text-xs opacity-70">/kg</span>}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {lot.flavorNotes.map((note) => (
            <span key={note} className="text-xs px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground">
              {note}
            </span>
          ))}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
          {lot.description}
        </p>
      </div>
    );
  }

  // ── Edit mode ──────────────────────────────────────────────────────────────
  return (
    <div className="bg-card rounded-2xl border-2 border-primary p-6 flex flex-col gap-4 shadow-lg">
      {/* Edit header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Editing Lot</span>
        <div className="flex gap-1.5">
          <button onClick={cancel} className="size-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
            <X className="size-3.5" />
          </button>
          <button onClick={save} className="size-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity">
            <Check className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className={labelCls}>Status</label>
          <select value={draft.status} onChange={field("status")} className={inputCls}>
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>{s.replace("_", " ")}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className={labelCls}>Process</label>
          <input value={draft.process} onChange={field("process")} className={inputCls} />
        </div>
      </div>

      {/* Name */}
      <div className="space-y-1">
        <label className={labelCls}>Lot Name</label>
        <input value={draft.name} onChange={field("name")} className={cn(inputCls, "font-heading text-base")} />
      </div>

      {/* Meta fields */}
      {(["origin", "region", "altitude", "varietal"] as const).map((key) => (
        <div key={key} className="space-y-1">
          <label className={labelCls}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
          <input value={draft[key]} onChange={field(key)} className={inputCls} />
        </div>
      ))}

      {/* Price tiers */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className={labelCls}>Price Tiers (IDR/kg)</label>
          <button onClick={addPriceTier} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Plus className="size-3" /> Add tier
          </button>
        </div>
        {draft.prices.map((tier, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="number"
              value={tier.kg}
              onChange={(e) => updatePrice(i, "kg", e.target.value)}
              placeholder="kg"
              className={cn(inputCls, "w-20")}
            />
            <span className="text-xs text-muted-foreground">kg @</span>
            <input
              type="number"
              value={tier.price}
              onChange={(e) => updatePrice(i, "price", e.target.value)}
              placeholder="price"
              className={cn(inputCls, "flex-1")}
            />
            <button onClick={() => removePriceTier(i)} className="text-muted-foreground hover:text-foreground transition-colors">
              <Trash2 className="size-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Flavor notes */}
      <div className="space-y-2">
        <label className={labelCls}>Flavor Notes</label>
        <div className="flex flex-wrap gap-1.5">
          {draft.flavorNotes.map((note) => (
            <span key={note} className="flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground">
              {note}
              <button onClick={() => removeFlavorNote(note)} className="hover:text-foreground">
                <X className="size-2.5" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFlavorNote())}
            placeholder="Add note…"
            className={cn(inputCls, "flex-1")}
          />
          <button onClick={addFlavorNote} className="px-3 py-1.5 rounded-lg bg-muted text-xs font-medium hover:bg-border transition-colors">
            Add
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className={labelCls}>Description</label>
        <textarea
          value={draft.description}
          onChange={field("description")}
          rows={4}
          className={cn(inputCls, "resize-none")}
        />
      </div>

      {/* Custom toggle */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={!!draft.isCustom}
          onChange={(e) => setDraft((d) => ({ ...d, isCustom: e.target.checked }))}
          className="rounded"
        />
        <span className="text-sm text-muted-foreground">Mark as Custom lot</span>
      </label>

      {/* Save */}
      <button onClick={save} className="w-full bg-primary text-primary-foreground rounded-full py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
        <Check className="size-4" /> Save Changes
      </button>
    </div>
  );
}

const labelCls = "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground";
const inputCls =
  "w-full bg-background border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
