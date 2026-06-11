"use client";

import { useState, useRef, useEffect } from "react";
import { X, Lock } from "lucide-react";
import { useOwner } from "./OwnerContext";
import { cn } from "@/lib/utils";

export function PinModal() {
  const { showPinModal, closePinModal, submitPin } = useOwner();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (showPinModal) {
      setDigits(["", "", "", "", "", ""]);
      setError(false);
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    }
  }, [showPinModal]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    setError(false);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    // Auto-submit when all 6 filled
    if (value && index === 5) {
      const pin = [...next.slice(0, 5), value].join("");
      if (pin.length === 6) {
        const ok = submitPin(pin);
        if (!ok) {
          setError(true);
          setShake(true);
          setTimeout(() => {
            setShake(false);
            setDigits(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
          }, 600);
        }
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  if (!showPinModal) return null;

  return (
    <>
      <div className="fixed inset-0 bg-foreground/30 z-50 backdrop-blur-sm" onClick={closePinModal} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-3xl p-8 w-full max-w-sm shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-foreground text-primary-foreground flex items-center justify-center">
                <Lock className="size-3.5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Owner Mode</p>
                <p className="text-xs text-muted-foreground">Enter your 6-digit PIN</p>
              </div>
            </div>
            <button
              onClick={closePinModal}
              className="size-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
            >
              <X className="size-3.5" />
            </button>
          </div>

          <div className={cn("flex gap-2 justify-center", shake && "animate-[shake_0.5s_ease]")}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={cn(
                  "size-11 rounded-xl border text-center text-lg font-bold focus:outline-none focus:ring-2 bg-background transition-colors",
                  error
                    ? "border-red-400 ring-red-300 text-red-500"
                    : "border-border focus:ring-ring"
                )}
              />
            ))}
          </div>

          {error && (
            <p className="text-center text-xs text-red-500 mt-3">Incorrect PIN. Try again.</p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </>
  );
}
