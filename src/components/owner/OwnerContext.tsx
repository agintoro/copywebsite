"use client";

import { createContext, useContext, useState, useEffect } from "react";

const PIN = "141007";
const STORAGE_KEY = "driva_owner_mode";

interface OwnerContextValue {
  isOwner: boolean;
  showPinModal: boolean;
  openPinModal: () => void;
  closePinModal: () => void;
  submitPin: (pin: string) => boolean;
  exitOwner: () => void;
}

const OwnerContext = createContext<OwnerContextValue | null>(null);

export function OwnerProvider({ children }: { children: React.ReactNode }) {
  const [isOwner, setIsOwner] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  useEffect(() => {
    setIsOwner(sessionStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  const submitPin = (pin: string): boolean => {
    if (pin === PIN) {
      setIsOwner(true);
      sessionStorage.setItem(STORAGE_KEY, "true");
      setShowPinModal(false);
      return true;
    }
    return false;
  };

  const exitOwner = () => {
    setIsOwner(false);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <OwnerContext.Provider
      value={{
        isOwner,
        showPinModal,
        openPinModal: () => setShowPinModal(true),
        closePinModal: () => setShowPinModal(false),
        submitPin,
        exitOwner,
      }}
    >
      {children}
    </OwnerContext.Provider>
  );
}

export function useOwner() {
  const ctx = useContext(OwnerContext);
  if (!ctx) throw new Error("useOwner must be used within OwnerProvider");
  return ctx;
}
