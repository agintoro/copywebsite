import { cn } from "@/lib/utils";
import type { LotStatus } from "@/types/lot";

const statusConfig: Record<LotStatus, { label: string; className: string }> = {
  available: {
    label: "Available",
    className: "bg-[oklch(0.86_0.08_138/0.2)] text-[oklch(0.4_0.1_138)]",
  },
  reserved: {
    label: "Reserved",
    className: "bg-accent/30 text-foreground",
  },
  sold_out: {
    label: "Sold Out",
    className: "bg-foreground text-primary-foreground",
  },
};

export function StatusBadge({ status }: { status: LotStatus }) {
  const { label, className } = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-block text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full",
        className
      )}
    >
      {label}
    </span>
  );
}

export function ProcessBadge({ process }: { process: string }) {
  return (
    <span className="inline-block text-[11px] font-medium tracking-wide px-2.5 py-0.5 rounded-full bg-accent/25 text-foreground">
      {process}
    </span>
  );
}
