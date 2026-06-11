"use client";

import Link from "next/link";
import { ShoppingBag, Lock, Unlock } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { useOwner } from "@/components/owner/OwnerContext";
import { cn } from "@/lib/utils";

export function Nav() {
  const { totalItems, openCart } = useCart();
  const { isOwner, openPinModal, exitOwner } = useOwner();

  return (
    <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="size-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm select-none">
            D
          </div>
          <div className="leading-none">
            <p className="font-bold text-sm tracking-wider uppercase">DRIVN</p>
            <p className="text-[10px] text-muted-foreground tracking-wide">
              Driva Coffee Processing
            </p>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-7">
          {[
            { href: "/processes", label: "Processes" },
            { href: "/#lots", label: "Lots" },
            { href: "/quality", label: "Quality" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className={cn(
              "relative flex items-center gap-1.5 text-sm rounded-full px-4 py-1.5 border border-border hover:bg-muted transition-colors"
            )}
          >
            <ShoppingBag className="size-4" />
            <span className="hidden sm:inline">Order</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 size-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={isOwner ? exitOwner : openPinModal}
            className={cn(
              "flex items-center gap-1.5 text-sm rounded-full border px-4 py-1.5 font-medium transition-colors",
              isOwner
                ? "border-primary bg-primary text-primary-foreground hover:opacity-90"
                : "border-foreground hover:bg-foreground hover:text-background"
            )}
          >
            {isOwner ? <Unlock className="size-3.5" /> : <Lock className="size-3.5" />}
            {isOwner ? "Exit Owner" : "Owner"}
          </button>
        </div>
      </div>
    </header>
  );
}
