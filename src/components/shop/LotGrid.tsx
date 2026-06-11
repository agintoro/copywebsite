"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { processes } from "@/lib/lots";
import { LotCard } from "./LotCard";
import { EditableLotCard } from "./EditableLotCard";
import { useOwner } from "@/components/owner/OwnerContext";
import { useLotStore } from "@/components/owner/LotStoreContext";

export function LotGrid() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All Lots");
  const { isOwner } = useOwner();
  const { lots } = useLotStore();

  const filtered = useMemo(() => {
    return lots.filter((lot) => {
      const matchesFilter =
        filter === "All Lots" || lot.process === filter;
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        lot.name.toLowerCase().includes(q) ||
        lot.origin.toLowerCase().includes(q) ||
        lot.process.toLowerCase().includes(q) ||
        lot.flavorNotes.some((n) => n.toLowerCase().includes(q)) ||
        lot.region.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <section id="lots" className="max-w-[1280px] mx-auto px-6 py-16">
      {/* Section header */}
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3">
          Available / Editable Lots
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-heading text-5xl md:text-6xl leading-none">
            Buyer-ready lot library.
          </h2>

          {/* Search + filter */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search origin, process, notes..."
                className="pl-8 pr-4 py-2 text-sm bg-card border border-border rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-sm bg-card border border-border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
            >
              {processes.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center text-muted-foreground text-sm">
          No lots found for &ldquo;{query}&rdquo;
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((lot) =>
            isOwner ? (
              <EditableLotCard key={lot.id} lot={lot} />
            ) : (
              <LotCard key={lot.id} lot={lot} />
            )
          )}
        </div>
      )}
    </section>
  );
}
