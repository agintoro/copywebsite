"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { formatIDR } from "@/lib/utils";

const WHATSAPP_NUMBER = "6287774872494";

export function CheckoutForm() {
  const { items, totalPrice } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    address: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderLines = items
      .map(
        (item) =>
          `• ${item.lot.name} (${item.selectedTier.kg === 1 ? "Custom" : `${item.selectedTier.kg}kg`} × ${item.quantity}) — ${formatIDR(item.selectedTier.price * item.quantity)}`
      )
      .join("\n");

    const message = encodeURIComponent(
      `*New Order from drivacoffee.com*\n\n` +
        `*Customer*\n` +
        `Name: ${form.name}\n` +
        `Email: ${form.email}\n` +
        `WhatsApp: ${form.whatsapp}\n` +
        `Address: ${form.address}\n` +
        (form.notes ? `Notes: ${form.notes}\n` : "") +
        `\n*Order Summary*\n${orderLines}\n\n` +
        `*Total: ${formatIDR(totalPrice)}*\n\n` +
        `Please confirm availability and share payment details. Thank you!`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-24 text-muted-foreground">
        <p>Your order is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3">
        Checkout
      </p>
      <h1 className="font-heading text-4xl mb-10">Complete your order.</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold text-sm tracking-wide uppercase">Contact</h2>
          {[
            { name: "name", label: "Full Name", type: "text", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "whatsapp", label: "WhatsApp Number", type: "tel", required: true },
          ].map(({ name, label, type, required }) => (
            <div key={name} className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                required={required}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          ))}
        </div>

        {/* Shipping */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold text-sm tracking-wide uppercase">Shipping Address</h2>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Full Address
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              rows={3}
              className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Notes (optional)
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={2}
              className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
          <h2 className="font-semibold text-sm tracking-wide uppercase mb-4">Order Summary</h2>
          {items.map((item) => (
            <div
              key={`${item.lot.id}-${item.selectedTier.kg}`}
              className="flex justify-between text-sm"
            >
              <span className="text-muted-foreground">
                {item.lot.name}{" "}
                <span className="text-xs">
                  ({item.selectedTier.kg === 1 ? "Custom" : `${item.selectedTier.kg}kg`} ×{" "}
                  {item.quantity})
                </span>
              </span>
              <span className="font-medium">
                {formatIDR(item.selectedTier.price * item.quantity)}
              </span>
            </div>
          ))}
          <div className="pt-3 border-t border-border flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatIDR(totalPrice)}</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Clicking the button below will open WhatsApp with your order details pre-filled.
          Final price (incl. shipping) will be confirmed by our team.
        </p>

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground rounded-full py-4 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          Send Order via WhatsApp →
        </button>
      </form>
    </div>
  );
}
