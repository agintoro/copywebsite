import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartContext";
import { OwnerProvider } from "@/components/owner/OwnerContext";
import { LotStoreProvider } from "@/components/owner/LotStoreContext";
import { PinModal } from "@/components/owner/PinModal";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "DRIVN — Driva Coffee Processing",
  description:
    "Buyer-ready green bean lots from Indragiri, West Java. Tracing coffee to its soul.",
  openGraph: {
    title: "DRIVN — Driva Coffee Processing",
    description: "Specialty green bean lots. Traceable. Editable. Ready.",
    siteName: "Driva Coffee",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${dmSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <OwnerProvider>
          <LotStoreProvider>
            <CartProvider>
              <PinModal />
              {children}
            </CartProvider>
          </LotStoreProvider>
        </OwnerProvider>
      </body>
    </html>
  );
}
