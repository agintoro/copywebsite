import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <>
      <Nav />
      <CartDrawer />
      <main className="flex-1">
        <CheckoutForm />
      </main>
      <Footer />
    </>
  );
}
