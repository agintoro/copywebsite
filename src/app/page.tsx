import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { LotGrid } from "@/components/shop/LotGrid";
import { CartDrawer } from "@/components/cart/CartDrawer";

export default function Home() {
  return (
    <>
      <Nav />
      <CartDrawer />
      <main className="flex-1">
        <LotGrid />
      </main>
      <Footer />
    </>
  );
}
